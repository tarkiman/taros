package docker

import (
	"context"
	"encoding/json"
	"errors"
	"net/url"
	"os"
	"sort"
	"strings"
	"sync"
)

const composeProjectLabel = "com.docker.compose.project"

// ErrProjectNotFound means no container, network or volume carries the
// project's compose label — there is nothing to uninstall.
var ErrProjectNotFound = errors.New("docker: compose project not found")

// ErrProjectRunsThis means the process asking for the uninstall is itself a
// container of that project — removing it would kill the caller mid-way.
var ErrProjectRunsThis = errors.New("docker: project contains the calling container")

// ProjectContainer / ProjectImage describe what an uninstall would touch.
type ProjectContainer struct {
	ID      string `json:"id"`
	Name    string `json:"name"`
	Service string `json:"service"`
	State   string `json:"state"`
}

type ProjectImage struct {
	ID  string `json:"id"`
	Ref string `json:"ref"` // human name, "repo:tag" or the short id when untagged
}

// ProjectPlan is the dry-run of UninstallProject: everything carrying the
// project's compose label. Networks/volumes declared `external: true` in
// the compose file are not created by compose, so they carry no label and
// are (deliberately) never listed here.
type ProjectPlan struct {
	Name       string             `json:"name"`
	Containers []ProjectContainer `json:"containers"`
	Networks   []string           `json:"networks"`
	Volumes    []string           `json:"volumes"`
	Images     []ProjectImage     `json:"images"`
}

// UninstallOptions: containers and networks are always removed; volumes
// (the app's data) and images are opt-in.
type UninstallOptions struct {
	RemoveVolumes bool `json:"removeVolumes"`
	RemoveImages  bool `json:"removeImages"`
}

// UninstallStep is the outcome of one removal. A failed step never aborts
// the rest — the caller shows the whole list.
type UninstallStep struct {
	Kind  string `json:"kind"` // container | network | volume | image
	Name  string `json:"name"`
	OK    bool   `json:"ok"`
	Error string `json:"error,omitempty"`
}

type UninstallResult struct {
	Steps []UninstallStep `json:"steps"`
}

func labelFilter(project string) string {
	f, _ := json.Marshal(map[string][]string{"label": {composeProjectLabel + "=" + project}})
	return url.QueryEscape(string(f))
}

// ProjectPlan lists what belongs to project. Returns ErrProjectNotFound when
// it owns nothing at all.
func (c *Client) ProjectPlan(ctx context.Context, project string) (ProjectPlan, error) {
	plan := ProjectPlan{Name: project, Containers: []ProjectContainer{}, Networks: []string{}, Volumes: []string{}, Images: []ProjectImage{}}
	filter := labelFilter(project)

	var raw []rawContainer
	if err := c.getJSON(ctx, "/containers/json?all=1&filters="+filter, &raw); err != nil {
		return plan, err
	}
	seen := map[string]bool{}
	for _, r := range raw {
		name := r.ID[:12]
		if len(r.Names) > 0 {
			name = strings.TrimPrefix(r.Names[0], "/")
		}
		plan.Containers = append(plan.Containers, ProjectContainer{ID: r.ID, Name: name, Service: r.Labels["com.docker.compose.service"], State: r.State})
		if r.ImageID != "" && !seen[r.ImageID] {
			seen[r.ImageID] = true
			plan.Images = append(plan.Images, ProjectImage{ID: r.ImageID, Ref: imageRef(r.Image, r.ImageID)})
		}
	}
	sort.Slice(plan.Containers, func(i, j int) bool { return plan.Containers[i].Name < plan.Containers[j].Name })
	sort.Slice(plan.Images, func(i, j int) bool { return plan.Images[i].Ref < plan.Images[j].Ref })

	var nets []struct{ Name string }
	if err := c.getJSON(ctx, "/networks?filters="+filter, &nets); err != nil {
		return plan, err
	}
	for _, n := range nets {
		plan.Networks = append(plan.Networks, n.Name)
	}
	sort.Strings(plan.Networks)

	var vols struct{ Volumes []struct{ Name string } }
	if err := c.getJSON(ctx, "/volumes?filters="+filter, &vols); err != nil {
		return plan, err
	}
	for _, v := range vols.Volumes {
		plan.Volumes = append(plan.Volumes, v.Name)
	}
	sort.Strings(plan.Volumes)

	if len(plan.Containers)+len(plan.Networks)+len(plan.Volumes) == 0 {
		return plan, ErrProjectNotFound
	}
	return plan, nil
}

