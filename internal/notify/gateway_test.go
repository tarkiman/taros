package notify

import (
	"context"
	"path/filepath"
	"testing"
	"time"

	"github.com/tarkiman/taros/internal/gateway"
)

type fakeGW struct{ snap gateway.Snapshot }

func (f *fakeGW) Snapshot() gateway.Snapshot { return f.snap }

func TestGatewayMonitor(t *testing.T) {
	st, err := Load(filepath.Join(t.TempDir(), "notify.yaml"))
	if err != nil {
		t.Fatal(err)
	}
	cfg := Default()
	cfg.Enabled, cfg.WebhookURL = true, "https://discord.com/api/webhooks/1/x"
	cfg.Gateway.Enabled = true
	if _, err := st.Update(cfg); err != nil {
		t.Fatal(err)
	}
	src := &fakeGW{}
	m := NewGatewayMonitor(src, st)
	clock := time.Unix(1_800_000_000, 0)
	m.now = func() time.Time { return clock }
	var titles []string
	m.post = func(_ context.Context, _ string, e discordEmbed) error { titles = append(titles, e.Title); return nil }
	tick := func(d time.Duration) { clock = clock.Add(d); m.tick(context.Background()) }

	healthy := gateway.Snapshot{
		At:       clock,
		ZeroTier: gateway.ZeroTier{Available: true, Online: true},
		Central:  []gateway.CentralState{{Target: gateway.Target{Label: "NVR", Addr: "10.0.0.1:8091"}, OK: true}},
		Relays: gateway.RelayState{Available: true, Streams: []gateway.Relay{
			{Name: "cam1", Sources: []string{"rtsp://192.168.1.14:8554"}, Active: true, InKbps: 400, Consumers: []gateway.Consumer{{Remote: "172.22.244.135:5000"}}},
			{Name: "idle", Active: false}, // nobody watching: never "down"
		}},
	}
	src.snap = healthy
	tick(0)
	down := healthy
	down.Relays.Streams = []gateway.Relay{{Name: "cam1", Active: false, Consumers: healthy.Relays.Streams[0].Consumers}, {Name: "idle"}}
	down.Central = []gateway.CentralState{{Target: healthy.Central[0].Target, OK: false, Error: "timeout"}}
	src.snap = down
	tick(time.Minute)
	tick(time.Minute) // 2 min < 3 min grace: still quiet
	if len(titles) != 0 {
		t.Fatalf("alerted before grace: %v", titles)
	}
	tick(2 * time.Minute) // past grace: two alerts
	tick(time.Minute)     // no repeats
	src.snap = healthy
	tick(time.Minute) // both recover
	want := []string{"🔴 Relay cam1 tidak mengirim data", "🔴 Server pusat NVR tidak terjangkau", "✅ Relay cam1 pulih", "✅ Server pusat NVR terjangkau lagi"}
	if len(titles) != 4 {
		t.Fatalf("titles = %v", titles)
	}
	got := map[string]bool{}
	for _, x := range titles {
		got[x] = true
	}
	for _, w := range want {
		if !got[w] {
			t.Fatalf("missing %q in %v", w, titles)
		}
	}
}
