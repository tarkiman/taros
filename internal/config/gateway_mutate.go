package config

import (
	"fmt"
	"os"
	"strconv"
	"strings"
)

// SetGateway replaces the whole top-level `gateway:` block in config.yaml with g, or
// appends it when absent (Settings > Gerbang lokasi, docs/04-features.md §4.18). Unlike
// the one-line toggles above, this block holds a list (central hosts), so the block is
// regenerated as a unit; every other line of the file — other sections and their
// comments — is left exactly as it was. Values are quoted, so a label like "NVR: umma"
// can't break the YAML.
func SetGateway(path string, g GatewayConfig) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("config: read %s: %w", path, err)
	}
	lines := strings.Split(string(data), "\n")
	block := gatewayBlock(g)

	start, end := -1, len(lines)
	for i, line := range lines {
		topLevel := line != "" && !strings.HasPrefix(line, " ") && !strings.HasPrefix(line, "\t") && !strings.HasPrefix(strings.TrimSpace(line), "#")
		if start < 0 {
			if topLevel && strings.HasPrefix(line, "gateway:") {
				start = i
			}
			continue
		}
		if topLevel || (line != "" && !strings.HasPrefix(line, " ") && !strings.HasPrefix(line, "\t")) {
			end = i // next top-level key, or an unindented comment that belongs to it
			break
		}
	}

	var out []string
	if start < 0 {
		for len(lines) > 0 && lines[len(lines)-1] == "" {
			lines = lines[:len(lines)-1]
		}
		out = append(append(lines, ""), block...)
		out = append(out, "")
	} else {
		// Keep the blank line that separated the block from what follows.
		for end > start && strings.TrimSpace(lines[end-1]) == "" {
			end--
		}
		out = append(append(append([]string{}, lines[:start]...), block...), lines[end:]...)
	}
	return os.WriteFile(path, []byte(strings.Join(out, "\n")), 0o644)
}

func gatewayBlock(g GatewayConfig) []string {
	b := []string{
		"gateway:",
		"  # Diatur lewat Settings > Gerbang lokasi (lihat docs/04-features.md §4.18).",
		"  enabled: " + strconv.FormatBool(g.Enabled),
		"  go2rtcUrl: " + strconv.Quote(g.Go2rtcURL),
		"  pollSeconds: " + strconv.Itoa(g.PollSeconds),
	}
	if len(g.Central) == 0 {
		return append(b, "  central: []")
	}
	b = append(b, "  central:")
	for _, c := range g.Central {
		b = append(b, "    - label: "+strconv.Quote(c.Label), "      addr: "+strconv.Quote(c.Addr))
	}
	return b
}
