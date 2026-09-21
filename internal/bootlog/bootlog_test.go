package bootlog

import (
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"
)

type fakeSrc struct {
	noMetrics bool
	bootID    string
	uptime    float64
	synced    bool
	nvme      float64
	hasNVMe   bool
	uv        bool
	hasUV     bool
	cpu, mem  float64
	temp      float64
	noID      bool
}

func (f *fakeSrc) BootID() (string, error) {
	if f.noID {
		return "", errors.New("no boot id")
	}
	return f.bootID, nil
}
func (f *fakeSrc) UptimeSec() (float64, error) { return f.uptime, nil }
func (f *fakeSrc) ClockSynced() bool           { return f.synced }
func (f *fakeSrc) NVMeTempC() (float64, bool)  { return f.nvme, f.hasNVMe }
func (f *fakeSrc) Undervoltage() (bool, bool)  { return f.uv, f.hasUV }
func (f *fakeSrc) Metrics() (float64, float64, float64, bool) {
	return f.cpu, f.mem, f.temp, !f.noMetrics
}

type rig struct {
	t     *testing.T
	path  string
	src   *fakeSrc
	clock time.Time
}

func newRig(t *testing.T) *rig {
	return &rig{t: t, path: filepath.Join(t.TempDir(), "boots.yaml"), src: &fakeSrc{bootID: "boot-A", synced: true, uptime: 30}, clock: time.Date(2026, 9, 21, 8, 0, 0, 0, time.UTC)}
}

func (r *rig) open() (*Ledger, Startup) {
	r.t.Helper()
	l, st, err := open(r.path, r.src, func() time.Time { return r.clock })
	if err != nil {
		r.t.Fatal(err)
	}
	return l, st
}

func TestFirstBootHasNoHistory(t *testing.T) {
	r := newRig(t)
	l, st := r.open()
	if st.PowerLoss != nil || st.Crashed {
		t.Fatalf("first run must report nothing: %+v", st)
	}
	b := l.Boots()
	if len(b) != 1 || !b[0].Running || b[0].TarosStarts != 1 || b[0].End != "" {
		t.Fatalf("boots = %+v", b)
	}
	// Booted 30 s before "now".
	if want := r.clock.Add(-30 * time.Second); !b[0].BootedAt.Equal(want) {
		t.Fatalf("BootedAt = %v, want %v", b[0].BootedAt, want)
	}
}

func TestCleanStopThenRebootIsNotPowerLoss(t *testing.T) {
	r := newRig(t)
	l, _ := r.open()
	r.clock = r.clock.Add(time.Hour)
	l.MarkClean() // systemd stopped TarOS on a normal shutdown

	r.src.bootID, r.src.uptime = "boot-B", 20
	l2, st := r.open()
	if st.PowerLoss != nil {
		t.Fatalf("clean shutdown reported as power loss: %+v", st.PowerLoss)
	}
	b := l2.Boots()
	if len(b) != 2 || b[1].End != EndClean || !b[0].Running {
		t.Fatalf("boots = %+v", b)
	}
}

func TestNoCleanStopThenNewBootIsPowerLoss(t *testing.T) {
	r := newRig(t)
	r.src.cpu, r.src.mem, r.src.temp, r.src.nvme, r.src.hasNVMe = 12, 41, 44, 27, true
	l, _ := r.open()
	r.clock = r.clock.Add(3 * time.Hour)
	l.Beat() // last heartbeat before the plug is pulled
	// (no MarkClean: power cut)

	r.clock = r.clock.Add(10 * time.Minute) // off for a while
	r.src.bootID, r.src.uptime = "boot-B", 15
	l2, st := r.open()
	if st.PowerLoss == nil {
		t.Fatal("expected a power-loss finding")
	}
	p := st.PowerLoss
	if p.BootID != "boot-A" || p.End != EndPowerLoss {
		t.Fatalf("finding = %+v", p)
	}
	// The record just before the cut is preserved.
	if p.Last.CPUTempC != 44 || p.Last.NVMeTempC != 27 || !p.Last.HasNVMe {
		t.Fatalf("last reading lost: %+v", p.Last)
	}
	if want := time.Date(2026, 9, 21, 11, 0, 0, 0, time.UTC); !p.LastSeen.Equal(want) {
		t.Fatalf("LastSeen = %v, want %v (the last heartbeat, not the reopen time)", p.LastSeen, want)
	}
	if b := l2.Boots(); b[1].End != EndPowerLoss {
		t.Fatalf("history not updated: %+v", b)
	}
}

func TestPowerLossStaysPendingUntilHandled(t *testing.T) {
	r := newRig(t)
	r.open()
	r.src.bootID = "boot-B"
	_, st := r.open()
	if st.PowerLoss == nil || st.PowerLoss.BootID != "boot-A" {
		t.Fatalf("setup: expected boot-A finding, got %+v", st.PowerLoss)
	}

	// TarOS is redeployed/restarted before the Wi-Fi came up and the notice
	// went out: it must still be offered, not silently dropped.
	l3, st3 := r.open()
	if st3.PowerLoss == nil || st3.PowerLoss.BootID != "boot-A" {
		t.Fatalf("pending notice lost across a TarOS restart: %+v", st3.PowerLoss)
	}

	l3.MarkNotified("boot-A")
	_, st4 := r.open()
	if st4.PowerLoss != nil {
		t.Fatalf("re-announced after being handled: %+v", st4.PowerLoss)
	}
}

