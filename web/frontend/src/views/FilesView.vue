<script setup lang="ts">
import { computed, h, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  NCard,
  NSpace,
  NInput,
  NButton,
  NDataTable,
  NBreadcrumb,
  NBreadcrumbItem,
  NIcon,
  NPopconfirm,
  NModal,
  NProgress,
  NUpload,
  NEmpty,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns, UploadFileInfo } from 'naive-ui'
import { Folder, File as FileIcon, FolderPlus, FilePlus, Upload as UploadIcon, ArrowUp, Copy, Scissors, ClipboardPaste, Trash2, Pencil, Download, Eye, EyeOff } from '@lucide/vue'
import AppShell from '../layouts/AppShell.vue'
import { filesApi, watchJob } from '../api/files'
import { getCsrfToken } from '../api/client'
import { ApiError } from '../api/client'
import type { Entry, Breadcrumb, JobSnapshot } from '../types/files'
import { formatBytes, formatDate } from '../utils/format'

const route = useRoute()
const router = useRouter()
const message = useMessage()
const csrfToken = getCsrfToken()

// route.query.path is the *request* value (often empty — e.g. on first
// load before we know the jail root's real absolute path). resolvedPath
// is what the server actually resolved that to (Entry paths, breadcrumbs
// etc. must build off THIS, not the raw query — using the query value
// directly here was a real bug: fullPath('subfolder') built "/subfolder"
// instead of "<jail root>/subfolder", which Jail.Resolve then rejected
// as outside the root, silently leaving the old listing on screen.
const currentPath = computed(() => (typeof route.query.path === 'string' ? route.query.path : ''))
const resolvedPath = ref('')
const searchQuery = ref('')
const entries = ref<Entry[]>([])
const breadcrumbs = ref<Breadcrumb[]>([])
const parentPath = ref('')
const clipboardSize = ref(0)
const clipboardCut = ref(false)
const loading = ref(true)
const checkedKeys = ref<string[]>([])

// Purely a display preference (backend always returns everything, see
// internal/fileexplorer/list.go) — persisted client-side since it's not
// something that needs to sync across devices.
const SHOW_HIDDEN_KEY = 'taros-files-show-hidden'
const showHidden = ref(localStorage.getItem(SHOW_HIDDEN_KEY) === '1')
function toggleShowHidden() {
  showHidden.value = !showHidden.value
  localStorage.setItem(SHOW_HIDDEN_KEY, showHidden.value ? '1' : '0')
}
const visibleEntries = computed(() =>
  showHidden.value ? entries.value : entries.value.filter((e) => !e.name.startsWith('.')),
)

function navigateTo(path: string) {
  router.push({ path: '/files', query: path ? { path } : {} })
}

async function loadList() {
  loading.value = true
  try {
    const res = await filesApi.list(currentPath.value, searchQuery.value)
    resolvedPath.value = res.currentPath
    // First load has no ?path= yet (we don't know the jail root's real
    // absolute path client-side) — normalize the URL once we do, so it's
    // shareable/bookmarkable and consistent with every subsequent nav.
    if (!currentPath.value) {
      router.replace({ path: '/files', query: { path: res.currentPath } })
    }
    entries.value = res.entries
    breadcrumbs.value = res.breadcrumbs
    parentPath.value = res.parentPath
    clipboardSize.value = res.clipboardSize
    clipboardCut.value = res.clipboardCut
    checkedKeys.value = []
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : 'Gagal membaca direktori.')
  } finally {
    loading.value = false
  }
}

watch(currentPath, loadList)

let searchDebounce: ReturnType<typeof setTimeout> | undefined
watch(searchQuery, () => {
  if (searchDebounce) clearTimeout(searchDebounce)
  searchDebounce = setTimeout(loadList, 300)
})

function fullPath(name: string) {
  return `${resolvedPath.value}/${name}`.replace(/\/+/g, '/')
}

// --- prompt modal, shared by New Folder / New File / Rename ---
const promptShow = ref(false)
const promptTitle = ref('')
const promptValue = ref('')
let promptOnConfirm: ((value: string) => void) | null = null

