package sharing

import (
	"context"
	"errors"
	"fmt"
	"net"
	"os"
	"os/user"
	"path/filepath"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"
)

var (
	ErrAccountInUse  = errors.New("sharing: the account is still used by a share")
	ErrServiceAction = errors.New("sharing: unknown service action")
	ErrNoSystemd     = errors.New("sharing: this machine has no systemd to control the service")
	ErrNoUserBackend = errors.New("sharing: no way to create system users here (need useradd or adduser)")
)

// ApplyError: Samba's own words about why a configuration was refused.
type ApplyError struct{ Output string }

func (e *ApplyError) Error() string { return "sharing: Samba rejected the configuration: " + e.Output }

// Manager changes Samba's configuration and the accounts behind it. It is safe
// for concurrent callers (one change at a time) and is built so that a change
// which Samba would reject never reaches the live files.
type Manager struct {
	mu    sync.Mutex
	Run   Runner
	Det   *Detector
	Store *Store
	Users UserBackend

	Policy PathPolicy
	// hooks, replaceable in tests
	Owner      func(path string) (Owner, error)
	LookupUser func(name string) (uid int, group string, err error)
	IfaceNames func() []string
	Now        func() time.Time
}

// NewManager wires the real system in.
func NewManager(det *Detector, store *Store, policy PathPolicy) *Manager {
	return &Manager{
		Run: det.Run, Det: det, Store: store, Policy: policy,
		Users: NewUserBackend(det.Run, det.LookPath),
		Owner: OwnerOf, Now: time.Now,
		LookupUser: func(name string) (int, string, error) {
			u, err := user.Lookup(name)
			if err != nil {
				return 0, "", err
			}
			uid, _ := strconv.Atoi(u.Uid)
			g := ""
			if gr, err := user.LookupGroupId(u.Gid); err == nil {
				g = gr.Name
			}
			return uid, g, nil
		},
		IfaceNames: func() []string {
			ifs, _ := net.Interfaces()
			var n []string
			for _, i := range ifs {
				n = append(n, i.Name)
			}
			return n
		},
	}
}

func (m *Manager) confPath() string { return m.Det.Paths.SmbConf }
func (m *Manager) dir() string      { return m.Det.Paths.SambaDir }

func (m *Manager) readConf() string {
	b, err := os.ReadFile(m.confPath())
	if err != nil {
		return ""
	}
	return string(b)
}

func writeAtomic(path string, data []byte, perm os.FileMode) error {
	tmp := path + ".taros-tmp"
	if err := os.WriteFile(tmp, data, perm); err != nil {
		return err
	}
	if err := os.Chmod(tmp, perm); err != nil {
		os.Remove(tmp)
		return err
	}
	return os.Rename(tmp, path)
}

// ---- guards -------------------------------------------------------------------------

// guard returns the current Samba status when TarOS may manage it.
func (m *Manager) guard(ctx context.Context, needManaged bool) (SMBStatus, error) {
	st := m.Det.SMB(ctx)
	if !st.Installed {
		return st, ErrCannotManage
	}
	if !st.CanManage {
		return st, fmt.Errorf("%w (%s)", ErrCannotManage, st.ManageBlocked)
	}
	if needManaged && !HasIncludes(m.readConf(), m.dir()) {
		return st, ErrNotManaged
	}
	return st, nil
}

// ---- applying a model ------------------------------------------------------------------

func (m *Manager) ownerFor(s Share) (string, string, error) {
	if s.RunAs != "" {
		uid, group, err := m.LookupUser(s.RunAs)
		if err != nil || uid == 0 {
			return "", "", ErrRunAs
		}
		return s.RunAs, group, nil
	}
	o, err := m.Owner(s.Path)
	if err != nil {
		return "", "", err
	}
	if o.UID == 0 {
		return "", "", ErrOwnedByRoot
	}
	return o.User, o.Group, nil
}

