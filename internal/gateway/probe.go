package gateway

import (
	"context"
	"net"
	"time"
)

// ProbeGo2rtc reads the stream names of a go2rtc API (Settings "Tes" button).
func ProbeGo2rtc(ctx context.Context, baseURL string) ([]string, error) {
	streams, err := fetchStreams(ctx, baseURL)
	if err != nil {
		return nil, err
	}
	names := make([]string, 0, len(streams))
	for _, s := range streams {
		names = append(names, s.name)
	}
	return names, nil
}

// ProbeTCP measures one TCP handshake to addr; errText is "" on success.
func ProbeTCP(ctx context.Context, addr string) (rttMs float64, errText string) {
	start := time.Now()
	c, err := (&net.Dialer{Timeout: 3 * time.Second}).DialContext(ctx, "tcp", addr)
	if err != nil {
		return 0, shortNetErr(err)
	}
	c.Close()
	return float64(time.Since(start).Microseconds()) / 1000, ""
}
