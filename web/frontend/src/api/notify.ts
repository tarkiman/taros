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

export interface NotifySettings {
  enabled: boolean
  webhookUrl: string
  cpu: MetricRule
  mem: MetricRule
  temp: MetricRule
  containers: ContainerRules
}

export const notifyApi = {
  get: () => api.get<NotifySettings>('/api/notify/settings'),
  update: (settings: NotifySettings) => api.put<NotifySettings>('/api/notify/settings', settings),
  test: (webhookUrl?: string) => api.post<{ sent: boolean }>('/api/notify/test', { webhookUrl: webhookUrl ?? '' }),
}
