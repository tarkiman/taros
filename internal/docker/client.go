// Package docker is a thin client for the Docker Engine API over its Unix
// socket — not the official docker/docker SDK, see
// docs/03-tech-stack.md "Kenapa tidak Docker SDK resmi?".
package docker

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net"
	"net/http"
	"time"
)

type Client struct {
	http *http.Client
	// streamHTTP shares http's Transport (same Unix socket dialer) but has
	// no client-level Timeout — used only by stream() for long-lived
	// requests like follow=1 log tailing, where the response body is
	// deliberately never "fully read" until the caller's context is
	// canceled. http.Client.Timeout would otherwise kill a live log
	// stream after that fixed duration regardless of activity, which
	// do()'s short-request timeout is correctly sized for but this isn't.
	streamHTTP *http.Client
}

func NewClient(socketPath string) *Client {
	transport := &http.Transport{
		DialContext: func(ctx context.Context, _, _ string) (net.Conn, error) {
			var d net.Dialer
			return d.DialContext(ctx, "unix", socketPath)
		},
	}
	return &Client{
		http:       &http.Client{Transport: transport, Timeout: 10 * time.Second},
		streamHTTP: &http.Client{Transport: transport},
	}
}

// Ping reports whether the Docker daemon is reachable — used for graceful
// degradation when Docker isn't installed/running, see
// docs/04-features.md §4.2 "Graceful Degradation".
func (c *Client) Ping(ctx context.Context) error {
	_, err := c.do(ctx, http.MethodGet, "/_ping", nil)
	return err
}

// do sends a request and returns the raw response body. Docker's HTTP API
// is versionless-by-default (calling without a /vX.YZ prefix uses the
// daemon's own max supported version), which keeps this client working
// across Docker releases without pinning a version here.
func (c *Client) do(ctx context.Context, method, path string, body io.Reader) ([]byte, error) {
	req, err := http.NewRequestWithContext(ctx, method, "http://docker.sock"+path, body)
	if err != nil {
		return nil, fmt.Errorf("docker: build request: %w", err)
	}
	if body != nil {
		req.Header.Set("Content-Type", "application/json")
	}

	resp, err := c.http.Do(req)
	if err != nil {
		return nil, fmt.Errorf("docker: %s %s: %w", method, path, err)
	}
	defer resp.Body.Close()

	data, err := io.ReadAll(resp.Body)
	if err != nil {
		return nil, fmt.Errorf("docker: read response body: %w", err)
	}

	if resp.StatusCode >= 400 {
		return nil, &APIError{StatusCode: resp.StatusCode, Message: string(data)}
	}
	return data, nil
}

// stream sends a request and returns the raw, still-open response for
// long-lived/streaming reads (e.g. follow=1 container logs) — unlike do(),
// it never reads the body itself. Callers must always close resp.Body,
// and should do so promptly once their context is done or the response
// won't be released back to the transport.
func (c *Client) stream(ctx context.Context, method, path string) (*http.Response, error) {
	req, err := http.NewRequestWithContext(ctx, method, "http://docker.sock"+path, nil)
	if err != nil {
		return nil, fmt.Errorf("docker: build request: %w", err)
	}

	resp, err := c.streamHTTP.Do(req)
	if err != nil {
		return nil, fmt.Errorf("docker: %s %s: %w", method, path, err)
	}
	if resp.StatusCode >= 400 {
		defer resp.Body.Close()
		data, _ := io.ReadAll(io.LimitReader(resp.Body, 4096))
		return nil, &APIError{StatusCode: resp.StatusCode, Message: string(data)}
	}
	return resp, nil
}

func (c *Client) getJSON(ctx context.Context, path string, out any) error {
	return c.doJSON(ctx, http.MethodGet, path, out)
}

func (c *Client) doJSON(ctx context.Context, method, path string, out any) error {
	data, err := c.do(ctx, method, path, nil)
	if err != nil {
		return err
	}
	if err := json.Unmarshal(data, out); err != nil {
		return fmt.Errorf("docker: decode response from %s %s: %w", method, path, err)
	}
	return nil
}

// APIError wraps a non-2xx Docker API response so callers can distinguish
// e.g. "still in use" (409) from a transport failure — see
// docs/04-features.md §4.2 (remove is rejected, not force-deleted).
type APIError struct {
	StatusCode int
	Message    string
}

func (e *APIError) Error() string {
	return fmt.Sprintf("docker API error (status %d): %s", e.StatusCode, e.Message)
}
