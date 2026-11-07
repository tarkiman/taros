package gateway

import (
	"context"
	"io"
	"net/http"
	"net/http/httptest"
	"os"
	"strings"
	"sync"
	"testing"
	"time"

	"github.com/tarkiman/taros/internal/gateway/discover"
)

func TestBuildSource(t *testing.T) {
	old := "rtsp://admin:p%40ss@192.168.1.14:554/stream1"
	cases := []struct {
		name string
		in   SourceInput
		old  string
		want string
		err  error
	}{
		{"keeps old password", SourceInput{URL: "rtsp://192.168.1.14:554/stream2", Username: "admin"}, old, "rtsp://admin:p%40ss@192.168.1.14:554/stream2", nil},
		{"new password encoded", SourceInput{URL: "rtsp://192.168.1.14/x", Username: "admin", Password: "a@b:c"}, old, "rtsp://admin:a%40b%3Ac@192.168.1.14/x", nil},
		{"other user drops password", SourceInput{URL: "rtsp://192.168.1.14/x", Username: "bob"}, old, "rtsp://bob@192.168.1.14/x", nil},
		{"no credentials", SourceInput{URL: "rtsp://10.0.0.5:8554/unicast"}, "", "rtsp://10.0.0.5:8554/unicast", nil},
		{"host name ok", SourceInput{URL: "rtsp://cam-garasi.lan/s"}, "", "rtsp://cam-garasi.lan/s", nil},
		{"public ip refused", SourceInput{URL: "rtsp://8.8.8.8/s"}, "", "", ErrPublicSource},
		{"bad scheme", SourceInput{URL: "exec:ffmpeg -i x"}, "", "", ErrInvalidSource},
		{"no host", SourceInput{URL: "rtsp:///x"}, "", "", ErrInvalidSource},
	}
	for _, c := range cases {
		got, err := BuildSource(c.in, c.old)
		if err != c.err || got != c.want {
			t.Errorf("%s: got %q, %v; want %q, %v", c.name, got, err, c.want, c.err)
		}
	}
}

func TestDescribeAndEditable(t *testing.T) {
	d := DescribeSource("rtsp://admin:secret@192.168.1.14:554/s")
	if d.URL != "rtsp://192.168.1.14:554/s" || d.Username != "admin" || !d.HasPassword {
		t.Fatalf("describe: %+v", d)
	}
	if d := DescribeSource("weird:admin:secret@x"); strings.Contains(d.URL, "secret") {
		t.Fatalf("describe leaked: %+v", d)
	}
	for srcs, want := range map[string]string{
		"rtsp://a/x":            "",
		"xiaomi://u:p@1.2.3.4":  "xiaomi",
		"ffmpeg:cam#video=h264": "scheme",
	} {
		ok, reason := Editable([]string{srcs})
		if reason != want || ok != (want == "") {
			t.Errorf("%s: %v %q", srcs, ok, reason)
		}
	}
	if ok, r := Editable([]string{"rtsp://a", "ffmpeg:x"}); ok || r != "multiple" {
		t.Errorf("multiple: %v %q", ok, r)
	}
}

func TestSetRTSPLoginKeepsComments(t *testing.T) {
	in := `# gateway pipit
api:
  listen: "127.0.0.1:1984" # tunnel only

rtsp:
  listen: ":8554"
  username: "nvr"
  password: "CHANGE-ME" # long random
streams:
  cam1: rtsp://192.168.1.14:8554/unicast
`
	out, err := setRTSPLogin([]byte(in), "nvr", `n3w"pa:ss`)
	if err != nil {
		t.Fatal(err)
	}
	s := string(out)
	for _, want := range []string{"# gateway pipit", "# tunnel only", "# long random", `password: "n3w\"pa:ss"`, "cam1: rtsp://192.168.1.14:8554/unicast"} {
		if !strings.Contains(s, want) {
			t.Errorf("missing %q in:\n%s", want, s)
		}
	}
	if strings.Contains(s, "CHANGE-ME") {
		t.Errorf("old password still there:\n%s", s)
	}

	out, err = setRTSPLogin([]byte("streams:\n  a: rtsp://x/y\n"), "nvr", "pw")
	if err != nil || !strings.Contains(string(out), "rtsp:\n  username: \"nvr\"\n  password: \"pw\"") {
		t.Fatalf("added section: %v\n%s", err, out)
	}
}

// fakeGo2rtc mimics the parts of the go2rtc API that Admin uses.
type fakeGo2rtc struct {
	mu       sync.Mutex
	config   string
	streams  map[string]string
	restarts int
}

