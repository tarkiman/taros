<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { NCard, NInput, NDataTable, useMessage } from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import { processesApi } from '../api/processes'
import { ApiError } from '../api/client'
import type { ProcInfo } from '../types/processes'
import { formatBytes } from '../utils/format'

const message = useMessage()

// Fetches every process the server can see (backend caps at 1000, well
// past real STB/RPi process counts) once per refresh, then all
// sort/filter interaction happens client-side against that snapshot —
// same pattern as Docker/Service/Files tables, and avoids re-fetching on
// every header click.
const PROC_LIMIT = 1000
const REFRESH_MS = 5000

const processes = ref<ProcInfo[]>([])
const loading = ref(true)
const unavailable = ref(false)
const query = ref('')

let refreshTimer: ReturnType<typeof setInterval> | undefined

async function loadProcesses() {
  try {
    const res = await processesApi.list('cpu', PROC_LIMIT)
    processes.value = res.processes
    unavailable.value = false
  } catch (e) {
    unavailable.value = true
    message.error(e instanceof ApiError ? e.message : 'Gagal membaca daftar proses.')
  } finally {
    loading.value = false
  }
}

const filteredProcesses = computed(() => {
  const q = query.value.trim().toLowerCase()
  if (!q) return processes.value
  return processes.value.filter((p) => p.name.toLowerCase().includes(q) || p.command.toLowerCase().includes(q) || p.user.toLowerCase().includes(q))
})

const columns: DataTableColumns<ProcInfo> = [
  { title: 'PID', key: 'pid', width: 90, sorter: (a, b) => a.pid - b.pid },
  { title: 'Program', key: 'name', width: 160, ellipsis: { tooltip: true }, sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: 'Command', key: 'command', minWidth: 260, ellipsis: { tooltip: true }, sorter: (a, b) => a.command.localeCompare(b.command) },
  { title: 'Threads', key: 'threads', width: 90, sorter: (a, b) => a.threads - b.threads },
  { title: 'User', key: 'user', width: 120, ellipsis: { tooltip: true }, sorter: (a, b) => a.user.localeCompare(b.user) },
  {
    title: 'CPU%',
    key: 'cpuPercent',
    width: 90,
    sorter: (a, b) => a.cpuPercent - b.cpuPercent,
    render: (row) => `${row.cpuPercent.toFixed(1)}%`,
  },
  {
    title: 'MemB',
    key: 'memBytes',
    width: 100,
    sorter: (a, b) => a.memBytes - b.memBytes,
    render: (row) => formatBytes(row.memBytes),
  },
]

onMounted(() => {
  loadProcesses()
  refreshTimer = setInterval(loadProcesses, REFRESH_MS)
})
onUnmounted(() => {
  if (refreshTimer) clearInterval(refreshTimer)
})
</script>

<template>
  <AppShell>
    <NCard>
      <template #header>Proses ({{ filteredProcesses.length }})</template>
      <NInput
        v-model:value="query"
        placeholder="Cari nama, command, atau user…"
        clearable
        style="width: 320px; margin-bottom: 16px"
      />
      <p v-if="unavailable" class="text-muted">Daftar proses tidak bisa dibaca.</p>
      <NDataTable
        v-else
        :columns="columns"
        :data="filteredProcesses"
        :loading="loading"
        :row-key="(r: ProcInfo) => r.pid"
        :scroll-x="900"
        :max-height="'calc(100vh - 320px)'"
        virtual-scroll
      />
    </NCard>
  </AppShell>
</template>

<style scoped>
.text-muted {
  color: var(--text-muted);
}
</style>
