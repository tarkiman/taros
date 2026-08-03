package docker

import (
	"context"
	"fmt"
)

type Info struct {
	ServerVersion     string
	APIVersion        string
	OperatingSystem   string
	KernelVersion     string
	StorageDriver     string
	DockerRootDir     string
	ContainersRunning int
	ContainersPaused  int
	ContainersStopped int
	Images            int
}

func (c *Client) Info(ctx context.Context) (Info, error) {
	var raw struct {
		ServerVersion     string
		OperatingSystem   string
		KernelVersion     string
		Driver            string
		DockerRootDir     string
		ContainersRunning int
		ContainersPaused  int
		ContainersStopped int
		Images            int
	}
	if err := c.getJSON(ctx, "/info", &raw); err != nil {
		return Info{}, err
	}
	return Info{
		ServerVersion:     raw.ServerVersion,
		OperatingSystem:   raw.OperatingSystem,
		KernelVersion:     raw.KernelVersion,
		StorageDriver:     raw.Driver,
		DockerRootDir:     raw.DockerRootDir,
		ContainersRunning: raw.ContainersRunning,
		ContainersPaused:  raw.ContainersPaused,
		ContainersStopped: raw.ContainersStopped,
		Images:            raw.Images,
	}, nil
}

type DiskUsage struct {
	ImagesTotalBytes        int64
	ImagesReclaimableBytes  int64
	ContainersTotalBytes    int64
	VolumesTotalBytes       int64
	VolumesReclaimableBytes int64
}

type dfUsage struct {
	TotalSize   int64
	Reclaimable int64
}

// DiskUsage summarizes /system/df — see docs/04-features.md §4.2 "Settings".
// Deliberately only called on-demand (Settings tab open), never polled:
// measured ~2.3s on this dev box's 63 images/48 volumes, see
// docs/05-data-storage.md for why that rules out periodic polling.
//
// The response shape here (ImageUsage/ContainerUsage/VolumeUsage, each
// with a pre-aggregated TotalSize/Reclaimable) is what Docker 29.x
// actually returns — confirmed against the live daemon on this box, not
// assumed from older API docs, which describe a different
// Images[]/Containers[]/Volumes[] array shape that this daemon doesn't use.
func (c *Client) DiskUsage(ctx context.Context) (DiskUsage, error) {
	var raw struct {
		ImageUsage     dfUsage
		ContainerUsage dfUsage
		VolumeUsage    dfUsage
	}
	if err := c.getJSON(ctx, "/system/df", &raw); err != nil {
		return DiskUsage{}, err
	}

	return DiskUsage{
		ImagesTotalBytes:        raw.ImageUsage.TotalSize,
		ImagesReclaimableBytes:  raw.ImageUsage.Reclaimable,
		ContainersTotalBytes:    raw.ContainerUsage.TotalSize,
		VolumesTotalBytes:       raw.VolumeUsage.TotalSize,
		VolumesReclaimableBytes: raw.VolumeUsage.Reclaimable,
	}, nil
}

type PruneResult struct {
	ItemsDeleted   int
	SpaceReclaimed int64
}

// PruneKind is one of the four prune scopes exposed in Settings — see
// docs/04-features.md §4.2. There is no "all" API call; the handler layer
// runs all four and sums the result.
type PruneKind string

const (
	PruneContainers PruneKind = "containers"
	PruneImages     PruneKind = "images"
	PruneVolumes    PruneKind = "volumes"
	PruneNetworks   PruneKind = "networks"
)

func (c *Client) Prune(ctx context.Context, kind PruneKind) (PruneResult, error) {
	var raw struct {
		ContainersDeleted []string
		ImagesDeleted     []any
		VolumesDeleted    []string
		NetworksDeleted   []string
		SpaceReclaimed    int64
	}
	if err := c.doJSON(ctx, "POST", fmt.Sprintf("/%s/prune", kind), &raw); err != nil {
		return PruneResult{}, err
	}

	count := len(raw.ContainersDeleted) + len(raw.ImagesDeleted) + len(raw.VolumesDeleted) + len(raw.NetworksDeleted)
	return PruneResult{ItemsDeleted: count, SpaceReclaimed: raw.SpaceReclaimed}, nil
}
