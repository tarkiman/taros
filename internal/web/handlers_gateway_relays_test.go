package web

import (
	"context"
	"encoding/json"
	"io"
	"log/slog"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/tarkiman/taros/internal/auth"
	"github.com/tarkiman/taros/internal/gateway"
)

// fakeRelay is the slice of the go2rtc API the relay handlers use.
type fakeRelay struct {
	mu       sync.Mutex
	rtsp     string
	streams  map[string]string
	restarts int
}

func (f *fakeRelay) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	f.mu.Lock()
	defer f.mu.Unlock()
	switch {
	case r.URL.Path == "/api/config" && r.Method == http.MethodGet:
		io.WriteString(w, f.rtsp+"streams:\n")
		for k, v := range f.streams {
			io.WriteString(w, "  "+k+": \""+v+"\"\n")
		}
	case r.URL.Path == "/api/config" && r.Method == http.MethodPost:
		b, _ := io.ReadAll(r.Body)
		f.rtsp, _, _ = strings.Cut(string(b), "streams:")
	case r.URL.Path == "/api/streams" && r.Method == http.MethodPut:
		f.streams[r.URL.Query().Get("name")] = r.URL.Query().Get("src")
	case r.URL.Path == "/api/streams" && r.Method == http.MethodDelete:
		delete(f.streams, r.URL.Query().Get("src"))
	case r.URL.Path == "/api/restart":
		f.restarts++
	default:
		http.NotFound(w, r)
	}
}

func TestGatewayRelayHandlers(t *testing.T) {
	f := &fakeRelay{rtsp: "rtsp:\n  listen: \":8554\"\n  username: nvr\n  password: old-secret\n", streams: map[string]string{
		"cam1":   "rtsp://admin:cam-secret@192.168.1.14:8554/unicast",
		"xiaomi": "xiaomi://u:tok@10.0.0.9?did=1",
	}}
	g2r := httptest.NewServer(f)
	defer g2r.Close()

	dir := t.TempDir()
	credPath := filepath.Join(dir, "credentials.yaml")
	if err := auth.SaveCredentials(credPath, "alice", "alice-password-1"); err != nil {
		t.Fatal(err)
	}
	creds, _ := auth.LoadCredentials(credPath)
	mon := gateway.New(gateway.Config{Go2rtcURL: g2r.URL}, slog.Default())
	s := NewServer(Deps{Creds: creds, Sessions: auth.NewSessionStore(time.Hour), Gateway: mon})

	call := func(h http.HandlerFunc, method, path, name, body string) *httptest.ResponseRecorder {
		req := httptest.NewRequest(method, path, strings.NewReader(body))
		req = req.WithContext(context.WithValue(req.Context(), sessionCtxKey{}, &auth.Session{Username: "alice"}))
		if name != "" {
			req.SetPathValue("name", name)
		}
		w := httptest.NewRecorder()
		h(w, req)
		return w
	}

	// List: no password anywhere in the answer.
	w := call(s.handleGatewayRelays, "GET", "/api/gateway/relays", "", "")
	if w.Code != 200 || strings.Contains(w.Body.String(), "secret") || strings.Contains(w.Body.String(), "tok") {
		t.Fatalf("list %d: %s", w.Code, w.Body)
	}
	var rc gatewayRelaysResponse
	json.Unmarshal(w.Body.Bytes(), &rc)
	if len(rc.Streams) != 2 || !rc.Streams[0].Editable || rc.Streams[1].Reason != "xiaomi" || !rc.RTSP.HasPassword {
		t.Fatalf("list: %+v", rc)
	}

	for body, want := range map[string]int{
		`{"name":"Bad Name","source":{"url":"rtsp://192.168.1.20/s"}}`:                                          400,
		`{"name":"garasi","source":{"url":"rtsp://8.8.8.8/s"}}`:                                                 400,
		`{"name":"cam1","source":{"url":"rtsp://192.168.1.20/s"}}`:                                              409,
		`{"name":"garasi","source":{"url":"rtsp://192.168.1.20/stream1","username":"admin","password":"p@ss"}}`: 201,
	} {
		if c := call(s.handleGatewayRelayCreate, "POST", "/api/gateway/relays", "", body).Code; c != want {
			t.Errorf("create %s = %d, want %d", body, c, want)
		}
	}
	if f.streams["garasi"] != "rtsp://admin:p%40ss@192.168.1.20/stream1" {
		t.Fatalf("created source: %q", f.streams["garasi"])
	}

	// Edit without a password keeps the camera's password.
	if c := call(s.handleGatewayRelayUpdate, "PUT", "/api/gateway/relays/cam1", "cam1", `{"source":{"url":"rtsp://192.168.1.15:8554/unicast","username":"admin"}}`).Code; c != 200 {
		t.Fatalf("update = %d", c)
	}
	if f.streams["cam1"] != "rtsp://admin:cam-secret@192.168.1.15:8554/unicast" {
		t.Fatalf("updated source: %q", f.streams["cam1"])
	}
	if c := call(s.handleGatewayRelayUpdate, "PUT", "/api/gateway/relays/xiaomi", "xiaomi", `{"source":{"url":"rtsp://192.168.1.16/x"}}`).Code; c != 409 {
		t.Fatalf("update locked = %d", c)
	}
	if c := call(s.handleGatewayRelayDelete, "DELETE", "/api/gateway/relays/garasi", "garasi", "").Code; c != 204 {
		t.Fatalf("delete = %d", c)
	}
	if c := call(s.handleGatewayRelayDelete, "DELETE", "/api/gateway/relays/garasi", "garasi", "").Code; c != 404 {
		t.Fatalf("delete again = %d", c)
	}

	// RTSP login rotation: dashboard password first, then a new password once.
	if c := call(s.handleGatewayRTSPLogin, "POST", "/api/gateway/rtsp-login", "", `{"password":"wrong"}`).Code; c != 403 || f.restarts != 0 {
		t.Fatalf("rotation with wrong password = %d (restarts %d)", c, f.restarts)
	}
	w = call(s.handleGatewayRTSPLogin, "POST", "/api/gateway/rtsp-login", "", `{"password":"alice-password-1"}`)
	var rot struct {
		Username string            `json:"username"`
		Password string            `json:"password"`
		URLs     map[string]string `json:"urls"`
	}
	json.Unmarshal(w.Body.Bytes(), &rot)
	if w.Code != 200 || f.restarts != 1 || rot.Username != "nvr" || len(rot.Password) != 24 || !strings.Contains(f.rtsp, rot.Password) {
		t.Fatalf("rotation %d: %+v restarts=%d", w.Code, rot, f.restarts)
	}
	if u := rot.URLs["cam1"]; !strings.HasPrefix(u, "rtsp://nvr:"+rot.Password+"@") || !strings.HasSuffix(u, ":8554/cam1") {
		t.Fatalf("nvr url: %q", u)
	}
	if w.Header().Get("Cache-Control") != "no-store" {
		t.Error("rotation answer may be cached")
	}

	// Gateway off: every relay endpoint answers 409.
	off := NewServer(Deps{Creds: creds, Sessions: auth.NewSessionStore(time.Hour)})
	if c := call(off.handleGatewayRelays, "GET", "/api/gateway/relays", "", "").Code; c != 409 {
		t.Fatalf("disabled = %d", c)
	}
}
