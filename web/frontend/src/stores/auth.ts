import { defineStore } from 'pinia'
import { api, setCsrfToken } from '../api/client'

interface SessionInfo {
  authenticated: boolean
  // Password was correct but the account has 2FA enabled — no session was
  // created yet. See internal/web/handlers_auth.go handleAuthLogin.
  totpRequired?: boolean
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
    // Returns the raw response so the caller (LoginView) can branch on
    // totpRequired — a session is only actually created (and this store
    // updated) once that step, if needed, also passes.
    async login(username: string, password: string, totpCode?: string) {
      const info = await api.post<SessionInfo>('/api/auth/login', { username, password, totpCode })
      if (info.authenticated) this.apply(info)
      return info
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
