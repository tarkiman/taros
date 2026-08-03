package web

import (
	"net"
	"net/http"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/auth"
)

func (s *Server) handleLoginPage(w http.ResponseWriter, r *http.Request) {
	s.tmpl.render(w, http.StatusOK, "login.html", map[string]any{})
}

func (s *Server) handleLoginSubmit(w http.ResponseWriter, r *http.Request) {
	ip := clientIP(r)

	if !s.rateLimiter.Allow(ip) {
		s.tmpl.render(w, http.StatusTooManyRequests, "login.html", map[string]any{
			"Error": "Terlalu banyak percobaan gagal. Coba lagi beberapa menit lagi.",
		})
		return
	}

	if err := r.ParseForm(); err != nil {
		s.tmpl.render(w, http.StatusBadRequest, "login.html", map[string]any{"Error": "Form tidak valid."})
		return
	}
	username := r.FormValue("username")
	password := r.FormValue("password")

	if !s.creds.Verify(username, password) {
		s.rateLimiter.RecordFailure(ip)
		s.tmpl.render(w, http.StatusUnauthorized, "login.html", map[string]any{
			"Error": "Username atau password salah.",
		})
		return
	}
	s.rateLimiter.RecordSuccess(ip)

	token, sess, err := s.sessions.Create(username)
	if err != nil {
		s.tmpl.render(w, http.StatusInternalServerError, "login.html", map[string]any{
			"Error": "Gagal membuat sesi, coba lagi.",
		})
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
	http.Redirect(w, r, "/", http.StatusSeeOther)
}

func (s *Server) handleLogout(w http.ResponseWriter, r *http.Request) {
	if cookie, err := r.Cookie(auth.CookieName); err == nil {
		s.sessions.Delete(cookie.Value)
	}
	http.SetCookie(w, &http.Cookie{
		Name:     auth.CookieName,
		Value:    "",
		Path:     "/",
		HttpOnly: true,
		Expires:  time.Unix(0, 0),
	})
	http.Redirect(w, r, "/login", http.StatusSeeOther)
}

func clientIP(r *http.Request) string {
	host, _, err := net.SplitHostPort(r.RemoteAddr)
	if err != nil {
		return r.RemoteAddr
	}
	return host
}
