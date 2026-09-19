import type { Container } from '../types/docker'

export type Verdict = 'ok' | 'warn' | 'danger' | 'stopped'

// One docker compose project (an "application"). name === '' is the bucket
// for containers not started by compose.
export interface ProjectGroup {
  name: string
  containers: Container[]
  running: number
  verdict: Verdict
  cpu: number
  mem: number
  workingDir: string
}

export function verdictFor(cs: Container[]): Verdict {
  const running = cs.filter((c) => c.state === 'running').length
  if (running === 0) return 'stopped'
  if (cs.some((c) => c.health === 'unhealthy' || c.state === 'restarting')) return 'danger'
  if (running < cs.length || cs.some((c) => c.health === 'starting' || c.state === 'paused')) return 'warn'
  return 'ok'
}

const rank: Record<Verdict, number> = { danger: 0, warn: 1, stopped: 2, ok: 3 }

// Groups by compose project: problems first, the non-compose bucket last.
// Shared by the Docker "Aplikasi" tab and the Dashboard tiles so both agree
// on what "healthy" means.
export function groupProjects(containers: Container[]): ProjectGroup[] {
  const by = new Map<string, Container[]>()
  for (const c of containers) {
    const key = c.project || ''
    if (!by.has(key)) by.set(key, [])
    by.get(key)!.push(c)
  }
  const out: ProjectGroup[] = []
  for (const [name, cs] of by) {
    const sorted = cs.slice().sort((a, b) => (a.service || a.name).localeCompare(b.service || b.name))
    const running = sorted.filter((c) => c.state === 'running')
    out.push({
      name,
      containers: sorted,
      running: running.length,
      verdict: verdictFor(sorted),
      cpu: running.reduce((n, c) => n + (c.hasStats ? c.stats.cpuPercent : 0), 0),
      mem: running.reduce((n, c) => n + (c.hasStats ? c.stats.memUsageBytes : 0), 0),
      workingDir: sorted.find((c) => c.workingDir)?.workingDir ?? '',
    })
  }
  return out.sort((a, b) => {
    if ((a.name === '') !== (b.name === '')) return a.name === '' ? 1 : -1
    return rank[a.verdict] - rank[b.verdict] || a.name.localeCompare(b.name)
  })
}

// Deterministic hue from a project name, so each app keeps the same default
// avatar color across reloads without storing anything.
export function hueFor(name: string): number {
  let h = 0
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) % 360
  return h
}
