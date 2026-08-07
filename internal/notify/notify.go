// Package notify sends Discord webhook alerts when CPU, RAM, or CPU
// temperature stays above a configurable threshold for longer than a
// configurable duration — see docs/04-features.md §4.11. Settings persist
// to their own YAML file (like internal/quicklinks), mutated live via
// internal/web/handlers_notify.go with no service restart, since these are
// expected to be tuned casually and often, unlike config.yaml settings
// that require a re-listen/re-route (see internal/config/mutate.go).
package notify

import (
	"errors"
	"fmt"
	"os"
	"strings"
	"sync"

	"github.com/tarkiman/taros/internal/apierr"
	"gopkg.in/yaml.v3"
)

// invalidInputError marks every input-validation failure (bad webhook URL,
// threshold/duration out of range) so callers can tell it apart from a
// save() disk-write failure — same pattern as internal/quicklinks'
// invalidInputError, code/params mirror internal/web's apiErrorBody.
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
// returned by this package — see internal/web/handlers_notify.go.
func CodeAndParams(err error) (code string, params map[string]any, ok bool) {
	var e *invalidInputError
	if errors.As(err, &e) {
		return e.code, e.params, true
	}
	return "", nil, false
}

const (
	minThresholdPct = 1
	maxThresholdPct = 100
	minThresholdC   = 30
	maxThresholdC   = 120
	minDurationMin  = 1
	maxDurationMin  = 60
)

// webhookPrefixes are the only hosts SendWebhook is ever allowed to POST
// to — this field is user-supplied and ends up as an outbound request
// origin, so it's validated against Discord's own domains rather than
// just checked for well-formedness (cegah SSRF ke host sembarangan lewat
// field ini, lihat docs/07-security.md).
var webhookPrefixes = []string{
	"https://discord.com/api/webhooks/",
	"https://discordapp.com/api/webhooks/",
}

// ValidWebhookURL reports whether u is a real Discord webhook URL — used
// both by Update's validation and by internal/web/handlers_notify.go's
// test-send endpoint (which accepts a not-yet-saved URL to try).
func ValidWebhookURL(u string) bool {
	for _, p := range webhookPrefixes {
		if strings.HasPrefix(u, p) {
			return true
		}
	}
	return false
}

// MetricRule is one metric's alert configuration — either ThresholdPct
// (CPU/Mem) or ThresholdC (Temp) is meaningful depending on which field
// this rule lives under in Settings.
type MetricRule struct {
	Enabled      bool    `yaml:"enabled" json:"enabled"`
	ThresholdPct float64 `yaml:"thresholdPct,omitempty" json:"thresholdPct,omitempty"`
	ThresholdC   float64 `yaml:"thresholdC,omitempty" json:"thresholdC,omitempty"`
	DurationMin  int     `yaml:"durationMin" json:"durationMin"`
}

// Settings is the full Discord notification configuration.
type Settings struct {
	Enabled    bool       `yaml:"enabled" json:"enabled"`
	WebhookURL string     `yaml:"webhookUrl" json:"webhookUrl"`
	CPU        MetricRule `yaml:"cpu" json:"cpu"`
	Mem        MetricRule `yaml:"mem" json:"mem"`
	Temp       MetricRule `yaml:"temp" json:"temp"`
}

// Default returns sane, inert defaults — Enabled=false and every rule
// Enabled=false, so a fresh install never sends anything until a user
// explicitly opts in with a real webhook URL.
func Default() Settings {
	return Settings{
		Enabled: false,
		CPU:     MetricRule{Enabled: false, ThresholdPct: 90, DurationMin: 5},
		Mem:     MetricRule{Enabled: false, ThresholdPct: 90, DurationMin: 5},
		Temp:    MetricRule{Enabled: false, ThresholdC: 80, DurationMin: 5},
	}
}

// Store guards the in-memory Settings and mirrors every mutation to disk
// immediately (full-file rewrite — the settings object is tiny, so this is
// cheap and simpler than any kind of diffing) — same shape as
// internal/quicklinks.Store.
type Store struct {
	mu       sync.Mutex
	path     string
	settings Settings
}

