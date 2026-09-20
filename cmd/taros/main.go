// Command taros is the TarOS service entrypoint. Run without
// arguments to start the web server, or `taros setup` once to create
// the admin credentials — see docs/09-deployment.md §9.2.
package main

import (
	"bufio"
	"context"
	"flag"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"runtime"
	"strings"
	"syscall"
	"time"

	"golang.org/x/term"

	"github.com/tarkiman/taros/internal/appmeta"
	"github.com/tarkiman/taros/internal/auth"
	"github.com/tarkiman/taros/internal/collector"
	"github.com/tarkiman/taros/internal/config"
	"github.com/tarkiman/taros/internal/docker"
	"github.com/tarkiman/taros/internal/fileexplorer"
	"github.com/tarkiman/taros/internal/foldershortcuts"
	"github.com/tarkiman/taros/internal/notify"
	"github.com/tarkiman/taros/internal/quicklinks"
	"github.com/tarkiman/taros/internal/store"
	"github.com/tarkiman/taros/internal/terminal"
	"github.com/tarkiman/taros/internal/web"
)

// version is set at build time via -ldflags "-X main.version=vX.Y.Z" (see
// .github/workflows/release.yml) — "dev" for a plain local `go build`.
var version = "dev"

func main() {
	if len(os.Args) > 1 && (os.Args[1] == "version" || os.Args[1] == "--version") {
		fmt.Println("taros " + version)
		return
	}
	if len(os.Args) > 1 && os.Args[1] == "setup" {
		runSetup(os.Args[2:])
		return
	}
	runServer(os.Args[1:])
}

