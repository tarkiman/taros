<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NLayout, NLayoutSider, NLayoutHeader, NLayoutContent, NIcon, NButton } from 'naive-ui'
import { LayoutDashboard, Box, Server, FolderOpen, LogOut } from '@lucide/vue'
import { useAuthStore } from '../stores/auth'

const auth = useAuthStore()
const router = useRouter()
const collapsed = ref(false)

async function handleLogout() {
  await auth.logout()
  router.push('/login')
}
</script>

<template>
  <NLayout has-sider style="height: 100vh">
    <NLayoutSider bordered :width="220" :collapsed-width="64" collapsible v-model:collapsed="collapsed">
      <div class="brand">{{ collapsed ? 'T' : 'TarkimanOS' }}</div>
      <nav class="side-nav">
        <RouterLink to="/" class="side-nav-item" active-class="active">
          <NIcon :component="LayoutDashboard" size="18" />
          <span v-if="!collapsed">Dashboard</span>
        </RouterLink>
        <RouterLink to="/docker" class="side-nav-item" active-class="active">
          <NIcon :component="Box" size="18" />
          <span v-if="!collapsed">Docker</span>
        </RouterLink>
        <RouterLink to="/services" class="side-nav-item" active-class="active">
          <NIcon :component="Server" size="18" />
          <span v-if="!collapsed">Service</span>
        </RouterLink>
        <RouterLink to="/files" class="side-nav-item" active-class="active">
          <NIcon :component="FolderOpen" size="18" />
          <span v-if="!collapsed">Files</span>
        </RouterLink>
      </nav>
    </NLayoutSider>
    <NLayout>
      <NLayoutHeader bordered class="topbar">
        <span class="spacer" />
        <span class="user">{{ auth.username }}</span>
        <NButton quaternary size="small" @click="handleLogout">
          <template #icon><NIcon :component="LogOut" /></template>
          Keluar
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
  padding: 0 var(--space-4);
  height: 56px;
}

.spacer {
  flex: 1;
}

.user {
  color: var(--text-muted);
  margin-right: var(--space-3);
  font-size: 0.9rem;
}

.content {
  padding: var(--space-5);
  height: calc(100vh - 56px);
  overflow: auto;
}
</style>
