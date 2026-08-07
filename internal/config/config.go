// Package config loads TarOS's YAML configuration file.
//
// Only the sections implemented so far are parsed. Later fases (file
// explorer, terminal, ...) will extend this struct as those features land
// — see docs/09-deployment.md for the eventual full shape.
package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Server       ServerConfig       `yaml:"server"`
	Auth         AuthConfig         `yaml:"auth"`
	Polling      PollingConfig      `yaml:"polling"`
	Docker       DockerConfig       `yaml:"docker"`
	Systemd      SystemdConfig      `yaml:"systemd"`
	FileExplorer FileExplorerConfig `yaml:"fileExplorer"`
	Terminal     TerminalConfig     `yaml:"terminal"`
	Update       UpdateConfig       `yaml:"update"`
	Dashboard    DashboardConfig    `yaml:"dashboard"`
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
		Update: UpdateConfig{
			Enabled: true,
		},
		Dashboard: DashboardConfig{
			QuickLinksFile: "./quick-links.yaml",
		},
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
	return cfg, nil
}
