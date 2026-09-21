package sharing

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
	"testing"
	"time"
)

// ---- a fake operating system -----------------------------------------------------

type sys struct {
	mu      sync.Mutex
	users   map[string]string // name → primary group
	groups  map[string]bool
	calls   []string
	stdin   map[string]string // call → stdin
	fail    map[string]error  // command prefix → error
	smbConf string
	active  bool
	dropKey string // testparm "forgets" lines containing this (simulates an ignored/unknown parameter)
	tpFail  int    // fail the Nth+ real (no-path) testparm call, 0 = never
	tpCalls int
}

func newSys(smbConf string) *sys {
	return &sys{users: map[string]string{"root": "root", "tarkiman": "tarkiman"}, groups: map[string]bool{}, stdin: map[string]string{}, fail: map[string]error{}, smbConf: smbConf}
}

var reInclude = regexp.MustCompile(`^\s*include\s*=\s*(\S+)\s*$`)

func (s *sys) expand(path string) string {
	b, err := os.ReadFile(path)
	if err != nil {
		return ""
	}
	var out []string
	for _, l := range strings.Split(string(b), "\n") {
		if m := reInclude.FindStringSubmatch(l); m != nil {
			out = append(out, s.expand(m[1]))
			continue
		}
		if s.dropKey != "" && strings.Contains(l, s.dropKey) {
			continue
		}
		out = append(out, l)
	}
	return strings.Join(out, "\n")
}

func (s *sys) Run(ctx context.Context, name string, args ...string) (string, error) {
	return s.RunInput(ctx, "", name, args...)
}

func (s *sys) RunInput(_ context.Context, stdin, name string, args ...string) (string, error) {
	s.mu.Lock()
	defer s.mu.Unlock()
	base := filepath.Base(name)
	call := strings.TrimSpace(base + " " + strings.Join(args, " "))
	s.calls = append(s.calls, call)
	if stdin != "" {
		s.stdin[call] = stdin
	}
	for prefix, err := range s.fail {
		if strings.HasPrefix(call, prefix) {
			return "", &CmdError{Err: err, Stderr: err.Error()}
		}
	}
	bad := func(msg string) (string, error) { return "", &CmdError{Err: errors.New(msg), Stderr: msg} }
	last := ""
	if len(args) > 0 {
		last = args[len(args)-1]
	}
	switch base {
	case "id":
		g, ok := s.users[last]
		if !ok {
			return bad("id: no such user")
		}
		if args[0] == "-gn" {
			return g + "\n", nil
		}
		return "1000\n", nil
	case "getent":
		if s.groups[last] {
			return last + ":x:990:\n", nil
		}
		return bad("")
	case "groupadd":
		s.groups[last] = true
	case "useradd":
		g := ""
		for i, a := range args {
			if a == "-g" {
				g = args[i+1]
			}
		}
		s.users[last] = g
	case "userdel":
		delete(s.users, last)
	case "smbpasswd", "smbcontrol":
	case "smbd":
		return "Version 4.17.12-Debian\n", nil
	case "pdbedit":
		return "", nil
	case "systemctl":
		if args[0] == "is-active" {
			if s.active {
				return "active\n", nil
			}
			return bad("inactive")
		}
		if args[0] == "is-enabled" {
			return "disabled\n", nil
		}
	case "ss":
		return "", nil
	case "testparm":
		if len(args) >= 2 {
			return s.expand(args[1]), nil
		}
		s.tpCalls++
		if s.tpFail > 0 && s.tpCalls >= s.tpFail {
			return bad("Unknown parameter encountered")
		}
		return s.expand(s.smbConf), nil
	}
	return "", nil
}

func (s *sys) called(prefix string) []string {
	s.mu.Lock()
	defer s.mu.Unlock()
	var out []string
	for _, c := range s.calls {
		if strings.HasPrefix(c, prefix) {
			out = append(out, c)
		}
	}
	return out
}

// ---- the rig ---------------------------------------------------------------------

type rig struct {
	t     *testing.T
	dir   string
	data  string
	sys   *sys
	m     *Manager
	conf  string
	store *Store
}

