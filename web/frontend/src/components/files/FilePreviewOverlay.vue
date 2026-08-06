<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import Plyr from 'plyr'
import 'plyr/dist/plyr.css'
import { NIcon } from 'naive-ui'
import { X, ChevronLeft, ChevronRight, Download, FileText } from '@lucide/vue'
import { filesApi } from '../../api/files'
import type { Entry } from '../../types/files'
import { formatBytes } from '../../utils/format'
import { isImage, isVideo, isAudio, isPdf } from './filetypes'

const props = defineProps<{
  entry: Entry
  images: Entry[]
  fullPath: (name: string) => string
}>()
const emit = defineEmits<{ close: []; navigate: [entry: Entry] }>()

const kind = computed(() => {
  if (isImage(props.entry.name)) return 'image'
  if (isVideo(props.entry.name)) return 'video'
  if (isAudio(props.entry.name)) return 'audio'
  if (isPdf(props.entry.name)) return 'pdf'
  return 'unsupported'
})
const src = computed(() => filesApi.previewUrl(props.fullPath(props.entry.name)))
const downloadHref = computed(() => filesApi.downloadUrl(props.fullPath(props.entry.name)))

// Prev/next only make sense for images — a folder full of photos is the
// case this is for (browsing a gallery without closing/reopening each one).
const imageIndex = computed(() => props.images.findIndex((e) => e.name === props.entry.name))
const hasPrev = computed(() => kind.value === 'image' && imageIndex.value > 0)
const hasNext = computed(() => kind.value === 'image' && imageIndex.value >= 0 && imageIndex.value < props.images.length - 1)
function goPrev() {
  if (hasPrev.value) emit('navigate', props.images[imageIndex.value - 1])
}
function goNext() {
  if (hasNext.value) emit('navigate', props.images[imageIndex.value + 1])
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') emit('close')
  else if (e.key === 'ArrowLeft') goPrev()
  else if (e.key === 'ArrowRight') goNext()
}
onMounted(() => document.addEventListener('keydown', onKeydown))
onBeforeUnmount(() => document.removeEventListener('keydown', onKeydown))

// --- Plyr lifecycle for video/audio — re-created whenever entry changes
// (not just mounted once), since navigating between preview items reuses
// this same component instance rather than remounting it. ---
const mediaEl = ref<HTMLVideoElement | HTMLAudioElement | null>(null)
let player: Plyr | null = null

function setupPlayer() {
  player?.destroy()
  player = null
  if ((kind.value === 'video' || kind.value === 'audio') && mediaEl.value) {
    player = new Plyr(mediaEl.value, { settings: ['speed'] })
  }
}
onMounted(() => nextTick(setupPlayer))
watch(() => props.entry, () => nextTick(setupPlayer))
onBeforeUnmount(() => player?.destroy())
</script>

<template>
  <Teleport to="body">
    <div class="preview-overlay" @click.self="emit('close')">
      <div class="preview-bar">
        <div class="preview-title">
          <span class="preview-name">{{ entry.name }}</span>
          <span class="preview-size">{{ formatBytes(entry.sizeBytes) }}</span>
        </div>
        <div class="preview-bar-actions">
          <a class="preview-btn" :href="downloadHref" title="Unduh" aria-label="Unduh"><NIcon :component="Download" size="18" /></a>
          <button type="button" class="preview-btn" title="Tutup (Esc)" aria-label="Tutup" @click="emit('close')"><NIcon :component="X" size="20" /></button>
        </div>
      </div>

      <button v-if="hasPrev" type="button" class="preview-nav preview-nav--prev" title="Sebelumnya" aria-label="Gambar sebelumnya" @click.stop="goPrev">
        <NIcon :component="ChevronLeft" size="26" />
      </button>
      <button v-if="hasNext" type="button" class="preview-nav preview-nav--next" title="Berikutnya" aria-label="Gambar berikutnya" @click.stop="goNext">
        <NIcon :component="ChevronRight" size="26" />
      </button>

      <div class="preview-body" @click.self="emit('close')">
        <img v-if="kind === 'image'" :src="src" :alt="entry.name" class="preview-image" @click.stop />

        <div v-else-if="kind === 'video'" class="preview-media-container preview-media-container--video" @click.stop>
          <video ref="mediaEl" :src="src" playsinline controls />
        </div>

        <div v-else-if="kind === 'audio'" class="preview-media-container preview-media-container--audio" @click.stop>
          <audio ref="mediaEl" :src="src" controls />
        </div>

        <div v-else-if="kind === 'pdf'" class="preview-pdf-wrap" @click.stop>
          <iframe :src="src" class="preview-pdf" title="Pratinjau PDF" />
          <a :href="src" target="_blank" rel="noopener" class="preview-pdf-fallback">Buka di tab baru</a>
        </div>

        <div v-else class="preview-unsupported" @click.stop>
          <NIcon :component="FileText" size="40" />
          <p>Tidak bisa dipratinjau. Unduh untuk membuka.</p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.preview-overlay {
  position: fixed;
  inset: 0;
  z-index: 300;
  display: flex;
  flex-direction: column;
  background: rgba(8, 9, 12, 0.92);
  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);
  /* Theme Plyr to match "Malam Jaga" — CSS custom properties inherit down
     to Plyr's own DOM regardless of Vue's scoped-style attribute, so this
     works without needing :deep() selectors. */
  --plyr-color-main: var(--accent);
  --plyr-control-radius: 8px;
  --plyr-menu-background: var(--surface-raised);
  --plyr-menu-color: var(--text);
  --plyr-tooltip-background: var(--surface-raised);
  --plyr-tooltip-color: var(--text);
  --plyr-audio-controls-background: var(--surface-raised);
  --plyr-audio-control-color: var(--text);
}

.preview-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-5);
  flex-shrink: 0;
}

.preview-title {
  display: flex;
  align-items: baseline;
  gap: var(--space-3);
  min-width: 0;
  color: #f2f3f5;
}
.preview-name {
  font-weight: 600;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.preview-size {
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.82rem;
  flex-shrink: 0;
}

.preview-bar-actions {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
}
.preview-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: var(--radius-md);
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.06);
  color: #f2f3f5;
  cursor: pointer;
  text-decoration: none;
  transition: background var(--transition-fast);
}
.preview-btn:hover {
  background: rgba(255, 255, 255, 0.16);
}

.preview-body {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 0;
  padding: 0 var(--space-6) var(--space-5);
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-md);
}

.preview-media-container {
  width: 100%;
}
.preview-media-container--video {
  max-width: 1100px;
}
.preview-media-container--audio {
  max-width: 480px;
}

.preview-pdf-wrap {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  height: 100%;
}
.preview-pdf {
  width: 100%;
  height: 100%;
  border: none;
  border-radius: var(--radius-md);
  background: #fff;
}
.preview-pdf-fallback {
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.82rem;
}
.preview-pdf-fallback:hover {
  color: #fff;
}

.preview-unsupported {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  color: rgba(255, 255, 255, 0.7);
}

.preview-nav {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: 1px solid rgba(255, 255, 255, 0.14);
  background: rgba(255, 255, 255, 0.08);
  color: #f2f3f5;
  cursor: pointer;
  transition: background var(--transition-fast);
}
.preview-nav:hover {
  background: rgba(255, 255, 255, 0.2);
}
.preview-nav--prev {
  left: var(--space-4);
}
.preview-nav--next {
  right: var(--space-4);
}

@media (max-width: 640px) {
  .preview-body {
    padding: 0 var(--space-3) var(--space-3);
  }
  .preview-nav {
    width: 36px;
    height: 36px;
  }
}
</style>
