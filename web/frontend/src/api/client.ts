// Thin fetch wrapper for the Go JSON API — see docs/06-api-ui-ux.md.
// Session auth is the httpOnly cookie (set by the server on login); CSRF
// token is opaque to this module and injected via setCsrfToken() by the
// auth store after login/session hydrate (kept out of here to avoid a
// circular import with stores/auth.ts).
import { i18n } from '../i18n'

let csrfToken = ''

export function setCsrfToken(token: string) {
  csrfToken = token
}

// Exposed for callers that can't go through request() below — e.g. the
// Files upload flow, which needs raw XMLHttpRequest (not fetch) to get
// upload progress events.
export function getCsrfToken(): string {
  return csrfToken
}

export class ApiError extends Error {
  status: number
  // Parsed JSON error body, when the server sent one (all our handlers do
  // via writeJSONError/writeJSON) — lets callers branch on structured
  // fields (e.g. docker's {error, enabled}) instead of parsing .message.
  body: unknown
  // code/params mirror internal/web's apiErrorBody (see errors.go there).
  // message above is already resolved to the translated text when code
  // is set and a matching `errors.<code>` key exists (see request()
  // below) — every existing `e instanceof ApiError ? e.message : t(...)`
  // call site across the app gets this for free, no per-call-site change
  // needed. code/params are still exposed here for the rare caller that
  // wants to branch on the code itself rather than display the message.
  code?: string
  params?: Record<string, unknown>
  constructor(status: number, message: string, body?: unknown, code?: string, params?: Record<string, unknown>) {
    super(message)
    this.status = status
    this.body = body
    this.code = code
    this.params = params
  }
}

// Resolves an apiErrorBody-shaped payload's message: prefer the
// translated `errors.<code>` text (interpolating params) when the code is
// present and a matching key exists in the active locale, otherwise fall
// back to the server's own `error` text exactly as before this existed.
// te() ("translation exists") is what makes the fallback safe — a code
// the frontend doesn't recognize (older cached JS after a backend
// deploy, or simply a code not yet mapped) never renders as a raw
// "errors.some_code" string.
function resolveErrorMessage(rawMessage: string, code?: string, params?: Record<string, unknown>): string {
  if (code && i18n.global.te(`errors.${code}`)) {
    return String(i18n.global.t(`errors.${code}`, params ?? {}))
  }
  return rawMessage
}

async function request<T>(method: string, path: string, body?: unknown): Promise<T> {
  const headers: Record<string, string> = {}
  if (body !== undefined) headers['Content-Type'] = 'application/json'
  if (method !== 'GET' && csrfToken) headers['X-CSRF-Token'] = csrfToken

  const res = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })

  if (res.status === 401) {
    csrfToken = ''
    if (location.pathname !== '/login') location.href = '/login'
    throw new ApiError(401, 'unauthorized')
  }
  if (!res.ok) {
    const contentType = res.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      const body = await res.json().catch(() => undefined)
      const errBody = body && typeof body === 'object' ? (body as { error?: unknown; code?: unknown; params?: unknown }) : undefined
      const code = errBody && typeof errBody.code === 'string' ? errBody.code : undefined
      const params = errBody && errBody.params && typeof errBody.params === 'object' ? (errBody.params as Record<string, unknown>) : undefined
      const rawMessage = errBody && 'error' in errBody ? String(errBody.error) : `${method} ${path} failed: ${res.status}`
      throw new ApiError(res.status, resolveErrorMessage(rawMessage, code, params), body, code, params)
    }
    const text = await res.text().catch(() => '')
    throw new ApiError(res.status, text || `${method} ${path} failed: ${res.status}`)
  }
  if (res.status === 204) return undefined as T
  const contentType = res.headers.get('content-type') || ''
  if (!contentType.includes('application/json')) return undefined as T
  return (await res.json()) as T
}

export const api = {
  get: <T>(path: string) => request<T>('GET', path),
  post: <T>(path: string, body?: unknown) => request<T>('POST', path, body),
  put: <T>(path: string, body?: unknown) => request<T>('PUT', path, body),
  del: <T>(path: string) => request<T>('DELETE', path),
}
