// Checks the translations without a browser:
//   1. every static t('a.b.c') key used in src/ exists in en and id,
//   2. en and id have exactly the same keys,
//   3. every backend error code in internal/apierr/codes.go has an errors.<code> text.
// Run: npm run check:i18n   (needs Node >= 22.6 for --experimental-strip-types)
import fs from 'fs'

const langs = {}
for (const lang of ['en', 'id']) langs[lang] = (await import(`../src/i18n/${lang}.ts`)).default

const flat = (o, p = '') =>
  Object.entries(o).flatMap(([k, v]) => (v && typeof v === 'object' ? flat(v, p + k + '.') : [p + k]))
const keys = Object.fromEntries(Object.entries(langs).map(([l, m]) => [l, new Set(flat(m))]))

let bad = 0
const report = (msg) => { bad++; console.error('  ✗ ' + msg) }

for (const k of keys.en) if (!keys.id.has(k)) report(`id is missing ${k}`)
for (const k of keys.id) if (!keys.en.has(k)) report(`en is missing ${k}`)

const used = new Map()
const walk = (dir) => {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = `${dir}/${f.name}`
    if (f.isDirectory()) { if (f.name !== 'i18n') walk(p); continue }
    if (!/\.(vue|ts)$/.test(f.name)) continue
    for (const m of fs.readFileSync(p, 'utf8').matchAll(/\bt\(\s*'([a-zA-Z0-9_.]+)'/g)) used.set(m[1], p)
  }
}
walk('src')
for (const [k, file] of used) for (const l of Object.keys(langs)) if (!keys[l].has(k)) report(`${l}: ${k} (used in ${file})`)

const go = fs.readFileSync('../../internal/apierr/codes.go', 'utf8')
for (const m of go.matchAll(/=\s*"([a-z][a-z0-9_]+)"/g)) {
  for (const l of Object.keys(langs)) if (!keys[l].has('errors.' + m[1])) report(`${l}: errors.${m[1]} (backend error code has no text)`)
}

if (bad) { console.error(`i18n check: ${bad} problem(s)`); process.exit(1) }
console.log(`i18n check: ok (${keys.en.size} keys, ${used.size} static uses)`)