// apply renders the model, has Samba validate it against *copies*, checks that
// the effective configuration says what we meant, and only then swaps the live
// files. On any failure the live files are exactly as they were.
func (m *Manager) apply(ctx context.Context, mdl Model, st SMBStatus) error {
	dir := m.dir()
	globalTxt := RenderGlobal(mdl)
	sharesTxt, err := RenderShares(mdl, m.ownerFor)
	if err != nil {
		return err
	}
	oldConf := m.readConf()
	base := oldConf
	if strings.TrimSpace(base) == "" {
		base = "[global]\n   server role = standalone server\n   workgroup = WORKGROUP\n"
	}
	newConf, confChanged := EnsureIncludes(base, dir)
	if strings.TrimSpace(oldConf) == "" {
		confChanged = true
	}

	gCand, sCand := filepath.Join(dir, managedGlobalFile+".candidate"), filepath.Join(dir, managedSharesFile+".candidate")
	check := filepath.Join(dir, ".smb.conf.taros-check")
	defer func() { os.Remove(gCand); os.Remove(sCand); os.Remove(check) }()
	for path, data := range map[string]string{gCand: globalTxt, sCand: sharesTxt, check: PointIncludesAt(newConf, dir, gCand, sCand)} {
		if err := os.WriteFile(path, []byte(data), 0o644); err != nil {
			return fmt.Errorf("sharing: write candidate: %w", err)
		}
	}
	out, err := m.Run.Run(ctx, m.tool("testparm"), "-s", check)
	if err != nil {
		return &ApplyError{Output: err.Error()}
	}
	if problem := verifyEffective(ParseTestparm(out), mdl); problem != "" {
		return &ApplyError{Output: problem}
	}

	// ---- commit
	livG, livS := filepath.Join(dir, managedGlobalFile), filepath.Join(dir, managedSharesFile)
	oldG, _ := os.ReadFile(livG)
	oldS, _ := os.ReadFile(livS)
	hadG, hadS := fileExists(livG), fileExists(livS)
	restore := func() {
		restoreFile(livG, oldG, hadG)
		restoreFile(livS, oldS, hadS)
		if confChanged {
			restoreFile(m.confPath(), []byte(oldConf), oldConf != "")
		}
	}
	if err := writeAtomic(livG, []byte(globalTxt), 0o644); err != nil {
		restore()
		return fmt.Errorf("sharing: %w", err)
	}
	if err := writeAtomic(livS, []byte(sharesTxt), 0o644); err != nil {
		restore()
		return fmt.Errorf("sharing: %w", err)
	}
	if confChanged {
		if err := m.backupConf(oldConf); err != nil {
			restore()
			return err
		}
		perm := os.FileMode(0o644)
		if fi, err := os.Stat(m.confPath()); err == nil {
			perm = fi.Mode().Perm()
		}
		if err := writeAtomic(m.confPath(), []byte(newConf), perm); err != nil {
			restore()
			return fmt.Errorf("sharing: %w", err)
		}
	}
	// One last look at what will actually be loaded.
	if _, err := m.Run.Run(ctx, m.tool("testparm"), "-s"); err != nil {
		restore()
		return &ApplyError{Output: err.Error()}
	}
	m.reload(ctx, st)
	return nil
}

func (m *Manager) tool(name string) string {
	if p, err := m.Det.LookPath(name); err == nil {
		return p
	}
	return name
}

func fileExists(p string) bool { _, err := os.Stat(p); return err == nil }

func restoreFile(path string, data []byte, existed bool) {
	if existed {
		_ = writeAtomic(path, data, 0o644)
	} else {
		_ = os.Remove(path)
	}
}

// backupConf keeps the pristine smb.conf from before TarOS first touched it
// (never overwritten), and the previous version before each later rewrite.
func (m *Manager) backupConf(old string) error {
	if old == "" {
		return nil
	}
	orig := m.confPath() + ".taros-original"
	if !fileExists(orig) {
		if err := os.WriteFile(orig, []byte(old), 0o644); err != nil {
			return fmt.Errorf("sharing: backup smb.conf: %w", err)
		}
	}
	return os.WriteFile(m.confPath()+".taros-bak", []byte(old), 0o644)
}

// reload tells a running smbd to re-read its configuration without dropping sessions.
func (m *Manager) reload(ctx context.Context, st SMBStatus) {
	if !st.Active {
		return
	}
	if _, err := m.Run.Run(ctx, m.tool("smbcontrol"), "smbd", "reload-config"); err != nil {
		_, _ = m.Run.Run(ctx, "systemctl", "reload", st.Unit)
	}
}

