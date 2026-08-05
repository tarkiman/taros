package web

import (
	"encoding/json"
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/tarkiman/taros/internal/config"
)

type settingsTerminalRequest struct {
	Enabled  bool   `json:"enabled"`
	Password string `json:"password"`
}

// handleSettingsTerminal flips terminal.enabled in config.yaml, then exits
// so systemd (Restart=always) brings the process back up reading the new
// value — same restart-and-reload mechanism as self-update
// (handlers_update.go), reused here rather than trying to re-register
// routes on a live *http.ServeMux (net/http's ServeMux has no supported
// way to unregister a pattern, and even if it did, docs/07-security.md
// §7.6 wants the WS route genuinely absent when off, not just gated).
//
// Requires re-entering the dashboard password even though the caller
// already has a valid session — this flips the single highest-risk
// feature in the app (real shell access), so a stolen/left-open session
// alone shouldn't be enough, matching the "conscious yes" bar the
// install-time docker-group/root-mode prompts already hold toggling
// privilege to.
func (s *Server) handleSettingsTerminal(w http.ResponseWriter, r *http.Request) {
	var req settingsTerminalRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "body tidak valid")
		return
	}

	sess := sessionFromContext(r.Context())
	if !s.deps.Creds.Verify(sess.Username, req.Password) {
		// 403, not 401: the session itself is still valid (this is a
		// re-confirmation, not the original login) — api/client.ts
		// treats any 401 as "session expired" and force-redirects to
		// /login, which would be wrong here (wipes the in-progress form,
		// confusing after just typing the *dashboard* password correctly
		// moments ago to even load this page).
		writeJSONError(w, http.StatusForbidden, "password salah")
		return
	}

	if err := config.SetTerminalEnabled(s.deps.ConfigPath, req.Enabled); err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}

	slog.Info("settings: terminal.enabled diubah, restart", "enabled", req.Enabled, "username", sess.Username)
	writeJSON(w, http.StatusOK, map[string]bool{"enabled": req.Enabled})

	go func() {
		time.Sleep(700 * time.Millisecond)
		os.Exit(0)
	}()
}
