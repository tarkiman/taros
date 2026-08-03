package fileexplorer

import (
	"context"
	"fmt"
	"io"
	"io/fs"
	"os"
	"path/filepath"
	"syscall"
	"time"
)

// CopyOptions — see docs/09-deployment.md fileExplorer.copyThrottleMBps /
// copySyncEveryMB, and docs/04-features.md §4.4 "Keandalan Operasi File
// Besar/Banyak" for why every one of these fields exists.
type CopyOptions struct {
	BufferBytes         int   // fixed-size buffer, memory use independent of file size
	ThrottleBytesPerSec int64 // 0 = unlimited
	SyncEveryBytes      int64 // 0 = never sync until the file is done
}

// throttle enforces an average rate across the whole job (not a per-chunk
// instant cap), so short bursts don't cause unnecessary sleeps.
type throttle struct {
	bytesPerSec int64
	written     int64
	start       time.Time
}

func newThrottle(bytesPerSec int64) *throttle {
	if bytesPerSec <= 0 {
		return nil
	}
	return &throttle{bytesPerSec: bytesPerSec, start: time.Now()}
}

func (t *throttle) wait(n int64) {
	if t == nil {
		return
	}
	t.written += n
	expected := time.Duration(float64(t.written) / float64(t.bytesPerSec) * float64(time.Second))
	elapsed := time.Since(t.start)
	if expected > elapsed {
		time.Sleep(expected - elapsed)
	}
}

// copyFileStream copies one file with a fixed-size buffer (memory use does
// NOT grow with file size), periodic fsync, and optional throttling.
// Writes to a ".tkpart" sibling and renames into place on success, so a
// cancelled/failed copy never leaves a file that looks complete but isn't.
func copyFileStream(ctx context.Context, srcPath, dstPath string, opts CopyOptions, job *Job, thr *throttle) error {
	src, err := os.Open(srcPath)
	if err != nil {
		return fmt.Errorf("open source: %w", err)
	}
	defer src.Close()

	info, err := src.Stat()
	if err != nil {
		return fmt.Errorf("stat source: %w", err)
	}

	tmpPath := dstPath + ".tkpart"
	dst, err := os.OpenFile(tmpPath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, info.Mode().Perm())
	if err != nil {
		return fmt.Errorf("create destination: %w", err)
	}

	buf := make([]byte, opts.BufferBytes)
	var sinceSync int64
	for {
		select {
		case <-ctx.Done():
			dst.Close()
			os.Remove(tmpPath)
			return ctx.Err()
		default:
		}

		n, readErr := src.Read(buf)
		if n > 0 {
			if _, werr := dst.Write(buf[:n]); werr != nil {
				dst.Close()
				os.Remove(tmpPath)
				return fmt.Errorf("write: %w", werr)
			}
			job.addCopied(int64(n))
			sinceSync += int64(n)
			thr.wait(int64(n))

			if opts.SyncEveryBytes > 0 && sinceSync >= opts.SyncEveryBytes {
				dst.Sync()
				sinceSync = 0
			}
		}
		if readErr == io.EOF {
			break
		}
		if readErr != nil {
			dst.Close()
			os.Remove(tmpPath)
			return fmt.Errorf("read: %w", readErr)
		}
	}

	if err := dst.Sync(); err != nil {
		dst.Close()
		os.Remove(tmpPath)
		return fmt.Errorf("sync: %w", err)
	}
	if err := dst.Close(); err != nil {
		os.Remove(tmpPath)
		return fmt.Errorf("close: %w", err)
	}
	if err := os.Rename(tmpPath, dstPath); err != nil {
		return fmt.Errorf("finalize: %w", err)
	}
	return nil
}

// copyTree copies src (file or directory) into destDir, preserving the
// directory structure. Symlinks are skipped (not followed, not
// recreated) — out of scope for this pass, see docs/10-roadmap.md.
func copyTree(ctx context.Context, src, destDir string, opts CopyOptions, job *Job, thr *throttle) error {
	srcInfo, err := os.Lstat(src)
	if err != nil {
		return err
	}

	if !srcInfo.IsDir() {
		job.setCurrentFile(filepath.Base(src))
		return copyFileStream(ctx, src, filepath.Join(destDir, filepath.Base(src)), opts, job, thr)
	}

	base := filepath.Base(src)
	return filepath.WalkDir(src, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		rel, err := filepath.Rel(src, path)
		if err != nil {
			return err
		}
		target := filepath.Join(destDir, base, rel)

		if d.IsDir() {
			return os.MkdirAll(target, 0o755)
		}
		if d.Type()&os.ModeSymlink != 0 {
			return nil // skip symlinks — see doc comment above
		}

		select {
		case <-ctx.Done():
			return ctx.Err()
		default:
		}

		job.setCurrentFile(rel)
		return copyFileStream(ctx, path, target, opts, job, thr)
	})
}

// estimateSize sums the size of every regular file under paths, used both
// for the progress bar's denominator and the disk-space check below.
func estimateSize(paths []string) (int64, error) {
	var total int64
	for _, p := range paths {
		err := filepath.WalkDir(p, func(_ string, d fs.DirEntry, err error) error {
			if err != nil {
				return err
			}
			if d.Type().IsRegular() {
				info, err := d.Info()
				if err != nil {
					return err
				}
				total += info.Size()
			}
			return nil
		})
		if err != nil {
			return 0, err
		}
	}
	return total, nil
}

// checkDiskSpace rejects up front if destDir's filesystem doesn't have
// room, rather than failing partway through with files half-copied — see
// docs/04-features.md §4.4.
func checkDiskSpace(destDir string, neededBytes int64) error {
	var stat syscall.Statfs_t
	if err := syscall.Statfs(destDir, &stat); err != nil {
		return fmt.Errorf("check disk space: %w", err)
	}
	available := int64(stat.Bavail) * int64(stat.Bsize)
	if neededBytes > available {
		return fmt.Errorf("ruang disk tidak cukup: butuh %s, tersedia %s",
			humanBytes(neededBytes), humanBytes(available))
	}
	return nil
}

func humanBytes(n int64) string {
	const unit = 1024
	if n < unit {
		return fmt.Sprintf("%d B", n)
	}
	div, exp := int64(unit), 0
	for v := n / unit; v >= unit; v /= unit {
		div *= unit
		exp++
	}
	return fmt.Sprintf("%.1f %ciB", float64(n)/float64(div), "KMGTPE"[exp])
}

// sameFilesystem reports whether a and b live on the same device — if so,
// a move between them can be an instant os.Rename instead of a stream
// copy + delete. Falls back to comparing parent directories when a path
// doesn't exist yet (e.g. the not-yet-created destination file).
func sameFilesystem(a, b string) (bool, error) {
	devA, err := deviceOf(a)
	if err != nil {
		return false, err
	}
	devB, err := deviceOf(b)
	if err != nil {
		return false, err
	}
	return devA == devB, nil
}

func deviceOf(path string) (uint64, error) {
	info, err := os.Stat(path)
	if err != nil {
		if os.IsNotExist(err) {
			return deviceOf(filepath.Dir(path))
		}
		return 0, err
	}
	stat, ok := info.Sys().(*syscall.Stat_t)
	if !ok {
		return 0, fmt.Errorf("cannot determine device for %q", path)
	}
	return uint64(stat.Dev), nil
}