func runServer(args []string) {
	fs := flag.NewFlagSet("taros", flag.ExitOnError)
	configPath := fs.String("config", "./config.yaml", "path to config.yaml")
	_ = fs.Parse(args)

	cfg, err := config.Load(*configPath)
	if err != nil {
		slog.Error("load config", "err", err)
		os.Exit(1)
	}

	creds, err := auth.LoadCredentials(cfg.Auth.CredentialsFile)
	if err != nil {
		slog.Error("load credentials — run `taros setup` first", "err", err)
		os.Exit(1)
	}

	sessions := auth.NewSessionStore(time.Duration(cfg.Auth.SessionIdleTimeoutMin) * time.Minute)
	rateLimiter := auth.NewLoginRateLimiter(cfg.Auth.LoginRateLimitAttempts, time.Duration(cfg.Auth.LoginRateLimitWindowSec)*time.Second)

	fastInterval := time.Duration(cfg.Polling.CPUMemNetIntervalSec) * time.Second
	metricsStore := store.New(15*time.Minute, map[string]time.Duration{
		store.SeriesCPUTotalPercent:   fastInterval,
		store.SeriesMemUsedPercent:    fastInterval,
		store.SeriesDiskReadBytesSec:  fastInterval,
		store.SeriesDiskWriteBytesSec: fastInterval,
		store.SeriesTempMaxCelsius:    time.Duration(cfg.Polling.TempIntervalSec) * time.Second,
	})

	ctx, stop := signal.NotifyContext(context.Background(), os.Interrupt, syscall.SIGTERM)
	defer stop()

	// internal/collector reads /proc directly (no gopsutil, see its
	// package doc) — that only exists on Linux. Starting it anyway on
	// e.g. macOS wouldn't crash (every read failure is already handled
	// gracefully, see internal/collector), but it would spin forever
	// logging failed /proc reads for a feature the UI is about to tell
	// the user isn't available anyway (web.Deps.SystemMonitoringSupported,
	// checked by handleMetricsStream/History/Processes) — better to just
	// not start it.
	systemMonitoringSupported := runtime.GOOS == "linux"
	if systemMonitoringSupported {
		coll := collector.New(metricsStore)
		go coll.Run(ctx, collector.Intervals{
			CPUMemNet: fastInterval,
			DiskUsage: time.Duration(cfg.Polling.DiskUsageIntervalSec) * time.Second,
			Temp:      time.Duration(cfg.Polling.TempIntervalSec) * time.Second,
			Proc:      time.Duration(cfg.Polling.ProcIntervalSec) * time.Second,
		})
	} else {
		slog.Warn("monitoring resource sistem (Dashboard/Proses) tidak didukung di OS ini — butuh Linux", "os", runtime.GOOS)
	}

	protectedUnits := make(map[string]bool, len(cfg.Systemd.ProtectedUnits))
	for _, u := range cfg.Systemd.ProtectedUnits {
		protectedUnits[u] = true
	}

	jail, err := fileexplorer.NewJail(cfg.FileExplorer.RootDir, cfg.FileExplorer.Blocklist)
	if err != nil {
		slog.Error("init file explorer jail", "err", err)
		os.Exit(1)
	}
	// Warning, not fatal — read-only rootDir is a valid choice, and the
	// alternative (discovering this only when a user's paste/upload fails)
	// is a worse first experience. See docs/09-deployment.md §9.2.
	if err := jail.CheckWritable(); err != nil {
		slog.Warn("file explorer root mungkin tidak writable oleh user servis ini — upload/paste/rename/delete akan gagal saat dipakai; lihat docs/09-deployment.md §9.2", "err", err)
	}
	jobQueue := fileexplorer.NewJobQueue(cfg.FileExplorer.MaxConcurrentOps, fileexplorer.CopyOptions{
		BufferBytes:         256 * 1024,
		ThrottleBytesPerSec: int64(cfg.FileExplorer.CopyThrottleMBps) * 1024 * 1024,
		SyncEveryBytes:      int64(cfg.FileExplorer.CopySyncEveryMB) * 1024 * 1024,
	})

	// A load failure here (corrupt YAML, unreadable file) is logged, not
	// fatal — this is optional Dashboard customization, not core to the
	// app; falling back to an empty, unsaved store lets the rest of TarOS
	// come up normally instead of the whole service refusing to start over
	// a broken quick-links.yaml.
	appMeta, err := appmeta.Load(cfg.Dashboard.AppsFile)
	if err != nil {
		slog.Warn("gagal load kustomisasi aplikasi, mulai kosong", "path", cfg.Dashboard.AppsFile, "err", err)
		appMeta = appmeta.New(cfg.Dashboard.AppsFile)
	}

	quickLinks, err := quicklinks.Load(cfg.Dashboard.QuickLinksFile)
	if err != nil {
		slog.Warn("gagal load quick links, mulai dengan daftar kosong", "path", cfg.Dashboard.QuickLinksFile, "err", err)
		quickLinks = quicklinks.New(cfg.Dashboard.QuickLinksFile)
	}

	// Same "non-critical, don't block startup" reasoning as quickLinks
	// above — a corrupt notify.yaml just means alerting starts disabled
	// until re-saved from the Settings page, not a service that refuses
	// to start.
	notifySettings, err := notify.Load(cfg.Notify.SettingsFile)
	if err != nil {
		slog.Warn("gagal load pengaturan notifikasi, mulai dengan default (nonaktif)", "path", cfg.Notify.SettingsFile, "err", err)
		notifySettings = notify.New(cfg.Notify.SettingsFile)
	}
	if systemMonitoringSupported {
		notifyMonitor := notify.NewMonitor(metricsStore, notifySettings)
		go notifyMonitor.Run(ctx, 10*time.Second)
	}

	// Same "non-critical, don't block startup" reasoning as quickLinks
	// above.
	folderShortcuts, err := foldershortcuts.Load(cfg.FolderShortcuts.SettingsFile)
	if err != nil {
		slog.Warn("gagal load folder shortcuts, mulai dengan daftar kosong", "path", cfg.FolderShortcuts.SettingsFile, "err", err)
		folderShortcuts = foldershortcuts.New(cfg.FolderShortcuts.SettingsFile)
	}

	deps := web.Deps{
		Sessions:                  sessions,
		Creds:                     creds,
		RateLimiter:               rateLimiter,
		Store:                     metricsStore,
		SSEInterval:               fastInterval,
		DockerEnabled:             cfg.Docker.Enabled,
		ProtectedUnits:            protectedUnits,
		Jail:                      jail,
		Jobs:                      jobQueue,
		MaxUploadSizeMB:           cfg.FileExplorer.MaxUploadSizeMB,
		Version:                   version,
		UpdateEnabled:             cfg.Update.Enabled,
		ConfigPath:                *configPath,
		CredentialsPath:           cfg.Auth.CredentialsFile,
		Listen:                    cfg.Server.Listen,
		SystemMonitoringSupported: systemMonitoringSupported,
		QuickLinks:                quickLinks,
		AppMeta:                   appMeta,
		Notify:                    notifySettings,
		FolderShortcuts:           folderShortcuts,
		DiskAnalysisEnabled:       cfg.DiskAnalysis.Enabled,
	}
	if cfg.Docker.Enabled {
		dockerClient := docker.NewClient(cfg.Docker.SocketPath)
		dockerWatcher := docker.NewWatcher(dockerClient)
		go dockerWatcher.Run(ctx, time.Duration(cfg.Docker.WatchIntervalSec)*time.Second)
		deps.Docker = dockerClient
		deps.DockerWatcher = dockerWatcher
		// Container-health alerts (crash loops, unhealthy, unexpected exits):
		// idle unless enabled in Settings > Notifications, so this costs one
		// settings read per tick by default.
		go notify.NewContainerMonitor(dockerClient, notifySettings).Run(ctx, 30*time.Second)
	}
	if cfg.Terminal.Enabled {
		deps.TerminalEnabled = true
		deps.TerminalManager = terminal.NewManager(
			cfg.Terminal.Shell,
			cfg.Terminal.MaxConcurrentSessions,
			time.Duration(cfg.Terminal.IdleTimeoutMin)*time.Minute,
		)
	}
	if cfg.DiskAnalysis.Enabled {
		deps.DiskAnalysisScanner = fileexplorer.NewDiskAnalysisScanner(
			jail,
			fileexplorer.ScanOptions{
				YieldEveryFiles: cfg.DiskAnalysis.ThrottleEveryFiles,
				YieldSleep:      time.Duration(cfg.DiskAnalysis.ThrottleSleepMs) * time.Millisecond,
			},
			time.Duration(cfg.DiskAnalysis.TimeoutSec)*time.Second,
		)
	}

	srv := web.NewServer(deps)

	httpServer := &http.Server{Addr: cfg.Server.Listen, Handler: srv.Handler()}
	go func() {
		<-ctx.Done()
		shutdownCtx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
		defer cancel()
		_ = httpServer.Shutdown(shutdownCtx)
	}()

	slog.Info("taros starting", "version", version, "listen", cfg.Server.Listen)
	if err := httpServer.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		slog.Error("server stopped", "err", err)
		os.Exit(1)
	}
}

