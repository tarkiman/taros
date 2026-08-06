<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { NCard, NSpace, NSwitch, NInput, NInputNumber, NButton, NAlert, NSpin, NIcon, NTag, useMessage } from 'naive-ui'
import { TriangleAlert } from '@lucide/vue'
import qrcode from 'qrcode-generator'
import AppShell from '../layouts/AppShell.vue'
import { terminalApi } from '../api/terminal'
import { settingsApi } from '../api/settings'
import { totpApi } from '../api/totp'
import { ApiError } from '../api/client'

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
    message.error('Gagal membaca status Terminal.')
  } finally {
    loading.value = false
  }
}
onMounted(() => {
  loadStatus()
  loadTotpStatus()
  loadPortStatus()
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
    flowError.value = e instanceof ApiError && e.status === 403 ? 'Password salah.' : e instanceof Error ? e.message : 'Gagal mengubah pengaturan.'
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
    message.error('Gagal membaca port saat ini.')
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
        ? 'Password salah.'
        : e instanceof ApiError
          ? e.message
          : 'Gagal mengubah port.'
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
    message.error('Gagal membaca status TOTP.')
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
    totpError.value = e instanceof Error ? e.message : 'Gagal memulai setup TOTP.'
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
    totpError.value = e instanceof ApiError ? e.message : 'Gagal mengkonfirmasi kode.'
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
    totpError.value = e instanceof ApiError && e.status === 403 ? 'Password salah.' : 'Gagal menonaktifkan TOTP.'
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
</script>

<template>
  <AppShell>
    <NCard title="Pengaturan">
      <div v-if="loading" class="loading"><NSpin size="large" /></div>
      <template v-else>
        <NCard embedded size="small" title="Web Terminal">
          <NSpace vertical :size="12">
            <NSpace align="center" justify="space-between">
              <span>Akses shell sungguhan lewat dashboard</span>
              <NSwitch :value="enabled" :disabled="flow !== 'idle'" @update:value="requestToggle" />
            </NSpace>

            <NAlert v-if="flow === 'confirm'" type="warning" :show-icon="false">
              <NSpace vertical :size="10">
                <span>
                  {{ pendingValue ? 'Mengaktifkan' : 'Menonaktifkan' }} Terminal akan me-restart servis
                  (downtime singkat) dan kamu perlu login ulang setelahnya. Masukkan password dashboard
                  untuk konfirmasi.
                </span>
                <NInput
                  v-model:value="password"
                  type="password"
                  show-password-on="click"
                  placeholder="Password dashboard"
                  autocomplete="current-password"
                  @keyup.enter="confirmToggle"
                />
                <NSpace>
                  <NButton size="small" @click="cancelToggle">Batal</NButton>
                  <NButton size="small" type="primary" :disabled="!password" @click="confirmToggle">
                    {{ pendingValue ? 'Aktifkan' : 'Nonaktifkan' }}
                  </NButton>
                </NSpace>
              </NSpace>
            </NAlert>

            <div v-else-if="flow === 'applying'" class="flow-row">
              <NSpin size="small" /> <span>Menyimpan & me-restart servis…</span>
            </div>
            <div v-else-if="flow === 'restarting'" class="flow-row">
              <NSpin size="small" /> <span>Menunggu servis kembali… halaman akan dimuat ulang otomatis.</span>
            </div>
            <NAlert v-else-if="flow === 'error'" type="error" :show-icon="false">
              <NSpace vertical :size="10">
                <span><NIcon :component="TriangleAlert" size="14" /> {{ flowError }}</span>
                <NButton size="small" @click="retryToggle">Coba lagi</NButton>
              </NSpace>
            </NAlert>

            <p class="text-muted">
              Nonaktif secara default karena ini fitur dengan akses paling luas di aplikasi — lihat
              docs/07-security.md §7.6 kalau baca dari repo. Setelah aktif, menu Terminal muncul di
              topbar.
            </p>
          </NSpace>
        </NCard>

        <NCard embedded size="small" title="Port Aplikasi" style="margin-top: 16px">
          <NSpace vertical :size="12">
            <template v-if="portFlow === 'idle'">
              <NSpace align="center" justify="space-between">
                <span>Port dashboard ini diakses — saat ini <code>{{ currentPort }}</code></span>
                <NButton size="small" @click="requestPortChange">Ganti Port</NButton>
              </NSpace>
            </template>

            <NAlert v-else-if="portFlow === 'confirm'" type="warning" :show-icon="false">
              <NSpace vertical :size="10">
                <span>
                  Mengganti port akan me-restart servis (downtime singkat) dan alamat dashboard
                  ini di browser akan berubah — kamu perlu buka ulang dengan port baru setelahnya.
                  Salah pilih port (bentrok dengan servis lain, atau di bawah 1024 tanpa izin
                  khusus) bisa membuat servis gagal start; nilai dicoba dulu sebelum disimpan,
                  tapi tetap pastikan port yang dipilih benar.
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
                  placeholder="Password dashboard"
                  autocomplete="current-password"
                  @keyup.enter="confirmPortChange"
                />
                <NSpace>
                  <NButton size="small" @click="cancelPortChange">Batal</NButton>
                  <NButton size="small" type="primary" :disabled="!portPassword || !pendingPort" @click="confirmPortChange">
                    Ganti Port
                  </NButton>
                </NSpace>
              </NSpace>
            </NAlert>

            <div v-else-if="portFlow === 'applying'" class="flow-row">
              <NSpin size="small" /> <span>Menyimpan & me-restart servis…</span>
            </div>
            <div v-else-if="portFlow === 'restarting'" class="flow-row">
              <NSpin size="small" />
              <span>Menunggu servis kembali di port baru… akan diarahkan otomatis.</span>
            </div>
            <NAlert v-else-if="portFlow === 'error'" type="error" :show-icon="false">
              <NSpace vertical :size="10">
                <span><NIcon :component="TriangleAlert" size="14" /> {{ portError }}</span>
                <NButton size="small" @click="retryPortChange">Coba lagi</NButton>
              </NSpace>
            </NAlert>

            <p class="text-muted">Default: 8090. Berlaku untuk semua alamat IP perangkat ini.</p>
          </NSpace>
        </NCard>

        <NCard embedded size="small" title="Autentikasi Dua Faktor (TOTP)" style="margin-top: 16px">
          <NSpace vertical :size="12">
            <template v-if="totpFlow === 'idle'">
              <NSpace align="center" justify="space-between">
                <span>
                  Kode 6 digit dari aplikasi authenticator (Google Authenticator, Aegis, dst) saat login
                  <NTag v-if="totpEnabled" size="small" type="success" style="margin-left: 8px">Aktif</NTag>
                </span>
                <NButton v-if="!totpEnabled" size="small" type="primary" @click="startTotpSetup">Aktifkan</NButton>
                <NButton v-else size="small" type="error" ghost @click="requestTotpDisable">Nonaktifkan</NButton>
              </NSpace>
              <p v-if="totpEnabled" class="text-muted">
                {{ totpRemaining }} kode cadangan tersisa — dipakai kalau kamu kehilangan akses ke aplikasi
                authenticator. Nonaktifkan lalu aktifkan lagi untuk membuat set baru.
              </p>
            </template>

            <template v-else-if="totpFlow === 'setup'">
              <NSpace vertical :size="10">
                <span>Scan QR ini dengan aplikasi authenticator, lalu masukkan kode 6 digit yang muncul:</span>
                <div class="qr-wrap" v-html="totpQrSvg"></div>
                <p class="text-muted">Atau masukkan manual: <code>{{ totpSecret }}</code></p>
                <NInput
                  v-model:value="totpCode"
                  autofocus
                  placeholder="123456"
                  @keyup.enter="confirmTotpSetup"
                />
                <NAlert v-if="totpError" type="error" :show-icon="false">{{ totpError }}</NAlert>
                <NSpace>
                  <NButton size="small" @click="cancelTotpFlow">Batal</NButton>
                  <NButton size="small" type="primary" :disabled="!totpCode" @click="confirmTotpSetup">Konfirmasi</NButton>
                </NSpace>
              </NSpace>
            </template>

            <template v-else-if="totpFlow === 'backupCodes'">
              <NAlert type="warning" title="Simpan kode cadangan ini sekarang" :show-icon="false">
                <NSpace vertical :size="10">
                  <span>Tidak akan ditampilkan lagi. Setiap kode cuma bisa dipakai sekali.</span>
                  <div class="backup-codes">
                    <code v-for="c in totpBackupCodes" :key="c">{{ c }}</code>
                  </div>
                  <NButton size="small" type="primary" @click="finishBackupCodes">Sudah saya simpan</NButton>
                </NSpace>
              </NAlert>
            </template>

            <template v-else-if="totpFlow === 'disableConfirm'">
              <NAlert type="warning" :show-icon="false">
                <NSpace vertical :size="10">
                  <span>Menonaktifkan TOTP menghapus kode cadangan yang tersisa. Masukkan password dashboard:</span>
                  <NInput
                    v-model:value="totpPassword"
                    type="password"
                    show-password-on="click"
                    placeholder="Password dashboard"
                    autocomplete="current-password"
                    @keyup.enter="confirmTotpDisable"
                  />
                  <NSpace>
                    <NButton size="small" @click="cancelTotpFlow">Batal</NButton>
                    <NButton size="small" type="primary" :disabled="!totpPassword" @click="confirmTotpDisable">Nonaktifkan</NButton>
                  </NSpace>
                </NSpace>
              </NAlert>
            </template>

            <div v-else-if="totpFlow === 'applying'" class="flow-row">
              <NSpin size="small" /> <span>Memproses…</span>
            </div>

            <NAlert v-else-if="totpFlow === 'error'" type="error" :show-icon="false">
              <NSpace vertical :size="10">
                <span><NIcon :component="TriangleAlert" size="14" /> {{ totpError }}</span>
                <NButton size="small" @click="cancelTotpFlow">Tutup</NButton>
              </NSpace>
            </NAlert>
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
</style>
