// Package systemd talks to systemd via exec'd systemctl/journalctl —
// not D-Bus. See docs/03-tech-stack.md "Kenapa D-Bus untuk systemd, bukan
// exec systemctl?": D-Bus is the eventual target for efficiency, but
// exec is faster to build correctly first and the roadmap explicitly
// allows starting here (docs/10-roadmap.md Fase 2b).
package systemd

import (
	"bytes"
	"context"
	"fmt"
	"os/exec"
	"strings"
	"time"
)

const execTimeout = 10 * time.Second

func runSystemctl(ctx context.Context, args ...string) ([]byte, error) {
	return run(ctx, "systemctl", args...)
}

func run(ctx context.Context, name string, args ...string) ([]byte, error) {
	ctx, cancel := context.WithTimeout(ctx, execTimeout)
	defer cancel()

	cmd := exec.CommandContext(ctx, name, args...)
	var stdout, stderr bytes.Buffer
	cmd.Stdout = &stdout
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		msg := strings.TrimSpace(stderr.String())
		if msg == "" {
			msg = err.Error()
		}
		return nil, fmt.Errorf("%s %s: %s", name, strings.Join(args, " "), msg)
	}
	return stdout.Bytes(), nil
}

// runPrivileged runs a mutating systemctl action (start/stop/restart/
// reload) via `sudo -n`. This process itself never gains privilege — it's
// asking the OS's own sudo/polkit layer to authorize the action, and
// `-n` (non-interactive) makes it fail fast with a clear error instead of
// hanging if that hasn't been configured, rather than trying (and being
// unable) to prompt for a password. See docs/07-security.md §7.6 for the
// same sudo trade-off already documented for the web terminal — this
// reuses that same optional privilege grant, or a narrower
// systemctl-only sudoers rule, see docs/09-deployment.md §9.2.
func runPrivileged(ctx context.Context, args ...string) ([]byte, error) {
	sudoArgs := append([]string{"-n", "systemctl"}, args...)
	return run(ctx, "sudo", sudoArgs...)
}
