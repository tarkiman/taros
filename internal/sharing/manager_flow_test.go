package sharing

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

var bg = context.Background()

func TestGuards(t *testing.T) {
	r := newRig(t)
	// Not adopted yet: anything beyond Adopt is refused.
	if err := r.m.AddAccount(bg, "alice", "correct-horse-9"); !errors.Is(err, ErrNotManaged) {
		t.Errorf("AddAccount before adopting: %v, want ErrNotManaged", err)
	}
	if err := r.m.SaveShare(bg, r.shareOf("media", Access{"alice", "rw"}), ""); !errors.Is(err, ErrNotManaged) {
		t.Errorf("SaveShare before adopting: %v", err)
	}
	// Not root → nothing at all.
	r.m.Det.IsRoot = func() bool { return false }
	if err := r.m.Adopt(bg, nil); !errors.Is(err, ErrCannotManage) {
		t.Errorf("Adopt without root: %v", err)
	}
	r.m.Det.IsRoot = func() bool { return true }
	if len(r.sys.called("useradd")) != 0 || fileExists(filepath.Join(r.dir, managedSharesFile)) {
		t.Fatal("a refused request must not have changed anything")
	}
	// A domain member is never managed.
	r.sys.smbConf = filepath.Join(r.dir, "ads.conf")
	os.WriteFile(r.sys.smbConf, []byte("[global]\n   security = ADS\n   server role = member server\n"), 0o644)
	if err := r.m.Adopt(bg, nil); !errors.Is(err, ErrCannotManage) {
		t.Errorf("Adopt on an AD member: %v", err)
	}
}

func TestAdoptTouchesOnlyWhatItAdds(t *testing.T) {
	r := newRig(t)
	orig := r.read(r.conf)
	r.adopt()

	conf := r.read(r.conf)
	if !HasIncludes(conf, r.dir) || RemoveIncludes(conf) != orig {
		t.Fatal("smb.conf must be the original plus TarOS's blocks, nothing else")
	}
	if g := r.read(filepath.Join(r.dir, managedGlobalFile)); !strings.Contains(g, "interfaces = lo wlan0") || !strings.Contains(g, "restrict anonymous = 2") {
		t.Errorf("global file:\n%s", g)
	}
	if !fileExists(filepath.Join(r.dir, managedSharesFile)) {
		t.Error("shares file not written")
	}
	if r.read(r.conf+".taros-original") != orig {
		t.Error("the pristine original must be kept for a byte-exact restore")
	}
	if got := r.store.Get().Interfaces; len(got) != 1 || got[0] != "wlan0" {
		t.Errorf("store = %+v", r.store.Get())
	}
	// Idempotent, and no candidate/temp litter.
	r.adopt()
	if strings.Count(r.read(r.conf), markBegin) != 2 {
		t.Error("second adopt duplicated the blocks")
	}
	entries, _ := os.ReadDir(r.dir)
	for _, e := range entries {
		if strings.Contains(e.Name(), "candidate") || strings.Contains(e.Name(), ".taros-tmp") || strings.Contains(e.Name(), "taros-check") {
			t.Errorf("litter left behind: %s", e.Name())
		}
	}
	// The interface must exist.
	if err := r.m.Adopt(bg, []string{"nope0"}); !errors.Is(err, ErrInterface) {
		t.Errorf("unknown interface: %v", err)
	}
	if err := r.m.Adopt(bg, []string{"wlan0; rm -rf /"}); !errors.Is(err, ErrInterface) {
		t.Errorf("injection through the interface name: %v", err)
	}
}

