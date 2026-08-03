package docker

import (
	"context"
	"time"
)

type rawNetwork struct {
	ID      string `json:"Id"`
	Name    string
	Driver  string
	Created time.Time
	IPAM    struct {
		Config []struct {
			Subnet string
		}
	}
}

type Network struct {
	ID             string
	Name           string
	Driver         string
	Created        time.Time
	Subnet         string
	ConnectedCount int
	Builtin        bool // bridge/host/none — Docker refuses to remove these
}

var builtinNetworks = map[string]bool{"bridge": true, "host": true, "none": true}

// ListNetworks lists networks, then inspects each individually for its
// connected-container count. The plain list endpoint always returns
// Containers as null — confirmed against the live daemon, this isn't
// documented clearly anywhere — so a per-network inspect call is the only
// way to get it. Unlike container stats, network inspect is fast
// (single-digit ms measured here), so this stays a synchronous sequential
// loop rather than needing a background Watcher like containers do.
func (c *Client) ListNetworks(ctx context.Context) ([]Network, error) {
	var raw []rawNetwork
	if err := c.getJSON(ctx, "/networks", &raw); err != nil {
		return nil, err
	}

	out := make([]Network, len(raw))
	for i, r := range raw {
		subnet := ""
		if len(r.IPAM.Config) > 0 {
			subnet = r.IPAM.Config[0].Subnet
		}
		out[i] = Network{
			ID:             r.ID,
			Name:           r.Name,
			Driver:         r.Driver,
			Created:        r.Created,
			Subnet:         subnet,
			ConnectedCount: c.networkConnectedCount(ctx, r.ID),
			Builtin:        builtinNetworks[r.Name],
		}
	}
	return out, nil
}

func (c *Client) networkConnectedCount(ctx context.Context, id string) int {
	var detail struct {
		Containers map[string]any
	}
	if err := c.getJSON(ctx, "/networks/"+id, &detail); err != nil {
		return 0
	}
	return len(detail.Containers)
}

// RemoveNetwork fails if the network is builtin or still has containers
// attached — Docker's own default behavior.
func (c *Client) RemoveNetwork(ctx context.Context, id string) error {
	_, err := c.do(ctx, "DELETE", "/networks/"+id, nil)
	return err
}
