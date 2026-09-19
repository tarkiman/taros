<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NAlert, NButton, NCheckbox, NInput, NModal, NSpin } from 'naive-ui'
import { dockerApi, type ProjectPlan, type UninstallStep } from '../api/docker'
import { ApiError } from '../api/client'

// Uninstalls one docker compose project. Containers + networks always go;
// volumes (the app's data) and images are opt-in. The server re-checks the
// dashboard password and the typed name — see handleDockerProjectUninstall.
const props = defineProps<{ show: boolean; name: string }>()
const emit = defineEmits<{ (e: 'update:show', v: boolean): void; (e: 'done'): void }>()
const { t } = useI18n()

const loading = ref(false)
const plan = ref<ProjectPlan | null>(null)
const loadError = ref('')

const removeVolumes = ref(false)
const removeImages = ref(false)
const typed = ref('')
const password = ref('')
const working = ref(false)
const error = ref('')
const result = ref<UninstallStep[] | null>(null)

function reset() {
  plan.value = null
  loadError.value = ''
  removeVolumes.value = false
  removeImages.value = false
  typed.value = ''
  password.value = ''
  error.value = ''
  result.value = null
}

watch(
  () => [props.show, props.name] as const,
  async ([open, name]) => {
    reset()
    if (!open || !name) return
    loading.value = true
    try {
      plan.value = await dockerApi.uninstallPlan(name)
    } catch (e) {
      loadError.value = e instanceof ApiError ? e.message : t('docker.apps.uninstall.loadFailed')
    } finally {
      loading.value = false
    }
  },
)

const canSubmit = computed(() => !!plan.value && typed.value === props.name && !!password.value && !working.value)
const volumeNames = computed(() => (plan.value?.volumes ?? []).join(', '))
const failed = computed(() => (result.value ?? []).filter((s) => !s.ok))
const okCount = computed(() => (result.value ?? []).filter((s) => s.ok).length)

async function submit() {
  if (!canSubmit.value) return
  working.value = true
  error.value = ''
  try {
    result.value = (
      await dockerApi.uninstallProject(props.name, {
        password: password.value,
        confirmName: typed.value,
        removeVolumes: removeVolumes.value,
        removeImages: removeImages.value,
      })
    ).steps
    password.value = ''
    emit('done')
  } catch (e) {
    error.value = e instanceof ApiError && e.status === 403 ? t('common.wrongPassword') : e instanceof ApiError ? e.message : t('docker.apps.uninstall.failed')
  } finally {
    working.value = false
  }
}

// The dialog can't be dismissed mid-request — closing wouldn't cancel it.
function close() {
  if (!working.value) emit('update:show', false)
}
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    :title="result ? t('docker.apps.uninstall.doneTitle') : t('docker.apps.uninstall.title', { name })"
    style="max-width: 520px"
    :closable="!working"
    :mask-closable="false"
    :close-on-esc="!working"
    @update:show="close"
  >
    <div v-if="loading" class="center"><NSpin /> <span class="text-muted">{{ t('docker.apps.uninstall.loading') }}</span></div>
    <NAlert v-else-if="loadError" type="error" :title="loadError" />

    <template v-else-if="result">
      <NAlert v-if="failed.length === 0" type="success" :show-icon="false">{{ t('docker.apps.uninstall.doneOk', { count: okCount }) }}</NAlert>
      <template v-else>
        <p class="text-muted">{{ t('docker.apps.uninstall.doneOk', { count: okCount }) }}</p>
        <NAlert type="warning" :title="t('docker.apps.uninstall.doneFailed', { count: failed.length })">
          <ul class="fail-list">
            <li v-for="s in failed" :key="s.kind + s.name">
              <strong>{{ t(`docker.apps.uninstall.kind.${s.kind}`) }} {{ s.name }}</strong>
              <span class="text-muted"> — {{ s.error }}</span>
            </li>
          </ul>
        </NAlert>
      </template>
    </template>

    <template v-else-if="plan">
      <div class="block">
        <div class="label">{{ t('docker.apps.uninstall.willRemove') }}</div>
        <div class="row">{{ t('docker.apps.uninstall.containers', { count: plan.containers.length }) }}: <span class="mono">{{ plan.containers.map((c) => c.service || c.name).join(', ') }}</span></div>
        <div v-if="plan.networks.length" class="row">{{ t('docker.apps.uninstall.networks', { count: plan.networks.length }) }}: <span class="mono">{{ plan.networks.join(', ') }}</span></div>
      </div>

      <div v-if="plan.volumes.length" class="block">
        <NCheckbox v-model:checked="removeVolumes" :disabled="working">
          <span class="danger-text">{{ t('docker.apps.uninstall.removeVolumes') }}</span>
        </NCheckbox>
        <p v-if="removeVolumes" class="hint danger-text">{{ t('docker.apps.uninstall.volumesWarn', { names: volumeNames }) }}</p>
        <p v-else class="hint text-muted">{{ t('docker.apps.uninstall.keepVolumes', { names: volumeNames }) }}</p>
      </div>

      <div v-if="plan.images.length" class="block">
        <NCheckbox v-model:checked="removeImages" :disabled="working">{{ t('docker.apps.uninstall.removeImages', { count: plan.images.length }) }}</NCheckbox>
        <p class="hint text-muted">{{ t('docker.apps.uninstall.imagesHint') }}</p>
      </div>

      <p class="note text-muted">{{ t('docker.apps.uninstall.keepNote') }}</p>

      <div class="block">
        <div class="label">{{ t('docker.apps.uninstall.typeName') }}: <span class="mono">{{ name }}</span></div>
        <NInput v-model:value="typed" size="small" :disabled="working" :placeholder="name" autocomplete="off" />
      </div>
      <div class="block">
        <NInput
          v-model:value="password"
          type="password"
          show-password-on="click"
          size="small"
          :disabled="working"
          :placeholder="t('docker.apps.uninstall.password')"
          autocomplete="current-password"
          @keyup.enter="submit"
        />
      </div>
      <NAlert v-if="error" type="error" :title="error" class="block" />
      <p v-if="working" class="hint text-muted">{{ t('docker.apps.uninstall.working') }}</p>
    </template>

    <template #footer>
      <div class="footer">
        <NButton v-if="result" type="primary" @click="close">{{ t('docker.apps.uninstall.close') }}</NButton>
        <template v-else>
          <NButton :disabled="working" @click="close">{{ t('common.cancel') }}</NButton>
          <NButton type="error" :loading="working" :disabled="!canSubmit" @click="submit">{{ t('docker.apps.uninstall.confirm') }}</NButton>
        </template>
      </div>
    </template>
  </NModal>
</template>

<style scoped>
.center { display: flex; align-items: center; gap: 10px; padding: 12px 0; }
.block { margin-bottom: 14px; }
.label { font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px; }
.row { font-size: 0.88rem; margin: 2px 0; }
.mono { font-family: var(--font-mono); font-size: 0.82rem; }
.hint { font-size: 0.78rem; margin: 4px 0 0 24px; }
p.note { font-size: 0.78rem; margin: 0 0 14px; }
.danger-text { color: var(--danger); }
.text-muted { color: var(--text-muted); }
.fail-list { margin: 4px 0 0; padding-left: 18px; font-size: 0.82rem; }
.footer { display: flex; justify-content: flex-end; gap: 8px; }
</style>
