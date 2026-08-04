<script setup lang="ts">
import { computed } from 'vue'
import { NConfigProvider, NMessageProvider, NDialogProvider, darkTheme } from 'naive-ui'
import { darkThemeOverrides, lightThemeOverrides } from './theme'
import { usePrefersDark } from './composables/usePrefersDark'

const prefersDark = usePrefersDark()
const theme = computed(() => (prefersDark.value ? darkTheme : null))
const themeOverrides = computed(() => (prefersDark.value ? darkThemeOverrides : lightThemeOverrides))
</script>

<template>
  <NConfigProvider :theme="theme" :theme-overrides="themeOverrides">
    <NMessageProvider>
      <NDialogProvider>
        <router-view />
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
