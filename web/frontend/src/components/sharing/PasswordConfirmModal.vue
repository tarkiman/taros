<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NInput, NModal } from 'naive-ui'
import { currentPassword } from '../../utils/inputProps'

// "Type your own dashboard password to confirm" — every File Sharing change
// asks for it again (an open session alone shouldn't be enough to publish a
// folder or create a login). The parent runs the action and reports the outcome
// through `error`/`busy`; it closes the dialog by setting `show` to false.
const props = defineProps<{
  show: boolean
  title: string
  confirmLabel?: string
  danger?: boolean
  busy?: boolean
  error?: string
  // The action is allowed without the password (e.g. stopping a service)
  // — then the dialog is a plain confirmation.
  noPassword?: boolean
}>()
const emit = defineEmits<{ confirm: [password: string]; close: [] }>()
const { t } = useI18n()

const pw = ref('')
watch(
  () => props.show,
  (v) => {
    if (v) pw.value = ''
  },
)
function submit() {
  if (props.busy || (!props.noPassword && !pw.value)) return
  emit('confirm', pw.value)
}
</script>

<template>
  <NModal :show="show" preset="card" style="max-width: 460px" :title="title" :closable="!busy" :mask-closable="false" @update:show="(v: boolean) => !v && !busy && emit('close')">
    <slot />
    <NAlert v-if="error" type="error" :show-icon="false" class="err">{{ error }}</NAlert>
    <div v-if="!noPassword" class="field">
      <label>{{ t('common.dashboardPassword') }}</label>
      <NInput
        v-model:value="pw"
        type="password"
        show-password-on="click"
        size="small"
        :input-props="currentPassword('taros-confirm-password')"
        :placeholder="t('common.dashboardPassword')"
        @keyup.enter="submit"
      />
    </div>
    <div class="footer">
      <NButton size="small" :disabled="busy" @click="emit('close')">{{ t('common.cancel') }}</NButton>
      <NButton size="small" :type="danger ? 'error' : 'primary'" :loading="busy" :disabled="!noPassword && !pw" @click="submit">
        {{ confirmLabel ?? t('common.confirm') }}
      </NButton>
    </div>
  </NModal>
</template>

<style scoped>
.err { margin: 8px 0; }
.field { margin: 12px 0; }
.field label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
.footer { display: flex; justify-content: flex-end; gap: 8px; }
</style>
