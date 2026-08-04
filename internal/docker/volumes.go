package docker

import (
	"context"
	"time"
)

type rawVolume struct {
	Name       string
	Driver     string
	Mountpoint string
	CreatedAt  string
	UsageData  *struct {
		Size     int64
		RefCount int64
	}
}

type rawVolumeList struct {
	Volumes []rawVolume
}

type Volume struct {
	Name       string    `json:"name"`
	Driver     string    `json:"driver"`
	Mountpoint string    `json:"mountpoint"`
	Created    time.Time `json:"created"`
	SizeBytes  int64     `json:"sizeBytes"` // -1 if unknown (usage data needs ?size=1, which is expensive daemon-side)
	InUse      bool      `json:"inUse"`
}

func (c *Client) ListVolumes(ctx context.Context) ([]Volume, error) {
	var raw rawVolumeList
	if err := c.getJSON(ctx, "/volumes", &raw); err != nil {
		return nil, err
	}

	out := make([]Volume, len(raw.Volumes))
	for i, r := range raw.Volumes {
		created, _ := time.Parse(time.RFC3339, r.CreatedAt)
		v := Volume{
			Name:       r.Name,
			Driver:     r.Driver,
			Mountpoint: r.Mountpoint,
			Created:    created,
			SizeBytes:  -1,
		}
		if r.UsageData != nil {
			v.SizeBytes = r.UsageData.Size
			v.InUse = r.UsageData.RefCount > 0
		}
		out[i] = v
	}
	return out, nil
}

// RemoveVolume fails (APIError 409) if a container still references it.
func (c *Client) RemoveVolume(ctx context.Context, name string) error {
	_, err := c.do(ctx, "DELETE", "/volumes/"+name, nil)
	return err
}
