package config

import (
	"os"
	"path/filepath"
	"testing"
)

func TestAppsFileFollowsQuickLinksDir(t *testing.T) {
	write := func(body string) string {
		p := filepath.Join(t.TempDir(), "config.yaml")
		if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
		return p
	}

	cfg, _ := Load(write("dashboard:\n  quickLinksFile: \"/opt/taros/quick-links.yaml\"\n"))
	if cfg.Dashboard.AppsFile != "/opt/taros/apps.yaml" {
		t.Errorf("old install: AppsFile = %q, want /opt/taros/apps.yaml", cfg.Dashboard.AppsFile)
	}

	cfg, _ = Load(write("dashboard:\n  quickLinksFile: \"/opt/taros/quick-links.yaml\"\n  appsFile: \"/srv/x/apps.yaml\"\n"))
	if cfg.Dashboard.AppsFile != "/srv/x/apps.yaml" {
		t.Errorf("explicit appsFile must win, got %q", cfg.Dashboard.AppsFile)
	}

	cfg, _ = Load(write("server:\n  listen: \":1\"\n"))
	if cfg.Dashboard.AppsFile != "./apps.yaml" {
		t.Errorf("dev default should stay relative, got %q", cfg.Dashboard.AppsFile)
	}
}

func TestBootLogFileFollowsQuickLinksDir(t *testing.T) {
	write := func(body string) string {
		p := filepath.Join(t.TempDir(), "config.yaml")
		if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
		return p
	}

	cfg, _ := Load(write("dashboard:\n  quickLinksFile: \"/opt/taros/quick-links.yaml\"\n"))
	if cfg.BootLog.File != "/opt/taros/boots.yaml" {
		t.Errorf("old install: BootLog.File = %q, want /opt/taros/boots.yaml", cfg.BootLog.File)
	}

	cfg, _ = Load(write("dashboard:\n  quickLinksFile: \"/opt/taros/quick-links.yaml\"\nbootLog:\n  file: \"/srv/x/boots.yaml\"\n"))
	if cfg.BootLog.File != "/srv/x/boots.yaml" {
		t.Errorf("explicit bootLog.file must win, got %q", cfg.BootLog.File)
	}

	cfg, _ = Load(write("server:\n  listen: \":1\"\n"))
	if cfg.BootLog.File != "./boots.yaml" {
		t.Errorf("dev default should stay relative, got %q", cfg.BootLog.File)
	}
}
