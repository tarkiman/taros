<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NInput, NModal, NSwitch, useMessage } from 'naive-ui'
import { ApiError } from '../api/client'
import { storageApi } from '../api/storage'
import { useStorageStore } from '../stores/storage'
import { currentPassword } from '../utils/inputProps'

// Settings > External drives: auto-mount and noexec. Turning auto-mount ON, or
// noexec OFF, makes TarOS trust whatever gets plugged in, so those two ask for
// the dashboard password; the safer directions apply at once.
const { t, te } = useI18n()
const message = useMessage()
const store = useStorageStore()
onMounted(() => store.acquire())
onBeforeUnmount(() => store.release())

const status = computed(() => store.status)
const settings = computed(() => status.value?.settings)
const pending = ref<{ autoMount: boolean; noExec: boolean } | null>(null)
const pw = ref('')
const busy = ref(false)
const error = ref('')

async function apply(autoMount: boolean, noExec: boolean, password: string) {
  busy.value = true
  error.value = ''
  try {
    await storageApi.settings(autoMount, noExec, password)
    pending.value = null
    pw.value = ''
    message.success(t('storage.saved'))
    await store.refresh()
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('storage.failed')
  } finally {
    busy.value = false
  }
}

function change(next: { autoMount: boolean; noExec: boolean }) {
  const cur = settings.value
  if (!cur) return
  const widens = (next.autoMount && !cur.autoMount) || (!next.noExec && cur.noExec)
  if (widens) {
    error.value = ''
    pw.value = ''
    pending.value = next
  } else {
    void apply(next.autoMount, next.noExec, '')
  }
}

const blockedText = computed(() => {
  const k = `storage.blocked.${status.value?.blocked}`
  return status.value?.blocked && te(k) ? String(t(k)) : ''
})
</script>

<template>
  <NCard v-if="status?.supported && settings" embedded size="small" :title="t('storage.settingsTitle')" style="margin-top: 16px">
    <p class="muted">{{ t('storage.settingsDesc') }}</p>
    <NAlert v-if="blockedText" type="warning" :show-icon="false" class="gap">{{ blockedText }}</NAlert>
    <div class="row">
      <NSwitch :value="settings.autoMount" size="small" :disabled="!status.canMount" @update:value="(v: boolean) => change({ autoMount: v, noExec: settings!.noExec })" />
      <span>{{ t('storage.autoMount') }}</span>
    </div>
    <p class="muted small">{{ t('storage.autoMountHint') }}</p>
    <div class="row">
      <NSwitch :value="settings.noExec" size="small" :disabled="!status.canMount" @update:value="(v: boolean) => change({ autoMount: settings!.autoMount, noExec: v })" />
      <span>{{ t('storage.noExec') }}</span>
    </div>
    <p class="muted small">{{ t('storage.noExecHint') }}</p>
    <p class="muted small">{{ t('storage.where', { base: status.mountBase, owner: status.owner }) }}</p>

    <NModal :show="!!pending" preset="card" style="max-width: 440px" :title="t('storage.confirmTitle')" :closable="!busy" :mask-closable="false" @update:show="(v: boolean) => !v && !busy && (pending = null)">
      <p>{{ pending?.autoMount && !settings.autoMount ? t('storage.confirmAuto') : t('storage.confirmExec') }}</p>
      <NAlert v-if="error" type="error" :show-icon="false" class="gap">{{ error }}</NAlert>
      <div class="field">
        <label>{{ t('common.dashboardPassword') }}</label>
        <NInput v-model:value="pw" type="password" show-password-on="click" size="small" :input-props="currentPassword('taros-storage-confirm')" :placeholder="t('common.dashboardPassword')" @keyup.enter="pw && !busy && pending && apply(pending.autoMount, pending.noExec, pw)" />
      </div>
      <div class="footer">
        <NButton size="small" :disabled="busy" @click="pending = null">{{ t('common.cancel') }}</NButton>
        <NButton size="small" type="primary" :loading="busy" :disabled="!pw" @click="pending && apply(pending.autoMount, pending.noExec, pw)">{{ t('common.confirm') }}</NButton>
      </div>
    </NModal>
  </NCard>
</template>

<style scoped>
.muted { color: var(--text-muted); margin: 6px 0; }
.small { font-size: 0.8rem; }
.gap { margin: 8px 0; }
.row { display: flex; align-items: center; gap: 10px; margin-top: 10px; }
.field { margin: 12px 0; }
.field > label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
.footer { display: flex; justify-content: flex-end; gap: 8px; }
</style>
