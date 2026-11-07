package web

import (
	"context"
	"crypto/rand"
	"encoding/json"
	"errors"
	"fmt"
	"log/slog"
	"math/big"
	"net"
	"net/http"
	"net/url"
	"strconv"
	"strings"
	"sync"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/gateway"
	"github.com/tarkiman/taros/internal/gateway/discover"
)

// Gateway stage 2 (docs/04-features.md §4.18): manage the go2rtc relay from the Gateway
// page — list/add/change/remove relayed streams, find cameras on the site's LAN, and
// rotate the RTSP login the central NVR uses. Everything goes through go2rtc's API
// (gateway.Admin); camera passwords are never sent back to the browser.

// gatewayAdmin returns the Admin for the configured go2rtc, or writes 409 when gateway
// monitoring is off (the relay URL comes from the same gateway: block).
func (s *Server) gatewayAdmin(w http.ResponseWriter) *gateway.Admin {
	if s.deps.Gateway == nil {
		writeJSONError(w, http.StatusConflict, apierr.GatewayDisabled, "gerbang lokasi belum diaktifkan", nil)
		return nil
	}
	return gateway.NewAdmin(s.deps.Gateway.Go2rtcURL())
}

func writeGo2rtcError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, gateway.ErrStreamExists):
		writeJSONError(w, http.StatusConflict, apierr.GatewayStreamExists, "nama relay sudah dipakai", nil)
	case errors.Is(err, gateway.ErrStreamNotFound):
		writeJSONError(w, http.StatusNotFound, apierr.GatewayStreamNotFound, "relay tidak ditemukan", nil)
	case errors.Is(err, gateway.ErrPublicSource):
		writeJSONError(w, http.StatusBadRequest, apierr.GatewaySourcePublic, "sumber harus di jaringan lokal", nil)
	case errors.Is(err, gateway.ErrInvalidSource):
		writeJSONError(w, http.StatusBadRequest, apierr.GatewaySourceInvalid, "alamat sumber tidak valid", nil)
	default:
		writeJSONError(w, http.StatusBadGateway, apierr.GatewayGo2rtcFailed, err.Error(), map[string]any{"detail": err.Error()})
	}
}

type gatewayRelaysResponse struct {
	gateway.RelayConfig
	ZeroTierIP string `json:"zerotierIp,omitempty"` // what the NVR dials: rtsp://<ip>:<port>/<name>
}

func (s *Server) handleGatewayRelays(w http.ResponseWriter, r *http.Request) {
	a := s.gatewayAdmin(w)
	if a == nil {
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 8*time.Second)
	defer cancel()
	rc, err := a.Relays(ctx)
	if err != nil {
		writeGo2rtcError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, gatewayRelaysResponse{RelayConfig: rc, ZeroTierIP: s.deps.Gateway.ZeroTierIP()})
}

type gatewayRelayInput struct {
	Name   string              `json:"name"`
	Source gateway.SourceInput `json:"source"`
}

func (s *Server) handleGatewayRelayCreate(w http.ResponseWriter, r *http.Request) {
	a := s.gatewayAdmin(w)
	if a == nil {
		return
	}
	var in gatewayRelayInput
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	in.Name = strings.TrimSpace(in.Name)
	if !gateway.ValidStreamName(in.Name) {
		writeJSONError(w, http.StatusBadRequest, apierr.GatewayStreamName, "nama relay tidak valid", nil)
		return
	}
	src, err := gateway.BuildSource(in.Source, "")
	if err != nil {
		writeGo2rtcError(w, err)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	if err := a.CreateStream(ctx, in.Name, src); err != nil {
		writeGo2rtcError(w, err)
		return
	}
	slog.Info("gateway: relay ditambah", "stream", in.Name, "source", gateway.DescribeSource(src).URL, "username", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusCreated, map[string]string{"name": in.Name})
}

func (s *Server) handleGatewayRelayUpdate(w http.ResponseWriter, r *http.Request) {
	a := s.gatewayAdmin(w)
	if a == nil {
		return
	}
	name := r.PathValue("name")
	var in gatewayRelayInput
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	old, err := a.Sources(ctx, name)
	if err != nil {
		writeGo2rtcError(w, err)
		return
	}
	if ok, reason := gateway.Editable(old); !ok {
		writeJSONError(w, http.StatusConflict, apierr.GatewayStreamLocked, "relay ini dikelola lewat go2rtc.yaml", map[string]any{"reason": reason})
		return
	}
	src, err := gateway.BuildSource(in.Source, old[0])
	if err != nil {
		writeGo2rtcError(w, err)
		return
	}
	if err := a.UpdateStream(ctx, name, src); err != nil {
		writeGo2rtcError(w, err)
		return
	}
	slog.Info("gateway: relay diubah", "stream", name, "source", gateway.DescribeSource(src).URL, "username", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]string{"name": name})
}

