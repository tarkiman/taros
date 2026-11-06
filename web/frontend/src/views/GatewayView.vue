<script setup lang="ts">
import { computed, h, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NDataTable, NSpin, NTag, type DataTableColumns } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import LineChart from '../components/charts/LineChart.vue'
import { ApiError } from '../api/client'
import { gatewayApi, type GatewayStatus, type LanDevice, type Relay } from '../api/gateway'

// Location gateway (internal/gateway, docs/04-features.md §4.18): read-only view of
// the ZeroTier link, the go2rtc relays (device in → central out), the site's LAN
// devices and the uplink. The backend polls on its own ticker; this page just
// re-reads the latest snapshot every 10 s while visible.
const { t } = useI18n()
const data = ref<GatewayStatus | null>(null)
const loading = ref(true)
const loadError = ref('')
let timer: number | undefined

async function load() {
  try {
    data.value = await gatewayApi.status()
    loadError.value = ''
  } catch (e) {
    loadError.value = e instanceof ApiError ? e.message : t('gateway.failed')
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  load()
  timer = window.setInterval(() => !document.hidden && load(), 10_000)
})
onBeforeUnmount(() => clearInterval(timer))

const s = computed(() => data.value?.status)
const kbps = (v: number) => (v >= 1000 ? `${(v / 1000).toFixed(2)} Mbps` : `${Math.round(v)} kbps`)
const uplinkSeries = computed(() => [
  { name: t('gateway.upload'), data: (s.value?.uplink.history ?? []).map((p) => [new Date(p.t).getTime(), Math.round(p.v)] as [number, number]) },
])
const ztNet = computed(() => s.value?.zerotier.networks[0])

const relayColumns = computed<DataTableColumns<Relay>>(() => [
  { title: t('gateway.col.stream'), key: 'name', render: (r) => r.name },
  { title: t('gateway.col.source'), key: 'sources', render: (r) => r.sources.join(', ') || '—' },
  {
    title: t('gateway.col.status'),
    key: 'active',
    render: (r) =>
      h(NTag, { size: 'small', type: r.active ? 'success' : 'default', bordered: false }, () => (r.active ? t('gateway.relayActive') : t('gateway.relayIdle'))),
  },
  { title: t('gateway.col.in'), key: 'inKbps', render: (r) => (r.active ? kbps(r.inKbps) : '—') },
  {
    title: t('gateway.col.consumers'),
    key: 'consumers',
    render: (r) => (r.consumers.length ? r.consumers.map((c) => `${c.remote.replace(/:\d+$/, '')} (${kbps(c.outKbps)})`).join(', ') : t('gateway.noConsumers')),
  },
])

const deviceColumns = computed<DataTableColumns<LanDevice>>(() => [
  { title: 'IP', key: 'ip' },
  { title: 'MAC', key: 'mac', render: (d) => d.mac || '—' },
  {
    title: t('gateway.col.status'),
    key: 'state',
    render: (d) =>
      h(
        NTag,
        { size: 'small', bordered: false, type: d.state === 'reachable' ? 'success' : d.state === 'incomplete' ? 'warning' : 'default' },
        () => t(`gateway.state.${d.state}`),
      ),
  },
  { title: t('gateway.col.relayed'), key: 'relayed', render: (d) => (d.relayed?.length ? d.relayed.join(', ') : '—') },
])
</script>

