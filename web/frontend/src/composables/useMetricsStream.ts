import { onMounted, onUnmounted, ref } from 'vue'
import type { Snapshot } from '../types/metrics'

// EventSource reconnects on its own after a drop — no manual retry needed.
// See internal/web/sse.go handleMetricsStream (GET /api/stream/metrics).
export function useMetricsStream() {
  const snapshot = ref<Snapshot | null>(null)
  const connected = ref(false)
  let source: EventSource | undefined

  onMounted(() => {
    source = new EventSource('/api/stream/metrics')
    source.onopen = () => {
      connected.value = true
    }
    source.onerror = () => {
      connected.value = false
    }
    source.onmessage = (e) => {
      try {
        snapshot.value = JSON.parse(e.data) as Snapshot
      } catch {
        // malformed frame, wait for the next tick
      }
    }
  })

  onUnmounted(() => {
    source?.close()
  })

  return { snapshot, connected }
}
