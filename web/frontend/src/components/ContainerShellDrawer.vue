<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { NAlert, NButton, NDrawer, NDrawerContent, NTag } from 'naive-ui'
import { i18n } from '../i18n'
import { useTheme } from '../composables/useTheme'
import { useContainerShellStore } from '../stores/containerShell'
import type { Container } from '../types/docker'

// An interactive shell inside a running container (docs/04-features.md §4.15).
// Same wire protocol as the host terminal: binary frames are raw terminal bytes
// both ways, text frames are JSON control messages. Server errors arrive as
// {"type":"error","code":…} frames (a failed WebSocket handshake never shows
// its body to the browser), translated through errors.<code>.
const props = defineProps<{ show: boolean; container: Container | null }>()
const emit = defineEmits<{ (e: 'update:show', v: boolean): void }>()
const { t } = useI18n()
const prefersDark = useTheme()
const shell = useContainerShellStore()

type Status = 'connecting' | 'connected' | 'exited' | 'closed' | 'error'
const status = ref<Status>('connecting')
const message = ref('')
const exitCode = ref<number | null>(null)
const host = ref<HTMLElement | null>(null)

let term: Terminal | null = null
let fit: FitAddon | null = null
let socket: WebSocket | null = null
let observer: ResizeObserver | null = null

const dark = { background: '#0f1115', foreground: '#e8eaed', cursor: '#4da3ff', selectionBackground: '#4da3ff55' }
const light = { background: '#ffffff', foreground: '#14161a', cursor: '#2f6fbf', selectionBackground: '#4da3ff55' }

function sendResize() {
  if (term && socket?.readyState === WebSocket.OPEN) socket.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }))
}

function errorText(code: string, params?: Record<string, unknown>): string {
  const key = `errors.${code}`
  return i18n.global.te(key) ? String(i18n.global.t(key, params ?? {})) : code
}

function dispose() {
  observer?.disconnect()
  observer = null
  // Closing the socket ends the exec on the server (the shell gets SIGHUP).
  socket?.close()
  socket = null
  term?.dispose()
  term = null
  fit = null
}

function start() {
  dispose()
  if (!props.container || !host.value) return
  status.value = 'connecting'
  message.value = ''
  exitCode.value = null

  term = new Terminal({
    cursorBlink: true,
    scrollback: 2000,
    fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: 13,
    theme: prefersDark.value ? dark : light,
  })
  fit = new FitAddon()
  term.loadAddon(fit)
  term.open(host.value)
  fit.fit()

  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
  socket = new WebSocket(`${proto}//${location.host}/api/docker/containers/${encodeURIComponent(props.container.id)}/shell/ws`)
  socket.binaryType = 'arraybuffer'
  socket.onmessage = (e) => {
    if (e.data instanceof ArrayBuffer) {
      term?.write(new Uint8Array(e.data))
      return
    }
    try {
      const f = JSON.parse(String(e.data)) as { type: string; code?: string | number; params?: Record<string, unknown> }
      if (f.type === 'ready') {
        status.value = 'connected'
        sendResize()
        term?.focus()
      } else if (f.type === 'error') {
        status.value = 'error'
        message.value = errorText(String(f.code), f.params)
      } else if (f.type === 'exit') {
        status.value = 'exited'
        exitCode.value = Number(f.code)
      }
    } catch {
      /* ignore a malformed control frame */
    }
  }
  socket.onclose = () => {
    if (status.value === 'connecting' || status.value === 'connected') status.value = 'closed'
  }
  socket.onerror = () => {
    if (status.value === 'connecting') {
      status.value = 'error'
      message.value = t('docker.shell.connectFailed')
    }
  }
  term.onData((d) => {
    if (socket?.readyState === WebSocket.OPEN) socket.send(new TextEncoder().encode(d))
  })
  term.onResize(() => sendResize())
  observer = new ResizeObserver(() => fit?.fit())
  observer.observe(host.value)
}

function close() {
  emit('update:show', false)
}
onBeforeUnmount(dispose)
</script>

<template>
  <NDrawer :show="show" :width="920" placement="right" :trap-focus="false" @update:show="emit('update:show', $event)" @after-enter="start" @after-leave="dispose">
    <NDrawerContent :title="t('docker.shell.title', { name: container?.name ?? '' })" closable :native-scrollbar="false" body-content-style="padding: 0; display: flex; flex-direction: column; height: 100%">
      <div class="bar">
        <NTag v-if="status === 'connecting'" size="small" :bordered="false">{{ t('docker.shell.connecting') }}</NTag>
        <NTag v-else-if="status === 'connected'" size="small" type="success" :bordered="false">{{ t('docker.shell.connected') }}</NTag>
        <NTag v-else-if="status === 'exited'" size="small" :bordered="false">{{ t('docker.shell.exited', { code: exitCode ?? 0 }) }}</NTag>
        <NTag v-else-if="status === 'closed'" size="small" type="warning" :bordered="false">{{ t('docker.shell.closed') }}</NTag>
        <NTag v-else size="small" type="error" :bordered="false">{{ t('docker.shell.failed') }}</NTag>
        <span class="mono image">{{ container?.image }}</span>
        <span class="spacer" />
        <NButton v-if="status !== 'connecting' && status !== 'connected'" size="tiny" @click="start">{{ t('docker.shell.reconnect') }}</NButton>
        <NButton size="tiny" quaternary @click="close">{{ t('docker.shell.end') }}</NButton>
      </div>
      <NAlert v-if="message" type="error" :show-icon="false" class="msg">{{ message }}</NAlert>
      <p class="hint">{{ t('docker.shell.hint', { min: shell.idleTimeoutMin }) }}</p>
      <div ref="host" class="term" />
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
.bar { display: flex; align-items: center; gap: 8px; padding: 8px 14px; border-bottom: 1px solid var(--border); }
.spacer { flex: 1; }
.image { font-size: 0.75rem; color: var(--text-muted); overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.mono { font-family: var(--font-mono); }
.msg { margin: 8px 14px 0; }
.hint { margin: 6px 14px 0; font-size: 0.72rem; color: var(--text-muted); }
.term { flex: 1; min-height: 0; margin: 8px 10px 10px; }
</style>
