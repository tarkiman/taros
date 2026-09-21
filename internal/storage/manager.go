package storage

import (
	"context"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"
)

// Config is the static part of the configuration (config.yaml).
type Config struct {
	Enabled bool
	// MountBase: where drives are mounted, one directory each.
	MountBase string
	// OwnerUser: the user FAT/exFAT/NTFS files belong to ("" = the first ordinary user).
	OwnerUser string
	Umask     string
	Poll      time.Duration
	// ExtraExternal: block-device name prefixes to treat as external even though
	// they are not USB (e.g. "mmcblk" for an SD slot, or "loop" for testing).
	ExtraExternal []string
}

// Paths are the system files read; tests point them at fixtures.
type Paths struct {
	Fstab, MountInfo, SysBlock, Passwd, Proc, Dev string
}

// DefaultPaths are the real ones.
func DefaultPaths() Paths {
	return Paths{Fstab: "/etc/fstab", MountInfo: "/proc/self/mountinfo", SysBlock: "/sys/block", Passwd: "/etc/passwd", Proc: "/proc", Dev: "/dev"}
}

// Manager scans for external drives and mounts/unmounts them.
type Manager struct {
	mu    sync.Mutex // one mount/unmount/eject at a time
	Run   Runner
	Cfg   Config
	Store *Store
	Paths Paths
	GOOS  string

	IsRoot   func() bool
	LookPath func(string) (string, error)
	Now      func() time.Time
	Statfs   func(path string) (total, free uint64, err error)
	// UsedBy lists the shares/FTP folders that live inside a mount point.
	UsedBy func(mountpoint string) []string
	// OnEvent is told about plug/unplug/mount events (logging, notifications).
	OnEvent func(Event)

	stateMu   sync.Mutex
	failed    map[string]string // device path → last mount error (until it is unplugged)
	firstSeen map[string]time.Time
	lastFP    string
	pending   bool
	present   map[string]bool
	roNotes   map[string]string // device path → why TarOS mounted it read-only
	probes    map[string]probeResult
	// unmountedByUser: drives the user unmounted or ejected while they stay plugged in —
	// they are not mounted again by themselves until unplugged and replugged.
	unmountedByUser map[string]bool
	wasMounted      map[string]bool // last look: mounted (by anyone)
	// cache of the last snapshot, so a dashboard polling every few seconds does not
	// fork lsblk each time.
	cache   Status
	cacheAt time.Time
}

// Event describes something that happened to a drive.
type Event struct {
	Kind   string // "plugged", "unplugged", "mounted", "unmounted", "mount_failed", "ejected", "removed_unsafely"
	Device string
	Label  string
	Detail string
}

// New wires the real system in.
func New(cfg Config, store *Store) *Manager {
	return &Manager{
		Run: NewRunner(), Cfg: cfg, Store: store, Paths: DefaultPaths(),
		GOOS:     goos(),
		IsRoot:   func() bool { return os.Geteuid() == 0 },
		LookPath: lookPath,
		Now:      time.Now,
		Statfs:   statfs,
		failed:   map[string]string{}, firstSeen: map[string]time.Time{}, present: map[string]bool{}, roNotes: map[string]string{}, probes: map[string]probeResult{}, unmountedByUser: map[string]bool{}, wasMounted: map[string]bool{},
	}
}

// ---- classification ------------------------------------------------------------------

var supportedFS = map[string]bool{
	"vfat": true, "exfat": true, "ntfs": true, "ntfs3": true, "ext2": true, "ext3": true, "ext4": true,
	"xfs": true, "btrfs": true, "f2fs": true, "iso9660": true, "udf": true,
}

func unsupportedReason(fstype string) string {
	switch fstype {
	case "":
		return ReasonNoFilesystem
	case "crypto_LUKS", "BitLocker":
		return ReasonEncrypted
	case "LVM2_member":
		return ReasonLVM
	case "linux_raid_member":
		return ReasonRAID
	case "swap":
		return ReasonSwap
	}
	return ReasonUnknownFS
}

// systemDisk: the disk (or anything stacked on it) holds /, /boot or swap.
func systemDisk(d blockDev) bool {
	sys := false
	d.walk(func(n blockDev) {
		for _, mp := range n.Mountpoints {
			if mp == "/" || mp == "[SWAP]" || mp == "/boot" || strings.HasPrefix(mp, "/boot/") || mp == "/usr" || mp == "/var" {
				sys = true
			}
		}
	})
	return sys
}

