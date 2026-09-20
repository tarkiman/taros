package notify

import (
	"context"
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/tarkiman/taros/internal/docker"
)

type fakeSource struct {
	infos    []docker.ContainerInfo
	logs     map[string][]string
	logCalls int
}

func (f *fakeSource) InspectAll(context.Context) ([]docker.ContainerInfo, error) { return f.infos, nil }
func (f *fakeSource) LogTail(_ context.Context, id string, _ int) ([]string, error) {
	f.logCalls++
	return f.logs[id], nil
}

type harness struct {
	t     *testing.T
	m     *ContainerMonitor
	src   *fakeSource
	posts []discordEmbed
	clock time.Time
	store *Store
}

func newHarness(t *testing.T, mutate func(*ContainerRules)) *harness {
	t.Helper()
	store := New(filepath.Join(t.TempDir(), "notify.yaml"))
	s := Default()
	s.Enabled = true
	s.WebhookURL = "https://discord.com/api/webhooks/1/x"
	s.Containers.Enabled = true
	if mutate != nil {
		mutate(&s.Containers)
	}
	if _, err := store.Update(s); err != nil {
		t.Fatal(err)
	}
	h := &harness{t: t, src: &fakeSource{logs: map[string][]string{}}, clock: time.Date(2026, 9, 21, 9, 0, 0, 0, time.UTC), store: store}
	h.m = NewContainerMonitor(h.src, store)
	h.m.now = func() time.Time { return h.clock }
	h.m.post = func(_ context.Context, _ string, e discordEmbed) error {
		h.posts = append(h.posts, e)
		return nil
	}
	return h
}

// tick runs one evaluation, then moves the clock forward by d.
func (h *harness) tick(d time.Duration) {
	h.m.tick(context.Background())
	h.clock = h.clock.Add(d)
}

func (h *harness) titles() string {
	var out []string
	for _, p := range h.posts {
		out = append(out, p.Title)
	}
	return strings.Join(out, " | ")
}

func ct(id string) docker.ContainerInfo {
	return docker.ContainerInfo{ID: id, Name: id, Project: "app", State: "running", RestartPolicy: "unless-stopped"}
}

func TestRestartLoopAlertsOnceThenRecovers(t *testing.T) {
	h := newHarness(t, nil) // grace 3 min
	c := ct("api")
	c.RestartCount = 68 // already high when TarOS starts: must be baseline, not counted
	h.src.infos = []docker.ContainerInfo{c}

	// One restart per minute, like deploy-backend-1's 60s crash cycle.
	for i := 0; i < 6; i++ {
		h.tick(time.Minute)
		c.RestartCount++
		h.src.infos = []docker.ContainerInfo{c}
	}
	alerts := 0
	for _, p := range h.posts {
		if strings.HasPrefix(p.Title, "🔴 Container bermasalah: api") {
			alerts++
		}
	}
	if alerts != 1 {
		t.Fatalf("want exactly 1 alert while looping, got %d: %s", alerts, h.titles())
	}
	if !strings.Contains(h.posts[0].Description, "restart berulang") {
		t.Fatalf("description = %q", h.posts[0].Description)
	}

	// Restarts stop; after the window drains + recoverAfter a single recovery follows.
	for i := 0; i < 40 && !strings.Contains(h.titles(), "✅"); i++ {
		h.tick(time.Minute)
	}
	if !strings.Contains(h.titles(), "✅ Container pulih: api") {
		t.Fatalf("no recovery message: %s", h.titles())
	}
	before := len(h.posts)
	for i := 0; i < 10; i++ {
		h.tick(time.Minute)
	}
	if len(h.posts) != before {
		t.Fatalf("messages after recovery: %s", h.titles())
	}
}

func TestExistingRestartCountIsBaselineNotAlert(t *testing.T) {
	h := newHarness(t, nil)
	c := ct("api")
	c.RestartCount = 68
	h.src.infos = []docker.ContainerInfo{c}
	for i := 0; i < 20; i++ {
		h.tick(time.Minute)
	}
	if len(h.posts) != 0 {
		t.Fatalf("stable high RestartCount must stay quiet: %s", h.titles())
	}
}

