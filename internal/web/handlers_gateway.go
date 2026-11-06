package web

import (
	"net/http"

	"github.com/tarkiman/taros/internal/gateway"
)

type gatewayStatusResponse struct {
	Enabled bool              `json:"enabled"`
	Status  *gateway.Snapshot `json:"status,omitempty"`
}

// handleGatewayStatus returns the latest gateway snapshot (docs/04-features.md
// §4.18). It never triggers a poll itself: the monitor's own ticker keeps the
// snapshot fresh, so opening the page many times costs nothing extra.
func (s *Server) handleGatewayStatus(w http.ResponseWriter, r *http.Request) {
	if s.deps.Gateway == nil {
		writeJSON(w, http.StatusOK, gatewayStatusResponse{Enabled: false})
		return
	}
	snap := s.deps.Gateway.Snapshot()
	writeJSON(w, http.StatusOK, gatewayStatusResponse{Enabled: true, Status: &snap})
}
