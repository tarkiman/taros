package web

import (
	"context"
	"log/slog"
	"net/http"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/auth"
)

type sessionCtxKey struct{}

func sessionFromContext(ctx context.Context) *auth.Session {
	sess, _ := ctx.Value(sessionCtxKey{}).(*auth.Session)
	return sess
}

// requireAuth rejects requests without a valid session cookie, redirecting
// browsers to /login. For state-changing methods it also requires a valid
// CSRF token (form field or X-CSRF-Token header) — see docs/07-security.md §7.2.
func (s *Server) requireAuth(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		cookie, err := r.Cookie(auth.CookieName)
		if err != nil {
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}
		sess := s.deps.Sessions.Validate(cookie.Value)
		if sess == nil {
			http.Redirect(w, r, "/login", http.StatusSeeOther)
			return
		}

		if r.Method == http.MethodPost || r.Method == http.MethodPut || r.Method == http.MethodDelete {
			token := r.Header.Get("X-CSRF-Token")
			if token == "" {
				token = r.FormValue("csrf_token")
			}
			if !sess.ValidCSRF(token) {
				http.Error(w, "invalid or missing CSRF token", http.StatusForbidden)
				return
			}
		}

		ctx := context.WithValue(r.Context(), sessionCtxKey{}, sess)
		next(w, r.WithContext(ctx))
	}
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		start := time.Now()
		next.ServeHTTP(w, r)
		slog.Info("http request",
			"method", r.Method,
			"path", r.URL.Path,
			"remote", r.RemoteAddr,
			"duration_ms", time.Since(start).Milliseconds(),
		)
	})
}

func recoverMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		defer func() {
			if rec := recover(); rec != nil {
				slog.Error("panic recovered", "err", rec, "path", r.URL.Path)
				http.Error(w, "internal error", http.StatusInternalServerError)
			}
		}()
		next.ServeHTTP(w, r)
	})
}
