package fileexplorer

import (
	"fmt"
	"os"
)

// Mkdir creates a new directory. Fails if it already exists (no silent
// overwrite of an existing entry).
func Mkdir(path string) error {
	if err := os.Mkdir(path, 0o755); err != nil {
		return fmt.Errorf("fileexplorer: create folder: %w", err)
	}
	return nil
}

// CreateFile creates a new empty file. Fails if it already exists.
func CreateFile(path string) error {
	f, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0o644)
	if err != nil {
		return fmt.Errorf("fileexplorer: create file: %w", err)
	}
	return f.Close()
}

// Rename moves oldPath to newPath. When both are on the same filesystem
// (the common case) this is an instant atomic os.Rename — no data copy.
// Cross-filesystem streaming moves are a Fase 3b concern (job queue), not
// handled here.
func Rename(oldPath, newPath string) error {
	if _, err := os.Stat(newPath); err == nil {
		return fmt.Errorf("fileexplorer: rename: destination already exists: %q", newPath)
	}
	if err := os.Rename(oldPath, newPath); err != nil {
		return fmt.Errorf("fileexplorer: rename: %w", err)
	}
	return nil
}

// Delete removes a file or, recursively, a directory. There is no
// trash/undo — see docs/04-features.md §4.4, the UI is responsible for
// confirming with the user before calling this.
func Delete(path string) error {
	if err := os.RemoveAll(path); err != nil {
		return fmt.Errorf("fileexplorer: delete: %w", err)
	}
	return nil
}
