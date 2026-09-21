package sharing

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// ---- the rig: a host with vsftpd ----------------------------------------------------

type ftpRig struct {
	*rig
	vconf   string // vsftpd.conf
	vdir    string // /etc/vsftpd
	pamDir  string
	rejects []string // substrings the fake vsftpd refuses to start on
}

func newFTPRig(t *testing.T, conf string) *ftpRig {
	t.Helper()
	r := &ftpRig{rig: newRig(t)}
	r.vdir = filepath.Join(r.dir, "vsftpd")
	r.pamDir = filepath.Join(r.dir, "pam.d")
	r.vconf = filepath.Join(r.dir, "vsftpd.conf")
	os.MkdirAll(r.pamDir, 0o755)
	os.WriteFile(filepath.Join(r.pamDir, "vsftpd"), []byte(fixture(t, "pam/vsftpd-debian")), 0o644)
	if err := os.WriteFile(r.vconf, []byte(conf), 0o644); err != nil {
		t.Fatal(err)
	}
	r.m.Det.Paths.VsftpdConfs = []string{r.vconf}
	r.m.Det.Paths.VsftpdDir = r.vdir
	r.m.Det.Paths.PamDir = r.pamDir
	// A vsftpd that refuses unknown options and a missing certificate, like the real one.
	r.m.ProbeFTP = func(_ context.Context, path string) error {
		b, _ := os.ReadFile(path)
		for _, bad := range r.rejects {
			if strings.Contains(string(b), bad) {
				return &FTPApplyError{Output: "500 OOPS: unrecognised variable " + bad}
			}
		}
		eff := ParseVsftpd(string(b))
		if isYes(eff["ssl_enable"]) && eff["rsa_cert_file"] != "" && !fileExists(eff["rsa_cert_file"]) {
			return &FTPApplyError{Output: "500 OOPS: SSL: cannot load RSA certificate"}
		}
		return nil
	}
	return r
}

func (r *ftpRig) piConf() string { return fixture(r.t, "vsftpd-pi.conf") }

func (r *ftpRig) read(p string) string {
	b, _ := os.ReadFile(p)
	return string(b)
}

func (r *ftpRig) adoptFTP() {
	r.t.Helper()
	if err := r.m.FTPAdopt(context.Background()); err != nil {
		r.t.Fatal(err)
	}
}

// ftpAccount makes an account and gives it FTP access to `folder` under the data dir.
func (r *ftpRig) ftpAccount(name, folder, mode string) {
	r.t.Helper()
	r.account(name)
	if err := r.m.SetFTPAccess(context.Background(), name, FTPAccess{Path: filepath.Join(r.data, folder), Mode: mode}, "correct-horse-9"); err != nil {
		r.t.Fatal(err)
	}
}

func (r *ftpRig) snapshotTree() map[string]string {
	out := map[string]string{}
	filepath.Walk(r.dir, func(p string, fi os.FileInfo, err error) error {
		if err == nil && !fi.IsDir() && !strings.HasSuffix(p, "sharing.yaml") {
			b, _ := os.ReadFile(p)
			out[p] = string(b)
		}
		return nil
	})
	return out
}

func sameTree(t *testing.T, before, after map[string]string) {
	t.Helper()
	for p, v := range before {
		if a, ok := after[p]; !ok || a != v {
			t.Errorf("%s changed or vanished", p)
		}
	}
	for p := range after {
		if _, ok := before[p]; !ok {
			t.Errorf("%s appeared", p)
		}
	}
}

// ---- adopting ----------------------------------------------------------------------------

