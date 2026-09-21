package docker

import (
	"context"
	"encoding/json"
	"errors"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"
)

// fakeExecEngine serves the Engine's exec endpoints, including the raw
// Upgrade-to-TCP stream on /exec/{id}/start, and records what it was asked.
type fakeExecEngine struct {
	mu       sync.Mutex
	creates  []map[string]any
	resizes  []string
	startHdr http.Header
	startBad string // if set, /start answers 500 with this body instead of upgrading
	mode     string // "shell" | "noshell" | "banner"
	exit     int
}

func newExecEngine(t *testing.T) (*Client, *fakeExecEngine) {
	t.Helper()
	f := &fakeExecEngine{mode: "shell"}
	mux := http.NewServeMux()
	mux.HandleFunc("POST /containers/{id}/exec", func(w http.ResponseWriter, r *http.Request) {
		switch r.PathValue("id") {
		case "stopped":
			w.WriteHeader(http.StatusConflict)
			_, _ = w.Write([]byte(`{"message":"Container stopped is not running"}`))
			return
		case "missing":
			w.WriteHeader(http.StatusNotFound)
			_, _ = w.Write([]byte(`{"message":"No such container: missing"}`))
			return
		}
		var body map[string]any
		_ = json.NewDecoder(r.Body).Decode(&body)
		f.mu.Lock()
		f.creates = append(f.creates, body)
		f.mu.Unlock()
		w.WriteHeader(http.StatusCreated)
		_, _ = w.Write([]byte(`{"Id":"exec123"}`))
	})
	mux.HandleFunc("POST /exec/{id}/resize", func(w http.ResponseWriter, r *http.Request) {
		f.mu.Lock()
		f.resizes = append(f.resizes, r.URL.RawQuery)
		f.mu.Unlock()
		w.WriteHeader(http.StatusOK)
	})
	mux.HandleFunc("GET /exec/{id}/json", func(w http.ResponseWriter, r *http.Request) {
		f.mu.Lock()
		code := f.exit
		f.mu.Unlock()
		_ = json.NewEncoder(w).Encode(map[string]any{"ExitCode": code, "Running": false})
	})
	mux.HandleFunc("POST /exec/{id}/start", func(w http.ResponseWriter, r *http.Request) {
		f.mu.Lock()
		f.startHdr = r.Header.Clone()
		bad, mode := f.startBad, f.mode
		f.mu.Unlock()
		if bad != "" {
			w.WriteHeader(http.StatusInternalServerError)
			_, _ = w.Write([]byte(bad))
			return
		}
		conn, rw, err := w.(http.Hijacker).Hijack()
		if err != nil {
			return
		}
		defer conn.Close()
		hs := "HTTP/1.1 101 UPGRADED\r\nContent-Type: application/vnd.docker.raw-stream\r\nConnection: Upgrade\r\nUpgrade: tcp\r\n\r\n"
		switch mode {
		case "noshell":
			_, _ = conn.Write([]byte(hs + "OCI runtime exec failed: exec failed: unable to start container process: exec: \"sh\": executable file not found in $PATH\r\n"))
			return
		case "banner":
			// stream bytes in the SAME write as the handshake: they end up inside the
			// client's bufio buffer, and must not be lost.
			_, _ = conn.Write([]byte(hs + "welcome banner\r\n"))
		default:
			_, _ = conn.Write([]byte(hs))
		}
		buf := make([]byte, 256)
		for {
			n, err := rw.Read(buf)
			if n > 0 {
				_, _ = conn.Write(buf[:n]) // a tty echoes what it is typed, byte for byte
				if strings.Contains(strings.ToLower(string(buf[:n])), "exit") {
					return
				}
			}
			if err != nil {
				return
			}
		}
	})
	dir, _ := filepath.Abs(t.TempDir())
	sock := filepath.Join(dir, "d.sock")
	l, err := net.Listen("unix", sock)
	if err != nil {
		t.Skipf("unix socket unavailable: %v", err)
	}
	srv := httptest.NewUnstartedServer(mux)
	srv.Listener = l
	srv.Start()
	t.Cleanup(srv.Close)
	return NewClient(sock), f
}

