package wifi

import (
	"context"
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"strings"
	"sync"
	"testing"
	"time"
)

// ---- a fake NetworkManager -------------------------------------------------

type fakeNet struct {
	psk      string // "" = open
	signal   int
	security string // nmcli SECURITY column
	channel  int
	noDHCP   bool // associates fine but never gets a lease
	noGW     bool // gets a lease but no default gateway (an isolated LAN)
}

type fakeProfile struct {
	name, ssid, psk, path string
	ap                    bool // a hotspot (mode=ap) profile
}

// fakeNM models just enough of NetworkManager + one Wi-Fi radio to exercise
// the connect/rollback logic, and records every call it receives.
type fakeNM struct {
	mu       sync.Mutex
	calls    [][]string
	nets     map[string]fakeNet // visible networks by SSID
	profiles map[string]*fakeProfile
	active   string // uuid of the connected profile, "" = disconnected
	dev      string
	perm     string // permission value, default "yes"
	running  bool
	noWifi   bool
	block    chan struct{} // if set, `connection up` waits on it (to hold a job open)
	upFail   map[string]error
	upLands  map[string]string // `up` of key succeeds but the device ends up on value (NM fell back on its own)
}

func newFakeNM() *fakeNM {
	return &fakeNM{
		nets:     map[string]fakeNet{},
		profiles: map[string]*fakeProfile{},
		dev:      "wlan0",
		perm:     "yes",
		running:  true,
		upFail:   map[string]error{},
	}
}

func (f *fakeNM) addProfile(uuid, ssid, psk string) {
	f.profiles[uuid] = &fakeProfile{name: ssid, ssid: ssid, psk: psk}
}

var (
	reUUID  = regexp.MustCompile(`(?m)^uuid=(.+)$`)
	reBytes = regexp.MustCompile(`(?m)^ssid=(.+)$`)
	rePSK   = regexp.MustCompile(`(?m)^psk=(.*)$`)
)

func parseSSIDBytes(list string) string {
	var out []byte
	for _, p := range strings.Split(strings.TrimSuffix(list, ";"), ";") {
		var n int
		fmt.Sscanf(p, "%d", &n)
		out = append(out, byte(n))
	}
	return string(out)
}

func (f *fakeNM) has(args ...string) bool {
	for _, c := range f.calls {
		if strings.Join(c, " ") == strings.Join(args, " ") {
			return true
		}
	}
	return false
}

func (f *fakeNM) count(prefix string) int {
	n := 0
	for _, c := range f.calls {
		if strings.HasPrefix(strings.Join(c, " "), prefix) {
			n++
		}
	}
	return n
}

