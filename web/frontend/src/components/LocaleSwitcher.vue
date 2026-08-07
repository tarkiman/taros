<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { NButton, NIcon } from 'naive-ui'
import { Languages } from '@lucide/vue'
import { useLocale } from '../composables/useLocale'

const { t } = useI18n()
const { locale, setLocale } = useLocale()

const otherLocale = computed(() => (locale.value === 'en' ? 'id' : 'en'))

function toggle() {
  setLocale(otherLocale.value)
}
</script>

<template>
  <NButton quaternary size="small" :title="t('nav.languageSwitch')" :aria-label="t('nav.languageSwitch')" @click="toggle">
    <template #icon><NIcon :component="Languages" size="15" /></template>
    {{ locale.toUpperCase() }}
  </NButton>
</template>
