package storage

import (
	"context"
	"log/slog"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

// fingerprint is a cheap summary of "which block devices exist and what is
// mounted": when it does not change there is nothing to look at, so an idle
// machine costs two small file reads per tick and no processes.
func (m *Manager) fingerprint() string {
	var b strings.Builder
	if names, err := os.ReadDir(m.Paths.SysBlock); err == nil {
		list := make([]string, 0, len(names))
		for _, n := range names {
			// A disk's size is part of the fingerprint: putting a card into a card reader
			// or attaching an image to a loop device adds no device node, it only makes
			// an existing one stop being empty.
			size, _ := os.ReadFile(filepath.Join(m.Paths.SysBlock, n.Name(), "size"))
			list = append(list, n.Name()+"="+strings.TrimSpace(string(size)))
			// partitions live under their disk
			if subs, err := os.ReadDir(filepath.Join(m.Paths.SysBlock, n.Name())); err == nil {
				for _, s := range subs {
					if strings.HasPrefix(s.Name(), n.Name()) {
						list = append(list, s.Name())
					}
				}
			}
		}
		sort.Strings(list)
		b.WriteString(strings.Join(list, ","))
	}
	b.WriteByte('|')
	if data, err := os.ReadFile(m.Paths.MountInfo); err == nil {
		b.Write(data)
	}
	return b.String()
}

// Watch watches for drives until ctx ends: it mounts newly plugged external
// drives (when auto-mount is on), notices unplugging, and cleans up mounts whose
// drive vanished. It never touches a drive on its first sighting — udev needs a
// moment to learn the filesystem — only on the next look.
func (m *Manager) Watch(ctx context.Context) {
	if m.GOOS != "linux" || !m.Cfg.Enabled {
		return
	}
	poll := m.Cfg.Poll
	if poll <= 0 {
		poll = 3 * time.Second
	}
	m.tick(ctx)
	t := time.NewTicker(poll)
	defer t.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			m.tick(ctx)
		}
	}
}

func (m *Manager) tick(ctx context.Context) {
	fp := m.fingerprint()
	m.stateMu.Lock()
	changed := fp != m.lastFP || m.pending
	m.lastFP, m.pending = fp, false
	m.stateMu.Unlock()
	if !changed {
		return
	}
	m.invalidate()
	if _, err := m.LookPath("lsblk"); err != nil {
		return
	}
	devs, err := m.lsblk(ctx)
	if err != nil {
		return
	}
	disks := m.disksFrom(devs)

	// plug / unplug bookkeeping
	now := m.Now()
	current := map[string]Partition{}
	for _, d := range disks {
		for _, p := range d.Partitions {
			current[p.Path] = p
		}
	}
	var fresh []string
	var events []Event
	m.stateMu.Lock()
	for path, p := range current {
		if !m.present[path] {
			m.present[path] = true
			m.firstSeen[path] = now
			fresh = append(fresh, path)
			slog.Info("storage: drive detected", "device", path, "fs", p.FSType, "label", p.Label, "state", p.State)
			events = append(events, Event{Kind: "plugged", Device: path, Label: p.Label, Detail: p.FSType})
		}
	}
	for path := range m.present {
		if _, ok := current[path]; !ok {
			delete(m.present, path)
			delete(m.firstSeen, path)
			delete(m.failed, path)
			delete(m.roNotes, path)
			delete(m.unmountedByUser, path)
			for k := range m.probes {
				if strings.HasPrefix(k, path+"|") {
					delete(m.probes, k)
				}
			}
			slog.Info("storage: drive gone", "device", path)
			events = append(events, Event{Kind: "unplugged", Device: path})
		}
	}
	if len(fresh) > 0 {
		m.pending = true // look again next tick, once udev has settled
	}
	// A drive that was mounted and is now plainly not, while still plugged in, was unmounted
	// by somebody (a terminal, another tool). That is a decision, not something to undo.
	for path, p := range current {
		mounted := p.State == StateMounted || p.State == StateMountedRO
		if m.wasMounted[path] && p.State == StateUnmounted {
			m.unmountedByUser[path] = true
		}
		m.wasMounted[path] = mounted
	}
	for path := range m.wasMounted {
		if _, ok := current[path]; !ok {
			delete(m.wasMounted, path)
		}
	}
	m.stateMu.Unlock()
	for _, e := range events {
		m.emit(e)
	}

	ok, _ := m.canMount()
	if !ok {
		return
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	m.cleanStale(ctx, devs)
	if !m.Store.Get().AutoMount {
		return
	}
	m.stateMu.Lock()
	byUser := map[string]bool{}
	for k := range m.unmountedByUser {
		byUser[k] = true
	}
	m.stateMu.Unlock()
	isFresh := map[string]bool{}
	for _, f := range fresh {
		isFresh[f] = true
	}
	acted := false
	for _, d := range disks {
		for _, p := range d.Partitions {
			if p.State != StateUnmounted || p.FSType == "" || isFresh[p.Path] || byUser[p.Path] {
				continue
			}
			acted = true
			if err := m.mountLocked(ctx, p.Path, false); err != nil {
				slog.Warn("storage: auto-mount failed", "device", p.Path, "err", err)
			} else {
				slog.Info("storage: auto-mounted", "device", p.Path, "label", p.Label)
			}
		}
	}
	if acted {
		// Our own mounts change what the fingerprint sees: take that as the new
		// baseline, so the next real change (someone unmounting) is not masked by it.
		m.stateMu.Lock()
		m.lastFP = m.fingerprint()
		m.stateMu.Unlock()
	}
}

// cleanStale detaches mounts under our mount base whose drive was pulled out
// without being ejected (they linger, every access failing), and removes the
// empty directory.
func (m *Manager) cleanStale(ctx context.Context, devs []blockDev) {
	exists := map[string]bool{}
	for _, d := range devs {
		d.walk(func(n blockDev) { exists[n.Path] = true })
	}
	for _, r := range m.readMounts() {
		if !m.underBase(r.point) || r.point == filepath.Clean(m.Cfg.MountBase) || !strings.HasPrefix(r.source, "/dev/") {
			continue
		}
		if exists[r.source] {
			continue
		}
		slog.Warn("storage: drive removed without being ejected, detaching its mount", "mount", r.point, "device", r.source)
		if _, err := m.Run.Run(ctx, m.tool("umount"), "-l", r.point); err == nil {
			_ = os.Remove(r.point)
			m.emit(Event{Kind: "removed_unsafely", Device: r.source, Detail: r.point})
		}
	}
}