func readSome(t *testing.T, s *ExecSession, want string) string {
	t.Helper()
	var got strings.Builder
	buf := make([]byte, 128)
	deadline := time.Now().Add(3 * time.Second)
	for !strings.Contains(got.String(), want) && time.Now().Before(deadline) {
		_ = s.conn.SetReadDeadline(time.Now().Add(500 * time.Millisecond))
		n, err := s.Read(buf)
		got.Write(buf[:n])
		if err != nil && !strings.Contains(err.Error(), "timeout") {
			break
		}
	}
	_ = s.conn.SetReadDeadline(time.Time{})
	return got.String()
}

func TestExecShellOpensAnInteractiveTTY(t *testing.T) {
	c, f := newExecEngine(t)
	s, err := c.ExecShell(t.Context(), "app-1", 100, 30)
	if err != nil {
		t.Fatal(err)
	}
	defer s.Close()

	// What was asked of the engine: a TTY, stdin/stdout attached, the bash-or-sh wrapper, a real TERM.
	body := f.creates[0]
	if body["Tty"] != true || body["AttachStdin"] != true || body["AttachStdout"] != true {
		t.Fatalf("create body = %v", body)
	}
	cmd, _ := body["Cmd"].([]any)
	if len(cmd) != 3 || cmd[0] != "sh" || !strings.Contains(cmd[2].(string), "command -v bash") {
		t.Fatalf("Cmd = %v", cmd)
	}
	env := strings.Join(toStrings(body["Env"]), " ")
	if !strings.Contains(env, "TERM=xterm-256color") {
		t.Fatalf("Env = %v", env)
	}
	// COLUMNS/LINES would override the pty's real size in busybox/ncurses and go stale on the first resize.
	if strings.Contains(env, "COLUMNS") || strings.Contains(env, "LINES") {
		t.Fatalf("Env pins a terminal size that will go stale: %v", env)
	}
	// The stream request must have asked for the Upgrade — that is what turns it into a raw socket.
	if f.startHdr.Get("Upgrade") != "tcp" || !strings.Contains(strings.ToLower(f.startHdr.Get("Connection")), "upgrade") {
		t.Fatalf("start headers = %v", f.startHdr)
	}
	// Initial size pushed to the pty (h=rows&w=cols).
	if len(f.resizes) != 1 || f.resizes[0] != "h=30&w=100" {
		t.Fatalf("resizes = %v", f.resizes)
	}

	// Bytes flow both ways.
	if _, err := s.Write([]byte("echo hi\n")); err != nil {
		t.Fatal(err)
	}
	if out := readSome(t, s, "echo hi"); !strings.Contains(out, "echo hi") {
		t.Fatalf("no echo, got %q", out)
	}

	// Later resizes are forwarded, rows/cols in the right order.
	if err := s.Resize(t.Context(), 120, 40); err != nil {
		t.Fatal(err)
	}
	if got := f.resizes[len(f.resizes)-1]; got != "h=40&w=120" {
		t.Fatalf("resize query = %q", got)
	}
}

func toStrings(v any) []string {
	var out []string
	for _, x := range v.([]any) {
		out = append(out, x.(string))
	}
	return out
}

func TestBytesArrivingWithTheHandshakeAreNotLost(t *testing.T) {
	c, f := newExecEngine(t)
	f.mode = "banner"
	s, err := c.ExecShell(t.Context(), "app-1", 80, 24)
	if err != nil {
		t.Fatal(err)
	}
	defer s.Close()
	if out := readSome(t, s, "welcome banner"); !strings.Contains(out, "welcome banner") {
		t.Fatalf("banner sent in the same packet as the 101 was dropped: %q", out)
	}
}

