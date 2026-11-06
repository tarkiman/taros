<script setup lang="ts">
// Settings > Gerbang lokasi (docs/04-features.md §4.18): guided setup of the gateway:
// block — readiness checks, "Tes" for go2rtc and every central host, validation that
// mirrors the server's, then save (password re-confirm → rewrite gateway: → restart).
import { computed, onMounted, reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NIcon, NInput, NInputNumber, NSelect, NSpace, NSpin, NSwitch, NTag } from 'naive-ui'
import { CircleCheck, CircleX, TriangleAlert, Plus, Trash2 } from '@lucide/vue'
import { ApiError } from '../api/client'
import { gatewaySetupApi, type GatewaySetupConfig, type GatewaySetupStatus } from '../api/gateway'
import { noAutofill, currentPassword } from '../utils/inputProps'

const { t } = useI18n()
const status = ref<GatewaySetupStatus | null>(null)
const form = ref<GatewaySetupConfig>({ enabled: false, go2rtcUrl: 'http://127.0.0.1:1984', pollSeconds: 10, central: [] })
const loadError = ref('')

type Probe = { busy: boolean; ok?: boolean; text?: string }
const go2rtcProbe = reactive<Probe>({ busy: false })
const centralProbe = reactive<Record<number, Probe>>({})

type Flow = 'idle' | 'confirm' | 'applying' | 'restarting' | 'error'
const flow = ref<Flow>('idle')
const flowError = ref('')
const password = ref('')

async function load() {
  try {
    status.value = await gatewaySetupApi.status()
    form.value = JSON.parse(JSON.stringify(status.value.config))
    if (!form.value.central.length) form.value.central.push({ label: 'NVR (umma)', host: '', port: 8091 })
  } catch (e) {
    loadError.value = e instanceof ApiError ? e.message : t('gateway.setup.loadFailed')
  }
}
onMounted(load)

const pollOptions = computed(() => [5, 10, 30].map((v) => ({ label: t('gateway.setup.everySeconds', { n: v }), value: v })))

// Same rules as the server (handlers_settings_gateway.go) so mistakes show while typing.
const hostRe = /^[A-Za-z0-9]([A-Za-z0-9-]{0,62})(\.[A-Za-z0-9]([A-Za-z0-9-]{0,62}))*$/
const ipv6Re = /^[0-9a-fA-F:]+$/
const validHost = (h: string) => !!h && (hostRe.test(h) || (h.includes(':') && ipv6Re.test(h)))
const validPort = (p: number | null) => p !== null && Number.isInteger(p) && p >= 1 && p <= 65535
const validLabel = (l: string) => l.trim().length > 0 && [...l.trim()].length <= 40
function validGo2rtc(u: string) {
  try {
    const url = new URL(u)
    if (!['http:', 'https:'].includes(url.protocol) || url.username) return false
    const h = url.hostname
    return h === 'localhost' || /^(127\.|10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.|100\.(6[4-9]|[7-9]\d|1[01]\d|12[0-7])\.)/.test(h)
  } catch {
    return false
  }
}
const rowErrors = computed(() =>
  form.value.central.map((c, i) => {
    const dup = form.value.central.findIndex((o) => o.host.trim() === c.host.trim() && o.port === c.port) !== i
    return { label: !validLabel(c.label), host: !validHost(c.host.trim()), port: !validPort(c.port), dup }
  }),
)
const formValid = computed(
  () => validGo2rtc(form.value.go2rtcUrl.trim()) && rowErrors.value.every((e) => !e.label && !e.host && !e.port && !e.dup) && form.value.central.length <= 8,
)

async function testGo2rtc() {
  go2rtcProbe.busy = true
  try {
    const r = await gatewaySetupApi.testGo2rtc(form.value.go2rtcUrl.trim())
    go2rtcProbe.ok = r.ok
    go2rtcProbe.text = r.ok ? t('gateway.setup.go2rtcOk', { n: r.streams?.length ?? 0, names: (r.streams ?? []).join(', ') || '—' }) : r.error
  } catch (e) {
    go2rtcProbe.ok = false
    go2rtcProbe.text = e instanceof ApiError ? e.message : String(e)
  } finally {
    go2rtcProbe.busy = false
  }
}

async function testCentral(i: number) {
  const c = form.value.central[i]
  const p = (centralProbe[i] ??= { busy: false })
  p.busy = true
  try {
    const r = await gatewaySetupApi.testCentral(c.host.trim(), c.port ?? 0)
    p.ok = r.ok
    p.text = r.ok ? `${r.rttMs.toFixed(0)} ms` : t(`gateway.setup.netErr.${r.error || 'error'}`)
  } catch (e) {
    p.ok = false
    p.text = e instanceof ApiError ? e.message : String(e)
  } finally {
    p.busy = false
  }
}

