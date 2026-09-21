package docker

import (
	"context"
	"errors"
	"fmt"
	"log/slog"
	"sort"
	"strings"
	"sync"
	"time"
)

// Start/stop/restart a whole compose project in dependency order — see
// docs/04-features.md §4.2 "Aksi per aplikasi".
//
// There is no `docker compose` CLI on the host, and the Engine API's own
// start/stop know nothing about depends_on. But compose stamps every
// container with a `com.docker.compose.depends_on` label
// ("service:condition:restart,…"), so the order can be rebuilt from the
// containers alone: dependencies first when starting (waiting for the
// condition the dependents asked for), dependents first when stopping.
// Containers that no longer exist can't be recreated without compose — they
// are reported, not silently ignored.

const dependsOnLabel = "com.docker.compose.depends_on"

const (
	ActionStart   = "start"
	ActionStop    = "stop"
	ActionRestart = "restart"
)

const (
	StepPending = "pending"
	StepRunning = "running"
	StepOK      = "ok"
	StepFailed  = "failed"
	StepSkipped = "skipped"
)

const (
	JobRunning = "running"
	JobDone    = "done"

	ResultOK      = "ok"
	ResultPartial = "partial"
	ResultFailed  = "failed"
)

var (
	ErrBusyProject   = errors.New("docker: another action is running on this project")
	ErrInvalidAction = errors.New("docker: invalid lifecycle action")
)

// Dep is one depends_on entry.
type Dep struct {
	Service   string
	Condition string // service_started | service_healthy | service_completed_successfully
}

const (
	condStarted   = "service_started"
	condHealthy   = "service_healthy"
	condCompleted = "service_completed_successfully"
)

func condRank(c string) int {
	switch c {
	case condCompleted:
		return 3
	case condHealthy:
		return 2
	}
	return 1
}

// parseDependsOn parses "svc:condition:restart,svc2:condition:restart". An
// unknown or missing condition is treated as service_started (compose's
// default); malformed entries are skipped.
func parseDependsOn(v string) []Dep {
	var deps []Dep
	for _, part := range strings.Split(v, ",") {
		f := strings.Split(strings.TrimSpace(part), ":")
		if f[0] == "" {
			continue
		}
		d := Dep{Service: f[0], Condition: condStarted}
		if len(f) > 1 && (f[1] == condHealthy || f[1] == condCompleted || f[1] == condStarted) {
			d.Condition = f[1]
		}
		deps = append(deps, d)
	}
	return deps
}

// serviceLayers orders services so that every service comes after the
// services it depends on (dependencies on services outside the project are
// ignored). Services in a dependency cycle can't be ordered; they are
// returned together as a last layer rather than looping forever.
func serviceLayers(deps map[string][]Dep) [][]string {
	depth := map[string]int{}
	state := map[string]int{} // 0 unseen, 1 visiting, 2 done
	var visit func(s string) int
	visit = func(s string) int {
		switch state[s] {
		case 2:
			return depth[s]
		case 1:
			return -1 // back-edge of a cycle
		}
		state[s] = 1
		d := 0
		for _, dep := range deps[s] {
			if _, in := deps[dep.Service]; !in {
				continue
			}
			if dd := visit(dep.Service); dd >= d {
				d = dd + 1
			}
		}
		state[s] = 2
		depth[s] = d
		return d
	}
	names := make([]string, 0, len(deps))
	for s := range deps {
		names = append(names, s)
	}
	sort.Strings(names)
	max := 0
	for _, s := range names {
		if d := visit(s); d > max {
			max = d
		}
	}
	layers := make([][]string, max+1)
	for _, s := range names {
		layers[depth[s]] = append(layers[depth[s]], s)
	}
	return layers
}

// LifecycleStep is one container's part in a job.
type LifecycleStep struct {
	Service   string `json:"service"`
	Container string `json:"container"`
	Action    string `json:"action"` // start | stop
	State     string `json:"state"`
	Detail    string `json:"detail,omitempty"`
}

