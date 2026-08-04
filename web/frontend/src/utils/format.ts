// Mirrors internal/web/funcs.go formatBytes exactly — keep the two in sync.
export function formatBytes(n: number): string {
  if (n < 0 || Number.isNaN(n)) return '—'
  const unit = 1024
  if (n < unit) return `${n.toFixed(0)} B`
  let div = unit
  let exp = 0
  for (let v = n / unit; v >= unit; v /= unit) {
    div *= unit
    exp++
  }
  const units = 'KMGTPE'
  return `${(n / div).toFixed(1)} ${units[exp]}B`
}

// Fixed "YYYY-MM-DD HH:mm" format regardless of browser locale — matches
// the old server-rendered `.Format("2006-01-02 15:04")` so timestamps
// don't shift order/format depending on who's viewing the dashboard.
export function formatDate(iso: string): string {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  const pad = (n: number) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}