// New starts a Store at path with default settings — used as the fallback
// when Load fails on an existing-but-unreadable/corrupt file, so a problem
// with this non-critical feature never blocks the rest of the app from
// starting (see cmd/taros/main.go).
func New(path string) *Store {
	return &Store{path: path, settings: Default()}
}

// Load reads the YAML file at path. A missing file is not an error — same
// "use defaults" convention as config.Load — it just means notifications
// haven't been configured yet.
func Load(path string) (*Store, error) {
	data, err := os.ReadFile(path)
	if os.IsNotExist(err) {
		return New(path), nil
	}
	if err != nil {
		return nil, fmt.Errorf("notify: read %s: %w", path, err)
	}
	settings := Default()
	if err := yaml.Unmarshal(data, &settings); err != nil {
		return nil, fmt.Errorf("notify: parse %s: %w", path, err)
	}
	return &Store{path: path, settings: settings}, nil
}

func (s *Store) save() error {
	data, err := yaml.Marshal(s.settings)
	if err != nil {
		return fmt.Errorf("notify: marshal: %w", err)
	}
	// 0600, unlike quicklinks.yaml's 0644 — this file holds a webhook URL
	// (a secret, see docs/07-security.md), same sensitivity class as
	// credentials.yaml.
	if err := os.WriteFile(s.path, data, 0o600); err != nil {
		return fmt.Errorf("notify: write %s: %w", s.path, err)
	}
	return nil
}

// Get returns a copy of the current settings.
func (s *Store) Get() Settings {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.settings
}

// Update validates and persists new settings, replacing the previous
// value wholesale (this is a single settings object, not a list — no
// partial-field PATCH semantics needed).
func (s *Store) Update(next Settings) (Settings, error) {
	if err := validate(next); err != nil {
		return Settings{}, err
	}

	s.mu.Lock()
	defer s.mu.Unlock()

	old := s.settings
	s.settings = next
	if err := s.save(); err != nil {
		s.settings = old
		return Settings{}, err
	}
	return s.settings, nil
}

func validate(s Settings) error {
	anyRuleEnabled := s.CPU.Enabled || s.Mem.Enabled || s.Temp.Enabled
	if (s.Enabled || anyRuleEnabled) && strings.TrimSpace(s.WebhookURL) == "" {
		return invalid(apierr.NotifyWebhookRequired, "URL webhook Discord wajib diisi untuk mengaktifkan notifikasi", nil)
	}
	if s.WebhookURL != "" && !ValidWebhookURL(s.WebhookURL) {
		return invalid(apierr.NotifyWebhookInvalid, "URL webhook tidak valid — harus URL webhook Discord asli (https://discord.com/api/webhooks/...)", nil)
	}

	if err := validateRule(s.CPU, minThresholdPct, maxThresholdPct); err != nil {
		return err
	}
	if err := validateRule(s.Mem, minThresholdPct, maxThresholdPct); err != nil {
		return err
	}
	if err := validateTempRule(s.Temp); err != nil {
		return err
	}
	return nil
}

func validateRule(r MetricRule, minPct, maxPct float64) error {
	if r.ThresholdPct < minPct || r.ThresholdPct > maxPct {
		return invalid(apierr.NotifyThresholdRange, fmt.Sprintf("threshold harus di antara %g%% dan %g%%", minPct, maxPct), map[string]any{"min": minPct, "max": maxPct})
	}
	return validateDuration(r.DurationMin)
}

func validateTempRule(r MetricRule) error {
	if r.ThresholdC < minThresholdC || r.ThresholdC > maxThresholdC {
		return invalid(apierr.NotifyThresholdRange, fmt.Sprintf("threshold suhu harus di antara %g°C dan %g°C", float64(minThresholdC), float64(maxThresholdC)), map[string]any{"min": minThresholdC, "max": maxThresholdC})
	}
	return validateDuration(r.DurationMin)
}

func validateDuration(min int) error {
	if min < minDurationMin || min > maxDurationMin {
		return invalid(apierr.NotifyDurationRange, fmt.Sprintf("durasi harus di antara %d dan %d menit", minDurationMin, maxDurationMin), map[string]any{"min": minDurationMin, "max": maxDurationMin})
	}
	return nil
}