// LifecycleJob is the state of the latest action on a project. Kept in
// memory so the browser can poll it (and read the outcome after a reload).
type LifecycleJob struct {
	Project    string          `json:"project"`
	Action     string          `json:"action"`
	Phase      string          `json:"phase"`
	Result     string          `json:"result,omitempty"`
	Steps      []LifecycleStep `json:"steps"`
	StartedAt  time.Time       `json:"startedAt"`
	FinishedAt time.Time       `json:"finishedAt,omitempty"`
}

type appContainer struct {
	id, name, service, state string
	deps                     []Dep
}

// Lifecycle runs project actions. Safe for concurrent use; one job per
// project at a time.
type Lifecycle struct {
	c       *Client
	onDone  func()
	pollGap time.Duration
	within  time.Duration // how long a dependency may take to become ready

	mu   sync.Mutex
	jobs map[string]*LifecycleJob
}

// NewLifecycle: onDone (may be nil) is called after each job, e.g. to refresh
// the container cache.
func NewLifecycle(c *Client, onDone func()) *Lifecycle {
	return &Lifecycle{c: c, onDone: onDone, pollGap: time.Second, within: 120 * time.Second, jobs: map[string]*LifecycleJob{}}
}

func (l *Lifecycle) snapshot(j *LifecycleJob) LifecycleJob {
	cp := *j
	cp.Steps = append([]LifecycleStep(nil), j.Steps...)
	return cp
}

// Job returns the latest job for project, if any.
func (l *Lifecycle) Job(project string) (LifecycleJob, bool) {
	l.mu.Lock()
	defer l.mu.Unlock()
	j, ok := l.jobs[project]
	if !ok {
		return LifecycleJob{}, false
	}
	return l.snapshot(j), true
}

func (l *Lifecycle) members(ctx context.Context, project string) ([]appContainer, error) {
	var raw []rawContainer
	if err := l.c.getJSON(ctx, "/containers/json?all=1&filters="+labelFilter(project), &raw); err != nil {
		return nil, err
	}
	out := make([]appContainer, 0, len(raw))
	for _, r := range raw {
		name := shortID(r.ID)
		if len(r.Names) > 0 {
			name = strings.TrimPrefix(r.Names[0], "/")
		}
		svc := r.Labels["com.docker.compose.service"]
		if svc == "" {
			svc = name
		}
		out = append(out, appContainer{id: r.ID, name: name, service: svc, state: r.State, deps: parseDependsOn(r.Labels[dependsOnLabel])})
	}
	if len(out) == 0 {
		return nil, ErrProjectNotFound
	}
	return out, nil
}

// Run validates the request and starts the job in the background.
func (l *Lifecycle) Run(ctx context.Context, project, action string) (LifecycleJob, error) {
	if action != ActionStart && action != ActionStop && action != ActionRestart {
		return LifecycleJob{}, ErrInvalidAction
	}
	members, err := l.members(ctx, project)
	if err != nil {
		return LifecycleJob{}, err
	}
	if self := selfContainerID(); self != "" {
		for _, m := range members {
			if strings.HasPrefix(m.id, self) {
				return LifecycleJob{}, ErrProjectRunsThis
			}
		}
	}

	l.mu.Lock()
	if cur, ok := l.jobs[project]; ok && cur.Phase == JobRunning {
		l.mu.Unlock()
		return LifecycleJob{}, ErrBusyProject
	}
	job := &LifecycleJob{Project: project, Action: action, Phase: JobRunning, StartedAt: time.Now()}
	l.jobs[project] = job
	snap := l.snapshot(job)
	l.mu.Unlock()

	go l.execute(job, members)
	return snap, nil
}

// step registration/updates go through l.mu so Job() sees a consistent view.
func (l *Lifecycle) addStep(job *LifecycleJob, m appContainer, action string) int {
	l.mu.Lock()
	defer l.mu.Unlock()
	job.Steps = append(job.Steps, LifecycleStep{Service: m.service, Container: m.name, Action: action, State: StepPending})
	return len(job.Steps) - 1
}

func (l *Lifecycle) setStep(job *LifecycleJob, i int, state, detail string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	job.Steps[i].State, job.Steps[i].Detail = state, detail
}

