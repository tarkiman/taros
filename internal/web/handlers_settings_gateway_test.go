package web

import (
	"context"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/tarkiman/taros/internal/auth"
	"github.com/tarkiman/taros/internal/config"
)

func TestGatewayValidation(t *testing.T) {
	for _, u := range []string{"http://127.0.0.1:1984", "http://localhost:1984", "http://192.168.1.25:1984", "https://10.0.0.2", "http://100.80.1.1:1984"} {
		if !validGo2rtcURL(u) {
			t.Errorf("%s rejected", u)
		}
	}
	for _, u := range []string{"http://example.com:1984", "http://8.8.8.8", "file:///etc/passwd", "http://u:p@127.0.0.1:1984", "ftp://127.0.0.1", ""} {
		if validGo2rtcURL(u) {
			t.Errorf("%s accepted", u)
		}
	}
	for _, h := range []string{"172.22.244.135", "umma", "nvr.tarkiman.com", "::1"} {
		if !validHost(h) {
			t.Errorf("host %s rejected", h)
		}
	}
	for _, h := range []string{"", "a b", "host:8091", "-bad", "x/y"} {
		if validHost(h) {
			t.Errorf("host %q accepted", h)
		}
	}
	if validLabel("") || validLabel("bad\nlabel") || !validLabel(`NVR: "umma"`) {
		t.Error("label validation")
	}
}

func TestGatewaySave(t *testing.T) {
	dir := t.TempDir()
	credPath := filepath.Join(dir, "credentials.yaml")
	if err := auth.SaveCredentials(credPath, "alice", "alice-password-1"); err != nil {
		t.Fatal(err)
	}
	creds, _ := auth.LoadCredentials(credPath)
	cfgPath := filepath.Join(dir, "config.yaml")
	os.WriteFile(cfgPath, []byte("server:\n  listen: \"0.0.0.0:8090\" # keep\n"), 0o644)
	s := NewServer(Deps{Creds: creds, Sessions: auth.NewSessionStore(time.Hour), ConfigPath: cfgPath})

	restarted := make(chan struct{}, 1)
	restartForGateway = func() { restarted <- struct{}{} }

	call := func(body string) int {
		req := httptest.NewRequest("PUT", "/api/settings/gateway", strings.NewReader(body))
		req = req.WithContext(context.WithValue(req.Context(), sessionCtxKey{}, &auth.Session{Username: "alice"}))
		w := httptest.NewRecorder()
		s.handleSettingsGatewaySave(w, req)
		return w.Code
	}
	good := `"enabled":true,"go2rtcUrl":"http://127.0.0.1:1984","pollSeconds":10,"central":[{"label":"NVR (umma)","host":"172.22.244.135","port":8091}]`
	if c := call(`{` + good + `,"password":"wrong"}`); c != http.StatusForbidden {
		t.Fatalf("wrong password = %d", c)
	}
	if c := call(`{"enabled":true,"go2rtcUrl":"http://example.com","pollSeconds":10,"central":[],"password":"alice-password-1"}`); c != http.StatusBadRequest {
		t.Fatalf("public go2rtc url = %d", c)
	}
	if c := call(`{"enabled":true,"go2rtcUrl":"http://127.0.0.1:1984","pollSeconds":10,"central":[{"label":"x","host":"1.2.3.4","port":0}],"password":"alice-password-1"}`); c != http.StatusBadRequest {
		t.Fatalf("bad port = %d", c)
	}
	select {
	case <-restarted:
		t.Fatal("restarted on a rejected request")
	default:
	}
	if c := call(`{` + good + `,"password":"alice-password-1"}`); c != http.StatusOK {
		t.Fatalf("save = %d", c)
	}
	select {
	case <-restarted:
	case <-time.After(time.Second):
		t.Fatal("no restart after save")
	}
	cfg, err := config.Load(cfgPath)
	if err != nil || !cfg.Gateway.Enabled || len(cfg.Gateway.Central) != 1 || cfg.Gateway.Central[0].Addr != "172.22.244.135:8091" || cfg.Server.Listen != "0.0.0.0:8090" {
		t.Fatalf("saved config = %+v, %v", cfg.Gateway, err)
	}
	if data, _ := os.ReadFile(cfgPath); !strings.Contains(string(data), "# keep") {
		t.Fatal("comment lost")
	}
}
