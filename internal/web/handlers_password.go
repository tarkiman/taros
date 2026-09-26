package web

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"strings"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/auth"
)

// Changing and resetting passwords (docs/04-features.md §4.7 "Ganti password").
//
// Both re-ask for the caller's own password, and share the login rate limiter:
// a hijacked session must not be a free way to guess the password, because the
// password is the one thing that outlives the session.

// writePasswordProblem answers 400 and reports false when pw is not acceptable.
func writePasswordProblem(w http.ResponseWriter, pw string) bool {
	switch err := auth.CheckPassword(pw); {
	case errors.Is(err, auth.ErrPasswordTooShort):
		writeJSONError(w, http.StatusBadRequest, apierr.PasswordTooShort, "password minimal 8 karakter", map[string]any{"min": auth.MinPasswordLength})
		return false
	case errors.Is(err, auth.ErrPasswordTooLong):
		writeJSONError(w, http.StatusBadRequest, apierr.PasswordTooLong, "password terlalu panjang", map[string]any{"max": auth.MaxPasswordBytes})
		return false
	}
	return true
}

// confirmOwnPassword checks the caller's password with rate limiting. It answers
// and reports false on failure.
func (s *Server) confirmOwnPassword(w http.ResponseWriter, r *http.Request, username, password string) bool {
	ip := clientIP(r)
	if !s.deps.RateLimiter.Allow(ip) {
		writeJSONError(w, http.StatusTooManyRequests, apierr.TooManyAttempts, "Terlalu banyak percobaan gagal. Coba lagi beberapa menit lagi.", nil)
		return false
	}
	if !s.deps.Creds.Verify(username, password) {
		s.deps.RateLimiter.RecordFailure(ip)
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil) // 403, not 401 — see handlers_settings.go
		return false
	}
	s.deps.RateLimiter.RecordSuccess(ip)
	return true
}

func (s *Server) savePasswordFailed(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, auth.ErrUserNotFound):
		writeJSONError(w, http.StatusNotFound, apierr.UserNotFound, "user tidak ditemukan", nil)
	default:
		writeJSONError(w, http.StatusInternalServerError, apierr.PasswordSaveFailed, err.Error(), map[string]any{"detail": err.Error()})
	}
}

type passwordChangeRequest struct {
	CurrentPassword string `json:"currentPassword"`
	NewPassword     string `json:"newPassword"`
}

// handleSettingsPasswordChange changes the caller's own password. Every other
// session of the account is ended (the one in use stays), so a session somebody
// else may hold does not survive the change. TOTP is untouched.
func (s *Server) handleSettingsPasswordChange(w http.ResponseWriter, r *http.Request) {
	var req passwordChangeRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	sess := sessionFromContext(r.Context())
	if !s.confirmOwnPassword(w, r, sess.Username, req.CurrentPassword) {
		return
	}
	if !writePasswordProblem(w, req.NewPassword) {
		return
	}
	if req.NewPassword == req.CurrentPassword {
		writeJSONError(w, http.StatusBadRequest, apierr.PasswordSameAsOld, "password baru sama dengan yang lama", nil)
		return
	}
	if err := s.deps.Creds.SetPassword(s.deps.CredentialsPath, sess.Username, req.NewPassword); err != nil {
		s.savePasswordFailed(w, err)
		return
	}
	keep := ""
	if c, err := r.Cookie(auth.CookieName); err == nil {
		keep = c.Value
	}
	closed := s.deps.Sessions.DeleteUserSessions(sess.Username, keep)
	slog.Info("settings: password diganti", "user", sess.Username, "otherSessionsClosed", closed)
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "otherSessionsClosed": closed})
}

type passwordResetRequest struct {
	NewPassword string `json:"newPassword"`
	// Password is the caller's own current password.
	Password string `json:"password"`
}

// handleSettingsUsersResetPassword sets another account's password (all accounts
// are equals — there are no roles). Every session of that account is ended. TOTP
// stays as it is. Resetting your own password here is the same as changing it.
func (s *Server) handleSettingsUsersResetPassword(w http.ResponseWriter, r *http.Request) {
	var req passwordResetRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	sess := sessionFromContext(r.Context())
	if !s.confirmOwnPassword(w, r, sess.Username, req.Password) {
		return
	}
	target := strings.TrimSpace(r.PathValue("username"))
	if !s.userExists(r.Context(), target) {
		writeJSONError(w, http.StatusNotFound, apierr.UserNotFound, "user tidak ditemukan", nil)
		return
	}
	if !writePasswordProblem(w, req.NewPassword) {
		return
	}
	if err := s.deps.Creds.SetPassword(s.deps.CredentialsPath, target, req.NewPassword); err != nil {
		s.savePasswordFailed(w, err)
		return
	}
	keep := ""
	if target == sess.Username {
		if c, err := r.Cookie(auth.CookieName); err == nil {
			keep = c.Value
		}
	}
	closed := s.deps.Sessions.DeleteUserSessions(target, keep)
	slog.Info("settings: password akun direset", "target", target, "sessionsClosed", closed, "by", sess.Username)
	writeJSON(w, http.StatusOK, map[string]any{"ok": true, "sessionsClosed": closed})
}

func (s *Server) userExists(_ context.Context, name string) bool {
	for _, u := range s.deps.Creds.Usernames() {
		if u == name {
			return true
		}
	}
	return false
}
