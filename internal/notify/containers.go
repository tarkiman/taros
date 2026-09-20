package notify

import (
	"context"
	"fmt"
	"log/slog"
	"sort"
	"strings"
	"time"

	"github.com/tarkiman/taros/internal/docker"
)

// Container-health alerts — see docs/04-features.md §4.11. Motivation: a
// container can crash-loop for hours unnoticed (two did, on the dev host,
// 68 and 71 restarts), and the CPU/RAM/temperature alerts can't see that.
//
// Every tick each container is inspected and judged by three independent
// rules; each raises at most one alert per incident and one recovery
// message once the condition has stayed clear for recoverAfter.
const (
	// loopWindow/loopRestarts: RestartCount growth, not the "restarting"
	// state — a container that runs 60s then dies is almost never sampled
	// while restarting, but its counter still climbs.
	loopWindow   = 10 * time.Minute
	loopRestarts = 3
	// crashConfirm: an abnormal exit must persist this long before it counts
	// (Docker may be about to restart it).
	crashConfirm = time.Minute
	// recoverAfter: how long a condition must stay clear before "pulih".
	recoverAfter = 5 * time.Minute
	// maxAlertsPerTick keeps a mass failure (e.g. right after a bad boot)
	// from flooding the channel: the rest are folded into one summary.
	maxAlertsPerTick = 4
	logTailLines     = 3
	maxLogChars      = 900 // Discord embed field values cap at 1024
)

const (
	kindLoop      = "loop"
	kindUnhealthy = "unhealthy"
	kindCrash     = "crash"
)

// ContainerSource is the slice of docker.Client the monitor needs.
type ContainerSource interface {
	InspectAll(ctx context.Context) ([]docker.ContainerInfo, error)
	LogTail(ctx context.Context, id string, n int) ([]string, error)
}

type restartSample struct {
	at    time.Time
	count int
}

type incident struct {
	clearSince time.Time // zero while the condition still holds
}

type containerTrack struct {
	name, project  string
	samples        []restartSample
	unhealthySince time.Time
	crashSince     time.Time
	incidents      map[string]*incident
}

// ContainerMonitor is the container counterpart of Monitor (monitor.go);
// like it, everything is touched from the single Run goroutine only.
type ContainerMonitor struct {
	src      ContainerSource
	settings *Store

	now  func() time.Time
	post func(ctx context.Context, url string, e discordEmbed) error

	tracks      map[string]*containerTrack
	activeSince time.Time // when the rules last became active (zero = inactive)
}

func NewContainerMonitor(src ContainerSource, settings *Store) *ContainerMonitor {
	return &ContainerMonitor{
		src:      src,
		settings: settings,
		now:      time.Now,
		post:     sendWebhook,
		tracks:   make(map[string]*containerTrack),
	}
}

// Run blocks, evaluating every interval until ctx is canceled.
func (m *ContainerMonitor) Run(ctx context.Context, interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			m.tick(ctx)
		}
	}
}

// pending is one message queued during a tick.
type pending struct {
	id       string
	name     string
	kind     string
	recovery bool
	embed    discordEmbed
}

