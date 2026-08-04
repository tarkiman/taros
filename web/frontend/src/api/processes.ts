import { api } from './client'
import type { ProcInfo } from '../types/processes'

export const processesApi = {
  list: (sortBy: 'cpu' | 'mem', limit = 5) =>
    api.get<{ processes: ProcInfo[] }>(`/api/processes?sortBy=${sortBy}&limit=${limit}`),
}
