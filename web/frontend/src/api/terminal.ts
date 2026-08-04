import { api } from './client'

export const terminalApi = {
  status: () => api.get<{ enabled: boolean }>('/api/terminal/status'),
}
