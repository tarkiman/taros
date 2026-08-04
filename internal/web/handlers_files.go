package web

import (
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"os"
	"path/filepath"
	"strings"
	"time"

	"github.com/tarkiman/taros/internal/fileexplorer"
)

type breadcrumbItem struct {
	Name string `json:"name"`
	Path string `json:"path"`
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

type filesListResponse struct {
	CurrentPath   string             `json:"currentPath"`
	ParentPath    string             `json:"parentPath"`
	Breadcrumbs   []breadcrumbItem   `json:"breadcrumbs"`
	Entries       []fileexplorer.Entry `json:"entries"`
	ClipboardSize int                `json:"clipboardSize"`
	ClipboardCut  bool               `json:"clipboardCut"`
}

func (s *Server) handleAPIFilesList(w http.ResponseWriter, r *http.Request) {
	dir, err := s.currentDir(r)
	if err != nil {
		writeJSONError(w, http.StatusBadRequest, "Path tidak valid: "+err.Error())
		return
	}

	entries, err := fileexplorer.List(dir)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, "Gagal membaca direktori: "+err.Error())
		return
	}

	q := strings.ToLower(strings.TrimSpace(r.URL.Query().Get("q")))

	// Blocklisted entries (e.g. /etc/shadow) must not just be
	// action-blocked, they shouldn't appear at all — found by testing:
	// they showed up with working-looking Download/Rename/Delete buttons
	// that then failed with 403, which is secure but confusing. Reusing
	// Jail.Resolve here (not a separate blocklist-only check) also
	// catches the same symlink-escape case as everywhere else.
	visible := entries[:0]
	for _, e := range entries {
		if q != "" && !strings.Contains(strings.ToLower(e.Name), q) {
			continue
		}
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

	sess := sessionFromContext(r.Context())
	clip, cut := sess.Clipboard()

	writeJSON(w, http.StatusOK, filesListResponse{
		CurrentPath:   dir,
		ParentPath:    parent,
		Breadcrumbs:   breadcrumbs(s.deps.Jail.Root, dir),
		Entries:       entries,
		ClipboardSize: len(clip),
		ClipboardCut:  cut,
	})
}

type filesOpRequest struct {
	Action  string   `json:"action"`
	Path    string   `json:"path"`
	NewPath string   `json:"newPath"`
	Paths   []string `json:"paths"`
}

// handleFilesOp handles mkdir/create/rename/delete (synchronous) and
// copy/cut (which just stash the session clipboard) — see
// docs/06-api-ui-ux.md §6.1. "paste" is handled separately
// (handleFilesPaste) since it returns a jobId, not a plain {ok}.
func (s *Server) handleFilesOp(w http.ResponseWriter, r *http.Request) {
	var req filesOpRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "body JSON tidak valid")
		return
	}

	if req.Action == "paste" {
		s.handleFilesPaste(w, r, req)
		return
	}
	if req.Action == "copy" || req.Action == "cut" {
		s.handleFilesCopyCut(w, r, req)
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

// handleFilesCopyCut resolves & validates every selected path, then
// stashes them in the session's clipboard — no filesystem I/O happens
// until Paste, see docs/04-features.md §4.4.
func (s *Server) handleFilesCopyCut(w http.ResponseWriter, r *http.Request, req filesOpRequest) {
	resolved := make([]string, 0, len(req.Paths))
	for _, p := range req.Paths {
		rp, err := s.deps.Jail.Resolve(p)
		if err != nil {
			writeJSONError(w, http.StatusForbidden, err.Error())
			return
		}
		resolved = append(resolved, rp)
	}
	if len(resolved) == 0 {
		writeJSONError(w, http.StatusBadRequest, "tidak ada item dipilih")
		return
	}

	sess := sessionFromContext(r.Context())
	sess.SetClipboard(resolved, req.Action == "cut")

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}

// handleFilesPaste submits the session's clipboard to the job queue —
// always returns a jobId, even when every entry ends up being an instant
// same-filesystem rename, so the client only needs one code path (poll/
// watch the job) regardless of how fast it actually finishes. See
// docs/06-api-ui-ux.md §6.1.
func (s *Server) handleFilesPaste(w http.ResponseWriter, r *http.Request, req filesOpRequest) {
	sess := sessionFromContext(r.Context())
	clip, cut := sess.Clipboard()
	if len(clip) == 0 {
		writeJSONError(w, http.StatusBadRequest, "clipboard kosong")
		return
	}

	destDir, err := s.deps.Jail.Resolve(req.Path)
	if err != nil {
		writeJSONError(w, http.StatusForbidden, err.Error())
		return
	}

	job, err := s.deps.Jobs.Paste(clip, destDir, cut)
	if err != nil {
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}

	if cut {
		sess.ClearClipboard()
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"jobId": job.ID})
}

