package web

import (
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/auth"
	"github.com/tarkiman/taros/internal/docker"
	"github.com/tarkiman/taros/internal/fileexplorer"
	"github.com/tarkiman/taros/internal/notify"
	"github.com/tarkiman/taros/internal/quicklinks"
	"github.com/tarkiman/taros/internal/store"
	"github.com/tarkiman/taros/internal/terminal"
)

// Deps are every dependency Server's handlers need. Passed as a struct
// (rather than a growing positional-argument list) since Fase 2 already
// pushed this past what's comfortable to call positionally.
type Deps struct {
	Sessions    *auth.SessionStore
	Creds       *auth.Credentials
	RateLimiter *auth.LoginRateLimiter
	Store       *store.Store
	SSEInterval time.Duration

	// Docker is nil when docker.enabled=false in config — handlers must
	// check DockerEnabled before dereferencing it. See
	// docs/04-features.md §4.2 "Graceful Degradation".
	DockerEnabled bool
	Docker        *docker.Client
	DockerWatcher *docker.Watcher

	// ProtectedUnits get an extra-emphatic confirmation before stop/restart
	// — see docs/07-security.md.
	ProtectedUnits map[string]bool

	// Jail scopes every file explorer operation — see docs/07-security.md §7.3.
	Jail *fileexplorer.Jail
	// Jobs runs copy/move operations — see docs/04-features.md §4.4.
	Jobs            *fileexplorer.JobQueue
	MaxUploadSizeMB int

	// TerminalManager is nil when TerminalEnabled is false — the WS route
	// isn't registered at all in that case (see Handler below), matching
	// docs/07-security.md §7.6 ("dihapus sepenuhnya dari routing, bukan
	// cuma disembunyikan"), so handlers never need to nil-check this.
	TerminalEnabled bool
	TerminalManager *terminal.Manager

	// Version is this build's version string ("dev" for a plain local
	// build) — see cmd/taros/main.go. UpdateEnabled gates
	// /api/update/apply; /api/update/check stays registered either way so
	// the UI can show a clear "disabled" state, same pattern as terminal
	// status. See internal/selfupdate.
	Version       string
	UpdateEnabled bool

	// ConfigPath is the config.yaml this process was started with — used
	// by the Settings page's "toggle terminal from the browser" action
	// (internal/config.SetTerminalEnabled) to edit the file a running,
	// unprivileged service process can otherwise only ever read. See
	// docs/09-deployment.md for why config.yaml is writable by the
	// service user in the first place (same reasoning as /opt/taros/ for
	// self-update — see internal/selfupdate).
	ConfigPath string

	// CredentialsPath is cfg.Auth.CredentialsFile — needed at request time
	// (not just at startup) for TOTP setup/disable and backup-code
	// consumption, all of which persist an update to the same file
	// *Credentials was originally loaded from. See internal/auth
	// (credentials.go, totp.go) and docs/07-security.md §7.1.
	CredentialsPath string

	// Listen is cfg.Server.Listen at startup — a snapshot, same pattern as
	// TerminalEnabled above, not re-read from disk per request. Shown by
	// the Settings page's port-change status endpoint.
	Listen string

	// SystemMonitoringSupported is runtime.GOOS == "linux" — the resource
	// collector (internal/collector) reads /proc directly (no gopsutil,
	// see its package doc) and Service monitoring shells out to systemd,
	// neither of which exist outside Linux. False on darwin (macOS build,
	// see docs/09-deployment.md) — handlers gate on this the same way
	// DockerEnabled is checked above, and cmd/taros/main.go skips starting
	// the collector goroutine entirely when it's false rather than let it
	// spin forever logging failed /proc reads.
	SystemMonitoringSupported bool

	// QuickLinks holds the user's custom Dashboard shortcut tiles — see
	// internal/quicklinks and docs/04-features.md §4.1 "Akses Cepat
	// (Custom)". Unlike most Deps here, mutated directly by its own
	// handlers (no restart-and-reload), so it's always non-nil.
	QuickLinks *quicklinks.Store

	// Notify holds Discord alert settings (webhook URL, CPU/RAM/temp
	// thresholds+durations) — see internal/notify and
	// docs/04-features.md §4.11. Same "mutated directly, no restart"
	// shape as QuickLinks above, always non-nil.
	Notify *notify.Store
}

