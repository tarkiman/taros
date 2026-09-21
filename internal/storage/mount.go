package storage

import (
	"context"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
)

var reDevPath = regexp.MustCompile(`^/dev/[A-Za-z0-9._-]{1,32}$`)

// findPartition looks a drive up in a fresh scan. A request can only ever name
// something TarOS itself lists as an external drive — never an arbitrary device.
func (m *Manager) findPartition(ctx context.Context, path string) (Disk, Partition, error) {
	if !reDevPath.MatchString(path) {
		return Disk{}, Partition{}, ErrNoSuchDevice
	}
	devs, err := m.lsblk(ctx)
	if err != nil {
		return Disk{}, Partition{}, err
	}
	for _, d := range m.disksFrom(devs) {
		for _, p := range d.Partitions {
			if p.Path == path {
				return d, p, nil
			}
		}
	}
	return Disk{}, Partition{}, ErrNoSuchDevice
}

func (m *Manager) findDisk(ctx context.Context, path string) (Disk, error) {
	if !reDevPath.MatchString(path) {
		return Disk{}, ErrNoSuchDevice
	}
	devs, err := m.lsblk(ctx)
	if err != nil {
		return Disk{}, err
	}
	for _, d := range m.disksFrom(devs) {
		if d.Path == path {
			return d, nil
		}
	}
	return Disk{}, ErrNoSuchDevice
}

func (m *Manager) guard() error {
	if m.GOOS != "linux" {
		return ErrUnavailable
	}
	if ok, why := m.canMount(); !ok {
		return fmt.Errorf("%w (%s)", ErrCannotMount, why)
	}
	return nil
}

// ---- mount options -------------------------------------------------------------------------

// mountSpec is the filesystem type and options for mounting p.
func (m *Manager) mountSpec(p Partition, settings Settings, readOnly bool) (fstype string, opts []string) {
	_, uid, gid := m.ownerIDs()
	umask := m.Cfg.Umask
	if umask == "" {
		umask = "002"
	}
	fstype = p.FSType
	opts = []string{"nosuid", "nodev", "noatime"}
	if settings.NoExec {
		opts = append(opts, "noexec")
	}
	own := []string{fmt.Sprintf("uid=%d", uid), fmt.Sprintf("gid=%d", gid), "umask=" + umask}
	switch p.FSType {
	case "vfat":
		opts = append(opts, own...)
		opts = append(opts, "iocharset=utf8", "flush")
	case "exfat":
		opts = append(opts, own...)
	case "ntfs":
		// ntfs-3g knows to refuse a dirty or hibernated volume; the kernel driver
		// is the fallback when it is not installed.
		if _, err := m.LookPath("ntfs-3g"); err == nil {
			fstype = "ntfs-3g"
			opts = append(opts, own...)
			opts = append(opts, "windows_names")
		} else {
			fstype = "ntfs3"
			opts = append(opts, own...)
			opts = append(opts, "windows_names")
		}
	case "iso9660", "udf":
		opts = append(opts, "uid="+fmt.Sprint(uid), "gid="+fmt.Sprint(gid))
		readOnly = true
	}
	if readOnly {
		opts = append(opts, "ro")
	}
	return fstype, opts
}

// dirtyHints: what ntfs-3g / the kernel say when a volume was not cleanly
// unmounted or Windows left it hibernated ("fast startup").
var dirtyHints = []struct{ substr, reason string }{
	{"metadata kept in windows cache", ReasonHibernated}, // ntfs-3g: Windows "fast startup" left the volume half-open
	{"hibernat", ReasonHibernated},
	{"fast restart", ReasonHibernated},
	{"fast startup", ReasonHibernated},
	{"is dirty", ReasonDirty},
	{"unclean", ReasonDirty},
	{"not cleanly", ReasonDirty},
	{"dirty", ReasonDirty},
	{"is scheduled for a check", ReasonDirty},
	{"was not properly unmounted", ReasonDirty},
}

func dirtyReason(msg string) string {
	l := strings.ToLower(msg)
	for _, h := range dirtyHints {
		if strings.Contains(l, h.substr) {
			return h.reason
		}
	}
	return ""
}

func firstLine(s string) string {
	s = strings.TrimSpace(s)
	if i := strings.IndexByte(s, '\n'); i >= 0 {
		s = s[:i]
	}
	if len(s) > 240 {
		s = s[:240]
	}
	return s
}

