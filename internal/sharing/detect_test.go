package sharing

import (
	"context"
	"encoding/json"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func fixture(t *testing.T, name string) string {
	t.Helper()
	b, err := os.ReadFile(filepath.Join("testdata", name))
	if err != nil {
		t.Fatal(err)
	}
	return string(b)
}

// ---- a scripted command runner ---------------------------------------------------

type fakeRun struct {
	out   map[string]string // "cmd arg arg" → stdout
	fail  map[string]bool
	calls []string
}

func (f *fakeRun) key(name string, args []string) string {
	return strings.TrimSpace(name + " " + strings.Join(args, " "))
}

func (f *fakeRun) Run(_ context.Context, name string, args ...string) (string, error) {
	k := f.key(name, args)
	f.calls = append(f.calls, k)
	// commands are matched by their base name so "/usr/sbin/smbd --version" and "smbd --version" both work
	for pat, o := range f.out {
		if k == pat || strings.HasSuffix(strings.Fields(k)[0], "/"+strings.Fields(pat)[0]) && strings.TrimPrefix(k, strings.Fields(k)[0]) == strings.TrimPrefix(pat, strings.Fields(pat)[0]) {
			if f.fail[pat] {
				return o, &CmdError{Stdout: o, Err: errors.New("exit status 1")}
			}
			return o, nil
		}
	}
	return "", &CmdError{Err: errors.New("not scripted: " + k)}
}

func (f *fakeRun) RunInput(ctx context.Context, _ string, name string, args ...string) (string, error) {
	return f.Run(ctx, name, args...)
}

// newDet builds a Detector over a temp filesystem. present lists the binaries that "exist".
func newDet(t *testing.T, osrelease string, present []string, run *fakeRun) (*Detector, string) {
	t.Helper()
	dir := t.TempDir()
	os.WriteFile(filepath.Join(dir, "os-release"), []byte(osrelease), 0o644)
	os.WriteFile(filepath.Join(dir, "passwd"), []byte("root:x:0:0:root:/root:/bin/bash\nnobody:x:65534:65534::/nonexistent:/usr/sbin/nologin\ntarkiman:x:1000:1000::/home/tarkiman:/bin/bash\nshare1:x:1001:1001::/nonexistent:/usr/sbin/nologin\nalice:x:1002:1002::/home/alice:/bin/zsh\nsvc:x:1003:1003::/x:/bin/false\n"), 0o644)
	os.MkdirAll(filepath.Join(dir, "systemd"), 0o755)
	have := map[string]bool{}
	for _, p := range present {
		have[p] = true
	}
	d := &Detector{
		Run: run, GOOS: "linux",
		Paths: Paths{OSRelease: filepath.Join(dir, "os-release"), SmbConf: filepath.Join(dir, "smb.conf"), SambaDir: dir,
			VsftpdConfs: []string{filepath.Join(dir, "vsftpd.conf")}, Passwd: filepath.Join(dir, "passwd"), SystemdRun: filepath.Join(dir, "systemd")},
		IsRoot: func() bool { return true },
		LookPath: func(n string) (string, error) {
			if have[n] {
				return "/usr/sbin/" + n, nil
			}
			return "", errors.New("not found")
		},
		// Only paths inside the temp dir "exist": the real host (which has smbd, casaos…) must never leak into a test.
		Exists: func(p string) bool { _, err := os.Stat(p); return strings.HasPrefix(p, dir) && err == nil },
		Interfaces: func() []Iface {
			return []Iface{{"wlan0", "wifi", "192.168.1.11"}, {"zt0", "zerotier", "172.22.0.1"}, {"docker0", "docker", "172.17.0.1"}}
		},
	}
	return d, dir
}

func codes(fs []Finding) string {
	var c []string
	for _, f := range fs {
		c = append(c, f.Severity+":"+f.Code)
	}
	return strings.Join(c, ",")
}

func hasFinding(fs []Finding, code string) *Finding {
	for i := range fs {
		if fs[i].Code == code {
			return &fs[i]
		}
	}
	return nil
}

// ---- distro ----------------------------------------------------------------------

func TestOSReleaseFixturesFromRealImages(t *testing.T) {
	cases := []struct {
		file, id string
		family   Family
		pm       string
		smbUnit  string
		install  string
	}{
		{"debian.os-release", "debian", FamilyDebian, "apt", "smbd", "apt-get install -y samba"},
		{"ubuntu.os-release", "ubuntu", FamilyDebian, "apt", "smbd", "apt-get install -y samba"},
		{"fedora.os-release", "fedora", FamilyRHEL, "dnf", "smb", "dnf install -y samba"},
		{"alpine.os-release", "alpine", FamilyAlpine, "apk", "samba", "apk add samba samba-common-tools"},
		{"raspios-pi5.os-release", "debian", FamilyDebian, "apt", "smbd", "apt-get install -y samba"}, // this very Pi
	}
	for _, c := range cases {
		d := ParseOSRelease(fixture(t, "osrelease/"+c.file))
		if d.ID != c.id || d.Family != c.family || d.PkgMgr != c.pm {
			t.Errorf("%s: got %+v", c.file, d)
		}
		if smb, _ := d.SambaUnits(); smb != c.smbUnit {
			t.Errorf("%s: smb unit %q, want %q", c.file, smb, c.smbUnit)
		}
		if got := d.InstallCommand(d.SambaPackages(), true); got != c.install {
			t.Errorf("%s: install (root) = %q, want %q", c.file, got, c.install)
		}
		if got := d.InstallCommand(d.SambaPackages(), false); got != "sudo "+c.install {
			t.Errorf("%s: install (non-root) = %q", c.file, got)
		}
		if d.Name == "" {
			t.Errorf("%s: no pretty name", c.file)
		}
	}
}

func TestOSReleaseDerivativesAndUnknowns(t *testing.T) {
	// Arch has no arm64 image to fetch a real fixture from: assert on its documented os-release.
	arch := ParseOSRelease("NAME=\"Arch Linux\"\nID=arch\nPRETTY_NAME=\"Arch Linux\"\n")
	if arch.Family != FamilyArch || arch.PkgMgr != "pacman" || arch.InstallCommand([]string{"samba"}, true) != "pacman -S --noconfirm samba" {
		t.Errorf("arch: %+v", arch)
	}
	if u, n := arch.SambaUnits(); u != "smb" || n != "nmb" {
		t.Errorf("arch units %s %s", u, n)
	}
	// ID_LIKE fallback: a Debian derivative with an ID we don't know.
	if d := ParseOSRelease("ID=weirdos\nID_LIKE=\"ubuntu debian\"\n"); d.Family != FamilyDebian {
		t.Errorf("ID_LIKE ignored: %+v", d)
	}
	if d := ParseOSRelease("ID=rocky\nID_LIKE=\"rhel centos fedora\"\n"); d.Family != FamilyRHEL {
		t.Errorf("rocky: %+v", d)
	}
	// A distro we can't classify must not produce a made-up install command.
	u := ParseOSRelease("ID=nixos\nPRETTY_NAME=NixOS\n")
	if u.Family != FamilyUnknown || u.InstallCommand([]string{"samba"}, true) != "" {
		t.Errorf("unknown distro: %+v cmd=%q", u, u.InstallCommand([]string{"samba"}, true))
	}
	if d := DetectDistro("/does/not/exist"); d.Family != FamilyUnknown {
		t.Errorf("missing os-release: %+v", d)
	}
}

// ---- parsers on real output ---------------------------------------------------------

func TestParseTestparmOnThisPi(t *testing.T) {
	cfg := ParseTestparm(fixture(t, "testparm-pi.txt"))
	if cfg.Global["map to guest"] != "Bad User" || !isYes(cfg.Global["usershare allow guests"]) {
		t.Fatalf("global = %v", cfg.Global)
	}
	if n := len(cfg.UserShares()); n != 0 {
		t.Fatalf("the Pi has only Samba's built-in sections, got %d user shares: %+v", n, cfg.UserShares())
	}
	if len(cfg.Shares) < 3 { // homes, printers, print$
		t.Fatalf("built-in sections should still be parsed: %+v", cfg.Shares)
	}
}

func TestParseTestparmNormalisationAndDefaults(t *testing.T) {
	cfg := ParseTestparm(fixture(t, "testparm-shares.txt"))
	by := map[string]ShareInfo{}
	for _, s := range cfg.UserShares() {
		by[s.Name] = s
	}
	if len(by) != 3 {
		t.Fatalf("shares = %+v", cfg.Shares)
	}
	media, private, docs := by["media"], by["private"], by["docs"]
	if !media.GuestOK || media.ReadOnly || !media.Browseable || media.Path != "/srv/media" || media.Comment != "Family media" {
		t.Errorf("media = %+v", media)
	}
	// testparm rewrites `writable = yes` as `read only = No`; browseable=No is kept.
	if private.ReadOnly || private.Browseable || private.GuestOK || strings.Join(private.ValidUsers, ",") != "alice,bob" {
		t.Errorf("private = %+v", private)
	}
	// `read only = yes` is Samba's default and testparm omits it: absent must mean read-only.
	if !docs.ReadOnly || !docs.Browseable || strings.Join(docs.ValidUsers, ",") != "@staff" {
		t.Errorf("docs = %+v", docs)
	}
	if cfg.Global["server min protocol"] != "NT1" || cfg.Global["bind interfaces only"] != "Yes" || cfg.Global["idmap config * : backend"] != "tdb" {
		t.Errorf("global = %v", cfg.Global)
	}
	if len(ParseTestparm("").Shares) != 0 {
		t.Error("empty output")
	}
}

func TestParseSSOnThisPi(t *testing.T) {
	ls := ParseSS(fixture(t, "ss-pi.txt"))
	byPort := map[int][]Listener{}
	for _, l := range ls {
		byPort[l.Port] = append(byPort[l.Port], l)
	}
	if len(byPort[445]) != 2 || byPort[445][0].Process != "smbd" || !byPort[445][0].AllInterfaces() || byPort[445][1].Address != "::" {
		t.Fatalf("445 = %+v", byPort[445])
	}
	if ftp := byPort[21]; len(ftp) != 1 || ftp[0].Address != "*" || ftp[0].Process != "vsftpd" || !ftp[0].AllInterfaces() {
		t.Fatalf("21 = %+v", ftp)
	}
	if l := byPort[3306][0]; l.AllInterfaces() || l.Address != "127.0.0.1" || l.Process != "docker-proxy" {
		t.Fatalf("a loopback-only socket must not count as exposed: %+v", l)
	}
	// Without -p (non-root) there are no process names, and that must not break parsing.
	if l := ParseSS("LISTEN 0 50 0.0.0.0:445 0.0.0.0:*\nLISTEN 0 4096 [fe80::1%wlan0]:139 [::]:*\nESTAB 0 0 1.2.3.4:5 6.7.8.9:1\n"); len(l) != 2 || l[0].Process != "" || l[1].Address != "fe80::1" {
		t.Fatalf("no-process parse = %+v", l)
	}
}

func TestParseVsftpdOnThisPi(t *testing.T) {
	c := ftpConfigFrom(ParseVsftpd(fixture(t, "vsftpd-pi.conf")))
	if c.Anonymous || !c.LocalLogin || !c.Write || c.TLS || !c.Chroot || c.UserListMode != "" || c.AnonWrite {
		t.Fatalf("config = %+v", c)
	}
	c2 := ftpConfigFrom(ParseVsftpd("# c\nanonymous_enable=YES\nanon_upload_enable=YES\nssl_enable=yes\nuserlist_enable=YES\nuserlist_deny=NO\npasv_min_port=40000\npasv_max_port=40100\n"))
	if !c2.Anonymous || !c2.AnonWrite || !c2.TLS || c2.UserListMode != "allow" || c2.PasvRange != "40000-40100" {
		t.Fatalf("config2 = %+v", c2)
	}
	if ftpConfigFrom(ParseVsftpd("userlist_enable=YES\n")).UserListMode != "deny" {
		t.Error("userlist_enable without userlist_deny is a deny-list")
	}
}

// ---- the three real-world cases ----------------------------------------------------------

func TestCaseNotInstalledGivesADistroSpecificCommand(t *testing.T) {
	for _, tc := range []struct{ file, want string }{
		{"debian.os-release", "apt-get install -y samba"},
		{"fedora.os-release", "dnf install -y samba"},
		{"alpine.os-release", "apk add samba samba-common-tools"},
	} {
		d, _ := newDet(t, fixture(t, "osrelease/"+tc.file), nil, &fakeRun{out: map[string]string{"ss -ltnpH": ""}})
		st := d.Detect(context.Background())
		if st.SMB.Installed || st.FTP.Installed || st.SMB.CanManage || st.SMB.ManageBlocked != "not_installed" {
			t.Fatalf("%s: %+v", tc.file, st.SMB)
		}
		if st.SMB.Install.Command != tc.want || !strings.Contains(st.FTP.Install.Command, "vsftpd") {
			t.Errorf("%s: install hints smb=%q ftp=%q", tc.file, st.SMB.Install.Command, st.FTP.Install.Command)
		}
		if len(st.Findings) != 0 {
			t.Errorf("%s: nothing installed, nothing to warn about: %s", tc.file, codes(st.Findings))
		}
	}
	// Not root → the hint carries sudo.
	d, _ := newDet(t, fixture(t, "osrelease/debian.os-release"), nil, &fakeRun{out: map[string]string{"ss -ltnpH": ""}})
	d.IsRoot = func() bool { return false }
	if c := d.Detect(context.Background()).SMB.Install.Command; c != "sudo apt-get install -y samba" {
		t.Errorf("non-root hint = %q", c)
	}
}

func TestCaseInstalledButEmpty(t *testing.T) {
	run := &fakeRun{out: map[string]string{
		"ss -ltnpH":                "",
		"smbd --version":           "Version 4.17.12-Debian\n",
		"systemctl is-active smbd": "inactive\n", "systemctl is-enabled smbd": "disabled\n",
		"systemctl is-active nmbd": "inactive\n",
		"testparm -s":              fixture(t, "testparm-debian-default.txt"),
		"pdbedit -L":               "",
	}, fail: map[string]bool{"systemctl is-active smbd": true, "systemctl is-active nmbd": true}}
	d, _ := newDet(t, fixture(t, "osrelease/debian.os-release"), []string{"smbd", "testparm", "pdbedit", "smbpasswd", "useradd"}, run)
	os.MkdirAll(d.Paths.SystemdRun, 0o755)
	st := d.Detect(context.Background())
	if !st.SMB.Installed || st.SMB.Active || st.SMB.Managed || st.SMB.Version != "4.17.12-Debian" || !st.SMB.CanManage || !st.SMB.UsersKnown || len(st.SMB.Users) != 0 {
		t.Fatalf("smb = %+v", st.SMB)
	}
	if len(st.Findings) != 0 {
		t.Fatalf("a stopped, empty Samba has nothing to warn about: %s", codes(st.Findings))
	}
}

func TestCaseRunningWithSomeoneElsesConfig(t *testing.T) {
	run := &fakeRun{out: map[string]string{
		"ss -ltnpH":                fixture(t, "ss-pi.txt"),
		"smbd --version":           "Version 4.17.12-Debian\n",
		"systemctl is-active smbd": "active\n", "systemctl is-enabled smbd": "enabled\n", "systemctl is-active nmbd": "active\n",
		"systemctl is-active vsftpd": "active\n", "systemctl is-enabled vsftpd": "enabled\n",
		"testparm -s": fixture(t, "testparm-shares.txt"), "pdbedit -L": "alice:1002:Alice\nbob:1003:\n",
	}}
	d, dir := newDet(t, fixture(t, "osrelease/debian.os-release"), []string{"smbd", "testparm", "pdbedit", "smbpasswd", "useradd", "vsftpd", "proftpd"}, run)
	os.WriteFile(filepath.Join(dir, "vsftpd.conf"), []byte(fixture(t, "vsftpd-pi.conf")), 0o644)
	st := d.Detect(context.Background())

	if !st.SMB.Active || st.SMB.Managed || len(st.SMB.Shares) != 3 || strings.Join(st.SMB.Users, ",") != "alice,bob" {
		t.Fatalf("smb = %+v", st.SMB)
	}
	for _, sh := range st.SMB.Shares {
		if sh.Managed {
			t.Errorf("share %s is someone else's, must not be flagged managed", sh.Name)
		}
	}
	got := codes(st.Findings)
	for _, want := range []string{
		"high:ftp_plaintext_local_login", // live FTP + local_enable + no TLS + real login users
		"warn:smb_guest_share", "warn:smb_legacy_protocol", "warn:ftp_all_interfaces", "info:no_firewall", "info:ftp_other_server",
	} {
		if !strings.Contains(got, want) {
			t.Errorf("missing %s in %s", want, got)
		}
	}
	// SMB is bound to specific interfaces here (bind interfaces only + interfaces list) → no exposure warning for SMB.
	if hasFinding(st.Findings, "smb_all_interfaces") != nil {
		t.Errorf("SMB restricts its interfaces, must not warn: %s", got)
	}
	if f := hasFinding(st.Findings, "ftp_plaintext_local_login"); f == nil || !strings.Contains(f.Params["users"].(string), "tarkiman") || strings.Contains(f.Params["users"].(string), "share1") || strings.Contains(f.Params["users"].(string), "svc") {
		t.Errorf("login users must list real login accounts only: %+v", f)
	}
	// The highest severity comes first.
	if st.Findings[0].Severity != SevHigh {
		t.Errorf("findings not sorted by severity: %s", got)
	}
}

func TestManagedStateIsDetectedFromTheMarkersAndOurFile(t *testing.T) {
	run := &fakeRun{out: map[string]string{
		"ss -ltnpH": "", "smbd --version": "Version 4.17.12\n", "systemctl is-active smbd": "active\n", "systemctl is-enabled smbd": "enabled\n", "systemctl is-active nmbd": "active\n",
		"testparm -s": fixture(t, "testparm-shares.txt"), "pdbedit -L": "",
	}}
	d, dir := newDet(t, fixture(t, "osrelease/debian.os-release"), []string{"smbd", "testparm", "pdbedit", "smbpasswd", "useradd"}, run)
	os.WriteFile(filepath.Join(dir, "smb.conf"), []byte("[global]\n   workgroup = HOME\n"+markBegin+"\n   include = "+dir+"/taros-global.conf\n"+markEnd+"\n"), 0o644)
	os.WriteFile(filepath.Join(dir, managedSharesFile), []byte("[media]\n   path = /srv/media\n"), 0o644)
	st := d.Detect(context.Background())
	if !st.SMB.Managed {
		t.Fatal("markers present but not detected as managed")
	}
	managed := map[string]bool{}
	for _, s := range st.SMB.Shares {
		managed[s.Name] = s.Managed
	}
	if !managed["media"] || managed["private"] || managed["docs"] {
		t.Fatalf("only the share in TarOS's own file is managed: %+v", managed)
	}
}

func TestLimitedViewWithoutRootAndOnOtherPlatforms(t *testing.T) {
	run := &fakeRun{out: map[string]string{"ss -ltnpH": "", "ss -ltnH": "", "smbd --version": "Version 4.17.12\n", "testparm -s": fixture(t, "testparm-debian-default.txt")}}
	d, _ := newDet(t, fixture(t, "osrelease/debian.os-release"), []string{"smbd", "testparm", "pdbedit", "smbpasswd", "useradd"}, run)
	d.IsRoot = func() bool { return false }
	st := d.Detect(context.Background())
	if st.SMB.CanManage || st.SMB.ManageBlocked != "not_root" || st.SMB.UsersKnown || st.Firewall.Kind != "unknown" {
		t.Fatalf("non-root: %+v fw=%+v", st.SMB, st.Firewall)
	}
	if hasFinding(st.Findings, "not_root") == nil {
		t.Fatalf("view-only mode must say why: %s", codes(st.Findings))
	}
	for _, c := range run.calls {
		if strings.HasPrefix(c, "pdbedit") || strings.HasPrefix(c, "ufw") || strings.HasPrefix(c, "nft") {
			t.Fatalf("non-root must not even try %q", c)
		}
	}

	m := &Detector{GOOS: "darwin", IsRoot: func() bool { return true }, Interfaces: func() []Iface { return nil }}
	if st := m.Detect(context.Background()); st.Supported || st.Reason != "not_linux" || st.Findings == nil {
		t.Fatalf("darwin: %+v", st)
	}
}

func TestADMemberIsNeverManaged(t *testing.T) {
	run := &fakeRun{out: map[string]string{"ss -ltnpH": "", "smbd --version": "Version 4.19\n", "testparm -s": "[global]\n\tsecurity = ADS\n\tserver role = member server\n\trealm = CORP.EXAMPLE\n", "pdbedit -L": ""}}
	d, _ := newDet(t, fixture(t, "osrelease/debian.os-release"), []string{"smbd", "testparm", "pdbedit", "smbpasswd", "useradd"}, run)
	st := d.Detect(context.Background())
	if st.SMB.Standalone || st.SMB.CanManage || st.SMB.ManageBlocked != "not_standalone" {
		t.Fatalf("a domain member must be left alone: %+v", st.SMB)
	}
	if hasFinding(st.Findings, "smb_not_standalone") == nil {
		t.Fatal("say why")
	}
}

// ---- findings, one by one -------------------------------------------------------------------

func TestFindingRules(t *testing.T) {
	base := func() Status {
		return Status{Supported: true, Root: true, Firewall: Firewall{Kind: "none"},
			Interfaces: []Iface{{"wlan0", "wifi", "10.0.0.2"}, {"zt0", "zerotier", "172.22.0.1"}},
			SMB:        SMBStatus{Installed: true, Standalone: true, Active: true, Listeners: []Listener{{Address: "0.0.0.0", Port: 445, Process: "smbd"}}},
			FTP:        FTPStatus{Installed: true, Active: true, Listeners: []Listener{{Address: "*", Port: 21, Process: "vsftpd"}}, LoginUsers: []string{"bob"}}}
	}
	type tc struct {
		name   string
		mut    func(*Status)
		want   string // "sev:code" that must appear
		absent string // code that must not
	}
	cases := []tc{
		{"exposed on zerotier", func(s *Status) {}, "warn:smb_all_interfaces", ""},
		{"restricted interfaces", func(s *Status) { s.SMB.Global = SMBGlobal{BindOnly: true, Interfaces: []string{"lo", "wlan0"}} }, "", "smb_all_interfaces"},
		{"bind only without a list is not a restriction", func(s *Status) { s.SMB.Global = SMBGlobal{BindOnly: true} }, "warn:smb_all_interfaces", ""},
		{"no non-LAN interface → nothing to expose to", func(s *Status) { s.Interfaces = []Iface{{"wlan0", "wifi", "10.0.0.2"}} }, "", "smb_all_interfaces"},
		{"legacy protocol", func(s *Status) { s.SMB.Global.MinProtocol = "NT1" }, "warn:smb_legacy_protocol", ""},
		{"modern protocol", func(s *Status) { s.SMB.Global.MinProtocol = "SMB2_10" }, "", "smb_legacy_protocol"},
		{"guest share", func(s *Status) { s.SMB.Shares = []ShareInfo{{Name: "pub", GuestOK: true}} }, "warn:smb_guest_share", ""},
		{"running with no shares", func(s *Status) {}, "info:smb_running_no_shares", ""},
		{"managed empty is expected", func(s *Status) { s.SMB.Managed = true }, "", "smb_running_no_shares"},
		{"live plaintext FTP with real logins", func(s *Status) { s.FTP.Config = FTPConfig{LocalLogin: true} }, "high:ftp_plaintext_local_login", ""},
		{"same config but stopped is only a warning", func(s *Status) { s.FTP.Config = FTPConfig{LocalLogin: true}; s.FTP.Active = false }, "warn:ftp_plaintext_local_login", ""},
		{"TLS required", func(s *Status) { s.FTP.Config = FTPConfig{LocalLogin: true, TLS: true, ForceTLS: true} }, "", "ftp_plaintext_local_login"},
		{"TLS only offered: clear text still gets in", func(s *Status) { s.FTP.Config = FTPConfig{LocalLogin: true, TLS: true} }, "ftp_plaintext_local_login", ""},
		{"local logins but nobody has a shell", func(s *Status) { s.FTP.Config = FTPConfig{LocalLogin: true}; s.FTP.LoginUsers = nil }, "", "ftp_plaintext_local_login"},
		{"anonymous read", func(s *Status) { s.FTP.Config = FTPConfig{Anonymous: true} }, "warn:ftp_anonymous", ""},
		{"anonymous write outranks anonymous", func(s *Status) { s.FTP.Config = FTPConfig{Anonymous: true, AnonWrite: true} }, "high:ftp_anonymous_write", "ftp_anonymous"},
		{"port taken by another process", func(s *Status) {
			s.SMB.Active = false
			s.SMB.Listeners = []Listener{{Address: "0.0.0.0", Port: 445, Process: "docker-proxy"}}
		}, "warn:port_conflict", ""},
		{"port held by smbd itself while inactive is not a conflict", func(s *Status) { s.SMB.Active = false }, "", "port_conflict"},
		{"port with an unknown owner is not accused", func(s *Status) {
			s.SMB.Active = false
			s.SMB.Listeners = []Listener{{Address: "0.0.0.0", Port: 445}}
		}, "", "port_conflict"},
		{"firewall active", func(s *Status) { s.Firewall = Firewall{Kind: "ufw", Active: true} }, "", "no_firewall"},
		{"selinux", func(s *Status) { s.SELinux = "enforcing" }, "info:selinux_enforcing", ""},
		{"other manager", func(s *Status) { s.Managers = []string{"CasaOS", "Webmin"} }, "info:other_manager", ""},
		{"not installed → silent", func(s *Status) { s.SMB = SMBStatus{}; s.FTP = FTPStatus{} }, "", "smb_all_interfaces"},
	}
	for _, c := range cases {
		st := base()
		c.mut(&st)
		fs := ComputeFindings(st)
		if c.want != "" && !strings.Contains(codes(fs), c.want) {
			t.Errorf("%s: want %s, got %s", c.name, c.want, codes(fs))
		}
		if c.absent != "" && hasFinding(fs, c.absent) != nil {
			t.Errorf("%s: %s must be absent, got %s", c.name, c.absent, codes(fs))
		}
	}
}

func TestInputDropDetection(t *testing.T) {
	if !inputDrops("table inet filter {\n\tchain input {\n\t\ttype filter hook input priority filter; policy drop;\n\t}\n}") {
		t.Error("policy drop on input not recognised")
	}
	// Docker/Tailscale add forward/nat chains and even input accept chains: those don't shield anything.
	if inputDrops("table ip nat {\n\tchain PREROUTING { type nat hook prerouting priority dstnat; policy accept; }\n}\ntable inet filter {\n\tchain input { type filter hook input priority 0; policy accept; }\n}") {
		t.Error("input policy accept misread as a firewall")
	}
}

func TestDockerBridgesAreNotAnExposureButVPNsAre(t *testing.T) {
	st := Status{Root: true, Firewall: Firewall{Kind: "none"},
		Interfaces: []Iface{{"wlan0", "wifi", "10.0.0.2"}, {"docker0", "docker", "172.17.0.1"}, {"br-a", "docker", "172.18.0.1"}, {"br-b", "docker", "172.19.0.1"}},
		SMB:        SMBStatus{Installed: true, Standalone: true, Active: true, Managed: true, Listeners: []Listener{{Address: "0.0.0.0", Port: 445}}}}
	if hasFinding(ComputeFindings(st), "smb_all_interfaces") != nil {
		t.Fatal("containers reaching the host over their bridge is normal, not an exposure")
	}
	st.Interfaces = append(st.Interfaces, Iface{"zt0", "zerotier", "172.22.0.1"}, Iface{"tailscale0", "tailscale", "100.64.0.1"})
	f := hasFinding(ComputeFindings(st), "smb_all_interfaces")
	if f == nil || f.Params["interfaces"] != "tailscale0, zt0" {
		t.Fatalf("VPN/overlay networks are the exposure that matters, and only they should be named: %+v", f)
	}
}

func TestNoFirewallIsSaidOncePerHost(t *testing.T) {
	st := Status{Root: true, Firewall: Firewall{Kind: "none"},
		SMB: SMBStatus{Installed: true, Standalone: true, Active: true, Managed: true, Listeners: []Listener{{Address: "0.0.0.0", Port: 445}}},
		FTP: FTPStatus{Installed: true, Active: true, Listeners: []Listener{{Address: "*", Port: 21}}}}
	n := 0
	for _, f := range ComputeFindings(st) {
		if f.Code == "no_firewall" {
			n++
			if f.Service != "" {
				t.Errorf("no_firewall is about the host, got service %q", f.Service)
			}
		}
	}
	if n != 1 {
		t.Fatalf("no_firewall reported %d times", n)
	}
	// Nothing listening on every interface → nothing to shield.
	st.SMB.Listeners = []Listener{{Address: "192.168.1.11", Port: 445}}
	st.FTP.Listeners = []Listener{{Address: "192.168.1.11", Port: 21}}
	if hasFinding(ComputeFindings(st), "no_firewall") != nil {
		t.Fatal("services bound to one address don't need the firewall hint")
	}
}

func TestAlpineStyleAdduserCountsAsAWayToCreateUsers(t *testing.T) {
	run := &fakeRun{out: map[string]string{"ss -ltnpH": "", "smbd --version": "Version 4.19.9\n", "testparm -s": fixture(t, "testparm-debian-default.txt"), "pdbedit -L": ""}}
	// no useradd, but adduser (busybox) is there
	d, _ := newDet(t, fixture(t, "osrelease/alpine.os-release"), []string{"smbd", "testparm", "pdbedit", "smbpasswd", "adduser"}, run)
	if st := d.Detect(context.Background()); !st.SMB.CanManage || st.SMB.ManageBlocked != "" {
		t.Fatalf("Alpine with adduser must be manageable: %+v", st.SMB)
	}
	// Neither → blocked with a specific reason.
	d2, _ := newDet(t, fixture(t, "osrelease/alpine.os-release"), []string{"smbd", "testparm", "pdbedit", "smbpasswd"}, run)
	if st := d2.Detect(context.Background()); st.SMB.CanManage || st.SMB.ManageBlocked != "no_tools" {
		t.Fatalf("no way to create users: %+v", st.SMB)
	}
}

func TestUserBackendChoice(t *testing.T) {
	has := func(names ...string) func(string) (string, error) {
		return func(n string) (string, error) {
			for _, x := range names {
				if x == n {
					return "/usr/sbin/" + n, nil
				}
			}
			return "", errors.New("no")
		}
	}
	if _, ok := NewUserBackend(&fakeRun{}, has("useradd", "adduser", "nologin")).(*shadowUsers); !ok {
		t.Error("shadow-utils preferred when both exist")
	}
	if _, ok := NewUserBackend(&fakeRun{}, has("adduser")).(*busyboxUsers); !ok {
		t.Error("busybox adduser when only that exists")
	}
	if NewUserBackend(&fakeRun{}, has()) != nil {
		t.Error("neither → nil, so callers can say so instead of crashing")
	}
}

// The UI iterates every list it is sent; a Go nil slice would arrive as null and
// blow up the page on exactly the hosts where nothing is installed yet.
func TestJSONNeverCarriesNullLists(t *testing.T) {
	d, _ := newDet(t, fixture(t, "osrelease/debian.os-release"), nil, &fakeRun{out: map[string]string{"ss -ltnpH": ""}})
	st := d.Detect(context.Background())
	for name, v := range map[string]any{"status": st, "model": NewStore(filepath.Join(t.TempDir(), "s.yaml")).Get()} {
		raw, err := json.Marshal(v)
		if err != nil {
			t.Fatal(err)
		}
		var tree any
		_ = json.Unmarshal(raw, &tree)
		var walk func(path string, n any)
		walk = func(path string, n any) {
			switch x := n.(type) {
			case nil:
				// optional scalars are omitted, so a bare null is always a nil slice/map
				if !strings.HasSuffix(path, ".packages") { // install.packages is only informational
					t.Errorf("%s: %s is null", name, path)
				}
			case map[string]any:
				for k, c := range x {
					walk(path+"."+k, c)
				}
			case []any:
				for i, c := range x {
					walk(path+"["+string(rune('0'+i%10))+"]", c)
				}
			}
		}
		walk("", tree)
	}
}