func TestAddAccountNeverPutsThePasswordOnACommandLine(t *testing.T) {
	r := newRig(t)
	r.adopt()
	const pw = "s3cret-Passw0rd!"
	if err := r.m.AddAccount(bg, "alice", pw); err != nil {
		t.Fatal(err)
	}
	for _, c := range r.sys.calls {
		if strings.Contains(c, pw) {
			t.Fatalf("password leaked into a command line: %q", c)
		}
	}
	// It arrived on stdin, twice (new + retype), which is what `smbpasswd -s` reads.
	if in := r.sys.stdin["smbpasswd -a -s alice"]; in != pw+"\n"+pw+"\n" {
		t.Errorf("smbpasswd stdin = %q", in)
	}
	// A locked, shell-less, home-less user in the taros-share group — and nothing else about it.
	if u := r.sys.called("useradd"); len(u) != 1 || u[0] != "useradd -M -N -d /nonexistent -g taros-share -s /usr/sbin/nologin -c TarOS file sharing account alice" {
		t.Errorf("useradd = %v", u)
	}
	if r.sys.users["alice"] != "taros-share" || !r.sys.groups["taros-share"] {
		t.Errorf("users=%v groups=%v", r.sys.users, r.sys.groups)
	}
	if acc, ok := r.store.Get().account("alice"); !ok || !acc.SMB || acc.CreatedAt.IsZero() {
		t.Errorf("model = %+v", r.store.Get().Accounts)
	}
	// The store on disk never contains a password either.
	if strings.Contains(r.read(filepath.Join(r.dir, "sharing.yaml")), pw) {
		t.Error("password persisted")
	}
}

func TestAddAccountRefusals(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")
	users := len(r.sys.users)
	for _, tc := range []struct {
		name, pw string
		want     error
	}{
		{"alice", "correct-horse-9", ErrAccountExists},    // already ours
		{"tarkiman", "correct-horse-9", ErrAccountExists}, // a real system user: never adopted or reset
		{"root", "correct-horse-9", ErrAccountName},
		{"Bad Name", "correct-horse-9", ErrAccountName},
		{"bob", "short", ErrPasswordWeak},
		{"bob", "has\nnewline-in-it", nil}, // rejected, but not with the weak-password error
	} {
		err := r.m.AddAccount(bg, tc.name, tc.pw)
		if tc.want != nil && !errors.Is(err, tc.want) || tc.want == nil && err == nil {
			t.Errorf("%s/%q: %v, want %v", tc.name, tc.pw, err, tc.want)
		}
	}
	if len(r.sys.users) != users {
		t.Errorf("a refused account created a system user: %v", r.sys.users)
	}
	if got := r.sys.called("smbpasswd"); len(got) != 1 { // only alice's
		t.Errorf("smbpasswd called for a refused account: %v", got)
	}
}

func TestAddAccountRollsBackAHalfMadeAccount(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.sys.fail["smbpasswd"] = errors.New("passdb backend unavailable")
	if err := r.m.AddAccount(bg, "carol", "correct-horse-9"); err == nil {
		t.Fatal("expected failure")
	}
	if _, still := r.sys.users["carol"]; still {
		t.Error("the system user was left behind after smbpasswd failed")
	}
	if _, ok := r.store.Get().account("carol"); ok {
		t.Error("a failed account was recorded")
	}
}

func TestDeleteAccountOnlyEverRemovesUsersItCreated(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")

	// Someone re-purposed the name: the system user "alice" now belongs to a different group.
	r.sys.users["alice"] = "staff"
	if err := r.m.DeleteAccount(bg, "alice"); err != nil {
		t.Fatal(err)
	}
	if _, still := r.sys.users["alice"]; !still {
		t.Fatal("deleted a system user that TarOS did not create")
	}
	if len(r.sys.called("userdel")) != 0 || len(r.sys.called("smbpasswd -x")) != 0 {
		t.Errorf("must not touch it: %v", r.sys.calls)
	}
	if _, ok := r.store.Get().account("alice"); ok {
		t.Error("the model entry should still be dropped")
	}

	r.account("bob")
	if err := r.m.DeleteAccount(bg, "bob"); err != nil {
		t.Fatal(err)
	}
	if _, still := r.sys.users["bob"]; still || len(r.sys.called("smbpasswd -x bob")) != 1 {
		t.Errorf("our own account should be fully removed: users=%v calls=%v", r.sys.users, r.sys.called("smbpasswd"))
	}
	if err := r.m.DeleteAccount(bg, "ghost"); !errors.Is(err, ErrAccountMissing) {
		t.Errorf("unknown account: %v", err)
	}
}

