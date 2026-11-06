package config

import (
	"os"
	"path/filepath"
	"reflect"
	"strings"
	"testing"
)

func TestSetGateway(t *testing.T) {
	path := filepath.Join(t.TempDir(), "config.yaml")
	orig := "# keep me\nserver:\n  listen: \"0.0.0.0:8090\" # port\n\ngateway:\n  # old comment\n  enabled: false\n  central: []\n\n# section comment\nwifi:\n  device: \"\"\n"
	os.WriteFile(path, []byte(orig), 0o644)

	want := GatewayConfig{Enabled: true, Go2rtcURL: "http://127.0.0.1:1984", PollSeconds: 10,
		Central: []GatewayCentralTarget{{Label: `NVR: "umma"`, Addr: "172.22.244.135:8091"}, {Label: "Pi", Addr: "pi.local:22"}}}
	if err := SetGateway(path, want); err != nil {
		t.Fatal(err)
	}
	cfg, err := Load(path)
	if err != nil {
		t.Fatal(err)
	}
	if !reflect.DeepEqual(cfg.Gateway, want) {
		t.Fatalf("round trip: %+v", cfg.Gateway)
	}
	data, _ := os.ReadFile(path)
	s := string(data)
	for _, keep := range []string{"# keep me", `listen: "0.0.0.0:8090" # port`, "# section comment\nwifi:", "device: \"\""} {
		if !strings.Contains(s, keep) {
			t.Fatalf("lost %q:\n%s", keep, s)
		}
	}
	if strings.Contains(s, "old comment") || strings.Count(s, "gateway:") != 1 {
		t.Fatalf("old block not replaced:\n%s", s)
	}

	// Disable with no hosts, then append to a file without the section.
	if err := SetGateway(path, GatewayConfig{PollSeconds: 30, Go2rtcURL: "http://127.0.0.1:1984"}); err != nil {
		t.Fatal(err)
	}
	if cfg, _ = Load(path); cfg.Gateway.Enabled || len(cfg.Gateway.Central) != 0 || cfg.Gateway.PollSeconds != 30 || cfg.Wifi.Device != "" {
		t.Fatalf("disabled: %+v", cfg.Gateway)
	}
	other := filepath.Join(t.TempDir(), "c.yaml")
	os.WriteFile(other, []byte("server:\n  listen: \"0.0.0.0:8090\"\n"), 0o644)
	if err := SetGateway(other, want); err != nil {
		t.Fatal(err)
	}
	if cfg, _ = Load(other); !cfg.Gateway.Enabled || cfg.Server.Listen != "0.0.0.0:8090" {
		t.Fatalf("append: %+v", cfg)
	}
}
