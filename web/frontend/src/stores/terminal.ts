import { defineStore } from 'pinia'
import { terminalApi } from '../api/terminal'

// Cached across the whole session — terminal.enabled is config-driven and
// never changes at runtime, so there's no reason to re-fetch it on every
// navigation (AppShell.vue is re-instantiated per page, not a persistent
// layout, since each view wraps itself in <AppShell>).
export const useTerminalStore = defineStore('terminal', {
  state: () => ({
    enabled: false,
    loaded: false,
  }),
  actions: {
    async ensureLoaded() {
      if (this.loaded) return
      try {
        const res = await terminalApi.status()
        this.enabled = res.enabled
      } catch {
        this.enabled = false
      } finally {
        this.loaded = true
      }
    },
  },
})
