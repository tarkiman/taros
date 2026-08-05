<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { NGrid, NGi, NCard, NSpin, NIcon } from 'naive-ui'
import { ShieldCheck, TriangleAlert, HardDrive, Wifi, Box, LayoutDashboard, Server, FolderOpen, SquareTerminal, Cpu } from '@lucide/vue'
import AppShell from '../layouts/AppShell.vue'
import GaugeChart from '../components/charts/GaugeChart.vue'
import LineChart, { type LineSeries } from '../components/charts/LineChart.vue'
import { useMetricsStream } from '../composables/useMetricsStream'
import { fetchHistory } from '../api/metrics'
import { dockerApi } from '../api/docker'
import { serviceApi } from '../api/service'
import { processesApi } from '../api/processes'
import { useTerminalStore } from '../stores/terminal'
import type { Sample } from '../types/metrics'
import type { Container } from '../types/docker'
import type { ProcInfo } from '../types/processes'
import { formatBytes } from '../utils/format'

const terminal = useTerminalStore()
const { snapshot } = useMetricsStream()

// ~15 min at a ~1s SSE tick — matches the ring buffer retention documented
// in docs/02-architecture.md, so the live chart never grows past what the
// server itself would return from history on a fresh load.
const HISTORY_LIMIT = 900

const cpuHistory = ref<[number, number][]>([])
const diskReadHistory = ref<[number, number][]>([])
const diskWriteHistory = ref<[number, number][]>([])

// scale defaults to 1 (CPU history is already a percentage); diskRead/
// diskWrite history comes back in bytes/sec from the API, same as the live
// SSE values pushPoint below converts to MB/s — without matching that
// conversion here, the initial history load and the live tail after it
// were on wildly different scales (a real bug: the Y axis showed a
// "25000000 MB/s" tick because raw byte values were plotted unconverted).
function toPoints(samples: Sample[], scale = 1): [number, number][] {
  return samples.map((s) => [new Date(s.t).getTime(), s.v * scale])
}

function pushPoint(buf: [number, number][], time: string, value: number) {
  buf.push([new Date(time).getTime(), value])
  if (buf.length > HISTORY_LIMIT) buf.shift()
}

watch(snapshot, (snap) => {
  if (!snap) return
  pushPoint(cpuHistory.value, snap.time, snap.cpu.totalPercent)
  pushPoint(diskReadHistory.value, snap.time, snap.diskIO.readBytesPerSec / 1024 / 1024)
  pushPoint(diskWriteHistory.value, snap.time, snap.diskIO.writeBytesPerSec / 1024 / 1024)
})

const cpuSeries = computed<LineSeries[]>(() => [{ name: 'CPU', data: cpuHistory.value }])
const diskSeries = computed<LineSeries[]>(() => [
  { name: 'Baca', data: diskReadHistory.value },
  { name: 'Tulis', data: diskWriteHistory.value },
])

const primaryDisk = computed(() => {
  const disks = snapshot.value?.disks ?? []
  return disks.find((d) => d.mountPoint === '/') ?? disks[0] ?? null
})

// Same 70%/90% warn/danger split as GaugeChart's default thresholds — kept
// separate rather than imported since GaugeChart's version is baked into
// its ECharts color option, not exposed as a standalone util.
function storageBarClass(usedPercent: number): string {
  if (usedPercent >= 90) return 'danger'
  if (usedPercent >= 70) return 'warn'
  return ''
}

const maxTemp = computed(() => {
  const temps = snapshot.value?.temps ?? []
  if (temps.length === 0) return null
  return temps.reduce((max, t) => (t.celsius > max.celsius ? t : max))
})

const netTotal = computed(() => {
  const ifaces = snapshot.value?.net ?? []
  return ifaces.reduce(
    (acc, n) => ({ rx: acc.rx + n.rxBytesPerSec, tx: acc.tx + n.txBytesPerSec }),
    { rx: 0, tx: 0 },
  )
})