func TestLoopRespectsGrace(t *testing.T) {
	h := newHarness(t, nil) // grace 3 min
	c := ct("api")
	h.src.infos = []docker.ContainerInfo{c}
	h.tick(30 * time.Second) // t=0 baseline
	for i := 0; i < 4; i++ { // t=0.5..2 min: +1 restart per tick → delta>=3 at 1.5min
		c.RestartCount++
		h.src.infos = []docker.ContainerInfo{c}
		h.tick(30 * time.Second)
	}
	if len(h.posts) != 0 {
		t.Fatalf("alert inside grace period: %s", h.titles())
	}
	c.RestartCount++
	h.src.infos = []docker.ContainerInfo{c}
	h.tick(time.Minute)
	c.RestartCount++
	h.src.infos = []docker.ContainerInfo{c}
	h.tick(time.Minute)
	if len(h.posts) != 1 {
		t.Fatalf("want alert once grace passed, got %d: %s", len(h.posts), h.titles())
	}
}

func TestUnhealthyMustBeSustained(t *testing.T) {
	h := newHarness(t, nil)
	c := ct("web")
	c.Health = "unhealthy"
	h.src.infos = []docker.ContainerInfo{c}
	h.tick(time.Minute)
	h.tick(time.Minute)
	if len(h.posts) != 0 {
		t.Fatalf("alerted after 1 min unhealthy: %s", h.titles())
	}
	h.tick(time.Minute) // t=3min
	h.tick(time.Minute)
	if len(h.posts) != 1 || !strings.Contains(h.posts[0].Description, "unhealthy") {
		t.Fatalf("want one unhealthy alert: %s", h.titles())
	}

	// A blip that recovers before the grace period never alerts.
	h2 := newHarness(t, nil)
	c2 := ct("web")
	c2.Health = "unhealthy"
	h2.src.infos = []docker.ContainerInfo{c2}
	h2.tick(time.Minute)
	c2.Health = "healthy"
	h2.src.infos = []docker.ContainerInfo{c2}
	for i := 0; i < 10; i++ {
		h2.tick(time.Minute)
	}
	if len(h2.posts) != 0 {
		t.Fatalf("blip alerted: %s", h2.titles())
	}
}

func TestCrashRules(t *testing.T) {
	cases := []struct {
		name  string
		mod   func(*docker.ContainerInfo)
		alert bool
		want  string
	}{
		{"abnormal exit, should be up", func(c *docker.ContainerInfo) { c.ExitCode = 128 }, true, "exit code 128"},
		{"restart policy no → not expected up", func(c *docker.ContainerInfo) { c.ExitCode = 1; c.RestartPolicy = "no" }, false, ""},
		{"clean exit", func(c *docker.ContainerInfo) { c.ExitCode = 0 }, false, ""},
		{"SIGKILL after docker stop", func(c *docker.ContainerInfo) { c.ExitCode = 137 }, false, ""},
		{"SIGTERM", func(c *docker.ContainerInfo) { c.ExitCode = 143 }, false, ""},
		{"OOM kill hides behind 137", func(c *docker.ContainerInfo) { c.ExitCode = 137; c.OOMKilled = true }, true, "OOM"},
		{"running is fine", func(c *docker.ContainerInfo) { c.State = "running"; c.ExitCode = 1 }, false, ""},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			h := newHarness(t, nil)
			c := ct("db")
			c.State = "exited"
			tc.mod(&c)
			h.src.infos = []docker.ContainerInfo{c}
			for i := 0; i < 6; i++ {
				h.tick(time.Minute)
			}
			if tc.alert {
				if len(h.posts) != 1 || !strings.Contains(h.posts[0].Description, tc.want) {
					t.Fatalf("want one alert containing %q, got %q", tc.want, h.titles())
				}
			} else if len(h.posts) != 0 {
				t.Fatalf("unexpected alert: %s", h.titles())
			}
		})
	}
}

func TestCrashWaitsForBootGrace(t *testing.T) {
	h := newHarness(t, nil)
	c := ct("media")
	c.State, c.ExitCode = "exited", 128
	h.src.infos = []docker.ContainerInfo{c}
	h.tick(time.Minute)
	h.tick(time.Minute) // 2 min in: still inside the 3 min grace
	if len(h.posts) != 0 {
		t.Fatalf("alerted during boot grace: %s", h.titles())
	}
	h.tick(time.Minute)
	h.tick(time.Minute)
	if len(h.posts) != 1 {
		t.Fatalf("want alert after grace: %s", h.titles())
	}
}

