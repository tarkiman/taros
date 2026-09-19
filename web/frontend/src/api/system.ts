import { api } from './client'

export type AddressKind = 'ethernet' | 'wifi' | 'zerotier' | 'tailscale' | 'docker' | 'other'

// Mirrors internal/netinfo.Address.
export interface HostAddress {
  interface: string
  kind: AddressKind
  ip: string
  prefixLen: number
}

export const systemApi = {
  monitoringStatus: () => api.get<{ supported: boolean }>('/api/system/monitoring-status'),
  addresses: (all: boolean) =>
    api.get<{ addresses: HostAddress[] }>(`/api/system/addresses${all ? '?all=1' : ''}`),
}