func TestExecErrors(t *testing.T) {
	c, f := newExecEngine(t)
	if _, err := c.ExecShell(t.Context(), "stopped", 80, 24); !errors.Is(err, ErrNotRunning) {
		t.Fatalf("stopped container: %v, want ErrNotRunning", err)
	}
	_, err := c.ExecShell(t.Context(), "missing", 80, 24)
	var api *APIError
	if !errors.As(err, &api) || api.StatusCode != 404 {
		t.Fatalf("missing container: %v, want a 404 APIError", err)
	}
	// Defensive: a daemon that refuses the start outright with the runtime message.
	f.startBad = `{"message":"OCI runtime exec failed: exec: \"sh\": executable file not found in $PATH"}`
	if _, err := c.ExecShell(t.Context(), "app-1", 80, 24); !errors.Is(err, ErrNoShell) {
		t.Fatalf("start refused for a missing shell: %v, want ErrNoShell", err)
	}
	f.startBad = `{"message":"cgroup out of memory"}`
	if _, err := c.ExecShell(t.Context(), "app-1", 80, 24); err == nil || errors.Is(err, ErrNoShell) {
		t.Fatalf("any other start failure must surface as itself, got %v", err)
	}
}

func TestNoShellIsRecognisedAfterTheStreamEnds(t *testing.T) {
	// The real daemon answers 101 even when no shell exists; the failure is the
	// runtime message on the stream plus exit code 127.
	c, f := newExecEngine(t)
	f.mode, f.exit = "noshell", 127
	s, err := c.ExecShell(t.Context(), "app-1", 80, 24)
	if err != nil {
		t.Fatalf("start itself succeeds: %v", err)
	}
	defer s.Close()
	_, _ = io.ReadAll(s)
	if err := s.Failure(t.Context()); !errors.Is(err, ErrNoShell) {
		t.Fatalf("Failure = %v, want ErrNoShell", err)
	}
}

func TestANormalExitIsNeverReportedAsAFailure(t *testing.T) {
	c, f := newExecEngine(t)
	f.exit = 7 // the user typed `exit 7`
	s, err := c.ExecShell(t.Context(), "app-1", 80, 24)
	if err != nil {
		t.Fatal(err)
	}
	defer s.Close()
	_, _ = s.Write([]byte("exit 7\n"))
	_, _ = io.ReadAll(s)
	if err := s.Failure(t.Context()); err != nil {
		t.Fatalf("a shell that ran and exited must not be a failure, got %v", err)
	}

	// And a shell that merely *printed* the words must not be mistaken for a failed start.
	f.exit = 0
	s2, err := c.ExecShell(t.Context(), "app-1", 80, 24)
	if err != nil {
		t.Fatal(err)
	}
	defer s2.Close()
	_, _ = s2.Write([]byte("echo executable file not found\nexit\n"))
	_, _ = io.ReadAll(s2)
	if err := s2.Failure(t.Context()); err != nil {
		t.Fatalf("output that only resembles the runtime error: %v", err)
	}
}

func TestExecShellHonoursItsContext(t *testing.T) {
	c, _ := newExecEngine(t)
	ctx, cancel := context.WithCancel(t.Context())
	cancel()
	if _, err := c.ExecShell(ctx, "app-1", 80, 24); err == nil {
		t.Fatal("a canceled context must not open a shell")
	}
}

func TestFailureNeedsBothTheRuntimeMessageAndAFailureExitCode(t *testing.T) {
	// Layer 1: exit 127 is what a user gets from `exit 127` — with the *words*
	// "executable file not found" merely typed by them, but without the
	// runtime's "OCI runtime exec failed" prefix, that must not read as "no shell".
	c, f := newExecEngine(t)
	f.exit = 127
	s, err := c.ExecShell(t.Context(), "app-1", 80, 24)
	if err != nil {
		t.Fatal(err)
	}
	defer s.Close()
	_, _ = s.Write([]byte("echo executable file not found; exit 127\n"))
	_, _ = io.ReadAll(s)
	if err := s.Failure(t.Context()); err != nil {
		t.Fatalf("no runtime prefix, must not be a failed start: %v", err)
	}

	// Layer 2: the runtime prefix *is* on the stream, but the shell then ran and
	// exited normally (exit 7) — e.g. the user echoed that text. Not a failed start.
	f.exit = 7
	s2, err := c.ExecShell(t.Context(), "app-1", 80, 24)
	if err != nil {
		t.Fatal(err)
	}
	defer s2.Close()
	_, _ = s2.Write([]byte("OCI runtime exec failed: exec: \"sh\": executable file not found\nexit\n"))
	_, _ = io.ReadAll(s2)
	if err := s2.Failure(t.Context()); err != nil {
		t.Fatalf("the exit code says it ran fine: %v", err)
	}
}
