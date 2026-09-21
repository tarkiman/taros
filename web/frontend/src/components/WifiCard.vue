<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NIcon, NInput, NModal, NSelect, NSpin, NTag } from 'naive-ui'
import { Lock, RefreshCw, Wifi } from '@lucide/vue'
import { ApiError } from '../api/client'
import { wifiApi, type WifiJob, type WifiNetwork, type WifiSecurity, type WifiStatus } from '../api/wifi'
import { currentPassword, newPassword, noAutofill } from '../utils/inputProps'

// Wi-Fi scan / connect / forget (internal/wifi → NetworkManager). Switching
// can take this very device offline, so the server verifies the new link and
// rolls back by itself; this card just starts it and then *waits for the Pi to
// come back* to read the outcome (the browser's own connection usually drops).
const { t } = useI18n()

const status = ref<WifiStatus | null>(null)
const networks = ref<WifiNetwork[]>([])
const loading = ref(true)
const scanning = ref(false)
const loadError = ref('')

const supported = computed(() => status.value?.available.supported === true)
const job = computed<WifiJob | null>(() => status.value?.job ?? null)
const switching = computed(() => !!job.value && ['connecting', 'verifying', 'rollback'].includes(job.value.phase))

// ---- loading -------------------------------------------------------------
async function loadStatus(): Promise<boolean> {
  try {
    status.value = await wifiApi.status()
    return true
  } catch {
    return false
  }
}

async function loadNetworks(rescan: boolean) {
  scanning.value = true
  loadError.value = ''
  try {
    networks.value = (await wifiApi.networks(rescan)).networks
  } catch (e) {
    loadError.value = e instanceof ApiError ? e.message : t('settings.wifi.scanFailed')
  } finally {
    scanning.value = false
  }
}

// ---- polling while a switch runs / the link is down ----------------------
let timer: ReturnType<typeof setTimeout> | null = null
const linkLostSince = ref<number | null>(null)
const startedAt = ref(0)
const awaiting = ref(false) // we started a switch and haven't seen it finish yet

async function poll() {
  const ok = await loadStatus()
  if (!ok) {
    linkLostSince.value ??= Date.now()
  } else {
    linkLostSince.value = null
    const j = status.value?.job
    if (awaiting.value && j && j.phase === 'done' && j.finishedAt && new Date(j.finishedAt).getTime() >= startedAt.value - 2000) {
      awaiting.value = false
      await loadNetworks(false)
    }
  }
  if (awaiting.value || switching.value) timer = setTimeout(poll, ok ? 2000 : 3000)
}
function startPolling() {
  if (timer) clearTimeout(timer)
  timer = setTimeout(poll, 1500)
}

const linkLostLong = computed(() => linkLostSince.value !== null && Date.now() - linkLostSince.value > 20000)
const newAddress = computed(() => {
  const ip = status.value?.current?.ip
  return ip ? `http://${ip}:${location.port || '80'}` : ''
})

onMounted(async () => {
  await loadStatus()
  loading.value = false
  if (supported.value) await loadNetworks(false)
  if (switching.value) {
    awaiting.value = true
    startedAt.value = job.value?.startedAt ? new Date(job.value.startedAt).getTime() : Date.now()
    startPolling()
  }
})
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

// ---- result banner -------------------------------------------------------
const dismissed = ref(false)
const showResult = computed(() => {
  const j = job.value
  if (!j || j.phase !== 'done' || dismissed.value || !j.finishedAt) return false
  return Date.now() - new Date(j.finishedAt).getTime() < 10 * 60 * 1000
})

// ---- signal / labels -----------------------------------------------------
const bars = (s: number) => (s >= 75 ? 4 : s >= 50 ? 3 : s >= 25 ? 2 : 1)
const secLabel = (s: WifiSecurity) => t(`settings.wifi.security.${s}`)
const reasonText = computed(() => t(`settings.wifi.reason.${status.value?.available.reason ?? 'no_nmcli'}`))

