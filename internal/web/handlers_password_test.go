package web

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/auth"
)

type pwRig struct {
	t     *testing.T
	s     *Server
	creds *auth.Credentials
	sess  *auth.SessionStore
	path  string
}

func newPwRig(t *testing.T) *pwRig {
	t.Helper()
	path := filepath.Join(t.TempDir(), "credentials.yaml")
	if err := auth.SaveCredentials(path, "alice", "alice-password-1"); err != nil {
		t.Fatal(err)
	}
	creds, err := auth.LoadCredentials(path)
	if err != nil {
		t.Fatal(err)
	}
	if err := creds.AddUser(path, "bob", "bob-password-1"); err != nil {
		t.Fatal(err)
	}
	sess := auth.NewSessionStore(time.Hour)
	s := NewServer(Deps{Creds: creds, Sessions: sess, RateLimiter: auth.NewLoginRateLimiter(4, time.Minute), CredentialsPath: path})
	return &pwRig{t: t, s: s, creds: creds, sess: sess, path: path}
}

// login makes a session for user and returns its cookie value.
func (r *pwRig) login(user string) string {
	r.t.Helper()
	tok, _, err := r.sess.Create(user)
	if err != nil {
		r.t.Fatal(err)
	}
	return tok
}

func (r *pwRig) alive(tok string) bool { return r.sess.Validate(tok) != nil }

func (r *pwRig) call(h http.HandlerFunc, user, tok, pathUser, body string) (int, string, map[string]any) {
	req := httptest.NewRequest("POST", "/x", strings.NewReader(body))
	req.RemoteAddr = "10.0.0.7:1234"
	req.AddCookie(&http.Cookie{Name: auth.CookieName, Value: tok})
	req = req.WithContext(context.WithValue(req.Context(), sessionCtxKey{}, &auth.Session{Username: user}))
	if pathUser != "" {
		req.SetPathValue("username", pathUser)
	}
	rec := httptest.NewRecorder()
	h(rec, req)
	var e apiErrorBody
	_ = json.Unmarshal(rec.Body.Bytes(), &e)
	var all map[string]any
	_ = json.Unmarshal(rec.Body.Bytes(), &all)
	return rec.Code, e.Code, all
}

func TestChangeOwnPassword(t *testing.T) {
	r := newPwRig(t)
	mine, other, bobs := r.login("alice"), r.login("alice"), r.login("bob")
	change := func(cur, next string) (int, string, map[string]any) {
		return r.call(r.s.handleSettingsPasswordChange, "alice", mine, "", `{"currentPassword":`+q(cur)+`,"newPassword":`+q(next)+`}`)
	}

	if code, api, _ := change("wrong-password", "a-brand-new-one"); code != http.StatusForbidden || api != apierr.WrongPassword {
		t.Errorf("wrong current password → %d %q", code, api)
	}
	if !r.creds.Verify("alice", "alice-password-1") {
		t.Error("a refused change must not change anything")
	}
	if code, api, _ := change("alice-password-1", "short"); code != http.StatusBadRequest || api != apierr.PasswordTooShort {
		t.Errorf("short → %d %q", code, api)
	}
	if code, api, _ := change("alice-password-1", strings.Repeat("x", 80)); code != http.StatusBadRequest || api != apierr.PasswordTooLong {
		t.Errorf("long → %d %q", code, api)
	}
	if code, api, _ := change("alice-password-1", "alice-password-1"); code != http.StatusBadRequest || api != apierr.PasswordSameAsOld {
		t.Errorf("same → %d %q", code, api)
	}
	if !r.alive(other) {
		t.Fatal("refused requests must not log anyone out")
	}

	code, _, body := change("alice-password-1", "a-brand-new-one")
	if code != http.StatusOK || body["otherSessionsClosed"] != float64(1) {
		t.Fatalf("change → %d %v", code, body)
	}
	if !r.creds.Verify("alice", "a-brand-new-one") || r.creds.Verify("alice", "alice-password-1") {
		t.Error("new password in force, old one gone")
	}
	if !r.alive(mine) {
		t.Error("the session that made the change must stay")
	}
	if r.alive(other) {
		t.Error("another session of the same account must end")
	}
	if !r.alive(bobs) {
		t.Error("another account's session must not be touched")
	}
	// persisted
	if c2, _ := auth.LoadCredentials(r.path); !c2.Verify("alice", "a-brand-new-one") {
		t.Error("must be saved to credentials.yaml")
	}
	if code, _, _ := r.call(r.s.handleSettingsPasswordChange, "alice", mine, "", "not json"); code != http.StatusBadRequest {
		t.Errorf("broken body → %d", code)
	}
}

