package web

import (
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"syscall"
	"testing"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/auth"
	"github.com/tarkiman/taros/internal/fileexplorer"
)

type filesRig struct {
	t    *testing.T
	root string
	s    *Server
}

func newFilesRig(t *testing.T) *filesRig {
	t.Helper()
	root := t.TempDir()
	jail, err := fileexplorer.NewJail(root, nil)
	if err != nil {
		t.Fatal(err)
	}
	return &filesRig{t: t, root: jail.Root, s: NewServer(Deps{Jail: jail})}
}

func (r *filesRig) op(body string) (int, string) {
	req := httptest.NewRequest("POST", "/api/files/op", strings.NewReader(body))
	req = req.WithContext(context.WithValue(req.Context(), sessionCtxKey{}, &auth.Session{Username: "tester"}))
	rec := httptest.NewRecorder()
	r.s.handleFilesOp(rec, req)
	var e apiErrorBody
	_ = json.Unmarshal(rec.Body.Bytes(), &e)
	if rec.Code != http.StatusOK && strings.Contains(rec.Body.String(), r.root) {
		r.t.Errorf("an error response must not carry the server's absolute path: %s", rec.Body.String())
	}
	return rec.Code, e.Code
}

func (r *filesRig) file(name, body string) {
	r.t.Helper()
	if err := os.WriteFile(filepath.Join(r.root, name), []byte(body), 0o644); err != nil {
		r.t.Fatal(err)
	}
}

func (r *filesRig) exists(name string) bool {
	_, err := os.Lstat(filepath.Join(r.root, name))
	return err == nil
}

func j(action, path, newPath string) string {
	b, _ := json.Marshal(map[string]string{"action": action, "path": path, "newPath": newPath})
	return string(b)
}

func TestRenameHandler(t *testing.T) {
	r := newFilesRig(t)
	r.file("a.txt", "A")
	r.file("b.txt", "B")
	os.Mkdir(filepath.Join(r.root, "sub"), 0o755)
	p := func(n string) string { return r.root + "/" + n }

	if code, _ := r.op(j("rename", p("a.txt"), p("renamed.txt"))); code != http.StatusOK || !r.exists("renamed.txt") || r.exists("a.txt") {
		t.Fatalf("plain rename → %d", code)
	}
	if code, api := r.op(j("rename", p("renamed.txt"), p("b.txt"))); code != http.StatusConflict || api != apierr.FileExists {
		t.Errorf("onto an existing name → %d %q", code, api)
	}
	if b, _ := os.ReadFile(filepath.Join(r.root, "b.txt")); string(b) != "B" {
		t.Error("the existing file must be untouched")
	}
	// Rename changes a name; it never moves the entry.
	for name, np := range map[string]string{
		"into another folder":     p("sub/b2.txt"),
		"a slash in the new name": p("x/y.txt"),
		"up a level":              p("../escape.txt"),
		"empty name":              p("") + "/",
		"dot":                     p("."),
		"dotdot":                  p(".."),
		"blank":                   p("   "),
	} {
		code, api := r.op(j("rename", p("b.txt"), np))
		if code == http.StatusOK {
			t.Errorf("%s must be refused", name)
		}
		if name != "up a level" && code != http.StatusBadRequest && api != apierr.FileNameInvalid {
			t.Logf("%s → %d %q", name, code, api)
		}
	}
	if !r.exists("b.txt") || r.exists("sub/b2.txt") || r.exists("escape.txt") {
		t.Error("nothing may have moved")
	}
	if code, api := r.op(j("rename", p("ghost.txt"), p("new.txt"))); code == http.StatusOK || (api != apierr.FileNotFound && api != apierr.PathInvalid) {
		t.Errorf("missing source → %d %q", code, api)
	}
}

func TestNewFolderAndFileNamesAreChecked(t *testing.T) {
	r := newFilesRig(t)
	p := func(n string) string { return r.root + "/" + n }
	if code, _ := r.op(j("mkdir", p("album"), "")); code != http.StatusOK || !r.exists("album") {
		t.Fatalf("mkdir → %d", code)
	}
	if code, api := r.op(j("mkdir", p("album"), "")); code != http.StatusConflict || api != apierr.FileExists {
		t.Errorf("mkdir on an existing name → %d %q", code, api)
	}
	if code, api := r.op(j("create", p("album"), "")); code != http.StatusConflict || api != apierr.FileExists {
		t.Errorf("create onto an existing folder → %d %q", code, api)
	}
	if code, _ := r.op(j("create", p("notes.txt"), "")); code != http.StatusOK || !r.exists("notes.txt") {
		t.Errorf("create → %d", code)
	}
	for _, bad := range []string{p(".."), p("."), p("   ")} {
		if code, _ := r.op(j("mkdir", bad, "")); code == http.StatusOK {
			t.Errorf("mkdir %q must be refused", bad)
		}
	}
}

func TestFileOpErrorsAreTranslatedCodes(t *testing.T) {
	for _, tc := range []struct {
		err    error
		status int
		code   string
	}{
		{fileexplorer.ErrInvalidName, 400, apierr.FileNameInvalid},
		{fileexplorer.ErrExists, 409, apierr.FileExists},
		{os.ErrExist, 409, apierr.FileExists},
		{os.ErrNotExist, 404, apierr.FileNotFound},
		{os.ErrPermission, 403, apierr.FilePermissionDenied},
		{&os.PathError{Op: "mkdir", Path: "/mnt/usb/x", Err: syscall.EROFS}, 403, apierr.FileReadOnly},
		{&os.PathError{Op: "write", Path: "/mnt/usb/x", Err: syscall.ENOSPC}, 507, apierr.FileNoSpace},
		{&os.PathError{Op: "mkdir", Path: "/secret/server/path", Err: os.ErrPermission}, 403, apierr.FilePermissionDenied},
	} {
		rec := httptest.NewRecorder()
		writeFileOpError(rec, tc.err)
		var e apiErrorBody
		_ = json.Unmarshal(rec.Body.Bytes(), &e)
		if rec.Code != tc.status || e.Code != tc.code {
			t.Errorf("%v → %d %q, want %d %q", tc.err, rec.Code, e.Code, tc.status, tc.code)
		}
		if strings.Contains(rec.Body.String(), "/secret/server/path") {
			t.Errorf("%v: the path leaked into the response", tc.err)
		}
	}
	rec := httptest.NewRecorder()
	writeFileOpError(rec, os.ErrDeadlineExceeded)
	if rec.Code != 500 {
		t.Errorf("an unknown failure stays a 500: %d", rec.Code)
	}
}
