package storage

import (
	"context"
	"encoding/json"
	"errors"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"testing"
)

// loopOnlyRunner lets the REAL lsblk/mount/umount work, but hides every block
// device except the loop devices this test made — so it can never touch a real disk.
type loopOnlyRunner struct {
	Runner
	allowed map[string]bool
}

// RunCombined passes through, so mount's stderr on a successful (ro-fallback) mount is still seen.
func (r loopOnlyRunner) RunCombined(ctx context.Context, name string, args ...string) (string, error) {
	return r.Runner.(combinedRunner).RunCombined(ctx, name, args...)
}

func (r loopOnlyRunner) Run(ctx context.Context, name string, args ...string) (string, error) {
	out, err := r.Runner.Run(ctx, name, args...)
	if err != nil || filepath.Base(name) != "lsblk" {
		return out, err
	}
	var doc struct {
		Blockdevices []map[string]any `json:"blockdevices"`
	}
	if json.Unmarshal([]byte(out), &doc) != nil {
		return out, nil
	}
	keep := []map[string]any{}
	for _, d := range doc.Blockdevices {
		if p, _ := d["path"].(string); r.allowed[p] {
			keep = append(keep, d)
		}
	}
	b, _ := json.Marshal(map[string]any{"blockdevices": keep})
	return string(b), nil
}

