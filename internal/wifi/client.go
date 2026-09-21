package wifi

import (
	"context"
	"os"
	"os/exec"
	"strings"
	"sync"
	"time"
)

// Reasons the feature can be unavailable, for the UI to explain.
const (
	ReasonNoNmcli       = "no_nmcli"       // NetworkManager isn't managing this host
	ReasonNMNotRunning  = "nm_not_running" // nmcli present but the daemon is down
	ReasonNoDevice      = "no_wifi_device" // no Wi-Fi adapter
	ReasonNotAuthorized = "not_authorized" // polkit denies scan/connect for this user
	ReasonNeedsRoot     = "needs_root"     // can't write NetworkManager's system-connections
)

const defaultConnDir = "/etc/NetworkManager/system-connections"

// Availability says whether the feature works on this host and why not.
type Availability struct {
	Supported bool   `json:"supported"`
	Reason    string `json:"reason,omitempty"`
	Device    string `json:"device,omitempty"`
}

// Current is the live state of the Wi-Fi device.
type Current struct {
	Device    string `json:"device"`
	Connected bool   `json:"connected"`
	SSID      string `json:"ssid,omitempty"`
	UUID      string `json:"uuid,omitempty"`
	IP        string `json:"ip,omitempty"`
	Gateway   string `json:"gateway,omitempty"`
	Signal    int    `json:"signal,omitempty"`
}

// Client drives nmcli. Safe for concurrent use; at most one connect job runs.
type Client struct {
	run          Runner
	wantDevice   string // configured adapter; "" = auto (connected one, else first)
	connDir      string
	isRoot       func() bool
	now          func() time.Time
	sleep        func(time.Duration)
	verifyWithin time.Duration
	upWait       time.Duration

	mu       sync.Mutex
	job      Job
	lastScan time.Time
}

// New returns a Client, or ErrNoNmcli when nmcli isn't installed. device
// pins a specific adapter ("" = auto).
func New(device string) (*Client, error) {
	bin, err := exec.LookPath("nmcli")
	if err != nil {
		return nil, ErrNoNmcli
	}
	return newClient(execRunner{bin: bin}, device), nil
}

func newClient(r Runner, device string) *Client {
	return &Client{
		run:          r,
		wantDevice:   device,
		connDir:      defaultConnDir,
		isRoot:       func() bool { return os.Geteuid() == 0 },
		now:          time.Now,
		sleep:        time.Sleep,
		verifyWithin: 25 * time.Second,
		upWait:       30 * time.Second,
	}
}

type devRow struct{ name, state, conn string }

func (c *Client) wifiDevices(ctx context.Context) ([]devRow, error) {
	out, err := c.run.Run(ctx, "-t", "-f", "DEVICE,TYPE,STATE,CONNECTION", "device")
	if err != nil {
		return nil, err
	}
	var rows []devRow
	for _, l := range lines(out) {
		f := splitTerse(l)
		if len(f) >= 4 && f[1] == "wifi" {
			rows = append(rows, devRow{f[0], f[2], f[3]})
		}
	}
	return rows, nil
}

// device picks the adapter to operate on: the configured one, else the one
// that is connected, else the first.
func (c *Client) device(ctx context.Context) (string, error) {
	rows, err := c.wifiDevices(ctx)
	if err != nil {
		return "", err
	}
	if len(rows) == 0 {
		return "", errf("no wifi device")
	}
	if c.wantDevice != "" {
		for _, r := range rows {
			if r.name == c.wantDevice {
				return r.name, nil
			}
		}
		return "", errf("configured wifi device %q not found", c.wantDevice)
	}
	for _, r := range rows {
		if strings.HasPrefix(r.state, "connected") {
			return r.name, nil
		}
	}
	return rows[0].name, nil
}

