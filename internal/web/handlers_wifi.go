package web

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/wifi"
)

type wifiStatusResponse struct {
	Available wifi.Availability `json:"available"`
	Current   *wifi.Current     `json:"current,omitempty"`
	Job       wifi.Job          `json:"job"`
}

// handleWifiStatus reports availability, the live connection, and the most
// recent switch job. After a switch the browser's link usually drops and
// comes back (possibly on a new address) — the job is how it learns what
// happened, so it is kept in memory and always returned here.
func (s *Server) handleWifiStatus(w http.ResponseWriter, r *http.Request) {
	if s.deps.Wifi == nil {
		writeJSON(w, http.StatusOK, wifiStatusResponse{Available: wifi.Availability{Reason: wifi.ReasonNoNmcli}, Job: wifi.Job{Phase: wifi.PhaseIdle}})
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	resp := wifiStatusResponse{Available: s.deps.Wifi.Available(ctx), Job: s.deps.Wifi.Status()}
	if resp.Available.Supported {
		if cur, err := s.deps.Wifi.Current(ctx); err == nil {
			resp.Current = &cur
		}
	}
	writeJSON(w, http.StatusOK, resp)
}

// requireWifi answers 503 with the reason when the feature can't work here.
func (s *Server) requireWifi(w http.ResponseWriter, r *http.Request) bool {
	reason := wifi.ReasonNoNmcli
	if s.deps.Wifi != nil {
		ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
		defer cancel()
		a := s.deps.Wifi.Available(ctx)
		if a.Supported {
			return true
		}
		reason = a.Reason
	}
	writeJSONError(w, http.StatusServiceUnavailable, apierr.WifiUnavailable, "Wi-Fi tidak tersedia di perangkat ini", map[string]any{"reason": reason})
	return false
}

// handleWifiNetworks lists visible networks. ?rescan=1 asks the radio for a
// fresh scan (rate-limited inside internal/wifi — a scan briefly costs the
// connected link throughput).
func (s *Server) handleWifiNetworks(w http.ResponseWriter, r *http.Request) {
	if !s.requireWifi(w, r) {
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 25*time.Second)
	defer cancel()
	nets, err := s.deps.Wifi.Scan(ctx, r.URL.Query().Get("rescan") == "1")
	if err != nil {
		writeJSONError(w, http.StatusBadGateway, apierr.WifiScanFailed, "Gagal memindai jaringan Wi-Fi: "+err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	if nets == nil {
		nets = []wifi.Network{}
	}
	writeJSON(w, http.StatusOK, map[string]any{"networks": nets})
}

type wifiConnectRequest struct {
	SSID         string `json:"ssid"`
	WifiPassword string `json:"wifiPassword"` // the network's password — never logged, never echoed
	Security     string `json:"security"`
	Hidden       bool   `json:"hidden"`
	Password     string `json:"password"` // the caller's own dashboard password (re-confirmation)
}

// wifiErr maps the synchronous refusals of internal/wifi onto apierr codes.
func wifiErr(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, wifi.ErrBusy):
		writeJSONError(w, http.StatusConflict, apierr.WifiBusy, "sedang ada proses pindah jaringan", nil)
	case errors.Is(err, wifi.ErrInvalidSSID):
		writeJSONError(w, http.StatusBadRequest, apierr.WifiSSIDInvalid, "nama jaringan (SSID) tidak valid", nil)
	case errors.Is(err, wifi.ErrInvalidPassword):
		writeJSONError(w, http.StatusBadRequest, apierr.WifiPasswordInvalid, "password Wi-Fi tidak valid (8–63 karakter, atau 64 digit hex)", nil)
	case errors.Is(err, wifi.ErrPasswordRequired):
		writeJSONError(w, http.StatusBadRequest, apierr.WifiPasswordRequired, "jaringan ini butuh password", nil)
	case errors.Is(err, wifi.ErrUnsupportedSec):
		writeJSONError(w, http.StatusBadRequest, apierr.WifiSecurityUnsupported, "jenis keamanan jaringan ini belum didukung", nil)
	case errors.Is(err, wifi.ErrForgetActive):
		writeJSONError(w, http.StatusConflict, apierr.WifiForgetActive, "tidak bisa melupakan jaringan yang sedang dipakai", nil)
	case errors.Is(err, wifi.ErrNoSuchProfile):
		writeJSONError(w, http.StatusNotFound, apierr.WifiNotFound, "jaringan tersimpan tidak ditemukan", nil)
	case errors.Is(err, wifi.ErrNotAvailable):
		writeJSONError(w, http.StatusServiceUnavailable, apierr.WifiUnavailable, "Wi-Fi tidak tersedia di perangkat ini", nil)
	default:
		writeJSONError(w, http.StatusInternalServerError, apierr.WifiFailed, "gagal: "+err.Error(), map[string]any{"detail": err.Error()})
	}
}

// handleWifiConnect starts a switch. Switching can take this very device
// offline (it is often reached over the same Wi-Fi), so — like the other
// sensitive actions — it needs the caller's dashboard password again (403,
// not 401, see handlers_settings.go). It returns 202 at once: the switch runs
// in the background and rolls itself back if the new network doesn't come up;
// the outcome is read from /api/wifi/status.
func (s *Server) handleWifiConnect(w http.ResponseWriter, r *http.Request) {
	if !s.requireWifi(w, r) {
		return
	}
	var req wifiConnectRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}
	job, err := s.deps.Wifi.Connect(r.Context(), wifi.ConnectRequest{SSID: req.SSID, Password: req.WifiPassword, Security: req.Security, Hidden: req.Hidden})
	if err != nil {
		wifiErr(w, err)
		return
	}
	// Audit: who, which network, hidden or not. Never the Wi-Fi password.
	slog.Info("wifi: pindah jaringan dimulai", "ssid", req.SSID, "hidden", req.Hidden, "by", sess.Username)
	writeJSON(w, http.StatusAccepted, map[string]any{"job": job})
}

type wifiForgetRequest struct {
	UUID     string `json:"uuid"`
	Password string `json:"password"`
}

// handleWifiForget deletes a saved network (never the one in use).
func (s *Server) handleWifiForget(w http.ResponseWriter, r *http.Request) {
	if !s.requireWifi(w, r) {
		return
	}
	var req wifiForgetRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 20*time.Second)
	defer cancel()
	if err := s.deps.Wifi.Forget(ctx, req.UUID); err != nil {
		wifiErr(w, err)
		return
	}
	slog.Info("wifi: jaringan tersimpan dilupakan", "uuid", req.UUID, "by", sess.Username)
	writeJSON(w, http.StatusOK, map[string]bool{"forgotten": true})
}
