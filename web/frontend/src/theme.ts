import type { GlobalThemeOverrides } from 'naive-ui'

interface ColorTokens {
  bg: string
  surface: string
  surfaceRaised: string
  border: string
  text: string
  textMuted: string
  accent: string
  success: string
  warning: string
  danger: string
  glass: string
  glassStrong: string
  glassBorder: string
}

// Mirrors src/style/tokens.css so Naive UI components (buttons, cards,
// tables, drawers) match the custom charts/gauges instead of looking like
// a bolted-on default theme. Keep the two in sync when tokens change.
export const tokens: { dark: ColorTokens; light: ColorTokens } = {
  dark: {
    bg: '#0f1115',
    surface: '#171a20',
    surfaceRaised: '#1e222a',
    border: '#262b33',
    text: '#e8eaed',
    textMuted: '#9aa1ab',
    accent: '#4da3ff',
    success: '#3ecf6e',
    warning: '#e0a83e',
    danger: '#ef5a5a',
    glass: 'rgba(23, 27, 34, 0.55)',
    glassStrong: 'rgba(23, 27, 34, 0.72)',
    glassBorder: 'rgba(255, 255, 255, 0.09)',
  },
  light: {
    bg: '#f4f5f7',
    surface: '#ffffff',
    surfaceRaised: '#ffffff',
    border: '#e2e5ea',
    text: '#14161a',
    textMuted: '#5b6270',
    accent: '#4da3ff',
    success: '#3ecf6e',
    warning: '#e0a83e',
    danger: '#ef5a5a',
    glass: 'rgba(255, 255, 255, 0.62)',
    glassStrong: 'rgba(255, 255, 255, 0.82)',
    glassBorder: 'rgba(20, 22, 26, 0.08)',
  },
}

function overridesFor(t: ColorTokens): GlobalThemeOverrides {
  return {
    common: {
      primaryColor: t.accent,
      primaryColorHover: t.accent,
      primaryColorPressed: t.accent,
      successColor: t.success,
      warningColor: t.warning,
      errorColor: t.danger,
      bodyColor: t.bg,
      baseColor: t.surface,
      textColorBase: t.text,
      textColor1: t.text,
      textColor2: t.textMuted,
      borderColor: t.border,
      borderRadius: '10px',
      fontFamily:
        '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
      fontFamilyMono:
        'ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace',
    },
    // Glass tokens here, not t.surface — cards/sidebar/topbar stay
    // translucent so the ambient blob backdrop (AppShell.vue, mounted once
    // behind everything) reads through them. Layout's own `color` is
    // transparent for the same reason: an opaque main-content background
    // would hide the backdrop entirely behind every page's content area.
    Card: { color: t.glass, borderColor: t.glassBorder },
    Layout: { color: 'transparent', siderColor: t.glass, headerColor: t.glass },
    Menu: { color: 'transparent' },
  }
}

export const darkThemeOverrides = overridesFor(tokens.dark)
export const lightThemeOverrides = overridesFor(tokens.light)
