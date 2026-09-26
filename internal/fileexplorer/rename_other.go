//go:build !linux

package fileexplorer

import (
	"os"
	"syscall"
)

// renameNoReplace: no atomic no-replace rename here, so look first (with Lstat, so
// a dangling symlink counts as taken) and then rename.
func renameNoReplace(oldPath, newPath string) error {
	if _, err := os.Lstat(newPath); err == nil {
		return &os.LinkError{Op: "rename", Old: oldPath, New: newPath, Err: syscall.EEXIST}
	}
	return os.Rename(oldPath, newPath)
}
