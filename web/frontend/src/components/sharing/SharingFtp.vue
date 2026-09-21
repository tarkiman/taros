<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NInput, NInputNumber, NModal, NRadioButton, NRadioGroup, NSelect, NSpace, NSwitch, NTag, useMessage } from 'naive-ui'
import { ApiError } from '../../api/client'
import { sharingApi, type Account, type FTPSettings, type ServiceAction, type SharingResponse } from '../../api/sharing'
import { currentPassword, newPassword } from '../../utils/inputProps'
import FolderPicker from './FolderPicker.vue'
import PasswordConfirmModal from './PasswordConfirmModal.vue'

// FTP tab: take over vsftpd, then manage who gets in, with what folder, and how
// safely (TLS, device users, anonymous, passive ports). Every change asks for the
// dashboard password again; applying restarts a running vsftpd.
const props = defineProps<{ data: SharingResponse }>()
const emit = defineEmits<{ changed: []; goto: [tab: string] }>()
const { t } = useI18n()
const message = useMessage()

const ftp = computed(() => props.data.status.ftp)
const model = computed(() => props.data.model)
const ftpAccounts = computed(() => model.value.accounts.filter((a) => a.ftp))
const candidates = computed(() => model.value.accounts.filter((a) => !a.disabled))
const blockedKey = computed(() => (ftp.value.manageBlocked ? `sharing.ftpBlocked.${ftp.value.manageBlocked}` : ''))

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    message.success(t('sharing.copied'))
  } catch {
    message.error(t('sharing.copyFailed'))
  }
}

// ---- simple password-gated actions (adopt / unadopt / service) -----------------------
type Act = { kind: 'adopt' } | { kind: 'unadopt' } | { kind: 'service'; action: ServiceAction } | { kind: 'settings' }
const act = ref<Act | null>(null)
const busy = ref(false)
const error = ref('')

function openAct(a: Act) {
  error.value = ''
  act.value = a
}
const actTitle = computed(() => {
  const a = act.value
  if (!a) return ''
  if (a.kind === 'service') return t(`sharing.service.${a.action}Ftp`)
  return t(`sharing.ftpDlg.${a.kind}Title`)
})
const noPassword = computed(() => act.value?.kind === 'service' && (act.value.action === 'stop' || act.value.action === 'disable'))

// ---- settings form ------------------------------------------------------------------------
const draft = ref<FTPSettings>({ tls: '', onlyAccounts: false, noAnonymous: false, pasvMin: 0, pasvMax: 0 })
function loadDraft() {
  draft.value = { ...model.value.ftp }
}
loadDraft()
const dirty = computed(() => JSON.stringify(draft.value) !== JSON.stringify(model.value.ftp))
const lockedOut = computed(() => (draft.value.onlyAccounts && !ftp.value.config.accountsOnly ? ftp.value.loginUsers ?? [] : []))
// NInputNumber shows an empty box for null; 0 means "leave" on the server side.
const pasvMin = computed({ get: () => draft.value.pasvMin || null, set: (v: number | null) => (draft.value.pasvMin = v ?? 0) })
const pasvMax = computed({ get: () => draft.value.pasvMax || null, set: (v: number | null) => (draft.value.pasvMax = v ?? 0) })
const pasvBad = computed(() => {
  const { pasvMin: a, pasvMax: b } = draft.value
  if (!a && !b) return false
  return a < 1024 || b > 65535 || a > b || b - a > 2000
})

async function confirm(password: string) {
  const a = act.value
  if (!a) return
  busy.value = true
  error.value = ''
  try {
    if (a.kind === 'adopt') await sharingApi.ftpAdopt(password)
    else if (a.kind === 'unadopt') await sharingApi.ftpUnadopt(password)
    else if (a.kind === 'settings') await sharingApi.ftpSettings(draft.value, password)
    else await sharingApi.ftpService(a.action, password)
    act.value = null
    message.success(t('sharing.done'))
    emit('changed')
    setTimeout(loadDraft, 600)
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('sharing.failed')
  } finally {
    busy.value = false
  }
}

