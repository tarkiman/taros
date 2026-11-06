package gateway

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"net/url"
	"sort"
	"strings"
	"time"
)

// RelayState lists the go2rtc streams this gateway serves.
type RelayState struct {
	Available bool    `json:"available"`
	Error     string  `json:"error,omitempty"`
	Streams   []Relay `json:"streams"`
}

// Relay is one stream: its source device(s) on the LAN and who pulls it.
type Relay struct {
	Name      string     `json:"name"`
	Sources   []string   `json:"sources"` // host[:port] of each source, never credentials
	Active    bool       `json:"active"`  // a producer is connected right now
	InKbps    float64    `json:"inKbps"`
	Consumers []Consumer `json:"consumers"`
}

type Consumer struct {
	Remote    string  `json:"remote"`
	UserAgent string  `json:"userAgent,omitempty"`
	OutKbps   float64 `json:"outKbps"`
}

type rawStream struct {
	name      string
	producers []struct {
		ID        int    `json:"id"`
		URL       string `json:"url"`
		Remote    string `json:"remote_addr"`
		BytesRecv uint64 `json:"bytes_recv"`
	}
	consumers []struct {
		ID        int    `json:"id"`
		Remote    string `json:"remote_addr"`
		UserAgent string `json:"user_agent"`
		Senders   []struct {
			Bytes uint64 `json:"bytes"`
		} `json:"senders"`
	}
}

var httpClient = &http.Client{Timeout: 5 * time.Second}

func fetchStreams(ctx context.Context, base string) ([]rawStream, error) {
	req, err := http.NewRequestWithContext(ctx, http.MethodGet, strings.TrimRight(base, "/")+"/api/streams", nil)
	if err != nil {
		return nil, err
	}
	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("go2rtc: HTTP %d", resp.StatusCode)
	}
	var raw map[string]struct {
		Producers json.RawMessage `json:"producers"`
		Consumers json.RawMessage `json:"consumers"`
	}
	if err := json.NewDecoder(resp.Body).Decode(&raw); err != nil {
		return nil, err
	}
	out := make([]rawStream, 0, len(raw))
	for name, s := range raw {
		rs := rawStream{name: name}
		_ = json.Unmarshal(s.Producers, &rs.producers)
		_ = json.Unmarshal(s.Consumers, &rs.consumers)
		out = append(out, rs)
	}
	sort.Slice(out, func(i, j int) bool { return out[i].name < out[j].name })
	return out, nil
}

// sourceHost reduces a source to host[:port] so camera passwords in the URL never leave
// the box (go2rtc reports the full URL, credentials included).
func sourceHost(raw string) string {
	u, err := url.Parse(raw)
	if err != nil || u.Host == "" {
		if i := strings.Index(raw, "://"); i >= 0 {
			return raw[:i] + "://…"
		}
		return "…"
	}
	return u.Scheme + "://" + u.Host
}

// relayState converts raw streams and turns byte counters into rates.
func (m *Monitor) relayState(raw []rawStream, err error, elapsed float64) RelayState {
	rs := RelayState{Streams: []Relay{}}
	if err != nil {
		rs.Error = err.Error()
		return rs
	}
	rs.Available = true
	seen := map[string]uint64{}
	rate := func(key string, bytes uint64) float64 {
		seen[key] = bytes
		prev, ok := m.prevStr[key]
		if !ok || elapsed <= 0 || bytes < prev {
			return 0
		}
		return float64(bytes-prev) * 8 / 1000 / elapsed
	}
	for _, s := range raw {
		r := Relay{Name: s.name, Sources: []string{}, Consumers: []Consumer{}}
		for _, p := range s.producers {
			if p.URL != "" {
				r.Sources = append(r.Sources, sourceHost(p.URL))
			}
			if p.Remote != "" || p.BytesRecv > 0 {
				r.Active = true
			}
			r.InKbps += rate(fmt.Sprintf("p/%s/%d", s.name, p.ID), p.BytesRecv)
		}
		for _, c := range s.consumers {
			var sent uint64
			for _, snd := range c.Senders {
				sent += snd.Bytes
			}
			r.Consumers = append(r.Consumers, Consumer{
				Remote: c.Remote, UserAgent: c.UserAgent,
				OutKbps: rate(fmt.Sprintf("c/%s/%d", s.name, c.ID), sent),
			})
		}
		rs.Streams = append(rs.Streams, r)
	}
	m.prevStr = seen
	return rs
}