func TestDeleteAccountRefusedWhileASharesUsesIt(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")
	if err := r.m.SaveShare(bg, r.shareOf("media", Access{"alice", "rw"}), ""); err != nil {
		t.Fatal(err)
	}
	err := r.m.DeleteAccount(bg, "alice")
	if !errors.Is(err, ErrAccountInUse) || !strings.Contains(err.Error(), "media") {
		t.Errorf("%v", err)
	}
	if _, ok := r.sys.users["alice"]; !ok {
		t.Error("user removed despite the refusal")
	}
}

func TestSetDisabledAndPassword(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")
	if err := r.m.SetDisabled(bg, "alice", true); err != nil {
		t.Fatal(err)
	}
	if acc, _ := r.store.Get().account("alice"); !acc.Disabled || len(r.sys.called("smbpasswd -d alice")) != 1 {
		t.Errorf("disable: %+v %v", acc, r.sys.calls)
	}
	// A disabled account can't be newly granted access to a share.
	if err := r.m.SaveShare(bg, r.shareOf("media", Access{"alice", "ro"}), ""); !errors.Is(err, ErrShareUser) {
		t.Errorf("share for a disabled account: %v", err)
	}
	_ = r.m.SetDisabled(bg, "alice", false)
	if len(r.sys.called("smbpasswd -e alice")) != 1 {
		t.Error("enable not issued")
	}
	if err := r.m.SetPassword(bg, "alice", "another-Passw0rd"); err != nil {
		t.Fatal(err)
	}
	if in := r.sys.stdin["smbpasswd -s alice"]; in != "another-Passw0rd\nanother-Passw0rd\n" {
		t.Errorf("stdin = %q", in)
	}
	if err := r.m.SetPassword(bg, "alice", "x"); !errors.Is(err, ErrPasswordWeak) {
		t.Errorf("weak: %v", err)
	}
	if err := r.m.SetPassword(bg, "ghost", "another-Passw0rd"); !errors.Is(err, ErrAccountMissing) {
		t.Errorf("unknown: %v", err)
	}
}

// ---- shares --------------------------------------------------------------------------

func TestSaveShareHappyPathAndAccessModes(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")
	r.account("bob")
	sh := r.shareOf("media", Access{"bob", "ro"}, Access{"alice", "rw"})
	sh.Comment = "Family media"
	if err := r.m.SaveShare(bg, sh, ""); err != nil {
		t.Fatal(err)
	}
	live := r.read(filepath.Join(r.dir, managedSharesFile))
	for _, want := range []string{"[media]", "valid users = alice bob", "write list = alice", "force user = tarkiman", "guest ok = no"} {
		if !strings.Contains(live, want) {
			t.Errorf("missing %q:\n%s", want, live)
		}
	}
	got := r.store.Get().Shares
	if len(got) != 1 || got[0].Path != filepath.Join(r.data, "media") {
		t.Fatalf("model = %+v", got)
	}
	// Update in place and rename.
	sh2 := r.shareOf("movies", Access{"alice", "ro"})
	if err := r.m.SaveShare(bg, sh2, "media"); err != nil {
		t.Fatal(err)
	}
	live = r.read(filepath.Join(r.dir, managedSharesFile))
	if strings.Contains(live, "[media]") || !strings.Contains(live, "[movies]") || len(r.store.Get().Shares) != 1 {
		t.Errorf("rename:\n%s", live)
	}
	// Delete: the share goes, the folder stays.
	if err := r.m.DeleteShare(bg, "movies"); err != nil {
		t.Fatal(err)
	}
	if strings.Contains(r.read(filepath.Join(r.dir, managedSharesFile)), "[movies]") || !fileExists(filepath.Join(r.data, "media")) {
		t.Error("delete")
	}
	if err := r.m.DeleteShare(bg, "movies"); !errors.Is(err, ErrShareMissing) {
		t.Errorf("delete twice: %v", err)
	}
}

