// Entry point bundled by esbuild into web/static/js/vendor/editor.bundle.js
// (see ../build.mjs and docs/03-tech-stack.md). Exposes window.TkEditor —
// the only thing internal web/static/js/editor.js (vanilla JS, not
// bundled) needs to know about.
import { EditorState, Compartment } from "@codemirror/state";
import {
  EditorView, keymap, lineNumbers, highlightActiveLine, highlightActiveLineGutter,
  highlightWhitespace, highlightTrailingWhitespace, drawSelection,
} from "@codemirror/view";
import { defaultKeymap, history, historyKeymap, indentWithTab } from "@codemirror/commands";
import {
  syntaxHighlighting, defaultHighlightStyle, HighlightStyle,
  indentOnInput, bracketMatching, foldGutter, foldKeymap, indentUnit,
} from "@codemirror/language";
import { closeBrackets, closeBracketsKeymap, autocompletion } from "@codemirror/autocomplete";
import { searchKeymap, highlightSelectionMatches } from "@codemirror/search";
import { linter, lintGutter } from "@codemirror/lint";
import { tags } from "@lezer/highlight";

import { yaml } from "@codemirror/lang-yaml";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { markdown } from "@codemirror/lang-markdown";
import { StreamLanguage } from "@codemirror/language";
import { shell } from "@codemirror/legacy-modes/mode/shell";
import { properties } from "@codemirror/legacy-modes/mode/properties";

import { load as yamlLoad } from "js-yaml";

// --- language selection by extension — see docs/04-features.md §4.4 ---
const EXT_LANG = {
  yaml: () => yaml(), yml: () => yaml(),
  json: () => json(),
  md: () => markdown(), markdown: () => markdown(),
  sh: () => StreamLanguage.define(shell), bash: () => StreamLanguage.define(shell),
  conf: () => StreamLanguage.define(properties),
  cfg: () => StreamLanguage.define(properties),
  ini: () => StreamLanguage.define(properties),
  toml: () => StreamLanguage.define(properties),
  env: () => StreamLanguage.define(properties),
  properties: () => StreamLanguage.define(properties),
};

function languageForFilename(name) {
  const ext = (name.split(".").pop() || "").toLowerCase();
  return EXT_LANG[ext] ? EXT_LANG[ext]() : null;
}

// --- YAML/JSON validation markers — docs/04-features.md §4.4 "Validasi
// ringan untuk YAML & JSON". JSON already has an official linter
// (jsonParseLinter); YAML doesn't, so js-yaml's own parse error (which
// carries a line/column mark) is mapped into a CodeMirror diagnostic. ---
function yamlLinter() {
  return linter((view) => {
    const text = view.state.doc.toString();
    try {
      yamlLoad(text);
      return [];
    } catch (e) {
      if (!e.mark) return [];
      const line = view.state.doc.line(Math.min(e.mark.line + 1, view.state.doc.lines));
      const from = line.from + Math.min(e.mark.column, line.length);
      return [{ from, to: Math.min(from + 1, line.to), severity: "error", message: e.reason || e.message }];
    }
  });
}

function linterForFilename(name) {
  const ext = (name.split(".").pop() || "").toLowerCase();
  // jsonParseLinter() returns a linter *source* function (view => Diagnostic[]),
  // not an Extension — it must be wrapped with linter(), same as yamlLinter()
  // already does internally. Missing this wrap was a real bug caught by
  // headless-browser testing: CodeMirror threw "Unrecognized extension value"
  // and the editor never mounted at all.
  if (ext === "json") return linter(jsonParseLinter());
  if (ext === "yaml" || ext === "yml") return yamlLinter();
  return null;
}

// Same system-monospace stack as web/static/css/app.css — no web font,
// see docs/06-api-ui-ux.md.
const MONOSPACE_STACK = 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace';

