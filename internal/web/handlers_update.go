package web

import (
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/tarkiman/taros/internal/selfupdate"
)

type updateCheckResponse struct {
	Enabled         bool   `json:"enabled"`
	CurrentVersion  string `json:"currentVersion"`
	LatestVersion   string `json:"latestVersion,omitempty"`
	UpdateAvailable bool   `json:"updateAvailable"`
}

// handleUpdateCheck is always registered regardless of update.enabled, so
// the UI can show a clear "dinonaktifkan" state — same reasoning as
// /api/terminal/status.
func (s *Server) handleUpdateCheck(w http.ResponseWriter, r *http.Request) {
	if !s.deps.UpdateEnabled {
		writeJSON(w, http.StatusOK, updateCheckResponse{Enabled: false, CurrentVersion: s.deps.Version})
		return
	}

	info, err := selfupdate.CheckLatest(r.Context())
	if err != nil {
		writeJSONError(w, http.StatusBadGateway, err.Error())
		return
	}

	writeJSON(w, http.StatusOK, updateCheckResponse{
		Enabled:         true,
		CurrentVersion:  s.deps.Version,
		LatestVersion:   info.Version,
		UpdateAvailable: info.Version != s.deps.Version,
	})
}

// handleUpdateApply downloads and applies the latest release, then exits
// the process so systemd (Restart=always, see deploy/systemd/taros.service)
// brings it back up running the new binary — see internal/selfupdate and
// docs/09-deployment.md §9.5 for why this needs no sudo/systemctl access.
// The exit is deferred to a goroutine so the success response actually
// reaches the client first, instead of racing the process's own death.
func (s *Server) handleUpdateApply(w http.ResponseWriter, r *http.Request) {
	if !s.deps.UpdateEnabled {
		writeJSONError(w, http.StatusForbidden, "update: dinonaktifkan di config (update.enabled)")
		return
	}

	info, err := selfupdate.CheckLatest(r.Context())
	if err != nil {
		writeJSONError(w, http.StatusBadGateway, err.Error())
		return
	}
	if info.Version == s.deps.Version {
		writeJSON(w, http.StatusOK, map[string]string{"version": info.Version, "message": "sudah di versi terbaru"})
		return
	}

	if err := selfupdate.Apply(r.Context(), info.DownloadURL); err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}

	sess := sessionFromContext(r.Context())
	slog.Info("selfupdate: applied, restarting", "from", s.deps.Version, "to", info.Version, "username", sess.Username)
	writeJSON(w, http.StatusOK, map[string]string{"version": info.Version})

	go func() {
		time.Sleep(700 * time.Millisecond)
		os.Exit(0)
	}()
}
