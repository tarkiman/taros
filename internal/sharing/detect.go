package sharing

import (
	"context"
	"os"
	"os/exec"
	"path/filepath"
	"runtime"
	"sort"
	"strings"

	"github.com/tarkiman/taros/internal/netinfo"
)

// Paths are the files detection reads; tests point them at fixtures.
type Paths struct {
	OSRelease   string
	SmbConf     string
	SambaDir    string // where TarOS's managed include files live
	VsftpdConfs []string
	VsftpdDir   string // where TarOS's managed vsftpd files live
	PamDir      string
	Passwd      string
	SystemdRun  string // exists only when systemd is PID 1
}

func DefaultPaths() Paths {
	return Paths{
		OSRelease:   "/etc/os-release",
		SmbConf:     "/etc/samba/smb.conf",
		SambaDir:    "/etc/samba",
		VsftpdConfs: []string{"/etc/vsftpd.conf", "/etc/vsftpd/vsftpd.conf"},
		VsftpdDir:   "/etc/vsftpd",
		PamDir:      "/etc/pam.d",
		Passwd:      "/etc/passwd",
		SystemdRun:  "/run/systemd/system",
	}
}

// Iface is a network interface a service could be reachable on.
type Iface struct {
	Name string `json:"name"`
	Kind string `json:"kind"`
	IP   string `json:"ip"`
}

// SMBStatus is everything known about Samba on this machine.
type SMBStatus struct {
	Installed bool   `json:"installed"`
	Binary    string `json:"binary,omitempty"`
	Version   string `json:"version,omitempty"`
	Unit      string `json:"unit,omitempty"`
	NmbUnit   string `json:"nmbUnit,omitempty"`
	Active    bool   `json:"active"`
	Enabled   bool   `json:"enabled"`
	NmbActive bool   `json:"nmbActive"`
	// Managed: TarOS's include markers are in smb.conf.
	Managed bool `json:"managed"`
	// Standalone: a plain file server (not an AD member/DC) — the only kind TarOS manages.
	Standalone bool `json:"standalone"`
	// CanManage / ManageBlocked: whether TarOS may change things here, and if not why
	// ("not_root", "not_standalone", "no_tools").
	CanManage     bool        `json:"canManage"`
	ManageBlocked string      `json:"manageBlocked,omitempty"`
	Shares        []ShareInfo `json:"shares"`
	Global        SMBGlobal   `json:"global"`
	Users         []string    `json:"users"`
	UsersKnown    bool        `json:"usersKnown"` // false when pdbedit couldn't be read (needs root)
	Listeners     []Listener  `json:"listeners"`
	Install       InstallHint `json:"install"`
	ConfigError   string      `json:"configError,omitempty"`
}

// SMBGlobal is the handful of [global] settings that matter for exposure.
type SMBGlobal struct {
	Workgroup       string   `json:"workgroup,omitempty"`
	MapToGuest      string   `json:"mapToGuest,omitempty"`
	MinProtocol     string   `json:"minProtocol,omitempty"`
	Interfaces      []string `json:"interfaces,omitempty"`
	BindOnly        bool     `json:"bindInterfacesOnly"`
	HostsAllow      string   `json:"hostsAllow,omitempty"`
	UsershareGuests bool     `json:"usershareAllowGuests"`
}

// FTPStatus is everything known about FTP servers on this machine.
type FTPStatus struct {
	Installed    bool      `json:"installed"` // vsftpd — the one TarOS will manage
	Binary       string    `json:"binary,omitempty"`
	Unit         string    `json:"unit,omitempty"`
	Active       bool      `json:"active"`
	Enabled      bool      `json:"enabled"`
	OtherServers []string  `json:"otherServers,omitempty"` // proftpd, pure-ftpd…: seen, not managed
	ConfigPath   string    `json:"configPath,omitempty"`
	Config       FTPConfig `json:"config"`
	// LoginUsers: real system accounts that could log in over FTP when local_enable=YES.
	LoginUsers []string    `json:"loginUsers,omitempty"`
	Listeners  []Listener  `json:"listeners"`
	Install    InstallHint `json:"install"`
	// Managed: TarOS's marker block is in vsftpd.conf.
	Managed bool `json:"managed"`
	// CanManage / ManageBlocked: "not_installed", "not_root", "no_tools", "no_config",
	// "no_pam", "other_server" (another FTP daemon owns port 21), "chroot_custom".
	CanManage     bool   `json:"canManage"`
	ManageBlocked string `json:"manageBlocked,omitempty"`
}

