// Package collector reads system metrics straight from /proc and /sys —
// no gopsutil, see docs/03-tech-stack.md "Kenapa tidak gopsutil?".
package collector

import (
	"context"
	"log/slog"
	"time"

	"github.com/tarkiman/taros/internal/store"
)

type Intervals struct {
	CPUMemNet time.Duration
	DiskUsage time.Duration
	Temp      time.Duration
	Proc      time.Duration
}

// Collector owns the small bits of state needed for delta-based metrics
// (CPU%, network/disk throughput both require two samples spaced in time)
// and periodically writes fresh Snapshots into the Store.
type Collector struct {
	store *store.Store

	// prevCPU/prevNet/prevDiskIO hold the previous tick's raw counters —
	// only ever touched from the "fast" ticker goroutine in Run, so no
	// mutex needed here.
	prevCPU      *cpuStatSample
	prevCPUCores []cpuStatSample
	prevNet      map[string]netStatSample
	prevNetAt    time.Time
	prevDiskIO   *diskIOSample
	prevDiskIOAt time.Time

	// prevProcTimes/prevProcAt are the same delta-CPU% bookkeeping as
	// prevCPU above, just keyed per-PID instead of system-wide.
	prevProcTimes map[int]uint64
	prevProcAt    time.Time

	// latestDisks/latestTemps are refreshed on their own slower tickers but
	// read every fast tick to assemble a full Snapshot. No mutex needed:
	// Run's select loop is single-threaded, so ticks never overlap.
	latestDisks []store.DiskMount
	latestTemps []store.TempSensor
}

func New(s *store.Store) *Collector {
	return &Collector{
		store:         s,
		prevNet:       make(map[string]netStatSample),
		prevProcTimes: make(map[int]uint64),
	}
}

// Run blocks, sampling metrics on their configured intervals until ctx is
// canceled. See docs/04-features.md §4.1 for the interval rationale.
func (c *Collector) Run(ctx context.Context, iv Intervals) {
	// Seed latestDisks/latestTemps synchronously so the very first fast
	// tick's Snapshot isn't missing them.
	c.sampleDiskUsage()
	c.sampleTemps()

	fast := time.NewTicker(iv.CPUMemNet)
	diskUsage := time.NewTicker(iv.DiskUsage)
	temp := time.NewTicker(iv.Temp)
	proc := time.NewTicker(iv.Proc)
	defer fast.Stop()
	defer diskUsage.Stop()
	defer temp.Stop()
	defer proc.Stop()

	for {
		select {
		case <-ctx.Done():
			return
		case <-fast.C:
			c.tick()
		case <-diskUsage.C:
			c.sampleDiskUsage()
		case <-temp.C:
			c.sampleTemps()
		case now := <-proc.C:
			c.store.SetProcesses(c.sampleProcesses(now))
		}
	}
}

func (c *Collector) tick() {
	now := time.Now()

	cpu, err := c.sampleCPU(now)
	if err != nil {
		slog.Error("collector: sample cpu", "err", err)
	}
	mem, err := sampleMem()
	if err != nil {
		slog.Error("collector: sample mem", "err", err)
	}
	diskIO, err := c.sampleDiskIO(now)
	if err != nil {
		slog.Error("collector: sample disk io", "err", err)
	}
	net, err := c.sampleNet(now)
	if err != nil {
		slog.Error("collector: sample net", "err", err)
	}

	snap := &store.Snapshot{
		Time:   now,
		CPU:    cpu,
		Mem:    mem,
		Disks:  c.latestDisks,
		DiskIO: diskIO,
		Net:    net,
		Temps:  c.latestTemps,
	}
	c.store.Set(snap)

	c.store.AddSample(store.SeriesCPUTotalPercent, now, cpu.TotalPercent)
	c.store.AddSample(store.SeriesMemUsedPercent, now, mem.UsedPercent)
	c.store.AddSample(store.SeriesDiskReadBytesSec, now, diskIO.ReadBytesPerSec)
	c.store.AddSample(store.SeriesDiskWriteBytesSec, now, diskIO.WriteBytesPerSec)
}
