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

export const dockerApi = {
  containers: () => api.get<ContainersResponse>('/api/docker/containers'),
  containerAction: (id: string, action: 'start' | 'stop' | 'restart' | 'remove') =>
    api.post<ContainersResponse>(`/api/docker/containers/${encodeURIComponent(id)}/${action}`),

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
