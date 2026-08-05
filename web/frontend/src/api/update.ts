import { api } from './client'
import type { ApplyResult, UpdateStatus } from '../types/update'

export const updateApi = {
  check: () => api.get<UpdateStatus>('/api/update/check'),
  apply: () => api.post<ApplyResult>('/api/update/apply'),
}
