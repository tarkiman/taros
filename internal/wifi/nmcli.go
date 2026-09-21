// Package wifi lets TarOS scan for, connect to and forget Wi-Fi networks by
// driving NetworkManager's nmcli — see docs/04-features.md §4.14.
//
// The Pi this was built for is Wi-Fi-only and TarOS is reached over that same
// link, so a bad switch (wrong password, out of range) would cut the device
// off with no way back short of a keyboard. Everything here is organised
// around that: a switch is verified and, if it doesn't come up, rolled back
// to the previous connection by the server itself (see connect.go).
package wifi

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"os"
	"os/exec"
	"strings"
)

// Runner runs one nmcli invocation. stdin is unused today (secrets go through
// a keyfile, never argv or stdin) but kept so a future caller can't be forced
// to put a secret on the command line.
type Runner interface {
	Run(ctx context.Context, args ...string) (stdout string, err error)
}

// CmdError is a failed nmcli call. It deliberately carries stderr only — never
// the arguments — so an error can be logged or returned without any chance of
// leaking what was passed in.
type CmdError struct {
	Stderr string
	Err    error
}

func (e *CmdError) Error() string {
	if s := strings.TrimSpace(e.Stderr); s != "" {
		return s
	}
	return e.Err.Error()
}
func (e *CmdError) Unwrap() error { return e.Err }

type execRunner struct{ bin string }

func (r execRunner) Run(ctx context.Context, args ...string) (string, error) {
	cmd := exec.CommandContext(ctx, r.bin, args...)
	// nmcli's text is localised; parse the C locale only.
	cmd.Env = append(os.Environ(), "LC_ALL=C", "LANG=C")
	var out, errb bytes.Buffer
	cmd.Stdout, cmd.Stderr = &out, &errb
	if err := cmd.Run(); err != nil {
		return out.String(), &CmdError{Stderr: errb.String(), Err: err}
	}
	return out.String(), nil
}

// ErrNoNmcli means nmcli isn't installed — NetworkManager isn't what manages
// this host's network, so the feature is unavailable.
var ErrNoNmcli = errors.New("wifi: nmcli not found")

// splitTerse splits one line of `nmcli -t` output on unescaped ':' and undoes
// nmcli's escaping (`\:` and `\\`).
func splitTerse(line string) []string {
	var fields []string
	var cur strings.Builder
	for i := 0; i < len(line); i++ {
		c := line[i]
		switch {
		case c == '\\' && i+1 < len(line):
			i++
			cur.WriteByte(line[i])
		case c == ':':
			fields = append(fields, cur.String())
			cur.Reset()
		default:
			cur.WriteByte(c)
		}
	}
	return append(fields, cur.String())
}

func lines(s string) []string {
	var out []string
	for _, l := range strings.Split(s, "\n") {
		if l = strings.TrimRight(l, "\r"); l != "" {
			out = append(out, l)
		}
	}
	return out
}

func unescapeSingle(s string) string {
	f := splitTerse(strings.TrimRight(s, "\r\n"))
	return strings.Join(f, ":")
}

func errf(format string, a ...any) error { return fmt.Errorf("wifi: "+format, a...) }
