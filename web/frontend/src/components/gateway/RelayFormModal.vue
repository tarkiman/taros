<script setup lang="ts">
// Add or change one go2rtc relay (internal/web/handlers_gateway_relays.go). A source is
// a URL on the site's LAN plus an optional login; on edit an empty password keeps the
// current one. A new relay can also get its sub-stream "<name>_sub", which the NVR
// picks up as the low-resolution stream of "<name>".
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NInput, NModal, NSpace, NTag } from 'naive-ui'
import { ApiError } from '../../api/client'
import { relayApi, type SourceInput, type StreamConfig } from '../../api/gateway'
import { newPassword, noAutofill } from '../../utils/inputProps'

export interface RelayPreset {
  name?: string
  url: string
  subUrl?: string
  username: string
  password: string
}

const props = defineProps<{
  show: boolean
  edit?: StreamConfig | null // set = edit this relay
  preset?: RelayPreset | null // set = new relay prefilled (from the camera finder)
  existing: string[]
}>()
const emit = defineEmits<{ close: []; saved: [name: string] }>()
const { t } = useI18n()

const name = ref('')
const url = ref('')
const subUrl = ref('')
const username = ref('')
const password = ref('')
const busy = ref(false)
const error = ref('')
const probe = ref<{ busy: boolean; ok?: boolean; text?: string }>({ busy: false })

watch(
  () => props.show,
  (open) => {
    if (!open) return
    error.value = ''
    probe.value = { busy: false }
    password.value = ''
    if (props.edit) {
      const src = props.edit.sources[0]
      name.value = props.edit.name
      url.value = src?.url ?? ''
      username.value = src?.username ?? ''
      subUrl.value = ''
    } else {
      name.value = props.preset?.name ?? ''
      url.value = props.preset?.url ?? ''
      subUrl.value = props.preset?.subUrl ?? ''
      username.value = props.preset?.username ?? ''
      password.value = props.preset?.password ?? ''
    }
  },
)

const nameRe = /^[a-z0-9][a-z0-9_-]{0,39}$/
const editing = computed(() => !!props.edit)
const keepsPassword = computed(() => editing.value && !!props.edit?.sources[0]?.hasPassword)
function validUrl(u: string) {
  try {
    const p = new URL(u.trim())
    return ['rtsp:', 'rtsps:', 'rtmp:', 'http:', 'https:'].includes(p.protocol) && !!p.hostname
  } catch {
    return false
  }
}
const nameError = computed(() => {
  if (editing.value) return ''
  if (!nameRe.test(name.value)) return t('gateway.relay.nameInvalid')
  if (props.existing.includes(name.value)) return t('gateway.relay.nameTaken')
  if (subUrl.value.trim() && props.existing.includes(`${name.value}_sub`)) return t('gateway.relay.nameTaken')
  return ''
})
const valid = computed(() => !nameError.value && validUrl(url.value) && (!subUrl.value.trim() || validUrl(subUrl.value)))

const source = (u: string): SourceInput => ({ url: u.trim(), username: username.value.trim(), password: password.value })

async function test() {
  probe.value = { busy: true }
  try {
    const r = await relayApi.test(source(url.value), editing.value ? name.value : undefined)
    probe.value = {
      busy: false,
      ok: r.ok,
      text: r.ok ? t('gateway.relay.testOk', { codec: r.codec || '?' }) : t(`gateway.relay.testErr.${r.error ?? 'status'}`, { status: r.status ?? 0 }),
    }
  } catch (e) {
    probe.value = { busy: false, ok: false, text: e instanceof ApiError ? e.message : String(e) }
  }
}

async function save() {
  busy.value = true
  error.value = ''
  try {
    if (editing.value) {
      await relayApi.update(name.value, source(url.value))
    } else {
      await relayApi.create(name.value, source(url.value))
      if (subUrl.value.trim()) await relayApi.create(`${name.value}_sub`, source(subUrl.value))
    }
    emit('saved', name.value)
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : String(e)
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    style="max-width: 520px"
    :title="editing ? t('gateway.relay.editTitle', { name }) : t('gateway.relay.addTitle')"
    :closable="!busy"
    :mask-closable="false"
    @update:show="(v: boolean) => !v && !busy && emit('close')"
  >
    <NSpace vertical :size="12">
      <div v-if="!editing" class="field">
        <span class="label">{{ t('gateway.relay.name') }}</span>
        <NInput v-model:value="name" placeholder="garasi" :status="name && nameError ? 'error' : undefined" :input-props="noAutofill('relay-name')" />
        <span class="hint" :class="{ err: name && nameError }">{{ name && nameError ? nameError : t('gateway.relay.nameHint') }}</span>
      </div>
      <div class="field">
        <span class="label">{{ t('gateway.relay.url') }}</span>
        <div class="row">
          <NInput v-model:value="url" placeholder="rtsp://192.168.1.30:554/stream1" :status="url && !validUrl(url) ? 'error' : undefined" :input-props="noAutofill('relay-url')" style="flex: 1" />
          <NButton size="small" :loading="probe.busy" :disabled="!validUrl(url)" @click="test">{{ t('gateway.setup.test') }}</NButton>
        </div>
        <NTag v-if="probe.text" size="small" :bordered="false" :type="probe.ok ? 'success' : 'error'">{{ probe.text }}</NTag>
        <span class="hint">{{ t('gateway.relay.urlHint') }}</span>
      </div>
      <div v-if="!editing" class="field">
        <span class="label">{{ t('gateway.relay.subUrl') }}</span>
        <NInput v-model:value="subUrl" :placeholder="t('gateway.relay.optional')" :status="subUrl && !validUrl(subUrl) ? 'error' : undefined" :input-props="noAutofill('relay-sub-url')" />
        <span class="hint">{{ t('gateway.relay.subHint', { name: name || 'nama' }) }}</span>
      </div>
      <div class="row">
        <div class="field" style="flex: 1 1 160px">
          <span class="label">{{ t('gateway.relay.username') }}</span>
          <NInput v-model:value="username" :placeholder="t('gateway.relay.optional')" :input-props="noAutofill('relay-username')" />
        </div>
        <div class="field" style="flex: 1 1 160px">
          <span class="label">{{ t('gateway.relay.password') }}</span>
          <NInput
            v-model:value="password"
            type="password"
            show-password-on="click"
            :placeholder="keepsPassword ? t('gateway.relay.keepPassword') : t('gateway.relay.optional')"
            :input-props="newPassword('relay-password')"
          />
        </div>
      </div>
      <span class="hint">{{ t('gateway.relay.loginHint') }}</span>
      <NAlert v-if="error" type="error" :show-icon="false">{{ error }}</NAlert>
      <NSpace justify="end">
        <NButton size="small" :disabled="busy" @click="emit('close')">{{ t('common.cancel') }}</NButton>
        <NButton size="small" type="primary" :loading="busy" :disabled="!valid" @click="save">{{ t('gateway.relay.save') }}</NButton>
      </NSpace>
    </NSpace>
  </NModal>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.label {
  font-weight: 500;
}
.row {
  display: flex;
  gap: 8px;
  align-items: flex-start;
  flex-wrap: wrap;
}
.hint {
  font-size: 12px;
  opacity: 0.7;
}
.hint.err {
  color: #d03050;
  opacity: 1;
}
</style>
