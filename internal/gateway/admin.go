package gateway

import (
	"bytes"
	"context"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"net/url"
	"sort"
	"strconv"
	"strings"
	"sync"
	"time"

	"gopkg.in/yaml.v3"
)

// Admin changes the gateway's go2rtc relay through go2rtc's own HTTP API (stage 2 of
// docs/04-features.md §4.18): add, change and remove relayed streams, and rotate the
// RTSP login the central NVR uses. go2rtc writes stream PUT/DELETE into its own
// go2rtc.yaml, so nothing here needs to know where that file lives or touch Docker.
//
// Passwords in source URLs never leave this package except inside the URL handed back
// to go2rtc; everything returned for display goes through DescribeSource.
type Admin struct {
	base string
	http *http.Client
}

var (
	ErrStreamExists   = errors.New("stream already exists")
	ErrStreamNotFound = errors.New("stream not found")
)

// adminMu serialises changes: go2rtc rewrites go2rtc.yaml on every change, and the RTSP
// rotation is a read-modify-write of the whole file.
var adminMu sync.Mutex

func NewAdmin(base string) *Admin {
	return &Admin{base: strings.TrimRight(base, "/"), http: &http.Client{Timeout: 10 * time.Second}}
}

// RelayConfig is the configured side of the relay (what go2rtc.yaml says), as opposed to
// the live RelayState in the monitor snapshot.
type RelayConfig struct {
	RTSP    RTSPInfo       `json:"rtsp"`
	Streams []StreamConfig `json:"streams"`
}

type RTSPInfo struct {
	Port        int    `json:"port"`
	Username    string `json:"username"`
	HasPassword bool   `json:"hasPassword"`
}

type StreamConfig struct {
	Name     string       `json:"name"`
	Sources  []SourceInfo `json:"sources"`
	Editable bool         `json:"editable"`
	Reason   string       `json:"reason,omitempty"` // why not editable: missing, multiple, xiaomi, scheme
}

type rawConfig struct {
	RTSP struct {
		Listen   string `yaml:"listen"`
		Username string `yaml:"username"`
		Password string `yaml:"password"`
	} `yaml:"rtsp"`
	Streams map[string]any `yaml:"streams"`
}

func (a *Admin) rawConfig(ctx context.Context) ([]byte, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, a.base+"/api/config", nil)
	if err != nil {
		return nil, err
	}
	resp, err := a.http.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("go2rtc GET /api/config: HTTP %d", resp.StatusCode)
	}
	return io.ReadAll(io.LimitReader(resp.Body, 1<<20))
}

func (a *Admin) config(ctx context.Context) (*rawConfig, error) {
	b, err := a.rawConfig(ctx)
	if err != nil {
		return nil, err
	}
	var c rawConfig
	if err := yaml.Unmarshal(b, &c); err != nil {
		return nil, fmt.Errorf("go2rtc.yaml: %w", err)
	}
	return &c, nil
}

// parseSources normalises the streams section: each value is a string or a list.
func parseSources(streams map[string]any) map[string][]string {
	out := map[string][]string{}
	for name, v := range streams {
		switch t := v.(type) {
		case string:
			out[name] = []string{t}
		case []any:
			for _, x := range t {
				if s, ok := x.(string); ok {
					out[name] = append(out[name], s)
				}
			}
		default:
			out[name] = nil
		}
	}
	return out
}

// rtspPort reads the port of rtsp.listen (":8554", "0.0.0.0:8554"); go2rtc's default
// is 8554.
func rtspPort(listen string) int {
	if listen == "" {
		return 8554
	}
	_, p, err := net.SplitHostPort(listen)
	if err != nil {
		return 8554
	}
	n, err := strconv.Atoi(p)
	if err != nil {
		return 8554
	}
	return n
}

// Relays lists the configured streams and the RTSP login (without its password).
func (a *Admin) Relays(ctx context.Context) (RelayConfig, error) {
	c, err := a.config(ctx)
	if err != nil {
		return RelayConfig{}, err
	}
	out := RelayConfig{
		RTSP:    RTSPInfo{Port: rtspPort(c.RTSP.Listen), Username: c.RTSP.Username, HasPassword: c.RTSP.Password != ""},
		Streams: []StreamConfig{},
	}
	for name, srcs := range parseSources(c.Streams) {
		sc := StreamConfig{Name: name, Sources: []SourceInfo{}}
		for _, s := range srcs {
			sc.Sources = append(sc.Sources, DescribeSource(s))
		}
		sc.Editable, sc.Reason = Editable(srcs)
		out.Streams = append(out.Streams, sc)
	}
	sort.Slice(out.Streams, func(i, j int) bool { return out.Streams[i].Name < out.Streams[j].Name })
	return out, nil
}

// Sources returns the full source URLs (credentials included) of one stream, for
// keeping an unchanged password when the stream is edited. Never send these to a client.
func (a *Admin) Sources(ctx context.Context, name string) ([]string, error) {
	c, err := a.config(ctx)
	if err != nil {
		return nil, err
	}
	srcs, ok := parseSources(c.Streams)[name]
	if !ok {
		return nil, ErrStreamNotFound
	}
	return srcs, nil
}

// AllSources returns every stream's sources, credentials included (server-side only).
func (a *Admin) AllSources(ctx context.Context) (map[string][]string, error) {
	c, err := a.config(ctx)
	if err != nil {
		return nil, err
	}
	return parseSources(c.Streams), nil
}