func TestFTPAdoptOnAHostThatAlreadyJailsEveryoneAddsOnlyTheEssentials(t *testing.T) {
	r := newFTPRig(t, "")
	r.m.Det.Paths.VsftpdConfs = []string{r.vconf}
	os.WriteFile(r.vconf, []byte(r.piConf()), 0o644)
	r.adoptFTP()

	got := r.read(r.vconf)
	if !strings.HasPrefix(got, r.piConf()) {
		t.Fatal("everything that was in vsftpd.conf must still be there, untouched, above the block")
	}
	block := got[len(r.piConf()):]
	for _, want := range []string{"user_config_dir=" + r.vdir + "/taros-users", "pam_service_name=taros-vsftpd"} {
		if !strings.Contains(block, want) {
			t.Errorf("block lacks %q:\n%s", want, block)
		}
	}
	// The Pi already chroots everybody and lets local users in: none of that may be repeated or changed.
	for _, unwanted := range []string{"chroot_list", "userlist", "local_enable", "anonymous_enable", "ssl_enable", "pasv_", "write_enable"} {
		if strings.Contains(block, unwanted) {
			t.Errorf("adopting must not touch %s on this host:\n%s", unwanted, block)
		}
	}
	if o := r.read(r.vconf + ".taros-original"); o != r.piConf() {
		t.Error("the original must be kept verbatim")
	}
	pam := r.read(filepath.Join(r.pamDir, "taros-vsftpd"))
	i, j := strings.Index(pam, "pam_succeed_if.so quiet user ingroup taros-share"), strings.Index(pam, "pam_shells.so")
	if i < 0 || j < 0 || i > j {
		t.Errorf("the taros-share skip must come right before pam_shells:\n%s", pam)
	}
	if strings.Count(pam, "pam_shells.so") != 1 {
		t.Error("pam_shells must stay in place for everybody else")
	}
}

func TestFTPAdoptAdaptsToTheHost(t *testing.T) {
	t.Run("host that jails nobody: TarOS jails its own accounts by list", func(t *testing.T) {
		r := newFTPRig(t, "listen=YES\nlocal_enable=YES\nwrite_enable=YES\n")
		r.adoptFTP()
		b := r.read(r.vconf)
		if !strings.Contains(b, "chroot_list_enable=YES") || !strings.Contains(b, "chroot_list_file="+r.vdir+"/taros-chroot") {
			t.Errorf("expected a chroot list:\n%s", b)
		}
		if strings.Contains(b, "chroot_local_user") {
			t.Error("chroot_local_user must not be switched on for everybody")
		}
		if !fileExists(filepath.Join(r.vdir, "taros-chroot")) {
			t.Error("the chroot list file must exist")
		}
	})
	t.Run("local logins off: stay off for device users", func(t *testing.T) {
		r := newFTPRig(t, "listen=YES\nlocal_enable=NO\nchroot_local_user=YES\n")
		r.adoptFTP()
		b := r.read(r.vconf)
		if !strings.Contains(b, "local_enable=YES") || !strings.Contains(b, "userlist_deny=NO") || !strings.Contains(b, "userlist_file="+r.vdir+"/taros-allowed") {
			t.Errorf("local logins must be paired with an allow-list of TarOS accounts:\n%s", b)
		}
		if r.read(filepath.Join(r.vdir, "taros-allowed")) != "\n" {
			t.Error("with no accounts yet the allow-list is empty: nobody gets in")
		}
	})
	t.Run("someone else's chroot list: refuse", func(t *testing.T) {
		r := newFTPRig(t, "chroot_local_user=NO\nchroot_list_enable=YES\nchroot_list_file=/etc/vsftpd.chroot_list\n")
		before := r.snapshotTree()
		err := r.m.FTPAdopt(context.Background())
		if !errors.Is(err, ErrCannotManage) || !strings.Contains(err.Error(), "chroot_custom") {
			t.Fatalf("got %v", err)
		}
		sameTree(t, before, r.snapshotTree())
	})
}

