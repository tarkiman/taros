// Ported from scripts/codemirror-build/src/editor-entry.js — that esbuild
// pipeline is gone now that CodeMirror is a direct Vite/npm dependency
// (see docs/03-tech-stack.md), so this is a plain ES module import inside
// EditorView.vue instead of a window.TkEditor global.
import { EditorState, Compartment, type Extension } from '@codemirror/state'
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  highlightWhitespace,
  highlightTrailingWhitespace,
  drawSelection,
} from '@codemirror/view'
import { defaultKeymap, history, historyKeymap, indentWithTab } from '@codemirror/commands'
import {
  syntaxHighlighting,
  defaultHighlightStyle,
  HighlightStyle,
  indentOnInput,
  bracketMatching,
  foldGutter,
  foldKeymap,
  indentUnit,
  StreamLanguage,
  type LanguageSupport,
} from '@codemirror/language'
import { closeBrackets, closeBracketsKeymap, autocompletion } from '@codemirror/autocomplete'
import { searchKeymap, highlightSelectionMatches } from '@codemirror/search'
import { linter, lintGutter } from '@codemirror/lint'
import { tags } from '@lezer/highlight'

import { yaml } from '@codemirror/lang-yaml'
import { json, jsonParseLinter } from '@codemirror/lang-json'
import { markdown } from '@codemirror/lang-markdown'
import { shell } from '@codemirror/legacy-modes/mode/shell'
import { properties } from '@codemirror/legacy-modes/mode/properties'

import { load as yamlLoad } from 'js-yaml'

import { i18n } from '../i18n'

// --- language selection by extension — see docs/04-features.md §4.4 ---
const EXT_LANG: Record<string, () => LanguageSupport | Extension> = {
  yaml: () => yaml(),
  yml: () => yaml(),
  json: () => json(),
  md: () => markdown(),
  markdown: () => markdown(),
  sh: () => StreamLanguage.define(shell),
  bash: () => StreamLanguage.define(shell),
  conf: () => StreamLanguage.define(properties),
  cfg: () => StreamLanguage.define(properties),
  ini: () => StreamLanguage.define(properties),
  toml: () => StreamLanguage.define(properties),
  env: () => StreamLanguage.define(properties),
  properties: () => StreamLanguage.define(properties),
}

function languageForFilename(name: string) {
  const ext = (name.split('.').pop() || '').toLowerCase()
  return EXT_LANG[ext] ? EXT_LANG[ext]() : null
}

// --- YAML/JSON validation markers — docs/04-features.md §4.4 "Validasi
// ringan untuk YAML & JSON". JSON already has an official linter
// (jsonParseLinter); YAML doesn't, so js-yaml's own parse error (which
// carries a line/column mark) is mapped into a CodeMirror diagnostic. ---
function yamlLinter() {
  return linter((view) => {
    const text = view.state.doc.toString()
    try {
      yamlLoad(text)
      return []
    } catch (e) {
      const err = e as { mark?: { line: number; column: number }; reason?: string; message?: string }
      if (!err.mark) return []
      const line = view.state.doc.line(Math.min(err.mark.line + 1, view.state.doc.lines))
      const from = line.from + Math.min(err.mark.column, line.length)
      return [{ from, to: Math.min(from + 1, line.to), severity: 'error' as const, message: err.reason || err.message || i18n.global.t('editor.invalidYaml') }]
    }
  })
}

function linterForFilename(name: string) {
  const ext = (name.split('.').pop() || '').toLowerCase()
  // jsonParseLinter() returns a linter *source* function, not an
  // Extension — must be wrapped with linter(), same as yamlLinter()
  // already does internally. Missing this wrap was a real bug caught by
  // headless-browser testing in the original htmx-era implementation:
  // CodeMirror threw "Unrecognized extension value" and the editor never
  // mounted at all.
  if (ext === 'json') return linter(jsonParseLinter())
  if (ext === 'yaml' || ext === 'yml') return yamlLinter()
  return null
}

// Same system-monospace stack as tokens.css — no web font.
const MONOSPACE_STACK = 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace'

