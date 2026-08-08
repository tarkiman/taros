// Package foldershortcuts persists the user's pinned File Explorer folders
// ("shortcuts") — a small list of {label, path, showInSidebar,
// showOnDashboard}, stored as its own YAML file rather than going through
// config.yaml + restart (see internal/config/mutate.go), since these are
// expected to be added/edited/removed casually and often, same reasoning
// as internal/quicklinks (which this package's shape deliberately mirrors).
//
// Unlike internal/quicklinks, this package knows nothing about
// fileexplorer.Jail — path validation (must resolve inside the jail root,
// must be an existing directory) happens one layer up, in
// internal/web/handlers_foldershortcuts.go, which already holds the Jail
// dependency. This package only validates the shape of the data itself
// (non-empty label/path, at least one display location, no duplicate
// path, a sanity cap on count).
package foldershortcuts

import (
	"crypto/rand"
	"encoding/hex"
	"errors"
	"fmt"
	"os"
	"strings"
	"sync"

	"github.com/tarkiman/taros/internal/apierr"
	"gopkg.in/yaml.v3"
)

// ErrNotFound is returned by Update/Delete for an unknown id.
var ErrNotFound = errors.New("folder shortcut tidak ditemukan")

// invalidInputError marks every input-validation failure — same pattern as
// internal/quicklinks' invalidInputError, see that package's doc comment
// for the full rationale (kept identical here for consistency).
type invalidInputError struct {
	code   string
	msg    string
	params map[string]any
}

func (e *invalidInputError) Error() string { return e.msg }

func invalid(code, msg string, params map[string]any) error {
	return &invalidInputError{code: code, msg: msg, params: params}
}

// IsInvalid reports whether err is a validation failure from this package.
func IsInvalid(err error) bool {
	var e *invalidInputError
	return errors.As(err, &e)
}

// CodeAndParams extracts the (code, params) pair from a validation error
// returned by this package — see internal/web/handlers_foldershortcuts.go.
func CodeAndParams(err error) (code string, params map[string]any, ok bool) {
	var e *invalidInputError
	if errors.As(err, &e) {
		return e.code, e.params, true
	}
	return "", nil, false
}

const (
	maxLabelLen = 40
	// maxShortcuts is a sanity cap, not a real product limit — same spirit
	// as internal/quicklinks.maxLinks: stop something unbounded (a
	// scripted mistake, not a real user pinning 200 folders) rather than
	// let the file grow without limit.
	maxShortcuts = 40
)

type Shortcut struct {
	ID    string `yaml:"id" json:"id"`
	Label string `yaml:"label" json:"label"`
	// Path is always an absolute path already resolved+validated against
	// fileexplorer.Jail by the caller (internal/web) — this package treats
	// it as an opaque string.
	Path            string `yaml:"path" json:"path"`
	ShowInSidebar   bool   `yaml:"showInSidebar" json:"showInSidebar"`
	ShowOnDashboard bool   `yaml:"showOnDashboard" json:"showOnDashboard"`
}

type fileFormat struct {
	Shortcuts []Shortcut `yaml:"shortcuts"`
}

// Store guards the in-memory shortcut list and mirrors every mutation to
// disk immediately (full-file rewrite — the list is small, see
// maxShortcuts, so this is cheap and simpler than any kind of
// diffing/journaling) — same shape as internal/quicklinks.Store.
type Store struct {
	mu        sync.Mutex
	path      string
	shortcuts []Shortcut
}

// New starts an empty, unsaved Store at path — used as the fallback when
// Load fails on an existing-but-unreadable/corrupt file, so a problem with
// this non-critical feature never blocks the rest of the app from starting
// (see cmd/taros/main.go).
func New(path string) *Store {
	return &Store{path: path}
}

// Load reads the YAML file at path. A missing file is not an error — same
// "use defaults" convention as config.Load — it just means no shortcuts
// have been pinned yet.
func Load(path string) (*Store, error) {
	data, err := os.ReadFile(path)
	if os.IsNotExist(err) {
		return &Store{path: path}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("foldershortcuts: read %s: %w", path, err)
	}
	var f fileFormat
	if err := yaml.Unmarshal(data, &f); err != nil {
		return nil, fmt.Errorf("foldershortcuts: parse %s: %w", path, err)
	}
	return &Store{path: path, shortcuts: f.Shortcuts}, nil
}

func (s *Store) save() error {
	data, err := yaml.Marshal(fileFormat{Shortcuts: s.shortcuts})
	if err != nil {
		return fmt.Errorf("foldershortcuts: marshal: %w", err)
	}
	// Not secret data (unlike notify.yaml's webhook URL) — 0644 like
	// quick-links.yaml.
	if err := os.WriteFile(s.path, data, 0o644); err != nil {
		return fmt.Errorf("foldershortcuts: write %s: %w", s.path, err)
	}
	return nil
}