// --- themes matching web/static/css/app.css design tokens ---
const darkTheme = EditorView.theme({
  "&": { backgroundColor: "#14161a", color: "#e6e8eb", height: "100%", fontSize: "14px" },
  ".cm-content": { caretColor: "#4da3ff", fontFamily: MONOSPACE_STACK },
  ".cm-gutters": { backgroundColor: "#1d2026", color: "#9aa1ab", border: "none" },
  ".cm-activeLine": { backgroundColor: "#1d202688" },
  ".cm-activeLineGutter": { backgroundColor: "#1d2026" },
  ".cm-selectionMatch": { backgroundColor: "#4da3ff33" },
  "&.cm-focused .cm-matchingBracket": { backgroundColor: "#4da3ff55" },
}, { dark: true });

const lightTheme = EditorView.theme({
  "&": { backgroundColor: "#ffffff", color: "#14161a", height: "100%", fontSize: "14px" },
  ".cm-content": { caretColor: "#2f6fbf", fontFamily: MONOSPACE_STACK },
  ".cm-gutters": { backgroundColor: "#f5f6f8", color: "#5b6270", border: "none" },
  ".cm-activeLine": { backgroundColor: "#f5f6f8" },
  ".cm-activeLineGutter": { backgroundColor: "#f5f6f8" },
  ".cm-selectionMatch": { backgroundColor: "#4da3ff33" },
}, { dark: false });

const darkHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: "#c586c0" },
  { tag: [tags.string, tags.special(tags.string)], color: "#ce9178" },
  { tag: tags.comment, color: "#6a9955", fontStyle: "italic" },
  { tag: tags.number, color: "#b5cea8" },
  { tag: [tags.propertyName, tags.attributeName], color: "#9cdcfe" },
  { tag: tags.bool, color: "#569cd6" },
  { tag: tags.heading, color: "#4da3ff", fontWeight: "bold" },
]);

const lightHighlight = defaultHighlightStyle;

// --- word wrap toggle (compartment so it can be reconfigured live) ---
const wrapCompartment = new Compartment();
const themeCompartment = new Compartment();

export function createEditor({ container, doc, filename, dark, wordWrap, onChange, onSave }) {
  const lang = languageForFilename(filename);
  const lint = linterForFilename(filename);

  const extensions = [
    lineNumbers(),
    highlightActiveLineGutter(),
    highlightActiveLine(),
    highlightWhitespace(),
    highlightTrailingWhitespace(),
    history(),
    drawSelection(),
    indentOnInput(),
    bracketMatching(),
    closeBrackets(),
    autocompletion(),
    foldGutter(),
    highlightSelectionMatches(),
    indentUnit.of("  "),
    themeCompartment.of(dark ? [darkTheme, syntaxHighlighting(darkHighlight)] : [lightTheme, syntaxHighlighting(lightHighlight)]),
    wrapCompartment.of(wordWrap ? EditorView.lineWrapping : []),
    keymap.of([
      ...closeBracketsKeymap, ...defaultKeymap, ...searchKeymap,
      ...historyKeymap, ...foldKeymap, indentWithTab,
      { key: "Mod-s", run: (v) => { onSave(v.state.doc.toString()); return true; }, preventDefault: true },
    ]),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) onChange(update.state.doc.toString());
    }),
  ];
  if (lang) extensions.push(lang);
  if (lint) extensions.push(lint, lintGutter());

  const view = new EditorView({
    state: EditorState.create({ doc, extensions }),
    parent: container,
  });

  return {
    getValue: () => view.state.doc.toString(),
    setDirty: () => {}, // dirty tracking lives in editor.js, not here
    setWordWrap: (on) => view.dispatch({ effects: wrapCompartment.reconfigure(on ? EditorView.lineWrapping : []) }),
    setTheme: (isDark) => view.dispatch({
      effects: themeCompartment.reconfigure(isDark ? [darkTheme, syntaxHighlighting(darkHighlight)] : [lightTheme, syntaxHighlighting(lightHighlight)]),
    }),
    focus: () => view.focus(),
    destroy: () => view.destroy(),
  };
}

window.TkEditor = { createEditor };
