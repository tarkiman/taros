import { api } from './client'
import type { FolderShortcut } from '../types/folderShortcuts'

export interface FolderShortcutInput {
  label: string
  path: string
  showInSidebar: boolean
  showOnDashboard: boolean
}

export const folderShortcutsApi = {
  list: () => api.get<{ shortcuts: FolderShortcut[] }>('/api/folder-shortcuts'),
  create: (input: FolderShortcutInput) => api.post<FolderShortcut>('/api/folder-shortcuts', input),
  update: (id: string, input: FolderShortcutInput) => api.put<FolderShortcut>(`/api/folder-shortcuts/${encodeURIComponent(id)}`, input),
  remove: (id: string) => api.del<void>(`/api/folder-shortcuts/${encodeURIComponent(id)}`),
}
