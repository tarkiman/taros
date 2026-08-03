package docker

import (
	"context"
	"strings"
	"time"
)

type rawImage struct {
	ID         string `json:"Id"`
	RepoTags   []string
	Created    int64
	Size       int64
	Containers int64
}

type Image struct {
	ID         string
	Tag        string // "repo:tag", or "<none>:<none>" for dangling
	Dangling   bool
	Created    time.Time
	SizeBytes  int64
	Containers int64 // -1 if the daemon didn't report it (list without ?size=)
}

func (c *Client) ListImages(ctx context.Context) ([]Image, error) {
	var raw []rawImage
	if err := c.getJSON(ctx, "/images/json", &raw); err != nil {
		return nil, err
	}

	out := make([]Image, len(raw))
	for i, r := range raw {
		tag := "<none>:<none>"
		dangling := true
		if len(r.RepoTags) > 0 && r.RepoTags[0] != "<none>:<none>" {
			tag = strings.Join(r.RepoTags, ", ")
			dangling = false
		}
		out[i] = Image{
			ID:         r.ID,
			Tag:        tag,
			Dangling:   dangling,
			Created:    time.Unix(r.Created, 0),
			SizeBytes:  r.Size,
			Containers: r.Containers,
		}
	}
	return out, nil
}

// RemoveImage fails (APIError 409) if a container still references the
// image — no force-remove, see docs/04-features.md §4.2.
func (c *Client) RemoveImage(ctx context.Context, id string) error {
	_, err := c.do(ctx, "DELETE", "/images/"+id, nil)
	return err
}
