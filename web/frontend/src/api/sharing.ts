import { api } from './client'

// Mirrors internal/sharing (status + model) and internal/web/handlers_sharing.go.
export type Severity = 'info' | 'warn' | 'high'

export interface Finding {
  severity: Severity
  code: string
  service?: 'smb' | 'ftp' | ''
  params?: Record<string, unknown>
}

export interface Iface {
  name: string
  kind: string
  ip: string
}

export interface Listener {
  address: string
  port: number
  process?: string
}

export interface InstallHint {
  packages: string[] | null
  command: string
}

export interface ShareInfo {
  name: string
  path: string
  guestOk: boolean
  readOnly: boolean
  browseable: boolean
  validUsers?: string[]
  comment?: string
  managed: boolean
}

export interface SMBStatus {
  installed: boolean
  binary?: string
  version?: string
  unit?: string
  nmbUnit?: string
  active: boolean
  enabled: boolean
  nmbActive: boolean
  managed: boolean
  standalone: boolean
  canManage: boolean
  manageBlocked?: 'not_installed' | 'not_root' | 'not_standalone' | 'no_tools' | ''
  shares: ShareInfo[]
  global: { workgroup?: string; minProtocol?: string; interfaces?: string[]; bindInterfacesOnly: boolean }
  users: string[]
  usersKnown: boolean
  listeners: Listener[]
  install: InstallHint
  configError?: string
}

export interface FTPStatus {
  installed: boolean
  managed: boolean
  canManage: boolean
  manageBlocked?: 'not_installed' | 'not_root' | 'no_tools' | 'no_config' | 'no_pam' | 'other_server' | 'chroot_custom' | ''
  binary?: string
  unit?: string
  active: boolean
  enabled: boolean
  otherServers?: string[]
  configPath?: string
  config: {
    anonymous: boolean
    anonWrite: boolean
    localLogin: boolean
    write: boolean
    tls: boolean
    forceTls: boolean
    chroot: boolean
    userListMode?: string
    pasvRange?: string
    accountsOnly: boolean
  }
  loginUsers?: string[]
  listeners: Listener[]
  install: InstallHint
}

export interface SharingStatus {
  supported: boolean
  reason?: string
  os: { id: string; name: string; versionId?: string; family: string; packageManager?: string }
  root: boolean
  systemd: boolean
  smb: SMBStatus
  ftp: FTPStatus
  firewall: { kind: string; active: boolean }
  otherManagers?: string[]
  selinux?: string
  interfaces: Iface[]
  ordinaryUsers: string[]
  findings: Finding[]
}

export interface FTPAccess {
  path: string
  mode: 'ro' | 'rw'
  runAs: string
}

export interface FTPSettings {
  tls: '' | 'optional' | 'required'
  onlyAccounts: boolean
  noAnonymous: boolean
  pasvMin: number
  pasvMax: number
}

export interface Account {
  name: string
  smb: boolean
  disabled: boolean
  createdAt: string
  ftp: FTPAccess | null
}

export interface Access {
  user: string
  mode: 'ro' | 'rw'
}

export interface Share {
  name: string
  path: string
  comment: string
  browseable: boolean
  access: Access[]
  runAs: string
}

export interface SharingModel {
  accounts: Account[]
  shares: Share[]
  interfaces: string[]
  workgroup: string
  ftp: FTPSettings
}

export interface SharingResponse {
  status: SharingStatus
  model: SharingModel
  roots: string[]
  denied: string[]
}

export interface Folder {
  name: string
  path: string
}

export type ServiceAction = 'start' | 'stop' | 'restart' | 'enable' | 'disable'

const p = '/api/sharing'
const enc = encodeURIComponent

export const sharingApi = {
  status: () => api.get<SharingResponse>(`${p}/status`),
  folders: (path: string) => api.get<{ folders: Folder[] }>(`${p}/folders?path=${enc(path)}`),
  adopt: (interfaces: string[], password: string) => api.post<{ ok: boolean }>(`${p}/smb/adopt`, { interfaces, password }),
  unadopt: (removeAccounts: boolean, password: string) =>
    api.post<{ ok: boolean }>(`${p}/smb/unadopt`, { removeAccounts, password }),
  setInterfaces: (interfaces: string[], password: string) =>
    api.post<{ ok: boolean }>(`${p}/smb/interfaces`, { interfaces, password }),
  service: (action: ServiceAction, password: string) => api.post<{ ok: boolean }>(`${p}/smb/service`, { action, password }),
  saveShare: (share: Share, replace: string, password: string) =>
    api.post<{ ok: boolean }>(`${p}/smb/shares`, { share, replace, password }),
  deleteShare: (name: string, password: string) => api.post<{ ok: boolean }>(`${p}/smb/shares/${enc(name)}/delete`, { password }),
  addAccount: (name: string, accountPassword: string, password: string) =>
    api.post<{ ok: boolean }>(`${p}/accounts`, { name, accountPassword, password }),
  setAccountPassword: (name: string, accountPassword: string, password: string) =>
    api.post<{ ok: boolean }>(`${p}/accounts/${enc(name)}/password`, { accountPassword, password }),
  setAccountDisabled: (name: string, disabled: boolean, password: string) =>
    api.post<{ ok: boolean }>(`${p}/accounts/${enc(name)}/disabled`, { disabled, password }),
  ftpAdopt: (password: string) => api.post<{ ok: boolean }>(`${p}/ftp/adopt`, { password }),
  ftpUnadopt: (password: string) => api.post<{ ok: boolean }>(`${p}/ftp/unadopt`, { password }),
  ftpSettings: (settings: FTPSettings, password: string) => api.post<{ ok: boolean }>(`${p}/ftp/settings`, { settings, password }),
  ftpService: (action: ServiceAction, password: string) => api.post<{ ok: boolean }>(`${p}/ftp/service`, { action, password }),
  setFtpAccess: (name: string, access: FTPAccess, accountPassword: string, password: string) =>
    api.post<{ ok: boolean }>(`${p}/accounts/${enc(name)}/ftp`, { access, accountPassword, password }),
  clearFtpAccess: (name: string) => api.post<{ ok: boolean }>(`${p}/accounts/${enc(name)}/ftp/clear`, {}),
  deleteAccount: (name: string, password: string) => api.post<{ ok: boolean }>(`${p}/accounts/${enc(name)}/delete`, { password }),
}