func (s *Server) handleGatewayRelayDelete(w http.ResponseWriter, r *http.Request) {
	a := s.gatewayAdmin(w)
	if a == nil {
		return
	}
	name := r.PathValue("name")
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	if err := a.DeleteStream(ctx, name); err != nil {
		writeGo2rtcError(w, err)
		return
	}
	slog.Info("gateway: relay dihapus", "stream", name, "username", sessionFromContext(r.Context()).Username)
	w.WriteHeader(http.StatusNoContent)
}

// handleGatewayRelayTest checks a source before it is saved: RTSP gets a DESCRIBE with
// the login (401 = wrong login), other schemes a TCP connect. With "name", an empty
// password means the relay's current one, as on save.
func (s *Server) handleGatewayRelayTest(w http.ResponseWriter, r *http.Request) {
	a := s.gatewayAdmin(w)
	if a == nil {
		return
	}
	var in gatewayRelayInput
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	old := ""
	if in.Name != "" {
		if srcs, err := a.Sources(ctx, in.Name); err == nil && len(srcs) == 1 {
			old = srcs[0]
		}
	}
	src, err := gateway.BuildSource(in.Source, old)
	if err != nil {
		writeGo2rtcError(w, err)
		return
	}
	u, _ := url.Parse(src)
	if u.Scheme == "rtsp" {
		code, codec := discover.ProbeSource(ctx, src)
		res := map[string]any{"ok": code == 200, "status": code, "codec": codec}
		switch {
		case code == 0:
			res["error"] = "unreachable"
		case code == 401:
			res["error"] = "auth"
		case code != 200:
			res["error"] = "status"
		}
		writeJSON(w, http.StatusOK, res)
		return
	}
	port := u.Port()
	if port == "" {
		port = map[string]string{"http": "80", "https": "443", "rtmp": "1935", "rtsps": "322"}[u.Scheme]
	}
	_, errText := gateway.ProbeTCP(ctx, net.JoinHostPort(u.Hostname(), port))
	res := map[string]any{"ok": errText == ""}
	if errText != "" {
		res["error"] = "unreachable"
	}
	writeJSON(w, http.StatusOK, res)
}

// --- camera finder ---------------------------------------------------------------

var gatewayScanMu sync.Mutex

type gatewayScanDevice struct {
	discover.Device
	Relayed []string `json:"relayed"` // streams whose source is one of the device's IPs
}

// handleGatewayScan sweeps the gateway's own LAN for cameras (ONVIF + RTSP ports) and
// marks the ones already relayed. One scan at a time; a /24 takes a few seconds.
func (s *Server) handleGatewayScan(w http.ResponseWriter, r *http.Request) {
	a := s.gatewayAdmin(w)
	if a == nil {
		return
	}
	if !gatewayScanMu.TryLock() {
		writeJSONError(w, http.StatusConflict, apierr.GatewayScanBusy, "pemindaian lain sedang berjalan", nil)
		return
	}
	defer gatewayScanMu.Unlock()
	ctx, cancel := context.WithTimeout(r.Context(), 45*time.Second)
	defer cancel()
	subnets := discover.LocalSubnets()
	devices, err := discover.Scan(ctx, subnets)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, apierr.GatewayScanFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	byHost := map[string][]string{}
	if srcs, err := a.AllSources(ctx); err == nil {
		for name, list := range srcs {
			for _, src := range list {
				if u, err := url.Parse(src); err == nil && u.Hostname() != "" {
					byHost[u.Hostname()] = append(byHost[u.Hostname()], name)
				}
			}
		}
	}
	out := make([]gatewayScanDevice, 0, len(devices))
	for _, d := range devices {
		sd := gatewayScanDevice{Device: d, Relayed: []string{}}
		if sd.Ports == nil { // an ONVIF-only answer has no open RTSP port
			sd.Ports = []int{}
		}
		for _, ip := range d.IPs {
			sd.Relayed = append(sd.Relayed, byHost[ip]...)
		}
		out = append(out, sd)
	}
	if subnets == nil {
		subnets = []discover.Subnet{}
	}
	writeJSON(w, http.StatusOK, map[string]any{"subnets": subnets, "devices": out})
}

