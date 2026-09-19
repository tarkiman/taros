<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NButton, NIcon, NTag } from 'naive-ui'
import { ChevronDown, ChevronRight, FolderOpen } from '@lucide/vue'
import type { Container } from '../types/docker'
import { formatBytes } from '../utils/format'

const props = defineProps<{ containers: Container[] }>()
const emit = defineEmits<{ (e: 'logs', c: Container): void }>()
const { t } = useI18n()

type Verdict = 'ok' | 'warn' | 'danger' | 'stopped'

interface Group {
  name: string // '' = containers not started by compose
  containers: Container[]
  running: number
  verdict: Verdict
  cpu: number
  mem: number
  workingDir: string
}

function verdictFor(cs: Container[]): Verdict {
  const running = cs.filter((c) => c.state === 'running').length
  if (running === 0) return 'stopped'
  if (cs.some((c) => c.health === 'unhealthy' || c.state === 'restarting')) return 'danger'
  if (running < cs.length || cs.some((c) => c.health === 'starting' || c.state === 'paused')) return 'warn'
  return 'ok'
}

const groups = computed<Group[]>(() => {
  const by = new Map<string, Container[]>()
  for (const c of props.containers) {
    const key = c.project || ''
    if (!by.has(key)) by.set(key, [])
    by.get(key)!.push(c)
  }
  const out: Group[] = []
  for (const [name, cs] of by) {
    const sorted = cs.slice().sort((a, b) => (a.service || a.name).localeCompare(b.service || b.name))
    const running = sorted.filter((c) => c.state === 'running')
    out.push({
      name,
      containers: sorted,
      running: running.length,
      verdict: verdictFor(sorted),
      cpu: running.reduce((n, c) => n + (c.hasStats ? c.stats.cpuPercent : 0), 0),
      mem: running.reduce((n, c) => n + (c.hasStats ? c.stats.memUsageBytes : 0), 0),
      workingDir: sorted.find((c) => c.workingDir)?.workingDir ?? '',
    })
  }
  const rank: Record<Verdict, number> = { danger: 0, warn: 1, stopped: 2, ok: 3 }
  // problems first; the non-compose bucket always last
  return out.sort((a, b) => {
    if ((a.name === '') !== (b.name === '')) return a.name === '' ? 1 : -1
    return rank[a.verdict] - rank[b.verdict] || a.name.localeCompare(b.name)
  })
})

// A group with problems opens itself; the user's own click always wins.
const userOpen = ref<Record<string, boolean>>({})
function isOpen(g: Group): boolean {
  return userOpen.value[g.name] ?? (g.verdict === 'danger' || g.verdict === 'warn')
}
function toggle(g: Group) {
  userOpen.value = { ...userOpen.value, [g.name]: !isOpen(g) }
}

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

    <div v-for="g in groups" :key="g.name" class="app-card" :class="`v-${g.verdict}`">
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
            <NButton size="tiny" quaternary @click="emit('logs', c)">{{ t('docker.logs.button') }}</NButton>
          </li>
        </ul>
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
.hint { font-size: 0.78rem; margin: 4px 0 0; }
.text-muted { color: var(--text-muted); }
@media (max-width: 720px) { .svc-list li { grid-template-columns: 10px 1fr auto; } .svc-status, .svc-res { display: none; } }
</style>