// ---- connect / forget dialog --------------------------------------------
type Mode = 'connect' | 'hidden' | 'forget'
const dlg = ref<{ mode: Mode; net?: WifiNetwork } | null>(null)
const ssid = ref('')
const security = ref<WifiSecurity>('wpa2')
const wifiPw = ref('')
const dashPw = ref('')
const busy = ref(false)
const err = ref('')

const wifiPwProps = newPassword('wifi-network-password')
const dashPwProps = currentPassword('confirm-wifi-dashboard-password')
const ssidProps = noAutofill('wifi-hidden-ssid')
const secOptions = computed(() => [
  { label: t('settings.wifi.security.wpa2'), value: 'wpa2' },
  { label: t('settings.wifi.security.wpa3'), value: 'wpa3' },
  { label: t('settings.wifi.security.open'), value: 'open' },
])

function reset() {
  ssid.value = ''
  security.value = 'wpa2'
  wifiPw.value = ''
  dashPw.value = ''
  err.value = ''
  busy.value = false
}
function open(mode: Mode, net?: WifiNetwork) {
  reset()
  if (net) {
    ssid.value = net.ssid
    security.value = net.security
  }
  dlg.value = { mode, net }
}
const close = () => {
  if (!busy.value) dlg.value = null
}

// A password is asked only when needed: secured network with no saved profile.
const needsWifiPw = computed(() => {
  if (!dlg.value || dlg.value.mode === 'forget') return false
  if (security.value === 'open') return false
  return dlg.value.mode === 'hidden' || !dlg.value.net?.savedUuid
})
// Saved secured network: the user may still type a new password (to replace a stale one).
const canSubmit = computed(() => {
  if (!dlg.value || busy.value || !dashPw.value) return false
  if (dlg.value.mode === 'forget') return true
  if (!ssid.value.trim()) return false
  return !needsWifiPw.value || wifiPw.value.length >= 8
})

