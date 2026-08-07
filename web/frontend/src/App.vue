<script setup lang="ts">
import { computed } from 'vue'
import { NConfigProvider, NMessageProvider, NDialogProvider, darkTheme, idID, enUS, dateIdID, dateEnUS } from 'naive-ui'
import { darkThemeOverrides, lightThemeOverrides } from './theme'
import { useTheme } from './composables/useTheme'
import { useLocale } from './composables/useLocale'
import MiniPlayer from './components/MiniPlayer.vue'

const prefersDark = useTheme()
const theme = computed(() => (prefersDark.value ? darkTheme : null))
const themeOverrides = computed(() => (prefersDark.value ? darkThemeOverrides : lightThemeOverrides))

// Naive UI's own built-in strings (empty-state text, date pickers,
// pagination, "Please Input" placeholders on inputs that don't set their
// own, etc.) have a separate locale system from vue-i18n — without this,
// switching the app's language would leave those specific bits stuck in
// naive-ui's English default regardless of what useLocale() is set to.
const { locale } = useLocale()
const naiveLocale = computed(() => (locale.value === 'id' ? idID : enUS))
const naiveDateLocale = computed(() => (locale.value === 'id' ? dateIdID : dateEnUS))
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides" :locale="naiveLocale" :date-locale="naiveDateLocale">
    <NMessageProvider>
      <NDialogProvider>
        <router-view />
        <!-- Sibling of router-view, not inside AppShell — AppShell is
             re-instantiated on every navigation (see stores/terminal.ts),
             this is the one spot that actually survives route changes, so
             music keeps playing while browsing the rest of the app. -->
        <MiniPlayer />
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
