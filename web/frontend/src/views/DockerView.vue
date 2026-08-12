<script setup lang="ts">
import { computed, h, nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
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
  NDrawer,
  NDrawerContent,
  NSelect,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import { dockerApi, type SettingsResponse } from '../api/docker'
import { ApiError } from '../api/client'
import { useContainerLogsStream } from '../composables/useContainerLogsStream'
import type { Container, DockerUnavailable, Image, Network, Volume } from '../types/docker'
import { formatBytes, formatDate } from '../utils/format'

const { t } = useI18n()
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
    reportActionError(e, t('docker.actionFailed', { action }))
  }
}

// --- Container logs drawer: live-tail via SSE, bounded initial backlog
// (see internal/web/handlers_docker.go handleDockerContainerLogsStream and
// docs/04-features.md §4.2 "Log Container" for why tail/sinceMin exist —
// this was a deliberate design discussion with the user before building
// it, not an assumption). ---
const logDrawerOpen = ref(false)
const logContainerId = ref('')
const logContainerName = ref('')
const logSinceMin = ref(5)
const LOG_TAIL = 500
const logSinceOptions = [
  { label: t('docker.logs.last5m'), value: 5 },
  { label: t('docker.logs.last10m'), value: 10 },
  { label: t('docker.logs.last15m'), value: 15 },
  { label: t('docker.logs.last1h'), value: 60 },
  { label: t('docker.logs.last6h'), value: 360 },
  { label: t('docker.logs.last24h'), value: 1440 },
]

const logsStream = useContainerLogsStream()
const logScrollEl = ref<HTMLElement | null>(null)
const autoScroll = ref(true)

// If the connection hasn't opened within a few seconds — e.g. a container
// with an unusually large log history taking longer than expected to
// respond, or a dropped connection — show a hint plus a manual reconnect
// button instead of leaving "Connecting…" up with no way out. Cleared as
// soon as the SSE connection actually opens.
const logConnectSlow = ref(false)
let logConnectSlowTimer: ReturnType<typeof setTimeout> | undefined

function startLogs(id: string, sinceMin: number) {
  logConnectSlow.value = false
  if (logConnectSlowTimer) clearTimeout(logConnectSlowTimer)
  logConnectSlowTimer = setTimeout(() => {
    if (!logsStream.connected.value) logConnectSlow.value = true
  }, 6000)
  logsStream.open(id, sinceMin, LOG_TAIL)
}

function reconnectLogs() {
  autoScroll.value = true
  startLogs(logContainerId.value, logSinceMin.value)
}

function openLogs(container: Container) {
  logContainerId.value = container.id
  logContainerName.value = container.name
  logDrawerOpen.value = true
  autoScroll.value = true
  startLogs(container.id, logSinceMin.value)
}

watch(logSinceMin, (min) => {
  if (!logDrawerOpen.value) return
  autoScroll.value = true
  startLogs(logContainerId.value, min)
})

watch(logDrawerOpen, (open) => {
  if (!open) {
    logsStream.close()
    if (logConnectSlowTimer) clearTimeout(logConnectSlowTimer)
  }
})

watch(logsStream.connected, (connected) => {
  if (connected) {
    logConnectSlow.value = false
    if (logConnectSlowTimer) clearTimeout(logConnectSlowTimer)
  }
})

watch(
  () => logsStream.lines.value.length,
  async () => {
    if (!autoScroll.value) return
    await nextTick()
    const el = logScrollEl.value
    if (el) el.scrollTop = el.scrollHeight
  },
)

// Auto-scroll pauses once the user scrolls away from the bottom (reading
// older lines shouldn't get yanked back down by the next incoming line),
// and resumes once they scroll back to the bottom themselves — standard
// log-viewer behavior.
function onLogScroll() {
  const el = logScrollEl.value
  if (!el) return
  const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 24
  autoScroll.value = atBottom
}

