<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NIcon, NPopconfirm, NSpin } from 'naive-ui'
import { Check, Circle, MinusCircle, Play, RotateCw, Square, X } from '@lucide/vue'
import { ApiError } from '../api/client'
import { dockerApi, type LifecycleAction, type LifecycleJob } from '../api/docker'
import type { Container } from '../types/docker'

// Start / stop / restart a whole compose app in dependency order. The order is
// worked out on the server (from the containers' depends_on labels); this
// component only starts a job and shows its per-container progress.
const props = defineProps<{ name: string; containers: Container[] }>()
const emit = defineEmits<{ (e: 'changed'): void }>()
const { t } = useI18n()

const job = ref<LifecycleJob | null>(null)
const error = ref('')
const busy = ref(false)
const dismissed = ref(false)

const isRunning = (c: Container) => ['running', 'restarting', 'paused'].includes(c.state)
const anyRunning = computed(() => props.containers.some(isRunning))
const anyStopped = computed(() => props.containers.some((c) => !isRunning(c)))
const working = computed(() => busy.value || job.value?.phase === 'running')

let timer: ReturnType<typeof setTimeout> | null = null
async function poll() {
  try {
    const { job: j } = await dockerApi.appJob(props.name)
    const wasRunning = job.value?.phase === 'running'
    job.value = j
    if (j?.phase === 'running') {
      timer = setTimeout(poll, 1200)
    } else if (wasRunning) {
      emit('changed') // the job just finished: let the parent reload the container list
    }
  } catch {
    timer = setTimeout(poll, 2500) // transient (e.g. TarOS restarting): keep trying
  }
}

onMounted(async () => {
  // Pick up a job that is still running (or just finished) after a page reload.
  try {
    job.value = (await dockerApi.appJob(props.name)).job
    if (job.value?.phase === 'running') timer = setTimeout(poll, 1200)
  } catch {
    /* no job info is fine */
  }
})
onBeforeUnmount(() => {
  if (timer) clearTimeout(timer)
})

async function run(action: LifecycleAction) {
  busy.value = true
  error.value = ''
  dismissed.value = false
  try {
    job.value = (await dockerApi.appLifecycle(props.name, action)).job
    timer = setTimeout(poll, 800)
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('docker.apps.lifecycle.failed')
  } finally {
    busy.value = false
  }
}

const showJob = computed(() => {
  const j = job.value
  if (!j || dismissed.value) return false
  if (j.phase === 'running') return true
  return !!j.finishedAt && Date.now() - new Date(j.finishedAt).getTime() < 10 * 60 * 1000
})

const icon = { pending: Circle, running: Circle, ok: Check, failed: X, skipped: MinusCircle } as const
const actionLabel = (a: string) => t(`docker.apps.lifecycle.step.${a}`)
</script>

<template>
  <div class="lifecycle">
    <div class="bar">
      <NButton size="small" quaternary :disabled="working || !anyStopped" @click="run('start')">
        <template #icon><NIcon :component="Play" /></template>
        {{ t('docker.apps.lifecycle.start') }}
      </NButton>
      <NPopconfirm :positive-text="t('docker.apps.lifecycle.stop')" @positive-click="run('stop')">
        <template #trigger>
          <NButton size="small" quaternary :disabled="working || !anyRunning">
            <template #icon><NIcon :component="Square" /></template>
            {{ t('docker.apps.lifecycle.stop') }}
          </NButton>
        </template>
        {{ t('docker.apps.lifecycle.confirmStop', { name }) }}
      </NPopconfirm>
      <NPopconfirm :positive-text="t('docker.apps.lifecycle.restart')" @positive-click="run('restart')">
        <template #trigger>
          <NButton size="small" quaternary :disabled="working || !anyRunning">
            <template #icon><NIcon :component="RotateCw" /></template>
            {{ t('docker.apps.lifecycle.restart') }}
          </NButton>
        </template>
        {{ t('docker.apps.lifecycle.confirmRestart', { name }) }}
      </NPopconfirm>
      <span class="spacer" />
      <slot name="extra" />
    </div>

    <NAlert v-if="error" type="error" :show-icon="false" class="gap" closable @close="error = ''">{{ error }}</NAlert>

    <div v-if="showJob && job" class="job">
      <div class="job-head">
        <NSpin v-if="job.phase === 'running'" size="small" />
        <strong>
          {{ job.phase === 'running' ? t('docker.apps.lifecycle.running', { action: t(`docker.apps.lifecycle.${job.action}`) }) : t(`docker.apps.lifecycle.result.${job.result}`, { action: t(`docker.apps.lifecycle.${job.action}`) }) }}
        </strong>
        <span class="spacer" />
        <NButton v-if="job.phase === 'done'" size="tiny" quaternary @click="dismissed = true">{{ t('docker.apps.lifecycle.dismiss') }}</NButton>
      </div>
      <ul class="steps">
        <li v-for="(s, i) in job.steps" :key="i" :class="`s-${s.state}`">
          <span class="ico"><NSpin v-if="s.state === 'running'" :size="12" /><NIcon v-else :component="icon[s.state]" size="13" /></span>
          <span class="tag">{{ actionLabel(s.action) }}</span>
          <span class="svc">{{ s.service }}</span>
          <span v-if="s.detail" class="detail">{{ s.detail }}</span>
        </li>
      </ul>
      <p v-if="job.phase === 'done' && job.result !== 'ok'" class="note">{{ t('docker.apps.lifecycle.partialNote') }}</p>
    </div>
  </div>
</template>

<style scoped>
.lifecycle { display: flex; flex-direction: column; gap: 8px; margin-top: 4px; }
.bar { display: flex; align-items: center; gap: 4px; flex-wrap: wrap; }
.spacer { flex: 1; }
.gap { margin: 2px 0; }
.job { border: 1px solid var(--border); border-radius: 8px; padding: 8px 10px; background: var(--surface); }
.job-head { display: flex; align-items: center; gap: 8px; font-size: 0.85rem; }
.steps { list-style: none; margin: 6px 0 0; padding: 0; display: flex; flex-direction: column; gap: 3px; font-size: 0.8rem; }
.steps li { display: flex; align-items: center; gap: 8px; }
.ico { width: 14px; display: inline-flex; justify-content: center; }
.tag { min-width: 3.2rem; color: var(--text-muted); font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.03em; }
.svc { font-weight: 500; }
.detail { color: var(--text-muted); overflow-wrap: anywhere; }
.s-ok .ico { color: var(--success); }
.s-failed .ico, .s-failed .detail { color: var(--danger); }
.s-skipped .ico, .s-skipped .detail { color: var(--warning); }
.s-pending { opacity: 0.55; }
.note { margin: 6px 0 0; font-size: 0.75rem; color: var(--text-muted); }
</style>
