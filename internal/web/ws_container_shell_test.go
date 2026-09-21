package web

import (
	"context"
	"encoding/json"
	"io"
	"net"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"sync"
	"sync/atomic"
	"testing"
	"time"

	"nhooyr.io/websocket"

	"github.com/tarkiman/taros/internal/auth"
	"github.com/tarkiman/taros/internal/docker"
)

// ---- a fake Docker engine that speaks exec + the Upgrade stream -------------

type shellEngine struct {
	mu      sync.Mutex
	resizes []string
	creates int
}

func newShellEngine(t *testing.T) (*docker.Client, *shellEngine) {
	t.Helper()
	e := &shellEngine{}
	mux := http.NewServeMux()
	mux.HandleFunc("GET /containers/{id}/json", func(w http.ResponseWriter, r *http.Request) {
		if r.PathValue("id") == "missing" {
			w.WriteHeader(http.StatusNotFound)
			_, _ = w.Write([]byte(`{"message":"No such container"}`))
			return
		}
		_ = json.NewEncoder(w).Encode(map[string]any{"Name": "/" + r.PathValue("id")})
	})
	mux.HandleFunc("POST /containers/{id}/exec", func(w http.ResponseWriter, r *http.Request) {
		if r.PathValue("id") == "stopped" {
			w.WriteHeader(http.StatusConflict)
			_, _ = w.Write([]byte(`{"message":"Container is not running"}`))
			return
		}
		e.mu.Lock()
		e.creates++
		e.mu.Unlock()
		// the container's name travels in the exec id so /start knows which behaviour to play
		w.WriteHeader(http.StatusCreated)
		_, _ = w.Write([]byte(`{"Id":"` + r.PathValue("id") + `"}`))
	})
	mux.HandleFunc("POST /exec/{id}/resize", func(w http.ResponseWriter, r *http.Request) {
		e.mu.Lock()
		e.resizes = append(e.resizes, r.URL.RawQuery)
		e.mu.Unlock()
	})
	mux.HandleFunc("GET /exec/{id}/json", func(w http.ResponseWriter, r *http.Request) {
		code := 5 // what the "shell" returns after `exit`
		if r.PathValue("id") == "noshell" {
			code = 127
		}
		_ = json.NewEncoder(w).Encode(map[string]any{"ExitCode": code, "Running": false})
	})
	mux.HandleFunc("POST /exec/{id}/start", func(w http.ResponseWriter, r *http.Request) {
		conn, rw, err := w.(http.Hijacker).Hijack()
		if err != nil {
			return
		}
		defer conn.Close()
		hs := "HTTP/1.1 101 UPGRADED\r\nContent-Type: application/vnd.docker.raw-stream\r\nConnection: Upgrade\r\nUpgrade: tcp\r\n\r\n"
		if r.PathValue("id") == "noshell" {
			_, _ = io.CopyN(io.Discard, rw, r.ContentLength)
			_, _ = conn.Write([]byte(hs + "OCI runtime exec failed: exec failed: unable to start container process: exec: \"sh\": executable file not found in $PATH\r\n"))
			return
		}
		_, _ = conn.Write([]byte(hs))
		_, _ = io.CopyN(io.Discard, rw, r.ContentLength) // the daemon consumes the request body; only the stream remains
		buf := make([]byte, 256)
		for {
			n, err := rw.Read(buf)
			if n > 0 {
				_, _ = conn.Write(buf[:n])
				if strings.Contains(string(buf[:n]), "exit") {
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
	return docker.NewClient(sock), e
}

type shellRig struct {
	t      *testing.T
	s      *Server
	ts     *httptest.Server
	engine *shellEngine
	exits  chan int
}

func newShellRig(t *testing.T, mod func(*Deps)) *shellRig {
	t.Helper()
	cl, eng := newShellEngine(t)
	credPath := filepath.Join(t.TempDir(), "credentials.yaml")
	if err := auth.SaveCredentials(credPath, "tester", "correct-horse-1"); err != nil {
		t.Fatal(err)
	}
	creds, err := auth.LoadCredentials(credPath)
	if err != nil {
		t.Fatal(err)
	}
	cfgPath := filepath.Join(t.TempDir(), "config.yaml")
	if err := os.WriteFile(cfgPath, []byte("docker:\n  enabled: true\n\ncontainerShell:\n  enabled: false\n  idleTimeoutMin: 15\n"), 0o644); err != nil {
		t.Fatal(err)
	}
	deps := Deps{Docker: cl, DockerEnabled: true, ContainerShellEnabled: true, ContainerShellIdle: time.Minute, ContainerShellMax: 2, Creds: creds, ConfigPath: cfgPath}
	if mod != nil {
		mod(&deps)
	}
	s := NewServer(deps)
	r := &shellRig{t: t, s: s, engine: eng, exits: make(chan int, 4)}
	s.exit = func(code int) { r.exits <- code }

	// The real routes sit behind requireAuth; here a session is injected so the
	// handlers themselves can be driven without the login machinery.
	withSession := func(h http.HandlerFunc) http.HandlerFunc {
		return func(w http.ResponseWriter, req *http.Request) {
			ctx := context.WithValue(req.Context(), sessionCtxKey{}, &auth.Session{Username: "tester"})
			h(w, req.WithContext(ctx))
		}
	}
	mux := http.NewServeMux()
	mux.HandleFunc("GET /shell/{id}", withSession(s.handleContainerShellWS))
	mux.HandleFunc("POST /toggle", withSession(s.handleSettingsContainerShell))
	mux.HandleFunc("GET /status", withSession(s.handleContainerShellStatus))
	r.ts = httptest.NewServer(mux)
	t.Cleanup(r.ts.Close)
	return r
}

func (r *shellRig) dial(id string) *websocket.Conn {
	r.t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()
	c, _, err := websocket.Dial(ctx, "ws"+strings.TrimPrefix(r.ts.URL, "http")+"/shell/"+id, nil)
	if err != nil {
		r.t.Fatalf("dial %s: %v", id, err)
	}
	r.t.Cleanup(func() { _ = c.CloseNow() })
	return c
}

type frame struct {
	typ  websocket.MessageType
	text shellFrame
	raw  string
}

func next(t *testing.T, c *websocket.Conn) (frame, error) {
	t.Helper()
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	typ, data, err := c.Read(ctx)
	if err != nil {
		return frame{}, err
	}
	f := frame{typ: typ, raw: string(data)}
	if typ == websocket.MessageText {
		_ = json.Unmarshal(data, &f.text)
	}
	return f, nil
}

func expectError(t *testing.T, c *websocket.Conn, code string) shellFrame {
	t.Helper()
	f, err := next(t, c)
	if err != nil {
		t.Fatalf("waiting for error %q: %v", code, err)
	}
	if f.typ != websocket.MessageText || f.text.Type != "error" || f.text.Code != code {
		t.Fatalf("frame = %+v, want error %q", f, code)
	}
	// After an error the server must close the socket (reading the close frame also answers it).
	if g, err := next(t, c); err == nil {
		t.Fatalf("socket still open after error %q, got another frame %+v", code, g)
	}
	return f.text
}

// ---- the session -------------------------------------------------------------

func TestShellRoundTripResizeAndExit(t *testing.T) {
	r := newShellRig(t, nil)
	c := r.dial("app-1")

	f, err := next(t, c)
	if err != nil || f.text.Type != "ready" || f.text.Container != "app-1" {
		t.Fatalf("first frame = %+v err=%v, want ready for app-1", f, err)
	}
	// keystrokes in, echo out
	if err := c.Write(t.Context(), websocket.MessageBinary, []byte("ls -la\n")); err != nil {
		t.Fatal(err)
	}
	if f, err := next(t, c); err != nil || f.typ != websocket.MessageBinary || !strings.Contains(f.raw, "ls -la") {
		t.Fatalf("echo = %+v err=%v", f, err)
	}
	// resize frame reaches the engine, rows/cols in the right order
	_ = c.Write(t.Context(), websocket.MessageText, []byte(`{"type":"resize","cols":132,"rows":43}`))
	deadline := time.Now().Add(2 * time.Second)
	for time.Now().Before(deadline) {
		r.engine.mu.Lock()
		got := strings.Join(r.engine.resizes, " ")
		r.engine.mu.Unlock()
		if strings.Contains(got, "h=43&w=132") {
			break
		}
		time.Sleep(5 * time.Millisecond)
	}
	r.engine.mu.Lock()
	if !strings.Contains(strings.Join(r.engine.resizes, " "), "h=43&w=132") {
		t.Fatalf("resize not forwarded: %v", r.engine.resizes)
	}
	r.engine.mu.Unlock()
	// a malformed / zero-size resize must not reach the engine
	before := len(r.engine.resizes)
	_ = c.Write(t.Context(), websocket.MessageText, []byte(`{"type":"resize","cols":0,"rows":0}`))
	_ = c.Write(t.Context(), websocket.MessageText, []byte(`not json`))
	time.Sleep(50 * time.Millisecond)
	if len(r.engine.resizes) != before {
		t.Fatalf("bogus resize frames were forwarded: %v", r.engine.resizes)
	}

	// exit → the shell's exit code arrives as a frame, then the socket closes
	_ = c.Write(t.Context(), websocket.MessageBinary, []byte("exit\n"))
	var sawExit bool
	for i := 0; i < 5 && !sawExit; i++ {
		f, err := next(t, c)
		if err != nil {
			break
		}
		if f.typ == websocket.MessageText && f.text.Type == "exit" {
			sawExit = true
			if f.text.Code != float64(5) {
				t.Fatalf("exit code = %v, want 5", f.text.Code)
			}
		}
	}
	if !sawExit {
		t.Fatal("no exit frame")
	}
}

func TestShellErrorsArriveAsFramesNotAFailedHandshake(t *testing.T) {
	r := newShellRig(t, nil)
	for id, code := range map[string]string{
		"stopped": "docker_shell_not_running",
		"missing": "docker_shell_not_found",
	} {
		c := r.dial(id) // the handshake itself must succeed, or the browser would never see why
		expectError(t, c, code)
	}

	// No shell in the image: the daemon still answers the start with 101, so the
	// socket first reports "ready" and only then the failure — and the runtime's
	// raw "OCI runtime exec failed…" text must never be painted into the terminal.
	c := r.dial("noshell")
	if f, err := next(t, c); err != nil || f.text.Type != "ready" {
		t.Fatalf("noshell first frame = %+v err=%v", f, err)
	}
	f, err := next(t, c)
	if err != nil {
		t.Fatal(err)
	}
	if f.typ == websocket.MessageBinary {
		t.Fatalf("the runtime's error text leaked into the terminal stream: %q", f.raw)
	}
	if f.text.Type != "error" || f.text.Code != "docker_shell_no_shell" {
		t.Fatalf("frame = %+v, want docker_shell_no_shell", f)
	}
}

func TestShellSessionCapAndSlotRelease(t *testing.T) {
	r := newShellRig(t, func(d *Deps) { d.ContainerShellMax = 1 })
	first := r.dial("app-1")
	if f, _ := next(t, first); f.text.Type != "ready" {
		t.Fatalf("first: %+v", f)
	}

	second := r.dial("app-1")
	if p := expectError(t, second, "docker_shell_too_many_sessions"); p.Params["max"] != float64(1) {
		t.Fatalf("params = %v", p.Params)
	}

	// Closing the first frees the slot...
	_ = first.Write(t.Context(), websocket.MessageBinary, []byte("exit\n"))
	_ = first.CloseNow()
	deadline := time.Now().Add(3 * time.Second)
	var third *websocket.Conn
	for time.Now().Before(deadline) {
		c := r.dial("app-1")
		f, err := next(t, c)
		if err == nil && f.text.Type == "ready" {
			third = c
			break
		}
		_ = c.CloseNow()
		time.Sleep(20 * time.Millisecond)
	}
	if third == nil {
		t.Fatal("the slot was never released after the first session ended (leaked)")
	}
	_ = third.CloseNow()
	waitZero := func() {
		for i := 0; i < 300 && r.s.shellSessions.Load() != 0; i++ {
			time.Sleep(10 * time.Millisecond)
		}
	}
	waitZero()

	// ...and a *failed* start must not leak one either.
	for i := 0; i < 3; i++ {
		expectError(t, r.dial("stopped"), "docker_shell_not_running")
	}
	deadline = time.Now().Add(3 * time.Second)
	ok := false
	for time.Now().Before(deadline) && !ok {
		c := r.dial("app-1")
		if f, err := next(t, c); err == nil && f.text.Type == "ready" {
			ok = true
		}
		_ = c.CloseNow()
		time.Sleep(20 * time.Millisecond)
	}
	if !ok {
		t.Fatal("failed starts leaked session slots")
	}
	if n := r.s.shellSessions.Load(); n != 0 {
		// give the last handler a moment to unwind
		time.Sleep(200 * time.Millisecond)
		if n = r.s.shellSessions.Load(); n != 0 {
			t.Fatalf("session counter = %d after everything closed, want 0", n)
		}
	}
}

func TestShellIdleTimeoutClosesAnUnattendedSession(t *testing.T) {
	r := newShellRig(t, func(d *Deps) { d.ContainerShellIdle = 250 * time.Millisecond })
	c := r.dial("app-1")
	if f, _ := next(t, c); f.text.Type != "ready" {
		t.Fatalf("first: %+v", f)
	}
	expectError(t, c, "docker_shell_idle_timeout") // no traffic → closed

	// Activity keeps it alive: keystrokes every 60 ms for ~0.9 s (well beyond the 250 ms idle limit).
	c2 := r.dial("app-1")
	if f, _ := next(t, c2); f.text.Type != "ready" {
		t.Fatalf("second: %+v", f)
	}
	stop := time.Now().Add(900 * time.Millisecond)
	for time.Now().Before(stop) {
		if err := c2.Write(t.Context(), websocket.MessageBinary, []byte("x")); err != nil {
			t.Fatalf("session died despite activity: %v", err)
		}
		f, err := next(t, c2) // the echo also counts as traffic
		if err != nil {
			t.Fatalf("session died despite activity: %v", err)
		}
		if f.typ == websocket.MessageText && f.text.Type == "error" {
			t.Fatalf("idle-timeout fired on a session that was in use: %+v", f)
		}
		time.Sleep(60 * time.Millisecond)
	}
}

func TestShellRejectsACrossOriginHandshake(t *testing.T) {
	r := newShellRig(t, nil)
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()
	c, resp, err := websocket.Dial(ctx, "ws"+strings.TrimPrefix(r.ts.URL, "http")+"/shell/app-1", &websocket.DialOptions{
		HTTPHeader: http.Header{"Origin": []string{"https://evil.example"}},
	})
	if err == nil {
		_ = c.CloseNow()
		t.Fatal("a WebSocket opened from another origin must be refused (cross-site WebSocket hijacking)")
	}
	if resp == nil || resp.StatusCode != http.StatusForbidden {
		t.Fatalf("resp = %+v err=%v, want 403", resp, err)
	}
	if r.engine.creates != 0 {
		t.Fatal("no exec may be created for a rejected handshake")
	}
}

// ---- routing, status, toggle ---------------------------------------------------

func TestShellRouteExistsOnlyWhenEnabled(t *testing.T) {
	probe := func(enabled, dockerOn bool) (ws, status, toggle int) {
		s := NewServer(Deps{ContainerShellEnabled: enabled, DockerEnabled: dockerOn, Sessions: auth.NewSessionStore(time.Minute)})
		h := s.Handler()
		do := func(method, path string) int {
			rec := httptest.NewRecorder()
			h.ServeHTTP(rec, httptest.NewRequest(method, path, nil))
			return rec.Code
		}
		return do("GET", "/api/docker/containers/abc/shell/ws"), do("GET", "/api/docker/shell/status"), do("POST", "/api/settings/container-shell")
	}
	// Unauthenticated: a registered route redirects to /login (303), an absent one is a plain 404.
	if ws, st, tg := probe(true, true); ws != http.StatusSeeOther || st != http.StatusSeeOther || tg != http.StatusSeeOther {
		t.Fatalf("enabled: ws=%d status=%d toggle=%d, all should be auth-gated (303)", ws, st, tg)
	}
	if ws, st, tg := probe(false, true); ws != http.StatusNotFound || st != http.StatusSeeOther || tg != http.StatusSeeOther {
		t.Fatalf("disabled: ws=%d (want 404: the route must not exist), status=%d toggle=%d (want 303: always available)", ws, st, tg)
	}
	if ws, _, _ := probe(true, false); ws != http.StatusNotFound {
		t.Fatalf("shell enabled but Docker off: ws=%d, want 404", ws)
	}
}

func TestShellStatusReportsTheLimits(t *testing.T) {
	r := newShellRig(t, func(d *Deps) { d.ContainerShellIdle = 20 * time.Minute; d.ContainerShellMax = 3 })
	resp, err := http.Get(r.ts.URL + "/status")
	if err != nil {
		t.Fatal(err)
	}
	defer resp.Body.Close()
	var st struct {
		Enabled        bool `json:"enabled"`
		IdleTimeoutMin int  `json:"idleTimeoutMin"`
		MaxSessions    int  `json:"maxSessions"`
	}
	_ = json.NewDecoder(resp.Body).Decode(&st)
	if !st.Enabled || st.IdleTimeoutMin != 20 || st.MaxSessions != 3 {
		t.Fatalf("status = %+v", st)
	}
}

func TestShellToggleNeedsThePasswordAndRestarts(t *testing.T) {
	r := newShellRig(t, nil)
	post := func(body string) int {
		resp, err := http.Post(r.ts.URL+"/toggle", "application/json", strings.NewReader(body))
		if err != nil {
			t.Fatal(err)
		}
		resp.Body.Close()
		return resp.StatusCode
	}
	cfg := func() string { b, _ := os.ReadFile(r.s.deps.ConfigPath); return string(b) }

	if code := post(`{"enabled":true,"password":"wrong"}`); code != http.StatusForbidden {
		t.Fatalf("wrong password → %d, want 403 (not 401: the session is fine)", code)
	}
	if strings.Contains(cfg(), "enabled: true\n  idle") {
		t.Fatalf("config changed on a wrong password:\n%s", cfg())
	}
	select {
	case <-r.exits:
		t.Fatal("restarted on a wrong password")
	case <-time.After(1000 * time.Millisecond):
	}

	if code := post(`{"enabled":true,"password":"correct-horse-1"}`); code != http.StatusOK {
		t.Fatalf("right password → %d", code)
	}
	if got := cfg(); !strings.Contains(got, "containerShell:\n  enabled: true") || !strings.Contains(got, "docker:\n  enabled: true") {
		t.Fatalf("config after enabling:\n%s", got)
	}
	select {
	case code := <-r.exits:
		if code != 0 {
			t.Fatalf("exit code = %d, want 0 (systemd restarts a clean exit)", code)
		}
	case <-time.After(3 * time.Second):
		t.Fatal("the service never restarted after the setting changed")
	}
}

func TestShellTogglePasswordCheckPrecedesEverything(t *testing.T) {
	r := newShellRig(t, nil)
	var restarted atomic.Bool
	r.s.exit = func(int) { restarted.Store(true) }
	resp, err := http.Post(r.ts.URL+"/toggle", "application/json", strings.NewReader(`{"enabled":true}`)) // no password at all
	if err != nil {
		t.Fatal(err)
	}
	resp.Body.Close()
	if resp.StatusCode != http.StatusForbidden {
		t.Fatalf("missing password → %d, want 403", resp.StatusCode)
	}
	time.Sleep(900 * time.Millisecond)
	if restarted.Load() {
		t.Fatal("restart triggered without a password")
	}
}

func TestAStuckClientCannotHoldASlot(t *testing.T) {
	// The server's close handshake waits (up to 5 s) for the peer's close frame.
	// A client that never reads must not be able to sit on a session slot for that
	// long — with a cap of 1 it would lock every other user out.
	r := newShellRig(t, func(d *Deps) { d.ContainerShellMax = 1 })
	stuck := r.dial("stopped") // fails right after taking the slot; we deliberately never read from it
	_ = stuck

	deadline := time.Now().Add(2 * time.Second) // far less than the 5 s close timeout
	var ok bool
	for time.Now().Before(deadline) && !ok {
		c := r.dial("app-1")
		if f, err := next(t, c); err == nil && f.text.Type == "ready" {
			ok = true
		}
		_ = c.CloseNow()
		time.Sleep(20 * time.Millisecond)
	}
	if !ok {
		t.Fatal("a client that never answers the close handshake held the only session slot")
	}
}
