package web

import (
	"encoding/json"
	"errors"
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/fileexplorer"
)

type contentResponse struct {
	Content string `json:"content"`
	ModTime string `json:"modTime"`
}

func (s *Server) handleFilesContentGet(w http.ResponseWriter, r *http.Request) {
	path, err := s.deps.Jail.Resolve(r.URL.Query().Get("path"))
	if err != nil {
		writeJSONError(w, http.StatusForbidden, err.Error())
		return
	}

	fc, err := fileexplorer.ReadContent(path)
	switch {
	case errors.Is(err, fileexplorer.ErrTooLarge):
		writeJSONError(w, http.StatusRequestEntityTooLarge, err.Error())
		return
	case errors.Is(err, fileexplorer.ErrBinary):
		writeJSONError(w, http.StatusUnsupportedMediaType, err.Error())
		return
	case err != nil:
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(contentResponse{
		Content: fc.Content,
		ModTime: fc.ModTime.Format(time.RFC3339Nano),
	})
}

type contentSaveRequest struct {
	Content         string `json:"content"`
	ExpectedModTime string `json:"expectedModTime"`
}

func (s *Server) handleFilesContentPut(w http.ResponseWriter, r *http.Request) {
	path, err := s.deps.Jail.Resolve(r.URL.Query().Get("path"))
	if err != nil {
		writeJSONError(w, http.StatusForbidden, err.Error())
		return
	}

	var req contentSaveRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "body JSON tidak valid")
		return
	}

	var expected time.Time
	if req.ExpectedModTime != "" {
		expected, _ = time.Parse(time.RFC3339Nano, req.ExpectedModTime)
	}

	if err := fileexplorer.WriteContent(path, req.Content, expected); err != nil {
		if errors.Is(err, fileexplorer.ErrConflict) {
			writeJSONError(w, http.StatusConflict, err.Error())
			return
		}
		writeJSONError(w, http.StatusInternalServerError, err.Error())
		return
	}

	// Re-stat for the new mtime so the client's "expected" baseline
	// advances — otherwise the very next save would spuriously conflict
	// against the pre-save timestamp.
	fc, err := fileexplorer.ReadContent(path)
	modTime := time.Now().Format(time.RFC3339Nano)
	if err == nil {
		modTime = fc.ModTime.Format(time.RFC3339Nano)
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(map[string]string{"modTime": modTime})
}
