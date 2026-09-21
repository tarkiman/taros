<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NSpin, NTabPane, NTabs } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import { ApiError } from '../api/client'
import { sharingApi, type SharingResponse } from '../api/sharing'
import SharingOverview from '../components/sharing/SharingOverview.vue'
import SharingShares from '../components/sharing/SharingShares.vue'
import SharingAccounts from '../components/sharing/SharingAccounts.vue'

// File sharing (internal/sharing, docs/04-features.md §4.16): SMB management,
// FTP reporting. The page has to make sense on every host — nothing installed,
// installed but foreign-configured, not root, not Linux — so it is driven
// entirely by what /api/sharing/status reports.
const { t } = useI18n()
const data = ref<SharingResponse | null>(null)
const loading = ref(true)
const loadError = ref('')
const tab = ref('overview')

async function load() {
  loadError.value = ''
  try {
    data.value = await sharingApi.status()
  } catch (e) {
    loadError.value = e instanceof ApiError ? e.message : t('sharing.failed')
  } finally {
    loading.value = false
  }
}
onMounted(load)
</script>

<template>
  <AppShell>
    <div class="sharing-page">
      <NCard :title="t('sharing.title')" size="small">
        <template #header-extra>
          <NButton size="small" :loading="loading" @click="load">{{ t('sharing.refresh') }}</NButton>
        </template>
        <p class="muted">{{ t('sharing.desc') }}</p>
      </NCard>

      <div v-if="loading && !data" class="center"><NSpin size="large" /></div>
      <NAlert v-else-if="loadError" type="error" :show-icon="false">
        {{ loadError }} <NButton size="tiny" @click="load">{{ t('common.tryAgain') }}</NButton>
      </NAlert>
      <NAlert v-else-if="data && !data.status.supported" type="info" :title="t('sharing.unsupportedTitle')">{{ t('sharing.unsupported') }}</NAlert>
      <template v-else-if="data">
        <NAlert v-if="!data.status.root" type="warning" :show-icon="false" class="gap">{{ t('sharing.notRoot') }}</NAlert>
        <NTabs v-model:value="tab" type="line" animated>
          <NTabPane name="overview" :tab="t('sharing.tab.overview')">
            <SharingOverview :data="data" @changed="load" />
          </NTabPane>
          <NTabPane name="folders" :tab="t('sharing.tab.folders')">
            <SharingShares :data="data" @changed="load" @goto="(x: string) => (tab = x)" />
          </NTabPane>
          <NTabPane name="accounts" :tab="t('sharing.tab.accounts')">
            <SharingAccounts :data="data" @changed="load" />
          </NTabPane>
        </NTabs>
      </template>
    </div>
  </AppShell>
</template>

<style scoped>
.sharing-page { display: flex; flex-direction: column; gap: 12px; }
.muted { color: var(--text-muted); margin: 0; }
.center { display: flex; justify-content: center; padding: 32px 0; }
.gap { margin-bottom: 4px; }
</style>
