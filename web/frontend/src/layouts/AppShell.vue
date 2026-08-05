<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutContent, NIcon, NButton, NPopover, NSpin } from 'naive-ui'
import { LayoutDashboard, Box, Server, FolderOpen, SquareTerminal, LogOut, Sun, Moon, MonitorCog, CloudDownload, CircleCheck, CircleAlert } from '@lucide/vue'
import { useAuthStore } from '../stores/auth'
import { useTerminalStore } from '../stores/terminal'
import { useThemeMode, type ThemeMode } from '../composables/useTheme'
import { updateApi } from '../api/update'
import type { UpdateStatus } from '../types/update'

const auth = useAuthStore()
const terminal = useTerminalStore()
const router = useRouter()
const { mode: themeMode, setMode: setThemeMode } = useThemeMode()

const THEME_CYCLE: ThemeMode[] = ['system', 'light', 'dark']
const themeIcon = computed(() => ({ system: MonitorCog, light: Sun, dark: Moon })[themeMode.value])
const themeLabel = computed(
  () => ({ system: 'Tema: Mengikuti Sistem', light: 'Tema: Terang', dark: 'Tema: Gelap' })[themeMode.value],
)

function cycleTheme() {
  const next = THEME_CYCLE[(THEME_CYCLE.indexOf(themeMode.value) + 1) % THEME_CYCLE.length]
  setThemeMode(next)
}

const navLinks = computed(() => {
  const links = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/docker', label: 'Docker', icon: Box },
    { to: '/services', label: 'Service', icon: Server },
    { to: '/files', label: 'Files', icon: FolderOpen },
  ]
  if (terminal.enabled) links.push({ to: '/terminal', label: 'Terminal', icon: SquareTerminal })
  return links
})

onMounted(() => {
  terminal.ensureLoaded()
})

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}

// --- update checker/applier — checked on-demand (popover open), not
// polled in the background, so this doesn't hit GitHub's API on every
// single page visit. See internal/selfupdate + docs/09-deployment.md §9.5. ---
type CheckState = 'idle' | 'checking' | 'checked' | 'error'
type ApplyState = 'idle' | 'confirm' | 'applying' | 'restarting' | 'error'

const checkState = ref<CheckState>('idle')
const checkError = ref('')
const updateStatus = ref<UpdateStatus | null>(null)
const applyState = ref<ApplyState>('idle')
const applyError = ref('')

async function checkForUpdate() {
  checkState.value = 'checking'
  try {
    updateStatus.value = await updateApi.check()
    checkState.value = 'checked'
  } catch (e) {
    checkError.value = e instanceof Error ? e.message : 'Gagal memeriksa pembaruan.'
    checkState.value = 'error'
  }
}

function onPopoverUpdate(show: boolean) {
  if (show && checkState.value === 'idle') checkForUpdate()
  if (!show && applyState.value !== 'applying' && applyState.value !== 'restarting') {
    // Reset the confirm step (and any stale error) so reopening the
    // popover later starts clean — but never while an update is actually
    // in flight, that state needs to survive the popover closing.
    applyState.value = 'idle'
    applyError.value = ''
  }
}

async function applyUpdate() {
  applyState.value = 'applying'
  applyError.value = ''
  try {
    await updateApi.apply()
    applyState.value = 'restarting'
    waitForRestartThenReload()
  } catch (e) {
    applyError.value = e instanceof Error ? e.message : 'Update gagal.'
    applyState.value = 'error'
  }
}

async function waitForRestartThenReload() {
  // The server process exits itself ~700ms after responding (see
  // handleUpdateApply) and systemd (Restart=always) brings it back up
  // running the new binary — poll until it answers again rather than
  // guessing a fixed delay, since restart time varies with device speed.
  for (let attempt = 0; attempt < 30; attempt++) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      const res = await fetch('/api/update/check', { credentials: 'include' })
      if (res.ok) {
        location.reload()
        return
      }
    } catch {
      // still down — keep polling
    }
  }
  location.reload() // give up waiting cleanly, let the user see whatever state loads
}
</script>

