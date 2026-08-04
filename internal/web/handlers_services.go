package web

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/systemd"
)

// serviceUnitJSON adds Protected (config-driven, see internal/config
// SystemdConfig.ProtectedUnits) onto the raw systemd.Unit — same shape the
// old serviceViewUnit gave templates, now with explicit json tags.
type serviceUnitJSON struct {
	systemd.Unit
	Protected bool `json:"protected"`
}

// handleAPIServicesList supports ?showAll=1 (include socket/timer, not
// just service) and ?q=<text> / ?failedOnly=1 filters — see
// docs/04-features.md §4.3. systemctl responds well under a second even
// for 170+ units on this dev box, so this queries systemd directly per
// request — no background cache needed, see docs/05-data-storage.md.
func (s *Server) handleAPIServicesList(w http.ResponseWriter, r *http.Request) {
	types := "service"
	if r.URL.Query().Get("showAll") == "1" {
		types = "service,socket,timer"
	}

	ctx, cancel := context.WithTimeout(r.Context(), 8*time.Second)
	defer cancel()
	units, err := systemd.List(ctx, types)
	if err != nil {
		writeJSONError(w, http.StatusServiceUnavailable, "systemd tidak terdeteksi atau tidak bisa diakses: "+err.Error())
		return
	}

	q := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("q")))
	failedOnly := r.URL.Query().Get("failedOnly") == "1"

	filtered := make([]serviceUnitJSON, 0, len(units))
	for _, u := range units {
		if failedOnly && u.Active != "failed" {
			continue
		}
		if q != "" && !strings.Contains(strings.ToLower(u.Name), q) && !strings.Contains(strings.ToLower(u.Description), q) {
			continue
		}
		filtered = append(filtered, serviceUnitJSON{Unit: u, Protected: s.deps.ProtectedUnits[u.Name]})
	}

	writeJSON(w, http.StatusOK, map[string]any{"units": filtered})
}

var validServiceActions = map[string]func(context.Context, string) error{
	"start":   systemd.Start,
	"stop":    systemd.Stop,
	"restart": systemd.Restart,
	"reload":  systemd.Reload,
}

// handleAPIServiceAction runs the action then returns the refreshed list
// using the SAME query params the request carried, if any. Note this is a
// slight behavior improvement over the old htmx version, which always
// reset to unfiltered after an action (documented there as "simplifikasi
// yang disengaja, bukan bug") — for Vue this comes for free since the
// client just re-runs its own current-filter fetch after a successful
// action, so there's no reason to keep the old reset behavior.
func (s *Server) handleAPIServiceAction(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")
	action := r.PathValue("action")

	fn, ok := validServiceActions[action]
	if !ok {
		http.NotFound(w, r)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 15*time.Second)
	defer cancel()
	if err := fn(ctx, name); err != nil {
		writeJSONError(w, http.StatusInternalServerError,
			"Aksi gagal: "+action+" "+name+": "+err.Error()+" — lihat docs/09-deployment.md §9.2 soal privilege yang dibutuhkan aksi ini.")
		return
	}

	s.handleAPIServicesList(w, r)
}

func (s *Server) handleAPIServiceLogs(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")

	ctx, cancel := context.WithTimeout(r.Context(), 8*time.Second)
	defer cancel()
	logs, err := systemd.Tail(ctx, name, 50)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "Gagal membaca log: "+name+": "+err.Error())
		return
	}

	writeJSON(w, http.StatusOK, map[string]any{"unit": name, "logs": logs})
}
