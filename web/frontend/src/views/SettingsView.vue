<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NCard, NSpace, NSwitch, NInput, NInputNumber, NSlider, NButton, NAlert, NSpin, NIcon, NTag, useMessage } from 'naive-ui'
import { TriangleAlert } from '@lucide/vue'
import qrcode from 'qrcode-generator'
import AppShell from '../layouts/AppShell.vue'
import { terminalApi } from '../api/terminal'
import { settingsApi } from '../api/settings'
import { totpApi } from '../api/totp'
import { notifyApi, type NotifySettings } from '../api/notify'
import { ApiError } from '../api/client'

const { t } = useI18n()
const message = useMessage()

// --- current state ---
const loading = ref(true)
const enabled = ref(false)

async function loadStatus() {
  loading.value = true
  try {
    const res = await terminalApi.status()
    enabled.value = res.enabled
  } catch {
    message.error(t('settings.terminalStatusFailed'))
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  loadStatus()
  loadTotpStatus()
  loadPortStatus()
  loadNotifySettings()
})

// --- toggle flow: switch never applies directly, always goes through a
// password-confirm step first — this flips the app's highest-risk
// feature, see internal/web/handlers_settings.go. ---
type FlowState = 'idle' | 'confirm' | 'applying' | 'restarting' | 'error'
const flow = ref<FlowState>('idle')
const flowError = ref('')
const password = ref('')
const pendingValue = ref(false)

function requestToggle(next: boolean) {
  pendingValue.value = next
  password.value = ''
  flowError.value = ''
  flow.value = 'confirm'
}
function cancelToggle() {
  flow.value = 'idle'
  password.value = ''
}
function retryToggle() {
  password.value = ''
  flowError.value = ''
  flow.value = 'confirm'
}

async function confirmToggle() {
  if (!password.value) return
  flow.value = 'applying'
  flowError.value = ''
  try {
    await settingsApi.setTerminalEnabled(pendingValue.value, password.value)
    flow.value = 'restarting'
    waitForRestartThenReload()
  } catch (e) {
    flowError.value = e instanceof ApiError && e.status === 403 ? t('common.wrongPassword') : e instanceof Error ? e.message : t('settings.saveSettingsFailed')
    flow.value = 'error'
  }
}

async function waitForRestartThenReload() {
  // Same mechanism as the update-apply flow (AppShell.vue): the server
  // exits itself ~700ms after responding and systemd (Restart=always)
  // brings it back up reading the freshly-written config — poll until it
  // answers again rather than guessing a fixed delay.
  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      const res = await fetch('/api/terminal/status', { credentials: 'include' })
      if (res.ok) {
        location.reload()
        return
      }
    } catch {
      // still down — keep polling
    }
  }
  location.reload()
}

// --- port config ---
const portListen = ref('')
const portFlow = ref<FlowState>('idle')
const portError = ref('')
const portPassword = ref('')
const pendingPort = ref<number | null>(null)

const currentPort = computed(() => {
  const m = portListen.value.match(/:(\d+)$/)
  return m ? m[1] : portListen.value
})

async function loadPortStatus() {
  try {
    const res = await settingsApi.getPort()
    portListen.value = res.listen
    pendingPort.value = Number(currentPort.value) || null
  } catch {
    message.error(t('settings.portStatusFailed'))
  }
}

function requestPortChange() {
  portPassword.value = ''
  portError.value = ''
  portFlow.value = 'confirm'
}
function cancelPortChange() {
  portFlow.value = 'idle'
  portPassword.value = ''
  pendingPort.value = Number(currentPort.value) || null
}
function retryPortChange() {
  portPassword.value = ''
  portError.value = ''
  portFlow.value = 'confirm'
}

async function confirmPortChange() {
  if (!portPassword.value || !pendingPort.value) return
  portFlow.value = 'applying'
  portError.value = ''
  try {
    await settingsApi.setPort(pendingPort.value, portPassword.value)
    portFlow.value = 'restarting'
    waitForRestartThenReloadNewPort(pendingPort.value)
  } catch (e) {
    portError.value =
      e instanceof ApiError && e.status === 403
        ? t('common.wrongPassword')
        : e instanceof ApiError
          ? e.message
          : t('settings.portChangeFailed')
    portFlow.value = 'error'
  }
}

