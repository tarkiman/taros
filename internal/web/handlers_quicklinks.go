package web

import (
	"encoding/json"
	"net/http"

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
		writeJSONError(w, http.StatusBadRequest, "body tidak valid")
		return
	}
	link, err := s.deps.QuickLinks.Add(req.Label, req.URL, req.Icon)
	if err != nil {
		writeJSONError(w, statusForQuickLinksErr(err), err.Error())
		return
	}
	writeJSON(w, http.StatusOK, link)
}

func (s *Server) handleQuickLinksUpdate(w http.ResponseWriter, r *http.Request) {
	var req quickLinkRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, "body tidak valid")
		return
	}
	link, err := s.deps.QuickLinks.Update(r.PathValue("id"), req.Label, req.URL, req.Icon)
	if err != nil {
		writeJSONError(w, statusForQuickLinksErr(err), err.Error())
		return
	}
	writeJSON(w, http.StatusOK, link)
}

func (s *Server) handleQuickLinksDelete(w http.ResponseWriter, r *http.Request) {
	if err := s.deps.QuickLinks.Delete(r.PathValue("id")); err != nil {
		writeJSONError(w, statusForQuickLinksErr(err), err.Error())
		return
	}
	w.WriteHeader(http.StatusNoContent)
}

// statusForQuickLinksErr maps a quicklinks.Store error to the right HTTP
// status — not-found and validation failures are client errors (404/400),
// anything else (a disk write failure in Store.save, say) is a server-side
// problem (500), see quicklinks.IsInvalid.
func statusForQuickLinksErr(err error) int {
	switch {
	case err == quicklinks.ErrNotFound:
		return http.StatusNotFound
	case quicklinks.IsInvalid(err):
		return http.StatusBadRequest
	default:
		return http.StatusInternalServerError
	}
}
