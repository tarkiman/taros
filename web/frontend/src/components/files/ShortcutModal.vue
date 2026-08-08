<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { NModal, NForm, NFormItem, NInput, NCheckbox, NButton, NAlert, NSpace } from 'naive-ui'
import { folderShortcutsApi } from '../../api/folderShortcuts'
import type { FolderShortcut } from '../../types/folderShortcuts'
import { ApiError } from '../../api/client'

const { t } = useI18n()

const props = defineProps<{
  show: boolean
  // Present when editing an existing shortcut (path stays read-only —
  // there's no folder picker in this modal, only the row action in
  // FilesView, which always creates against the folder actually being
  // browsed, ever supplies a fresh path).
  shortcut: FolderShortcut | null
  // Only used when shortcut is null (create mode).
  path: string
}>()
const emit = defineEmits<{ 'update:show': [boolean]; saved: [] }>()

const label = ref('')
const showInSidebar = ref(true)
const showOnDashboard = ref(true)
const error = ref('')
const saving = ref(false)

watch(
  () => props.show,
  (show) => {
    if (!show) return
    label.value = props.shortcut?.label ?? ''
    showInSidebar.value = props.shortcut?.showInSidebar ?? true
    showOnDashboard.value = props.shortcut?.showOnDashboard ?? true
    error.value = ''
  },
)

function close() {
  emit('update:show', false)
}

async function save() {
  saving.value = true
  error.value = ''
  try {
    const input = {
      label: label.value.trim(),
      path: props.shortcut?.path ?? props.path,
      showInSidebar: showInSidebar.value,
      showOnDashboard: showOnDashboard.value,
    }
    if (props.shortcut) {
      await folderShortcutsApi.update(props.shortcut.id, input)
    } else {
      await folderShortcutsApi.create(input)
    }
    emit('saved')
    close()
  } catch (e) {
    error.value = e instanceof ApiError ? e.message : t('files.shortcuts.saveFailed')
  } finally {
    saving.value = false
  }
}
</script>

<template>
  <NModal
    :show="show"
    preset="dialog"
    :title="shortcut ? t('files.shortcuts.editTitle') : t('files.shortcuts.addTitle')"
    style="width: 440px"
    @update:show="(v: boolean) => emit('update:show', v)"
  >
    <NForm label-placement="top" style="margin-top: 4px">
      <NFormItem :label="t('common.name')">
        <NInput v-model:value="label" :placeholder="shortcut ? shortcut.path : path" maxlength="40" show-count @keyup.enter="save" />
      </NFormItem>
      <NFormItem :label="t('files.shortcuts.pathLabel')">
        <code class="shortcut-path">{{ shortcut ? shortcut.path : path }}</code>
      </NFormItem>
      <NFormItem :label="t('files.shortcuts.showWhere')">
        <NSpace vertical :size="8">
          <NCheckbox v-model:checked="showInSidebar">{{ t('files.shortcuts.showInSidebar') }}</NCheckbox>
          <NCheckbox v-model:checked="showOnDashboard">{{ t('files.shortcuts.showOnDashboard') }}</NCheckbox>
        </NSpace>
      </NFormItem>
      <NAlert v-if="error" type="error" :show-icon="false">{{ error }}</NAlert>
    </NForm>
    <template #action>
      <NSpace>
        <NButton size="small" @click="close">{{ t('common.cancel') }}</NButton>
        <NButton size="small" type="primary" :loading="saving" @click="save">{{ t('common.save') }}</NButton>
      </NSpace>
    </template>
  </NModal>
</template>

<style scoped>
.shortcut-path {
  display: block;
  padding: 6px 10px;
  border-radius: 6px;
  background: var(--code-bg, rgba(128, 128, 128, 0.12));
  font-size: 0.82rem;
  word-break: break-all;
}
</style>
