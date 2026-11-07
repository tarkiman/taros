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

// Gateway stage 2 (internal/web/handlers_gateway_relays.go): manage the go2rtc relay.
export interface SourceInfo {
  url: string // without credentials
  username?: string
  hasPassword: boolean
}

export interface StreamConfig {
  name: string
  sources: SourceInfo[]
  editable: boolean
  reason?: 'missing' | 'multiple' | 'xiaomi' | 'scheme'
}

export interface RelayConfig {
  rtsp: { port: number; username: string; hasPassword: boolean }
  streams: StreamConfig[]
  zerotierIp?: string
}

export interface SourceInput {
  url: string
  username: string
  password: string
}

export interface SourceTest {
  ok: boolean
  status?: number
  codec?: string
  error?: 'unreachable' | 'auth' | 'status'
}

export interface ScanDevice {
  mac?: string
  ips: string[]
  ports: number[]
  onvif?: { xaddr: string; name?: string; hardware?: string }
  server?: string
  gateway: boolean
  relayed: string[]
}

export interface OnvifStream {
  profile: string
  url: string
  encoding?: string
  width?: number
  height?: number
}

export interface StreamGuess {
  guess?: { brand: string; main: string; sub?: string; codec?: string; sub_codec?: string }
  needs_auth: boolean
  tried: number
}

export interface ScanStreams {
  onvif?: OnvifStream[]
  onvifError?: 'auth' | 'failed'
  guess?: StreamGuess
}

export interface RTSPLoginResult {
  username: string
  password: string
  urls: Record<string, string>
}

export const relayApi = {
  list: () => api.get<RelayConfig>('/api/gateway/relays'),
  create: (name: string, source: SourceInput) => api.post<{ name: string }>('/api/gateway/relays', { name, source }),
  update: (name: string, source: SourceInput) => api.put<{ name: string }>(`/api/gateway/relays/${encodeURIComponent(name)}`, { source }),
  remove: (name: string) => api.del<void>(`/api/gateway/relays/${encodeURIComponent(name)}`),
  test: (source: SourceInput, name?: string) => api.post<SourceTest>('/api/gateway/relays/test', { name: name ?? '', source }),
  scan: () => api.post<{ subnets: { interface: string; cidr: string }[]; devices: ScanDevice[] }>('/api/gateway/scan'),
  streams: (ip: string, port: number, xaddr: string, username: string, password: string) =>
    api.post<ScanStreams>('/api/gateway/scan/streams', { ip, port, xaddr, username, password }),
  rotateLogin: (username: string, password: string) => api.post<RTSPLoginResult>('/api/gateway/rtsp-login', { username, password }),
}