func TestFTPCannotBeManagedWhenItShouldNot(t *testing.T) {
	r := newFTPRig(t, "chroot_local_user=YES\n")
	r.m.Det.IsRoot = func() bool { return false }
	if err := r.m.FTPAdopt(context.Background()); !errors.Is(err, ErrCannotManage) || !strings.Contains(err.Error(), "not_root") {
		t.Errorf("not root: %v", err)
	}
	r.m.Det.IsRoot = func() bool { return true }
	os.Remove(filepath.Join(r.pamDir, "vsftpd"))
	if err := r.m.FTPAdopt(context.Background()); !errors.Is(err, ErrCannotManage) || !strings.Contains(err.Error(), "no_pam") {
		t.Errorf("no PAM service: %v", err)
	}
	if err := r.m.SetFTPSettings(context.Background(), FTPSettings{}); !errors.Is(err, ErrCannotManage) {
		t.Errorf("settings on a host that cannot be managed: %v", err)
	}
}

func TestFTPOperationsNeedAdoptionFirst(t *testing.T) {
	r := newFTPRig(t, "chroot_local_user=YES\nlocal_enable=YES\n")
	ctx := context.Background()
	if err := r.m.SetFTPSettings(ctx, FTPSettings{}); !errors.Is(err, ErrFTPNotManaged) {
		t.Errorf("settings: %v", err)
	}
	if err := r.m.SetFTPAccess(ctx, "x", FTPAccess{Path: r.data, Mode: "ro"}, "correct-horse-9"); !errors.Is(err, ErrFTPNotManaged) {
		t.Errorf("access: %v", err)
	}
	if err := r.m.ServiceOf(ctx, "ftp", "start"); err != nil && !errors.Is(err, ErrNoSystemd) {
		t.Errorf("the service may be controlled before adoption, got %v", err)
	}
}

// ---- accounts ------------------------------------------------------------------------------

func TestFTPAccessWritesTheAccountsFolderAndOwner(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	r.ftpAccount("family", "media", "rw")
	r.ftpAccount("guest2", "docs", "ro")

	fam := r.read(filepath.Join(r.vdir, "taros-users", "family"))
	for _, want := range []string{"local_root=" + filepath.Join(r.data, "media"), "guest_enable=YES", "guest_username=tarkiman", "virtual_use_local_privs=YES", "write_enable=YES", "allow_writeable_chroot=YES"} {
		if !strings.Contains(fam, want) {
			t.Errorf("family lacks %q:\n%s", want, fam)
		}
	}
	if g := r.read(filepath.Join(r.vdir, "taros-users", "guest2")); !strings.Contains(g, "write_enable=NO") {
		t.Errorf("read-only account must not be able to write:\n%s", g)
	}
	// The password reaches chpasswd on stdin and nowhere else.
	if in := r.sys.stdin["chpasswd"]; in != "family:correct-horse-9\n" && in != "guest2:correct-horse-9\n" {
		t.Errorf("chpasswd stdin = %q", in)
	}
	for _, c := range r.sys.calls {
		if strings.Contains(c, "correct-horse-9") {
			t.Errorf("a password appeared on a command line: %q", c)
		}
	}
	mdl := r.store.Get()
	if a, _ := mdl.account("family"); a.FTP == nil || a.FTP.Mode != "rw" {
		t.Errorf("model not updated: %+v", a)
	}
}

func r0(t *testing.T) string { t.Helper(); return fixture(t, "vsftpd-pi.conf") }

