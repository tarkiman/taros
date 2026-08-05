// Mirrors internal/store.ProcInfo json tags.
export interface ProcInfo {
  pid: number
  name: string
  command: string
  threads: number
  user: string
  cpuPercent: number
  memBytes: number
}