func TestSaveShareRefusals(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")
	for _, n := range []string{"media", "docs"} {
		if err := r.m.SaveShare(bg, r.shareOf(n, Access{"alice", "rw"}), ""); err != nil {
			t.Fatal(err)
		}
	}
	cases := []struct {
		name string
		mut  func(*Share)
		repl string
		want error
	}{
		{"duplicate name", func(s *Share) {}, "", ErrShareExists},
		{"duplicate ignoring case", func(s *Share) { s.Name = "MEDIA" }, "", ErrShareExists},
		{"reserved name", func(s *Share) { s.Name = "global" }, "", ErrShareName},
		{"a share named like someone else's", func(s *Share) { s.Name = "printers" }, "", ErrShareName},
		{"no accounts", func(s *Share) { s.Name = "n1"; s.Access = nil }, "", ErrShareNoAccess},
		{"unknown account", func(s *Share) { s.Name = "n2"; s.Access = []Access{{"ghost", "rw"}} }, "", ErrShareUser},
		{"bad mode", func(s *Share) { s.Name = "n3"; s.Access = []Access{{"alice", "admin"}} }, "", ErrShareMode},
		{"path outside the allowed roots", func(s *Share) { s.Name = "n4"; s.Path = "/tmp" }, "", ErrPathOutside},
		{"system path", func(s *Share) { s.Name = "n5"; s.Path = "/etc" }, "", ErrPathDenied},
		{"bad comment", func(s *Share) { s.Name = "n6"; s.Comment = "100%" }, "", ErrComment},
		{"unknown run-as", func(s *Share) { s.Name = "n7"; s.RunAs = "ghost" }, "", ErrRunAs},
		{"run-as root", func(s *Share) { s.Name = "n8"; s.RunAs = "root" }, "", ErrRunAs},
		{"edit something that does not exist", func(s *Share) { s.Name = "n9" }, "nothing", ErrShareMissing},
		{"rename onto an existing share", func(s *Share) { s.Name = "media" }, "docs", ErrShareExists},
	}
	before := r.read(filepath.Join(r.dir, managedSharesFile))
	for _, c := range cases {
		s := r.shareOf("media", Access{"alice", "rw"}) // every case starts from a valid share and breaks one thing
		c.mut(&s)
		if err := r.m.SaveShare(bg, s, c.repl); !errors.Is(err, c.want) {
			t.Errorf("%s: %v, want %v", c.name, err, c.want)
		}
	}
	if r.read(filepath.Join(r.dir, managedSharesFile)) != before || len(r.store.Get().Shares) != 2 {
		t.Error("a refused request changed the live configuration")
	}
}

func TestShareOwnedByRootNeedsAnExplicitRunAs(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")
	r.m.Owner = func(string) (Owner, error) { return Owner{User: "root", Group: "root", UID: 0}, nil }
	sh := r.shareOf("media", Access{"alice", "rw"})
	if err := r.m.SaveShare(bg, sh, ""); !errors.Is(err, ErrOwnedByRoot) {
		t.Fatalf("a root-owned folder must never be served as root: %v", err)
	}
	sh.RunAs = "alice-sys"
	if err := r.m.SaveShare(bg, sh, ""); err != nil {
		t.Fatalf("with an explicit non-root user it is fine: %v", err)
	}
	if !strings.Contains(r.read(filepath.Join(r.dir, managedSharesFile)), "force user = alice-sys") {
		t.Error("run-as not applied")
	}
}

func TestSomeoneElsesShareNameIsNotOverwritten(t *testing.T) {
	r := newRig(t)
	os.WriteFile(r.conf, []byte(r.read(r.conf)+"\n[backup]\n   path = /srv/backup\n   valid users = carol\n"), 0o644)
	r.adopt()
	r.account("alice")
	if err := r.m.SaveShare(bg, r.shareOf("backup", Access{"alice", "rw"}), ""); !errors.Is(err, ErrNameForeign) {
		t.Fatalf("shadowing a foreign share: %v", err)
	}
	if !strings.Contains(r.read(r.conf), "[backup]") {
		t.Error("the foreign share vanished")
	}
}

// ---- a change Samba would reject never reaches the live files ------------------------------------

