package wifi

import (
	"context"
	"sort"
	"strconv"
	"strings"
)

// Security classes TarOS can act on. Everything else is shown but not
// connectable (see Network.Supported).
const (
	SecOpen       = "open"
	SecWPA2       = "wpa2" // WPA-PSK / WPA2-PSK (incl. mixed WPA/WPA2 and WPA2/WPA3 transition)
	SecWPA3       = "wpa3" // WPA3-SAE only
	SecEnterprise = "enterprise"
	SecWEP        = "wep"
)

// Network is one visible SSID (the strongest of its access points).
type Network struct {
	SSID      string `json:"ssid"`
	Signal    int    `json:"signal"` // 0-100
	Channel   int    `json:"channel"`
	Security  string `json:"security"`  // one of the Sec* constants
	Supported bool   `json:"supported"` // TarOS can connect to this class
	InUse     bool   `json:"inUse"`
	SavedUUID string `json:"savedUuid,omitempty"` // set when a saved profile exists for this SSID
}

// classify maps nmcli's SECURITY column ("WPA2", "WPA1 WPA2", "WPA2 WPA3",
// "WPA3", "WPA2 802.1X", "WEP", "") to a class.
func classify(sec string) string {
	s := strings.ToUpper(sec)
	switch {
	case strings.Contains(s, "802.1X"):
		return SecEnterprise
	case s == "" || s == "--":
		return SecOpen
	case strings.Contains(s, "WEP") && !strings.Contains(s, "WPA"):
		return SecWEP
	case strings.Contains(s, "WPA3") && !strings.Contains(s, "WPA2") && !strings.Contains(s, "WPA1"):
		return SecWPA3
	default:
		return SecWPA2
	}
}

func supported(class string) bool {
	return class == SecOpen || class == SecWPA2 || class == SecWPA3
}

// Profile is a saved (system) Wi-Fi connection.
type Profile struct {
	Name string
	UUID string
	SSID string
}

// Profiles lists saved Wi-Fi connection profiles with the SSID each targets.
func (c *Client) Profiles(ctx context.Context) ([]Profile, error) {
	out, err := c.run.Run(ctx, "-t", "-f", "NAME,UUID,TYPE", "connection", "show")
	if err != nil {
		return nil, err
	}
	var ps []Profile
	for _, l := range lines(out) {
		f := splitTerse(l)
		if len(f) < 3 || f[2] != "802-11-wireless" {
			continue
		}
		p := Profile{Name: f[0], UUID: f[1]}
		// Only client ("infrastructure") profiles count as saved networks. A
		// hotspot/ad-hoc profile (mode ap/adhoc) can share an SSID with a real
		// network, but activating it would turn this adapter into an access
		// point instead of joining anything.
		out, err := c.run.Run(ctx, "-g", "802-11-wireless.ssid,802-11-wireless.mode", "connection", "show", "uuid", f[1])
		if err != nil {
			continue
		}
		fields := lines(out)
		if len(fields) > 0 {
			p.SSID = unescapeSingle(fields[0])
		}
		if len(fields) > 1 && fields[1] != "" && fields[1] != "infrastructure" {
			continue
		}
		ps = append(ps, p)
	}
	return ps, nil
}

// Networks returns the visible networks, strongest first, one entry per SSID.
// rescan asks the radio for a fresh scan (nmcli waits for it); without it the
// last cached scan is returned.
func (c *Client) Networks(ctx context.Context, rescan bool) ([]Network, error) {
	dev, err := c.device(ctx)
	if err != nil {
		return nil, err
	}
	rs := "no"
	if rescan {
		rs = "yes"
	}
	out, err := c.run.Run(ctx, "-t", "-f", "IN-USE,SSID,SIGNAL,CHAN,SECURITY", "device", "wifi", "list", "ifname", dev, "--rescan", rs)
	if err != nil {
		return nil, err
	}
	best := map[string]*Network{}
	for _, l := range lines(out) {
		f := splitTerse(l)
		if len(f) < 5 || f[1] == "" { // hidden networks have no SSID to show
			continue
		}
		sig, _ := strconv.Atoi(f[2])
		ch, _ := strconv.Atoi(f[3])
		cls := classify(f[4])
		n := Network{SSID: f[1], Signal: sig, Channel: ch, Security: cls, Supported: supported(cls), InUse: f[0] == "*"}
		if cur, ok := best[n.SSID]; ok {
			n.InUse = n.InUse || cur.InUse
			if cur.Signal >= n.Signal {
				cur.InUse = n.InUse
				continue
			}
		}
		best[n.SSID] = &n
	}

	profiles, _ := c.Profiles(ctx) // best effort: without them nothing is marked "saved"
	res := make([]Network, 0, len(best))
	for _, n := range best {
		for _, p := range profiles {
			if p.SSID == n.SSID {
				n.SavedUUID = p.UUID
				break
			}
		}
		res = append(res, *n)
	}
	sort.Slice(res, func(i, j int) bool {
		if res[i].InUse != res[j].InUse {
			return res[i].InUse
		}
		if res[i].Signal != res[j].Signal {
			return res[i].Signal > res[j].Signal
		}
		return res[i].SSID < res[j].SSID
	})
	return res, nil
}
