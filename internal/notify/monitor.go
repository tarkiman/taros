package notify

import (
	"context"
	"log/slog"
	"time"

	"github.com/tarkiman/taros/internal/store"
)

// metric keys — internal bookkeeping only, never exposed to the API.
const (
	metricCPU  = "cpu"
	metricMem  = "mem"
	metricTemp = "temp"
)

// Monitor evaluates the latest metrics.Snapshot against the current
// notify Settings on every tick, tracking how long each metric has been
// continuously above its threshold, and fires a Discord alert once that
// sustained duration is exceeded — plus a single recovery message once
// the metric drops back below threshold. See docs/04-features.md §4.11
// for the semantics (deliberately no repeated spam while a breach is
// ongoing — one alert per breach, one recovery per resolution).
type Monitor struct {
	metrics  *store.Store
	settings *Store

	// breachSince/alerting are only ever touched from the single Run
	// goroutine's tick loop, so no mutex needed here.
	breachSince map[string]time.Time
	alerting    map[string]bool
}

func NewMonitor(metrics *store.Store, settings *Store) *Monitor {
	return &Monitor{
		metrics:     metrics,
		settings:    settings,
		breachSince: make(map[string]time.Time),
		alerting:    make(map[string]bool),
	}
}

// Run blocks, evaluating on every tick until ctx is canceled. tickInterval
// is independent of the collector's own polling intervals — 10s is
// granular enough relative to the 1-minute minimum alert duration without
// needing its own config knob.
func (m *Monitor) Run(ctx context.Context, tickInterval time.Duration) {
	ticker := time.NewTicker(tickInterval)
	defer ticker.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			m.tick()
		}
	}
}

func (m *Monitor) tick() {
	settings := m.settings.Get()
	if !settings.Enabled || settings.WebhookURL == "" {
		m.resetAll()
		return
	}

	snap := m.metrics.Latest()
	if snap == nil {
		return
	}

	m.evaluate(metricCPU, settings.WebhookURL, settings.CPU, snap.CPU.TotalPercent, "CPU", "%")
	m.evaluate(metricMem, settings.WebhookURL, settings.Mem, snap.Mem.UsedPercent, "RAM", "%")

	if len(snap.Temps) > 0 {
		m.evaluate(metricTemp, settings.WebhookURL, settings.Temp, maxTemp(snap.Temps), "Suhu CPU", "°C")
	} else {
		m.reset(metricTemp)
	}
}

func (m *Monitor) resetAll() {
	m.reset(metricCPU)
	m.reset(metricMem)
	m.reset(metricTemp)
}

func (m *Monitor) reset(key string) {
	delete(m.breachSince, key)
	delete(m.alerting, key)
}

// evaluate implements the sustained-threshold state machine for one
// metric — see the Monitor doc comment above for the semantics.
func (m *Monitor) evaluate(key, webhookURL string, rule MetricRule, current float64, label, unit string) {
	if !rule.Enabled {
		m.reset(key)
		return
	}

	threshold := rule.ThresholdPct
	if unit == "°C" {
		threshold = rule.ThresholdC
	}
	duration := time.Duration(rule.DurationMin) * time.Minute

	if current >= threshold {
		since, breaching := m.breachSince[key]
		if !breaching {
			m.breachSince[key] = time.Now()
			return
		}
		if !m.alerting[key] && time.Since(since) >= duration {
			m.alerting[key] = true
			m.send(webhookURL, alertEmbed(label, current, threshold, unit, time.Since(since)))
		}
		return
	}

	// current < threshold
	if m.alerting[key] {
		m.send(webhookURL, recoveryEmbed(label, current, threshold, unit))
	}
	m.reset(key)
}

func (m *Monitor) send(webhookURL string, embed discordEmbed) {
	ctx, cancel := context.WithTimeout(context.Background(), 8*time.Second)
	defer cancel()
	if err := sendWebhook(ctx, webhookURL, embed); err != nil {
		slog.Warn("notify: gagal kirim alert Discord", "err", err)
	}
}

// maxTemp returns the highest sensor reading — same helper as
// internal/collector's own maxTemp, duplicated rather than shared since
// that one is unexported and collector doesn't otherwise need a public
// API surface for it.
func maxTemp(temps []store.TempSensor) float64 {
	max := 0.0
	for _, t := range temps {
		if t.Celsius > max {
			max = t.Celsius
		}
	}
	return max
}
