<script setup lang="ts">
import { h, onMounted, onUnmounted, ref } from 'vue'
import {
  NCard,
  NInput,
  NCheckbox,
  NSpace,
  NDataTable,
  NTag,
  NButton,
  NPopconfirm,
  NAlert,
  NDrawer,
  NDrawerContent,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import { serviceApi } from '../api/service'
import { ApiError } from '../api/client'
import type { Unit } from '../types/service'

const message = useMessage()

const query = ref('')
const showAll = ref(false)
const failedOnly = ref(false)

const units = ref<Unit[]>([])
const loading = ref(true)
const unavailable = ref<string | null>(null)

let refreshTimer: ReturnType<typeof setInterval> | undefined

async function loadUnits() {
  try {
    const res = await serviceApi.list({ q: query.value, showAll: showAll.value, failedOnly: failedOnly.value })
    units.value = res.units
    unavailable.value = null
  } catch (e) {
    unavailable.value = e instanceof ApiError ? e.message : 'systemd tidak terdeteksi atau tidak bisa diakses.'
  } finally {
    loading.value = false
  }
}

function onFilterChange() {
  loadUnits()
}

async function runAction(unit: Unit, action: 'start' | 'stop' | 'restart' | 'reload') {
  try {
    const res = await serviceApi.action(unit.name, action, { q: query.value, showAll: showAll.value, failedOnly: failedOnly.value })
    units.value = res.units
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : `Aksi ${action} gagal: ${unit.name}`)
  }
}

// --- Log drawer ---
const logOpen = ref(false)
const logUnitName = ref('')
const logText = ref('')
const logLoading = ref(false)

async function openLogs(name: string) {
  logUnitName.value = name
  logText.value = ''
  logLoading.value = true
  logOpen.value = true
  try {
    const res = await serviceApi.logs(name)
    logText.value = res.logs
  } catch (e) {
    logText.value = e instanceof ApiError ? e.message : 'Gagal membaca log.'
  } finally {
    logLoading.value = false
  }
}

const statusTagType = (u: Unit): 'success' | 'warning' | 'error' | 'default' => {
  if (u.active === 'failed') return 'error'
  if (u.active === 'active' && u.sub === 'running') return 'success'
  if (u.active === 'activating' || u.active === 'reloading') return 'warning'
  return 'default'
}

const columns: DataTableColumns<Unit> = [
  {
    title: 'Nama',
    key: 'name',
    width: 220,
    ellipsis: { tooltip: true },
    render: (row) =>
      row.protected
        ? h(NSpace, { size: 'small', align: 'center', wrap: false }, () => [row.name, h(NTag, { size: 'small', type: 'warning' }, () => 'terproteksi')])
        : row.name,
  },
  { title: 'Deskripsi', key: 'description', minWidth: 200, ellipsis: { tooltip: true } },
  {
    title: 'Status',
    key: 'active',
    width: 150,
    render: (row) => h(NTag, { size: 'small', type: statusTagType(row) }, () => `${row.active} (${row.sub})`),
  },
  { title: 'Aktif Saat Boot', key: 'enabled', width: 130, render: (row) => row.enabled || '—' },
  {
    title: 'Aksi',
    key: 'actions',
    width: 260,
    render: (row) => {
      const confirmMsg = row.protected
        ? `"${row.name}" adalah unit terproteksi — yakin ingin melanjutkan? Ini bisa mengganggu layanan inti.`
        : `Lanjutkan aksi ini untuk "${row.name}"?`
      const buttons: ReturnType<typeof h>[] = []
      if (row.active === 'active') {
        buttons.push(
          h(
            NPopconfirm,
            { onPositiveClick: () => runAction(row, 'stop') },
            { trigger: () => h(NButton, { size: 'tiny' }, () => 'Stop'), default: () => confirmMsg },
          ),
          h(
            NPopconfirm,
            { onPositiveClick: () => runAction(row, 'restart') },
            { trigger: () => h(NButton, { size: 'tiny' }, () => 'Restart'), default: () => confirmMsg },
          ),
          h(NButton, { size: 'tiny', onClick: () => runAction(row, 'reload') }, () => 'Reload'),
        )
      } else {
        buttons.push(h(NButton, { size: 'tiny', type: 'primary', onClick: () => runAction(row, 'start') }, () => 'Start'))
      }
      buttons.push(h(NButton, { size: 'tiny', quaternary: true, onClick: () => openLogs(row.name) }, () => 'Log'))
      return h(NSpace, { size: 'small' }, () => buttons)
    },
  },
]

onMounted(() => {
  loadUnits()
  refreshTimer = setInterval(loadUnits, 8000)
})
onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<template>
  <AppShell>
    <NCard>
      <NSpace align="center" :size="16" style="margin-bottom: 16px">
        <NInput
          v-model:value="query"
          placeholder="Cari nama/deskripsi unit…"
          style="width: 280px"
          clearable
          @keyup.enter="onFilterChange"
          @blur="onFilterChange"
          @clear="onFilterChange"
        />
        <NCheckbox v-model:checked="showAll" @update:checked="onFilterChange">Tampilkan socket/timer</NCheckbox>
        <NCheckbox v-model:checked="failedOnly" @update:checked="onFilterChange">Hanya yang failed</NCheckbox>
      </NSpace>

      <NAlert v-if="unavailable" type="warning" :title="unavailable" />
      <NDataTable v-else :columns="columns" :data="units" :loading="loading" :row-key="(r: Unit) => r.name" :scroll-x="1000" />
    </NCard>

    <NDrawer v-model:show="logOpen" :width="560" placement="right">
      <NDrawerContent :title="`Log — ${logUnitName}`" closable>
        <pre class="log-content">{{ logLoading ? 'Memuat…' : logText }}</pre>
      </NDrawerContent>
    </NDrawer>
  </AppShell>
</template>

<style scoped>
.log-content {
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.8rem;
  white-space: pre-wrap;
  word-break: break-all;
  margin: 0;
}
</style>
