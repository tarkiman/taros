<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NInput, NSpace, useMessage } from 'naive-ui'
import { ApiError } from '../api/client'
import { settingsApi } from '../api/settings'
import { currentPassword, newPassword } from '../utils/inputProps'

// Change your own dashboard password. The current one is asked again; every OTHER
// session of this account is ended (the one you are using stays), so a session
// somebody else may hold does not survive the change. Two-factor is untouched.
const { t } = useI18n()
const message = useMessage()

const current = ref('')
const next = ref('')
const again = ref('')
const busy = ref(false)
const error = ref('')

const mismatch = computed(() => again.value !== '' && next.value !== again.value)
const valid = computed(() => current.value !== '' && next.value.length >= 8 && next.value === again.value)

async function submit() {
  if (!valid.value || busy.value) return
  busy.value = true
  error.value = ''
  try {
    const res = await settingsApi.changePassword(current.value, next.value)
    current.value = next.value = again.value = ''
    message.success(res.otherSessionsClosed > 0 ? t('settings.password.doneSessions', { n: res.otherSessionsClosed }) : t('settings.password.done'))
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('settings.password.failed')
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <NCard embedded size="small" :title="t('settings.password.title')" style="margin-top: 16px">
    <NSpace vertical :size="10">
      <p class="text-muted">{{ t('settings.password.desc') }}</p>
      <NInput v-model:value="current" type="password" show-password-on="click" :placeholder="t('settings.password.current')" :input-props="currentPassword('taros-own-current-password')" />
      <NInput v-model:value="next" type="password" show-password-on="click" :placeholder="t('settings.password.new')" :input-props="newPassword('taros-own-new-password')" />
      <NInput
        v-model:value="again"
        type="password"
        show-password-on="click"
        :placeholder="t('settings.password.again')"
        :input-props="newPassword('taros-own-new-password-again')"
        :status="mismatch ? 'error' : undefined"
        @keyup.enter="submit"
      />
      <p v-if="mismatch" class="err">{{ t('settings.passwordMismatch') }}</p>
      <NAlert v-if="error" type="error" :show-icon="false">{{ error }}</NAlert>
      <NButton size="small" type="primary" :loading="busy" :disabled="!valid" @click="submit">{{ t('settings.password.submit') }}</NButton>
    </NSpace>
  </NCard>
</template>

<style scoped>
.text-muted { color: var(--text-muted); margin: 0; font-size: 0.85rem; }
.err { color: var(--error, #d03050); margin: 0; font-size: 0.8rem; }
</style>
