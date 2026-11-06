package gateway

import (
	"bufio"
	"context"
	"encoding/binary"

	"net"
	"os"
	"sort"
	"strconv"
	"strings"
	"time"
)

// CentralState is the reachability of one central host.
type CentralState struct {
	Target
	OK    bool    `json:"ok"`
	RTTMs float64 `json:"rttMs"`
	Error string  `json:"error,omitempty"`
}

func measureCentral(ctx context.Context, targets []Target) []CentralState {
	out := make([]CentralState, len(targets))
	done := make(chan struct{}, len(targets))
	for i, t := range targets {
		go func(i int, t Target) {
			defer func() { done <- struct{}{} }()
			st := CentralState{Target: t}
			start := time.Now()
			c, err := (&net.Dialer{Timeout: 3 * time.Second}).DialContext(ctx, "tcp", t.Addr)
			if err != nil {
				st.Error = shortNetErr(err)
			} else {
				st.OK, st.RTTMs = true, float64(time.Since(start).Microseconds())/1000
				c.Close()
			}
			out[i] = st
		}(i, t)
	}
	for range targets {
		<-done
	}
	return out
}

func shortNetErr(err error) string {
	s := err.Error()
	switch {
	case strings.Contains(s, "timeout"):
		return "timeout"
	case strings.Contains(s, "refused"):
		return "refused"
	case strings.Contains(s, "no route"), strings.Contains(s, "unreachable"):
		return "unreachable"
	}
	return "error"
}

// LAN is the site network behind the gateway, from the kernel's neighbour table.
type LAN struct {
	Interface string   `json:"interface,omitempty"`
	CIDR      string   `json:"cidr,omitempty"`
	Devices   []Device `json:"devices"`
}

type Device struct {
	IP      string   `json:"ip"`
	MAC     string   `json:"mac,omitempty"`
	State   string   `json:"state"`             // reachable | incomplete | unknown
	Relayed []string `json:"relayed,omitempty"` // relay streams sourced from this device
}

// defaultRoute returns the interface of the IPv4 default route and its CIDR.
func defaultRoute(path string) (string, string) {
	f, err := os.Open(path)
	if err != nil {
		return "", ""
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	sc.Scan()
	iface := ""
	for sc.Scan() {
		fields := strings.Fields(sc.Text())
		if len(fields) > 2 && fields[1] == "00000000" {
			iface = fields[0]
			break
		}
	}
	if iface == "" {
		return "", ""
	}
	ifc, err := net.InterfaceByName(iface)
	if err != nil {
		return iface, ""
	}
	addrs, _ := ifc.Addrs()
	for _, a := range addrs {
		if ipn, ok := a.(*net.IPNet); ok && ipn.IP.To4() != nil {
			return iface, ipn.String()
		}
	}
	return iface, ""
}

func readLAN(arpPath, iface, cidr string, relays RelayState) LAN {
	lan := LAN{Interface: iface, CIDR: cidr, Devices: []Device{}}
	relayedBy := map[string][]string{}
	for _, s := range relays.Streams {
		for _, src := range s.Sources {
			if host := hostOnly(src); host != "" {
				relayedBy[host] = append(relayedBy[host], s.Name)
			}
		}
	}
	seen := map[string]bool{}
	if f, err := os.Open(arpPath); err == nil {
		sc := bufio.NewScanner(f)
		sc.Scan()
		for sc.Scan() {
			// IP address, HW type, Flags, HW address, Mask, Device
			fields := strings.Fields(sc.Text())
			if len(fields) < 6 || (iface != "" && fields[5] != iface) {
				continue
			}
			flags, _ := strconv.ParseUint(strings.TrimPrefix(fields[2], "0x"), 16, 32)
			d := Device{IP: fields[0], State: "incomplete", Relayed: relayedBy[fields[0]]}
			if flags&0x2 != 0 {
				d.State = "reachable"
				d.MAC = strings.ToLower(fields[3])
			}
			seen[d.IP] = true
			lan.Devices = append(lan.Devices, d)
		}
		f.Close()
	}
	// A relayed device the kernel has not talked to yet still belongs in the list.
	for host, streams := range relayedBy {
		if !seen[host] && net.ParseIP(host) != nil {
			lan.Devices = append(lan.Devices, Device{IP: host, State: "unknown", Relayed: streams})
		}
	}
	sort.Slice(lan.Devices, func(i, j int) bool { return ipKey(lan.Devices[i].IP) < ipKey(lan.Devices[j].IP) })
	return lan
}

func hostOnly(src string) string {
	s := src
	if i := strings.Index(s, "://"); i >= 0 {
		s = s[i+3:]
	}
	if h, _, err := net.SplitHostPort(s); err == nil {
		return h
	}
	return s
}

func ipKey(ip string) uint32 {
	p := net.ParseIP(ip).To4()
	if p == nil {
		return ^uint32(0)
	}
	return binary.BigEndian.Uint32(p)
}

type devCounters struct{ rx, tx uint64 }

// uplink measures the ZeroTier interface (traffic to/from the central server).
func (m *Monitor) uplink(zt ZeroTier, elapsed float64, now time.Time) Uplink {
	up := Uplink{}
	for _, n := range zt.Networks {
		if n.Interface != "" {
			up.Interface = n.Interface
			break
		}
	}
	counters := readDev(m.devPath)
	if up.Interface != "" {
		cur, ok := counters[up.Interface]
		prev, had := m.prevDev[up.Interface]
		if ok && had && elapsed > 0 && cur.tx >= prev.tx && cur.rx >= prev.rx {
			up.TxKbps = float64(cur.tx-prev.tx) * 8 / 1000 / elapsed
			up.RxKbps = float64(cur.rx-prev.rx) * 8 / 1000 / elapsed
			m.txHist.Add(now, up.TxKbps)
		}
	}
	m.prevDev = counters
	return up
}

func readDev(path string) map[string]devCounters {
	out := map[string]devCounters{}
	f, err := os.Open(path)
	if err != nil {
		return out
	}
	defer f.Close()
	sc := bufio.NewScanner(f)
	for sc.Scan() {
		name, rest, ok := strings.Cut(sc.Text(), ":")
		if !ok {
			continue
		}
		fields := strings.Fields(rest)
		if len(fields) < 9 {
			continue
		}
		rx, _ := strconv.ParseUint(fields[0], 10, 64)
		tx, _ := strconv.ParseUint(fields[8], 10, 64)
		out[strings.TrimSpace(name)] = devCounters{rx: rx, tx: tx}
	}
	return out
}
