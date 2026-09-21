package docker

import (
	"context"
	"errors"
	"io"
	"os"
	"strings"
	"testing"
	"time"
)

// TestLiveExec drives ExecShell against the real Docker daemon. Manual check,
// skipped unless TAROS_LIVE_DOCKER=1, and it only touches the throwaway
// containers named below (created by hand, e.g. `docker run -d --name
// zz-shell-sh busybox sleep 3600`):
//
//	TAROS_LIVE_DOCKER=1 go test ./internal/docker -run LiveExec -v
func TestLiveExec(t *testing.T) {
	if os.Getenv("TAROS_LIVE_DOCKER") != "1" {
		t.Skip("set TAROS_LIVE_DOCKER=1")
	}
	c := NewClient("/var/run/docker.sock")
	ctx := context.Background()

	run := func(name string) string {
		s, err := c.ExecShell(ctx, name, 100, 30)
		if err != nil {
			t.Fatalf("%s: %v", name, err)
		}
		defer s.Close()
		_, _ = s.Write([]byte("echo ANSWER=$((6*7)); echo SIZE=$(stty size); echo WHO=$(id -un); exit 7\n"))
		done := make(chan string, 1)
		go func() {
			b, _ := io.ReadAll(s)
			done <- string(b)
		}()
		select {
		case out := <-done:
			code, running, err := s.ExitCode(ctx)
			t.Logf("%s: exit=%d running=%v err=%v", name, code, running, err)
			if code != 7 || running {
				t.Errorf("%s: exit code = %d running=%v, want 7/false", name, code, running)
			}
			return out
		case <-time.After(10 * time.Second):
			t.Fatalf("%s: shell did not finish", name)
		}
		return ""
	}
	for _, n := range []string{"zz-shell-sh", "zz-shell-bash"} {
		out := run(n)
		t.Logf("%s output: %q", n, out)
		for _, want := range []string{"ANSWER=42", "SIZE=30 100", "WHO=root"} {
			if !strings.Contains(out, want) {
				t.Errorf("%s: output missing %q", n, want)
			}
		}
	}

	_, err := c.ExecShell(ctx, "zz-shell-none", 80, 24)
	t.Logf("no-shell container → err = %v (ErrNoShell=%v)", err, errors.Is(err, ErrNoShell))
	_, err = c.ExecShell(ctx, "zz-shell-stopped", 80, 24)
	t.Logf("stopped container  → err = %v (ErrNotRunning=%v)", err, errors.Is(err, ErrNotRunning))
	_, err = c.ExecShell(ctx, "zz-does-not-exist", 80, 24)
	t.Logf("missing container  → err = %v", err)
}
