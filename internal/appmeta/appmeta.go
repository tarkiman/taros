// Package appmeta stores per-compose-project Dashboard tile customization —
// a custom icon and an optional URL to open the app itself. Keyed by the
// docker compose *project name* (not container ID), so the customization
// survives containers being recreated or updated. See docs/04-features.md
// §4.6 "Aplikasi di Dashboard".
//
// Same shape as internal/quicklinks: its own YAML file, mutated live by
// its own handlers (no restart), validation shared with quicklinks so a
// tile icon/URL is held to one set of rules everywhere.
package appmeta

import (
	"fmt"
	"os"
	"sort"
	"strings"
	"sync"

	"gopkg.in/yaml.v3"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/quicklinks"
)

const (
	maxProjectLen = 100
	// Sanity cap, same spirit as quicklinks.maxLinks.
	maxApps = 200
)

// Meta is one project's customization. Both fields optional: empty Icon =
// the frontend draws its default colored-initial avatar, empty URL = the
// tile has no "open app" link.
type Meta struct {
	Icon string `yaml:"icon,omitempty" json:"icon"`
	URL  string `yaml:"url,omitempty" json:"url"`
}

type fileFormat struct {
	Apps map[string]Meta `yaml:"apps"`
}

type Store struct {
	mu   sync.Mutex
	path string
	apps map[string]Meta
}

func New(path string) *Store { return &Store{path: path, apps: map[string]Meta{}} }

// Load reads path; a missing file just means nothing is customized yet.
func Load(path string) (*Store, error) {
	data, err := os.ReadFile(path)
	if os.IsNotExist(err) {
		return New(path), nil
	}
	if err != nil {
		return nil, fmt.Errorf("appmeta: read %s: %w", path, err)
	}
	var f fileFormat
	if err := yaml.Unmarshal(data, &f); err != nil {
		return nil, fmt.Errorf("appmeta: parse %s: %w", path, err)
	}
	if f.Apps == nil {
		f.Apps = map[string]Meta{}
	}
	return &Store{path: path, apps: f.Apps}, nil
}

func (s *Store) save() error {
	data, err := yaml.Marshal(fileFormat{Apps: s.apps})
	if err != nil {
		return fmt.Errorf("appmeta: marshal: %w", err)
	}
	// Not secret (icons/URLs), 0644 like quick-links.yaml.
	if err := os.WriteFile(s.path, data, 0o644); err != nil {
		return fmt.Errorf("appmeta: write %s: %w", s.path, err)
	}
	return nil
}

// All returns a copy of every project's customization, keyed by project.
func (s *Store) All() map[string]Meta {
	s.mu.Lock()
	defer s.mu.Unlock()
	out := make(map[string]Meta, len(s.apps))
	for k, v := range s.apps {
		out[k] = v
	}
	return out
}

// Set validates and stores project's icon/URL. Setting both empty removes
// the entry (nothing left to customize). Returns quicklinks-style
// validation errors (quicklinks.IsInvalid / CodeAndParams) for bad input.
func (s *Store) Set(project, rawIcon, rawURL string) (Meta, error) {
	project = strings.TrimSpace(project)
	if project == "" || len(project) > maxProjectLen {
		return Meta{}, invalid(apierr.AppNameInvalid, "nama aplikasi tidak valid", map[string]any{"max": maxProjectLen})
	}

	icon, err := quicklinks.NormalizeIcon(rawIcon)
	if err != nil {
		return Meta{}, err
	}
	var url string
	if strings.TrimSpace(rawURL) != "" {
		if url, err = quicklinks.NormalizeURL(rawURL); err != nil {
			return Meta{}, err
		}
	}

	s.mu.Lock()
	defer s.mu.Unlock()
	prev, existed := s.apps[project]
	if icon == "" && url == "" {
		delete(s.apps, project)
	} else {
		if !existed && len(s.apps) >= maxApps {
			return Meta{}, invalid(apierr.MaxAppsReached, "terlalu banyak aplikasi yang dikustomisasi", map[string]any{"max": maxApps})
		}
		s.apps[project] = Meta{Icon: icon, URL: url}
	}
	if err := s.save(); err != nil {
		if existed {
			s.apps[project] = prev
		} else {
			delete(s.apps, project)
		}
		return Meta{}, err
	}
	return Meta{Icon: icon, URL: url}, nil
}

// Projects lists customized project names, sorted (used by tests).
func (s *Store) Projects() []string {
	s.mu.Lock()
	defer s.mu.Unlock()
	out := make([]string, 0, len(s.apps))
	for k := range s.apps {
		out = append(out, k)
	}
	sort.Strings(out)
	return out
}