func TestBurstIsFoldedIntoSummary(t *testing.T) {
	h := newHarness(t, nil)
	for _, id := range []string{"a", "b", "c", "d", "e", "f"} {
		c := ct(id)
		c.State, c.ExitCode = "exited", 1
		h.src.infos = append(h.src.infos, c)
	}
	for i := 0; i < 5; i++ {
		h.tick(time.Minute)
	}
	if len(h.posts) != maxAlertsPerTick {
		t.Fatalf("want %d messages (3 alerts + summary), got %d: %s", maxAlertsPerTick, len(h.posts), h.titles())
	}
	last := h.posts[len(h.posts)-1]
	if !strings.Contains(last.Title, "3 container lain") {
		t.Fatalf("summary title = %q", last.Title)
	}
	named := 0
	for _, p := range h.posts[:len(h.posts)-1] {
		for _, id := range []string{"a", "b", "c", "d", "e", "f"} {
			if strings.HasSuffix(p.Title, ": "+id) {
				named++
			}
		}
	}
	if named != 3 {
		t.Fatalf("expected 3 individually-named alerts, got %d", named)
	}
	for _, id := range []string{"a", "b", "c", "d", "e", "f"} {
		inSummary := strings.Contains(last.Description, id+" —")
		inDirect := strings.Contains(h.titles(), ": "+id)
		if inSummary == inDirect {
			t.Fatalf("container %s must appear in exactly one of alert/summary", id)
		}
	}
}

func TestLogsOnlyWhenOptedIn(t *testing.T) {
	h := newHarness(t, func(r *ContainerRules) { r.IncludeLogs = true })
	c := ct("db")
	c.State, c.ExitCode = "exited", 1
	h.src.infos = []docker.ContainerInfo{c}
	h.src.logs["db"] = []string{"connect failed", "token ```abc``` leaked"}
	for i := 0; i < 5; i++ {
		h.tick(time.Minute)
	}
	if len(h.posts) != 1 {
		t.Fatalf("posts: %s", h.titles())
	}
	var logField string
	for _, f := range h.posts[0].Fields {
		if f.Name == "Log terakhir" {
			logField = f.Value
		}
	}
	if !strings.Contains(logField, "connect failed") {
		t.Fatalf("log field missing: %+v", h.posts[0].Fields)
	}
	if strings.Contains(strings.TrimSuffix(strings.TrimPrefix(logField, "```\n"), "\n```"), "```") {
		t.Fatalf("backticks in logs would break the code block: %q", logField)
	}

	off := newHarness(t, nil)
	c2 := ct("db")
	c2.State, c2.ExitCode = "exited", 1
	off.src.infos = []docker.ContainerInfo{c2}
	for i := 0; i < 5; i++ {
		off.tick(time.Minute)
	}
	if off.src.logCalls != 0 || len(off.posts) != 1 {
		t.Fatalf("logs must not be read unless opted in (calls=%d posts=%d)", off.src.logCalls, len(off.posts))
	}
}

func TestDisablingResetsAndRestartsGrace(t *testing.T) {
	h := newHarness(t, nil)
	c := ct("db")
	c.State, c.ExitCode = "exited", 1
	h.src.infos = []docker.ContainerInfo{c}
	h.tick(time.Minute)
	h.tick(time.Minute)

	s := h.store.Get()
	s.Containers.Enabled = false
	if _, err := h.store.Update(s); err != nil {
		t.Fatal(err)
	}
	h.tick(10 * time.Minute) // disabled for a while: nothing sent, state dropped
	if len(h.posts) != 0 || len(h.m.tracks) != 0 {
		t.Fatalf("disabled monitor kept state / sent: %s (%d tracks)", h.titles(), len(h.m.tracks))
	}

	s.Containers.Enabled = true
	if _, err := h.store.Update(s); err != nil {
		t.Fatal(err)
	}
	h.tick(time.Minute)
	h.tick(time.Minute)
	if len(h.posts) != 0 {
		t.Fatalf("no fresh grace after re-enabling: %s", h.titles())
	}
	h.tick(time.Minute)
	h.tick(time.Minute)
	if len(h.posts) != 1 {
		t.Fatalf("want alert after the new grace: %s", h.titles())
	}
}

