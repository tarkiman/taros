<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NIcon, NPopconfirm, NTag, useMessage } from 'naive-ui'
import { HardDrive, Usb } from '@lucide/vue'
import { ApiError } from '../api/client'
import { storageApi, type StorageDisk, type StoragePartition } from '../api/storage'
import { useStorageStore } from '../stores/storage'
import { formatBytes } from '../utils/format'

// External drives (docs/04-features.md §4.17): what is plugged in, whether it is
// mounted, and the few things one can do about it. Hidden while nothing external
// is plugged in — an empty card would only be noise.
const { t, te } = useI18n()
const message = useMessage()
const router = useRouter()
const store = useStorageStore()
onMounted(() => store.acquire())
onBeforeUnmount(() => store.release())

const status = computed(() => store.status)
const disks = computed(() => store.disks)
const busy = ref('')
const problem = ref('')

function open(p: StoragePartition) {
  void router.push({ path: '/files', query: { path: p.mountPoint } })
}

async function run(key: string, fn: () => Promise<unknown>, okMsg: string) {
  busy.value = key
  problem.value = ''
  try {
    await fn()
    message.success(okMsg)
  } catch (e) {
    // "busy" carries who is using the drive — that belongs on screen, not in a toast
    if (e instanceof ApiError && e.code === 'storage_busy') problem.value = e.message
    else message.error(e instanceof ApiError ? e.message : t('storage.failed'))
  } finally {
    busy.value = ''
    await store.refresh()
  }
}

const mount = (p: StoragePartition) => run(p.path, () => storageApi.mount(p.path), t('storage.mounted'))
const unmount = (p: StoragePartition) => run(p.path, () => storageApi.unmount(p.path), t('storage.unmounted'))
const eject = (d: StorageDisk) => run(d.path, () => storageApi.eject(d.path), t('storage.ejected'))
const ignore = (p: StoragePartition, on: boolean) => run(p.path, () => storageApi.ignore(p.path, on), t('storage.saved'))

const title = (d: StorageDisk) => [d.vendor, d.model].filter(Boolean).join(' ') || d.name
const partTitle = (p: StoragePartition) => p.label || p.name
const usedPct = (p: StoragePartition) => (p.totalBytes > 0 ? Math.min(100, (p.usedBytes / p.totalBytes) * 100) : 0)
const barClass = (pct: number) => (pct >= 90 ? 'danger' : pct >= 70 ? 'warn' : '')
const reasonText = (p: StoragePartition) => {
  const key = `storage.reason.${p.reason}`
  return p.reason && te(key) ? String(t(key)) : ''
}
const canAct = computed(() => status.value?.canMount === true)
const blockedText = computed(() => {
  const k = `storage.blocked.${status.value?.blocked}`
  return status.value?.blocked && te(k) ? String(t(k)) : ''
})
</script>

