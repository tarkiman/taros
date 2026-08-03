package collector

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"

	"github.com/tarkiman/tarkiman-os/internal/store"
)

// sampleMem reads /proc/meminfo. "Used" is computed as Total-Available
// rather than a naive Total-Free — MemAvailable is the kernel's own
// estimate of reclaimable memory, matching what `free -h` shows as
// available and avoiding double-counting cache/buffers as "used" (see
// docs/04-features.md §4.1).
func sampleMem() (store.MemInfo, error) {
	f, err := os.Open("/proc/meminfo")
	if err != nil {
		return store.MemInfo{}, fmt.Errorf("open /proc/meminfo: %w", err)
	}
	defer f.Close()

	vals := make(map[string]uint64)
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		fields := strings.Fields(scanner.Text())
		if len(fields) < 2 {
			continue
		}
		key := strings.TrimSuffix(fields[0], ":")
		n, err := strconv.ParseUint(fields[1], 10, 64)
		if err != nil {
			continue
		}
		// /proc/meminfo values are in kB regardless of the (always "kB")
		// unit field that may follow.
		vals[key] = n * 1024
	}
	if err := scanner.Err(); err != nil {
		return store.MemInfo{}, err
	}

	total := vals["MemTotal"]
	available := vals["MemAvailable"]
	used := uint64(0)
	if total > available {
		used = total - available
	}
	usedPercent := 0.0
	if total > 0 {
		usedPercent = float64(used) / float64(total) * 100
	}

	swapUsed := uint64(0)
	if vals["SwapTotal"] > vals["SwapFree"] {
		swapUsed = vals["SwapTotal"] - vals["SwapFree"]
	}

	return store.MemInfo{
		TotalBytes:     total,
		AvailableBytes: available,
		UsedBytes:      used,
		UsedPercent:    usedPercent,
		BuffersBytes:   vals["Buffers"],
		CachedBytes:    vals["Cached"],
		SwapTotalBytes: vals["SwapTotal"],
		SwapUsedBytes:  swapUsed,
	}, nil
}