// FTPConfig: the vsftpd settings that decide who can do what, and how safely.
type FTPConfig struct {
	Anonymous    bool   `json:"anonymous"`
	AnonWrite    bool   `json:"anonWrite"`
	LocalLogin   bool   `json:"localLogin"`
	Write        bool   `json:"write"`
	TLS          bool   `json:"tls"`
	ForceTLS     bool   `json:"forceTls"`
	Chroot       bool   `json:"chroot"`
	UserListMode string `json:"userListMode,omitempty"` // "", "allow", "deny"
	PasvRange    string `json:"pasvRange,omitempty"`
	// AccountsOnly: an allow-list that is TarOS's own — device users cannot log in.
	AccountsOnly bool `json:"accountsOnly"`
}

type Firewall struct {
	Kind   string `json:"kind"` // ufw | firewalld | nftables | none | unknown
	Active bool   `json:"active"`
}

// Status is the whole picture.
type Status struct {
	Supported  bool      `json:"supported"`
	Reason     string    `json:"reason,omitempty"` // "not_linux"
	OS         Distro    `json:"os"`
	Root       bool      `json:"root"`
	Systemd    bool      `json:"systemd"`
	SMB        SMBStatus `json:"smb"`
	FTP        FTPStatus `json:"ftp"`
	Firewall   Firewall  `json:"firewall"`
	Managers   []string  `json:"otherManagers,omitempty"`
	SELinux    string    `json:"selinux,omitempty"`
	Interfaces []Iface   `json:"interfaces"`
	// OrdinaryUsers: accounts (uid >= 1000) a share may run as. Ordinary, not
	// necessarily login-capable: a service account is a fine identity for files.
	OrdinaryUsers []string  `json:"ordinaryUsers"`
	Findings      []Finding `json:"findings"`
}

// Detector gathers Status. Everything it does is read-only.
type Detector struct {
	Run        Runner
	Paths      Paths
	IsRoot     func() bool
	LookPath   func(string) (string, error)
	Exists     func(string) bool
	Interfaces func() []Iface
	GOOS       string
}

func NewDetector() *Detector {
	return &Detector{
		Run: NewRunner(), Paths: DefaultPaths(),
		IsRoot:   func() bool { return os.Geteuid() == 0 },
		LookPath: exec.LookPath,
		Exists:   func(p string) bool { _, err := os.Stat(p); return err == nil },
		GOOS:     runtime.GOOS,
		Interfaces: func() []Iface {
			addrs, _ := netinfo.List(true)
			out := make([]Iface, 0, len(addrs))
			for _, a := range addrs {
				out = append(out, Iface{Name: a.Interface, Kind: string(a.Kind), IP: a.IP})
			}
			return out
		},
	}
}

func (d *Detector) find(names ...string) string {
	for _, n := range names {
		if p, err := d.LookPath(n); err == nil {
			return p
		}
		for _, dir := range []string{"/usr/sbin/", "/sbin/", "/usr/local/sbin/", "/usr/local/samba/sbin/"} {
			if d.Exists(dir + n) {
				return dir + n
			}
		}
	}
	return ""
}

func (d *Detector) unitState(ctx context.Context, unit string) (active, enabled bool) {
	if unit == "" {
		return false, false
	}
	if out, err := d.Run.Run(ctx, "systemctl", "is-active", unit); err == nil && strings.TrimSpace(out) == "active" {
		active = true
	}
	if out, _ := d.Run.Run(ctx, "systemctl", "is-enabled", unit); strings.HasPrefix(strings.TrimSpace(out), "enabled") {
		enabled = true
	}
	return active, enabled
}

// SMB detects just Samba (used before every change to see whether TarOS may act).
func (d *Detector) SMB(ctx context.Context) SMBStatus {
	st := Status{Root: d.IsRoot(), OS: DetectDistro(d.Paths.OSRelease), Systemd: d.Exists(d.Paths.SystemdRun)}
	return d.detectSMB(ctx, st, nil)
}

// FTP detects just vsftpd (used before every change to see whether TarOS may act).
func (d *Detector) FTP(ctx context.Context) FTPStatus {
	st := Status{Root: d.IsRoot(), OS: DetectDistro(d.Paths.OSRelease), Systemd: d.Exists(d.Paths.SystemdRun)}
	return d.detectFTP(ctx, st, d.listeners(ctx))
}

