package sharing

import (
	"context"
	"fmt"
	"net"
	"os"
	"path/filepath"
	"sort"
	"strings"
	"time"
)

// FTPApplyError: vsftpd refused the configuration TarOS wanted to apply.
type FTPApplyError struct{ Output string }

func (e *FTPApplyError) Error() string {
	return "sharing: vsftpd rejected the configuration: " + e.Output
}

func (m *Manager) ftpDir() string { return m.Det.Paths.VsftpdDir }

// ftpGuard returns the current vsftpd status when TarOS may manage it.
func (m *Manager) ftpGuard(ctx context.Context, needManaged bool) (FTPStatus, error) {
	st := m.Det.FTP(ctx)
	if !st.Installed {
		return st, ErrCannotManage
	}
	if !st.CanManage {
		return st, fmt.Errorf("%w (%s)", ErrCannotManage, st.ManageBlocked)
	}
	if needManaged && !st.Managed {
		return st, ErrFTPNotManaged
	}
	return st, nil
}

// ---- file snapshots (so a failed change leaves every file as it was) ----------------

type fileState struct {
	data    []byte
	existed bool
	perm    os.FileMode
}

type snapshot map[string]fileState

func takeSnapshot(paths []string) snapshot {
	s := snapshot{}
	for _, p := range paths {
		if _, seen := s[p]; seen {
			continue
		}
		fi, err := os.Stat(p)
		if err != nil {
			s[p] = fileState{}
			continue
		}
		data, _ := os.ReadFile(p)
		s[p] = fileState{data: data, existed: true, perm: fi.Mode().Perm()}
	}
	return s
}

func (s snapshot) restore() {
	for p, st := range s {
		if st.existed {
			_ = writeAtomic(p, st.data, st.perm)
		} else {
			_ = os.Remove(p)
		}
	}
}

// ---- applying the model ------------------------------------------------------------

type ftpFile struct {
	path string
	data string
	perm os.FileMode
}

// ftpPlan is everything an apply will write.
type ftpPlan struct {
	conf     string // the new vsftpd.conf
	files    []ftpFile
	cert     string // path of the certificate, when TLS is on
	certNeed bool
}

func (m *Manager) planFTP(mdl Model, st FTPStatus, oldConf string) (ftpPlan, error) {
	dir := m.ftpDir()
	base := stripFTPBlock(oldConf)
	block, err := RenderFTPBlock(dir, mdl.FTP, base)
	if err != nil {
		return ftpPlan{}, err
	}
	p := ftpPlan{conf: appendFTPBlock(base, block)}

	var names []string
	for _, a := range mdl.Accounts {
		if a.FTP == nil || a.Disabled {
			continue
		}
		u, _, err := m.ownerFor(Share{Path: a.FTP.Path, RunAs: a.FTP.RunAs})
		if err != nil {
			return ftpPlan{}, fmt.Errorf("account %q: %w", a.Name, err)
		}
		names = append(names, a.Name)
		p.files = append(p.files, ftpFile{filepath.Join(dir, ftpUsersDir, a.Name), RenderFTPUser(*a.FTP, u), 0o644})
	}
	sort.Strings(names)
	if strings.Contains(block, "chroot_list_file=") {
		p.files = append(p.files, ftpFile{filepath.Join(dir, ftpChrootFn), RenderNameList(names), 0o644})
	}
	if strings.Contains(block, "userlist_file=") {
		p.files = append(p.files, ftpFile{filepath.Join(dir, ftpAllowedFn), RenderNameList(names), 0o644})
	}
	stock, err := os.ReadFile(filepath.Join(m.Det.Paths.PamDir, "vsftpd"))
	if err != nil {
		return ftpPlan{}, fmt.Errorf("sharing: read the vsftpd PAM service: %w", err)
	}
	p.files = append(p.files, ftpFile{filepath.Join(m.Det.Paths.PamDir, ftpPAMName), PAMFor(string(stock)), 0o644})
	if mdl.FTP.TLS != "" {
		p.cert = filepath.Join(dir, ftpCertFn)
		p.certNeed = !fileExists(p.cert)
	}
	return p, nil
}

