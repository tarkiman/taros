<script setup lang="ts">
import { computed, nextTick, ref, watch } from 'vue'
import { NIcon } from 'naive-ui'
import { Music, Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, X } from '@lucide/vue'
import { filesApi } from '../api/files'
import { usePlayerStore } from '../stores/player'

const store = usePlayerStore()

const trackSrc = computed(() => {
  if (!store.current) return ''
  const path = `${store.folderPath}/${store.current.name}`.replace(/\/+/g, '/')
  return filesApi.previewUrl(path)
})

// Mounted in App.vue (see stores/player.ts for why) — this component never
// unmounts once a track starts, so the same <audio> element is reused for
// every subsequent track (swapped via .src/.load(), same approach as the
// video playlist in FilePreviewOverlay.vue).
//
// The <audio> element is the single source of truth for play/pause state.
// store.playing is a *read-only reflection* of it (updated only by
// onNativePlay/onNativePause below) — nothing ever writes back from
// store.playing to the element. The play/pause button calls
// togglePlayback() below, which talks to the element directly.
//
// This one-way flow isn't incidental — a two-way version (a watcher on
// store.playing that called el.play()/el.pause(), on top of these same
// native-event listeners updating store.playing) was tried first and
// caused a real bug: every native play/pause event re-triggered the
// watcher, which called play()/pause() again, which fired another native
// event, forever — confirmed by instrumenting the element directly, over
// 2000 play/pause events fired in 9 seconds with nothing legitimately
// calling either that often. Plyr was also in the mix on that first
// attempt and got blamed initially, but removing Plyr alone didn't fix
// it — the watcher's feedback loop was the actual cause regardless of
// Plyr's presence. Video's preview overlay never hit this because it only
// calls play() once per track from one place; it has no separate button
// whose click handler goes through a watcher instead of the element.
const audioEl = ref<HTMLAudioElement | null>(null)
const currentTime = ref(0)
const duration = ref(0)
const volume = ref(1)

