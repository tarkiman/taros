// Package quicklinks persists the user's custom "Akses Cepat" tiles on the
// Dashboard (e.g. a link to their Cloudflare or ZeroTier account) — a small
// list of {label, url, icon}, stored as its own YAML file rather than going
// through config.yaml + restart (see internal/config/mutate.go), since these
// are expected to be added/edited/removed casually and often, unlike the
// handful of settings that actually require a re-listen/re-route.
package quicklinks

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/hex"
	"errors"
	"fmt"
	"net/http"
	"net/url"
	"os"
	"strings"
	"sync"

	"gopkg.in/yaml.v3"
)

// ErrNotFound is returned by Update/Delete for an unknown id.
var ErrNotFound = errors.New("quick link tidak ditemukan")

// invalidInputError marks every input-validation failure (bad label/URL/
// icon, or the maxLinks cap) so callers can tell it apart from a save()
// disk-write failure — the former is a 400 (bad request), the latter a 500
// (server problem), see IsInvalid and internal/web's use of it. A distinct
// type rather than a wrapped sentinel so the message stays exactly the
// clean, user-facing string set at the call site — no "sentinel: actual
// message" prefix leaking into what the UI displays.
type invalidInputError struct{ msg string }

func (e *invalidInputError) Error() string { return e.msg }

func invalidf(format string, args ...any) error {
	return &invalidInputError{msg: fmt.Sprintf(format, args...)}
}

// IsInvalid reports whether err is a validation failure from this package.
func IsInvalid(err error) bool {
	var e *invalidInputError
	return errors.As(err, &e)
}

const (
	maxLabelLen = 40
	// maxIconBytes bounds the *decoded* image size for a pasted/uploaded
	// icon — these are meant to be small favicon-sized images, not photos;
	// generous enough for a crisp 128x128 PNG (usually a few KB, rarely
	// above 30KB) while keeping the YAML file this is stored in small.
	maxIconBytes = 150 * 1024
	// maxLinks is a sanity cap, not a real product limit — same spirit as
	// the other bounds in this codebase (upload size, concurrent ops):
	// stop something unbounded (a scripted mistake, not a real user with
	// 200 icons) rather than let the file grow without limit.
	maxLinks = 60
)

// allowedIconMIME are the image formats accepted for icon data URIs.
// image/svg+xml is included because it's a common icon format and — unlike
// v-html — the frontend only ever renders this via <img src="...">, which
// browsers sandbox: embedded <script> in an SVG loaded through <img> does
// not execute. See docs/07-security.md.
var allowedIconMIME = map[string]bool{
	"image/png":     true,
	"image/jpeg":    true,
	"image/gif":     true,
	"image/webp":    true,
	"image/svg+xml": true,
	"image/x-icon":  true,
}

type Link struct {
	ID    string `yaml:"id" json:"id"`
	Label string `yaml:"label" json:"label"`
	URL   string `yaml:"url" json:"url"`
	// Icon is either an http(s) URL or a "data:<mime>;base64,..." URI —
	// see normalizeIcon. Empty means the frontend shows a generic fallback
	// icon.
	Icon string `yaml:"icon" json:"icon"`
}

type fileFormat struct {
	Links []Link `yaml:"links"`
}

// Store guards the in-memory link list and mirrors every mutation to disk
// immediately (full-file rewrite — the list is small, see maxLinks, so this
// is cheap and simpler than any kind of diffing/journaling).
type Store struct {
	mu    sync.Mutex
	path  string
	links []Link
}

// New starts an empty, unsaved Store at path — used as the fallback when
// Load fails on an existing-but-unreadable/corrupt file, so a problem with
// this non-critical feature never blocks the rest of the app from starting
// (see cmd/taros/main.go).
func New(path string) *Store {
	return &Store{path: path}
}

// Load reads the YAML file at path. A missing file is not an error — same
// "use defaults" convention as config.Load — it just means no custom links
// have been added yet.
func Load(path string) (*Store, error) {
	data, err := os.ReadFile(path)
	if os.IsNotExist(err) {
		return &Store{path: path}, nil
	}
	if err != nil {
		return nil, fmt.Errorf("quicklinks: read %s: %w", path, err)
	}
	var f fileFormat
	if err := yaml.Unmarshal(data, &f); err != nil {
		return nil, fmt.Errorf("quicklinks: parse %s: %w", path, err)
	}
	return &Store{path: path, links: f.Links}, nil
}

func (s *Store) save() error {
	data, err := yaml.Marshal(fileFormat{Links: s.links})
	if err != nil {
		return fmt.Errorf("quicklinks: marshal: %w", err)
	}
	// Not secret data (unlike credentials.yaml), so 0644 like config.yaml —
	// see internal/config for the same reasoning.
	if err := os.WriteFile(s.path, data, 0o644); err != nil {
		return fmt.Errorf("quicklinks: write %s: %w", s.path, err)
	}
	return nil
}

func (s *Store) List() []Link {
	s.mu.Lock()
	defer s.mu.Unlock()
	out := make([]Link, len(s.links))
	copy(out, s.links)
	return out
}

// Add validates and normalizes label/url/icon, then appends and persists.
func (s *Store) Add(label, rawURL, rawIcon string) (Link, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	if len(s.links) >= maxLinks {
		return Link{}, invalidf("sudah ada %d quick link (maksimum) — hapus salah satu dulu", maxLinks)
	}

	link, err := buildLink(label, rawURL, rawIcon)
	if err != nil {
		return Link{}, err
	}
	id, err := randomID()
	if err != nil {
		return Link{}, err
	}
	link.ID = id

	s.links = append(s.links, link)
	if err := s.save(); err != nil {
		s.links = s.links[:len(s.links)-1]
		return Link{}, err
	}
	return link, nil
}