func TestFTPAccessRefusals(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	r.account("family")
	ctx := context.Background()
	ok := func() FTPAccess { return FTPAccess{Path: filepath.Join(r.data, "media"), Mode: "rw"} }
	before := r.snapshotTree()

	bad := ok()
	bad.Mode = "x"
	if err := r.m.SetFTPAccess(ctx, "family", bad, "correct-horse-9"); !errors.Is(err, ErrShareMode) {
		t.Errorf("mode: %v", err)
	}
	bad = ok()
	bad.Path = "/etc"
	if err := r.m.SetFTPAccess(ctx, "family", bad, "correct-horse-9"); err == nil {
		t.Error("/etc must never be reachable over FTP")
	}
	bad = ok()
	bad.Path = "/tmp"
	if err := r.m.SetFTPAccess(ctx, "family", bad, "correct-horse-9"); !errors.Is(err, ErrPathOutside) {
		t.Errorf("outside the allowed roots: %v", err)
	}
	if err := r.m.SetFTPAccess(ctx, "family", ok(), ""); !errors.Is(err, ErrPasswordWeak) {
		t.Errorf("the first grant needs a password: %v", err)
	}
	if err := r.m.SetFTPAccess(ctx, "family", ok(), "short"); !errors.Is(err, ErrPasswordWeak) {
		t.Errorf("weak password: %v", err)
	}
	if err := r.m.SetFTPAccess(ctx, "nobody", ok(), "correct-horse-9"); !errors.Is(err, ErrAccountMissing) {
		t.Errorf("unknown account: %v", err)
	}
	ru := ok()
	ru.RunAs = "root"
	if err := r.m.SetFTPAccess(ctx, "family", ru, "correct-horse-9"); !errors.Is(err, ErrRunAs) {
		t.Errorf("running as root: %v", err)
	}
	r.m.Owner = func(string) (Owner, error) { return Owner{User: "root", Group: "root", UID: 0}, nil }
	if err := r.m.SetFTPAccess(ctx, "family", ok(), "correct-horse-9"); !errors.Is(err, ErrOwnedByRoot) {
		t.Errorf("root-owned folder: %v", err)
	}
	sameTree(t, before, r.snapshotTree())
	if len(r.sys.called("chpasswd")) != 0 {
		t.Error("no password may be set for a refused request")
	}
}

func TestFTPDisabledAndDeletedAccountsLoseTheirFolder(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	r.ftpAccount("family", "media", "rw")
	ctx := context.Background()
	f := filepath.Join(r.vdir, "taros-users", "family")

	if err := r.m.SetDisabled(ctx, "family", true); err != nil {
		t.Fatal(err)
	}
	if fileExists(f) {
		t.Error("a disabled account must have no FTP folder")
	}
	if len(r.sys.called("passwd -l family")) != 1 {
		t.Errorf("the Linux password must be locked: %v", r.sys.calls)
	}
	if err := r.m.SetDisabled(ctx, "family", false); err != nil {
		t.Fatal(err)
	}
	if !fileExists(f) || len(r.sys.called("passwd -u family")) != 1 {
		t.Error("re-enabling brings the folder and the password back")
	}
	if err := r.m.DeleteAccount(ctx, "family"); err != nil {
		t.Fatal(err)
	}
	if fileExists(f) {
		t.Error("a deleted account's folder must go with it")
	}
	if _, ok := r.store.Get().account("family"); ok {
		t.Error("account still in the model")
	}
}

func TestFTPClearAccessLocksThePassword(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	r.ftpAccount("family", "media", "rw")
	if err := r.m.ClearFTPAccess(context.Background(), "family"); err != nil {
		t.Fatal(err)
	}
	if fileExists(filepath.Join(r.vdir, "taros-users", "family")) || len(r.sys.called("passwd -l family")) != 1 {
		t.Error("access must be gone and the password locked")
	}
	if _, ok := r.store.Get().account("family"); !ok {
		t.Error("the account itself stays")
	}
}

func TestPasswordChangeReachesEveryLoginTheAccountHas(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adopt()
	r.adoptFTP()
	r.ftpAccount("family", "media", "rw")
	r.account("plain") // SMB only
	ctx := context.Background()
	r.sys.calls = nil
	r.sys.stdin = map[string]string{}
	if err := r.m.SetPassword(ctx, "family", "new-password-1"); err != nil {
		t.Fatal(err)
	}
	if r.sys.stdin["chpasswd"] != "family:new-password-1\n" || len(r.sys.called("smbpasswd -s family")) != 1 {
		t.Errorf("both Samba and Linux password must change: %v", r.sys.calls)
	}
	r.sys.calls = nil
	r.sys.stdin = map[string]string{}
	if err := r.m.SetPassword(ctx, "plain", "new-password-2"); err != nil {
		t.Fatal(err)
	}
	if len(r.sys.called("chpasswd")) != 0 {
		t.Error("an account without FTP access must not get a Linux password")
	}
}

