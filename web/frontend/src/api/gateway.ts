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

// Settings > Gerbang lokasi (internal/web/handlers_settings_gateway.go).
export interface GatewayCentralInput {
  label: string
  host: string
  port: number | null
}

export interface GatewaySetupConfig {
  enabled: boolean
  go2rtcUrl: string
  pollSeconds: number
  central: GatewayCentralInput[]
}

export interface GatewaySetupStatus {
  config: GatewaySetupConfig
  active: boolean
  root: boolean
  zerotier: ZeroTier
  containers: { name: string; image: string; state: string }[]
}

export const gatewaySetupApi = {
  status: () => api.get<GatewaySetupStatus>('/api/settings/gateway'),
  testGo2rtc: (url: string) => api.post<{ ok: boolean; streams?: string[]; error?: string }>('/api/settings/gateway/test-go2rtc', { url }),
  testCentral: (host: string, port: number) => api.post<{ ok: boolean; rttMs: number; error?: string }>('/api/settings/gateway/test-central', { host, port }),
  save: (cfg: GatewaySetupConfig, password: string) => api.put<{ enabled: boolean }>('/api/settings/gateway', { ...cfg, password }),
}
