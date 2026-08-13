package web

import (
	"net/http"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/fileexplorer"
)

// handleDiskAnalysisStatus is always registered — see docs/04-features.md
// §4.12, same "let the UI show a clear disabled state" reasoning as
// /api/terminal/status.
func (s *Server) handleDiskAnalysisStatus(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]bool{"enabled": s.deps.DiskAnalysisEnabled})
}

// handleDiskAnalysisScan is only registered when DiskAnalysisEnabled — see
// router.go, same "removed from routing entirely when off" treatment as
// the terminal WS endpoint, since this walks the whole Jail.Root tree.
// Read-only: reports the largest files/directories, never deletes
// anything itself — deletion goes through the existing
// POST /api/files/op {"action":"delete"} endpoint, already Jail-scoped.
func (s *Server) handleDiskAnalysisScan(w http.ResponseWriter, r *http.Request) {
	result, err := fileexplorer.Scan(r.Context(), s.deps.Jail)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, apierr.DiskAnalysisScanFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, result)
}