func (m *ContainerMonitor) tick(ctx context.Context) {
	s := m.settings.Get()
	cfg := s.Containers
	if !s.Enabled || !cfg.Enabled || s.WebhookURL == "" {
		// Switched off: forget everything, so switching back on starts a
		// fresh grace period instead of judging on stale state.
		m.tracks = make(map[string]*containerTrack)
		m.activeSince = time.Time{}
		return
	}
	now := m.now()
	if m.activeSince.IsZero() {
		m.activeSince = now
	}
	grace := time.Duration(cfg.GraceMin) * time.Minute

	ictx, cancel := context.WithTimeout(ctx, 20*time.Second)
	infos, err := m.src.InspectAll(ictx)
	cancel()
	if err != nil {
		// Docker unreachable: nothing to judge, and not this monitor's alert.
		slog.Debug("notify: inspect container gagal", "err", err)
		return
	}

	var queue []pending
	seen := make(map[string]bool, len(infos))
	for _, info := range infos {
		seen[info.ID] = true
		t := m.tracks[info.ID]
		if t == nil {
			t = &containerTrack{incidents: map[string]*incident{}}
			m.tracks[info.ID] = t
		}
		t.name, t.project = info.Name, info.Project

		// --- restart-loop
		loopActive, loopN := false, 0
		if cfg.RestartLoop {
			if n := len(t.samples); n > 0 && info.RestartCount < t.samples[n-1].count {
				t.samples = nil // counter went backwards: recreated, start over
			}
			t.samples = append(t.samples, restartSample{now, info.RestartCount})
			cut := 0
			for cut < len(t.samples)-1 && now.Sub(t.samples[cut].at) > loopWindow {
				cut++
			}
			t.samples = t.samples[cut:]
			loopN = info.RestartCount - t.samples[0].count
			// Sustained, like the others: a container waiting on a dependency
			// right after boot legitimately restarts a few times.
			loopActive = loopN >= loopRestarts && now.Sub(m.activeSince) >= grace
		}

		// --- unhealthy (must persist for the grace period)
		unhealthyActive := false
		if cfg.Unhealthy && info.State == "running" && info.Health == "unhealthy" {
			if t.unhealthySince.IsZero() {
				t.unhealthySince = now
			}
			unhealthyActive = now.Sub(t.unhealthySince) >= grace
		} else {
			t.unhealthySince = time.Time{}
		}

		// --- crashed: down after an abnormal exit, though it should be up
		crashActive := false
		if cfg.Crashed && info.State == "exited" && info.RestartPolicy != "no" && abnormalExit(info) {
			if t.crashSince.IsZero() {
				t.crashSince = now
			}
			crashActive = now.Sub(t.crashSince) >= crashConfirm && now.Sub(m.activeSince) >= grace
		} else {
			t.crashSince = time.Time{}
		}

		queue = m.apply(queue, t, kindLoop, loopActive, now, info, loopN, grace)
		queue = m.apply(queue, t, kindUnhealthy, unhealthyActive, now, info, 0, grace)
		queue = m.apply(queue, t, kindCrash, crashActive, now, info, 0, grace)
	}
	// Containers that no longer exist (uninstalled/recreated): drop silently.
	for id := range m.tracks {
		if !seen[id] {
			delete(m.tracks, id)
		}
	}

	m.flush(ctx, s.WebhookURL, queue, cfg.IncludeLogs)
}

// abnormalExit: exit codes 0/137/143 are what a deliberate stop looks like
// (clean exit, SIGKILL after `docker stop`'s timeout, SIGTERM) — Docker has
// no "stopped by user" flag, so this is a heuristic. An OOM kill also ends
// as 137, which is exactly the case worth catching, hence the explicit flag.
func abnormalExit(i docker.ContainerInfo) bool {
	if i.OOMKilled {
		return true
	}
	switch i.ExitCode {
	case 0, 137, 143:
		return false
	}
	return true
}

// apply runs the incident state machine for one (container, kind) and
// appends the message to send, if any.
func (m *ContainerMonitor) apply(q []pending, t *containerTrack, kind string, active bool, now time.Time, info docker.ContainerInfo, loopN int, grace time.Duration) []pending {
	inc := t.incidents[kind]
	if active {
		if inc == nil {
			t.incidents[kind] = &incident{}
			q = append(q, pending{id: info.ID, name: t.name, kind: kind, embed: containerAlertEmbed(kind, info, loopN, grace)})
		} else {
			inc.clearSince = time.Time{}
		}
		return q
	}
	if inc == nil {
		return q
	}
	if inc.clearSince.IsZero() {
		inc.clearSince = now
	}
	if now.Sub(inc.clearSince) >= recoverAfter {
		q = append(q, pending{name: t.name, kind: kind, recovery: true, embed: containerRecoveryEmbed(kind, t.name, t.project)})
		delete(t.incidents, kind)
	}
	return q
}

