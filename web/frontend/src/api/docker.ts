import { api } from './client'
import type { Container, DiskUsage, DockerInfo, Image, Network, Volume } from '../types/docker'

export interface ContainersResponse {
  containers: Container[]
  updatedAt: string
}

export interface SettingsResponse {
  info: DockerInfo
  diskUsage: DiskUsage
}

// Mirrors internal/docker.EnvVar. `value` is absent for secrets until
// revealed (the server withholds it, not just the UI).
export interface EnvVar {
  key: string
  value?: string
  secret: boolean
  imageDefault: boolean
}

// Mirrors internal/docker.ProjectPlan / UninstallResult.
export interface ProjectPlan {
  name: string
  containers: { id: string; name: string; service: string; state: string }[]
  networks: string[]
  volumes: string[]
  images: { id: string; ref: string }[]
}
export interface UninstallStep {
  kind: 'container' | 'network' | 'volume' | 'image'
  name: string
  ok: boolean
  error?: string
}
export interface UninstallBody {
  password: string
  confirmName: string
  removeVolumes: boolean
  removeImages: boolean
}

// Mirrors internal/docker.LifecycleJob / LifecycleStep.
export type LifecycleAction = 'start' | 'stop' | 'restart'
export interface LifecycleStep {
  service: string
  container: string
  action: 'start' | 'stop'
  state: 'pending' | 'running' | 'ok' | 'failed' | 'skipped'
  detail?: string
}
export interface LifecycleJob {
  project: string
  action: LifecycleAction
  phase: 'running' | 'done'
  result?: 'ok' | 'partial' | 'failed'
  steps: LifecycleStep[]
  startedAt: string
  finishedAt?: string
}

export interface ShellStatus {
  enabled: boolean
  idleTimeoutMin: number
  maxSessions: number
}

export const dockerApi = {
  // Always available; `enabled` tells the UI whether to offer the Shell button at all.
  shellStatus: () => api.get<ShellStatus>('/api/docker/shell/status'),
  containers: () => api.get<ContainersResponse>('/api/docker/containers'),
  containerAction: (id: string, action: 'start' | 'stop' | 'restart' | 'remove') =>
    api.post<ContainersResponse>(`/api/docker/containers/${encodeURIComponent(id)}/${action}`),

  containerEnv: (id: string) =>
    api.get<{ name: string; vars: EnvVar[] }>(`/api/docker/containers/${encodeURIComponent(id)}/env`),
  // Re-confirms the caller's own password server-side before returning the
  // withheld secret values.
  revealEnv: (id: string, password: string) =>
    api.post<{ values: Record<string, string> }>(`/api/docker/containers/${encodeURIComponent(id)}/env/reveal`, { password }),

  // Start/stop/restart a whole app in dependency order. Returns at once (202);
  // the work runs on the server and is read back with appJob().
  appLifecycle: (name: string, action: LifecycleAction) =>
    api.post<{ job: LifecycleJob }>(`/api/docker/projects/${encodeURIComponent(name)}/lifecycle`, { action }),
  appJob: (name: string) => api.get<{ job: LifecycleJob | null }>(`/api/docker/projects/${encodeURIComponent(name)}/lifecycle`),

  uninstallPlan: (name: string) =>
    api.get<ProjectPlan>(`/api/docker/projects/${encodeURIComponent(name)}/uninstall-plan`),
  // Re-confirms the caller's password + the typed app name server-side.
  uninstallProject: (name: string, body: UninstallBody) =>
    api.post<{ steps: UninstallStep[] }>(`/api/docker/projects/${encodeURIComponent(name)}/uninstall`, body),

  images: () => api.get<{ images: Image[] }>('/api/docker/images'),
  removeImage: (id: string) => api.post<{ images: Image[] }>(`/api/docker/images/${encodeURIComponent(id)}/remove`),

  volumes: () => api.get<{ volumes: Volume[] }>('/api/docker/volumes'),
  removeVolume: (name: string) =>
    api.post<{ volumes: Volume[] }>(`/api/docker/volumes/${encodeURIComponent(name)}/remove`),

  networks: () => api.get<{ networks: Network[] }>('/api/docker/networks'),
  removeNetwork: (id: string) => api.post<{ networks: Network[] }>(`/api/docker/networks/${encodeURIComponent(id)}/remove`),

  settings: () => api.get<SettingsResponse>('/api/docker/settings'),
  prune: (kind: 'containers' | 'images' | 'volumes' | 'networks' | 'all') =>
    api.post<SettingsResponse>(`/api/docker/prune/${kind}`),
}
