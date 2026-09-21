// Package config loads TarOS's YAML configuration file.
//
// Only the sections implemented so far are parsed. Later fases (file
// explorer, terminal, ...) will extend this struct as those features land
// — see docs/09-deployment.md for the eventual full shape.
package config

import (
	"fmt"
	"os"
	"path/filepath"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Server          ServerConfig          `yaml:"server"`
	Auth            AuthConfig            `yaml:"auth"`
	Polling         PollingConfig         `yaml:"polling"`
	Docker          DockerConfig          `yaml:"docker"`
	Systemd         SystemdConfig         `yaml:"systemd"`
	FileExplorer    FileExplorerConfig    `yaml:"fileExplorer"`
	Terminal        TerminalConfig        `yaml:"terminal"`
	Update          UpdateConfig          `yaml:"update"`
	Dashboard       DashboardConfig       `yaml:"dashboard"`
	Notify          NotifyConfig          `yaml:"notify"`
	FolderShortcuts FolderShortcutsConfig `yaml:"folderShortcuts"`
	BootLog         BootLogConfig         `yaml:"bootLog"`
	Wifi            WifiConfig            `yaml:"wifi"`
	DiskAnalysis    DiskAnalysisConfig    `yaml:"diskAnalysis"`
}

type ServerConfig struct {
	Listen string `yaml:"listen"`
}

type AuthConfig struct {
	// CredentialsFile holds the bcrypt-hashed admin username/password,
	// managed separately from this config file (see `taros setup`).
	CredentialsFile string `yaml:"credentialsFile"`
	// SessionIdleTimeoutMin is how long an idle session stays valid.
	SessionIdleTimeoutMin int `yaml:"sessionIdleTimeoutMin"`
	// LoginRateLimitAttempts/Window bound failed login attempts per IP.
	LoginRateLimitAttempts  int `yaml:"loginRateLimitAttempts"`
	LoginRateLimitWindowSec int `yaml:"loginRateLimitWindowSec"`
}

// PollingConfig sets collector intervals — see docs/04-features.md §4.1.
type PollingConfig struct {
	CPUMemNetIntervalSec int `yaml:"cpuMemNetIntervalSec"`
	DiskUsageIntervalSec int `yaml:"diskUsageIntervalSec"`
	TempIntervalSec      int `yaml:"tempIntervalSec"`
	// ProcIntervalSec is deliberately slower than cpuMemNetIntervalSec:
	// listing /proc and reading two files per PID is real work on a
	// hundred-plus-process system, and unlike CPU/RAM this doesn't feed
	// the always-on SSE stream — it's only read when someone actually
	// opens the process view, so there's no reason to pay for it every
	// couple seconds regardless of whether anyone's looking.
	ProcIntervalSec int `yaml:"procIntervalSec"`
}

// DockerConfig — see docs/04-features.md §4.2. WatchIntervalSec is a
// target, not a guarantee: refreshing container stats is self-throttling
// (internal/docker.Watcher), so on a host with many containers the actual
// cadence can end up slower than this.
type DockerConfig struct {
	Enabled          bool   `yaml:"enabled"`
	SocketPath       string `yaml:"socketPath"`
	WatchIntervalSec int    `yaml:"watchIntervalSec"`
}

// SystemdConfig — see docs/04-features.md §4.3 & docs/07-security.md.
// ProtectedUnits get an extra, more emphatic confirmation before
// stop/restart so they don't get taken down by accident.
type SystemdConfig struct {
	ProtectedUnits []string `yaml:"protectedUnits"`
}

// FileExplorerConfig — see docs/04-features.md §4.4 & docs/07-security.md §7.3.
type FileExplorerConfig struct {
	RootDir   string   `yaml:"rootDir"`
	Blocklist []string `yaml:"blocklist"`

	MaxUploadSizeMB  int `yaml:"maxUploadSizeMB"`
	MaxConcurrentOps int `yaml:"maxConcurrentOps"`
	// CopyThrottleMBps: 0 = unbounded. Set on slow storage (STB eMMC/SD) to
	// avoid outrunning the device's write speed — see
	// docs/04-features.md §4.4 "Keandalan Operasi File Besar/Banyak".
	CopyThrottleMBps int `yaml:"copyThrottleMBps"`
	CopySyncEveryMB  int `yaml:"copySyncEveryMB"`
}

