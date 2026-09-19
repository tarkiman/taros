package docker

import (
	"context"
	"encoding/json"
	"errors"
	"net"
	"net/http"
	"net/http/httptest"
	"net/url"
	"path/filepath"
	"strings"
	"sync"
	"testing"
)

// fakeDocker serves just enough of the Engine API on a unix socket to drive
// ProjectPlan/UninstallProject, and records every mutating call in order.
type fakeDocker struct {
	mu    sync.Mutex
	calls []string
	// failDelete maps "METHOD path" → status to return instead of 204.
	failDelete map[string]int
}

func (f *fakeDocker) record(s string) {
	f.mu.Lock()
	defer f.mu.Unlock()
	f.calls = append(f.calls, s)
}

func newFake(t *testing.T, project string, f *fakeDocker) *Client {
	t.Helper()
	wantLabel := composeProjectLabel + "=" + project
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		key := r.Method + " " + r.URL.Path
		if r.Method != http.MethodGet {
			f.record(key + "?" + r.URL.RawQuery)
			if code, ok := f.failDelete[key]; ok {
				w.WriteHeader(code)
				_, _ = w.Write([]byte(`{"message":"conflict: in use"}`))
				return
			}
			w.WriteHeader(http.StatusNoContent)
			return
		}
		var flt map[string][]string
		_ = json.Unmarshal([]byte(r.URL.Query().Get("filters")), &flt)
		match := len(flt["label"]) == 1 && flt["label"][0] == wantLabel
		switch r.URL.Path {
		case "/containers/json":
			if !match {
				_, _ = w.Write([]byte(`[]`))
				return
			}
			_, _ = w.Write([]byte(`[
			 {"Id":"aaaaaaaaaaaa1111","Names":["/app-web-1"],"Image":"nginx:1","ImageID":"sha256:img1111111111111","State":"running","Labels":{"com.docker.compose.service":"web"}},
			 {"Id":"bbbbbbbbbbbb2222","Names":["/app-db-1"],"Image":"sha256:img2222222222222","ImageID":"sha256:img2222222222222","State":"exited","Labels":{"com.docker.compose.service":"db"}},
			 {"Id":"cccccccccccc3333","Names":["/app-web-2"],"Image":"nginx:1","ImageID":"sha256:img1111111111111","State":"running","Labels":{"com.docker.compose.service":"web"}}]`))
		case "/networks":
			if match {
				_, _ = w.Write([]byte(`[{"Name":"app_default"}]`))
			} else {
				_, _ = w.Write([]byte(`[]`))
			}
		case "/volumes":
			if match {
				_, _ = w.Write([]byte(`{"Volumes":[{"Name":"app_data"}]}`))
			} else {
				_, _ = w.Write([]byte(`{"Volumes":[]}`))
			}
		default:
			http.NotFound(w, r)
		}
	})
	// Unix socket paths are length-limited; t.TempDir() can be too long.
	dir, err := filepath.Abs(t.TempDir())
	if err != nil {
		t.Fatal(err)
	}
	sock := filepath.Join(dir, "d.sock")
	l, err := net.Listen("unix", sock)
	if err != nil {
		t.Skipf("unix socket unavailable: %v", err)
	}
	srv := httptest.NewUnstartedServer(mux)
	srv.Listener = l
	srv.Start()
	t.Cleanup(srv.Close)
	return NewClient(sock)
}

func TestLabelFilterIsEscapedJSON(t *testing.T) {
	got := labelFilter(`we"ird&name`)
	raw, err := url.QueryUnescape(got)
	if err != nil {
		t.Fatal(err)
	}
	var f map[string][]string
	if err := json.Unmarshal([]byte(raw), &f); err != nil {
		t.Fatalf("not valid JSON after unescape: %v (%q)", err, raw)
	}
	if f["label"][0] != composeProjectLabel+`=we"ird&name` {
		t.Fatalf("label = %q", f["label"][0])
	}
	if strings.ContainsAny(got, `"&`) {
		t.Fatalf("filter not URL-escaped: %q", got)
	}
}

