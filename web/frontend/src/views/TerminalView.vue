<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { Terminal } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NSpin } from 'naive-ui'
import AppShell from '../layouts/AppShell.vue'
import { terminalApi } from '../api/terminal'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()
const prefersDark = useTheme()

type Status = 'checking' | 'disabled' | 'connecting' | 'connected' | 'closed' | 'error'
const status = ref<Status>('checking')
const errorMessage = ref('')

const WARNED_KEY = 'tk-terminal-warned'
const showWarning = ref(localStorage.getItem(WARNED_KEY) !== '1')
function dismissWarning() {
  localStorage.setItem(WARNED_KEY, '1')
  showWarning.value = false
}

const containerEl = ref<HTMLElement | null>(null)
let term: Terminal | null = null
let fitAddon: FitAddon | null = null
let socket: WebSocket | null = null
let resizeObserver: ResizeObserver | null = null

const darkTheme = {
  background: '#0f1115',
  foreground: '#e8eaed',
  cursor: '#4da3ff',
  selectionBackground: '#4da3ff55',
}
const lightTheme = {
  background: '#ffffff',
  foreground: '#14161a',
  cursor: '#2f6fbf',
  selectionBackground: '#4da3ff55',
}

function currentTheme() {
  return prefersDark.value ? darkTheme : lightTheme
}

watch(prefersDark, () => {
  if (term) term.options.theme = currentTheme()
})

function sendResize() {
  if (!term || !socket || socket.readyState !== WebSocket.OPEN) return
  socket.send(JSON.stringify({ type: 'resize', cols: term.cols, rows: term.rows }))
}

function connect() {
  if (!containerEl.value) return
  status.value = 'connecting'

  term = new Terminal({
    cursorBlink: true,
    scrollback: 1000,
    fontFamily: 'ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace',
    fontSize: 14,
    theme: currentTheme(),
  })
  fitAddon = new FitAddon()
  term.loadAddon(fitAddon)
  term.open(containerEl.value)
  fitAddon.fit()

  const proto = location.protocol === 'https:' ? 'wss:' : 'ws:'
  socket = new WebSocket(`${proto}//${location.host}/api/terminal/ws`)
  socket.binaryType = 'arraybuffer'

  socket.onopen = () => {
    status.value = 'connected'
    sendResize()
  }
  socket.onmessage = (e) => {
    if (e.data instanceof ArrayBuffer) {
      term?.write(new Uint8Array(e.data))
    }
  }
  socket.onclose = () => {
    status.value = status.value === 'error' ? 'error' : 'closed'
  }
  socket.onerror = () => {
    status.value = 'error'
    errorMessage.value = t('terminal.connectionFailed')
  }

  term.onData((data) => {
    if (socket?.readyState === WebSocket.OPEN) socket.send(new TextEncoder().encode(data))
  })
  term.onResize(() => sendResize())

  resizeObserver = new ResizeObserver(() => fitAddon?.fit())
  resizeObserver.observe(containerEl.value)
}

function teardown() {
  resizeObserver?.disconnect()
  resizeObserver = null
  socket?.close()
  socket = null
  term?.dispose()
  term = null
}

function reconnect() {
  teardown()
  connect()
}

onMounted(async () => {
  try {
    const res = await terminalApi.status()
    if (!res.enabled) {
      status.value = 'disabled'
      return
    }
    connect()
  } catch {
    status.value = 'error'
    errorMessage.value = t('terminal.statusCheckFailed')
  }
})

onBeforeUnmount(teardown)
</script>

<template>
  <AppShell>
    <div class="terminal-page">
      <NAlert v-if="showWarning && status !== 'disabled'" type="warning" :title="t('terminal.warningTitle')" closable @close="dismissWarning" class="warning-banner">
        {{ t('terminal.warningBody') }}
      </NAlert>

      <NAlert v-if="status === 'disabled'" type="info" :title="t('terminal.disabledTitle')">
        {{ t('terminal.disabledBodyBefore') }}<code>terminal.enabled: false</code>{{ t('terminal.disabledBodyMid') }}
        <code>config.yaml</code> {{ t('terminal.disabledBodyAfter') }}
      </NAlert>
      <template v-else-if="status === 'error'">
        <NAlert type="error" :title="t('terminal.connectFailedTitle')">{{ errorMessage }}</NAlert>
        <NButton size="small" style="align-self: flex-start" @click="reconnect">{{ t('common.tryAgain') }}</NButton>
      </template>
      <div v-else class="terminal-wrap">
        <div class="terminal-toolbar">
          <span class="status-dot" :class="status"></span>
          <span class="status-text">
            {{ status === 'connecting' ? t('terminal.connecting') : status === 'connected' ? t('terminal.connected') : status === 'closed' ? t('terminal.sessionEnded') : t('terminal.checking') }}
          </span>
          <span class="spacer" />
          <NButton v-if="status === 'closed'" size="small" @click="reconnect">{{ t('terminal.newSession') }}</NButton>
        </div>
        <div v-if="status === 'checking' || status === 'connecting'" class="terminal-loading"><NSpin /></div>
        <div ref="containerEl" class="terminal-mount"></div>
      </div>
    </div>
  </AppShell>
</template>

<style scoped>
.terminal-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.warning-banner {
  flex-shrink: 0;
}

.terminal-wrap {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.terminal-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: 0.85rem;
  color: var(--text-muted);
}

.spacer {
  flex: 1;
}

.status-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--text-muted);
}
.status-dot.connected {
  background: var(--success);
}
.status-dot.connecting,
.status-dot.checking {
  background: var(--warning);
}
.status-dot.closed,
.status-dot.error {
  background: var(--danger);
}

.terminal-mount {
  flex: 1;
  min-height: 0;
  background: #0f1115;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-2);
  overflow: hidden;
}

.terminal-loading {
  display: flex;
  justify-content: center;
  padding: 40px 0;
}
</style>
