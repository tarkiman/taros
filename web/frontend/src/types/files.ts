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

// Mirrors internal/fileexplorer job.go JobSnapshot json tags.
export interface JobSnapshot {
  id: string
  kind: 'copy' | 'move'
  status: 'running' | 'done' | 'failed' | 'cancelled'
  totalBytes: number
  copiedBytes: number
  percentDone: number
  currentFile: string
  error?: string
  bytesPerSec: number
}