// CreateStream adds a new stream; it fails with ErrStreamExists rather than overwrite.
func (a *Admin) CreateStream(ctx context.Context, name, src string) error {
	adminMu.Lock()
	defer adminMu.Unlock()
	srcs, err := a.AllSources(ctx)
	if err != nil {
		return err
	}
	if _, ok := srcs[name]; ok {
		return ErrStreamExists
	}
	return a.put(ctx, name, src)
}

// UpdateStream replaces the source of an existing stream.
func (a *Admin) UpdateStream(ctx context.Context, name, src string) error {
	adminMu.Lock()
	defer adminMu.Unlock()
	srcs, err := a.AllSources(ctx)
	if err != nil {
		return err
	}
	if _, ok := srcs[name]; !ok {
		return ErrStreamNotFound
	}
	return a.put(ctx, name, src)
}

// put uses PUT, which go2rtc also writes to go2rtc.yaml (PATCH would only change memory).
func (a *Admin) put(ctx context.Context, name, src string) error {
	q := url.Values{"name": {name}, "src": {src}}
	return a.do(ctx, http.MethodPut, "/api/streams?"+q.Encode(), nil)
}

// DeleteStream removes a stream from go2rtc and go2rtc.yaml.
func (a *Admin) DeleteStream(ctx context.Context, name string) error {
	adminMu.Lock()
	defer adminMu.Unlock()
	srcs, err := a.AllSources(ctx)
	if err != nil {
		return err
	}
	if _, ok := srcs[name]; !ok {
		return ErrStreamNotFound
	}
	return a.do(ctx, http.MethodDelete, "/api/streams?"+url.Values{"src": {name}}.Encode(), nil)
}

// SetRTSPLogin sets rtsp.username/password in go2rtc.yaml and restarts go2rtc so the
// new login takes effect. The file is edited as a YAML node tree, so comments and the
// rest of the file survive (go2rtc's own PATCH /api/config would drop them). Every
// consumer still on the old login is cut off by the restart.
func (a *Admin) SetRTSPLogin(ctx context.Context, username, password string) error {
	adminMu.Lock()
	defer adminMu.Unlock()
	raw, err := a.rawConfig(ctx)
	if err != nil {
		return err
	}
	out, err := setRTSPLogin(raw, username, password)
	if err != nil {
		return err
	}
	if err := a.do(ctx, http.MethodPost, "/api/config", out); err != nil {
		return err
	}
	return a.do(ctx, http.MethodPost, "/api/restart", nil)
}

// setRTSPLogin rewrites rtsp.username and rtsp.password in a go2rtc.yaml document,
// adding the rtsp: section or the keys when missing.
func setRTSPLogin(raw []byte, username, password string) ([]byte, error) {
	var doc yaml.Node
	if err := yaml.Unmarshal(raw, &doc); err != nil {
		return nil, fmt.Errorf("go2rtc.yaml: %w", err)
	}
	if doc.Kind == 0 { // empty file
		doc = yaml.Node{Kind: yaml.DocumentNode, Content: []*yaml.Node{{Kind: yaml.MappingNode}}}
	}
	if doc.Kind != yaml.DocumentNode || len(doc.Content) != 1 || doc.Content[0].Kind != yaml.MappingNode {
		return nil, errors.New("go2rtc.yaml: top level is not a mapping")
	}
	rtsp := mapValue(doc.Content[0], "rtsp")
	if rtsp == nil {
		rtsp = &yaml.Node{Kind: yaml.MappingNode}
		doc.Content[0].Content = append(doc.Content[0].Content, &yaml.Node{Kind: yaml.ScalarNode, Value: "rtsp"}, rtsp)
	}
	if rtsp.Kind != yaml.MappingNode {
		return nil, errors.New("go2rtc.yaml: rtsp is not a mapping")
	}
	setScalar(rtsp, "username", username)
	setScalar(rtsp, "password", password)
	var buf bytes.Buffer
	enc := yaml.NewEncoder(&buf)
	enc.SetIndent(2)
	if err := enc.Encode(&doc); err != nil {
		return nil, err
	}
	enc.Close()
	return buf.Bytes(), nil
}

func mapValue(m *yaml.Node, key string) *yaml.Node {
	for i := 0; i+1 < len(m.Content); i += 2 {
		if m.Content[i].Value == key {
			return m.Content[i+1]
		}
	}
	return nil
}

func setScalar(m *yaml.Node, key, value string) {
	if v := mapValue(m, key); v != nil {
		*v = yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: value, Style: yaml.DoubleQuotedStyle, LineComment: v.LineComment}
		return
	}
	m.Content = append(m.Content,
		&yaml.Node{Kind: yaml.ScalarNode, Value: key},
		&yaml.Node{Kind: yaml.ScalarNode, Tag: "!!str", Value: value, Style: yaml.DoubleQuotedStyle})
}

func (a *Admin) do(ctx context.Context, method, path string, body []byte) error {
	var r io.Reader
	if body != nil {
		r = bytes.NewReader(body)
	}
	req, err := http.NewRequestWithContext(ctx, method, a.base+path, r)
	if err != nil {
		return err
	}
	resp, err := a.http.Do(req)
	if err != nil {
		return err
	}
	defer resp.Body.Close()
	if resp.StatusCode/100 != 2 {
		msg, _ := io.ReadAll(io.LimitReader(resp.Body, 300))
		p, _, _ := strings.Cut(path, "?")
		return fmt.Errorf("go2rtc %s %s: HTTP %d %s", method, p, resp.StatusCode, strings.TrimSpace(redactURLs(string(msg))))
	}
	_, _ = io.Copy(io.Discard, resp.Body)
	return nil
}

// redactURLs strips credentials from any URL quoted in a go2rtc error message.
func redactURLs(s string) string {
	return credRe.ReplaceAllString(s, "$1://")
}
