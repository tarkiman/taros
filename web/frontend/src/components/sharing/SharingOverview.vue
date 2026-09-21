<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCard, NCheckbox, NSpace, NTag, useMessage } from 'naive-ui'
import { ApiError } from '../../api/client'
import { sharingApi, type Finding, type ServiceAction, type SharingResponse } from '../../api/sharing'
import PasswordConfirmModal from './PasswordConfirmModal.vue'

// Overview tab: what is on this machine (Samba / FTP, exposure findings) and
// the one-time "take over management" step. Everything that changes state goes
// through PasswordConfirmModal.
const props = defineProps<{ data: SharingResponse }>()
const emit = defineEmits<{ changed: [] }>()
const { t, te } = useI18n()
const message = useMessage()

const st = computed(() => props.data.status)
const smb = computed(() => st.value.smb)
// "not running as root" already has the page banner and the blocked-reason line.
const shownFindings = computed(() => st.value.findings.filter((f) => f.code !== 'not_root'))
const ftp = computed(() => st.value.ftp)

// Interfaces worth offering for SMB: never docker bridges or loopback.
const ifaceChoices = computed(() => st.value.interfaces.filter((i) => i.kind !== 'docker' && i.name !== 'lo'))
const lanDefault = computed(() => ifaceChoices.value.filter((i) => i.kind === 'ethernet' || i.kind === 'wifi').map((i) => i.name))

type Dlg = { kind: 'adopt' } | { kind: 'unadopt' } | { kind: 'interfaces' } | { kind: 'service'; action: ServiceAction }
const dlg = ref<Dlg | null>(null)
const busy = ref(false)
const error = ref('')
const chosen = ref<string[]>([])
const removeAccounts = ref(false)

function open(d: Dlg) {
  error.value = ''
  removeAccounts.value = false
  if (d.kind === 'adopt') chosen.value = [...lanDefault.value]
  if (d.kind === 'interfaces') chosen.value = [...props.data.model.interfaces]
  dlg.value = d
}

async function confirm(password: string) {
  const d = dlg.value
  if (!d) return
  busy.value = true
  error.value = ''
  try {
    if (d.kind === 'adopt') await sharingApi.adopt(chosen.value, password)
    else if (d.kind === 'unadopt') await sharingApi.unadopt(removeAccounts.value, password)
    else if (d.kind === 'interfaces') await sharingApi.setInterfaces(chosen.value, password)
    else await sharingApi.service(d.action, password)
    dlg.value = null
    message.success(t('sharing.done'))
    emit('changed')
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('sharing.failed')
  } finally {
    busy.value = false
  }
}

const dlgTitle = computed(() => {
  const d = dlg.value
  if (!d) return ''
  if (d.kind === 'service') return t(`sharing.service.${d.action}`)
  return t(`sharing.dlg.${d.kind}Title`)
})
// Stopping never needs the password (it only ever makes things less exposed).
const noPassword = computed(() => dlg.value?.kind === 'service' && (dlg.value.action === 'stop' || dlg.value.action === 'disable'))

function findingText(f: Finding): string {
  const key = `sharing.finding.${f.code}`
  return te(key) ? String(t(key, f.params ?? {})) : f.code
}
const findingType = (s: string) => (s === 'high' ? 'error' : s === 'warn' ? 'warning' : 'info')

const blockedKey = computed(() => (smb.value.manageBlocked ? `sharing.blocked.${smb.value.manageBlocked}` : ''))
const ifaceLabel = (name: string) => {
  const i = st.value.interfaces.find((x) => x.name === name)
  return i ? `${i.name} (${i.ip})` : name
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    message.success(t('sharing.copied'))
  } catch {
    message.error(t('sharing.copyFailed'))
  }
}
</script>

