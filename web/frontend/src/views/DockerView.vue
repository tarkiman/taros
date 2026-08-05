<script setup lang="ts">
import { h, onMounted, onUnmounted, ref, watch } from 'vue'
import {
  NTabs,
  NTabPane,
  NDataTable,
  NButton,
  NTag,
  NPopconfirm,
  NAlert,
  NSpace,
  NDescriptions,
  NDescriptionsItem,
  NEmpty,
  NSpin,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import { dockerApi, type SettingsResponse } from '../api/docker'
import { ApiError } from '../api/client'
import type { Container, DockerUnavailable, Image, Network, Volume } from '../types/docker'
import { formatBytes, formatDate } from '../utils/format'

const message = useMessage()

function isUnavailable(e: unknown): e is ApiError & { body: DockerUnavailable } {
  return (
    e instanceof ApiError &&
    e.status === 503 &&
    !!e.body &&
    typeof e.body === 'object' &&
    'enabled' in (e.body as object)
  )
}

function reportActionError(e: unknown, fallback: string) {
  message.error(e instanceof ApiError ? e.message : fallback)
}

const stateTagType = (state: string): 'success' | 'warning' | 'default' | 'error' => {
  if (state === 'running') return 'success'
  if (state === 'paused' || state === 'restarting') return 'warning'
  if (state === 'dead') return 'error'
  return 'default'
}

// Lower = "more active" first, matching how someone actually wants to scan
// this table — not alphabetical on the raw Docker state string.
const containerStateRank: Record<string, number> = { running: 0, restarting: 1, paused: 2, created: 3, exited: 4, dead: 5 }
function containerStateSortValue(c: Container) {
  return containerStateRank[c.state] ?? 6
}
// hasStats can be false briefly (stats not polled yet) — sort those last
// regardless of direction rather than letting them collapse to 0.
function statVal(c: Container, pick: (s: Container['stats']) => number) {
  return c.hasStats ? pick(c.stats) : -1
}

// --- Containers (auto-refresh every 5s while this tab is active, same
// cadence as the old htmx fragment) ---
const containers = ref<Container[]>([])
const containersLoading = ref(true)
const containersUnavailable = ref<DockerUnavailable | null>(null)
let containersTimer: ReturnType<typeof setInterval> | undefined

async function loadContainers() {
  try {
    const res = await dockerApi.containers()
    containers.value = res.containers
    containersUnavailable.value = null
  } catch (e) {
    if (isUnavailable(e)) containersUnavailable.value = e.body
  } finally {
    containersLoading.value = false
  }
}

async function containerAction(id: string, action: 'start' | 'stop' | 'restart' | 'remove') {
  try {
    const res = await dockerApi.containerAction(id, action)
    containers.value = res.containers
  } catch (e) {
    reportActionError(e, `Aksi ${action} gagal`)
  }
}

const containerColumns: DataTableColumns<Container> = [
  { title: 'Nama', key: 'name', width: 160, ellipsis: { tooltip: true }, sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: 'Image', key: 'image', width: 180, ellipsis: { tooltip: true }, sorter: (a, b) => a.image.localeCompare(b.image) },
  {
    title: 'Status',
    key: 'state',
    width: 130,
    sorter: (a, b) => containerStateSortValue(a) - containerStateSortValue(b),
    render: (row) => h(NTag, { type: stateTagType(row.state), size: 'small' }, { default: () => row.status }),
  },
  {
    title: 'CPU',
    key: 'cpu',
    width: 70,
    sorter: (a, b) => statVal(a, (s) => s.cpuPercent) - statVal(b, (s) => s.cpuPercent),
    render: (row) => (row.hasStats ? `${row.stats.cpuPercent.toFixed(1)}%` : '—'),
  },
  {
    title: 'RAM',
    key: 'ram',
    width: 150,
    sorter: (a, b) => statVal(a, (s) => s.memUsageBytes) - statVal(b, (s) => s.memUsageBytes),
    render: (row) =>
      row.hasStats ? `${formatBytes(row.stats.memUsageBytes)} / ${formatBytes(row.stats.memLimitBytes)}` : '—',
  },
  {
    title: 'Network',
    key: 'net',
    width: 140,
    sorter: (a, b) => statVal(a, (s) => s.netRxBytes + s.netTxBytes) - statVal(b, (s) => s.netRxBytes + s.netTxBytes),
    render: (row) =>
      row.hasStats ? `↓ ${formatBytes(row.stats.netRxBytes)} ↑ ${formatBytes(row.stats.netTxBytes)}` : '—',
  },
  // Containers with many published ports (e.g. large UDP ranges) can
  // produce a huge string here — without a width cap this crushes every
  // other column to near-zero, seen for real against a container with
  // 100+ mapped ports. Truncate with a tooltip for the full list instead.
  { title: 'Ports', key: 'ports', width: 220, ellipsis: { tooltip: true } },
  {
    title: 'Aksi',
    key: 'actions',
    width: 220,
    render: (row) =>
      h(NSpace, { size: 'small' }, () => [
        row.state === 'running'
          ? [
              h(NButton, { size: 'tiny', onClick: () => containerAction(row.id, 'stop') }, () => 'Stop'),
              h(NButton, { size: 'tiny', onClick: () => containerAction(row.id, 'restart') }, () => 'Restart'),
            ]
          : h(NButton, { size: 'tiny', type: 'primary', onClick: () => containerAction(row.id, 'start') }, () => 'Start'),
        h(
          NPopconfirm,
          { onPositiveClick: () => containerAction(row.id, 'remove') },
          {
            trigger: () => h(NButton, { size: 'tiny', type: 'error', ghost: true }, () => 'Hapus'),
            default: () => `Hapus container "${row.name}"?`,
          },
        ),
      ]),
  },
]

// --- Images ---
const images = ref<Image[]>([])
const imagesLoading = ref(true)
const imagesUnavailable = ref<DockerUnavailable | null>(null)

async function loadImages() {
  imagesLoading.value = true
  try {
    const res = await dockerApi.images()
    images.value = res.images
    imagesUnavailable.value = null
  } catch (e) {
    if (isUnavailable(e)) imagesUnavailable.value = e.body
  } finally {
    imagesLoading.value = false
  }
}

async function removeImage(id: string) {
  try {
    const res = await dockerApi.removeImage(id)
    images.value = res.images
  } catch (e) {
    reportActionError(e, 'Hapus image gagal (mungkin masih dipakai container)')
  }
}

const imageColumns: DataTableColumns<Image> = [
  {
    title: 'Tag',
    key: 'tag',
    minWidth: 200,
    ellipsis: { tooltip: true },
    sorter: (a, b) => a.tag.localeCompare(b.tag),
    render: (row) =>
      row.dangling
        ? h(NSpace, { size: 'small', align: 'center' }, () => [row.tag, h(NTag, { size: 'small', type: 'warning' }, () => 'dangling')])
        : row.tag,
  },
  { title: 'Ukuran', key: 'sizeBytes', width: 110, sorter: (a, b) => a.sizeBytes - b.sizeBytes, render: (row) => formatBytes(row.sizeBytes) },
  {
    title: 'Dipakai',
    key: 'containers',
    width: 140,
    sorter: (a, b) => a.containers - b.containers,
    render: (row) => (row.containers < 0 ? '—' : row.containers === 0 ? 'tidak dipakai' : `${row.containers} container`),
  },
  { title: 'Dibuat', key: 'created', width: 150, sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created), render: (row) => formatDate(row.created) },
  {
    title: 'Aksi',
    key: 'actions',
    width: 100,
    render: (row) =>
      h(
        NPopconfirm,
        { onPositiveClick: () => removeImage(row.id) },
        {
          trigger: () => h(NButton, { size: 'tiny', type: 'error', ghost: true }, () => 'Hapus'),
          default: () => `Hapus image "${row.tag}"?`,
        },
      ),
  },
]

