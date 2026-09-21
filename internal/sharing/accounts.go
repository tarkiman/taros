package sharing

import (
	"context"
	"errors"
	"fmt"
	"strings"
)

// shareGroup is the primary group of every account TarOS creates — the marker
// that says "this system user exists only for file sharing".
const shareGroup = "taros-share"

// UserBackend creates and removes the no-login system users behind share accounts.
type UserBackend interface {
	Exists(ctx context.Context, name string) bool
	EnsureGroup(ctx context.Context) error
	Create(ctx context.Context, name string) error
	Delete(ctx context.Context, name string) error
}

// NewUserBackend picks shadow-utils (useradd) or busybox (adduser), or nil when
// the machine has neither.
func NewUserBackend(run Runner, lookPath func(string) (string, error)) UserBackend {
	nologin := "/usr/sbin/nologin"
	for _, c := range []string{"nologin"} {
		if p, err := lookPath(c); err == nil {
			nologin = p
		}
	}
	if _, err := lookPath("useradd"); err == nil {
		return &shadowUsers{run: run, nologin: nologin}
	}
	if _, err := lookPath("adduser"); err == nil {
		if nologin == "/usr/sbin/nologin" {
			nologin = "/sbin/nologin"
		}
		return &busyboxUsers{run: run, nologin: nologin}
	}
	return nil
}

const gecos = "TarOS file sharing account"

type shadowUsers struct {
	run     Runner
	nologin string
}

func exists(ctx context.Context, run Runner, name string) bool {
	_, err := run.Run(ctx, "id", "-u", name)
	return err == nil
}

func groupExists(ctx context.Context, run Runner) bool {
	_, err := run.Run(ctx, "getent", "group", shareGroup)
	return err == nil
}

func (u *shadowUsers) Exists(ctx context.Context, n string) bool { return exists(ctx, u.run, n) }
func (u *shadowUsers) EnsureGroup(ctx context.Context) error {
	if groupExists(ctx, u.run) {
		return nil
	}
	_, err := u.run.Run(ctx, "groupadd", shareGroup)
	return err
}

// Create: no home directory (-M) and a home *path* that can never exist
// (/nonexistent, as Debian's `nobody` has — otherwise the passwd entry would
// point at /home/<name>, which pam_mkhomedir or a later mkdir could quietly
// bring to life), no per-user group (-N), no shell, locked password — a name in
// the password database and nothing else.
func (u *shadowUsers) Create(ctx context.Context, n string) error {
	_, err := u.run.Run(ctx, "useradd", "-M", "-N", "-d", "/nonexistent", "-g", shareGroup, "-s", u.nologin, "-c", gecos, n)
	return err
}
func (u *shadowUsers) Delete(ctx context.Context, n string) error {
	_, err := u.run.Run(ctx, "userdel", n)
	return err
}

type busyboxUsers struct {
	run     Runner
	nologin string
}

func (u *busyboxUsers) Exists(ctx context.Context, n string) bool { return exists(ctx, u.run, n) }
func (u *busyboxUsers) EnsureGroup(ctx context.Context) error {
	if groupExists(ctx, u.run) {
		return nil
	}
	_, err := u.run.Run(ctx, "addgroup", shareGroup)
	return err
}
func (u *busyboxUsers) Create(ctx context.Context, n string) error {
	_, err := u.run.Run(ctx, "adduser", "-D", "-H", "-h", "/nonexistent", "-G", shareGroup, "-s", u.nologin, "-g", gecos, n)
	return err
}
func (u *busyboxUsers) Delete(ctx context.Context, n string) error {
	_, err := u.run.Run(ctx, "deluser", n)
	return err
}

// ---- Samba passwords -------------------------------------------------------------

// checkPassword: long enough, and free of the characters that would break the
// line-based stdin protocol of `smbpasswd -s`.
func checkPassword(pw string) error {
	if len(pw) < minPasswordLen {
		return ErrPasswordWeak
	}
	if len(pw) > 127 || strings.ContainsAny(pw, "\n\r\x00") {
		return errors.New("sharing: password contains characters that cannot be used")
	}
	return nil
}

func smbSetPassword(ctx context.Context, run Runner, add bool, name, pw string) error {
	// The password goes in on stdin, twice (new + confirm) — never on the command line.
	args := []string{"-s"}
	if add {
		args = []string{"-a", "-s"}
	}
	args = append(args, name)
	if _, err := run.RunInput(ctx, pw+"\n"+pw+"\n", "smbpasswd", args...); err != nil {
		return fmt.Errorf("smbpasswd: %w", err)
	}
	return nil
}
