package docker

import (
	"encoding/json"
	"net"
	"net/http"
	"net/http/httptest"
	"path/filepath"
	"strings"
	"sync"
	"testing"
	"time"
)

// ---- a stateful fake Docker engine -----------------------------------------

type fakeCtr struct {
	name, service, project, dependsOn string
	state                             string // running | exited | paused | created
	exit                              int
	hasHealth                         bool
	health                            string // "" | starting | healthy | unhealthy
	healthyAfter                      int    // inspect polls after start before it turns healthy
	neverHealthy                      bool
	failStart                         bool
	exitsOnStart                      int // >0: the process dies right after start with this code
	polls                             int
}

type engine struct {
	mu        sync.Mutex
	ctrs      map[string]*fakeCtr // by id
	events    []string
	stopDelay time.Duration
}

func (e *engine) log(ev string) { e.events = append(e.events, ev) }

func (e *engine) idx(ev string) int {
	e.mu.Lock()
	defer e.mu.Unlock()
	for i, x := range e.events {
		if x == ev {
			return i
		}
	}
	return -1
}

func (e *engine) has(ev string) bool { return e.idx(ev) >= 0 }

func newEngine(t *testing.T, ctrs map[string]*fakeCtr) (*Client, *engine) {
	t.Helper()
	e := &engine{ctrs: ctrs}
	mux := http.NewServeMux()
	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		path := r.URL.Path
		switch {
		case r.Method == "GET" && path == "/containers/json":
			var flt map[string][]string
			_ = json.Unmarshal([]byte(r.URL.Query().Get("filters")), &flt)
			want := ""
			if len(flt["label"]) == 1 {
				want = strings.TrimPrefix(flt["label"][0], composeProjectLabel+"=")
			}
			e.mu.Lock()
			var out []map[string]any
			for id, c := range e.ctrs {
				if c.project != want {
					continue
				}
				out = append(out, map[string]any{"Id": id, "Names": []string{"/" + c.name}, "State": c.state, "Labels": map[string]string{
					"com.docker.compose.service": c.service, dependsOnLabel: c.dependsOn,
				}})
			}
			e.mu.Unlock()
			_ = json.NewEncoder(w).Encode(out)
		case r.Method == "GET" && strings.HasPrefix(path, "/containers/") && strings.HasSuffix(path, "/json"):
			id := strings.TrimSuffix(strings.TrimPrefix(path, "/containers/"), "/json")
			e.mu.Lock()
			c := e.ctrs[id]
			if c == nil {
				e.mu.Unlock()
				http.NotFound(w, r)
				return
			}
			c.polls++
			if c.state == "running" && c.hasHealth && c.health == "starting" && !c.neverHealthy && c.polls >= c.healthyAfter {
				c.health = "healthy"
				e.log("healthy:" + c.name)
			}
			st := map[string]any{"Status": c.state, "ExitCode": c.exit}
			if c.hasHealth {
				st["Health"] = map[string]string{"Status": c.health}
			}
			e.mu.Unlock()
			_ = json.NewEncoder(w).Encode(map[string]any{"State": st})
		case r.Method == "POST" && strings.HasPrefix(path, "/containers/"):
			parts := strings.Split(strings.TrimPrefix(path, "/containers/"), "/")
			id, op := parts[0], parts[1]
			e.mu.Lock()
			c := e.ctrs[id]
			if c == nil {
				e.mu.Unlock()
				http.NotFound(w, r)
				return
			}
			switch op {
			case "start":
				e.log("start:" + c.name)
				if c.failStart {
					e.mu.Unlock()
					w.WriteHeader(http.StatusInternalServerError)
					_, _ = w.Write([]byte(`{"message":"driver failed programming external connectivity"}`))
					return
				}
				c.state, c.exit, c.polls = "running", 0, 0
				if c.hasHealth {
					c.health = "starting"
				}
				if c.exitsOnStart > 0 {
					c.state, c.exit = "exited", c.exitsOnStart
				}
			case "unpause":
				e.log("unpause:" + c.name)
				c.state = "running"
			case "stop":
				e.log("stop-begin:" + c.name)
				delay := e.stopDelay
				e.mu.Unlock()
				time.Sleep(delay)
				e.mu.Lock()
				c.state, c.exit = "exited", 0
				e.log("stop-end:" + c.name)
			}
			e.mu.Unlock()
			w.WriteHeader(http.StatusNoContent)
		default:
			http.NotFound(w, r)
		}
	})
	dir, _ := filepath.Abs(t.TempDir())
	sock := filepath.Join(dir, "d.sock")
	l, err := net.Listen("unix", sock)
	if err != nil {
		t.Skipf("unix socket unavailable: %v", err)
	}
	srv := httptest.NewUnstartedServer(mux)
	srv.Listener = l
	srv.Start()
	t.Cleanup(srv.Close)
	return NewClient(sock), e
}

