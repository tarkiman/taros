package storage

import (
	"os"
	"path/filepath"
	"strings"
)

type fstabEntry struct {
	Spec, File, Type, Opts string
}

// parseFstab reads /etc/fstab.
func parseFstab(data string) []fstabEntry {
	var out []fstabEntry
	for _, line := range strings.Split(data, "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		f := strings.Fields(line)
		if len(f) < 2 {
			continue
		}
		// fstab escapes spaces as \040 (a label "MY USB" is written LABEL=MY\040USB)
		e := fstabEntry{Spec: unescapeMount(f[0]), File: unescapeMount(f[1])}
		if len(f) > 2 {
			e.Type = f[2]
		}
		if len(f) > 3 {
			e.Opts = f[3]
		}
		out = append(out, e)
	}
	return out
}

func readFstab(path string) []fstabEntry {
	b, err := os.ReadFile(path)
	if err != nil {
		return nil
	}
	return parseFstab(string(b))
}

// matches reports whether an fstab line refers to this partition: by UUID, LABEL,
// PARTUUID, /dev/disk/by-{uuid,label,partuuid}/…, its device path, or because the
// line's mount point is where it is mounted right now.
func (e fstabEntry) matches(p blockDev) bool {
	spec := e.Spec
	eq := func(a, b string) bool { return a != "" && strings.EqualFold(a, b) }
	switch {
	case strings.HasPrefix(spec, "UUID="):
		return eq(strings.Trim(spec[5:], `"`), p.UUID)
	case strings.HasPrefix(spec, "LABEL="):
		return p.Label != "" && strings.Trim(spec[6:], `"`) == p.Label
	case strings.HasPrefix(spec, "PARTUUID="):
		return eq(strings.Trim(spec[9:], `"`), p.PartUUID)
	case strings.HasPrefix(spec, "/dev/disk/by-uuid/"):
		return eq(filepath.Base(spec), p.UUID)
	case strings.HasPrefix(spec, "/dev/disk/by-label/"):
		return p.Label != "" && filepath.Base(spec) == p.Label
	case strings.HasPrefix(spec, "/dev/disk/by-partuuid/"):
		return eq(filepath.Base(spec), p.PartUUID)
	case strings.HasPrefix(spec, "/dev/"):
		if spec == p.Path {
			return true
		}
		if real, err := filepath.EvalSymlinks(spec); err == nil && real == p.Path {
			return true
		}
	}
	for _, mp := range p.Mountpoints {
		if e.File != "" && e.File != "none" && filepath.Clean(e.File) == mp {
			return true
		}
	}
	return false
}