func (l *Lifecycle) execute(job *LifecycleJob, members []appContainer) {
	ctx, cancel := context.WithTimeout(context.Background(), 15*time.Minute)
	defer cancel()

	byService := map[string][]appContainer{}
	deps := map[string][]Dep{}
	for _, m := range members {
		byService[m.service] = append(byService[m.service], m)
		deps[m.service] = append(deps[m.service], m.deps...)
	}
	layers := serviceLayers(deps)

	switch job.Action {
	case ActionStop:
		l.stopAll(ctx, job, byService, layers)
	case ActionStart:
		l.startAll(ctx, job, byService, deps, layers)
	case ActionRestart:
		l.stopAll(ctx, job, byService, layers)
		// The states captured at the start are stale now (everything was just
		// stopped): re-read them, or the start phase would see "running" and
		// skip every container.
		if fresh, err := l.members(ctx, job.Project); err == nil {
			byService = map[string][]appContainer{}
			for _, m := range fresh {
				byService[m.service] = append(byService[m.service], m)
			}
		}
		l.startAll(ctx, job, byService, deps, layers)
	}

	l.mu.Lock()
	ok, bad := 0, 0
	for _, s := range job.Steps {
		switch s.State {
		case StepOK:
			ok++
		case StepFailed, StepSkipped:
			bad++
		}
	}
	switch {
	case bad == 0:
		job.Result = ResultOK
	case ok > 0:
		job.Result = ResultPartial
	default:
		job.Result = ResultFailed
	}
	job.Phase, job.FinishedAt = JobDone, time.Now()
	res := job.Result
	l.mu.Unlock()

	slog.Info("docker: aksi aplikasi selesai", "project", job.Project, "action", job.Action, "result", res)
	if l.onDone != nil {
		l.onDone()
	}
}

func shortID(id string) string {
	if len(id) > 12 {
		return id[:12]
	}
	return id
}

func running(state string) bool {
	return state == "running" || state == "restarting" || state == "paused"
}

// stopAll stops dependents before their dependencies (reverse layers),
// containers of one layer in parallel. A failure doesn't abort the rest — the
// remaining containers still get stopped (like `docker compose down`).
func (l *Lifecycle) stopAll(ctx context.Context, job *LifecycleJob, byService map[string][]appContainer, layers [][]string) {
	for i := len(layers) - 1; i >= 0; i-- {
		var wg sync.WaitGroup
		for _, svc := range layers[i] {
			for _, m := range byService[svc] {
				idx := l.addStep(job, m, ActionStop)
				if !running(m.state) {
					l.setStep(job, idx, StepOK, "sudah berhenti")
					continue
				}
				wg.Add(1)
				go func(m appContainer, idx int) {
					defer wg.Done()
					l.setStep(job, idx, StepRunning, "")
					if err := l.c.StopContainer(ctx, m.id); err != nil {
						l.setStep(job, idx, StepFailed, apiMsg(err))
						return
					}
					l.setStep(job, idx, StepOK, "")
				}(m, idx)
			}
		}
		wg.Wait()
	}
}

