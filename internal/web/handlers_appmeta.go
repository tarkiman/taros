package web

import (
	"encoding/json"
	"net/http"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/appmeta"
)

// handleAppMetaList returns every customized project's icon/URL, keyed by
// compose project name — the Dashboard "Aplikasi" tiles overlay this on
// the container list it already has. See docs/04-features.md §4.6.
func (s *Server) handleAppMetaList(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]map[string]appmeta.Meta{"apps": s.deps.AppMeta.All()})
}

type appMetaRequest struct {
	Icon string `json:"icon"`
	URL  string `json:"url"`
}

// handleAppMetaSet upserts one project's icon/URL; sending both empty
// clears the customization (back to the default avatar, no link).
func (s *Server) handleAppMetaSet(w http.ResponseWriter, r *http.Request) {
	var req appMetaRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	meta, err := s.deps.AppMeta.Set(r.PathValue("project"), req.Icon, req.URL)
	if err != nil {
		if code, params, ok := appmeta.CodeAndParams(err); ok {
			writeJSONError(w, http.StatusBadRequest, code, err.Error(), params)
			return
		}
		writeJSONError(w, http.StatusInternalServerError, apierr.AppMetaSaveFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, meta)
}
