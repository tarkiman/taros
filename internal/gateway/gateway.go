// Package gateway monitors a TarOS host that acts as a location gateway: a box at a
// remote site that relays the site's devices (cameras first) to a central server over
// ZeroTier. It is read-only — it reports the ZeroTier link, the go2rtc relay streams
// (what comes in from each device and who is watching), the devices on the site's LAN,
// the uplink throughput and the latency to the central hosts. See
// docs/04-features.md §4.18.
//
// Everything is polled on one ticker into an in-memory snapshot; nothing is written to
// disk and nothing is changed on the host.
package gateway

import (
	"context"
	"log/slog"
	"sync"
	"time"

	"github.com/tarkiman/taros/internal/store"
)

// Config mirrors config.GatewayConfig (kept separate so this package does not import
// internal/config).
type Config struct {
	Go2rtcURL   string
	Central     []Target
	PollSeconds int
}

// Target is a central host to measure latency to, e.g. the NVR over ZeroTier.
type Target struct {
	Label string `json:"label"`
	Addr  string `json:"addr"` // host:port, measured with a TCP handshake
}

// Snapshot is the whole gateway picture at one moment (the JSON wire format).
type Snapshot struct {
	At       time.Time      `json:"at"`
	ZeroTier ZeroTier       `json:"zerotier"`
	Central  []CentralState `json:"central"`
	Relays   RelayState     `json:"relays"`
	LAN      LAN            `json:"lan"`
	Uplink   Uplink         `json:"uplink"`
}

// Uplink is the throughput of the ZeroTier interface (what leaves the site).
type Uplink struct {
	Interface string         `json:"interface,omitempty"`
	TxKbps    float64        `json:"txKbps"`
	RxKbps    float64        `json:"rxKbps"`
	History   []store.Sample `json:"history"` // tx kbps, oldest first
}

// Monitor polls all sources and keeps the latest snapshot.
type Monitor struct {
	cfg Config
	log *slog.Logger
	zt  ztRunner

	mu       sync.RWMutex
	snap     Snapshot
	prevDev  map[string]devCounters
	prevStr  map[string]uint64 // relay byte counters by key
	prevAt   time.Time
	txHist   *store.RingBuffer
	arpPath  string
	devPath  string
	routePth string
}

func New(cfg Config, log *slog.Logger) *Monitor {
	if cfg.PollSeconds <= 0 {
		cfg.PollSeconds = 10
	}
	if cfg.Go2rtcURL == "" {
		cfg.Go2rtcURL = "http://127.0.0.1:1984"
	}
	return &Monitor{
		cfg: cfg, log: log, zt: execZT,
		prevDev: map[string]devCounters{}, prevStr: map[string]uint64{},
		txHist:  store.NewRingBuffer(30 * 60 / cfg.PollSeconds), // 30 minutes
		arpPath: "/proc/net/arp", devPath: "/proc/net/dev", routePth: "/proc/net/route",
	}
}

// Run polls until ctx is cancelled.
func (m *Monitor) Run(ctx context.Context) {
	t := time.NewTicker(time.Duration(m.cfg.PollSeconds) * time.Second)
	defer t.Stop()
	for {
		m.Poll(ctx)
		select {
		case <-ctx.Done():
			return
		case <-t.C:
		}
	}
}

// Snapshot returns the most recent state.
func (m *Monitor) Snapshot() Snapshot {
	m.mu.RLock()
	defer m.mu.RUnlock()
	s := m.snap
	s.Uplink.History = m.txHist.Snapshot()
	return s
}

// Poll refreshes every source once.
func (m *Monitor) Poll(ctx context.Context) {
	ctx, cancel := context.WithTimeout(ctx, 8*time.Second)
	defer cancel()
	now := time.Now()

	var (
		wg      sync.WaitGroup
		zt      ZeroTier
		central []CentralState
		streams []rawStream
		strErr  error
	)
	wg.Add(3)
	go func() { defer wg.Done(); zt = m.readZeroTier(ctx) }()
	go func() { defer wg.Done(); central = measureCentral(ctx, m.cfg.Central) }()
	go func() { defer wg.Done(); streams, strErr = fetchStreams(ctx, m.cfg.Go2rtcURL) }()
	wg.Wait()

	m.mu.Lock()
	defer m.mu.Unlock()
	elapsed := now.Sub(m.prevAt).Seconds()
	if m.prevAt.IsZero() {
		elapsed = 0
	}
	relays := m.relayState(streams, strErr, elapsed)
	lanIface, lanCIDR := defaultRoute(m.routePth)
	lan := readLAN(m.arpPath, lanIface, lanCIDR, relays)
	up := m.uplink(zt, elapsed, now)

	m.snap = Snapshot{At: now, ZeroTier: zt, Central: central, Relays: relays, LAN: lan, Uplink: up}
	m.prevAt = now
}
