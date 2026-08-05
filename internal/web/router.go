package web

import (
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/auth"
	"github.com/tarkiman/taros/internal/docker"
	"github.com/tarkiman/taros/internal/fileexplorer"
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
	mux.HandleFunc("GET /files", s.serveSPA)
	mux.HandleFunc("GET /files/edit", s.serveSPA)
	mux.HandleFunc("GET /terminal", s.serveSPA)
	mux.Handle("GET /assets/", spaAssets)

	mux.HandleFunc("POST /api/auth/login", s.handleAuthLogin)
	mux.HandleFunc("GET /api/auth/session", s.handleAuthSession)
	mux.HandleFunc("POST /api/auth/logout", s.requireAuth(s.handleLogout))

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

	// /api/update/check always registered (same "show a clear disabled
	// state" reasoning as terminal/status above); /apply checks
	// UpdateEnabled itself rather than being conditionally routed, since
	// unlike the terminal WS it's not a standing connection someone could
	// discover by scanning — a plain disabled response is enough.
	mux.HandleFunc("GET /api/update/check", s.requireAuth(s.handleUpdateCheck))
	mux.HandleFunc("POST /api/update/apply", s.requireAuth(s.handleUpdateApply))

	return recoverMiddleware(loggingMiddleware(mux))
}
