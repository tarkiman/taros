<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { NButton, NInput } from 'naive-ui'
import { ApiError } from '../../api/client'
import { sharingApi, type Folder } from '../../api/sharing'
import { noAutofill } from '../../utils/inputProps'

// A folder path field with a browser that can only ever walk *inside* the
// allowed roots (the server decides what is listed).
const props = defineProps<{ modelValue: string; roots: string[]; name: string }>()
const emit = defineEmits<{ 'update:modelValue': [path: string]; picked: [path: string] }>()
const { t } = useI18n()

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
async function start() {
  picking.value = true
  const cur = props.modelValue.trim()
  await browse(cur && props.roots.some((r) => cur === r || cur.startsWith(r + '/')) ? cur : '')
}
function parentOf(p: string): string {
  const i = p.lastIndexOf('/')
  const up = i <= 0 ? '' : p.slice(0, i)
  return props.roots.some((r) => r === p) ? '' : up
}
function use() {
  emit('update:modelValue', pickPath.value)
  emit('picked', pickPath.value)
  picking.value = false
}
</script>

<template>
  <div>
    <div class="pathrow">
      <NInput :value="modelValue" size="small" :input-props="noAutofill(name)" placeholder="/srv/…" @update:value="(v: string) => emit('update:modelValue', v)" />
      <NButton size="small" @click="start">{{ t('sharing.share.browse') }}</NButton>
    </div>
    <div v-if="picking" class="picker">
      <div class="pickhead">
        <span class="mono">{{ pickPath || t('sharing.share.roots') }}</span>
        <span class="spacer" />
        <NButton v-if="pickPath" size="tiny" @click="browse(parentOf(pickPath))">↑</NButton>
        <NButton v-if="pickPath" size="tiny" type="primary" @click="use">{{ t('sharing.share.useFolder') }}</NButton>
        <NButton size="tiny" quaternary @click="picking = false">{{ t('common.close') }}</NButton>
      </div>
      <p v-if="pickError" class="err small">{{ pickError }}</p>
      <p v-else-if="pickFolders.length === 0" class="muted small">{{ t('sharing.share.noSubfolders') }}</p>
      <ul v-else class="folders">
        <li v-for="f in pickFolders" :key="f.path" @click="browse(f.path)">📁 {{ f.name }}</li>
      </ul>
    </div>
    <p class="muted small">{{ t('sharing.share.folderHint', { roots: roots.join(', ') }) }}</p>
  </div>
</template>

<style scoped>
.muted { color: var(--text-muted); margin: 6px 0; }
.small { font-size: 0.8rem; }
.err { color: var(--error, #d03050); margin: 6px 0; }
.mono { font-family: var(--font-mono); font-size: 0.78rem; overflow-wrap: anywhere; }
.pathrow { display: flex; gap: 8px; }
.picker { margin-top: 8px; border: 1px solid var(--border); border-radius: 8px; padding: 8px; }
.pickhead { display: flex; align-items: center; gap: 6px; margin-bottom: 6px; flex-wrap: wrap; }
.spacer { flex: 1; }
.folders { list-style: none; margin: 0; padding: 0; max-height: 200px; overflow: auto; }
.folders li { padding: 5px 6px; cursor: pointer; border-radius: 4px; font-size: 0.88rem; }
.folders li:hover { background: var(--hover, rgba(128, 128, 128, 0.12)); }
</style>
