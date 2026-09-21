package storage

import (
	"os"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
)

// busyError explains a refused unmount: which processes hold files (or their
// working directory) inside the mount, and which shares live in it.
func (m *Manager) busyError(mp string) *BusyError {
	e := &BusyError{}
	if m.UsedBy != nil {
		e.UsedBy = m.UsedBy(mp)
	}
	entries, err := os.ReadDir(m.Paths.Proc)
	if err != nil {
		return e
	}
	inside := func(link string) bool { return link == mp || strings.HasPrefix(link, mp+"/") }
	seen := map[int]bool{}
	for _, ent := range entries {
		pid, err := strconv.Atoi(ent.Name())
		if err != nil || seen[pid] {
			continue
		}
		dir := filepath.Join(m.Paths.Proc, ent.Name())
		hit := false
		if l, err := os.Readlink(filepath.Join(dir, "cwd")); err == nil && inside(l) {
			hit = true
		}
		if !hit {
			if fds, err := os.ReadDir(filepath.Join(dir, "fd")); err == nil {
				for i, fd := range fds {
					if i > 512 {
						break
					}
					if l, err := os.Readlink(filepath.Join(dir, "fd", fd.Name())); err == nil && inside(l) {
						hit = true
						break
					}
				}
			}
		}
		if hit {
			seen[pid] = true
			name := ""
			if b, err := os.ReadFile(filepath.Join(dir, "comm")); err == nil {
				name = strings.TrimSpace(string(b))
			}
			e.Processes = append(e.Processes, BusyProc{PID: pid, Name: name})
			if len(e.Processes) >= 12 {
				break
			}
		}
	}
	sort.Slice(e.Processes, func(i, j int) bool { return e.Processes[i].PID < e.Processes[j].PID })
	return e
}