// Detect inspects the machine. It never changes anything.
func (d *Detector) Detect(ctx context.Context) Status {
	st := Status{Supported: d.GOOS == "linux", Root: d.IsRoot(), Interfaces: d.Interfaces()}
	if !st.Supported {
		st.Reason = "not_linux"
		st.Findings = []Finding{}
		return st
	}
	st.OS = DetectDistro(d.Paths.OSRelease)
	st.Systemd = d.Exists(d.Paths.SystemdRun)

	listeners := d.listeners(ctx)
	st.SMB = d.detectSMB(ctx, st, listeners)
	st.FTP = d.detectFTP(ctx, st, listeners)
	st.Firewall = d.detectFirewall(ctx, st.Root)
	st.Managers = d.otherManagers()
	if p := d.find("getenforce"); p != "" {
		if out, err := d.Run.Run(ctx, p); err == nil {
			st.SELinux = strings.ToLower(strings.TrimSpace(out))
		}
	}
	st.OrdinaryUsers = d.ordinaryUsers()
	st.Findings = ComputeFindings(st)
	// JSON: an empty list must be [], never null — the UI iterates these.
	if st.SMB.Listeners == nil {
		st.SMB.Listeners = []Listener{}
	}
	if st.FTP.Listeners == nil {
		st.FTP.Listeners = []Listener{}
	}
	if st.SMB.Shares == nil {
		st.SMB.Shares = []ShareInfo{}
	}
	if st.SMB.Users == nil {
		st.SMB.Users = []string{}
	}
	if st.Interfaces == nil {
		st.Interfaces = []Iface{}
	}
	if st.OrdinaryUsers == nil {
		st.OrdinaryUsers = []string{}
	}
	return st
}

func (d *Detector) ordinaryUsers() []string {
	users := []string{}
	data, err := os.ReadFile(d.Paths.Passwd)
	if err != nil {
		return users
	}
	for _, line := range strings.Split(string(data), "\n") {
		f := strings.Split(line, ":")
		if len(f) < 7 {
			continue
		}
		uid := 0
		for _, c := range f[2] {
			if c < '0' || c > '9' {
				uid = -1
				break
			}
			uid = uid*10 + int(c-'0')
		}
		if uid >= 1000 && uid < 65534 {
			users = append(users, f[0])
		}
	}
	sort.Strings(users)
	return users
}

func (d *Detector) listeners(ctx context.Context) []Listener {
	out, err := d.Run.Run(ctx, "ss", "-ltnpH")
	if err != nil {
		out, err = d.Run.Run(ctx, "ss", "-ltnH")
	}
	if err != nil {
		return nil
	}
	return ParseSS(out)
}

func portsOf(all []Listener, ports ...int) []Listener {
	var res []Listener
	for _, l := range all {
		for _, p := range ports {
			if l.Port == p {
				res = append(res, l)
			}
		}
	}
	return res
}

func (d *Detector) detectSMB(ctx context.Context, st Status, all []Listener) SMBStatus {
	s := SMBStatus{Shares: []ShareInfo{}, Users: []string{}, Listeners: portsOf(all, 445, 139)}
	s.Install = st.OS.hint(st.OS.SambaPackages(), st.Root)
	s.Unit, s.NmbUnit = st.OS.SambaUnits()
	s.Binary = d.find("smbd")
	s.Installed = s.Binary != ""
	if !s.Installed {
		s.Unit, s.NmbUnit = "", ""
		s.ManageBlocked = "not_installed"
		return s
	}
	if out, err := d.Run.Run(ctx, s.Binary, "--version"); err == nil {
		s.Version = strings.TrimSpace(strings.TrimPrefix(strings.TrimSpace(out), "Version"))
	}
	if st.Systemd {
		s.Active, s.Enabled = d.unitState(ctx, s.Unit)
		s.NmbActive, _ = d.unitState(ctx, s.NmbUnit)
	}

	conf, _ := os.ReadFile(d.Paths.SmbConf)
	s.Managed = strings.Contains(string(conf), markBegin)

	s.Standalone = true
	if tp := d.find("testparm"); tp != "" {
		out, err := d.Run.Run(ctx, tp, "-s")
		if out == "" && err != nil {
			s.ConfigError = err.Error()
		} else {
			cfg := ParseTestparm(out)
			role := strings.ToLower(cfg.Global["server role"])
			sec := strings.ToLower(cfg.Global["security"])
			if strings.Contains(role, "member") || strings.Contains(role, "domain controller") || sec == "ads" || sec == "domain" {
				s.Standalone = false
			}
			managed := d.managedShareNames()
			s.Shares = []ShareInfo{}
			for _, sh := range cfg.UserShares() {
				sh.Managed = managed[strings.ToLower(sh.Name)]
				s.Shares = append(s.Shares, sh)
			}
			g := cfg.Global
			s.Global = SMBGlobal{
				Workgroup: g["workgroup"], MapToGuest: g["map to guest"], MinProtocol: g["server min protocol"],
				Interfaces: strings.Fields(g["interfaces"]), BindOnly: isYes(g["bind interfaces only"]),
				HostsAllow: g["hosts allow"], UsershareGuests: isYes(g["usershare allow guests"]),
			}
		}
	}
	if st.Root {
		if pd := d.find("pdbedit"); pd != "" {
			if out, err := d.Run.Run(ctx, pd, "-L"); err == nil {
				s.UsersKnown = true
				for _, line := range strings.Split(out, "\n") {
					if name, _, ok := strings.Cut(strings.TrimSpace(line), ":"); ok && name != "" {
						s.Users = append(s.Users, name)
					}
				}
				sort.Strings(s.Users)
			}
		}
	}

	switch {
	case !st.Root:
		s.ManageBlocked = "not_root"
	case !s.Standalone:
		s.ManageBlocked = "not_standalone"
	// useradd (shadow-utils) or adduser (busybox/Alpine): NewUserBackend handles both.
	case d.find("smbpasswd") == "" || d.find("testparm") == "" || (d.find("useradd") == "" && d.find("adduser") == ""):
		s.ManageBlocked = "no_tools"
	}
	s.CanManage = s.ManageBlocked == ""
	return s
}

