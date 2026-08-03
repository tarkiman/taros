package systemd

import (
	"context"
	"fmt"
	"strconv"
)

// Tail returns the last n lines of a unit's journal — fetched on-demand
// when its detail/logs is opened, never polled continuously, see
// docs/04-features.md §4.3.
func Tail(ctx context.Context, unit string, n int) (string, error) {
	out, err := run(ctx, "journalctl", "-u", unit, "-n", strconv.Itoa(n), "--no-pager")
	if err != nil {
		return "", fmt.Errorf("systemd: tail logs for %s: %w", unit, err)
	}
	return string(out), nil
}
