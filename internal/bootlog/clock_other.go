//go:build !linux

package bootlog

// ClockSynced is unknown off Linux (the ledger isn't started there anyway).
func (OSSources) ClockSynced() bool { return false }
