package web

import (
	"encoding/json"
	"log/slog"
	"net"
	"net/http"
	"os"
	"strconv"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/config"
)

type settingsTerminalRequest struct {
	Enabled  bool   `json:"enabled"`
	Password string `json:"password"`
}

// handleSettingsTerminal flips terminal.enabled in config.yaml, then exits
// so systemd (Restart=always) brings the process back up reading the new
// value — same restart-and-reload mechanism as self-update
// (handlers_update.go), reused here rather than trying to re-register
// routes on a live *http.ServeMux (net/http's ServeMux has no supported
// way to unregister a pattern, and even if it did, docs/07-security.md
// §7.6 wants the WS route genuinely absent when off, not just gated).
//
// Requires re-entering the dashboard password even though the caller
// already has a valid session — this flips the single highest-risk
// feature in the app (real shell access), so a stolen/left-open session
// alone shouldn't be enough, matching the "conscious yes" bar the
// install-time docker-group/root-mode prompts already hold toggling
// privilege to.
func (s *Server) handleSettingsTerminal(w http.ResponseWriter, r *http.Request) {
	var req settingsTerminalRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}

	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		// 403, not 401: the session itself is still valid (this is a
		// re-confirmation, not the original login) — api/client.ts
		// treats any 401 as "session expired" and force-redirects to
		// /login, which would be wrong here (wipes the in-progress form,
		// confusing after just typing the *dashboard* password correctly
		// moments ago to even load this page).
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}

	if err := config.SetTerminalEnabled(s.deps.ConfigPath, req.Enabled); err != nil {
		writeJSONError(w, http.StatusInternalServerError, apierr.TerminalToggleFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}

	slog.Info("settings: terminal.enabled diubah, restart", "enabled", req.Enabled, "username", sess.Username)
	writeJSON(w, http.StatusOK, map[string]bool{"enabled": req.Enabled})

	go func() {
		time.Sleep(700 * time.Millisecond)
		os.Exit(0)
	}()
}

type settingsPortRequest struct {
	Port     int    `json:"port"`
	Password string `json:"password"`
}

// handleSettingsPortStatus is always registered, same "let the UI show a
// clear current state" reasoning as terminal/status — this one just
// reflects deps.Listen, no gating needed since the value isn't sensitive.
func (s *Server) handleSettingsPortStatus(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]string{"listen": s.deps.Listen})
}

// handleSettingsPort changes the port half of server.listen — same
// restart-and-reload mechanism and password re-confirmation as
// handleSettingsTerminal above (getting this wrong can lock someone out
// of the dashboard entirely, same stakes as flipping terminal access).
//
// The one thing this handler has that the terminal toggle doesn't need:
// a test-bind before writing anything. Without it, a typo'd or
// already-in-use port would only surface *after* the restart, as a
// service that's now crash-looping with no dashboard left to fix it
// from — considerably worse than a 409 in the response the user is
// still looking at. This isn't a perfect guarantee (something else could
// grab the port in the gap between the test-bind closing and the actual
// restart binding it for real), but it catches the common cases — typos,
// picking a port something else already owns, privileged ports without
// the capability to bind them — before they become an unrecoverable
// state.
func (s *Server) handleSettingsPort(w http.ResponseWriter, r *http.Request) {
	var req settingsPortRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	if req.Port < 1 || req.Port > 65535 {
		writeJSONError(w, http.StatusBadRequest, apierr.PortRangeInvalid, "port harus antara 1-65535", nil)
		return
	}

	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		// 403, not 401 — see handleSettingsTerminal above for why.
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}

	host, _, err := net.SplitHostPort(s.deps.Listen)
	if err != nil {
		host = "0.0.0.0"
	}
	newListen := net.JoinHostPort(host, strconv.Itoa(req.Port))

	ln, err := net.Listen("tcp", newListen)
	if err != nil {
		writeJSONError(w, http.StatusConflict, apierr.PortUnavailable, "port "+strconv.Itoa(req.Port)+" tidak bisa dipakai: "+err.Error(), map[string]any{"port": req.Port, "detail": err.Error()})
		return
	}
	ln.Close()

	if err := config.SetServerListen(s.deps.ConfigPath, newListen); err != nil {
		writeJSONError(w, http.StatusInternalServerError, apierr.PortChangeFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}

	slog.Info("settings: server.listen diubah, restart", "listen", newListen, "username", sess.Username)
	writeJSON(w, http.StatusOK, map[string]string{"listen": newListen})

	go func() {
		time.Sleep(700 * time.Millisecond)
		os.Exit(0)
	}()
}