func TestProjectPlan(t *testing.T) {
	c := newFake(t, "app", &fakeDocker{})
	plan, err := c.ProjectPlan(context.Background(), "app")
	if err != nil {
		t.Fatal(err)
	}
	if len(plan.Containers) != 3 || len(plan.Networks) != 1 || len(plan.Volumes) != 1 {
		t.Fatalf("plan = %+v", plan)
	}
	// Two containers share one image → de-duplicated; untagged one falls
	// back to its short id.
	if len(plan.Images) != 2 {
		t.Fatalf("images = %+v", plan.Images)
	}
	refs := plan.Images[0].Ref + "," + plan.Images[1].Ref
	if !strings.Contains(refs, "nginx:1") || !strings.Contains(refs, "img222222222") {
		t.Fatalf("image refs = %s", refs)
	}
}

func TestProjectPlanNotFound(t *testing.T) {
	c := newFake(t, "app", &fakeDocker{})
	if _, err := c.ProjectPlan(context.Background(), "nope"); !errors.Is(err, ErrProjectNotFound) {
		t.Fatalf("err = %v, want ErrProjectNotFound", err)
	}
}

func TestUninstallKeepsDataByDefault(t *testing.T) {
	f := &fakeDocker{}
	c := newFake(t, "app", f)
	res, err := c.UninstallProject(context.Background(), "app", UninstallOptions{})
	if err != nil {
		t.Fatal(err)
	}
	calls := strings.Join(f.calls, "\n")
	for _, bad := range []string{"/volumes/", "/images/"} {
		if strings.Contains(calls, bad) {
			t.Fatalf("default uninstall must not touch %s:\n%s", bad, calls)
		}
	}
	if strings.Contains(calls, "v=1") {
		t.Fatalf("anonymous volumes must be kept by default:\n%s", calls)
	}
	if res.Removed("container") != 3 || res.Removed("network") != 1 || res.Failed() != 0 {
		t.Fatalf("result = %+v", res)
	}
	// Only running containers are stopped, and every stop precedes the
	// first removal.
	lastStop, firstDelete, stops := -1, -1, 0
	for i, s := range f.calls {
		if strings.Contains(s, "/stop") {
			stops++
			lastStop = i
		}
		if strings.HasPrefix(s, "DELETE") && firstDelete < 0 {
			firstDelete = i
		}
	}
	if stops != 2 || lastStop > firstDelete {
		t.Fatalf("stops=%d lastStop=%d firstDelete=%d\n%s", stops, lastStop, firstDelete, calls)
	}
	// Network goes after containers.
	if !strings.HasPrefix(f.calls[len(f.calls)-1], "DELETE /networks/app_default") {
		t.Fatalf("network should be last:\n%s", calls)
	}
}

func TestUninstallWithVolumesAndImages(t *testing.T) {
	f := &fakeDocker{}
	c := newFake(t, "app", f)
	res, err := c.UninstallProject(context.Background(), "app", UninstallOptions{RemoveVolumes: true, RemoveImages: true})
	if err != nil {
		t.Fatal(err)
	}
	calls := strings.Join(f.calls, "\n")
	if strings.Count(calls, "v=1") != 3 {
		t.Fatalf("containers should be removed with v=1:\n%s", calls)
	}
	if res.Removed("volume") != 1 || res.Removed("image") != 2 {
		t.Fatalf("result = %+v", res)
	}
}

func TestUninstallReportsFailuresAndContinues(t *testing.T) {
	f := &fakeDocker{failDelete: map[string]int{
		"DELETE /volumes/app_data":               http.StatusConflict,
		"DELETE /images/sha256:img1111111111111": http.StatusConflict,
	}}
	c := newFake(t, "app", f)
	res, err := c.UninstallProject(context.Background(), "app", UninstallOptions{RemoveVolumes: true, RemoveImages: true})
	if err != nil {
		t.Fatal(err)
	}
	if res.Failed() != 2 || res.Removed("container") != 3 || res.Removed("image") != 1 {
		t.Fatalf("result = %+v", res)
	}
	for _, s := range res.Steps {
		if !s.OK && !strings.Contains(s.Error, "in use") {
			t.Fatalf("daemon message not surfaced: %+v", s)
		}
	}
}