// ---- mount point names ---------------------------------------------------------------------

// mountDir picks (and remembers) the directory a volume is mounted under. It is
// stable: the same volume always returns to the same path, so a share or a
// container that points into the drive survives unplugging it.
func (m *Manager) mountDir(p Partition) (string, error) {
	settings := m.Store.Get()
	id := volumeID(p)
	if id != "" {
		if n := settings.Names[id]; n != "" && sanitizeName(n) == n {
			return filepath.Join(m.Cfg.MountBase, n), nil
		}
	}
	name := sanitizeName(p.Label)
	short := sanitizeName(p.UUID)
	if len(short) > 8 {
		short = short[:8]
	}
	if short == "" {
		short = sanitizeName(p.Name)
	}
	if name == "" {
		name = "usb-" + short
	}
	taken := map[string]bool{}
	for k, v := range settings.Names {
		if k != id {
			taken[strings.ToLower(v)] = true
		}
	}
	if entries, err := os.ReadDir(m.Cfg.MountBase); err == nil {
		for _, e := range entries {
			taken[strings.ToLower(e.Name())] = true
		}
	}
	cand := name
	if taken[strings.ToLower(cand)] {
		cand = name + "-" + short
	}
	for i := 2; taken[strings.ToLower(cand)]; i++ {
		cand = fmt.Sprintf("%s-%s-%d", name, short, i)
	}
	if id != "" {
		if err := m.Store.Update(func(s *Settings) {
			if s.Names == nil {
				s.Names = map[string]string{}
			}
			s.Names[id] = cand
		}); err != nil {
			return "", err
		}
	}
	return filepath.Join(m.Cfg.MountBase, cand), nil
}

// ---- mount --------------------------------------------------------------------------------

// Mount mounts an external drive (manually, so it also overrides "ignored" and a
// remembered failure).
func (m *Manager) Mount(ctx context.Context, path string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	return m.mountLocked(ctx, path, true)
}

func (m *Manager) mountLocked(ctx context.Context, path string, manual bool) error {
	if err := m.guard(); err != nil {
		return err
	}
	_, p, err := m.findPartition(ctx, path)
	if err != nil {
		return err
	}
	switch p.State {
	case StateMounted, StateMountedRO:
		return ErrAlreadyMounted
	case StateFstab:
		return ErrManagedByFstab
	case StateUnsupported:
		return ErrUnsupportedFS
	case StateIgnored:
		if !manual {
			return nil
		}
	}
	settings := m.Store.Get()
	mp, err := m.mountDir(p)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(m.Cfg.MountBase, 0o755); err != nil {
		return fmt.Errorf("storage: %w", err)
	}
	created := false
	if fi, err := os.Stat(mp); err == nil {
		if !fi.IsDir() {
			return ErrMountpoint
		}
		if entries, _ := os.ReadDir(mp); len(entries) > 0 {
			return ErrMountpoint // never mount over somebody's files
		}
		for _, r := range m.readMounts() {
			if r.point == mp {
				return ErrMountpoint
			}
		}
	} else if err := os.Mkdir(mp, 0o755); err != nil {
		return fmt.Errorf("storage: %w", err)
	} else {
		created = true
	}
	undo := func() {
		if created {
			_ = os.Remove(mp)
		}
	}

	run := func(readOnly bool) (string, error) {
		fstype, opts := m.mountSpec(p, settings, readOnly)
		args := []string{"-t", fstype, "-o", strings.Join(opts, ","), p.Path, mp}
		if r, ok := m.Run.(combinedRunner); ok {
			return r.RunCombined(ctx, m.tool("mount"), args...)
		}
		return m.Run.Run(ctx, m.tool("mount"), args...)
	}
	roReason := ""
	out, err := run(false)
	if err != nil {
		if why := dirtyReason(err.Error()); why != "" {
			// The volume is dirty or hibernated: rather than refuse (or force a
			// write), mount it read-only so its files are still reachable.
			if _, err2 := run(true); err2 == nil {
				err, roReason = nil, why
			}
		}
	} else if why := dirtyReason(out); why != "" {
		// ntfs-3g already fell back to read-only on its own and said so on stderr.
		roReason = why
	}
	if err != nil {
		undo()
		msg := firstLine(err.Error())
		m.stateMu.Lock()
		m.failed[p.Path] = msg
		m.stateMu.Unlock()
		m.invalidate()
		m.emit(Event{Kind: "mount_failed", Device: p.Path, Label: p.Label, Detail: msg})
		return &MountError{Detail: msg}
	}
	m.stateMu.Lock()
	delete(m.failed, p.Path)
	delete(m.unmountedByUser, p.Path)
	m.wasMounted[p.Path] = true // so an unmount by somebody else is recognised as a decision
	if roReason != "" {
		m.roNotes[p.Path] = roReason
	} else {
		delete(m.roNotes, p.Path)
	}
	m.stateMu.Unlock()
	m.invalidate()
	m.emit(Event{Kind: "mounted", Device: p.Path, Label: p.Label, Detail: mp})
	return nil
}