func TestOldPowerLossIsHistoryNotNews(t *testing.T) {
	r := newRig(t)
	r.open() // boot-A: never stopped cleanly
	r.src.bootID = "boot-B"
	lb, st := r.open()
	if st.PowerLoss == nil || st.PowerLoss.BootID != "boot-A" {
		t.Fatalf("setup: boot-A should be reported when boot-B starts, got %+v", st.PowerLoss)
	}
	lb.MarkClean() // ...but it was never handled (rule was off); boot-B then ends normally

	r.src.bootID = "boot-C"
	_, st = r.open()
	if st.PowerLoss != nil {
		t.Fatalf("boot-A's power loss is two boots old now: history, not news — got %+v", st.PowerLoss)
	}
}

func TestTarosCrashInsideABootIsNotPowerLoss(t *testing.T) {
	r := newRig(t)
	l, _ := r.open()
	l.MarkClean()
	_, st := r.open() // redeploy: clean stop, same boot
	if st.Crashed || st.PowerLoss != nil {
		t.Fatalf("clean restart flagged: %+v", st)
	}

	// Now TarOS is killed (no MarkClean) and restarted in the same boot.
	l3, st3 := r.open()
	if !st3.Crashed || st3.PowerLoss != nil {
		t.Fatalf("want Crashed only, got %+v", st3)
	}
	b := l3.Boots()
	if len(b) != 1 || b[0].TarosStarts != 3 || b[0].TarosCrashes != 1 {
		t.Fatalf("counters = %+v", b[0])
	}
}

func TestUndervoltageSagBetweenHeartbeatsIsNotMissed(t *testing.T) {
	r := newRig(t)
	r.src.hasUV = true
	l, _ := r.open()

	r.src.uv = true // the 5 s sampler catches a sag...
	l.sampleUndervoltage()
	r.src.uv = false // ...that is gone by the next heartbeat
	l.Beat()

	b := l.Boots()[0]
	if !b.Last.Undervoltage || b.UndervoltEvents != 1 {
		t.Fatalf("sag missed: %+v", b)
	}
	l.Beat() // a clean interval afterwards resets the flag
	if b := l.Boots()[0]; b.Last.Undervoltage || b.UndervoltEvents != 1 {
		t.Fatalf("flag should clear after a quiet interval: %+v", b)
	}
}

func TestBootTimeSelfCorrectsOnceClockSyncs(t *testing.T) {
	r := newRig(t)
	r.src.synced = false
	r.clock = time.Date(2026, 9, 19, 23, 31, 21, 0, time.UTC) // the stale fake-hwclock time
	l, _ := r.open()
	if l.Boots()[0].ClockSynced {
		t.Fatal("must record that the clock was not synced")
	}
	wrong := l.Boots()[0].BootedAt

	// NTP kicks in: the real time jumps forward, uptime keeps counting.
	r.clock = time.Date(2026, 9, 21, 8, 0, 45, 0, time.UTC)
	r.src.synced, r.src.uptime = true, 75
	l.Beat()
	b := l.Boots()[0]
	if !b.ClockSynced || b.BootedAt.Equal(wrong) {
		t.Fatalf("BootedAt did not correct: %v (was %v)", b.BootedAt, wrong)
	}
	if want := time.Date(2026, 9, 21, 7, 59, 30, 0, time.UTC); !b.BootedAt.Equal(want) {
		t.Fatalf("BootedAt = %v, want %v", b.BootedAt, want)
	}
}

func TestPersistsAcrossOpenAndKeepsOnlyRecentBoots(t *testing.T) {
	r := newRig(t)
	for i := 0; i < maxBoots+7; i++ {
		r.src.bootID = "boot-" + string(rune('A'+i%26)) + string(rune('a'+i/26))
		r.open()
	}
	l, _ := r.open()
	if n := len(l.Boots()); n != maxBoots {
		t.Fatalf("kept %d boots, want %d", n, maxBoots)
	}
}

func TestCorruptFileIsSetAsideNotFatal(t *testing.T) {
	r := newRig(t)
	if err := os.WriteFile(r.path, []byte("boots: [unclosed"), 0o644); err != nil {
		t.Fatal(err)
	}
	l, st := r.open()
	if st.PowerLoss != nil || len(l.Boots()) != 1 {
		t.Fatalf("fresh start expected: %+v", l.Boots())
	}
	if _, err := os.Stat(r.path + ".bad"); err != nil {
		t.Fatalf("corrupt file should be kept as .bad: %v", err)
	}
}

func TestSaveLeavesNoTempFileAndIsValidYAML(t *testing.T) {
	r := newRig(t)
	l, _ := r.open()
	l.Beat()
	entries, _ := os.ReadDir(filepath.Dir(r.path))
	for _, e := range entries {
		if e.Name() != filepath.Base(r.path) {
			t.Fatalf("stray file left behind: %s", e.Name())
		}
	}
	if _, st := r.open(); st.Crashed != true {
		t.Fatal("a fresh open of the saved file must parse (and see the missing clean stop)")
	}
}

func TestBootIDFailureIsAnError(t *testing.T) {
	r := newRig(t)
	r.src.noID = true
	if _, _, err := open(r.path, r.src, time.Now); err == nil {
		t.Fatal("no boot id → the ledger cannot classify anything, must error")
	}
}

func TestMetricsNotYetAvailableIsNotRecordedAsZero(t *testing.T) {
	r := newRig(t)
	r.src.noMetrics = true // heartbeat at startup, before the collector's first tick
	l, _ := r.open()
	if s := l.Boots()[0].Last; s.HasMetrics {
		t.Fatalf("no sample yet, yet HasMetrics=true: %+v", s)
	}
	r.src.noMetrics, r.src.cpu, r.src.temp = false, 12, 44
	l.Beat()
	if s := l.Boots()[0].Last; !s.HasMetrics || s.CPUTempC != 44 {
		t.Fatalf("real sample not recorded: %+v", s)
	}
}