function openPrompt(title: string, initial: string, onConfirm: (value: string) => void) {
  promptTitle.value = title
  promptValue.value = initial
  promptOnConfirm = onConfirm
  promptShow.value = true
}
function confirmPrompt() {
  const value = promptValue.value.trim()
  if (!value) return
  promptOnConfirm?.(value)
  promptShow.value = false
}

function newFolder() {
  openPrompt('Folder baru', '', async (name) => {
    try {
      await filesApi.mkdir(fullPath(name))
      loadList()
    } catch (e) {
      message.error(e instanceof ApiError ? e.message : 'Gagal membuat folder.')
    }
  })
}
function newFile() {
  openPrompt('File baru', '', async (name) => {
    try {
      await filesApi.createFile(fullPath(name))
      loadList()
    } catch (e) {
      message.error(e instanceof ApiError ? e.message : 'Gagal membuat file.')
    }
  })
}
function renameEntry(entry: Entry) {
  openPrompt(`Ganti nama "${entry.name}"`, entry.name, async (newName) => {
    try {
      await filesApi.rename(fullPath(entry.name), fullPath(newName))
      loadList()
    } catch (e) {
      message.error(e instanceof ApiError ? e.message : 'Gagal mengganti nama.')
    }
  })
}

async function removeEntry(entry: Entry) {
  try {
    await filesApi.remove(fullPath(entry.name))
    loadList()
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : `Gagal menghapus "${entry.name}".`)
  }
}

// Sequential, not parallel — matches the old behavior deliberately (avoid
// hammering the filesystem/job system with a burst of concurrent deletes).
async function removeSelected() {
  for (const name of checkedKeys.value) {
    try {
      await filesApi.remove(fullPath(name))
    } catch (e) {
      message.error(e instanceof ApiError ? e.message : `Gagal menghapus "${name}".`)
    }
  }
  loadList()
}

async function copySelected(cut: boolean) {
  const paths = checkedKeys.value.map(fullPath)
  try {
    if (cut) await filesApi.cut(paths)
    else await filesApi.copy(paths)
    checkedKeys.value = []
    loadList()
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : 'Gagal menyalin.')
  }
}

// --- paste job progress (SSE) ---
const activeJob = ref<JobSnapshot | null>(null)
let stopWatch: (() => void) | null = null

async function paste() {
  try {
    const { jobId } = await filesApi.paste(currentPath.value)
    stopWatch?.()
    stopWatch = watchJob(jobId, (snap) => {
      activeJob.value = snap
      if (snap.status !== 'running') {
        const delay = snap.status === 'done' ? 800 : 2500
        setTimeout(() => {
          activeJob.value = null
          loadList()
        }, delay)
      }
    })
  } catch (e) {
    message.error(e instanceof ApiError ? e.message : 'Gagal menempel.')
  }
}
function cancelJob() {
  if (activeJob.value) filesApi.cancelJob(activeJob.value.id)
}

// --- upload (NUpload handles the HTTP + per-file progress itself) ---
const uploadUrl = computed(() => `/api/files/upload?path=${encodeURIComponent(resolvedPath.value)}`)
function onUploadFinish({ file }: { file: UploadFileInfo }) {
  loadList()
  return file
}
function onUploadError() {
  message.error('Upload gagal.')
}

// --- lightweight whole-panel drag & drop, on top of NUpload's click path ---
const dragActive = ref(false)
async function onDrop(e: DragEvent) {
  e.preventDefault()
  dragActive.value = false
  const files = e.dataTransfer?.files
  if (!files || files.length === 0) return
  const form = new FormData()
  for (const f of Array.from(files)) form.append('file', f)
  const loadingMsg = message.loading(`Mengupload ${files.length} file…`, { duration: 0 })
  try {
    const res = await fetch(uploadUrl.value, { method: 'POST', headers: { 'X-CSRF-Token': csrfToken }, body: form })
    if (!res.ok) throw new Error(`upload gagal: ${res.status}`)
    loadingMsg.destroy()
    message.success('Upload selesai.')
    loadList()
  } catch (err) {
    loadingMsg.destroy()
    message.error(err instanceof Error ? err.message : 'Upload gagal.')
  }
}