// appSet: cache and db have no dependencies; api needs db healthy + cache
// started; web needs api started. Layers: [cache db] [api] [web].
func appSet(state string) map[string]*fakeCtr {
	mk := func(name, svc, deps string, health bool) *fakeCtr {
		c := &fakeCtr{name: "app-" + svc + "-1", service: svc, project: "app", dependsOn: deps, state: state, hasHealth: health, healthyAfter: 3}
		if state == "running" && health {
			c.health = "healthy" // a running container has long since passed its health check
		}
		return c
	}
	return map[string]*fakeCtr{
		"c-cache": mk("", "cache", "", false),
		"c-db":    mk("", "db", "", true),
		"c-api":   mk("", "api", "db:service_healthy:false,cache:service_started:false", false),
		"c-web":   mk("", "web", "api:service_started:false", false),
	}
}

func lc(t *testing.T, c *Client) *Lifecycle {
	l := NewLifecycle(c, nil)
	l.pollGap = time.Millisecond
	l.within = 400 * time.Millisecond
	return l
}

func waitJob(t *testing.T, l *Lifecycle, project string) LifecycleJob {
	t.Helper()
	deadline := time.Now().Add(10 * time.Second)
	for time.Now().Before(deadline) {
		if j, ok := l.Job(project); ok && j.Phase == JobDone {
			return j
		}
		time.Sleep(2 * time.Millisecond)
	}
	j, _ := l.Job(project)
	t.Fatalf("job did not finish: %+v", j)
	return j
}

func stepOf(j LifecycleJob, container, action string) LifecycleStep {
	for _, s := range j.Steps {
		if s.Container == container && s.Action == action {
			return s
		}
	}
	return LifecycleStep{}
}

// ---- pure functions ---------------------------------------------------------

func TestParseDependsOn(t *testing.T) {
	got := parseDependsOn("db:service_healthy:false, cache:service_started:false,job:service_completed_successfully:false,weird:nonsense:true,bare,")
	want := []Dep{{"db", condHealthy}, {"cache", condStarted}, {"job", condCompleted}, {"weird", condStarted}, {"bare", condStarted}}
	if len(got) != len(want) {
		t.Fatalf("got %+v", got)
	}
	for i := range want {
		if got[i] != want[i] {
			t.Errorf("dep %d = %+v, want %+v", i, got[i], want[i])
		}
	}
	if len(parseDependsOn("")) != 0 || len(parseDependsOn(" , ,")) != 0 {
		t.Error("empty label must give no dependencies")
	}
}

func TestServiceLayers(t *testing.T) {
	deps := map[string][]Dep{
		"web":   {{"api", condStarted}},
		"api":   {{"db", condHealthy}, {"cache", condStarted}, {"outside", condStarted}}, // "outside" isn't in the project
		"db":    nil,
		"cache": nil,
	}
	l := serviceLayers(deps)
	if len(l) != 3 || strings.Join(l[0], ",") != "cache,db" || strings.Join(l[1], ",") != "api" || strings.Join(l[2], ",") != "web" {
		t.Fatalf("layers = %v", l)
	}
	// Diamond: d needs b and c, both need a → a | b c | d.
	d := serviceLayers(map[string][]Dep{"a": nil, "b": {{"a", condStarted}}, "c": {{"a", condStarted}}, "d": {{"b", condStarted}, {"c", condStarted}}})
	if len(d) != 3 || len(d[1]) != 2 {
		t.Fatalf("diamond = %v", d)
	}
	// A cycle must terminate and still include every service.
	cyc := serviceLayers(map[string][]Dep{"a": {{"b", condStarted}}, "b": {{"a", condStarted}}, "c": nil})
	n := 0
	for _, layer := range cyc {
		n += len(layer)
	}
	if n != 3 {
		t.Fatalf("cycle dropped services: %v", cyc)
	}
}

