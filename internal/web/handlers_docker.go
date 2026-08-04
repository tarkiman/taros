package web

import (
	"context"
	"errors"
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/docker"
)

// dockerUnavailableJSON is the JSON counterpart of the old error_panel.html
// degradation path — see docs/04-features.md §4.2. `enabled` lets the Vue
// DockerView distinguish "off in config" from "on but unreachable" without
// parsing the message text.
type dockerUnavailableJSON struct {
	Error   string `json:"error"`
	Enabled bool   `json:"enabled"`
}

func (s *Server) writeDockerUnavailable(w http.ResponseWriter, err error) {
	msg := "Docker tidak diaktifkan di konfigurasi."
	if s.deps.DockerEnabled {
		msg = "Docker tidak terdeteksi atau tidak bisa diakses."
		if err != nil {
			msg += " (" + err.Error() + ")"
		}
	}
	writeJSON(w, http.StatusServiceUnavailable, dockerUnavailableJSON{Error: msg, Enabled: s.deps.DockerEnabled})
}

// writeDockerActionError maps a docker.APIError's real HTTP status (e.g.
// 409 "still in use") through to the client instead of flattening every
// failure to 500 — the Vue action buttons show the daemon's own message.
func writeDockerActionError(w http.ResponseWriter, fallbackMsg string, err error) {
	var apiErr *docker.APIError
	if errors.As(err, &apiErr) {
		writeJSONError(w, apiErr.StatusCode, fallbackMsg+": "+apiErr.Message)
		return
	}
	writeJSONError(w, http.StatusInternalServerError, fallbackMsg+": "+err.Error())
}

type containersResponse struct {
	Containers []docker.Container `json:"containers"`
	UpdatedAt  time.Time          `json:"updatedAt"`
}

func (s *Server) handleAPIDockerContainers(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	containers, updatedAt, err := s.deps.DockerWatcher.Containers()
	if err != nil && len(containers) == 0 {
		s.writeDockerUnavailable(w, err)
		return
	}
	writeJSON(w, http.StatusOK, containersResponse{Containers: containers, UpdatedAt: updatedAt})
}

func (s *Server) handleAPIDockerImages(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	images, err := s.deps.Docker.ListImages(ctx)
	if err != nil {
		s.writeDockerUnavailable(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"images": images})
}

func (s *Server) handleAPIDockerVolumes(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	volumes, err := s.deps.Docker.ListVolumes(ctx)
	if err != nil {
		s.writeDockerUnavailable(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"volumes": volumes})
}

func (s *Server) handleAPIDockerNetworks(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	networks, err := s.deps.Docker.ListNetworks(ctx)
	if err != nil {
		s.writeDockerUnavailable(w, err)
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"networks": networks})
}

type settingsResponse struct {
	Info      docker.Info      `json:"info"`
	DiskUsage docker.DiskUsage `json:"diskUsage"`
}

func (s *Server) handleAPIDockerSettings(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	info, infoErr := s.deps.Docker.Info(ctx)
	du, duErr := s.deps.Docker.DiskUsage(ctx)
	if infoErr != nil && duErr != nil {
		s.writeDockerUnavailable(w, infoErr)
		return
	}
	writeJSON(w, http.StatusOK, settingsResponse{Info: info, DiskUsage: du})
}

// handleAPIDockerContainerAction handles start/stop/restart/remove, then
// returns the refreshed container list so the Vue table can update from
// the response directly (no second round-trip) — same "force a watcher
// refresh so the result is immediate" behavior as before the JSON move.
func (s *Server) handleAPIDockerContainerAction(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	id := r.PathValue("id")
	action := r.PathValue("action")

	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()

	var err error
	switch action {
	case "start":
		err = s.deps.Docker.StartContainer(ctx, id)
	case "stop":
		err = s.deps.Docker.StopContainer(ctx, id)
	case "restart":
		err = s.deps.Docker.RestartContainer(ctx, id)
	case "remove":
		err = s.deps.Docker.RemoveContainer(ctx, id)
	default:
		http.NotFound(w, r)
		return
	}
	if err != nil {
		writeDockerActionError(w, "Aksi "+action+" gagal", err)
		return
	}

	s.deps.DockerWatcher.RefreshNow(ctx)
	s.handleAPIDockerContainers(w, r)
}

func (s *Server) handleAPIDockerImageRemove(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := s.deps.Docker.RemoveImage(ctx, r.PathValue("id")); err != nil {
		writeDockerActionError(w, "Hapus image gagal (mungkin masih dipakai container)", err)
		return
	}
	s.handleAPIDockerImages(w, r)
}

func (s *Server) handleAPIDockerVolumeRemove(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := s.deps.Docker.RemoveVolume(ctx, r.PathValue("name")); err != nil {
		writeDockerActionError(w, "Hapus volume gagal (mungkin masih dipakai container)", err)
		return
	}
	s.handleAPIDockerVolumes(w, r)
}

func (s *Server) handleAPIDockerNetworkRemove(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := s.deps.Docker.RemoveNetwork(ctx, r.PathValue("id")); err != nil {
		writeDockerActionError(w, "Hapus network gagal (mungkin builtin atau masih ada container terhubung)", err)
		return
	}
	s.handleAPIDockerNetworks(w, r)
}

var validPruneKinds = map[string]docker.PruneKind{
	"containers": docker.PruneContainers,
	"images":     docker.PruneImages,
	"volumes":    docker.PruneVolumes,
	"networks":   docker.PruneNetworks,
}

func (s *Server) handleAPIDockerPrune(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	kind := r.PathValue("kind")

	ctx, cancel := context.WithTimeout(r.Context(), 30*time.Second)
	defer cancel()

	var kinds []docker.PruneKind
	if kind == "all" {
		kinds = []docker.PruneKind{docker.PruneContainers, docker.PruneImages, docker.PruneVolumes, docker.PruneNetworks}
	} else if k, ok := validPruneKinds[kind]; ok {
		kinds = []docker.PruneKind{k}
	} else {
		http.NotFound(w, r)
		return
	}

	for _, k := range kinds {
		if _, err := s.deps.Docker.Prune(ctx, k); err != nil {
			writeDockerActionError(w, "Cleanup gagal: "+string(k), err)
			return
		}
	}
	s.handleAPIDockerSettings(w, r)
}
