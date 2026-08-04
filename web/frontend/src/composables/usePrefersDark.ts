import { onMounted, onUnmounted, ref } from 'vue'

// Canvas-rendered charts (ECharts) can't resolve CSS custom properties in
// fillStyle/strokeStyle the way DOM elements can, so chart components need
// the actual dark/light flag to pick literal colors from theme.ts tokens.
export function usePrefersDark() {
  const prefersDark = ref(window.matchMedia('(prefers-color-scheme: dark)').matches)
  let media: MediaQueryList | undefined

  function onChange(e: MediaQueryListEvent) {
    prefersDark.value = e.matches
  }

  onMounted(() => {
    media = window.matchMedia('(prefers-color-scheme: dark)')
    media.addEventListener('change', onChange)
  })
  onUnmounted(() => {
    media?.removeEventListener('change', onChange)
  })

  return prefersDark
}