// Available reports whether scanning/connecting can work here. It only reads
// state (`general permissions` is a query, not an attempt), so it is safe to
// call on every page load.
func (c *Client) Available(ctx context.Context) Availability {
	if out, err := c.run.Run(ctx, "-t", "-f", "RUNNING", "general"); err != nil || strings.TrimSpace(out) != "running" {
		return Availability{Reason: ReasonNMNotRunning}
	}
	dev, err := c.device(ctx)
	if err != nil {
		return Availability{Reason: ReasonNoDevice}
	}
	perms, err := c.run.Run(ctx, "-t", "-f", "PERMISSION,VALUE", "general", "permissions")
	if err != nil {
		return Availability{Reason: ReasonNotAuthorized, Device: dev}
	}
	need := map[string]bool{
		"org.freedesktop.NetworkManager.wifi.scan":              false,
		"org.freedesktop.NetworkManager.network-control":        false,
		"org.freedesktop.NetworkManager.settings.modify.system": false,
	}
	for _, l := range lines(perms) {
		f := splitTerse(l)
		if _, ok := need[f[0]]; ok && len(f) > 1 && f[1] == "yes" {
			need[f[0]] = true
		}
	}
	for _, ok := range need {
		if !ok {
			return Availability{Reason: ReasonNotAuthorized, Device: dev}
		}
	}
	// New passwords are handed to NetworkManager as a root-only keyfile in its
	// own system-connections directory (never argv/ps) — that needs root.
	if !c.isRoot() {
		return Availability{Reason: ReasonNeedsRoot, Device: dev}
	}
	return Availability{Supported: true, Device: dev}
}

// Current reads the Wi-Fi device's live state, including signal strength.
func (c *Client) Current(ctx context.Context) (Current, error) {
	dev, err := c.device(ctx)
	if err != nil {
		return Current{}, err
	}
	cur, err := c.state(ctx, dev)
	if err != nil || !cur.Connected {
		return cur, err
	}
	if nets, err := c.Networks(ctx, false); err == nil {
		for _, n := range nets {
			if n.InUse {
				cur.Signal = n.Signal
			}
		}
	}
	return cur, nil
}

// state is Current without the signal lookup — cheap enough to poll every
// second while verifying a switch.
func (c *Client) state(ctx context.Context, dev string) (Current, error) {
	cur := Current{Device: dev}
	out, err := c.run.Run(ctx, "-t", "-f", "GENERAL.STATE,IP4.ADDRESS,IP4.GATEWAY", "device", "show", dev)
	if err != nil {
		return cur, err
	}
	for _, l := range lines(out) {
		k, v, _ := strings.Cut(l, ":")
		v = strings.TrimSpace(unescapeSingle(v))
		switch {
		case k == "GENERAL.STATE":
			cur.Connected = strings.HasPrefix(v, "100")
		case strings.HasPrefix(k, "IP4.ADDRESS") && cur.IP == "":
			cur.IP = strings.SplitN(v, "/", 2)[0]
		case k == "IP4.GATEWAY":
			cur.Gateway = v
		}
	}
	if !cur.Connected {
		return cur, nil
	}
	// Which profile is active on this device, and what SSID does it target.
	if act, err := c.run.Run(ctx, "-t", "-f", "UUID,DEVICE", "connection", "show", "--active"); err == nil {
		for _, l := range lines(act) {
			if f := splitTerse(l); len(f) >= 2 && f[1] == dev {
				cur.UUID = f[0]
			}
		}
	}
	if cur.UUID != "" {
		if s, err := c.run.Run(ctx, "-g", "802-11-wireless.ssid", "connection", "show", "uuid", cur.UUID); err == nil {
			cur.SSID = unescapeSingle(s)
		}
	}
	return cur, nil
}

// Rescan gates fresh scans: a radio scan costs the connected link a moment of
// throughput, so requests closer than minScanGap fall back to the cache.
const minScanGap = 8 * time.Second

func (c *Client) shouldRescan() bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.now().Sub(c.lastScan) < minScanGap {
		return false
	}
	c.lastScan = c.now()
	return true
}

// Scan is Networks with the rescan rate limit applied.
func (c *Client) Scan(ctx context.Context, wantFresh bool) ([]Network, error) {
	return c.Networks(ctx, wantFresh && c.shouldRescan())
}
