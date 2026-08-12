import { ref } from 'vue'
import type { LogLine } from '../types/docker'

// Same EventSource pattern as useMetricsStream.ts, but lifecycle is driven
// manually (open()/close()) rather than onMounted/onUnmounted — this is
// meant to be used from a single component (DockerView.vue's log drawer),
// opened only while that drawer is visible for a specific container, not
// for the page's whole lifetime like the Dashboard's metrics stream.
//
// MAX_LINES caps client-side memory for a container that logs heavily
// while the drawer is left open a long time — oldest lines are dropped,
// same "bounded, not unlimited" spirit as the server's own tail/since caps
// (see internal/web/handlers_docker.go handleDockerContainerLogsStream).
const MAX_LINES = 5000

export function useContainerLogsStream() {
  const lines = ref<LogLine[]>([])
  const connected = ref(false)
  let source: EventSource | undefined

  function open(containerId: string, sinceMin: number, tail: number) {
    close()
    lines.value = []
    const url = `/api/docker/containers/${encodeURIComponent(containerId)}/logs/stream?sinceMin=${sinceMin}&tail=${tail}`
    source = new EventSource(url)
    source.onopen = () => {
      connected.value = true
    }
    source.onerror = () => {
      connected.value = false
    }
    source.onmessage = (e) => {
      try {
        const line = JSON.parse(e.data) as LogLine
        lines.value.push(line)
        if (lines.value.length > MAX_LINES) {
          lines.value.splice(0, lines.value.length - MAX_LINES)
        }
      } catch {
        // malformed frame, wait for the next line
      }
    }
  }

  function close() {
    source?.close()
    source = undefined
    connected.value = false
  }

  return { lines, connected, open, close }
}
