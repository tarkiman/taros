// Mirrors internal/docker/*.go json tags — keep in sync.
export interface ContainerStats {
  cpuPercent: number
  memUsageBytes: number
  memLimitBytes: number
  memPercent: number
  netRxBytes: number
  netTxBytes: number
  blockReadBytes: number
  blockWriteBytes: number
}

export interface Container {
  id: string
  name: string
  image: string
  state: string // running, exited, paused, ...
  status: string // human string, e.g. "Up 3 hours"
  created: string
  ports: string
  hasStats: boolean
  stats: ContainerStats
}

export interface Image {
  id: string
  tag: string
  dangling: boolean
  created: string
  sizeBytes: number
  containers: number // -1 if not reported
}

export interface Network {
  id: string
  name: string
  driver: string
  created: string
  subnet: string
  connectedCount: number
  builtin: boolean
}

export interface Volume {
  name: string
  driver: string
  mountpoint: string
  created: string
  sizeBytes: number // -1 if unknown
  inUse: boolean
}

export interface DockerInfo {
  serverVersion: string
  apiVersion: string
  operatingSystem: string
  kernelVersion: string
  storageDriver: string
  dockerRootDir: string
  containersRunning: number
  containersPaused: number
  containersStopped: number
  images: number
}

export interface DiskUsage {
  imagesTotalBytes: number
  imagesReclaimableBytes: number
  containersTotalBytes: number
  volumesTotalBytes: number
  volumesReclaimableBytes: number
}

// Thrown by api/docker.ts when the backend reports Docker is off/unreachable
// (HTTP 503 with this shape) — see internal/web/handlers_docker.go
// writeDockerUnavailable.
export interface DockerUnavailable {
  error: string
  enabled: boolean
}
