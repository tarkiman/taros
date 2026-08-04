import { defineStore } from 'pinia'
import { api, setCsrfToken } from '../api/client'

interface SessionInfo {
  authenticated: boolean
  username?: string
  csrfToken?: string
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    authenticated: false,
    username: '',
    ready: false,
  }),
  actions: {
    // Called once on app boot: reads the httpOnly session cookie server-side
    // and, if valid, returns the per-session CSRF token — see
    // internal/web/handlers_auth.go handleAuthSession.
    async hydrate() {
      try {
        const info = await api.get<SessionInfo>('/api/auth/session')
        this.apply(info)
      } catch {
        this.authenticated = false
      } finally {
        this.ready = true
      }
    },
    async login(username: string, password: string) {
      const info = await api.post<SessionInfo>('/api/auth/login', { username, password })
      this.apply(info)
    },
    async logout() {
      try {
        await api.post('/api/auth/logout')
      } finally {
        this.clear()
      }
    },
    apply(info: SessionInfo) {
      this.authenticated = info.authenticated
      this.username = info.username ?? ''
      setCsrfToken(info.csrfToken ?? '')
    },
    clear() {
      this.authenticated = false
      this.username = ''
      setCsrfToken('')
    },
  },
})
