import { api } from './client'
import type { QuickLink } from '../types/quicklinks'

export interface QuickLinkInput {
  label: string
  url: string
  icon: string
}

export const quickLinksApi = {
  list: () => api.get<{ links: QuickLink[] }>('/api/quick-links'),
  create: (input: QuickLinkInput) => api.post<QuickLink>('/api/quick-links', input),
  update: (id: string, input: QuickLinkInput) => api.put<QuickLink>(`/api/quick-links/${encodeURIComponent(id)}`, input),
  remove: (id: string) => api.del<void>(`/api/quick-links/${encodeURIComponent(id)}`),
}
