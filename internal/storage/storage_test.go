package storage

import (
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"sync"
	"testing"
	"time"
)

// ---- a fake machine: block devices, mounts, and the commands that change them -------

type fpart struct {
	name, fstype, label, uuid string
	size                      uint64
	ro                        bool
}

type fdisk struct {
	name, tran, model string
	rm                bool
	size              uint64
	parts             []fpart
	whole             *fpart // a filesystem straight on the disk
}

type world struct {
	t   *testing.T
	dir string

	mu         sync.Mutex
	disks      []fdisk
	mounts     map[string]string // device path → mount point
	mountFS    map[string]string // device path → fstype it was mounted as
	mountOpts  map[string]string
	calls      []string
	lsblkCalls int
	failRW     map[string]string // device → error the read/write mount gives
	failRO     map[string]string
	busy       map[string]bool // mount point → umount says busy
	tools      map[string]bool
	blkid      map[string]string // device → `blkid -p -o export` output
	blkidCalls []string
	warn       map[string]string // device → what a *successful* mount prints on stderr
	blank      bool              // lsblk reports no filesystem info at all (no udev database)
	sysDisk    string            // name of a USB disk that holds "/" (a Pi booting from USB)
	m          *Manager
	clock      time.Time
}

func newWorld(t *testing.T) *world {
	t.Helper()
	w := &world{t: t, dir: t.TempDir(), mounts: map[string]string{}, mountFS: map[string]string{}, mountOpts: map[string]string{},
		failRW: map[string]string{}, failRO: map[string]string{}, busy: map[string]bool{},
		tools: map[string]bool{"lsblk": true, "mount": true, "umount": true, "sync": true, "ntfs-3g": true, "blkid": true}, blkid: map[string]string{}, warn: map[string]string{}, clock: time.Date(2026, 9, 22, 12, 0, 0, 0, time.UTC)}
	for _, d := range []string{"sys/block", "proc", "media"} {
		os.MkdirAll(filepath.Join(w.dir, d), 0o755)
	}
	os.WriteFile(filepath.Join(w.dir, "passwd"), []byte("root:x:0:0:root:/root:/bin/bash\ntarkiman:x:1000:1000::/home/tarkiman:/bin/bash\nnobody:x:65534:65534::/nonexistent:/usr/sbin/nologin\n"), 0o644)
	os.WriteFile(filepath.Join(w.dir, "fstab"), []byte(""), 0o644)
	m := New(Config{Enabled: true, MountBase: filepath.Join(w.dir, "media"), Umask: "002"}, NewStore(filepath.Join(w.dir, "storage.yaml")))
	m.Run = w
	m.GOOS = "linux"
	m.IsRoot = func() bool { return true }
	m.LookPath = func(n string) (string, error) {
		w.mu.Lock()
		defer w.mu.Unlock()
		if w.tools[n] {
			return "/usr/bin/" + n, nil
		}
		return "", errors.New("not found")
	}
	m.Now = func() time.Time { w.clock = w.clock.Add(5 * time.Second); return w.clock }
	m.Statfs = func(string) (uint64, uint64, error) { return 1000, 400, nil }
	m.Paths = Paths{Fstab: filepath.Join(w.dir, "fstab"), MountInfo: filepath.Join(w.dir, "mountinfo"), SysBlock: filepath.Join(w.dir, "sys/block"),
		Passwd: filepath.Join(w.dir, "passwd"), Proc: filepath.Join(w.dir, "proc"), Dev: filepath.Join(w.dir, "dev")}
	w.m = m
	w.sync()
	return w
}

func (w *world) fstab(s string) { os.WriteFile(filepath.Join(w.dir, "fstab"), []byte(s), 0o644) }

// plug adds a drive.
func (w *world) plug(d fdisk) {
	w.mu.Lock()
	w.disks = append(w.disks, d)
	w.mu.Unlock()
	w.sync()
}

// unplug removes a drive; its mounts linger (as after pulling the cable) unless clean.
func (w *world) unplug(name string, clean bool) {
	w.mu.Lock()
	var keep []fdisk
	for _, d := range w.disks {
		if d.name != name {
			keep = append(keep, d)
		} else if clean {
			for _, p := range d.allParts() {
				delete(w.mounts, "/dev/"+p.name)
			}
		}
	}
	w.disks = keep
	w.mu.Unlock()
	w.sync()
}

func (d fdisk) allParts() []fpart {
	if d.whole != nil {
		return []fpart{*d.whole}
	}
	return d.parts
}

// sync mirrors the world into /sys/block and mountinfo.
func (w *world) sync() {
	w.mu.Lock()
	defer w.mu.Unlock()
	sb := filepath.Join(w.dir, "sys/block")
	os.RemoveAll(sb)
	os.MkdirAll(filepath.Join(sb, "nvme0n1", "nvme0n1p2"), 0o755)
	for _, d := range w.disks {
		os.MkdirAll(filepath.Join(sb, d.name, "device"), 0o755)
		os.WriteFile(filepath.Join(sb, d.name, "device", "delete"), nil, 0o644)
		os.WriteFile(filepath.Join(sb, d.name, "size"), []byte(fmt.Sprint(d.size/512)+"\n"), 0o644)
		for _, p := range d.parts {
			os.MkdirAll(filepath.Join(sb, d.name, p.name), 0o755)
		}
	}
	var lines []string
	devs := make([]string, 0, len(w.mounts))
	for dev := range w.mounts {
		devs = append(devs, dev)
	}
	sort.Strings(devs)
	for _, dev := range devs {
		ro := "rw"
		if strings.Contains(w.mountOpts[dev], "ro") && optHas(w.mountOpts[dev], "ro") {
			ro = "ro"
		}
		lines = append(lines, fmt.Sprintf("36 35 8:1 / %s %s,nosuid - %s %s rw", strings.ReplaceAll(w.mounts[dev], " ", `\040`), ro, w.mountFS[dev], dev))
	}
	os.WriteFile(filepath.Join(w.dir, "mountinfo"), []byte(strings.Join(lines, "\n")+"\n"), 0o644)
}

func (w *world) node(name, typ, fstype, label, uuid string, size uint64, ro, rm bool, tran, model, pk string, children []map[string]any) map[string]any {
	mps := []string{}
	if mp, ok := w.mounts["/dev/"+name]; ok {
		mps = []string{mp}
	}
	n := map[string]any{"name": name, "path": "/dev/" + name, "type": typ, "fstype": nilIf(fstype), "label": nilIf(label), "uuid": nilIf(uuid), "partuuid": nil,
		"size": size, "ro": ro, "rm": rm, "hotplug": false, "tran": nilIf(tran), "model": nilIf(model), "vendor": nil, "pkname": nilIf(pk), "mountpoints": mps, "parttypename": nil}
	if len(children) > 0 {
		n["children"] = children
	}
	return n
}

func nilIf(s string) any {
	if s == "" {
		return nil
	}
	return s
}

