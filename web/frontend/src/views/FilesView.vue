<script setup lang="ts">
import { computed, h, onMounted, onUnmounted, reactive, ref, watch } from 'vue'
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
  NCheckbox,
  useMessage,
} from 'naive-ui'
import type { DataTableColumns, UploadFileInfo } from 'naive-ui'
import {
  FolderPlus,
  FilePlus,
  Upload as UploadIcon,
  ArrowUp,
  Copy,
  Scissors,
  ClipboardPaste,
  Trash2,
  Pencil,
  Download,
  Eye,
  EyeOff,
  List as ListIcon,
  LayoutGrid,
  PanelLeftClose,
  PanelLeftOpen,
} from '@lucide/vue'
import AppShell from '../layouts/AppShell.vue'
import FileTree from '../components/files/FileTree.vue'
import FilePreviewOverlay from '../components/files/FilePreviewOverlay.vue'
import { isImage, isPreviewable, iconFor } from '../components/files/filetypes'
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

// --- view mode (list/grid) + sidebar collapse — both persisted the same
// way as showHidden above, both purely cosmetic client preferences. ---
const VIEW_MODE_KEY = 'taros-files-view-mode'
const viewMode = ref<'list' | 'grid'>(localStorage.getItem(VIEW_MODE_KEY) === 'grid' ? 'grid' : 'list')
function setViewMode(mode: 'list' | 'grid') {
  viewMode.value = mode
  localStorage.setItem(VIEW_MODE_KEY, mode)
}
const SIDEBAR_KEY = 'taros-files-sidebar-open'
// No stored preference yet → default open on desktop, closed on narrow
// screens (matches the 860px breakpoint below) so a first-time mobile
// visit isn't greeted with the tree pushing the actual file list off
// screen. Once someone toggles it explicitly, that choice sticks
// regardless of viewport width, same as every other persisted
// preference in this view.
const storedSidebarPref = localStorage.getItem(SIDEBAR_KEY)
const sidebarOpen = ref(storedSidebarPref !== null ? storedSidebarPref !== '0' : window.innerWidth > 860)
function toggleSidebar() {
  sidebarOpen.value = !sidebarOpen.value
  localStorage.setItem(SIDEBAR_KEY, sidebarOpen.value ? '1' : '0')
}

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

function editorHref(entry: Entry) {
  return `/files/edit?path=${encodeURIComponent(fullPath(entry.name))}`
}
// Previewable files (image/video/audio/pdf) link straight to their raw
// content — mainly so ctrl/middle-click opens the actual file in a new tab
// instead of the code editor's "this looks binary" fallback.
function entryHref(entry: Entry) {
  if (entry.isDir) return '#'
  if (isPreviewable(entry.name)) return filesApi.downloadUrl(fullPath(entry.name))
  return editorHref(entry)
}
function openEntry(ev: MouseEvent, entry: Entry) {
  if (entry.isDir) {
    ev.preventDefault()
    navigateTo(fullPath(entry.name))
    return
  }
  if (ev.ctrlKey || ev.metaKey || ev.shiftKey || ev.button !== 0) return // let ctrl/middle-click open in a new tab normally
  ev.preventDefault()
  if (isPreviewable(entry.name)) {
    previewEntry.value = entry
    return
  }
  router.push({ path: '/files/edit', query: { path: fullPath(entry.name) } })
}

