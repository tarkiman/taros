package storage

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"

	"gopkg.in/yaml.v3"
)

// Settings are what the user can change at run time (no restart), plus what
// TarOS remembers about drives.
type Settings struct {
	// AutoMount: mount a newly plugged external drive by itself.
	AutoMount bool `yaml:"autoMount" json:"autoMount"`
	// NoExec: mount with noexec (programs on the drive cannot be run from it).
	NoExec bool `yaml:"noExec" json:"noExec"`
	// Ignored: volume ids (UUIDs) that are never mounted automatically.
	Ignored []string `yaml:"ignored,omitempty" json:"ignored"`
	// Names: volume id → the directory name it is mounted under, kept so a drive
	// always comes back at the same path (shares and containers rely on that).
	Names map[string]string `yaml:"names,omitempty" json:"-"`
}

// DefaultSettings: auto-mount on, noexec on.
func DefaultSettings() Settings { return Settings{AutoMount: true, NoExec: true} }

func (s Settings) clone() Settings {
	c := s
	c.Ignored = append([]string{}, s.Ignored...)
	c.Names = map[string]string{}
	for k, v := range s.Names {
		c.Names[k] = v
	}
	return c
}

func (s Settings) isIgnored(id string) bool {
	for _, x := range s.Ignored {
		if id != "" && strings.EqualFold(x, id) {
			return true
		}
	}
	return false
}

// Store persists Settings as a small YAML file (not secret: 0644).
type Store struct {
	mu   sync.Mutex
	path string
	s    Settings
}

// NewStore starts from the defaults.
func NewStore(path string) *Store { return &Store{path: path, s: DefaultSettings().clone()} }

// LoadStore reads path; a missing file means the defaults.
func LoadStore(path string) (*Store, error) {
	st := NewStore(path)
	data, err := os.ReadFile(path)
	if errors.Is(err, os.ErrNotExist) {
		return st, nil
	}
	if err != nil {
		return nil, fmt.Errorf("storage: read %s: %w", path, err)
	}
	if err := yaml.Unmarshal(data, &st.s); err != nil {
		return nil, fmt.Errorf("storage: parse %s: %w", path, err)
	}
	st.s = st.s.clone()
	return st, nil
}

// Get returns a copy.
func (st *Store) Get() Settings {
	st.mu.Lock()
	defer st.mu.Unlock()
	return st.s.clone()
}

// Update changes the settings and saves them; on a write error nothing changes.
func (st *Store) Update(fn func(*Settings)) error {
	st.mu.Lock()
	defer st.mu.Unlock()
	next := st.s.clone()
	fn(&next)
	sort.Strings(next.Ignored)
	data, err := yaml.Marshal(next)
	if err != nil {
		return err
	}
	if st.path != "" {
		tmp := filepath.Join(filepath.Dir(st.path), "."+filepath.Base(st.path)+".tmp")
		if err := os.WriteFile(tmp, data, 0o644); err != nil {
			return fmt.Errorf("storage: write %s: %w", tmp, err)
		}
		if err := os.Rename(tmp, st.path); err != nil {
			return fmt.Errorf("storage: rename: %w", err)
		}
	}
	st.s = next
	return nil
}
