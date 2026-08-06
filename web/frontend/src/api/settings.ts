import { api } from './client'

export const settingsApi = {
  setTerminalEnabled: (enabled: boolean, password: string) =>
    api.post<{ enabled: boolean }>('/api/settings/terminal', { enabled, password }),
  getPort: () => api.get<{ listen: string }>('/api/settings/port'),
  setPort: (port: number, password: string) =>
    api.post<{ listen: string }>('/api/settings/port', { port, password }),
}
