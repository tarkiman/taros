package web

import (
	"context"
	"encoding/json"
	"log/slog"
	"net"
	"net/http"
	"net/url"
	"os"
	"regexp"
	"strconv"
	"strings"
	"time"
	"unicode"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/config"
	"github.com/tarkiman/taros/internal/gateway"
)

// Settings > Gerbang lokasi (docs/04-features.md §4.18): a guided setup for the gateway
// block of config.yaml — readiness checks, "Tes" buttons for go2rtc and each central
// host, then a validated save that rewrites only the gateway: block and restarts.

type gatewayCentralInput struct {
	Label string `json:"label"`
	Host  string `json:"host"`
	Port  int    `json:"port"`
}

type gatewaySetupConfig struct {
	Enabled     bool                  `json:"enabled"`
	Go2rtcURL   string                `json:"go2rtcUrl"`
	PollSeconds int                   `json:"pollSeconds"`
	Central     []gatewayCentralInput `json:"central"`
}

type gatewayContainer struct {
	Name  string `json:"name"`
	Image string `json:"image"`
	State string `json:"state"`
}

type gatewaySetupStatus struct {
	Config     gatewaySetupConfig `json:"config"`
	Active     bool               `json:"active"` // the running process has gateway monitoring on
	Root       bool               `json:"root"`
	ZeroTier   gateway.ZeroTier   `json:"zerotier"`
	Containers []gatewayContainer `json:"containers"` // go2rtc containers seen by Docker
}

func (s *Server) handleSettingsGatewayStatus(w http.ResponseWriter, r *http.Request) {
	cfg, err := config.Load(s.deps.ConfigPath)
	if err != nil {
		cfg = config.Default()
	}
	out := gatewaySetupStatus{
		Config: gatewaySetupConfig{Enabled: cfg.Gateway.Enabled, Go2rtcURL: cfg.Gateway.Go2rtcURL, PollSeconds: cfg.Gateway.PollSeconds, Central: []gatewayCentralInput{}},
		Active: s.deps.Gateway != nil, Root: os.Geteuid() == 0, Containers: []gatewayContainer{},
	}
	for _, c := range cfg.Gateway.Central {
		host, port, err := net.SplitHostPort(c.Addr)
		if err != nil {
			host, port = c.Addr, ""
		}
		p, _ := strconv.Atoi(port)
		out.Config.Central = append(out.Config.Central, gatewayCentralInput{Label: c.Label, Host: host, Port: p})
	}
	ctx, cancel := context.WithTimeout(r.Context(), 6*time.Second)
	defer cancel()
	out.ZeroTier = gateway.ZeroTierStatus(ctx)
	if s.deps.DockerWatcher != nil {
		if list, _, err := s.deps.DockerWatcher.Containers(); err == nil {
			for _, c := range list {
				if strings.Contains(strings.ToLower(c.Image), "go2rtc") {
					out.Containers = append(out.Containers, gatewayContainer{Name: c.Name, Image: c.Image, State: c.State})
				}
			}
		}
	}
	writeJSON(w, http.StatusOK, out)
}

var hostnameRe = regexp.MustCompile(`^[A-Za-z0-9]([A-Za-z0-9-]{0,62})(\.[A-Za-z0-9]([A-Za-z0-9-]{0,62}))*$`)

func validHost(h string) bool {
	return net.ParseIP(h) != nil || (len(h) <= 253 && hostnameRe.MatchString(h))
}

// validGo2rtcURL accepts http(s) to this machine or a private network only, so the
// "Tes" button can't be pointed at arbitrary internet hosts.
func validGo2rtcURL(raw string) bool {
	u, err := url.Parse(raw)
	if err != nil || (u.Scheme != "http" && u.Scheme != "https") || u.Hostname() == "" || u.User != nil {
		return false
	}
	host := u.Hostname()
	if host == "localhost" {
		return true
	}
	ip := net.ParseIP(host)
	return ip != nil && (ip.IsLoopback() || ip.IsPrivate() || inCGNAT(ip))
}