func runSetup(args []string) {
	fs := flag.NewFlagSet("taros setup", flag.ExitOnError)
	configPath := fs.String("config", "./config.yaml", "path to config.yaml")
	_ = fs.Parse(args)

	cfg, err := config.Load(*configPath)
	if err != nil {
		fmt.Fprintln(os.Stderr, "load config:", err)
		os.Exit(1)
	}

	// `taros setup` only ever bootstraps the *first* account now — TarOS
	// supports multiple accounts (see docs/10-roadmap.md), and letting
	// this overwrite an existing credentials.yaml would silently delete
	// every other account, not just reset "the" one admin like before.
	// Adding accounts after the first goes through Settings > Kelola
	// Pengguna instead (docs/04-features.md §4.7).
	if _, err := os.Stat(cfg.Auth.CredentialsFile); err == nil {
		fmt.Fprintln(os.Stderr, "credentials.yaml sudah ada di", cfg.Auth.CredentialsFile)
		fmt.Fprintln(os.Stderr, "untuk tambah akun baru, login lalu buka Settings > Kelola Pengguna.")
		fmt.Fprintln(os.Stderr, "untuk reset total, hapus file itu dulu lalu jalankan ulang perintah ini.")
		os.Exit(1)
	}

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Username admin: ")
	username, _ := reader.ReadString('\n')
	username = strings.TrimSpace(username)

	password, err := readPassword(reader, "Password: ")
	if err != nil {
		fmt.Fprintln(os.Stderr, "read password:", err)
		os.Exit(1)
	}
	confirm, err := readPassword(reader, "Ulangi password: ")
	if err != nil {
		fmt.Fprintln(os.Stderr, "read password:", err)
		os.Exit(1)
	}
	if password != confirm {
		fmt.Fprintln(os.Stderr, "password tidak sama")
		os.Exit(1)
	}
	if username == "" || password == "" {
		fmt.Fprintln(os.Stderr, "username/password tidak boleh kosong")
		os.Exit(1)
	}

	if err := auth.SaveCredentials(cfg.Auth.CredentialsFile, username, password); err != nil {
		fmt.Fprintln(os.Stderr, "save credentials:", err)
		os.Exit(1)
	}
	fmt.Println("Kredensial admin tersimpan di", cfg.Auth.CredentialsFile)
}

// readPassword hides input when run in an interactive terminal, and falls
// back to reading a line from the shared reader otherwise (piped input for
// scripted use — a fresh bufio.Reader here would drop already-buffered
// bytes read ahead by the caller's reader).
func readPassword(fallback *bufio.Reader, prompt string) (string, error) {
	fmt.Print(prompt)
	if term.IsTerminal(int(os.Stdin.Fd())) {
		b, err := term.ReadPassword(int(os.Stdin.Fd()))
		fmt.Println()
		return string(b), err
	}
	line, err := fallback.ReadString('\n')
	return strings.TrimSpace(line), err
}
