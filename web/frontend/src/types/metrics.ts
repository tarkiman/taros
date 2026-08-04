// Mirrors internal/store/snapshot.go and internal/store/ringbuffer.go —
// keep field names in sync with the Go json tags, not the Go field names.
export interface CPUInfo {
  totalPercent: number
  corePercent: number[]
  loadAvg1: number
  loadAvg5: number
  loadAvg15: number
}

export interface MemInfo {
  totalBytes: number
  availableBytes: number
  usedBytes: number
  usedPercent: number
  buffersBytes: number
  cachedBytes: number
  swapTotalBytes: number
  swapUsedBytes: number
}

export interface DiskMount {
  mountPoint: string
  device: string
  fsType: string
  totalBytes: number
  usedBytes: number
  freeBytes: number
  usedPercent: number
  removable: boolean
}

export interface DiskIOInfo {
  readBytesPerSec: number
  writeBytesPerSec: number
}

export interface NetIface {
  name: string
  rxBytesPerSec: number
  txBytesPerSec: number
}

export interface TempSensor {
  label: string
  celsius: number
}

export interface Snapshot {
  time: string
  cpu: CPUInfo
  mem: MemInfo
  disks: DiskMount[]
  diskIO: DiskIOInfo
  net: NetIface[]
  temps: TempSensor[]
}

export interface Sample {
  t: string
  v: number
}
