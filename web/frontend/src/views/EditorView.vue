<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { NButton, NCheckbox, NIcon, NAlert, NSpin, useDialog, useMessage } from 'naive-ui'
import { ArrowLeft, Save } from '@lucide/vue'
import AppShell from '../layouts/AppShell.vue'
import { contentApi } from '../api/content'
import { filesApi } from '../api/files'
import { ApiError } from '../api/client'
import { createEditor } from '../editor/codemirror'
import { useTheme } from '../composables/useTheme'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()
const dialog = useDialog()
const message = useMessage()
const prefersDark = useTheme()

const filePath = computed(() => (typeof route.query.path === 'string' ? route.query.path : ''))
const filename = computed(() => filePath.value.split('/').pop() || filePath.value)
const parentPath = computed(() => filePath.value.split('/').slice(0, -1).join('/') || '/')
const draftKey = computed(() => `tk-draft:${filePath.value}`)

const loading = ref(true)
const loadError = ref<{ status: number; message: string } | null>(null)
const dirty = ref(false)
const saveStatus = ref('')
const wordWrap = ref(localStorage.getItem('tk-wordwrap') === '1')

const mountEl = ref<HTMLElement | null>(null)
let editor: ReturnType<typeof createEditor> | null = null
let expectedModTime = ''
let draftDebounce: ReturnType<typeof setTimeout> | undefined

function setDirty(v: boolean) {
  dirty.value = v
}

function scheduleDraftSave() {
  if (draftDebounce) clearTimeout(draftDebounce)
  draftDebounce = setTimeout(() => {
    if (dirty.value && editor) {
      localStorage.setItem(draftKey.value, editor.getValue())
    }
  }, 3000)
}

async function doSave(content: string, force = false) {
  try {
    const res = await contentApi.save(filePath.value, content, force ? undefined : expectedModTime)
    expectedModTime = res.modTime
    setDirty(false)
    localStorage.removeItem(draftKey.value)
    saveStatus.value = t('editor.saved', { time: new Date().toLocaleTimeString() })
  } catch (e) {
    if (e instanceof ApiError && e.status === 409) {
      dialog.warning({
        title: t('editor.saveConflictTitle'),
        content: t('editor.saveConflictBody'),
        positiveText: t('editor.overwrite'),
        negativeText: t('editor.reload'),
        onPositiveClick: () => doSave(content, true),
        onNegativeClick: () => window.location.reload(),
      })
      return
    }
    const msg = e instanceof ApiError ? e.message : t('editor.saveFailed')
    saveStatus.value = t('editor.saveFailedWithMsg', { msg })
    message.error(msg)
  }
}

function handleSaveClick() {
  if (editor) doSave(editor.getValue())
}

function handleWordWrapChange(checked: boolean) {
  wordWrap.value = checked
  localStorage.setItem('tk-wordwrap', checked ? '1' : '0')
  editor?.setWordWrap(checked)
}

function beforeUnloadHandler(e: BeforeUnloadEvent) {
  if (dirty.value) {
    e.preventDefault()
    e.returnValue = ''
  }
}

async function init() {
  loading.value = true
  loadError.value = null
  try {
    const res = await contentApi.get(filePath.value)
    expectedModTime = res.modTime

    let initialContent = res.content
    const draft = localStorage.getItem(draftKey.value)
    if (draft !== null && draft !== res.content) {
      const useDraft = await new Promise<boolean>((resolve) => {
        dialog.info({
          title: t('editor.draftFoundTitle'),
          content: t('editor.draftFoundBody'),
          positiveText: t('editor.useDraft'),
          negativeText: t('editor.discardDraft'),
          onPositiveClick: () => resolve(true),
          onNegativeClick: () => resolve(false),
          onClose: () => resolve(false),
        })
      })
      if (useDraft) {
        initialContent = draft
      } else {
        localStorage.removeItem(draftKey.value)
      }
    }

    loading.value = false
    // mountEl only exists in the DOM once the v-else branch renders —
    // wait for that render to flush before touching the ref, otherwise
    // mountEl.value is still null from the previous (loading) render.
    await nextTick()
    if (mountEl.value) {
      editor = createEditor({
        container: mountEl.value,
        doc: initialContent,
        filename: filename.value,
        dark: prefersDark.value,
        wordWrap: wordWrap.value,
        onChange: () => {
          setDirty(true)
          scheduleDraftSave()
        },
        onSave: (content) => doSave(content),
      })
      if (initialContent !== res.content) setDirty(true)
    }
  } catch (e) {
    loading.value = false
    loadError.value = e instanceof ApiError ? { status: e.status, message: e.message } : { status: 0, message: t('editor.loadFailed') }
  }
}

watch(prefersDark, (isDark) => editor?.setTheme(isDark))

onMounted(() => {
  init()
  window.addEventListener('beforeunload', beforeUnloadHandler)
})
onBeforeUnmount(() => {
  window.removeEventListener('beforeunload', beforeUnloadHandler)
})
onUnmounted(() => {
  editor?.destroy()
  if (draftDebounce) clearTimeout(draftDebounce)
})

function goBack() {
  router.push({ path: '/files', query: { path: parentPath.value } })
}
</script>

<template>
  <AppShell>
    <div class="editor-page">
      <div class="editor-toolbar">
        <NButton size="small" quaternary @click="goBack">
          <template #icon><NIcon :component="ArrowLeft" /></template>
          {{ t('common.back') }}
        </NButton>
        <span class="filename">{{ filename }}</span>
        <span v-if="dirty" class="dirty-badge">{{ t('editor.unsaved') }}</span>
        <span class="spacer" />
        <NCheckbox :checked="wordWrap" @update:checked="handleWordWrapChange">Word wrap</NCheckbox>
        <NButton size="small" type="primary" @click="handleSaveClick">
          <template #icon><NIcon :component="Save" /></template>
          {{ t('editor.saveButton') }}
        </NButton>
      </div>

      <NAlert v-if="loadError" type="warning" :title="t('editor.cannotOpenTitle')">
        {{ loadError.status === 413 ? t('editor.tooLarge') : loadError.status === 415 ? t('editor.looksBinary') : loadError.message }}
        <template v-if="loadError.status === 413 || loadError.status === 415">
          <br />
          <a :href="filesApi.downloadUrl(filePath)">{{ t('editor.downloadThis') }}</a> {{ t('editor.viewOutside') }}
        </template>
      </NAlert>
      <div v-else-if="loading" class="editor-loading"><NSpin size="large" /></div>
      <div v-else ref="mountEl" class="editor-mount"></div>

      <p class="editor-status">{{ saveStatus }}</p>
    </div>
  </AppShell>
</template>

<style scoped>
.editor-page {
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.editor-toolbar {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.filename {
  font-weight: 600;
}

.dirty-badge {
  background: var(--warning-soft);
  color: var(--warning);
  font-size: 0.75rem;
  font-weight: 600;
  padding: 2px 8px;
  border-radius: var(--radius-sm);
}

.spacer {
  flex: 1;
}

.editor-mount {
  flex: 1;
  min-height: 0;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  overflow: hidden;
}

.editor-mount :deep(.cm-editor) {
  height: 100%;
}

.editor-mount :deep(.cm-scroller) {
  overflow: auto;
}

.editor-loading {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
}

.editor-status {
  color: var(--text-muted);
  font-size: 0.85rem;
  min-height: 1.2em;
  margin: 0;
}
</style>
