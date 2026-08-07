// Mirrors internal/quicklinks.Link json tags.
export interface QuickLink {
  id: string
  label: string
  url: string
  // Empty string, an http(s) URL, or a "data:<mime>;base64,..." URI — see
  // internal/quicklinks.normalizeIcon. Always safe to render via <img src>.
  icon: string
}
