// Package sharing detects and manages file sharing (Samba/SMB now, FTP next) —
// see docs/04-features.md §4.16.
//
// TarOS is a public app, so nothing here may assume the machine looks like the
// author's: Samba/vsftpd can be absent, installed but empty, or already
// configured by someone else. Detection therefore comes first and is strictly
// read-only; management only ever adds clearly delimited, removable pieces of
// its own and never rewrites what it didn't write.
package sharing

import (
	"bytes"
	"context"
	"os"
	"os/exec"
	"strings"
)

// Runner runs external commands. stdin is how secrets (a share account's
// password) reach `smbpasswd -s` — never the argument list, where `ps` would
// show them.
type Runner interface {
	Run(ctx context.Context, name string, args ...string) (stdout string, err error)
	RunInput(ctx context.Context, stdin, name string, args ...string) (stdout string, err error)
}

// CmdError is a failed command: stderr (and stdout, since testparm reports its
// complaints there) but deliberately never the arguments.
type CmdError struct {
	Stdout, Stderr string
	Err            error
}

func (e *CmdError) Error() string {
	if s := strings.TrimSpace(e.Stderr); s != "" {
		return s
	}
	if s := strings.TrimSpace(e.Stdout); s != "" {
		return s
	}
	return e.Err.Error()
}
func (e *CmdError) Unwrap() error { return e.Err }

type execRunner struct{}

func (execRunner) Run(ctx context.Context, name string, args ...string) (string, error) {
	return execRunner{}.RunInput(ctx, "", name, args...)
}

func (execRunner) RunInput(ctx context.Context, stdin, name string, args ...string) (string, error) {
	cmd := exec.CommandContext(ctx, name, args...)
	cmd.Env = append(os.Environ(), "LC_ALL=C", "LANG=C")
	if stdin != "" {
		cmd.Stdin = strings.NewReader(stdin)
	}
	var out, errb bytes.Buffer
	cmd.Stdout, cmd.Stderr = &out, &errb
	if err := cmd.Run(); err != nil {
		return out.String(), &CmdError{Stdout: out.String(), Stderr: errb.String(), Err: err}
	}
	return out.String(), nil
}

// NewRunner returns the real command runner.
func NewRunner() Runner { return execRunner{} }
