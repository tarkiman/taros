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

// SetDiskAnalysisEnabled flips diskAnalysis.enabled — same in-place
// single-line edit as SetTerminalEnabled above, same reason (preserve
// comments). Unlike terminal, this has no password-reconfirm step at the
// handler level (see docs/04-features.md §4.12 — lower risk tier), but
// still needs the same restart-and-reload: the scan route's
// registration is decided once at startup (internal/web/router.go), not
// re-evaluated per request.
func SetDiskAnalysisEnabled(path string, enabled bool) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("config: read %s: %w", path, err)
	}

	newVal := "false"
	if enabled {
		newVal = "true"
	}

	lines := strings.Split(string(data), "\n")
	inSection := false
	foundSection := false
	foundEnabled := false

	for i, line := range lines {
		isTopLevel := line != "" && !strings.HasPrefix(line, " ") && !strings.HasPrefix(line, "\t")
		if isTopLevel && strings.HasPrefix(strings.TrimSpace(line), "diskAnalysis:") {
			inSection = true
			foundSection = true
			continue
		}
		if !inSection {
			continue
		}
		if isTopLevel {
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
		block := "\ndiskAnalysis:\n  enabled: " + newVal
		lines = append(lines, strings.Split(block, "\n")...)
	case !foundEnabled:
		return fmt.Errorf("config: %s punya bagian 'diskAnalysis:' tapi tidak ada baris 'enabled:' — edit manual", path)
	}

	return os.WriteFile(path, []byte(strings.Join(lines, "\n")), 0o644)
}

// SetServerListen edits server.listen in the config.yaml at path — same
// in-place single-line edit as SetTerminalEnabled above (and same reason:
// preserve every comment in a file seeded from
// deploy/config.example.yaml). listen must already be a valid "host:port"
// string; the caller (handlers_settings.go) is responsible for validating
// it — including test-binding the address — before this is called, since
// a bad value written here would only surface as a crash-looping service
// after the restart this triggers.
func SetServerListen(path string, listen string) error {
	data, err := os.ReadFile(path)
	if err != nil {
		return fmt.Errorf("config: read %s: %w", path, err)
	}

	lines := strings.Split(string(data), "\n")
	inServer := false
	foundSection := false
	foundListen := false

	for i, line := range lines {
		isTopLevel := line != "" && !strings.HasPrefix(line, " ") && !strings.HasPrefix(line, "\t")
		if isTopLevel && strings.HasPrefix(strings.TrimSpace(line), "server:") {
			inServer = true
			foundSection = true
			continue
		}
		if !inServer {
			continue
		}
		if isTopLevel {
			break
		}
		trimmed := strings.TrimSpace(line)
		if strings.HasPrefix(trimmed, "listen:") {
			indent := line[:len(line)-len(strings.TrimLeft(line, " \t"))]
			lines[i] = indent + `listen: "` + listen + `"`
			foundListen = true
			break
		}
	}

	switch {
	case !foundSection:
		for len(lines) > 0 && lines[len(lines)-1] == "" {
			lines = lines[:len(lines)-1]
		}
		block := "\nserver:\n  listen: \"" + listen + "\""
		lines = append(lines, strings.Split(block, "\n")...)
	case !foundListen:
		return fmt.Errorf("config: %s punya bagian 'server:' tapi tidak ada baris 'listen:' — edit manual", path)
	}

	return os.WriteFile(path, []byte(strings.Join(lines, "\n")), 0o644)
}
