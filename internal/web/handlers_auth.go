package web

import (
	"encoding/json"
	"net"
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/auth"
)

type loginRequest struct {
	Username string `json:"username"`
	Password string `json:"password"`
	// TOTPCode is only needed when the account has 2FA enabled — see the
	// two-step flow in handleAuthLogin. Omitted entirely on the first
	// request of a 2FA account; the client resubmits with it once the
	// user enters a code, in the same shape.
	TOTPCode string `json:"totpCode,omitempty"`
}

// sessionResponse is what the Vue app hydrates its auth store from — both
// on login and on GET /api/auth/session. CSRFToken travels here rather
// than a readable cookie since it's only ever needed by JS that already
// has an authenticated fetch call to attach it to.
type sessionResponse struct {
	Authenticated bool `json:"authenticated"`
	// TOTPRequired means username+password were correct but no session
	// was created yet — the client re-submits the same request with
	// totpCode filled in. Deliberately stateless (no server-side pending-
	// auth token): both checks land in one final request, which is
	// exactly what "prove you have the password AND the 2FA device"
	// means — see docs/07-security.md §7.1.
	TOTPRequired bool   `json:"totpRequired,omitempty"`
	Username     string `json:"username,omitempty"`
	CSRFToken    string `json:"csrfToken,omitempty"`
	// Version rides along here (rather than only /api/update/check) so the
	// AppShell topbar can show the running version immediately on boot —
	// this is called unconditionally on every fresh load, whereas the
	// update-check endpoint does a slow (up to 30s) GitHub round-trip and
	// is only ever triggered on-demand when the version popover is opened.
	Version string `json:"version"`
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

	if s.deps.Creds.TOTPEnabled() {
		if req.TOTPCode == "" {
			// Password alone was correct, but that's only half of what
			// this account needs — don't count it as a failure (it
			// isn't one) and don't create a session yet.
			writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false, TOTPRequired: true, Version: s.deps.Version})
			return
		}
		ok, err := s.deps.Creds.VerifyTOTPOrBackupCode(s.deps.CredentialsPath, req.TOTPCode, time.Now())
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, "Gagal memverifikasi kode TOTP.")
			return
		}
		if !ok {
			s.deps.RateLimiter.RecordFailure(ip)
			writeJSONError(w, http.StatusUnauthorized, "Kode TOTP salah.")
			return
		}
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

	writeJSON(w, http.StatusOK, sessionResponse{Authenticated: true, Username: sess.Username, CSRFToken: sess.CSRFToken, Version: s.deps.Version})
}

// handleAuthSession reports whether the request's session cookie (if any)
// is still valid. Always 200 — "not authenticated" is an expected, normal
// response here (the Vue router guard calls this on every fresh load,
// including at /login before any session exists), not an error condition.
func (s *Server) handleAuthSession(w http.ResponseWriter, r *http.Request) {
	cookie, err := r.Cookie(auth.CookieName)
	if err != nil {
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false, Version: s.deps.Version})
		return
	}
	sess := s.deps.Sessions.Validate(cookie.Value)
	if sess == nil {
		writeJSON(w, http.StatusOK, sessionResponse{Authenticated: false, Version: s.deps.Version})
		return
	}
	writeJSON(w, http.StatusOK, sessionResponse{Authenticated: true, Username: sess.Username, CSRFToken: sess.CSRFToken, Version: s.deps.Version})
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