func newRig(t *testing.T) *rig {
	t.Helper()
	dir := t.TempDir()
	conf := filepath.Join(dir, "smb.conf")
	orig := fixture(t, "smb-debian.conf")
	if err := os.WriteFile(conf, []byte(orig), 0o644); err != nil {
		t.Fatal(err)
	}
	os.MkdirAll(filepath.Join(dir, "systemd"), 0o755)
	data := filepath.Join(dir, "data")
	os.MkdirAll(filepath.Join(data, "media"), 0o755)
	os.MkdirAll(filepath.Join(data, "docs"), 0o755)

	sy := newSys(conf)
	det := &Detector{
		Run: sy, GOOS: "linux",
		Paths:      Paths{OSRelease: filepath.Join(dir, "os-release"), SmbConf: conf, SambaDir: dir, Passwd: filepath.Join(dir, "passwd"), SystemdRun: filepath.Join(dir, "systemd")},
		IsRoot:     func() bool { return true },
		LookPath:   func(n string) (string, error) { return "/usr/sbin/" + n, nil },
		Exists:     func(p string) bool { _, err := os.Stat(p); return strings.HasPrefix(p, dir) && err == nil },
		Interfaces: func() []Iface { return nil },
	}
	os.WriteFile(det.Paths.OSRelease, []byte(fixture(t, "osrelease/debian.os-release")), 0o644)
	store := NewStore(filepath.Join(dir, "sharing.yaml"))
	m := NewManager(det, store, PathPolicy{Roots: []string{data}})
	m.Run = sy
	m.Users = &shadowUsers{run: sy, nologin: "/usr/sbin/nologin"}
	m.Owner = func(string) (Owner, error) { return Owner{User: "tarkiman", Group: "tarkiman", UID: 1000}, nil }
	m.LookupUser = func(n string) (int, string, error) {
		if n == "root" {
			return 0, "root", nil
		}
		if n == "tarkiman" || n == "alice-sys" {
			return 1000, "tarkiman", nil
		}
		return 0, "", errors.New("unknown user")
	}
	m.IfaceNames = func() []string { return []string{"lo", "wlan0", "eth0", "zt0"} }
	m.Now = func() time.Time { return time.Date(2026, 9, 21, 12, 0, 0, 0, time.UTC) }
	return &rig{t: t, dir: dir, data: data, sys: sy, m: m, conf: conf, store: store}
}

func (r *rig) adopt() {
	r.t.Helper()
	if err := r.m.Adopt(context.Background(), []string{"wlan0"}); err != nil {
		r.t.Fatal(err)
	}
}

func (r *rig) account(name string) {
	r.t.Helper()
	if err := r.m.AddAccount(context.Background(), name, "correct-horse-9"); err != nil {
		r.t.Fatal(err)
	}
}

func (r *rig) read(p string) string {
	b, _ := os.ReadFile(p)
	return string(b)
}

func (r *rig) shareOf(name string, access ...Access) Share {
	p := filepath.Join(r.data, name)
	os.MkdirAll(p, 0o755)
	return Share{Name: name, Path: p, Browseable: true, Access: access}
}

// ---- rendering -------------------------------------------------------------------------

func TestRenderShares(t *testing.T) {
	m := Model{Shares: []Share{
		{Name: "media", Path: "/srv/media", Comment: "Family", Browseable: true, Access: []Access{{"bob", "ro"}, {"alice", "rw"}}},
		{Name: "Docs", Path: "/srv/docs", Browseable: false, Access: []Access{{"alice", "rw"}}, RunAs: "svc"},
	}}
	out, err := RenderShares(m, func(s Share) (string, string, error) {
		if s.RunAs != "" {
			return s.RunAs, "svcgrp", nil
		}
		return "tarkiman", "tarkiman", nil
	})
	if err != nil {
		t.Fatal(err)
	}
	// Sorted case-insensitively: Docs before media.
	if strings.Index(out, "[Docs]") > strings.Index(out, "[media]") {
		t.Errorf("shares not sorted:\n%s", out)
	}
	for _, want := range []string{
		"[media]\n   path = /srv/media\n   comment = Family\n   browseable = yes\n   read only = yes\n   guest ok = no\n   valid users = alice bob\n   write list = alice\n   force user = tarkiman\n   force group = tarkiman\n",
		"[Docs]\n   path = /srv/docs\n   browseable = no\n", "force user = svc\n   force group = svcgrp\n", "wide links = no",
	} {
		if !strings.Contains(out, want) {
			t.Errorf("missing %q in:\n%s", want, out)
		}
	}
	// Deny by default: read-only share, write access only through the write list, never guests.
	if strings.Contains(out, "guest ok = yes") || strings.Contains(out, "read only = no") {
		t.Errorf("a share must never be open by default:\n%s", out)
	}
	if _, err := RenderShares(m, func(Share) (string, string, error) { return "", "", ErrOwnedByRoot }); !errors.Is(err, ErrOwnedByRoot) {
		t.Errorf("owner error not propagated: %v", err)
	}
}

func TestRenderGlobal(t *testing.T) {
	g := RenderGlobal(Model{Interfaces: []string{"wlan0", "eth0"}, Workgroup: "HOME"})
	for _, want := range []string{"restrict anonymous = 2", "workgroup = HOME", "bind interfaces only = yes", "interfaces = lo wlan0 eth0"} {
		if !strings.Contains(g, want) {
			t.Errorf("missing %q:\n%s", want, g)
		}
	}
	if g := RenderGlobal(Model{}); strings.Contains(g, "interfaces") {
		t.Errorf("no interfaces chosen → no restriction line:\n%s", g)
	}
}

