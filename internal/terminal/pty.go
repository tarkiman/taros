// Package terminal spawns shell sessions in a PTY and bridges them to the
// web terminal's WebSocket — see docs/04-features.md §4.5 and
// docs/07-security.md §7.6 (highest risk-surface feature in the app,
// treated accordingly: opt-in only, bounded concurrency, idle timeout,
// guaranteed process cleanup).
package terminal

import (
	"fmt"
	"os"
	"os/exec"

	"github.com/creack/pty"
)

// spawnPTY starts shell. TERM is set explicitly since the PTY process
// doesn't inherit one from a real terminal.
//
// No explicit Setpgid here — pty.Start (creack/pty) already forces
// Setsid: true on the child's SysProcAttr, and setsid() makes the child a
// new session leader that's *also* the process group leader of that new
// session as a side effect (POSIX). An explicit Setpgid alongside that is
// not just redundant, it's actively broken: once setsid() has run, the
// child is a session leader, and POSIX forbids a session leader from
// calling setpgid() on itself — the exact "operation not permitted" this
// combination produced 100% of the time on real hardware (verified
// directly: reproduced with a minimal repro binary on a physical STB,
// confirmed fixed by dropping Setpgid, isolated from every other
// candidate — systemd unit hardening, running user, cgroup/rlimit
// process caps — which were all ruled out first, each testing clean).
// Session.Close's `kill(-pid, ...)` (session.go) still works exactly the
// same afterward: killing the process group Setsid already put the child
// in charge of.
func spawnPTY(shell string) (*os.File, *exec.Cmd, error) {
	cmd := exec.Command(shell)
	cmd.Env = append(os.Environ(), "TERM=xterm-256color")

	ptmx, err := pty.Start(cmd)
	if err != nil {
		return nil, nil, fmt.Errorf("terminal: spawn pty: %w", err)
	}
	return ptmx, cmd, nil
}

func resizePTY(ptmx *os.File, cols, rows uint16) error {
	return pty.Setsize(ptmx, &pty.Winsize{Cols: cols, Rows: rows})
}
