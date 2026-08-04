<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { NLayout, NLayoutHeader, NLayoutContent, NIcon, NButton } from 'naive-ui'
import { LayoutDashboard, Box, Server, FolderOpen, SquareTerminal, LogOut, Sun, Moon, MonitorCog } from '@lucide/vue'
import { useAuthStore } from '../stores/auth'
import { useTerminalStore } from '../stores/terminal'
import { useThemeMode, type ThemeMode } from '../composables/useTheme'

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
