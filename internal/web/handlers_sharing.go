package web

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/sharing"
)

// File sharing (docs/04-features.md §4.16). Everything that changes something
// asks for the caller's dashboard password again (403, not 401 — see
// handlers_settings.go): these calls create accounts and publish folders, and
// an open session alone shouldn't be enough for that. Passwords for the *share
// accounts* are separate from it, travel only in the request body, and are
// never logged or returned.

type sharingStatusResponse struct {
	Status sharing.Status `json:"status"`
	Model  sharing.Model  `json:"model"`
	Roots  []string       `json:"roots"`
	Denied []string       `json:"denied"`
}

// requireSharing answers 503 when the feature isn't available at all (not Linux).
func (s *Server) requireSharing(w http.ResponseWriter) bool {
	if s.deps.Sharing == nil {
		writeJSONError(w, http.StatusServiceUnavailable, apierr.SharingUnavailable, "berbagi file tidak tersedia di platform ini", nil)
		return false
	}
	return true
}

// confirmPassword checks the caller's own dashboard password.
func (s *Server) confirmPassword(w http.ResponseWriter, r *http.Request, password string) bool {
	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return false
	}
	return true
}

// sharingErr maps the package's refusals onto translated API errors.
func sharingErr(w http.ResponseWriter, err error) {
	code, status := apierr.SharingFailed, http.StatusInternalServerError
	params := map[string]any{}
	var ae *sharing.ApplyError
	switch {
	case errors.As(err, &ae):
		code, status, params["detail"] = apierr.SharingApplyRejected, http.StatusUnprocessableEntity, ae.Output
	case errors.Is(err, sharing.ErrAccountName):
		code, status = apierr.SharingAccountInvalid, http.StatusBadRequest
	case errors.Is(err, sharing.ErrAccountExists):
		code, status = apierr.SharingAccountExists, http.StatusConflict
	case errors.Is(err, sharing.ErrAccountMissing):
		code, status = apierr.SharingAccountMissing, http.StatusNotFound
	case errors.Is(err, sharing.ErrAccountInUse):
		code, status = apierr.SharingAccountInUse, http.StatusConflict
		// wrapped as "<sentinel>: <share>" — the share is what follows the last ": "
		if i := strings.LastIndex(err.Error(), ": "); i >= 0 {
			params["share"] = err.Error()[i+2:]
		}
	case errors.Is(err, sharing.ErrPasswordWeak):
		code, status, params["min"] = apierr.SharingPasswordWeak, http.StatusBadRequest, 8
	case errors.Is(err, sharing.ErrShareName):
		code, status = apierr.SharingShareInvalid, http.StatusBadRequest
	case errors.Is(err, sharing.ErrShareExists):
		code, status = apierr.SharingShareExists, http.StatusConflict
	case errors.Is(err, sharing.ErrShareMissing):
		code, status = apierr.SharingShareMissing, http.StatusNotFound
	case errors.Is(err, sharing.ErrShareNoAccess):
		code, status = apierr.SharingShareNoAccess, http.StatusBadRequest
	case errors.Is(err, sharing.ErrShareUser):
		code, status = apierr.SharingShareUser, http.StatusBadRequest
	case errors.Is(err, sharing.ErrShareMode):
		code, status = apierr.SharingShareMode, http.StatusBadRequest
	case errors.Is(err, sharing.ErrNameForeign):
		code, status = apierr.SharingShareNameForeign, http.StatusConflict
	case errors.Is(err, sharing.ErrComment):
		code, status = apierr.SharingCommentInvalid, http.StatusBadRequest
	case errors.Is(err, sharing.ErrPathInvalid):
		code, status = apierr.SharingPathInvalid, http.StatusBadRequest
	case errors.Is(err, sharing.ErrPathDenied):
		code, status = apierr.SharingPathDenied, http.StatusBadRequest
	case errors.Is(err, sharing.ErrPathOutside):
		code, status = apierr.SharingPathOutside, http.StatusBadRequest
	case errors.Is(err, sharing.ErrOwnedByRoot):
		code, status = apierr.SharingOwnedByRoot, http.StatusBadRequest
	case errors.Is(err, sharing.ErrRunAs):
		code, status = apierr.SharingRunAsInvalid, http.StatusBadRequest
	case errors.Is(err, sharing.ErrInterface):
		code, status = apierr.SharingInterfaceInvalid, http.StatusBadRequest
	case errors.Is(err, sharing.ErrNotManaged):
		code, status = apierr.SharingNotManaged, http.StatusConflict
	case errors.Is(err, sharing.ErrCannotManage):
		code, status = apierr.SharingCannotManage, http.StatusConflict
		if _, rest, ok := strings.Cut(err.Error(), "("); ok {
			params["reason"] = strings.TrimSuffix(rest, ")")
		}
	case errors.Is(err, sharing.ErrServiceAction):
		code, status = apierr.SharingServiceAction, http.StatusBadRequest
	case errors.Is(err, sharing.ErrNoSystemd):
		code, status = apierr.SharingNoSystemd, http.StatusConflict
	case errors.Is(err, sharing.ErrNoUserBackend):
		code, status = apierr.SharingNoUserBackend, http.StatusConflict
	default:
		if err != nil {
			params["detail"] = err.Error()
		}
	}
	writeJSONError(w, status, code, err.Error(), params)
}

