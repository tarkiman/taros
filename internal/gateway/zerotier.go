package gateway

import (
	"context"
	"encoding/json"
	"errors"
	"os/exec"
	"strings"
)

// ZeroTier is the node's view of its ZeroTier link.
type ZeroTier struct {
	Available bool      `json:"available"`
	Reason    string    `json:"reason,omitempty"` // why not available: not_installed, not_root, error
	Address   string    `json:"address,omitempty"`
	Online    bool      `json:"online"`
	Version   string    `json:"version,omitempty"`
	Networks  []ZTNet   `json:"networks"`
	Peers     PeerStats `json:"peers"`
}

type ZTNet struct {
	ID        string   `json:"id"`
	Name      string   `json:"name"`
	Status    string   `json:"status"`
	Addresses []string `json:"addresses"`
	Interface string   `json:"interface"`
}

// PeerStats summarises the other nodes: a LEAF peer with an active path is reached
// directly; without one its traffic is relayed through ZeroTier's roots (slow).
type PeerStats struct {
	Direct  int      `json:"direct"`
	Relayed int      `json:"relayed"`
	List    []ZTPeer `json:"list"`
}

type ZTPeer struct {
	Address   string `json:"address"`
	LatencyMs int    `json:"latencyMs"`
	Direct    bool   `json:"direct"`
	Path      string `json:"path,omitempty"` // physical endpoint of the active path
}

// ztRunner runs `zerotier-cli -j <args>` (replaceable in tests).
type ztRunner func(ctx context.Context, args ...string) ([]byte, error)

var errNoZT = errors.New("zerotier-cli not found")

func execZT(ctx context.Context, args ...string) ([]byte, error) {
	bin, err := exec.LookPath("zerotier-cli")
	if err != nil {
		for _, p := range []string{"/usr/sbin/zerotier-cli", "/usr/bin/zerotier-cli"} {
			if _, e := exec.LookPath(p); e == nil {
				bin, err = p, nil
				break
			}
		}
	}
	if err != nil {
		return nil, errNoZT
	}
	return exec.CommandContext(ctx, bin, append([]string{"-j"}, args...)...).Output()
}

func (m *Monitor) readZeroTier(ctx context.Context) ZeroTier { return readZeroTierWith(ctx, m.zt) }

// ZeroTierStatus reads the ZeroTier state once (for Settings > Gerbang lokasi checks).
func ZeroTierStatus(ctx context.Context) ZeroTier { return readZeroTierWith(ctx, execZT) }

func readZeroTierWith(ctx context.Context, run ztRunner) ZeroTier {
	zt := ZeroTier{Networks: []ZTNet{}, Peers: PeerStats{List: []ZTPeer{}}}
	out, err := run(ctx, "info")
	if err != nil {
		switch {
		case errors.Is(err, errNoZT):
			zt.Reason = "not_installed"
		case strings.Contains(strings.ToLower(errText(err)), "authtoken"):
			zt.Reason = "not_root" // the CLI needs root to read authtoken.secret
		default:
			zt.Reason = "error"
		}
		return zt
	}
	var info struct {
		Address string `json:"address"`
		Online  bool   `json:"online"`
		Version string `json:"version"`
	}
	if json.Unmarshal(out, &info) != nil {
		zt.Reason = "error"
		return zt
	}
	zt.Available, zt.Address, zt.Online, zt.Version = true, info.Address, info.Online, info.Version

	if out, err := run(ctx, "listnetworks"); err == nil {
		var nets []struct {
			ID        string   `json:"nwid"`
			Name      string   `json:"name"`
			Status    string   `json:"status"`
			Addresses []string `json:"assignedAddresses"`
			Device    string   `json:"portDeviceName"`
		}
		if json.Unmarshal(out, &nets) == nil {
			for _, n := range nets {
				if n.Addresses == nil {
					n.Addresses = []string{}
				}
				zt.Networks = append(zt.Networks, ZTNet{ID: n.ID, Name: n.Name, Status: n.Status, Addresses: n.Addresses, Interface: n.Device})
			}
		}
	}
	if out, err := run(ctx, "peers"); err == nil {
		var peers []struct {
			Address string `json:"address"`
			Role    string `json:"role"`
			Latency int    `json:"latency"`
			Paths   []struct {
				Address   string `json:"address"`
				Active    bool   `json:"active"`
				Preferred bool   `json:"preferred"`
				Expired   bool   `json:"expired"`
			} `json:"paths"`
		}
		if json.Unmarshal(out, &peers) == nil {
			for _, p := range peers {
				if p.Role != "LEAF" {
					continue // PLANET/MOON roots are infrastructure, not other devices
				}
				peer := ZTPeer{Address: p.Address, LatencyMs: p.Latency}
				for _, path := range p.Paths {
					if path.Active && !path.Expired {
						peer.Direct = true
						if path.Preferred || peer.Path == "" {
							peer.Path = path.Address
						}
					}
				}
				if peer.Direct {
					zt.Peers.Direct++
				} else {
					zt.Peers.Relayed++
				}
				zt.Peers.List = append(zt.Peers.List, peer)
			}
		}
	}
	return zt
}

func errText(err error) string {
	var ee *exec.ExitError
	if errors.As(err, &ee) {
		return string(ee.Stderr) + " " + err.Error()
	}
	return err.Error()
}