// --- preview overlay (image/video/audio/pdf), opened in place instead of
// navigating away — images support prev/next across the current folder's
// other images, same "gallery" convention as most file managers. ---
const previewEntry = ref<Entry | null>(null)
const previewImages = computed(() => visibleEntries.value.filter((e) => !e.isDir && isImage(e.name)))
function toggleChecked(name: string) {
  const i = checkedKeys.value.indexOf(name)
  if (i === -1) checkedKeys.value.push(name)
  else checkedKeys.value.splice(i, 1)
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

// --- image thumbnails (grid view); icon/extension classification lives in
// components/files/filetypes.ts, shared with FilePreviewOverlay.vue ---
// Reactive Set so v-if in the template updates when a thumbnail 404s/
// errors — falls back to the type icon instead of a broken-image glyph.
const thumbFailed = reactive(new Set<string>())

const columns: DataTableColumns<Entry> = [
  { type: 'selection' },
  {
    title: 'Nama',
    key: 'name',
    minWidth: 180,
    ellipsis: { tooltip: true },
    sorter: (a, b) => a.name.localeCompare(b.name),
    render: (row) => {
      const icon = h(NIcon, { component: iconFor(row), size: 16, style: 'margin-right: 6px; vertical-align: -3px' })
      return h(
        'a',
        {
          href: entryHref(row),
          class: 'entry-link',
          onClick: (ev: MouseEvent) => openEntry(ev, row),
        },
        [icon, row.name],
      )
    },
  },
  {
    title: 'Ukuran',
    key: 'sizeBytes',
    width: 110,
    sorter: (a, b) => a.sizeBytes - b.sizeBytes,
    render: (row) => (row.isDir ? '—' : formatBytes(row.sizeBytes)),
  },
  { title: 'Pemilik', key: 'owner', width: 120, sorter: (a, b) => a.owner.localeCompare(b.owner) },
  { title: 'Diubah', key: 'modTime', width: 150, sorter: (a, b) => Date.parse(a.modTime) - Date.parse(b.modTime), render: (row) => formatDate(row.modTime) },
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
      <NSpace align="center" :size="8">
        <button type="button" class="sidebar-toggle" :title="sidebarOpen ? 'Sembunyikan panel folder' : 'Tampilkan panel folder'" @click="toggleSidebar">
          <NIcon :component="sidebarOpen ? PanelLeftClose : PanelLeftOpen" size="17" />
        </button>
        <NBreadcrumb>
          <NBreadcrumbItem v-for="b in breadcrumbs" :key="b.path" @click="navigateTo(b.path)">{{ b.name }}</NBreadcrumbItem>
        </NBreadcrumb>
      </NSpace>
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
          :type="showHidden ? 'primary' : 'default'"
          :ghost="showHidden"
          :title="showHidden ? 'Sembunyikan file tersembunyi' : 'Tampilkan file tersembunyi'"
          :aria-label="showHidden ? 'Sembunyikan file tersembunyi' : 'Tampilkan file tersembunyi'"
          @click="toggleShowHidden"
        >
          <template #icon><NIcon :component="showHidden ? EyeOff : Eye" /></template>
          File Tersembunyi
        </NButton>
        <span class="spacer" />
        <div class="view-toggle" role="group" aria-label="Mode tampilan">
          <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'list' }" title="Tampilan daftar" @click="setViewMode('list')">
            <NIcon :component="ListIcon" size="16" />
          </button>
          <button type="button" class="view-toggle-btn" :class="{ active: viewMode === 'grid' }" title="Tampilan ikon" @click="setViewMode('grid')">
            <NIcon :component="LayoutGrid" size="16" />
          </button>
        </div>
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

    <div class="files-shell" :class="{ 'sidebar-collapsed': !sidebarOpen }">
      <aside class="files-sidebar" v-show="sidebarOpen">
        <FileTree :active-path="resolvedPath" @navigate="navigateTo" />
      </aside>

      <div class="files-main">
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
              <NButton size="small" @click="toggleShowHidden"><template #icon><NIcon :component="Eye" /></template>Tampilkan File Tersembunyi</NButton>
            </template>
          </NEmpty>

          <NDataTable
            v-else-if="viewMode === 'list'"
            :columns="columns"
            :data="visibleEntries"
            :loading="loading"
            :row-key="(r: Entry) => r.name"
            v-model:checked-row-keys="checkedKeys"
            :scroll-x="800"
          />

          <div v-else class="files-grid">
            <div
              v-for="entry in visibleEntries"
              :key="entry.name"
              class="grid-tile"
              :class="{ selected: checkedKeys.includes(entry.name) }"
            >
              <NCheckbox
                class="grid-checkbox"
                :checked="checkedKeys.includes(entry.name)"
                @click.stop
                @update:checked="toggleChecked(entry.name)"
              />
              <a
                class="grid-open"
                :href="entryHref(entry)"
                :title="entry.name"
                @click="openEntry($event, entry)"
              >
                <div class="grid-thumb">
                  <img
                    v-if="isImage(entry.name) && !thumbFailed.has(entry.name)"
                    :src="filesApi.downloadUrl(fullPath(entry.name))"
                    :alt="entry.name"
                    loading="lazy"
                    @error="thumbFailed.add(entry.name)"
                  />
                  <NIcon v-else :component="iconFor(entry)" size="38" class="grid-icon" />
                </div>
                <div class="grid-name">{{ entry.name }}</div>
                <div class="grid-meta">{{ entry.isDir ? ' ' : formatBytes(entry.sizeBytes) }}</div>
              </a>
              <div class="grid-actions">
                <a
                  v-if="!entry.isDir"
                  class="grid-action-btn"
                  :href="filesApi.downloadUrl(fullPath(entry.name))"
                  title="Unduh"
                  :aria-label="`Unduh ${entry.name}`"
                ><NIcon :component="Download" size="14" /></a>
                <button type="button" class="grid-action-btn" title="Ganti nama" :aria-label="`Ganti nama ${entry.name}`" @click="renameEntry(entry)">
                  <NIcon :component="Pencil" size="14" />
                </button>
                <NPopconfirm @positive-click="removeEntry(entry)">
                  <template #trigger>
                    <button type="button" class="grid-action-btn grid-action-btn--danger" title="Hapus" :aria-label="`Hapus ${entry.name}`" @click.stop>
                      <NIcon :component="Trash2" size="14" />
                    </button>
                  </template>
                  Hapus "{{ entry.name }}"?
                </NPopconfirm>
              </div>
            </div>
          </div>
        </NCard>
      </div>
    </div>

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

    <FilePreviewOverlay
      v-if="previewEntry"
      :entry="previewEntry"
      :images="previewImages"
      :full-path="fullPath"
      @close="previewEntry = null"
      @navigate="(e) => (previewEntry = e)"
    />
  </AppShell>
</template>

<style scoped>
.files-shell {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  min-height: 0;
}

.files-sidebar {
  flex: 0 0 220px;
  width: 220px;
  /* Sidebar sits below the (now full-width) toolbar — see files-toolbar
     below — so its cap needs to account for that height too, not just
     the AppShell header/padding, or it'd run taller than the viewport. */
  max-height: calc(100vh - 230px);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  overflow: hidden;
}

.files-main {
  flex: 1;
  min-width: 0;
}

.files-toolbar {
  margin-bottom: 16px;
}

.sidebar-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--glass-border);
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.sidebar-toggle:hover {
  background: var(--track);
  color: var(--text);
}

