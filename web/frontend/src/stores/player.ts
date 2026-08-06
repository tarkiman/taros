import { defineStore } from 'pinia'
import type { Entry } from '../types/files'

// Deliberately NOT persisted to localStorage — a hard reload stopping
// playback is normal/expected (every other web media player behaves this
// way too), and the folder path in `folderPath` would go stale the moment
// anything on disk moves anyway. What *is* preserved is playback across
// in-app navigation, since this store — unlike AppShell.vue, which is
// re-instantiated per page (see stores/terminal.ts) — lives at the root
// Vue app instance and outlives every route change. The actual <audio>
// element has to live somewhere that's equally persistent, which is why
// MiniPlayer.vue is mounted in App.vue itself, next to <router-view>, not
// inside AppShell.
export const usePlayerStore = defineStore('player', {
  state: () => ({
    queue: [] as Entry[],
    index: -1,
    // Resolved folder path the queue's entries live in — Entry only has a
    // bare `name`, so this is needed to rebuild full paths for playback.
    folderPath: '',
    // UI-only — which icon the play/pause button shows. Set optimistically
    // here (e.g. true right when a track starts) and corrected by
    // MiniPlayer.vue's native play/pause event listeners once the <audio>
    // element's real state is known. Nothing reacts to this value to
    // control the element itself — see the long comment in MiniPlayer.vue
    // for why a two-way version of that caused a feedback loop.
    playing: false,
  }),
  getters: {
    current: (state) => (state.index >= 0 && state.index < state.queue.length ? state.queue[state.index] : null),
    hasPrev: (state) => state.index > 0,
    hasNext: (state) => state.index >= 0 && state.index < state.queue.length - 1,
  },
  actions: {
    // Called when clicking any mp3 in File Explorer — the rest of that
    // folder's audio files become the queue, same "browse a folder, keep
    // listening through it" idea as the video continuous-playback feature.
    playFolder(entries: Entry[], startIndex: number, folderPath: string) {
      this.queue = entries
      this.index = startIndex
      this.folderPath = folderPath
      this.playing = true
    },
    next() {
      if (this.hasNext) {
        this.index++
        this.playing = true
      }
    },
    prev() {
      if (this.hasPrev) {
        this.index--
        this.playing = true
      }
    },
    close() {
      this.queue = []
      this.index = -1
      this.folderPath = ''
      this.playing = false
    },
  },
})