async function waitForRestartThenReloadNewPort(newPort: number) {
  // Same restart wait as waitForRestartThenReload above, but the port the
  // browser is currently on is about to stop answering entirely once the
  // service restarts — polling *this* origin would just spin until
  // timeout. Poll the NEW origin instead. That's a cross-origin request
  // (different port = different origin), which the server has no CORS
  // headers for, so a normal fetch() would always reject even once the
  // service is back up — mode: 'no-cors' sidesteps that: the browser
  // still attempts the real network request and the promise still
  // rejects on connection failure (which is all that's needed here),
  // it just can't read the (opaque) response body/status, which this
  // doesn't need anyway.
  const newOrigin = `${location.protocol}//${location.hostname}:${newPort}`
  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      await fetch(`${newOrigin}/`, { mode: 'no-cors', cache: 'no-store' })
      window.location.href = newOrigin
      return
    } catch {
      // still down — keep polling
    }
  }
  window.location.href = newOrigin
}

// --- TOTP (2FA) ---
type TotpFlow = 'idle' | 'setup' | 'backupCodes' | 'disableConfirm' | 'applying' | 'error'
const totpEnabled = ref(false)
const totpRemaining = ref(0)
const totpFlow = ref<TotpFlow>('idle')
const totpError = ref('')
const totpSecret = ref('')
const totpOtpauthUrl = ref('')
const totpCode = ref('')
const totpPassword = ref('')
const totpBackupCodes = ref<string[]>([])

const totpQrSvg = computed(() => {
  if (!totpOtpauthUrl.value) return ''
  const qr = qrcode(0, 'M')
  qr.addData(totpOtpauthUrl.value)
  qr.make()
  return qr.createSvgTag({ cellSize: 4, margin: 2 })
})

async function loadTotpStatus() {
  try {
    const res = await totpApi.status()
    totpEnabled.value = res.enabled
    totpRemaining.value = res.remainingBackupCodes ?? 0
  } catch {
    message.error(t('settings.totpStatusFailed'))
  }
}

async function startTotpSetup() {
  totpFlow.value = 'applying'
  totpError.value = ''
  try {
    const res = await totpApi.setup()
    totpSecret.value = res.secret
    totpOtpauthUrl.value = res.otpauthUrl
    totpCode.value = ''
    totpFlow.value = 'setup'
  } catch (e) {
    totpError.value = e instanceof Error ? e.message : t('settings.totpSetupFailed')
    totpFlow.value = 'error'
  }
}

async function confirmTotpSetup() {
  if (!totpCode.value) return
  totpFlow.value = 'applying'
  totpError.value = ''
  try {
    const res = await totpApi.confirm(totpSecret.value, totpCode.value)
    totpBackupCodes.value = res.backupCodes
    totpFlow.value = 'backupCodes'
    await loadTotpStatus()
  } catch (e) {
    totpError.value = e instanceof ApiError ? e.message : t('settings.totpConfirmFailed')
    totpFlow.value = 'setup' // back to the code-entry step, not a dead-end error screen
  }
}

function finishBackupCodes() {
  totpFlow.value = 'idle'
  totpBackupCodes.value = []
}

function requestTotpDisable() {
  totpPassword.value = ''
  totpError.value = ''
  totpFlow.value = 'disableConfirm'
}

async function confirmTotpDisable() {
  if (!totpPassword.value) return
  totpFlow.value = 'applying'
  totpError.value = ''
  try {
    await totpApi.disable(totpPassword.value)
    totpFlow.value = 'idle'
    await loadTotpStatus()
  } catch (e) {
    totpError.value = e instanceof ApiError && e.status === 403 ? t('common.wrongPassword') : t('settings.totpDisableFailed')
    totpFlow.value = 'error'
  }
}

function cancelTotpFlow() {
  totpFlow.value = 'idle'
  totpSecret.value = ''
  totpOtpauthUrl.value = ''
  totpCode.value = ''
  totpPassword.value = ''
  totpError.value = ''
}

