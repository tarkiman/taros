import { api } from './client'
import type { Unit } from '../types/service'

export interface ServicesListParams {
  q?: string
  showAll?: boolean
  failedOnly?: boolean
}

function buildQuery(params: ServicesListParams): string {
  const sp = new URLSearchParams()
  if (params.q) sp.set('q', params.q)
  if (params.showAll) sp.set('showAll', '1')
  if (params.failedOnly) sp.set('failedOnly', '1')
  const s = sp.toString()
  return s ? `?${s}` : ''
}

export const serviceApi = {
  list: (params: ServicesListParams) => api.get<{ units: Unit[] }>(`/api/services/list${buildQuery(params)}`),
  // Action responses carry the caller's current filters through so the
  // refreshed list matches what's on screen — an improvement over the old
  // htmx version, which always reset filters after an action (see
  // docs/06-api-ui-ux.md).
  action: (name: string, action: 'start' | 'stop' | 'restart' | 'reload', params: ServicesListParams) =>
    api.post<{ units: Unit[] }>(`/api/services/${encodeURIComponent(name)}/${action}${buildQuery(params)}`),
  logs: (name: string) => api.get<{ unit: string; logs: string }>(`/api/services/${encodeURIComponent(name)}/logs`),
}
