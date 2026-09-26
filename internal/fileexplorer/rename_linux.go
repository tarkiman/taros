//go:build linux

package fileexplorer

import (
	"errors"
	"os"
	"syscall"

	"golang.org/x/sys/unix"
)

// renameNoReplace renames without ever replacing the destination. Where the
// filesystem does not support RENAME_NOREPLACE (some FUSE and network
// filesystems) it falls back to "look, then rename" — still refusing an existing
// destination, only without the atomicity.
func renameNoReplace(oldPath, newPath string) error {
	err := unix.Renameat2(unix.AT_FDCWD, oldPath, unix.AT_FDCWD, newPath, unix.RENAME_NOREPLACE)
	if err == nil {
		return nil
	}
	if !errors.Is(err, unix.EINVAL) && !errors.Is(err, unix.ENOSYS) && !errors.Is(err, unix.ENOTSUP) {
		return &os.LinkError{Op: "rename", Old: oldPath, New: newPath, Err: err}
	}
	if _, lerr := os.Lstat(newPath); lerr == nil {
		return &os.LinkError{Op: "rename", Old: oldPath, New: newPath, Err: syscall.EEXIST}
	}
	return os.Rename(oldPath, newPath)
}