func TestPasswordChangeOnADisabledFTPAccountStaysLocked(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	r.ftpAccount("family", "media", "rw")
	ctx := context.Background()
	if err := r.m.SetDisabled(ctx, "family", true); err != nil {
		t.Fatal(err)
	}
	r.sys.calls = nil
	if err := r.m.SetPassword(ctx, "family", "new-password-1"); err != nil {
		t.Fatal(err)
	}
	calls := strings.Join(r.sys.calls, "|")
	if !strings.Contains(calls, "chpasswd") || strings.Index(calls, "passwd -l family") < strings.Index(calls, "chpasswd") || !strings.Contains(calls, "passwd -l family") {
		t.Errorf("a new hash must be locked again straight after it is set, or the account is quietly re-enabled: %v", r.sys.calls)
	}
}

func TestAccountsWorkWithFTPAloneAndSMBLater(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP() // Samba is not adopted at all
	r.account("family")
	if len(r.sys.called("smbpasswd")) != 0 {
		t.Error("no Samba password without Samba being managed")
	}
	if a, _ := r.store.Get().account("family"); a.SMB {
		t.Error("the account has no SMB login yet")
	}
	r.adopt()
	err := r.m.SaveShare(context.Background(), Share{Name: "S", Path: filepath.Join(r.data, "media"), Access: []Access{{User: "family", Mode: "rw"}}}, "")
	if !errors.Is(err, ErrShareUser) {
		t.Errorf("an account with no SMB password cannot be put on a share: %v", err)
	}
	if err := r.m.SetPassword(context.Background(), "family", "new-password-1"); err != nil {
		t.Fatal(err)
	}
	if a, _ := r.store.Get().account("family"); !a.SMB {
		t.Error("setting a password with Samba managed gives the account an SMB login")
	}
	if err := r.m.SaveShare(context.Background(), Share{Name: "S", Path: filepath.Join(r.data, "media"), Access: []Access{{User: "family", Mode: "rw"}}}, ""); err != nil {
		t.Errorf("now it can: %v", err)
	}
}

// ---- settings --------------------------------------------------------------------------------

func TestFTPSettingsBlock(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	ctx := context.Background()

	if err := r.m.SetFTPSettings(ctx, FTPSettings{OnlyAccounts: true}); !errors.Is(err, ErrFTPNoAccounts) {
		t.Errorf("locking everybody out must be refused: %v", err)
	}
	for _, bad := range []FTPSettings{{TLS: "maybe"}, {PasvMin: 100, PasvMax: 200}, {PasvMin: 5000, PasvMax: 4000}, {PasvMin: 2000, PasvMax: 9000}} {
		if err := r.m.SetFTPSettings(ctx, bad); !errors.Is(err, ErrFTPSettings) {
			t.Errorf("%+v: %v", bad, err)
		}
	}

	r.ftpAccount("family", "media", "rw")
	if err := r.m.SetFTPSettings(ctx, FTPSettings{TLS: "required", OnlyAccounts: true, NoAnonymous: true, PasvMin: 40000, PasvMax: 40050}); err != nil {
		t.Fatal(err)
	}
	b := r.read(r.vconf)
	for _, want := range []string{"ssl_enable=YES", "force_local_logins_ssl=YES", "force_local_data_ssl=YES", "userlist_enable=YES", "userlist_deny=NO",
		"userlist_file=" + r.vdir + "/taros-allowed", "anonymous_enable=NO", "pasv_min_port=40000", "pasv_max_port=40050", "ssl_sslv3=NO"} {
		if !strings.Contains(b, want) {
			t.Errorf("missing %q", want)
		}
	}
	if strings.Contains(b, "ssl_tlsv1_1") {
		t.Error("only options every vsftpd version accepts")
	}
	if got := r.read(filepath.Join(r.vdir, "taros-allowed")); got != "family\n" {
		t.Errorf("allow-list = %q", got)
	}
	pemData := r.read(filepath.Join(r.vdir, "taros-ftps.pem"))
	if !strings.Contains(pemData, "BEGIN CERTIFICATE") || !strings.Contains(pemData, "PRIVATE KEY") {
		t.Error("a certificate and key must have been generated")
	}
	if fi, err := os.Stat(filepath.Join(r.vdir, "taros-ftps.pem")); err != nil || fi.Mode().Perm() != 0o600 {
		t.Errorf("the key file must be private: %v %v", fi, err)
	}
	mdl := r.store.Get()
	if !mdl.FTP.OnlyAccounts || mdl.FTP.TLS != "required" {
		t.Errorf("settings not stored: %+v", mdl.FTP)
	}

	// Optional TLS keeps plain FTP working; and the certificate is kept, not regenerated.
	if err := r.m.SetFTPSettings(ctx, FTPSettings{TLS: "optional"}); err != nil {
		t.Fatal(err)
	}
	b = r.read(r.vconf)
	if !strings.Contains(b, "force_local_logins_ssl=NO") || strings.Contains(b, "userlist_file") {
		t.Errorf("optional TLS, no allow-list:\n%s", b)
	}
	if r.read(filepath.Join(r.vdir, "taros-ftps.pem")) != pemData {
		t.Error("the certificate must survive settings changes")
	}
	if fileExists(filepath.Join(r.vdir, "taros-allowed")) {
		t.Error("the allow-list file goes when the mode is switched off")
	}
	// Above the block nothing ever changes.
	if !strings.HasPrefix(b, r.piConf()) {
		t.Error("the admin's own lines must be untouched")
	}
}