// startAll starts dependencies first and waits for the strongest condition any
// dependent asked of them before moving to the next layer. A container that
// fails (or whose dependency failed) takes its dependents down with it as
// "skipped" — started on a missing dependency they would only crash.
func (l *Lifecycle) startAll(ctx context.Context, job *LifecycleJob, byService map[string][]appContainer, deps map[string][]Dep, layers [][]string) {
	// What each service must reach before its dependents may start.
	need := map[string]int{}
	for _, ds := range deps {
		for _, d := range ds {
			if r := condRank(d.Condition); r > need[d.Service] {
				need[d.Service] = r
			}
		}
	}
	bad := map[string]string{} // service -> why it isn't usable
	var mu sync.Mutex          // guards bad and toWait: goroutines of a layer write them concurrently

	for _, layer := range layers {
		type started struct {
			m   appContainer
			idx int
		}
		var toWait []started
		var wg sync.WaitGroup

		for _, svc := range layer {
			var blocked string
			seen := map[string]bool{}
			mu.Lock()
			for _, d := range deps[svc] {
				if why, isBad := bad[d.Service]; isBad && !seen[d.Service] {
					seen[d.Service] = true
					blocked = d.Service + " " + why
				}
			}
			mu.Unlock()
			for _, m := range byService[svc] {
				idx := l.addStep(job, m, ActionStart)
				if blocked != "" {
					l.setStep(job, idx, StepSkipped, "dilewati: dependensi "+blocked)
					mu.Lock()
					bad[svc] = "dilewati"
					mu.Unlock()
					continue
				}
				wg.Add(1)
				go func(m appContainer, idx int) {
					defer wg.Done()
					l.setStep(job, idx, StepRunning, "")
					var err error
					detail := ""
					switch m.state {
					case "running", "restarting":
						detail = "sudah berjalan"
					case "paused":
						err = l.c.UnpauseContainer(ctx, m.id)
						detail = "dilanjutkan dari jeda"
					default:
						err = l.c.StartContainer(ctx, m.id)
					}
					if err != nil {
						l.setStep(job, idx, StepFailed, apiMsg(err))
						mu.Lock()
						bad[m.service] = "gagal dijalankan"
						mu.Unlock()
						return
					}
					l.setStep(job, idx, StepOK, detail)
					if need[m.service] > 0 {
						mu.Lock()
						toWait = append(toWait, started{m, idx})
						mu.Unlock()
					}
				}(m, idx)
			}
		}
		wg.Wait()

		// Wait for readiness in parallel (all containers of the layer at once).
		for _, w := range toWait {
			wg.Add(1)
			go func(w started) {
				defer wg.Done()
				detail, err := l.waitReady(ctx, w.m.id, need[w.m.service])
				if err != nil {
					l.setStep(job, w.idx, StepFailed, err.Error())
					mu.Lock()
					bad[w.m.service] = "tidak siap"
					mu.Unlock()
					return
				}
				if detail != "" {
					l.setStep(job, w.idx, StepOK, detail)
				}
			}(w)
		}
		wg.Wait()
	}
}

type inspectState struct {
	State struct {
		Status   string
		ExitCode int
		Health   *struct{ Status string }
	}
}

// waitReady polls until the container satisfies rank (1 started, 2 healthy,
// 3 completed successfully), fails early if it died, or times out.
func (l *Lifecycle) waitReady(ctx context.Context, id string, rank int) (detail string, err error) {
	deadline := time.Now().Add(l.within)
	for {
		var st inspectState
		if err := l.c.getJSON(ctx, "/containers/"+id+"/json", &st); err != nil {
			return "", fmt.Errorf("gagal memeriksa status: %s", apiMsg(err))
		}
		s := st.State
		switch rank {
		case 3:
			if s.Status == "exited" {
				if s.ExitCode == 0 {
					return "selesai dengan sukses", nil
				}
				return "", fmt.Errorf("selesai dengan exit code %d (dependen membutuhkan sukses)", s.ExitCode)
			}
		case 2:
			if s.Status == "exited" || s.Status == "dead" {
				return "", fmt.Errorf("berhenti (exit code %d) sebelum sehat", s.ExitCode)
			}
			if s.Status == "running" {
				if s.Health == nil {
					return "tanpa healthcheck — dianggap siap saat berjalan", nil
				}
				switch s.Health.Status {
				case "healthy":
					return "sehat", nil
				case "unhealthy":
					// keep waiting: a health check may still recover within the window
				}
			}
		default:
			if s.Status == "running" {
				return "", nil
			}
			if s.Status == "exited" || s.Status == "dead" {
				return "", fmt.Errorf("berhenti (exit code %d) sesudah dijalankan", s.ExitCode)
			}
		}
		if !time.Now().Before(deadline) {
			what := map[int]string{1: "berjalan", 2: "sehat", 3: "selesai"}[rank]
			return "", fmt.Errorf("belum %s dalam %d dtk", what, int(l.within.Seconds()))
		}
		select {
		case <-ctx.Done():
			return "", ctx.Err()
		case <-time.After(l.pollGap):
		}
	}
}

func apiMsg(err error) string {
	var api *APIError
	if errors.As(err, &api) {
		return strings.TrimSpace(api.Message)
	}
	return err.Error()
}