// managedShareNames lists the sections in TarOS's own file (lower-cased).
func (d *Detector) managedShareNames() map[string]bool {
	names := map[string]bool{}
	data, err := os.ReadFile(d.Paths.SambaDir + "/" + managedSharesFile)
	if err != nil {
		return names
	}
	for _, line := range strings.Split(string(data), "\n") {
		t := strings.TrimSpace(line)
		if strings.HasPrefix(t, "[") && strings.HasSuffix(t, "]") {
			names[strings.ToLower(t[1:len(t)-1])] = true
		}
	}
	return names
}

func (d *Detector) detectFTP(ctx context.Context, st Status, all []Listener) FTPStatus {
	f := FTPStatus{Listeners: portsOf(all, 21), LoginUsers: []string{}}
	f.Install = st.OS.hint(st.OS.VSFTPDPackages(), st.Root)
	f.Binary = d.find("vsftpd")
	f.Installed = f.Binary != ""
	for _, other := range []string{"proftpd", "pure-ftpd", "pure-ftpd-wrapper", "bftpd", "ftpd"} {
		if d.find(other) != "" && !contains(f.OtherServers, strings.TrimSuffix(other, "-wrapper")) {
			f.OtherServers = append(f.OtherServers, strings.TrimSuffix(other, "-wrapper"))
		}
	}
	if !f.Installed {
		return f
	}
	f.Unit = "vsftpd"
	if st.Systemd {
		f.Active, f.Enabled = d.unitState(ctx, f.Unit)
	}
	for _, p := range d.Paths.VsftpdConfs {
		if data, err := os.ReadFile(p); err == nil {
			f.ConfigPath = p
			f.Config = ftpConfigFrom(ParseVsftpd(string(data)))
			break
		}
	}
	f.LoginUsers = d.loginUsers()
	if f.ConfigPath != "" {
		data, _ := os.ReadFile(f.ConfigPath)
		f.Managed = hasFTPBlock(string(data))
		f.Config.AccountsOnly = f.Managed && isAccountsOnly(ParseVsftpd(string(data)), d.Paths.VsftpdDir)
		if f.Config.AccountsOnly || !f.Config.LocalLogin {
			f.LoginUsers = []string{} // nobody outside TarOS's accounts can get in
		}
		f.ManageBlocked = d.ftpBlocked(st, f, ParseVsftpd(string(data)))
	} else {
		f.ManageBlocked = "no_config"
	}
	f.CanManage = f.ManageBlocked == ""
	return f
}

// ftpBlocked says why TarOS must not touch this vsftpd ("" = it may).
func (d *Detector) ftpBlocked(st Status, f FTPStatus, eff map[string]string) string {
	switch {
	case !st.Root:
		return "not_root"
	case d.find("chpasswd") == "" || d.find("passwd") == "" || (d.find("useradd") == "" && d.find("adduser") == ""):
		return "no_tools"
	case !d.Exists(filepath.Join(d.Paths.PamDir, "vsftpd")):
		return "no_pam"
	}
	// Someone else's daemon already answers on port 21.
	for _, l := range f.Listeners {
		if l.Process != "" && !strings.Contains(l.Process, "vsftpd") {
			return "other_server"
		}
	}
	// chroot_local_user=NO with a chroot list of the admin's own: TarOS accounts would
	// need to be in *their* file to be jailed, and TarOS does not edit files it doesn't own.
	if !isYes(eff["chroot_local_user"]) && isYes(eff["chroot_list_enable"]) && !f.Managed {
		return "chroot_custom"
	}
	return ""
}

