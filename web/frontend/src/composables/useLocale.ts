import { watch } from 'vue'
import { i18n, type Locale } from '../i18n'

const STORAGE_KEY = 'tk-locale'

function readStoredLocale(): Locale {
  const v = localStorage.getItem(STORAGE_KEY)
  // No stored preference — e.g. a fresh install's first-ever page load —
  // defaults to English, not the browser's navigator.language: a
  // self-hosted single-user dashboard should behave the same regardless of
  // whichever machine/browser opens it, not silently flip per visitor.
  return v === 'id' ? 'id' : 'en'
}

// i18n.global.locale is already the single reactive ref every component
// using useI18n() reads from (vue-i18n's Composition API mode shares one
// global instance unless a component opts into useScope('local')) — same
// "one module-level source of truth" shape as useTheme.ts's `mode` ref, so
// no separate Pinia store or local ref is needed here.
const locale = i18n.global.locale

locale.value = readStoredLocale()

watch(
  locale,
  (l) => {
    document.documentElement.lang = l
  },
  { immediate: true },
)

export function useLocale() {
  function setLocale(l: Locale) {
    locale.value = l
    localStorage.setItem(STORAGE_KEY, l)
  }
  return { locale, setLocale }
}