func (f *fakeGo2rtc) ServeHTTP(w http.ResponseWriter, r *http.Request) {
	f.mu.Lock()
	defer f.mu.Unlock()
	switch {
	case r.URL.Path == "/api/config" && r.Method == http.MethodGet:
		var b strings.Builder
		b.WriteString(f.config + "streams:\n")
		for k, v := range f.streams {
			b.WriteString("  " + k + ": " + v + "\n")
		}
		io.WriteString(w, b.String())
	case r.URL.Path == "/api/config" && r.Method == http.MethodPost:
		b, _ := io.ReadAll(r.Body)
		f.config = strings.Split(string(b), "streams:")[0]
	case r.URL.Path == "/api/streams" && r.Method == http.MethodPut:
		f.streams[r.URL.Query().Get("name")] = r.URL.Query().Get("src")
	case r.URL.Path == "/api/streams" && r.Method == http.MethodDelete:
		delete(f.streams, r.URL.Query().Get("src"))
	case r.URL.Path == "/api/restart":
		f.restarts++
	default:
		http.NotFound(w, r)
	}
}

func TestAdminCRUD(t *testing.T) {
	f := &fakeGo2rtc{config: "rtsp:\n  listen: \":8555\"\n  username: nvr\n  password: old\n", streams: map[string]string{"cam1": "rtsp://admin:pw@192.168.1.14/s"}}
	srv := httptest.NewServer(f)
	defer srv.Close()
	a := NewAdmin(srv.URL)
	ctx := context.Background()

	rc, err := a.Relays(ctx)
	if err != nil {
		t.Fatal(err)
	}
	if rc.RTSP.Port != 8555 || rc.RTSP.Username != "nvr" || !rc.RTSP.HasPassword || len(rc.Streams) != 1 || rc.Streams[0].Sources[0].URL != "rtsp://192.168.1.14/s" {
		t.Fatalf("relays: %+v", rc)
	}
	if err := a.CreateStream(ctx, "cam1", "rtsp://x/y"); err != ErrStreamExists {
		t.Fatalf("create existing: %v", err)
	}
	if err := a.CreateStream(ctx, "garasi", "rtsp://192.168.0.30/s"); err != nil {
		t.Fatal(err)
	}
	if err := a.UpdateStream(ctx, "nope", "rtsp://x/y"); err != ErrStreamNotFound {
		t.Fatalf("update missing: %v", err)
	}
	if err := a.DeleteStream(ctx, "garasi"); err != nil || f.streams["garasi"] != "" {
		t.Fatalf("delete: %v %v", err, f.streams)
	}
	if err := a.SetRTSPLogin(ctx, "nvr", "fresh"); err != nil {
		t.Fatal(err)
	}
	if !strings.Contains(f.config, `password: "fresh"`) || f.restarts != 1 {
		t.Fatalf("rotation: restarts=%d config=%s", f.restarts, f.config)
	}
}

// TestAdminRealGo2rtc runs against a real go2rtc when TAROS_TEST_GO2RTC (API base) and
// TAROS_TEST_GO2RTC_RTSP (host:port of its RTSP server) are set — a throwaway container
// with stream "cam1", never a gateway in use.
func TestAdminRealGo2rtc(t *testing.T) {
	base, rtspAddr := os.Getenv("TAROS_TEST_GO2RTC"), os.Getenv("TAROS_TEST_GO2RTC_RTSP")
	if base == "" || rtspAddr == "" {
		t.Skip("TAROS_TEST_GO2RTC / TAROS_TEST_GO2RTC_RTSP not set")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 60*time.Second)
	defer cancel()
	a := NewAdmin(base)
	if err := a.CreateStream(ctx, "itest", "rtsp://192.168.250.250:554/none"); err != nil {
		t.Fatal(err)
	}
	if srcs, err := a.Sources(ctx, "itest"); err != nil || len(srcs) != 1 {
		t.Fatalf("sources: %v %v", srcs, err)
	}
	if err := a.UpdateStream(ctx, "itest", "rtsp://192.168.250.251:554/none"); err != nil {
		t.Fatal(err)
	}
	if err := a.DeleteStream(ctx, "itest"); err != nil {
		t.Fatal(err)
	}
	if err := a.SetRTSPLogin(ctx, "nvr", "rotated-pass"); err != nil {
		t.Fatal(err)
	}
	var code int
	for i := 0; i < 20; i++ { // go2rtc restarts
		time.Sleep(500 * time.Millisecond)
		if code = discover.DescribeCode(ctx, "rtsp://"+rtspAddr+"/cam1", "nvr", "rotated-pass"); code != 0 {
			break
		}
	}
	if code == 401 || code == 0 {
		t.Fatalf("new login: DESCRIBE %d", code)
	}
	if c := discover.DescribeCode(ctx, "rtsp://"+rtspAddr+"/cam1", "nvr", "old-pass"); c != 401 {
		t.Fatalf("old login still works: DESCRIBE %d", c)
	}
	rc, err := a.Relays(ctx)
	if err != nil || rc.RTSP.Username != "nvr" || !rc.RTSP.HasPassword {
		t.Fatalf("after rotation: %+v %v", rc, err)
	}
}