function addRow() {
  form.value.central.push({ label: '', host: '', port: null })
}
function removeRow(i: number) {
  form.value.central.splice(i, 1)
  delete centralProbe[i]
}

async function save() {
  flow.value = 'applying'
  try {
    const body: GatewaySetupConfig = {
      ...form.value,
      go2rtcUrl: form.value.go2rtcUrl.trim(),
      central: form.value.central.map((c) => ({ label: c.label.trim(), host: c.host.trim(), port: c.port })),
    }
    await gatewaySetupApi.save(body, password.value)
    password.value = ''
    flow.value = 'restarting'
    waitForRestart(body.enabled)
  } catch (e) {
    flowError.value = e instanceof ApiError && e.status === 403 ? t('common.wrongPassword') : e instanceof Error ? e.message : t('gateway.setup.saveFailed')
    flow.value = 'error'
  }
}

// The server exits ~700 ms after answering; systemd starts it again with the new config.
// Sessions live in memory, so everyone is logged out by the restart: poll the public
// session endpoint, then go to the login page with the Gateway page as the next stop.
async function waitForRestart(enabled: boolean) {
  const next = enabled ? '/gateway' : '/settings'
  for (let attempt = 0; attempt < 40; attempt++) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      const res = await fetch('/api/auth/session', { credentials: 'include' })
      if (res.ok) {
        location.href = `/login?next=${encodeURIComponent(next)}`
        return
      }
    } catch {
      // still restarting
    }
  }
  location.href = `/login?next=${encodeURIComponent(next)}`
}

const ztNet = computed(() => status.value?.zerotier.networks[0])
</script>