function formatLogTimestamp(ts: string): string {
  if (!ts) return ''
  const d = new Date(ts)
  if (Number.isNaN(d.getTime())) return ''
  return d.toLocaleTimeString()
}

const containerColumns = computed<DataTableColumns<Container>>(() => [
  { title: t('common.name'), key: 'name', width: 160, ellipsis: { tooltip: true }, sorter: (a, b) => a.name.localeCompare(b.name) },
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
    title: t('common.actions'),
    key: 'actions',
    width: 270,
    render: (row) =>
      h(NSpace, { size: 'small' }, () => [
        row.state === 'running'
          ? [
              h(NButton, { size: 'tiny', onClick: () => containerAction(row.id, 'stop') }, () => 'Stop'),
              h(NButton, { size: 'tiny', onClick: () => containerAction(row.id, 'restart') }, () => 'Restart'),
            ]
          : h(NButton, { size: 'tiny', type: 'primary', onClick: () => containerAction(row.id, 'start') }, () => 'Start'),
        h(NButton, { size: 'tiny', quaternary: true, onClick: () => openLogs(row) }, () => t('docker.logs.button')),
        h(
          NPopconfirm,
          { onPositiveClick: () => containerAction(row.id, 'remove') },
          {
            trigger: () => h(NButton, { size: 'tiny', type: 'error', ghost: true }, () => t('common.delete')),
            default: () => t('docker.confirmDeleteContainer', { name: row.name }),
          },
        ),
      ]),
  },
])

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
    reportActionError(e, t('docker.removeImageFailed'))
  }
}

const imageColumns = computed<DataTableColumns<Image>>(() => [
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
  { title: t('common.size'), key: 'sizeBytes', width: 110, sorter: (a, b) => a.sizeBytes - b.sizeBytes, render: (row) => formatBytes(row.sizeBytes) },
  {
    title: t('docker.usedColumn'),
    key: 'containers',
    width: 140,
    sorter: (a, b) => a.containers - b.containers,
    render: (row) => (row.containers < 0 ? '—' : row.containers === 0 ? t('docker.notUsed') : t('docker.containerCount', { count: row.containers })),
  },
  { title: t('docker.created'), key: 'created', width: 150, sorter: (a, b) => Date.parse(a.created) - Date.parse(b.created), render: (row) => formatDate(row.created) },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 100,
    render: (row) =>
      h(
        NPopconfirm,
        { onPositiveClick: () => removeImage(row.id) },
        {
          trigger: () => h(NButton, { size: 'tiny', type: 'error', ghost: true }, () => t('common.delete')),
          default: () => t('docker.confirmDeleteImage', { tag: row.tag }),
        },
      ),
  },
])

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
    reportActionError(e, t('docker.removeVolumeFailed'))
  }
}

const volumeColumns = computed<DataTableColumns<Volume>>(() => [
  { title: t('common.name'), key: 'name', minWidth: 180, ellipsis: { tooltip: true }, sorter: (a, b) => a.name.localeCompare(b.name) },
  { title: 'Driver', key: 'driver', width: 100, sorter: (a, b) => a.driver.localeCompare(b.driver) },
  {
    title: t('common.size'),
    key: 'sizeBytes',
    width: 110,
    sorter: (a, b) => a.sizeBytes - b.sizeBytes,
    render: (row) => (row.sizeBytes < 0 ? t('docker.unknown') : formatBytes(row.sizeBytes)),
  },
  {
    title: 'Status',
    key: 'inUse',
    width: 120,
    sorter: (a, b) => Number(a.inUse) - Number(b.inUse),
    render: (row) => h(NTag, { size: 'small', type: row.inUse ? 'success' : 'default' }, () => (row.inUse ? t('docker.used') : t('docker.notUsed'))),
  },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 100,
    render: (row) =>
      h(
        NPopconfirm,
        { onPositiveClick: () => removeVolume(row.name) },
        {
          trigger: () => h(NButton, { size: 'tiny', type: 'error', ghost: true }, () => t('common.delete')),
          default: () => t('docker.confirmDeleteVolume', { name: row.name }),
        },
      ),
  },
])

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
    reportActionError(e, t('docker.removeNetworkFailed'))
  }
}