// ---- the jobs ---------------------------------------------------------------

func TestStartWaitsForHealthyBeforeDependents(t *testing.T) {
	c, e := newEngine(t, appSet("exited"))
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if j.Result != ResultOK {
		t.Fatalf("job = %+v", j)
	}
	// db must be healthy before api starts; api must be started before web.
	if !(e.idx("start:app-db-1") < e.idx("healthy:app-db-1") && e.idx("healthy:app-db-1") < e.idx("start:app-api-1")) {
		t.Fatalf("api started before db was healthy: %v", e.events)
	}
	if !(e.idx("start:app-cache-1") < e.idx("start:app-api-1") && e.idx("start:app-api-1") < e.idx("start:app-web-1")) {
		t.Fatalf("bad order: %v", e.events)
	}
	if d := stepOf(j, "app-db-1", ActionStart).Detail; d != "sehat" {
		t.Fatalf("db detail = %q", d)
	}
}

func TestStopGoesInReverseOrder(t *testing.T) {
	c, e := newEngine(t, appSet("running"))
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStop); err != nil {
		t.Fatal(err)
	}
	if j := waitJob(t, l, "app"); j.Result != ResultOK {
		t.Fatalf("job = %+v", j)
	}
	// Dependents finish stopping before what they depend on begins to.
	if !(e.idx("stop-end:app-web-1") < e.idx("stop-begin:app-api-1") &&
		e.idx("stop-end:app-api-1") < e.idx("stop-begin:app-db-1") &&
		e.idx("stop-end:app-api-1") < e.idx("stop-begin:app-cache-1")) {
		t.Fatalf("dependencies stopped before their dependents: %v", e.events)
	}
}

func TestRestartIsAFullStopThenStart(t *testing.T) {
	c, e := newEngine(t, appSet("running"))
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionRestart); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if j.Result != ResultOK {
		t.Fatalf("job = %+v", j)
	}
	// Every stop completes before the first start (stale "running" states must not skip the start phase).
	lastStop, firstStart := -1, 1<<30
	for i, ev := range e.events {
		if strings.HasPrefix(ev, "stop-end:") && i > lastStop {
			lastStop = i
		}
		if strings.HasPrefix(ev, "start:") && i < firstStart {
			firstStart = i
		}
	}
	if firstStart == 1<<30 {
		t.Fatalf("restart never started anything (stale state?): %v", e.events)
	}
	if lastStop > firstStart {
		t.Fatalf("a start began before all stops finished: %v", e.events)
	}
	for _, name := range []string{"app-cache-1", "app-db-1", "app-api-1", "app-web-1"} {
		if !e.has("start:" + name) {
			t.Fatalf("%s was not started again: %v", name, e.events)
		}
	}
	if len(j.Steps) != 8 {
		t.Fatalf("want 4 stop + 4 start steps, got %d", len(j.Steps))
	}
}

func TestFailedDependencyTakesItsDependentsDownWithIt(t *testing.T) {
	set := appSet("exited")
	set["c-db"].neverHealthy = true
	c, e := newEngine(t, set)
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if j.Result != ResultPartial {
		t.Fatalf("job = %+v", j)
	}
	if s := stepOf(j, "app-db-1", ActionStart); s.State != StepFailed || !strings.Contains(s.Detail, "belum sehat") {
		t.Fatalf("db step = %+v", s)
	}
	for _, n := range []string{"app-api-1", "app-web-1"} {
		if s := stepOf(j, n, ActionStart); s.State != StepSkipped {
			t.Fatalf("%s should be skipped, got %+v", n, s)
		}
		if e.has("start:" + n) {
			t.Fatalf("%s must not be started on a dependency that never became healthy", n)
		}
	}
	// A service that doesn't depend on the broken one is unaffected.
	if s := stepOf(j, "app-cache-1", ActionStart); s.State != StepOK {
		t.Fatalf("cache step = %+v", s)
	}
	if s := stepOf(j, "app-web-1", ActionStart); !strings.Contains(s.Detail, "api") {
		t.Fatalf("skip reason should name the blocking service: %+v", s)
	}
}

