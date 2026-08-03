package web

import (
	"net/http"
	"time"

	assets "github.com/tarkiman/tarkiman-os/web"

	"github.com/tarkiman/tarkiman-os/internal/auth"
	"github.com/tarkiman/tarkiman-os/internal/docker"
	"github.com/tarkiman/tarkiman-os/internal/store"
)

// Deps are every dependency Server's handlers need. Passed as a struct
// (rather than a growing positional-argument list) since Fase 2 already
// pushed this past what's comfortable to call positionally.
type Deps struct {
	Sessions    *auth.SessionStore
	Creds       *auth.Credentials
	RateLimiter *auth.LoginRateLimiter
	Store       *store.Store
	SSEInterval time.Duration

	// Docker is nil when docker.enabled=false in config — handlers must
	// check DockerEnabled before dereferencing it. See
	// docs/04-features.md §4.2 "Graceful Degradation".
	DockerEnabled bool
	Docker        *docker.Client
	DockerWatcher *docker.Watcher
}

// Server holds everything HTTP handlers need. It has no framework
// dependency — just the stdlib net/http (Go 1.22+ pattern-matching
// ServeMux), see docs/03-tech-stack.md.
type Server struct {
	tmpl *templateSet
	deps Deps
}

func NewServer(deps Deps) (*Server, error) {
	tmpl, err := loadTemplates()
	if err != nil {
		return nil, err
	}
	return &Server{tmpl: tmpl, deps: deps}, nil
}

func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /login", s.handleLoginPage)
	mux.HandleFunc("POST /api/auth/login", s.handleLoginSubmit)
	mux.HandleFunc("POST /api/auth/logout", s.requireAuth(s.handleLogout))
	mux.HandleFunc("GET /{$}", s.requireAuth(s.handleDashboard))

	mux.HandleFunc("GET /api/stream/metrics", s.requireAuth(s.handleMetricsStream))
	mux.HandleFunc("GET /api/metrics/history", s.requireAuth(s.handleMetricsHistory))

	mux.HandleFunc("GET /docker", s.requireAuth(s.handleDockerPage))
	mux.HandleFunc("GET /fragments/docker/containers", s.requireAuth(s.handleDockerContainersFragment))
	mux.HandleFunc("GET /fragments/docker/images", s.requireAuth(s.handleDockerImagesFragment))
	mux.HandleFunc("GET /fragments/docker/volumes", s.requireAuth(s.handleDockerVolumesFragment))
	mux.HandleFunc("GET /fragments/docker/networks", s.requireAuth(s.handleDockerNetworksFragment))
	mux.HandleFunc("GET /fragments/docker/settings", s.requireAuth(s.handleDockerSettingsFragment))
	mux.HandleFunc("POST /fragments/docker/containers/{id}/{action}", s.requireAuth(s.handleDockerContainerAction))
	mux.HandleFunc("POST /fragments/docker/images/{id}/remove", s.requireAuth(s.handleDockerImageRemove))
	mux.HandleFunc("POST /fragments/docker/volumes/{name}/remove", s.requireAuth(s.handleDockerVolumeRemove))
	mux.HandleFunc("POST /fragments/docker/networks/{id}/remove", s.requireAuth(s.handleDockerNetworkRemove))
	mux.HandleFunc("POST /fragments/docker/prune/{kind}", s.requireAuth(s.handleDockerPrune))

	mux.Handle("GET /static/", http.FileServerFS(assets.Static))

	return recoverMiddleware(loggingMiddleware(mux))
}
