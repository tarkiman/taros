// Package fileexplorer provides filesystem browsing/editing scoped to a
// configured root directory — see docs/07-security.md §7.3. This file
// (safepath.go) is the security-critical part: every other file in this
// package must resolve client-supplied paths through Jail.Resolve before
// touching the filesystem. Nothing here trusts a path just because it
// looks clean — traversal, symlink escapes, and a blocklist are all
// checked explicitly.
package fileexplorer

import (
	"fmt"
	"os"
	"path/filepath"
	"strings"
)

// Jail scopes all file operations to Root, additionally rejecting
// anything under Blocklist even if it's inside Root.
type Jail struct {
	Root      string
	Blocklist []string
}

// NewJail resolves root (and symlinks in it) once at startup — see
// docs/09-deployment.md for the config field this comes from
// (fileExplorer.rootDir, default "/").
func NewJail(root string, blocklist []string) (*Jail, error) {
	absRoot, err := filepath.Abs(root)
	if err != nil {
		return nil, fmt.Errorf("fileexplorer: resolve root %q: %w", root, err)
	}
	resolvedRoot, err := filepath.EvalSymlinks(absRoot)
	if err != nil {
		return nil, fmt.Errorf("fileexplorer: root %q does not exist or is inaccessible: %w", root, err)
	}

	cleanedBlocklist := make([]string, 0, len(blocklist))
	for _, b := range blocklist {
		absB, err := filepath.Abs(b)
		if err != nil {
			continue
		}
		cleanedBlocklist = append(cleanedBlocklist, filepath.Clean(absB))
	}

	return &Jail{Root: resolvedRoot, Blocklist: cleanedBlocklist}, nil
}

// Resolve validates a client-supplied absolute path and returns the real
// (symlink-resolved) filesystem path, or an error if it's outside Root,
// blocklisted, or escapes Root via a symlink anywhere in its chain. The
// returned path is safe to pass directly to os.* calls.
//
// requestedPath does not need to already exist (needed for create/mkdir/
// rename-destination) — the deepest existing ancestor is what actually
// gets symlink-resolved, and the non-existent tail is reattached after.
func (j *Jail) Resolve(requestedPath string) (string, error) {
	cleaned := filepath.Clean(requestedPath)
	if !filepath.IsAbs(cleaned) {
		return "", fmt.Errorf("path must be absolute: %q", requestedPath)
	}

	if err := j.checkBounds(cleaned); err != nil {
		return "", err
	}

	resolved, err := resolveSymlinksBestEffort(cleaned)
	if err != nil {
		return "", fmt.Errorf("fileexplorer: resolve %q: %w", requestedPath, err)
	}

	if err := j.checkBounds(resolved); err != nil {
		return "", fmt.Errorf("%w (via symlink)", err)
	}

	return resolved, nil
}

func (j *Jail) checkBounds(path string) error {
	if !isWithin(j.Root, path) {
		return fmt.Errorf("path outside allowed root: %q", path)
	}
	for _, b := range j.Blocklist {
		if path == b || isWithin(b, path) {
			return fmt.Errorf("path is blocked by policy: %q", path)
		}
	}
	for _, part := range strings.Split(path, string(filepath.Separator)) {
		if part == ".ssh" {
			return fmt.Errorf("path is blocked by policy (.ssh directories are never accessible): %q", path)
		}
	}
	return nil
}

// isWithin reports whether path is root itself or a descendant of it.
func isWithin(root, path string) bool {
	rel, err := filepath.Rel(root, path)
	if err != nil {
		return false
	}
	return rel == "." || (rel != ".." && !strings.HasPrefix(rel, ".."+string(filepath.Separator)))
}

// resolveSymlinksBestEffort resolves symlinks in the deepest existing
// ancestor of path, then rejoins whatever tail doesn't exist yet.
func resolveSymlinksBestEffort(path string) (string, error) {
	resolved, err := filepath.EvalSymlinks(path)
	if err == nil {
		return resolved, nil
	}
	if !os.IsNotExist(err) {
		return "", err
	}

	parent := filepath.Dir(path)
	if parent == path {
		return "", err
	}
	resolvedParent, err := resolveSymlinksBestEffort(parent)
	if err != nil {
		return "", err
	}
	return filepath.Join(resolvedParent, filepath.Base(path)), nil
}
