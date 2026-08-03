package web

import (
	"fmt"
	"html/template"
	"io/fs"
	"log/slog"
	"net/http"
	"path"

	assets "github.com/tarkiman/tarkiman-os/web"
)

// templateSet holds one *template.Template per page, each parsed together
// with layout.html in isolation from the other pages.
//
// A single shared template.Template parsed from every page file at once
// would NOT work here: every page defines blocks named "title" and
// "content" (see web/templates/*.html), and {{define}} names are global
// across a parsed set — the last file parsed silently wins, so e.g.
// dashboard.html would end up rendering login.html's content. Keeping each
// page in its own set sidesteps the collision entirely.
type templateSet struct {
	pages map[string]*template.Template
}

func loadTemplates() (*templateSet, error) {
	matches, err := fs.Glob(assets.Templates, "templates/*.html")
	if err != nil {
		return nil, err
	}

	ts := &templateSet{pages: make(map[string]*template.Template)}
	for _, f := range matches {
		name := path.Base(f)
		if name == "layout.html" {
			continue
		}
		t, err := template.ParseFS(assets.Templates, "templates/layout.html", f)
		if err != nil {
			return nil, fmt.Errorf("parse template %s: %w", name, err)
		}
		ts.pages[name] = t
	}
	return ts, nil
}

// render executes the named page (e.g. "login.html"), which composes the
// shared "layout" template — see web/templates/layout.html.
func (t *templateSet) render(w http.ResponseWriter, status int, page string, data any) {
	tmpl, ok := t.pages[page]
	if !ok {
		slog.Error("render: unknown template page", "page", page)
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(status)
	if err := tmpl.ExecuteTemplate(w, page, data); err != nil {
		// Headers are already sent at this point, so we can only log —
		// there's no way to turn this into a clean error response.
		slog.Error("render template failed", "page", page, "err", err)
	}
}
