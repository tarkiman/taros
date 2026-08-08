package web

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/docker"
)

// dockerUnavailableJSON is the JSON counterpart of the old error_panel.html
// degradation path — see docs/04-features.md §4.2. `enabled` lets the Vue
// DockerView distinguish "off in config" from "on but unreachable" without
// parsing the message text. Code/Params follow the same shape as
// apiErrorBody (errors.go) even though this doesn't go through
// writeJSONError — DockerView.vue's isUnavailable() type-guard already
// expects `enabled` alongside `error`, so Code/Params are additive here
// for the same reason they are there.
type dockerUnavailableJSON struct {
	Error   string         `json:"error"`
	Enabled bool           `json:"enabled"`
	Code    string         `json:"code,omitempty"`
	Params  map[string]any `json:"params,omitempty"`
}

func (s *Server) writeDockerUnavailable(w http.ResponseWriter, err error) {
	msg := "Docker tidak diaktifkan di konfigurasi."
	code := apierr.DockerDisabled
	var params map[string]any
	if s.deps.DockerEnabled {
		code = apierr.DockerUnreachable
		msg = "Docker tidak terdeteksi atau tidak bisa diakses."
		if err != nil {
			msg += " (" + err.Error() + ")"
			params = map[string]any{"detail": err.Error()}
		}
	}
	writeJSON(w, http.StatusServiceUnavailable, dockerUnavailableJSON{Error: msg, Enabled: s.deps.DockerEnabled, Code: code, Params: params})
}

// writeDockerActionError maps a docker.APIError's real HTTP status (e.g.
// 409 "still in use") through to the client instead of flattening every
// failure to 500 — the Vue action buttons show the daemon's own message.
// params is nil for call sites with no extra interpolation beyond detail
// (most of them); "detail" is always added here, callers don't set it
// themselves.
func writeDockerActionError(w http.ResponseWriter, code, fallbackMsg string, params map[string]any, err error) {
	if params == nil {
		params = map[string]any{}
	}
	var apiErr *docker.APIError
	if errors.As(err, &apiErr) {
		params["detail"] = apiErr.Message
		writeJSONError(w, apiErr.StatusCode, code, fallbackMsg+": "+apiErr.Message, params)
		return
	}
	params["detail"] = err.Error()
	writeJSONError(w, http.StatusInternalServerError, code, fallbackMsg+": "+err.Error(), params)
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
		writeDockerActionError(w, apierr.DockerContainerActionFailed, "Aksi "+action+" gagal", map[string]any{"action": action}, err)
		return
	}

	s.deps.DockerWatcher.RefreshNow(ctx)
	s.handleAPIDockerContainers(w, r)
}

// handleDockerContainerLogsStream pushes container log lines over SSE —
// event-driven (one push per log line as the container writes it), unlike
// handleMetricsStream's fixed-interval ticker, since log lines arrive
// whenever the container's process happens to write to stdout/stderr, not
// on a schedule. tail/sinceMin bound the initial backlog Docker sends
// before switching to live follow — see docs/04-features.md §4.2 "Log
// Container" for why both exist (a container that's already logged for
// days shouldn't make the first connect expensive).
func (s *Server) handleDockerContainerLogsStream(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	id := r.PathValue("id")

	tail := clampInt(queryInt(r, "tail", 500), 1, 2000)
	sinceMin := clampInt(queryInt(r, "sinceMin", 15), 1, 1440)
	since := time.Now().Add(-time.Duration(sinceMin) * time.Minute)

	lines, err := s.deps.Docker.ContainerLogs(r.Context(), id, tail, since)
	if err != nil {
		writeDockerActionError(w, apierr.DockerLogsFailed, "Gagal membaca log container", nil, err)
		return
	}

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")
	w.WriteHeader(http.StatusOK)
	flusher.Flush()

	for line := range lines {
		data, err := json.Marshal(line)
		if err != nil {
			continue
		}
		if _, err := w.Write([]byte("data: ")); err != nil {
			return
		}
		if _, err := w.Write(data); err != nil {
			return
		}
		if _, err := w.Write([]byte("\n\n")); err != nil {
			return
		}
		flusher.Flush()
	}
}

func queryInt(r *http.Request, key string, def int) int {
	v := r.URL.Query().Get(key)
	if v == "" {
		return def
	}
	n, err := strconv.Atoi(v)
	if err != nil {
		return def
	}
	return n
}

func clampInt(v, min, max int) int {
	if v < min {
		return min
	}
	if v > max {
		return max
	}
	return v
}

func (s *Server) handleAPIDockerImageRemove(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := s.deps.Docker.RemoveImage(ctx, r.PathValue("id")); err != nil {
		writeDockerActionError(w, apierr.DockerImageRemoveFailed, "Hapus image gagal (mungkin masih dipakai container)", nil, err)
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
		writeDockerActionError(w, apierr.DockerVolumeRemoveFailed, "Hapus volume gagal (mungkin masih dipakai container)", nil, err)
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
		writeDockerActionError(w, apierr.DockerNetworkRemoveFailed, "Hapus network gagal (mungkin builtin atau masih ada container terhubung)", nil, err)
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
			writeDockerActionError(w, apierr.DockerPruneFailed, "Cleanup gagal: "+string(k), map[string]any{"kind": string(k)}, err)
			return
		}
	}
	s.handleAPIDockerSettings(w, r)
}
