package notify

import (
	"context"
	"errors"
	"path/filepath"
	"strings"
	"testing"
	"time"
)

func bootStore(t *testing.T, enabled bool) *Store {
	t.Helper()
	st := New(filepath.Join(t.TempDir(), "n.yaml"))
	s := Default()
	s.Enabled, s.WebhookURL = true, "https://discord.com/api/webhooks/1/x"
	s.Boot.PowerLoss = enabled
	if _, err := st.Update(s); err != nil {
		t.Fatal(err)
	}
	return st
}

func newWatcher(st *Store, failFirst int) (*powerLossWatcher, *int, *time.Time) {
	clock := time.Date(2026, 9, 21, 8, 0, 0, 0, time.UTC)
	attempts := 0
	w := &powerLossWatcher{
		settings: st,
		wait:     10 * time.Millisecond,
		giveUp:   time.Hour, // measured on the fake clock below
		now:      func() time.Time { return clock },
	}
	w.post = func(context.Context, string, discordEmbed) error {
		attempts++
		clock = clock.Add(30 * time.Second) // fake time passes per attempt
		if attempts <= failFirst {
			return errors.New("network is unreachable")
		}
		return nil
	}
	return w, &attempts, &clock
}

func info() PowerLossInfo {
	return PowerLossInfo{BootID: "A", BootedAt: time.Date(2026, 9, 21, 5, 0, 0, 0, time.UTC), LastSeen: time.Date(2026, 9, 21, 8, 0, 0, 0, time.UTC), ClockSynced: true, HasMetrics: true, CPUTempC: 44, MemPercent: 41}
}

func TestPowerLossRetriesUntilWifiIsUp(t *testing.T) {
	w, attempts, _ := newWatcher(bootStore(t, true), 3) // first 3 sends fail: Wi-Fi not up yet
	handled := 0
	w.run(context.Background(), info(), func() { handled++ })
	if *attempts != 4 || handled != 1 {
		t.Fatalf("attempts=%d handled=%d, want 4 attempts and exactly one handled()", *attempts, handled)
	}
}

func TestPowerLossGivesUpAfterDeadline(t *testing.T) {
	st := bootStore(t, true)
	w, attempts, _ := newWatcher(st, 1_000_000) // never reachable
	w.giveUp = 5 * time.Minute                  // 30 s of fake time per attempt
	handled := 0
	w.run(context.Background(), info(), func() { handled++ })
	if handled != 1 || *attempts < 5 || *attempts > 12 {
		t.Fatalf("attempts=%d handled=%d — must stop retrying near the deadline and mark it handled", *attempts, handled)
	}
}

func TestPowerLossSilentUnlessOptedIn(t *testing.T) {
	w, attempts, _ := newWatcher(bootStore(t, false), 0)
	handled := 0
	w.run(context.Background(), info(), func() { handled++ })
	if *attempts != 0 || handled != 1 {
		t.Fatalf("rule off: attempts=%d handled=%d — must not send, but must mark it handled (not retroactive)", *attempts, handled)
	}

	// Master switch off wins too.
	st := bootStore(t, true)
	s := st.Get()
	s.Enabled = false
	s.Boot.PowerLoss = false // a disabled master with an active rule is rejected by validate; clear it
	if _, err := st.Update(s); err != nil {
		t.Fatal(err)
	}
	w2, attempts2, _ := newWatcher(st, 0)
	w2.run(context.Background(), info(), func() {})
	if *attempts2 != 0 {
		t.Fatal("must not send with notifications disabled")
	}
}

func TestPowerLossStopsOnContextCancel(t *testing.T) {
	st := bootStore(t, true)
	w, attempts, _ := newWatcher(st, 1_000_000)
	w.wait = time.Hour
	w.giveUp = 100 * time.Hour // long enough that it is the cancel, not the deadline, that ends it
	ctx, cancel := context.WithCancel(context.Background())
	done := make(chan struct{})
	handled := 0
	go func() { w.run(ctx, info(), func() { handled++ }); close(done) }()
	for *attempts == 0 {
		time.Sleep(time.Millisecond)
	}
	cancel()
	select {
	case <-done:
	case <-time.After(2 * time.Second):
		t.Fatal("watcher did not stop on cancel")
	}
	if handled != 0 {
		t.Fatal("shutting down mid-retry must NOT mark the notice handled — the next start retries")
	}
}

func TestPowerLossEmbedVerdicts(t *testing.T) {
	get := func(i PowerLossInfo) string {
		e := powerLossEmbed(i)
		for _, f := range e.Fields {
			if f.Name == "Petunjuk" {
				return f.Value
			}
		}
		return ""
	}
	base := info()
	base.HasUndervolt = true
	if v := get(base); !strings.Contains(v, "listrik terputus mendadak") {
		t.Fatalf("normal readings verdict = %q", v)
	}
	sag := base
	sag.Undervoltage = true
	if v := get(sag); !strings.Contains(v, "Undervoltage terdeteksi") {
		t.Fatalf("undervoltage verdict = %q", v)
	}
	none := info() // HasUndervolt false
	if v := get(none); !strings.Contains(v, "tidak tersedia") {
		t.Fatalf("no-sensor verdict = %q", v)
	}
	if e := powerLossEmbed(func() PowerLossInfo { i := info(); i.ClockSynced = false; return i }()); !strings.Contains(e.Description, "perkiraan") {
		t.Fatalf("unsynced clock must be flagged: %q", e.Description)
	}
}

func TestBootRuleAloneRequiresWebhook(t *testing.T) {
	st := New(filepath.Join(t.TempDir(), "n.yaml"))
	s := Default()
	s.Boot.PowerLoss = true
	if _, err := st.Update(s); !IsInvalid(err) {
		t.Fatalf("enabling the boot rule with no webhook should be invalid, got %v", err)
	}
}

func TestPowerLossEmbedDoesNotInventReadings(t *testing.T) {
	i := info()
	i.HasMetrics = false // heartbeat before the first metrics sample: no real CPU/RAM/temp
	e := powerLossEmbed(i)
	for _, f := range e.Fields {
		if f.Name == "Pembacaan terakhir" {
			t.Fatalf("shows a reading that was never taken: %q", f.Value)
		}
	}
}