// --- themes matching src/style/tokens.css design tokens ---
const darkTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#0f1115', color: '#e8eaed', height: '100%', fontSize: '14px' },
    '.cm-content': { caretColor: '#4da3ff', fontFamily: MONOSPACE_STACK },
    '.cm-gutters': { backgroundColor: '#171a20', color: '#9aa1ab', border: 'none' },
    '.cm-activeLine': { backgroundColor: '#171a2088' },
    '.cm-activeLineGutter': { backgroundColor: '#171a20' },
    '.cm-selectionMatch': { backgroundColor: '#4da3ff33' },
    '&.cm-focused .cm-matchingBracket': { backgroundColor: '#4da3ff55' },
  },
  { dark: true },
)

const lightTheme = EditorView.theme(
  {
    '&': { backgroundColor: '#ffffff', color: '#14161a', height: '100%', fontSize: '14px' },
    '.cm-content': { caretColor: '#2f6fbf', fontFamily: MONOSPACE_STACK },
    '.cm-gutters': { backgroundColor: '#f4f5f7', color: '#5b6270', border: 'none' },
    '.cm-activeLine': { backgroundColor: '#f4f5f7' },
    '.cm-activeLineGutter': { backgroundColor: '#f4f5f7' },
    '.cm-selectionMatch': { backgroundColor: '#4da3ff33' },
  },
  { dark: false },
)

const darkHighlight = HighlightStyle.define([
  { tag: tags.keyword, color: '#c586c0' },
  { tag: [tags.string, tags.special(tags.string)], color: '#ce9178' },
  { tag: tags.comment, color: '#6a9955', fontStyle: 'italic' },
  { tag: tags.number, color: '#b5cea8' },
  { tag: [tags.propertyName, tags.attributeName], color: '#9cdcfe' },
  { tag: tags.bool, color: '#569cd6' },
  { tag: tags.heading, color: '#4da3ff', fontWeight: 'bold' },
])

const lightHighlight = defaultHighlightStyle

export interface CreateEditorOptions {
  container: HTMLElement
  doc: string
  filename: string
  dark: boolean
  wordWrap: boolean
  onChange: (value: string) => void
  onSave: (value: string) => void
}

export function createEditor({ container, doc, filename, dark, wordWrap, onChange, onSave }: CreateEditorOptions) {
  const lang = languageForFilename(filename)
  const lint = linterForFilename(filename)

  // Per-instance compartments (not module-level) — this module can now be
  // imported into a component that mounts more than once per page
  // lifetime (SPA navigation between files), unlike the old vanilla-JS
  // version where exactly one editor ever existed per full page load.
  const wrapCompartment = new Compartment()
  const themeCompartment = new Compartment()

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
    indentUnit.of('  '),
    themeCompartment.of(dark ? [darkTheme, syntaxHighlighting(darkHighlight)] : [lightTheme, syntaxHighlighting(lightHighlight)]),
    wrapCompartment.of(wordWrap ? EditorView.lineWrapping : []),
    keymap.of([
      ...closeBracketsKeymap,
      ...defaultKeymap,
      ...searchKeymap,
      ...historyKeymap,
      ...foldKeymap,
      indentWithTab,
      {
        key: 'Mod-s',
        run: (v) => {
          onSave(v.state.doc.toString())
          return true
        },
        preventDefault: true,
      },
    ]),
    EditorView.updateListener.of((update) => {
      if (update.docChanged) onChange(update.state.doc.toString())
    }),
  ]
  if (lang) extensions.push(lang)
  if (lint) extensions.push(lint, lintGutter())

  const view = new EditorView({
    state: EditorState.create({ doc, extensions }),
    parent: container,
  })

  return {
    getValue: () => view.state.doc.toString(),
    setWordWrap: (on: boolean) => view.dispatch({ effects: wrapCompartment.reconfigure(on ? EditorView.lineWrapping : []) }),
    setTheme: (isDark: boolean) =>
      view.dispatch({
        effects: themeCompartment.reconfigure(isDark ? [darkTheme, syntaxHighlighting(darkHighlight)] : [lightTheme, syntaxHighlighting(lightHighlight)]),
      }),
    focus: () => view.focus(),
    destroy: () => view.destroy(),
  }
}
