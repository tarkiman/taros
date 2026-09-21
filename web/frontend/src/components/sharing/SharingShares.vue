<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NInput, NModal, NSelect, NSwitch, NTag, useMessage } from 'naive-ui'
import { ApiError } from '../../api/client'
import { sharingApi, type Folder, type Share, type SharingResponse } from '../../api/sharing'
import { currentPassword, noAutofill } from '../../utils/inputProps'
import PasswordConfirmModal from './PasswordConfirmModal.vue'

// Folders tab: the shares TarOS manages (create / edit / delete) plus, read-only,
// whatever else already exists in smb.conf.
const props = defineProps<{ data: SharingResponse }>()
const emit = defineEmits<{ changed: []; goto: [tab: string] }>()
const { t } = useI18n()
const message = useMessage()

const smb = computed(() => props.data.status.smb)
const enabled = computed(() => smb.value.installed && smb.value.canManage && smb.value.managed)
const activeAccounts = computed(() => props.data.model.accounts.filter((a) => !a.disabled))
const foreign = computed(() => smb.value.shares.filter((s) => !s.managed))

// ---- create / edit -------------------------------------------------------
const editing = ref<string | null>(null) // name being edited, '' = new, null = closed
const form = ref<Share>(blank())
const formPw = ref('')
const busy = ref(false)
const error = ref('')
const advanced = ref(false)

function blank(): Share {
  return { name: '', path: '', comment: '', browseable: true, access: [], runAs: '' }
}
function openNew() {
  form.value = blank()
  if (activeAccounts.value.length) form.value.access = [{ user: activeAccounts.value[0].name, mode: 'rw' }]
  begin('')
}
function openEdit(s: Share) {
  form.value = { ...s, access: s.access.map((a) => ({ ...a })) }
  begin(s.name)
}
function begin(name: string) {
  error.value = ''
  formPw.value = ''
  picking.value = false
  advanced.value = !!form.value.runAs
  editing.value = name
}

const accountOptions = computed(() => {
  // keep an already-assigned but now-disabled account visible so it isn't silently dropped
  const names = new Set(activeAccounts.value.map((a) => a.name))
  for (const a of form.value.access) names.add(a.user)
  return [...names].map((n) => ({ label: n, value: n }))
})
const modeOptions = computed(() => [
  { label: t('sharing.share.modeRw'), value: 'rw' },
  { label: t('sharing.share.modeRo'), value: 'ro' },
])
const runAsOptions = computed(() => [
  { label: t('sharing.share.runAsAuto'), value: '' },
  ...props.data.status.ordinaryUsers.map((u) => ({ label: u, value: u })),
])
function addAccess() {
  const used = new Set(form.value.access.map((a) => a.user))
  const next = activeAccounts.value.find((a) => !used.has(a.name))
  if (next) form.value.access.push({ user: next.name, mode: 'ro' })
}
const canAddAccess = computed(() => activeAccounts.value.some((a) => !form.value.access.some((x) => x.user === a.name)))
const valid = computed(() => form.value.name.trim() !== '' && form.value.path.trim() !== '' && form.value.access.length > 0 && formPw.value !== '')

async function save() {
  busy.value = true
  error.value = ''
  try {
    const s: Share = { ...form.value, name: form.value.name.trim(), path: form.value.path.trim() }
    await sharingApi.saveShare(s, editing.value ?? '', formPw.value)
    editing.value = null
    message.success(t('sharing.done'))
    emit('changed')
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('sharing.failed')
    if (e instanceof ApiError && (e.code === 'sharing_owned_by_root' || e.code === 'sharing_run_as_invalid')) advanced.value = true
  } finally {
    busy.value = false
  }
}

// ---- folder picker -------------------------------------------------------
const picking = ref(false)
const pickPath = ref('')
const pickFolders = ref<Folder[]>([])
const pickError = ref('')
async function browse(path: string) {
  pickError.value = ''
  try {
    pickFolders.value = (await sharingApi.folders(path)).folders
    pickPath.value = path
  } catch (e) {
    pickError.value = e instanceof ApiError ? e.message : t('sharing.failed')
  }
}
async function startPick() {
  picking.value = true
  const start = form.value.path.trim()
  await browse(start && props.data.roots.some((r) => start === r || start.startsWith(r + '/')) ? start : '')
}
function parentOf(p: string): string {
  const i = p.lastIndexOf('/')
  const up = i <= 0 ? '' : p.slice(0, i)
  return props.data.roots.some((r) => r === p) ? '' : up
}
function usePicked() {
  form.value.path = pickPath.value
  if (!form.value.name.trim()) form.value.name = pickPath.value.split('/').filter(Boolean).pop() ?? ''
  picking.value = false
}

