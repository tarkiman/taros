import { computed, ref, watch } from 'vue'

export type ThemeMode = 'system' | 'light' | 'dark'

const STORAGE_KEY = 'tk-theme-mode'

function readStoredMode(): ThemeMode {
  const v = localStorage.getItem(STORAGE_KEY)
  return v === 'light' || v === 'dark' ? v : 'system'
}

// Module-level (not per-component) state: every component using the theme
// needs to react to the same mode and system preference, and index.html's
// inline bootstrap script already resolves the initial value the same way
// before this module even loads (see tokens.css / index.html — avoids a
// flash of the wrong theme on load).
const mode = ref<ThemeMode>(readStoredMode())
const media = window.matchMedia('(prefers-color-scheme: dark)')
const systemPrefersDark = ref(media.matches)
media.addEventListener('change', (e) => {
  systemPrefersDark.value = e.matches
})

const isDark = computed(() => (mode.value === 'system' ? systemPrefersDark.value : mode.value === 'dark'))

// Canvas-rendered charts (ECharts) can't resolve CSS custom properties in
// fillStyle/strokeStyle, so they read `isDark` directly (see GaugeChart/
// LineChart). Regular DOM/Naive UI styling reads the `data-theme` attribute
// via tokens.css instead — kept in sync here as the single source of truth
// both trees observe.
watch(
  isDark,
  (dark) => {
    document.documentElement.dataset.theme = dark ? 'dark' : 'light'
  },
  { immediate: true },
)

/** Drop-in replacement for the old usePrefersDark(): resolved dark/light as a boolean ref. */
export function useTheme() {
  return isDark
}

/** For the theme toggle control: current mode plus a setter that persists the choice. */
export function useThemeMode() {
  function setMode(m: ThemeMode) {
    mode.value = m
    if (m === 'system') localStorage.removeItem(STORAGE_KEY)
    else localStorage.setItem(STORAGE_KEY, m)
  }
  return { mode, setMode }
}
