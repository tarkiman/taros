package web

import "net/http"

func (s *Server) handleDashboard(w http.ResponseWriter, r *http.Request) {
	sess := sessionFromContext(r.Context())
	s.tmpl.render(w, http.StatusOK, "dashboard.html", map[string]any{
		"Username":  sess.Username,
		"CSRFToken": sess.CSRFToken,
		"Snapshot":  s.deps.Store.Latest(),
	})
}
