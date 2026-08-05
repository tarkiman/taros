import { api } from './client'

export const settingsApi = {
  setTerminalEnabled: (enabled: boolean, password: string) =>
    api.post<{ enabled: boolean }>('/api/settings/terminal', { enabled, password }),
}