<template>
  <NCard v-if="status?.supported && disks.length > 0" :title="t('storage.title')" class="section">
    <template #header-extra>
      <NIcon :component="Usb" size="18" />
    </template>
    <NAlert v-if="!canAct && blockedText" type="warning" :show-icon="false" class="gap">{{ blockedText }}</NAlert>
    <NAlert v-if="problem" type="error" :show-icon="false" closable class="gap" @close="problem = ''">{{ problem }}</NAlert>

    <div v-for="d in disks" :key="d.path" class="disk">
      <div class="disk-head">
        <NIcon :component="HardDrive" size="16" />
        <b>{{ title(d) }}</b>
        <span class="muted">{{ formatBytes(d.size) }}</span>
        <NTag v-if="d.bus" size="small" :bordered="false">{{ d.bus.toUpperCase() }}</NTag>
        <span class="spacer" />
        <NPopconfirm v-if="d.ejectable && canAct" @positive-click="eject(d)">
          <template #trigger>
            <NButton size="tiny" :loading="busy === d.path">{{ t('storage.eject') }}</NButton>
          </template>
          {{ t('storage.ejectConfirm', { name: title(d) }) }}
        </NPopconfirm>
      </div>

      <div v-for="p in d.partitions" :key="p.path" class="part">
        <div class="part-main">
          <div class="part-line">
            <b>{{ partTitle(p) }}</b>
            <NTag v-if="p.fsType" size="small" :bordered="false">{{ p.fsType }}</NTag>
            <NTag v-if="p.state === 'mounted'" type="success" size="small" :bordered="false">{{ t('storage.state.mounted') }}</NTag>
            <NTag v-else-if="p.state === 'mounted_ro'" type="warning" size="small" :bordered="false">{{ t('storage.state.mountedRo') }}</NTag>
            <NTag v-else-if="p.state === 'failed'" type="error" size="small" :bordered="false">{{ t('storage.state.failed') }}</NTag>
            <NTag v-else size="small" :bordered="false">{{ t(`storage.state.${p.state}`) }}</NTag>
            <NTag v-if="p.managedBy === 'fstab'" size="small" :bordered="false">fstab</NTag>
          </div>
          <template v-if="p.state === 'mounted' || p.state === 'mounted_ro'">
            <div class="bar-track"><div class="bar-fill" :class="barClass(usedPct(p))" :style="{ width: usedPct(p) + '%' }" /></div>
            <div class="meta">
              <span class="mono">{{ p.mountPoint }}</span>
              <span>{{ formatBytes(p.usedBytes) }} {{ t('dashboard.usedSuffix') }} · {{ formatBytes(p.freeBytes) }} {{ t('dashboard.freeSuffix') }} · {{ formatBytes(p.totalBytes) }}</span>
            </div>
            <p v-if="p.state === 'mounted_ro'" class="note warn">{{ reasonText(p) || t('storage.roGeneric') }}</p>
            <p v-if="p.usedBy.length" class="note">{{ t('storage.usedBy', { names: p.usedBy.join(', ') }) }}</p>
          </template>
          <p v-else-if="p.state === 'unsupported'" class="note">{{ reasonText(p) }}</p>
          <p v-else-if="p.state === 'failed'" class="note err">{{ p.error }}</p>
          <p v-else-if="p.state === 'fstab'" class="note">{{ t('storage.fstabNote') }}</p>
          <p v-else-if="p.state === 'ignored'" class="note">{{ t('storage.ignoredNote') }}</p>
        </div>
        <div class="btns">
          <NButton v-if="p.state === 'mounted' || p.state === 'mounted_ro'" size="tiny" type="primary" @click="open(p)">{{ t('storage.open') }}</NButton>
          <NButton v-if="p.state === 'unmounted' || p.state === 'failed' || p.state === 'ignored'" size="tiny" type="primary" :disabled="!canAct" :loading="busy === p.path" @click="mount(p)">{{ t('storage.mount') }}</NButton>
          <NButton v-if="(p.state === 'mounted' || p.state === 'mounted_ro') && p.managedBy !== 'fstab' && canAct" size="tiny" :loading="busy === p.path" @click="unmount(p)">{{ t('storage.unmount') }}</NButton>
          <NButton v-if="p.state === 'ignored' && canAct" size="tiny" quaternary @click="ignore(p, false)">{{ t('storage.autoAgain') }}</NButton>
          <NButton v-else-if="(p.state === 'unmounted' || p.state === 'failed' || p.state === 'mounted' || p.state === 'mounted_ro') && p.managedBy !== 'fstab' && canAct" size="tiny" quaternary @click="ignore(p, true)">{{ t('storage.neverAuto') }}</NButton>
        </div>
      </div>
    </div>
  </NCard>
</template>

<style scoped>
.section { margin-top: 16px; }
.gap { margin-bottom: 10px; }
.muted { color: var(--text-muted); font-size: 0.85rem; }
.mono { font-family: var(--font-mono); font-size: 0.78rem; overflow-wrap: anywhere; }
.disk { padding: 10px 0; border-top: 1px solid var(--border); }
.disk:first-of-type { border-top: 0; padding-top: 0; }
.disk-head { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; margin-bottom: 8px; }
.spacer { flex: 1; }
.part { display: flex; align-items: flex-start; gap: 12px; padding: 8px 0 8px 22px; flex-wrap: wrap; }
.part-main { flex: 1; min-width: 220px; }
.part-line { display: flex; align-items: center; gap: 6px; flex-wrap: wrap; }
.bar-track { height: 6px; border-radius: 3px; background: var(--border); margin: 8px 0 4px; overflow: hidden; }
.bar-fill { height: 100%; background: var(--primary, #4098fc); }
.bar-fill.warn { background: var(--warning, #f0a020); }
.bar-fill.danger { background: var(--error, #d03050); }
.meta { display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap; font-size: 0.8rem; color: var(--text-muted); }
.note { margin: 6px 0 0; font-size: 0.8rem; color: var(--text-muted); }
.note.warn { color: var(--warning, #f0a020); }
.note.err { color: var(--error, #d03050); }
.btns { display: flex; gap: 6px; flex-wrap: wrap; }
</style>
