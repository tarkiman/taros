// Mirrors internal/systemd/units.go Unit json tags, plus the Protected
// flag the server stamps on from config.yaml systemd.protectedUnits.
export interface Unit {
  name: string
  load: string // loaded, not-found, ...
  active: string // active, inactive, failed, activating, ...
  sub: string // running, exited, dead, waiting, ...
  description: string
  enabled: string // enabled, disabled, static, masked, "" if unknown
  protected: boolean
}