// ---- the include blocks -----------------------------------------------------------------

func TestEnsureIncludesOnTheRealDebianConfig(t *testing.T) {
	orig := fixture(t, "smb-debian.conf")
	got, changed := EnsureIncludes(orig, "/etc/samba")
	if !changed || !HasIncludes(got, "/etc/samba") {
		t.Fatal("includes not added")
	}
	lines := strings.Split(got, "\n")
	gi, homes, gBlock, sBlock := -1, -1, -1, -1
	for i, l := range lines {
		switch {
		case strings.TrimSpace(l) == "[global]":
			gi = i
		case strings.TrimSpace(l) == "[homes]":
			homes = i
		case strings.Contains(l, "taros-global.conf"):
			gBlock = i
		case strings.Contains(l, "taros-shares.conf"):
			sBlock = i
		}
	}
	// The [global] include sits INSIDE [global] — after everything the user set there (so ours wins), before [homes].
	if !(gi < gBlock && gBlock < homes) {
		t.Errorf("global include at %d must be inside [global] (%d) and before [homes] (%d)", gBlock, gi, homes)
	}
	if sBlock < homes {
		t.Errorf("shares include must come after the user's sections")
	}
	// Every original line is still there, in order — TarOS only ever adds.
	if removed := RemoveIncludes(got); removed != orig {
		t.Errorf("RemoveIncludes(EnsureIncludes(x)) != x for a newline-terminated file")
	}
	// Idempotent.
	if again, changed := EnsureIncludes(got, "/etc/samba"); changed || again != got {
		t.Error("second EnsureIncludes must be a no-op")
	}
}

func TestEnsureIncludesEdgeCases(t *testing.T) {
	// No [global] section at all.
	got, _ := EnsureIncludes("[share]\n   path = /x\n", "/etc/samba")
	if !strings.HasPrefix(got, "[global]\n"+markBegin) || !strings.Contains(got, "[share]") {
		t.Errorf("no-global case:\n%s", got)
	}
	// [global] is the last section: the include goes at its end, not lost.
	got, _ = EnsureIncludes("[a]\n   path = /a\n[global]\n   workgroup = W\n", "/etc/samba")
	gi, inc := strings.Index(got, "[global]"), strings.Index(got, "taros-global.conf")
	if gi < 0 || inc < gi {
		t.Errorf("global-last case:\n%s", got)
	}
	// Empty file.
	if got, changed := EnsureIncludes("", "/etc/samba"); !changed || !HasIncludes(got, "/etc/samba") {
		t.Errorf("empty file:\n%s", got)
	}
	// A half-present state (only one marker block) is rebuilt, not duplicated.
	half := "[global]\n" + markBegin + "\n   include = /etc/samba/taros-global.conf\n" + markEnd + "\n"
	got, _ = EnsureIncludes(half, "/etc/samba")
	if strings.Count(got, markBegin) != 2 || strings.Count(got, "taros-global.conf") != 1 {
		t.Errorf("half state:\n%s", got)
	}
	// User text mentioning include for other files is left alone.
	got, _ = EnsureIncludes("[global]\n   include = /etc/samba/other.conf\n", "/etc/samba")
	if !strings.Contains(RemoveIncludes(got), "other.conf") {
		t.Error("the user's own include was removed")
	}
}

// ---- path policy -----------------------------------------------------------------------------

