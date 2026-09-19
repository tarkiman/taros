package docker

import (
	"context"
	"regexp"
	"sort"
	"strings"
)

// EnvVar is one environment variable of a container. Secret marks values
// that look sensitive (see IsSecret) — the HTTP layer never sends those
// values without the caller re-confirming their password, see
// docs/04-features.md §4.2 "Environment variable".
type EnvVar struct {
	Key   string `json:"key"`
	Value string `json:"value,omitempty"` // omitted (empty) for masked secrets
	// Secret means the value was withheld / is withheld until revealed.
	Secret bool `json:"secret"`
	// ImageDefault is true when the variable (same key and value) comes
	// from the image itself (PATH, language versions, ...) rather than the
	// app's own configuration — lets the UI hide that noise.
	ImageDefault bool `json:"imageDefault"`
}

type rawEnvInspect struct {
	Name   string `json:"Name"`
	Image  string `json:"Image"` // image ID (sha256:...)
	Config struct {
		Env []string `json:"Env"`
	} `json:"Config"`
}

type rawImageEnvInspect struct {
	Config struct {
		Env []string `json:"Env"`
	} `json:"Config"`
}

// secretKeyRE matches variable *names* that conventionally hold secrets.
// Deliberately broad: masking a harmless value costs one click to reveal,
// leaking a real credential on screen (screenshots, screen-sharing, a
// shoulder) does not have an undo.
var secretKeyRE = regexp.MustCompile(`(?i)(pass(word|wd)?|secret|token|api[_-]?key|access[_-]?key|private|credential|auth|salt|signing|jwt|cert|dsn|connection[_-]?string|(^|_)key($|_))`)

// urlCredsRE matches a URL with embedded credentials
// (postgres://user:pass@host/db) in a value, whatever the key is called —
// DATABASE_URL, REDIS_URL, BROKER, ... all leak the password this way.
var urlCredsRE = regexp.MustCompile(`://[^/\s:@]+:[^@\s]+@`)

// IsSecret reports whether a variable should be masked by default.
func IsSecret(key, value string) bool {
	return secretKeyRE.MatchString(key) || urlCredsRE.MatchString(value)
}

func splitEnv(kv string) (string, string) {
	k, v, _ := strings.Cut(kv, "=")
	return k, v
}

// ContainerEnv returns the container's *effective* runtime environment
// (Config.Env from inspect — what the process actually received, after
// compose/.env/image merging), plus the container's name. Whether each entry
// is an image default is worked out by diffing against the image's own
// Config.Env (one extra Docker call, only when someone opens this view).
// Values of secrets are always included here; callers decide what to expose.
func (c *Client) ContainerEnv(ctx context.Context, id string) (name string, vars []EnvVar, err error) {
	var ct rawEnvInspect
	if err := c.getJSON(ctx, "/containers/"+id+"/json", &ct); err != nil {
		return "", nil, err
	}

	imageEnv := map[string]string{}
	var img rawImageEnvInspect
	// Best effort: an image that was since removed/untagged just means no
	// variable gets flagged as an image default, not a failure.
	if ct.Image != "" && c.getJSON(ctx, "/images/"+ct.Image+"/json", &img) == nil {
		for _, kv := range img.Config.Env {
			k, v := splitEnv(kv)
			imageEnv[k] = v
		}
	}

	for _, kv := range ct.Config.Env {
		k, v := splitEnv(kv)
		iv, inImage := imageEnv[k]
		vars = append(vars, EnvVar{
			Key:          k,
			Value:        v,
			Secret:       IsSecret(k, v),
			ImageDefault: inImage && iv == v,
		})
	}
	sort.SliceStable(vars, func(i, j int) bool { return vars[i].Key < vars[j].Key })
	return strings.TrimPrefix(ct.Name, "/"), vars, nil
}
