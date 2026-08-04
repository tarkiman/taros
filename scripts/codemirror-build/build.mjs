// Build-once bundling for CodeMirror 6 — see docs/03-tech-stack.md
// "Kenapa CodeMirror 6 & xterm.js jadi 'pengecualian' JS berat?". Run
// manually (`npm install && npm run build` in this directory) whenever
// editor-entry.js or its dependencies change; the output is committed to
// web/static/js/vendor/, not rebuilt as part of `go build`.
import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["src/editor-entry.js"],
  bundle: true,
  minify: true,
  format: "iife",
  target: "es2020",
  outfile: "../../web/static/js/vendor/editor.bundle.js",
});

console.log("built web/static/js/vendor/editor.bundle.js");