const columns: DataTableColumns<Entry> = [
  { type: 'selection' },
  {
    title: 'Nama',
    key: 'name',
    minWidth: 180,
    ellipsis: { tooltip: true },
    render: (row) => {
      const icon = h(NIcon, { component: row.isDir ? Folder : FileIcon, size: 16, style: 'margin-right: 6px; vertical-align: -3px' })
      if (row.isDir) {
        return h(
          'a',
          { href: '#', class: 'entry-link', onClick: (ev: MouseEvent) => { ev.preventDefault(); navigateTo(fullPath(row.name)) } },
          [icon, row.name],
        )
      }
      return h(
        'a',
        {
          href: `/files/edit?path=${encodeURIComponent(fullPath(row.name))}`,
          class: 'entry-link',
          onClick: (ev: MouseEvent) => {
            if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return // let ctrl/middle-click open in a new tab normally
            ev.preventDefault()
            router.push({ path: '/files/edit', query: { path: fullPath(row.name) } })
          },
        },
        [icon, row.name],
      )
    },
  },
  { title: 'Ukuran', key: 'sizeBytes', width: 110, render: (row) => (row.isDir ? '—' : formatBytes(row.sizeBytes)) },
  { title: 'Pemilik', key: 'owner', width: 120 },
  { title: 'Diubah', key: 'modTime', width: 150, render: (row) => formatDate(row.modTime) },
  {
    title: 'Aksi',
    key: 'actions',
    width: 190,
    render: (row) =>
      h(NSpace, { size: 'small' }, () => [
        row.isDir
          ? null
          : h(
              NButton,
              { size: 'tiny', tag: 'a', href: filesApi.downloadUrl(fullPath(row.name)), title: 'Unduh', 'aria-label': `Unduh ${row.name}` },
              { icon: () => h(NIcon, { component: Download }) },
            ),
        row.isDir
          ? h(NButton, { size: 'tiny', tag: 'a', href: filesApi.downloadUrl(fullPath(row.name)) }, () => 'Zip')
          : null,
        h(
          NButton,
          { size: 'tiny', onClick: () => renameEntry(row), title: 'Ganti nama', 'aria-label': `Ganti nama ${row.name}` },
          { icon: () => h(NIcon, { component: Pencil }) },
        ),
        h(
          NPopconfirm,
          { onPositiveClick: () => removeEntry(row) },
          {
            trigger: () =>
              h(
                NButton,
                { size: 'tiny', type: 'error', ghost: true, title: 'Hapus', 'aria-label': `Hapus ${row.name}` },
                { icon: () => h(NIcon, { component: Trash2 }) },
              ),
            default: () => `Hapus "${row.name}"?`,
          },
        ),
      ]),
  },
]

onMounted(loadList)
onUnmounted(() => stopWatch?.())
</script>