.spacer {
  flex: 1;
}

.view-toggle {
  display: flex;
  border: 1px solid var(--glass-border);
  border-radius: var(--radius-sm);
  overflow: hidden;
}
.view-toggle-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: var(--surface);
  border: none;
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.view-toggle-btn + .view-toggle-btn {
  border-left: 1px solid var(--glass-border);
}
.view-toggle-btn:hover {
  color: var(--text);
}
.view-toggle-btn.active {
  background: var(--accent-soft);
  color: var(--accent);
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

/* --- grid view --- */
.files-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}

.grid-tile {
  position: relative;
  display: flex;
  flex-direction: column;
  border-radius: var(--radius-md);
  border: 1px solid transparent;
  padding: 8px 6px;
  transition: background var(--transition-fast), border-color var(--transition-fast);
}
.grid-tile:hover {
  background: var(--track);
}
.grid-tile.selected {
  background: var(--accent-soft);
  border-color: var(--accent);
}

.grid-checkbox {
  position: absolute;
  top: 6px;
  left: 6px;
  z-index: 2;
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.grid-tile:hover .grid-checkbox,
.grid-tile.selected .grid-checkbox {
  opacity: 1;
}

.grid-open {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}

.grid-thumb {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 72px;
  border-radius: var(--radius-sm);
  background: var(--surface);
  overflow: hidden;
  margin-bottom: 6px;
}
.grid-thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.grid-icon {
  color: var(--text-muted);
}

.grid-name {
  width: 100%;
  font-size: 0.8rem;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  line-height: 1.25;
  word-break: break-word;
}
.grid-meta {
  margin-top: 2px;
  font-size: 0.7rem;
  color: var(--text-faint);
}

.grid-actions {
  display: flex;
  justify-content: center;
  gap: 4px;
  margin-top: 6px;
  opacity: 0;
  transition: opacity var(--transition-fast);
}
.grid-tile:hover .grid-actions,
.grid-tile.selected .grid-actions {
  opacity: 1;
}
.grid-action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  border-radius: var(--radius-sm);
  border: none;
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  text-decoration: none;
}
.grid-action-btn:hover {
  background: var(--track);
  color: var(--text);
}
.grid-action-btn--danger:hover {
  color: var(--danger);
}

@media (max-width: 860px) {
  .files-shell {
    flex-direction: column;
  }
  .files-sidebar {
    width: 100%;
    flex-basis: auto;
    max-height: 240px;
  }
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