<template>
  <div class="stack">

    <NCard v-if="shownFindings.length" size="small" :title="t('sharing.findingsTitle')">
      <ul class="findings">
        <li v-for="f in shownFindings" :key="f.code + (f.service ?? '')">
          <NTag :type="findingType(f.severity)" size="small" :bordered="false">{{ t(`sharing.severity.${f.severity}`) }}</NTag>
          <NTag v-if="f.service" size="small" :bordered="false">{{ f.service.toUpperCase() }}</NTag>
          <span>{{ findingText(f) }}</span>
        </li>
      </ul>
    </NCard>

    <!-- SMB -->
    <NCard size="small" title="SMB (Samba)">
      <template #header-extra>
        <NTag v-if="!smb.installed" size="small" :bordered="false">{{ t('sharing.state.notInstalled') }}</NTag>
        <NTag v-else-if="smb.managed" type="success" size="small" :bordered="false">{{ t('sharing.state.managed') }}</NTag>
        <NTag v-else size="small" :bordered="false">{{ smb.shares.length ? t('sharing.state.foreign') : t('sharing.state.installed') }}</NTag>
      </template>

      <template v-if="!smb.installed">
        <p class="muted">{{ t('sharing.smbNotInstalled') }}</p>
        <div v-if="smb.install.command" class="cmd">
          <code>{{ smb.install.command }}</code>
          <NButton size="tiny" @click="copy(smb.install.command)">{{ t('sharing.copy') }}</NButton>
        </div>
        <p v-else class="muted">{{ t('sharing.unknownDistro', { packages: (smb.install.packages ?? []).join(', ') }) }}</p>
        <p class="muted small">{{ t('sharing.afterInstall') }}</p>
      </template>

      <template v-else>
        <div class="kv">
          <span>{{ t('sharing.version') }}</span><b>{{ smb.version || '—' }}</b>
          <span>{{ t('sharing.service.label') }}</span>
          <b>
            <NTag :type="smb.active ? 'success' : 'default'" size="small" :bordered="false">{{ smb.active ? t('sharing.state.running') : t('sharing.state.stopped') }}</NTag>
            <NTag size="small" :bordered="false">{{ smb.enabled ? t('sharing.state.autostart') : t('sharing.state.noAutostart') }}</NTag>
          </b>
          <span>{{ t('sharing.listening') }}</span>
          <b>{{ smb.listeners.length ? smb.listeners.map((l) => `${l.address}:${l.port}`).join(', ') : '—' }}</b>
          <template v-if="smb.managed">
            <span>{{ t('sharing.interfaces') }}</span>
            <b>{{ data.model.interfaces.length ? data.model.interfaces.map(ifaceLabel).join(', ') : t('sharing.allInterfaces') }}</b>
          </template>
        </div>

        <NAlert v-if="smb.configError" type="error" :show-icon="false" class="gap">{{ t('sharing.configError') }}: <code>{{ smb.configError }}</code></NAlert>
        <NAlert v-if="!smb.canManage" type="warning" :show-icon="false" class="gap">{{ t(blockedKey) }}</NAlert>

        <template v-if="smb.canManage && !smb.managed">
          <p class="muted">{{ smb.shares.length ? t('sharing.foreignIntro', { shares: smb.shares.length }) : t('sharing.emptyIntro') }}</p>
          <NButton type="primary" size="small" @click="open({ kind: 'adopt' })">{{ t('sharing.adopt') }}</NButton>
        </template>

        <NSpace v-if="smb.canManage && smb.managed" class="gap" :size="8">
          <NButton v-if="!smb.active" size="small" type="primary" @click="open({ kind: 'service', action: 'start' })">{{ t('sharing.service.start') }}</NButton>
          <NButton v-if="smb.active" size="small" @click="open({ kind: 'service', action: 'restart' })">{{ t('sharing.service.restart') }}</NButton>
          <NButton v-if="smb.active" size="small" @click="open({ kind: 'service', action: 'stop' })">{{ t('sharing.service.stop') }}</NButton>
          <NButton v-if="!smb.enabled" size="small" @click="open({ kind: 'service', action: 'enable' })">{{ t('sharing.service.enable') }}</NButton>
          <NButton v-else size="small" @click="open({ kind: 'service', action: 'disable' })">{{ t('sharing.service.disable') }}</NButton>
          <NButton size="small" @click="open({ kind: 'interfaces' })">{{ t('sharing.dlg.interfacesTitle') }}</NButton>
          <NButton size="small" type="warning" quaternary @click="open({ kind: 'unadopt' })">{{ t('sharing.unadopt') }}</NButton>
        </NSpace>
        <p v-if="smb.canManage && smb.managed && !smb.active && data.model.shares.length" class="muted small">{{ t('sharing.startHint') }}</p>
      </template>
    </NCard>

    <!-- FTP (report only in this version) -->
    <NCard size="small" title="FTP">
      <template #header-extra>
        <NTag v-if="!ftp.installed" size="small" :bordered="false">{{ t('sharing.state.notInstalled') }}</NTag>
        <NTag v-else-if="ftp.managed" type="success" size="small" :bordered="false">{{ t('sharing.state.managed') }} · {{ ftp.active ? t('sharing.state.running') : t('sharing.state.stopped') }}</NTag>
        <NTag v-else :type="ftp.active ? 'success' : 'default'" size="small" :bordered="false">{{ ftp.active ? t('sharing.state.running') : t('sharing.state.stopped') }}</NTag>
      </template>
      <template v-if="!ftp.installed">
        <p class="muted">{{ t('sharing.ftpNotInstalled') }}</p>
        <div v-if="ftp.install.command" class="cmd">
          <code>{{ ftp.install.command }}</code>
          <NButton size="tiny" @click="copy(ftp.install.command)">{{ t('sharing.copy') }}</NButton>
        </div>
      </template>
      <template v-else>
        <div class="kv">
          <span>{{ t('sharing.ftp.anonymous') }}</span><b>{{ ftp.config.anonymous ? t('common.yes') : t('common.no') }}</b>
          <span>{{ t('sharing.ftp.localLogin') }}</span><b>{{ ftp.config.localLogin ? t('common.yes') : t('common.no') }}</b>
          <span>{{ t('sharing.ftp.write') }}</span><b>{{ ftp.config.write ? t('common.yes') : t('common.no') }}</b>
          <span>{{ t('sharing.ftp.tls') }}</span><b>{{ ftp.config.tls ? t('common.yes') : t('common.no') }}</b>
          <span>{{ t('sharing.listening') }}</span>
          <b>{{ ftp.listeners.length ? ftp.listeners.map((l) => `${l.address}:${l.port}`).join(', ') : '—' }}</b>
          <template v-if="ftp.loginUsers?.length">
            <span>{{ t('sharing.ftp.loginUsers') }}</span><b>{{ ftp.loginUsers.join(', ') }}</b>
          </template>
        </div>
      </template>
      <p v-if="ftp.installed" class="muted small">{{ t('sharing.ftpSeeTab') }}</p>
    </NCard>

    <PasswordConfirmModal
      :show="!!dlg"
      :title="dlgTitle"
      :busy="busy"
      :error="error"
      :no-password="noPassword"
      :danger="dlg?.kind === 'unadopt' || (dlg?.kind === 'service' && dlg.action === 'stop')"
      @confirm="confirm"
      @close="dlg = null"
    >
      <template v-if="dlg?.kind === 'adopt'">
        <p>{{ t('sharing.dlg.adoptBody') }}</p>
        <ul class="bullets">
          <li>{{ t('sharing.dlg.adoptPoint1') }}</li>
          <li>{{ t('sharing.dlg.adoptPoint2') }}</li>
          <li>{{ t('sharing.dlg.adoptPoint3') }}</li>
        </ul>
      </template>
      <template v-if="dlg?.kind === 'adopt' || dlg?.kind === 'interfaces'">
        <p class="label">{{ t('sharing.dlg.pickInterfaces') }}</p>
        <div v-for="i in ifaceChoices" :key="i.name" class="iface">
          <NCheckbox
            :checked="chosen.includes(i.name)"
            @update:checked="(v: boolean) => (chosen = v ? [...chosen, i.name] : chosen.filter((n) => n !== i.name))"
          >
            {{ i.name }} <span class="muted">{{ i.ip }} · {{ i.kind }}</span>
          </NCheckbox>
        </div>
        <NAlert v-if="chosen.length === 0" type="warning" :show-icon="false" class="gap">{{ t('sharing.dlg.noInterfaceWarn') }}</NAlert>
        <NAlert
          v-else-if="chosen.some((n) => ['zerotier', 'tailscale'].includes(ifaceChoices.find((i) => i.name === n)?.kind ?? ''))"
          type="warning"
          :show-icon="false"
          class="gap"
        >
          {{ t('sharing.dlg.overlayWarn') }}
        </NAlert>
      </template>
      <template v-if="dlg?.kind === 'unadopt'">
        <p>{{ t('sharing.dlg.unadoptBody') }}</p>
        <NCheckbox v-model:checked="removeAccounts">{{ t('sharing.dlg.removeAccounts') }}</NCheckbox>
      </template>
      <template v-if="dlg?.kind === 'service' && (dlg.action === 'start' || dlg.action === 'enable' || dlg.action === 'restart')">
        <p>{{ t('sharing.dlg.exposeBody') }}</p>
      </template>
      <template v-if="dlg?.kind === 'service' && dlg.action === 'stop'">
        <p>{{ t('sharing.dlg.stopBody') }}</p>
      </template>
    </PasswordConfirmModal>
  </div>
</template>

<style scoped>
.stack { display: flex; flex-direction: column; gap: 12px; }
.muted { color: var(--text-muted); margin: 6px 0; }
.small { font-size: 0.8rem; }
.gap { margin: 8px 0; }
.label { margin: 10px 0 4px; font-size: 0.85rem; }
.findings { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 8px; }
.findings li { display: flex; align-items: baseline; gap: 6px; flex-wrap: wrap; font-size: 0.88rem; }
.kv { display: grid; grid-template-columns: max-content 1fr; gap: 6px 16px; font-size: 0.88rem; align-items: center; }
.kv span { color: var(--text-muted); }
.kv b { font-weight: 500; display: flex; gap: 6px; flex-wrap: wrap; overflow-wrap: anywhere; }
.cmd { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; margin: 8px 0; }
.cmd code { font-family: var(--font-mono); font-size: 0.8rem; padding: 4px 8px; border: 1px solid var(--border); border-radius: 6px; overflow-wrap: anywhere; }
.bullets { margin: 6px 0 0; padding-left: 18px; font-size: 0.85rem; color: var(--text-muted); }
.iface { margin: 4px 0; }
</style>