func TestPasswordConfirmationIsRateLimited(t *testing.T) {
	r := newPwRig(t)
	tok := r.login("alice")
	guess := func(pw string) (int, string) {
		code, api, _ := r.call(r.s.handleSettingsPasswordChange, "alice", tok, "", `{"currentPassword":`+q(pw)+`,"newPassword":"a-brand-new-one"}`)
		return code, api
	}
	for i := 0; i < 4; i++ {
		if code, _ := guess("nope-nope-" + string(rune('a'+i))); code != http.StatusForbidden {
			t.Fatalf("attempt %d → %d", i, code)
		}
	}
	// the limit is reached: even the RIGHT password is refused for now
	if code, api := guess("alice-password-1"); code != http.StatusTooManyRequests || api != apierr.TooManyAttempts {
		t.Errorf("after too many failures → %d %q", code, api)
	}
	if !r.creds.Verify("alice", "alice-password-1") {
		t.Error("nothing changed")
	}
	// and the reset endpoint shares the same limit
	if code, api, _ := r.call(r.s.handleSettingsUsersResetPassword, "alice", tok, "bob", `{"password":"alice-password-1","newPassword":"bobs-new-password"}`); code != http.StatusTooManyRequests || api != apierr.TooManyAttempts {
		t.Errorf("reset while limited → %d %q", code, api)
	}
}

func TestResetAnotherAccountsPassword(t *testing.T) {
	r := newPwRig(t)
	mine, bob1, bob2 := r.login("alice"), r.login("bob"), r.login("bob")
	reset := func(target, own, next string) (int, string, map[string]any) {
		return r.call(r.s.handleSettingsUsersResetPassword, "alice", mine, target, `{"password":`+q(own)+`,"newPassword":`+q(next)+`}`)
	}
	if code, api, _ := reset("bob", "wrong-password", "bobs-new-password"); code != http.StatusForbidden || api != apierr.WrongPassword {
		t.Errorf("wrong own password → %d %q", code, api)
	}
	if code, api, _ := reset("nobody", "alice-password-1", "bobs-new-password"); code != http.StatusNotFound || api != apierr.UserNotFound {
		t.Errorf("unknown account → %d %q", code, api)
	}
	if code, api, _ := reset("nobody", "alice-password-1", "short"); code != http.StatusNotFound || api != apierr.UserNotFound {
		t.Errorf("an unknown account is reported as such before its password is judged → %d %q", code, api)
	}
	if code, api, _ := reset("bob", "alice-password-1", "short"); code != http.StatusBadRequest || api != apierr.PasswordTooShort {
		t.Errorf("short → %d %q", code, api)
	}
	if !r.creds.Verify("bob", "bob-password-1") || !r.alive(bob1) {
		t.Fatal("refused requests must change nothing")
	}
	code, _, body := reset("bob", "alice-password-1", "bobs-new-password")
	if code != http.StatusOK || body["sessionsClosed"] != float64(2) {
		t.Fatalf("reset → %d %v", code, body)
	}
	if !r.creds.Verify("bob", "bobs-new-password") || r.creds.Verify("bob", "bob-password-1") {
		t.Error("bob's password is replaced")
	}
	if r.alive(bob1) || r.alive(bob2) {
		t.Error("every session of the reset account must end")
	}
	if !r.alive(mine) || !r.creds.Verify("alice", "alice-password-1") {
		t.Error("the caller is not affected")
	}
	// resetting yourself through this endpoint behaves like a change: your own session stays
	mine2 := r.login("alice")
	other := r.login("alice")
	code, _, _ = r.call(r.s.handleSettingsUsersResetPassword, "alice", mine2, "alice", `{"password":"alice-password-1","newPassword":"alice-new-password"}`)
	if code != http.StatusOK || !r.alive(mine2) || r.alive(other) {
		t.Errorf("self reset: code %d, own alive %v, other alive %v", code, r.alive(mine2), r.alive(other))
	}
}

func TestRemovedAccountIsLoggedOut(t *testing.T) {
	r := newPwRig(t)
	mine, bobs := r.login("alice"), r.login("bob")
	code, _, _ := r.call(r.s.handleSettingsUsersRemove, "alice", mine, "bob", `{"password":"alice-password-1"}`)
	if code != http.StatusOK {
		t.Fatalf("remove → %d", code)
	}
	if r.alive(bobs) {
		t.Error("a removed account must not stay logged in: its sessions are not re-checked against the account list")
	}
	if !r.alive(mine) {
		t.Error("the caller stays")
	}
}

func TestNewAccountPasswordLengthIsChecked(t *testing.T) {
	r := newPwRig(t)
	tok := r.login("alice")
	add := func(pw string) (int, string) {
		code, api, _ := r.call(r.s.handleSettingsUsersAdd, "alice", tok, "", `{"newUsername":"carol","newPassword":`+q(pw)+`,"password":"alice-password-1"}`)
		return code, api
	}
	if code, api := add(strings.Repeat("x", 90)); code != http.StatusBadRequest || api != apierr.PasswordTooLong {
		t.Errorf("an over-long password used to fail with an opaque 500; now → %d %q", code, api)
	}
	if code, api := add("short"); code != http.StatusBadRequest || api != apierr.PasswordTooShort {
		t.Errorf("short → %d %q", code, api)
	}
	if code, _ := add("carols-password"); code != http.StatusOK {
		t.Errorf("valid → %d", code)
	}
}

func q(s string) string { b, _ := json.Marshal(s); return string(b) }
