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
