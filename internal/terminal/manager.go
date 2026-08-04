package terminal

import (
	"errors"
	"log/slog"
	"sync"
	"time"
)

// ErrTooManySessions is returned by NewSession when maxConcurrent active
// sessions are already running — see docs/04-features.md §4.5 "Satu sesi
// terminal aktif pada satu waktu" (default; configurable).
var ErrTooManySessions = errors.New("terminal: sesi maksimum tercapai, tutup sesi lain dulu")

// Manager bounds concurrent terminal sessions and owns the shell/idle
// config every session is created with.
type Manager struct {
	shell         string
	maxConcurrent int
	idleTimeout   time.Duration

	mu     sync.Mutex
	active int
}

func NewManager(shell string, maxConcurrent int, idleTimeout time.Duration) *Manager {
	if maxConcurrent < 1 {
		maxConcurrent = 1
	}
	return &Manager{shell: shell, maxConcurrent: maxConcurrent, idleTimeout: idleTimeout}
}

// NewSession spawns a new PTY+shell, or returns ErrTooManySessions if the
// concurrency limit is already reached. The returned Session's idle
// watcher starts immediately.
func (m *Manager) NewSession() (*Session, error) {
	m.mu.Lock()
	if m.active >= m.maxConcurrent {
		m.mu.Unlock()
		return nil, ErrTooManySessions
	}
	m.active++
	m.mu.Unlock()

	ptmx, cmd, err := spawnPTY(m.shell)
	if err != nil {
		m.release()
		return nil, err
	}

	s := &Session{ptmx: ptmx, cmd: cmd, manager: m, lastInput: time.Now()}
	go s.watchIdle(m.idleTimeout)
	return s, nil
}

func (m *Manager) release() {
	m.mu.Lock()
	m.active--
	m.mu.Unlock()
}

// watchIdle closes the session once it's gone idleTimeout without client
// input — see docs/07-security.md §7.6. Exits on its own once the session
// is closed for any other reason (client disconnect, shell exited).
func (s *Session) watchIdle(idleTimeout time.Duration) {
	ticker := time.NewTicker(30 * time.Second)
	defer ticker.Stop()
	for range ticker.C {
		if s.isClosed() {
			return
		}
		if s.idleFor() > idleTimeout {
			slog.Info("terminal session idle timeout, closing", "idleTimeout", idleTimeout)
			s.Close()
			return
		}
	}
}
