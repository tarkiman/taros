package web

import (
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"sync"
	"sync/atomic"
	"time"

	"nhooyr.io/websocket"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/config"
	"github.com/tarkiman/taros/internal/docker"
)

// An interactive shell inside a running container, over a WebSocket — see
// docs/04-features.md §4.15 and docs/07-security.md ("Shell container").
//
// It is a code-execution capability the Docker page never had, and for a
// container with the Docker socket or a host path mounted it is effectively
// root on the host, so it gets the host terminal's treatment: the route only
// exists when containerShell.enabled, sessions are capped and idle-timed, and
// each one is audit-logged (who, which container, how long, byte counts —
// never the content).
//
// Wire protocol (same shape as the host terminal's, so the hot path avoids
// JSON):
//   - server → client, binary: raw terminal output.
//   - client → server, binary: raw keystrokes.
//   - client → server, text:   {"type":"resize","cols":N,"rows":N}.
//   - server → client, text:   {"type":"ready","container":name} once attached;
//     {"type":"error","code":…,"params":…} and then close, or
//     {"type":"exit","code":N} when the shell ends. Errors travel as frames,
//     not as a failed handshake, because a WebSocket upgrade failure never
//     shows its body to the browser.

const (
	defaultShellIdle = 15 * time.Minute
	defaultShellMax  = 2
)

type shellFrame struct {
	Type      string         `json:"type"`
	Container string         `json:"container,omitempty"`
	Code      any            `json:"code,omitempty"` // error code (string) or exit code (int)
	Params    map[string]any `json:"params,omitempty"`
}

func (s *Server) shellLimits() (idle time.Duration, max int) {
	idle, max = s.deps.ContainerShellIdle, s.deps.ContainerShellMax
	if idle <= 0 {
		idle = defaultShellIdle
	}
	if max <= 0 {
		max = defaultShellMax
	}
	return idle, max
}

func (s *Server) acquireShell() bool {
	_, max := s.shellLimits()
	for {
		n := s.shellSessions.Load()
		if int(n) >= max {
			return false
		}
		if s.shellSessions.CompareAndSwap(n, n+1) {
			return true
		}
	}
}

func (s *Server) releaseShell() { s.shellSessions.Add(-1) }

// handleContainerShellStatus is always registered so the UI can show a clear
// "not enabled" state (and the limits) instead of a failed connection.
func (s *Server) handleContainerShellStatus(w http.ResponseWriter, r *http.Request) {
	idle, max := s.shellLimits()
	writeJSON(w, http.StatusOK, map[string]any{
		"enabled":        s.deps.ContainerShellEnabled && s.deps.DockerEnabled,
		"idleTimeoutMin": int(idle / time.Minute),
		"maxSessions":    max,
	})
}