<template>
  <AppShell>
    <div class="files-toolbar">
      <NBreadcrumb>
        <NBreadcrumbItem v-for="b in breadcrumbs" :key="b.path" @click="navigateTo(b.path)">{{ b.name }}</NBreadcrumbItem>
      </NBreadcrumb>
      <NSpace align="center" :size="8" style="margin-top: 8px">
        <NButton v-if="parentPath" size="small" @click="navigateTo(parentPath)">
          <template #icon><NIcon :component="ArrowUp" /></template>
          Naik
        </NButton>
        <NInput v-model:value="searchQuery" placeholder="Cari di folder ini…" clearable style="width: 220px" />
        <NButton size="small" @click="newFolder"><template #icon><NIcon :component="FolderPlus" /></template>Folder Baru</NButton>
        <NButton size="small" @click="newFile"><template #icon><NIcon :component="FilePlus" /></template>File Baru</NButton>
        <NUpload
          :action="uploadUrl"
          :headers="{ 'X-CSRF-Token': csrfToken }"
          name="file"
          multiple
          :show-file-list="true"
          @finish="onUploadFinish"
          @error="onUploadError"
        >
          <NButton size="small"><template #icon><NIcon :component="UploadIcon" /></template>Upload</NButton>
        </NUpload>
        <NButton v-if="clipboardSize > 0" size="small" type="primary" ghost @click="paste">
          <template #icon><NIcon :component="ClipboardPaste" /></template>
          Tempel ({{ clipboardSize }}{{ clipboardCut ? ', pindah' : '' }})
        </NButton>
        <NButton
          size="small"
          :title="showHidden ? 'Sembunyikan file tersembunyi' : 'Tampilkan file tersembunyi'"
          :aria-label="showHidden ? 'Sembunyikan file tersembunyi' : 'Tampilkan file tersembunyi'"
          @click="toggleShowHidden"
        >
          <template #icon><NIcon :component="showHidden ? EyeOff : Eye" /></template>
          {{ showHidden ? 'Sembunyikan Titik' : 'Tampilkan Titik' }}
        </NButton>
      </NSpace>
      <NSpace v-if="checkedKeys.length > 0" align="center" :size="8" style="margin-top: 8px">
        <span class="text-muted">{{ checkedKeys.length }} dipilih</span>
        <NButton size="small" @click="copySelected(false)"><template #icon><NIcon :component="Copy" /></template>Salin</NButton>
        <NButton size="small" @click="copySelected(true)"><template #icon><NIcon :component="Scissors" /></template>Potong</NButton>
        <NPopconfirm @positive-click="removeSelected">
          <template #trigger>
            <NButton size="small" type="error" ghost><template #icon><NIcon :component="Trash2" /></template>Hapus</NButton>
          </template>
          Hapus {{ checkedKeys.length }} item terpilih?
        </NPopconfirm>
      </NSpace>
    </div>

    <NCard
      class="files-drop-zone"
      :class="{ 'files-drop-zone--active': dragActive }"
      @dragover.prevent="dragActive = true"
      @dragleave.prevent="dragActive = false"
      @drop="onDrop"
    >
      <NEmpty v-if="!loading && entries.length === 0" description="Folder kosong." />
      <NEmpty
        v-else-if="!loading && visibleEntries.length === 0"
        description="Semua isi folder ini tersembunyi (diawali titik)."
      >
        <template #extra>
          <NButton size="small" @click="toggleShowHidden"><template #icon><NIcon :component="Eye" /></template>Tampilkan Titik</NButton>
        </template>
      </NEmpty>
      <NDataTable
        v-else
        :columns="columns"
        :data="visibleEntries"
        :loading="loading"
        :row-key="(r: Entry) => r.name"
        v-model:checked-row-keys="checkedKeys"
        :scroll-x="800"
      />
    </NCard>

    <NModal v-model:show="promptShow" preset="dialog" :title="promptTitle" positive-text="OK" negative-text="Batal" @positive-click="confirmPrompt">
      <NInput v-model:value="promptValue" @keyup.enter="confirmPrompt" autofocus />
    </NModal>

    <div v-if="activeJob" class="job-panel">
      <NCard size="small" :title="activeJob.kind === 'move' ? 'Memindahkan…' : 'Menyalin…'">
        <NProgress type="line" :percentage="Math.round(activeJob.percentDone)" :status="activeJob.status === 'failed' ? 'error' : 'default'" />
        <p class="job-detail">
          {{ formatBytes(activeJob.copiedBytes) }} / {{ formatBytes(activeJob.totalBytes) }}
          — {{ formatBytes(activeJob.bytesPerSec) }}/s
        </p>
        <p class="job-detail" v-if="activeJob.currentFile">{{ activeJob.currentFile }}</p>
        <p class="job-detail" v-if="activeJob.error">{{ activeJob.error }}</p>
        <NButton v-if="activeJob.status === 'running'" size="small" @click="cancelJob">Batalkan</NButton>
      </NCard>
    </div>
  </AppShell>
</template>

<style scoped>
.files-toolbar {
  margin-bottom: 16px;
}

.text-muted {
  color: var(--text-muted);
}

.files-drop-zone {
  transition: outline var(--transition-fast, 120ms ease);
  outline: 2px dashed transparent;
  outline-offset: -2px;
}

.files-drop-zone--active {
  outline-color: var(--accent);
}

.entry-link {
  color: inherit;
  text-decoration: none;
}
.entry-link:hover {
  text-decoration: underline;
}

.job-panel {
  position: fixed;
  right: 24px;
  bottom: 24px;
  width: 320px;
  z-index: 100;
}

.job-detail {
  color: var(--text-muted);
  font-size: 0.85rem;
  margin: 4px 0;
  word-break: break-all;
}
</style>