// ---- delete --------------------------------------------------------------
const deleting = ref<string | null>(null)
const delBusy = ref(false)
const delError = ref('')
async function doDelete(password: string) {
  if (!deleting.value) return
  delBusy.value = true
  delError.value = ''
  try {
    await sharingApi.deleteShare(deleting.value, password)
    deleting.value = null
    message.success(t('sharing.done'))
    emit('changed')
  } catch (e) {
    delError.value = e instanceof ApiError ? e.message : t('sharing.failed')
  } finally {
    delBusy.value = false
  }
}

const accessText = (s: Share) => s.access.map((a) => `${a.user} (${a.mode === 'rw' ? t('sharing.share.rwShort') : t('sharing.share.roShort')})`).join(', ')
</script>

<template>
  <div class="stack">
    <NAlert v-if="!smb.installed" type="info" :show-icon="false">{{ t('sharing.needSmb') }}</NAlert>
    <NAlert v-else-if="!enabled" type="info" :show-icon="false">
      {{ t('sharing.needManaged') }}
      <NButton size="tiny" @click="emit('goto', 'overview')">{{ t('sharing.tab.overview') }}</NButton>
    </NAlert>

    <NCard size="small" :title="t('sharing.share.managedTitle')">
      <template #header-extra>
        <NButton size="small" type="primary" :disabled="!enabled" @click="openNew">{{ t('sharing.share.add') }}</NButton>
      </template>
      <p v-if="enabled && activeAccounts.length === 0" class="muted">
        {{ t('sharing.share.needAccount') }}
        <NButton size="tiny" @click="emit('goto', 'accounts')">{{ t('sharing.tab.accounts') }}</NButton>
      </p>
      <p v-else-if="data.model.shares.length === 0" class="muted">{{ t('sharing.share.none') }}</p>
      <ul v-else class="rows">
        <li v-for="s in data.model.shares" :key="s.name">
          <div class="main">
            <b>{{ s.name }}</b>
            <span class="mono">{{ s.path }}</span>
            <span class="muted small">{{ accessText(s) }}</span>
            <span v-if="s.comment" class="muted small">{{ s.comment }}</span>
          </div>
          <div class="btns">
            <NButton size="tiny" :disabled="!enabled" @click="openEdit(s)">{{ t('common.edit') }}</NButton>
            <NButton size="tiny" type="error" quaternary :disabled="!enabled" @click="(delError = ''), (deleting = s.name)">{{ t('common.delete') }}</NButton>
          </div>
        </li>
      </ul>
    </NCard>

    <NCard v-if="foreign.length" size="small" :title="t('sharing.share.foreignTitle')">
      <p class="muted small">{{ t('sharing.share.foreignHint') }}</p>
      <ul class="rows">
        <li v-for="s in foreign" :key="s.name">
          <div class="main">
            <b>{{ s.name }}</b>
            <span class="mono">{{ s.path }}</span>
            <span class="muted small">
              <NTag v-if="s.guestOk" type="warning" size="small" :bordered="false">{{ t('sharing.share.guest') }}</NTag>
              <NTag size="small" :bordered="false">{{ s.readOnly ? t('sharing.share.roShort') : t('sharing.share.rwShort') }}</NTag>
              <template v-if="s.validUsers?.length"> {{ s.validUsers.join(', ') }}</template>
            </span>
          </div>
        </li>
      </ul>
    </NCard>

    <!-- create / edit -->
    <NModal :show="editing !== null" preset="card" style="max-width: 560px" :title="editing ? t('sharing.share.editTitle', { name: editing }) : t('sharing.share.add')" :closable="!busy" :mask-closable="false" @update:show="(v: boolean) => !v && !busy && (editing = null)">
      <div class="field">
        <label>{{ t('sharing.share.name') }}</label>
        <NInput v-model:value="form.name" size="small" :input-props="noAutofill('taros-share-name')" :placeholder="t('sharing.share.namePh')" />
      </div>
      <div class="field">
        <label>{{ t('sharing.share.folder') }}</label>
        <div class="pathrow">
          <NInput v-model:value="form.path" size="small" :input-props="noAutofill('taros-share-path')" placeholder="/srv/…" />
          <NButton size="small" @click="startPick">{{ t('sharing.share.browse') }}</NButton>
        </div>
        <div v-if="picking" class="picker">
          <div class="pickhead">
            <span class="mono">{{ pickPath || t('sharing.share.roots') }}</span>
            <span class="spacer" />
            <NButton v-if="pickPath" size="tiny" @click="browse(parentOf(pickPath))">↑</NButton>
            <NButton v-if="pickPath" size="tiny" type="primary" @click="usePicked">{{ t('sharing.share.useFolder') }}</NButton>
            <NButton size="tiny" quaternary @click="picking = false">{{ t('common.close') }}</NButton>
          </div>
          <p v-if="pickError" class="err small">{{ pickError }}</p>
          <p v-else-if="pickFolders.length === 0" class="muted small">{{ t('sharing.share.noSubfolders') }}</p>
          <ul v-else class="folders">
            <li v-for="f in pickFolders" :key="f.path" @click="browse(f.path)">📁 {{ f.name }}</li>
          </ul>
        </div>
        <p class="muted small">{{ t('sharing.share.folderHint', { roots: data.roots.join(', ') }) }}</p>
      </div>
      <div class="field">
        <label>{{ t('sharing.share.comment') }}</label>
        <NInput v-model:value="form.comment" size="small" placeholder="" :input-props="noAutofill('taros-share-comment')" />
      </div>
      <div class="field">
        <label>{{ t('sharing.share.who') }}</label>
        <div v-for="(a, i) in form.access" :key="i" class="accessrow">
          <NSelect v-model:value="a.user" size="small" :options="accountOptions" style="flex: 1" />
          <NSelect v-model:value="a.mode" size="small" :options="modeOptions" style="width: 170px" />
          <NButton size="small" quaternary type="error" @click="form.access.splice(i, 1)">✕</NButton>
        </div>
        <NButton size="tiny" :disabled="!canAddAccess" @click="addAccess">{{ t('sharing.share.addAccess') }}</NButton>
        <p v-if="activeAccounts.length === 0" class="err small">{{ t('sharing.share.needAccount') }}</p>
        <p class="muted small">{{ t('sharing.share.whoHint') }}</p>
      </div>
      <div class="field inline">
        <NSwitch v-model:value="form.browseable" size="small" />
        <span>{{ t('sharing.share.browseable') }}</span>
      </div>
      <div class="field">
        <NButton size="tiny" quaternary @click="advanced = !advanced">{{ advanced ? '▾' : '▸' }} {{ t('sharing.share.advanced') }}</NButton>
        <template v-if="advanced">
          <label>{{ t('sharing.share.runAs') }}</label>
          <NSelect v-model:value="form.runAs" size="small" :options="runAsOptions" />
          <p class="muted small">{{ t('sharing.share.runAsHint') }}</p>
        </template>
      </div>
      <NAlert v-if="error" type="error" :show-icon="false" class="gap">{{ error }}</NAlert>
      <div class="field">
        <label>{{ t('common.dashboardPassword') }}</label>
        <NInput v-model:value="formPw" type="password" show-password-on="click" size="small" :input-props="currentPassword('taros-share-confirm')" :placeholder="t('common.dashboardPassword')" @keyup.enter="valid && !busy && save()" />
      </div>
      <div class="footer">
        <NButton size="small" :disabled="busy" @click="editing = null">{{ t('common.cancel') }}</NButton>
        <NButton size="small" type="primary" :loading="busy" :disabled="!valid" @click="save">{{ t('common.save') }}</NButton>
      </div>
    </NModal>

    <PasswordConfirmModal :show="deleting !== null" :title="t('sharing.share.deleteTitle', { name: deleting ?? '' })" danger :busy="delBusy" :error="delError" :confirm-label="t('common.delete')" @confirm="doDelete" @close="deleting = null">
      <p>{{ t('sharing.share.deleteBody') }}</p>
    </PasswordConfirmModal>
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; }
.muted { color: var(--text-muted); margin: 6px 0; }
.small { font-size: 0.8rem; }
.err { color: var(--error, #d03050); margin: 6px 0; }
.gap { margin: 8px 0; }
.mono { font-family: var(--font-mono); font-size: 0.78rem; overflow-wrap: anywhere; }
.rows { list-style: none; margin: 0; padding: 0; }
.rows li { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-top: 1px solid var(--border); flex-wrap: wrap; }
.rows li:first-child { border-top: 0; }
.rows .main { flex: 1; min-width: 200px; display: flex; flex-direction: column; gap: 2px; }
.btns { display: flex; gap: 6px; }
.field { margin-bottom: 12px; }
.field label { display: block; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
.field.inline { display: flex; align-items: center; gap: 8px; }
.pathrow { display: flex; gap: 8px; }
.picker { margin-top: 8px; border: 1px solid var(--border); border-radius: 8px; padding: 8px; }
.pickhead { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; flex-wrap: wrap; }
.spacer { flex: 1; }
.folders { list-style: none; margin: 0; padding: 0; max-height: 200px; overflow: auto; }
.folders li { padding: 5px 6px; cursor: pointer; border-radius: 4px; font-size: 0.88rem; }
.folders li:hover { background: var(--hover, rgba(128, 128, 128, 0.12)); }
.accessrow { display: flex; gap: 8px; margin-bottom: 6px; align-items: center; }
.footer { display: flex; justify-content: flex-end; gap: 8px; }
</style>