func (s *Server) handleContainerShellWS(w http.ResponseWriter, r *http.Request) {
	sess := sessionFromContext(r.Context())
	id := r.PathValue("id")

	// Default options: the library performs its own strict same-origin check on
	// the Origin header — the cross-site WebSocket hijacking mitigation, same as
	// the host terminal (docs/07-security.md §7.6).
	conn, err := websocket.Accept(w, r, nil)
	if err != nil {
		slog.Warn("container shell websocket upgrade rejected", "username", sess.Username, "remote", clientIP(r), "err", err)
		return
	}
	defer conn.CloseNow()

	ctx, cancel := context.WithCancel(r.Context())
	defer cancel()

	send := func(f shellFrame) {
		if b, err := json.Marshal(f); err == nil {
			_ = conn.Write(ctx, websocket.MessageText, b)
		}
	}
	// The session slot is given back the moment the session is *decided over*,
	// not when the close handshake finishes: conn.Close waits (up to 5 s) for
	// the peer's close frame, and a slow or stuck client must not be able to
	// hold slots — that would let it exhaust the session cap.
	var release func()
	fail := func(code string, params map[string]any) {
		send(shellFrame{Type: "error", Code: code, Params: params})
		if release != nil {
			release()
		}
		_ = conn.Close(websocket.StatusNormalClosure, code)
		cancel()
	}

	idle, max := s.shellLimits()
	if !s.acquireShell() {
		fail(apierr.ShellTooManySessions, map[string]any{"max": max})
		return
	}
	release = sync.OnceFunc(s.releaseShell)
	defer release()

	name, err := s.deps.Docker.ContainerName(ctx, id)
	if err != nil {
		var api *docker.APIError
		if errors.As(err, &api) && api.StatusCode == http.StatusNotFound {
			fail(apierr.ShellNotFound, nil)
			return
		}
		fail(apierr.ShellStartFailed, map[string]any{"detail": err.Error()})
		return
	}

	sh, err := s.deps.Docker.ExecShell(ctx, id, 80, 24) // the client's first resize frame sets the real size
	if err != nil {
		switch {
		case errors.Is(err, docker.ErrNotRunning):
			fail(apierr.ShellNotRunning, nil)
		case errors.Is(err, docker.ErrNoShell):
			fail(apierr.ShellNoShell, nil)
		default:
			slog.Warn("container shell start failed", "container", name, "username", sess.Username, "err", err)
			fail(apierr.ShellStartFailed, map[string]any{"detail": err.Error()})
		}
		return
	}
	defer sh.Close()

	started := time.Now()
	var lastActivity atomic.Int64
	var bytesIn, bytesOut atomic.Int64
	lastActivity.Store(started.UnixNano())
	touch := func() { lastActivity.Store(time.Now().UnixNano()) }
	var exitCode atomic.Int32 // written by the pump goroutine, read after it
	exitCode.Store(-1)

	slog.Info("container shell opened", "container", name, "username", sess.Username, "remote", clientIP(r))
	send(shellFrame{Type: "ready", Container: name})

	// shell → browser. When the stream ends, work out whether that was a shell
	// that ran (report its exit code) or one that never started.
	pumped := make(chan struct{})
	go func() {
		defer close(pumped)
		buf := make([]byte, 4096)
		first := true
		for {
			n, err := sh.Read(buf)
			// A shell that never started (no bash/sh in the image) answers with the
			// runtime's own error text as its only output. Don't paint that into
			// the terminal: Failure() below turns it into a proper error frame.
			suppress := first && n > 0 && bytes.HasPrefix(buf[:n], []byte("OCI runtime exec failed"))
			if n > 0 {
				first = false
			}
			if n > 0 && !suppress {
				touch()
				bytesOut.Add(int64(n))
				if werr := conn.Write(ctx, websocket.MessageBinary, buf[:n]); werr != nil {
					return
				}
			}
			if err != nil {
				break
			}
		}
		fctx, fcancel := context.WithTimeout(context.Background(), 3*time.Second)
		defer fcancel()
		if ferr := sh.Failure(fctx); ferr != nil {
			if errors.Is(ferr, docker.ErrNoShell) {
				fail(apierr.ShellNoShell, nil)
			} else {
				fail(apierr.ShellStartFailed, map[string]any{"detail": ferr.Error()})
			}
			return
		}
		if code, _, err := sh.ExitCode(fctx); err == nil {
			exitCode.Store(int32(code))
			send(shellFrame{Type: "exit", Code: code})
		}
		release()
		_ = conn.Close(websocket.StatusNormalClosure, "shell exited")
		cancel()
	}()

	// An unattended shell is a standing hole: close it after idle of no traffic
	// in either direction.
	go func() {
		tick := idle / 4
		if tick > 15*time.Second {
			tick = 15 * time.Second
		}
		if tick < 10*time.Millisecond {
			tick = 10 * time.Millisecond
		}
		t := time.NewTicker(tick)
		defer t.Stop()
		for {
			select {
			case <-ctx.Done():
				return
			case <-t.C:
				if time.Since(time.Unix(0, lastActivity.Load())) > idle {
					fail(apierr.ShellIdleTimeout, map[string]any{"minutes": int(idle / time.Minute)})
					sh.Close()
					return
				}
			}
		}
	}()

	// browser → shell.
	for {
		typ, data, err := conn.Read(ctx)
		if err != nil {
			break
		}
		touch()
		switch typ {
		case websocket.MessageBinary:
			bytesIn.Add(int64(len(data)))
			if _, err := sh.Write(data); err != nil {
				cancel()
			}
		case websocket.MessageText:
			var msg terminalControlMessage
			if json.Unmarshal(data, &msg) == nil && msg.Type == "resize" && msg.Cols > 0 && msg.Rows > 0 {
				rctx, rcancel := context.WithTimeout(ctx, 3*time.Second)
				_ = sh.Resize(rctx, msg.Cols, msg.Rows)
				rcancel()
			}
		}
	}
	release() // the session is over as far as the cap is concerned; don't wait for the unwinding below
	sh.Close()
	select {
	case <-pumped:
	case <-time.After(2 * time.Second):
	}
	slog.Info("container shell closed", "container", name, "username", sess.Username,
		"duration", time.Since(started).Round(time.Second), "bytesIn", bytesIn.Load(), "bytesOut", bytesOut.Load(), "exitCode", exitCode.Load())
}

type settingsContainerShellRequest struct {
	Enabled  bool   `json:"enabled"`
	Password string `json:"password"`
}

// handleSettingsContainerShell flips containerShell.enabled. Turning a shell
// on for every container is the biggest privilege step in the Docker page, so
// like the host terminal an active session isn't enough: the caller's own
// dashboard password again (403, not 401 — see handlers_settings.go), then the
// same restart-and-reload, since the WebSocket route is registered once at
// startup.
func (s *Server) handleSettingsContainerShell(w http.ResponseWriter, r *http.Request) {
	var req settingsContainerShellRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}
	if err := config.SetContainerShellEnabled(s.deps.ConfigPath, req.Enabled); err != nil {
		writeJSONError(w, http.StatusInternalServerError, apierr.ContainerShellToggleFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	slog.Info("settings: containerShell.enabled diubah, restart", "enabled", req.Enabled, "username", sess.Username)
	writeJSON(w, http.StatusOK, map[string]bool{"enabled": req.Enabled})

	go func() {
		time.Sleep(700 * time.Millisecond)
		s.exit(0)
	}()
}