// imageRef prefers the human "repo:tag" the container was created from;
// after a tag moved (e.g. watchtower pulled a newer image) Docker reports
// the bare sha256 there instead, so fall back to the short id.
func imageRef(image, id string) string {
	if image != "" && !strings.HasPrefix(image, "sha256:") {
		return image
	}
	return strings.TrimPrefix(id, "sha256:")[:12]
}

// selfContainerID returns the id prefix of the container this process runs
// in ("" when it runs on the host, the normal TarOS install). Docker sets a
// container's hostname to its 12-char short id unless overridden.
func selfContainerID() string {
	h, err := os.Hostname()
	if err != nil || len(h) != 12 {
		return ""
	}
	return h
}

// UninstallProject removes a compose project the way `docker compose down`
// would, via the Engine API: gracefully stops then removes every container
// (stopping first, in parallel, so databases get their SIGTERM and flush —
// a force-kill is what corrupts an AOF/WAL), then the project's networks.
// Volumes (the app's data) and images go only when asked. It never touches
// the compose files on disk. Individual failures (e.g. a volume still used
// by another project's container → 409) are reported per step, not fatal.
func (c *Client) UninstallProject(ctx context.Context, project string, opts UninstallOptions) (UninstallResult, error) {
	plan, err := c.ProjectPlan(ctx, project)
	if err != nil {
		return UninstallResult{}, err
	}
	if self := selfContainerID(); self != "" {
		for _, ct := range plan.Containers {
			if strings.HasPrefix(ct.ID, self) {
				return UninstallResult{}, ErrProjectRunsThis
			}
		}
	}

	var res UninstallResult
	add := func(kind, name string, err error) {
		s := UninstallStep{Kind: kind, Name: name, OK: err == nil}
		if err != nil {
			s.Error = err.Error()
			var apiErr *APIError
			if errors.As(err, &apiErr) {
				s.Error = strings.TrimSpace(apiErr.Message)
			}
		}
		res.Steps = append(res.Steps, s)
	}

	// Stop everything in parallel first; a stop failure is recorded via the
	// removal below (a running container refuses removal with 409).
	var wg sync.WaitGroup
	for _, ct := range plan.Containers {
		if ct.State != "running" && ct.State != "restarting" && ct.State != "paused" {
			continue
		}
		wg.Add(1)
		go func(id string) {
			defer wg.Done()
			_, _ = c.doSlow(ctx, "POST", "/containers/"+id+"/stop")
		}(ct.ID)
	}
	wg.Wait()

	for _, ct := range plan.Containers {
		path := "/containers/" + ct.ID
		if opts.RemoveVolumes {
			path += "?v=1" // also anonymous volumes (e.g. a database image's VOLUME)
		}
		_, err := c.do(ctx, "DELETE", path, nil)
		add("container", ct.Name, err)
	}
	for _, n := range plan.Networks {
		_, err := c.do(ctx, "DELETE", "/networks/"+url.PathEscape(n), nil)
		add("network", n, err)
	}
	if opts.RemoveVolumes {
		for _, v := range plan.Volumes {
			_, err := c.do(ctx, "DELETE", "/volumes/"+url.PathEscape(v), nil)
			add("volume", v, err)
		}
	}
	if opts.RemoveImages {
		for _, im := range plan.Images {
			_, err := c.do(ctx, "DELETE", "/images/"+im.ID, nil)
			add("image", im.Ref, err)
		}
	}
	return res, nil
}

// Removed counts successful steps of a kind (for the audit log).
func (r UninstallResult) Removed(kind string) int {
	n := 0
	for _, s := range r.Steps {
		if s.Kind == kind && s.OK {
			n++
		}
	}
	return n
}

// Failed counts failed steps.
func (r UninstallResult) Failed() int {
	n := 0
	for _, s := range r.Steps {
		if !s.OK {
			n++
		}
	}
	return n
}
