<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NCard, NSpin, NTag } from 'naive-ui'
import { systemApi, type BootEntry, type BootsResponse } from '../api/system'
import { formatDate } from '../utils/format'

// Host-boot ledger (internal/bootlog): one row per boot, newest first. A boot
// that ends without a clean stop is what "the Pi lost power" looks like.
const { t } = useI18n()
const loading = ref(true)
const failed = ref(false)
const data = ref<BootsResponse | null>(null)

onMounted(async () => {
  try {
    data.value = await systemApi.boots()
  } catch {
    failed.value = true
  } finally {
    loading.value = false
  }
})

const boots = computed(() => data.value?.boots ?? [])
const powerLosses = computed(() => boots.value.filter((b) => b.end === 'powerLoss').length)
const live = computed(() => data.value?.live)

function duration(b: BootEntry): string {
  const min = Math.max(0, Math.round((new Date(b.lastSeen).getTime() - new Date(b.bootedAt).getTime()) / 60000))
  if (min < 1) return t('settings.boot.lessThanMin')
  const d = Math.floor(min / 1440)
  const h = Math.floor((min % 1440) / 60)
  const m = min % 60
  if (d > 0) return t('settings.boot.dh', { d, h })
  if (h > 0) return t('settings.boot.hm', { h, m })
  return t('settings.boot.m', { m })
}

function endTag(b: BootEntry): { text: string; type: 'success' | 'error' | 'default' } {
  if (b.running) return { text: t('settings.boot.running'), type: 'success' }
  if (b.end === 'powerLoss') return { text: t('settings.boot.powerLoss'), type: 'error' }
  if (b.end === 'clean') return { text: t('settings.boot.clean'), type: 'default' }
  return { text: t('settings.boot.unknown'), type: 'default' }
}

// "≈": no RTC on a Pi — until NTP syncs the clock, timestamps are guesses.
const stamp = (iso: string, b: BootEntry) => (b.clockSynced ? '' : '≈ ') + formatDate(iso)

function reading(b: BootEntry): string {
  const p: string[] = []
  if (b.last.hasMetrics) p.push(`CPU ${b.last.cpuTempC.toFixed(0)}°C`)
  if (b.last.hasNvme) p.push(`NVMe ${b.last.nvmeTempC.toFixed(0)}°C`)
  if (b.last.hasUndervolt && b.last.undervoltage) p.push(t('settings.boot.undervoltageShort'))
  return p.length ? p.join(' · ') : '—'
}
</script>

<template>
  <NCard embedded size="small" :title="t('settings.boot.title')" style="margin-top: 16px">
    <div v-if="loading" class="loading"><NSpin size="small" /></div>
    <NAlert v-else-if="failed" type="error" :show-icon="false">{{ t('settings.boot.loadFailed') }}</NAlert>
    <p v-else-if="!data?.supported" class="text-muted">{{ t('settings.boot.unsupported') }}</p>
    <template v-else>
      <p class="text-muted intro">{{ t('settings.boot.desc') }}</p>

      <div class="summary">
        <span>{{ t('settings.boot.summary', { count: boots.length }) }}</span>
        <NTag size="small" :type="powerLosses > 0 ? 'error' : 'success'" :bordered="false">
          {{ t('settings.boot.powerLossCount', { count: powerLosses }) }}
        </NTag>
        <span v-if="live?.hasNvme" class="text-muted">NVMe {{ live.nvmeTempC.toFixed(1) }}°C</span>
        <span v-if="live?.hasUndervolt" class="text-muted">
          {{ live.undervoltage ? t('settings.boot.undervoltageNow') : t('settings.boot.powerOk') }}
        </span>
      </div>

      <div class="table-wrap">
        <table class="boots">
          <thead>
            <tr>
              <th>{{ t('settings.boot.colBoot') }}</th>
              <th>{{ t('settings.boot.colLastSeen') }}</th>
              <th>{{ t('settings.boot.colDuration') }}</th>
              <th>{{ t('settings.boot.colEnd') }}</th>
              <th>{{ t('settings.boot.colLast') }}</th>
              <th>{{ t('settings.boot.colTaros') }}</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="b in boots" :key="b.bootId" :class="{ bad: b.end === 'powerLoss' }">
              <td class="mono">{{ stamp(b.bootedAt, b) }}</td>
              <td class="mono">{{ b.running ? t('settings.boot.now') : stamp(b.lastSeen, b) }}</td>
              <td>{{ duration(b) }}</td>
              <td><NTag size="small" :type="endTag(b).type" :bordered="false">{{ endTag(b).text }}</NTag></td>
              <td class="mono">{{ reading(b) }}</td>
              <td class="text-muted">
                {{ t('settings.boot.taros', { starts: b.tarosStarts, crashes: b.tarosCrashes }) }}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <p class="text-muted hint">{{ t('settings.boot.hint') }}</p>
    </template>
  </NCard>
</template>

<style scoped>
.loading { display: flex; justify-content: center; padding: 24px 0; }
.text-muted { color: var(--text-muted); font-size: 0.8rem; margin: 0; }
.intro { margin-bottom: 10px; }
.summary { display: flex; flex-wrap: wrap; align-items: center; gap: 10px; font-size: 0.88rem; margin-bottom: 10px; }
.table-wrap { overflow-x: auto; }
.boots { width: 100%; border-collapse: collapse; font-size: 0.82rem; }
.boots th { text-align: left; font-weight: 500; color: var(--text-muted); padding: 6px 10px 6px 0; white-space: nowrap; }
.boots td { padding: 7px 10px 7px 0; border-top: 1px solid var(--border); white-space: nowrap; }
.boots tr.bad td { background: rgba(208, 48, 80, 0.06); }
.mono { font-family: var(--font-mono); font-size: 0.78rem; }
.hint { margin-top: 10px; }
</style>
