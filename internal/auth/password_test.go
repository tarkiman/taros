package auth

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func newCreds(t *testing.T) (*Credentials, string) {
	t.Helper()
	path := filepath.Join(t.TempDir(), "credentials.yaml")
	if err := SaveCredentials(path, "alice", "alice-password-1"); err != nil {
		t.Fatal(err)
	}
	c, err := LoadCredentials(path)
	if err != nil {
		t.Fatal(err)
	}
	if err := c.AddUser(path, "bob", "bob-password-1"); err != nil {
		t.Fatal(err)
	}
	return c, path
}

func TestCheckPassword(t *testing.T) {
	for pw, want := range map[string]error{
		"":                            ErrPasswordTooShort,
		"1234567":                     ErrPasswordTooShort,
		"12345678":                    nil,
		strings.Repeat("a", 72):       nil,
		strings.Repeat("a", 73):       ErrPasswordTooLong,
		strings.Repeat("é", 37):       ErrPasswordTooLong, // 74 bytes: the limit is bytes, not characters
		"pässwörd-with-üñíçødé":       nil,
		"with spaces and : colons ok": nil,
	} {
		if got := CheckPassword(pw); !errors.Is(got, want) && !(got == nil && want == nil) {
			t.Errorf("%q → %v, want %v", pw, got, want)
		}
	}
}

func TestSetPasswordReplacesOnlyThatPassword(t *testing.T) {
	c, path := newCreds(t)
	if err := c.SetPassword(path, "alice", "a-brand-new-one"); err != nil {
		t.Fatal(err)
	}
	if c.Verify("alice", "alice-password-1") {
		t.Error("the old password must stop working")
	}
	if !c.Verify("alice", "a-brand-new-one") {
		t.Error("the new password must work")
	}
	if !c.Verify("bob", "bob-password-1") {
		t.Error("another account is not affected")
	}
	// persisted: a fresh load sees it
	c2, err := LoadCredentials(path)
	if err != nil {
		t.Fatal(err)
	}
	if !c2.Verify("alice", "a-brand-new-one") || c2.Verify("alice", "alice-password-1") || !c2.Verify("bob", "bob-password-1") {
		t.Error("the change must survive a restart")
	}
	if fi, _ := os.Stat(path); fi.Mode().Perm() != 0o600 {
		t.Errorf("credentials must stay private: %v", fi.Mode())
	}
}

func TestSetPasswordKeepsTOTP(t *testing.T) {
	c, path := newCreds(t)
	if err := c.SetTOTP(path, "alice", "JBSWY3DPEHPK3PXP", []string{"aaaa-bbbb"}); err != nil {
		t.Fatal(err)
	}
	if err := c.SetPassword(path, "alice", "a-brand-new-one"); err != nil {
		t.Fatal(err)
	}
	if !c.TOTPEnabled("alice") || c.RemainingBackupCodes("alice") != 1 {
		t.Error("changing the password must not touch 2FA")
	}
}

func TestSetPasswordRefusals(t *testing.T) {
	c, path := newCreds(t)
	before, _ := os.ReadFile(path)
	if err := c.SetPassword(path, "nobody", "a-brand-new-one"); !errors.Is(err, ErrUserNotFound) {
		t.Errorf("unknown user: %v", err)
	}
	if err := c.SetPassword(path, "alice", "short"); !errors.Is(err, ErrPasswordTooShort) {
		t.Errorf("short: %v", err)
	}
	if err := c.SetPassword(path, "alice", strings.Repeat("x", 100)); !errors.Is(err, ErrPasswordTooLong) {
		t.Errorf("long: %v", err)
	}
	after, _ := os.ReadFile(path)
	if string(before) != string(after) || !c.Verify("alice", "alice-password-1") {
		t.Error("a refused change must leave everything as it was")
	}
}

func TestSetPasswordWriteFailureKeepsTheOldPassword(t *testing.T) {
	c, _ := newCreds(t)
	bad := filepath.Join(t.TempDir(), "no-such-dir", "credentials.yaml")
	if err := c.SetPassword(bad, "alice", "a-brand-new-one"); err == nil {
		t.Fatal("expected a write error")
	}
	if !c.Verify("alice", "alice-password-1") || c.Verify("alice", "a-brand-new-one") {
		t.Error("when saving fails the old password must remain in force")
	}
}

func TestDeleteUserSessions(t *testing.T) {
	st := NewSessionStore(time.Minute)
	tok := map[string]string{}
	for _, name := range []string{"alice", "alice", "alice", "bob"} {
		token, _, err := st.Create(name)
		if err != nil {
			t.Fatal(err)
		}
		if name == "alice" && tok["alice"] == "" {
			tok["alice"] = token
		} else if name == "alice" {
			tok["alice2"+token[:4]] = token
		} else {
			tok["bob"] = token
		}
	}
	if n := st.DeleteUserSessions("alice", tok["alice"]); n != 2 {
		t.Errorf("closed %d, want the two others", n)
	}
	if st.Validate(tok["alice"]) == nil {
		t.Error("the session being kept must survive")
	}
	if st.Validate(tok["bob"]) == nil {
		t.Error("another user's session must survive")
	}
	for k, v := range tok {
		if strings.HasPrefix(k, "alice2") && st.Validate(v) != nil {
			t.Error("the other sessions of the same account must be gone")
		}
	}
	if n := st.DeleteUserSessions("alice", ""); n != 1 || st.Validate(tok["alice"]) != nil {
		t.Errorf("with no keep token every session goes: %d", n)
	}
	if n := st.DeleteUserSessions("nobody", ""); n != 0 {
		t.Errorf("unknown user: %d", n)
	}
}
