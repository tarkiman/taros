import { api } from './client'
import type { Sample } from '../types/metrics'

// metric must be one of the keys in internal/web/sse.go's historySeries map.
export function fetchHistory(metric: 'cpu' | 'mem' | 'diskRead' | 'diskWrite' | 'tempMax') {
  return api.get<Sample[]>(`/api/metrics/history?metric=${metric}`)
}