// --- Volumes ---
const volumes = ref<Volume[]>([])
const volumesLoading = ref(true)
const volumesUnavailable = ref<DockerUnavailable | null>(null)

async function loadVolumes() {
  volumesLoading.value = true
  try {
    const res = await dockerApi.volumes()
    volumes.value = res.volumes
    volumesUnavailable.value = null
  } catch (e) {
    if (isUnavailable(e)) volumesUnavailable.value = e.body
  } finally {
    volumesLoading.value = false
  }
}

async function removeVolume(name: string) {
  try {
    const res = await dockerApi.removeVolume(name)
    volumes.value = res.volumes
  } catch (e) {
    reportActionError(e, 'Hapus volume gagal (mungkin masih dipakai container)')
  }
}

const volumeColumns: DataTableColumns<Volume> = [
  { title: 'Nama', key: 'name', minWidth: 180, ellipsis: { tooltip: true }, sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: 'Driver', key: 'driver', width: 100, sorter: (a, b) => a.driver.localeCompare(b.driver) },
  {
    title: 'Ukuran',
    key: 'sizeBytes',
    width: 110,
    sorter: (a, b) => a.sizeBytes - b.sizeBytes,
    render: (row) => (row.sizeBytes < 0 ? 'tidak diketahui' : formatBytes(row.sizeBytes)),
  },
  {
    title: 'Status',
    key: 'inUse',
    width: 120,
    sorter: (a, b) => Number(a.inUse) - Number(b.inUse),
    render: (row) => h(NTag, { size: 'small', type: row.inUse ? 'success' : 'default' }, () => (row.inUse ? 'dipakai' : 'tidak dipakai')),
  },
  {
    title: 'Aksi',
    key: 'actions',
    width: 100,
    render: (row) =>
      h(
        NPopconfirm,
        { onPositiveClick: () => removeVolume(row.name) },
        {
          trigger: () => h(NButton, { size: 'tiny', type: 'error', ghost: true }, () => 'Hapus'),
          default: () => `Hapus volume "${row.name}"?`,
        },
      ),
  },
]

