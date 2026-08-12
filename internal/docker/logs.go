package docker

import (
	"bufio"
	"bytes"
	"context"
	"encoding/binary"
	"fmt"
	"io"
	"strings"
	"time"
)

// LogLine is one line of container output, sent on the channel
// ContainerLogs returns.
type LogLine struct {
	Stream    string    `json:"stream"` // "stdout" or "stderr"
	Timestamp time.Time `json:"timestamp"`
	Text      string    `json:"text"`
}

// rawContainerInspect is deliberately minimal — just enough to know
// whether the container's log stream is multiplexed (see ContainerLogs).
type rawContainerInspect struct {
	Config struct {
		Tty bool `json:"Tty"`
	} `json:"Config"`
}

func (c *Client) containerTTY(ctx context.Context, id string) (bool, error) {
	var raw rawContainerInspect
	if err := c.getJSON(ctx, "/containers/"+id+"/json", &raw); err != nil {
		return false, err
	}
	return raw.Config.Tty, nil
}

// ContainerLogs streams log lines for id: an initial backlog bounded by
// tail (max line count) and since (earliest timestamp), then live
// follow — see docs/04-features.md §4.2 "Log Container" for why both
// bounds exist (keep the initial fetch cheap regardless of how much the
// container has already logged). The returned channel is closed once ctx
// is canceled or the underlying stream ends (container removed, daemon
// restart, etc); callers don't need to call anything else to clean up —
// canceling ctx is sufficient (it also aborts the in-flight HTTP request,
// see Client.stream).
func (c *Client) ContainerLogs(ctx context.Context, id string, tail int, since time.Time) (<-chan LogLine, error) {
	tty, err := c.containerTTY(ctx, id)
	if err != nil {
		return nil, err
	}

	path := fmt.Sprintf("/containers/%s/logs?follow=1&tail=%d&since=%d&timestamps=1&stdout=1&stderr=1", id, tail, since.Unix())
	resp, err := c.stream(ctx, "GET", path)
	if err != nil {
		return nil, err
	}

	ch := make(chan LogLine, 64)
	go func() {
		defer close(ch)
		defer resp.Body.Close()
		if tty {
			readTTYLogs(resp.Body, ch)
		} else {
			readMultiplexedLogs(resp.Body, ch)
		}
	}()
	return ch, nil
}

// readTTYLogs handles the Tty:true case — Docker doesn't multiplex the
// stream in this mode (raw pty bytes), and stdout/stderr can't be told
// apart, so every line is reported as "stdout".
func readTTYLogs(r io.Reader, ch chan<- LogLine) {
	scanner := bufio.NewScanner(r)
	scanner.Buffer(make([]byte, 0, 64*1024), 1024*1024)
	for scanner.Scan() {
		ch <- parseLogLine("stdout", scanner.Text())
	}
}

// readMultiplexedLogs handles the (much more common) Tty:false case,
// where Docker frames each write with an 8-byte header: byte 0 is the
// stream type (1=stdout, 2=stderr), bytes 4-7 are a big-endian payload
// size. Lines are buffered per-stream (not globally) so an interleaved
// stdout/stderr write can't corrupt either line — see
// https://docs.docker.com/engine/api/v1.43/#tag/Container/operation/ContainerAttach
// "Stream format" for the framing this implements.
func readMultiplexedLogs(r io.Reader, ch chan<- LogLine) {
	header := make([]byte, 8)
	var stdoutBuf, stderrBuf strings.Builder

	flush := func(buf *strings.Builder, stream string) {
		if buf.Len() == 0 {
			return
		}
		ch <- parseLogLine(stream, buf.String())
		buf.Reset()
	}

	for {
		if _, err := io.ReadFull(r, header); err != nil {
			flush(&stdoutBuf, "stdout")
			flush(&stderrBuf, "stderr")
			return
		}
		size := binary.BigEndian.Uint32(header[4:8])
		payload := make([]byte, size)
		if _, err := io.ReadFull(r, payload); err != nil {
			return
		}

		stream := "stdout"
		buf := &stdoutBuf
		if header[0] == 2 {
			stream = "stderr"
			buf = &stderrBuf
		}

		for len(payload) > 0 {
			idx := bytes.IndexByte(payload, '\n')
			if idx < 0 {
				buf.Write(payload)
				break
			}
			buf.Write(payload[:idx])
			flush(buf, stream)
			payload = payload[idx+1:]
		}
	}
}

// parseLogLine splits Docker's "timestamps=1" RFC3339Nano prefix off a raw
// line — e.g. "2024-01-15T10:23:45.123456789Z actual message". A line
// that doesn't start with a parseable timestamp (shouldn't happen given
// we always request timestamps=1, but never trust upstream formatting
// absolutely) is passed through as-is with a zero Timestamp, same
// graceful-degradation spirit as the rest of this package.
func parseLogLine(stream, raw string) LogLine {
	idx := strings.IndexByte(raw, ' ')
	if idx > 0 {
		if ts, err := time.Parse(time.RFC3339Nano, raw[:idx]); err == nil {
			return LogLine{Stream: stream, Timestamp: ts, Text: raw[idx+1:]}
		}
	}
	return LogLine{Stream: stream, Text: raw}
}
