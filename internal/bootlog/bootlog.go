// Package bootlog keeps a small persistent ledger of host boots so TarOS can
// answer "how often does this machine lose power, when, and what did it look
// like just before". See docs/04-features.md §4.13.
//
// Why a ledger of its own instead of the journal: the Pi has no RTC (boot
// timestamps in the journal are unreliable — two boots were stamped
// 23:31:21), and an abrupt power cut leaves no trace of itself there. TarOS
// writes a heartbeat once a minute; the *absence* of a clean-stop marker at
// the next boot is the evidence.
//
// One entry per host boot (identified by the kernel's boot_id), not per TarOS
// run — TarOS restarts (redeploys, crashes) within a boot only bump counters
// on that boot's entry.
package bootlog

import (
	"errors"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"sync"
	"time"

	"gopkg.in/yaml.v3"
)

const maxBoots = 50

// End kinds recorded on a finished boot.
const (
	EndClean     = "clean"     // TarOS was stopped gracefully (systemd shutdown / reboot)
	EndPowerLoss = "powerLoss" // the boot ended with no clean stop: power cut, hard reset, kernel hang
)

// Snapshot is the last thing TarOS saw before the boot ended (or now, for
// the running boot). Boolean "Has…" flags distinguish "0" from "no sensor".
type Snapshot struct {
	// HasMetrics is false when TarOS hadn't collected its first sample yet
	// (a heartbeat right at startup) — the three values below are then not
	// real zeros and must not be shown as such.
	HasMetrics   bool    `yaml:"hasMetrics" json:"hasMetrics"`
	CPUPercent   float64 `yaml:"cpuPercent" json:"cpuPercent"`
	MemPercent   float64 `yaml:"memPercent" json:"memPercent"`
	CPUTempC     float64 `yaml:"cpuTempC" json:"cpuTempC"`
	NVMeTempC    float64 `yaml:"nvmeTempC" json:"nvmeTempC"`
	HasNVMe      bool    `yaml:"hasNvme" json:"hasNvme"`
	Undervoltage bool    `yaml:"undervoltage" json:"undervoltage"` // seen since the previous heartbeat
	HasUndervolt bool    `yaml:"hasUndervolt" json:"hasUndervolt"`
}

// Boot is one host boot.
type Boot struct {
	BootID string `yaml:"bootId" json:"bootId"`
	// BootedAt is recomputed every heartbeat as now − uptime, so a wrong
	// clock at boot (no RTC) self-corrects once NTP has synced.
	BootedAt time.Time `yaml:"bootedAt" json:"bootedAt"`
	LastSeen time.Time `yaml:"lastSeen" json:"lastSeen"`
	// ClockSynced is whether the clock was NTP-synchronised at LastSeen; when
	// false, the timestamps of this boot are approximate.
	ClockSynced     bool     `yaml:"clockSynced" json:"clockSynced"`
	TarosStarts     int      `yaml:"tarosStarts" json:"tarosStarts"`
	TarosCrashes    int      `yaml:"tarosCrashes" json:"tarosCrashes"` // TarOS restarts that weren't preceded by a clean stop, same boot
	UndervoltEvents int      `yaml:"undervoltEvents" json:"undervoltEvents"`
	Clean           bool     `yaml:"clean" json:"-"`              // the latest TarOS stop in this boot was graceful
	End             string   `yaml:"end,omitempty" json:"end"`    // "" while running / unknown; EndClean | EndPowerLoss
	Notified        bool     `yaml:"notified,omitempty" json:"-"` // the power-loss notice for this boot has been handled (sent, or deliberately not sent)
	Last            Snapshot `yaml:"last" json:"last"`
}

// Sources abstracts everything read from the machine, so the classification
// logic is testable without touching /proc or /sys.
type Sources interface {
	BootID() (string, error)
	UptimeSec() (float64, error)
	ClockSynced() bool
	// NVMeTempC/Undervoltage report ok=false when the sensor doesn't exist.
	NVMeTempC() (c float64, ok bool)
	Undervoltage() (alarm, ok bool)
	// Metrics is TarOS's own latest reading (ok=false before the first tick).
	Metrics() (cpu, mem, cpuTemp float64, ok bool)
}