// TestIntegrationStorage drives the Manager against the REAL mount/umount/lsblk on
// loop devices (vfat, exfat, ntfs, ext4). It changes the machine it runs on, so it
// only runs when TAROS_STORAGE_IT=1 — inside a disposable container that has no
// real disks in /dev (see docs/04-features.md §4.17):
//
//	docker run --rm --cap-add SYS_ADMIN --cap-add MKNOD --device /dev/loop-control --device /dev/fuse \
//	  --device-cgroup-rule 'b 7:* rmw' --security-opt apparmor=unconfined -v $PWD:/t:ro debian:bookworm-slim sh -c \
//	  'apt-get install -y util-linux ntfs-3g exfatprogs dosfstools e2fsprogs && TAROS_STORAGE_IT=1 /t/storage.test -test.run IntegrationStorage -test.v'
func TestIntegrationStorage(t *testing.T) {
	if os.Getenv("TAROS_STORAGE_IT") != "1" {
		t.Skip("set TAROS_STORAGE_IT=1 (inside a disposable container)")
	}
	// Safety: refuse to run where real disks are reachable.
	if m, _ := filepath.Glob("/dev/sd*"); len(m) > 0 {
		t.Fatalf("real disks are visible in /dev (%v): run this in a container without --privileged", m)
	}
	if m, _ := filepath.Glob("/dev/nvme*"); len(m) > 0 {
		t.Fatalf("real disks are visible in /dev (%v)", m)
	}
	sh := func(name string, args ...string) string {
		t.Helper()
		out, err := exec.Command(name, args...).CombinedOutput()
		if err != nil {
			t.Fatalf("%s %v: %v\n%s", name, args, err, out)
		}
		return strings.TrimSpace(string(out))
	}
	// The files of FAT/exFAT/NTFS drives belong to the configured owner: make one.
	sh("useradd", "-m", "-s", "/bin/bash", "-c", "taros-it", "tarowner")
	ownerUID := func() uint32 {
		var n uint32
		for _, c := range sh("id", "-u", "tarowner") {
			n = n*10 + uint32(c-'0')
		}
		return n
	}()

	type vol struct{ fs, label, mkfs, dev string }
	vols := []*vol{{fs: "vfat", label: "VFATVOL"}, {fs: "exfat", label: "EXFATVOL"}, {fs: "ntfs", label: "NTFSVOL"}, {fs: "ext4", label: "EXT4VOL"}}
	allowed := map[string]bool{}
	dir := t.TempDir()
	for _, v := range vols {
		img := filepath.Join(dir, v.fs+".img")
		sh("truncate", "-s", "96M", img)
		switch v.fs {
		case "vfat":
			sh("mkfs.vfat", "-n", v.label, img)
		case "exfat":
			sh("mkfs.exfat", "-L", v.label, img)
		case "ntfs":
			sh("mkfs.ntfs", "-F", "-f", "-L", v.label, img)
		case "ext4":
			sh("mkfs.ext4", "-q", "-F", "-L", v.label, img)
		}
		v.dev = sh("losetup", "-f", "--show", img)
		allowed[v.dev] = true
		defer exec.Command("losetup", "-d", v.dev).Run()
	}

	base := "/media/taros-it"
	os.RemoveAll(base)
	defer os.RemoveAll(base)
	m := New(Config{Enabled: true, MountBase: base, Umask: "002", OwnerUser: "tarowner", ExtraExternal: []string{"loop"}}, NewStore(filepath.Join(dir, "storage.yaml")))
	m.Run = loopOnlyRunner{Runner: m.Run, allowed: allowed}
	ctx := context.Background()

	if st := m.Status(ctx); !st.CanMount || len(st.Disks) != len(vols) {
		t.Fatalf("expected %d loop drives and a usable mounter: %+v", len(vols), st)
	}
	mountinfo := func() string { b, _ := os.ReadFile("/proc/self/mountinfo"); return string(b) }

	// ---- auto-mount: nothing on the first look, everything on the second
	m.tick(ctx)
	if strings.Contains(mountinfo(), base) {
		t.Fatal("first sighting must not mount")
	}
	m.tick(ctx)
	byLabel := map[string]Partition{}
	for _, d := range m.Status(ctx).Disks {
		for _, p := range d.Partitions {
			byLabel[p.Label] = p
		}
	}
	for _, v := range vols {
		p, ok := byLabel[v.label]
		if !ok {
			t.Fatalf("%s not listed", v.label)
		}
		if p.State != StateMounted || p.ManagedBy != "taros" || p.MountPoint != filepath.Join(base, v.label) {
			t.Fatalf("%s: %+v", v.label, p)
		}
		if p.TotalBytes == 0 || p.FSType == "" {
			t.Errorf("%s: no usage/fs info: %+v", v.label, p)
		}
		// really mounted with the safe options
		var line string
		for _, l := range strings.Split(mountinfo(), "\n") {
			if strings.Contains(l, " "+p.MountPoint+" ") {
				line = l
			}
		}
		for _, opt := range []string{"nosuid", "nodev", "noexec"} {
			if !strings.Contains(line, opt) {
				t.Errorf("%s: mount options lack %s: %s", v.label, opt, line)
			}
		}
		// read/write works, and noexec is really enforced
		f := filepath.Join(p.MountPoint, "hello.txt")
		if err := os.WriteFile(f, []byte("hi"), 0o644); err != nil {
			t.Errorf("%s: cannot write: %v", v.label, err)
			continue
		}
		fi, _ := os.Stat(f)
		uid := fi.Sys().(*syscall.Stat_t).Uid
		if v.fs == "ext4" {
			if uid != 0 {
				t.Errorf("ext4 keeps its own ownership, got uid %d", uid)
			}
		} else if uid != ownerUID {
			t.Errorf("%s files belong to the configured owner (%d), got %d", v.label, ownerUID, uid)
		}
		exe := filepath.Join(p.MountPoint, "prog")
		if b, err := os.ReadFile("/bin/true"); err == nil && os.WriteFile(exe, b, 0o755) == nil {
			if err := exec.Command(exe).Run(); err == nil {
				t.Errorf("%s: noexec is not enforced — a program ran from the drive", v.label)
			}
		}
	}

	// ---- a busy drive is refused, with who is using it; then it unmounts cleanly
	p := byLabel["VFATVOL"]
	sleeper := exec.Command("sleep", "60")
	sleeper.Dir = p.MountPoint
	if err := sleeper.Start(); err != nil {
		t.Fatal(err)
	}
	err := m.Unmount(ctx, p.Path)
	var be *BusyError
	if !errors.As(err, &be) {
		t.Fatalf("expected a busy error, got %v", err)
	}
	found := false
	for _, pr := range be.Processes {
		if pr.PID == sleeper.Process.Pid && pr.Name == "sleep" {
			found = true
		}
	}
	if !found {
		t.Errorf("the process using the drive must be named: %+v", be)
	}
	sleeper.Process.Kill()
	sleeper.Wait()
	if err := m.Unmount(ctx, p.Path); err != nil {
		t.Fatal(err)
	}
	if fileExists(p.MountPoint) {
		t.Error("the empty mount directory must be removed")
	}
	// ---- the same drive comes back at the same path
	if err := m.Mount(ctx, p.Path); err != nil {
		t.Fatal(err)
	}
	if got := m.Status(ctx); got.Disks == nil {
		t.Fatal("no disks")
	}
	if !fileExists(filepath.Join(p.MountPoint, "hello.txt")) {
		t.Error("files must survive an unmount/mount, at the same path")
	}
	if err := m.Mount(ctx, p.Path); !errors.Is(err, ErrAlreadyMounted) {
		t.Errorf("mounting twice: %v", err)
	}

	// ---- a hibernated NTFS volume (Windows "fast startup") is mounted read-only, not refused
	nt := byLabel["NTFSVOL"]
	hib := filepath.Join(nt.MountPoint, "hiberfil.sys")
	if err := os.WriteFile(hib, append([]byte("hibr"), make([]byte, 8192)...), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := m.Unmount(ctx, nt.Path); err != nil {
		t.Fatal(err)
	}
	if err := m.Mount(ctx, nt.Path); err != nil {
		t.Fatalf("a hibernated volume must be mounted read-only, not refused: %v", err)
	}
	m.invalidate()
	var np Partition
	for _, d := range m.Status(ctx).Disks {
		for _, q := range d.Partitions {
			if q.Path == nt.Path {
				np = q
			}
		}
	}
	if np.State != StateMountedRO || np.Reason != ReasonHibernated {
		t.Errorf("real ntfs-3g refuses a hibernated volume; TarOS must fall back to read-only and say why: %+v", np)
	}
	if err := os.WriteFile(filepath.Join(np.MountPoint, "new.txt"), []byte("x"), 0o644); err == nil {
		t.Error("a read-only fallback must really be read-only")
	}

	// ---- eject: everything is unmounted (a loop device has no device/delete, so only that)
	for _, d := range m.Status(ctx).Disks {
		if err := m.Eject(ctx, d.Path); err != nil {
			t.Errorf("eject %s: %v", d.Path, err)
		}
	}
	if strings.Contains(mountinfo(), base+"/") {
		t.Errorf("everything must be unmounted after eject:\n%s", mountinfo())
	}
}

func fileExists(p string) bool { _, err := os.Stat(p); return err == nil }