// --- Networks ---
const networks = ref<Network[]>([])
const networksLoading = ref(true)
const networksUnavailable = ref<DockerUnavailable | null>(null)

async function loadNetworks() {
  networksLoading.value = true
  try {
    const res = await dockerApi.networks()
    networks.value = res.networks
    networksUnavailable.value = null
  } catch (e) {
    if (isUnavailable(e)) networksUnavailable.value = e.body
  } finally {
    networksLoading.value = false
  }
}

async function removeNetwork(id: string) {
  try {
    const res = await dockerApi.removeNetwork(id)
    networks.value = res.networks
  } catch (e) {
    reportActionError(e, 'Hapus network gagal (mungkin builtin atau masih dipakai)')
  }
}

const networkColumns: DataTableColumns<Network> = [
  {
    title: 'Nama',
    key: 'name',
    minWidth: 160,
    ellipsis: { tooltip: true },
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (row) =>
      row.builtin
        ? h(NSpace, { size: 'small', align: 'center' }, () => [row.name, h(NTag, { size: 'small' }, () => 'builtin')])
        : row.name,
  },
  { title: 'Driver', key: 'driver', width: 100, sorter: (a, b) => a.driver.localeCompare(b.driver) },
  { title: 'Subnet', key: 'subnet', width: 150, sorter: (a, b) => a.subnet.localeCompare(b.subnet), render: (row) => row.subnet || '—' },
  { title: 'Container Terhubung', key: 'connectedCount', width: 170, sorter: (a, b) => a.connectedCount - b.connectedCount },
  {
    title: 'Aksi',
    key: 'actions',
    width: 100,
    render: (row) =>
      row.builtin
        ? null
        : h(
            NPopconfirm,
            { onPositiveClick: () => removeNetwork(row.id) },
            {
              trigger: () => h(NButton, { size: 'tiny', type: 'error', ghost: true }, () => 'Hapus'),
              default: () => `Hapus network "${row.name}"?`,
            },
          ),
  },
]

// --- Settings ---
const settings = ref<SettingsResponse | null>(null)
const settingsLoading = ref(true)
const settingsUnavailable = ref<DockerUnavailable | null>(null)
const pruning = ref<string | null>(null)

async function loadSettings() {
  settingsLoading.value = true
  try {
    settings.value = await dockerApi.settings()
    settingsUnavailable.value = null
  } catch (e) {
    if (isUnavailable(e)) settingsUnavailable.value = e.body
  } finally {
    settingsLoading.value = false
  }
}

async function prune(kind: 'containers' | 'images' | 'volumes' | 'networks' | 'all') {
  pruning.value = kind
  try {
    settings.value = await dockerApi.prune(kind)
    message.success('Cleanup selesai')
  } catch (e) {
    reportActionError(e, `Cleanup gagal: ${kind}`)
  } finally {
    pruning.value = null
  }
}

// --- Tab lifecycle ---
const activeTab = ref('containers')
const loadedTabs = new Set<string>(['containers'])

watch(activeTab, (tab) => {
  if (loadedTabs.has(tab)) return
  loadedTabs.add(tab)
  if (tab === 'images') loadImages()
  else if (tab === 'volumes') loadVolumes()
  else if (tab === 'networks') loadNetworks()
  else if (tab === 'settings') loadSettings()
})

