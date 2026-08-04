// Mirrors internal/store.ProcInfo json tags.
export interface ProcInfo {
  pid: number
  name: string
  cpuPercent: number
  memBytes: number
}