// Update replaces the label/url/icon of the link with the given id.
func (s *Store) Update(id, label, rawURL, rawIcon string) (Link, error) {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := -1
	for i, l := range s.links {
		if l.ID == id {
			idx = i
			break
		}
	}
	if idx == -1 {
		return Link{}, ErrNotFound
	}

	link, err := buildLink(label, rawURL, rawIcon)
	if err != nil {
		return Link{}, err
	}
	link.ID = id

	old := s.links[idx]
	s.links[idx] = link
	if err := s.save(); err != nil {
		s.links[idx] = old
		return Link{}, err
	}
	return link, nil
}

// Delete removes the link with the given id.
func (s *Store) Delete(id string) error {
	s.mu.Lock()
	defer s.mu.Unlock()

	idx := -1
	for i, l := range s.links {
		if l.ID == id {
			idx = i
			break
		}
	}
	if idx == -1 {
		return ErrNotFound
	}

	old := s.links
	s.links = append(s.links[:idx:idx], s.links[idx+1:]...)
	if err := s.save(); err != nil {
		s.links = old
		return err
	}
	return nil
}

func buildLink(label, rawURL, rawIcon string) (Link, error) {
	label = strings.TrimSpace(label)
	if label == "" {
		return Link{}, invalidf("nama tidak boleh kosong")
	}
	if len(label) > maxLabelLen {
		return Link{}, invalidf("nama maksimum %d karakter", maxLabelLen)
	}

	normURL, err := normalizeURL(rawURL)
	if err != nil {
		return Link{}, err
	}

	normIcon, err := normalizeIcon(rawIcon)
	if err != nil {
		return Link{}, err
	}

	return Link{Label: label, URL: normURL, Icon: normIcon}, nil
}

// normalizeURL requires an absolute http(s) URL — anything else (javascript:,
// data:, a bare hostname, ...) is rejected. This is the value a tile will
// render as target="_blank" href, so a non-http(s) scheme here would be an
// XSS/spoofing vector, not just a UX rough edge.
func normalizeURL(raw string) (string, error) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return "", invalidf("URL tidak boleh kosong")
	}
	u, err := url.Parse(raw)
	if err != nil || u.Scheme == "" || u.Host == "" {
		return "", invalidf("URL tidak valid — harus lengkap, mis. https://dash.cloudflare.com")
	}
	if u.Scheme != "http" && u.Scheme != "https" {
		return "", invalidf("URL harus http:// atau https://")
	}
	return raw, nil
}

// normalizeIcon accepts three input shapes and always returns either an
// empty string, an http(s) URL, or a well-formed "data:<mime>;base64,..."
// URI:
//  1. empty — no icon, frontend shows a fallback
//  2. an http(s) URL — passed through as-is (after scheme validation)
//  3. base64 image data — either already wrapped as a data: URI, or raw
//     (the frontend's file-upload convenience produces a data: URI, but
//     someone pasting a bare base64 blob should work too)
//
// For (3), the decoded bytes' format is sniffed server-side rather than
// trusted from a client-supplied mime string — both to normalize a possibly
// missing/wrong prefix and so a request can't claim an arbitrary
// content-type for data it didn't actually send.
func normalizeIcon(raw string) (string, error) {
	raw = strings.TrimSpace(raw)
	if raw == "" {
		return "", nil
	}
	if strings.HasPrefix(raw, "http://") || strings.HasPrefix(raw, "https://") {
		if _, err := url.ParseRequestURI(raw); err != nil {
			return "", invalidf("URL icon tidak valid")
		}
		return raw, nil
	}

	b64 := raw
	if strings.HasPrefix(raw, "data:") {
		idx := strings.Index(raw, ",")
		if idx < 0 {
			return "", invalidf("format data URI icon tidak valid")
		}
		b64 = raw[idx+1:]
	}

	data, err := base64.StdEncoding.DecodeString(b64)
	if err != nil {
		return "", invalidf("icon bukan URL maupun data gambar (base64) yang valid")
	}
	if len(data) == 0 {
		return "", invalidf("data icon kosong")
	}
	if len(data) > maxIconBytes {
		return "", invalidf("icon terlalu besar (maksimum %dKB, gunakan gambar yang lebih kecil)", maxIconBytes/1024)
	}

	mime := sniffImageMIME(data)
	if !allowedIconMIME[mime] {
		return "", invalidf("format icon tidak didukung (%s) — pakai PNG/JPEG/GIF/WebP/SVG", mime)
	}
	return "data:" + mime + ";base64," + base64.StdEncoding.EncodeToString(data), nil
}

// sniffImageMIME wraps http.DetectContentType with an SVG-specific check —
// SVG is XML text, so net/http's byte-signature sniffer reports it as
// text/xml or text/plain, never image/svg+xml.
func sniffImageMIME(data []byte) string {
	head := strings.TrimSpace(string(data[:min(len(data), 512)]))
	headLower := strings.ToLower(head)
	if strings.HasPrefix(headLower, "<?xml") || strings.HasPrefix(headLower, "<svg") {
		return "image/svg+xml"
	}
	return http.DetectContentType(data)
}

func randomID() (string, error) {
	b := make([]byte, 8)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("quicklinks: generate id: %w", err)
	}
	return hex.EncodeToString(b), nil
}