// TerminalConfig — see docs/04-features.md §4.5 & docs/07-security.md §7.6.
// Disabled by default: this is the highest-risk feature in the app (real
// shell access), so it must be a deliberate opt-in, not an implicit
// default. When Enabled is false, the WebSocket route isn't registered at
// all (see internal/web/router.go) — not just hidden client-side.
type TerminalConfig struct {
	Enabled bool `yaml:"enabled"`
	// Shell is explicit, not read from the service user's /etc/passwd
	// entry — that account is typically created with shell=nologin for
	// security (docs/09-deployment.md §9.2), which would otherwise make
	// every session exit immediately.
	Shell                 string `yaml:"shell"`
	IdleTimeoutMin        int    `yaml:"idleTimeoutMin"`
	MaxConcurrentSessions int    `yaml:"maxConcurrentSessions"`
}

// DiskAnalysisConfig — see docs/04-features.md §4.12 & docs/07-security.md.
// Disabled by default: it scans the same fileExplorer.rootDir tree looking
// for the largest files/directories, which is read-only on its own, but
// the report exists specifically to point an admin at things worth
// deleting — a deliberate opt-in, not an implicit default, same
// conservative bar as Terminal. Deletion itself reuses the existing file
// explorer delete endpoint, not a new capability gated here.
type DiskAnalysisConfig struct {
	Enabled bool `yaml:"enabled"`

	// ThrottleEveryFiles/ThrottleSleepMs pace fileexplorer.Scan's
	// filepath.WalkDir so a full fileExplorer.rootDir walk (rootDir
	// defaults to "/" — the whole root filesystem) doesn't run at 100%
	// I/O duty cycle for its entire duration — same "don't saturate slow
	// storage" reasoning as fileExplorer.copyThrottleMBps and JobQueue's
	// bounded concurrency, just never applied to the scan path before.
	// Every ThrottleEveryFiles entries visited, Scan sleeps
	// ThrottleSleepMs to give the rest of the system (SSH, journald,
	// dockerd, ...) a turn at the disk. 0 = unbounded — don't set that on
	// real hardware, only useful for tests.
	ThrottleEveryFiles int `yaml:"throttleEveryFiles"`
	ThrottleSleepMs    int `yaml:"throttleSleepMs"`

	// TimeoutSec bounds one scan's wall-clock duration. Without this, a
	// huge/slow tree holds the HTTP request — and keeps hammering the
	// disk — indefinitely. 0 = a conservative built-in default is used
	// (see fileexplorer.NewDiskAnalysisScanner).
	TimeoutSec int `yaml:"timeoutSec"`
}

// UpdateConfig — see docs/09-deployment.md §9.5 & docs/07-security.md.
// Enabled by default: unlike Terminal, this doesn't grant shell/command
// execution — it only ever replaces the running binary with the official
// GitHub release asset for this exact repo (hardcoded, not configurable
// here), triggered by an already-authenticated dashboard user. Still
// toggleable for anyone who'd rather update purely via re-running
// scripts/quick-install.sh instead.
type UpdateConfig struct {
	Enabled bool `yaml:"enabled"`
}

// DashboardConfig — see docs/04-features.md §4.1 "Akses Cepat (Custom)".
type DashboardConfig struct {
	// QuickLinksFile holds the user's custom Dashboard shortcut tiles
	// (internal/quicklinks), separate from config.yaml for the same reason
	// as CredentialsFile above: it's mutated directly and often by a
	// running, unprivileged service process, not via the
	// edit-then-restart path config.yaml itself uses (internal/config/
	// mutate.go). Default is relative ("./..."), same convention as
	// CredentialsFile's own default — deploy/config.example.yaml overrides
	// this to an absolute, already-service-user-writable path for the
	// packaged Linux install (see docs/09-deployment.md).
	QuickLinksFile string `yaml:"quickLinksFile"`
	// AppsFile holds per-compose-project tile customization (custom icon,
	// optional app URL) shown in the Dashboard "Aplikasi" section — see
	// internal/appmeta. Same reasoning and same default-path convention as
	// QuickLinksFile above.
	AppsFile string `yaml:"appsFile"`
}

// NotifyConfig — see docs/04-features.md §4.11 "Notifikasi Discord". Like
// DashboardConfig.QuickLinksFile above, SettingsFile holds only the path;
// the actual thresholds/durations/webhook URL live in that file (mutated
// live, no restart) rather than here — and unlike QuickLinksFile, that
// file contains a secret (the webhook URL), so it's saved 0600 and
// git-ignored by default filename (see .gitignore).
type NotifyConfig struct {
	SettingsFile string `yaml:"settingsFile"`
}

// FolderShortcutsConfig — see docs/04-features.md §4.4 "Shortcut Folder".
// Same "path only, actual data lives elsewhere, live-mutable" shape as
// NotifyConfig/DashboardConfig.QuickLinksFile above — not secret, so
// unlike NotifyConfig's file this one doesn't need 0600/git-ignore.
type FolderShortcutsConfig struct {
	SettingsFile string `yaml:"settingsFile"`
}