// Startup describes what Open found about the previous run, for the caller
// to act on (Discord notice).
type Startup struct {
	// PowerLoss is the previous boot, when it ended with no clean stop and its
	// notice hasn't been handled yet (MarkNotified). nil otherwise.
	PowerLoss *Boot
	// Crashed reports that TarOS itself died (not the host) earlier in this
	// same boot.
	Crashed bool
}

type Ledger struct {
	mu     sync.Mutex
	path   string
	src    Sources
	now    func() time.Time
	boots  []Boot // oldest first; the last entry is the running boot
	uvSeen bool
}

type fileFormat struct {
	Boots []Boot `yaml:"boots"`
}

// Open loads the ledger, classifies how the previous run ended, and registers
// this run. A corrupt file is moved aside (kept as <path>.bad) and a fresh
// ledger started — losing history beats refusing to start.
func Open(path string, src Sources) (*Ledger, Startup, error) {
	return open(path, src, time.Now)
}

func open(path string, src Sources, now func() time.Time) (*Ledger, Startup, error) {
	l := &Ledger{path: path, src: src, now: now}
	if data, err := os.ReadFile(path); err == nil {
		var f fileFormat
		if err := yaml.Unmarshal(data, &f); err != nil {
			_ = os.Rename(path, path+".bad")
			slog.Warn("bootlog: file rusak, dipindah ke .bad dan mulai riwayat baru", "path", path, "err", err)
		} else {
			l.boots = f.Boots
		}
	} else if !errors.Is(err, os.ErrNotExist) {
		return nil, Startup{}, fmt.Errorf("bootlog: read %s: %w", path, err)
	}

	id, err := src.BootID()
	if err != nil {
		return nil, Startup{}, fmt.Errorf("bootlog: boot id: %w", err)
	}

	var st Startup
	n := len(l.boots)
	switch {
	case n > 0 && l.boots[n-1].BootID == id:
		cur := &l.boots[n-1]
		if !cur.Clean {
			cur.TarosCrashes++
			st.Crashed = true
		}
		cur.TarosStarts++
		cur.Clean = false
	default:
		if n > 0 {
			prev := &l.boots[n-1]
			if prev.End == "" {
				if prev.Clean {
					prev.End = EndClean
				} else {
					prev.End = EndPowerLoss
				}
			}
		}
		l.boots = append(l.boots, Boot{BootID: id, TarosStarts: 1})
	}
	if len(l.boots) > maxBoots {
		l.boots = l.boots[len(l.boots)-maxBoots:]
	}
	// The notice concerns the boot right before this one, and stays pending
	// until it has been handled — so a TarOS restart before the network came
	// up (or before delivery succeeded) doesn't silently drop it. Only the
	// immediately preceding boot: older unhandled ones are history, not news.
	if n := len(l.boots); n >= 2 {
		if prev := l.boots[n-2]; prev.End == EndPowerLoss && !prev.Notified {
			cp := prev
			st.PowerLoss = &cp
		}
	}
	l.beatLocked()
	return l, st, l.saveLocked()
}

// Run writes a heartbeat every interval (and samples the undervoltage alarm
// every few seconds in between so a short sag isn't missed) until ctx is done.
func (l *Ledger) Run(done <-chan struct{}, interval time.Duration) {
	beat := time.NewTicker(interval)
	uv := time.NewTicker(5 * time.Second)
	defer beat.Stop()
	defer uv.Stop()
	for {
		select {
		case <-done:
			return
		case <-uv.C:
			l.sampleUndervoltage()
		case <-beat.C:
			l.Beat()
		}
	}
}

func (l *Ledger) sampleUndervoltage() {
	if alarm, ok := l.src.Undervoltage(); ok && alarm {
		l.mu.Lock()
		l.uvSeen = true
		l.mu.Unlock()
	}
}

