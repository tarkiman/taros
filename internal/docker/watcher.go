package docker

import (
	"context"
	"sync"
	"time"
)

// Watcher refreshes the container list + stats in the background and
// serves the cached result instantly. This exists because
// ContainerStatsOnce is genuinely slow — Docker's stream=false mode
// internally waits ~1s per container for a second CPU sample, measured
// against this dev box's 37 running containers as ~10s for a full refresh.
// Fetching that synchronously per HTTP request would make the Containers
// tab take 10+ seconds to load; polling it in the background (like
// internal/collector does for host metrics) keeps every page load instant
// regardless of how slow the underlying Docker API call is.
type Watcher struct {
	client *Client

	mu          sync.Mutex
	containers  []Container
	err         error
	lastUpdated time.Time
}

func NewWatcher(client *Client) *Watcher {
	return &Watcher{client: client}
}

// Run blocks, refreshing on interval until ctx is canceled. The loop is
// self-throttling: if a refresh takes longer than interval (as it does on
// this dev box), the next refresh starts immediately after rather than
// queuing up — there's no point running two full container-stats sweeps
// concurrently.
func (w *Watcher) Run(ctx context.Context, interval time.Duration) {
	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for {
		w.refresh(ctx)
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
		}
	}
}

// RefreshNow forces an immediate refresh, used right after an action
// (start/stop/restart/remove) so the UI reflects it without waiting for
// the next scheduled tick.
func (w *Watcher) RefreshNow(ctx context.Context) {
	w.refresh(ctx)
}

func (w *Watcher) refresh(ctx context.Context) {
	containers, err := w.client.ListWithStats(ctx, true)

	w.mu.Lock()
	defer w.mu.Unlock()
	if err != nil {
		w.err = err
		return
	}
	w.containers = containers
	w.err = nil
	w.lastUpdated = time.Now()
}

// Containers returns the most recently cached list. Err is non-nil only
// when the *last* refresh failed (e.g. Docker daemon went away) — stale
// data from before that is preferred over an empty list, same graceful
// degradation intent as docs/04-features.md §4.2.
func (w *Watcher) Containers() (containers []Container, updatedAt time.Time, err error) {
	w.mu.Lock()
	defer w.mu.Unlock()
	return w.containers, w.lastUpdated, w.err
}
