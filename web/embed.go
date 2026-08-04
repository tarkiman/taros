// Package assets embeds TarkimanOS's HTML templates, static files
// (CSS/JS), and the built Vue frontend directly into the compiled binary
// via embed.FS, so deployment is a single file — no separate assets
// directory to ship alongside it.
package assets

import "embed"

//go:embed templates
var Templates embed.FS

//go:embed static
var Static embed.FS

// SPA is the production build of web/frontend (`npm run build` in that
// directory, output committed to frontend/dist — see docs/09-deployment.md).
// Pages migrated to Vue are served from here; pages not yet migrated still
// go through Templates/Static, see internal/web/router.go.
//
//go:embed all:frontend/dist
var SPA embed.FS
