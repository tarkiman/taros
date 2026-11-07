<script setup lang="ts">
// Camera finder for the gateway's LAN (internal/gateway/discover): ONVIF discovery +
// RTSP port sweep, then — for the chosen device and its login — the stream URLs (ONVIF
// profiles, or common RTSP paths). The result prefills RelayFormModal.
import { computed, h, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NDataTable, NInput, NModal, NSelect, NSpace, NSpin, NTag, type DataTableColumns } from 'naive-ui'
import { ApiError } from '../../api/client'
import { relayApi, type ScanDevice, type ScanStreams } from '../../api/gateway'
import { newPassword, noAutofill } from '../../utils/inputProps'
import type { RelayPreset } from './RelayFormModal.vue'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits<{ close: []; use: [preset: RelayPreset] }>()
const { t } = useI18n()

const scanning = ref(false)
const scanError = ref('')
const devices = ref<ScanDevice[]>([])
const subnets = ref<string[]>([])
const picked = ref<ScanDevice | null>(null)
const username = ref('')
const password = ref('')
const finding = ref(false)
const found = ref<ScanStreams | null>(null)
const findError = ref('')
const mainUrl = ref('')
const subUrl = ref('')

async function scan() {
  scanning.value = true
  scanError.value = ''
  picked.value = null
  found.value = null
  try {
    const r = await relayApi.scan()
    devices.value = r.devices
    subnets.value = r.subnets.map((s) => `${s.cidr} (${s.interface})`)
  } catch (e) {
    scanError.value = e instanceof ApiError ? e.message : String(e)
  } finally {
    scanning.value = false
  }
}
watch(
  () => props.show,
  (open) => {
    if (open && !devices.value.length && !scanning.value) scan()
  },
)

function pick(d: ScanDevice) {
  picked.value = d
  found.value = null
  findError.value = ''
  mainUrl.value = ''
  subUrl.value = ''
}

async function findStreams() {
  const d = picked.value
  if (!d) return
  finding.value = true
  findError.value = ''
  found.value = null
  try {
    const port = d.ports.find((p) => p !== 8554) ?? d.ports[0] ?? 554
    const r = await relayApi.streams(d.ips[0], port, d.onvif?.xaddr ?? '', username.value.trim(), password.value)
    found.value = r
    if (r.onvif?.length) {
      mainUrl.value = r.onvif[0].url
      subUrl.value = r.onvif.length > 1 ? r.onvif[r.onvif.length - 1].url : ''
    } else if (r.guess?.guess) {
      mainUrl.value = r.guess.guess.main
      subUrl.value = r.guess.guess.sub ?? ''
    } else {
      findError.value = r.guess?.needs_auth || r.onvifError === 'auth' ? t('gateway.scan.needsAuth') : t('gateway.scan.noStreams', { n: r.guess?.tried ?? 0 })
    }
  } catch (e) {
    findError.value = e instanceof ApiError ? e.message : String(e)
  } finally {
    finding.value = false
  }
}

const res = (w?: number, hh?: number) => (w && hh ? `${w}×${hh}` : '')
const streamOptions = computed(() => {
  const r = found.value
  if (r?.onvif?.length) return r.onvif.map((s) => ({ label: `${s.profile} · ${[res(s.width, s.height), s.encoding].filter(Boolean).join(' ')} · ${s.url}`, value: s.url }))
  const g = r?.guess?.guess
  if (!g) return []
  return [
    { label: `${t('gateway.scan.main')} · ${g.codec ?? ''} · ${g.main}`, value: g.main },
    ...(g.sub ? [{ label: `${t('gateway.scan.sub')} · ${g.sub_codec ?? ''} · ${g.sub}`, value: g.sub }] : []),
  ]
})

function slug(s: string) {
  return (
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 30) || ''
  )
}

function use() {
  const d = picked.value
  if (!d || !mainUrl.value) return
  const ip = d.ips[0]
  emit('use', {
    name: slug(d.onvif?.name ?? '') || `kamera-${ip.split('.').pop()}`,
    url: mainUrl.value,
    subUrl: subUrl.value && subUrl.value !== mainUrl.value ? subUrl.value : '',
    username: username.value.trim(),
    password: password.value,
  })
}

