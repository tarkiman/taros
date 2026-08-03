package web

import (
	"context"
	"net/http"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/docker"
)

var dockerTabs = map[string]bool{
	"containers": true, "images": true, "volumes": true, "networks": true, "settings": true,
}

func (s *Server) handleDockerPage(w http.ResponseWriter, r *http.Request) {
	tab := r.URL.Query().Get("tab")
	if !dockerTabs[tab] {
		tab = "containers"
	}
	sess := sessionFromContext(r.Context())
	s.tmpl.render(w, http.StatusOK, "docker.html", map[string]any{
		"Username":      sess.Username,
		"CSRFToken":     sess.CSRFToken,
		"Tab":           tab,
		"DockerEnabled": s.deps.DockerEnabled,
	})
}

// dockerUnavailable renders the graceful-degradation message shared by
// every fragment when Docker is disabled/unreachable — see
// docs/04-features.md §4.2.
func (s *Server) dockerUnavailable(w http.ResponseWriter, err error) {
	msg := "Docker tidak diaktifkan di konfigurasi."
	if s.deps.DockerEnabled {
		msg = "Docker tidak terdeteksi atau tidak bisa diakses."
	}
	s.tmpl.renderFragment(w, http.StatusOK, "docker_unavailable.html", map[string]any{
		"Message": msg,
		"Detail":  errString(err),
	})
}

func errString(err error) string {
	if err == nil {
		return ""
	}
	return err.Error()
}

func (s *Server) handleDockerContainersFragment(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
		return
	}
	containers, updatedAt, err := s.deps.DockerWatcher.Containers()
	if err != nil && len(containers) == 0 {
		s.dockerUnavailable(w, err)
		return
	}
	s.tmpl.renderFragment(w, http.StatusOK, "docker_containers.html", map[string]any{
		"Containers": containers,
		"UpdatedAt":  updatedAt,
	})
}

func (s *Server) handleDockerImagesFragment(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	images, err := s.deps.Docker.ListImages(ctx)
	if err != nil {
		s.dockerUnavailable(w, err)
		return
	}
	s.tmpl.renderFragment(w, http.StatusOK, "docker_images.html", map[string]any{"Images": images})
}

func (s *Server) handleDockerVolumesFragment(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	volumes, err := s.deps.Docker.ListVolumes(ctx)
	if err != nil {
		s.dockerUnavailable(w, err)
		return
	}
	s.tmpl.renderFragment(w, http.StatusOK, "docker_volumes.html", map[string]any{"Volumes": volumes})
}

func (s *Server) handleDockerNetworksFragment(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 5*time.Second)
	defer cancel()
	networks, err := s.deps.Docker.ListNetworks(ctx)
	if err != nil {
		s.dockerUnavailable(w, err)
		return
	}
	s.tmpl.renderFragment(w, http.StatusOK, "docker_networks.html", map[string]any{"Networks": networks})
}

func (s *Server) handleDockerSettingsFragment(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 10*time.Second)
	defer cancel()

	info, infoErr := s.deps.Docker.Info(ctx)
	du, duErr := s.deps.Docker.DiskUsage(ctx)
	if infoErr != nil && duErr != nil {
		s.dockerUnavailable(w, infoErr)
		return
	}
	s.tmpl.renderFragment(w, http.StatusOK, "docker_settings.html", map[string]any{
		"Info":      info,
		"DiskUsage": du,
	})
}

// handleDockerContainerAction handles start/stop/restart/remove, then
// re-renders the containers table so htmx can swap it in — see
// docs/06-api-ui-ux.md §6.1.
func (s *Server) handleDockerContainerAction(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
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
		s.tmpl.renderFragment(w, http.StatusOK, "docker_unavailable.html", map[string]any{
			"Message": "Aksi gagal: " + action,
			"Detail":  err.Error(),
		})
		return
	}

	// Force an immediate cache refresh so the swapped-in table reflects
	// the action right away instead of waiting for the next watch tick.
	s.deps.DockerWatcher.RefreshNow(ctx)
	s.handleDockerContainersFragment(w, r)
}

func (s *Server) handleDockerImageRemove(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := s.deps.Docker.RemoveImage(ctx, r.PathValue("id")); err != nil {
		s.tmpl.renderFragment(w, http.StatusOK, "docker_unavailable.html", map[string]any{
			"Message": "Hapus image gagal (mungkin masih dipakai container).",
			"Detail":  err.Error(),
		})
		return
	}
	s.handleDockerImagesFragment(w, r)
}

func (s *Server) handleDockerVolumeRemove(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := s.deps.Docker.RemoveVolume(ctx, r.PathValue("name")); err != nil {
		s.tmpl.renderFragment(w, http.StatusOK, "docker_unavailable.html", map[string]any{
			"Message": "Hapus volume gagal (mungkin masih dipakai container).",
			"Detail":  err.Error(),
		})
		return
	}
	s.handleDockerVolumesFragment(w, r)
}

func (s *Server) handleDockerNetworkRemove(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
		return
	}
	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := s.deps.Docker.RemoveNetwork(ctx, r.PathValue("id")); err != nil {
		s.tmpl.renderFragment(w, http.StatusOK, "docker_unavailable.html", map[string]any{
			"Message": "Hapus network gagal (mungkin builtin atau masih ada container terhubung).",
			"Detail":  err.Error(),
		})
		return
	}
	s.handleDockerNetworksFragment(w, r)
}

var validPruneKinds = map[string]docker.PruneKind{
	"containers": docker.PruneContainers,
	"images":     docker.PruneImages,
	"volumes":    docker.PruneVolumes,
	"networks":   docker.PruneNetworks,
}

func (s *Server) handleDockerPrune(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.dockerUnavailable(w, nil)
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
			s.tmpl.renderFragment(w, http.StatusOK, "docker_unavailable.html", map[string]any{
				"Message": "Cleanup gagal: " + string(k),
				"Detail":  err.Error(),
			})
			return
		}
	}
	s.handleDockerSettingsFragment(w, r)
}
