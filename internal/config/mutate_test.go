package config

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func writeCfg(t *testing.T, body string) string {
	t.Helper()
	p := filepath.Join(t.TempDir(), "config.yaml")
	if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
		t.Fatal(err)
	}
	return p
}

const sample = `# TarOS config — hand-edited, comments must survive
server:
  listen: "0.0.0.0:8090"

docker:
  enabled: true   # docker.enabled must never be touched by the shell toggle
  socketPath: "/var/run/docker.sock"

# The riskiest feature after the host terminal.
containerShell:
  enabled: false   # off unless you mean it
  idleTimeoutMin: 20
  maxConcurrentSessions: 3

terminal:
  enabled: false
`

func TestSetContainerShellEnabledEditsOnlyItsOwnLine(t *testing.T) {
	p := writeCfg(t, sample)
	if err := SetContainerShellEnabled(p, true); err != nil {
		t.Fatal(err)
	}
	got, _ := os.ReadFile(p)
	want := strings.Replace(sample, "containerShell:\n  enabled: false   # off unless you mean it", "containerShell:\n  enabled: true # off unless you mean it", 1)
	if string(got) != want {
		t.Fatalf("file changed beyond the one line:\n--- got\n%s\n--- want\n%s", got, want)
	}
	// docker.enabled and terminal.enabled — the other `enabled:` lines — are untouched.
	if !strings.Contains(string(got), "docker:\n  enabled: true   # docker.enabled") || !strings.Contains(string(got), "terminal:\n  enabled: false") {
		t.Fatalf("another section's enabled: was modified:\n%s", got)
	}
	// And back.
	if err := SetContainerShellEnabled(p, false); err != nil {
		t.Fatal(err)
	}
	cfg, err := Load(p)
	if err != nil {
		t.Fatal(err)
	}
	if cfg.ContainerShell.Enabled || !cfg.Docker.Enabled || cfg.ContainerShell.IdleTimeoutMin != 20 || cfg.ContainerShell.MaxConcurrentSessions != 3 {
		t.Fatalf("round trip = %+v docker=%v", cfg.ContainerShell, cfg.Docker.Enabled)
	}
}

func TestSetContainerShellEnabledAppendsAMissingSection(t *testing.T) {
	p := writeCfg(t, "server:\n  listen: \":1\"\n\ndocker:\n  enabled: true\n")
	if err := SetContainerShellEnabled(p, true); err != nil {
		t.Fatal(err)
	}
	cfg, err := Load(p)
	if err != nil {
		t.Fatal(err)
	}
	if !cfg.ContainerShell.Enabled || cfg.ContainerShell.IdleTimeoutMin != 15 || cfg.ContainerShell.MaxConcurrentSessions != 2 {
		t.Fatalf("appended section = %+v", cfg.ContainerShell)
	}
	if !cfg.Docker.Enabled {
		t.Fatal("docker.enabled must stay true")
	}
}

func TestSetContainerShellEnabledRefusesAnAmbiguousSection(t *testing.T) {
	p := writeCfg(t, "containerShell:\n  idleTimeoutMin: 5\n\nterminal:\n  enabled: true\n")
	if err := SetContainerShellEnabled(p, true); err == nil {
		t.Fatal("a containerShell block with no enabled: line must be an error, not a silent edit of terminal.enabled")
	}
	got, _ := os.ReadFile(p)
	if !strings.Contains(string(got), "terminal:\n  enabled: true") {
		t.Fatalf("terminal.enabled was clobbered: %s", got)
	}
}

func TestSectionMatchIsExact(t *testing.T) {
	// A different top-level key that merely starts with the same letters must not be mistaken for it.
	p := writeCfg(t, "containerShellExtra:\n  enabled: true\n")
	if err := SetContainerShellEnabled(p, false); err != nil {
		t.Fatal(err)
	}
	got, _ := os.ReadFile(p)
	if !strings.Contains(string(got), "containerShellExtra:\n  enabled: true") {
		t.Fatalf("edited a look-alike section: %s", got)
	}
}

func TestContainerShellDefaultsAreOffAndBounded(t *testing.T) {
	d := Default().ContainerShell
	if d.Enabled || d.IdleTimeoutMin != 15 || d.MaxConcurrentSessions != 2 {
		t.Fatalf("defaults = %+v", d)
	}
	cfg, err := Load(writeCfg(t, "server:\n  listen: \":1\"\n")) // an old config with no such section
	if err != nil {
		t.Fatal(err)
	}
	if cfg.ContainerShell.Enabled {
		t.Fatal("a config that predates the feature must not turn a shell on")
	}
}
