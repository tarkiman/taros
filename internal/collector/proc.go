package collector

import (
	"bufio"
	"log/slog"
	"os"
	"os/user"
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

// readPIDStatus reads /proc/[pid]/status once and pulls out the three
// fields sampleProcesses needs from it (RSS, thread count, owning uid) —
// one file read per process instead of three, which matters here since
// this runs for every PID on every tick. Kernel threads have no VmRSS
// line at all; that's not an error, rssBytes just stays 0.
func readPIDStatus(pid int) (rssBytes uint64, threads int, uid string) {
	f, err := os.Open("/proc/" + strconv.Itoa(pid) + "/status")
	if err != nil {
		return 0, 0, ""
	}
	defer f.Close()

	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		line := scanner.Text()
		switch {
		case strings.HasPrefix(line, "VmRSS:"):
			if fields := strings.Fields(line); len(fields) >= 2 {
				kb, _ := strconv.ParseUint(fields[1], 10, 64)
				rssBytes = kb * 1024
			}
		case strings.HasPrefix(line, "Threads:"):
			if fields := strings.Fields(line); len(fields) >= 2 {
				threads, _ = strconv.Atoi(fields[1])
			}
		case strings.HasPrefix(line, "Uid:"):
			// Real/effective/saved/filesystem uid, in that order — real
			// (first) is what "owns" the process for display purposes.
			if fields := strings.Fields(line); len(fields) >= 2 {
				uid = fields[1]
			}
		}
	}
	return rssBytes, threads, uid
}

// readPIDCmdline reads the full command line from /proc/[pid]/cmdline,
// where the kernel separates argv entries with NUL bytes (and terminates
// the whole thing with a trailing NUL, not a newline) — joined with spaces
// for display. Kernel threads have an empty cmdline (they were never
// exec'd with argv), so callers fall back to "[name]" in that case, same
// convention `ps`/`top` use.
func readPIDCmdline(pid int) string {
	data, err := os.ReadFile("/proc/" + strconv.Itoa(pid) + "/cmdline")
	if err != nil {
		return ""
	}
	data = []byte(strings.Trim(string(data), "\x00"))
	parts := strings.Split(string(data), "\x00")
	return strings.Join(parts, " ")
}

// userCache resolves uid strings to usernames, memoized per sampleProcesses
// call — hundreds of processes typically belong to a small handful of
// distinct users, so this avoids repeating the same NSS lookup per PID.
// Fresh each tick rather than long-lived on Collector: user/group changes
// are rare enough that a few seconds of staleness would never matter, so
// there's no benefit worth the extra state to justify caching across ticks.
type userCache map[string]string

func (c userCache) lookup(uid string) string {
	if name, ok := c[uid]; ok {
		return name
	}
	name := uid
	if u, err := user.LookupId(uid); err == nil {
		name = u.Username
	}
	c[uid] = name
	return name
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
	users := make(userCache)

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

		rssBytes, threads, uid := readPIDStatus(pid)
		cmd := readPIDCmdline(pid)
		if cmd == "" {
			cmd = "[" + comm + "]"
		}

		result = append(result, store.ProcInfo{
			PID:        pid,
			Name:       comm,
			Command:    cmd,
			Threads:    threads,
			User:       users.lookup(uid),
			CPUPercent: cpuPct,
			MemBytes:   rssBytes,
		})
	}

	c.prevProcTimes = curTimes
	c.prevProcAt = now
	return result
}
