package notify

import (
	"context"
	"fmt"
	"log/slog"
	"strings"
	"time"

	"github.com/tarkiman/taros/internal/gateway"
)

// GatewaySource is what GatewayMonitor reads (gateway.Monitor in production).
type GatewaySource interface {
	Snapshot() gateway.Snapshot
}

// GatewayMonitor turns the gateway snapshot into Discord alerts (docs/04-features.md
// §4.18): a relay that viewers want but whose source sends nothing, a central host
// that can't be reached, and the ZeroTier node going offline. Each condition must
// last GraceMin before it alerts, alerts once, and sends one recovery message.
type GatewayMonitor struct {
	src      GatewaySource
	settings *Store
	now      func() time.Time
	post     func(ctx context.Context, url string, embed discordEmbed) error
	since    map[string]time.Time // condition key → first seen
	alerted  map[string]bool
	recover  map[string]string // condition key → recovery title
}

func NewGatewayMonitor(src GatewaySource, settings *Store) *GatewayMonitor {
	return &GatewayMonitor{src: src, settings: settings, now: time.Now, post: sendWebhook,
		since: map[string]time.Time{}, alerted: map[string]bool{}, recover: map[string]string{}}
}

func (m *GatewayMonitor) Run(ctx context.Context, interval time.Duration) {
	t := time.NewTicker(interval)
	defer t.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-t.C:
			m.tick(ctx)
		}
	}
}

type gatewayCondition struct {
	key, title, detail, recovered string
}

func (m *GatewayMonitor) tick(ctx context.Context) {
	s := m.settings.Get()
	rules := s.Gateway
	if !s.Enabled || !rules.Enabled || s.WebhookURL == "" {
		m.since, m.alerted, m.recover = map[string]time.Time{}, map[string]bool{}, map[string]string{}
		return
	}
	snap := m.src.Snapshot()
	if snap.At.IsZero() {
		return // first poll not done yet
	}
	now := m.now()
	grace := time.Duration(rules.GraceMin) * time.Minute

	var active []gatewayCondition
	if rules.RelayDown && snap.Relays.Available {
		for _, r := range snap.Relays.Streams {
			// Only a stream someone is pulling can be "down": go2rtc connects to a
			// source on demand, so an unwatched stream is idle by design.
			if len(r.Consumers) > 0 && (!r.Active || r.InKbps < 1) {
				viewers := make([]string, 0, len(r.Consumers))
				for _, c := range r.Consumers {
					viewers = append(viewers, strings.Split(c.Remote, ":")[0])
				}
				active = append(active, gatewayCondition{
					key:       "relay/" + r.Name,
					title:     "Relay " + r.Name + " tidak mengirim data",
					recovered: "Relay " + r.Name + " pulih",
					detail:    fmt.Sprintf("Sumber %s tidak mengirim video, padahal ditonton oleh %s. Cek kamera (listrik, Wi-Fi, IP berubah).", strings.Join(r.Sources, ", "), strings.Join(viewers, ", ")),
				})
			}
		}
	}
	if rules.CentralDown {
		for _, c := range snap.Central {
			if !c.OK {
				active = append(active, gatewayCondition{
					key:       "central/" + c.Addr,
					title:     "Server pusat " + c.Label + " tidak terjangkau",
					recovered: "Server pusat " + c.Label + " terjangkau lagi",
					detail:    fmt.Sprintf("%s (%s) gagal dihubungi dari gerbang: %s. Cek internet lokasi ini atau server pusatnya.", c.Label, c.Addr, c.Error),
				})
			}
		}
	}
	if rules.ZeroTierOff && snap.ZeroTier.Available && !snap.ZeroTier.Online {
		active = append(active, gatewayCondition{
			key: "zerotier", title: "ZeroTier offline", recovered: "ZeroTier online lagi",
			detail: "Node ZeroTier gerbang ini offline — semua relay ke pusat ikut terputus. Biasanya internet lokasi putus.",
		})
	}

	seen := map[string]bool{}
	for _, c := range active {
		seen[c.key] = true
		if _, ok := m.since[c.key]; !ok {
			m.since[c.key] = now
		}
		m.recover[c.key] = c.recovered
		if !m.alerted[c.key] && now.Sub(m.since[c.key]) >= grace {
			m.alerted[c.key] = true
			m.send(ctx, s.WebhookURL, discordEmbed{
				Title: "🔴 " + c.title, Description: c.detail, Color: colorAlert, Footer: footer(),
				Fields: []discordEmbedField{{Name: "Sejak", Value: formatDuration(now.Sub(m.since[c.key])) + " lalu", Inline: true}},
			})
		}
	}
	for key, since := range m.since {
		if seen[key] {
			continue
		}
		if m.alerted[key] {
			m.send(ctx, s.WebhookURL, discordEmbed{
				Title:       "✅ " + m.recover[key],
				Description: "Kembali normal setelah " + formatDuration(now.Sub(since)) + ".",
				Color:       colorRecovery, Footer: footer(),
			})
		}
		delete(m.since, key)
		delete(m.alerted, key)
		delete(m.recover, key)
	}
}

func (m *GatewayMonitor) send(ctx context.Context, url string, e discordEmbed) {
	sctx, cancel := context.WithTimeout(ctx, 15*time.Second)
	defer cancel()
	if err := m.post(sctx, url, e); err != nil {
		slog.Warn("notify: kirim alert gerbang gagal", "title", e.Title, "err", err) // never log the URL
	}
}
