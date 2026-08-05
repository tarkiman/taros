import { api } from './client'

export interface TOTPStatus {
  enabled: boolean
  remainingBackupCodes?: number
}
export interface TOTPSetup {
  secret: string
  otpauthUrl: string
}
export interface TOTPConfirmResult {
  backupCodes: string[]
}

export const totpApi = {
  status: () => api.get<TOTPStatus>('/api/settings/totp/status'),
  setup: () => api.post<TOTPSetup>('/api/settings/totp/setup'),
  confirm: (secret: string, code: string) => api.post<TOTPConfirmResult>('/api/settings/totp/confirm', { secret, code }),
  disable: (password: string) => api.post<{ enabled: boolean }>('/api/settings/totp/disable', { password }),
}
