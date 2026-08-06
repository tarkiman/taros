import { api } from './client'

export const systemApi = {
  monitoringStatus: () => api.get<{ supported: boolean }>('/api/system/monitoring-status'),
}
