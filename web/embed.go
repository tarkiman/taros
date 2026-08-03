// Package assets embeds TarkimanOS's HTML templates and static files
// (CSS/JS) directly into the compiled binary via embed.FS, so deployment
// is a single file — no separate assets directory to ship alongside it.
package assets

import "embed"

//go:embed templates
var Templates embed.FS

//go:embed static
var Static embed.FS
