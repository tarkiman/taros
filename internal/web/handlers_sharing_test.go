package web

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"testing"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/auth"
	"github.com/tarkiman/taros/internal/sharing"
)

func TestSharingErrorsMapToCodesAndParams(t *testing.T) {
	for _, tc := range []struct {
		err    error
		status int
		code   string
		param  string
		want   string
	}{
		{sharing.ErrAccountName, 400, apierr.SharingAccountInvalid, "", ""},
		{sharing.ErrAccountExists, 409, apierr.SharingAccountExists, "", ""},
		{fmt.Errorf("%w: %s", sharing.ErrAccountInUse, "Photos"), 409, apierr.SharingAccountInUse, "share", "Photos"},
		{fmt.Errorf("%w (%s)", sharing.ErrCannotManage, "not_root"), 409, apierr.SharingCannotManage, "reason", "not_root"},
		{sharing.ErrPasswordWeak, 400, apierr.SharingPasswordWeak, "min", "8"},
		{sharing.ErrPathDenied, 400, apierr.SharingPathDenied, "", ""},
		{sharing.ErrOwnedByRoot, 400, apierr.SharingOwnedByRoot, "", ""},
		{sharing.ErrNameForeign, 409, apierr.SharingShareNameForeign, "", ""},
		{sharing.ErrNoSystemd, 409, apierr.SharingNoSystemd, "", ""},
		{&sharing.ApplyError{Output: "bad line 3"}, 422, apierr.SharingApplyRejected, "detail", "bad line 3"},
		{&sharing.FTPApplyError{Output: "500 OOPS"}, 422, apierr.SharingFTPApplyRejected, "detail", "500 OOPS"},
		{sharing.ErrFTPNotManaged, 409, apierr.SharingFTPNotManaged, "", ""},
		{sharing.ErrFTPSettings, 400, apierr.SharingFTPSettings, "", ""},
		{sharing.ErrFTPNoAccounts, 409, apierr.SharingFTPNoAccounts, "", ""},
		{sharing.ErrNoLogin, 409, apierr.SharingNoLogin, "", ""},
		{fmt.Errorf("something unexpected"), 500, apierr.SharingFailed, "detail", "something unexpected"},
	} {
		rec := httptest.NewRecorder()
		sharingErr(rec, tc.err)
		var body apiErrorBody
		_ = json.Unmarshal(rec.Body.Bytes(), &body)
		if rec.Code != tc.status || body.Code != tc.code {
			t.Errorf("%v → %d %q, want %d %q", tc.err, rec.Code, body.Code, tc.status, tc.code)
		}
		if tc.param != "" && fmt.Sprint(body.Params[tc.param]) != tc.want {
			t.Errorf("%v → params[%s] = %v, want %q", tc.err, tc.param, body.Params[tc.param], tc.want)
		}
	}
}

