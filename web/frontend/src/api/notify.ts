import { api } from './client'

export interface MetricRule {
  enabled: boolean
  thresholdPct?: number
  thresholdC?: number
  durationMin: number
}

// Container-health alerts (crash loops / unhealthy / unexpected exit).
export interface ContainerRules {
  enabled: boolean
  restartLoop: boolean
  unhealthy: boolean
  crashed: boolean
  graceMin: number
  includeLogs: boolean
}

// Location-gateway alerts (internal/notify/gateway.go, docs/04-features.md §4.18).
export interface GatewayRules {
  enabled: boolean
  relayDown: boolean
  centralDown: boolean
  zerotierOff: boolean
  graceMin: number
}

export interface NotifySettings {
  enabled: boolean
  webhookUrl: string
  cpu: MetricRule
  mem: MetricRule
  temp: MetricRule
  containers: ContainerRules
  boot: { powerLoss: boolean }
  gateway?: GatewayRules
}

export const notifyApi = {
  get: () => api.get<NotifySettings>('/api/notify/settings'),
  update: (settings: NotifySettings) => api.put<NotifySettings>('/api/notify/settings', settings),
  test: (webhookUrl?: string) => api.post<{ sent: boolean }>('/api/notify/test', { webhookUrl: webhookUrl ?? '' }),
}
