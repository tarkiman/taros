// Package netinfo lists this host's IPv4 addresses per network interface —
// shown on the Dashboard so an admin can see which address to SSH/browse
// to (LAN, Wi-Fi, ZeroTier, ...) without opening a terminal. See
// docs/04-features.md §4.6.
//
// Uses only the stdlib's net.Interfaces (no /proc parsing, no new
// dependency), so it also works on the macOS build.
package netinfo

import (
	"net"
	"sort"
	"strings"
)

// Kind is a coarse, name-based classification of an interface — enough to
// give a friendly label and to hide container-plumbing bridges by default.
type Kind string

const (
	KindEthernet  Kind = "ethernet"
	KindWifi      Kind = "wifi"
	KindZeroTier  Kind = "zerotier"
	KindTailscale Kind = "tailscale"
	KindDocker    Kind = "docker"
	KindOther     Kind = "other"
)

type Address struct {
	Interface string `json:"interface"`
	Kind      Kind   `json:"kind"`
	IP        string `json:"ip"`
	// CIDR is the prefix length only (e.g. 24), so the UI can show
	// "192.168.1.11/24" without re-deriving it from a mask.
	PrefixLen int `json:"prefixLen"`
}

// classify maps an interface name to a Kind. Prefixes follow the usual
// Linux naming (wlan*/wlp* wifi, eth*/eno*/enp*/ens* ethernet, zt*
// ZeroTier's hash-style names, tailscale0); Docker's own bridges/veths are
// what makes a host running containers look noisy, hence a dedicated Kind.
func classify(name string) Kind {
	switch {
	case name == "docker0", strings.HasPrefix(name, "br-"), strings.HasPrefix(name, "veth"):
		return KindDocker
	case strings.HasPrefix(name, "zt"):
		return KindZeroTier
	case strings.HasPrefix(name, "tailscale"):
		return KindTailscale
	case strings.HasPrefix(name, "wlan"), strings.HasPrefix(name, "wlp"), strings.HasPrefix(name, "wl"):
		return KindWifi
	case strings.HasPrefix(name, "eth"), strings.HasPrefix(name, "eno"), strings.HasPrefix(name, "enp"), strings.HasPrefix(name, "ens"):
		return KindEthernet
	default:
		return KindOther
	}
}

// List returns every up, non-loopback interface's IPv4 addresses. Docker
// bridges/veths are omitted unless includeAll — they're never the address
// someone wants to reach this host on, but can be useful when debugging
// container networking, hence the toggle rather than a permanent filter.
// IPv6 is left out on purpose: link-local fe80:: entries only add noise
// for the "which address do I connect to" question this answers.
func List(includeAll bool) ([]Address, error) {
	ifaces, err := net.Interfaces()
	if err != nil {
		return nil, err
	}

	var out []Address
	for _, ifc := range ifaces {
		if ifc.Flags&net.FlagUp == 0 || ifc.Flags&net.FlagLoopback != 0 {
			continue
		}
		kind := classify(ifc.Name)
		if kind == KindDocker && !includeAll {
			continue
		}
		addrs, err := ifc.Addrs()
		if err != nil {
			continue
		}
		for _, a := range addrs {
			ipNet, ok := a.(*net.IPNet)
			if !ok {
				continue
			}
			ip4 := ipNet.IP.To4()
			if ip4 == nil {
				continue
			}
			ones, _ := ipNet.Mask.Size()
			out = append(out, Address{Interface: ifc.Name, Kind: kind, IP: ip4.String(), PrefixLen: ones})
		}
	}

	sort.SliceStable(out, func(i, j int) bool {
		if out[i].Kind != out[j].Kind {
			return kindOrder(out[i].Kind) < kindOrder(out[j].Kind)
		}
		return out[i].Interface < out[j].Interface
	})
	return out, nil
}

// kindOrder puts the addresses people actually connect to first
// (LAN/Wi-Fi, then overlay VPNs), and container plumbing last.
func kindOrder(k Kind) int {
	switch k {
	case KindEthernet:
		return 0
	case KindWifi:
		return 1
	case KindZeroTier:
		return 2
	case KindTailscale:
		return 3
	case KindOther:
		return 4
	default:
		return 5
	}
}
