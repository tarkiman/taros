package storage

import (
	"os/exec"
	"runtime"
	"syscall"
)

func goos() string { return runtime.GOOS }

func lookPath(name string) (string, error) {
	if p, err := exec.LookPath(name); err == nil {
		return p, nil
	}
	for _, d := range []string{"/usr/sbin/", "/sbin/", "/usr/bin/", "/bin/"} {
		if p, err := exec.LookPath(d + name); err == nil {
			return p, nil
		}
	}
	return "", exec.ErrNotFound
}

func statfs(path string) (total, free uint64, err error) {
	var st syscall.Statfs_t
	if err := syscall.Statfs(path, &st); err != nil {
		return 0, 0, err
	}
	return uint64(st.Bsize) * st.Blocks, uint64(st.Bsize) * st.Bavail, nil
}
