// navigator.clipboard only exists in secure contexts (https/localhost) —
// TarOS is usually opened over plain http on the LAN (http://192.168.x.x:8090),
// where it's undefined, so fall back to the old execCommand path. Throws if
// both routes fail so callers can show their own error toast.
export async function copyText(text: string): Promise<void> {
  if (navigator.clipboard && window.isSecureContext) {
    await navigator.clipboard.writeText(text)
    return
  }
  const ta = document.createElement('textarea')
  ta.value = text
  ta.style.position = 'fixed'
  ta.style.opacity = '0'
  document.body.appendChild(ta)
  ta.select()
  const ok = document.execCommand('copy')
  document.body.removeChild(ta)
  if (!ok) throw new Error('copy failed')
}
