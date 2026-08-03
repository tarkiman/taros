package web

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
	"strings"

	"github.com/tarkiman/tarkiman-os/internal/fileexplorer"
)

type breadcrumbItem struct {
	Name string
	Path string
}

// breadcrumbs builds crumbs from root downward only — never from
// filesystem "/" when root is narrower than that. A crumb the user could
// click but that Jail.Resolve would then reject (because it's outside
// root) is a real bug this fixes, not just a cosmetic one: it was found
// during manual testing with a scoped rootDir.
func breadcrumbs(root, path string) []breadcrumbItem {
	rootName := root
	if root == "/" {
		rootName = "/"
	} else {
		rootName = filepath.Base(root)
	}
	items := []breadcrumbItem{{Name: rootName, Path: root}}
	if path == root {
		return items
	}

	rel := strings.TrimPrefix(strings.TrimPrefix(path, root), "/")
	acc := root
	for _, p := range strings.Split(rel, "/") {
		// filepath.Join (not acc+"/"+p) so root="/" doesn't produce a
		// "//"-prefixed path — cosmetically wrong, and found only by
		// actually looking at the rendered links during manual testing.
		acc = filepath.Join(acc, p)
		items = append(items, breadcrumbItem{Name: p, Path: acc})
	}
	return items
}

func (s *Server) currentDir(r *http.Request) (string, error) {
	path := r.URL.Query().Get("path")
	if path == "" {
		path = s.deps.Jail.Root
	}
	return s.deps.Jail.Resolve(path)
}

func (s *Server) handleFilesPage(w http.ResponseWriter, r *http.Request) {
	sess := sessionFromContext(r.Context())
	dir, err := s.currentDir(r)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	s.tmpl.render(w, http.StatusOK, "files.html", map[string]any{
		"Username":    sess.Username,
		"CSRFToken":   sess.CSRFToken,
		"CurrentPath": dir,
	})
}

func (s *Server) handleFilesListFragment(w http.ResponseWriter, r *http.Request) {
	dir, err := s.currentDir(r)
	if err != nil {
		s.tmpl.renderFragment(w, http.StatusOK, "error_panel.html", map[string]any{
			"Message": "Path tidak valid.",
			"Detail":  err.Error(),
		})
		return
	}

	entries, err := fileexplorer.List(dir)
	if err != nil {
		s.tmpl.renderFragment(w, http.StatusOK, "error_panel.html", map[string]any{
			"Message": "Gagal membaca direktori.",
			"Detail":  err.Error(),
		})
		return
	}

	// Blocklisted entries (e.g. /etc/shadow) must not just be
	// action-blocked, they shouldn't appear at all — found by testing:
	// they showed up with working-looking Download/Rename/Delete buttons
	// that then failed with 403, which is secure but confusing. Reusing
	// Jail.Resolve here (not a separate blocklist-only check) also
	// catches the same symlink-escape case as everywhere else.
	visible := entries[:0]
	for _, e := range entries {
		if _, err := s.deps.Jail.Resolve(filepath.Join(dir, e.Name)); err == nil {
			visible = append(visible, e)
		}
	}
	entries = visible

	// dir is already validated (via s.currentDir -> Jail.Resolve) to be
	// root or a descendant of it, so filepath.Dir(dir) can only land back
	// inside the jail too — no need to re-check bounds here, just handle
	// "already at root" (no parent link to show).
	var parent string
	if dir != s.deps.Jail.Root {
		parent = filepath.Dir(dir)
	}

	s.tmpl.renderFragment(w, http.StatusOK, "files_list.html", map[string]any{
		"CurrentPath": dir,
		"ParentPath":  parent,
		"Breadcrumbs": breadcrumbs(s.deps.Jail.Root, dir),
		"Entries":     entries,
	})
}

type filesOpRequest struct {
	Action  string `json:"action"`
	Path    string `json:"path"`
	NewPath string `json:"newPath"`
}

// handleFilesOp handles mkdir/create/rename/delete — see docs/06-api-ui-ux.md
// §6.1. Copy/cut/paste (which need the streaming job queue) are a Fase 3b
// concern, not implemented here — see docs/10-roadmap.md.
func (s *Server) handleFilesOp(w http.ResponseWriter, r *http.Request) {
	var req filesOpRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "body JSON tidak valid")
		return
	}

	path, err := s.deps.Jail.Resolve(req.Path)
	if err != nil {
		writeJSONError(w, http.StatusForbidden, err.Error())
		return
	}

	switch req.Action {
	case "mkdir":
		err = fileexplorer.Mkdir(path)
	case "create":
		err = fileexplorer.CreateFile(path)
	case "delete":
		err = fileexplorer.Delete(path)
	case "rename":
		var newPath string
		newPath, err = s.deps.Jail.Resolve(req.NewPath)
		if err == nil {
			err = fileexplorer.Rename(path, newPath)
		}
	default:
		writeJSONError(w, http.StatusBadRequest, "aksi tidak dikenal: "+req.Action)
		return
	}

	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}

func writeJSONError(w http.ResponseWriter, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

// handleFilesDownload streams a single file — folder-as-zip is a Fase 3b
// concern (docs/10-roadmap.md). http.ServeContent/ServeFile already stream
// in fixed-size chunks (no full-file buffering), consistent with
// docs/04-features.md §4.4 "Keandalan Operasi File Besar/Banyak" even
// though the heavier job-queue machinery isn't needed for a plain download.
func (s *Server) handleFilesDownload(w http.ResponseWriter, r *http.Request) {
	path, err := s.deps.Jail.Resolve(r.URL.Query().Get("path"))
	if err != nil {
		http.Error(w, err.Error(), http.StatusForbidden)
		return
	}

	info, err := os.Stat(path)
	if err != nil {
		http.Error(w, "not found", http.StatusNotFound)
		return
	}
	if info.IsDir() {
		http.Error(w, "download folder sebagai zip belum didukung (Fase 3b)", http.StatusNotImplemented)
		return
	}

	w.Header().Set("Content-Disposition", `attachment; filename="`+filepath.Base(path)+`"`)
	http.ServeFile(w, r, path)
}
