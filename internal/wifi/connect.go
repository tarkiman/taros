package wifi

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"os"
	"path/filepath"
	"strings"
	"time"
	"unicode/utf8"
)

// Errors returned synchronously by Connect/Forget (the request is refused);
// what happens *after* the job starts is reported through Job.
var (
	ErrBusy             = errors.New("wifi: a switch is already in progress")
	ErrNotAvailable     = errors.New("wifi: not available on this host")
	ErrInvalidSSID      = errors.New("wifi: invalid SSID")
	ErrInvalidPassword  = errors.New("wifi: invalid Wi-Fi password")
	ErrPasswordRequired = errors.New("wifi: this network needs a password")
	ErrUnsupportedSec   = errors.New("wifi: security type not supported")
	ErrForgetActive     = errors.New("wifi: cannot forget the connection in use")
	ErrNoSuchProfile    = errors.New("wifi: no such saved network")
)

// Job phases and results, exposed to the UI.
const (
	PhaseIdle       = "idle"
	PhaseConnecting = "connecting"
	PhaseVerifying  = "verifying"
	PhaseRollback   = "rollback"
	PhaseDone       = "done"

	ResultConnected      = "connected"       // new network is up and verified
	ResultFailed         = "failed"          // could not connect; previous connection restored
	ResultRolledBack     = "rolled_back"     // connected but failed verification; previous connection restored
	ResultRollbackFailed = "rollback_failed" // could not restore the previous connection either
)

// Job is the state of the most recent switch. It lives in memory and is what
// the browser reads after the link drops and comes back.
type Job struct {
	Phase      string    `json:"phase"`
	Result     string    `json:"result,omitempty"`
	SSID       string    `json:"ssid,omitempty"`
	PreviousID string    `json:"previousSsid,omitempty"`
	Detail     string    `json:"detail,omitempty"` // nmcli's own words for why it failed
	StartedAt  time.Time `json:"startedAt,omitempty"`
	FinishedAt time.Time `json:"finishedAt,omitempty"`
}

// ConnectRequest: Security is the class from the scan (or the user's pick for
// a hidden network). Password is empty to reuse an existing saved profile.
type ConnectRequest struct {
	SSID     string
	Password string
	Security string
	Hidden   bool
}

func validSSID(s string) bool {
	if s == "" || len(s) > 32 || !utf8.ValidString(s) {
		return false
	}
	for _, r := range s {
		if r < 0x20 || r == 0x7f {
			return false
		}
	}
	return true
}

// validPassword: a WPA passphrase is 8–63 printable ASCII characters, or a
// 64-digit hex PSK. Anything else can't be a real one (and control characters
// have no business in the keyfile we write).
func validPassword(p string) bool {
	if len(p) == 64 {
		for _, r := range p {
			if !(r >= '0' && r <= '9' || r >= 'a' && r <= 'f' || r >= 'A' && r <= 'F') {
				return false
			}
		}
		return true
	}
	if len(p) < 8 || len(p) > 63 {
		return false
	}
	for i := 0; i < len(p); i++ {
		if p[i] < 0x20 || p[i] > 0x7e {
			return false
		}
	}
	return true
}