func (w *world) lsblkJSON() string {

	var top []map[string]any
	sysKids := []map[string]any{
		w.node("nvme0n1p1", "part", "vfat", "bootfs", "AAAA-0001", 512<<20, false, false, "", "", "nvme0n1", nil),
		w.node("nvme0n1p2", "part", "ext4", "rootfs", "bbbb-0002", 200<<30, false, false, "", "", "nvme0n1", nil),
	}
	sysKids[0]["mountpoints"] = []string{"/boot/firmware"}
	sysKids[1]["mountpoints"] = []string{"/"}
	top = append(top, w.node("nvme0n1", "disk", "", "", "", 256<<30, false, false, "nvme", "EXAMPLE NVME", "", sysKids))
	top = append(top, w.node("zram0", "disk", "swap", "zram0", "", 2<<30, false, false, "", "", "", nil))
	for _, d := range w.disks {
		var kids []map[string]any
		for _, p := range d.parts {
			kids = append(kids, w.node(p.name, "part", p.fstype, p.label, p.uuid, p.size, p.ro, false, "", "", d.name, nil))
		}
		if w.sysDisk == d.name && len(kids) > 0 {
			kids[len(kids)-1]["mountpoints"] = []string{"/"}
		}
		fs, label, uuid := "", "", ""
		if d.whole != nil {
			fs, label, uuid = d.whole.fstype, d.whole.label, d.whole.uuid
		}
		n := w.node(d.name, "disk", fs, label, uuid, d.size, false, d.rm, d.tran, d.model, "", kids)
		if d.whole != nil {
			n["mountpoints"] = []string{}
			if mp, ok := w.mounts["/dev/"+d.name]; ok {
				n["mountpoints"] = []string{mp}
			}
		}
		top = append(top, n)
	}
	if w.blank { // no udev database: filesystem info is missing from disks and partitions alike
		var strip func(n map[string]any)
		strip = func(n map[string]any) {
			if n["path"] != "/dev/zram0" {
				if p, _ := n["path"].(string); !strings.HasPrefix(p, "/dev/nvme") {
					n["fstype"], n["label"], n["uuid"] = nil, nil, nil
				}
			}
			if kids, ok := n["children"].([]map[string]any); ok {
				for _, k := range kids {
					strip(k)
				}
			}
		}
		for _, n := range top {
			strip(n)
		}
	}
	b, _ := json.Marshal(map[string]any{"blockdevices": top})
	return string(b)
}

func (w *world) Run(_ context.Context, name string, args ...string) (string, error) {
	w.mu.Lock()
	base := filepath.Base(name)
	w.calls = append(w.calls, strings.TrimSpace(base+" "+strings.Join(args, " ")))
	switch base {
	case "lsblk":
		w.lsblkCalls++
		out := w.lsblkJSON()
		w.mu.Unlock()
		return out, nil
	case "sync":
		w.mu.Unlock()
		return "", nil
	case "blkid":
		dev := args[len(args)-1]
		w.blkidCalls = append(w.blkidCalls, dev)
		out, ok := w.blkid[dev]
		w.mu.Unlock()
		if !ok {
			return "", &CmdError{Stderr: "", Err: errors.New("exit status 2")}
		}
		return out, nil
	case "mount":
		var fstype, opts, dev, mp string
		for i := 0; i < len(args); i++ {
			switch args[i] {
			case "-t":
				fstype = args[i+1]
				i++
			case "-o":
				opts = args[i+1]
				i++
			default:
				if dev == "" {
					dev = args[i]
				} else {
					mp = args[i]
				}
			}
		}
		fail := w.failRW
		if optHas(opts, "ro") {
			fail = w.failRO
		}
		if msg, bad := fail[dev]; bad {
			w.mu.Unlock()
			return "", &CmdError{Stderr: msg, Err: errors.New("exit status 32")}
		}
		if fi, err := os.Stat(mp); err != nil || !fi.IsDir() {
			w.mu.Unlock()
			return "", &CmdError{Stderr: "mount: mount point does not exist", Err: errors.New("exit status 32")}
		}
		w.mounts[dev], w.mountFS[dev], w.mountOpts[dev] = mp, fstype, opts
		w.mu.Unlock()
		w.sync()
		return "", nil
	case "umount":
		lazy := len(args) > 0 && args[0] == "-l"
		mp := args[len(args)-1]
		dev := ""
		for d, m := range w.mounts {
			if m == mp {
				dev = d
			}
		}
		if dev == "" {
			w.mu.Unlock()
			return "", &CmdError{Stderr: "umount: " + mp + ": not mounted.", Err: errors.New("exit status 32")}
		}
		if w.busy[mp] && !lazy {
			w.mu.Unlock()
			return "", &CmdError{Stderr: "umount: " + mp + ": target is busy.", Err: errors.New("exit status 32")}
		}
		delete(w.mounts, dev)
		w.mu.Unlock()
		w.sync()
		return "", nil
	}
	w.mu.Unlock()
	return "", &CmdError{Stderr: "unexpected command " + base, Err: errors.New("exit 127")}
}

// RunCombined lets a test script a warning printed by a mount that still succeeds.
func (w *world) RunCombined(ctx context.Context, name string, args ...string) (string, error) {
	out, err := w.Run(ctx, name, args...)
	if err != nil {
		return out, err
	}
	w.mu.Lock()
	defer w.mu.Unlock()
	if filepath.Base(name) == "mount" {
		for dev, warn := range w.warn {
			for _, a := range args {
				if a == dev {
					return out + warn, nil
				}
			}
		}
	}
	return out, nil
}

func (w *world) called(prefix string) []string {
	w.mu.Lock()
	defer w.mu.Unlock()
	var out []string
	for _, c := range w.calls {
		if strings.HasPrefix(c, prefix) {
			out = append(out, c)
		}
	}
	return out
}

func (w *world) part(dev string) Partition {
	w.t.Helper()
	w.m.invalidate()
	for _, d := range w.m.Status(context.Background()).Disks {
		for _, p := range d.Partitions {
			if p.Path == dev {
				return p
			}
		}
	}
	w.t.Fatalf("%s is not listed", dev)
	return Partition{}
}

func (w *world) listed(dev string) bool {
	w.m.invalidate()
	for _, d := range w.m.Status(context.Background()).Disks {
		for _, p := range d.Partitions {
			if p.Path == dev {
				return true
			}
		}
	}
	return false
}

func flash() fdisk {
	return fdisk{name: "sdb", tran: "usb", rm: true, model: "Flash", size: 16 << 30,
		parts: []fpart{{name: "sdb1", fstype: "vfat", label: "MY USB", uuid: "ABCD-1234", size: 16 << 30}}}
}

func hdd() fdisk {
	return fdisk{name: "sdc", tran: "usb", model: "Portable HDD", size: 2 << 40,
		parts: []fpart{{name: "sdc1", fstype: "exfat", label: "Backup", uuid: "1111-2222", size: 2 << 40}}}
}

// ticks runs the watcher twice: a drive is only touched on the second look.
func (w *world) ticks(n int) {
	for i := 0; i < n; i++ {
		w.m.tick(context.Background())
	}
}

// ---- real lsblk / fstab data -----------------------------------------------------------------

