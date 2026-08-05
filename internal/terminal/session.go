package terminal

import (
	"os"
	"os/exec"
	"sync"
	"syscall"
	"time"
)

// Session wraps one live PTY + shell process. Safe for one reader
// goroutine and one writer goroutine to use concurrently (that's the
// expected usage from internal/web/ws_terminal.go — PTY-to-WS and
// WS-to-PTY pumps run in separate goroutines).
type Session struct {
	ptmx    *os.File
	cmd     *exec.Cmd
	manager *Manager

	mu        sync.Mutex
	lastInput time.Time
	closed    bool
}

func (s *Session) Read(p []byte) (int, error) {
	return s.ptmx.Read(p)
}

// WriteInput writes client keystrokes to the PTY and marks the session as
// active — see idleFor, only input (not shell output) resets the idle
// clock, matching normal SSH-style idle-timeout semantics (a long-running
// `tail -f` shouldn't be treated as "still in use").
func (s *Session) WriteInput(p []byte) (int, error) {
	s.mu.Lock()
	s.lastInput = time.Now()
	s.mu.Unlock()
	return s.ptmx.Write(p)
}

func (s *Session) Resize(cols, rows uint16) error {
	return resizePTY(s.ptmx, cols, rows)
}

func (s *Session) idleFor() time.Duration {
	s.mu.Lock()
	defer s.mu.Unlock()
	return time.Since(s.lastInput)
}

func (s *Session) isClosed() bool {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.closed
}

// Close kills the shell's entire process group (not just the shell PID),
// releases the PTY, and frees the Manager's concurrency slot. Safe to call
// more than once (e.g. once from the idle-timeout watcher and once from
// the WebSocket handler's own cleanup) — only the first call does anything.
func (s *Session) Close() error {
	s.mu.Lock()
	if s.closed {
		s.mu.Unlock()
		return nil
	}
	s.closed = true
	s.mu.Unlock()

	if s.cmd.Process != nil {
		// Negative pid = signal the whole process group — the shell is its
		// own process group leader as a side effect of Setsid at spawn
		// time (pty.go, via creack/pty), not an explicit Setpgid. Catches
		// children the shell spawned (e.g. a foreground command still
		// running), not just the shell itself.
		_ = syscall.Kill(-s.cmd.Process.Pid, syscall.SIGKILL)
	}
	err := s.ptmx.Close()
	_ = s.cmd.Wait() // reap the process, avoid a zombie

	s.manager.release()
	return err
}
