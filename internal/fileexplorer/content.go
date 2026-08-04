package fileexplorer

import (
	"bytes"
	"errors"
	"fmt"
	"os"
	"syscall"
	"time"
)

// MaxEditableSize — files larger than this can only be downloaded, not
// opened in the editor, see docs/04-features.md §4.4.
const MaxEditableSize = 2 * 1024 * 1024

// ErrTooLarge and ErrBinary are returned by ReadContent so the handler
// layer can give the client a specific, actionable message rather than a
// generic failure.
var (
	ErrTooLarge = errors.New("file terlalu besar untuk dibuka di editor")
	ErrBinary   = errors.New("file terlihat biner, bukan teks")
	// ErrConflict: the file changed on disk since it was last read — see
	// docs/04-features.md §4.4 "Deteksi konflik".
	ErrConflict = errors.New("file sudah berubah di disk sejak terakhir dibuka")
)

type FileContent struct {
	Content string
	ModTime time.Time
}

// ReadContent reads path for the editor, rejecting anything that looks
// binary or exceeds MaxEditableSize before ever reading the whole thing.
func ReadContent(path string) (FileContent, error) {
	info, err := os.Stat(path)
	if err != nil {
		return FileContent{}, fmt.Errorf("fileexplorer: stat: %w", err)
	}
	if info.Size() > MaxEditableSize {
		return FileContent{}, ErrTooLarge
	}

	data, err := os.ReadFile(path)
	if err != nil {
		return FileContent{}, fmt.Errorf("fileexplorer: read: %w", err)
	}
	if looksBinary(data) {
		return FileContent{}, ErrBinary
	}

	return FileContent{Content: string(data), ModTime: info.ModTime()}, nil
}

// looksBinary uses the same heuristic as most text tools: a null byte
// anywhere in the content means "not text". Checking the whole file (not
// just a prefix) is fine here since ReadContent already caps size at
// MaxEditableSize (2MB) before this is ever called.
func looksBinary(data []byte) bool {
	return bytes.IndexByte(data, 0) != -1
}

// WriteContent saves atomically (temp file + rename, per
// docs/04-features.md §4.4 "Saat save") and preserves the original file's
// permission bits. Ownership is preserved best-effort: a non-root process
// can only chown files it already owns to begin with, so this quietly
// no-ops rather than failing the save when it can't — see
// docs/07-security.md for why TarOS runs unprivileged.
//
// If expectedModTime is non-zero and doesn't match the file's current
// mtime, returns ErrConflict without writing anything — someone else
// changed the file since the editor last read it.
func WriteContent(path, content string, expectedModTime time.Time) error {
	info, err := os.Stat(path)
	if err != nil {
		return fmt.Errorf("fileexplorer: stat: %w", err)
	}
	if !expectedModTime.IsZero() && !info.ModTime().Equal(expectedModTime) {
		return ErrConflict
	}

	tmpPath := path + ".tktmp"
	if err := os.WriteFile(tmpPath, []byte(content), info.Mode().Perm()); err != nil {
		return fmt.Errorf("fileexplorer: write temp file: %w", err)
	}

	if stat, ok := info.Sys().(*syscall.Stat_t); ok {
		_ = os.Chown(tmpPath, int(stat.Uid), int(stat.Gid)) // best-effort, see doc comment
	}

	if err := os.Rename(tmpPath, path); err != nil {
		os.Remove(tmpPath)
		return fmt.Errorf("fileexplorer: finalize save: %w", err)
	}
	return nil
}
