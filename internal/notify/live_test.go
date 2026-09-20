package notify

import (
	"context"
	"os"
	"path/filepath"
	"testing"
	"time"

	"github.com/tarkiman/taros/internal/docker"
)

// TestLiveDocker runs the real monitor against the real Docker daemon with a
// captured (never sent) webhook. Manual check, skipped unless
// TAROS_LIVE_DOCKER=1: `TAROS_LIVE_DOCKER=1 go test ./internal/notify -run Live -v`.
// The clock is faked (1 min per tick) so grace/sustain rules elapse while real
// containers keep crashing for real.
func TestLiveDocker(t *testing.T) {
	if os.Getenv("TAROS_LIVE_DOCKER") != "1" {
		t.Skip("set TAROS_LIVE_DOCKER=1")
	}
	client := docker.NewClient("/var/run/docker.sock")
	store := New(filepath.Join(t.TempDir(), "n.yaml"))
	s := Default()
	s.Enabled, s.WebhookURL = true, "https://discord.com/api/webhooks/1/x"
	s.Containers.Enabled, s.Containers.IncludeLogs = true, true
	if _, err := store.Update(s); err != nil {
		t.Fatal(err)
	}
	m := NewContainerMonitor(client, store)
	clock := time.Now()
	m.now = func() time.Time { return clock }
	m.post = func(_ context.Context, _ string, e discordEmbed) error {
		t.Logf("POST  %s\n      %s", e.Title, e.Description)
		for _, f := range e.Fields {
			t.Logf("      · %s: %s", f.Name, f.Value)
		}
		return nil
	}

	infos, err := client.InspectAll(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	t.Logf("inspected %d real containers", len(infos))
	for i := 0; i < 14; i++ {
		m.tick(context.Background())
		clock = clock.Add(time.Minute)
		time.Sleep(4 * time.Second)
	}
}