<template>
  <AppShell>
    <div class="gateway-page">
      <NCard :title="t('gateway.title')" size="small">
        <template #header-extra>
          <NButton size="small" :loading="loading" @click="load">{{ t('gateway.refresh') }}</NButton>
        </template>
        <p class="muted">{{ t('gateway.desc') }}</p>
      </NCard>

      <div v-if="loading && !data" class="center"><NSpin size="large" /></div>
      <NAlert v-else-if="loadError" type="error" :show-icon="false">
        {{ loadError }} <NButton size="tiny" @click="load">{{ t('common.tryAgain') }}</NButton>
      </NAlert>
      <NAlert v-else-if="data && !data.enabled" type="info" :title="t('gateway.disabledTitle')">
        {{ t('gateway.disabled') }}
        <pre class="snippet">gateway:
  enabled: true
  central:
    - label: NVR
      addr: "172.22.244.135:8091"</pre>
      </NAlert>

      <template v-else-if="s">
        <div class="cards">
          <NCard size="small" :title="t('gateway.zerotier')">
            <template v-if="s.zerotier.available">
              <p>
                <NTag size="small" :type="s.zerotier.online ? 'success' : 'error'" :bordered="false">{{ s.zerotier.online ? 'Online' : 'Offline' }}</NTag>
                <span class="muted"> {{ s.zerotier.address }} · v{{ s.zerotier.version }}</span>
              </p>
              <p v-if="ztNet" class="big">{{ ztNet.addresses.join(', ') || '—' }}</p>
              <p v-if="ztNet" class="muted">{{ ztNet.name || ztNet.id }} · {{ ztNet.status }} · {{ ztNet.interface }}</p>
              <p class="muted">{{ t('gateway.peers', { direct: s.zerotier.peers.direct, relayed: s.zerotier.peers.relayed }) }}</p>
            </template>
            <NAlert v-else type="warning" :show-icon="false">{{ t(`gateway.zt.${s.zerotier.reason ?? 'error'}`) }}</NAlert>
          </NCard>

          <NCard size="small" :title="t('gateway.central')">
            <p v-if="!s.central.length" class="muted">{{ t('gateway.noCentral') }}</p>
            <div v-for="c in s.central" :key="c.addr" class="row">
              <NTag size="small" :type="c.ok ? 'success' : 'error'" :bordered="false">{{ c.ok ? `${c.rttMs.toFixed(0)} ms` : t('gateway.unreachable') }}</NTag>
              <span>{{ c.label }}</span>
              <span class="muted">{{ c.addr }}<template v-if="!c.ok && c.error"> · {{ c.error }}</template></span>
            </div>
          </NCard>

          <NCard size="small" :title="t('gateway.uplink')">
            <p class="big">↑ {{ kbps(s.uplink.txKbps) }} <span class="muted small">↓ {{ kbps(s.uplink.rxKbps) }}</span></p>
            <p class="muted">{{ t('gateway.uplinkHint', { iface: s.uplink.interface || '—' }) }}</p>
            <LineChart v-if="s.uplink.history.length > 1" :series="uplinkSeries" unit="kbps" :height="120" />
          </NCard>
        </div>

        <NCard size="small" :title="t('gateway.relays')">
          <template #header-extra><span class="muted">{{ t('gateway.relaysHint') }}</span></template>
          <NAlert v-if="!s.relays.available" type="warning" :show-icon="false">{{ t('gateway.go2rtcDown', { error: s.relays.error }) }}</NAlert>
          <NDataTable v-else :columns="relayColumns" :data="s.relays.streams" size="small" :bordered="false" :row-key="(r: Relay) => r.name" />
        </NCard>

        <NCard size="small" :title="t('gateway.lan', { cidr: s.lan.cidr || s.lan.interface || '' })">
          <template #header-extra><span class="muted">{{ t('gateway.lanHint') }}</span></template>
          <NDataTable :columns="deviceColumns" :data="s.lan.devices" size="small" :bordered="false" :row-key="(d: LanDevice) => d.ip" />
        </NCard>
      </template>
    </div>
  </AppShell>
</template>

<style scoped>
.gateway-page {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr));
  gap: 12px;
}
.center {
  display: flex;
  justify-content: center;
  padding: 48px 0;
}
.muted {
  opacity: 0.7;
}
.small {
  font-size: 0.85em;
}
.big {
  font-size: 1.3em;
  font-weight: 600;
  margin: 6px 0;
}
.row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 6px;
}
.snippet {
  margin-top: 8px;
  padding: 8px;
  border-radius: 6px;
  background: rgba(127, 127, 127, 0.12);
  font-size: 12px;
}
</style>