func (s *Server) handleFilesOpStream(w http.ResponseWriter, r *http.Request) {
	job, ok := s.deps.Jobs.Get(r.PathValue("jobId"))
	if !ok {
		http.Error(w, "job not found", http.StatusNotFound)
		return
	}

	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")

	ticker := time.NewTicker(500 * time.Millisecond)
	defer ticker.Stop()

	for {
		snap := job.Snapshot()
		data, _ := json.Marshal(snap)
		if _, err := fmt.Fprintf(w, "data: %s\n\n", data); err != nil {
			return
		}
		flusher.Flush()

		if snap.Status != "running" {
			return
		}

		select {
		case <-r.Context().Done():
			return
		case <-ticker.C:
		}
	}
}

func (s *Server) handleFilesOpCancel(w http.ResponseWriter, r *http.Request) {
	ok := s.deps.Jobs.Cancel(r.PathValue("jobId"))
	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"ok": ok})
}

// handleFilesUpload streams the request body straight to disk via
// io.Copy — never buffers the whole upload in memory, consistent with
// docs/04-features.md §4.4. maxUploadSizeMB is enforced via
// http.MaxBytesReader, which aborts the read (not just rejects after
// receiving everything) once the limit is exceeded.
func (s *Server) handleFilesUpload(w http.ResponseWriter, r *http.Request) {
	destDir, err := s.deps.Jail.Resolve(r.URL.Query().Get("path"))
	if err != nil {
		writeJSONError(w, http.StatusForbidden, err.Error())
		return
	}

	maxBytes := int64(s.deps.MaxUploadSizeMB) * 1024 * 1024
	r.Body = http.MaxBytesReader(w, r.Body, maxBytes)

	if err := r.ParseMultipartForm(1 << 20); err != nil {
		writeJSONError(w, http.StatusBadRequest, "upload gagal (kemungkinan melebihi batas ukuran): "+err.Error())
		return
	}
	defer r.MultipartForm.RemoveAll()

	files := r.MultipartForm.File["file"]
	if len(files) == 0 {
		writeJSONError(w, http.StatusBadRequest, "tidak ada file diupload")
		return
	}

	for _, fh := range files {
		dstPath, err := s.deps.Jail.Resolve(filepath.Join(destDir, fh.Filename))
		if err != nil {
			writeJSONError(w, http.StatusForbidden, err.Error())
			return
		}

		src, err := fh.Open()
		if err != nil {
			writeJSONError(w, http.StatusInternalServerError, err.Error())
			return
		}
		dst, err := os.OpenFile(dstPath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o644)
		if err != nil {
			src.Close()
			writeJSONError(w, http.StatusInternalServerError, err.Error())
			return
		}

		buf := make([]byte, 256*1024)
		_, copyErr := io.CopyBuffer(dst, src, buf)
		src.Close()
		dst.Close()
		if copyErr != nil {
			writeJSONError(w, http.StatusInternalServerError, copyErr.Error())
			return
		}
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]bool{"ok": true})
}

func writeJSONError(w http.ResponseWriter, status int, message string) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}

// handleFilesDownload streams a single file via http.ServeFile, or a
// whole folder as a zip streamed on-the-fly (fileexplorer.ZipFolder) —
// neither buffers the full content before sending, consistent with
// docs/04-features.md §4.4.
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
		if err := fileexplorer.ZipFolder(w, path); err != nil {
			// Headers/body may already be partially written at this
			// point — nothing better to do than log server-side.
			slog.Error("zip folder download failed", "path", path, "err", err)
		}
		return
	}

	w.Header().Set("Content-Disposition", `attachment; filename="`+filepath.Base(path)+`"`)
	http.ServeFile(w, r, path)
}
