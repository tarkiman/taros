import { api } from './client'

export const settingsApi = {
  setTerminalEnabled: (enabled: boolean, password: string) =>
    api.post<{ enabled: boolean }>('/api/settings/terminal', { enabled, password }),
  setDiskAnalysisEnabled: (enabled: boolean) =>
    api.post<{ enabled: boolean }>('/api/settings/disk-analysis', { enabled }),
  getPort: () => api.get<{ listen: string }>('/api/settings/port'),
  setPort: (port: number, password: string) =>
    api.post<{ listen: string }>('/api/settings/port', { port, password }),
  listUsers: () => api.get<{ usernames: string[] }>('/api/settings/users'),
  addUser: (newUsername: string, newPassword: string, password: string) =>
    api.post<{ usernames: string[] }>('/api/settings/users', { newUsername, newPassword, password }),
  removeUser: (username: string, password: string) =>
    api.post<{ usernames: string[] }>(`/api/settings/users/${encodeURIComponent(username)}/remove`, { password }),
}
