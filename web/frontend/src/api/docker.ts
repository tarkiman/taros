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

export const dockerApi = {
  containers: () => api.get<ContainersResponse>('/api/docker/containers'),
  containerAction: (id: string, action: 'start' | 'stop' | 'restart' | 'remove') =>
    api.post<ContainersResponse>(`/api/docker/containers/${encodeURIComponent(id)}/${action}`),

  containerEnv: (id: string) =>
    api.get<{ name: string; vars: EnvVar[] }>(`/api/docker/containers/${encodeURIComponent(id)}/env`),
  // Re-confirms the caller's own password server-side before returning the
  // withheld secret values.
  revealEnv: (id: string, password: string) =>
    api.post<{ values: Record<string, string> }>(`/api/docker/containers/${encodeURIComponent(id)}/env/reveal`, { password }),

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