// inCGNAT: 100.64.0.0/10, used by some overlay networks.
func inCGNAT(ip net.IP) bool {
	_, n, _ := net.ParseCIDR("100.64.0.0/10")
	return n.Contains(ip)
}

func validLabel(l string) bool {
	if l == "" || len([]rune(l)) > 40 {
		return false
	}
	for _, r := range l {
		if unicode.IsControl(r) {
			return false
		}
	}
	return true
}

func (s *Server) handleSettingsGatewayTestGo2rtc(w http.ResponseWriter, r *http.Request) {
	var req struct {
		URL string `json:"url"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || !validGo2rtcURL(strings.TrimSpace(req.URL)) {
		writeJSONError(w, http.StatusBadRequest, apierr.GatewayInvalid, "alamat go2rtc tidak valid", map[string]any{"field": "go2rtcUrl"})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 6*time.Second)
	defer cancel()
	streams, err := gateway.ProbeGo2rtc(ctx, strings.TrimSpace(req.URL))
	if err != nil {
		writeJSON(w, http.StatusOK, map[string]any{"ok": false, "error": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "streams": streams})
}

func (s *Server) handleSettingsGatewayTestCentral(w http.ResponseWriter, r *http.Request) {
	var req gatewayCentralInput
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil || !validHost(strings.TrimSpace(req.Host)) || req.Port < 1 || req.Port > 65535 {
		writeJSONError(w, http.StatusBadRequest, apierr.GatewayInvalid, "host/port tidak valid", map[string]any{"field": "central"})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	rtt, errText := gateway.ProbeTCP(ctx, net.JoinHostPort(strings.TrimSpace(req.Host), strconv.Itoa(req.Port)))
	writeJSON(w, http.StatusOK, map[string]any{"ok": errText == "", "rttMs": rtt, "error": errText})
}

// handleSettingsGatewaySave validates everything, re-confirms the dashboard password
// (this restarts the service, like the port/terminal toggles), rewrites the gateway
// block and restarts.
func (s *Server) handleSettingsGatewaySave(w http.ResponseWriter, r *http.Request) {
	var req struct {
		gatewaySetupConfig
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	bad := func(field string) {
		writeJSONError(w, http.StatusBadRequest, apierr.GatewayInvalid, "isian tidak valid: "+field, map[string]any{"field": field})
	}
	g := config.GatewayConfig{Enabled: req.Enabled, Go2rtcURL: strings.TrimSpace(req.Go2rtcURL), PollSeconds: req.PollSeconds}
	switch {
	case !validGo2rtcURL(g.Go2rtcURL):
		bad("go2rtcUrl")
		return
	case g.PollSeconds < 5 || g.PollSeconds > 60:
		bad("pollSeconds")
		return
	case len(req.Central) > 8:
		bad("central")
		return
	}
	seen := map[string]bool{}
	for _, c := range req.Central {
		label, host := strings.TrimSpace(c.Label), strings.TrimSpace(c.Host)
		addr := net.JoinHostPort(host, strconv.Itoa(c.Port))
		if !validLabel(label) || !validHost(host) || c.Port < 1 || c.Port > 65535 || seen[addr] {
			bad("central")
			return
		}
		seen[addr] = true
		g.Central = append(g.Central, config.GatewayCentralTarget{Label: label, Addr: addr})
	}

	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil) // 403: see handleSettingsTerminal
		return
	}
	if err := config.SetGateway(s.deps.ConfigPath, g); err != nil {
		writeJSONError(w, http.StatusInternalServerError, apierr.GatewaySaveFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	slog.Info("settings: gateway diubah, restart", "enabled", g.Enabled, "central", len(g.Central), "username", sess.Username)
	writeJSON(w, http.StatusOK, map[string]bool{"enabled": g.Enabled})
	go restartForGateway()
}

// restartForGateway exits so systemd (Restart=always) starts TarOS again with the new
// config; replaced in tests.
var restartForGateway = func() {
	time.Sleep(700 * time.Millisecond)
	os.Exit(0)
}
