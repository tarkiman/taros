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
	"github.com/tarkiman/taros/internal/storage"
)

func TestStorageErrorsMapToCodesAndParams(t *testing.T) {
	for _, tc := range []struct {
		err          error
		status       int
		code         string
		param, value string
	}{
		{&storage.BusyError{Processes: []storage.BusyProc{{PID: 7, Name: "vlc"}}, UsedBy: []string{"Photos"}}, 409, apierr.StorageBusy, "users", "vlc (7), Photos"},
		{&storage.MountError{Detail: "wrong fs type"}, 422, apierr.StorageMountFailed, "detail", "wrong fs type"},
		{&storage.UnmountError{Detail: "io error"}, 422, apierr.StorageUnmountFailed, "detail", "io error"},
		{fmt.Errorf("%w (%s)", storage.ErrCannotMount, "not_root"), 409, apierr.StorageCannotMount, "reason", "not_root"},
		{storage.ErrNoSuchDevice, 404, apierr.StorageNoDevice, "", ""},
		{storage.ErrManagedByFstab, 409, apierr.StorageManagedByFstab, "", ""},
		{storage.ErrUnsupportedFS, 422, apierr.StorageUnsupportedFS, "", ""},
		{storage.ErrAlreadyMounted, 409, apierr.StorageAlreadyMounted, "", ""},
		{storage.ErrNotMounted, 409, apierr.StorageNotMounted, "", ""},
		{storage.ErrMountpoint, 409, apierr.StorageMountpointInUse, "", ""},
		{storage.ErrUnavailable, 503, apierr.StorageUnavailable, "", ""},
		{fmt.Errorf("boom"), 500, apierr.StorageFailed, "detail", "boom"},
	} {
		rec := httptest.NewRecorder()
		storageErr(rec, tc.err)
		var body apiErrorBody
		_ = json.Unmarshal(rec.Body.Bytes(), &body)
		if rec.Code != tc.status || body.Code != tc.code {
			t.Errorf("%v → %d %q, want %d %q", tc.err, rec.Code, body.Code, tc.status, tc.code)
		}
		if tc.param != "" && fmt.Sprint(body.Params[tc.param]) != tc.value {
			t.Errorf("%v → params[%s] = %v, want %q", tc.err, tc.param, body.Params[tc.param], tc.value)
		}
	}
}

// Turning auto-mount ON or noexec OFF trusts whatever gets plugged in, so it asks
// for the dashboard password; the safer direction never does.
func TestStorageSettingsGating(t *testing.T) {
	credPath := filepath.Join(t.TempDir(), "credentials.yaml")
	if err := auth.SaveCredentials(credPath, "tester", "correct-horse-1"); err != nil {
		t.Fatal(err)
	}
	creds, err := auth.LoadCredentials(credPath)
	if err != nil {
		t.Fatal(err)
	}
	st := storage.NewStore(filepath.Join(t.TempDir(), "storage.yaml"))
	mgr := storage.New(storage.Config{Enabled: true, MountBase: t.TempDir()}, st)
	s := NewServer(Deps{Creds: creds, Storage: mgr})

	post := func(h http.HandlerFunc, body string) (int, string) {
		req := httptest.NewRequest("POST", "/x", strings.NewReader(body))
		req = req.WithContext(context.WithValue(req.Context(), sessionCtxKey{}, &auth.Session{Username: "tester"}))
		rec := httptest.NewRecorder()
		h(rec, req)
		var b apiErrorBody
		_ = json.Unmarshal(rec.Body.Bytes(), &b)
		return rec.Code, b.Code
	}
	settings := func(auto, noexec bool, pw string) (int, string) {
		return post(s.handleStorageSettings, fmt.Sprintf(`{"autoMount":%v,"noExec":%v,"password":%q}`, auto, noexec, pw))
	}
	// defaults: auto-mount on, noexec on. Same values: nothing to confirm.
	if code, _ := settings(true, true, ""); code != http.StatusOK {
		t.Errorf("unchanged settings → %d", code)
	}
	// safer directions need no password
	if code, _ := settings(false, true, ""); code != http.StatusOK {
		t.Errorf("auto-mount off → %d", code)
	}
	// auto-mount back ON: password
	if code, api := settings(true, true, "wrong"); code != http.StatusForbidden || api != apierr.WrongPassword {
		t.Errorf("auto-mount on with a wrong password → %d %q", code, api)
	}
	if got := st.Get(); got.AutoMount {
		t.Error("a refused change must not be applied")
	}
	if code, _ := settings(true, true, "correct-horse-1"); code != http.StatusOK || !st.Get().AutoMount {
		t.Errorf("auto-mount on with the right password → %d", code)
	}
	// noexec OFF: password
	if code, api := settings(true, false, ""); code != http.StatusForbidden || api != apierr.WrongPassword {
		t.Errorf("noexec off without a password → %d %q", code, api)
	}
	if !st.Get().NoExec {
		t.Error("still noexec")
	}
	if code, _ := settings(true, false, "correct-horse-1"); code != http.StatusOK || st.Get().NoExec {
		t.Errorf("noexec off with the password → %d", code)
	}
	// and back to noexec: safer, no password
	if code, _ := settings(true, true, ""); code != http.StatusOK || !st.Get().NoExec {
		t.Errorf("noexec on → %d", code)
	}
	// broken body / no manager
	if code, _ := post(s.handleStorageSettings, "not json"); code != http.StatusBadRequest {
		t.Errorf("broken body → %d", code)
	}
	off := NewServer(Deps{Creds: creds})
	rec := httptest.NewRecorder()
	off.handleStorageDevices(rec, httptest.NewRequest("GET", "/x", nil))
	if rec.Code != http.StatusServiceUnavailable {
		t.Errorf("no manager → %d", rec.Code)
	}
	// a request naming a device that is not a listed external drive is refused (GOOS is real here: Linux, not root)
	for name, h := range map[string]http.HandlerFunc{"mount": s.handleStorageMount, "unmount": s.handleStorageUnmount, "eject": s.handleStorageEject} {
		code, api := post(h, `{"device":"/dev/nvme0n1p2"}`)
		if code == http.StatusOK {
			t.Errorf("%s of a system disk must never succeed (%d %s)", name, code, api)
		}
	}
}
