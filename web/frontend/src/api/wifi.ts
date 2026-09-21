import { api } from './client'

// Mirrors internal/wifi.
export type WifiSecurity = 'open' | 'wpa2' | 'wpa3' | 'enterprise' | 'wep'

export interface WifiNetwork {
  ssid: string
  signal: number
  channel: number
  security: WifiSecurity
  supported: boolean
  inUse: boolean
  savedUuid?: string
}

export interface WifiCurrent {
  device: string
  connected: boolean
  ssid?: string
  uuid?: string
  ip?: string
  gateway?: string
  signal?: number
}

export type WifiPhase = 'idle' | 'connecting' | 'verifying' | 'rollback' | 'done'
export type WifiResult = '' | 'connected' | 'failed' | 'rolled_back' | 'rollback_failed'

export interface WifiJob {
  phase: WifiPhase
  result?: WifiResult
  ssid?: string
  previousSsid?: string
  detail?: string
  startedAt?: string
  finishedAt?: string
}

export interface WifiStatus {
  available: { supported: boolean; reason?: string; device?: string }
  current?: WifiCurrent
  job: WifiJob
}

export interface WifiConnectBody {
  ssid: string
  wifiPassword: string
  security: WifiSecurity
  hidden: boolean
  password: string // the caller's own dashboard password
}

export const wifiApi = {
  status: () => api.get<WifiStatus>('/api/wifi/status'),
  networks: (rescan: boolean) => api.get<{ networks: WifiNetwork[] }>(`/api/wifi/networks${rescan ? '?rescan=1' : ''}`),
  connect: (body: WifiConnectBody) => api.post<{ job: WifiJob }>('/api/wifi/connect', body),
  forget: (uuid: string, password: string) => api.post<{ forgotten: boolean }>('/api/wifi/forget', { uuid, password }),
}