// ---- unmount / eject -------------------------------------------------------------------------

// Unmount unmounts one partition. A busy drive is refused, with what is using it.
func (m *Manager) Unmount(ctx context.Context, path string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if err := m.guard(); err != nil {
		return err
	}
	_, p, err := m.findPartition(ctx, path)
	if err != nil {
		return err
	}
	return m.unmountLocked(ctx, p)
}

func (m *Manager) unmountLocked(ctx context.Context, p Partition) error {
	if p.MountPoint == "" {
		return ErrNotMounted
	}
	if p.ManagedBy == "fstab" {
		return ErrManagedByFstab
	}
	if _, err := m.Run.Run(ctx, m.tool("umount"), p.MountPoint); err != nil {
		m.invalidate()
		if strings.Contains(strings.ToLower(err.Error()), "busy") {
			return m.busyError(p.MountPoint)
		}
		return &UnmountError{Detail: firstLine(err.Error())}
	}
	if m.underBase(p.MountPoint) {
		_ = os.Remove(p.MountPoint) // only succeeds while it is an empty directory
	}
	m.stateMu.Lock()
	delete(m.roNotes, p.Path)
	m.unmountedByUser[p.Path] = true // still plugged in, but the user just said "not now"
	m.stateMu.Unlock()
	m.invalidate()
	m.emit(Event{Kind: "unmounted", Device: p.Path, Label: p.Label})
	return nil
}

// Eject unmounts everything on a disk and then removes the disk from the
// kernel, so it can be unplugged (and a USB hard disk spins down).
func (m *Manager) Eject(ctx context.Context, diskPath string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if err := m.guard(); err != nil {
		return err
	}
	d, err := m.findDisk(ctx, diskPath)
	if err != nil {
		return err
	}
	if !d.Ejectable {
		return ErrManagedByFstab
	}
	for _, p := range d.Partitions {
		if p.MountPoint == "" {
			continue
		}
		if err := m.unmountLocked(ctx, p); err != nil {
			return err
		}
	}
	_, _ = m.Run.Run(ctx, m.tool("sync"))
	del := filepath.Join(m.Paths.SysBlock, d.Name, "device", "delete")
	if err := os.WriteFile(del, []byte("1"), 0o200); err != nil {
		// Unmounted is already safe to unplug; only powering the drive down failed.
		m.emit(Event{Kind: "ejected", Device: d.Path, Label: d.Model, Detail: "unmounted only"})
		m.invalidate()
		return nil
	}
	m.invalidate()
	m.emit(Event{Kind: "ejected", Device: d.Path, Label: d.Model})
	return nil
}

func (m *Manager) emit(e Event) {
	if m.OnEvent != nil {
		m.OnEvent(e)
	}
}

// ---- settings -------------------------------------------------------------------------------------

// SetSettings changes auto-mount and noexec.
func (m *Manager) SetSettings(autoMount, noExec bool) error {
	err := m.Store.Update(func(s *Settings) { s.AutoMount, s.NoExec = autoMount, noExec })
	m.invalidate()
	m.stateMu.Lock()
	m.pending = true
	m.stateMu.Unlock()
	return err
}

// SetIgnored marks a volume as never-auto-mount (or clears that).
func (m *Manager) SetIgnored(ctx context.Context, path string, ignore bool) error {
	_, p, err := m.findPartition(ctx, path)
	if err != nil {
		return err
	}
	id := volumeID(p)
	if id == "" {
		return ErrNoSuchDevice
	}
	err = m.Store.Update(func(s *Settings) {
		var keep []string
		for _, x := range s.Ignored {
			if !strings.EqualFold(x, id) {
				keep = append(keep, x)
			}
		}
		if ignore {
			keep = append(keep, id)
		}
		s.Ignored = keep
	})
	m.invalidate()
	return err
}
