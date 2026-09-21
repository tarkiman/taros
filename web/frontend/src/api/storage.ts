import { api } from './client'

// Mirrors internal/storage.
export type PartState = 'mounted' | 'mounted_ro' | 'unmounted' | 'unsupported' | 'failed' | 'ignored' | 'fstab'

export interface StoragePartition {
  name: string
  path: string
  fsType: string
  label: string
  uuid: string
  size: number
  state: PartState
  reason?: string
  error?: string
  mountPoint: string
  managedBy?: 'taros' | 'fstab' | 'other'
  totalBytes: number
  usedBytes: number
  freeBytes: number
  usedBy: string[]
}

export interface StorageDisk {
  name: string
  path: string
  model: string
  vendor: string
  size: number
  bus: string
  removable: boolean
  ejectable: boolean
  partitions: StoragePartition[]
}

export interface StorageSettings {
  autoMount: boolean
  noExec: boolean
  ignored: string[]
}

export interface StorageStatus {
  supported: boolean
  reason?: string
  canMount: boolean
  blocked?: string
  settings: StorageSettings
  mountBase: string
  owner: string
  disks: StorageDisk[]
}

export const storageApi = {
  devices: () => api.get<StorageStatus>('/api/storage/devices'),
  mount: (device: string) => api.post<{ ok: boolean }>('/api/storage/mount', { device }),
  unmount: (device: string) => api.post<{ ok: boolean }>('/api/storage/unmount', { device }),
  eject: (device: string) => api.post<{ ok: boolean }>('/api/storage/eject', { device }),
  ignore: (device: string, ignore: boolean) => api.post<{ ok: boolean }>('/api/storage/ignore', { device, ignore }),
  settings: (autoMount: boolean, noExec: boolean, password: string) =>
    api.post<{ ok: boolean }>('/api/storage/settings', { autoMount, noExec, password }),
}
