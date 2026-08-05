package config

import (
	"fmt"
	"os"
	"strings"
)

// SetTerminalEnabled flips terminal.enabled in the config.yaml at path,
// editing only that one line in place — not a full parse+re-marshal via
// yaml.v3, which would silently drop every comment in the file (installs
// are seeded from the heavily-commented deploy/config.example.yaml, see
// scripts/install.sh, and losing those on the first toggle would be a bad
// surprise). If the terminal: section doesn't exist yet, a new one is
// appended matching Default()'s other terminal values, with the requested
// enabled state.
func SetTerminalEnabled(path string, enabled bool) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("config: read %s: %w", path, err)
	}

	newVal := "false"
	if enabled {
		newVal = "true"
	}

	lines := strings.Split(string(data), "\n")
	inTerminal := false
	foundSection := false
	foundEnabled := false

	for i, line := range lines {
		isTopLevel := line != "" && !strings.HasPrefix(line, " ") && !strings.HasPrefix(line, "\t")
		if isTopLevel && strings.HasPrefix(strings.TrimSpace(line), "terminal:") {
			inTerminal = true
			foundSection = true
			continue
		}
		if !inTerminal {
			continue
		}
		if isTopLevel {
			// A non-indented, non-blank line ends the terminal: block —
			// stop looking, whether or not enabled: was found in it.
			break
		}
		trimmed := strings.TrimSpace(line)
		if strings.HasPrefix(trimmed, "enabled:") {
			indent := line[:len(line)-len(strings.TrimLeft(line, " \t"))]
			lines[i] = indent + "enabled: " + newVal
			foundEnabled = true
			break
		}
	}

	switch {
	case !foundSection:
		for len(lines) > 0 && lines[len(lines)-1] == "" {
			lines = lines[:len(lines)-1]
		}
		block := "\nterminal:\n  enabled: " + newVal + "\n  shell: \"/bin/bash\"\n  idleTimeoutMin: 15\n  maxConcurrentSessions: 1"
		lines = append(lines, strings.Split(block, "\n")...)
	case !foundEnabled:
		return fmt.Errorf("config: %s punya bagian 'terminal:' tapi tidak ada baris 'enabled:' — edit manual", path)
	}

	return os.WriteFile(path, []byte(strings.Join(lines, "\n")), 0o644)
}
