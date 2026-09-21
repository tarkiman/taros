import { api } from './client'

export type AddressKind = 'ethernet' | 'wifi' | 'zerotier' | 'tailscale' | 'docker' | 'other'

// Mirrors internal/netinfo.Address.
export interface HostAddress {
  interface: string
  kind: AddressKind
  ip: string
  prefixLen: number
}

// Mirrors internal/bootlog.Snapshot / View.
export interface BootSnapshot {
  hasMetrics: boolean
  cpuPercent: number
  memPercent: number
  cpuTempC: number
  nvmeTempC: number
  hasNvme: boolean
  undervoltage: boolean
  hasUndervolt: boolean
}
export interface BootEntry {
  bootId: string
  bootedAt: string
  lastSeen: string
  clockSynced: boolean
  tarosStarts: number
  tarosCrashes: number
  undervoltEvents: number
  end: '' | 'clean' | 'powerLoss'
  last: BootSnapshot
  running: boolean
}
export interface BootsResponse {
  supported: boolean
  boots: BootEntry[]
  live: BootSnapshot
}

export const systemApi = {
  boots: () => api.get<BootsResponse>('/api/system/boots'),
  monitoringStatus: () => api.get<{ supported: boolean }>('/api/system/monitoring-status'),
  addresses: (all: boolean) =>
    api.get<{ addresses: HostAddress[] }>(`/api/system/addresses${all ? '?all=1' : ''}`),
}