// ---- refusals leave the machine exactly as it was ------------------------------------------------

func TestFTPConfigVsftpdRejectsChangesNothing(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	r.ftpAccount("family", "media", "rw")
	before := r.snapshotTree()

	r.rejects = []string{"ssl_ciphers=HIGH"} // this "vsftpd" refuses the TLS options
	err := r.m.SetFTPSettings(context.Background(), FTPSettings{TLS: "optional"})
	var ae *FTPApplyError
	if !errors.As(err, &ae) {
		t.Fatalf("got %v", err)
	}
	sameTree(t, before, r.snapshotTree())
	if r.store.Get().FTP.TLS != "" {
		t.Error("a rejected change must not be stored")
	}
}

func TestFTPRestartFailureRollsBack(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	r.ftpAccount("family", "media", "rw")
	r.sys.active = true // vsftpd is running, so a restart is attempted
	before := r.snapshotTree()

	r.sys.fail["systemctl restart"] = errors.New("Job for vsftpd.service failed")
	err := r.m.SetFTPSettings(context.Background(), FTPSettings{TLS: "required"})
	if err == nil {
		t.Fatal("expected failure")
	}
	sameTree(t, before, r.snapshotTree())
	if n := len(r.sys.called("systemctl restart")); n != 2 {
		t.Errorf("after failing, the old configuration must be brought back up: %d restarts", n)
	}
	if r.store.Get().FTP.TLS != "" {
		t.Error("not stored")
	}
}

func TestFTPStoppedServiceIsLeftStopped(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.sys.active = false
	r.adoptFTP()
	if len(r.sys.called("systemctl restart")) != 0 {
		t.Error("a stopped service must not be started by a config change")
	}
	r.sys.active = true
	r.ftpAccount("family", "media", "rw")
	if len(r.sys.called("systemctl restart vsftpd")) == 0 {
		t.Error("a running service must be restarted to pick the change up")
	}
}

// ---- unadopting -----------------------------------------------------------------------------------