onMounted(() => {
  loadContainers()
  containersTimer = setInterval(loadContainers, 5000)
})
onUnmounted(() => {
  if (containersTimer) clearInterval(containersTimer)
})
</script>

<template>
  <AppShell>
    <NTabs type="line" v-model:value="activeTab">
      <NTabPane name="containers" tab="Containers">
        <NAlert v-if="containersUnavailable" type="warning" :title="containersUnavailable.error" />
        <NDataTable
          v-else
          :columns="containerColumns"
          :data="containers"
          :loading="containersLoading"
          :row-key="(r: Container) => r.id"
          :scroll-x="1200"
        />
      </NTabPane>
      <NTabPane name="images" tab="Images">
        <NAlert v-if="imagesUnavailable" type="warning" :title="imagesUnavailable.error" />
        <NDataTable v-else :columns="imageColumns" :data="images" :loading="imagesLoading" :row-key="(r: Image) => r.id" :scroll-x="700" />
      </NTabPane>
      <NTabPane name="volumes" tab="Volumes">
        <NAlert v-if="volumesUnavailable" type="warning" :title="volumesUnavailable.error" />
        <NDataTable v-else :columns="volumeColumns" :data="volumes" :loading="volumesLoading" :row-key="(r: Volume) => r.name" :scroll-x="610" />
      </NTabPane>
      <NTabPane name="networks" tab="Networks">
        <NAlert v-if="networksUnavailable" type="warning" :title="networksUnavailable.error" />
        <NDataTable v-else :columns="networkColumns" :data="networks" :loading="networksLoading" :row-key="(r: Network) => r.id" :scroll-x="680" />
      </NTabPane>
      <NTabPane name="settings" tab="Settings">
        <NAlert v-if="settingsUnavailable" type="warning" :title="settingsUnavailable.error" />
        <div v-else-if="settingsLoading && !settings" class="tab-loading"><NSpin size="large" /></div>
        <NEmpty v-else-if="!settings" description="Tidak ada data" />
        <NSpace v-else vertical :size="24">
          <NDescriptions title="Info Daemon" :column="2" bordered label-placement="left">
            <NDescriptionsItem label="Versi Server">{{ settings?.info.serverVersion }}</NDescriptionsItem>
            <NDescriptionsItem label="OS / Kernel">{{ settings?.info.operatingSystem }} / {{ settings?.info.kernelVersion }}</NDescriptionsItem>
            <NDescriptionsItem label="Storage Driver">{{ settings?.info.storageDriver }}</NDescriptionsItem>
            <NDescriptionsItem label="Root Dir">{{ settings?.info.dockerRootDir }}</NDescriptionsItem>
            <NDescriptionsItem label="Container">
              {{ settings?.info.containersRunning }} running, {{ settings?.info.containersPaused }} paused,
              {{ settings?.info.containersStopped }} stopped
            </NDescriptionsItem>
            <NDescriptionsItem label="Images">{{ settings?.info.images }}</NDescriptionsItem>
          </NDescriptions>

          <NDescriptions title="Disk Usage" :column="2" bordered label-placement="left">
            <NDescriptionsItem label="Images">
              {{ formatBytes(settings?.diskUsage.imagesTotalBytes ?? 0) }}
              (reclaimable {{ formatBytes(settings?.diskUsage.imagesReclaimableBytes ?? 0) }})
            </NDescriptionsItem>
            <NDescriptionsItem label="Containers">{{ formatBytes(settings?.diskUsage.containersTotalBytes ?? 0) }}</NDescriptionsItem>
            <NDescriptionsItem label="Volumes">
              {{ formatBytes(settings?.diskUsage.volumesTotalBytes ?? 0) }}
              (reclaimable {{ formatBytes(settings?.diskUsage.volumesReclaimableBytes ?? 0) }})
            </NDescriptionsItem>
          </NDescriptions>

          <NSpace>
            <NPopconfirm v-for="kind in (['containers', 'images', 'volumes', 'networks', 'all'] as const)" :key="kind" @positive-click="prune(kind)">
              <template #trigger>
                <NButton size="small" :loading="pruning === kind">Bersihkan {{ kind }}</NButton>
              </template>
              Jalankan cleanup "{{ kind }}"? Tindakan ini tidak bisa dibatalkan.
            </NPopconfirm>
          </NSpace>
        </NSpace>
      </NTabPane>
    </NTabs>
  </AppShell>
</template>

<style scoped>
.tab-loading {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}
</style>
