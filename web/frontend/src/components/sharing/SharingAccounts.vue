<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NInput, NModal, NTag, useMessage } from 'naive-ui'
import { ApiError } from '../../api/client'
import { sharingApi, type Account, type SharingResponse } from '../../api/sharing'
import { currentPassword, newPassword, noAutofill } from '../../utils/inputProps'

// Accounts tab: dedicated no-login system users that exist only to sign in to
// shares. Their password is never the dashboard's, and never leaves the request body.
const props = defineProps<{ data: SharingResponse }>()
const emit = defineEmits<{ changed: [] }>()
const { t } = useI18n()
const message = useMessage()

const smb = computed(() => props.data.status.smb)
const enabled = computed(() => smb.value.installed && smb.value.canManage && smb.value.managed)
const usedBy = (name: string) => props.data.model.shares.filter((s) => s.access.some((a) => a.user === name)).map((s) => s.name)

type Dlg = { kind: 'add' } | { kind: 'password'; acc: Account } | { kind: 'delete'; acc: Account } | { kind: 'enable'; acc: Account }
const dlg = ref<Dlg | null>(null)
const busy = ref(false)
const error = ref('')
const name = ref('')
const pw1 = ref('')
const pw2 = ref('')
const dashPw = ref('')

function open(d: Dlg) {
  error.value = ''
  name.value = ''
  pw1.value = ''
  pw2.value = ''
  dashPw.value = ''
  dlg.value = d
}

const mismatch = computed(() => pw2.value !== '' && pw1.value !== pw2.value)
const needsNewPw = computed(() => dlg.value?.kind === 'add' || dlg.value?.kind === 'password')
const valid = computed(() => {
  if (!dlg.value || !dashPw.value) return false
  if (dlg.value.kind === 'add' && !name.value.trim()) return false
  if (needsNewPw.value && (pw1.value.length < 8 || pw1.value !== pw2.value)) return false
  return true
})

async function submit() {
  const d = dlg.value
  if (!d || !valid.value) return
  busy.value = true
  error.value = ''
  try {
    if (d.kind === 'add') await sharingApi.addAccount(name.value.trim(), pw1.value, dashPw.value)
    else if (d.kind === 'password') await sharingApi.setAccountPassword(d.acc.name, pw1.value, dashPw.value)
    else if (d.kind === 'delete') await sharingApi.deleteAccount(d.acc.name, dashPw.value)
    else await sharingApi.setAccountDisabled(d.acc.name, false, dashPw.value)
    dlg.value = null
    message.success(t('sharing.done'))
    emit('changed')
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('sharing.failed')
  } finally {
    busy.value = false
  }
}

// Turning a login OFF never asks for the password (it only reduces exposure).
async function disable(a: Account) {
  try {
    await sharingApi.setAccountDisabled(a.name, true, '')
    message.success(t('sharing.done'))
    emit('changed')
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : t('sharing.failed'))
  }
}

const title = computed(() => {
  const d = dlg.value
  if (!d) return ''
  if (d.kind === 'add') return t('sharing.account.add')
  return t(`sharing.account.${d.kind}Title`, { name: d.acc.name })
})
</script>

