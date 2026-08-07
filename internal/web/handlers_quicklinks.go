package web

import (
	"encoding/json"
	"net/http"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/quicklinks"
)

type quickLinkRequest struct {
	Label string `json:"label"`
	URL   string `json:"url"`
	Icon  string `json:"icon"`
}

func (s *Server) handleQuickLinksList(w http.ResponseWriter, r *http.Request) {
	links := s.deps.QuickLinks.List()
	if links == nil {
		links = []quicklinks.Link{}
	}
	writeJSON(w, http.StatusOK, map[string]any{"links": links})
}

func (s *Server) handleQuickLinksCreate(w http.ResponseWriter, r *http.Request) {
	var req quickLinkRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	link, err := s.deps.QuickLinks.Add(req.Label, req.URL, req.Icon)
	if err != nil {
		status, code, params := quickLinksErrResponse(err)
		writeJSONError(w, status, code, err.Error(), params)
		return
	}
	writeJSON(w, http.StatusOK, link)
}

func (s *Server) handleQuickLinksUpdate(w http.ResponseWriter, r *http.Request) {
	var req quickLinkRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	link, err := s.deps.QuickLinks.Update(r.PathValue("id"), req.Label, req.URL, req.Icon)
	if err != nil {
		status, code, params := quickLinksErrResponse(err)
		writeJSONError(w, status, code, err.Error(), params)
		return
	}
	writeJSON(w, http.StatusOK, link)
}

func (s *Server) handleQuickLinksDelete(w http.ResponseWriter, r *http.Request) {
	if err := s.deps.QuickLinks.Delete(r.PathValue("id")); err != nil {
		status, code, params := quickLinksErrResponse(err)
		writeJSONError(w, status, code, err.Error(), params)
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// quickLinksErrResponse maps a quicklinks.Store error to the right HTTP
// status plus a translatable code/params pair — not-found and validation
// failures are client errors (404/400, and validation errors already
// carry their own specific code from internal/quicklinks, see
// quicklinks.CodeAndParams), anything else (a disk write failure in
// Store.save, say) is a server-side problem (500) with the underlying
// detail as a param.
func quickLinksErrResponse(err error) (status int, code string, params map[string]any) {
	switch {
	case err == quicklinks.ErrNotFound:
		return http.StatusNotFound, apierr.QuickLinkNotFound, nil
	case quicklinks.IsInvalid(err):
		c, p, _ := quicklinks.CodeAndParams(err)
		return http.StatusBadRequest, c, p
	default:
		return http.StatusInternalServerError, apierr.QuickLinksSaveFailed, map[string]any{"detail": err.Error()}
	}
}
