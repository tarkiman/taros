import { api } from './client'
import type { FilesListResponse, JobSnapshot } from '../types/files'

export const filesApi = {
  list: (path: string, q?: string) => {
    const params = new URLSearchParams({ path })
    if (q) params.set('q', q)
    return api.get<FilesListResponse>(`/api/files/list?${params.toString()}`)
  },
  mkdir: (path: string) => api.post<{ ok: boolean }>('/api/files/op', { action: 'mkdir', path }),
  createFile: (path: string) => api.post<{ ok: boolean }>('/api/files/op', { action: 'create', path }),
  rename: (path: string, newPath: string) => api.post<{ ok: boolean }>('/api/files/op', { action: 'rename', path, newPath }),
  remove: (path: string) => api.post<{ ok: boolean }>('/api/files/op', { action: 'delete', path }),
  copy: (paths: string[]) => api.post<{ ok: boolean }>('/api/files/op', { action: 'copy', paths }),
  cut: (paths: string[]) => api.post<{ ok: boolean }>('/api/files/op', { action: 'cut', paths }),
  // Always returns a jobId, even for an instant same-filesystem rename —
  // see internal/web/handlers_files.go handleFilesPaste. Callers always
  // watch the job, one code path regardless of how fast it finishes.
  paste: (path: string) => api.post<{ jobId: string }>('/api/files/op', { action: 'paste', path }),
  cancelJob: (jobId: string) => api.post<{ ok: boolean }>(`/api/files/op/${encodeURIComponent(jobId)}/cancel`),
  downloadUrl: (path: string) => `/api/files/download?path=${encodeURIComponent(path)}`,
}

// Upload itself goes through Naive UI's <NUpload> (action=/api/files/upload,
// see FilesView.vue) rather than a hand-rolled XHR wrapper here — NUpload
// already does per-file XHR with progress events and a file-list UI for
// free, and issues one request per file rather than old files.js's single
// batch request, so one bad file doesn't block the rest.

// Watches a paste job's SSE stream until it stops running. The server
// closes the stream itself once status !== "running" (see
// handleFilesOpStream), so this only needs to react to messages, not
// manage its own completion timer.
export function watchJob(jobId: string, onUpdate: (snap: JobSnapshot) => void): () => void {
  const source = new EventSource(`/api/files/op/${encodeURIComponent(jobId)}/stream`)
  source.onmessage = (e) => {
    try {
      const snap = JSON.parse(e.data) as JobSnapshot
      onUpdate(snap)
      if (snap.status !== 'running') source.close()
    } catch {
      // malformed frame, wait for the next tick
    }
  }
  return () => source.close()
}
