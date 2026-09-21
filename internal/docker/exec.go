package docker

import (
	"bufio"
	"bytes"
	"context"
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"net"
	"net/http"
	"strings"
	"time"
)

// An interactive shell inside a running container — the container-side
// counterpart of the host web terminal (docs/04-features.md §4.15). It is the
// Engine API's exec: create an exec instance, then `start` it with an HTTP
// Upgrade so the connection turns into a raw, bidirectional TTY stream. That
// upgrade can't go through net/http's Client (which would never hand the
// socket back), so the request is written by hand on a fresh unix connection.

var (
	// ErrNotRunning: exec needs a running container (Docker answers 409).
	ErrNotRunning = errors.New("docker: container is not running")
	// ErrNoShell: the image has neither bash nor sh (distroless/scratch images).
	ErrNoShell = errors.New("docker: no shell in this container")
)

// shellCmd runs bash when the image has it, plain sh otherwise. The `sh -c`
// wrapper itself needs /bin/sh — an image without one is exactly ErrNoShell.
var shellCmd = []string{"sh", "-c", "if command -v bash >/dev/null 2>&1; then exec bash; else exec sh; fi"}

// ExecSession is one attached shell. Read/Write carry raw terminal bytes
// (Tty mode: stdout and stderr are already merged, no multiplexing header).
type ExecSession struct {
	c    *Client
	id   string
	conn net.Conn
	r    *bufio.Reader // may hold stream bytes that arrived with the 101 response
	head []byte        // first bytes read, kept only to recognise a failed start (see Failure)
}

const headKeep = 1024

// Read must be called from a single goroutine (it records the first bytes).
func (s *ExecSession) Read(p []byte) (int, error) {
	n, err := s.r.Read(p)
	if room := headKeep - len(s.head); room > 0 && n > 0 {
		if n < room {
			room = n
		}
		s.head = append(s.head, p[:room]...)
	}
	return n, err
}

func (s *ExecSession) Write(p []byte) (int, error) { return s.conn.Write(p) }

// StartError is a shell that never started; Message is the runtime's own text.
type StartError struct{ Message string }

func (e *StartError) Error() string { return "docker: shell failed to start: " + e.Message }

// Failure is called once the stream has ended (Read returned an error) and
// says whether that was a shell that never started. Docker answers the
// upgrade with 101 even when the process can't be launched — the failure only
// shows up as the runtime's message on the stream and exit code 126/127 — so
// "no shell in this image" can only be told apart here, not at start.
// A shell that ran and exited (any code) returns nil.
func (s *ExecSession) Failure(ctx context.Context) error {
	head := strings.TrimSpace(string(s.head))
	if !strings.Contains(head, "OCI runtime exec failed") {
		return nil
	}
	code, running, err := s.ExitCode(ctx)
	if err == nil && !running && code != 126 && code != 127 {
		return nil
	}
	if isNoShell(head) {
		return ErrNoShell
	}
	return &StartError{Message: head}
}

// Close drops the attach; with a TTY the shell gets SIGHUP and exits.
func (s *ExecSession) Close() error { return s.conn.Close() }

// Resize tells Docker the terminal's new size.
func (s *ExecSession) Resize(ctx context.Context, cols, rows uint16) error {
	_, err := s.c.do(ctx, "POST", fmt.Sprintf("/exec/%s/resize?h=%d&w=%d", s.id, rows, cols), nil)
	return err
}

// ExitCode reports how the shell ended (running=true if it hasn't yet).
func (s *ExecSession) ExitCode(ctx context.Context) (code int, running bool, err error) {
	var st struct {
		ExitCode int
		Running  bool
	}
	if err := s.c.getJSON(ctx, "/exec/"+s.id+"/json", &st); err != nil {
		return 0, false, err
	}
	return st.ExitCode, st.Running, nil
}

