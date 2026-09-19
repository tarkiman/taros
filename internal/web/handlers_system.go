package web

import (
	"net/http"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/netinfo"
)

// handleSystemMonitoringStatus reports whether resource monitoring
// (Dashboard/Proses, backed by internal/collector reading /proc) is
// available on this OS. See Deps.SystemMonitoringSupported.
func (s *Server) handleSystemMonitoringStatus(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]bool{"supported": s.deps.SystemMonitoringSupported})
}

// writeMonitoringUnsupported is the fallback for the metrics/processes
// endpoints themselves (defense in depth — the frontend is expected to
// check handleSystemMonitoringStatus first and never call these at all
// when unsupported, but a direct API call or a race shouldn't hang or
// silently return empty data instead of a clear reason).
func writeMonitoringUnsupported(w http.ResponseWriter) {
	writeJSONError(w, http.StatusServiceUnavailable, apierr.MonitoringUnsupported, "Monitoring resource sistem tidak didukung di OS ini — fitur ini butuh Linux (baca /proc langsung, lihat internal/collector).", nil)
}

// handleSystemAddresses lists this host's IPv4 addresses per interface for
// the Dashboard "Alamat Host" card — see internal/netinfo. Not gated on
// SystemMonitoringSupported: it only uses the stdlib's net.Interfaces, so
// it works on the macOS build too. ?all=1 also includes Docker bridges/
// veths, hidden by default as noise.
func (s *Server) handleSystemAddresses(w http.ResponseWriter, r *http.Request) {
	addrs, err := netinfo.List(r.URL.Query().Get("all") == "1")
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, apierr.NetInfoFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	if addrs == nil {
		addrs = []netinfo.Address{}
	}
	writeJSON(w, http.StatusOK, map[string][]netinfo.Address{"addresses": addrs})
}
