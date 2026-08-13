// Mirrors internal/fileexplorer.ScanEntry / ScanResult.
export interface ScanEntry {
  path: string
  sizeBytes: number
}

export interface ScanResult {
  root: string
  totalBytes: number
  durationMs: number
  topLevelDirs: ScanEntry[]
  largestFiles: ScanEntry[]
  skippedMounts?: string[]
  permissionErrors?: number
}
