import { defineStore } from 'pinia'
import { dockerApi } from '../api/docker'

// Whether the container-shell feature is switched on. Config-driven (changing it
// restarts the server), so it is fetched once per session.
export const useContainerShellStore = defineStore('containerShell', {
  state: () => ({ enabled: false, idleTimeoutMin: 15, maxSessions: 2, loaded: false }),
  actions: {
    async ensureLoaded() {
      if (this.loaded) return
      try {
        const s = await dockerApi.shellStatus()
        this.enabled = s.enabled
        this.idleTimeoutMin = s.idleTimeoutMin
        this.maxSessions = s.maxSessions
      } catch {
        this.enabled = false
      } finally {
        this.loaded = true
      }
    },
  },
})
