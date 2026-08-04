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