// Every change asks for the caller's dashboard password again, before anything
// else happens; only turning things *off* may skip it.
func TestSharingChangesNeedTheDashboardPassword(t *testing.T) {
	credPath := filepath.Join(t.TempDir(), "credentials.yaml")
	if err := auth.SaveCredentials(credPath, "tester", "correct-horse-1"); err != nil {
		t.Fatal(err)
	}
	creds, err := auth.LoadCredentials(credPath)
	if err != nil {
		t.Fatal(err)
	}
	// A detector for a non-Linux host: nothing can be managed, so a request that
	// passes the password gate ends in a refusal rather than touching the machine.
	det := sharing.NewDetector()
	det.GOOS = "darwin"
	mgr := sharing.NewManager(det, sharing.NewStore(filepath.Join(t.TempDir(), "s.yaml")), sharing.PathPolicy{})
	s := NewServer(Deps{Creds: creds, Sharing: mgr})

	call := func(h http.HandlerFunc, path, body string) (int, string) {
		req := httptest.NewRequest("POST", path, strings.NewReader(body))
		req = req.WithContext(context.WithValue(req.Context(), sessionCtxKey{}, &auth.Session{Username: "tester"}))
		req.SetPathValue("name", "x")
		rec := httptest.NewRecorder()
		h(rec, req)
		var b apiErrorBody
		_ = json.Unmarshal(rec.Body.Bytes(), &b)
		return rec.Code, b.Code
	}
	gated := map[string]http.HandlerFunc{
		"adopt": s.handleSharingAdopt, "unadopt": s.handleSharingUnadopt, "interfaces": s.handleSharingInterfaces,
		"share save": s.handleSharingShareSave, "share delete": s.handleSharingShareDelete,
		"account add": s.handleSharingAccountAdd, "account password": s.handleSharingAccountPassword,
		"account delete": s.handleSharingAccountDelete,
		"ftp adopt":      s.handleSharingFTPAdopt, "ftp unadopt": s.handleSharingFTPUnadopt,
		"ftp settings": s.handleSharingFTPSettings, "ftp access": s.handleSharingFTPAccess,
	}
	for name, h := range gated {
		if code, api := call(h, "/x", `{"password":"wrong"}`); code != http.StatusForbidden || api != apierr.WrongPassword {
			t.Errorf("%s with a wrong password → %d %q, want 403 wrong_password", name, code, api)
		}
		if code, _ := call(h, "/x", `{"password":"correct-horse-1"}`); code == http.StatusForbidden {
			t.Errorf("%s with the right password was still refused as a wrong password", name)
		}
		if code, api := call(h, "/x", `not json`); code != http.StatusBadRequest {
			t.Errorf("%s with a broken body → %d %q, want 400", name, code, api)
		}
	}
	// Exposing actions are gated, shutting things down is not.
	svc := func(action, pw string) (int, string) {
		return call(s.handleSharingService, "/x", fmt.Sprintf(`{"action":%q,"password":%q}`, action, pw))
	}
	for _, a := range []string{"start", "enable", "restart"} {
		if code, api := svc(a, "wrong"); code != http.StatusForbidden || api != apierr.WrongPassword {
			t.Errorf("service %s with a wrong password → %d %q", a, code, api)
		}
	}
	for _, a := range []string{"stop", "disable"} {
		if code, _ := svc(a, ""); code == http.StatusForbidden {
			t.Errorf("service %s should not need the password", a)
		}
	}
	fsvc := func(action, pw string) (int, string) {
		return call(s.handleSharingFTPService, "/x", fmt.Sprintf(`{"action":%q,"password":%q}`, action, pw))
	}
	for _, a := range []string{"start", "enable", "restart"} {
		if code, api := fsvc(a, "wrong"); code != http.StatusForbidden || api != apierr.WrongPassword {
			t.Errorf("ftp service %s with a wrong password → %d %q", a, code, api)
		}
	}
	for _, a := range []string{"stop", "disable"} {
		if code, _ := fsvc(a, ""); code == http.StatusForbidden {
			t.Errorf("ftp service %s should not need the password", a)
		}
	}
	// Taking FTP access away only reduces exposure.
	if code, _ := call(s.handleSharingFTPClear, "/x", `{}`); code == http.StatusForbidden {
		t.Errorf("clearing FTP access should not need the password")
	}
	// Enabling a login needs it; disabling one doesn't.
	if code, _ := call(s.handleSharingAccountDisabled, "/x", `{"disabled":false,"password":"wrong"}`); code != http.StatusForbidden {
		t.Errorf("re-enabling an account with a wrong password → %d, want 403", code)
	}
	if code, _ := call(s.handleSharingAccountDisabled, "/x", `{"disabled":true}`); code == http.StatusForbidden {
		t.Errorf("disabling an account should not need the password")
	}
	// No Manager wired (not Linux): a clear 503, not a panic.
	off := NewServer(Deps{Creds: creds})
	if code, api := func() (int, string) {
		rec := httptest.NewRecorder()
		off.handleSharingStatus(rec, httptest.NewRequest("GET", "/x", nil))
		var b apiErrorBody
		_ = json.Unmarshal(rec.Body.Bytes(), &b)
		return rec.Code, b.Code
	}(); code != http.StatusServiceUnavailable || api != apierr.SharingUnavailable {
		t.Errorf("status without a manager → %d %q", code, api)
	}
}
