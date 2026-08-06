<script setup lang="ts">
import { computed } from 'vue'
import { NConfigProvider, NMessageProvider, NDialogProvider, darkTheme } from 'naive-ui'
import { darkThemeOverrides, lightThemeOverrides } from './theme'
import { useTheme } from './composables/useTheme'
import MiniPlayer from './components/MiniPlayer.vue'

const prefersDark = useTheme()
const theme = computed(() => (prefersDark.value ? darkTheme : null))
const themeOverrides = computed(() => (prefersDark.value ? darkThemeOverrides : lightThemeOverrides))
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
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