func decode(w http.ResponseWriter, r *http.Request, v any) bool {
	if err := json.NewDecoder(r.Body).Decode(v); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return false
	}
	return true
}

// handleSharingStatus: what TarOS sees (distro, Samba/FTP state, exposure
// findings) plus what it manages. Read-only, works without root.
func (s *Server) handleSharingStatus(w http.ResponseWriter, r *http.Request) {
	if !s.requireSharing(w) {
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 20*time.Second)
	defer cancel()
	m := s.deps.Sharing
	writeJSON(w, http.StatusOK, sharingStatusResponse{
		Status: m.Det.Detect(ctx), Model: m.Store.Get(), Roots: m.Policy.Roots, Denied: m.Policy.Denied,
	})
}

// handleSharingFolders lists sub-folders for the share picker — only ever inside the allowed roots.
func (s *Server) handleSharingFolders(w http.ResponseWriter, r *http.Request) {
	if !s.requireSharing(w) {
		return
	}
	folders, err := s.deps.Sharing.Policy.ListFolders(r.URL.Query().Get("path"))
	if err != nil {
		sharingErr(w, err)
		return
	}
	if folders == nil {
		folders = []sharing.Folder{}
	}
	writeJSON(w, http.StatusOK, map[string]any{"folders": folders})
}

type sharingPasswordReq struct {
	Password string `json:"password"` // the caller's own dashboard password
}

type sharingIfacesReq struct {
	sharingPasswordReq
	Interfaces []string `json:"interfaces"`
}

