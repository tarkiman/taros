import { defineStore } from 'pinia'
import { gatewayApi } from '../api/gateway'

// Same "config-driven, cached for the session" shape as stores/diskAnalysis.ts: the
// Gateway nav entry only shows on boxes with gateway.enabled.
export const useGatewayStore = defineStore('gateway', {
  state: () => ({
    enabled: false,
    loaded: false,
  }),
  actions: {
    async ensureLoaded() {
      if (this.loaded) return
      try {
        this.enabled = (await gatewayApi.status()).enabled
      } catch {
        this.enabled = false
      } finally {
        this.loaded = true
      }
    },
  },
})