async function submit() {
  if (!dlg.value || !canSubmit.value) return
  busy.value = true
  err.value = ''
  try {
    if (dlg.value.mode === 'forget') {
      await wifiApi.forget(dlg.value.net!.savedUuid!, dashPw.value)
      dlg.value = null
      await loadNetworks(false)
      return
    }
    startedAt.value = Date.now()
    const res = await wifiApi.connect({
      ssid: ssid.value.trim(),
      wifiPassword: wifiPw.value,
      security: security.value,
      hidden: dlg.value.mode === 'hidden',
      password: dashPw.value,
    })
    dismissed.value = false
    if (status.value) status.value = { ...status.value, job: res.job }
    awaiting.value = true
    dlg.value = null
    startPolling()
  } catch (e) {
    err.value = e instanceof ApiError && e.status === 403 ? t('common.wrongPassword') : e instanceof ApiError ? e.message : t('settings.wifi.failedGeneric')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <NCard embedded size="small" :title="t('settings.wifi.title')" style="margin-top: 16px">
    <div v-if="loading" class="loading"><NSpin size="small" /></div>
    <NAlert v-else-if="!supported && !switching" type="warning" :show-icon="false">
      <strong>{{ t('settings.wifi.unavailable') }}</strong> {{ reasonText }}
    </NAlert>

    <template v-else>
      <p class="text-muted intro">{{ t('settings.wifi.desc') }}</p>

      <!-- current connection -->
      <div v-if="status?.current?.connected" class="current">
        <NIcon :component="Wifi" size="18" />
        <div>
          <div class="cur-name">{{ status.current.ssid }}</div>
          <div class="text-muted mono">{{ status.current.ip }} · {{ t('settings.wifi.signal', { n: status.current.signal ?? 0 }) }}</div>
        </div>
      </div>
      <NAlert v-else-if="!switching" type="warning" :show-icon="false" class="gap">{{ t('settings.wifi.notConnected') }}</NAlert>

      <!-- a switch in progress / finished -->
      <NAlert v-if="switching || awaiting" type="info" :show-icon="false" class="gap">
        <div class="row"><NSpin size="small" /> <strong>{{ t('settings.wifi.switching', { ssid: job?.ssid ?? '' }) }}</strong></div>
        <p class="text-muted small">{{ t(`settings.wifi.phase.${job?.phase ?? 'connecting'}`) }}</p>
        <p v-if="linkLostSince" class="small">{{ t('settings.wifi.linkLost') }}</p>
        <p v-if="linkLostLong" class="small">{{ t('settings.wifi.linkLostLong') }}</p>
      </NAlert>
      <NAlert
        v-else-if="showResult && job"
        :type="job.result === 'connected' ? 'success' : job.result === 'rollback_failed' ? 'error' : 'warning'"
        :show-icon="false"
        class="gap"
        closable
        @close="dismissed = true"
      >
        <strong>{{ t(`settings.wifi.result.${job.result}`, { ssid: job.ssid ?? '', previous: job.previousSsid ?? '' }) }}</strong>
        <p v-if="job.result === 'connected' && newAddress" class="small">
          {{ t('settings.wifi.newAddress') }} <a :href="newAddress">{{ newAddress }}</a>
        </p>
        <p v-if="job.detail && job.result !== 'connected'" class="small mono">{{ job.detail }}</p>
        <p v-if="job.result === 'rolled_back' || job.result === 'failed'" class="small">{{ t('settings.wifi.failHint') }}</p>
      </NAlert>

      <div class="toolbar">
        <NButton size="small" :loading="scanning" :disabled="switching || awaiting" @click="loadNetworks(true)">
          <template #icon><NIcon :component="RefreshCw" /></template>
          {{ t('settings.wifi.scan') }}
        </NButton>
        <NButton size="small" quaternary :disabled="switching || awaiting" @click="open('hidden')">{{ t('settings.wifi.hidden') }}</NButton>
      </div>

      <NAlert v-if="loadError" type="error" :show-icon="false" class="gap">{{ loadError }}</NAlert>
      <p v-else-if="!networks.length && !scanning" class="text-muted">{{ t('settings.wifi.noNetworks') }}</p>

      <ul class="nets">
        <li v-for="n in networks" :key="n.ssid" :class="{ current: n.inUse }">
          <span class="bars" :title="`${n.signal}%`" :aria-label="`${n.signal}%`">
            <i v-for="b in 4" :key="b" :class="{ on: b <= bars(n.signal) }" :style="{ height: 4 + b * 3 + 'px' }" />
          </span>
          <span class="ssid">{{ n.ssid }}</span>
          <NIcon v-if="n.security !== 'open'" :component="Lock" size="13" class="lock" />
          <span class="text-muted sec">{{ secLabel(n.security) }}</span>
          <NTag v-if="n.inUse" size="small" type="success" :bordered="false">{{ t('settings.wifi.connected') }}</NTag>
          <NTag v-else-if="n.savedUuid" size="small" :bordered="false">{{ t('settings.wifi.saved') }}</NTag>
          <span class="spacer" />
          <template v-if="!n.inUse">
            <NButton v-if="!n.supported" size="tiny" disabled>{{ t('settings.wifi.unsupported') }}</NButton>
            <template v-else>
              <NButton v-if="n.savedUuid" size="tiny" quaternary type="error" :disabled="switching || awaiting" @click="open('forget', n)">
                {{ t('settings.wifi.forget') }}
              </NButton>
              <NButton size="tiny" type="primary" secondary :disabled="switching || awaiting" @click="open('connect', n)">
                {{ t('settings.wifi.connect') }}
              </NButton>
            </template>
          </template>
        </li>
      </ul>
      <p class="text-muted small">{{ t('settings.wifi.safety') }}</p>
    </template>

    <NModal
      :show="!!dlg"
      preset="card"
      style="max-width: 460px"
      :title="dlg?.mode === 'forget' ? t('settings.wifi.forgetTitle', { ssid }) : dlg?.mode === 'hidden' ? t('settings.wifi.hiddenTitle') : t('settings.wifi.connectTitle', { ssid })"
      :closable="!busy"
      :mask-closable="false"
      @update:show="close"
    >
      <template v-if="dlg">
        <template v-if="dlg.mode === 'forget'">
          <p>{{ t('settings.wifi.forgetBody') }}</p>
        </template>
        <template v-else>
          <div v-if="dlg.mode === 'hidden'" class="field">
            <label>{{ t('settings.wifi.ssid') }}</label>
            <NInput v-model:value="ssid" size="small" :input-props="ssidProps" :placeholder="t('settings.wifi.ssid')" />
            <NSelect v-model:value="security" size="small" :options="secOptions" style="margin-top: 8px" />
          </div>
          <div v-if="needsWifiPw" class="field">
            <label>{{ t('settings.wifi.networkPassword') }}</label>
            <NInput v-model:value="wifiPw" type="password" show-password-on="click" size="small" :input-props="wifiPwProps" :placeholder="t('settings.wifi.networkPassword')" />
          </div>
          <p v-else-if="dlg.net?.savedUuid" class="text-muted small">{{ t('settings.wifi.usesSaved') }}</p>
          <NAlert type="warning" :show-icon="false" class="gap">
            <p class="small">{{ t('settings.wifi.warnSwitch') }}</p>
          </NAlert>
        </template>

        <div class="field">
          <label>{{ t('settings.wifi.confirmWith') }}</label>
          <NInput v-model:value="dashPw" type="password" show-password-on="click" size="small" :input-props="dashPwProps" :placeholder="t('common.dashboardPassword')" @keyup.enter="submit" />
        </div>
        <NAlert v-if="err" type="error" :show-icon="false" class="gap">{{ err }}</NAlert>
      </template>
      <template #footer>
        <div class="footer">
          <NButton :disabled="busy" @click="close">{{ t('common.cancel') }}</NButton>
          <NButton :type="dlg?.mode === 'forget' ? 'error' : 'primary'" :loading="busy" :disabled="!canSubmit" @click="submit">
            {{ dlg?.mode === 'forget' ? t('settings.wifi.forget') : t('settings.wifi.connect') }}
          </NButton>
        </div>
      </template>
    </NModal>
  </NCard>
</template>

<style scoped>
.loading { display: flex; justify-content: center; padding: 24px 0; }
.text-muted { color: var(--text-muted); font-size: 0.8rem; margin: 0; }
.small { font-size: 0.8rem; margin: 4px 0 0; }
.intro { margin-bottom: 10px; }
.gap { margin: 8px 0; }
.mono { font-family: var(--font-mono); font-size: 0.78rem; }
.row { display: flex; align-items: center; gap: 8px; }
.current { display: flex; align-items: center; gap: 12px; padding: 10px 12px; border: 1px solid var(--border); border-radius: 8px; margin-bottom: 8px; }
.cur-name { font-weight: 600; }
.toolbar { display: flex; gap: 8px; margin: 10px 0; }
.nets { list-style: none; margin: 0 0 8px; padding: 0; }
.nets li { display: flex; align-items: center; gap: 10px; padding: 8px 4px; border-top: 1px solid var(--border); font-size: 0.88rem; flex-wrap: wrap; }
.nets li.current .ssid { font-weight: 600; }
.bars { display: inline-flex; align-items: flex-end; gap: 2px; width: 22px; height: 16px; }
.bars i { width: 4px; background: var(--border); border-radius: 1px; }
.bars i.on { background: var(--success); }
.ssid { min-width: 120px; overflow-wrap: anywhere; }
.lock { color: var(--text-muted); }
.sec { font-size: 0.75rem; }
.spacer { flex: 1; }
.field { margin-bottom: 12px; }
.field label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
.footer { display: flex; justify-content: flex-end; gap: 8px; }
</style>