func (m *Manager) external(d blockDev) bool {
	if d.Type != "disk" && d.Type != "rom" && d.Type != "loop" {
		return false
	}
	for _, p := range m.Cfg.ExtraExternal {
		if p != "" && strings.HasPrefix(d.Name, p) {
			return true
		}
	}
	if d.Type == "loop" {
		return false
	}
	return d.Tran == "usb" || d.RM
}

// tinyNoFS: MSR/BIOS-boot/EFI-less stubs that carry no filesystem are not worth listing.
func tinyNoFS(p blockDev) bool { return p.FSType == "" && p.Size < 128<<20 }

// ---- snapshot ------------------------------------------------------------------------

type mountRec struct{ point, source, fstype, opts string }

func (m *Manager) readMounts() []mountRec {
	b, err := os.ReadFile(m.Paths.MountInfo)
	if err != nil {
		return nil
	}
	var out []mountRec
	for _, line := range strings.Split(string(b), "\n") {
		parts := strings.SplitN(line, " - ", 2)
		if len(parts) != 2 {
			continue
		}
		left, right := strings.Fields(parts[0]), strings.Fields(parts[1])
		if len(left) < 6 || len(right) < 3 {
			continue
		}
		out = append(out, mountRec{point: unescapeMount(left[4]), source: right[1], fstype: right[0], opts: left[5] + "," + right[2]})
	}
	return out
}

