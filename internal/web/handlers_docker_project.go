package web

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/docker"
)

// writeProjectError maps the docker package's project sentinels onto
// apierr codes; anything else goes through the generic action error.
func writeProjectError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, docker.ErrInvalidAction):
		writeJSONError(w, http.StatusBadRequest, apierr.DockerProjectActionInvalid, "aksi tidak dikenal", nil)
	case errors.Is(err, docker.ErrBusyProject):
		writeJSONError(w, http.StatusConflict, apierr.DockerProjectBusy, "aplikasi ini sedang menjalankan aksi lain", nil)
	case errors.Is(err, docker.ErrProjectNotFound):
		writeJSONError(w, http.StatusNotFound, apierr.DockerProjectNotFound, "aplikasi tidak ditemukan", nil)
	case errors.Is(err, docker.ErrProjectRunsThis):
		writeJSONError(w, http.StatusConflict, apierr.DockerProjectRunsThis, "TarOS sendiri berjalan di dalam aplikasi ini", nil)
	default:
		writeDockerActionError(w, apierr.DockerProjectUninstallFail, "Gagal membaca/meng-uninstall aplikasi", nil, err)
	}
}

// handleDockerProjectPlan is the dry run shown in the uninstall dialog:
// exactly which containers/networks/volumes/images carry the project's
// compose label. Read-only.
func (s *Server) handleDockerProjectPlan(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	plan, err := s.deps.Docker.ProjectPlan(ctx, r.PathValue("name"))
	if err != nil {
		writeProjectError(w, err)
		return
	}
	writeJSON(w, http.StatusOK, plan)
}

type projectUninstallRequest struct {
	Password      string `json:"password"`
	ConfirmName   string `json:"confirmName"`
	RemoveVolumes bool   `json:"removeVolumes"`
	RemoveImages  bool   `json:"removeImages"`
}

// handleDockerProjectUninstall removes a whole compose project — the most
// destructive Docker action here, so it clears a higher bar than the
// per-container ones: the caller's own dashboard password (403 not 401,
// see handlers_settings.go) AND the project name typed back (checked
// server-side too, so a scripted call can't skip it). Volumes and images
// are opt-in; the compose files on disk are never touched. Every attempt is
// audit-logged with who/what/how many, and the app's tile customization
// (icon/URL) is dropped along with it.
func (s *Server) handleDockerProjectUninstall(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	var req projectUninstallRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	name := r.PathValue("name")
	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}
	if req.ConfirmName != name {
		writeJSONError(w, http.StatusBadRequest, apierr.DockerProjectConfirmMissing, "nama aplikasi yang diketik tidak cocok", nil)
		return
	}

	// Generous: containers are stopped gracefully (up to their own stop
	// timeout each, in parallel) before removal.
	ctx, cancel := context.WithTimeout(r.Context(), 3*time.Minute)
	defer cancel()
	opts := docker.UninstallOptions{RemoveVolumes: req.RemoveVolumes, RemoveImages: req.RemoveImages}
	res, err := s.deps.Docker.UninstallProject(ctx, name, opts)
	if err != nil {
		slog.Warn("docker: uninstall aplikasi gagal", "project", name, "by", sess.Username, "err", err)
		writeProjectError(w, err)
		return
	}

	slog.Info("docker: aplikasi di-uninstall",
		"project", name, "by", sess.Username,
		"containers", res.Removed("container"), "networks", res.Removed("network"),
		"volumes", res.Removed("volume"), "images", res.Removed("image"),
		"failed", res.Failed(), "withVolumes", req.RemoveVolumes, "withImages", req.RemoveImages)

	// Only once the app is really gone (no container left behind).
	if s.deps.AppMeta != nil && !containersFailed(res) {
		if _, ok := s.deps.AppMeta.All()[name]; ok {
			if _, err := s.deps.AppMeta.Set(name, "", ""); err != nil {
				slog.Warn("docker: gagal menghapus kustomisasi tile aplikasi", "project", name, "err", err)
			}
		}
	}

	s.deps.DockerWatcher.RefreshNow(ctx)
	writeJSON(w, http.StatusOK, res)
}

func containersFailed(res docker.UninstallResult) bool {
	for _, st := range res.Steps {
		if st.Kind == "container" && !st.OK {
			return true
		}
	}
	return false
}

type projectLifecycleRequest struct {
	Action string `json:"action"` // start | stop | restart
}

// handleDockerProjectLifecycle starts/stops/restarts a whole compose project
// in dependency order (dependencies first when starting, dependents first
// when stopping — see internal/docker/lifecycle.go). It returns 202 at once;
// the work runs in the background and is read from the GET below. Like the
// per-container actions it needs no password re-entry (the UI asks for a
// confirmation on stop/restart), but every request is audit-logged.
func (s *Server) handleDockerProjectLifecycle(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	var req projectLifecycleRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	name := r.PathValue("name")
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()
	job, err := s.deps.Lifecycle.Run(ctx, name, req.Action)
	if err != nil {
		writeProjectError(w, err)
		return
	}
	slog.Info("docker: aksi aplikasi dimulai", "project", name, "action", req.Action, "by", sessionFromContext(r.Context()).Username)
	writeJSON(w, http.StatusAccepted, map[string]any{"job": job})
}

// handleDockerProjectJob returns the latest lifecycle job of a project
// (null when none ran since TarOS started).
func (s *Server) handleDockerProjectJob(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	job, ok := s.deps.Lifecycle.Job(r.PathValue("name"))
	if !ok {
		writeJSON(w, http.StatusOK, map[string]any{"job": nil})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"job": job})
}