// --- Discord notifications ---
// No password-confirm flow like Terminal/Port above (see router.go's
// comment on these routes) — saving here neither restarts the service nor
// grants a new capability, same reasoning as quick links.
const notifyLoading = ref(true)
const notifySaving = ref(false)
const notifyTesting = ref(false)
const notifyForm = ref<NotifySettings>({
  enabled: false,
  webhookUrl: '',
  cpu: { enabled: false, thresholdPct: 90, durationMin: 5 },
  mem: { enabled: false, thresholdPct: 90, durationMin: 5 },
  temp: { enabled: false, thresholdC: 80, durationMin: 5 },
})

async function loadNotifySettings() {
  notifyLoading.value = true
  try {
    notifyForm.value = await notifyApi.get()
  } catch {
    message.error(t('settings.notify.loadFailed'))
  } finally {
    notifyLoading.value = false
  }
}

async function saveNotifySettings() {
  notifySaving.value = true
  try {
    notifyForm.value = await notifyApi.update(notifyForm.value)
    message.success(t('settings.notify.saved'))
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : t('settings.notify.saveFailed'))
  } finally {
    notifySaving.value = false
  }
}

async function sendNotifyTest() {
  notifyTesting.value = true
  try {
    await notifyApi.test(notifyForm.value.webhookUrl)
    message.success(t('settings.notify.testSent'))
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : t('settings.notify.testFailed'))
  } finally {
    notifyTesting.value = false
  }
}
</script>

