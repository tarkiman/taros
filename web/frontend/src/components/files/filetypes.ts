// Shared file-type classification for File Explorer — used by FilesView.vue
// (icons, grid thumbnails) and FilePreviewOverlay.vue (deciding whether a
// click should open the preview overlay vs. the code editor, and which
// preview to render). Kept here so both stay in sync on what counts as
// "an image" etc. instead of drifting apart.
import {
  Folder,
  File as FileIcon,
  FileText,
  FileCode,
  FileArchive,
  Image as ImageIcon,
  Video as VideoIcon,
  Music as MusicIcon,
} from '@lucide/vue'
import type { Entry } from '../../types/files'

export const IMAGE_EXTS = new Set(['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'avif', 'ico'])
export const VIDEO_EXTS = new Set(['mp4', 'mkv', 'webm', 'mov', 'avi', 'flv', 'm4v'])
export const AUDIO_EXTS = new Set(['mp3', 'wav', 'flac', 'ogg', 'm4a', 'aac'])
export const ARCHIVE_EXTS = new Set(['zip', 'tar', 'gz', 'bz2', 'xz', '7z', 'rar', 'tgz'])
export const CODE_EXTS = new Set(['js', 'ts', 'jsx', 'tsx', 'go', 'py', 'json', 'yaml', 'yml', 'sh', 'vue', 'html', 'css', 'c', 'cpp', 'h', 'rs', 'java', 'sql'])
export const DOC_EXTS = new Set(['txt', 'md', 'pdf', 'doc', 'docx', 'log', 'csv'])
const PDF_EXTS = new Set(['pdf'])

export function extOf(name: string) {
  const i = name.lastIndexOf('.')
  return i > 0 ? name.slice(i + 1).toLowerCase() : ''
}
export function isImage(name: string) {
  return IMAGE_EXTS.has(extOf(name))
}
export function isVideo(name: string) {
  return VIDEO_EXTS.has(extOf(name))
}
export function isAudio(name: string) {
  return AUDIO_EXTS.has(extOf(name))
}
export function isPdf(name: string) {
  return PDF_EXTS.has(extOf(name))
}
// Anything openable in the preview overlay rather than the code editor.
export function isPreviewable(name: string) {
  return isImage(name) || isVideo(name) || isAudio(name) || isPdf(name)
}
export function iconFor(entry: Entry) {
  if (entry.isDir) return Folder
  const ext = extOf(entry.name)
  if (IMAGE_EXTS.has(ext)) return ImageIcon
  if (VIDEO_EXTS.has(ext)) return VideoIcon
  if (AUDIO_EXTS.has(ext)) return MusicIcon
  if (ARCHIVE_EXTS.has(ext)) return FileArchive
  if (CODE_EXTS.has(ext)) return FileCode
  if (DOC_EXTS.has(ext)) return FileText
  return FileIcon
}
