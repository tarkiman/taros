<script setup lang="ts">
// The RTSP login the central NVR uses to pull from this gateway. Rotating it sets a new
// random password in go2rtc.yaml and restarts go2rtc; the new password is shown once,
// with the URL to paste into each NVR camera source.
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NInput, NSpace, NTag, useMessage } from 'naive-ui'
import { ApiError } from '../../api/client'
import { relayApi, type RelayConfig, type RTSPLoginResult } from '../../api/gateway'
import { copyText } from '../../utils/clipboard'
import { currentPassword } from '../../utils/inputProps'

const props = defineProps<{ config: RelayConfig }>()
const emit = defineEmits<{ changed: [] }>()
const { t } = useI18n()
const message = useMessage()

const flow = ref<'idle' | 'confirm' | 'busy'>('idle')
const dashPassword = ref('')
const error = ref('')
const result = ref<RTSPLoginResult | null>(null)

const host = computed(() => props.config.zerotierIp || '<ip-zerotier>')
const pattern = computed(() => `rtsp://${props.config.rtsp.username || 'nvr'}:•••@${host.value}:${props.config.rtsp.port}/<stream>`)

async function rotate() {
  flow.value = 'busy'
  error.value = ''
  try {
    result.value = await relayApi.rotateLogin(props.config.rtsp.username || 'nvr', dashPassword.value)
    flow.value = 'idle'
    emit('changed')
  } catch (e) {
    error.value = e instanceof ApiError && e.status === 403 ? t('common.wrongPassword') : e instanceof Error ? e.message : String(e)
    flow.value = 'confirm'
  } finally {
    dashPassword.value = ''
  }
}

async function copy(text: string) {
  try {
    await copyText(text)
    message.success(t('sharing.copied'))
  } catch {
    message.error(t('sharing.copyFailed'))
  }
}
</script>

<template>
  <NCard size="small" :title="t('gateway.rtsp.title')">
    <NSpace vertical :size="10">
      <div class="row">
        <span>{{ t('gateway.rtsp.user') }}: <b>{{ config.rtsp.username || '—' }}</b></span>
        <NTag size="small" :bordered="false" :type="config.rtsp.hasPassword ? 'success' : 'error'">
          {{ config.rtsp.hasPassword ? t('gateway.rtsp.hasPassword') : t('gateway.rtsp.noPassword') }}
        </NTag>
      </div>
      <code class="mono">{{ pattern }}</code>
      <span class="muted small">{{ t('gateway.rtsp.hint') }}</span>

      <NAlert v-if="result" type="success" :title="t('gateway.rtsp.doneTitle')">
        <NSpace vertical :size="8">
          <span>{{ t('gateway.rtsp.done') }}</span>
          <div class="row">
            <code class="mono">{{ result.password }}</code>
            <NButton size="tiny" @click="copy(result.password)">{{ t('sharing.copy') }}</NButton>
          </div>
          <div v-for="(u, name) in result.urls" :key="name" class="row">
            <span class="stream">{{ name }}</span>
            <code class="mono url">{{ u }}</code>
            <NButton size="tiny" @click="copy(u)">{{ t('sharing.copy') }}</NButton>
          </div>
          <NButton size="tiny" @click="result = null">{{ t('gateway.rtsp.hide') }}</NButton>
        </NSpace>
      </NAlert>

      <NSpace v-if="flow === 'idle'" justify="end">
        <NButton size="small" @click="flow = 'confirm'">{{ t('gateway.rtsp.rotate') }}</NButton>
      </NSpace>
      <NAlert v-else type="warning" :show-icon="false">
        <NSpace vertical :size="10">
          <span>{{ t('gateway.rtsp.confirm') }}</span>
          <NInput
            v-model:value="dashPassword"
            type="password"
            show-password-on="click"
            :placeholder="t('common.dashboardPassword')"
            :input-props="currentPassword('rtsp-confirm-password')"
            :disabled="flow === 'busy'"
            @keyup.enter="dashPassword && rotate()"
          />
          <NAlert v-if="error" type="error" :show-icon="false">{{ error }}</NAlert>
          <NSpace>
            <NButton size="small" :disabled="flow === 'busy'" @click="(flow = 'idle'), (dashPassword = ''), (error = '')">{{ t('common.cancel') }}</NButton>
            <NButton size="small" type="warning" :loading="flow === 'busy'" :disabled="!dashPassword" @click="rotate">{{ t('gateway.rtsp.rotate') }}</NButton>
          </NSpace>
        </NSpace>
      </NAlert>
    </NSpace>
  </NCard>
</template>

<style scoped>
.row {
  display: flex;
  gap: 8px;
  align-items: center;
  flex-wrap: wrap;
}
.mono {
  font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
  font-size: 12px;
  padding: 2px 6px;
  border-radius: 4px;
  background: rgba(127, 127, 127, 0.12);
  word-break: break-all;
}
.url {
  flex: 1 1 260px;
}
.stream {
  min-width: 80px;
  font-weight: 500;
}
.muted {
  opacity: 0.7;
}
.small {
  font-size: 12px;
}
</style>
