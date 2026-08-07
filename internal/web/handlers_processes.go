package web

import (
	"net/http"
	"sort"
	"strconv"

	"github.com/tarkiman/taros/internal/store"
)

const (
	processesDefaultLimit = 10
	// processesMaxLimit covers the dedicated Proses page (internal/web
	// serves every process, client sorts/filters — see docs/04-features.md
	// §4.1), not just the Dashboard's top-5 widget. 1000 comfortably
	// exceeds process counts seen on real STB/RPi hosts in practice.
	processesMaxLimit = 1000
)

type processesResponse struct {
	Processes []store.ProcInfo `json:"processes"`
}

// handleProcesses serves the latest OS process sample (internal/collector/
// proc.go), sorted/limited per request rather than always returning
// everything — see docs/04-features.md §4.1 "Proses (per-process)" for
// why: the Dashboard's "Pemakai Teratas" widget only ever needs a handful
// of rows, so there's no reason to ship the full process table (100+ rows
// on a busy system) over the wire every time someone switches sort order.
func (s *Server) handleProcesses(w http.ResponseWriter, r *http.Request) {
	if !s.deps.SystemMonitoringSupported {
		writeMonitoringUnsupported(w)
		return
	}

	procs := append([]store.ProcInfo(nil), s.deps.Store.Processes()...)

	switch r.URL.Query().Get("sortBy") {
	case "mem":
		sort.Slice(procs, func(i, j int) bool { return procs[i].MemBytes > procs[j].MemBytes })
	default: // "cpu" or unset
		sort.Slice(procs, func(i, j int) bool { return procs[i].CPUPercent > procs[j].CPUPercent })
	}

	limit := processesDefaultLimit
	if v, err := strconv.Atoi(r.URL.Query().Get("limit")); err == nil && v > 0 && v <= processesMaxLimit {
		limit = v
	}
	if len(procs) > limit {
		procs = procs[:limit]
	}

	writeJSON(w, http.StatusOK, processesResponse{Processes: procs})
}
