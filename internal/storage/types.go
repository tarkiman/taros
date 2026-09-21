package storage

import (
	"errors"
	"fmt"
	"strings"
)

// Partition states (Partition.State).
const (
	StateMounted     = "mounted"     // mounted read/write
	StateMountedRO   = "mounted_ro"  // mounted read-only (see Reason)
	StateUnmounted   = "unmounted"   // supported, not mounted: an auto-mount candidate
	StateUnsupported = "unsupported" // see Reason
	StateFailed      = "failed"      // mounting failed; see Error
	StateIgnored     = "ignored"     // the user said never to auto-mount it
	StateFstab       = "fstab"       // /etc/fstab manages it, so TarOS leaves it alone
)

// Reasons (Partition.Reason, Status.Blocked).
const (
	ReasonNoFilesystem = "no_filesystem"
	ReasonEncrypted    = "encrypted"
	ReasonLVM          = "lvm"
	ReasonRAID         = "raid"
	ReasonSwap         = "swap"
	ReasonUnknownFS    = "unknown_fs"
	ReasonDirty        = "dirty"
	ReasonHibernated   = "hibernated"
	ReasonDeviceRO     = "device_readonly"
	ReasonNotRoot      = "not_root"
	ReasonNoLsblk      = "no_lsblk"
	ReasonNoMount      = "no_mount"
	ReasonNotLinux     = "not_linux"
	ReasonDisabled     = "disabled"
)

// Partition is one mountable thing on an external disk: a partition, or the
// whole disk when it carries a filesystem directly.
type Partition struct {
	Name       string `json:"name"`
	Path       string `json:"path"`
	FSType     string `json:"fsType"`
	Label      string `json:"label"`
	UUID       string `json:"uuid"`
	Size       uint64 `json:"size"`
	State      string `json:"state"`
	Reason     string `json:"reason,omitempty"`
	Error      string `json:"error,omitempty"`
	MountPoint string `json:"mountPoint"`
	// ManagedBy: who mounted it — "taros" (under our mount base), "fstab", or
	// "other" (udisks, the user, …). Only "taros" and "other" may be unmounted here.
	ManagedBy  string   `json:"managedBy,omitempty"`
	TotalBytes uint64   `json:"totalBytes"`
	UsedBytes  uint64   `json:"usedBytes"`
	FreeBytes  uint64   `json:"freeBytes"`
	UsedBy     []string `json:"usedBy"` // shares/FTP folders inside the mount
}

// Disk is an external drive with its partitions.
type Disk struct {
	Name       string      `json:"name"`
	Path       string      `json:"path"`
	Model      string      `json:"model"`
	Vendor     string      `json:"vendor"`
	Size       uint64      `json:"size"`
	Bus        string      `json:"bus"` // "usb", or "" for a drive listed by configuration
	Removable  bool        `json:"removable"`
	Ejectable  bool        `json:"ejectable"` // nothing on it is managed by fstab
	Partitions []Partition `json:"partitions"`
}

// Status is everything the UI needs.
type Status struct {
	Supported bool     `json:"supported"`
	Reason    string   `json:"reason,omitempty"` // "not_linux"
	CanMount  bool     `json:"canMount"`
	Blocked   string   `json:"blocked,omitempty"` // why CanMount is false
	Settings  Settings `json:"settings"`
	MountBase string   `json:"mountBase"`
	Owner     string   `json:"owner"` // user the drive's files belong to (FAT/exFAT/NTFS)
	Disks     []Disk   `json:"disks"`
}

var (
	ErrUnavailable    = errors.New("storage: not available on this machine")
	ErrCannotMount    = errors.New("storage: TarOS cannot mount drives here")
	ErrNoSuchDevice   = errors.New("storage: no such external drive")
	ErrManagedByFstab = errors.New("storage: this drive is managed by /etc/fstab")
	ErrUnsupportedFS  = errors.New("storage: this filesystem cannot be mounted here")
	ErrAlreadyMounted = errors.New("storage: already mounted")
	ErrNotMounted     = errors.New("storage: not mounted")
	ErrMountpoint     = errors.New("storage: the mount point is in use")
	ErrDeviceGone     = errors.New("storage: the drive was removed")
)

// MountError: the mount command failed.
type MountError struct{ Detail string }

func (e *MountError) Error() string { return "storage: mount failed: " + e.Detail }

// UnmountError: umount failed for a reason other than being busy.
type UnmountError struct{ Detail string }

func (e *UnmountError) Error() string { return "storage: unmount failed: " + e.Detail }

// BusyProc is a process keeping a mount busy.
type BusyProc struct {
	PID  int    `json:"pid"`
	Name string `json:"name"`
}

// BusyError: the drive is in use, and by what.
type BusyError struct {
	Processes []BusyProc
	UsedBy    []string
}

func (e *BusyError) Error() string {
	var who []string
	for _, p := range e.Processes {
		who = append(who, fmt.Sprintf("%s (%d)", p.Name, p.PID))
	}
	who = append(who, e.UsedBy...)
	if len(who) == 0 {
		return "storage: the drive is busy"
	}
	return "storage: the drive is busy: " + strings.Join(who, ", ")
}

// Summary is a short human string for the error banner ("bash (1234), Photos").
func (e *BusyError) Summary() string {
	return strings.TrimPrefix(e.Error(), "storage: the drive is busy: ")
}