const networkColumns = computed<DataTableColumns<Network>>(() => [
  {
    title: t('common.name'),
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
  { title: t('docker.connectedContainers'), key: 'connectedCount', width: 170, sorter: (a, b) => a.connectedCount - b.connectedCount },
  {
    title: t('common.actions'),
    key: 'actions',
    width: 100,
    render: (row) =>
      row.builtin
        ? null
        : h(
            NPopconfirm,
            { onPositiveClick: () => removeNetwork(row.id) },
            {
              trigger: () => h(NButton, { size: 'tiny', type: 'error', ghost: true }, () => t('common.delete')),
              default: () => t('docker.confirmDeleteNetwork', { name: row.name }),
            },
          ),
  },
])

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
    message.success(t('docker.cleanupDone'))
  } catch (e) {
    reportActionError(e, t('docker.cleanupFailed', { kind }))
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
  if (logConnectSlowTimer) clearTimeout(logConnectSlowTimer)
  logsStream.close()
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
        <NEmpty v-else-if="!settings" :description="t('docker.noData')" />
        <NSpace v-else vertical :size="24">
          <NDescriptions :title="t('docker.daemonInfo')" :column="2" bordered label-placement="left">
            <NDescriptionsItem :label="t('docker.serverVersion')">{{ settings?.info.serverVersion }}</NDescriptionsItem>
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
                <NButton size="small" :loading="pruning === kind">{{ t('docker.cleanup') }} {{ kind }}</NButton>
              </template>
              {{ t('docker.confirmCleanup', { kind }) }}
            </NPopconfirm>
          </NSpace>
        </NSpace>
      </NTabPane>
    </NTabs>

    <NDrawer v-model:show="logDrawerOpen" :width="640" placement="right">
      <NDrawerContent :title="t('docker.logs.title', { name: logContainerName })" closable>
        <NSelect
          v-model:value="logSinceMin"
          :options="logSinceOptions"
          size="small"
          style="width: 150px; margin-bottom: 10px"
        />
        <div v-if="logsStream.lines.value.length === 0 && !logsStream.connected.value" class="log-empty">
          <p>{{ logConnectSlow ? t('docker.logs.connectingSlow') : t('docker.logs.connecting') }}</p>
          <NButton v-if="logConnectSlow" size="tiny" @click="reconnectLogs">{{ t('docker.logs.reconnect') }}</NButton>
        </div>
        <div ref="logScrollEl" class="log-scroll" @scroll="onLogScroll">
          <p v-if="logsStream.lines.value.length === 0 && logsStream.connected.value" class="log-empty">
            {{ t('docker.logs.waiting') }}
          </p>
          <div v-for="(line, i) in logsStream.lines.value" :key="i" class="log-line" :class="{ 'log-line--stderr': line.stream === 'stderr' }">
            <span v-if="line.timestamp" class="log-ts">{{ formatLogTimestamp(line.timestamp) }}</span>
            <span class="log-text">{{ line.text }}</span>
          </div>
        </div>
      </NDrawerContent>
    </NDrawer>
  </AppShell>
</template>

<style scoped>
.tab-loading {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}
.log-scroll {
  height: calc(100vh - 160px);
  overflow-y: auto;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.8rem;
  line-height: 1.5;
  white-space: pre-wrap;
  word-break: break-all;
}
.log-empty {
  color: var(--text-muted);
  display: flex;
  align-items: center;
  gap: 10px;
}
.log-line {
  display: flex;
  gap: 8px;
}
.log-line--stderr .log-text {
  color: var(--danger, #ef5a5a);
}
.log-ts {
  flex: 0 0 auto;
  color: var(--text-muted);
  opacity: 0.7;
}
.log-text {
  flex: 1;
  min-width: 0;
}
</style>
