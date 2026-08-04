package docker

import "context"

type rawStats struct {
	CPUStats struct {
		CPUUsage struct {
			TotalUsage uint64 `json:"total_usage"`
		} `json:"cpu_usage"`
		SystemCPUUsage uint64 `json:"system_cpu_usage"`
		OnlineCPUs     uint32 `json:"online_cpus"`
	} `json:"cpu_stats"`
	PreCPUStats struct {
		CPUUsage struct {
			TotalUsage uint64 `json:"total_usage"`
		} `json:"cpu_usage"`
		SystemCPUUsage uint64 `json:"system_cpu_usage"`
	} `json:"precpu_stats"`
	MemoryStats struct {
		// Usage/Limit are the convenience fields Docker fills on cgroup v1.
		// On some cgroup v2 hosts they come back 0 — even `docker stats`
		// itself shows "0B / 0B" there, it's a daemon/host quirk, not
		// something a client can work around. We degrade gracefully
		// (0%, shown as-is) rather than guessing from raw cgroup files.
		Usage uint64 `json:"usage"`
		Limit uint64 `json:"limit"`
	} `json:"memory_stats"`
	Networks map[string]struct {
		RxBytes uint64 `json:"rx_bytes"`
		TxBytes uint64 `json:"tx_bytes"`
	} `json:"networks"`
	BlkioStats struct {
		IOServiceBytesRecursive []struct {
			Op    string `json:"op"`
			Value uint64 `json:"value"`
		} `json:"io_service_bytes_recursive"`
	} `json:"blkio_stats"`
}

// Numeric fields are int64 (not uint64) purely so templates can pass them
// to the same formatBytes helper used for Image/Volume/DiskUsage sizes
// without a separate conversion function — Go templates can't convert
// types on their own.
type ContainerStats struct {
	CPUPercent      float64 `json:"cpuPercent"`
	MemUsageBytes   int64   `json:"memUsageBytes"`
	MemLimitBytes   int64   `json:"memLimitBytes"`
	MemPercent      float64 `json:"memPercent"`
	NetRxBytes      int64   `json:"netRxBytes"`
	NetTxBytes      int64   `json:"netTxBytes"`
	BlockReadBytes  int64   `json:"blockReadBytes"`
	BlockWriteBytes int64   `json:"blockWriteBytes"`
}

// ContainerStatsOnce fetches a single-shot stats sample. Docker's
// stream=false mode internally waits for a second CPU sample before
// responding, so precpu_stats is already usable — no need to poll twice
// ourselves (unlike the /proc-based host collectors in internal/collector).
func (c *Client) ContainerStatsOnce(ctx context.Context, id string) (ContainerStats, error) {
	var raw rawStats
	if err := c.getJSON(ctx, "/containers/"+id+"/stats?stream=false", &raw); err != nil {
		return ContainerStats{}, err
	}

	var out ContainerStats

	cpuDelta := float64(raw.CPUStats.CPUUsage.TotalUsage) - float64(raw.PreCPUStats.CPUUsage.TotalUsage)
	systemDelta := float64(raw.CPUStats.SystemCPUUsage) - float64(raw.PreCPUStats.SystemCPUUsage)
	if systemDelta > 0 && cpuDelta >= 0 {
		numCPUs := float64(raw.CPUStats.OnlineCPUs)
		if numCPUs == 0 {
			numCPUs = 1
		}
		out.CPUPercent = (cpuDelta / systemDelta) * numCPUs * 100
	}

	out.MemUsageBytes = int64(raw.MemoryStats.Usage)
	out.MemLimitBytes = int64(raw.MemoryStats.Limit)
	if raw.MemoryStats.Limit > 0 {
		out.MemPercent = float64(raw.MemoryStats.Usage) / float64(raw.MemoryStats.Limit) * 100
	}

	for _, n := range raw.Networks {
		out.NetRxBytes += int64(n.RxBytes)
		out.NetTxBytes += int64(n.TxBytes)
	}

	for _, e := range raw.BlkioStats.IOServiceBytesRecursive {
		switch e.Op {
		case "read", "Read":
			out.BlockReadBytes += int64(e.Value)
		case "write", "Write":
			out.BlockWriteBytes += int64(e.Value)
		}
	}

	return out, nil
}