func (s *Store) List() []Shortcut {
	s.mu.Lock()
	defer s.mu.Unlock()
	out := make([]Shortcut, len(s.shortcuts))
	copy(out, s.shortcuts)
	return out
}

// Add validates and normalizes label/path/flags, then appends and
// persists. path must already be an absolute, jail-validated directory
// path (see the package doc comment) — this only checks it's non-empty
// and not a duplicate of an existing shortcut.
func (s *Store) Add(label, path string, showInSidebar, showOnDashboard bool) (Shortcut, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if len(s.shortcuts) >= maxShortcuts {
		return Shortcut{}, invalid(apierr.MaxFolderShortcutsReached, fmt.Sprintf("sudah ada %d shortcut folder (maksimum) — hapus salah satu dulu", maxShortcuts), map[string]any{"max": maxShortcuts})
	}

	sc, err := buildShortcut(label, path, showInSidebar, showOnDashboard, s.duplicatePath(path, ""))
	if err != nil {
		return Shortcut{}, err
	}
	id, err := randomID()
	if err != nil {
		return Shortcut{}, err
	}
	sc.ID = id

	s.shortcuts = append(s.shortcuts, sc)
	if err := s.save(); err != nil {
		s.shortcuts = s.shortcuts[:len(s.shortcuts)-1]
		return Shortcut{}, err
	}
	return sc, nil
}

// Update replaces the label/path/flags of the shortcut with the given id.
func (s *Store) Update(id, label, path string, showInSidebar, showOnDashboard bool) (Shortcut, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := -1
	for i, sc := range s.shortcuts {
		if sc.ID == id {
			idx = i
			break
		}
	}
	if idx == -1 {
		return Shortcut{}, ErrNotFound
	}

	sc, err := buildShortcut(label, path, showInSidebar, showOnDashboard, s.duplicatePath(path, id))
	if err != nil {
		return Shortcut{}, err
	}
	sc.ID = id

	old := s.shortcuts[idx]
	s.shortcuts[idx] = sc
	if err := s.save(); err != nil {
		s.shortcuts[idx] = old
		return Shortcut{}, err
	}
	return sc, nil
}

// Delete removes the shortcut with the given id.
func (s *Store) Delete(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := -1
	for i, sc := range s.shortcuts {
		if sc.ID == id {
			idx = i
			break
		}
	}
	if idx == -1 {
		return ErrNotFound
	}

	old := s.shortcuts
	s.shortcuts = append(s.shortcuts[:idx:idx], s.shortcuts[idx+1:]...)
	if err := s.save(); err != nil {
		s.shortcuts = old
		return err
	}
	return nil
}

// duplicatePath reports whether path already belongs to a different
// shortcut than excludeID (excludeID is "" for Add, the shortcut's own id
// for Update — so editing a shortcut without changing its path doesn't
// trip over itself). Caller must hold s.mu.
func (s *Store) duplicatePath(path, excludeID string) bool {
	for _, sc := range s.shortcuts {
		if sc.Path == path && sc.ID != excludeID {
			return true
		}
	}
	return false
}

func buildShortcut(label, path string, showInSidebar, showOnDashboard, dup bool) (Shortcut, error) {
	path = strings.TrimSpace(path)
	if path == "" {
		return Shortcut{}, invalid(apierr.FolderShortcutPathRequired, "path folder tidak boleh kosong", nil)
	}
	if dup {
		return Shortcut{}, invalid(apierr.FolderShortcutDuplicatePath, "folder ini sudah punya shortcut", nil)
	}
	if !showInSidebar && !showOnDashboard {
		return Shortcut{}, invalid(apierr.FolderShortcutNoDestination, "pilih minimal satu lokasi tampil (sidebar Files atau Dashboard)", nil)
	}

	label = strings.TrimSpace(label)
	if len(label) > maxLabelLen {
		return Shortcut{}, invalid(apierr.FolderShortcutLabelTooLong, fmt.Sprintf("nama maksimum %d karakter", maxLabelLen), map[string]any{"max": maxLabelLen})
	}

	return Shortcut{Label: label, Path: path, ShowInSidebar: showInSidebar, ShowOnDashboard: showOnDashboard}, nil
}

func randomID() (string, error) {
	b := make([]byte, 8)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("foldershortcuts: generate id: %w", err)
	}
	return hex.EncodeToString(b), nil
}