func TestDependencyThatDiesFailsFastNotAtTimeout(t *testing.T) {
	set := appSet("exited")
	set["c-db"].exitsOnStart = 3
	c, _ := newEngine(t, set)
	l := lc(t, c)
	l.within = 30 * time.Second // a fail-fast bug would make this test take 30 s
	start := time.Now()
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if time.Since(start) > 5*time.Second {
		t.Fatal("waited for the timeout although the dependency had already died")
	}
	if s := stepOf(j, "app-db-1", ActionStart); s.State != StepFailed || !strings.Contains(s.Detail, "exit code 3") {
		t.Fatalf("db step = %+v", s)
	}
}

func TestStartFailureIsReportedWithTheDaemonsWords(t *testing.T) {
	set := appSet("exited")
	set["c-cache"].failStart = true
	c, e := newEngine(t, set)
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if s := stepOf(j, "app-cache-1", ActionStart); s.State != StepFailed || !strings.Contains(s.Detail, "driver failed") {
		t.Fatalf("cache step = %+v", s)
	}
	if e.has("start:app-api-1") {
		t.Fatal("api depends on cache and must not start")
	}
	if !e.has("start:app-db-1") {
		t.Fatal("db is independent and must still be started")
	}
}

func TestCompletedSuccessfullyCondition(t *testing.T) {
	build := func(code int) (*Client, *engine) {
		return newEngine(t, map[string]*fakeCtr{
			"c-init": {name: "p-init-1", service: "init", project: "app", state: "exited", exitsOnStart: 0},
			"c-api":  {name: "p-api-1", service: "api", project: "app", state: "exited", dependsOn: "init:service_completed_successfully:false"},
		})
	}
	// init exits 0 → api proceeds.
	c, e := build(0)
	e.ctrs["c-init"].exitsOnStart = 0
	e.ctrs["c-init"].hasHealth = false
	l := lc(t, c)
	// A "start" that finishes with exit 0: the fake only exits when exitsOnStart>0, so model success as 1→0 via state.
	e.ctrs["c-init"].state = "exited"
	// emulate: start → immediately exited with code 0
	e.ctrs["c-init"].exitsOnStart = 0
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	// With exit 0 the fake leaves the container "running"; mark it finished so the wait can complete.
	go func() {
		for i := 0; i < 200; i++ {
			e.mu.Lock()
			if e.ctrs["c-init"].state == "running" {
				e.ctrs["c-init"].state, e.ctrs["c-init"].exit = "exited", 0
			}
			e.mu.Unlock()
			time.Sleep(time.Millisecond)
		}
	}()
	j := waitJob(t, l, "app")
	if j.Result != ResultOK || !e.has("start:p-api-1") {
		t.Fatalf("api must start after init completed successfully: %+v events=%v", j, e.events)
	}

	// init exits non-zero → api skipped.
	c2, e2 := build(1)
	e2.ctrs["c-init"].exitsOnStart = 1
	l2 := lc(t, c2)
	if _, err := l2.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	j2 := waitJob(t, l2, "app")
	if s := stepOf(j2, "p-init-1", ActionStart); s.State != StepFailed || !strings.Contains(s.Detail, "exit code 1") {
		t.Fatalf("init step = %+v", s)
	}
	if e2.has("start:p-api-1") || stepOf(j2, "p-api-1", ActionStart).State != StepSkipped {
		t.Fatalf("api must be skipped when init failed: %v", e2.events)
	}
}

func TestNoHealthcheckIsTreatedAsReadyWhenRunning(t *testing.T) {
	set := appSet("exited")
	set["c-db"].hasHealth = false // service_healthy dependency without a healthcheck
	c, _ := newEngine(t, set)
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if j.Result != ResultOK {
		t.Fatalf("job = %+v", j)
	}
	if d := stepOf(j, "app-db-1", ActionStart).Detail; !strings.Contains(d, "tanpa healthcheck") {
		t.Fatalf("db detail = %q", d)
	}
}