// flush sends the queue, capping a burst at maxAlertsPerTick messages (the
// overflow becomes one summary listing the rest by name).
func (m *ContainerMonitor) flush(ctx context.Context, url string, q []pending, withLogs bool) {
	if len(q) == 0 {
		return
	}
	sort.SliceStable(q, func(i, j int) bool { return !q[i].recovery && q[j].recovery }) // alerts first

	direct, rest := q, []pending(nil)
	if len(q) > maxAlertsPerTick {
		direct, rest = q[:maxAlertsPerTick-1], q[maxAlertsPerTick-1:]
	}
	for _, p := range direct {
		e := p.embed
		if withLogs && !p.recovery {
			if f, ok := m.logField(ctx, p.id); ok {
				e.Fields = append(e.Fields, f)
			}
		}
		m.send(ctx, url, e)
	}
	if len(rest) > 0 {
		m.send(ctx, url, summaryEmbed(rest))
	}
}

func (m *ContainerMonitor) logField(ctx context.Context, id string) (discordEmbedField, bool) {
	lctx, cancel := context.WithTimeout(ctx, 5*time.Second)
	defer cancel()
	lines, err := m.src.LogTail(lctx, id, logTailLines)
	if err != nil || len(lines) == 0 {
		return discordEmbedField{}, false
	}
	text := strings.ReplaceAll(strings.Join(lines, "\n"), "`", "'")
	if r := []rune(text); len(r) > maxLogChars {
		text = "…" + string(r[len(r)-maxLogChars:])
	}
	return discordEmbedField{Name: "Log terakhir", Value: "```\n" + text + "\n```"}, true
}

func (m *ContainerMonitor) send(ctx context.Context, url string, e discordEmbed) {
	sctx, cancel := context.WithTimeout(ctx, 8*time.Second)
	defer cancel()
	if err := m.post(sctx, url, e); err != nil {
		slog.Warn("notify: gagal kirim alert container ke Discord", "err", err)
	}
}

// ---- embeds

var kindLabel = map[string]string{
	kindLoop:      "restart berulang",
	kindUnhealthy: "unhealthy",
	kindCrash:     "berhenti tak terduga",
}

func containerAlertEmbed(kind string, i docker.ContainerInfo, loopN int, grace time.Duration) discordEmbed {
	var desc string
	switch kind {
	case kindLoop:
		desc = fmt.Sprintf("Container restart berulang: %d kali dalam %s terakhir.", loopN, formatDuration(loopWindow))
		if i.OOMKilled {
			desc += " Terakhir dimatikan karena kehabisan memori (OOM)."
		}
	case kindUnhealthy:
		desc = fmt.Sprintf("Health check gagal (unhealthy) selama lebih dari %s.", formatDuration(grace))
	default:
		desc = fmt.Sprintf("Container berhenti dengan exit code %d dan tidak menyala lagi.", i.ExitCode)
		if i.OOMKilled {
			desc = "Container dimatikan karena kehabisan memori (OOM) dan tidak menyala lagi."
		}
	}
	project := i.Project
	if project == "" {
		project = "— (bukan compose)"
	}
	return discordEmbed{
		Title:       "🔴 Container bermasalah: " + i.Name,
		Description: desc,
		Color:       colorAlert,
		Fields: []discordEmbedField{
			{Name: "Aplikasi", Value: project, Inline: true},
			{Name: "Restart policy", Value: i.RestartPolicy, Inline: true},
		},
		Footer: footer(),
	}
}

func containerRecoveryEmbed(kind, name, project string) discordEmbed {
	desc := fmt.Sprintf("Masalah “%s” sudah tidak terdeteksi selama lebih dari %s.", kindLabel[kind], formatDuration(recoverAfter))
	if project != "" {
		desc += " Aplikasi: " + project + "."
	}
	return discordEmbed{Title: "✅ Container pulih: " + name, Description: desc, Color: colorRecovery, Footer: footer()}
}

func summaryEmbed(rest []pending) discordEmbed {
	var b strings.Builder
	for _, p := range rest {
		mark := "🔴"
		if p.recovery {
			mark = "✅"
		}
		fmt.Fprintf(&b, "%s %s — %s\n", mark, p.name, kindLabel[p.kind])
	}
	return discordEmbed{
		Title:       fmt.Sprintf("🔔 %d container lain juga berubah status", len(rest)),
		Description: strings.TrimSpace(b.String()),
		Color:       colorAlert,
		Footer:      footer(),
	}
}
