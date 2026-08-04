<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import { NGrid, NGi, NCard, NSpin } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import GaugeChart from '../components/charts/GaugeChart.vue'
import LineChart, { type LineSeries } from '../components/charts/LineChart.vue'
import { useMetricsStream } from '../composables/useMetricsStream'
import { fetchHistory } from '../api/metrics'
import type { Sample } from '../types/metrics'
import { formatBytes } from '../utils/format'

const { snapshot } = useMetricsStream()

// ~15 min at a ~1s SSE tick — matches the ring buffer retention documented
// in docs/02-architecture.md, so the live chart never grows past what the
// server itself would return from history on a fresh load.
const HISTORY_LIMIT = 900

const cpuHistory = ref<[number, number][]>([])
const diskReadHistory = ref<[number, number][]>([])
const diskWriteHistory = ref<[number, number][]>([])

function toPoints(samples: Sample[]): [number, number][] {
  return samples.map((s) => [new Date(s.t).getTime(), s.v])
}

function pushPoint(buf: [number, number][], time: string, value: number) {
  buf.push([new Date(time).getTime(), value])
  if (buf.length > HISTORY_LIMIT) buf.shift()
}

onMounted(async () => {
  const [cpu, diskRead, diskWrite] = await Promise.all([
    fetchHistory('cpu'),
    fetchHistory('diskRead'),
    fetchHistory('diskWrite'),
  ])
  cpuHistory.value = toPoints(cpu)
  diskReadHistory.value = toPoints(diskRead)
  diskWriteHistory.value = toPoints(diskWrite)
})

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

const maxTemp = computed(() => {
  const temps = snapshot.value?.temps ?? []
  if (temps.length === 0) return null
  return temps.reduce((max, t) => (t.celsius > max.celsius ? t : max))
})
</script>

<template>
  <AppShell>
    <div class="dashboard">
      <div v-if="!snapshot" class="loading"><NSpin size="large" /></div>
      <template v-else>
        <NGrid cols="1 s:2 m:4" :x-gap="16" :y-gap="16" responsive="screen">
          <NGi>
            <NCard><GaugeChart :value="snapshot.cpu.totalPercent" label="CPU" /></NCard>
          </NGi>
          <NGi>
            <NCard><GaugeChart :value="snapshot.mem.usedPercent" label="RAM" /></NCard>
          </NGi>
          <NGi>
            <NCard>
              <GaugeChart
                v-if="primaryDisk"
                :value="primaryDisk.usedPercent"
                :label="primaryDisk.mountPoint"
              />
              <div v-else class="text-muted">Tidak ada data disk</div>
            </NCard>
          </NGi>
          <NGi>
            <NCard>
              <GaugeChart
                v-if="maxTemp"
                :value="maxTemp.celsius"
                :max="100"
                :thresholds="[0.7, 0.85]"
                :label="maxTemp.label"
                :formatter="(v: number) => v.toFixed(0) + '°'"
              />
              <div v-else class="text-muted">Sensor suhu tidak tersedia</div>
            </NCard>
          </NGi>
        </NGrid>

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
              <table class="detail-table">
                <tbody>
                  <tr v-for="d in snapshot.disks" :key="d.mountPoint">
                    <td>{{ d.mountPoint }}</td>
                    <td class="text-muted">{{ formatBytes(d.usedBytes) }} / {{ formatBytes(d.totalBytes) }}</td>
                    <td class="text-muted">{{ d.usedPercent.toFixed(1) }}%</td>
                  </tr>
                </tbody>
              </table>
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

.detail-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.9rem;
}

.detail-table td {
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
}

.detail-table tr:last-child td {
  border-bottom: none;
}

.text-muted {
  color: var(--text-muted);
}
</style>