// Beat records "still alive" plus the current readings, and persists.
func (l *Ledger) Beat() {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.beatLocked()
	if err := l.saveLocked(); err != nil {
		slog.Warn("bootlog: gagal menulis heartbeat", "err", err)
	}
}

func (l *Ledger) beatLocked() {
	if len(l.boots) == 0 {
		return
	}
	cur := &l.boots[len(l.boots)-1]
	now := l.now()
	cur.LastSeen = now
	cur.ClockSynced = l.src.ClockSynced()
	if up, err := l.src.UptimeSec(); err == nil {
		cur.BootedAt = now.Add(-time.Duration(up * float64(time.Second))).Truncate(time.Second)
	}

	var s Snapshot
	if cpu, mem, temp, ok := l.src.Metrics(); ok {
		s.HasMetrics, s.CPUPercent, s.MemPercent, s.CPUTempC = true, cpu, mem, temp
	}
	if c, ok := l.src.NVMeTempC(); ok {
		s.NVMeTempC, s.HasNVMe = c, true
	}
	if alarm, ok := l.src.Undervoltage(); ok {
		s.HasUndervolt = true
		if alarm || l.uvSeen {
			s.Undervoltage = true
			cur.UndervoltEvents++
		}
	}
	l.uvSeen = false
	cur.Last = s
}

// MarkClean is called on graceful shutdown: the next start will read this
// boot as having been stopped deliberately.
func (l *Ledger) MarkClean() {
	l.mu.Lock()
	defer l.mu.Unlock()
	if len(l.boots) == 0 {
		return
	}
	l.beatLocked()
	l.boots[len(l.boots)-1].Clean = true
	if err := l.saveLocked(); err != nil {
		slog.Warn("bootlog: gagal menandai shutdown bersih", "err", err)
	}
}

// MarkNotified records that the power-loss notice for bootID has been handled
// — sent, or deliberately not sent (rule off / gave up) — so a TarOS restart
// doesn't act on it again.
func (l *Ledger) MarkNotified(bootID string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	for i := range l.boots {
		if l.boots[i].BootID == bootID {
			l.boots[i].Notified = true
		}
	}
	if err := l.saveLocked(); err != nil {
		slog.Warn("bootlog: gagal menyimpan status notifikasi", "err", err)
	}
}

// Live reads the sensors right now (not from the ledger).
func (l *Ledger) Live() Snapshot {
	var s Snapshot
	if cpu, mem, temp, ok := l.src.Metrics(); ok {
		s.HasMetrics, s.CPUPercent, s.MemPercent, s.CPUTempC = true, cpu, mem, temp
	}
	if c, ok := l.src.NVMeTempC(); ok {
		s.NVMeTempC, s.HasNVMe = c, true
	}
	if alarm, ok := l.src.Undervoltage(); ok {
		s.HasUndervolt, s.Undervoltage = true, alarm
	}
	return s
}

// View is the API shape: newest first, with the running boot flagged.
type View struct {
	Boot
	Running bool `json:"running"`
}

// Boots returns a copy of the ledger, newest first.
func (l *Ledger) Boots() []View {
	l.mu.Lock()
	defer l.mu.Unlock()
	out := make([]View, 0, len(l.boots))
	for i := len(l.boots) - 1; i >= 0; i-- {
		out = append(out, View{Boot: l.boots[i], Running: i == len(l.boots)-1})
	}
	return out
}

func (l *Ledger) saveLocked() error {
	data, err := yaml.Marshal(fileFormat{Boots: l.boots})
	if err != nil {
		return fmt.Errorf("bootlog: marshal: %w", err)
	}
	// Write-then-rename: a power cut in the middle of this very write (the
	// event we exist to record) must never leave a half-written ledger.
	tmp := filepath.Join(filepath.Dir(l.path), "."+filepath.Base(l.path)+".tmp")
	if err := os.WriteFile(tmp, data, 0o644); err != nil {
		return fmt.Errorf("bootlog: write %s: %w", tmp, err)
	}
	if err := os.Rename(tmp, l.path); err != nil {
		return fmt.Errorf("bootlog: rename: %w", err)
	}
	return nil
}
