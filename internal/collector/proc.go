package collector

import (
	"bufio"
	"log/slog"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/tarkiman/taros/internal/store"
)

// clockTicksPerSec is USER_HZ, the unit /proc/[pid]/stat's utime/stime are
// counted in. Reading it properly means a cgo sysconf(_SC_CLK_TCK) call;
// every mainstream Linux kernel/libc combination (including the ARM
// targets this project cares about) fixes it at 100, so — same spirit as
// the rest of this package (docs/03-tech-stack.md "Kenapa tidak
// gopsutil?") — it's hardcoded rather than pulling in cgo for one constant.
const clockTicksPerSec = 100

// listPIDs returns every numeric entry directly under /proc — each one is
// a running process. Non-numeric entries (self, net, sys, ...) are skipped.
func listPIDs() ([]int, error) {
	entries, err := os.ReadDir("/proc")
	if err != nil {
		return nil, err
	}
	pids := make([]int, 0, len(entries))
	for _, e := range entries {
		if !e.IsDir() {
			continue
		}
		pid, err := strconv.Atoi(e.Name())
		if err != nil {
			continue
		}
		pids = append(pids, pid)
	}
	return pids, nil
}

// readPIDStat reads comm/utime/stime for one pid from /proc/[pid]/stat.
// The command name is wrapped in parentheses and can itself contain spaces
// or parens, so it's carved out by first '(' / last ')' rather than a
// naive field split — the numeric fields after it are fixed-position.
func readPIDStat(pid int) (comm string, utime, stime uint64, err error) {
	data, err := os.ReadFile("/proc/" + strconv.Itoa(pid) + "/stat")
	if err != nil {
		return "", 0, 0, err
	}
	s := string(data)
	open := strings.IndexByte(s, '(')
	close := strings.LastIndexByte(s, ')')
	if open < 0 || close < open {
		return "", 0, 0, os.ErrInvalid
	}
	comm = s[open+1 : close]

	fields := strings.Fields(s[close+1:])
	// fields[0] is state (the field right after "comm)"); utime/stime are
	// the 14th/15th fields of /proc/pid/stat overall, i.e. index 11/12 here.
	if len(fields) < 13 {
		return "", 0, 0, os.ErrInvalid
	}
	utime, _ = strconv.ParseUint(fields[11], 10, 64)
	stime, _ = strconv.ParseUint(fields[12], 10, 64)
	return comm, utime, stime, nil
}

// readProcRSS reads resident memory from /proc/[pid]/status' VmRSS line
// (already in kB, unlike /proc/[pid]/stat's page-count RSS field — one
// less unit conversion to get wrong). Kernel threads have no VmRSS line at
// all; that's not an error, they just report 0.
func readProcRSS(pid int) uint64 {
	f, err := os.Open("/proc/" + strconv.Itoa(pid) + "/status")
	if err != nil {
		return 0
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Text()
		if !strings.HasPrefix(line, "VmRSS:") {
			continue
		}
		fields := strings.Fields(line)
		if len(fields) < 2 {
			return 0
		}
		kb, _ := strconv.ParseUint(fields[1], 10, 64)
		return kb * 1024
	}
	return 0
}

// sampleProcesses lists every process currently on the system and computes
// each one's CPU% since the previous call via the same delta-over-elapsed-
// time approach sampleCPU uses for the system-wide figure — one /proc/stat
// read's worth of jiffies isn't a percentage on its own, only the change
// between two timed samples is. Processes that exit between listing and
// reading (or that are only readable by root) are silently skipped rather
// than treated as an error — that's normal churn, not a fault condition.
func (c *Collector) sampleProcesses(now time.Time) []store.ProcInfo {
	pids, err := listPIDs()
	if err != nil {
		slog.Error("collector: list /proc", "err", err)
		return nil
	}

	elapsed := now.Sub(c.prevProcAt).Seconds()
	curTimes := make(map[int]uint64, len(pids))
	result := make([]store.ProcInfo, 0, len(pids))

	for _, pid := range pids {
		comm, utime, stime, err := readPIDStat(pid)
		if err != nil {
			continue
		}
		total := utime + stime
		curTimes[pid] = total

		var cpuPct float64
		// total >= prev guards against a PID being reused by a brand new
		// process between ticks — without it, that wraps to a huge bogus
		// percentage instead of just reading as 0% for one tick.
		if prev, ok := c.prevProcTimes[pid]; ok && elapsed > 0 && total >= prev {
			cpuPct = float64(total-prev) / (clockTicksPerSec * elapsed) * 100
			if cpuPct > 100 {
				cpuPct = 100
			}
		}

		result = append(result, store.ProcInfo{
			PID:        pid,
			Name:       comm,
			CPUPercent: cpuPct,
			MemBytes:   readProcRSS(pid),
		})
	}

	c.prevProcTimes = curTimes
	c.prevProcAt = now
	return result
}
