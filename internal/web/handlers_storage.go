package web

import (
	"errors"
	"log/slog"
	"net/http"
	"strings"
	"time"

	"context"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/storage"
)

// External drives (docs/04-features.md §4.17). Listing is read-only. Mounting,
// unmounting and ejecting are routine and need only the session; what *widens*
// exposure — turning auto-mount on, or turning noexec off — asks for the
// dashboard password again, like the other privilege-adjacent settings.

func (s *Server) requireStorage(w http.ResponseWriter) bool {
	if s.deps.Storage == nil {
		writeJSONError(w, http.StatusServiceUnavailable, apierr.StorageUnavailable, "penyimpanan eksternal tidak tersedia di platform ini", nil)
		return false
	}
	return true
}

func storageErr(w http.ResponseWriter, err error) {
	code, status := apierr.StorageFailed, http.StatusInternalServerError
	params := map[string]any{}
	var me *storage.MountError
	var ue *storage.UnmountError
	var be *storage.BusyError
	switch {
	case errors.As(err, &be):
		code, status, params["users"] = apierr.StorageBusy, http.StatusConflict, be.Summary()
	case errors.As(err, &me):
		code, status, params["detail"] = apierr.StorageMountFailed, http.StatusUnprocessableEntity, me.Detail
	case errors.As(err, &ue):
		code, status, params["detail"] = apierr.StorageUnmountFailed, http.StatusUnprocessableEntity, ue.Detail
	case errors.Is(err, storage.ErrUnavailable):
		code, status = apierr.StorageUnavailable, http.StatusServiceUnavailable
	case errors.Is(err, storage.ErrCannotMount):
		code, status = apierr.StorageCannotMount, http.StatusConflict
		if _, rest, ok := strings.Cut(err.Error(), "("); ok {
			params["reason"] = strings.TrimSuffix(rest, ")")
		}
	case errors.Is(err, storage.ErrNoSuchDevice), errors.Is(err, storage.ErrDeviceGone):
		code, status = apierr.StorageNoDevice, http.StatusNotFound
	case errors.Is(err, storage.ErrManagedByFstab):
		code, status = apierr.StorageManagedByFstab, http.StatusConflict
	case errors.Is(err, storage.ErrUnsupportedFS):
		code, status = apierr.StorageUnsupportedFS, http.StatusUnprocessableEntity
	case errors.Is(err, storage.ErrAlreadyMounted):
		code, status = apierr.StorageAlreadyMounted, http.StatusConflict
	case errors.Is(err, storage.ErrNotMounted):
		code, status = apierr.StorageNotMounted, http.StatusConflict
	case errors.Is(err, storage.ErrMountpoint):
		code, status = apierr.StorageMountpointInUse, http.StatusConflict
	default:
		if err != nil {
			params["detail"] = err.Error()
		}
	}
	writeJSONError(w, status, code, err.Error(), params)
}

func (s *Server) handleStorageDevices(w http.ResponseWriter, r *http.Request) {
	if !s.requireStorage(w) {
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	writeJSON(w, http.StatusOK, s.deps.Storage.Status(ctx))
}

type storageDeviceReq struct {
	Device string `json:"device"`
	Ignore bool   `json:"ignore"`
}

func (s *Server) storageAction(w http.ResponseWriter, r *http.Request, what string, fn func(ctx context.Context, device string) error) {
	var req storageDeviceReq
	if !s.requireStorage(w) || !decode(w, r, &req) {
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 90*time.Second)
	defer cancel()
	if err := fn(ctx, req.Device); err != nil {
		slog.Warn("storage: "+what+" ditolak", "device", req.Device, "err", err, "by", sessionFromContext(r.Context()).Username)
		storageErr(w, err)
		return
	}
	slog.Info("storage: "+what, "device", req.Device, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

func (s *Server) handleStorageMount(w http.ResponseWriter, r *http.Request) {
	s.storageAction(w, r, "mount", func(ctx context.Context, d string) error { return s.deps.Storage.Mount(ctx, d) })
}

func (s *Server) handleStorageUnmount(w http.ResponseWriter, r *http.Request) {
	s.storageAction(w, r, "unmount", func(ctx context.Context, d string) error { return s.deps.Storage.Unmount(ctx, d) })
}

func (s *Server) handleStorageEject(w http.ResponseWriter, r *http.Request) {
	s.storageAction(w, r, "eject", func(ctx context.Context, d string) error { return s.deps.Storage.Eject(ctx, d) })
}

// handleStorageIgnore: "never auto-mount this drive" (or undo it).
func (s *Server) handleStorageIgnore(w http.ResponseWriter, r *http.Request) {
	var req storageDeviceReq
	if !s.requireStorage(w) || !decode(w, r, &req) {
		return
	}
	if err := s.deps.Storage.SetIgnored(r.Context(), req.Device, req.Ignore); err != nil {
		storageErr(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

type storageSettingsReq struct {
	AutoMount bool   `json:"autoMount"`
	NoExec    bool   `json:"noExec"`
	Password  string `json:"password"`
}

// handleStorageSettings: turning auto-mount ON, or noexec OFF, makes TarOS more
// trusting of whatever gets plugged in, so those changes ask for the password.
func (s *Server) handleStorageSettings(w http.ResponseWriter, r *http.Request) {
	var req storageSettingsReq
	if !s.requireStorage(w) || !decode(w, r, &req) {
		return
	}
	cur := s.deps.Storage.Store.Get()
	if ((req.AutoMount && !cur.AutoMount) || (!req.NoExec && cur.NoExec)) && !s.confirmPassword(w, r, req.Password) {
		return
	}
	if err := s.deps.Storage.SetSettings(req.AutoMount, req.NoExec); err != nil {
		storageErr(w, err)
		return
	}
	slog.Info("storage: pengaturan diubah", "autoMount", req.AutoMount, "noExec", req.NoExec, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}