// unescapeMount undoes mountinfo's octal escapes (\040 for a space).
func unescapeMount(s string) string {
	if !strings.Contains(s, `\`) {
		return s
	}
	var b strings.Builder
	for i := 0; i < len(s); i++ {
		if s[i] == '\\' && i+3 < len(s) {
			if n, err := strconv.ParseUint(s[i+1:i+4], 8, 8); err == nil {
				b.WriteByte(byte(n))
				i += 3
				continue
			}
		}
		b.WriteByte(s[i])
	}
	return b.String()
}

func optHas(opts, want string) bool {
	for _, o := range strings.Split(opts, ",") {
		if o == want {
			return true
		}
	}
	return false
}

func (m *Manager) lsblk(ctx context.Context) ([]blockDev, error) {
	out, err := m.Run.Run(ctx, m.tool("lsblk"), "-J", "-b", "-o", lsblkColumns)
	if err != nil {
		return nil, err
	}
	devs, err := parseLsblk(out)
	if err != nil {
		return nil, err
	}
	for i := range devs {
		if m.external(devs[i]) && !systemDisk(devs[i]) {
			m.probeMissing(ctx, &devs[i])
		}
	}
	return devs, nil
}

type probeResult struct {
	fstype, label, uuid string
	at                  time.Time
}

// unescapeBlkid undoes `blkid -o export`'s escaping: a label "WIN BACKUP" comes
// out as WIN\ BACKUP, and unusual bytes as \xNN.
func unescapeBlkid(s string) string {
	if !strings.Contains(s, `\`) {
		return s
	}
	var b strings.Builder
	for i := 0; i < len(s); i++ {
		if s[i] != '\\' || i+1 >= len(s) {
			b.WriteByte(s[i])
			continue
		}
		if s[i+1] == 'x' && i+3 < len(s) {
			if n, err := strconv.ParseUint(s[i+2:i+4], 16, 8); err == nil {
				b.WriteByte(byte(n))
				i += 3
				continue
			}
		}
		b.WriteByte(s[i+1])
		i++
	}
	return b.String()
}

// probeMissing asks blkid (a low-level probe of the device itself) about volumes
// lsblk could not identify. lsblk takes filesystem type, label and UUID from
// udev's database, which is empty on hosts without udev and for the first moments
// after a drive is plugged in; without this such a drive would look blank.
func (m *Manager) probeMissing(ctx context.Context, d *blockDev) {
	if _, err := m.LookPath("blkid"); err != nil {
		return
	}
	fill := func(n *blockDev) {
		if n.FSType != "" || n.Size < 1<<20 || n.Path == "" || (n.Type != "part" && n.Type != "disk" && n.Type != "loop" && n.Type != "rom") {
			return
		}
		if n.Type != "part" && len(n.Children) > 0 {
			return // a partitioned disk: its partitions are what carry filesystems
		}
		r, ok := m.probeCached(ctx, *n)
		if !ok {
			return
		}
		n.FSType, n.Label, n.UUID = r.fstype, r.label, r.uuid
	}
	if len(d.Children) == 0 {
		fill(d)
		return
	}
	for i := range d.Children {
		fill(&d.Children[i])
	}
}

func (m *Manager) probeCached(ctx context.Context, n blockDev) (probeResult, bool) {
	key := n.Path + "|" + strconv.FormatUint(n.Size, 10)
	m.stateMu.Lock()
	if r, ok := m.probes[key]; ok && m.Now().Sub(r.at) < 20*time.Second {
		m.stateMu.Unlock()
		return r, r.fstype != ""
	}
	m.stateMu.Unlock()
	out, err := m.Run.Run(ctx, m.tool("blkid"), "-p", "-o", "export", n.Path)
	r := probeResult{at: m.Now()}
	if err == nil {
		for _, line := range strings.Split(out, "\n") {
			k, v, ok := strings.Cut(strings.TrimSpace(line), "=")
			if !ok {
				continue
			}
			switch k {
			case "TYPE":
				r.fstype = v
			case "LABEL":
				r.label = unescapeBlkid(v)
			case "UUID":
				r.uuid = v
			}
		}
	}
	m.stateMu.Lock()
	m.probes[key] = r
	m.stateMu.Unlock()
	return r, r.fstype != ""
}

func (m *Manager) tool(name string) string {
	if p, err := m.LookPath(name); err == nil {
		return p
	}
	return name
}

// ownerIDs resolves the user drives' files belong to.
func (m *Manager) ownerIDs() (name string, uid, gid int) {
	data, _ := os.ReadFile(m.Paths.Passwd)
	type pw struct {
		name     string
		uid, gid int
		login    bool
	}
	var all []pw
	for _, line := range strings.Split(string(data), "\n") {
		f := strings.Split(line, ":")
		if len(f) < 7 {
			continue
		}
		u, e1 := strconv.Atoi(f[2])
		g, e2 := strconv.Atoi(f[3])
		if e1 != nil || e2 != nil {
			continue
		}
		all = append(all, pw{f[0], u, g, !strings.HasSuffix(f[6], "nologin") && !strings.HasSuffix(f[6], "/false") && f[6] != ""})
	}
	if m.Cfg.OwnerUser != "" {
		for _, p := range all {
			if p.name == m.Cfg.OwnerUser {
				return p.name, p.uid, p.gid
			}
		}
	}
	best := -1
	for i, p := range all {
		if p.uid >= 1000 && p.uid < 65534 && p.login && (best < 0 || p.uid < all[best].uid) {
			best = i
		}
	}
	if best >= 0 {
		return all[best].name, all[best].uid, all[best].gid
	}
	return "root", 0, 0
}

// Status describes every external drive, and whether TarOS may mount them.
func (m *Manager) Status(ctx context.Context) Status {
	m.stateMu.Lock()
	if !m.cacheAt.IsZero() && m.Now().Sub(m.cacheAt) < 1500*time.Millisecond {
		s := m.cache
		m.stateMu.Unlock()
		return s
	}
	m.stateMu.Unlock()
	s := m.snapshot(ctx)
	m.stateMu.Lock()
	m.cache, m.cacheAt = s, m.Now()
	m.stateMu.Unlock()
	return s
}

func (m *Manager) invalidate() {
	m.stateMu.Lock()
	m.cacheAt = time.Time{}
	m.stateMu.Unlock()
}

func (m *Manager) canMount() (bool, string) {
	switch {
	case !m.Cfg.Enabled:
		return false, ReasonDisabled
	case !m.IsRoot():
		return false, ReasonNotRoot
	}
	for _, t := range []string{"lsblk", "mount", "umount"} {
		if _, err := m.LookPath(t); err != nil {
			if t == "lsblk" {
				return false, ReasonNoLsblk
			}
			return false, ReasonNoMount
		}
	}
	return true, ""
}

func (m *Manager) snapshot(ctx context.Context) Status {
	owner, _, _ := m.ownerIDs()
	st := Status{Supported: m.GOOS == "linux", Settings: m.Store.Get(), MountBase: m.Cfg.MountBase, Owner: owner, Disks: []Disk{}}
	if !st.Supported {
		st.Reason = ReasonNotLinux
		return st
	}
	st.CanMount, st.Blocked = m.canMount()
	if _, err := m.LookPath("lsblk"); err != nil {
		st.Reason = ReasonNoLsblk
		return st
	}
	devs, err := m.lsblk(ctx)
	if err != nil {
		st.Reason = ReasonNoLsblk
		return st
	}
	st.Disks = m.disksFrom(devs)
	return st
}

// disksFrom turns lsblk's tree into the external drives TarOS knows how to show.
func (m *Manager) disksFrom(devs []blockDev) []Disk {
	fstab := readFstab(m.Paths.Fstab)
	mounts := m.readMounts()
	settings := m.Store.Get()
	disks := []Disk{}
	for _, d := range devs {
		if !m.external(d) || systemDisk(d) {
			continue
		}
		disk := Disk{Name: d.Name, Path: d.Path, Model: d.Model, Vendor: d.Vendor, Size: d.Size, Bus: d.Tran, Removable: d.RM, Ejectable: true, Partitions: []Partition{}}
		var parts []blockDev
		for _, c := range d.Children {
			if c.Type == "part" {
				parts = append(parts, c)
			}
		}
		if len(parts) == 0 && d.FSType != "" {
			parts = []blockDev{d} // a filesystem straight on the disk
		}
		for _, p := range parts {
			if tinyNoFS(p) {
				continue
			}
			part := m.partitionState(d, p, fstab, mounts, settings)
			if part.ManagedBy == "fstab" {
				disk.Ejectable = false
			}
			disk.Partitions = append(disk.Partitions, part)
		}
		if len(disk.Partitions) == 0 {
			continue
		}
		disks = append(disks, disk)
	}
	sort.Slice(disks, func(i, j int) bool { return disks[i].Name < disks[j].Name })
	return disks
}

func (m *Manager) partitionState(d, p blockDev, fstab []fstabEntry, mounts []mountRec, settings Settings) Partition {
	part := Partition{Name: p.Name, Path: p.Path, FSType: p.FSType, Label: p.Label, UUID: p.UUID, Size: p.Size, UsedBy: []string{}}
	if part.UUID == "" {
		part.UUID = p.PartUUID
	}
	for _, mp := range p.Mountpoints {
		if mp != "[SWAP]" {
			part.MountPoint = mp
			break
		}
	}
	inFstab := false
	for _, e := range fstab {
		if e.matches(p) {
			inFstab = true
		}
	}
	switch {
	case part.MountPoint != "":
		ro := false
		for _, r := range mounts {
			if r.point == part.MountPoint && (r.source == p.Path || strings.HasPrefix(r.source, "/dev/")) {
				ro = optHas(r.opts, "ro")
			}
		}
		part.State = StateMounted
		if ro {
			part.State = StateMountedRO
			part.Reason = m.roReason(p)
		}
		switch {
		case inFstab:
			part.ManagedBy = "fstab"
		case m.underBase(part.MountPoint):
			part.ManagedBy = "taros"
		default:
			part.ManagedBy = "other"
		}
		if total, free, err := m.Statfs(part.MountPoint); err == nil {
			part.TotalBytes, part.FreeBytes = total, free
			part.UsedBytes = total - free
		}
		if m.UsedBy != nil {
			if u := m.UsedBy(part.MountPoint); u != nil {
				part.UsedBy = u
			}
		}
	case inFstab:
		part.State, part.ManagedBy = StateFstab, "fstab"
	case !supportedFS[p.FSType]:
		part.State, part.Reason = StateUnsupported, unsupportedReason(p.FSType)
	case settings.isIgnored(volumeID(part)):
		part.State = StateIgnored
	default:
		part.State = StateUnmounted
	}
	m.stateMu.Lock()
	if msg, bad := m.failed[p.Path]; bad && part.State == StateUnmounted {
		part.State, part.Error = StateFailed, msg
	}
	m.stateMu.Unlock()
	return part
}

// roReason: why a mounted volume is read-only — the device itself, or TarOS fell
// back to read-only (remembered in failed/ro notes).
func (m *Manager) roReason(p blockDev) string {
	if p.RO {
		return ReasonDeviceRO
	}
	m.stateMu.Lock()
	defer m.stateMu.Unlock()
	return m.roNotes[p.Path]
}

func (m *Manager) underBase(mp string) bool {
	base := filepath.Clean(m.Cfg.MountBase)
	return mp == base || strings.HasPrefix(mp, base+"/")
}

// volumeID identifies a volume across plugs: its UUID (or partition UUID).
func volumeID(p Partition) string { return strings.ToLower(p.UUID) }

var reBadName = regexp.MustCompile(`[^A-Za-z0-9._-]+`)

// sanitizeName makes a label safe as a directory name.
func sanitizeName(s string) string {
	s = strings.TrimSpace(s)
	s = reBadName.ReplaceAllString(s, "_")
	s = strings.Trim(s, "._-")
	if len(s) > 32 {
		s = strings.Trim(s[:32], "._-")
	}
	return s
}