// verifyEffective compares what Samba resolved against what we meant. testparm
// exits 0 on "Unknown parameter" warnings, so a typo would otherwise load as a
// share that is silently more open than intended.
func verifyEffective(cfg SambaConfig, mdl Model) string {
	by := map[string]ShareInfo{}
	for _, s := range cfg.Shares {
		by[strings.ToLower(s.Name)] = s
	}
	for _, want := range mdl.Shares {
		got, ok := by[strings.ToLower(want.Name)]
		if !ok {
			return fmt.Sprintf("share %q is missing from the effective configuration", want.Name)
		}
		if got.Path != want.Path {
			return fmt.Sprintf("share %q: path resolved to %q, expected %q", want.Name, got.Path, want.Path)
		}
		if got.GuestOK {
			return fmt.Sprintf("share %q would allow guests", want.Name)
		}
		var users, writers []string
		for _, a := range normalizeAccess(want.Access) {
			users = append(users, a.User)
			if a.Mode == "rw" {
				writers = append(writers, a.User)
			}
		}
		gu := append([]string(nil), got.ValidUsers...)
		sort.Strings(gu)
		if strings.Join(gu, " ") != strings.Join(users, " ") {
			return fmt.Sprintf("share %q: valid users resolved to %q, expected %q", want.Name, strings.Join(gu, " "), strings.Join(users, " "))
		}
		gw := splitUsers(got.Params["write list"])
		sort.Strings(gw)
		if strings.Join(gw, " ") != strings.Join(writers, " ") {
			return fmt.Sprintf("share %q: write list resolved to %q, expected %q", want.Name, strings.Join(gw, " "), strings.Join(writers, " "))
		}
	}
	if len(mdl.Interfaces) > 0 && !isYes(cfg.Global["bind interfaces only"]) {
		return "interface binding did not take effect"
	}
	return ""
}

func (m *Manager) knownInterfaces(names []string) ([]string, error) {
	have := map[string]bool{}
	for _, n := range m.IfaceNames() {
		have[n] = true
	}
	seen := map[string]bool{}
	var out []string
	for _, n := range names {
		if !reIface.MatchString(n) || !have[n] {
			return nil, fmt.Errorf("%w: %q", ErrInterface, n)
		}
		if n != "lo" && !seen[n] {
			seen[n] = true
			out = append(out, n)
		}
	}
	sort.Strings(out)
	return out, nil
}

// ---- adopt / unadopt ---------------------------------------------------------------------

// Adopt starts managing Samba: it adds TarOS's include blocks to smb.conf
// (everything already there keeps working untouched), writes TarOS's files, and
// binds SMB to the chosen interfaces. It does not start the service.
func (m *Manager) Adopt(ctx context.Context, interfaces []string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.guard(ctx, false)
	if err != nil {
		return err
	}
	ifs, err := m.knownInterfaces(interfaces)
	if err != nil {
		return err
	}
	mdl := m.Store.Get()
	mdl.Interfaces = ifs
	if err := m.apply(ctx, mdl, st); err != nil {
		return err
	}
	return m.Store.Set(mdl)
}

// Unadopt removes TarOS's part of the configuration. When smb.conf still equals
// what TarOS wrote on top of the original, the original is restored byte for
// byte; otherwise only TarOS's marker blocks are cut out. Shared folders' data
// is never touched. removeAccounts also deletes the accounts TarOS created.
func (m *Manager) Unadopt(ctx context.Context, removeAccounts bool) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.guard(ctx, false)
	if err != nil {
		return err
	}
	conf := m.readConf()
	if HasIncludes(conf, m.dir()) {
		restored := RemoveIncludes(conf)
		if orig, err := os.ReadFile(m.confPath() + ".taros-original"); err == nil {
			if again, _ := EnsureIncludes(string(orig), m.dir()); again == conf {
				restored = string(orig)
			}
		}
		check := filepath.Join(m.dir(), ".smb.conf.taros-check")
		defer os.Remove(check)
		if err := os.WriteFile(check, []byte(restored), 0o644); err != nil {
			return err
		}
		if _, err := m.Run.Run(ctx, m.tool("testparm"), "-s", check); err != nil {
			return &ApplyError{Output: err.Error()}
		}
		if err := m.backupConf(conf); err != nil {
			return err
		}
		perm := os.FileMode(0o644)
		if fi, err := os.Stat(m.confPath()); err == nil {
			perm = fi.Mode().Perm()
		}
		if err := writeAtomic(m.confPath(), []byte(restored), perm); err != nil {
			return err
		}
	}
	os.Remove(filepath.Join(m.dir(), managedGlobalFile))
	os.Remove(filepath.Join(m.dir(), managedSharesFile))
	os.Remove(m.confPath() + ".taros-original")
	m.reload(ctx, st)

	mdl := m.Store.Get()
	if removeAccounts {
		for _, a := range mdl.Accounts {
			_ = m.removeAccountBackend(ctx, a.Name)
		}
		mdl.Accounts = nil
	}
	mdl.Shares, mdl.Interfaces = nil, nil
	return m.Store.Set(mdl)
}