func TestParseRealLsblkAndClassify(t *testing.T) {
	data, err := os.ReadFile("testdata/lsblk-pi.json")
	if err != nil {
		t.Fatal(err)
	}
	devs, err := parseLsblk(string(data))
	if err != nil {
		t.Fatal(err)
	}
	w := newWorld(t)
	disks := w.m.disksFrom(devs)
	if len(disks) != 1 || disks[0].Name != "sda" || disks[0].Bus != "usb" {
		t.Fatalf("only the USB disk is external: %+v", disks)
	}
	if disks[0].Removable {
		t.Error("the kernel says this USB hard disk is not 'removable' — the bus is what makes it external")
	}
	if len(disks[0].Partitions) != 1 || disks[0].Partitions[0].Name != "sda2" {
		t.Errorf("the 16 MB reserved stub without a filesystem must not be listed: %+v", disks[0].Partitions)
	}
	p := disks[0].Partitions[0]
	if p.FSType != "ntfs" || p.Label != "PHOTOS_BACKUP" || p.MountPoint != "/mnt/backup" || p.State != StateMounted || p.ManagedBy != "other" {
		t.Errorf("%+v", p)
	}
	// With the drive in /etc/fstab, TarOS keeps its hands off.
	fs, _ := os.ReadFile("testdata/fstab-pi.txt")
	w.fstab(string(fs))
	disks = w.m.disksFrom(devs)
	p = disks[0].Partitions[0]
	if p.ManagedBy != "fstab" || disks[0].Ejectable {
		t.Errorf("fstab-managed drive: %+v ejectable=%v", p, disks[0].Ejectable)
	}
}

func TestParseLsblkOldAndOddFormats(t *testing.T) {
	// util-linux < 2.33: numbers and booleans as strings, one mountpoint.
	devs, err := parseLsblk(`{"blockdevices":[{"name":"sdb","type":"disk","size":"1000","ro":"0","rm":"1","tran":"usb","children":[{"name":"sdb1","type":"part","fstype":"vfat","size":"999","mountpoint":"/mnt/x"}]}]}`)
	if err != nil {
		t.Fatal(err)
	}
	if !devs[0].RM || devs[0].Size != 1000 || devs[0].Path != "/dev/sdb" || devs[0].Children[0].Mountpoints[0] != "/mnt/x" {
		t.Errorf("%+v", devs[0])
	}
	if _, err := parseLsblk("not json"); err == nil {
		t.Error("garbage must be an error")
	}
}

