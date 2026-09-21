<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NButton, NIcon, NTag } from 'naive-ui'
import { ChevronDown, ChevronRight, FolderOpen, Trash2 } from '@lucide/vue'
import type { Container } from '../types/docker'
import { formatBytes } from '../utils/format'
import { groupProjects, type ProjectGroup, type Verdict } from '../utils/dockerProjects'
import AppLifecycle from './AppLifecycle.vue'

const props = defineProps<{ containers: Container[]; focus?: string; shellEnabled?: boolean }>()
const emit = defineEmits<{ (e: 'logs', c: Container): void; (e: 'env', c: Container): void; (e: 'uninstall', name: string): void; (e: 'changed'): void; (e: 'shell', c: Container): void }>()
const { t } = useI18n()

const groups = computed<ProjectGroup[]>(() => groupProjects(props.containers))

// A group with problems opens itself; the user's own click always wins.
const userOpen = ref<Record<string, boolean>>({})
function isOpen(g: ProjectGroup): boolean {
  return userOpen.value[g.name] ?? (g.verdict === 'danger' || g.verdict === 'warn')
}
function toggle(g: ProjectGroup) {
  userOpen.value = { ...userOpen.value, [g.name]: !isOpen(g) }
}

// Arriving from a Dashboard tile (?app=name): open that app and scroll to it.
watch(
  () => [props.focus, groups.value.length] as const,
  async ([name, n]) => {
    if (!name || n === 0) return
    userOpen.value = { ...userOpen.value, [name]: true }
    await nextTick()
    document.getElementById(`app-${name}`)?.scrollIntoView({ block: 'center', behavior: 'smooth' })
  },
  { immediate: true },
)

const tagType: Record<Verdict, 'success' | 'warning' | 'error' | 'default'> = {
  ok: 'success',
  warn: 'warning',
  danger: 'error',
  stopped: 'default',
}
const verdictLabel = (v: Verdict) =>
  t({ ok: 'docker.apps.statusOk', warn: 'docker.apps.statusWarn', danger: 'docker.apps.statusDanger', stopped: 'docker.apps.statusStopped' }[v])

function containerNote(c: Container): string {
  if (c.state === 'restarting') return t('docker.apps.restarting')
  if (c.health === 'unhealthy') return t('docker.apps.unhealthy')
  if (c.health === 'starting') return t('docker.apps.starting')
  return ''
}
function dot(c: Container): string {
  if (c.state === 'running') return c.health === 'unhealthy' ? 'danger' : c.health === 'starting' ? 'warn' : 'ok'
  return c.state === 'restarting' ? 'danger' : c.state === 'paused' ? 'warn' : 'off'
}
</script>