func TestRemovedContainerIsForgottenSilently(t *testing.T) {
	h := newHarness(t, nil)
	c := ct("gone")
	c.Health = "unhealthy"
	h.src.infos = []docker.ContainerInfo{c}
	for i := 0; i < 5; i++ {
		h.tick(time.Minute)
	}
	n := len(h.posts)
	h.src.infos = nil // uninstalled
	for i := 0; i < 10; i++ {
		h.tick(time.Minute)
	}
	if len(h.posts) != n || len(h.m.tracks) != 0 {
		t.Fatalf("removed container should vanish quietly: %s (%d tracks)", h.titles(), len(h.m.tracks))
	}
}

func TestContainerSettingsValidationAndCompat(t *testing.T) {
	d := Default().Containers
	if d.Enabled || !d.RestartLoop || !d.Unhealthy || !d.Crashed || d.GraceMin != 3 || d.IncludeLogs {
		t.Fatalf("defaults = %+v", d)
	}

	store := New(filepath.Join(t.TempDir(), "n.yaml"))
	s := Default()
	s.Enabled, s.WebhookURL = true, "https://discord.com/api/webhooks/1/x"
	s.Containers.Enabled, s.Containers.GraceMin = true, 0
	if _, err := store.Update(s); !IsInvalid(err) {
		t.Fatalf("grace 0 while enabled should be invalid, got %v", err)
	}
	s.Containers.GraceMin = 61
	if _, err := store.Update(s); !IsInvalid(err) {
		t.Fatalf("grace 61 should be invalid, got %v", err)
	}

	// Container alerts alone (no CPU/RAM/temp rule) still need a webhook.
	s = Default()
	s.Containers.Enabled = true
	if _, err := store.Update(s); !IsInvalid(err) {
		t.Fatalf("enabling without webhook should be invalid, got %v", err)
	}

	// A client that omits the container block entirely must not break saving.
	s = Default()
	s.Containers = ContainerRules{}
	got, err := store.Update(s)
	if err != nil || got.Containers.GraceMin != 3 {
		t.Fatalf("legacy payload: err=%v grace=%d", err, got.Containers.GraceMin)
	}
}

func TestOldSettingsFileGetsContainerDefaults(t *testing.T) {
	p := filepath.Join(t.TempDir(), "notify.yaml")
	old := "enabled: true\nwebhookUrl: https://discord.com/api/webhooks/1/x\ncpu: {enabled: true, thresholdPct: 90, durationMin: 5}\n"
	if err := os.WriteFile(p, []byte(old), 0o600); err != nil {
		t.Fatal(err)
	}
	st, err := Load(p)
	if err != nil {
		t.Fatal(err)
	}
	c := st.Get().Containers
	if c.Enabled || !c.RestartLoop || c.GraceMin != 3 {
		t.Fatalf("pre-existing notify.yaml should gain inert defaults, got %+v", c)
	}
}

func TestRecoveryNeedsSustainedClearAndFlapDoesNotRepeat(t *testing.T) {
	h := newHarness(t, nil)
	c := ct("web")
	c.Health = "unhealthy"
	h.src.infos = []docker.ContainerInfo{c}
	for i := 0; i < 4; i++ { // alert fires at 3 min
		h.tick(time.Minute)
	}
	if len(h.posts) != 1 {
		t.Fatalf("setup: want 1 alert, got %s", h.titles())
	}

	// Healthy for 2 min (< recoverAfter), then unhealthy again: the incident
	// is the same one — no "pulih", and no second alert either.
	c.Health = "healthy"
	h.src.infos = []docker.ContainerInfo{c}
	h.tick(time.Minute)
	h.tick(time.Minute)
	c.Health = "unhealthy"
	h.src.infos = []docker.ContainerInfo{c}
	for i := 0; i < 6; i++ {
		h.tick(time.Minute)
	}
	if len(h.posts) != 1 {
		t.Fatalf("a flap inside the recovery window must stay one incident: %s", h.titles())
	}

	// Truly healthy: recovery only after the full quiet period.
	c.Health = "healthy"
	h.src.infos = []docker.ContainerInfo{c}
	for i := 0; i < 4; i++ {
		h.tick(time.Minute)
	}
	if len(h.posts) != 1 {
		t.Fatalf("recovery came before %s of quiet: %s", recoverAfter, h.titles())
	}
	for i := 0; i < 3; i++ {
		h.tick(time.Minute)
	}
	if len(h.posts) != 2 || !strings.HasPrefix(h.posts[1].Title, "✅") {
		t.Fatalf("want recovery after the quiet period: %s", h.titles())
	}
}
