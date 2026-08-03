// Package config loads TarkimanOS's YAML configuration file.
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
}

type ServerConfig struct {
	Listen string `yaml:"listen"`
}

type AuthConfig struct {
	// CredentialsFile holds the bcrypt-hashed admin username/password,
	// managed separately from this config file (see `tarkimanos setup`).
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
// Streaming/job-queue fields (maxUploadSizeMB, copyThrottleMBps, ...) land
// in Fase 3b along with the features that need them — not added here yet,
// see docs/10-roadmap.md.
type FileExplorerConfig struct {
	RootDir   string   `yaml:"rootDir"`
	Blocklist []string `yaml:"blocklist"`
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
		},
		Docker: DockerConfig{
			Enabled:          true,
			SocketPath:       "/var/run/docker.sock",
			WatchIntervalSec: 5,
		},
		Systemd: SystemdConfig{
			ProtectedUnits: []string{"ssh.service", "docker.service", "tarkimanos.service"},
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
