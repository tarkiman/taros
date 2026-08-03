package web

import (
	"net/http"
	"time"

	assets "github.com/tarkiman/tarkiman-os/web"

	"github.com/tarkiman/tarkiman-os/internal/auth"
	"github.com/tarkiman/tarkiman-os/internal/store"
)

// Server holds everything HTTP handlers need. It has no framework
// dependency — just the stdlib net/http (Go 1.22+ pattern-matching
// ServeMux), see docs/03-tech-stack.md.
type Server struct {
	tmpl        *templateSet
	sessions    *auth.SessionStore
	creds       *auth.Credentials
	rateLimiter *auth.LoginRateLimiter
	store       *store.Store
	sseInterval time.Duration
}

func NewServer(sessions *auth.SessionStore, creds *auth.Credentials, rateLimiter *auth.LoginRateLimiter, metricsStore *store.Store, sseInterval time.Duration) (*Server, error) {
	tmpl, err := loadTemplates()
	if err != nil {
		return nil, err
	}
	return &Server{
		tmpl:        tmpl,
		sessions:    sessions,
		creds:       creds,
		rateLimiter: rateLimiter,
		store:       metricsStore,
		sseInterval: sseInterval,
	}, nil
}

func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /login", s.handleLoginPage)
	mux.HandleFunc("POST /api/auth/login", s.handleLoginSubmit)
	mux.HandleFunc("POST /api/auth/logout", s.requireAuth(s.handleLogout))
	mux.HandleFunc("GET /{$}", s.requireAuth(s.handleDashboard))

	mux.HandleFunc("GET /api/stream/metrics", s.requireAuth(s.handleMetricsStream))
	mux.HandleFunc("GET /api/metrics/history", s.requireAuth(s.handleMetricsHistory))

	mux.Handle("GET /static/", http.FileServerFS(assets.Static))

	return recoverMiddleware(loggingMiddleware(mux))
}