<template>
  <div class="stack">
    <NAlert v-if="!enabled" type="info" :show-icon="false">{{ t('sharing.needManaged') }}</NAlert>
    <NCard size="small" :title="t('sharing.account.title')">
      <template #header-extra>
        <NButton size="small" type="primary" :disabled="!enabled" @click="open({ kind: 'add' })">{{ t('sharing.account.add') }}</NButton>
      </template>
      <p class="muted small">{{ t('sharing.account.intro') }}</p>
      <p v-if="data.model.accounts.length === 0" class="muted">{{ t('sharing.account.none') }}</p>
      <ul v-else class="rows">
        <li v-for="a in data.model.accounts" :key="a.name">
          <div class="main">
            <b>{{ a.name }}</b>
            <span class="muted small">
              <NTag v-if="a.disabled" size="small" :bordered="false">{{ t('sharing.account.disabled') }}</NTag>
              {{ usedBy(a.name).length ? t('sharing.account.usedBy', { shares: usedBy(a.name).join(', ') }) : t('sharing.account.unused') }}
            </span>
          </div>
          <div class="btns">
            <NButton size="tiny" :disabled="!enabled" @click="open({ kind: 'password', acc: a })">{{ t('sharing.account.changePassword') }}</NButton>
            <NButton v-if="a.disabled" size="tiny" :disabled="!enabled" @click="open({ kind: 'enable', acc: a })">{{ t('sharing.account.enable') }}</NButton>
            <NButton v-else size="tiny" :disabled="!enabled" @click="disable(a)">{{ t('sharing.account.disable') }}</NButton>
            <NButton size="tiny" type="error" quaternary :disabled="!enabled" @click="open({ kind: 'delete', acc: a })">{{ t('common.delete') }}</NButton>
          </div>
        </li>
      </ul>
    </NCard>

    <NModal :show="!!dlg" preset="card" style="max-width: 460px" :title="title" :closable="!busy" :mask-closable="false" @update:show="(v: boolean) => !v && !busy && (dlg = null)">
      <template v-if="dlg">
        <p v-if="dlg.kind === 'delete'">{{ t('sharing.account.deleteBody') }}</p>
        <p v-if="dlg.kind === 'enable'">{{ t('sharing.account.enableBody') }}</p>
        <div v-if="dlg.kind === 'add'" class="field">
          <label>{{ t('sharing.account.name') }}</label>
          <NInput v-model:value="name" size="small" :input-props="noAutofill('taros-account-name')" :placeholder="t('sharing.account.namePh')" />
          <p class="muted small">{{ t('sharing.account.nameHint') }}</p>
        </div>
        <template v-if="needsNewPw">
          <div class="field">
            <label>{{ t('sharing.account.password') }}</label>
            <NInput v-model:value="pw1" type="password" show-password-on="click" size="small" :input-props="newPassword('taros-account-password')" />
          </div>
          <div class="field">
            <label>{{ t('sharing.account.passwordAgain') }}</label>
            <NInput v-model:value="pw2" type="password" show-password-on="click" size="small" :input-props="newPassword('taros-account-password2')" :status="mismatch ? 'error' : undefined" />
            <p v-if="mismatch" class="err small">{{ t('sharing.account.mismatch') }}</p>
            <p v-else class="muted small">{{ t('sharing.account.passwordHint') }}</p>
          </div>
        </template>
        <NAlert v-if="error" type="error" :show-icon="false" class="gap">{{ error }}</NAlert>
        <div class="field">
          <label>{{ t('common.dashboardPassword') }}</label>
          <NInput v-model:value="dashPw" type="password" show-password-on="click" size="small" :input-props="currentPassword('taros-account-confirm')" :placeholder="t('common.dashboardPassword')" @keyup.enter="submit" />
        </div>
        <div class="footer">
          <NButton size="small" :disabled="busy" @click="dlg = null">{{ t('common.cancel') }}</NButton>
          <NButton size="small" :type="dlg.kind === 'delete' ? 'error' : 'primary'" :loading="busy" :disabled="!valid" @click="submit">
            {{ dlg.kind === 'delete' ? t('common.delete') : t('common.confirm') }}
          </NButton>
        </div>
      </template>
    </NModal>
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; }
.muted { color: var(--text-muted); margin: 6px 0; }
.small { font-size: 0.8rem; }
.err { color: var(--error, #d03050); margin: 6px 0; }
.gap { margin: 8px 0; }
.rows { list-style: none; margin: 0; padding: 0; }
.rows li { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-top: 1px solid var(--border); flex-wrap: wrap; }
.rows li:first-child { border-top: 0; }
.rows .main { flex: 1; min-width: 180px; display: flex; flex-direction: column; gap: 2px; }
.btns { display: flex; gap: 6px; flex-wrap: wrap; }
.field { margin-bottom: 12px; }
.field label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
.footer { display: flex; justify-content: flex-end; gap: 8px; }
</style>
