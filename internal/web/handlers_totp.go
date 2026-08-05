package web

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/auth"
)

// backupCodeCount is how many single-use recovery codes are generated
// each time 2FA is (re)confirmed — enough that losing a few doesn't force
// an immediate regeneration, not so many the "save these now" screen is
// unwieldy. See docs/04-features.md §4.7.
const backupCodeCount = 10

type totpStatusResponse struct {
	Enabled              bool `json:"enabled"`
	RemainingBackupCodes int  `json:"remainingBackupCodes,omitempty"`
}

func (s *Server) handleSettingsTOTPStatus(w http.ResponseWriter, r *http.Request) {
	resp := totpStatusResponse{Enabled: s.deps.Creds.TOTPEnabled()}
	if resp.Enabled {
		resp.RemainingBackupCodes = s.deps.Creds.RemainingBackupCodes()
	}
	writeJSON(w, http.StatusOK, resp)
}

type totpSetupResponse struct {
	Secret     string `json:"secret"`
	OtpauthURL string `json:"otpauthUrl"`
}

// handleSettingsTOTPSetup generates a fresh secret and returns it plus the
// otpauth:// URI (rendered as a QR code client-side) — nothing is
// persisted yet. The account only actually gains 2FA once the user proves
// they scanned it correctly via handleSettingsTOTPConfirm; generating and
// forgetting a secret here has zero effect on login, so this step alone
// needs no password re-confirmation (unlike disabling, which does).
func (s *Server) handleSettingsTOTPSetup(w http.ResponseWriter, r *http.Request) {
	secret, err := auth.GenerateTOTPSecret()
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}
	sess := sessionFromContext(r.Context())
	writeJSON(w, http.StatusOK, totpSetupResponse{
		Secret:     secret,
		OtpauthURL: auth.TOTPProvisioningURI(secret, sess.Username, "TarOS"),
	})
}

type totpConfirmRequest struct {
	Secret string `json:"secret"`
	Code   string `json:"code"`
}
type totpConfirmResponse struct {
	BackupCodes []string `json:"backupCodes"`
}

// handleSettingsTOTPConfirm validates that the user's authenticator app
// actually has the secret from handleSettingsTOTPSetup (by requiring a
// live code from it) before persisting anything — this is what actually
// turns 2FA on. Generates and returns a fresh set of backup codes in the
// same response; the caller only ever sees the plaintext once.
func (s *Server) handleSettingsTOTPConfirm(w http.ResponseWriter, r *http.Request) {
	var req totpConfirmRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "body tidak valid")
		return
	}
	if !auth.ValidateTOTP(req.Secret, req.Code, time.Now()) {
		writeJSONError(w, http.StatusBadRequest, "Kode tidak cocok — pastikan aplikasi authenticator sudah menampilkan kode untuk akun ini.")
		return
	}

	backupCodes, err := auth.GenerateBackupCodes(backupCodeCount)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}
	if err := s.deps.Creds.SetTOTP(s.deps.CredentialsPath, req.Secret, backupCodes); err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}

	sess := sessionFromContext(r.Context())
	slog.Info("settings: TOTP diaktifkan", "username", sess.Username)
	writeJSON(w, http.StatusOK, totpConfirmResponse{BackupCodes: backupCodes})
}

type totpDisableRequest struct {
	Password string `json:"password"`
}

// handleSettingsTOTPDisable requires the dashboard password (same
// re-confirmation pattern as the terminal toggle, handlers_settings.go)
// since this is a security-*reducing* action — unlike setup/confirm above,
// which only ever add a protection, never remove one.
func (s *Server) handleSettingsTOTPDisable(w http.ResponseWriter, r *http.Request) {
	var req totpDisableRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "body tidak valid")
		return
	}
	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, "password salah") // 403, not 401 — see handlers_settings.go
		return
	}
	if err := s.deps.Creds.ClearTOTP(s.deps.CredentialsPath); err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}
	slog.Info("settings: TOTP dinonaktifkan", "username", sess.Username)
	writeJSON(w, http.StatusOK, map[string]bool{"enabled": false})
}
