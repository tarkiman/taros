<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NInput, NModal, useMessage } from 'naive-ui'
import { ApiError } from '../api/client'
import { settingsApi } from '../api/settings'
import { currentPassword, newPassword } from '../utils/inputProps'

// Set another account's password (there are no roles: every account is an equal).
// Asks for YOUR password; that account's sessions are ended, its two-factor stays.
const props = defineProps<{ username: string | null }>()
const emit = defineEmits<{ close: [] }>()
const { t } = useI18n()
const message = useMessage()

const next = ref('')
const again = ref('')
const own = ref('')
const busy = ref(false)
const error = ref('')

watch(
  () => props.username,
  () => {
    next.value = again.value = own.value = error.value = ''
  },
)
const mismatch = computed(() => again.value !== '' && next.value !== again.value)
const valid = computed(() => own.value !== '' && next.value.length >= 8 && next.value === again.value)

async function submit() {
  if (!props.username || !valid.value || busy.value) return
  busy.value = true
  error.value = ''
  try {
    await settingsApi.resetPassword(props.username, next.value, own.value)
    message.success(t('settings.password.resetDone', { username: props.username }))
    emit('close')
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('settings.password.failed')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <NModal :show="!!username" preset="card" style="max-width: 440px" :title="t('settings.password.resetTitle', { username: username ?? '' })" :closable="!busy" :mask-closable="false" @update:show="(v: boolean) => !v && !busy && emit('close')">
    <p class="hint">{{ t('settings.password.resetHint') }}</p>
    <div class="col">
      <NInput v-model:value="next" type="password" show-password-on="click" :placeholder="t('settings.password.new')" :input-props="newPassword('taros-reset-new-password')" />
      <NInput v-model:value="again" type="password" show-password-on="click" :placeholder="t('settings.password.again')" :input-props="newPassword('taros-reset-new-password-again')" :status="mismatch ? 'error' : undefined" />
      <p v-if="mismatch" class="err">{{ t('settings.passwordMismatch') }}</p>
      <NInput v-model:value="own" type="password" show-password-on="click" :placeholder="t('common.dashboardPassword')" :input-props="currentPassword('taros-reset-own-password')" @keyup.enter="submit" />
      <NAlert v-if="error" type="error" :show-icon="false">{{ error }}</NAlert>
    </div>
    <div class="footer">
      <NButton size="small" :disabled="busy" @click="emit('close')">{{ t('common.cancel') }}</NButton>
      <NButton size="small" type="primary" :loading="busy" :disabled="!valid" @click="submit">{{ t('settings.password.resetSubmit') }}</NButton>
    </div>
  </NModal>
</template>

<style scoped>
.hint { margin: 0 0 10px; font-size: 0.85rem; color: var(--text-muted); }
.col { display: flex; flex-direction: column; gap: 10px; }
.err { color: var(--error, #d03050); margin: 0; font-size: 0.8rem; }
.footer { display: flex; justify-content: flex-end; gap: 8px; margin-top: 14px; }
</style>
