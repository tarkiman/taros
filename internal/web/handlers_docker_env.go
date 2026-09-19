package web

import (
	"encoding/json"
	"log/slog"
	"net/http"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/docker"
)

type containerEnvResponse struct {
	Name string          `json:"name"`
	Vars []docker.EnvVar `json:"vars"`
}

// handleDockerContainerEnv lists a container's environment variables with
// secret-looking values *withheld server-side* — the values are not in the
// response at all (not merely hidden by the UI), so nothing sensitive sits
// in the browser's memory/devtools/network log until the user explicitly
// reveals it via handleDockerContainerEnvReveal. Read-only: editing env
// means recreating the container, which belongs in the compose file.
func (s *Server) handleDockerContainerEnv(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	name, vars, err := s.deps.Docker.ContainerEnv(r.Context(), r.PathValue("id"))
	if err != nil {
		writeDockerActionError(w, apierr.DockerEnvFailed, "Gagal membaca environment container", nil, err)
		return
	}
	for i := range vars {
		if vars[i].Secret {
			vars[i].Value = ""
		}
	}
	if vars == nil {
		vars = []docker.EnvVar{}
	}
	writeJSON(w, http.StatusOK, containerEnvResponse{Name: name, Vars: vars})
}

type envRevealRequest struct {
	Password string `json:"password"`
}

// handleDockerContainerEnvReveal returns the withheld secret values, but
// only after the caller re-enters their own dashboard password — same
// re-confirmation bar as the Terminal/Port/TOTP-disable/user-management
// actions (403, not 401, see handlers_settings.go). Every successful
// reveal is logged with who/which container/how many secrets — never the
// values themselves.
func (s *Server) handleDockerContainerEnvReveal(w http.ResponseWriter, r *http.Request) {
	if !s.deps.DockerEnabled {
		s.writeDockerUnavailable(w, nil)
		return
	}
	var req envRevealRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		writeJSONError(w, http.StatusForbidden, apierr.WrongPassword, "password salah", nil)
		return
	}

	name, vars, err := s.deps.Docker.ContainerEnv(r.Context(), r.PathValue("id"))
	if err != nil {
		writeDockerActionError(w, apierr.DockerEnvFailed, "Gagal membaca environment container", nil, err)
		return
	}
	values := map[string]string{}
	for _, v := range vars {
		if v.Secret {
			values[v.Key] = v.Value
		}
	}
	slog.Info("docker: nilai environment rahasia dibuka", "container", name, "count", len(values), "by", sess.Username)
	writeJSON(w, http.StatusOK, map[string]map[string]string{"values": values})
}
