import { api } from './client'

// Mirrors internal/appmeta.Meta — keyed by docker compose project name.
export interface AppMeta {
  icon: string
  url: string
}

export const appMetaApi = {
  list: () => api.get<{ apps: Record<string, AppMeta> }>('/api/apps/meta'),
  // Sending both empty clears the customization.
  set: (project: string, meta: AppMeta) =>
    api.put<AppMeta>(`/api/apps/meta/${encodeURIComponent(project)}`, meta),
}
