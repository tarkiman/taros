import { onMounted, onUnmounted, ref } from 'vue'
import type { Snapshot } from '../types/metrics'
import { systemApi } from '../api/system'

// EventSource reconnects on its own after a drop — no manual retry needed.
// See internal/web/sse.go handleMetricsStream (GET /api/stream/metrics).
//
// `supported` is checked once up front, before ever opening the
// EventSource — a plain EventSource has no clean way to signal "this
// endpoint will never send data" (a 503 just makes the browser retry
// forever, showing `connected: false` indefinitely with no explanation).
// See internal/web/handlers_system.go — false on any OS besides Linux,
// since the collector behind this reads /proc directly.
export function useMetricsStream() {
  const snapshot = ref<Snapshot | null>(null)
  const connected = ref(false)
  const supported = ref(true)
  const statusLoaded = ref(false)
  let source: EventSource | undefined

  onMounted(async () => {
    try {
      const res = await systemApi.monitoringStatus()
      supported.value = res.supported
    } catch {
      // Couldn't even check — assume supported and let the stream itself
      // surface whatever's wrong, same fallback-open behavior as before
      // this check existed.
      supported.value = true
    } finally {
      statusLoaded.value = true
    }
    if (!supported.value) return

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

  return { snapshot, connected, supported, statusLoaded }
}