func TestAlreadyRunningAndPausedAreHandled(t *testing.T) {
	set := appSet("running")
	set["c-cache"].state = "paused"
	set["c-web"].state = "exited"
	c, e := newEngine(t, set)
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if j.Result != ResultOK {
		t.Fatalf("job = %+v", j)
	}
	if e.has("start:app-db-1") || e.has("start:app-api-1") {
		t.Fatalf("containers already running must not be started again: %v", e.events)
	}
	if !e.has("unpause:app-cache-1") || !e.has("start:app-web-1") {
		t.Fatalf("paused → unpause, exited → start: %v", e.events)
	}
	if d := stepOf(j, "app-db-1", ActionStart).Detail; d == "" {
		t.Fatal("a skipped start should say why")
	}
}

func TestStopOnAnAlreadyStoppedAppDoesNothing(t *testing.T) {
	c, e := newEngine(t, appSet("exited"))
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStop); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if j.Result != ResultOK || len(e.events) != 0 {
		t.Fatalf("job=%+v events=%v", j, e.events)
	}
	if d := stepOf(j, "app-db-1", ActionStop).Detail; d != "sudah berhenti" {
		t.Fatalf("detail = %q", d)
	}
}

func TestOnlyOneJobPerProject(t *testing.T) {
	set := appSet("running")
	set["x-other"] = &fakeCtr{name: "other-1", service: "svc", project: "other", state: "running"}
	c, e := newEngine(t, set)
	e.stopDelay = 80 * time.Millisecond
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStop); err != nil {
		t.Fatal(err)
	}
	if _, err := l.Run(t.Context(), "app", ActionRestart); err != ErrBusyProject {
		t.Fatalf("second action on a busy project: %v, want ErrBusyProject", err)
	}
	if _, err := l.Run(t.Context(), "other", ActionStop); err != nil {
		t.Fatalf("a different project must not be blocked: %v", err)
	}
	waitJob(t, l, "app")
	waitJob(t, l, "other")
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatalf("after completion a new action is accepted: %v", err)
	}
	waitJob(t, l, "app")
}

func TestRunValidation(t *testing.T) {
	c, _ := newEngine(t, appSet("running"))
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", "reboot"); err != ErrInvalidAction {
		t.Fatalf("invalid action: %v", err)
	}
	if _, err := l.Run(t.Context(), "no-such-project", ActionStart); err != ErrProjectNotFound {
		t.Fatalf("unknown project: %v", err)
	}
	if _, ok := l.Job("app"); ok {
		t.Fatal("a rejected request must not create a job")
	}
}

func TestCyclicDependenciesStillRun(t *testing.T) {
	c, e := newEngine(t, map[string]*fakeCtr{
		"c-a": {name: "a-1", service: "a", project: "app", state: "exited", dependsOn: "b:service_started:false"},
		"c-b": {name: "b-1", service: "b", project: "app", state: "exited", dependsOn: "a:service_started:false"},
	})
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStart); err != nil {
		t.Fatal(err)
	}
	j := waitJob(t, l, "app")
	if !e.has("start:a-1") || !e.has("start:b-1") {
		t.Fatalf("a dependency cycle must not stop containers from starting: %+v %v", j, e.events)
	}
}

func TestJobIsRetainedAfterCompletion(t *testing.T) {
	c, _ := newEngine(t, appSet("running"))
	l := lc(t, c)
	if _, err := l.Run(t.Context(), "app", ActionStop); err != nil {
		t.Fatal(err)
	}
	waitJob(t, l, "app")
	j, ok := l.Job("app")
	if !ok || j.Phase != JobDone || j.Action != ActionStop || j.FinishedAt.IsZero() || len(j.Steps) != 4 {
		t.Fatalf("job = %+v ok=%v", j, ok)
	}
}

func TestStopContainerOutlivesTheClientTimeout(t *testing.T) {
	// A container that takes longer than the client's 10 s HTTP timeout to stop
	// (Docker's own default grace period is 10 s) must not be reported as failed.
	c, e := newEngine(t, map[string]*fakeCtr{"c1": {name: "slow", service: "s", project: "p", state: "running"}})
	c.http.Timeout = 50 * time.Millisecond
	e.stopDelay = 200 * time.Millisecond
	if err := c.StopContainer(t.Context(), "c1"); err != nil {
		t.Fatalf("slow stop reported as failure: %v", err)
	}
}
