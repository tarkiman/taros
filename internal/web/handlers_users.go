package web

import (
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"strings"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/auth"
)

// handleSettingsUsersList is always registered — user management isn't an
// optional/risky feature like Terminal or Disk Analysis (no
// enabled-gating), it's core to how the app is used day to day. See
// docs/04-features.md §4.7 "Kelola Pengguna".
func (s *Server) handleSettingsUsersList(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string][]string{"usernames": s.deps.Creds.Usernames()})
}

type settingsUsersAddRequest struct {
	NewUsername string `json:"newUsername"`
	NewPassword string `json:"newPassword"`
	// Password is the *caller's own* current password — every account
	// change is re-confirmed this way, same pattern as
	// handleSettingsTerminal/handleSettingsPort/handleSettingsTOTPDisable.
	Password string `json:"password"`
}

// handleSettingsUsersAdd creates a new account with equal access to every
// other one (see docs/10-roadmap.md — role-based access is explicitly out
// of scope). Unlike the Terminal/Port toggles, this needs no service
// restart: internal/auth.Credentials is mutated in memory and persisted
// to credentials.yaml directly, the same "no restart" shape TOTP setup
// already uses.
func (s *Server) handleSettingsUsersAdd(w http.ResponseWriter, r *http.Request) {
	var req settingsUsersAddRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}

	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil) // 403, not 401 — see handlers_settings.go
		return
	}

	newUsername := strings.TrimSpace(req.NewUsername)
	if newUsername == "" {
		writeJSONError(w, http.StatusBadRequest, apierr.UsernameRequired, "username tidak boleh kosong", nil)
		return
	}
	if !writePasswordProblem(w, req.NewPassword) {
		return
	}

	if err := s.deps.Creds.AddUser(s.deps.CredentialsPath, newUsername, req.NewPassword); err != nil {
		if errors.Is(err, auth.ErrUsernameExists) {
			writeJSONError(w, http.StatusConflict, apierr.UsernameAlreadyExists, "username sudah dipakai", nil)
			return
		}
		writeJSONError(w, http.StatusInternalServerError, apierr.UsersSaveFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}

	slog.Info("settings: user ditambahkan", "newUsername", newUsername, "by", sess.Username)
	writeJSON(w, http.StatusOK, map[string][]string{"usernames": s.deps.Creds.Usernames()})
}

type settingsUsersRemoveRequest struct {
	Password string `json:"password"`
}

// handleSettingsUsersRemove deletes an account — refuses to remove the
// account making the request (would strand the current session, see
// internal/auth.Credentials.RemoveUser's doc comment for why the "last
// user" guard lives there instead: it doesn't need a session to know
// that) and refuses to remove the last remaining account entirely.
func (s *Server) handleSettingsUsersRemove(w http.ResponseWriter, r *http.Request) {
	var req settingsUsersRemoveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}

	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}

	target := r.PathValue("username")
	if target == sess.Username {
		writeJSONError(w, http.StatusBadRequest, apierr.CannotRemoveSelf, "tidak bisa menghapus akun yang sedang login", nil)
		return
	}

	if err := s.deps.Creds.RemoveUser(s.deps.CredentialsPath, target); err != nil {
		switch {
		case errors.Is(err, auth.ErrLastUser):
			writeJSONError(w, http.StatusBadRequest, apierr.CannotRemoveLastUser, "tidak bisa menghapus user terakhir", nil)
		case errors.Is(err, auth.ErrUserNotFound):
			writeJSONError(w, http.StatusNotFound, apierr.UserNotFound, "user tidak ditemukan", nil)
		default:
			writeJSONError(w, http.StatusInternalServerError, apierr.UsersSaveFailed, err.Error(), map[string]any{"detail": err.Error()})
		}
		return
	}

	// A removed account must not stay logged in: sessions live in memory and are
	// not re-checked against the account list.
	closed := s.deps.Sessions.DeleteUserSessions(target, "")
	slog.Info("settings: user dihapus", "removedUsername", target, "sessionsClosed", closed, "by", sess.Username)
	writeJSON(w, http.StatusOK, map[string][]string{"usernames": s.deps.Creds.Usernames()})
}
