package fileexplorer

import (
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"strings"
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

// ErrExists: the destination name is already taken. ErrInvalidName: not a name a
// single folder entry can have (empty, ".", "..", contains "/" or NUL, too long).
var (
	ErrExists      = errors.New("fileexplorer: destination already exists")
	ErrInvalidName = errors.New("fileexplorer: invalid name")
)

// ValidName reports whether name can be the name of one entry in a folder.
func ValidName(name string) error {
	switch {
	case strings.TrimSpace(name) == "", name == ".", name == "..":
		return ErrInvalidName
	case strings.ContainsAny(name, "/\x00"), len(name) > 255:
		return ErrInvalidName
	}
	return nil
}

// Rename moves oldPath to newPath and never replaces anything: a destination
// that exists (even as a dangling symlink) is ErrExists. When both are on the
// same filesystem (the common case) this is an instant atomic rename — no data
// copy. Cross-filesystem streaming moves are a Fase 3b concern (job queue), not
// handled here.
//
// The check and the rename are one atomic step where the kernel offers it
// (renameat2 RENAME_NOREPLACE), so a file created in between is not silently
// overwritten. On case-insensitive filesystems (FAT, exFAT, NTFS — USB drives)
// changing only the case of a name ("Foto.JPG" → "foto.jpg") finds the "other"
// name taken by the very same file; that is allowed.
func Rename(oldPath, newPath string) error {
	err := renameNoReplace(oldPath, newPath)
	if errors.Is(err, fs.ErrExist) {
		if !caseOnlyRename(oldPath, newPath) {
			return fmt.Errorf("%w: %q", ErrExists, filepath.Base(newPath))
		}
		err = renameViaTemp(oldPath, newPath)
	}
	if err != nil {
		return fmt.Errorf("fileexplorer: rename: %w", err)
	}
	return nil
}

// renameViaTemp changes only the case of a name. On FAT/exFAT/NTFS the kernel sees
// old and new as one and the same directory entry and reports success without
// changing anything — so it goes through a temporary name: old → temp → new.
func renameViaTemp(oldPath, newPath string) error {
	tmp := filepath.Join(filepath.Dir(oldPath), fmt.Sprintf(".%s.taros-rename-%d", filepath.Base(oldPath), os.Getpid()))
	if err := os.Rename(oldPath, tmp); err != nil {
		return err
	}
	if err := renameNoReplace(tmp, newPath); err != nil {
		_ = os.Rename(tmp, oldPath) // put it back
		return err
	}
	return nil
}

// caseOnlyRename: same folder, names equal ignoring case, and both names lead to
// the same file — i.e. a case-insensitive filesystem, not two different files.
func caseOnlyRename(oldPath, newPath string) bool {
	if filepath.Dir(oldPath) != filepath.Dir(newPath) || filepath.Base(oldPath) == filepath.Base(newPath) ||
		!strings.EqualFold(filepath.Base(oldPath), filepath.Base(newPath)) {
		return false
	}
	a, err1 := os.Lstat(oldPath)
	b, err2 := os.Lstat(newPath)
	return err1 == nil && err2 == nil && os.SameFile(a, b)
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
