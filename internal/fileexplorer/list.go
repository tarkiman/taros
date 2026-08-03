package fileexplorer

import (
	"fmt"
	"os"
	"os/user"
	"path/filepath"
	"sort"
	"strconv"
	"syscall"
	"time"
)

type Entry struct {
	Name      string
	IsDir     bool
	SizeBytes int64
	Mode      string // e.g. "-rw-r--r--"
	Owner     string // username, falls back to numeric uid as a string if unresolvable
	Group     string
	ModTime   time.Time
}

// List returns the contents of dir (already jail-resolved by the caller —
// this function does no path validation itself, see safepath.go),
// directories first then files, both alphabetical.
func List(dir string) ([]Entry, error) {
	items, err := os.ReadDir(dir)
	if err != nil {
		return nil, fmt.Errorf("fileexplorer: read dir %q: %w", dir, err)
	}

	ownerCache := make(map[uint32]string)
	groupCache := make(map[uint32]string)

	entries := make([]Entry, 0, len(items))
	for _, item := range items {
		info, err := item.Info()
		if err != nil {
			// Broken symlink or a file that vanished mid-listing — skip
			// rather than fail the whole directory listing.
			continue
		}

		e := Entry{
			Name:      item.Name(),
			IsDir:     item.IsDir(),
			SizeBytes: info.Size(),
			Mode:      info.Mode().String(),
			ModTime:   info.ModTime(),
		}
		if stat, ok := info.Sys().(*syscall.Stat_t); ok {
			e.Owner = lookupOwner(stat.Uid, ownerCache)
			e.Group = lookupGroup(stat.Gid, groupCache)
		}
		entries = append(entries, e)
	}

	sort.Slice(entries, func(i, j int) bool {
		if entries[i].IsDir != entries[j].IsDir {
			return entries[i].IsDir
		}
		return entries[i].Name < entries[j].Name
	})

	return entries, nil
}

func lookupOwner(uid uint32, cache map[uint32]string) string {
	if name, ok := cache[uid]; ok {
		return name
	}
	name := strconv.FormatUint(uint64(uid), 10)
	if u, err := user.LookupId(name); err == nil {
		name = u.Username
	}
	cache[uid] = name
	return name
}

func lookupGroup(gid uint32, cache map[uint32]string) string {
	if name, ok := cache[gid]; ok {
		return name
	}
	name := strconv.FormatUint(uint64(gid), 10)
	if g, err := user.LookupGroupId(name); err == nil {
		name = g.Name
	}
	cache[gid] = name
	return name
}

// Stat is a thin wrapper so callers (handlers) don't need to import os
// directly just to check whether a resolved path is a file or directory.
func Stat(path string) (os.FileInfo, error) {
	return os.Stat(path)
}

func JoinName(dir, name string) string {
	return filepath.Join(dir, name)
}