// Server holds everything HTTP handlers need. It has no framework
// dependency — just the stdlib net/http (Go 1.22+ pattern-matching
// ServeMux), see docs/03-tech-stack.md.
type Server struct {
	deps Deps
}

func NewServer(deps Deps) *Server {
	return &Server{deps: deps}
}

func (s *Server) Handler() http.Handler {
	mux := http.NewServeMux()

	// Vue-owned routes — see web/frontend/src/router/index.ts. Auth is
	// enforced client-side (router guard) plus server-side on every API
	// call; the shell itself is public HTML like any SPA's index.html.
	mux.HandleFunc("GET /{$}", s.serveSPA)
	mux.HandleFunc("GET /login", s.serveSPA)
	mux.HandleFunc("GET /docker", s.serveSPA)
	mux.HandleFunc("GET /services", s.serveSPA)
	mux.HandleFunc("GET /processes", s.serveSPA)
	mux.HandleFunc("GET /files", s.serveSPA)
	mux.HandleFunc("GET /files/edit", s.serveSPA)
	mux.HandleFunc("GET /terminal", s.serveSPA)
	mux.HandleFunc("GET /settings", s.serveSPA)
	mux.Handle("GET /assets/", spaAssets)

	mux.HandleFunc("POST /api/auth/login", s.handleAuthLogin)
	mux.HandleFunc("GET /api/auth/session", s.handleAuthSession)
	mux.HandleFunc("POST /api/auth/logout", s.requireAuth(s.handleLogout))

	// Always registered, same "let the UI show a clear state up front"
	// reasoning as /api/terminal/status — checked by the Dashboard/Proses
	// pages before they ever open the metrics SSE stream, since a plain
	// EventSource has no clean way to signal "this will never send data"
	// (a 503 from the stream endpoint itself just makes the browser retry
	// forever) — see docs/04-features.md §4.2 "Graceful Degradation".
	mux.HandleFunc("GET /api/system/monitoring-status", s.requireAuth(s.handleSystemMonitoringStatus))
	mux.HandleFunc("GET /api/stream/metrics", s.requireAuth(s.handleMetricsStream))
	mux.HandleFunc("GET /api/metrics/history", s.requireAuth(s.handleMetricsHistory))
	mux.HandleFunc("GET /api/processes", s.requireAuth(s.handleProcesses))

	mux.HandleFunc("GET /api/docker/containers", s.requireAuth(s.handleAPIDockerContainers))
	mux.HandleFunc("GET /api/docker/images", s.requireAuth(s.handleAPIDockerImages))
	mux.HandleFunc("GET /api/docker/volumes", s.requireAuth(s.handleAPIDockerVolumes))
	mux.HandleFunc("GET /api/docker/networks", s.requireAuth(s.handleAPIDockerNetworks))
	mux.HandleFunc("GET /api/docker/settings", s.requireAuth(s.handleAPIDockerSettings))
	mux.HandleFunc("POST /api/docker/containers/{id}/{action}", s.requireAuth(s.handleAPIDockerContainerAction))
	mux.HandleFunc("POST /api/docker/images/{id}/remove", s.requireAuth(s.handleAPIDockerImageRemove))
	mux.HandleFunc("POST /api/docker/volumes/{name}/remove", s.requireAuth(s.handleAPIDockerVolumeRemove))
	mux.HandleFunc("POST /api/docker/networks/{id}/remove", s.requireAuth(s.handleAPIDockerNetworkRemove))
	mux.HandleFunc("POST /api/docker/prune/{kind}", s.requireAuth(s.handleAPIDockerPrune))

	mux.HandleFunc("GET /api/services/list", s.requireAuth(s.handleAPIServicesList))
	mux.HandleFunc("POST /api/services/{name}/{action}", s.requireAuth(s.handleAPIServiceAction))
	mux.HandleFunc("GET /api/services/{name}/logs", s.requireAuth(s.handleAPIServiceLogs))

	mux.HandleFunc("GET /api/files/list", s.requireAuth(s.handleAPIFilesList))
	mux.HandleFunc("POST /api/files/op", s.requireAuth(s.handleFilesOp))
	mux.HandleFunc("GET /api/files/op/{jobId}/stream", s.requireAuth(s.handleFilesOpStream))
	mux.HandleFunc("POST /api/files/op/{jobId}/cancel", s.requireAuth(s.handleFilesOpCancel))
	mux.HandleFunc("POST /api/files/upload", s.requireAuth(s.handleFilesUpload))
	mux.HandleFunc("GET /api/files/download", s.requireAuth(s.handleFilesDownload))
	mux.HandleFunc("GET /api/files/content", s.requireAuth(s.handleFilesContentGet))
	mux.HandleFunc("PUT /api/files/content", s.requireAuth(s.handleFilesContentPut))

	// Always registered, regardless of terminal.enabled, so the Vue page
	// can show a clear "not enabled" state instead of a failed connection.
	mux.HandleFunc("GET /api/terminal/status", s.requireAuth(s.handleAPITerminalStatus))
	// The actual WS endpoint is only registered when enabled — see
	// docs/07-security.md §7.6 (highest risk-surface feature; removed from
	// routing entirely when off, not just hidden client-side).
	if s.deps.TerminalEnabled {
		mux.HandleFunc("GET /api/terminal/ws", s.requireAuth(s.handleTerminalWS))
	}
	// Always registered (like /api/terminal/status above) — turning it ON
	// this way is exactly how someone with it off would get to it.
	// Password-gated inside the handler itself (docs/07-security.md §7.6):
	// this flips the app's highest-risk feature, so an active dashboard
	// session alone isn't enough, same as the docker-group/root-mode
	// install-time prompts require a conscious "yes", not a default.
	mux.HandleFunc("POST /api/settings/terminal", s.requireAuth(s.handleSettingsTerminal))

	// Port config — same password-gated restart-and-reload mechanism as
	// the terminal toggle above (changing this can lock someone out of
	// the dashboard if the new port is wrong, so it gets the same
	// conscious-confirmation bar). GET always registered so the Settings
	// page can show the current port on load.
	mux.HandleFunc("GET /api/settings/port", s.requireAuth(s.handleSettingsPortStatus))
	mux.HandleFunc("POST /api/settings/port", s.requireAuth(s.handleSettingsPort))

	// TOTP (2FA) settings — see internal/auth/totp.go and
	// docs/07-security.md §7.1. Setup/confirm only ever *add* protection
	// (no password re-check needed, see handlers_totp.go); disable
	// removes it, so it's gated the same way as the terminal toggle.
	mux.HandleFunc("GET /api/settings/totp/status", s.requireAuth(s.handleSettingsTOTPStatus))
	mux.HandleFunc("POST /api/settings/totp/setup", s.requireAuth(s.handleSettingsTOTPSetup))
	mux.HandleFunc("POST /api/settings/totp/confirm", s.requireAuth(s.handleSettingsTOTPConfirm))
	mux.HandleFunc("POST /api/settings/totp/disable", s.requireAuth(s.handleSettingsTOTPDisable))

	// /api/update/check always registered (same "show a clear disabled
	// state" reasoning as terminal/status above); /apply checks
	// UpdateEnabled itself rather than being conditionally routed, since
	// unlike the terminal WS it's not a standing connection someone could
	// discover by scanning — a plain disabled response is enough.
	mux.HandleFunc("GET /api/update/check", s.requireAuth(s.handleUpdateCheck))
	mux.HandleFunc("POST /api/update/apply", s.requireAuth(s.handleUpdateApply))

	// Dashboard "Akses Cepat (Custom)" tiles — see internal/quicklinks and
	// docs/04-features.md §4.1. No password re-confirmation like the
	// terminal/port toggles above: this is just personal bookmark-style
	// data, not a privilege flip.
	mux.HandleFunc("GET /api/quick-links", s.requireAuth(s.handleQuickLinksList))
	mux.HandleFunc("POST /api/quick-links", s.requireAuth(s.handleQuickLinksCreate))
	mux.HandleFunc("PUT /api/quick-links/{id}", s.requireAuth(s.handleQuickLinksUpdate))
	mux.HandleFunc("DELETE /api/quick-links/{id}", s.requireAuth(s.handleQuickLinksDelete))

	// Discord alert settings — see internal/notify and
	// docs/04-features.md §4.11. Same "no password re-confirmation" reasoning
	// as quick links above: this doesn't restart the service or grant any
	// new capability, it just changes what gets posted to the user's own
	// Discord webhook.
	mux.HandleFunc("GET /api/notify/settings", s.requireAuth(s.handleNotifyGet))
	mux.HandleFunc("PUT /api/notify/settings", s.requireAuth(s.handleNotifyUpdate))
	mux.HandleFunc("POST /api/notify/test", s.requireAuth(s.handleNotifyTest))

	return recoverMiddleware(loggingMiddleware(mux))
}
