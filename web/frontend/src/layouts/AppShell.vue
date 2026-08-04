<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NIcon, NButton } from 'naive-ui'
import { LayoutDashboard, Box, Server, FolderOpen, SquareTerminal, LogOut, Sun, Moon, MonitorCog } from '@lucide/vue'
import { useAuthStore } from '../stores/auth'
import { useTerminalStore } from '../stores/terminal'
import { useThemeMode, type ThemeMode } from '../composables/useTheme'

const auth = useAuthStore()
const terminal = useTerminalStore()
const router = useRouter()
const collapsed = ref(false)
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

const NARROW_BREAKPOINT = 768

onMounted(() => {
  terminal.ensureLoaded()
  // Sidebar defaults open on desktop but eats too much of a phone-width
  // viewport — start collapsed there. Still user-toggleable afterward via
  // NLayoutSider's own collapse trigger.
  if (window.innerWidth < NARROW_BREAKPOINT) collapsed.value = true
})

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}
</script>

<template>
  <NLayout has-sider style="height: 100vh">
    <NLayoutSider bordered :width="220" :collapsed-width="64" collapsible v-model:collapsed="collapsed">
      <div class="brand">{{ collapsed ? 'T' : 'TarkimanOS' }}</div>
      <nav class="side-nav" aria-label="Navigasi utama">
        <RouterLink to="/" class="side-nav-item" active-class="active" :aria-label="collapsed ? 'Dashboard' : undefined">
          <NIcon :component="LayoutDashboard" size="18" />
          <span v-if="!collapsed">Dashboard</span>
        </RouterLink>
        <RouterLink to="/docker" class="side-nav-item" active-class="active" :aria-label="collapsed ? 'Docker' : undefined">
          <NIcon :component="Box" size="18" />
          <span v-if="!collapsed">Docker</span>
        </RouterLink>
        <RouterLink to="/services" class="side-nav-item" active-class="active" :aria-label="collapsed ? 'Service' : undefined">
          <NIcon :component="Server" size="18" />
          <span v-if="!collapsed">Service</span>
        </RouterLink>
        <RouterLink to="/files" class="side-nav-item" active-class="active" :aria-label="collapsed ? 'Files' : undefined">
          <NIcon :component="FolderOpen" size="18" />
          <span v-if="!collapsed">Files</span>
        </RouterLink>
        <RouterLink v-if="terminal.enabled" to="/terminal" class="side-nav-item" active-class="active" :aria-label="collapsed ? 'Terminal' : undefined">
          <NIcon :component="SquareTerminal" size="18" />
          <span v-if="!collapsed">Terminal</span>
        </RouterLink>
      </nav>
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered class="topbar">
        <span class="spacer" />
        <NButton quaternary circle size="small" :title="themeLabel" :aria-label="themeLabel" @click="cycleTheme">
          <template #icon><NIcon :component="themeIcon" /></template>
        </NButton>
        <span class="user">{{ auth.username }}</span>
        <NButton quaternary size="small" @click="handleLogout">
          <template #icon><NIcon :component="LogOut" /></template>
          <span class="hide-narrow">Keluar</span>
        </NButton>
      </NLayoutHeader>
      <NLayoutContent class="content">
        <slot />
      </NLayoutContent>
    </NLayout>
  </NLayout>
</template>

<style scoped>
.brand {
  font-weight: 700;
  padding: var(--space-4);
  white-space: nowrap;
  overflow: hidden;
}

.side-nav {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: 0 var(--space-2);
}

.side-nav-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-md);
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.9rem;
  transition: background var(--transition-fast), color var(--transition-fast);
  white-space: nowrap;
  overflow: hidden;
}

.side-nav-item:hover {
  background: var(--accent-soft);
  color: var(--text);
}

.side-nav-item.active {
  background: var(--accent-soft);
  color: var(--accent);
  font-weight: 600;
}

.topbar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: 0 var(--space-4);
  height: 56px;
}

.spacer {
  flex: 1;
}

.user {
  color: var(--text-muted);
  margin-right: var(--space-1);
  font-size: 0.9rem;
}

.content {
  padding: var(--space-5);
  height: calc(100vh - 56px);
  overflow: auto;
}

@media (max-width: 768px) {
  .content {
    padding: var(--space-3);
  }

  .user {
    display: none;
  }

  .hide-narrow {
    display: none;
  }
}
</style>