// BootLogConfig — see docs/04-features.md §4.13 "Riwayat Boot". File is the
// boot ledger (one entry per host boot, rewritten by a once-a-minute
// heartbeat). Not secret, so 0644 like quick-links.yaml.
type BootLogConfig struct {
	File string `yaml:"file"`
}

// WifiConfig — see docs/04-features.md §4.14. Device pins the adapter TarOS
// scans/connects with ("" = auto: the connected one, else the first). A
// configured adapter that doesn't exist is an error, never a silent fallback
// to another radio.
type WifiConfig struct {
	Device string `yaml:"device"`
}

func Default() Config {
	return Config{
		Server: ServerConfig{
			Listen: "0.0.0.0:8090",
		},
		Auth: AuthConfig{
			CredentialsFile:         "./credentials.yaml",
			SessionIdleTimeoutMin:   1440,
			LoginRateLimitAttempts:  5,
			LoginRateLimitWindowSec: 300,
		},
		Polling: PollingConfig{
			CPUMemNetIntervalSec: 2,
			DiskUsageIntervalSec: 10,
			TempIntervalSec:      5,
			ProcIntervalSec:      5,
		},
		Docker: DockerConfig{
			Enabled:          true,
			SocketPath:       "/var/run/docker.sock",
			WatchIntervalSec: 5,
		},
		Systemd: SystemdConfig{
			ProtectedUnits: []string{"ssh.service", "docker.service", "taros.service"},
		},
		FileExplorer: FileExplorerConfig{
			RootDir: "/",
			Blocklist: []string{
				"/etc/shadow",
				"/etc/shadow-", // vipw/pwck leave the previous version here — same sensitivity
				"/etc/gshadow",
				"/etc/gshadow-",
				"/proc",
				"/sys",
			},
			MaxUploadSizeMB:  500,
			MaxConcurrentOps: 2,
			CopyThrottleMBps: 0,
			CopySyncEveryMB:  32,
		},
		Terminal: TerminalConfig{
			Enabled:               false,
			Shell:                 "/bin/bash",
			IdleTimeoutMin:        15,
			MaxConcurrentSessions: 1,
		},
		DiskAnalysis: DiskAnalysisConfig{
			Enabled:            false,
			ThrottleEveryFiles: 200,
			ThrottleSleepMs:    5,
			TimeoutSec:         180,
		},
		Update: UpdateConfig{
			Enabled: true,
		},
		Dashboard: DashboardConfig{
			QuickLinksFile: "./quick-links.yaml",
			AppsFile:       "./apps.yaml",
		},
		Notify: NotifyConfig{
			SettingsFile: "./notify.yaml",
		},
		FolderShortcuts: FolderShortcutsConfig{
			SettingsFile: "./folder-shortcuts.yaml",
		},
		BootLog: BootLogConfig{File: "./boots.yaml"},
	}
}

// Load reads the YAML file at path and merges it over the defaults. A
// missing file is not an error — it just means "use defaults", which keeps
// local/dev runs simple (see docs/01-overview.md "Lingkungan Development").
func Load(path string) (Config, error) {
	cfg := Default()

	data, err := os.ReadFile(path)
	if os.IsNotExist(err) {
		return cfg, nil
	}
	if err != nil {
		return cfg, fmt.Errorf("config: read %s: %w", path, err)
	}

	if err := yaml.Unmarshal(data, &cfg); err != nil {
		return cfg, fmt.Errorf("config: parse %s: %w", path, err)
	}

	// Installs that predate dashboard.appsFile have no such key, so they'd
	// get the relative default — which resolves against the service's
	// working directory and usually isn't writable. When quickLinksFile
	// was already pointed at an absolute, service-writable location (what
	// deploy/config.example.yaml does), put apps.yaml beside it instead so
	// upgrading needs no config edit.
	if cfg.Dashboard.AppsFile == Default().Dashboard.AppsFile && filepath.IsAbs(cfg.Dashboard.QuickLinksFile) {
		cfg.Dashboard.AppsFile = filepath.Join(filepath.Dir(cfg.Dashboard.QuickLinksFile), "apps.yaml")
	}
	// Same upgrade story for bootLog.file: an install whose config predates it
	// gets boots.yaml beside quick-links.yaml (already service-writable)
	// instead of a relative path that resolves against the working directory.
	if cfg.BootLog.File == Default().BootLog.File && filepath.IsAbs(cfg.Dashboard.QuickLinksFile) {
		cfg.BootLog.File = filepath.Join(filepath.Dir(cfg.Dashboard.QuickLinksFile), "boots.yaml")
	}
	return cfg, nil
}