// applyFTP renders the model, has vsftpd start on a *copy* of the configuration,
// and only then swaps the live files; the service is restarted if it is running
// and put back the way it was if it does not come up.
func (m *Manager) applyFTP(ctx context.Context, mdl Model, st FTPStatus) error {
	dir := m.ftpDir()
	oldBytes, _ := os.ReadFile(st.ConfigPath)
	oldConf := string(oldBytes)
	plan, err := m.planFTP(mdl, st, oldConf)
	if err != nil {
		return err
	}
	if err := os.MkdirAll(filepath.Join(dir, ftpUsersDir), 0o755); err != nil {
		return fmt.Errorf("sharing: %w", err)
	}

	// Everything an apply may touch, so that failure can undo it.
	touched := []string{st.ConfigPath, st.ConfigPath + ".taros-bak", st.ConfigPath + ".taros-original"}
	for _, f := range plan.files {
		touched = append(touched, f.path)
	}
	wanted := map[string]bool{}
	for _, f := range plan.files {
		wanted[f.path] = true
	}
	stale, _ := filepath.Glob(filepath.Join(dir, ftpUsersDir, "*"))
	for _, p := range append(stale, filepath.Join(dir, ftpChrootFn), filepath.Join(dir, ftpAllowedFn)) {
		touched = append(touched, p)
	}
	snap := takeSnapshot(touched)

	// The one file vsftpd needs at *start-up* is the certificate.
	if plan.certNeed {
		pemData, err := GenerateFTPCert(hostnameOr("taros"), m.Now())
		if err != nil {
			return fmt.Errorf("sharing: generate certificate: %w", err)
		}
		if err := writeAtomic(plan.cert, pemData, 0o600); err != nil {
			return fmt.Errorf("sharing: %w", err)
		}
	}
	undoCert := func() {
		if plan.certNeed {
			_ = os.Remove(plan.cert)
		}
	}

	check := filepath.Join(dir, ".vsftpd.conf.taros-check")
	defer os.Remove(check)
	if err := os.WriteFile(check, []byte(plan.conf), 0o644); err != nil {
		undoCert()
		return fmt.Errorf("sharing: write candidate: %w", err)
	}
	if err := m.probeFTP(ctx, st, check); err != nil {
		undoCert()
		return err
	}

	// ---- commit
	restore := func() { snap.restore(); undoCert() }
	for _, f := range plan.files {
		if err := writeAtomic(f.path, []byte(f.data), f.perm); err != nil {
			restore()
			return fmt.Errorf("sharing: %w", err)
		}
	}
	for _, p := range stale {
		if !wanted[p] {
			_ = os.Remove(p)
		}
	}
	for _, p := range []string{filepath.Join(dir, ftpChrootFn), filepath.Join(dir, ftpAllowedFn)} {
		if !wanted[p] {
			_ = os.Remove(p)
		}
	}
	if plan.conf != oldConf {
		if err := m.backupFTPConf(st.ConfigPath, oldConf); err != nil {
			restore()
			return err
		}
		perm := os.FileMode(0o644)
		if fi, err := os.Stat(st.ConfigPath); err == nil {
			perm = fi.Mode().Perm()
		}
		if err := writeAtomic(st.ConfigPath, []byte(plan.conf), perm); err != nil {
			restore()
			return fmt.Errorf("sharing: %w", err)
		}
	}
	if err := m.restartFTP(ctx, st); err != nil {
		restore()
		_ = m.restartFTP(ctx, st) // back on the previous configuration
		return &FTPApplyError{Output: err.Error()}
	}
	return nil
}

// probeFTP starts vsftpd on the candidate configuration for a moment, on a port
// of its own on loopback. vsftpd has no "check config" mode and refuses to start
// on any unknown or invalid option, so a daemon that is still alive after the
// grace period accepted the file; one that exits did not.
func (m *Manager) probeFTP(ctx context.Context, st FTPStatus, conf string) error {
	if m.ProbeFTP != nil {
		return m.ProbeFTP(ctx, conf)
	}
	l, err := net.Listen("tcp", "127.0.0.1:0")
	if err != nil {
		return fmt.Errorf("sharing: probe port: %w", err)
	}
	port := l.Addr().(*net.TCPAddr).Port
	_ = l.Close()
	pctx, cancel := context.WithTimeout(ctx, 2*time.Second)
	defer cancel()
	out, err := m.Run.Run(pctx, st.Binary, "-olisten=YES", "-olisten_ipv6=NO", "-olisten_address=127.0.0.1",
		fmt.Sprintf("-olisten_port=%d", port), "-obackground=NO", conf)
	if pctx.Err() != nil && ctx.Err() == nil {
		return nil // still running when the time was up: the configuration loaded
	}
	msg := strings.TrimSpace(out)
	if err != nil {
		if msg == "" {
			msg = err.Error()
		} else {
			msg += " (" + err.Error() + ")"
		}
	} else if msg == "" {
		msg = "vsftpd exited straight away"
	}
	return &FTPApplyError{Output: msg}
}

