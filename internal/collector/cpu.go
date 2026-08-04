package collector

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/tarkiman/taros/internal/store"
)

type cpuStatSample struct {
	totalJiffies uint64
	idleJiffies  uint64
}

// parseCPUStatLine parses one "cpu[N] user nice system idle iowait irq
// softirq steal guest guest_nice" line from /proc/stat. Trailing fields
// (guest, guest_nice, ...) are optional depending on kernel version.
func parseCPUStatLine(fields []string) cpuStatSample {
	var vals [10]uint64
	for i := 0; i < len(fields) && i < len(vals); i++ {
		vals[i], _ = strconv.ParseUint(fields[i], 10, 64)
	}
	user, nice, sys, idle, iowait, irq, softirq, steal := vals[0], vals[1], vals[2], vals[3], vals[4], vals[5], vals[6], vals[7]

	idleAll := idle + iowait
	total := user + nice + sys + idleAll + irq + softirq + steal
	return cpuStatSample{totalJiffies: total, idleJiffies: idleAll}
}

func percentBusy(prev, cur cpuStatSample) float64 {
	totalDelta := float64(cur.totalJiffies - prev.totalJiffies)
	if totalDelta <= 0 {
		return 0
	}
	idleDelta := float64(cur.idleJiffies - prev.idleJiffies)
	pct := (1 - idleDelta/totalDelta) * 100
	if pct < 0 {
		return 0
	}
	if pct > 100 {
		return 100
	}
	return pct
}

// readProcStat returns the aggregate "cpu" sample plus one per "cpuN" line,
// in core order.
func readProcStat() (aggregate cpuStatSample, cores []cpuStatSample, err error) {
	f, err := os.Open("/proc/stat")
	if err != nil {
		return cpuStatSample{}, nil, fmt.Errorf("open /proc/stat: %w", err)
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Text()
		if !strings.HasPrefix(line, "cpu") {
			break
		}
		fields := strings.Fields(line)
		if len(fields) < 5 {
			continue
		}
		label := fields[0]
		sample := parseCPUStatLine(fields[1:])
		if label == "cpu" {
			aggregate = sample
		} else {
			cores = append(cores, sample)
		}
	}
	return aggregate, cores, scanner.Err()
}

func readLoadAvg() (load1, load5, load15 float64, err error) {
	data, err := os.ReadFile("/proc/loadavg")
	if err != nil {
		return 0, 0, 0, fmt.Errorf("read /proc/loadavg: %w", err)
	}
	fields := strings.Fields(string(data))
	if len(fields) < 3 {
		return 0, 0, 0, fmt.Errorf("unexpected /proc/loadavg format: %q", data)
	}
	load1, _ = strconv.ParseFloat(fields[0], 64)
	load5, _ = strconv.ParseFloat(fields[1], 64)
	load15, _ = strconv.ParseFloat(fields[2], 64)
	return load1, load5, load15, nil
}

// sampleCPU needs two /proc/stat readings spaced in time to compute a
// percentage, so it keeps the previous tick's raw counters on c.
func (c *Collector) sampleCPU(now time.Time) (store.CPUInfo, error) {
	aggregate, cores, err := readProcStat()
	if err != nil {
		return store.CPUInfo{}, err
	}
	load1, load5, load15, err := readLoadAvg()
	if err != nil {
		return store.CPUInfo{}, err
	}

	info := store.CPUInfo{LoadAvg1: load1, LoadAvg5: load5, LoadAvg15: load15}

	if c.prevCPU != nil {
		info.TotalPercent = percentBusy(*c.prevCPU, aggregate)
	}
	if c.prevCPUCores != nil && len(c.prevCPUCores) == len(cores) {
		info.CorePercent = make([]float64, len(cores))
		for i, cur := range cores {
			info.CorePercent[i] = percentBusy(c.prevCPUCores[i], cur)
		}
	}

	c.prevCPU = &aggregate
	c.prevCPUCores = cores
	return info, nil
}
