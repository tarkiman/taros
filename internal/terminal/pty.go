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
	"syscall"

	"github.com/creack/pty"
)

// spawnPTY starts shell in its own process group (Setpgid) so Session.Close
// can kill the whole group, not just the shell itself — a foreground child
// process (e.g. a long-running command the user typed) would otherwise be
// orphaned instead of cleaned up. TERM is set explicitly since the PTY
// process doesn't inherit one from a real terminal.
func spawnPTY(shell string) (*os.File, *exec.Cmd, error) {
	cmd := exec.Command(shell)
	cmd.Env = append(os.Environ(), "TERM=xterm-256color")
	cmd.SysProcAttr = &syscall.SysProcAttr{Setpgid: true}

	ptmx, err := pty.Start(cmd)
	if err != nil {
		return nil, nil, fmt.Errorf("terminal: spawn pty: %w", err)
	}
	return ptmx, cmd, nil
}

func resizePTY(ptmx *os.File, cols, rows uint16) error {
	return pty.Setsize(ptmx, &pty.Winsize{Cols: cols, Rows: rows})
}
