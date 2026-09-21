package sharing

import (
	"sort"
	"strings"
)

// Severity of a finding.
const (
	SevHigh = "high" // something exposed right now that should be fixed
	SevWarn = "warn"
	SevInfo = "info"
)

// Finding is one thing worth telling the user. Code is a stable key the UI
// translates; Params fill the message.
type Finding struct {
	Severity string         `json:"severity"`
	Code     string         `json:"code"`
	Service  string         `json:"service,omitempty"` // smb | ftp | "" (host-wide)
	Params   map[string]any `json:"params,omitempty"`
}

var legacyProtocols = map[string]bool{"lanman1": true, "lanman2": true, "core": true, "coreplus": true, "nt1": true, "smb1": true}

// nonLANKinds are the *other networks* a service bound to every interface would
// also be reachable from: overlay/VPN networks whose members you don't control
// the way you do your LAN. Docker bridges are deliberately absent — containers
// reaching the host over their bridge is normal, and listing a dozen bridge
// names would bury the finding that matters.
var nonLANKinds = map[string]bool{"zerotier": true, "tailscale": true}

// ComputeFindings turns the detected state into the list of things to tell the
// user: exposure, mistakes waiting to happen, and conflicts. Pure function.
func ComputeFindings(st Status) []Finding {
	var f []Finding
	add := func(sev, code, svc string, params map[string]any) {
		f = append(f, Finding{Severity: sev, Code: code, Service: svc, Params: params})
	}

	if !st.Root {
		add(SevInfo, "not_root", "", nil)
	}
	if len(st.Managers) > 0 {
		add(SevInfo, "other_manager", "", map[string]any{"names": strings.Join(st.Managers, ", ")})
	}

	// Non-LAN interfaces the host has (what "listening on every interface" would expose).
	var extra []string
	for _, i := range st.Interfaces {
		if nonLANKinds[i.Kind] {
			extra = append(extra, i.Name)
		}
	}
	sort.Strings(extra)

	exposed := false // some active file-sharing service accepts connections on every interface

	// ---- SMB
	smb := st.SMB
	if smb.Installed {
		if smb.Active && len(smb.Shares) == 0 && !smb.Managed {
			add(SevInfo, "smb_running_no_shares", "smb", nil)
		}
		if !smb.Standalone {
			add(SevInfo, "smb_not_standalone", "smb", nil)
		}
		var guests []string
		for _, s := range smb.Shares {
			if s.GuestOK {
				guests = append(guests, s.Name)
			}
		}
		if len(guests) > 0 {
			add(SevWarn, "smb_guest_share", "smb", map[string]any{"names": strings.Join(guests, ", ")})
		}
		if legacyProtocols[strings.ToLower(smb.Global.MinProtocol)] {
			add(SevWarn, "smb_legacy_protocol", "smb", map[string]any{"protocol": smb.Global.MinProtocol})
		}
		if smb.Active && allInterfaces(smb.Listeners) && len(extra) > 0 && !(smb.Global.BindOnly && len(smb.Global.Interfaces) > 0) {
			add(SevWarn, "smb_all_interfaces", "smb", map[string]any{"interfaces": strings.Join(extra, ", ")})
		}
		if !smb.Active {
			if c := conflict(smb.Listeners, "smbd", "nmbd"); c != nil {
				add(SevWarn, "port_conflict", "smb", map[string]any{"port": c.Port, "process": c.Process})
			}
		}
		if smb.Active && allInterfaces(smb.Listeners) {
			exposed = true
		}
		if st.SELinux == "enforcing" {
			add(SevInfo, "selinux_enforcing", "smb", nil)
		}
	}

	// ---- FTP
	ftp := st.FTP
	if len(ftp.OtherServers) > 0 {
		add(SevInfo, "ftp_other_server", "ftp", map[string]any{"names": strings.Join(ftp.OtherServers, ", ")})
	}
	if ftp.Installed {
		live := ftp.Active
		if ftp.Config.AnonWrite {
			add(SevHigh, "ftp_anonymous_write", "ftp", nil)
		} else if ftp.Config.Anonymous {
			add(SevWarn, "ftp_anonymous", "ftp", nil)
		}
		if ftp.Config.LocalLogin && !ftp.Config.ForceTLS && len(ftp.LoginUsers) > 0 { // TLS offered but not required still lets clear text in
			sev := SevWarn
			if live {
				sev = SevHigh // real Linux passwords crossing the network in clear text, right now
			}
			add(sev, "ftp_plaintext_local_login", "ftp", map[string]any{"users": strings.Join(ftp.LoginUsers, ", ")})
		}
		if live && allInterfaces(ftp.Listeners) && len(extra) > 0 {
			add(SevWarn, "ftp_all_interfaces", "ftp", map[string]any{"interfaces": strings.Join(extra, ", ")})
		}
		if !live {
			if c := conflict(ftp.Listeners, "vsftpd"); c != nil {
				add(SevWarn, "port_conflict", "ftp", map[string]any{"port": c.Port, "process": c.Process})
			}
		}
		if live && allInterfaces(ftp.Listeners) {
			exposed = true
		}
	}

	// Said once for the host, not once per service.
	if exposed && st.Firewall.Kind == "none" {
		add(SevInfo, "no_firewall", "", nil)
	}

	sort.SliceStable(f, func(i, j int) bool { return sevRank(f[i].Severity) < sevRank(f[j].Severity) })
	if f == nil {
		f = []Finding{}
	}
	return f
}

func sevRank(s string) int {
	switch s {
	case SevHigh:
		return 0
	case SevWarn:
		return 1
	}
	return 2
}

func allInterfaces(ls []Listener) bool {
	for _, l := range ls {
		if l.AllInterfaces() {
			return true
		}
	}
	return false
}

// conflict: a listener on the service's port owned by something *other* than
// the service itself (only knowable when ss could name the process).
func conflict(ls []Listener, own ...string) *Listener {
	for i := range ls {
		l := ls[i]
		if l.Process == "" {
			continue
		}
		ours := false
		for _, o := range own {
			if l.Process == o {
				ours = true
			}
		}
		if !ours {
			return &ls[i]
		}
	}
	return nil
}
