package web

import (
	"encoding/json"
	"net/http"
)

// apiErrorBody is the JSON shape of every error response. Error is the
// original human-readable text (unchanged in behavior from before this
// file existed — still whatever language/detail the call site already
// had, kept as a fallback for non-browser API clients and logs). Code and
// Params are additive: the frontend's api/client.ts prefers translating
// Code (via vue-i18n's errors.<code> namespace, interpolating Params) over
// showing Error verbatim, so the same response now renders correctly in
// whichever UI language is active — see docs/04-features.md §4.10.
type apiErrorBody struct {
	Error  string         `json:"error"`
	Code   string         `json:"code,omitempty"`
	Params map[string]any `json:"params,omitempty"`
}

// writeJSONError writes a JSON error response with a stable machine-
// readable code (see errorcodes.go) alongside the existing human-readable
// message. params is nil for codes whose frontend translation needs no
// interpolation (most of them) — pass a map only when the message has a
// "{name}"-style placeholder to fill (see internal/web/errorcodes.go's
// doc comment for the params each code expects).
func writeJSONError(w http.ResponseWriter, status int, code, message string, params map[string]any) {
	body := apiErrorBody{Error: message, Code: code}
	if len(params) > 0 {
		body.Params = params
	}
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(status)
	_ = json.NewEncoder(w).Encode(body)
}