const columns = computed<DataTableColumns<ScanDevice>>(() => [
  {
    title: 'IP',
    key: 'ips',
    render: (d) => h('div', [h('div', d.ips.join(', ')), d.mac ? h('div', { class: 'muted small' }, d.mac) : null]),
  },
  { title: t('gateway.scan.ports'), key: 'ports', render: (d) => d.ports.join(', ') || '—' },
  {
    title: t('gateway.scan.device'),
    key: 'info',
    render: (d) => [d.onvif?.name, d.onvif?.hardware, d.server].filter(Boolean).join(' · ') || (d.onvif ? 'ONVIF' : '—'),
  },
  {
    title: t('gateway.col.status'),
    key: 'relayed',
    render: (d) =>
      d.gateway
        ? h(NTag, { size: 'small', bordered: false }, () => t('gateway.scan.isRelay'))
        : d.relayed.length
          ? h(NTag, { size: 'small', bordered: false, type: 'success' }, () => t('gateway.scan.relayedAs', { names: d.relayed.join(', ') }))
          : h(NTag, { size: 'small', bordered: false, type: 'info' }, () => t('gateway.scan.new')),
  },
  {
    title: '',
    key: 'act',
    render: (d) => (d.gateway ? null : h(NButton, { size: 'tiny', type: picked.value === d ? 'primary' : 'default', onClick: () => pick(d) }, () => t('gateway.scan.pick'))),
  },
])
</script>

<template>
  <NModal :show="show" preset="card" style="max-width: 860px" :title="t('gateway.scan.title')" @update:show="(v: boolean) => !v && emit('close')">
    <NSpace vertical :size="12">
      <div class="row">
        <span class="muted">{{ subnets.length ? t('gateway.scan.subnets', { list: subnets.join(', ') }) : t('gateway.scan.desc') }}</span>
        <NButton size="small" :loading="scanning" @click="scan">{{ t('gateway.scan.rescan') }}</NButton>
      </div>
      <NAlert v-if="scanError" type="error" :show-icon="false">{{ scanError }}</NAlert>
      <div v-if="scanning && !devices.length" class="center"><NSpin /> <span class="muted">{{ t('gateway.scan.scanning') }}</span></div>
      <NDataTable v-else :columns="columns" :data="devices" size="small" :bordered="false" :row-key="(d: ScanDevice) => d.ips[0]" :max-height="300" :scroll-x="680" />

      <NAlert v-if="picked" type="info" :show-icon="false" :title="t('gateway.scan.pickedTitle', { ip: picked.ips[0] })">
        <NSpace vertical :size="10">
          <div class="row">
            <NInput v-model:value="username" :placeholder="`${t('gateway.relay.username')} (admin)`" :input-props="noAutofill('scan-username')" style="flex: 1 1 140px" />
            <NInput v-model:value="password" type="password" show-password-on="click" :placeholder="t('gateway.relay.password')" :input-props="newPassword('scan-password')" style="flex: 1 1 140px" @keyup.enter="findStreams" />
            <NButton size="small" type="primary" :loading="finding" @click="findStreams">{{ t('gateway.scan.find') }}</NButton>
          </div>
          <span class="muted small">{{ picked.onvif ? t('gateway.scan.findOnvif') : t('gateway.scan.findGuess') }}</span>
          <NAlert v-if="findError" type="warning" :show-icon="false">{{ findError }}</NAlert>
          <template v-if="streamOptions.length">
            <span v-if="found?.guess?.guess" class="muted small">{{ t('gateway.scan.brand', { brand: found.guess.guess.brand }) }}</span>
            <div class="field">
              <span class="label">{{ t('gateway.scan.main') }}</span>
              <NSelect v-model:value="mainUrl" :options="streamOptions" size="small" />
            </div>
            <div class="field">
              <span class="label">{{ t('gateway.scan.sub') }}</span>
              <span v-if="streamOptions.length === 1" class="muted small">{{ t('gateway.scan.noSub') }}</span>
              <NSelect v-else v-model:value="subUrl" :options="[{ label: t('gateway.scan.noSub'), value: '' }, ...streamOptions]" size="small" />
            </div>
            <NSpace justify="end">
              <NButton size="small" type="primary" :disabled="!mainUrl" @click="use">{{ t('gateway.scan.use') }}</NButton>
            </NSpace>
          </template>
        </NSpace>
      </NAlert>
    </NSpace>
  </NModal>
</template>

<style scoped>
.row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
  justify-content: space-between;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.label {
  font-weight: 500;
}
.center {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  padding: 24px 0;
}
.muted {
  opacity: 0.7;
}
.small {
  font-size: 12px;
}
:deep(.muted) {
  opacity: 0.7;
}
:deep(.small) {
  font-size: 12px;
}
</style>
