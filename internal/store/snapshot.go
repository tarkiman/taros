package store

import "time"

// Snapshot is the latest reading of every metric TarOS collects. It is
// serialized as-is for both the initial dashboard render and each SSE tick
// (see internal/web/sse.go) — see docs/06-api-ui-ux.md §6.1.
type Snapshot struct {
	Time time.Time `json:"time"`

	CPU CPUInfo `json:"cpu"`
	Mem MemInfo `json:"mem"`

	Disks  []DiskMount `json:"disks"`
	DiskIO DiskIOInfo  `json:"diskIO"`

	Net []NetIface `json:"net"`

	Temps []TempSensor `json:"temps"`
}

type CPUInfo struct {
	TotalPercent float64   `json:"totalPercent"`
	CorePercent  []float64 `json:"corePercent"`
	LoadAvg1     float64   `json:"loadAvg1"`
	LoadAvg5     float64   `json:"loadAvg5"`
	LoadAvg15    float64   `json:"loadAvg15"`
}

type MemInfo struct {
	TotalBytes     uint64  `json:"totalBytes"`
	AvailableBytes uint64  `json:"availableBytes"`
	UsedBytes      uint64  `json:"usedBytes"`
	UsedPercent    float64 `json:"usedPercent"`
	BuffersBytes   uint64  `json:"buffersBytes"`
	CachedBytes    uint64  `json:"cachedBytes"`
	SwapTotalBytes uint64  `json:"swapTotalBytes"`
	SwapUsedBytes  uint64  `json:"swapUsedBytes"`
}

type DiskMount struct {
	MountPoint  string  `json:"mountPoint"`
	Device      string  `json:"device"`
	FSType      string  `json:"fsType"`
	TotalBytes  uint64  `json:"totalBytes"`
	UsedBytes   uint64  `json:"usedBytes"`
	FreeBytes   uint64  `json:"freeBytes"`
	UsedPercent float64 `json:"usedPercent"`
	Removable   bool    `json:"removable"`
}

type DiskIOInfo struct {
	ReadBytesPerSec  float64 `json:"readBytesPerSec"`
	WriteBytesPerSec float64 `json:"writeBytesPerSec"`
}

type NetIface struct {
	Name          string  `json:"name"`
	RxBytesPerSec float64 `json:"rxBytesPerSec"`
	TxBytesPerSec float64 `json:"txBytesPerSec"`
}

type TempSensor struct {
	Label   string  `json:"label"`
	Celsius float64 `json:"celsius"`
}

// ProcInfo is one row of the OS-level process list — see
// internal/collector/proc.go for how it's sampled (direct /proc reads,
// same as everything else in this package) and internal/web/handlers_processes.go
// for how it's served. Deliberately separate from Snapshot: it's a lot
// more data than the other per-tick fields, and unlike them nothing needs
// its history — only "right now, sorted" — so it doesn't ride along on
// every SSE push, just its own on-demand endpoint.
type ProcInfo struct {
	PID        int     `json:"pid"`
	Name       string  `json:"name"`
	CPUPercent float64 `json:"cpuPercent"`
	MemBytes   uint64  `json:"memBytes"`
}
