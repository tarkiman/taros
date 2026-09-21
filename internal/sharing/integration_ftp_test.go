package sharing

import (
	"context"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"syscall"
	"testing"
	"time"
)

// TestIntegrationFTP drives the Manager against a REAL vsftpd and checks with curl
// that vsftpd itself enforces what TarOS wrote: jail, read/write, ownership, TLS,
// allow-list, and that the host's own users keep working. It changes the machine
// it runs on, so it only runs when TAROS_SHARING_IT=1 — inside a disposable container:
//
//	docker run --rm -v $PWD:/t debian:bookworm-slim sh -c \
//	  'apt-get install -y vsftpd curl && TAROS_SHARING_IT=1 /t/sharing.test -test.run IntegrationFTP -test.v'
func TestIntegrationFTP(t *testing.T) {
	if os.Getenv("TAROS_SHARING_IT") != "1" {
		t.Skip("set TAROS_SHARING_IT=1 (inside a disposable container)")
	}
	ctx := context.Background()
	sh := func(name string, args ...string) (string, error) {
		out, err := exec.Command(name, args...).CombinedOutput()
		return string(out), err
	}
	must := func(out string, err error) string {
		t.Helper()
		if err != nil {
			t.Fatalf("%v\n%s", err, out)
		}
		return out
	}
	mkuser := func(name, shell, pw string) {
		if _, err := exec.LookPath("useradd"); err == nil {
			must(sh("useradd", "-m", "-s", shell, name))
		} else {
			must(sh("adduser", "-D", "-s", shell, name))
		}
		if pw != "" {
			if _, err := (execRunner{}).RunInput(ctx, name+":"+pw+"\n", "chpasswd"); err != nil {
				t.Fatal(err)
			}
		}
	}

	// ---- the machine: a data folder owned by an ordinary user, an existing FTP user, a nologin system user
	mkuser("nasowner", "/bin/sh", "")
	mkuser("olduser", "/bin/sh", "oldpass-123") // like the Pi's own account that a device uploads with
	mkuser("sysnl", "/usr/sbin/nologin", "sysnlpass-1")
	must(sh("sh", "-c", "mkdir -p /srv/nas/media /srv/nas/docs && echo hello > /srv/nas/media/hello.txt && echo secret > /srv/nas/docs/d.txt && chown -R nasowner /srv/nas && chmod -R 755 /srv/nas"))

	det := NewDetector()
	confPath := ""
	for _, p := range det.Paths.VsftpdConfs {
		if fileExists(p) {
			confPath = p
			break
		}
	}
	if confPath == "" {
		t.Fatal("no vsftpd.conf on this machine")
	}
	// The Pi's real configuration, adjusted to run in a container without IPv6.
	orig := strings.NewReplacer("listen=NO", "listen=YES", "listen_ipv6=YES", "listen_ipv6=NO").Replace(fixture(t, "vsftpd-pi.conf"))
	must("", os.WriteFile(confPath, []byte(orig), 0o644))
	must(sh("sh", "-c", "mkdir -p /var/run/vsftpd/empty /usr/share/empty"))

	restart := func() {
		t.Helper()
		_, _ = sh("pkill", "-x", "vsftpd")
		time.Sleep(600 * time.Millisecond)
		must(sh("sh", "-c", "setsid vsftpd "+confPath+" </dev/null >/dev/null 2>&1 &"))
		time.Sleep(900 * time.Millisecond)
	}
	restart()

	// curl: -u user:pw, optionally FTPS (-k: self-signed).
	curl := func(user, pw string, ssl bool, extra ...string) (string, error) {
		args := []string{"-sS", "--max-time", "10", "-u", user + ":" + pw}
		if ssl {
			args = append(args, "--ssl-reqd", "-k")
		}
		return sh("curl", append(args, extra...)...)
	}
	ls := func(user, pw string, ssl bool, path string) (string, error) {
		return curl(user, pw, ssl, "ftp://127.0.0.1/"+path)
	}
	put := func(user, pw string, ssl bool, name string) (string, error) {
		must("", os.WriteFile("/tmp/up.txt", []byte("uploaded"), 0o644))
		return curl(user, pw, ssl, "-T", "/tmp/up.txt", "ftp://127.0.0.1/"+name)
	}
	uidOf := func(p string) uint32 {
		fi, err := os.Stat(p)
		if err != nil {
			t.Fatal(err)
		}
		return fi.Sys().(*syscall.Stat_t).Uid
	}
	ownerUID := uidOf("/srv/nas/media")

	store := NewStore(filepath.Join(t.TempDir(), "sharing.yaml"))
	m := NewManager(det, store, PathPolicy{Roots: []string{"/srv/nas"}})

	// Before TarOS: the host's own user works, exactly as it does for the Pi's device.
	if out, err := ls("olduser", "oldpass-123", false, ""); err != nil {
		t.Fatalf("baseline login: %v\n%s", err, out)
	}

	// ---- a broken configuration is refused and changes nothing
	must("", os.WriteFile(confPath, []byte(orig+"\nthis_option_does_not_exist=YES\n"), 0o644))
	err := m.FTPAdopt(ctx)
	if _, ok := err.(*FTPApplyError); !ok {
		t.Fatalf("a config vsftpd refuses to start on must be rejected by the probe, got %v", err)
	}
	if b, _ := os.ReadFile(confPath); strings.Contains(string(b), "TarOS managed") {
		t.Fatal("rejected config must not be touched")
	}
	must("", os.WriteFile(confPath, []byte(orig), 0o644))

	// ---- adopt: nothing changes for anybody
	if err := m.FTPAdopt(ctx); err != nil {
		t.Fatal(err)
	}
	restart()
	if out, err := ls("olduser", "oldpass-123", false, ""); err != nil {
		t.Fatalf("existing users must keep working after adopting: %v\n%s", err, out)
	}
	if out, err := ls("sysnl", "sysnlpass-1", false, ""); err == nil {
		t.Fatalf("a plain nologin system user must still be refused (pam_shells kept for everybody else)\n%s", out)
	}

	// ---- accounts (FTP only: Samba isn't even installed here)
	if err := m.AddAccount(ctx, "family", "family-pass-1"); err != nil {
		t.Fatal(err)
	}
	if err := m.AddAccount(ctx, "viewer", "viewer-pass-1"); err != nil {
		t.Fatal(err)
	}
	if err := m.SetFTPAccess(ctx, "family", FTPAccess{Path: "/srv/nas/media", Mode: "rw"}, "family-pass-1"); err != nil {
		t.Fatal(err)
	}
	if err := m.SetFTPAccess(ctx, "viewer", FTPAccess{Path: "/srv/nas/media", Mode: "ro"}, "viewer-pass-1"); err != nil {
		t.Fatal(err)
	}
	restart()

	if out, err := ls("family", "family-pass-1", false, ""); err != nil || !strings.Contains(out, "hello.txt") {
		t.Fatalf("family must see its folder: %v\n%s", err, out)
	}
	if out, err := put("family", "family-pass-1", false, "up1.txt"); err != nil {
		t.Fatalf("family may upload: %v\n%s", err, out)
	}
	if u := uidOf("/srv/nas/media/up1.txt"); u != ownerUID {
		t.Errorf("uploaded file belongs to uid %d, want the folder's owner %d (guest mapping)", u, ownerUID)
	}
	if out, err := put("viewer", "viewer-pass-1", false, "up2.txt"); err == nil {
		t.Errorf("a read-only account must not upload\n%s", out)
	}
	if out, err := ls("viewer", "viewer-pass-1", false, "hello.txt"); err != nil || !strings.Contains(out, "hello") {
		t.Errorf("a read-only account can read: %v\n%s", err, out)
	}
	// The jail: the folder is the whole world.
	for _, escape := range []string{"../docs/d.txt", "../../etc/passwd", "/etc/passwd", "%2e%2e/docs/d.txt"} {
		if out, err := ls("family", "family-pass-1", false, escape); err == nil && (strings.Contains(out, "secret") || strings.Contains(out, "root:")) {
			t.Errorf("escaped the jail with %q:\n%s", escape, out)
		}
	}
	if out, err := ls("family", "wrong", false, ""); err == nil {
		t.Errorf("wrong password accepted\n%s", out)
	}
	// Nothing outside the folder was created by TarOS's accounts.
	if fileExists("/srv/nas/docs/up1.txt") {
		t.Error("write outside the folder")
	}
	// Another user of the host still works (chroot_local_user=YES globally on this config).
	if out, err := ls("olduser", "oldpass-123", false, ""); err != nil {
		t.Errorf("olduser after accounts exist: %v\n%s", err, out)
	}

	// ---- TLS: optional keeps plain FTP, required does not
	if err := m.SetFTPSettings(ctx, FTPSettings{TLS: "optional"}); err != nil {
		t.Fatal(err)
	}
	restart()
	if out, err := ls("family", "family-pass-1", true, ""); err != nil || !strings.Contains(out, "hello.txt") {
		t.Fatalf("FTPS must work: %v\n%s", err, out)
	}
	if out, err := ls("family", "family-pass-1", false, ""); err != nil {
		t.Fatalf("plain FTP must still work while TLS is only optional: %v\n%s", err, out)
	}
	if err := m.SetFTPSettings(ctx, FTPSettings{TLS: "required"}); err != nil {
		t.Fatal(err)
	}
	restart()
	if out, err := ls("family", "family-pass-1", true, ""); err != nil || !strings.Contains(out, "hello.txt") {
		t.Fatalf("FTPS with TLS required: %v\n%s", err, out)
	}
	if out, err := ls("family", "family-pass-1", false, ""); err == nil {
		t.Errorf("plain FTP must be refused when TLS is required\n%s", out)
	}
	if fi, err := os.Stat(filepath.Join(det.Paths.VsftpdDir, ftpCertFn)); err != nil || fi.Mode().Perm() != 0o600 {
		t.Errorf("certificate/key must be private: %v %v", fi, err)
	}

	// ---- only TarOS accounts: the host's users are shut out
	if err := m.SetFTPSettings(ctx, FTPSettings{TLS: "optional", OnlyAccounts: true, NoAnonymous: true}); err != nil {
		t.Fatal(err)
	}
	restart()
	if out, err := ls("olduser", "oldpass-123", false, ""); err == nil {
		t.Errorf("a device user must be refused in accounts-only mode\n%s", out)
	}
	if out, err := ls("family", "family-pass-1", false, ""); err != nil {
		t.Errorf("TarOS accounts still work: %v\n%s", err, out)
	}
	st := det.FTP(ctx)
	if !st.Config.AccountsOnly || len(st.LoginUsers) != 0 {
		t.Errorf("detection must know: %+v", st.Config)
	}

	// ---- disabling and clearing
	if err := m.SetDisabled(ctx, "family", true); err != nil {
		t.Fatal(err)
	}
	if out, err := ls("family", "family-pass-1", false, ""); err == nil {
		t.Errorf("a disabled account must not log in\n%s", out)
	}
	if err := m.SetDisabled(ctx, "family", false); err != nil {
		t.Fatal(err)
	}
	if out, err := ls("family", "family-pass-1", false, ""); err != nil {
		t.Errorf("re-enabled account (same password): %v\n%s", err, out)
	}
	if err := m.SetPassword(ctx, "family", "family-new-2"); err != nil {
		t.Fatal(err)
	}
	if out, err := ls("family", "family-pass-1", false, ""); err == nil {
		t.Errorf("the old password must stop working\n%s", out)
	}
	if out, err := ls("family", "family-new-2", false, ""); err != nil {
		t.Errorf("the new password: %v\n%s", err, out)
	}
	if err := m.ClearFTPAccess(ctx, "viewer"); err != nil {
		t.Fatal(err)
	}
	if out, err := ls("viewer", "viewer-pass-1", false, ""); err == nil {
		t.Errorf("an account without FTP access must not log in\n%s", out)
	}

	// ---- unadopt: the original comes back exactly, the device user works again
	if err := m.FTPUnadopt(ctx); err != nil {
		t.Fatal(err)
	}
	restart()
	if b, _ := os.ReadFile(confPath); string(b) != orig {
		t.Errorf("vsftpd.conf not restored byte for byte:\n%s", b)
	}
	if out, err := ls("olduser", "oldpass-123", false, ""); err != nil {
		t.Errorf("olduser after unadopting: %v\n%s", err, out)
	}
	if out, err := ls("family", "family-new-2", false, ""); err == nil {
		t.Errorf("TarOS accounts must not log in any more\n%s", out)
	}
	for _, gone := range []string{filepath.Join(det.Paths.VsftpdDir, ftpUsersDir), filepath.Join(det.Paths.VsftpdDir, ftpCertFn), filepath.Join(det.Paths.PamDir, ftpPAMName)} {
		if fileExists(gone) {
			t.Errorf("%s left behind", gone)
		}
	}
	// Data was never touched.
	if b, _ := os.ReadFile("/srv/nas/media/hello.txt"); string(b) != "hello\n" {
		t.Error("data changed")
	}
}