// ---- accounts -------------------------------------------------------------------------------

func (m *Manager) removeAccountBackend(ctx context.Context, name string) error {
	// Only ever delete a system user TarOS created: its primary group is taros-share.
	if out, err := m.Run.Run(ctx, "id", "-gn", name); err != nil || strings.TrimSpace(out) != shareGroup {
		return nil
	}
	_, _ = m.Run.Run(ctx, m.tool("smbpasswd"), "-x", name)
	if m.Users == nil {
		return ErrNoUserBackend
	}
	return m.Users.Delete(ctx, name)
}

// AddAccount creates a share account: a no-login system user plus a Samba password.
func (m *Manager) AddAccount(ctx context.Context, name, password string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if err := ValidAccountName(name); err != nil {
		return err
	}
	if err := checkPassword(password); err != nil {
		return err
	}
	if _, err := m.guard(ctx, true); err != nil {
		return err
	}
	if m.Users == nil {
		return ErrNoUserBackend
	}
	mdl := m.Store.Get()
	if _, dup := mdl.account(name); dup || m.Users.Exists(ctx, name) {
		return ErrAccountExists
	}
	if err := m.Users.EnsureGroup(ctx); err != nil {
		return fmt.Errorf("sharing: create group: %w", err)
	}
	if err := m.Users.Create(ctx, name); err != nil {
		return fmt.Errorf("sharing: create user: %w", err)
	}
	if err := smbSetPassword(ctx, m.Run, true, name, password); err != nil {
		_ = m.Users.Delete(ctx, name) // don't leave a half-made account behind
		return err
	}
	mdl.Accounts = append(mdl.Accounts, Account{Name: name, SMB: true, CreatedAt: m.Now().UTC().Truncate(time.Second)})
	sort.Slice(mdl.Accounts, func(i, j int) bool { return mdl.Accounts[i].Name < mdl.Accounts[j].Name })
	if err := m.Store.Set(mdl); err != nil {
		_ = m.removeAccountBackend(ctx, name)
		return err
	}
	return nil
}

// SetPassword changes an account's Samba password.
func (m *Manager) SetPassword(ctx context.Context, name, password string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if err := checkPassword(password); err != nil {
		return err
	}
	if _, err := m.guard(ctx, true); err != nil {
		return err
	}
	if _, ok := m.Store.Get().account(name); !ok {
		return ErrAccountMissing
	}
	return smbSetPassword(ctx, m.Run, false, name, password)
}

// SetDisabled disables or re-enables an account's SMB login (its shares stay defined).
func (m *Manager) SetDisabled(ctx context.Context, name string, disabled bool) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, err := m.guard(ctx, true); err != nil {
		return err
	}
	mdl := m.Store.Get()
	found := false
	for i := range mdl.Accounts {
		if mdl.Accounts[i].Name == name {
			mdl.Accounts[i].Disabled = disabled
			found = true
		}
	}
	if !found {
		return ErrAccountMissing
	}
	flag := "-e"
	if disabled {
		flag = "-d"
	}
	if _, err := m.Run.Run(ctx, m.tool("smbpasswd"), flag, name); err != nil {
		return fmt.Errorf("smbpasswd: %w", err)
	}
	return m.Store.Set(mdl)
}

// DeleteAccount removes an account and its system user. Refused while a share still uses it.
func (m *Manager) DeleteAccount(ctx context.Context, name string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	if _, err := m.guard(ctx, true); err != nil {
		return err
	}
	mdl := m.Store.Get()
	if _, ok := mdl.account(name); !ok {
		return ErrAccountMissing
	}
	for _, s := range mdl.Shares {
		for _, a := range s.Access {
			if a.User == name {
				return fmt.Errorf("%w: %s", ErrAccountInUse, s.Name)
			}
		}
	}
	if err := m.removeAccountBackend(ctx, name); err != nil {
		return err
	}
	var keep []Account
	for _, a := range mdl.Accounts {
		if a.Name != name {
			keep = append(keep, a)
		}
	}
	mdl.Accounts = keep
	return m.Store.Set(mdl)
}

