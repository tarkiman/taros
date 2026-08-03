// Package config loads TarkimanOS's YAML configuration file.
//
// Only the sections implemented so far are parsed. Later fases (Docker,
// systemd, file explorer, terminal, ...) will extend this struct as those
// features land — see docs/09-deployment.md for the eventual full shape.
package config

import (
	"fmt"
	"os"

	"gopkg.in/yaml.v3"
)

type Config struct {
	Server ServerConfig `yaml:"server"`
	Auth   AuthConfig   `yaml:"auth"`
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