func TestFTPUnadoptRestoresTheOriginalByteForByte(t *testing.T) {
	for name, orig := range map[string]string{
		"the Pi's":             fixture(t, "vsftpd-pi.conf"),
		"no trailing newline":  "listen=YES\nlocal_enable=YES\nchroot_local_user=YES",
		"trailing blank lines": "listen=YES\nchroot_local_user=YES\n\n\n",
		"CRLF and odd spacing": "listen=YES\r\n  local_enable = YES\r\nchroot_local_user=YES\r\n",
	} {
		t.Run(name, func(t *testing.T) {
			r := newFTPRig(t, orig)
			r.adoptFTP()
			r.ftpAccount("family", "media", "rw")
			if err := r.m.SetFTPSettings(context.Background(), FTPSettings{TLS: "optional"}); err != nil {
				t.Fatal(err)
			}
			if err := r.m.FTPUnadopt(context.Background()); err != nil {
				t.Fatal(err)
			}
			if got := r.read(r.vconf); got != orig {
				t.Errorf("not restored byte for byte:\n%q\nvs\n%q", got, orig)
			}
			for _, gone := range []string{filepath.Join(r.vdir, "taros-users", "family"), filepath.Join(r.vdir, "taros-ftps.pem"), filepath.Join(r.pamDir, "taros-vsftpd"), r.vconf + ".taros-original"} {
				if fileExists(gone) {
					t.Errorf("%s should be gone", gone)
				}
			}
			if len(r.sys.called("passwd -l family")) == 0 {
				t.Error("the Linux password of FTP accounts must be locked")
			}
			a, ok := r.store.Get().account("family")
			if !ok || a.FTP != nil {
				t.Errorf("the account stays, without FTP access: %+v", a)
			}
			if (r.store.Get().FTP != FTPSettings{}) {
				t.Error("settings reset")
			}
		})
	}
}

func TestFTPUnadoptAfterTheAdminEditedTheFile(t *testing.T) {
	r := newFTPRig(t, r0(t))
	r.adoptFTP()
	edited := "# my edit\n" + r.read(r.vconf)
	os.WriteFile(r.vconf, []byte(edited), 0o644)
	if err := r.m.FTPUnadopt(context.Background()); err != nil {
		t.Fatal(err)
	}
	if got := r.read(r.vconf); got != "# my edit\n"+r.piConf() || hasFTPBlock(got) {
		t.Errorf("only TarOS's block may be cut out:\n%s", got)
	}
}

// ---- pieces ---------------------------------------------------------------------------------------------

func TestPAMFor(t *testing.T) {
	got := PAMFor("auth\trequired\tpam_listfile.so item=user sense=deny file=/etc/ftpusers\nauth\trequired\tpam_shells.so\n")
	if strings.Count(got, "pam_succeed_if.so quiet user ingroup taros-share") != 1 || !strings.Contains(got, "\nauth\trequired\tpam_shells.so\n") {
		t.Errorf("%s", got)
	}
	if PAMFor(PAMFor("auth required pam_shells.so\n")) != PAMFor(PAMFor("auth required pam_shells.so\n")) {
		t.Error("deterministic")
	}
	// A stack without pam_shells (some distributions) needs no help.
	if strings.Contains(PAMFor("auth required pam_unix.so\n"), "pam_succeed_if") {
		t.Error("nothing to skip")
	}
	// A commented pam_shells is not a rule.
	if strings.Contains(PAMFor("# auth required pam_shells.so\n"), "pam_succeed_if") {
		t.Error("comments are left alone")
	}
}

func TestStripAndAppendBlock(t *testing.T) {
	block := markBegin + "\nx=1\n" + markEnd + "\n"
	for _, base := range []string{"a=1\n", "a=1", "", "a=1\n\n"} {
		conf := appendFTPBlock(base, block)
		if !hasFTPBlock(conf) {
			t.Errorf("%q: block not found", base)
		}
		if got := stripFTPBlock(conf); strings.TrimRight(got, "\n") != strings.TrimRight(base, "\n") {
			t.Errorf("%q → %q", base, got)
		}
	}
	if isAccountsOnly(ParseVsftpd("userlist_enable=YES\nuserlist_deny=NO\nuserlist_file=/etc/vsftpd/taros-allowed\n"), "/etc/vsftpd") != true {
		t.Error("allow-list of TarOS's own")
	}
	if isAccountsOnly(ParseVsftpd("userlist_enable=YES\nuserlist_deny=NO\nuserlist_file=/etc/vsftpd/user_list\n"), "/etc/vsftpd") {
		t.Error("someone else's allow-list is not TarOS's")
	}
}