<template>
  <div class="app-backdrop">
    <div class="app-blob a"></div>
    <div class="app-blob b"></div>
    <div class="app-blob c"></div>
  </div>
  <NLayout style="height: 100vh; position: relative; z-index: 1">
    <NLayoutHeader bordered class="topbar">
      <RouterLink to="/" class="brand">TarOS</RouterLink>
      <nav class="top-nav" aria-label="Navigasi utama">
        <RouterLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="top-nav-item"
          active-class="active"
        >
          <NIcon :component="link.icon" size="16" />
          <span class="nav-label">{{ link.label }}</span>
        </RouterLink>
      </nav>
      <span class="spacer" />
      <NPopover trigger="click" placement="bottom-end" @update:show="onPopoverUpdate" style="max-width: 300px">
        <template #trigger>
          <button type="button" class="version-btn" title="Versi & pembaruan">
            <NIcon :component="CloudDownload" size="15" />
            <span class="hide-narrow">{{ updateStatus?.currentVersion ?? 'versi' }}</span>
          </button>
        </template>

        <div class="update-panel">
          <div v-if="checkState === 'checking'" class="update-row">
            <NSpin size="small" />
            <span>Memeriksa pembaruan…</span>
          </div>

          <div v-else-if="checkState === 'error'" class="update-row">
            <NIcon :component="CircleAlert" size="16" class="icon-danger" />
            <span>{{ checkError }}</span>
            <NButton size="tiny" @click="checkForUpdate">Coba lagi</NButton>
          </div>

          <template v-else-if="checkState === 'checked' && updateStatus">
            <p class="update-version">Versi saat ini: <strong>{{ updateStatus.currentVersion }}</strong></p>

            <p v-if="!updateStatus.enabled" class="text-muted update-note">
              Fitur update dinonaktifkan di config (<code>update.enabled</code>).
            </p>

            <template v-else-if="!updateStatus.updateAvailable">
              <div class="update-row">
                <NIcon :component="CircleCheck" size="16" class="icon-success" />
                <span>Sudah versi terbaru.</span>
              </div>
            </template>

            <template v-else>
              <p class="update-note">Update tersedia: <strong>{{ updateStatus.latestVersion }}</strong></p>

              <div v-if="applyState === 'idle'">
                <NButton size="small" type="primary" block @click="applyState = 'confirm'">Update Sekarang</NButton>
              </div>
              <div v-else-if="applyState === 'confirm'" class="update-confirm">
                <p class="update-note">Servis akan restart singkat (beberapa detik downtime), dan kamu perlu login ulang setelahnya. Lanjutkan?</p>
                <div class="update-confirm-actions">
                  <NButton size="tiny" @click="applyState = 'idle'">Batal</NButton>
                  <NButton size="tiny" type="primary" @click="applyUpdate">Ya, Update</NButton>
                </div>
              </div>
              <div v-else-if="applyState === 'applying'" class="update-row">
                <NSpin size="small" />
                <span>Mengunduh &amp; memasang update…</span>
              </div>
              <div v-else-if="applyState === 'restarting'" class="update-row">
                <NSpin size="small" />
                <span>Menunggu servis restart…</span>
              </div>
              <div v-else-if="applyState === 'error'" class="update-row">
                <NIcon :component="CircleAlert" size="16" class="icon-danger" />
                <span>{{ applyError }}</span>
                <NButton size="tiny" @click="applyState = 'confirm'">Coba lagi</NButton>
              </div>
            </template>
          </template>
        </div>
      </NPopover>
      <NButton quaternary circle size="small" :title="themeLabel" :aria-label="themeLabel" @click="cycleTheme">
        <template #icon><NIcon :component="themeIcon" /></template>
      </NButton>
      <span class="user hide-narrow">{{ auth.username }}</span>
      <NButton quaternary size="small" @click="handleLogout">
        <template #icon><NIcon :component="LogOut" /></template>
        <span class="hide-narrow">Keluar</span>
      </NButton>
    </NLayoutHeader>
    <NLayoutContent class="content">
      <slot />
      <footer class="app-foot">TarOS — dibuat oleh Tarkiman</footer>
    </NLayoutContent>
  </NLayout>
</template>

<style scoped>
.topbar {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  padding: 0 var(--space-5);
  height: 56px;
}

.brand {
  font-weight: 700;
  color: var(--text);
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
}

.top-nav {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  overflow-x: auto;
  scrollbar-width: none;
}
.top-nav::-webkit-scrollbar {
  display: none;
}

.top-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.86rem;
  white-space: nowrap;
  transition: background var(--transition-fast), color var(--transition-fast);
}

.top-nav-item:hover {
  background: var(--accent-soft);
  color: var(--text);
}

.top-nav-item.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.spacer {
  flex: 1;
}

.user {
  color: var(--text-muted);
  font-size: 0.9rem;
}

.version-btn {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 6px 10px;
  border-radius: var(--radius-md);
  border: 1px solid var(--glass-border);
  background: transparent;
  color: var(--text-muted);
  font-family: var(--font-mono);
  font-size: 0.78rem;
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.version-btn:hover {
  background: var(--track);
  color: var(--text);
}
.version-btn:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
}

.update-panel {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  font-size: 0.84rem;
  min-width: 220px;
}

.update-row {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.update-version {
  margin: 0;
}

.update-note {
  margin: 0;
  color: var(--text-muted);
}

.update-confirm {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}
.update-confirm-actions {
  display: flex;
  gap: var(--space-2);
  justify-content: flex-end;
}

.icon-success {
  color: var(--success);
  flex-shrink: 0;
}
.icon-danger {
  color: var(--danger);
  flex-shrink: 0;
}

.text-muted {
  color: var(--text-muted);
}

.content {
  padding: var(--space-5);
  height: calc(100vh - 56px);
  overflow: auto;
}

.app-foot {
  margin-top: var(--space-6);
  padding-top: var(--space-4);
  text-align: center;
  font-size: 0.76rem;
  color: var(--text-faint);
}

@media (max-width: 768px) {
  .topbar {
    padding: 0 var(--space-3);
    gap: var(--space-2);
  }

  .content {
    padding: var(--space-3);
  }

  .nav-label {
    display: none;
  }

  .top-nav-item {
    padding: var(--space-2);
  }

  .hide-narrow {
    display: none;
  }
}
</style>
