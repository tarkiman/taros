package config

import (
	"os"
	"path/filepath"
	"testing"
)

func TestFileSharingDefaultsAndPlacement(t *testing.T) {
	load := func(body string) Config {
		p := filepath.Join(t.TempDir(), "config.yaml")
		if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
		cfg, err := Load(p)
		if err != nil {
			t.Fatal(err)
		}
		return cfg
	}

	// An existing install with no fileSharing section: safe defaults, file next to quick-links.yaml.
	cfg := load("dashboard:\n  quickLinksFile: \"/opt/taros/quick-links.yaml\"\n")
	if cfg.FileSharing.File != "/opt/taros/sharing.yaml" {
		t.Errorf("File = %q, want /opt/taros/sharing.yaml", cfg.FileSharing.File)
	}
	roots := map[string]bool{}
	for _, r := range cfg.FileSharing.AllowedRoots {
		roots[r] = true
	}
	if roots["/"] || roots["/etc"] || roots["/home"] || !roots["/srv"] || !roots["/mnt"] {
		t.Errorf("default roots must be storage locations only, got %v", cfg.FileSharing.AllowedRoots)
	}
	if len(cfg.FileSharing.DeniedPaths) == 0 {
		t.Error("application data must be denied by default")
	}

	// An explicit path wins over the placement rule; explicit roots replace the defaults.
	cfg = load("dashboard:\n  quickLinksFile: \"/opt/taros/quick-links.yaml\"\nfileSharing:\n  file: \"/srv/x/sharing.yaml\"\n  allowedRoots: [\"/tank\"]\n")
	if cfg.FileSharing.File != "/srv/x/sharing.yaml" || len(cfg.FileSharing.AllowedRoots) != 1 || cfg.FileSharing.AllowedRoots[0] != "/tank" {
		t.Errorf("explicit settings must win: %+v", cfg.FileSharing)
	}
}

func TestStorageDefaultsAndPlacement(t *testing.T) {
	load := func(body string) Config {
		p := filepath.Join(t.TempDir(), "config.yaml")
		if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
			t.Fatal(err)
		}
		cfg, err := Load(p)
		if err != nil {
			t.Fatal(err)
		}
		return cfg
	}
	// An install from before this feature: on, sensible mount base, file next to quick-links.yaml.
	cfg := load("dashboard:\n  quickLinksFile: \"/opt/taros/quick-links.yaml\"\n")
	if !cfg.Storage.Enabled || cfg.Storage.MountBase != "/media/taros" || cfg.Storage.File != "/opt/taros/storage.yaml" || cfg.Storage.PollSeconds != 3 || cfg.Storage.Umask != "002" {
		t.Errorf("%+v", cfg.Storage)
	}
	// Explicit settings win; a partial section keeps the other defaults.
	cfg = load("storage:\n  mountBase: \"/DATA/MOUNT\"\n  ownerUser: tarkiman\n  extraExternal: [mmcblk]\n")
	if cfg.Storage.MountBase != "/DATA/MOUNT" || cfg.Storage.OwnerUser != "tarkiman" || !cfg.Storage.Enabled || len(cfg.Storage.ExtraExternal) != 1 {
		t.Errorf("%+v", cfg.Storage)
	}
	if cfg = load("storage:\n  enabled: false\n"); cfg.Storage.Enabled {
		t.Error("can be turned off")
	}
}