// restartFTP restarts vsftpd when it is running (there is no reload), and waits
// until systemd reports it active again. A stopped service is left stopped.
func (m *Manager) restartFTP(ctx context.Context, st FTPStatus) error {
	if !st.Active || st.Unit == "" || !m.Det.Exists(m.Det.Paths.SystemdRun) {
		return nil
	}
	if _, err := m.Run.Run(ctx, "systemctl", "restart", st.Unit); err != nil {
		return fmt.Errorf("systemctl restart %s: %w", st.Unit, err)
	}
	for i := 0; i < 8; i++ {
		if out, _ := m.Run.Run(ctx, "systemctl", "is-active", st.Unit); strings.TrimSpace(out) == "active" {
			return nil
		}
		select {
		case <-ctx.Done():
			return ctx.Err()
		case <-time.After(400 * time.Millisecond):
		}
	}
	return fmt.Errorf("%s did not come back up", st.Unit)
}

// backupFTPConf keeps the pristine vsftpd.conf from before TarOS first touched
// it (never overwritten) and the previous version before each rewrite.
func (m *Manager) backupFTPConf(path, old string) error {
	if old == "" {
		return nil
	}
	orig := path + ".taros-original"
	if !fileExists(orig) {
		if err := os.WriteFile(orig, []byte(stripFTPBlock(old)), 0o644); err != nil {
			return fmt.Errorf("sharing: backup vsftpd.conf: %w", err)
		}
	}
	return os.WriteFile(path+".taros-bak", []byte(old), 0o644)
}

// ---- operations ----------------------------------------------------------------------

// FTPAdopt starts managing vsftpd. On its own it changes nothing about who can
// log in or what they can do — every existing user keeps working; it only adds
// the block that lets TarOS accounts in, and restarts a running vsftpd.
func (m *Manager) FTPAdopt(ctx context.Context) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.ftpGuard(ctx, false)
	if err != nil {
		return err
	}
	return m.applyFTP(ctx, m.Store.Get(), st)
}

// FTPUnadopt removes TarOS's part of vsftpd's configuration and files. When
// vsftpd.conf still equals the original plus TarOS's block, the original comes
// back byte for byte. FTP access of accounts is removed (their passwords locked);
// the accounts themselves stay.
func (m *Manager) FTPUnadopt(ctx context.Context) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.ftpGuard(ctx, false)
	if err != nil {
		return err
	}
	dir := m.ftpDir()
	confBytes, _ := os.ReadFile(st.ConfigPath)
	conf := string(confBytes)
	restored := conf
	if hasFTPBlock(conf) {
		restored = stripFTPBlock(conf)
		if orig, err := os.ReadFile(st.ConfigPath + ".taros-original"); err == nil &&
			strings.TrimRight(restored, " \t\r\n") == strings.TrimRight(string(orig), " \t\r\n") {
			restored = string(orig)
		}
	}
	mdl := m.Store.Get()
	var lock []string
	for i := range mdl.Accounts {
		if mdl.Accounts[i].FTP != nil {
			lock = append(lock, mdl.Accounts[i].Name)
			mdl.Accounts[i].FTP = nil
		}
	}
	mdl.FTP = FTPSettings{}

	snap := takeSnapshot([]string{st.ConfigPath})
	if restored != conf {
		check := filepath.Join(dir, ".vsftpd.conf.taros-check")
		if err := os.MkdirAll(dir, 0o755); err == nil {
			defer os.Remove(check)
			if err := os.WriteFile(check, []byte(restored), 0o644); err == nil {
				if err := m.probeFTP(ctx, st, check); err != nil {
					return err
				}
			}
		}
		if err := m.backupFTPConf(st.ConfigPath, conf); err != nil {
			return err
		}
		perm := os.FileMode(0o644)
		if fi, err := os.Stat(st.ConfigPath); err == nil {
			perm = fi.Mode().Perm()
		}
		if err := writeAtomic(st.ConfigPath, []byte(restored), perm); err != nil {
			return err
		}
	}
	if err := m.restartFTP(ctx, st); err != nil {
		snap.restore()
		_ = m.restartFTP(ctx, st)
		return &FTPApplyError{Output: err.Error()}
	}
	for _, n := range lock {
		_ = m.unixLock(ctx, n, true)
	}
	users, _ := filepath.Glob(filepath.Join(dir, ftpUsersDir, "*"))
	for _, p := range users {
		_ = os.Remove(p)
	}
	for _, p := range []string{filepath.Join(dir, ftpUsersDir), filepath.Join(dir, ftpChrootFn), filepath.Join(dir, ftpAllowedFn),
		filepath.Join(dir, ftpCertFn), filepath.Join(m.Det.Paths.PamDir, ftpPAMName), st.ConfigPath + ".taros-original"} {
		_ = os.Remove(p)
	}
	return m.Store.Set(mdl)
}

