package web

import (
	"net/http"

	assets "github.com/tarkiman/tarkiman-os/web"

	"github.com/tarkiman/tarkiman-os/internal/auth"
)

// Server holds everything HTTP handlers need. It has no framework
// dependency — just the stdlib net/http (Go 1.22+ pattern-matching
// ServeMux), see docs/03-tech-stack.md.
type Server struct {
	tmpl        *templateSet
	sessions    *auth.SessionStore
	creds       *auth.Credentials
	rateLimiter *auth.LoginRateLimiter
}

func NewServer(sessions *auth.SessionStore, creds *auth.Credentials, rateLimiter *auth.LoginRateLimiter) (*Server, error) {
	tmpl, err := loadTemplates()
	if err != nil {
		return nil, err
	}
	return &Server{
		tmpl:        tmpl,
		sessions:    sessions,
		creds:       creds,
		rateLimiter: rateLimiter,
	}, nil
}

func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	mux.HandleFunc("GET /login", s.handleLoginPage)
	mux.HandleFunc("POST /api/auth/login", s.handleLoginSubmit)
	mux.HandleFunc("POST /api/auth/logout", s.requireAuth(s.handleLogout))
	mux.HandleFunc("GET /{$}", s.requireAuth(s.handleDashboard))

	mux.Handle("GET /static/", http.FileServerFS(assets.Static))

	return recoverMiddleware(loggingMiddleware(mux))
}