// ---- give / change an account's FTP folder ---------------------------------------------------
const editing = ref<string | null>(null) // account being edited; '' = choose one
const form = ref({ name: '', path: '', mode: 'rw' as 'ro' | 'rw', runAs: '', accountPw: '', accountPw2: '' })
const formPw = ref('')
const formBusy = ref(false)
const formError = ref('')
const advanced = ref(false)
const isFirst = computed(() => !model.value.accounts.find((a) => a.name === form.value.name)?.ftp)

function openAccess(a?: Account) {
  formError.value = ''
  formPw.value = ''
  advanced.value = !!a?.ftp?.runAs
  form.value = {
    name: a?.name ?? candidates.value.find((c) => !c.ftp)?.name ?? '',
    path: a?.ftp?.path ?? '',
    mode: a?.ftp?.mode ?? 'rw',
    runAs: a?.ftp?.runAs ?? '',
    accountPw: '',
    accountPw2: '',
  }
  editing.value = a?.name ?? ''
}
const accountOptions = computed(() => candidates.value.map((a) => ({ label: a.name, value: a.name })))
const modeOptions = computed(() => [
  { label: t('sharing.share.modeRw'), value: 'rw' },
  { label: t('sharing.share.modeRo'), value: 'ro' },
])
const runAsOptions = computed(() => [{ label: t('sharing.share.runAsAuto'), value: '' }, ...props.data.status.ordinaryUsers.map((u) => ({ label: u, value: u }))])
const pwMismatch = computed(() => form.value.accountPw2 !== '' && form.value.accountPw !== form.value.accountPw2)
const formValid = computed(() => {
  const f = form.value
  if (!f.name || !f.path.trim() || !formPw.value) return false
  if (isFirst.value || f.accountPw) {
    if (f.accountPw.length < 8 || f.accountPw !== f.accountPw2) return false
  }
  return true
})

async function saveAccess() {
  formBusy.value = true
  formError.value = ''
  try {
    const f = form.value
    await sharingApi.setFtpAccess(f.name, { path: f.path.trim(), mode: f.mode, runAs: f.runAs }, f.accountPw, formPw.value)
    editing.value = null
    message.success(t('sharing.done'))
    emit('changed')
  } catch (e) {
    formError.value = e instanceof ApiError ? e.message : t('sharing.failed')
    if (e instanceof ApiError && (e.code === 'sharing_owned_by_root' || e.code === 'sharing_run_as_invalid')) advanced.value = true
  } finally {
    formBusy.value = false
  }
}

async function clearAccess(a: Account) {
  try {
    await sharingApi.clearFtpAccess(a.name)
    message.success(t('sharing.done'))
    emit('changed')
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : t('sharing.failed'))
  }
}
</script>

