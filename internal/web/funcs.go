package web

import (
	"fmt"
	"html/template"
	"path/filepath"
)

// funcMap is shared by every page and fragment template — see templates.go.
var funcMap = template.FuncMap{
	"formatBytes": formatBytes,
	"formatPct":   formatPct,
	"joinPath":    filepath.Join,
}

func formatBytes(n int64) string {
	if n < 0 {
		return "—"
	}
	const unit = 1024
	if n < unit {
		return fmt.Sprintf("%d B", n)
	}
	div, exp := int64(unit), 0
	for v := n / unit; v >= unit; v /= unit {
		div *= unit
		exp++
	}
	units := "KMGTPE"
	return fmt.Sprintf("%.1f %cB", float64(n)/float64(div), units[exp])
}

func formatPct(f float64) string {
	return fmt.Sprintf("%.1f%%", f)
}
