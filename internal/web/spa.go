package web

import (
	"io/fs"
	"log/slog"
	"net/http"

	assets "github.com/tarkiman/taros/web"
)

// spaDist is web/frontend/dist rooted at its own top level (stripped of the
// "frontend/dist" embed prefix), so "assets/main-XXXX.js" resolves the same
// way it does inside the built index.html's <script src="/assets/...">.
var spaDist = func() fs.FS {
	sub, err := fs.Sub(assets.SPA, "frontend/dist")
	if err != nil {
		panic("web: frontend/dist not embedded: " + err.Error())
	}
	return sub
}()

var spaAssets = http.FileServerFS(spaDist)

// serveSPA serves the built Vue app shell — vue-router (see
// web/frontend/src/router/index.ts) takes over from there client-side.
// Only registered for the exact paths vue-router owns (router.go); pages
// not yet migrated keep their own Go template handler.
func (s *Server) serveSPA(w http.ResponseWriter, r *http.Request) {
	data, err := fs.ReadFile(spaDist, "index.html")
	if err != nil {
		slog.Error("serveSPA: index.html missing from embed", "err", err)
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.Write(data)
}
