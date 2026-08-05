// Mirrors internal/web/handlers_update.go's updateCheckResponse json tags.
export interface UpdateStatus {
  enabled: boolean
  currentVersion: string
  latestVersion?: string
  updateAvailable: boolean
}

export interface ApplyResult {
  version: string
  message?: string
}