func (s *Server) handleSharingAdopt(w http.ResponseWriter, r *http.Request) {
	var req sharingIfacesReq
	if !s.requireSharing(w) || !decode(w, r, &req) || !s.confirmPassword(w, r, req.Password) {
		return
	}
	if err := s.deps.Sharing.Adopt(r.Context(), req.Interfaces); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: pengelolaan Samba diambil alih", "by", sessionFromContext(r.Context()).Username, "interfaces", req.Interfaces)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

type sharingUnadoptReq struct {
	sharingPasswordReq
	RemoveAccounts bool `json:"removeAccounts"`
}

func (s *Server) handleSharingUnadopt(w http.ResponseWriter, r *http.Request) {
	var req sharingUnadoptReq
	if !s.requireSharing(w) || !decode(w, r, &req) || !s.confirmPassword(w, r, req.Password) {
		return
	}
	if err := s.deps.Sharing.Unadopt(r.Context(), req.RemoveAccounts); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: pengelolaan Samba dilepas", "by", sessionFromContext(r.Context()).Username, "removeAccounts", req.RemoveAccounts)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

func (s *Server) handleSharingInterfaces(w http.ResponseWriter, r *http.Request) {
	var req sharingIfacesReq
	if !s.requireSharing(w) || !decode(w, r, &req) || !s.confirmPassword(w, r, req.Password) {
		return
	}
	if err := s.deps.Sharing.SetInterfaces(r.Context(), req.Interfaces); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: interface SMB diubah", "by", sessionFromContext(r.Context()).Username, "interfaces", req.Interfaces)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

type sharingServiceReq struct {
	sharingPasswordReq
	Action string `json:"action"`
}

// handleSharingService: start/stop/restart/enable/disable. Only the actions that
// *expose* the service (start, enable) need the password; stopping is always allowed.
func (s *Server) handleSharingService(w http.ResponseWriter, r *http.Request) {
	var req sharingServiceReq
	if !s.requireSharing(w) || !decode(w, r, &req) {
		return
	}
	if (req.Action == "start" || req.Action == "enable" || req.Action == "restart") && !s.confirmPassword(w, r, req.Password) {
		return
	}
	if err := s.deps.Sharing.Service(r.Context(), req.Action); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: layanan SMB", "action", req.Action, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

type sharingShareReq struct {
	sharingPasswordReq
	Share   sharing.Share `json:"share"`
	Replace string        `json:"replace"` // the name of the share being edited; "" to create
}

func (s *Server) handleSharingShareSave(w http.ResponseWriter, r *http.Request) {
	var req sharingShareReq
	if !s.requireSharing(w) || !decode(w, r, &req) || !s.confirmPassword(w, r, req.Password) {
		return
	}
	if err := s.deps.Sharing.SaveShare(r.Context(), req.Share, req.Replace); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: folder di-share", "name", req.Share.Name, "path", req.Share.Path, "accounts", len(req.Share.Access), "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

func (s *Server) handleSharingShareDelete(w http.ResponseWriter, r *http.Request) {
	var req sharingPasswordReq
	if !s.requireSharing(w) || !decode(w, r, &req) || !s.confirmPassword(w, r, req.Password) {
		return
	}
	name := r.PathValue("name")
	if err := s.deps.Sharing.DeleteShare(r.Context(), name); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: share dihapus", "name", name, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

type sharingAccountReq struct {
	sharingPasswordReq
	Name            string `json:"name"`
	AccountPassword string `json:"accountPassword"` // the share account's own password
}

func (s *Server) handleSharingAccountAdd(w http.ResponseWriter, r *http.Request) {
	var req sharingAccountReq
	if !s.requireSharing(w) || !decode(w, r, &req) || !s.confirmPassword(w, r, req.Password) {
		return
	}
	if err := s.deps.Sharing.AddAccount(r.Context(), req.Name, req.AccountPassword); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: akun dibuat", "account", req.Name, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

func (s *Server) handleSharingAccountPassword(w http.ResponseWriter, r *http.Request) {
	var req sharingAccountReq
	if !s.requireSharing(w) || !decode(w, r, &req) || !s.confirmPassword(w, r, req.Password) {
		return
	}
	name := r.PathValue("name")
	if err := s.deps.Sharing.SetPassword(r.Context(), name, req.AccountPassword); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: password akun diganti", "account", name, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

type sharingDisabledReq struct {
	sharingPasswordReq
	Disabled bool `json:"disabled"`
}

func (s *Server) handleSharingAccountDisabled(w http.ResponseWriter, r *http.Request) {
	var req sharingDisabledReq
	if !s.requireSharing(w) || !decode(w, r, &req) {
		return
	}
	// Turning a login back ON exposes something; turning one off never needs the password.
	if !req.Disabled && !s.confirmPassword(w, r, req.Password) {
		return
	}
	name := r.PathValue("name")
	if err := s.deps.Sharing.SetDisabled(r.Context(), name, req.Disabled); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: status akun diubah", "account", name, "disabled", req.Disabled, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

func (s *Server) handleSharingAccountDelete(w http.ResponseWriter, r *http.Request) {
	var req sharingPasswordReq
	if !s.requireSharing(w) || !decode(w, r, &req) || !s.confirmPassword(w, r, req.Password) {
		return
	}
	name := r.PathValue("name")
	if err := s.deps.Sharing.DeleteAccount(r.Context(), name); err != nil {
		sharingErr(w, err)
		return
	}
	slog.Info("sharing: akun dihapus", "account", name, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}
