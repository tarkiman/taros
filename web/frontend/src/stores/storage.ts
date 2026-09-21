import { defineStore } from 'pinia'
import { storageApi, type StorageStatus } from '../api/storage'

// One shared, polled copy of the external-drive list: the dashboard card, the
// file explorer's sidebar and the Settings card all read it, and it is only
// polled while at least one of them is on screen (and the tab is visible).
let timer: ReturnType<typeof setInterval> | null = null
let users = 0

export const useStorageStore = defineStore('storage', {
  state: () => ({
    status: null as StorageStatus | null,
    loaded: false,
    failed: false,
  }),
  getters: {
    disks: (s) => s.status?.disks ?? [],
    mounted: (s) => (s.status?.disks ?? []).flatMap((d) => d.partitions).filter((p) => p.state === 'mounted' || p.state === 'mounted_ro'),
    hasDrives: (s) => (s.status?.disks.length ?? 0) > 0,
  },
  actions: {
    async refresh() {
      try {
        this.status = await storageApi.devices()
        this.failed = false
      } catch {
        // 503 = not available on this platform; a network blip keeps the last list
        if (!this.status) this.status = null
        this.failed = true
      } finally {
        this.loaded = true
      }
    },
    // acquire/release: call from onMounted/onBeforeUnmount of any component that shows drives.
    acquire() {
      users++
      void this.refresh()
      if (!timer) {
        timer = setInterval(() => {
          if (!document.hidden) void this.refresh()
        }, 5000)
      }
    },
    release() {
      users = Math.max(0, users - 1)
      if (users === 0 && timer) {
        clearInterval(timer)
        timer = null
      }
    },
  },
})