// handleGatewayScanStreams finds the stream URLs of one found device: ONVIF
// GetStreamUri when it speaks ONVIF, else common RTSP paths. URLs come back without
// the login; the browser sends the login again when it creates the relay.
func (s *Server) handleGatewayScanStreams(w http.ResponseWriter, r *http.Request) {
	if s.gatewayAdmin(w) == nil {
		return
	}
	var in struct {
		IP       string `json:"ip"`
		Port     int    `json:"port"`
		XAddr    string `json:"xaddr"`
		Username string `json:"username"`
		Password string `json:"password"`
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	ip := net.ParseIP(in.IP)
	if ip == nil || !gateway.LocalHost(in.IP) {
		writeJSONError(w, http.StatusBadRequest, apierr.GatewaySourcePublic, "perangkat harus di jaringan lokal", nil)
		return
	}
	if in.XAddr != "" {
		if u, err := url.Parse(in.XAddr); err != nil || (u.Scheme != "http" && u.Scheme != "https") || !gateway.LocalHost(u.Hostname()) {
			in.XAddr = ""
		}
	}
	ctx, cancel := context.WithTimeout(r.Context(), 40*time.Second)
	defer cancel()
	res := map[string]any{}
	if in.XAddr != "" {
		streams, err := discover.ONVIFStreams(ctx, in.XAddr, in.Username, in.Password)
		switch {
		case err == nil:
			res["onvif"] = streams
			writeJSON(w, http.StatusOK, res)
			return
		case errors.Is(err, discover.ErrAuth):
			res["onvifError"] = "auth"
		default:
			res["onvifError"] = "failed"
		}
	}
	port := in.Port
	if port < 1 || port > 65535 {
		port = 554
	}
	res["guess"] = discover.GuessPaths(ctx, ip.String(), port, in.Username, in.Password)
	writeJSON(w, http.StatusOK, res)
}

// --- RTSP login rotation ---------------------------------------------------------

// handleGatewayRTSPLogin sets a new random RTSP password (re-confirming the dashboard
// password first) and restarts go2rtc. The new password is returned once, together
// with the URL each relay now has for the NVR; it isn't stored anywhere else.
func (s *Server) handleGatewayRTSPLogin(w http.ResponseWriter, r *http.Request) {
	a := s.gatewayAdmin(w)
	if a == nil {
		return
	}
	var in struct {
		Username string `json:"username"`
		Password string `json:"password"` // dashboard password
	}
	if err := json.NewDecoder(r.Body).Decode(&in); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	in.Username = strings.TrimSpace(in.Username)
	if in.Username == "" {
		in.Username = "nvr"
	}
	if !rtspUserRe(in.Username) {
		writeJSONError(w, http.StatusBadRequest, apierr.GatewayInvalid, "username RTSP tidak valid", map[string]any{"field": "username"})
		return
	}
	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, in.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}
	pass, err := randomRTSPPassword(24)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, apierr.GatewayGo2rtcFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := a.SetRTSPLogin(ctx, in.Username, pass); err != nil {
		writeGo2rtcError(w, err)
		return
	}
	slog.Info("gateway: login RTSP diganti, go2rtc restart", "rtspUser", in.Username, "username", sess.Username)

	out := map[string]any{"username": in.Username, "password": pass, "urls": map[string]string{}}
	if rc, err := a.Relays(ctx); err == nil {
		host := s.deps.Gateway.ZeroTierIP()
		if host == "" {
			host = "<ip-zerotier-gerbang>"
		}
		urls := map[string]string{}
		for _, st := range rc.Streams {
			u := url.URL{Scheme: "rtsp", User: url.UserPassword(in.Username, pass), Host: net.JoinHostPort(host, strconv.Itoa(rc.RTSP.Port)), Path: "/" + st.Name}
			urls[st.Name] = u.String()
		}
		out["urls"] = urls
	}
	w.Header().Set("Cache-Control", "no-store")
	writeJSON(w, http.StatusOK, out)
}

func rtspUserRe(u string) bool {
	if len(u) > 32 {
		return false
	}
	for _, c := range u {
		if !(c >= 'a' && c <= 'z' || c >= 'A' && c <= 'Z' || c >= '0' && c <= '9' || c == '_' || c == '-' || c == '.') {
			return false
		}
	}
	return true
}

// randomRTSPPassword uses only letters and digits so it survives every URL, YAML and
// shell context unescaped.
func randomRTSPPassword(n int) (string, error) {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789"
	b := make([]byte, n)
	for i := range b {
		k, err := rand.Int(rand.Reader, big.NewInt(int64(len(alphabet))))
		if err != nil {
			return "", fmt.Errorf("random: %w", err)
		}
		b[i] = alphabet[k.Int64()]
	}
	return string(b), nil
}
