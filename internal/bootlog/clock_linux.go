//go:build linux

package bootlog

import "syscall"

// ClockSynced asks the kernel whether an NTP daemon (timesyncd, chrony, …)
// has disciplined the clock: adjtimex returns TIME_ERROR while unsynchronised.
// Deliberately not a daemon-specific file check.
func (OSSources) ClockSynced() bool {
	var tx syscall.Timex
	state, err := syscall.Adjtimex(&tx)
	if err != nil {
		return false
	}
	const timeError = 5
	return state != timeError
}
