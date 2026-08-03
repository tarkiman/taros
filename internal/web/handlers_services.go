package web

import (
	"context"
	"net/http"
	"strings"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/systemd"
)

func (s *Server) handleServicesPage(w http.ResponseWriter, r *http.Request) {
	sess := sessionFromContext(r.Context())
	s.tmpl.render(w, http.StatusOK, "services.html", map[string]any{
		"Username":  sess.Username,
		"CSRFToken": sess.CSRFToken,
	})
}

type serviceViewUnit struct {
	systemd.Unit
	Protected bool
}

// handleServicesListFragment supports ?showAll=1 (include socket/timer,
// not just service) and ?q=<text> / ?failedOnly=1 filters — see
// docs/04-features.md §4.3. Unlike Docker's container stats, systemctl
// itself responds in well under a second even for 170+ units on this dev
// box, so this queries systemd directly per request — no background
// cache needed here, see docs/05-data-storage.md.
func (s *Server) handleServicesListFragment(w http.ResponseWriter, r *http.Request) {
	types := "service"
	if r.URL.Query().Get("showAll") == "1" {
		types = "service,socket,timer"
	}

	ctx, cancel := context.WithTimeout(r.Context(), 8*time.Second)
	defer cancel()
	units, err := systemd.List(ctx, types)
	if err != nil {
		s.tmpl.renderFragment(w, http.StatusOK, "error_panel.html", map[string]any{
			"Message": "systemd tidak terdeteksi atau tidak bisa diakses.",
			"Detail":  err.Error(),
		})
		return
	}

	q := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("q")))
	failedOnly := r.URL.Query().Get("failedOnly") == "1"

	filtered := make([]serviceViewUnit, 0, len(units))
	for _, u := range units {
		if failedOnly && u.Active != "failed" {
			continue
		}
		if q != "" && !strings.Contains(strings.ToLower(u.Name), q) && !strings.Contains(strings.ToLower(u.Description), q) {
			continue
		}
		filtered = append(filtered, serviceViewUnit{Unit: u, Protected: s.deps.ProtectedUnits[u.Name]})
	}

	s.tmpl.renderFragment(w, http.StatusOK, "services_list.html", map[string]any{
		"Units":      filtered,
		"ShowAll":    types != "service",
		"Query":      r.URL.Query().Get("q"),
		"FailedOnly": failedOnly,
	})
}

var validServiceActions = map[string]func(context.Context, string) error{
	"start":   systemd.Start,
	"stop":    systemd.Stop,
	"restart": systemd.Restart,
	"reload":  systemd.Reload,
}

func (s *Server) handleServiceAction(w http.ResponseWriter, r *http.Request) {
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
		s.tmpl.renderFragment(w, http.StatusOK, "error_panel.html", map[string]any{
			"Message": "Aksi gagal: " + action + " " + name,
			"Detail":  err.Error() + " — lihat docs/09-deployment.md §9.2 soal privilege yang dibutuhkan aksi ini.",
		})
		return
	}

	s.handleServicesListFragment(w, r)
}

func (s *Server) handleServiceLogsFragment(w http.ResponseWriter, r *http.Request) {
	name := r.PathValue("name")

	ctx, cancel := context.WithTimeout(r.Context(), 8*time.Second)
	defer cancel()
	logs, err := systemd.Tail(ctx, name, 50)
	if err != nil {
		s.tmpl.renderFragment(w, http.StatusOK, "error_panel.html", map[string]any{
			"Message": "Gagal membaca log: " + name,
			"Detail":  err.Error(),
		})
		return
	}

	s.tmpl.renderFragment(w, http.StatusOK, "services_logs.html", map[string]any{
		"Unit": name,
		"Logs": logs,
	})
}