func TestGeneratedCertificateIsUsable(t *testing.T) {
	b, err := GenerateFTPCert("trexmen", time.Date(2026, 9, 21, 12, 0, 0, 0, time.UTC))
	if err != nil {
		t.Fatal(err)
	}
	s := string(b)
	if strings.Count(s, "BEGIN") != 2 || !strings.Contains(s, "BEGIN CERTIFICATE") || !strings.Contains(s, "BEGIN RSA PRIVATE KEY") {
		t.Error("expected certificate and key in one PEM")
	}
}

// ---- detection --------------------------------------------------------------------------------------

func TestFTPDetectionTracksManagement(t *testing.T) {
	r := newFTPRig(t, r0(t))
	os.WriteFile(r.m.Det.Paths.Passwd, []byte("root:x:0:0::/root:/bin/bash\ntarkiman:x:1000:1000::/home/tarkiman:/bin/bash\n"), 0o644)
	ctx := context.Background()

	st := r.m.Det.FTP(ctx)
	if !st.Installed || st.Managed || !st.CanManage || st.ManageBlocked != "" {
		t.Fatalf("fresh: %+v", st)
	}
	if len(st.LoginUsers) != 1 {
		t.Errorf("device users can log in: %v", st.LoginUsers)
	}

	r.adoptFTP()
	st = r.m.Det.FTP(ctx)
	if !st.Managed || st.Config.AccountsOnly || len(st.LoginUsers) != 1 {
		t.Errorf("adopting alone changes nobody's access: %+v", st)
	}

	r.ftpAccount("family", "media", "rw")
	if err := r.m.SetFTPSettings(ctx, FTPSettings{OnlyAccounts: true, TLS: "required"}); err != nil {
		t.Fatal(err)
	}
	st = r.m.Det.FTP(ctx)
	if !st.Config.AccountsOnly || len(st.LoginUsers) != 0 || !st.Config.ForceTLS {
		t.Errorf("accounts-only + TLS: %+v", st.Config)
	}
	fs := ComputeFindings(Status{FTP: st, SMB: SMBStatus{}, Root: true})
	if hasFinding(fs, "ftp_plaintext_local_login") != nil {
		t.Errorf("no clear-text device logins remain: %s", codes(fs))
	}
}

func TestFTPBlockedReasons(t *testing.T) {
	r := newFTPRig(t, r0(t))
	ctx := context.Background()
	if r.m.Det.FTP(ctx).ManageBlocked != "" {
		t.Fatal("baseline should be manageable")
	}
	r.m.Det.Paths.VsftpdConfs = []string{filepath.Join(r.dir, "nope.conf")}
	if got := r.m.Det.FTP(ctx).ManageBlocked; got != "no_config" {
		t.Errorf("no config: %q", got)
	}
	r.m.Det.Paths.VsftpdConfs = []string{r.vconf}
	// someone else's chroot list cannot be extended by TarOS
	os.WriteFile(r.vconf, []byte("chroot_local_user=NO\nchroot_list_enable=YES\n"), 0o644)
	if got := r.m.Det.FTP(ctx).ManageBlocked; got != "chroot_custom" {
		t.Errorf("custom chroot list: %q", got)
	}
	os.WriteFile(r.vconf, []byte(r0(t)), 0o644)
	// another daemon on port 21
	r.m.Det.Run = &fakeRun{out: map[string]string{"ss -ltnpH": "LISTEN 0 32 *:21 *:* users:((\"proftpd\",pid=9,fd=3))\n"}}
	if got := r.m.Det.FTP(ctx).ManageBlocked; got != "other_server" {
		t.Errorf("proftpd owns port 21: %q", got)
	}
}
