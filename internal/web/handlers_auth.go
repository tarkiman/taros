package web

import (
	"encoding/json"
	"net"
	"net/http"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/auth"
)

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
}

// sessionResponse is what the Vue app hydrates its auth store from — both
// on login and on GET /api/auth/session. CSRFToken travels here rather
// than a readable cookie since it's only ever needed by JS that already
// has an authenticated fetch call to attach it to.
type sessionResponse struct {
	Authenticated bool   `json:"authenticated"`
	Username      string `json:"username,omitempty"`
	CSRFToken     string `json:"csrfToken,omitempty"`
}

// handleAuthLogin is the JSON counterpart of the old form-post login —
// the server-rendered login page is gone (see web/frontend LoginView.vue),
// so this is the only login entry point now.
func (s *Server) handleAuthLogin(w http.ResponseWriter, r *http.Request) {
	ip := clientIP(r)

	if !s.deps.RateLimiter.Allow(ip) {
		writeJSONError(w, http.StatusTooManyRequests, "Terlalu banyak percobaan gagal. Coba lagi beberapa menit lagi.")
		return
	}

	var req loginRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "Permintaan tidak valid.")
		return
	}

	if !s.deps.Creds.Verify(req.Username, req.Password) {
		s.deps.RateLimiter.RecordFailure(ip)
		writeJSONError(w, http.StatusUnauthorized, "Username atau password salah.")
		return
	}
	s.deps.RateLimiter.RecordSuccess(ip)

	token, sess, err := s.deps.Sessions.Create(req.Username)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "Gagal membuat sesi, coba lagi.")
		return
	}

	http.SetCookie(w, &http.Cookie{
		Name:     auth.CookieName,
		Value:    token,
		Path:     "/",
		HttpOnly: true,
		Secure:   r.TLS != nil,
		SameSite: http.SameSiteStrictMode,
		Expires:  sess.ExpiresAt,
	})

	writeJSON(w, http.StatusOK, sessionResponse{Authenticated: true, Username: sess.Username, CSRFToken: sess.CSRFToken})
}

// handleAuthSession reports whether the request's session cookie (if any)
// is still valid. Always 200 — "not authenticated" is an expected, normal
// response here (the Vue router guard calls this on every fresh load,
// including at /login before any session exists), not an error condition.
func (s *Server) handleAuthSession(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie(auth.CookieName)
	if err != nil {
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false})
		return
	}
	sess := s.deps.Sessions.Validate(cookie.Value)
	if sess == nil {
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false})
		return
	}
	writeJSON(w, http.StatusOK, sessionResponse{Authenticated: true, Username: sess.Username, CSRFToken: sess.CSRFToken})
}

func (s *Server) handleLogout(w http.ResponseWriter, r *http.Request) {
	if cookie, err := r.Cookie(auth.CookieName); err == nil {
		s.deps.Sessions.Delete(cookie.Value)
	}
	http.SetCookie(w, &http.Cookie{
		Name:     auth.CookieName,
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Expires:  time.Unix(0, 0),
	})
	writeJSON(w, http.StatusOK, map[string]bool{"ok": true})
}

func clientIP(r *http.Request) string {
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}

func writeJSON(w http.ResponseWriter, status int, v any) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(v)
}
