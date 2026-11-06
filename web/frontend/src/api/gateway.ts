import { api } from './client'

// Mirrors internal/gateway (Snapshot) and internal/web/handlers_gateway.go.
export interface ZTPeer {
  address: string
  latencyMs: number
  direct: boolean
  path?: string
}

export interface ZeroTier {
  available: boolean
  reason?: 'not_installed' | 'not_root' | 'error'
  address?: string
  online: boolean
  version?: string
  networks: { id: string; name: string; status: string; addresses: string[]; interface: string }[]
  peers: { direct: number; relayed: number; list: ZTPeer[] }
}

export interface CentralState {
  label: string
  addr: string
  ok: boolean
  rttMs: number
  error?: string
}

export interface Relay {
  name: string
  sources: string[]
  active: boolean
  inKbps: number
  consumers: { remote: string; userAgent?: string; outKbps: number }[]
}

export interface LanDevice {
  ip: string
  mac?: string
  state: 'reachable' | 'incomplete' | 'unknown'
  relayed?: string[]
}

export interface GatewaySnapshot {
  at: string
  zerotier: ZeroTier
  central: CentralState[]
  relays: { available: boolean; error?: string; streams: Relay[] }
  lan: { interface?: string; cidr?: string; devices: LanDevice[] }
  uplink: { interface?: string; txKbps: number; rxKbps: number; history: { t: string; v: number }[] }
}

export interface GatewayStatus {
  enabled: boolean
  status?: GatewaySnapshot
}

export const gatewayApi = {
  status: () => api.get<GatewayStatus>('/api/gateway/status'),
}
