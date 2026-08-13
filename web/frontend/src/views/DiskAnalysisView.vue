<script setup lang="ts">
import { computed, h, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NDataTable, NPopconfirm, NSpace, NSpin, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import { diskAnalysisApi } from '../api/diskAnalysis'
import { filesApi } from '../api/files'
import { ApiError } from '../api/client'
import { formatBytes } from '../utils/format'
import type { ScanEntry, ScanResult } from '../types/diskAnalysis'

const { t } = useI18n()
const message = useMessage()

type Status = 'checking' | 'disabled' | 'ready'
const status = ref<Status>('checking')

const scanning = ref(false)
const result = ref<ScanResult | null>(null)
const checkedFiles = ref<string[]>([])

onMounted(async () => {
  try {
    const res = await diskAnalysisApi.status()
    status.value = res.enabled ? 'ready' : 'disabled'
  } catch {
    status.value = 'disabled'
  }
})

async function runScan() {
  scanning.value = true
  try {
    result.value = await diskAnalysisApi.scan()
    checkedFiles.value = []
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : t('diskAnalysis.scanFailed'))
  } finally {
    scanning.value = false
  }
}

// Sequential, not parallel — same reasoning as FilesView.vue's
// removeSelected (avoid hammering the filesystem with a delete burst).
async function deleteOne(path: string) {
  try {
    await filesApi.remove(path)
    message.success(t('diskAnalysis.deleteDone'))
    await runScan()
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : t('diskAnalysis.deleteFailed', { path }))
  }
}

async function deleteSelected() {
  for (const path of checkedFiles.value) {
    try {
      await filesApi.remove(path)
    } catch (e) {
      message.error(e instanceof ApiError ? e.message : t('diskAnalysis.deleteFailed', { path }))
    }
  }
  message.success(t('diskAnalysis.deleteDone'))
  await runScan()
}

function dirPercent(bytes: number): number {
  const total = result.value?.totalBytes ?? 0
  if (total <= 0) return 0
  return Math.min((bytes / total) * 100, 100)
}

const fileColumns = computed<DataTableColumns<ScanEntry>>(() => [
  { type: 'selection' },
  { title: t('diskAnalysis.path'), key: 'path', ellipsis: { tooltip: true }, minWidth: 280 },
  {
    title: t('common.size'),
    key: 'sizeBytes',
    width: 110,
    sorter: (a, b) => a.sizeBytes - b.sizeBytes,
    render: (row) => formatBytes(row.sizeBytes),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 90,
    render: (row) =>
      h(
        NPopconfirm,
        { onPositiveClick: () => deleteOne(row.path) },
        {
          trigger: () => h(NButton, { size: 'tiny', quaternary: true, type: 'error' }, () => t('common.delete')),
          default: () => t('diskAnalysis.confirmDeleteOne', { path: row.path }),
        },
      ),
  },
])
</script>

<template>
  <AppShell>
    <div class="disk-analysis-page">
      <NAlert v-if="status === 'disabled'" type="info" :title="t('diskAnalysis.disabledTitle')">
        {{ t('diskAnalysis.disabledBodyBefore') }}<code>diskAnalysis.enabled: true</code>{{ t('diskAnalysis.disabledBodyAfter') }}
        <code>config.yaml</code>.
      </NAlert>

      <template v-else-if="status === 'ready'">
        <NCard :title="t('diskAnalysis.title')">
          <p class="text-muted">{{ t('diskAnalysis.description') }}</p>
          <NButton type="primary" :loading="scanning" @click="runScan">{{ t('diskAnalysis.runButton') }}</NButton>
        </NCard>

        <div v-if="scanning && !result" class="scan-loading"><NSpin size="large" /></div>

        <template v-if="result">
          <NCard :title="t('diskAnalysis.summaryTitle')" class="section">
            <p class="text-muted">
              {{ t('diskAnalysis.summary', { total: formatBytes(result.totalBytes), duration: (result.durationMs / 1000).toFixed(1) }) }}
            </p>
            <NAlert v-if="result.skippedMounts && result.skippedMounts.length > 0" type="info" :title="t('diskAnalysis.skippedMountsTitle')" class="section">
              {{ result.skippedMounts.join(', ') }}
            </NAlert>
            <NAlert v-if="result.permissionErrors" type="info" :title="t('diskAnalysis.permissionErrorsTitle', { count: result.permissionErrors })" class="section" />
          </NCard>

          <NCard :title="t('diskAnalysis.topLevelDirs')" class="section">
            <div v-if="result.topLevelDirs.length > 0" class="dir-list">
              <div v-for="d in result.topLevelDirs" :key="d.path" class="dir-row">
                <div class="dir-head">
                  <span class="dir-path">{{ d.path }}</span>
                  <span class="dir-size">{{ formatBytes(d.sizeBytes) }}</span>
                </div>
                <div class="dir-bar-track">
                  <div class="dir-bar-fill" :style="{ width: dirPercent(d.sizeBytes) + '%' }" />
                </div>
                <RouterLink :to="{ path: '/files', query: { path: d.path } }" class="dir-open-link">
                  {{ t('diskAnalysis.openInFiles') }}
                </RouterLink>
              </div>
            </div>
            <p v-else class="text-muted">{{ t('diskAnalysis.noData') }}</p>
          </NCard>

          <NCard :title="t('diskAnalysis.largestFiles')" class="section">
            <NSpace v-if="checkedFiles.length > 0" align="center" :size="8" style="margin-bottom: 8px">
              <span class="text-muted">{{ t('diskAnalysis.selectedCount', { count: checkedFiles.length }) }}</span>
              <NPopconfirm @positive-click="deleteSelected">
                <template #trigger>
                  <NButton size="small" type="error" quaternary>{{ t('diskAnalysis.deleteSelected') }}</NButton>
                </template>
                {{ t('diskAnalysis.confirmDeleteSelected', { count: checkedFiles.length }) }}
              </NPopconfirm>
            </NSpace>
            <NDataTable
              v-if="result.largestFiles.length > 0"
              :columns="fileColumns"
              :data="result.largestFiles"
              :row-key="(r: ScanEntry) => r.path"
              v-model:checked-row-keys="checkedFiles"
              size="small"
            />
            <p v-else class="text-muted">{{ t('diskAnalysis.noData') }}</p>
          </NCard>
        </template>
      </template>

      <div v-else class="scan-loading"><NSpin size="large" /></div>
    </div>
  </AppShell>
</template>

<style scoped>
.disk-analysis-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.section {
  margin-top: 4px;
}
.scan-loading {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}
.dir-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.dir-row {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.dir-head {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
}
.dir-path {
  font-family: monospace;
}
.dir-bar-track {
  height: 6px;
  border-radius: 3px;
  background: var(--border, rgba(128, 128, 128, 0.2));
  overflow: hidden;
}
.dir-bar-fill {
  height: 100%;
  background: var(--accent);
  border-radius: 3px;
}
.dir-open-link {
  font-size: 12px;
  align-self: flex-start;
  color: var(--accent);
}
.text-muted {
  color: var(--text-muted);
}
</style>