func TestRejectedChangeLeavesLiveFilesUntouched(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")
	if err := r.m.SaveShare(bg, r.shareOf("media", Access{"alice", "rw"}), ""); err != nil {
		t.Fatal(err)
	}
	live := func() string {
		return r.read(r.conf) + "|" + r.read(filepath.Join(r.dir, managedGlobalFile)) + "|" + r.read(filepath.Join(r.dir, managedSharesFile))
	}
	before := live()
	storeBefore := r.read(filepath.Join(r.dir, "sharing.yaml"))

	// (a) testparm refuses the candidate.
	r.sys.fail["testparm -s "+filepath.Join(r.dir, ".smb.conf.taros-check")] = errors.New("Unknown parameter encountered: \"bogus\"")
	err := r.m.SaveShare(bg, r.shareOf("docs", Access{"alice", "ro"}), "")
	var ae *ApplyError
	if !errors.As(err, &ae) || !strings.Contains(ae.Output, "Unknown parameter") {
		t.Fatalf("want an ApplyError carrying Samba's message, got %v", err)
	}
	delete(r.sys.fail, "testparm -s "+filepath.Join(r.dir, ".smb.conf.taros-check"))
	if live() != before || r.read(filepath.Join(r.dir, "sharing.yaml")) != storeBefore {
		t.Error("(a) the live files or the store changed after a rejected candidate")
	}

	// (b) testparm exits 0 but silently ignored a parameter (unknown parameters are only warnings):
	// the effective config no longer says "alice may write", which is a security-relevant difference.
	r.sys.dropKey = "write list"
	err = r.m.SaveShare(bg, r.shareOf("docs", Access{"alice", "rw"}), "")
	if !errors.As(err, &ae) || !strings.Contains(ae.Output, "write list") {
		t.Fatalf("a silently-ignored parameter must be caught, got %v", err)
	}
	r.sys.dropKey = ""
	if live() != before {
		t.Error("(b) live files changed")
	}

	// (c) the final check of the live configuration fails after the swap → everything is rolled back.
	r.sys.tpFail = r.sys.tpCalls + 1 // the very next real (no-path) testparm call — the post-swap check — fails
	err = r.m.SaveShare(bg, r.shareOf("docs", Access{"alice", "ro"}), "")
	if !errors.As(err, &ae) {
		t.Fatalf("(c) %v", err)
	}
	r.sys.tpFail = 0
	if live() != before {
		t.Errorf("(c) the swap was not rolled back:\n%s\n----\n%s", before, live())
	}
	if len(r.store.Get().Shares) != 1 {
		t.Error("(c) store changed")
	}
}

func TestReloadOnlyWhenRunning(t *testing.T) {
	r := newRig(t)
	r.adopt()
	if len(r.sys.called("smbcontrol")) != 0 {
		t.Error("reloaded a service that isn't running")
	}
	r.sys.active = true
	r.account("alice")
	if err := r.m.SaveShare(bg, r.shareOf("media", Access{"alice", "rw"}), ""); err != nil {
		t.Fatal(err)
	}
	if c := r.sys.called("smbcontrol"); len(c) != 1 || c[0] != "smbcontrol smbd reload-config" {
		t.Errorf("reload = %v", c)
	}
}

// ---- unadopt ----------------------------------------------------------------------------------

func TestUnadoptRestoresTheOriginalByteForByte(t *testing.T) {
	r := newRig(t)
	orig := r.read(r.conf)
	r.adopt()
	r.account("alice")
	if err := r.m.SaveShare(bg, r.shareOf("media", Access{"alice", "rw"}), ""); err != nil {
		t.Fatal(err)
	}
	if err := r.m.Unadopt(bg, false); err != nil {
		t.Fatal(err)
	}
	if r.read(r.conf) != orig {
		t.Errorf("smb.conf is not back to the original")
	}
	for _, f := range []string{managedGlobalFile, managedSharesFile} {
		if fileExists(filepath.Join(r.dir, f)) {
			t.Errorf("%s left behind", f)
		}
	}
	if fileExists(r.conf + ".taros-original") {
		t.Error("the original backup should be consumed")
	}
	if !fileExists(filepath.Join(r.data, "media")) {
		t.Fatal("the shared folder itself must never be touched")
	}
	// Accounts are kept unless asked otherwise.
	if _, ok := r.sys.users["alice"]; !ok || len(r.store.Get().Accounts) != 1 || len(r.store.Get().Shares) != 0 {
		t.Errorf("accounts=%v model=%+v", r.sys.users, r.store.Get())
	}
}