<template>
  <div class="apps">
    <p v-if="containers.length === 0" class="text-muted">{{ t('docker.apps.noContainers') }}</p>

    <div v-for="g in groups" :key="g.name" :id="`app-${g.name}`" class="app-card" :class="`v-${g.verdict}`">
      <button type="button" class="app-head" @click="toggle(g)">
        <NIcon :component="isOpen(g) ? ChevronDown : ChevronRight" size="16" />
        <span class="app-name">{{ g.name || t('docker.apps.other') }}</span>
        <NTag size="small" :type="tagType[g.verdict]" :bordered="false">{{ verdictLabel(g.verdict) }}</NTag>
        <span class="app-meta">{{ t('docker.apps.runningOf', { running: g.running, total: g.containers.length }) }}</span>
        <span class="app-meta mono">{{ g.cpu.toFixed(1) }}% · {{ formatBytes(g.mem) }}</span>
      </button>

      <div v-if="isOpen(g)" class="app-body">
        <RouterLink v-if="g.workingDir" :to="{ path: '/files', query: { path: g.workingDir } }" class="folder-link">
          <NIcon :component="FolderOpen" size="14" /> {{ t('docker.apps.openFolder') }}
          <span class="mono text-muted">{{ g.workingDir }}</span>
        </RouterLink>
        <ul class="svc-list">
          <li v-for="c in g.containers" :key="c.id">
            <span class="dot" :class="`d-${dot(c)}`" />
            <span class="svc-name">{{ c.service || c.name }}</span>
            <span v-if="containerNote(c)" class="svc-note" :class="{ danger: c.health === 'unhealthy' || c.state === 'restarting' }">{{ containerNote(c) }}</span>
            <span class="svc-status text-muted">{{ c.status }}</span>
            <span class="svc-res mono text-muted">{{ c.hasStats ? `${c.stats.cpuPercent.toFixed(1)}% · ${formatBytes(c.stats.memUsageBytes)}` : '—' }}</span>
            <span class="svc-btns">
              <NButton v-if="shellEnabled && c.state === 'running'" size="tiny" quaternary @click="emit('shell', c)">{{ t('docker.shell.button') }}</NButton>
              <NButton size="tiny" quaternary @click="emit('env', c)">{{ t('docker.env.button') }}</NButton>
              <NButton size="tiny" quaternary @click="emit('logs', c)">{{ t('docker.logs.button') }}</NButton>
            </span>
          </li>
        </ul>
        <AppLifecycle v-if="g.name" :name="g.name" :containers="g.containers" @changed="emit('changed')">
          <template #extra>
            <NButton size="small" quaternary type="error" @click="emit('uninstall', g.name)">
              <template #icon><NIcon :component="Trash2" /></template>
              {{ t('docker.apps.uninstall.button') }}
            </NButton>
          </template>
        </AppLifecycle>
      </div>
    </div>

    <p v-if="containers.length > 0" class="text-muted hint">{{ t('docker.apps.hint') }}</p>
  </div>
</template>

<style scoped>
.apps { display: flex; flex-direction: column; gap: 10px; }
.app-card { border: 1px solid var(--border); border-left-width: 3px; border-radius: 10px; background: var(--surface); overflow: hidden; }
.app-card.v-ok { border-left-color: var(--success); }
.app-card.v-warn { border-left-color: var(--warning); }
.app-card.v-danger { border-left-color: var(--danger); }
.app-card.v-stopped { border-left-color: var(--text-faint); }
.app-head { width: 100%; display: flex; align-items: center; gap: 10px; padding: 10px 14px; background: none; border: none; cursor: pointer; color: var(--text); text-align: left; }
.app-name { font-weight: 600; }
.app-meta { font-size: 0.8rem; color: var(--text-muted); }
.mono { font-family: var(--font-mono); }
.app-body { padding: 0 14px 12px 40px; display: flex; flex-direction: column; gap: 8px; }
.folder-link { display: inline-flex; align-items: center; gap: 6px; font-size: 0.8rem; color: var(--accent); align-self: flex-start; }
.svc-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 6px; }
.svc-list li { display: grid; grid-template-columns: 10px minmax(120px, 1.2fr) 5.5rem minmax(140px, 1.6fr) 9rem auto; align-items: center; gap: 10px; font-size: 0.85rem; }
.dot { width: 8px; height: 8px; border-radius: 50%; }
.d-ok { background: var(--success); } .d-warn { background: var(--warning); } .d-danger { background: var(--danger); } .d-off { background: var(--text-faint); }
.svc-name { font-weight: 500; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.svc-note { font-size: 0.75rem; color: var(--warning); }
.svc-note.danger { color: var(--danger); }
.svc-status { font-size: 0.78rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.svc-res { font-size: 0.78rem; text-align: right; white-space: nowrap; }
.svc-btns { display: inline-flex; gap: 2px; }
.hint { font-size: 0.78rem; margin: 4px 0 0; }
.text-muted { color: var(--text-muted); }
@media (max-width: 720px) { .svc-list li { grid-template-columns: 10px 1fr auto; } .svc-status, .svc-res { display: none; } }
</style>