// kfEscape escapes a NetworkManager keyfile string value: backslash, and
// leading/trailing spaces (which the parser would otherwise trim).
func kfEscape(s string) string {
	s = strings.ReplaceAll(s, `\`, `\\`)
	if strings.HasPrefix(s, " ") {
		s = `\s` + s[1:]
	}
	if strings.HasSuffix(s, " ") {
		s = s[:len(s)-1] + `\s`
	}
	return s
}

// ssidBytes renders an SSID as the keyfile's integer-list form — unambiguous
// for any bytes, unlike the string form (an SSID like "12;34" would be read
// as bytes).
func ssidBytes(s string) string {
	var b strings.Builder
	for i := 0; i < len(s); i++ {
		fmt.Fprintf(&b, "%d;", s[i])
	}
	return b.String()
}

// extraIPv4 is appended to the profile's [ipv4] section. Empty in production;
// only the `wifie2e` build tag (e2e_neverdefault.go) sets it, so a test
// against virtual radios can keep its DHCP-supplied default route from
// hijacking the host's real one.
var extraIPv4 string

func keyfile(uuid, ssid, dev, sec, psk string, hidden bool) string {
	var b strings.Builder
	fmt.Fprintf(&b, "[connection]\nid=%s\nuuid=%s\ntype=wifi\ninterface-name=%s\nautoconnect=true\n\n", kfEscape(ssid), uuid, dev)
	fmt.Fprintf(&b, "[wifi]\nmode=infrastructure\nssid=%s\n", ssidBytes(ssid))
	if hidden {
		b.WriteString("hidden=true\n")
	}
	switch sec {
	case SecWPA2:
		fmt.Fprintf(&b, "\n[wifi-security]\nkey-mgmt=wpa-psk\npsk=%s\n", kfEscape(psk))
	case SecWPA3:
		fmt.Fprintf(&b, "\n[wifi-security]\nkey-mgmt=sae\npsk=%s\n", kfEscape(psk))
	}
	b.WriteString("\n[ipv4]\nmethod=auto\n" + extraIPv4 + "\n[ipv6]\naddr-gen-mode=default\nmethod=auto\n")
	return b.String()
}

// detailOf turns an nmcli failure into one readable line: NetworkManager
// appends "Hint: use 'journalctl -xe NM_CONNECTION=… + NM_DEVICE=…'", which
// means nothing to someone in a browser. Note that a *wrong password* is
// reported by NetworkManager as "The Wi-Fi network could not be found"
// (it blocklists the AP after failed handshakes), so the wording is the same
// as for a network that is genuinely out of range — the UI says so.
func detailOf(err error) string {
	msg := err.Error()
	var keep []string
	for _, l := range strings.Split(msg, "\n") {
		l = strings.TrimSpace(l)
		if l == "" || strings.HasPrefix(l, "Hint:") {
			continue
		}
		keep = append(keep, strings.TrimPrefix(l, "Error: "))
	}
	if len(keep) == 0 {
		return msg
	}
	return strings.Join(keep, " ")
}

func newUUID() (string, error) {
	b, err := os.ReadFile("/proc/sys/kernel/random/uuid")
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(b)), nil
}

// Status returns the latest job (zero value = idle).
func (c *Client) Status() Job {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.job.Phase == "" {
		return Job{Phase: PhaseIdle}
	}
	return c.job
}

func (c *Client) setJob(mutate func(*Job)) {
	c.mu.Lock()
	defer c.mu.Unlock()
	mutate(&c.job)
}

// Connect validates the request and starts the switch in the background,
// returning immediately: the HTTP response would be lost anyway when the
// link moves, so the outcome is read later through Status.
func (c *Client) Connect(ctx context.Context, req ConnectRequest) (Job, error) {
	if !validSSID(req.SSID) {
		return Job{}, ErrInvalidSSID
	}
	if req.Security == "" {
		req.Security = SecWPA2
	}
	if !supported(req.Security) {
		return Job{}, ErrUnsupportedSec
	}
	if req.Security == SecOpen {
		req.Password = ""
	} else if req.Password != "" && !validPassword(req.Password) {
		return Job{}, ErrInvalidPassword
	}
	if a := c.Available(ctx); !a.Supported {
		return Job{}, ErrNotAvailable
	}

	c.mu.Lock()
	if c.job.Phase != "" && c.job.Phase != PhaseDone && c.job.Phase != PhaseIdle {
		c.mu.Unlock()
		return Job{}, ErrBusy
	}
	c.job = Job{Phase: PhaseConnecting, SSID: req.SSID, StartedAt: c.now()}
	started := c.job
	c.mu.Unlock()

	go c.doConnect(req)
	return started, nil
}

func (c *Client) doConnect(req ConnectRequest) {
	// Deliberately detached from the HTTP request: the request is expected to
	// die mid-switch.
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Minute)
	defer cancel()

	finish := func(result, detail string) {
		c.setJob(func(j *Job) { j.Phase, j.Result, j.Detail, j.FinishedAt = PhaseDone, result, detail, c.now() })
		// detail is nmcli's own stderr — it never contains the password (which
		// is only ever in the root-only keyfile).
		slog.Info("wifi: hasil pindah jaringan", "ssid", req.SSID, "result", result, "detail", detail)
	}

	dev, err := c.device(ctx)
	if err != nil {
		finish(ResultFailed, detailOf(err))
		return
	}
	prev, _ := c.Current(ctx)
	if prev.Connected {
		c.setJob(func(j *Job) { j.PreviousID = prev.SSID })
	}

	// Reuse a saved profile when no new password was given; otherwise make a
	// fresh one (and drop the older duplicates only once the new one works).
	profiles, _ := c.Profiles(ctx)
	var stale []string
	target := ""
	for _, p := range profiles {
		if p.SSID != req.SSID {
			continue
		}
		if req.Password == "" && target == "" { // no new password (or open): reuse what's saved
			target = p.UUID
		} else {
			stale = append(stale, p.UUID)
		}
	}
	created := ""
	if target == "" {
		if req.Security != SecOpen && req.Password == "" {
			finish(ResultFailed, ErrPasswordRequired.Error())
			return
		}
		uuid, err := c.createProfile(ctx, dev, req)
		if err != nil {
			finish(ResultFailed, detailOf(err))
			return
		}
		target, created = uuid, uuid
	}

	up := func(uuid string) error {
		_, err := c.run.Run(ctx, "--wait", fmt.Sprint(int(c.upWait.Seconds())), "connection", "up", "uuid", uuid, "ifname", dev)
		return err
	}

	err = up(target)
	if err == nil {
		c.setJob(func(j *Job) { j.Phase = PhaseVerifying })
		err = c.waitOnline(ctx, dev, req.SSID)
	}
	if err == nil {
		for _, u := range stale {
			_, _ = c.run.Run(ctx, "connection", "delete", "uuid", u)
		}
		finish(ResultConnected, "")
		return
	}

	// --- roll back
	detail := detailOf(err)
	c.setJob(func(j *Job) { j.Phase = PhaseRollback })
	if created != "" { // don't leave a broken autoconnect profile behind
		_, _ = c.run.Run(ctx, "connection", "delete", "uuid", created)
	}
	result := ResultFailed
	if prev.Connected && prev.UUID != "" && prev.UUID != target {
		if rerr := up(prev.UUID); rerr != nil || c.waitOnline(ctx, dev, prev.SSID) != nil {
			finish(ResultRollbackFailed, detail)
			return
		}
		result = ResultRolledBack
	}
	finish(result, detail)
}

// createProfile writes the network as a NetworkManager keyfile (root-only,
// 0600, in NM's own directory) and loads it. The password therefore never
// appears in an argument list or environment.
func (c *Client) createProfile(ctx context.Context, dev string, req ConnectRequest) (string, error) {
	uuid, err := newUUID()
	if err != nil {
		return "", err
	}
	path := filepath.Join(c.connDir, "taros-wifi-"+uuid+".nmconnection")
	f, err := os.OpenFile(path, os.O_CREATE|os.O_EXCL|os.O_WRONLY, 0o600)
	if err != nil {
		return "", err
	}
	_, werr := f.WriteString(keyfile(uuid, req.SSID, dev, req.Security, req.Password, req.Hidden))
	cerr := f.Close()
	if werr != nil || cerr != nil {
		_ = os.Remove(path)
		return "", errors.Join(werr, cerr)
	}
	if _, err := c.run.Run(ctx, "connection", "load", path); err != nil {
		_ = os.Remove(path)
		return "", err
	}
	return uuid, nil
}

var errNoLink = errors.New("connected, but no IPv4 address was obtained in time")

// waitOnline waits for the device to be fully connected (NetworkManager's
// "activated" state) on the requested SSID with an IPv4 address — a lease is
// what proves the link actually works. Deliberately NOT required: a default
// gateway (a legitimate isolated LAN has none) and ICMP to it (many routers
// drop it). Either would roll back a perfectly good switch.
func (c *Client) waitOnline(ctx context.Context, dev, ssid string) error {
	deadline := c.now().Add(c.verifyWithin)
	for {
		if cur, err := c.state(ctx, dev); err == nil && cur.Connected && cur.IP != "" {
			if ssid == "" || cur.SSID == ssid {
				return nil
			}
		}
		if !c.now().Before(deadline) || ctx.Err() != nil {
			return errNoLink
		}
		c.sleep(time.Second)
	}
}

// Forget deletes a saved network. The connection in use can't be forgotten —
// that would drop the link the caller is using.
func (c *Client) Forget(ctx context.Context, uuid string) error {
	if a := c.Available(ctx); !a.Supported {
		return ErrNotAvailable
	}
	profiles, err := c.Profiles(ctx)
	if err != nil {
		return err
	}
	found := false
	for _, p := range profiles {
		if p.UUID == uuid {
			found = true
		}
	}
	if !found {
		return ErrNoSuchProfile
	}
	if cur, err := c.Current(ctx); err == nil && cur.Connected && cur.UUID == uuid {
		return ErrForgetActive
	}
	_, err = c.run.Run(ctx, "connection", "delete", "uuid", uuid)
	return err
}
