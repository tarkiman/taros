package fileexplorer

import (
	"container/heap"
	"context"
	"errors"
	"fmt"
	"io/fs"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"syscall"
	"time"
)

// topFilesLimit bounds memory during Scan regardless of how many files
// exist under Root — see the min-heap below.
const topFilesLimit = 50

type ScanEntry struct {
	Path      string `json:"path"`
	SizeBytes int64  `json:"sizeBytes"`
}

// ScanResult is the disk-usage report for one Scan call — see
// docs/04-features.md §4.12 "Analisis Disk" for the UI this feeds and the
// design rationale (why this stays read-only, why top-level dirs only,
// why mount points and permission errors are surfaced rather than
// silently dropped).
type ScanResult struct {
	Root             string      `json:"root"`
	TotalBytes       int64       `json:"totalBytes"`
	DurationMs       int64       `json:"durationMs"`
	TopLevelDirs     []ScanEntry `json:"topLevelDirs"`
	LargestFiles     []ScanEntry `json:"largestFiles"`
	SkippedMounts    []string    `json:"skippedMounts,omitempty"`
	PermissionErrors int         `json:"permissionErrors,omitempty"`
}

// entryHeap is a min-heap on SizeBytes — Scan keeps only the topFilesLimit
// largest files seen so far, evicting the current smallest whenever a
// bigger one shows up, instead of collecting every file in memory before
// sorting (this matters on a tree with millions of small files on a
// memory-constrained device).
type entryHeap []ScanEntry

func (h entryHeap) Len() int           { return len(h) }
func (h entryHeap) Less(i, j int) bool { return h[i].SizeBytes < h[j].SizeBytes }
func (h entryHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *entryHeap) Push(x any)        { *h = append(*h, x.(ScanEntry)) }
func (h *entryHeap) Pop() any {
	old := *h
	n := len(old)
	item := old[n-1]
	*h = old[:n-1]
	return item
}

// Scan walks j.Root looking for the largest individual files and the
// per-top-level-directory size breakdown — see ScanResult's doc comment.
// It never writes to the filesystem; deletion is a separate, already
// existing capability (Delete, reached through the same Jail via the
// regular file-op endpoint) so this function's only failure mode is
// "couldn't read/report," never "deleted something."
func Scan(ctx context.Context, j *Jail) (ScanResult, error) {
	start := time.Now()

	rootInfo, err := os.Lstat(j.Root)
	if err != nil {
		return ScanResult{}, fmt.Errorf("fileexplorer: stat root %q: %w", j.Root, err)
	}
	var rootDev uint64
	if st, ok := rootInfo.Sys().(*syscall.Stat_t); ok {
		rootDev = uint64(st.Dev)
	}

	var (
		totalBytes       int64
		permissionErrors int
		skippedMounts    []string
		dirTotals        = make(map[string]int64)
		topFiles         entryHeap
	)

	walkErr := filepath.WalkDir(j.Root, func(path string, d fs.DirEntry, err error) error {
		if ctxErr := ctx.Err(); ctxErr != nil {
			return ctxErr
		}

		if err != nil {
			if os.IsPermission(err) {
				permissionErrors++
				if d != nil && d.IsDir() {
					return filepath.SkipDir
				}
				return nil
			}
			// Entry vanished mid-walk or similarly transient — skip it
			// rather than aborting the whole scan.
			return nil
		}

		if boundsErr := j.checkBounds(path); boundsErr != nil {
			if d.IsDir() {
				return filepath.SkipDir
			}
			return nil
		}

		if d.IsDir() {
			if path == j.Root {
				return nil
			}
			if info, statErr := d.Info(); statErr == nil {
				if st, ok := info.Sys().(*syscall.Stat_t); ok && uint64(st.Dev) != rootDev {
					skippedMounts = append(skippedMounts, path)
					return filepath.SkipDir
				}
			}
			return nil
		}

		info, infoErr := d.Info()
		if infoErr != nil {
			return nil
		}
		if !info.Mode().IsRegular() {
			// Symlinks, sockets, devices, etc. — not meaningful disk usage
			// to report or safe to blindly size-count (a symlink's own
			// dirent is tiny; its target, if any, is a separate real file
			// that gets counted on its own when the walk reaches it).
			return nil
		}

		size := info.Size()
		totalBytes += size
		dirTotals[topLevelBucket(j.Root, path)] += size

		entry := ScanEntry{Path: path, SizeBytes: size}
		if len(topFiles) < topFilesLimit {
			heap.Push(&topFiles, entry)
		} else if size > topFiles[0].SizeBytes {
			topFiles[0] = entry
			heap.Fix(&topFiles, 0)
		}
		return nil
	})
	if walkErr != nil && !errors.Is(walkErr, context.Canceled) && !errors.Is(walkErr, context.DeadlineExceeded) {
		return ScanResult{}, fmt.Errorf("fileexplorer: scan %q: %w", j.Root, walkErr)
	}
	if walkErr != nil {
		return ScanResult{}, walkErr
	}

	largestFiles := []ScanEntry(topFiles)
	sort.Slice(largestFiles, func(i, k int) bool { return largestFiles[i].SizeBytes > largestFiles[k].SizeBytes })

	topLevelDirs := make([]ScanEntry, 0, len(dirTotals))
	for path, size := range dirTotals {
		topLevelDirs = append(topLevelDirs, ScanEntry{Path: path, SizeBytes: size})
	}
	sort.Slice(topLevelDirs, func(i, k int) bool { return topLevelDirs[i].SizeBytes > topLevelDirs[k].SizeBytes })

	return ScanResult{
		Root:             j.Root,
		TotalBytes:       totalBytes,
		DurationMs:       time.Since(start).Milliseconds(),
		TopLevelDirs:     topLevelDirs,
		LargestFiles:     largestFiles,
		SkippedMounts:    skippedMounts,
		PermissionErrors: permissionErrors,
	}, nil
}

// topLevelBucket returns the absolute path of path's immediate ancestor
// directly under root — e.g. "/var" for "/var/log/foo.log" when root is
// "/" — or root itself for a file that sits directly in root with no
// intervening directory.
func topLevelBucket(root, path string) string {
	rel, err := filepath.Rel(root, path)
	if err != nil || rel == "." {
		return root
	}
	parts := strings.SplitN(rel, string(filepath.Separator), 2)
	return filepath.Join(root, parts[0])
}
