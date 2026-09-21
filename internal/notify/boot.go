package notify

import (
	"context"
	"fmt"
	"log/slog"
	"strings"
	"time"
)

// PowerLossInfo is what the boot ledger (internal/bootlog) knew about the
// boot that ended without a clean stop. Plain fields, so this package needn't
// import bootlog.
type PowerLossInfo struct {
	BootID       string
	BootedAt     time.Time
	LastSeen     time.Time
	ClockSynced  bool // false → the timestamps are approximate (no RTC, NTP not yet synced)
	HasMetrics   bool // false → CPU/RAM/temperature below are not real readings
	CPUTempC     float64
	NVMeTempC    float64
	HasNVMe      bool
	Undervoltage bool
	HasUndervolt bool
	CPUPercent   float64
	MemPercent   float64
}

const (
	powerLossRetryEvery = 30 * time.Second
	powerLossGiveUp     = 15 * time.Minute
)

// WatchPowerLoss sends the "Pi is back after an abrupt power loss" notice.
// It is called right at startup, i.e. usually during boot — when Wi-Fi may
// not be up for another 20–90 s — so it retries every 30 s for up to 15 min
// rather than firing once and losing the message. It stops without sending
// if the rule/webhook isn't enabled (not retroactive: enabling it later
// doesn't dig up old events). handled() is called once the notice needs no
// further attempts — sent, not opted in, or given up — so the ledger stops
// offering it after a TarOS restart. If ctx is canceled first (TarOS is
// shutting down mid-retry) handled() is NOT called, and the next start tries
// again.
func WatchPowerLoss(ctx context.Context, settings *Store, info PowerLossInfo, handled func()) {
	w := &powerLossWatcher{settings: settings, post: sendWebhook, wait: powerLossRetryEvery, giveUp: powerLossGiveUp, now: time.Now}
	w.run(ctx, info, handled)
}

type powerLossWatcher struct {
	settings *Store
	post     func(ctx context.Context, url string, e discordEmbed) error
	wait     time.Duration
	giveUp   time.Duration
	now      func() time.Time
}

func (w *powerLossWatcher) run(ctx context.Context, info PowerLossInfo, handled func()) {
	deadline := w.now().Add(w.giveUp)
	for {
		s := w.settings.Get()
		if !s.Enabled || !s.Boot.PowerLoss || s.WebhookURL == "" {
			handled() // not opted in; a later enable is not retroactive
			return
		}
		sctx, cancel := context.WithTimeout(ctx, 8*time.Second)
		err := w.post(sctx, s.WebhookURL, powerLossEmbed(info))
		cancel()
		if err == nil {
			handled()
			return
		}
		if w.now().Add(w.wait).After(deadline) {
			slog.Warn("notify: gagal mengirim notifikasi mati-mendadak, menyerah", "err", err)
			handled()
			return
		}
		select {
		case <-ctx.Done():
			return
		case <-time.After(w.wait):
		}
	}
}

func powerLossEmbed(i PowerLossInfo) discordEmbed {
	seen := i.LastSeen.Local().Format("02 Jan 2006 15:04")
	if !i.ClockSynced {
		seen += " (perkiraan — jam belum sinkron)"
	}
	desc := "Pi menyala kembali, dan sesi sebelumnya berakhir **tanpa shutdown yang bersih** " +
		"(listrik terputus, reset paksa, atau sistem hang). Terakhir terlihat: " + seen + "."

	var reading []string
	if i.HasMetrics {
		reading = append(reading, fmt.Sprintf("CPU %.0f%% · RAM %.0f%% · suhu %.0f°C", i.CPUPercent, i.MemPercent, i.CPUTempC))
	}
	if i.HasNVMe {
		reading = append(reading, fmt.Sprintf("NVMe %.0f°C", i.NVMeTempC))
	}
	fields := []discordEmbedField{{Name: "Berjalan selama", Value: formatUptime(i.LastSeen.Sub(i.BootedAt)), Inline: true}}
	if len(reading) > 0 {
		fields = append(fields, discordEmbedField{Name: "Pembacaan terakhir", Value: strings.Join(reading, " · ")})
	}
	verdict := "Pembacaan terakhir normal lalu berhenti tiba-tiba — pola yang biasanya berarti **listrik terputus mendadak** (kabel/konektor/adaptor), bukan tegangan yang turun perlahan. Sistem yang hang bisa terlihat serupa."
	switch {
	case i.HasUndervolt && i.Undervoltage:
		verdict = "**Undervoltage terdeteksi** tepat sebelum mati — catu daya/kabel kemungkinan tidak cukup kuat."
	case !i.HasUndervolt:
		verdict = "Sensor undervoltage tidak tersedia di perangkat ini, jadi penyebabnya tidak bisa dipersempit."
	}
	fields = append(fields, discordEmbedField{Name: "Petunjuk", Value: verdict})
	return discordEmbed{
		Title:       "⚡ Pi mati mendadak",
		Description: desc,
		Color:       colorAlert,
		Fields:      fields,
		Footer:      footer(),
	}
}

func formatUptime(d time.Duration) string {
	if d < time.Minute {
		return "kurang dari 1 menit"
	}
	h, m := int(d.Hours()), int(d.Minutes())%60
	switch {
	case h >= 24:
		return fmt.Sprintf("%d hari %d jam", h/24, h%24)
	case h > 0:
		return fmt.Sprintf("%d jam %d menit", h, m)
	}
	return fmt.Sprintf("%d menit", m)
}
