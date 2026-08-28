package web

import (
	"context"
	"errors"
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
//
// The actual walk goes through s.deps.DiskAnalysisScanner, not
// fileexplorer.Scan directly — that's what applies the I/O throttle,
// serializes concurrent scans, and enforces the wall-clock timeout (see
// its doc comment). Without those, this handler used to run one
// unthrottled, untimed-out walk of the whole fileExplorer.rootDir tree
// (default "/") per request — the same class of I/O-saturation hang
// documented for CasaOS, reproduced here on the read path.
func (s *Server) handleDiskAnalysisScan(w http.ResponseWriter, r *http.Request) {
	result, err := s.deps.DiskAnalysisScanner.Scan(r.Context())
	if err != nil {
		switch {
		case errors.Is(err, fileexplorer.ErrScanInProgress):
			writeJSONError(w, http.StatusConflict, apierr.DiskAnalysisScanBusy, err.Error(), nil)
		case errors.Is(err, context.DeadlineExceeded):
			writeJSONError(w, http.StatusGatewayTimeout, apierr.DiskAnalysisScanTimeout, err.Error(), nil)
		default:
			writeJSONError(w, http.StatusInternalServerError, apierr.DiskAnalysisScanFailed, err.Error(), map[string]any{"detail": err.Error()})
		}
		return
	}
	writeJSON(w, http.StatusOK, result)
}
