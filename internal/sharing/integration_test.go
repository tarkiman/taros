package sharing

import (
	"context"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

// TestIntegrationSamba drives the Manager against a REAL Samba (smbd, testparm,
// smbpasswd, useradd) and checks with smbclient that Samba itself enforces what
// TarOS wrote. It changes the machine it runs on (users, /etc/samba), so it only
// runs when TAROS_SHARING_IT=1 — inside a throwaway container:
//
//	docker run --rm -v $PWD:/t debian:bookworm-slim sh -c \
//	  'apt-get install -y samba smbclient && TAROS_SHARING_IT=1 /t/sharing.test -test.run Integration -test.v'
func TestIntegrationSamba(t *testing.T) {
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

	// Portable user creation for the fixture (Alpine has no useradd).
	mkuser := func(name, shell string) {
		if _, err := exec.LookPath("useradd"); err == nil {
			must(sh("useradd", "-M", "-s", shell, name))
		} else {
			must(sh("adduser", "-D", "-H", "-s", shell, name))
		}
	}

	// ---- the machine: a folder owned by an ordinary user, and someone else's pre-existing share
	mkuser("nasowner", "/bin/sh")
	must(sh("mkdir", "-p", "/srv/nas/media", "/srv/nas/docs", "/srv/legacy"))
	must(sh("sh", "-c", "echo hello > /srv/nas/media/hello.txt && chown -R nasowner:nasowner /srv/nas && chmod -R 775 /srv/nas && chmod 777 /srv/legacy && echo old > /srv/legacy/old.txt"))

	confPath := "/etc/samba/smb.conf"
	orig, _ := os.ReadFile(confPath)
	legacy := string(orig) + "\n[legacy]\n   path = /srv/legacy\n   read only = no\n   valid users = dave\n"
	must("", os.WriteFile(confPath, []byte(legacy), 0o644))
	// dave is somebody else's Samba user, made outside TarOS.
	mkuser("dave", "/sbin/nologin")
	if _, err := (execRunner{}).RunInput(ctx, "davepass-1\ndavepass-1\n", "smbpasswd", "-a", "-s", "dave"); err != nil {
		t.Fatal(err)
	}
	must(sh("sh", "-c", "mkdir -p /run/samba /var/run/samba; smbd -D; sleep 1"))
	reload := func() { must(sh("smbcontrol", "smbd", "reload-config")); time.Sleep(700 * time.Millisecond) }
	client := func(user, pw, share string, cmds string) (string, error) {
		args := []string{"//127.0.0.1/" + share, "-c", cmds}
		if user == "" {
			args = append(args, "-N")
		} else {
			args = append(args, "-U", user+"%"+pw)
		}
		return sh("smbclient", args...)
	}
	denied := func(out string) bool {
		return strings.Contains(out, "NT_STATUS_ACCESS_DENIED") || strings.Contains(out, "NT_STATUS_LOGON_FAILURE") || strings.Contains(out, "NT_STATUS_BAD_NETWORK_NAME") || strings.Contains(out, "NT_STATUS_ACCOUNT_DISABLED") || strings.Contains(out, "session setup failed")
	}

	// ---- TarOS
	det := NewDetector()
	store := NewStore(filepath.Join(t.TempDir(), "sharing.yaml"))
	m := NewManager(det, store, PathPolicy{Roots: []string{"/srv/nas"}})

	pre := det.SMB(ctx)
	if !pre.Installed || pre.Managed || !pre.CanManage || pre.ManageBlocked != "" {
		t.Fatalf("before adopting: %+v", pre)
	}
	if len(pre.Shares) != 1 || pre.Shares[0].Name != "legacy" || pre.Shares[0].Managed {
		t.Fatalf("the pre-existing share must be seen and be foreign: %+v", pre.Shares)
	}
	confBefore, _ := os.ReadFile(confPath)

	if err := m.Adopt(ctx, []string{"eth0"}); err != nil {
		t.Fatalf("Adopt: %v", err)
	}
	for _, a := range []struct{ n, pw string }{{"alice", "alice-pass-1"}, {"bob", "bob-pass-22"}, {"carol", "carol-pass-3"}} {
		if err := m.AddAccount(ctx, a.n, a.pw); err != nil {
			t.Fatalf("AddAccount %s: %v", a.n, err)
		}
	}
	// The system users really are shell-less, home-less and in taros-share.
	pw := must(sh("getent", "passwd", "alice"))
	if !strings.Contains(pw, "nologin") || !strings.Contains(pw, ":/nonexistent:") || strings.Contains(pw, "/home/alice") {
		t.Errorf("alice's passwd entry: %s", pw)
	}
	if g := must(sh("id", "-gn", "alice")); strings.TrimSpace(g) != "taros-share" {
		t.Errorf("alice's group = %q", g)
	}
	if _, err := os.Stat("/home/alice"); err == nil {
		t.Error("a home directory was created")
	}

	media := Share{Name: "media", Path: "/srv/nas/media", Browseable: true, Comment: "Family media", Access: []Access{{"alice", "rw"}, {"bob", "ro"}}}
	docs := Share{Name: "docs", Path: "/srv/nas/docs", Browseable: false, Access: []Access{{"alice", "rw"}}}
	for _, s := range []Share{media, docs} {
		if err := m.SaveShare(ctx, s, ""); err != nil {
			t.Fatalf("SaveShare %s: %v", s.Name, err)
		}
	}
	reload()

	// ---- Samba enforces what we wrote
	if out, err := client("alice", "alice-pass-1", "media", "ls"); err != nil || !strings.Contains(out, "hello.txt") {
		t.Fatalf("alice ls media: %v\n%s", err, out)
	}
	must(sh("sh", "-c", "echo data > /tmp/up.txt"))
	if out, err := client("alice", "alice-pass-1", "media", "put /tmp/up.txt alice.txt"); err != nil {
		t.Fatalf("alice (rw) could not write: %v\n%s", err, out)
	}
	// Files created over SMB belong to the FOLDER's owner (force user), never to a share account.
	if own := strings.TrimSpace(must(sh("stat", "-c", "%U", "/srv/nas/media/alice.txt"))); own != "nasowner" {
		t.Errorf("uploaded file owner = %q, want nasowner", own)
	}
	if out, err := client("bob", "bob-pass-22", "media", "ls"); err != nil || !strings.Contains(out, "hello.txt") {
		t.Fatalf("bob (ro) could not read: %v\n%s", err, out)
	}
	if out, err := client("bob", "bob-pass-22", "media", "put /tmp/up.txt bob.txt"); err == nil && !denied(out) {
		t.Fatalf("bob (ro) WROTE: %s", out)
	}
	if _, err := os.Stat("/srv/nas/media/bob.txt"); err == nil {
		t.Fatal("a read-only account created a file")
	}
	if out, _ := client("bob", "bob-pass-22", "docs", "ls"); !denied(out) {
		t.Errorf("bob reached docs, which isn't his: %s", out)
	}
	if out, _ := client("carol", "carol-pass-3", "media", "ls"); !denied(out) {
		t.Errorf("carol has no access to media: %s", out)
	}
	if out, _ := client("alice", "wrong-password", "media", "ls"); !denied(out) {
		t.Errorf("wrong password accepted: %s", out)
	}
	if out, _ := client("", "", "media", "ls"); !denied(out) {
		t.Errorf("anonymous access to media: %s", out)
	}
	if out, _ := sh("smbclient", "-N", "-L", "127.0.0.1"); strings.Contains(out, "media") {
		t.Errorf("an anonymous user can list the shares (restrict anonymous did not take effect):\n%s", out)
	}
	// Someone else's share and account keep working alongside.
	if out, err := client("dave", "davepass-1", "legacy", "ls"); err != nil || !strings.Contains(out, "old.txt") {
		t.Fatalf("the pre-existing share broke: %v\n%s", err, out)
	}
	if out, _ := client("dave", "davepass-1", "media", "ls"); !denied(out) {
		t.Errorf("a foreign Samba user got into a TarOS share: %s", out)
	}
	// The hidden share isn't listed for alice (browseable = no), the visible one is.
	if out, _ := sh("smbclient", "-L", "127.0.0.1", "-U", "alice%alice-pass-1"); !strings.Contains(out, "media") || strings.Contains(out, "docs") {
		t.Errorf("share listing:\n%s", out)
	}

	// ---- account lifecycle
	if err := m.SetDisabled(ctx, "alice", true); err != nil {
		t.Fatal(err)
	}
	if out, _ := client("alice", "alice-pass-1", "media", "ls"); !denied(out) {
		t.Errorf("a disabled account logged in: %s", out)
	}
	if err := m.SetDisabled(ctx, "alice", false); err != nil {
		t.Fatal(err)
	}
	if err := m.SetPassword(ctx, "alice", "alice-new-pass-9"); err != nil {
		t.Fatal(err)
	}
	if out, _ := client("alice", "alice-pass-1", "media", "ls"); !denied(out) {
		t.Errorf("the old password still works: %s", out)
	}
	if out, err := client("alice", "alice-new-pass-9", "media", "ls"); err != nil {
		t.Errorf("the new password does not work: %v\n%s", err, out)
	}
	// Deleting a share reflects at once and never deletes files.
	if err := m.DeleteShare(ctx, "docs"); err != nil {
		t.Fatal(err)
	}
	reload()
	if out, _ := client("alice", "alice-new-pass-9", "docs", "ls"); !denied(out) {
		t.Errorf("a deleted share is still served: %s", out)
	}
	if _, err := os.Stat("/srv/nas/docs"); err != nil {
		t.Error("the folder of a deleted share was removed")
	}

	// ---- give it all back
	if err := m.Unadopt(ctx, true); err != nil {
		t.Fatalf("Unadopt: %v", err)
	}
	reload()
	confAfter, _ := os.ReadFile(confPath)
	if string(confAfter) != string(confBefore) {
		t.Errorf("smb.conf was not restored byte for byte:\n--- before\n%s\n--- after\n%s", confBefore, confAfter)
	}
	for _, u := range []string{"alice", "bob", "carol"} {
		if _, err := exec.Command("id", "-u", u).Output(); err == nil {
			t.Errorf("system user %s survived Unadopt(removeAccounts)", u)
		}
	}
	if _, err := exec.Command("id", "-u", "dave").Output(); err != nil {
		t.Error("a user TarOS did not create was removed")
	}
	if out, err := client("dave", "davepass-1", "legacy", "ls"); err != nil || !strings.Contains(out, "old.txt") {
		t.Errorf("the foreign share must still work after TarOS is gone: %v\n%s", err, out)
	}
	if out, _ := client("bob", "bob-pass-22", "media", "ls"); !denied(out) {
		t.Errorf("TarOS's shares must be gone: %s", out)
	}
}
