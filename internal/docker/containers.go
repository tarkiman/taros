package docker

import (
	"context"
	"fmt"
	"strings"
	"sync"
	"time"
)

type rawContainer struct {
	ID      string `json:"Id"`
	Names   []string
	Image   string
	State   string
	Status  string
	Created int64
	Ports   []struct {
		PrivatePort int
		PublicPort  int
		Type        string
	}
}

// Container is one row in the Containers tab — see docs/04-features.md §4.2.
type Container struct {
	ID      string    `json:"id"`
	Name    string    `json:"name"`
	Image   string    `json:"image"`
	State   string    `json:"state"`  // running, exited, paused, ...
	Status  string    `json:"status"` // human string, e.g. "Up 3 hours"
	Created time.Time `json:"created"`
	Ports   string    `json:"ports"` // pre-formatted "8080->80/tcp, ..." for simplicity in the template

	// Populated only for running containers — see ListWithStats.
	HasStats bool           `json:"hasStats"`
	Stats    ContainerStats `json:"stats"`
}

func (c *Client) ListContainers(ctx context.Context, all bool) ([]Container, error) {
	path := "/containers/json"
	if all {
		path += "?all=1"
	}
	var raw []rawContainer
	if err := c.getJSON(ctx, path, &raw); err != nil {
		return nil, err
	}

	out := make([]Container, len(raw))
	for i, r := range raw {
		name := r.ID[:12]
		if len(r.Names) > 0 {
			name = strings.TrimPrefix(r.Names[0], "/")
		}
		var ports []string
		for _, p := range r.Ports {
			if p.PublicPort != 0 {
				ports = append(ports, fmt.Sprintf("%d->%d/%s", p.PublicPort, p.PrivatePort, p.Type))
			}
		}
		out[i] = Container{
			ID:      r.ID,
			Name:    name,
			Image:   r.Image,
			State:   r.State,
			Status:  r.Status,
			Created: time.Unix(r.Created, 0),
			Ports:   strings.Join(ports, ", "),
		}
	}
	return out, nil
}

// ListWithStats lists every container and fetches live stats for the
// running ones concurrently (bounded worker pool) — see
// docs/09-deployment.md/docs/04-features.md for why this can't be a naive
// sequential loop: this dev box alone runs 37 containers, and Docker's
// stats endpoint has no bulk variant, only one-container-at-a-time.
func (c *Client) ListWithStats(ctx context.Context, all bool) ([]Container, error) {
	containers, err := c.ListContainers(ctx, all)
	if err != nil {
		return nil, err
	}

	const maxConcurrent = 8
	sem := make(chan struct{}, maxConcurrent)
	var wg sync.WaitGroup

	for i := range containers {
		if containers[i].State != "running" {
			continue
		}
		wg.Add(1)
		go func(i int) {
			defer wg.Done()
			sem <- struct{}{}
			defer func() { <-sem }()

			statCtx, cancel := context.WithTimeout(ctx, 3*time.Second)
			defer cancel()
			stats, err := c.ContainerStatsOnce(statCtx, containers[i].ID)
			if err == nil {
				containers[i].Stats = stats
				containers[i].HasStats = true
			}
		}(i)
	}
	wg.Wait()

	return containers, nil
}

func (c *Client) StartContainer(ctx context.Context, id string) error {
	_, err := c.do(ctx, "POST", "/containers/"+id+"/start", nil)
	return err
}

func (c *Client) StopContainer(ctx context.Context, id string) error {
	_, err := c.do(ctx, "POST", "/containers/"+id+"/stop", nil)
	return err
}

func (c *Client) RestartContainer(ctx context.Context, id string) error {
	_, err := c.do(ctx, "POST", "/containers/"+id+"/restart", nil)
	return err
}

// RemoveContainer fails (APIError 409) if the container is still running —
// Docker's own default behavior, which is what we want: no silent
// force-remove, see docs/04-features.md §4.2.
func (c *Client) RemoveContainer(ctx context.Context, id string) error {
	_, err := c.do(ctx, "DELETE", "/containers/"+id, nil)
	return err
}