<template>
  <AppShell>
    <NCard :title="t('settings.title')">
      <div v-if="loading" class="loading"><NSpin size="large" /></div>
      <template v-else>
        <NCard embedded size="small" title="Web Terminal">
          <NSpace vertical :size="12">
            <NSpace align="center" justify="space-between">
              <span>{{ t('settings.terminalDesc') }}</span>
              <NSwitch :value="enabled" :disabled="flow !== 'idle'" @update:value="requestToggle" />
            </NSpace>

            <NAlert v-if="flow === 'confirm'" type="warning" :show-icon="false">
              <NSpace vertical :size="10">
                <span>
                  {{ t('settings.toggleConfirmMsg', { action: pendingValue ? t('settings.enabling') : t('settings.disabling') }) }}
                </span>
                <NInput
                  v-model:value="password"
                  type="password"
                  show-password-on="click"
                  :placeholder="t('common.dashboardPassword')"
                  autocomplete="current-password"
                  @keyup.enter="confirmToggle"
                />
                <NSpace>
                  <NButton size="small" @click="cancelToggle">{{ t('common.cancel') }}</NButton>
                  <NButton size="small" type="primary" :disabled="!password" @click="confirmToggle">
                    {{ pendingValue ? t('settings.enable') : t('settings.disable') }}
                  </NButton>
                </NSpace>
              </NSpace>
            </NAlert>

            <div v-else-if="flow === 'applying'" class="flow-row">
              <NSpin size="small" /> <span>{{ t('settings.savingRestarting') }}</span>
            </div>
            <div v-else-if="flow === 'restarting'" class="flow-row">
              <NSpin size="small" /> <span>{{ t('settings.waitingRestart') }}</span>
            </div>
            <NAlert v-else-if="flow === 'error'" type="error" :show-icon="false">
              <NSpace vertical :size="10">
                <span><NIcon :component="TriangleAlert" size="14" /> {{ flowError }}</span>
                <NButton size="small" @click="retryToggle">{{ t('common.tryAgain') }}</NButton>
              </NSpace>
            </NAlert>

            <p class="text-muted">
              {{ t('settings.terminalHint') }}
            </p>
          </NSpace>
        </NCard>

        <NCard embedded size="small" :title="t('settings.portAppTitle')" style="margin-top: 16px">
          <NSpace vertical :size="12">
            <template v-if="portFlow === 'idle'">
              <NSpace align="center" justify="space-between">
                <span>{{ t('settings.portAccessedAt') }} <code>{{ currentPort }}</code></span>
                <NButton size="small" @click="requestPortChange">{{ t('settings.changePort') }}</NButton>
              </NSpace>
            </template>

            <NAlert v-else-if="portFlow === 'confirm'" type="warning" :show-icon="false">
              <NSpace vertical :size="10">
                <span>
                  {{ t('settings.portConfirmMsg') }}
                </span>
                <NInputNumber
                  v-model:value="pendingPort"
                  :min="1"
                  :max="65535"
                  :show-button="false"
                  placeholder="8090"
                  style="width: 100%"
                  @keyup.enter="confirmPortChange"
                />
                <NInput
                  v-model:value="portPassword"
                  type="password"
                  show-password-on="click"
                  :placeholder="t('common.dashboardPassword')"
                  autocomplete="current-password"
                  @keyup.enter="confirmPortChange"
                />
                <NSpace>
                  <NButton size="small" @click="cancelPortChange">{{ t('common.cancel') }}</NButton>
                  <NButton size="small" type="primary" :disabled="!portPassword || !pendingPort" @click="confirmPortChange">
                    {{ t('settings.changePort') }}
                  </NButton>
                </NSpace>
              </NSpace>
            </NAlert>

            <div v-else-if="portFlow === 'applying'" class="flow-row">
              <NSpin size="small" /> <span>{{ t('settings.savingRestarting') }}</span>
            </div>
            <div v-else-if="portFlow === 'restarting'" class="flow-row">
              <NSpin size="small" />
              <span>{{ t('settings.waitingRestartNewPort') }}</span>
            </div>
            <NAlert v-else-if="portFlow === 'error'" type="error" :show-icon="false">
              <NSpace vertical :size="10">
                <span><NIcon :component="TriangleAlert" size="14" /> {{ portError }}</span>
                <NButton size="small" @click="retryPortChange">{{ t('common.tryAgain') }}</NButton>
              </NSpace>
            </NAlert>

            <p class="text-muted">{{ t('settings.portDefaultHint') }}</p>
          </NSpace>
        </NCard>

        <NCard embedded size="small" :title="t('settings.totpTitle')" style="margin-top: 16px">
          <NSpace vertical :size="12">
            <template v-if="totpFlow === 'idle'">
              <NSpace align="center" justify="space-between">
                <span>
                  {{ t('settings.totpDesc') }}
                  <NTag v-if="totpEnabled" size="small" type="success" style="margin-left: 8px">{{ t('common.active') }}</NTag>
                </span>
                <NButton v-if="!totpEnabled" size="small" type="primary" @click="startTotpSetup">{{ t('settings.enable') }}</NButton>
                <NButton v-else size="small" type="error" ghost @click="requestTotpDisable">{{ t('settings.disable') }}</NButton>
              </NSpace>
              <p v-if="totpEnabled" class="text-muted">
                {{ t('settings.backupCodesRemaining', { count: totpRemaining }) }}
              </p>
            </template>

            <template v-else-if="totpFlow === 'setup'">
              <NSpace vertical :size="10">
                <span>{{ t('settings.scanQr') }}</span>
                <div class="qr-wrap" v-html="totpQrSvg"></div>
                <p class="text-muted">{{ t('settings.enterManually') }} <code>{{ totpSecret }}</code></p>
                <NInput
                  v-model:value="totpCode"
                  autofocus
                  placeholder="123456"
                  @keyup.enter="confirmTotpSetup"
                />
                <NAlert v-if="totpError" type="error" :show-icon="false">{{ totpError }}</NAlert>
                <NSpace>
                  <NButton size="small" @click="cancelTotpFlow">{{ t('common.cancel') }}</NButton>
                  <NButton size="small" type="primary" :disabled="!totpCode" @click="confirmTotpSetup">{{ t('common.confirm') }}</NButton>
                </NSpace>
              </NSpace>
            </template>

            <template v-else-if="totpFlow === 'backupCodes'">
              <NAlert type="warning" :title="t('settings.saveBackupCodesTitle')" :show-icon="false">
                <NSpace vertical :size="10">
                  <span>{{ t('settings.backupCodesWarning') }}</span>
                  <div class="backup-codes">
                    <code v-for="c in totpBackupCodes" :key="c">{{ c }}</code>
                  </div>
                  <NButton size="small" type="primary" @click="finishBackupCodes">{{ t('settings.savedIt') }}</NButton>
                </NSpace>
              </NAlert>
            </template>

            <template v-else-if="totpFlow === 'disableConfirm'">
              <NAlert type="warning" :show-icon="false">
                <NSpace vertical :size="10">
                  <span>{{ t('settings.totpDisableWarning') }}</span>
                  <NInput
                    v-model:value="totpPassword"
                    type="password"
                    show-password-on="click"
                    :placeholder="t('common.dashboardPassword')"
                    autocomplete="current-password"
                    @keyup.enter="confirmTotpDisable"
                  />
                  <NSpace>
                    <NButton size="small" @click="cancelTotpFlow">{{ t('common.cancel') }}</NButton>
                    <NButton size="small" type="primary" :disabled="!totpPassword" @click="confirmTotpDisable">{{ t('settings.disable') }}</NButton>
                  </NSpace>
                </NSpace>
              </NAlert>
            </template>

            <div v-else-if="totpFlow === 'applying'" class="flow-row">
              <NSpin size="small" /> <span>{{ t('common.processing') }}</span>
            </div>

            <NAlert v-else-if="totpFlow === 'error'" type="error" :show-icon="false">
              <NSpace vertical :size="10">
                <span><NIcon :component="TriangleAlert" size="14" /> {{ totpError }}</span>
                <NButton size="small" @click="cancelTotpFlow">{{ t('common.close') }}</NButton>
              </NSpace>
            </NAlert>
          </NSpace>
        </NCard>

        <NCard embedded size="small" :title="t('settings.notify.title')" style="margin-top: 16px">
          <div v-if="notifyLoading" class="loading"><NSpin size="small" /></div>
          <NSpace v-else vertical :size="16">
            <NSpace align="center" justify="space-between">
              <span>{{ t('settings.notify.desc') }}</span>
              <NSwitch v-model:value="notifyForm.enabled" />
            </NSpace>

            <NSpace vertical :size="8">
              <span class="text-muted">{{ t('settings.notify.webhookLabel') }}</span>
              <NSpace :size="8" align="center" :wrap="false">
                <NInput
                  v-model:value="notifyForm.webhookUrl"
                  type="password"
                  show-password-on="click"
                  :placeholder="t('settings.notify.webhookPlaceholder')"
                  style="flex: 1"
                />
                <NButton size="small" :disabled="!notifyForm.webhookUrl" :loading="notifyTesting" @click="sendNotifyTest">
                  {{ t('settings.notify.sendTest') }}
                </NButton>
              </NSpace>
            </NSpace>

            <div class="notify-rule">
              <NSpace align="center" justify="space-between">
                <span>{{ t('settings.notify.cpuLabel') }}</span>
                <NSwitch v-model:value="notifyForm.cpu.enabled" size="small" />
              </NSpace>
              <div class="notify-field-grid">
                <div class="notify-field">
                  <span class="notify-field-label">{{ t('settings.notify.threshold') }}</span>
                  <div class="notify-slider-combo">
                    <NSlider v-model:value="notifyForm.cpu.thresholdPct" :min="50" :max="100" :step="1" style="flex: 1" />
                    <NInputNumber v-model:value="notifyForm.cpu.thresholdPct" :min="50" :max="100" :step="1" :show-button="false" size="small" class="notify-combo-input">
                      <template #suffix>%</template>
                    </NInputNumber>
                  </div>
                </div>
                <div class="notify-field">
                  <span class="notify-field-label">{{ t('settings.notify.duration') }}</span>
                  <div class="notify-slider-combo">
                    <NSlider v-model:value="notifyForm.cpu.durationMin" :min="1" :max="60" :step="1" style="flex: 1" />
                    <NInputNumber v-model:value="notifyForm.cpu.durationMin" :min="1" :max="60" :step="1" :show-button="false" size="small" class="notify-combo-input">
                      <template #suffix>{{ t('settings.notify.durationUnit') }}</template>
                    </NInputNumber>
                  </div>
                </div>
              </div>
            </div>

            <div class="notify-rule">
              <NSpace align="center" justify="space-between">
                <span>{{ t('settings.notify.memLabel') }}</span>
                <NSwitch v-model:value="notifyForm.mem.enabled" size="small" />
              </NSpace>
              <div class="notify-field-grid">
                <div class="notify-field">
                  <span class="notify-field-label">{{ t('settings.notify.threshold') }}</span>
                  <div class="notify-slider-combo">
                    <NSlider v-model:value="notifyForm.mem.thresholdPct" :min="50" :max="100" :step="1" style="flex: 1" />
                    <NInputNumber v-model:value="notifyForm.mem.thresholdPct" :min="50" :max="100" :step="1" :show-button="false" size="small" class="notify-combo-input">
                      <template #suffix>%</template>
                    </NInputNumber>
                  </div>
                </div>
                <div class="notify-field">
                  <span class="notify-field-label">{{ t('settings.notify.duration') }}</span>
                  <div class="notify-slider-combo">
                    <NSlider v-model:value="notifyForm.mem.durationMin" :min="1" :max="60" :step="1" style="flex: 1" />
                    <NInputNumber v-model:value="notifyForm.mem.durationMin" :min="1" :max="60" :step="1" :show-button="false" size="small" class="notify-combo-input">
                      <template #suffix>{{ t('settings.notify.durationUnit') }}</template>
                    </NInputNumber>
                  </div>
                </div>
              </div>
            </div>

            <div class="notify-rule">
              <NSpace align="center" justify="space-between">
                <span>{{ t('settings.notify.tempLabel') }}</span>
                <NSwitch v-model:value="notifyForm.temp.enabled" size="small" />
              </NSpace>
              <div class="notify-field-grid">
                <div class="notify-field">
                  <span class="notify-field-label">{{ t('settings.notify.threshold') }}</span>
                  <div class="notify-slider-combo">
                    <NSlider v-model:value="notifyForm.temp.thresholdC" :min="30" :max="120" :step="1" style="flex: 1" />
                    <NInputNumber v-model:value="notifyForm.temp.thresholdC" :min="30" :max="120" :step="1" :show-button="false" size="small" class="notify-combo-input">
                      <template #suffix>°C</template>
                    </NInputNumber>
                  </div>
                </div>
                <div class="notify-field">
                  <span class="notify-field-label">{{ t('settings.notify.duration') }}</span>
                  <div class="notify-slider-combo">
                    <NSlider v-model:value="notifyForm.temp.durationMin" :min="1" :max="60" :step="1" style="flex: 1" />
                    <NInputNumber v-model:value="notifyForm.temp.durationMin" :min="1" :max="60" :step="1" :show-button="false" size="small" class="notify-combo-input">
                      <template #suffix>{{ t('settings.notify.durationUnit') }}</template>
                    </NInputNumber>
                  </div>
                </div>
              </div>
              <p class="text-muted">{{ t('settings.notify.tempHint') }}</p>
            </div>

            <NSpace justify="end">
              <NButton type="primary" size="small" :loading="notifySaving" @click="saveNotifySettings">
                {{ t('settings.notify.save') }}
              </NButton>
            </NSpace>
          </NSpace>
        </NCard>
      </template>
    </NCard>
  </AppShell>
</template>

<style scoped>
.loading {
  display: flex;
  justify-content: center;
  padding: 60px 0;
}
.flow-row {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.88rem;
}
.text-muted {
  color: var(--text-muted);
  font-size: 0.8rem;
  margin: 0;
}
.qr-wrap {
  /* Always a white card regardless of app theme — QR scanners rely on
     dark-on-light contrast, inverting for dark mode is unreliable across
     real authenticator apps. */
  background: #fff;
  padding: 12px;
  border-radius: 8px;
  width: fit-content;
}
.qr-wrap :deep(svg) {
  display: block;
  width: 160px;
  height: 160px;
}
.backup-codes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 6px 16px;
  font-family: var(--font-mono, ui-monospace, monospace);
  font-size: 0.88rem;
}
.notify-rule {
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 12px;
  border: 1px solid var(--border-color, rgba(128, 128, 128, 0.2));
  border-radius: 8px;
}
.notify-field-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}
.notify-field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.notify-field-label {
  font-size: 0.8rem;
  color: var(--text-muted);
}
.notify-slider-combo {
  display: flex;
  align-items: center;
  gap: 10px;
}
.notify-combo-input {
  flex: 0 0 76px;
  width: 76px;
}
</style>
