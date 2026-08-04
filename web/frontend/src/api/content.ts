import { api } from './client'
import type { ContentResponse } from '../types/content'

export const contentApi = {
  get: (path: string) => api.get<ContentResponse>(`/api/files/content?path=${encodeURIComponent(path)}`),
  // expectedModTime omitted (or empty) means force-overwrite — see
  // internal/web/handlers_editor.go handleFilesContentPut.
  save: (path: string, content: string, expectedModTime?: string) =>
    api.put<{ modTime: string }>(`/api/files/content?path=${encodeURIComponent(path)}`, {
      content,
      expectedModTime: expectedModTime ?? '',
    }),
}
