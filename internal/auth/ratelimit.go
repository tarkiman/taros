package auth

import (
	"sync"
	"time"
)

// LoginRateLimiter blocks brute-force login attempts per source IP — see
// docs/07-security.md §7.1. Purely in-memory, no external dependency.
type LoginRateLimiter struct {
	mu          sync.Mutex
	attempts    map[string][]time.Time
	maxAttempts int
	window      time.Duration
}

func NewLoginRateLimiter(maxAttempts int, window time.Duration) *LoginRateLimiter {
	return &LoginRateLimiter{
		attempts:    make(map[string][]time.Time),
		maxAttempts: maxAttempts,
		window:      window,
	}
}

// Allow reports whether ip is still permitted to attempt a login.
func (l *LoginRateLimiter) Allow(ip string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	cutoff := time.Now().Add(-l.window)
	kept := l.attempts[ip][:0]
	for _, t := range l.attempts[ip] {
		if t.After(cutoff) {
			kept = append(kept, t)
		}
	}
	l.attempts[ip] = kept

	return len(kept) < l.maxAttempts
}

// RecordFailure logs a failed attempt from ip, counted against Allow.
func (l *LoginRateLimiter) RecordFailure(ip string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	l.attempts[ip] = append(l.attempts[ip], time.Now())
}

// RecordSuccess clears ip's failure history (a successful login shouldn't
// leave stale near-misses counted against future attempts).
func (l *LoginRateLimiter) RecordSuccess(ip string) {
	l.mu.Lock()
	defer l.mu.Unlock()
	delete(l.attempts, ip)
}
