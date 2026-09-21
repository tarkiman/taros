<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NIcon, useMessage } from 'naive-ui'
import { HardDrive, Usb } from '@lucide/vue'
import { ApiError } from '../../api/client'
import { storageApi, type StoragePartition } from '../../api/storage'
import { useStorageStore } from '../../stores/storage'
import { formatBytes } from '../../utils/format'

// External drives in the file explorer's sidebar: click a mounted one to open it,
// or mount one that is waiting. (Dashboard has the full card with eject etc.)
defineProps<{ activePath: string }>()
const emit = defineEmits<{ navigate: [path: string] }>()
const { t } = useI18n()
const message = useMessage()
const store = useStorageStore()
onMounted(() => store.acquire())
onBeforeUnmount(() => store.release())

const parts = computed(() => store.disks.flatMap((d) => d.partitions))
const shown = computed(() => parts.value.filter((p) => p.state === 'mounted' || p.state === 'mounted_ro' || p.state === 'unmounted' || p.state === 'failed'))
const busy = ref('')
const isMounted = (p: StoragePartition) => p.state === 'mounted' || p.state === 'mounted_ro'

async function mount(p: StoragePartition) {
  busy.value = p.path
  try {
    await storageApi.mount(p.path)
    await store.refresh()
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : t('storage.failed'))
  } finally {
    busy.value = ''
  }
}

function click(p: StoragePartition) {
  if (isMounted(p)) emit('navigate', p.mountPoint)
  else void mount(p)
}
const underActive = (p: StoragePartition, active: string) => isMounted(p) && (active === p.mountPoint || active.startsWith(p.mountPoint + '/'))
</script>

<template>
  <div v-if="shown.length > 0" class="devices">
    <p class="heading">{{ t('storage.sidebarTitle') }}</p>
    <button v-for="p in shown" :key="p.path" type="button" class="dev" :class="{ active: underActive(p, activePath), idle: !isMounted(p) }" :title="isMounted(p) ? p.mountPoint : t('storage.clickToMount')" :disabled="busy === p.path" @click="click(p)">
      <NIcon :component="p.mountPoint ? HardDrive : Usb" size="15" />
      <span class="name">{{ p.label || p.name }}</span>
      <span v-if="isMounted(p)" class="free">{{ formatBytes(p.freeBytes) }}</span>
      <span v-else class="free">{{ t('storage.mount') }}</span>
    </button>
  </div>
</template>

<style scoped>
.devices { margin-bottom: 10px; }
.heading { margin: 0 0 4px; padding: 0 6px; font-size: 0.72rem; letter-spacing: 0.04em; text-transform: uppercase; color: var(--text-muted); }
.dev { display: flex; align-items: center; gap: 8px; width: 100%; padding: 6px 8px; border: 0; border-radius: 6px; background: transparent; color: inherit; cursor: pointer; text-align: left; font: inherit; font-size: 0.88rem; }
.dev:hover { background: var(--hover, rgba(128, 128, 128, 0.12)); }
.dev.active { background: var(--hover, rgba(128, 128, 128, 0.18)); font-weight: 600; }
.dev.idle { opacity: 0.75; }
.name { flex: 1; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.free { font-size: 0.72rem; color: var(--text-muted); }
</style>