// ---- shares ------------------------------------------------------------------------------------

// SaveShare creates a share (replace == "") or updates/renames the one called replace.
func (m *Manager) SaveShare(ctx context.Context, s Share, replace string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.guard(ctx, true)
	if err != nil {
		return err
	}
	if err := ValidShareName(s.Name); err != nil {
		return err
	}
	if err := validComment(s.Comment); err != nil {
		return err
	}
	real, err := m.Policy.Resolve(s.Path)
	if err != nil {
		return err
	}
	s.Path = real
	mdl := m.Store.Get()

	if len(s.Access) == 0 {
		return ErrShareNoAccess
	}
	s.Access = normalizeAccess(s.Access)
	for _, a := range s.Access {
		if a.Mode != "ro" && a.Mode != "rw" {
			return ErrShareMode
		}
		if acc, ok := mdl.account(a.User); !ok || acc.Disabled {
			return ErrShareUser
		}
	}
	if s.RunAs != "" {
		if uid, _, err := m.LookupUser(s.RunAs); err != nil || uid == 0 {
			return ErrRunAs
		}
	}

	idx, exists := mdl.share(replace)
	if replace == "" {
		if _, dup := mdl.share(s.Name); dup {
			return ErrShareExists
		}
	} else if !exists {
		return ErrShareMissing
	} else if !strings.EqualFold(replace, s.Name) {
		if _, dup := mdl.share(s.Name); dup {
			return ErrShareExists
		}
	}
	// A name already used by someone else's share would silently shadow (or be shadowed by) it.
	for _, f := range st.Shares {
		if !f.Managed && strings.EqualFold(f.Name, s.Name) {
			return ErrNameForeign
		}
	}

	if replace == "" {
		mdl.Shares = append(mdl.Shares, s)
	} else {
		mdl.Shares[idx] = s
	}
	if err := m.apply(ctx, mdl, st); err != nil {
		return err
	}
	return m.Store.Set(mdl)
}

// DeleteShare stops sharing a folder. The folder and its files are left alone.
func (m *Manager) DeleteShare(ctx context.Context, name string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.guard(ctx, true)
	if err != nil {
		return err
	}
	mdl := m.Store.Get()
	idx, ok := mdl.share(name)
	if !ok {
		return ErrShareMissing
	}
	mdl.Shares = append(mdl.Shares[:idx], mdl.Shares[idx+1:]...)
	if err := m.apply(ctx, mdl, st); err != nil {
		return err
	}
	return m.Store.Set(mdl)
}

// SetInterfaces changes which interfaces SMB listens on.
func (m *Manager) SetInterfaces(ctx context.Context, interfaces []string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.guard(ctx, true)
	if err != nil {
		return err
	}
	ifs, err := m.knownInterfaces(interfaces)
	if err != nil {
		return err
	}
	mdl := m.Store.Get()
	mdl.Interfaces = ifs
	if err := m.apply(ctx, mdl, st); err != nil {
		return err
	}
	return m.Store.Set(mdl)
}

// ---- the service ----------------------------------------------------------------------------------

// Service starts/stops/restarts/enables/disables Samba (smbd, and nmbd where the distro has it).
func (m *Manager) Service(ctx context.Context, action string) error {
	switch action {
	case "start", "stop", "restart", "enable", "disable":
	default:
		return ErrServiceAction
	}
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.guard(ctx, false)
	if err != nil {
		return err
	}
	if !m.Det.Exists(m.Det.Paths.SystemdRun) {
		return ErrNoSystemd
	}
	if _, err := m.Run.Run(ctx, "systemctl", action, st.Unit); err != nil {
		return fmt.Errorf("systemctl %s %s: %w", action, st.Unit, err)
	}
	if st.NmbUnit != "" { // best effort: NetBIOS name service is optional
		_, _ = m.Run.Run(ctx, "systemctl", action, st.NmbUnit)
	}
	return nil
}
