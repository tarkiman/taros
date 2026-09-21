// Package storage finds external drives (USB flash drives, HDDs, SSDs, card
// readers), mounts them, and lets the user unmount/eject them safely — see
// docs/04-features.md §4.17.
//
// TarOS runs on machines the author has never seen, so the rules are
// conservative: only external (USB/removable) disks are ever touched, never the
// disk that holds /, /boot or swap, never anything /etc/fstab already manages,
// and never a directory that isn't an empty mount point.
package storage

import (
	"bytes"
	"context"
	"os"
	"os/exec"
	"strings"
)

// Runner runs external commands.
type Runner interface {
	Run(ctx context.Context, name string, args ...string) (stdout string, err error)
}

// combinedRunner is implemented by runners that can also return what a command
// printed on stderr when it *succeeded* — ntfs-3g mounts a hibernated volume
// read-only itself and only says so on stderr.
type combinedRunner interface {
	RunCombined(ctx context.Context, name string, args ...string) (output string, err error)
}

// CmdError is a failed command: its output, never its arguments.
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
	cmd := exec.CommandContext(ctx, name, args...)
	cmd.Env = append(os.Environ(), "LC_ALL=C", "LANG=C")
	var out, errb bytes.Buffer
	cmd.Stdout, cmd.Stderr = &out, &errb
	if err := cmd.Run(); err != nil {
		return out.String(), &CmdError{Stdout: out.String(), Stderr: errb.String(), Err: err}
	}
	return out.String(), nil
}

func (execRunner) RunCombined(ctx context.Context, name string, args ...string) (string, error) {
	cmd := exec.CommandContext(ctx, name, args...)
	cmd.Env = append(os.Environ(), "LC_ALL=C", "LANG=C")
	var out, errb bytes.Buffer
	cmd.Stdout, cmd.Stderr = &out, &errb
	if err := cmd.Run(); err != nil {
		return out.String(), &CmdError{Stdout: out.String(), Stderr: errb.String(), Err: err}
	}
	return out.String() + errb.String(), nil
}

// NewRunner returns the real command runner.
func NewRunner() Runner { return execRunner{} }
