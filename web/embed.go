// Package assets embeds the built Vue frontend directly into the compiled
// binary via embed.FS, so deployment is a single file — no separate
// assets directory to ship alongside it. See docs/03-tech-stack.md
// "Kenapa pivot ke Vue?" — every page is now Vue (Fase UI/UX complete,
// docs/10-roadmap.md), so this package no longer embeds html/template
// sources or hand-written static assets, only the SPA build output.
package assets

import "embed"

// SPA is the production build of web/frontend (`npm run build` in that
// directory, output committed to frontend/dist — see docs/09-deployment.md).
//
//go:embed all:frontend/dist
var SPA embed.FS