function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return '00:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60)
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`
}

// Clicking a track in File Explorer is itself the user gesture — unlike
// the video preview overlay (opened passively, autoplay would be a
// surprise), picking a song is an explicit "play this" action, so every
// track load here autoplays, first one included. This also drives
// next()/prev()/auto-advance, which don't go through the play/pause
// button at all — they change store.current directly, which lands here.
watch(
  () => store.current,
  (entry) => {
    if (!entry) return
    nextTick(() => {
      const el = audioEl.value
      if (!el) return
      el.src = trackSrc.value
      el.load()
      Promise.resolve(el.play()).catch(() => {
        store.playing = false
      })
    })
  },
)

function togglePlayback() {
  const el = audioEl.value
  if (!el) return
  if (el.paused) Promise.resolve(el.play()).catch(() => {})
  else el.pause()
}
function onNativePlay() {
  store.playing = true
}
function onNativePause() {
  store.playing = false
}
function onEnded() {
  if (store.hasNext) store.next()
  else store.playing = false
}
function onTimeUpdate() {
  if (audioEl.value) currentTime.value = audioEl.value.currentTime
}
function onLoadedMetadata() {
  if (audioEl.value) duration.value = audioEl.value.duration || 0
}
function onSeek(e: Event) {
  const el = audioEl.value
  if (!el) return
  el.currentTime = Number((e.target as HTMLInputElement).value)
}
function onVolumeInput(e: Event) {
  const el = audioEl.value
  const v = Number((e.target as HTMLInputElement).value)
  volume.value = v
  if (el) el.volume = v
}
function toggleMute() {
  const el = audioEl.value
  if (!el) return
  el.muted = !el.muted
}
</script>

<template>
  <div v-if="store.current" class="mini-player">
    <audio
      ref="audioEl"
      @ended="onEnded"
      @play="onNativePlay"
      @pause="onNativePause"
      @timeupdate="onTimeUpdate"
      @loadedmetadata="onLoadedMetadata"
    />

    <input
      type="range"
      class="mini-player-seek"
      min="0"
      :max="duration || 0"
      step="0.1"
      :value="currentTime"
      :style="{ '--fill': duration ? (currentTime / duration) * 100 : 0 }"
      :disabled="!duration"
      aria-label="Posisi lagu"
      @input="onSeek"
    />

    <div class="mini-player-row">
      <div class="mini-player-info">
        <NIcon :component="Music" size="20" class="mini-player-icon" />
        <div class="mini-player-text">
          <span class="mini-player-name" :title="store.current.name">{{ store.current.name }}</span>
          <span class="mini-player-pos">{{ store.index + 1 }} / {{ store.queue.length }}</span>
        </div>
      </div>

      <div class="mini-player-transport">
        <button type="button" class="mini-player-btn" :disabled="!store.hasPrev" title="Sebelumnya" aria-label="Sebelumnya" @click="store.prev()">
          <NIcon :component="SkipBack" size="18" />
        </button>
        <button
          type="button"
          class="mini-player-btn mini-player-btn--play"
          :title="store.playing ? 'Jeda' : 'Putar'"
          :aria-label="store.playing ? 'Jeda' : 'Putar'"
          @click="togglePlayback"
        >
          <NIcon :component="store.playing ? Pause : Play" size="20" />
        </button>
        <button type="button" class="mini-player-btn" :disabled="!store.hasNext" title="Berikutnya" aria-label="Berikutnya" @click="store.next()">
          <NIcon :component="SkipForward" size="18" />
        </button>
      </div>

      <div class="mini-player-end">
        <span class="mini-player-time">{{ formatTime(currentTime) }} / {{ formatTime(duration) }}</span>
        <button type="button" class="mini-player-btn mini-player-volume-btn" title="Bisukan" aria-label="Bisukan" @click="toggleMute">
          <NIcon :component="audioEl?.muted ? VolumeX : Volume2" size="16" />
        </button>
        <input
          type="range"
          class="mini-player-volume"
          min="0"
          max="1"
          step="0.05"
          :value="volume"
          aria-label="Volume"
          @input="onVolumeInput"
        />
        <button type="button" class="mini-player-btn mini-player-close" title="Tutup pemutar" aria-label="Tutup pemutar" @click="store.close()">
          <NIcon :component="X" size="18" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mini-player {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 250;
  display: flex;
  flex-direction: column;
  height: 72px;
  padding: 0 var(--space-5);
  background: var(--glass-strong);
  border-top: 1px solid var(--glass-border);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
}

/* Thin full-width seek bar along the very top edge of the bar — styled as
   a plain range input rather than a custom-built scrubber, but visually
   reduced to just a track+thumb so it reads as a progress line. */
.mini-player-seek {
  width: 100%;
  height: 14px;
  margin: 0;
  appearance: none;
  -webkit-appearance: none;
  background: transparent;
  cursor: pointer;
}
.mini-player-seek::-webkit-slider-runnable-track {
  height: 3px;
  background: var(--track);
  border-radius: 2px;
}
.mini-player-seek::-webkit-slider-thumb {
  appearance: none;
  -webkit-appearance: none;
  width: 11px;
  height: 11px;
  margin-top: -4px;
  border-radius: 50%;
  background: var(--accent);
}
.mini-player-seek::-moz-range-track {
  height: 3px;
  background: var(--track);
  border-radius: 2px;
}
.mini-player-seek::-moz-range-thumb {
  width: 11px;
  height: 11px;
  border: none;
  border-radius: 50%;
  background: var(--accent);
}
.mini-player-seek::-webkit-slider-runnable-track,
.mini-player-seek:hover::-webkit-slider-runnable-track {
  background: linear-gradient(
    to right,
    var(--accent) 0%,
    var(--accent) calc(var(--fill, 0) * 1%),
    var(--track) calc(var(--fill, 0) * 1%)
  );
}

.mini-player-row {
  flex: 1;
  display: flex;
  align-items: center;
  gap: var(--space-4);
  min-height: 0;
}

.mini-player-info {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-width: 0;
  flex: 1 1 180px;
}
.mini-player-icon {
  flex-shrink: 0;
  color: var(--accent);
}
.mini-player-text {
  display: flex;
  flex-direction: column;
  min-width: 0;
}
.mini-player-name {
  font-size: 0.86rem;
  font-weight: 600;
  color: var(--text);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.mini-player-pos {
  font-size: 0.74rem;
  font-family: var(--font-mono);
  color: var(--text-faint);
}

.mini-player-transport {
  display: flex;
  align-items: center;
  gap: var(--space-1);
  flex-shrink: 0;
}

.mini-player-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  border: none;
  background: transparent;
  color: var(--text-muted);
  cursor: pointer;
  transition: background var(--transition-fast), color var(--transition-fast);
}
.mini-player-btn:hover:not(:disabled) {
  background: var(--track);
  color: var(--text);
}
.mini-player-btn:disabled {
  opacity: 0.35;
  cursor: default;
}
.mini-player-btn--play {
  width: 40px;
  height: 40px;
  background: var(--accent-soft);
  color: var(--accent);
}
.mini-player-btn--play:hover {
  background: var(--accent-soft);
  filter: brightness(1.15);
}

.mini-player-end {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  flex: 1 1 180px;
  justify-content: flex-end;
  min-width: 0;
}
.mini-player-time {
  font-size: 0.74rem;
  font-family: var(--font-mono);
  color: var(--text-faint);
  white-space: nowrap;
}
.mini-player-volume-btn {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
}
.mini-player-volume {
  width: 70px;
  accent-color: var(--accent);
  flex-shrink: 0;
}
.mini-player-close {
  flex-shrink: 0;
}

@media (max-width: 720px) {
  .mini-player {
    padding: 0 var(--space-3);
  }
  .mini-player-row {
    gap: var(--space-2);
  }
  .mini-player-volume,
  .mini-player-volume-btn {
    display: none;
  }
}

@media (max-width: 560px) {
  .mini-player-time {
    display: none;
  }
}

@media (max-width: 460px) {
  .mini-player-pos {
    display: none;
  }
}
</style>
