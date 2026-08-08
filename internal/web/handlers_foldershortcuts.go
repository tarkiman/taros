package web

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/foldershortcuts"
)

type folderShortcutRequest struct {
	Label           string `json:"label"`
	Path            string `json:"path"`
	ShowInSidebar   bool   `json:"showInSidebar"`
	ShowOnDashboard bool   `json:"showOnDashboard"`
}

func (s *Server) handleFolderShortcutsList(w http.ResponseWriter, r *http.Request) {
	shortcuts := s.deps.FolderShortcuts.List()
	if shortcuts == nil {
		shortcuts = []foldershortcuts.Shortcut{}
	}
	writeJSON(w, http.StatusOK, map[string]any{"shortcuts": shortcuts})
}

func (s *Server) handleFolderShortcutsCreate(w http.ResponseWriter, r *http.Request) {
	var req folderShortcutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	path, label, ok := s.resolveShortcutPath(w, req.Path, req.Label)
	if !ok {
		return
	}
	sc, err := s.deps.FolderShortcuts.Add(label, path, req.ShowInSidebar, req.ShowOnDashboard)
	if err != nil {
		status, code, params := folderShortcutsErrResponse(err)
		writeJSONError(w, status, code, err.Error(), params)
		return
	}
	writeJSON(w, http.StatusOK, sc)
}

func (s *Server) handleFolderShortcutsUpdate(w http.ResponseWriter, r *http.Request) {
	var req folderShortcutRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	path, label, ok := s.resolveShortcutPath(w, req.Path, req.Label)
	if !ok {
		return
	}
	sc, err := s.deps.FolderShortcuts.Update(r.PathValue("id"), label, path, req.ShowInSidebar, req.ShowOnDashboard)
	if err != nil {
		status, code, params := folderShortcutsErrResponse(err)
		writeJSONError(w, status, code, err.Error(), params)
		return
	}
	writeJSON(w, http.StatusOK, sc)
}

func (s *Server) handleFolderShortcutsDelete(w http.ResponseWriter, r *http.Request) {
	if err := s.deps.FolderShortcuts.Delete(r.PathValue("id")); err != nil {
		status, code, params := folderShortcutsErrResponse(err)
		writeJSONError(w, status, code, err.Error(), params)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// resolveShortcutPath validates rawPath against the file explorer jail
// (same boundary every handlers_files.go operation is held to) and
// requires it to be an existing directory, writing the appropriate error
// response and returning ok=false on failure. rawLabel is passed through
// trimmed, defaulting to the resolved path's base name when empty — this
// default is computed here (from the *resolved* path, not raw client
// input) rather than inside internal/foldershortcuts, which deliberately
// knows nothing about the filesystem.
func (s *Server) resolveShortcutPath(w http.ResponseWriter, rawPath, rawLabel string) (path, label string, ok bool) {
	resolved, err := s.deps.Jail.Resolve(rawPath)
	if err != nil {
		writeJSONError(w, http.StatusForbidden, apierr.FolderShortcutPathInvalid, err.Error(), map[string]any{"detail": err.Error()})
		return "", "", false
	}
	info, err := os.Stat(resolved)
	if err != nil || !info.IsDir() {
		writeJSONError(w, http.StatusBadRequest, apierr.FolderShortcutPathInvalid, "path bukan folder yang valid", map[string]any{"detail": "bukan direktori"})
		return "", "", false
	}

	label = rawLabel
	if label == "" {
		label = filepath.Base(resolved)
	}
	return resolved, label, true
}

// folderShortcutsErrResponse maps a foldershortcuts.Store error to the
// right HTTP status plus a translatable code/params pair — same pattern
// as handlers_quicklinks.go's quickLinksErrResponse.
func folderShortcutsErrResponse(err error) (status int, code string, params map[string]any) {
	switch {
	case err == foldershortcuts.ErrNotFound:
		return http.StatusNotFound, apierr.FolderShortcutNotFound, nil
	case foldershortcuts.IsInvalid(err):
		c, p, _ := foldershortcuts.CodeAndParams(err)
		return http.StatusBadRequest, c, p
	default:
		return http.StatusInternalServerError, apierr.FolderShortcutsSaveFailed, map[string]any{"detail": err.Error()}
	}
}
