package web

import (
	"net/http"
	"sort"
	"strconv"

	"github.com/tarkiman/taros/internal/store"
)

const (
	processesDefaultLimit = 10
	processesMaxLimit     = 100
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
