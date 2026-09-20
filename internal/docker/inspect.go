package docker

import (
	"context"
	"fmt"
	"strings"
	"sync"
)

// ContainerInfo is the per-container health picture the alert monitor needs
// (internal/notify) — everything comes from one inspect call per container,
// which is what makes restart counts/exit codes/OOM available: the list
// endpoint only has a human "Status" string.
type ContainerInfo struct {
	ID            string
	Name          string
	Project       string // compose project, "" when not started by compose
	State         string // running, exited, restarting, paused, created, dead
	ExitCode      int
	OOMKilled     bool
	RestartCount  int
	RestartPolicy string // "no" when none — normalised, never ""
	Health        string // healthy | unhealthy | starting | "" (no healthcheck)
}

type rawInspectState struct {
	Name         string
	RestartCount int
	State        struct {
		Status    string
		ExitCode  int
		OOMKilled bool
		Health    *struct{ Status string }
	}
	HostConfig struct {
		RestartPolicy struct{ Name string }
	}
	Config struct {
		Labels map[string]string
	}
}

// InspectAll lists every container (running or not) and inspects each with
// bounded concurrency. A container that disappears between the list and its
// inspect (removed meanwhile → 404) is skipped, not an error.
func (c *Client) InspectAll(ctx context.Context) ([]ContainerInfo, error) {
	var list []rawContainer
	if err := c.getJSON(ctx, "/containers/json?all=1", &list); err != nil {
		return nil, err
	}

	out := make([]ContainerInfo, len(list))
	ok := make([]bool, len(list))
	sem := make(chan struct{}, 4)
	var wg sync.WaitGroup
	for i, r := range list {
		wg.Add(1)
		sem <- struct{}{}
		go func(i int, id string) {
			defer wg.Done()
			defer func() { <-sem }()
			var raw rawInspectState
			if err := c.getJSON(ctx, "/containers/"+id+"/json", &raw); err != nil {
				return
			}
			policy := raw.HostConfig.RestartPolicy.Name
			if policy == "" {
				policy = "no"
			}
			health := ""
			if raw.State.Health != nil {
				health = raw.State.Health.Status
			}
			out[i] = ContainerInfo{
				ID:            id,
				Name:          strings.TrimPrefix(raw.Name, "/"),
				Project:       raw.Config.Labels[composeProjectLabel],
				State:         raw.State.Status,
				ExitCode:      raw.State.ExitCode,
				OOMKilled:     raw.State.OOMKilled,
				RestartCount:  raw.RestartCount,
				RestartPolicy: policy,
				Health:        health,
			}
			ok[i] = true
		}(i, r.ID)
	}
	wg.Wait()

	res := make([]ContainerInfo, 0, len(out))
	for i := range out {
		if ok[i] {
			res = append(res, out[i])
		}
	}
	return res, nil
}

// LogTail returns the last n lines of a container's output (stdout+stderr),
// without following — the finite counterpart of ContainerLogs.
func (c *Client) LogTail(ctx context.Context, id string, n int) ([]string, error) {
	tty, err := c.containerTTY(ctx, id)
	if err != nil {
		return nil, err
	}
	path := fmt.Sprintf("/containers/%s/logs?follow=0&tail=%d&timestamps=1&stdout=1&stderr=1", id, n)
	resp, err := c.stream(ctx, "GET", path)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()

	ch := make(chan LogLine, 64)
	go func() {
		defer close(ch)
		if tty {
			readTTYLogs(resp.Body, ch)
		} else {
			readMultiplexedLogs(resp.Body, ch)
		}
	}()
	var lines []string
	for l := range ch {
		lines = append(lines, l.Text)
	}
	return lines, nil
}