// SetFTPSettings changes the options TarOS owns (TLS, who may log in, passive ports).
func (m *Manager) SetFTPSettings(ctx context.Context, s FTPSettings) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.ftpGuard(ctx, true)
	if err != nil {
		return err
	}
	if err := validFTPSettings(s); err != nil {
		return err
	}
	mdl := m.Store.Get()
	if s.OnlyAccounts {
		any := false
		for _, a := range mdl.Accounts {
			if a.FTP != nil && !a.Disabled {
				any = true
			}
		}
		if !any {
			return ErrFTPNoAccounts
		}
	}
	mdl.FTP = s
	if err := m.applyFTP(ctx, mdl, st); err != nil {
		return err
	}
	return m.Store.Set(mdl)
}

// SetFTPAccess gives an account an FTP folder (or changes it). The account's
// password is set as its Linux password (that is what vsftpd checks through
// PAM) — required the first time, optional afterwards; SMB's password is kept
// in step so one account has one password.
func (m *Manager) SetFTPAccess(ctx context.Context, name string, a FTPAccess, password string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.ftpGuard(ctx, true)
	if err != nil {
		return err
	}
	mdl := m.Store.Get()
	idx := -1
	for i := range mdl.Accounts {
		if mdl.Accounts[i].Name == name {
			idx = i
		}
	}
	if idx < 0 {
		return ErrAccountMissing
	}
	acc := mdl.Accounts[idx]
	if acc.Disabled {
		return ErrShareUser
	}
	if a.Mode != "ro" && a.Mode != "rw" {
		return ErrShareMode
	}
	real, err := m.Policy.Resolve(a.Path)
	if err != nil {
		return err
	}
	a.Path = real
	if a.RunAs != "" {
		if uid, _, err := m.LookupUser(a.RunAs); err != nil || uid == 0 {
			return ErrRunAs
		}
	}
	first := acc.FTP == nil
	if password != "" {
		if err := checkPassword(password); err != nil {
			return err
		}
	} else if first {
		return ErrPasswordWeak
	}

	mdl.Accounts[idx].FTP = &a
	if err := m.applyFTP(ctx, mdl, st); err != nil {
		return err
	}
	if password != "" {
		if err := m.unixSetPassword(ctx, name, password); err != nil {
			prev := m.Store.Get()
			_ = m.applyFTP(ctx, prev, st)
			return err
		}
		if smb := m.Det.SMB(ctx); smb.Installed && smb.CanManage && HasIncludes(m.readConf(), m.dir()) {
			if err := smbSetPassword(ctx, m.Run, !acc.SMB, name, password); err == nil {
				mdl.Accounts[idx].SMB = true
			}
		}
	}
	return m.Store.Set(mdl)
}

// ClearFTPAccess takes an account's FTP folder away and locks its Linux password.
func (m *Manager) ClearFTPAccess(ctx context.Context, name string) error {
	m.mu.Lock()
	defer m.mu.Unlock()
	st, err := m.ftpGuard(ctx, true)
	if err != nil {
		return err
	}
	mdl := m.Store.Get()
	idx := -1
	for i := range mdl.Accounts {
		if mdl.Accounts[i].Name == name {
			idx = i
		}
	}
	if idx < 0 {
		return ErrAccountMissing
	}
	if mdl.Accounts[idx].FTP == nil {
		return nil
	}
	mdl.Accounts[idx].FTP = nil
	if mdl.FTP.OnlyAccounts && !anyFTP(mdl) {
		mdl.FTP.OnlyAccounts = false // nothing left to allow: don't leave the option dangling
	}
	if err := m.applyFTP(ctx, mdl, st); err != nil {
		return err
	}
	_ = m.unixLock(ctx, name, true)
	return m.Store.Set(mdl)
}

func anyFTP(mdl Model) bool {
	for _, a := range mdl.Accounts {
		if a.FTP != nil && !a.Disabled {
			return true
		}
	}
	return false
}

// ---- Linux passwords for FTP logins ---------------------------------------------------

// unixSetPassword sets the account's Linux password (stdin, never argv). The
// account has no shell, so this does not make it a login for anything else.
func (m *Manager) unixSetPassword(ctx context.Context, name, pw string) error {
	if _, err := m.Run.RunInput(ctx, name+":"+pw+"\n", m.tool("chpasswd")); err != nil {
		return fmt.Errorf("chpasswd: %w", err)
	}
	return nil
}

// unixLock locks or unlocks the Linux password (the hash is kept, so unlocking
// brings the same password back).
func (m *Manager) unixLock(ctx context.Context, name string, lock bool) error {
	flag := "-u"
	if lock {
		flag = "-l"
	}
	if _, err := m.Run.Run(ctx, m.tool("passwd"), flag, name); err != nil {
		return fmt.Errorf("passwd %s: %w", flag, err)
	}
	return nil
}