<template>
  <NCard embedded size="small" :title="t('gateway.setup.title')" style="margin-top: 16px">
    <NSpace vertical :size="12">
      <p class="text-muted">{{ t('gateway.setup.desc') }}</p>
      <NAlert v-if="loadError" type="error" :show-icon="false">{{ loadError }}</NAlert>
      <NSpin v-else-if="!status" size="small" />
      <template v-else>
        <!-- 1. readiness -->
        <div class="checks">
          <div class="check">
            <NIcon :component="status.root ? CircleCheck : TriangleAlert" :color="status.root ? '#18a058' : '#f0a020'" size="16" />
            <span>{{ status.root ? t('gateway.setup.rootOk') : t('gateway.setup.rootMissing') }}</span>
          </div>
          <div class="check">
            <NIcon :component="status.zerotier.available && status.zerotier.online ? CircleCheck : CircleX" :color="status.zerotier.available && status.zerotier.online ? '#18a058' : '#d03050'" size="16" />
            <span v-if="status.zerotier.available">
              ZeroTier {{ status.zerotier.online ? 'online' : 'offline' }}<template v-if="ztNet"> · {{ ztNet.addresses.join(', ') }} ({{ ztNet.name || ztNet.id }})</template>
            </span>
            <span v-else>{{ t(`gateway.zt.${status.zerotier.reason ?? 'error'}`) }}</span>
          </div>
          <div class="check">
            <NIcon :component="status.containers.some((c) => c.state === 'running') ? CircleCheck : TriangleAlert" :color="status.containers.some((c) => c.state === 'running') ? '#18a058' : '#f0a020'" size="16" />
            <span v-if="status.containers.length">{{ t('gateway.setup.containers', { list: status.containers.map((c) => `${c.name} (${c.state})`).join(', ') }) }}</span>
            <span v-else>{{ t('gateway.setup.noContainer') }}</span>
          </div>
        </div>

        <!-- 2. form -->
        <NSpace align="center" justify="space-between">
          <span>{{ t('gateway.setup.enable') }}</span>
          <NSwitch v-model:value="form.enabled" size="small" :disabled="flow !== 'idle' && flow !== 'error'" />
        </NSpace>

        <div class="field">
          <span class="field-label">{{ t('gateway.setup.go2rtcUrl') }}</span>
          <div class="row">
            <NInput v-model:value="form.go2rtcUrl" :status="validGo2rtc(form.go2rtcUrl.trim()) ? undefined : 'error'" :input-props="noAutofill('gateway-go2rtc-url')" style="flex: 1" />
            <NButton size="small" :loading="go2rtcProbe.busy" :disabled="!validGo2rtc(form.go2rtcUrl.trim())" @click="testGo2rtc">{{ t('gateway.setup.test') }}</NButton>
          </div>
          <span v-if="!validGo2rtc(form.go2rtcUrl.trim())" class="err">{{ t('gateway.setup.go2rtcInvalid') }}</span>
          <NTag v-else-if="go2rtcProbe.text" size="small" :bordered="false" :type="go2rtcProbe.ok ? 'success' : 'error'">{{ go2rtcProbe.text }}</NTag>
        </div>

        <div class="field">
          <span class="field-label">{{ t('gateway.setup.central') }}</span>
          <span class="text-muted small">{{ t('gateway.setup.centralHint') }}</span>
          <div v-for="(c, i) in form.central" :key="i" class="central-row">
            <NInput v-model:value="c.label" :placeholder="t('gateway.setup.labelPh')" :status="rowErrors[i]?.label ? 'error' : undefined" :input-props="noAutofill(`gateway-central-label-${i}`)" class="c-label" />
            <NInput v-model:value="c.host" placeholder="172.22.244.135" :status="rowErrors[i]?.host || rowErrors[i]?.dup ? 'error' : undefined" :input-props="noAutofill(`gateway-central-host-${i}`)" class="c-host" />
            <NInputNumber v-model:value="c.port" placeholder="8091" :min="1" :max="65535" :show-button="false" :status="rowErrors[i]?.port ? 'error' : undefined" class="c-port" />
            <NButton size="small" :loading="centralProbe[i]?.busy" :disabled="rowErrors[i]?.host || rowErrors[i]?.port" @click="testCentral(i)">{{ t('gateway.setup.test') }}</NButton>
            <NButton size="small" quaternary :aria-label="t('gateway.setup.remove')" @click="removeRow(i)"><NIcon :component="Trash2" /></NButton>
            <NTag v-if="centralProbe[i]?.text" size="small" :bordered="false" :type="centralProbe[i]?.ok ? 'success' : 'error'">{{ centralProbe[i]?.text }}</NTag>
            <span v-if="rowErrors[i]?.dup" class="err">{{ t('gateway.setup.duplicate') }}</span>
          </div>
          <NButton size="small" dashed :disabled="form.central.length >= 8" @click="addRow"><NIcon :component="Plus" /> {{ t('gateway.setup.addCentral') }}</NButton>
        </div>

        <div class="field">
          <span class="field-label">{{ t('gateway.setup.poll') }}</span>
          <NSelect v-model:value="form.pollSeconds" :options="pollOptions" size="small" style="max-width: 220px" />
        </div>

        <!-- 3. save -->
        <template v-if="flow === 'idle'">
          <NSpace justify="end">
            <NButton type="primary" size="small" :disabled="!formValid" @click="flow = 'confirm'">{{ t('gateway.setup.save') }}</NButton>
          </NSpace>
          <p class="text-muted small">{{ t('gateway.setup.restartNote') }}</p>
        </template>
        <NAlert v-else-if="flow === 'confirm'" type="warning" :show-icon="false">
          <NSpace vertical :size="10">
            <span>{{ form.enabled ? t('gateway.setup.confirmOn') : t('gateway.setup.confirmOff') }}</span>
            <NInput v-model:value="password" type="password" show-password-on="click" :placeholder="t('common.dashboardPassword')" :input-props="currentPassword('gateway-confirm-password')" @keyup.enter="password && save()" />
            <NSpace>
              <NButton size="small" @click="(flow = 'idle'), (password = '')">{{ t('common.cancel') }}</NButton>
              <NButton size="small" type="primary" :disabled="!password" @click="save">{{ t('gateway.setup.save') }}</NButton>
            </NSpace>
          </NSpace>
        </NAlert>
        <div v-else-if="flow === 'applying'" class="row"><NSpin size="small" /> <span>{{ t('settings.savingRestarting') }}</span></div>
        <div v-else-if="flow === 'restarting'" class="row"><NSpin size="small" /> <span>{{ t('gateway.setup.waiting') }}</span></div>
        <NAlert v-else-if="flow === 'error'" type="error" :show-icon="false">
          <NSpace vertical :size="10">
            <span><NIcon :component="TriangleAlert" size="14" /> {{ flowError }}</span>
            <NButton size="small" @click="flow = 'confirm'">{{ t('common.tryAgain') }}</NButton>
          </NSpace>
        </NAlert>

        <p v-if="status.active" class="text-muted small">
          {{ t('gateway.setup.activeNote') }}
          <RouterLink to="/gateway">{{ t('gateway.setup.openPage') }}</RouterLink>
        </p>
      </template>
    </NSpace>
  </NCard>
</template>

<style scoped>
.checks {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.check,
.row {
  display: flex;
  align-items: center;
  gap: 8px;
  flex-wrap: wrap;
}
.field {
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.field-label {
  font-weight: 500;
}
.central-row {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-wrap: wrap;
}
.c-label {
  flex: 1 1 160px;
}
.c-host {
  flex: 2 1 180px;
}
.c-port {
  width: 96px;
}
.err {
  color: #d03050;
  font-size: 12px;
}
.small {
  font-size: 12px;
}
.text-muted {
  opacity: 0.7;
}
</style>