func TestUnescapeBlkid(t *testing.T) {
	for in, want := range map[string]string{`WIN\ BACKUP`: "WIN BACKUP", `plain`: "plain", `a\x20b`: "a b", `caf\xc3\xa9`: "café", `end\`: `end\`, `a\\b`: `a\b`} {
		if got := unescapeBlkid(in); got != want {
			t.Errorf("%q → %q, want %q", in, got, want)
		}
	}
}

func TestUnescapeMount(t *testing.T) {
	if got := unescapeMount(`/media/My\040Disk`); got != "/media/My Disk" {
		t.Errorf("got %q", got)
	}
	if got := unescapeMount(`/plain`); got != "/plain" {
		t.Errorf("got %q", got)
	}
}

func TestFstabMatching(t *testing.T) {
	p := blockDev{Path: "/dev/sdb1", UUID: "ABCD-1234", Label: "MY USB", PartUUID: "1234abcd-01", Mountpoints: []string{"/mnt/usb"}}
	for _, line := range []string{
		"UUID=abcd-1234 /x vfat defaults 0 0",
		`UUID="ABCD-1234" /x vfat defaults 0 0`,
		`LABEL=MY\040USB /x vfat defaults 0 0`,
		"PARTUUID=1234ABCD-01 /x vfat defaults 0 0",
		"/dev/disk/by-uuid/ABCD-1234 /x vfat defaults 0 0",
		"/dev/disk/by-partuuid/1234abcd-01 /x vfat defaults 0 0",
		"/dev/sdb1 /x vfat defaults 0 0",
		"whatever /mnt/usb vfat defaults 0 0",
	} {
		e := parseFstab(line)
		if len(e) != 1 || !e[0].matches(p) {
			t.Errorf("%q should match", line)
		}
	}
	for _, line := range []string{"UUID=0000-0000 /x vfat defaults 0 0", "/dev/sdc1 /x vfat defaults 0 0", "//nas/share /mnt/smb cifs defaults 0 0", "/dev/disk/by-uuid/ZZZZ /x vfat 0 0"} {
		if e := parseFstab(line); len(e) == 1 && e[0].matches(p) {
			t.Errorf("%q must not match", line)
		}
	}
	if len(parseFstab("# comment\n\n  \nproc /proc proc defaults 0 0\n")) != 1 {
		t.Error("comments and blanks are skipped")
	}
}

// ---- which disks are external ------------------------------------------------------------------

func TestOnlyExternalDisksAreListed(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.plug(fdisk{name: "sdz", tran: "sata", model: "Internal SATA", size: 1 << 40, parts: []fpart{{name: "sdz1", fstype: "ext4", uuid: "u-int", size: 1 << 40}}})
	if !w.listed("/dev/sdb1") {
		t.Error("a USB flash drive is external")
	}
	for _, dev := range []string{"/dev/sdz1", "/dev/nvme0n1p2", "/dev/nvme0n1p1", "/dev/zram0"} {
		if w.listed(dev) {
			t.Errorf("%s is internal and must never be listed", dev)
		}
	}
	// a hard disk that reports removable=0 but sits on the USB bus
	w.plug(hdd())
	if !w.listed("/dev/sdc1") {
		t.Error("a USB hard disk is external even though the kernel says removable=0")
	}
}

func TestADiskHoldingRootIsNeverExternal(t *testing.T) {
	// A Pi booting from a USB SSD: that disk is USB, but it is THE system disk.
	w := newWorld(t)
	w.plug(fdisk{name: "sdb", tran: "usb", model: "Boot SSD", size: 256 << 30, parts: []fpart{
		{name: "sdb1", fstype: "vfat", label: "bootfs", uuid: "AAAA-0002", size: 512 << 20},
		{name: "sdb2", fstype: "ext4", label: "rootfs", uuid: "cccc-0003", size: 255 << 30}}})
	w.sysDisk = "sdb"
	if w.listed("/dev/sdb1") || w.listed("/dev/sdb2") {
		t.Error("the disk that holds / must never be offered for mounting or ejecting")
	}
	w.ticks(3)
	if len(w.called("mount")) != 0 || len(w.called("umount")) != 0 {
		t.Errorf("nothing may be touched: %v", w.calls)
	}
	if err := w.m.Eject(context.Background(), "/dev/sdb"); !errors.Is(err, ErrNoSuchDevice) {
		t.Errorf("eject the system disk: %v", err)
	}
}

func TestExtraExternalPrefixes(t *testing.T) {
	w := newWorld(t)
	w.plug(fdisk{name: "loop7", tran: "", size: 1 << 30, whole: &fpart{name: "loop7", fstype: "ext4", label: "img", uuid: "u-loop", size: 1 << 30}})
	if w.listed("/dev/loop7") {
		t.Fatal("loop devices are not external by default")
	}
	w.m.Cfg.ExtraExternal = []string{"loop"}
	if !w.listed("/dev/loop7") {
		t.Fatal("configured prefix must make it external")
	}
}

// ---- auto-mount -----------------------------------------------------------------------------------

func TestAutoMountWaitsOneLookThenMounts(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.ticks(1)
	if len(w.called("mount")) != 0 {
		t.Fatal("a drive is not touched the first time it is seen (udev is still learning it)")
	}
	w.ticks(1)
	calls := w.called("mount")
	if len(calls) != 1 {
		t.Fatalf("expected one mount: %v", w.calls)
	}
	want := "mount -t vfat -o nosuid,nodev,noatime,noexec,uid=1000,gid=1000,umask=002,iocharset=utf8,flush /dev/sdb1 " + filepath.Join(w.dir, "media", "MY_USB")
	if calls[0] != want {
		t.Errorf("\n got %s\nwant %s", calls[0], want)
	}
	p := w.part("/dev/sdb1")
	if p.State != StateMounted || p.ManagedBy != "taros" || p.MountPoint != filepath.Join(w.dir, "media", "MY_USB") || p.TotalBytes != 1000 || p.UsedBytes != 600 {
		t.Errorf("%+v", p)
	}
	w.ticks(3)
	if len(w.called("mount")) != 1 {
		t.Error("an already mounted drive must not be mounted again")
	}
}

func TestVolumesLsblkCannotIdentifyAreProbedWithBlkid(t *testing.T) {
	// No udev database (a minimal host, or a drive plugged a moment ago): lsblk shows
	// blank volumes, blkid reads the truth from the device.
	w := newWorld(t)
	w.m.Now = func() time.Time { return w.clock } // a still clock: the cache would otherwise "expire" between calls
	w.blank = true
	w.plug(flash())
	w.plug(fdisk{name: "sdc", tran: "usb", model: "Stub", size: 1 << 30, parts: []fpart{{name: "sdc1", size: 512 << 10}, {name: "sdc2", size: 1 << 29}}})
	w.blkid["/dev/sdb1"] = "DEVNAME=/dev/sdb1\nLABEL=MY\\ USB\nUUID=ABCD-1234\nTYPE=vfat\n" // as `blkid -o export` escapes the space
	w.blkid["/dev/sdz9"] = "TYPE=ext4\n"                                                    // an internal disk: must never even be probed
	p := w.part("/dev/sdb1")
	if p.FSType != "vfat" || p.Label != "MY USB" || p.UUID != "ABCD-1234" || p.State != StateUnmounted {
		t.Fatalf("probed volume: %+v", p)
	}
	if w.part("/dev/sdc2").State != StateUnsupported {
		t.Error("a volume blkid finds nothing on is 'no filesystem'")
	}
	// repeated status calls do not fork blkid again and again
	n := len(w.blkidCalls)
	for i := 0; i < 5; i++ {
		w.part("/dev/sdb1")
	}
	if len(w.blkidCalls) != n {
		t.Errorf("the answer is cached: %d → %d calls", n, len(w.blkidCalls))
	}
	for _, c := range w.blkidCalls {
		if c == "/dev/sdc1" || strings.HasPrefix(c, "/dev/nvme") || c == "/dev/zram0" {
			t.Errorf("must not probe %s", c)
		}
	}
	// and it mounts, with the identity blkid found
	w.ticks(3)
	if w.part("/dev/sdb1").State != StateMounted || !strings.HasSuffix(w.part("/dev/sdb1").MountPoint, "MY_USB") {
		t.Errorf("%+v", w.part("/dev/sdb1"))
	}
	// no blkid installed: no crash, the volume just stays unidentified
	w2 := newWorld(t)
	w2.blank = true
	w2.tools["blkid"] = false
	w2.plug(flash())
	if p := w2.part("/dev/sdb1"); p.State != StateUnsupported {
		t.Errorf("%+v", p)
	}
}

func TestMediaChangeWithoutANewDeviceNodeIsNoticed(t *testing.T) {
	// A card reader (or a loop device): the disk node is always there, only its size changes.
	w := newWorld(t)
	w.plug(fdisk{name: "sdb", tran: "usb", rm: true, model: "Card reader", size: 0})
	w.ticks(2)
	before := w.lsblkCalls
	w.mu.Lock()
	w.disks[0] = fdisk{name: "sdb", tran: "usb", rm: true, model: "Card reader", size: 8 << 30, parts: []fpart{{name: "sdb1", fstype: "vfat", label: "CARD", uuid: "C-1", size: 8 << 30}}}
	w.mu.Unlock()
	w.sync()
	// sync() adds the partition directory too; remove it to model "size only"
	os.RemoveAll(filepath.Join(w.dir, "sys/block/sdb/sdb1"))
	w.ticks(3)
	if w.lsblkCalls == before {
		t.Fatal("a card inserted into an existing reader must be noticed")
	}
	if w.part("/dev/sdb1").State != StateMounted {
		t.Errorf("%+v", w.part("/dev/sdb1"))
	}
}

func TestIdleMachineForksNothing(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.ticks(3)
	if len(w.blkidCalls) != 0 {
		t.Errorf("lsblk already identified everything: blkid must not be run (%v)", w.blkidCalls)
	}
	before := w.lsblkCalls
	w.ticks(10)
	if w.lsblkCalls != before {
		t.Errorf("nothing changed, so lsblk must not run: %d → %d", before, w.lsblkCalls)
	}
}

func TestAutoMountOffIgnoredAndManual(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	if err := w.m.SetSettings(false, true); err != nil {
		t.Fatal(err)
	}
	w.ticks(3)
	if len(w.called("mount")) != 0 || w.part("/dev/sdb1").State != StateUnmounted {
		t.Fatalf("auto-mount is off: %v", w.calls)
	}
	// manual mount still works
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); err != nil {
		t.Fatal(err)
	}
	if err := w.m.Unmount(context.Background(), "/dev/sdb1"); err != nil {
		t.Fatal(err)
	}
	// on again, but this particular drive is never auto-mounted
	w.m.SetSettings(true, true)
	if err := w.m.SetIgnored(context.Background(), "/dev/sdb1", true); err != nil {
		t.Fatal(err)
	}
	n := len(w.called("mount"))
	w.ticks(3)
	if len(w.called("mount")) != n {
		t.Error("an ignored drive is not auto-mounted")
	}
	if w.part("/dev/sdb1").State != StateIgnored {
		t.Errorf("state = %s", w.part("/dev/sdb1").State)
	}
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); err != nil {
		t.Errorf("but the user can still mount it by hand: %v", err)
	}
	if err := w.m.SetIgnored(context.Background(), "/dev/sdb1", false); err != nil {
		t.Fatal(err)
	}
	if got := w.m.Store.Get().Ignored; len(got) != 0 {
		t.Errorf("ignored list = %v", got)
	}
}

func TestNoExecIsASettingAndOwnerFollowsPasswd(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.m.SetSettings(true, false)
	w.ticks(2)
	if c := w.called("mount"); len(c) != 1 || strings.Contains(c[0], "noexec") || !strings.Contains(c[0], "nosuid,nodev") {
		t.Errorf("noexec off must drop only noexec: %v", c)
	}
	if st := w.m.Status(context.Background()); st.Owner != "tarkiman" {
		t.Errorf("owner = %q", st.Owner)
	}
	w.m.Cfg.OwnerUser = "root"
	if _, uid, _ := w.m.ownerIDs(); uid != 0 {
		t.Error("configured owner wins")
	}
	w.m.Cfg.OwnerUser = "nosuchuser"
	if n, uid, _ := w.m.ownerIDs(); n != "tarkiman" || uid != 1000 {
		t.Errorf("unknown configured user falls back: %s %d", n, uid)
	}
}

func TestMountOptionsPerFilesystem(t *testing.T) {
	m := newWorld(t).m
	set := DefaultSettings()
	cases := []struct {
		fs, wantType, contains, absent string
	}{
		{"exfat", "exfat", "uid=1000,gid=1000,umask=002", "iocharset"},
		{"ntfs", "ntfs-3g", "windows_names", ""},
		{"ext4", "ext4", "noexec", "uid="},
		{"btrfs", "btrfs", "nosuid", "uid="},
		{"xfs", "xfs", "nodev", "umask"},
		{"iso9660", "iso9660", "ro", ""},
	}
	for _, c := range cases {
		typ, opts := m.mountSpec(Partition{FSType: c.fs}, set, false)
		joined := strings.Join(opts, ",")
		if typ != c.wantType || !strings.Contains(joined, c.contains) || (c.absent != "" && strings.Contains(joined, c.absent)) {
			t.Errorf("%s → %s %s", c.fs, typ, joined)
		}
	}
	// no ntfs-3g installed: the kernel driver
	w := newWorld(t)
	w.tools["ntfs-3g"] = false
	if typ, _ := w.m.mountSpec(Partition{FSType: "ntfs"}, set, false); typ != "ntfs3" {
		t.Errorf("fallback = %s", typ)
	}
	if _, opts := m.mountSpec(Partition{FSType: "ext4"}, set, true); opts[len(opts)-1] != "ro" {
		t.Error("read-only variant")
	}
}

// ---- names ------------------------------------------------------------------------------------------

func TestMountNamesAreSafeStableAndUnique(t *testing.T) {
	w := newWorld(t)
	dir := func(label, uuid string) string {
		d, err := w.m.mountDir(Partition{Label: label, UUID: uuid, Name: "sdx1"})
		if err != nil {
			t.Fatal(err)
		}
		return filepath.Base(d)
	}
	if got := dir("../../etc", "u1"); strings.Contains(got, "/") || strings.Contains(got, "..") || got != "etc" {
		t.Errorf("a hostile label: %q", got)
	}
	if got := dir("My Photos & Videos!", "u2"); got != "My_Photos_Videos" {
		t.Errorf("got %q", got)
	}
	if got := dir("", "ABCD-1234"); got != "usb-ABCD-123" {
		t.Errorf("no label: %q", got)
	}
	if got := dir("....", "u4"); !strings.HasPrefix(got, "usb-") {
		t.Errorf("only dots: %q", got)
	}
	if got := dir(strings.Repeat("x", 80), "u5"); len(got) != 32 {
		t.Errorf("long label: %d", len(got))
	}
	// same label, different volume → distinct
	a, b := dir("Backup", "aaaa1111"), dir("Backup", "bbbb2222")
	if a == b || a != "Backup" || b != "Backup-bbbb2222" {
		t.Errorf("collision: %q %q", a, b)
	}
	// the same volume always gets the same name, even with a new label or a new Manager
	if got := dir("Renamed", "aaaa1111"); got != "Backup" {
		t.Errorf("a volume keeps its directory: %q", got)
	}
	st2, err := LoadStore(filepath.Join(w.dir, "storage.yaml"))
	if err != nil {
		t.Fatal(err)
	}
	w.m.Store = st2
	if got := dir("Whatever", "bbbb2222"); got != "Backup-bbbb2222" {
		t.Errorf("remembered across restarts: %q", got)
	}
}

func TestNeverMountsOverSomeonesFiles(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	mp := filepath.Join(w.dir, "media", "MY_USB")
	os.MkdirAll(mp, 0o755)
	os.WriteFile(filepath.Join(mp, "precious.txt"), []byte("x"), 0o644)
	// A new drive whose natural name is taken by a directory with files in it simply gets another name.
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); err != nil {
		t.Fatal(err)
	}
	if got := w.part("/dev/sdb1").MountPoint; got == mp || !strings.HasPrefix(got, mp+"-") {
		t.Errorf("mounted at %q, on top of somebody's directory?", got)
	}
	if _, err := os.Stat(filepath.Join(mp, "precious.txt")); err != nil {
		t.Error("the existing files are untouched")
	}
	// A *remembered* name whose directory has since been filled with files: refuse rather than hide them.
	w.m.Unmount(context.Background(), "/dev/sdb1")
	w.m.Store.Update(func(s *Settings) { s.Names = map[string]string{"abcd-1234": "MY_USB"} })
	before := len(w.called("mount"))
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); !errors.Is(err, ErrMountpoint) || len(w.called("mount")) != before {
		t.Errorf("non-empty directory: %v", err)
	}
	os.Remove(filepath.Join(mp, "precious.txt"))
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); err != nil {
		t.Errorf("an empty directory is fine: %v", err)
	}
	// a regular file where the directory should be
	w.m.Unmount(context.Background(), "/dev/sdb1")
	os.Remove(mp)
	os.WriteFile(mp, []byte("x"), 0o644)
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); !errors.Is(err, ErrMountpoint) {
		t.Errorf("a file in the way: %v", err)
	}
}

// ---- hard cases -------------------------------------------------------------------------------------

func TestUnsupportedVolumesAreListedNotMounted(t *testing.T) {
	w := newWorld(t)
	w.plug(fdisk{name: "sdb", tran: "usb", model: "Mixed", size: 100 << 30, parts: []fpart{
		{name: "sdb1", fstype: "crypto_LUKS", uuid: "u1", size: 10 << 30},
		{name: "sdb2", fstype: "LVM2_member", uuid: "u2", size: 10 << 30},
		{name: "sdb3", fstype: "swap", uuid: "u3", size: 10 << 30},
		{name: "sdb4", fstype: "", size: 10 << 30},
		{name: "sdb5", fstype: "zfs_member", uuid: "u5", size: 10 << 30},
		{name: "sdb6", fstype: "vfat", uuid: "u6", label: "OK", size: 10 << 30},
		{name: "sdb7", fstype: "", size: 4 << 20}, // tiny stub: hidden
	}})
	want := map[string]string{"/dev/sdb1": ReasonEncrypted, "/dev/sdb2": ReasonLVM, "/dev/sdb3": ReasonSwap, "/dev/sdb4": ReasonNoFilesystem, "/dev/sdb5": ReasonUnknownFS}
	for dev, why := range want {
		if p := w.part(dev); p.State != StateUnsupported || p.Reason != why {
			t.Errorf("%s: %+v", dev, p)
		}
		if err := w.m.Mount(context.Background(), dev); !errors.Is(err, ErrUnsupportedFS) {
			t.Errorf("%s: %v", dev, err)
		}
	}
	if w.listed("/dev/sdb7") {
		t.Error("a tiny stub with no filesystem is not worth listing")
	}
	w.ticks(3)
	if c := w.called("mount"); len(c) != 1 || !strings.Contains(c[0], "/dev/sdb6") {
		t.Errorf("only the supported volume is mounted: %v", c)
	}
}

func TestDirtyVolumeMountsReadOnly(t *testing.T) {
	for msg, why := range map[string]string{
		"The disk contains an unclean file system (0, 0).\nMetadata kept in Windows cache, refused to mount.": ReasonHibernated,
		"Windows is hibernated, refused to mount.":                                                            ReasonHibernated,
		"volume is dirty and \"force\" flag is not set!":                                                      ReasonDirty,
	} {
		w := newWorld(t)
		w.plug(fdisk{name: "sdb", tran: "usb", model: "Win", size: 1 << 40, parts: []fpart{{name: "sdb1", fstype: "ntfs", label: "WIN", uuid: "u1", size: 1 << 40}}})
		w.failRW["/dev/sdb1"] = msg
		if err := w.m.Mount(context.Background(), "/dev/sdb1"); err != nil {
			t.Fatalf("%q: %v", msg, err)
		}
		p := w.part("/dev/sdb1")
		if p.State != StateMountedRO || p.Reason != why {
			t.Errorf("%q → %+v", msg, p)
		}
		calls := w.called("mount")
		if len(calls) != 2 || strings.Contains(calls[0], ",ro") || !strings.HasSuffix(strings.Fields(calls[1])[4], ",ro") {
			t.Errorf("first read/write, then read-only: %v", calls)
		}
	}
}

func TestNtfs3gFallingBackToReadOnlyByItselfIsExplained(t *testing.T) {
	w := newWorld(t)
	w.plug(fdisk{name: "sdb", tran: "usb", model: "Win", size: 1 << 40, parts: []fpart{{name: "sdb1", fstype: "ntfs", label: "WIN", uuid: "u1", size: 1 << 40}}})
	// real ntfs-3g exits 0 here and only warns; the kernel then shows the mount as ro
	w.warn["/dev/sdb1"] = "The disk contains an unclean file system (0, 0).\nMetadata kept in Windows cache, refused to mount.\nFalling back to read-only mount because the NTFS partition is in an unsafe state."
	w.mu.Lock()
	w.mountOpts["/dev/sdb1"] = "ro"
	w.mu.Unlock()
	orig := w.failRW
	_ = orig
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); err != nil {
		t.Fatal(err)
	}
	w.mu.Lock()
	w.mountOpts["/dev/sdb1"] = "nosuid,ro"
	w.mu.Unlock()
	w.sync()
	p := w.part("/dev/sdb1")
	if p.State != StateMountedRO || p.Reason != ReasonHibernated {
		t.Errorf("%+v", p)
	}
}

func TestFailedMountIsRememberedUntilReplugged(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.failRW["/dev/sdb1"] = "mount: wrong fs type, bad option, bad superblock on /dev/sdb1"
	w.ticks(4)
	if len(w.called("mount")) != 1 {
		t.Errorf("a failing drive must not be retried every tick: %v", w.called("mount"))
	}
	p := w.part("/dev/sdb1")
	if p.State != StateFailed || !strings.Contains(p.Error, "wrong fs type") {
		t.Errorf("%+v", p)
	}
	if _, err := os.Stat(filepath.Join(w.dir, "media", "MY_USB")); err == nil {
		t.Error("the empty mount directory must be removed after a failure")
	}
	// manual retry after fixing the cause
	delete(w.failRW, "/dev/sdb1")
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); err != nil {
		t.Fatal(err)
	}
	// unplug and replug: the memory is gone
	w.m.Unmount(context.Background(), "/dev/sdb1")
	w.failRW["/dev/sdb1"] = "boom"
	w.ticks(1)
	w.unplug("sdb", true)
	w.ticks(1)
	delete(w.failRW, "/dev/sdb1")
	w.plug(flash())
	w.ticks(3)
	if w.part("/dev/sdb1").State != StateMounted {
		t.Errorf("a replugged drive gets a fresh chance: %+v", w.part("/dev/sdb1"))
	}
}

func TestFstabManagedDrivesAreLeftAlone(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.plug(hdd())
	w.fstab("UUID=1111-2222 /mnt/backup exfat defaults,nofail 0 0\n")
	w.ticks(3)
	if c := w.called("mount"); len(c) != 1 || !strings.Contains(c[0], "/dev/sdb1") {
		t.Errorf("only the drive that is not in fstab: %v", c)
	}
	p := w.part("/dev/sdc1")
	if p.State != StateFstab || p.ManagedBy != "fstab" {
		t.Errorf("%+v", p)
	}
	if err := w.m.Mount(context.Background(), "/dev/sdc1"); !errors.Is(err, ErrManagedByFstab) {
		t.Errorf("mount: %v", err)
	}
	// mounted by fstab: cannot be unmounted or ejected from here
	w.mu.Lock()
	w.mounts["/dev/sdc1"], w.mountFS["/dev/sdc1"] = "/mnt/backup", "exfat"
	w.mu.Unlock()
	w.sync()
	if err := w.m.Unmount(context.Background(), "/dev/sdc1"); !errors.Is(err, ErrManagedByFstab) {
		t.Errorf("unmount: %v", err)
	}
	if err := w.m.Eject(context.Background(), "/dev/sdc"); !errors.Is(err, ErrManagedByFstab) {
		t.Errorf("eject: %v", err)
	}
	if len(w.called("umount")) != 0 {
		t.Error("nothing may be unmounted")
	}
}

func TestOnlyListedDrivesCanBeNamedInARequest(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	for _, dev := range []string{"/dev/nvme0n1p2", "/dev/nvme0n1", "/dev/zram0", "/dev/sdq1", "/dev/../etc/passwd", "sdb1", "/dev/sdb1; rm -rf /", "", "/dev/", "/etc/shadow"} {
		if err := w.m.Mount(context.Background(), dev); !errors.Is(err, ErrNoSuchDevice) {
			t.Errorf("mount %q: %v", dev, err)
		}
		if err := w.m.Unmount(context.Background(), dev); !errors.Is(err, ErrNoSuchDevice) {
			t.Errorf("unmount %q: %v", dev, err)
		}
		if err := w.m.Eject(context.Background(), dev); !errors.Is(err, ErrNoSuchDevice) {
			t.Errorf("eject %q: %v", dev, err)
		}
	}
	if len(w.called("mount")) != 0 || len(w.called("umount")) != 0 {
		t.Errorf("no command may run for an unlisted device: %v", w.calls)
	}
}

// ---- unmount, busy, eject -----------------------------------------------------------------------------

func TestUnmountAndBusy(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.ticks(2)
	mp := filepath.Join(w.dir, "media", "MY_USB")
	w.m.UsedBy = func(p string) []string {
		if p == mp {
			return []string{"Photos"}
		}
		return nil
	}
	if got := w.part("/dev/sdb1").UsedBy; len(got) != 1 || got[0] != "Photos" {
		t.Errorf("the status of a mounted drive says which shares live on it: %v", got)
	}
	// a process with its working directory inside the drive
	pd := filepath.Join(w.dir, "proc", "4242")
	os.MkdirAll(filepath.Join(pd, "fd"), 0o755)
	os.Symlink(filepath.Join(mp, "sub"), filepath.Join(pd, "cwd"))
	os.WriteFile(filepath.Join(pd, "comm"), []byte("vlc\n"), 0o644)
	// another one holding a file open (not its working directory) inside the drive
	pd3 := filepath.Join(w.dir, "proc", "9000")
	os.MkdirAll(filepath.Join(pd3, "fd"), 0o755)
	os.Symlink("/tmp/elsewhere", filepath.Join(pd3, "cwd"))
	os.Symlink(filepath.Join(mp, "movie.mkv"), filepath.Join(pd3, "fd", "3"))
	os.WriteFile(filepath.Join(pd3, "comm"), []byte("ffmpeg\n"), 0o644)
	// an unrelated one
	pd2 := filepath.Join(w.dir, "proc", "17")
	os.MkdirAll(filepath.Join(pd2, "fd"), 0o755)
	os.Symlink("/home/x", filepath.Join(pd2, "cwd"))
	os.WriteFile(filepath.Join(pd2, "comm"), []byte("bash\n"), 0o644)

	w.busy[mp] = true
	err := w.m.Unmount(context.Background(), "/dev/sdb1")
	var be *BusyError
	if !errors.As(err, &be) {
		t.Fatalf("got %v", err)
	}
	if len(be.Processes) != 2 || be.Processes[0].PID != 4242 || be.Processes[0].Name != "vlc" || be.Processes[1].PID != 9000 || be.Processes[1].Name != "ffmpeg" || len(be.UsedBy) != 1 || be.UsedBy[0] != "Photos" {
		t.Errorf("%+v", be)
	}
	if len(w.called("umount -l")) != 0 {
		t.Error("a busy drive is never force-detached")
	}
	if w.part("/dev/sdb1").State != StateMounted {
		t.Error("still mounted")
	}
	delete(w.busy, mp)
	if err := w.m.Unmount(context.Background(), "/dev/sdb1"); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(mp); err == nil {
		t.Error("the empty mount directory must go")
	}
	if err := w.m.Unmount(context.Background(), "/dev/sdb1"); !errors.Is(err, ErrNotMounted) {
		t.Errorf("unmounting twice: %v", err)
	}
}

func TestAUserUnmountedDriveStaysUnmountedUntilReplugged(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.ticks(2)
	if err := w.m.Unmount(context.Background(), "/dev/sdb1"); err != nil {
		t.Fatal(err)
	}
	n := len(w.called("mount"))
	w.ticks(5)
	if len(w.called("mount")) != n || w.part("/dev/sdb1").State != StateUnmounted {
		t.Fatalf("clicking Unmount must not be undone a moment later: %v", w.calls)
	}
	// ejecting behaves the same
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); err != nil {
		t.Fatal(err)
	}
	if err := w.m.Eject(context.Background(), "/dev/sdb"); err != nil {
		t.Fatal(err)
	}
	n = len(w.called("mount"))
	w.ticks(5)
	if len(w.called("mount")) != n {
		t.Error("an ejected drive that is still plugged in is not mounted again")
	}
	// unplug and plug again: a new drive as far as anyone is concerned
	w.unplug("sdb", true)
	w.ticks(2)
	w.plug(flash())
	w.ticks(3)
	if w.part("/dev/sdb1").State != StateMounted {
		t.Errorf("replugged: %+v", w.part("/dev/sdb1"))
	}
}

func TestDevicePathShape(t *testing.T) {
	for _, ok := range []string{"/dev/sdb1", "/dev/loop3", "/dev/mmcblk0p1", "/dev/nvme0n1p2", "/dev/sr0", "/dev/md127"} {
		if !reDevPath.MatchString(ok) {
			t.Errorf("%s should be accepted", ok)
		}
	}
	for _, bad := range []string{"", "/dev/", "sdb1", "/dev/../etc/passwd", "/dev/sdb1;reboot", "/dev/sd b", "/dev/sdb1\n", "/etc/passwd", "/dev/a/b", "/dev/" + strings.Repeat("x", 40)} {
		if reDevPath.MatchString(bad) {
			t.Errorf("%q must be rejected", bad)
		}
	}
}

func TestDiskWithAnFstabPartitionIsNotEjectable(t *testing.T) {
	// sdc1 is ours to unmount, sdc2 belongs to fstab: pulling the whole disk out from under
	// sdc2 is not something TarOS may do, even though sdc2 is not mounted right now.
	w := newWorld(t)
	w.plug(fdisk{name: "sdc", tran: "usb", model: "Two volumes", size: 2 << 40, parts: []fpart{
		{name: "sdc1", fstype: "exfat", label: "Loose", uuid: "1111-AAAA", size: 1 << 40},
		{name: "sdc2", fstype: "ntfs", label: "Pinned", uuid: "2222-BBBB", size: 1 << 40}}})
	w.fstab("UUID=2222-BBBB /mnt/pinned ntfs-3g nofail 0 0\n")
	w.ticks(3) // sdc1 gets mounted, sdc2 is left alone
	if err := w.m.Eject(context.Background(), "/dev/sdc"); !errors.Is(err, ErrManagedByFstab) {
		t.Fatalf("eject: %v", err)
	}
	if len(w.called("umount")) != 0 || w.part("/dev/sdc1").State != StateMounted {
		t.Errorf("nothing may be unmounted: %v", w.calls)
	}
}

func TestADriveUnmountedBySomeoneElseIsNotMountedAgain(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.ticks(3)
	if w.part("/dev/sdb1").State != StateMounted {
		t.Fatal("setup")
	}
	// somebody runs umount in a terminal
	w.mu.Lock()
	delete(w.mounts, "/dev/sdb1")
	w.mu.Unlock()
	w.sync()
	n := len(w.called("mount"))
	w.ticks(5)
	if len(w.called("mount")) != n {
		t.Errorf("TarOS must not fight a person who just unmounted a drive: %v", w.calls[len(w.calls)-3:])
	}
	if w.part("/dev/sdb1").State != StateUnmounted {
		t.Errorf("%+v", w.part("/dev/sdb1"))
	}
}

func TestBusyErrorSummary(t *testing.T) {
	e := &BusyError{Processes: []BusyProc{{PID: 5, Name: "vlc"}}, UsedBy: []string{"Photos"}}
	if e.Summary() != "vlc (5), Photos" {
		t.Errorf("%q", e.Summary())
	}
}

func TestEject(t *testing.T) {
	w := newWorld(t)
	d := flash()
	d.parts = append(d.parts, fpart{name: "sdb2", fstype: "ext4", label: "data", uuid: "u-2", size: 1 << 30})
	w.plug(d)
	w.ticks(2)
	del := filepath.Join(w.dir, "sys/block/sdb/device/delete")
	// one partition busy → nothing is removed
	mp2 := w.part("/dev/sdb2").MountPoint
	w.busy[mp2] = true
	if err := w.m.Eject(context.Background(), "/dev/sdb"); err == nil {
		t.Fatal("eject must fail while a partition is busy")
	}
	if b, _ := os.ReadFile(del); len(b) != 0 {
		t.Error("the device must not be removed from the kernel while in use")
	}
	delete(w.busy, mp2)
	if err := w.m.Eject(context.Background(), "/dev/sdb"); err != nil {
		t.Fatal(err)
	}
	if got := len(w.called("umount")); got < 2 {
		t.Errorf("every partition is unmounted: %v", w.calls)
	}
	if b, _ := os.ReadFile(del); string(b) != "1" {
		t.Errorf("delete file = %q", b)
	}
	if len(w.called("sync")) == 0 {
		t.Error("sync before removal")
	}
}

func TestPullingADriveCleansUpItsMount(t *testing.T) {
	w := newWorld(t)
	w.plug(flash())
	w.ticks(2)
	mp := filepath.Join(w.dir, "media", "MY_USB")
	var events []Event
	w.m.OnEvent = func(e Event) { events = append(events, e) }
	// a mount somewhere else that must never be touched
	w.mu.Lock()
	w.mounts["/dev/other9"], w.mountFS["/dev/other9"] = "/srv/elsewhere", "ext4"
	w.mu.Unlock()
	w.unplug("sdb", false) // cable pulled: the mount lingers
	w.ticks(2)
	if got := w.called("umount -l"); len(got) != 1 || !strings.HasSuffix(got[0], mp) {
		t.Errorf("the stale mount is detached lazily, and only that one: %v", w.calls)
	}
	if _, err := os.Stat(mp); err == nil {
		t.Error("its directory is removed")
	}
	kinds := ""
	for _, e := range events {
		kinds += e.Kind + " "
	}
	if !strings.Contains(kinds, "unplugged") || !strings.Contains(kinds, "removed_unsafely") {
		t.Errorf("events: %s", kinds)
	}
}

// ---- who may do it ------------------------------------------------------------------------------------

func TestNotRootNothingIsTouched(t *testing.T) {
	w := newWorld(t)
	w.m.IsRoot = func() bool { return false }
	w.plug(flash())
	st := w.m.Status(context.Background())
	if st.CanMount || st.Blocked != ReasonNotRoot || len(st.Disks) != 1 {
		t.Errorf("read-only view, with the reason: %+v", st)
	}
	w.ticks(3)
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); !errors.Is(err, ErrCannotMount) {
		t.Errorf("%v", err)
	}
	if len(w.called("mount")) != 0 {
		t.Error("no mount without root")
	}
}

func TestPlatformAndToolGuards(t *testing.T) {
	w := newWorld(t)
	w.m.GOOS = "darwin"
	if st := w.m.Status(context.Background()); st.Supported || st.Reason != ReasonNotLinux || st.Disks == nil {
		t.Errorf("%+v", st)
	}
	if err := w.m.Mount(context.Background(), "/dev/sdb1"); !errors.Is(err, ErrUnavailable) {
		t.Errorf("%v", err)
	}
	w.m.GOOS = "linux"
	w.tools["lsblk"] = false
	if st := w.m.Status(context.Background()); st.Reason != ReasonNoLsblk || st.CanMount {
		t.Errorf("%+v", st)
	}
	w.tools["lsblk"], w.tools["umount"] = true, false
	w.m.invalidate()
	if st := w.m.Status(context.Background()); st.CanMount || st.Blocked != ReasonNoMount {
		t.Errorf("%+v", st)
	}
	w.tools["umount"] = true
	w.m.Cfg.Enabled = false
	w.m.invalidate()
	if st := w.m.Status(context.Background()); st.CanMount || st.Blocked != ReasonDisabled {
		t.Errorf("%+v", st)
	}
}

func TestWholeDiskFilesystem(t *testing.T) {
	w := newWorld(t)
	w.plug(fdisk{name: "sdb", tran: "usb", rm: true, model: "Old stick", size: 1 << 30, whole: &fpart{name: "sdb", fstype: "vfat", label: "STICK", uuid: "S-1", size: 1 << 30}})
	w.ticks(2)
	if p := w.part("/dev/sdb"); p.State != StateMounted || p.MountPoint == "" {
		t.Errorf("a filesystem straight on the disk: %+v", p)
	}
}

// ---- settings persistence -----------------------------------------------------------------------------

func TestStoreDefaultsAndPersistence(t *testing.T) {
	dir := t.TempDir()
	path := filepath.Join(dir, "storage.yaml")
	st, err := LoadStore(path)
	if err != nil {
		t.Fatal(err)
	}
	if s := st.Get(); !s.AutoMount || !s.NoExec {
		t.Errorf("defaults are on: %+v", s)
	}
	if err := st.Update(func(s *Settings) {
		s.AutoMount = false
		s.Ignored = []string{"b", "a"}
		s.Names = map[string]string{"x": "Disk"}
	}); err != nil {
		t.Fatal(err)
	}
	st2, err := LoadStore(path)
	if err != nil {
		t.Fatal(err)
	}
	s := st2.Get()
	if s.AutoMount || !s.NoExec || strings.Join(s.Ignored, ",") != "a,b" || s.Names["x"] != "Disk" {
		t.Errorf("%+v", s)
	}
	// Get returns a copy
	s.Names["x"] = "hacked"
	if st2.Get().Names["x"] != "Disk" {
		t.Error("Get must return a copy")
	}
	// a write failure changes nothing
	bad, _ := LoadStore(filepath.Join(dir, "no-such-dir", "s.yaml"))
	if err := bad.Update(func(s *Settings) { s.AutoMount = false }); err == nil || !bad.Get().AutoMount {
		t.Errorf("failed write must not apply: %v", err)
	}
	if fi, err := os.Stat(path); err != nil || fi.Mode().Perm() != 0o644 {
		t.Errorf("not secret: %v", fi)
	}
	os.WriteFile(path, []byte("autoMount: [not, a, bool"), 0o644)
	if _, err := LoadStore(path); err == nil {
		t.Error("a corrupt file is an error, not silently the defaults")
	}
}

func TestWatchStopsWithContext(t *testing.T) {
	w := newWorld(t)
	w.m.Cfg.Poll = 5 * time.Millisecond
	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan struct{})
	go func() { w.m.Watch(ctx); close(done) }()
	w.plug(flash())
	deadline := time.Now().Add(2 * time.Second)
	for time.Now().Before(deadline) && len(w.called("mount")) == 0 {
		time.Sleep(10 * time.Millisecond)
	}
	cancel()
	select {
	case <-done:
	case <-time.After(2 * time.Second):
		t.Fatal("Watch must return when the context ends")
	}
	if len(w.called("mount")) == 0 {
		t.Error("the watcher mounted nothing")
	}
}
