<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NIcon, NInput, NSpace, NSpin, NSwitch } from 'naive-ui'
import { TriangleAlert } from '@lucide/vue'
import { ApiError } from '../api/client'
import { dockerApi } from '../api/docker'
import { settingsApi } from '../api/settings'
import { currentPassword } from '../utils/inputProps'

// Toggle for the container shell (docs/04-features.md §4.15). Same bar as the
// host terminal: the switch never applies directly — it asks for your dashboard
// password (with a plain statement of what is being granted), then the server
// rewrites its config and restarts itself, since the route is registered once
// at startup.
const { t } = useI18n()
const enabled = ref(false)
const loading = ref(true)
type Flow = 'idle' | 'confirm' | 'applying' | 'restarting' | 'error'
const flow = ref<Flow>('idle')
const flowError = ref('')
const password = ref('')
const pending = ref(false)
const pwProps = currentPassword('confirm-container-shell-password')

onMounted(async () => {
  try {
    enabled.value = (await dockerApi.shellStatus()).enabled
  } catch {
    /* leave it off */
  } finally {
    loading.value = false
  }
})

function request(next: boolean) {
  pending.value = next
  password.value = ''
  flowError.value = ''
  flow.value = 'confirm'
}
function cancel() {
  flow.value = 'idle'
  password.value = ''
}

async function confirm() {
  if (!password.value) return
  flow.value = 'applying'
  try {
    await settingsApi.setContainerShellEnabled(pending.value, password.value)
    flow.value = 'restarting'
    await waitThenReload()
  } catch (e) {
    flowError.value = e instanceof ApiError && e.status === 403 ? t('common.wrongPassword') : e instanceof Error ? e.message : t('settings.saveSettingsFailed')
    flow.value = 'error'
  }
}

// The server exits ~700 ms after answering and systemd brings it back with the
// new config: poll until it answers, then reload so the whole UI sees the change.
async function waitThenReload() {
  for (let i = 0; i < 30; i++) {
    await new Promise((r) => setTimeout(r, 1000))
    try {
      if ((await fetch('/api/docker/shell/status', { credentials: 'include' })).ok) break
    } catch {
      /* still down */
    }
  }
  location.reload()
}
</script>

<template>
  <NCard embedded size="small" :title="t('settings.containerShell.title')" style="margin-top: 16px">
    <div v-if="loading" class="flow"><NSpin size="small" /></div>
    <NSpace v-else vertical :size="12">
      <NSpace align="center" justify="space-between">
        <span>{{ t('settings.containerShell.desc') }}</span>
        <NSwitch :value="enabled" :disabled="flow !== 'idle'" @update:value="request" />
      </NSpace>

      <NAlert v-if="flow === 'confirm'" type="warning" :show-icon="false">
        <NSpace vertical :size="10">
          <span v-if="pending"><strong>{{ t('settings.containerShell.grantTitle') }}</strong> {{ t('settings.containerShell.grantBody') }}</span>
          <span v-else>{{ t('settings.toggleConfirmMsg', { action: t('settings.disabling') }) }}</span>
          <NInput v-model:value="password" type="password" show-password-on="click" :placeholder="t('common.dashboardPassword')" :input-props="pwProps" @keyup.enter="confirm" />
          <NSpace>
            <NButton size="small" @click="cancel">{{ t('common.cancel') }}</NButton>
            <NButton size="small" :type="pending ? 'error' : 'primary'" :disabled="!password" @click="confirm">
              {{ pending ? t('settings.enable') : t('settings.disable') }}
            </NButton>
          </NSpace>
        </NSpace>
      </NAlert>
      <div v-else-if="flow === 'applying'" class="flow"><NSpin size="small" /> <span>{{ t('settings.savingRestarting') }}</span></div>
      <div v-else-if="flow === 'restarting'" class="flow"><NSpin size="small" /> <span>{{ t('settings.waitingRestart') }}</span></div>
      <NAlert v-else-if="flow === 'error'" type="error" :show-icon="false">
        <NSpace vertical :size="10">
          <span><NIcon :component="TriangleAlert" size="14" /> {{ flowError }}</span>
          <NButton size="small" @click="request(pending)">{{ t('common.tryAgain') }}</NButton>
        </NSpace>
      </NAlert>

      <p class="hint">{{ t('settings.containerShell.hint') }}</p>
    </NSpace>
  </NCard>
</template>

<style scoped>
.flow { display: flex; align-items: center; gap: 8px; font-size: 0.88rem; }
.hint { margin: 0; font-size: 0.8rem; color: var(--text-muted); }
</style>