func TestPathPolicy(t *testing.T) {
	root := t.TempDir()
	os.MkdirAll(filepath.Join(root, "media/sub"), 0o755)
	os.MkdirAll(filepath.Join(root, ".ssh"), 0o755)
	os.MkdirAll(filepath.Join(root, "apps/data"), 0o755)
	os.WriteFile(filepath.Join(root, "file.txt"), nil, 0o644)
	outside := t.TempDir()
	os.Symlink(outside, filepath.Join(root, "escape"))
	os.Symlink(filepath.Join(root, "media"), filepath.Join(root, "alias"))
	os.MkdirAll(filepath.Join(root, "we%ird"), 0o755)

	pp := PathPolicy{Roots: []string{root}, Denied: []string{filepath.Join(root, "apps")}}
	cases := []struct {
		name, path string
		want       error
	}{
		{"a folder inside a root", filepath.Join(root, "media"), nil},
		{"a subfolder", filepath.Join(root, "media/sub"), nil},
		{"the root itself", root, nil},
		{"a symlink to a folder inside the root resolves and passes", filepath.Join(root, "alias"), nil},
		{"a symlink that escapes the root", filepath.Join(root, "escape"), ErrPathOutside},
		{"outside every root", outside, ErrPathOutside},
		{"the filesystem root", "/", ErrPathDenied},
		{"/etc", "/etc", ErrPathDenied},
		{"inside /etc", "/etc/samba", ErrPathDenied},
		{"a configured deny path", filepath.Join(root, "apps/data"), ErrPathDenied},
		{".ssh", filepath.Join(root, ".ssh"), ErrPathDenied},
		{"a file, not a folder", filepath.Join(root, "file.txt"), ErrPathInvalid},
		{"missing", filepath.Join(root, "nope"), ErrPathInvalid},
		{"relative", "media", ErrPathInvalid},
		{"empty", "", ErrPathInvalid},
		{"samba variable characters", filepath.Join(root, "we%ird"), ErrPathInvalid},
		{"newline", filepath.Join(root, "media\nx"), ErrPathInvalid},
	}
	for _, c := range cases {
		got, err := pp.Resolve(c.path)
		if !errors.Is(err, c.want) && !(c.want == nil && err == nil) {
			t.Errorf("%s: %v, want %v", c.name, err, c.want)
		}
		if err == nil && !strings.HasPrefix(got, "/") {
			t.Errorf("%s: result %q", c.name, got)
		}
	}
	if got, _ := pp.Resolve(filepath.Join(root, "alias")); got != filepath.Join(func() string { r, _ := filepath.EvalSymlinks(root); return r }(), "media") {
		t.Errorf("the REAL path must be what gets shared, got %s", got)
	}
	// System locations can't be enabled by configuration, even as a root.
	evil := PathPolicy{Roots: []string{"/"}}
	for _, p := range []string{"/etc", "/root", "/boot", "/proc", "/var/lib"} {
		if _, err := evil.Resolve(p); !errors.Is(err, ErrPathDenied) {
			t.Errorf("%s with root=/ : %v, want denied", p, err)
		}
	}
}

func TestNameValidation(t *testing.T) {
	for _, n := range []string{"alice", "bob-2", "media_user", "a"} {
		if ValidAccountName(n) != nil {
			t.Errorf("account %q should be valid", n)
		}
	}
	for _, n := range []string{"", "Alice", "1abc", "root", "nobody", "admin", "guest", "a b", "a:b", "x;y", strings.Repeat("a", 32), "-rf", "../x"} {
		if ValidAccountName(n) == nil {
			t.Errorf("account %q should be rejected", n)
		}
	}
	for _, n := range []string{"media", "My Files", "docs.2024", "a"} {
		if ValidShareName(n) != nil {
			t.Errorf("share %q should be valid", n)
		}
	}
	for _, n := range []string{"", "global", "HOMES", "print$", "IPC$", "a/b", "a\\b", "[x]", "a=b", ".hidden", "trailing ", "x*", strings.Repeat("a", 81)} {
		if ValidShareName(n) == nil {
			t.Errorf("share %q should be rejected", n)
		}
	}
	if validComment("50% off") == nil || validComment("a\nb") == nil || validComment(strings.Repeat("x", 121)) == nil || validComment("Family photos") != nil {
		t.Error("comment validation")
	}
}

func TestStoreRoundTripPermsAndCorruption(t *testing.T) {
	p := filepath.Join(t.TempDir(), "sharing.yaml")
	s, err := LoadStore(p)
	if err != nil || len(s.Get().Shares) != 0 {
		t.Fatalf("missing file: %v", err)
	}
	m := Model{Accounts: []Account{{Name: "alice", SMB: true}}, Shares: []Share{{Name: "media", Path: "/srv/m", Access: []Access{{"alice", "rw"}}}}, Interfaces: []string{"wlan0"}}
	if err := s.Set(m); err != nil {
		t.Fatal(err)
	}
	if fi, _ := os.Stat(p); fi.Mode().Perm() != 0o600 {
		t.Errorf("mode %v, want 0600", fi.Mode().Perm())
	}
	s2, err := LoadStore(p)
	if err != nil || len(s2.Get().Shares) != 1 || s2.Get().Accounts[0].Name != "alice" || s2.Get().Interfaces[0] != "wlan0" {
		t.Fatalf("reload: %+v %v", s2.Get(), err)
	}
	// Get returns a copy: mutating it must not change the store.
	g := s2.Get()
	g.Shares[0].Name = "hacked"
	g.Accounts[0].Name = "hacked"
	if s2.Get().Shares[0].Name != "media" || s2.Get().Accounts[0].Name != "alice" {
		t.Error("Get() leaks internal state")
	}
	entries, _ := os.ReadDir(filepath.Dir(p))
	for _, e := range entries {
		if strings.Contains(e.Name(), ".tmp") {
			t.Errorf("temp file left behind: %s", e.Name())
		}
	}
	os.WriteFile(p, []byte("shares: [unclosed"), 0o600)
	if _, err := LoadStore(p); err == nil {
		t.Error("a corrupt store must be reported, not silently emptied")
	}
}