// ExecShell opens an interactive shell in container id (a name works too) at
// the given initial size. The process runs as the container's own default
// user, in its default working directory.
func (c *Client) ExecShell(ctx context.Context, id string, cols, rows uint16) (*ExecSession, error) {
	body, _ := json.Marshal(map[string]any{
		"AttachStdin": true, "AttachStdout": true, "AttachStderr": true, "Tty": true,
		"Cmd": shellCmd,
		// Deliberately NO COLUMNS/LINES here: busybox tools and ncurses give those
		// variables priority over the pty's real size, so a value baked in at
		// start goes stale the moment the terminal is resized (found on a real
		// busybox container: `stty size` kept reporting the initial size). The
		// size is set on the pty itself (Resize below), which is always current.
		"Env": []string{"TERM=xterm-256color"},
	})
	data, err := c.do(ctx, "POST", "/containers/"+id+"/exec", bytes.NewReader(body))
	if err != nil {
		var api *APIError
		if errors.As(err, &api) && api.StatusCode == http.StatusConflict {
			return nil, ErrNotRunning
		}
		return nil, err
	}
	var created struct{ Id string }
	if err := json.Unmarshal(data, &created); err != nil || created.Id == "" {
		return nil, fmt.Errorf("docker: unexpected exec create response: %s", strings.TrimSpace(string(data)))
	}

	conn, br, err := c.hijackExecStart(ctx, created.Id)
	if err != nil {
		return nil, err
	}
	s := &ExecSession{c: c, id: created.Id, conn: conn, r: br}
	if cols > 0 && rows > 0 {
		_ = s.Resize(ctx, cols, rows) // the process is already running: make its pty match
	}
	return s, nil
}

// hijackExecStart POSTs /exec/{id}/start asking for an Upgrade and returns
// the raw connection once Docker answers 101.
func (c *Client) hijackExecStart(ctx context.Context, execID string) (net.Conn, *bufio.Reader, error) {
	d := net.Dialer{Timeout: 5 * time.Second}
	conn, err := d.DialContext(ctx, "unix", c.socket)
	if err != nil {
		return nil, nil, fmt.Errorf("docker: dial %s: %w", c.socket, err)
	}
	payload := []byte(`{"Detach":false,"Tty":true}`)
	req := fmt.Sprintf("POST /exec/%s/start HTTP/1.1\r\nHost: docker.sock\r\nContent-Type: application/json\r\nConnection: Upgrade\r\nUpgrade: tcp\r\nContent-Length: %d\r\n\r\n", execID, len(payload))
	// The handshake must not hang forever; the deadline is lifted for the stream itself.
	_ = conn.SetDeadline(time.Now().Add(10 * time.Second))
	if _, err := conn.Write(append([]byte(req), payload...)); err != nil {
		conn.Close()
		return nil, nil, fmt.Errorf("docker: exec start: %w", err)
	}
	br := bufio.NewReader(conn)
	resp, err := http.ReadResponse(br, &http.Request{Method: "POST"})
	if err != nil {
		conn.Close()
		return nil, nil, fmt.Errorf("docker: exec start response: %w", err)
	}
	if resp.StatusCode != http.StatusSwitchingProtocols && resp.StatusCode != http.StatusOK {
		msg, _ := io.ReadAll(io.LimitReader(resp.Body, 4096))
		conn.Close()
		text := strings.TrimSpace(string(msg))
		if isNoShell(text) {
			return nil, nil, ErrNoShell
		}
		return nil, nil, &APIError{StatusCode: resp.StatusCode, Message: text}
	}
	_ = conn.SetDeadline(time.Time{})
	return conn, br, nil
}

// isNoShell recognises the runtime's "executable file not found" failure.
func isNoShell(msg string) bool {
	m := strings.ToLower(msg)
	return strings.Contains(m, "executable file not found") || strings.Contains(m, "no such file or directory")
}

// ContainerName resolves a container id-or-name to its name (and confirms it
// exists) — for the audit log and the "ready" frame.
func (c *Client) ContainerName(ctx context.Context, id string) (string, error) {
	var st struct{ Name string }
	if err := c.getJSON(ctx, "/containers/"+id+"/json", &st); err != nil {
		return "", err
	}
	return strings.TrimPrefix(st.Name, "/"), nil
}