func TestUnadoptKeepsTheUsersOwnEditsMadeAfterwards(t *testing.T) {
	r := newRig(t)
	r.adopt()
	edited := r.read(r.conf) + "\n[mine]\n   path = /srv/mine\n"
	edited = strings.Replace(edited, "workgroup = WORKGROUP", "workgroup = OFFICE", 1)
	os.WriteFile(r.conf, []byte(edited), 0o644)
	if err := r.m.Unadopt(bg, false); err != nil {
		t.Fatal(err)
	}
	got := r.read(r.conf)
	if HasIncludes(got, r.dir) || !strings.Contains(got, "[mine]") || !strings.Contains(got, "workgroup = OFFICE") {
		t.Errorf("only TarOS's blocks may be cut; the user's later edits must survive:\n%s", got)
	}
}

func TestUnadoptWithAccountsRemovesOnlyOurs(t *testing.T) {
	r := newRig(t)
	r.adopt()
	r.account("alice")
	r.account("bob")
	r.sys.users["bob"] = "staff" // no longer a share account
	if err := r.m.Unadopt(bg, true); err != nil {
		t.Fatal(err)
	}
	if _, ok := r.sys.users["alice"]; ok {
		t.Error("alice should be gone")
	}
	if _, ok := r.sys.users["bob"]; !ok {
		t.Error("bob's system user is not ours any more and must be left alone")
	}
	if _, ok := r.sys.users["tarkiman"]; !ok || len(r.store.Get().Accounts) != 0 {
		t.Errorf("users=%v", r.sys.users)
	}
}

// ---- service ------------------------------------------------------------------------------------

func TestService(t *testing.T) {
	r := newRig(t)
	for _, a := range []string{"start", "stop", "restart", "enable", "disable"} {
		if err := r.m.Service(bg, a); err != nil {
			t.Errorf("%s: %v", a, err)
		}
	}
	if c := r.sys.called("systemctl start"); len(c) != 2 || c[0] != "systemctl start smbd" || c[1] != "systemctl start nmbd" {
		t.Errorf("start = %v", c)
	}
	for _, bad := range []string{"", "reboot", "start; rm -rf /", "mask"} {
		if err := r.m.Service(bg, bad); !errors.Is(err, ErrServiceAction) {
			t.Errorf("%q: %v", bad, err)
		}
	}
	if len(r.sys.called("systemctl reboot")) != 0 {
		t.Fatal("an unknown action reached systemctl")
	}
	os.RemoveAll(r.m.Det.Paths.SystemdRun)
	if err := r.m.Service(bg, "start"); !errors.Is(err, ErrNoSystemd) {
		t.Errorf("no systemd: %v", err)
	}
}

func TestOneChangeAtATime(t *testing.T) {
	r := newRig(t)
	r.adopt()
	done := make(chan error, 8)
	for i := 0; i < 8; i++ {
		name := string(rune('a' + i))
		go func() { done <- r.m.AddAccount(bg, "user"+name, "correct-horse-9") }()
	}
	for i := 0; i < 8; i++ {
		if err := <-done; err != nil {
			t.Error(err)
		}
	}
	if n := len(r.store.Get().Accounts); n != 8 {
		t.Fatalf("%d accounts recorded, want 8 (a lost update means changes overlapped)", n)
	}
}

func TestUnadoptRestoresAnAwkwardOriginalExactly(t *testing.T) {
	// No trailing newline, CRLF line endings and odd spacing: removing TarOS's blocks
	// can't reproduce that by text surgery alone — the pristine copy has to.
	r := newRig(t)
	awkward := "[global]\r\n   workgroup = W\r\n\r\n[share]\r\n   path = /srv/x   "
	os.WriteFile(r.conf, []byte(awkward), 0o644)
	r.adopt()
	if r.read(r.conf) == awkward {
		t.Fatal("adopt did nothing")
	}
	if err := r.m.Unadopt(bg, false); err != nil {
		t.Fatal(err)
	}
	if got := r.read(r.conf); got != awkward {
		t.Errorf("not byte-exact:\n%q\n%q", awkward, got)
	}
}
