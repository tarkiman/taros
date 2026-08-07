// Mirrors internal/fileexplorer/list.go Entry and internal/web/handlers_files.go
// json tags — keep in sync.
export interface Entry {
  name: string
  isDir: boolean
  sizeBytes: number
  mode: string
  owner: string
  group: string
  modTime: string
}

export interface Breadcrumb {
  name: string
  path: string
}

export interface FilesListResponse {
  currentPath: string
  parentPath: string
  breadcrumbs: Breadcrumb[]
  entries: Entry[]
  clipboardSize: number
  clipboardCut: boolean
}

// Mirrors internal/fileexplorer job.go JobSnapshot json tags. errorCode/
// errorParams follow the same shape as ApiError's code/params (see
// api/client.ts) — FilesView.vue resolves them the same way, just directly
// via the i18n instance instead of through client.ts's request() (this
// comes over the SSE stream, not a JSON error response).
export interface JobSnapshot {
  id: string
  kind: 'copy' | 'move'
  status: 'running' | 'done' | 'failed' | 'cancelled'
  totalBytes: number
  copiedBytes: number
  percentDone: number
  currentFile: string
  error?: string
  errorCode?: string
  errorParams?: Record<string, unknown>
  bytesPerSec: number
}
