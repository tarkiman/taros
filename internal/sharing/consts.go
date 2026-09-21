package sharing

// Markers delimiting the only part of smb.conf TarOS ever edits.
const (
	markBegin = "# >>> TarOS managed — do not edit between these markers"
	markEnd   = "# <<< TarOS managed"

	managedGlobalFile = "taros-global.conf"
	managedSharesFile = "taros-shares.conf"
)