<template>
  <div class="stack">
    <!-- not installed -->
    <NCard v-if="!ftp.installed" size="small" title="FTP">
      <p class="muted">{{ t('sharing.ftpNotInstalled') }}</p>
      <div v-if="ftp.install.command" class="cmd">
        <code>{{ ftp.install.command }}</code>
        <NButton size="tiny" @click="copy(ftp.install.command)">{{ t('sharing.copy') }}</NButton>
      </div>
      <p class="muted small">{{ t('sharing.afterInstall') }}</p>
    </NCard>

    <!-- installed but off limits -->
    <NAlert v-else-if="!ftp.canManage" type="warning" :show-icon="false">{{ t(blockedKey) }}</NAlert>

    <!-- installed, not managed yet -->
    <NCard v-else-if="!ftp.managed" size="small" title="FTP">
      <p class="muted">{{ t('sharing.ftpAdoptIntro') }}</p>
      <ul class="bullets">
        <li>{{ t('sharing.ftpDlg.adoptPoint1') }}</li>
        <li>{{ t('sharing.ftpDlg.adoptPoint2') }}</li>
        <li>{{ t('sharing.ftpDlg.adoptPoint3') }}</li>
      </ul>
      <NButton type="primary" size="small" @click="openAct({ kind: 'adopt' })">{{ t('sharing.ftpAdopt') }}</NButton>
    </NCard>

    <template v-else>
      <!-- service -->
      <NCard size="small" title="FTP">
        <template #header-extra>
          <NTag type="success" size="small" :bordered="false">{{ t('sharing.state.managed') }}</NTag>
        </template>
        <div class="kv">
          <span>{{ t('sharing.service.label') }}</span>
          <b>
            <NTag :type="ftp.active ? 'success' : 'default'" size="small" :bordered="false">{{ ftp.active ? t('sharing.state.running') : t('sharing.state.stopped') }}</NTag>
            <NTag size="small" :bordered="false">{{ ftp.enabled ? t('sharing.state.autostart') : t('sharing.state.noAutostart') }}</NTag>
          </b>
          <span>{{ t('sharing.listening') }}</span>
          <b>{{ ftp.listeners.length ? ftp.listeners.map((l) => `${l.address}:${l.port}`).join(', ') : '—' }}</b>
        </div>
        <NSpace class="gap" :size="8">
          <NButton v-if="!ftp.active" size="small" type="primary" @click="openAct({ kind: 'service', action: 'start' })">{{ t('sharing.service.startFtp') }}</NButton>
          <NButton v-if="ftp.active" size="small" @click="openAct({ kind: 'service', action: 'restart' })">{{ t('sharing.service.restartFtp') }}</NButton>
          <NButton v-if="ftp.active" size="small" @click="openAct({ kind: 'service', action: 'stop' })">{{ t('sharing.service.stopFtp') }}</NButton>
          <NButton v-if="!ftp.enabled" size="small" @click="openAct({ kind: 'service', action: 'enable' })">{{ t('sharing.service.enable') }}</NButton>
          <NButton v-else size="small" @click="openAct({ kind: 'service', action: 'disable' })">{{ t('sharing.service.disable') }}</NButton>
          <NButton size="small" type="warning" quaternary @click="openAct({ kind: 'unadopt' })">{{ t('sharing.unadopt') }}</NButton>
        </NSpace>
      </NCard>

      <!-- accounts with FTP access -->
      <NCard size="small" :title="t('sharing.ftpTab.accessTitle')">
        <template #header-extra>
          <NButton size="small" type="primary" :disabled="candidates.length === 0" @click="openAccess()">{{ t('sharing.ftpTab.give') }}</NButton>
        </template>
        <p v-if="candidates.length === 0" class="muted">
          {{ t('sharing.ftpTab.needAccount') }}
          <NButton size="tiny" @click="emit('goto', 'accounts')">{{ t('sharing.tab.accounts') }}</NButton>
        </p>
        <p v-else-if="ftpAccounts.length === 0" class="muted">{{ t('sharing.ftpTab.none') }}</p>
        <ul v-else class="rows">
          <li v-for="a in ftpAccounts" :key="a.name">
            <div class="main">
              <b>{{ a.name }} <NTag v-if="a.disabled" size="small" :bordered="false">{{ t('sharing.account.disabled') }}</NTag></b>
              <span class="mono">{{ a.ftp?.path }}</span>
              <span class="muted small">{{ a.ftp?.mode === 'rw' ? t('sharing.share.modeRw') : t('sharing.share.modeRo') }}</span>
            </div>
            <div class="btns">
              <NButton size="tiny" @click="openAccess(a)">{{ t('common.edit') }}</NButton>
              <NButton size="tiny" type="error" quaternary @click="clearAccess(a)">{{ t('sharing.ftpTab.remove') }}</NButton>
            </div>
          </li>
        </ul>
        <p class="muted small">{{ t('sharing.ftpTab.accessHint') }}</p>
      </NCard>

      <!-- security & options -->
      <NCard size="small" :title="t('sharing.ftpTab.settingsTitle')">
        <div class="field">
          <label>{{ t('sharing.ftpTab.tls') }}</label>
          <NRadioGroup v-model:value="draft.tls" size="small">
            <NRadioButton value="">{{ t('sharing.ftpTab.tlsKeep') }}</NRadioButton>
            <NRadioButton value="optional">{{ t('sharing.ftpTab.tlsOptional') }}</NRadioButton>
            <NRadioButton value="required">{{ t('sharing.ftpTab.tlsRequired') }}</NRadioButton>
          </NRadioGroup>
          <p class="muted small">{{ t('sharing.ftpTab.tlsHint') }}</p>
          <NAlert v-if="draft.tls === 'required'" type="warning" :show-icon="false" class="gap">{{ t('sharing.ftpTab.tlsRequiredWarn') }}</NAlert>
        </div>
        <div class="field inline">
          <NSwitch v-model:value="draft.onlyAccounts" size="small" :disabled="ftpAccounts.length === 0 && !draft.onlyAccounts" />
          <span>{{ t('sharing.ftpTab.only') }}</span>
        </div>
        <p class="muted small">{{ t('sharing.ftpTab.onlyHint') }}</p>
        <NAlert v-if="lockedOut.length" type="warning" :show-icon="false" class="gap">{{ t('sharing.ftpTab.lockout', { users: lockedOut.join(', ') }) }}</NAlert>
        <div class="field inline">
          <NSwitch v-model:value="draft.noAnonymous" size="small" />
          <span>{{ t('sharing.ftpTab.noAnon') }}</span>
        </div>
        <div class="field">
          <label>{{ t('sharing.ftpTab.pasv') }}</label>
          <div class="pasv">
            <NInputNumber v-model:value="pasvMin" size="small" :show-button="false" :min="0" :max="65535" placeholder="40000" />
            <span>–</span>
            <NInputNumber v-model:value="pasvMax" size="small" :show-button="false" :min="0" :max="65535" placeholder="40100" />
          </div>
          <p v-if="pasvBad" class="err small">{{ t('sharing.ftpTab.pasvBad') }}</p>
          <p v-else class="muted small">{{ t('sharing.ftpTab.pasvHint') }}</p>
        </div>
        <NButton size="small" type="primary" :disabled="!dirty || pasvBad" @click="openAct({ kind: 'settings' })">{{ t('sharing.ftpTab.apply') }}</NButton>
        <p class="muted small">{{ t('sharing.ftpTab.restartNote') }}</p>
      </NCard>
    </template>

    <PasswordConfirmModal :show="!!act" :title="actTitle" :busy="busy" :error="error" :no-password="noPassword" :danger="act?.kind === 'unadopt' || (act?.kind === 'service' && act.action === 'stop')" @confirm="confirm" @close="act = null">
      <template v-if="act?.kind === 'adopt'">
        <p>{{ t('sharing.ftpDlg.adoptBody') }}</p>
        <ul class="bullets">
          <li>{{ t('sharing.ftpDlg.adoptPoint1') }}</li>
          <li>{{ t('sharing.ftpDlg.adoptPoint2') }}</li>
          <li>{{ t('sharing.ftpDlg.adoptPoint3') }}</li>
        </ul>
      </template>
      <template v-if="act?.kind === 'unadopt'">
        <p>{{ t('sharing.ftpDlg.unadoptBody') }}</p>
      </template>
      <template v-if="act?.kind === 'settings'">
        <p>{{ t('sharing.ftpDlg.settingsBody') }}</p>
        <NAlert v-if="lockedOut.length" type="warning" :show-icon="false" class="gap">{{ t('sharing.ftpTab.lockout', { users: lockedOut.join(', ') }) }}</NAlert>
      </template>
      <template v-if="act?.kind === 'service' && (act.action === 'start' || act.action === 'enable' || act.action === 'restart')">
        <p>{{ t('sharing.ftpDlg.exposeBody') }}</p>
      </template>
      <template v-if="act?.kind === 'service' && act.action === 'stop'">
        <p>{{ t('sharing.ftpDlg.stopBody') }}</p>
      </template>
    </PasswordConfirmModal>

    <NModal :show="editing !== null" preset="card" style="max-width: 560px" :title="editing ? t('sharing.ftpTab.editTitle', { name: editing }) : t('sharing.ftpTab.give')" :closable="!formBusy" :mask-closable="false" @update:show="(v: boolean) => !v && !formBusy && (editing = null)">
      <div class="field">
        <label>{{ t('sharing.ftpTab.account') }}</label>
        <NSelect v-model:value="form.name" size="small" :options="accountOptions" :disabled="!!editing" />
      </div>
      <div class="field">
        <label>{{ t('sharing.share.folder') }}</label>
        <FolderPicker v-model="form.path" :roots="data.roots" name="taros-ftp-path" />
      </div>
      <div class="field">
        <label>{{ t('sharing.ftpTab.mode') }}</label>
        <NSelect v-model:value="form.mode" size="small" :options="modeOptions" />
        <p class="muted small">{{ t('sharing.ftpTab.jailHint') }}</p>
      </div>
      <div class="field">
        <label>{{ t('sharing.account.password') }}<template v-if="!isFirst"> ({{ t('sharing.ftpTab.keepEmpty') }})</template></label>
        <NInput v-model:value="form.accountPw" type="password" show-password-on="click" size="small" :input-props="newPassword('taros-ftp-account-password')" />
      </div>
      <div v-if="isFirst || form.accountPw" class="field">
        <label>{{ t('sharing.account.passwordAgain') }}</label>
        <NInput v-model:value="form.accountPw2" type="password" show-password-on="click" size="small" :input-props="newPassword('taros-ftp-account-password2')" :status="pwMismatch ? 'error' : undefined" />
        <p v-if="pwMismatch" class="err small">{{ t('sharing.account.mismatch') }}</p>
        <p v-else class="muted small">{{ t('sharing.ftpTab.passwordHint') }}</p>
      </div>
      <div class="field">
        <NButton size="tiny" quaternary @click="advanced = !advanced">{{ advanced ? '▾' : '▸' }} {{ t('sharing.share.advanced') }}</NButton>
        <template v-if="advanced">
          <label>{{ t('sharing.share.runAs') }}</label>
          <NSelect v-model:value="form.runAs" size="small" :options="runAsOptions" />
          <p class="muted small">{{ t('sharing.share.runAsHint') }}</p>
        </template>
      </div>
      <NAlert v-if="formError" type="error" :show-icon="false" class="gap">{{ formError }}</NAlert>
      <div class="field">
        <label>{{ t('common.dashboardPassword') }}</label>
        <NInput v-model:value="formPw" type="password" show-password-on="click" size="small" :input-props="currentPassword('taros-ftp-confirm')" :placeholder="t('common.dashboardPassword')" @keyup.enter="formValid && !formBusy && saveAccess()" />
      </div>
      <div class="footer">
        <NButton size="small" :disabled="formBusy" @click="editing = null">{{ t('common.cancel') }}</NButton>
        <NButton size="small" type="primary" :loading="formBusy" :disabled="!formValid" @click="saveAccess">{{ t('common.save') }}</NButton>
      </div>
    </NModal>
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; }
.muted { color: var(--text-muted); margin: 6px 0; }
.small { font-size: 0.8rem; }
.err { color: var(--error, #d03050); margin: 6px 0; }
.gap { margin: 8px 0; }
.mono { font-family: var(--font-mono); font-size: 0.78rem; overflow-wrap: anywhere; }
.kv { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; font-size: 0.88rem; align-items: center; }
.kv span { color: var(--text-muted); }
.kv b { font-weight: 500; display: flex; gap: 6px; flex-wrap: wrap; overflow-wrap: anywhere; }
.cmd { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin: 8px 0; }
.cmd code { font-family: var(--font-mono); font-size: 0.8rem; padding: 4px 8px; border: 1px solid var(--border); border-radius: 6px; overflow-wrap: anywhere; }
.bullets { margin: 6px 0 10px; padding-left: 18px; font-size: 0.85rem; color: var(--text-muted); }
.rows { list-style: none; margin: 0; padding: 0; }
.rows li { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-top: 1px solid var(--border); flex-wrap: wrap; }
.rows li:first-child { border-top: 0; }
.rows .main { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 2px; }
.btns { display: flex; gap: 6px; }
.field { margin-bottom: 12px; }
.field > label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
.field.inline { display: flex; align-items: center; gap: 8px; margin-bottom: 4px; }
.pasv { display: flex; align-items: center; gap: 8px; }
.footer { display: flex; justify-content: flex-end; gap: 8px; }
</style>
