<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCheckbox, NDrawer, NDrawerContent, NIcon, NInput, NSpin, useMessage } from 'naive-ui'
import { Copy, Lock } from '@lucide/vue'
import { dockerApi, type EnvVar } from '../api/docker'
import { ApiError } from '../api/client'
import { copyText } from '../utils/clipboard'
import type { Container } from '../types/docker'

const props = defineProps<{ show: boolean; container: Container | null }>()
const emit = defineEmits<{ (e: 'update:show', v: boolean): void }>()
const { t } = useI18n()
const message = useMessage()

// NInput puts autocomplete/name attrs on its wrapper <div>, not the real
// <input>, so they must go through input-props — otherwise Chrome takes the
// filter box (a text field before a password field) for a "username" and
// autofills the saved login into it.
const filterInputProps = { autocomplete: 'off', name: 'env-filter', 'data-1p-ignore': '', 'data-lpignore': 'true' }
const passwordInputProps = { autocomplete: 'current-password', name: 'env-reveal-password' }

const loading = ref(false)
const error = ref('')
const vars = ref<EnvVar[]>([])
const hideImageDefaults = ref(true)
const filter = ref('')

// Revealed secret values live only in this ref — never persisted, and
// cleared whenever the drawer closes or switches container.
const revealed = ref<Record<string, string> | null>(null)
const askPassword = ref(false)
const password = ref('')
const revealError = ref('')
const revealing = ref(false)

function reset() {
  vars.value = []
  error.value = ''
  filter.value = ''
  revealed.value = null
  askPassword.value = false
  password.value = ''
  revealError.value = ''
}

async function load() {
  if (!props.container) return
  loading.value = true
  error.value = ''
  try {
    vars.value = (await dockerApi.containerEnv(props.container.id)).vars
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('docker.env.loadFailed')
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.show, props.container?.id] as const,
  ([open]) => {
    reset()
    if (open) load()
  },
)

const imageDefaultCount = computed(() => vars.value.filter((v) => v.imageDefault).length)
const secretCount = computed(() => vars.value.filter((v) => v.secret).length)
const visible = computed(() => {
  const q = filter.value.trim().toLowerCase()
  return vars.value.filter((v) => {
    // A secret is never hidden as an "image default" — hiding a masked
    // credential behind a toggle would make it easy to overlook.
    if (hideImageDefaults.value && v.imageDefault && !v.secret) return false
    return !q || v.key.toLowerCase().includes(q)
  })
})

function valueOf(v: EnvVar): string | undefined {
  return v.secret ? revealed.value?.[v.key] : v.value
}

async function confirmReveal() {
  if (!props.container || !password.value) return
  revealing.value = true
  revealError.value = ''
  try {
    revealed.value = (await dockerApi.revealEnv(props.container.id, password.value)).values
    askPassword.value = false
    password.value = ''
  } catch (e) {
    revealError.value = e instanceof ApiError && e.status === 403 ? t('common.wrongPassword') : e instanceof ApiError ? e.message : t('docker.env.loadFailed')
  } finally {
    revealing.value = false
  }
}

async function copy(text: string) {
  try {
    await copyText(text)
    message.success(t('docker.env.copied'))
  } catch {
    message.error(t('docker.env.copyFailed'))
  }
}
</script>

<template>
  <NDrawer :show="show" :width="640" placement="right" @update:show="emit('update:show', $event)">
    <NDrawerContent :title="t('docker.env.title', { name: container?.name ?? '' })" closable>
      <p class="text-muted note">{{ t('docker.env.readOnlyNote') }}</p>

      <div v-if="loading" class="center"><NSpin /></div>
      <NAlert v-else-if="error" type="error" :title="error" />
      <template v-else>
        <div class="controls">
          <NInput v-model:value="filter" size="small" clearable :placeholder="t('docker.env.filter')" :input-props="filterInputProps" style="max-width: 200px" />
          <NCheckbox v-if="imageDefaultCount > 0" v-model:checked="hideImageDefaults" size="small">
            {{ t('docker.env.hideImageDefaults', { count: imageDefaultCount }) }}
          </NCheckbox>
          <span class="spacer" />
          <NButton v-if="secretCount > 0 && !revealed && !askPassword" size="small" @click="askPassword = true">
            <template #icon><NIcon :component="Lock" /></template>
            {{ t('docker.env.revealSecrets', { count: secretCount }) }}
          </NButton>
          <NButton v-if="revealed" size="small" quaternary @click="revealed = null">{{ t('docker.env.hideAgain') }}</NButton>
        </div>

        <NAlert v-if="askPassword" type="warning" :show-icon="false" class="reveal-box">
          <p style="margin: 0 0 8px">{{ t('docker.env.revealConfirm') }}</p>
          <div class="reveal-row">
            <NInput
              v-model:value="password"
              type="password"
              show-password-on="click"
              size="small"
              :placeholder="t('common.dashboardPassword')"
              :input-props="passwordInputProps"
              @keyup.enter="confirmReveal"
            />
            <NButton size="small" @click="askPassword = false; password = ''; revealError = ''">{{ t('common.cancel') }}</NButton>
            <NButton size="small" type="primary" :loading="revealing" :disabled="!password" @click="confirmReveal">{{ t('docker.env.reveal') }}</NButton>
          </div>
          <p v-if="revealError" class="reveal-error">{{ revealError }}</p>
        </NAlert>

        <p v-if="vars.length === 0" class="text-muted">{{ t('docker.env.none') }}</p>
        <p v-else-if="visible.length === 0" class="text-muted">{{ t('docker.env.noMatch') }}</p>
        <ul v-else class="env-list">
          <li v-for="v in visible" :key="v.key">
            <span class="env-key">{{ v.key }}</span>
            <span class="env-val" :class="{ masked: v.secret && valueOf(v) === undefined }">
              <template v-if="v.secret && valueOf(v) === undefined">
                <NIcon :component="Lock" size="12" /> ••••••••
              </template>
              <template v-else>{{ valueOf(v) }}</template>
            </span>
            <NButton
              v-if="valueOf(v) !== undefined && valueOf(v) !== ''"
              size="tiny"
              quaternary
              :title="t('docker.env.copy')"
              @click="copy(valueOf(v)!)"
            >
              <NIcon :component="Copy" size="13" />
            </NButton>
            <span v-else />
          </li>
        </ul>
      </template>
    </NDrawerContent>
  </NDrawer>
</template>

<style scoped>
.note { font-size: 0.8rem; margin: 0 0 12px; }
.text-muted { color: var(--text-muted); }
.center { display: flex; justify-content: center; padding: 40px 0; }
.controls { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 12px; }
.spacer { flex: 1; }
.reveal-box { margin-bottom: 12px; }
.reveal-row { display: flex; gap: 8px; align-items: center; }
.reveal-error { color: var(--danger); font-size: 0.8rem; margin: 8px 0 0; }
.env-list { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; }
.env-list li {
  display: grid;
  grid-template-columns: minmax(140px, 0.9fr) minmax(0, 2fr) auto;
  gap: 12px;
  align-items: center;
  padding: 6px 0;
  border-bottom: 1px solid var(--border);
  font-family: var(--font-mono);
  font-size: 0.8rem;
}
.env-key { font-weight: 600; overflow-wrap: anywhere; }
.env-val { overflow-wrap: anywhere; color: var(--text); }
.env-val.masked { color: var(--text-muted); letter-spacing: 0.05em; }
</style>
