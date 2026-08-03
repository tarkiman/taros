package collector

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/store"
)

type netStatSample struct {
	rxBytes uint64
	txBytes uint64
}

// excludedNetPrefixes filters out loopback and container-internal
// interfaces. veth/br-/docker* interfaces mirror the same packets that
// already cross a container's own interface, so summing them alongside
// physical interfaces would wildly over-count throughput — see
// docs/04-features.md §4.1.
var excludedNetPrefixes = []string{"lo", "veth", "br-", "docker", "virbr"}

func isExcludedIface(name string) bool {
	for _, p := range excludedNetPrefixes {
		if strings.HasPrefix(name, p) {
			return true
		}
	}
	return false
}

// readProcNetDev parses /proc/net/dev, keyed by interface name.
func readProcNetDev() (map[string]netStatSample, error) {
	f, err := os.Open("/proc/net/dev")
	if err != nil {
		return nil, fmt.Errorf("open /proc/net/dev: %w", err)
	}
	defer f.Close()

	out := make(map[string]netStatSample)
	scanner := bufio.NewScanner(f)
	lineNum := 0
	for scanner.Scan() {
		lineNum++
		if lineNum <= 2 {
			continue // two header lines
		}
		line := scanner.Text()
		colon := strings.IndexByte(line, ':')
		if colon < 0 {
			continue
		}
		name := strings.TrimSpace(line[:colon])
		fields := strings.Fields(line[colon+1:])
		if len(fields) < 9 {
			continue
		}
		rx, _ := strconv.ParseUint(fields[0], 10, 64)
		tx, _ := strconv.ParseUint(fields[8], 10, 64)
		out[name] = netStatSample{rxBytes: rx, txBytes: tx}
	}
	return out, scanner.Err()
}

func (c *Collector) sampleNet(now time.Time) ([]store.NetIface, error) {
	cur, err := readProcNetDev()
	if err != nil {
		return nil, err
	}

	var ifaces []store.NetIface
	elapsed := now.Sub(c.prevNetAt).Seconds()
	for name, s := range cur {
		if isExcludedIface(name) {
			continue
		}
		iface := store.NetIface{Name: name}
		if prev, ok := c.prevNet[name]; ok && elapsed > 0 {
			iface.RxBytesPerSec = float64(s.rxBytes-prev.rxBytes) / elapsed
			iface.TxBytesPerSec = float64(s.txBytes-prev.txBytes) / elapsed
		}
		ifaces = append(ifaces, iface)
	}

	c.prevNet = cur
	c.prevNetAt = now
	return ifaces, nil
}
