import { defineStore } from 'pinia'
import { diskAnalysisApi } from '../api/diskAnalysis'

// Same "cached across the session, config-driven, never changes at
// runtime" shape as stores/terminal.ts.
export const useDiskAnalysisStore = defineStore('diskAnalysis', {
  state: () => ({
    enabled: false,
    loaded: false,
  }),
  actions: {
    async ensureLoaded() {
      if (this.loaded) return
      try {
        const res = await diskAnalysisApi.status()
        this.enabled = res.enabled
      } catch {
        this.enabled = false
      } finally {
        this.loaded = true
      }
    },
  },
})
