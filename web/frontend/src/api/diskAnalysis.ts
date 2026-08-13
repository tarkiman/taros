import { api } from './client'
import type { ScanResult } from '../types/diskAnalysis'

// Deletion deliberately has no wrapper here — it reuses filesApi.remove
// (POST /api/files/op {"action":"delete"}), the same already-Jail-scoped
// endpoint File Explorer itself uses. This module's own backend surface
// stays read-only (status + scan).
export const diskAnalysisApi = {
  status: () => api.get<{ enabled: boolean }>('/api/disk-analysis/status'),
  scan: () => api.post<ScanResult>('/api/disk-analysis/scan'),
}
