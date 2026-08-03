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

// templateSet holds one *template.Template per page (parsed together with
// layout.html) plus one per fragment (parsed alone, no layout — fragments
// are bare HTML snippets returned to htmx, not full pages).
//
// A single shared template.Template parsed from every page file at once
// would NOT work here: every page defines blocks named "title" and
// "content" (see web/templates/*.html), and {{define}} names are global
// across a parsed set — the last file parsed silently wins, so e.g.
// dashboard.html would end up rendering login.html's content. Keeping each
// page (and each fragment) in its own set sidesteps the collision entirely.
type templateSet struct {
	pages     map[string]*template.Template
	fragments map[string]*template.Template
}

func loadTemplates() (*templateSet, error) {
	ts := &templateSet{
		pages:     make(map[string]*template.Template),
		fragments: make(map[string]*template.Template),
	}

	pageFiles, err := fs.Glob(assets.Templates, "templates/*.html")
	if err != nil {
		return nil, err
	}
	for _, f := range pageFiles {
		name := path.Base(f)
		if name == "layout.html" {
			continue
		}
		t, err := template.New(name).Funcs(funcMap).ParseFS(assets.Templates, "templates/layout.html", f)
		if err != nil {
			return nil, fmt.Errorf("parse page template %s: %w", name, err)
		}
		ts.pages[name] = t
	}

	fragFiles, err := fs.Glob(assets.Templates, "templates/fragments/*.html")
	if err != nil {
		return nil, err
	}
	for _, f := range fragFiles {
		name := path.Base(f)
		t, err := template.New(name).Funcs(funcMap).ParseFS(assets.Templates, f)
		if err != nil {
			return nil, fmt.Errorf("parse fragment template %s: %w", name, err)
		}
		ts.fragments[name] = t
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
	writeTemplate(w, status, tmpl, page, data)
}

// renderFragment executes a bare fragment (e.g. "docker_containers.html")
// with no layout wrapper — used for both the initial htmx "load" fetch and
// every subsequent poll/action swap of that same fragment.
func (t *templateSet) renderFragment(w http.ResponseWriter, status int, fragment string, data any) {
	tmpl, ok := t.fragments[fragment]
	if !ok {
		slog.Error("render: unknown fragment", "fragment", fragment)
		http.Error(w, "internal error", http.StatusInternalServerError)
		return
	}
	writeTemplate(w, status, tmpl, fragment, data)
}

func writeTemplate(w http.ResponseWriter, status int, tmpl *template.Template, name string, data any) {
	w.Header().Set("Content-Type", "text/html; charset=utf-8")
	w.WriteHeader(status)
	if err := tmpl.ExecuteTemplate(w, name, data); err != nil {
		// Headers are already sent at this point, so we can only log —
		// there's no way to turn this into a clean error response.
		slog.Error("render template failed", "name", name, "err", err)
	}
}