func (f *fakeNM) Run(ctx context.Context, args ...string) (string, error) {
	f.mu.Lock()
	f.calls = append(f.calls, append([]string(nil), args...))
	block := f.block
	f.mu.Unlock()

	// Held open outside the lock so a test can observe the "busy" state.
	if len(args) >= 2 && args[0] == "--wait" && block != nil {
		<-block
	}
	f.mu.Lock()
	defer f.mu.Unlock()

	a := strings.Join(args, " ")
	switch {
	case a == "-t -f RUNNING general":
		if f.running {
			return "running\n", nil
		}
		return "not running\n", nil
	case a == "-t -f DEVICE,TYPE,STATE,CONNECTION device":
		if f.noWifi {
			return "lo:loopback:connected (externally):lo\n", nil
		}
		state, conn := "disconnected", ""
		if f.active != "" {
			state, conn = "connected", f.profiles[f.active].name
		}
		return fmt.Sprintf("%s:wifi:%s:%s\n", f.dev, state, conn), nil
	case a == "-t -f PERMISSION,VALUE general permissions":
		return fmt.Sprintf("org.freedesktop.NetworkManager.wifi.scan:%[1]s\norg.freedesktop.NetworkManager.network-control:%[1]s\norg.freedesktop.NetworkManager.settings.modify.system:%[1]s\n", f.perm), nil
	case strings.HasPrefix(a, "-t -f GENERAL.STATE,IP4.ADDRESS,IP4.GATEWAY device show"):
		if f.active == "" {
			return "GENERAL.STATE:30 (disconnected)\nIP4.ADDRESS[1]:\nIP4.GATEWAY:\n", nil
		}
		net := f.nets[f.profiles[f.active].ssid]
		if net.noDHCP {
			return "GENERAL.STATE:70 (connecting (getting IP configuration))\nIP4.ADDRESS[1]:\nIP4.GATEWAY:\n", nil
		}
		if net.noGW {
			return "GENERAL.STATE:100 (connected)\nIP4.ADDRESS[1]:10.9.9.5/24\nIP4.GATEWAY:\n", nil
		}
		return "GENERAL.STATE:100 (connected)\nIP4.ADDRESS[1]:192.168.1.11/24\nIP4.GATEWAY:192.168.1.1\n", nil
	case a == "-t -f UUID,DEVICE connection show --active":
		if f.active == "" {
			return "", nil
		}
		return f.active + ":" + f.dev + "\n", nil
	case strings.HasPrefix(a, "-g 802-11-wireless.ssid,802-11-wireless.mode connection show uuid "):
		p := f.profiles[args[len(args)-1]]
		if p == nil {
			return "", &CmdError{Stderr: "no such connection"}
		}
		mode := "infrastructure"
		if p.ap {
			mode = "ap"
		}
		return strings.NewReplacer(`\`, `\\`, `:`, `\:`).Replace(p.ssid) + "\n" + mode + "\n", nil
	case strings.HasPrefix(a, "-g 802-11-wireless.ssid connection show uuid "):
		p := f.profiles[args[len(args)-1]]
		if p == nil {
			return "", &CmdError{Stderr: "no such connection"}
		}
		return strings.NewReplacer(`\`, `\\`, `:`, `\:`).Replace(p.ssid) + "\n", nil
	case a == "-t -f NAME,UUID,TYPE connection show":
		var b strings.Builder
		for u, p := range f.profiles {
			fmt.Fprintf(&b, "%s:%s:802-11-wireless\n", p.name, u)
		}
		b.WriteString("docker0:11111111-1111-1111-1111-111111111111:bridge\n")
		return b.String(), nil
	case strings.HasPrefix(a, "-t -f IN-USE,SSID,SIGNAL,CHAN,SECURITY device wifi list"):
		var b strings.Builder
		for ssid, n := range f.nets {
			inuse := " "
			if f.active != "" && f.profiles[f.active].ssid == ssid {
				inuse = "*"
			}
			fmt.Fprintf(&b, "%s:%s:%d:%d:%s\n", inuse, strings.NewReplacer(`\`, `\\`, `:`, `\:`).Replace(ssid), n.signal, n.channel, n.security)
		}
		return b.String(), nil
	case len(args) == 3 && args[0] == "connection" && args[1] == "load":
		data, err := os.ReadFile(args[2])
		if err != nil {
			return "", &CmdError{Stderr: "cannot read " + args[2]}
		}
		s := string(data)
		uuid := reUUID.FindStringSubmatch(s)[1]
		p := &fakeProfile{path: args[2], ssid: parseSSIDBytes(reBytes.FindStringSubmatch(s)[1])}
		p.name = p.ssid
		if m := rePSK.FindStringSubmatch(s); m != nil {
			p.psk = strings.NewReplacer(`\s`, " ", `\\`, `\`).Replace(m[1])
		}
		f.profiles[uuid] = p
		return "", nil
	case len(args) >= 6 && args[0] == "--wait" && args[2] == "connection" && args[3] == "up":
		uuid := args[5]
		if err := f.upFail[uuid]; err != nil {
			f.active = "" // NM tears the old link down before trying the new one
			return "", err
		}
		p := f.profiles[uuid]
		if p == nil {
			return "", &CmdError{Stderr: "unknown connection"}
		}
		n, visible := f.nets[p.ssid]
		f.active = "" // the previous connection is deactivated first
		if !visible {
			return "", &CmdError{Stderr: "Error: Connection activation failed: No network with SSID '" + p.ssid + "' found."}
		}
		if n.psk != p.psk {
			return "", &CmdError{Stderr: "Error: Connection activation failed: Secrets were required, but not provided."}
		}
		f.active = uuid
		if landed, ok := f.upLands[uuid]; ok {
			f.active = landed
		}
		return "Connection successfully activated", nil
	case len(args) == 4 && args[0] == "connection" && args[1] == "delete" && args[2] == "uuid":
		if p := f.profiles[args[3]]; p != nil {
			if p.path != "" {
				_ = os.Remove(p.path) // real NM deletes the keyfile too
			}
			delete(f.profiles, args[3])
			if f.active == args[3] {
				f.active = ""
			}
		}
		return "", nil
	}
	return "", &CmdError{Stderr: "fake: unhandled nmcli call: " + a}
}

// ---- helpers ----------------------------------------------------------------

type rig struct {
	t   *testing.T
	nm  *fakeNM
	c   *Client
	dir string
	clk time.Time
}

func newRig(t *testing.T) *rig {
	nm := newFakeNM()
	c := newClient(nm, "")
	r := &rig{t: t, nm: nm, c: c, dir: t.TempDir(), clk: time.Date(2026, 9, 21, 12, 0, 0, 0, time.UTC)}
	c.connDir = r.dir
	c.isRoot = func() bool { return true }
	c.now = func() time.Time { return r.clk }
	c.sleep = func(d time.Duration) { r.clk = r.clk.Add(d) } // fake time: verification "waits" instantly
	return r
}

func (r *rig) waitDone() Job {
	r.t.Helper()
	deadline := time.Now().Add(5 * time.Second)
	for time.Now().Before(deadline) {
		if j := r.c.Status(); j.Phase == PhaseDone {
			return j
		}
		time.Sleep(2 * time.Millisecond)
	}
	r.t.Fatalf("job did not finish: %+v", r.c.Status())
	return Job{}
}

// homeWifi: the Pi is connected to "Home" (saved), and "Cafe" is also visible.
func homeAndCafe(r *rig) {
	r.nm.nets["Home"] = fakeNet{psk: "homepass123", signal: 80, security: "WPA2", channel: 36}
	r.nm.nets["Cafe"] = fakeNet{psk: "cafepass456", signal: 55, security: "WPA2", channel: 6}
	r.nm.addProfile("uuid-home", "Home", "homepass123")
	r.nm.active = "uuid-home"
}

func noPasswordInArgs(t *testing.T, nm *fakeNM, secrets ...string) {
	t.Helper()
	for _, call := range nm.calls {
		for _, arg := range call {
			for _, s := range secrets {
				if strings.Contains(arg, s) {
					t.Fatalf("secret %q leaked into nmcli argv: %v", s, call)
				}
			}
		}
	}
}

// ---- parsing / classification ----------------------------------------------

func TestSplitTerseUnescapes(t *testing.T) {
	got := splitTerse(`*:Cafe\: 5G\\x:80:161:WPA2`)
	want := []string{"*", `Cafe: 5G\x`, "80", "161", "WPA2"}
	if fmt.Sprint(got) != fmt.Sprint(want) {
		t.Fatalf("got %q want %q", got, want)
	}
}

func TestClassify(t *testing.T) {
	cases := map[string]string{
		"": SecOpen, "--": SecOpen, "WPA2": SecWPA2, "WPA1 WPA2": SecWPA2, "WPA1": SecWPA2,
		"WPA3": SecWPA3, "WPA2 WPA3": SecWPA2, "WPA2 802.1X": SecEnterprise, "WPA3 802.1X": SecEnterprise, "WEP": SecWEP,
	}
	for in, want := range cases {
		if got := classify(in); got != want {
			t.Errorf("classify(%q) = %s, want %s", in, got, want)
		}
	}
	if supported(SecEnterprise) || supported(SecWEP) || !supported(SecOpen) || !supported(SecWPA2) || !supported(SecWPA3) {
		t.Fatal("supported() disagrees with the documented scope")
	}
}

func TestNetworksDedupeSortAndSaved(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.nets[`Odd: Name`] = fakeNet{signal: 30, security: "", channel: 1}
	r.nm.nets["Corp"] = fakeNet{signal: 90, security: "WPA2 802.1X", channel: 11}
	r.nm.nets[""] = fakeNet{signal: 99, security: "WPA2", channel: 161} // hidden: no SSID to show
	nets, err := r.c.Networks(context.Background(), false)
	if err != nil {
		t.Fatal(err)
	}
	var order []string
	for _, n := range nets {
		order = append(order, n.SSID)
	}
	// In-use first, then by signal.
	if got, want := strings.Join(order, ","), "Home,Corp,Cafe,Odd: Name"; got != want {
		t.Fatalf("order = %s, want %s", got, want)
	}
	byName := map[string]Network{}
	for _, n := range nets {
		byName[n.SSID] = n
	}
	if !byName["Home"].InUse || byName["Home"].SavedUUID != "uuid-home" {
		t.Fatalf("Home = %+v", byName["Home"])
	}
	if byName["Cafe"].SavedUUID != "" || !byName["Cafe"].Supported {
		t.Fatalf("Cafe = %+v", byName["Cafe"])
	}
	if byName["Corp"].Supported || byName["Corp"].Security != SecEnterprise {
		t.Fatalf("enterprise network must be listed but not connectable: %+v", byName["Corp"])
	}
	if byName["Odd: Name"].Security != SecOpen {
		t.Fatalf("Odd = %+v", byName["Odd: Name"])
	}
}

func TestScanRateLimitFallsBackToCache(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	ctx := context.Background()
	_, _ = r.c.Scan(ctx, true) // first fresh scan goes through
	r.clk = r.clk.Add(2 * time.Second)
	_, _ = r.c.Scan(ctx, true) // too soon → cache
	r.clk = r.clk.Add(10 * time.Second)
	_, _ = r.c.Scan(ctx, true) // allowed again
	var fresh []bool
	for _, c := range r.nm.calls {
		if len(c) > 6 && c[3] == "device" && c[4] == "wifi" {
			fresh = append(fresh, c[len(c)-1] == "yes")
		}
	}
	if fmt.Sprint(fresh) != "[true false true]" {
		t.Fatalf("rescan flags = %v, want [true false true]", fresh)
	}
}

// ---- keyfile / validation ---------------------------------------------------

func TestKeyfileEscapingAndShape(t *testing.T) {
	kf := keyfile("u-1", "12;34 é", "wlan0", SecWPA2, ` a b\c;d#e `, false)
	for _, want := range []string{
		"ssid=49;50;59;51;52;32;195;169;\n", // byte list: unambiguous even for "12;34"
		`psk=\sa b\\c;d#e\s` + "\n",         // backslash doubled, edge spaces escaped
		"key-mgmt=wpa-psk", "interface-name=wlan0", "autoconnect=true", "uuid=u-1",
	} {
		if !strings.Contains(kf, want) {
			t.Errorf("keyfile missing %q:\n%s", want, kf)
		}
	}
	if strings.Contains(kf, "hidden=") {
		t.Error("hidden=true must only be written for hidden networks")
	}
	if open := keyfile("u", "Open", "wlan0", SecOpen, "ignored", false); strings.Contains(open, "wifi-security") || strings.Contains(open, "ignored") {
		t.Errorf("open network must have no security section or key:\n%s", open)
	}
	if sae := keyfile("u", "X", "wlan0", SecWPA3, "password1", true); !strings.Contains(sae, "key-mgmt=sae") || !strings.Contains(sae, "hidden=true") {
		t.Errorf("wpa3/hidden:\n%s", sae)
	}
}

func TestValidation(t *testing.T) {
	for _, s := range []string{"", strings.Repeat("a", 33), "bad\nname", "bad\x00", "\x7f", string([]byte{0xff, 0xfe})} {
		if validSSID(s) {
			t.Errorf("SSID %q should be invalid", s)
		}
	}
	for _, s := range []string{"a", "Jangan Lupa Bahagia_5G", "café ☕", strings.Repeat("é", 16)} {
		if !validSSID(s) {
			t.Errorf("SSID %q should be valid", s)
		}
	}
	for _, p := range []string{"short", "pass\nword1", "pässword12", strings.Repeat("z", 64), strings.Repeat("a", 64) + "0"} {
		if validPassword(p) {
			t.Errorf("password %q should be invalid", p)
		}
	}
	for _, p := range []string{"12345678", strings.Repeat("a", 63), strings.Repeat("A1", 32), strings.Repeat("a", 64), "pass word;#\\1"} {
		if !validPassword(p) {
			t.Errorf("password %q should be valid", p)
		}
	}
	r := newRig(t)
	homeAndCafe(r)
	ctx := context.Background()
	if _, err := r.c.Connect(ctx, ConnectRequest{SSID: "", Password: "12345678"}); !errors.Is(err, ErrInvalidSSID) {
		t.Errorf("empty SSID: %v", err)
	}
	if _, err := r.c.Connect(ctx, ConnectRequest{SSID: "Cafe", Password: "short"}); !errors.Is(err, ErrInvalidPassword) {
		t.Errorf("short password: %v", err)
	}
	if _, err := r.c.Connect(ctx, ConnectRequest{SSID: "Corp", Security: SecEnterprise}); !errors.Is(err, ErrUnsupportedSec) {
		t.Errorf("enterprise: %v", err)
	}
	if _, err := r.c.Connect(ctx, ConnectRequest{SSID: "Old", Security: SecWEP}); !errors.Is(err, ErrUnsupportedSec) {
		t.Errorf("wep: %v", err)
	}
	if r.nm.count("--wait") != 0 {
		t.Fatal("a rejected request must not touch the radio")
	}
}

// ---- the switch itself ------------------------------------------------------

func TestConnectNewNetworkSucceeds(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Password: "cafepass456", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	j := r.waitDone()
	if j.Result != ResultConnected || j.SSID != "Cafe" || j.PreviousID != "Home" {
		t.Fatalf("job = %+v", j)
	}
	noPasswordInArgs(t, r.nm, "cafepass456")

	// The profile was written as a root-only keyfile and is now the active one.
	var cafeUUID string
	for u, p := range r.nm.profiles {
		if p.ssid == "Cafe" {
			cafeUUID = u
			fi, err := os.Stat(p.path)
			if err != nil || fi.Mode().Perm() != 0o600 {
				t.Fatalf("keyfile %s: err=%v mode=%v, want 0600", p.path, err, fi)
			}
			if filepath.Dir(p.path) != r.dir {
				t.Fatalf("keyfile written outside the NM dir: %s", p.path)
			}
		}
	}
	if cafeUUID == "" || r.nm.active != cafeUUID {
		t.Fatalf("Cafe not active: active=%s profiles=%v", r.nm.active, r.nm.profiles)
	}
	if _, ok := r.nm.profiles["uuid-home"]; !ok {
		t.Fatal("the previous network must stay saved as a fallback")
	}
}

func TestWrongPasswordRollsBackAndLeavesNoBrokenProfile(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Password: "not-the-password", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	j := r.waitDone()
	if j.Result != ResultRolledBack {
		t.Fatalf("job = %+v, want rolled_back", j)
	}
	if !strings.Contains(j.Detail, "Secrets were required") {
		t.Fatalf("nmcli's reason must reach the user: %q", j.Detail)
	}
	if r.nm.active != "uuid-home" {
		t.Fatalf("previous connection not restored: active=%q", r.nm.active)
	}
	for _, p := range r.nm.profiles {
		if p.ssid == "Cafe" {
			t.Fatal("a failed attempt must not leave an autoconnect profile behind")
		}
	}
	entries, _ := os.ReadDir(r.dir)
	if len(entries) != 0 {
		t.Fatalf("keyfile left on disk: %v", entries)
	}
	noPasswordInArgs(t, r.nm, "not-the-password")
}

func TestNoLeaseRollsBack(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.nets["Cafe"] = fakeNet{psk: "cafepass456", signal: 55, security: "WPA2", noDHCP: true} // associates, no IP
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Password: "cafepass456", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	j := r.waitDone()
	if j.Result != ResultRolledBack || !strings.Contains(j.Detail, "IPv4") {
		t.Fatalf("job = %+v", j)
	}
	if r.nm.active != "uuid-home" {
		t.Fatalf("active = %q", r.nm.active)
	}
}

func TestRollbackFailureIsReportedNotHidden(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.upFail["uuid-home"] = errors.New("home router is down too")
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Password: "wrong-wrong", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	if j := r.waitDone(); j.Result != ResultRollbackFailed {
		t.Fatalf("job = %+v, want rollback_failed", j)
	}
}

func TestOutOfRangeNetworkRollsBack(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Gone", Password: "12345678", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	j := r.waitDone()
	if j.Result != ResultRolledBack || !strings.Contains(j.Detail, "No network with SSID") {
		t.Fatalf("job = %+v", j)
	}
	if r.nm.active != "uuid-home" {
		t.Fatalf("active = %q", r.nm.active)
	}
}

func TestSavedNetworkReusedWithoutPassword(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.addProfile("uuid-cafe", "Cafe", "cafepass456")
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	j := r.waitDone()
	if j.Result != ResultConnected || r.nm.active != "uuid-cafe" {
		t.Fatalf("job = %+v active=%q", j, r.nm.active)
	}
	if r.nm.count("connection load") != 0 {
		t.Fatal("reusing a saved profile must not write a new keyfile")
	}
	if r.nm.count("connection delete") != 0 {
		t.Fatal("nothing should be deleted when reusing a profile")
	}
}

func TestNewPasswordReplacesSavedProfileOnlyOnSuccess(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.addProfile("uuid-cafe-old", "Cafe", "old-cafe-pass") // saved with a stale password
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Password: "cafepass456", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	if j := r.waitDone(); j.Result != ResultConnected {
		t.Fatalf("job = %+v", j)
	}
	if _, ok := r.nm.profiles["uuid-cafe-old"]; ok {
		t.Fatal("the stale duplicate should be replaced after a successful switch")
	}

	// ...but kept when the new password turns out to be wrong.
	r2 := newRig(t)
	homeAndCafe(r2)
	r2.nm.addProfile("uuid-cafe-old", "Cafe", "cafepass456") // this one still works
	if _, err := r2.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Password: "typo-typo-1", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	if j := r2.waitDone(); j.Result != ResultRolledBack {
		t.Fatalf("job = %+v", j)
	}
	if _, ok := r2.nm.profiles["uuid-cafe-old"]; !ok {
		t.Fatal("a failed replacement must not destroy the working saved profile")
	}
}

func TestSecuredNetworkWithoutPasswordNeverTouchesTheRadio(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	j := r.waitDone()
	if j.Result != ResultFailed || !strings.Contains(j.Detail, "needs a password") {
		t.Fatalf("job = %+v", j)
	}
	if r.nm.count("--wait") != 0 || r.nm.active != "uuid-home" {
		t.Fatalf("connection was disturbed: active=%q calls=%v", r.nm.active, r.nm.calls)
	}
}

func TestOpenNetworkAndHiddenNetwork(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.nets["Free"] = fakeNet{signal: 60, security: ""}
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Free", Password: "ignored-for-open", Security: SecOpen}); err != nil {
		t.Fatal(err)
	}
	if j := r.waitDone(); j.Result != ResultConnected {
		t.Fatalf("open: %+v", j)
	}
	noPasswordInArgs(t, r.nm, "ignored-for-open")

	r2 := newRig(t)
	homeAndCafe(r2)
	r2.nm.nets["Secret"] = fakeNet{psk: "hiddenpass9", security: "WPA2"}
	if _, err := r2.c.Connect(context.Background(), ConnectRequest{SSID: "Secret", Password: "hiddenpass9", Security: SecWPA2, Hidden: true}); err != nil {
		t.Fatal(err)
	}
	if j := r2.waitDone(); j.Result != ResultConnected {
		t.Fatalf("hidden: %+v", j)
	}
	for _, p := range r2.nm.profiles {
		if p.ssid == "Secret" {
			data, _ := os.ReadFile(p.path)
			if !strings.Contains(string(data), "hidden=true") {
				t.Fatalf("hidden flag not written:\n%s", data)
			}
		}
	}
}

func TestOnlyOneSwitchAtATime(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.block = make(chan struct{})
	ctx := context.Background()
	if _, err := r.c.Connect(ctx, ConnectRequest{SSID: "Cafe", Password: "cafepass456", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	// Wait until the first job is really inside `connection up`.
	deadline := time.Now().Add(3 * time.Second)
	for r.nm.count("--wait") == 0 && time.Now().Before(deadline) {
		time.Sleep(time.Millisecond)
	}
	if _, err := r.c.Connect(ctx, ConnectRequest{SSID: "Home", Security: SecWPA2}); !errors.Is(err, ErrBusy) {
		t.Fatalf("second switch while one is running: %v, want ErrBusy", err)
	}
	if st := r.c.Status(); st.Phase != PhaseConnecting {
		t.Fatalf("status = %+v", st)
	}
	close(r.nm.block)
	r.waitDone()
	// After it finishes a new one is accepted again.
	r.nm.block = nil
	if _, err := r.c.Connect(ctx, ConnectRequest{SSID: "Home", Security: SecWPA2}); err != nil {
		t.Fatalf("after completion: %v", err)
	}
	r.waitDone()
}

// ---- forget / availability ---------------------------------------------------

func TestForget(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.addProfile("uuid-cafe", "Cafe", "cafepass456")
	ctx := context.Background()
	if err := r.c.Forget(ctx, "uuid-home"); !errors.Is(err, ErrForgetActive) {
		t.Fatalf("forgetting the connection in use: %v, want ErrForgetActive", err)
	}
	if err := r.c.Forget(ctx, "does-not-exist"); !errors.Is(err, ErrNoSuchProfile) {
		t.Fatalf("unknown uuid: %v", err)
	}
	// A uuid that belongs to a non-Wi-Fi connection must not be deletable through this API.
	if err := r.c.Forget(ctx, "11111111-1111-1111-1111-111111111111"); !errors.Is(err, ErrNoSuchProfile) {
		t.Fatalf("non-wifi connection: %v, want ErrNoSuchProfile", err)
	}
	if err := r.c.Forget(ctx, "uuid-cafe"); err != nil {
		t.Fatal(err)
	}
	if _, ok := r.nm.profiles["uuid-cafe"]; ok {
		t.Fatal("profile not deleted")
	}
	if _, ok := r.nm.profiles["uuid-home"]; !ok {
		t.Fatal("wrong profile deleted")
	}
}

func TestAvailabilityReasons(t *testing.T) {
	ctx := context.Background()
	check := func(name string, mut func(*rig), want Availability) {
		t.Helper()
		r := newRig(t)
		homeAndCafe(r)
		mut(r)
		if got := r.c.Available(ctx); got.Supported != want.Supported || got.Reason != want.Reason {
			t.Errorf("%s: got %+v, want %+v", name, got, want)
		}
	}
	check("ok", func(*rig) {}, Availability{Supported: true})
	check("NM down", func(r *rig) { r.nm.running = false }, Availability{Reason: ReasonNMNotRunning})
	check("no adapter", func(r *rig) { r.nm.noWifi = true }, Availability{Reason: ReasonNoDevice})
	check("polkit denies", func(r *rig) { r.nm.perm = "auth" }, Availability{Reason: ReasonNotAuthorized})
	check("not root", func(r *rig) { r.c.isRoot = func() bool { return false } }, Availability{Reason: ReasonNeedsRoot})

	r := newRig(t)
	homeAndCafe(r)
	r.nm.perm = "auth"
	if _, err := r.c.Connect(ctx, ConnectRequest{SSID: "Cafe", Password: "cafepass456"}); !errors.Is(err, ErrNotAvailable) {
		t.Fatalf("Connect on an unauthorised host: %v, want ErrNotAvailable", err)
	}
	if err := r.c.Forget(ctx, "uuid-home"); !errors.Is(err, ErrNotAvailable) {
		t.Fatalf("Forget on an unauthorised host: %v", err)
	}
}

func TestDeviceSelection(t *testing.T) {
	// Configured adapter that doesn't exist → error, never a silent fallback to another radio.
	r := newRig(t)
	homeAndCafe(r)
	r.c.wantDevice = "wlan9"
	if _, err := r.c.Networks(context.Background(), false); err == nil {
		t.Fatal("a configured-but-missing adapter must be an error")
	}
	r.c.wantDevice = "wlan0"
	if _, err := r.c.Networks(context.Background(), false); err != nil {
		t.Fatalf("configured adapter present: %v", err)
	}
}

func TestCurrentReportsLiveState(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	cur, err := r.c.Current(context.Background())
	if err != nil {
		t.Fatal(err)
	}
	if !cur.Connected || cur.SSID != "Home" || cur.IP != "192.168.1.11" || cur.Gateway != "192.168.1.1" || cur.Signal != 80 || cur.UUID != "uuid-home" {
		t.Fatalf("current = %+v", cur)
	}
	r.nm.active = ""
	if cur, _ := r.c.Current(context.Background()); cur.Connected || cur.SSID != "" {
		t.Fatalf("disconnected = %+v", cur)
	}
}

func TestSavedOpenNetworkIsReusedEvenIfAPasswordIsSent(t *testing.T) {
	r := newRig(t)
	homeAndCafe(r)
	r.nm.nets["Free"] = fakeNet{signal: 60}
	r.nm.addProfile("uuid-free", "Free", "")
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Free", Password: "stray-password", Security: SecOpen}); err != nil {
		t.Fatal(err)
	}
	if j := r.waitDone(); j.Result != ResultConnected || r.nm.active != "uuid-free" {
		t.Fatalf("job=%+v active=%q", j, r.nm.active)
	}
	if r.nm.count("connection load") != 0 || r.nm.count("connection delete") != 0 {
		t.Fatalf("an open network has no password: reuse the saved profile, don't rewrite it: %v", r.nm.calls)
	}
	noPasswordInArgs(t, r.nm, "stray-password")
}

func TestVerificationRequiresTheRequestedNetwork(t *testing.T) {
	// `up` reports success, and the device is "connected" with a lease — but
	// on a different SSID than the one asked for (NM fell back on its own).
	// That is not the switch the user asked for: it must be treated as failed.
	r := newRig(t)
	homeAndCafe(r)
	r.nm.addProfile("uuid-cafe", "Cafe", "cafepass456")
	r.nm.upLands = map[string]string{"uuid-cafe": "uuid-home"}
	r.c.verifyWithin = 3 * time.Second
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	j := r.waitDone()
	if j.Result == ResultConnected {
		t.Fatalf("reported success although the device is on another network: %+v", j)
	}
}

func TestHotspotProfilesAreNotSavedNetworks(t *testing.T) {
	// A profile in AP mode that happens to share an SSID with a real network
	// must never be offered as "saved", reused, or deleted as a duplicate:
	// activating it would make this adapter an access point.
	r := newRig(t)
	homeAndCafe(r)
	r.nm.addProfile("uuid-hotspot", "Cafe", "hotspot-pass")
	r.nm.profiles["uuid-hotspot"].ap = true

	nets, err := r.c.Networks(context.Background(), false)
	if err != nil {
		t.Fatal(err)
	}
	for _, n := range nets {
		if n.SSID == "Cafe" && n.SavedUUID != "" {
			t.Fatalf("hotspot profile listed as a saved network: %+v", n)
		}
	}
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Password: "cafepass456", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	if j := r.waitDone(); j.Result != ResultConnected {
		t.Fatalf("job = %+v", j)
	}
	if r.nm.active == "uuid-hotspot" {
		t.Fatal("connected through the hotspot profile")
	}
	if _, ok := r.nm.profiles["uuid-hotspot"]; !ok {
		t.Fatal("someone else's hotspot profile must not be deleted as a 'stale duplicate'")
	}
	// Reuse (no password) also must not pick it.
	r2 := newRig(t)
	homeAndCafe(r2)
	r2.nm.addProfile("uuid-hotspot", "Cafe", "cafepass456")
	r2.nm.profiles["uuid-hotspot"].ap = true
	if _, err := r2.c.Connect(context.Background(), ConnectRequest{SSID: "Cafe", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	if j := r2.waitDone(); j.Result != ResultFailed || !strings.Contains(j.Detail, "needs a password") {
		t.Fatalf("with only a hotspot profile there is nothing to reuse: %+v", j)
	}
}

func TestNetworkWithoutDefaultGatewayIsAGoodSwitch(t *testing.T) {
	// An isolated LAN (lease, but no router to the outside) is a legitimate
	// destination — requiring a gateway would roll back a perfectly good switch.
	r := newRig(t)
	homeAndCafe(r)
	r.nm.nets["Lab"] = fakeNet{psk: "labpass1234", signal: 70, security: "WPA2", noGW: true}
	if _, err := r.c.Connect(context.Background(), ConnectRequest{SSID: "Lab", Password: "labpass1234", Security: SecWPA2}); err != nil {
		t.Fatal(err)
	}
	if j := r.waitDone(); j.Result != ResultConnected {
		t.Fatalf("job = %+v — a network with a lease but no gateway must count as connected", j)
	}
}

func TestDetailOfStripsNetworkManagerNoise(t *testing.T) {
	err := &CmdError{Stderr: "Error: Connection activation failed: The Wi-Fi network could not be found\nHint: use 'journalctl -xe NM_CONNECTION=abc + NM_DEVICE=wlan3' to get more details.\n", Err: errors.New("exit status 4")}
	if got, want := detailOf(err), "Connection activation failed: The Wi-Fi network could not be found"; got != want {
		t.Fatalf("detailOf = %q, want %q", got, want)
	}
	if got := detailOf(errors.New("plain")); got != "plain" {
		t.Fatalf("plain error = %q", got)
	}
	if got := detailOf(&CmdError{Err: errors.New("exit status 1")}); got != "exit status 1" {
		t.Fatalf("empty stderr should fall back to the exit error, got %q", got)
	}
	if strings.Contains(detailOf(err), "journalctl") {
		t.Fatal("hint leaked into the user-facing detail")
	}
}