// --- live clock — purely cosmetic, no server round-trip ---
const clockTime = ref('')
const clockDate = ref('')
const DAYS = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', "Jum'at", 'Sabtu']
const MONTHS = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
let clockTimer: ReturnType<typeof setInterval> | undefined

function tickClock() {
  const now = new Date()
  clockTime.value = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`
  clockDate.value = `${DAYS[now.getDay()]}, ${now.getDate()} ${MONTHS[now.getMonth()]} ${now.getFullYear()}`
}

// --- Docker snapshot: reused for both the health banner and the "Container
// Teratas" widget, so it's fetched once here rather than duplicating
// DockerView's own polling loop for a lighter-weight summary view. ---
const containers = ref<Container[]>([])
const dockerAvailable = ref(false)
const dockerChecked = ref(false)

async function loadDockerSummary() {
  try {
    const res = await dockerApi.containers()
    containers.value = res.containers
    dockerAvailable.value = true
  } catch {
    dockerAvailable.value = false
  } finally {
    dockerChecked.value = true
  }
}

const runningCount = computed(() => containers.value.filter((c) => c.state === 'running').length)

// --- "Pemakai Teratas": which resource (clicking the CPU/RAM gauge below
// sets this) and which source (container stats we already have, or real
// OS processes — a separate fetch, see loadProcesses) are being shown. ---
const metricSort = ref<'cpu' | 'mem'>('cpu')
const resourceTab = ref<'container' | 'proses'>('container')

const topContainers = computed(() =>
  containers.value
    .filter((c) => c.hasStats)
    .slice()
    .sort((a, b) =>
      metricSort.value === 'cpu' ? b.stats.cpuPercent - a.stats.cpuPercent : b.stats.memUsageBytes - a.stats.memUsageBytes,
    )
    .slice(0, 5),
)

// --- OS processes: unlike container stats (piggybacked on the Docker
// summary fetch above), this only matters when someone's actually looking
// at the "Proses" tab, so it's fetched on demand and re-polled on a timer
// only while that tab is active — no reason to hit /api/processes in the
// background on every Dashboard visit. ---
const processes = ref<ProcInfo[]>([])
const processesLoading = ref(false)
let processesTimer: ReturnType<typeof setInterval> | undefined

async function loadProcesses() {
  processesLoading.value = true
  try {
    const res = await processesApi.list(metricSort.value, 5)
    processes.value = res.processes
  } catch {
    processes.value = []
  } finally {
    processesLoading.value = false
  }
}

watch([resourceTab, metricSort], ([tab]) => {
  if (processesTimer) {
    clearInterval(processesTimer)
    processesTimer = undefined
  }
  if (tab === 'proses') {
    loadProcesses()
    processesTimer = setInterval(loadProcesses, 5000)
  }
})

// --- Service health: just the failed-unit count, cheap enough to ask for
// directly rather than polling the full unit list like ServiceView does. ---
const failedCount = ref(0)
const serviceAvailable = ref(false)
const serviceChecked = ref(false)

async function loadServiceSummary() {
  try {
    const res = await serviceApi.list({ failedOnly: true })
    failedCount.value = res.units.length
    serviceAvailable.value = true
  } catch {
    serviceAvailable.value = false
  } finally {
    serviceChecked.value = true
  }
}

const healthReady = computed(() => dockerChecked.value && serviceChecked.value)
const healthLine = computed(() => {
  const parts: string[] = []
  if (dockerAvailable.value) parts.push(`${runningCount.value}/${containers.value.length} container aktif`)
  if (serviceAvailable.value) {
    parts.push(failedCount.value === 0 ? 'tidak ada unit gagal' : `${failedCount.value} unit systemd gagal`)
  }
  if (parts.length === 0) return 'Docker dan systemd tidak tersedia untuk dipantau dari sini.'
  return parts.join(' · ')
})
const hasWarning = computed(() => serviceAvailable.value && failedCount.value > 0)
// The banner only ever warns about failed systemd units (container counts
// are informational, not a health signal here — see healthLine above), so
// it always makes sense to point at Services; the failed filter is only
// pre-applied when there's actually something to show for it.
const bannerLink = computed(() => (hasWarning.value ? { path: '/services', query: { failed: '1' } } : { path: '/services' }))

onMounted(async () => {
  tickClock()
  clockTimer = setInterval(tickClock, 15000)
  await Promise.allSettled([
    fetchHistory('cpu').then((s) => { cpuHistory.value = toPoints(s) }),
    fetchHistory('diskRead').then((s) => { diskReadHistory.value = toPoints(s, 1 / 1024 / 1024) }),
    fetchHistory('diskWrite').then((s) => { diskWriteHistory.value = toPoints(s, 1 / 1024 / 1024) }),
    loadDockerSummary(),
    loadServiceSummary(),
  ])
})
onUnmounted(() => {
  if (clockTimer) clearInterval(clockTimer)
  if (processesTimer) clearInterval(processesTimer)
})

const quickLinks = computed(() => {
  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/docker', label: 'Docker', icon: Box },
    { to: '/services', label: 'Service', icon: Server },
    { to: '/processes', label: 'Proses', icon: Cpu },
    { to: '/files', label: 'Files', icon: FolderOpen },
  ]
  if (terminal.enabled) links.push({ to: '/terminal', label: 'Terminal', icon: SquareTerminal })
  return links
})
</script>

<template>
  <AppShell>
    <div class="dashboard">
      <div v-if="!snapshot" class="loading"><NSpin size="large" /></div>
      <template v-else>
        <div class="hero-row">
          <div class="glass-card clock-card">
            <div class="clock-time">{{ clockTime }}</div>
            <div class="clock-date">{{ clockDate }}</div>
          </div>
          <RouterLink :to="bannerLink" class="glass-card banner-card banner-card--clickable">
            <div class="banner-copy">
              <h2>{{ !healthReady ? 'Memeriksa status layanan…' : hasWarning ? 'Ada yang perlu diperiksa' : 'Semua layanan berjalan normal' }}</h2>
              <p>{{ healthLine }}</p>
            </div>
            <div class="banner-pill" :class="{ warn: hasWarning }">
              <NIcon :component="hasWarning ? TriangleAlert : ShieldCheck" size="15" />
              {{ hasWarning ? 'Perlu perhatian' : 'Sehat' }}
            </div>
          </RouterLink>
        </div>

        <div class="main-grid">
          <NCard class="status-card">
            <template #header>Ringkasan Sistem</template>
            <NGrid cols="2 s:4" :x-gap="12" :y-gap="12" responsive="screen">
              <NGi>
                <button
                  type="button"
                  class="gauge-btn"
                  :class="{ active: metricSort === 'cpu' }"
                  title="Lihat pemakai CPU teratas"
                  @click="metricSort = 'cpu'"
                >
                  <GaugeChart :value="snapshot.cpu.totalPercent" label="CPU" />
                </button>
              </NGi>
              <NGi>
                <button
                  type="button"
                  class="gauge-btn"
                  :class="{ active: metricSort === 'mem' }"
                  title="Lihat pemakai RAM teratas"
                  @click="metricSort = 'mem'"
                >
                  <GaugeChart :value="snapshot.mem.usedPercent" label="RAM" />
                </button>
              </NGi>
              <NGi>
                <GaugeChart v-if="primaryDisk" :value="primaryDisk.usedPercent" :label="primaryDisk.mountPoint" />
                <div v-else class="text-muted empty-gauge">Tidak ada data disk</div>
              </NGi>
              <NGi>
                <GaugeChart
                  v-if="maxTemp"
                  :value="maxTemp.celsius"
                  :max="100"
                  :thresholds="[0.7, 0.85]"
                  :label="maxTemp.label"
                  :formatter="(v: number) => v.toFixed(0) + '°'"
                />
                <div v-else class="text-muted empty-gauge">Sensor suhu tidak tersedia</div>
              </NGi>
            </NGrid>

            <div class="io-strip">
              <div class="io-tile">
                <NIcon :component="HardDrive" size="18" />
                <div>
                  <div class="io-label">Disk I/O</div>
                  <div class="io-value">↓ {{ formatBytes(snapshot.diskIO.readBytesPerSec) }}/s ↑ {{ formatBytes(snapshot.diskIO.writeBytesPerSec) }}/s</div>
                </div>
              </div>
              <div class="io-tile">
                <NIcon :component="Wifi" size="18" />
                <div>
                  <div class="io-label">Jaringan</div>
                  <div class="io-value">↓ {{ formatBytes(netTotal.rx) }}/s ↑ {{ formatBytes(netTotal.tx) }}/s</div>
                </div>
              </div>
            </div>
          </NCard>

          <div class="side-col">
            <NCard class="proc-card">
              <template #header>
                <div class="proc-head">
                  <span>Pemakai Teratas</span>
                  <div class="tabs">
                    <button type="button" class="tab-btn" :class="{ active: resourceTab === 'container' }" @click="resourceTab = 'container'">
                      Container
                    </button>
                    <button type="button" class="tab-btn" :class="{ active: resourceTab === 'proses' }" @click="resourceTab = 'proses'">
                      Proses
                    </button>
                  </div>
                </div>
              </template>
              <span class="sort-note">diurutkan berdasarkan {{ metricSort === 'cpu' ? 'CPU' : 'RAM' }}</span>

              <template v-if="resourceTab === 'container'">
                <ul v-if="topContainers.length > 0" class="proc-list">
                  <li v-for="c in topContainers" :key="c.id" class="proc-row">
                    <span class="proc-dot"></span>
                    <span class="proc-name">{{ c.name }}</span>
                    <span class="proc-pct">{{ metricSort === 'cpu' ? c.stats.cpuPercent.toFixed(1) + '%' : formatBytes(c.stats.memUsageBytes) }}</span>
                  </li>
                </ul>
                <p v-else class="text-muted empty-note">
                  {{ dockerAvailable ? 'Belum ada container dengan statistik.' : 'Docker tidak tersedia.' }}
                </p>
              </template>
              <template v-else>
                <ul v-if="processes.length > 0" class="proc-list">
                  <li v-for="p in processes" :key="p.pid" class="proc-row">
                    <span class="proc-dot"></span>
                    <span class="proc-name">{{ p.name }} <span class="text-muted">·{{ p.pid }}</span></span>
                    <span class="proc-pct">{{ metricSort === 'cpu' ? p.cpuPercent.toFixed(1) + '%' : formatBytes(p.memBytes) }}</span>
                  </li>
                </ul>
                <p v-else-if="!processesLoading" class="text-muted empty-note">Belum ada data proses.</p>
                <RouterLink to="/processes" class="see-all-link">Lihat semua proses →</RouterLink>
              </template>
            </NCard>

            <NCard class="docker-card">
              <template #header>Docker</template>
              <template v-if="dockerAvailable">
                <div class="docker-count">{{ runningCount }}</div>
                <div class="docker-count-label">container aktif dari {{ containers.length }} total</div>
              </template>
              <p v-else class="text-muted empty-note">Docker dinonaktifkan atau tidak terdeteksi.</p>
            </NCard>
          </div>
        </div>

        <p class="eyebrow section">Akses cepat</p>
        <div class="quick-grid">
          <RouterLink v-for="link in quickLinks" :key="link.to" :to="link.to" class="glass-card quick-tile">
            <span class="quick-icon"><NIcon :component="link.icon" size="20" /></span>
            <span class="quick-name">{{ link.label }}</span>
          </RouterLink>
        </div>

        <NGrid cols="1 m:2" :x-gap="16" :y-gap="16" responsive="screen" class="section">
          <NGi>
            <NCard title="CPU — 15 menit terakhir">
              <LineChart :series="cpuSeries" unit="%" />
            </NCard>
          </NGi>
          <NGi>
            <NCard title="Disk I/O — 15 menit terakhir">
              <LineChart :series="diskSeries" unit=" MB/s" />
            </NCard>
          </NGi>
        </NGrid>

        <NGrid cols="1 m:2" :x-gap="16" :y-gap="16" responsive="screen" class="section">
          <NGi>
            <NCard title="Penyimpanan">
              <div v-if="snapshot.disks.length > 0" class="storage-list">
                <div v-for="d in snapshot.disks" :key="d.mountPoint" class="storage-row">
                  <div class="storage-head">
                    <span class="storage-mount">{{ d.mountPoint }}</span>
                    <span class="storage-pct">{{ d.usedPercent.toFixed(1) }}%</span>
                  </div>
                  <div class="storage-bar-track">
                    <div
                      class="storage-bar-fill"
                      :class="storageBarClass(d.usedPercent)"
                      :style="{ width: Math.min(d.usedPercent, 100) + '%' }"
                    ></div>
                  </div>
                  <div class="storage-meta">
                    <span>{{ formatBytes(d.usedBytes) }} terpakai</span>
                    <span>{{ formatBytes(d.freeBytes) }} tersisa · {{ formatBytes(d.totalBytes) }} total</span>
                  </div>
                </div>
              </div>
              <p v-else class="text-muted empty-note">Tidak ada data disk.</p>
            </NCard>
          </NGi>
          <NGi>
            <NCard title="Jaringan">
              <table class="detail-table">
                <tbody>
                  <tr v-for="n in snapshot.net" :key="n.name">
                    <td>{{ n.name }}</td>
                    <td class="text-muted">↓ {{ formatBytes(n.rxBytesPerSec) }}/s</td>
                    <td class="text-muted">↑ {{ formatBytes(n.txBytesPerSec) }}/s</td>
                  </tr>
                </tbody>
              </table>
            </NCard>
          </NGi>
        </NGrid>
      </template>
    </div>
  </AppShell>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  padding: 80px 0;
}

.section {
  margin-top: 24px;
}

.eyebrow {
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.09em;
  text-transform: uppercase;
  color: var(--text-faint);
  margin: 0 0 12px 2px;
}

/* NCard already picks up the glass look app-wide via theme.ts — these are
   for elements that aren't NCard (clock/banner/quick-tile), styled to match. */
.glass-card {
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-xl);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

.hero-row {
  display: grid;
  grid-template-columns: 1fr 1.6fr;
  gap: 16px;
  margin-bottom: 16px;
}

.clock-card {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.clock-time {
  font-family: var(--font-mono);
  font-size: 2.2rem;
  font-weight: 600;
  font-variant-numeric: tabular-nums;
  line-height: 1;
}
.clock-date {
  margin-top: 6px;
  font-size: 0.84rem;
  color: var(--text-muted);
}

.banner-card {
  padding: 20px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.banner-card--clickable {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease;
}
.banner-card--clickable:hover {
  transform: translateY(-2px);
  border-color: var(--accent);
}
.banner-card--clickable:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.banner-copy h2 {
  margin: 0 0 4px;
  font-size: 1rem;
  font-weight: 600;
}
.banner-copy p {
  margin: 0;
  font-size: 0.84rem;
  color: var(--text-muted);
}
.banner-pill {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 7px 13px;
  border-radius: 999px;
  background: var(--success-soft);
  color: var(--success);
  font-size: 0.8rem;
  font-weight: 600;
  white-space: nowrap;
}
.banner-pill.warn {
  background: var(--warning-soft);
  color: var(--warning);
}

/* No align-items: start here on purpose — the side column (two stacked
   cards) is usually taller than the status card, and "start" alignment
   left a visible dead gap below the shorter card instead of letting it
   fill the row. Default stretch means the status card's own background
   just extends to match instead. */
.main-grid {
  display: grid;
  grid-template-columns: 1.7fr 1fr;
  gap: 16px;
}

.empty-gauge {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 160px;
  font-size: 0.82rem;
  text-align: center;
}

.gauge-btn {
  display: block;
  width: 100%;
  padding: 4px;
  border: 1px solid transparent;
  border-radius: var(--radius-lg);
  background: transparent;
  cursor: pointer;
  transition: background var(--transition-fast), border-color var(--transition-fast);
}
.gauge-btn:hover {
  background: var(--track);
}
.gauge-btn.active {
  border-color: var(--accent);
  background: var(--accent-soft);
}
.gauge-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.io-strip {
  margin-top: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
.io-tile {
  padding: 12px 14px;
  border-radius: var(--radius-lg);
  background: var(--track);
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--accent);
}
.io-label {
  font-size: 0.74rem;
  color: var(--text-muted);
}
.io-value {
  font-family: var(--font-mono);
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text);
}

.side-col {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.proc-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100%;
}

.tabs {
  display: flex;
  gap: 4px;
  padding: 3px;
  border-radius: 10px;
  background: var(--track);
}
.tab-btn {
  border: none;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.72rem;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 8px;
  cursor: pointer;
  font-family: var(--font-sans);
}
.tab-btn.active {
  background: var(--glass-strong);
  color: var(--text);
}
.tab-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.sort-note {
  display: block;
  font-size: 0.72rem;
  color: var(--text-faint);
  margin: 2px 0 12px;
}

.see-all-link {
  display: inline-block;
  margin-top: 8px;
  font-size: 0.78rem;
  color: var(--accent);
  text-decoration: none;
}
.see-all-link:hover {
  text-decoration: underline;
}

.proc-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.proc-row {
  display: flex;
  align-items: center;
  gap: 10px;
}
.proc-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}
.proc-name {
  flex: 1;
  font-size: 0.82rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.proc-pct {
  font-family: var(--font-mono);
  font-size: 0.8rem;
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.empty-note {
  font-size: 0.82rem;
  margin: 0;
}

.docker-count {
  font-family: var(--font-mono);
  font-size: 2rem;
  font-weight: 600;
  line-height: 1;
}
.docker-count-label {
  font-size: 0.78rem;
  color: var(--text-muted);
  margin-top: 4px;
}

.quick-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 12px;
}
.quick-tile {
  padding: 18px 10px 14px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: transform 0.18s ease, border-color 0.18s ease;
}
.quick-tile:hover {
  transform: translateY(-3px);
  border-color: var(--accent);
}
.quick-tile:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}
.quick-icon {
  width: 42px;
  height: 42px;
  border-radius: 13px;
  display: grid;
  place-items: center;
  background: var(--accent-soft);
  color: var(--accent);
}
.quick-name {
  font-size: 0.78rem;
  font-weight: 600;
}

.storage-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.storage-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: 6px;
  font-size: 0.86rem;
}
.storage-mount {
  font-family: var(--font-mono);
  font-weight: 600;
}
.storage-pct {
  font-family: var(--font-mono);
  color: var(--text-muted);
  font-variant-numeric: tabular-nums;
}

.storage-bar-track {
  height: 8px;
  border-radius: 999px;
  background: var(--track);
  overflow: hidden;
}
.storage-bar-fill {
  height: 100%;
  border-radius: 999px;
  background: var(--accent);
  transition: width 0.6s ease;
}
.storage-bar-fill.warn {
  background: var(--warning);
}
.storage-bar-fill.danger {
  background: var(--danger);
}

.storage-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 6px;
  font-size: 0.76rem;
  color: var(--text-muted);
}

.detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.detail-table td {
  padding: 6px 0;
  border-bottom: 1px solid var(--glass-border);
}

.detail-table tr:last-child td {
  border-bottom: none;
}

.text-muted {
  color: var(--text-muted);
}

@media (max-width: 860px) {
  .hero-row { grid-template-columns: 1fr; }
  .main-grid { grid-template-columns: 1fr; }
  .quick-grid { grid-template-columns: repeat(3, 1fr); }
  .io-strip { grid-template-columns: 1fr; }
}
</style>