func ftpConfigFrom(m map[string]string) FTPConfig {
	c := FTPConfig{
		Anonymous: isYes(m["anonymous_enable"]), LocalLogin: isYes(m["local_enable"]), Write: isYes(m["write_enable"]),
		TLS: isYes(m["ssl_enable"]), ForceTLS: isYes(m["ssl_enable"]) && (isYes(m["force_local_logins_ssl"]) || isYes(m["force_local_data_ssl"])),
		Chroot: isYes(m["chroot_local_user"]),
	}
	c.AnonWrite = c.Anonymous && (isYes(m["anon_upload_enable"]) || isYes(m["anon_mkdir_write_enable"]) || isYes(m["anon_other_write_enable"]))
	if isYes(m["userlist_enable"]) {
		c.UserListMode = "deny"
		if v, ok := m["userlist_deny"]; ok && !isYes(v) {
			c.UserListMode = "allow"
		}
	}
	if lo, hi := m["pasv_min_port"], m["pasv_max_port"]; lo != "" && hi != "" {
		c.PasvRange = lo + "-" + hi
	}
	return c
}

// loginUsers: ordinary accounts (uid >= 1000) that have a login shell — the
// ones a `local_enable=YES` FTP server would let in with their Linux password.
func (d *Detector) loginUsers() []string {
	data, err := os.ReadFile(d.Paths.Passwd)
	if err != nil {
		return []string{}
	}
	users := []string{}
	for _, line := range strings.Split(string(data), "\n") {
		f := strings.Split(line, ":")
		if len(f) < 7 {
			continue
		}
		uid := 0
		for _, c := range f[2] {
			if c < '0' || c > '9' {
				uid = -1
				break
			}
			uid = uid*10 + int(c-'0')
		}
		shell := f[6]
		if uid >= 1000 && uid < 65534 && !strings.HasSuffix(shell, "nologin") && !strings.HasSuffix(shell, "/false") && shell != "" {
			users = append(users, f[0])
		}
	}
	return users
}

func (d *Detector) detectFirewall(ctx context.Context, root bool) Firewall {
	if !root {
		return Firewall{Kind: "unknown"}
	}
	if p := d.find("ufw"); p != "" {
		if out, err := d.Run.Run(ctx, p, "status"); err == nil && strings.Contains(out, "Status: active") {
			return Firewall{Kind: "ufw", Active: true}
		}
	}
	if p := d.find("firewall-cmd"); p != "" {
		if out, err := d.Run.Run(ctx, p, "--state"); err == nil && strings.TrimSpace(out) == "running" {
			return Firewall{Kind: "firewalld", Active: true}
		}
	}
	if p := d.find("nft"); p != "" {
		if out, err := d.Run.Run(ctx, p, "list", "ruleset"); err == nil {
			// Only an input chain that drops by default actually shields these ports;
			// Docker and friends add plenty of other rules on hosts with no firewall at all.
			if inputDrops(out) {
				return Firewall{Kind: "nftables", Active: true}
			}
			return Firewall{Kind: "none"}
		}
	}
	return Firewall{Kind: "none"}
}

// inputDrops reports whether the nft ruleset has a base chain hooked to input
// whose policy is drop.
func inputDrops(ruleset string) bool {
	for _, line := range strings.Split(ruleset, "\n") {
		if strings.Contains(line, "hook input") && strings.Contains(line, "policy drop") {
			return true
		}
	}
	return false
}

func (d *Detector) otherManagers() []string {
	var m []string
	if d.Exists("/etc/openmediavault") {
		m = append(m, "OpenMediaVault")
	}
	if d.Exists("/etc/webmin") {
		m = append(m, "Webmin")
	}
	if d.Exists("/usr/share/cockpit/file-sharing") || d.Exists("/usr/share/cockpit/45drives-file-sharing") {
		m = append(m, "Cockpit File Sharing")
	}
	if d.Exists("/lib/systemd/system/casaos.service") || d.Exists("/etc/systemd/system/casaos.service") || d.Exists("/usr/lib/systemd/system/casaos.service") {
		m = append(m, "CasaOS")
	}
	return m
}

func contains(l []string, s string) bool {
	for _, x := range l {
		if x == s {
			return true
		}
	}
	return false
}
