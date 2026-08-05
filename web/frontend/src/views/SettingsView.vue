<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { NCard, NSpace, NSwitch, NInput, NButton, NAlert, NSpin, NIcon, useMessage } from 'naive-ui'
import { TriangleAlert } from '@lucide/vue'
import AppShell from '../layouts/AppShell.vue'
import { terminalApi } from '../api/terminal'
import { settingsApi } from '../api/settings'
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
onMounted(loadStatus)

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
</style>
