package auth

import (
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"sync"
	"time"
)

const CookieName = "tarkimanos_session"

type Session struct {
	Username  string
	ExpiresAt time.Time
	// CSRFToken is bound to the session so a stolen CSRF token alone
	// (without the session cookie) is useless — see docs/07-security.md §7.2.
	CSRFToken string
}

// SessionStore is an in-memory, mutex-protected session table. State is
// intentionally not persisted — see docs/05-data-storage.md.
type SessionStore struct {
	mu          sync.Mutex
	sessions    map[string]*Session
	idleTimeout time.Duration
}

func NewSessionStore(idleTimeout time.Duration) *SessionStore {
	s := &SessionStore{
		sessions:    make(map[string]*Session),
		idleTimeout: idleTimeout,
	}
	go s.reapExpiredLoop()
	return s
}

func (s *SessionStore) Create(username string) (token string, sess *Session, err error) {
	token, err = randomToken(32)
	if err != nil {
		return "", nil, err
	}
	csrf, err := randomToken(32)
	if err != nil {
		return "", nil, err
	}
	sess = &Session{
		Username:  username,
		ExpiresAt: time.Now().Add(s.idleTimeout),
		CSRFToken: csrf,
	}

	s.mu.Lock()
	s.sessions[token] = sess
	s.mu.Unlock()

	return token, sess, nil
}

// Validate returns the session for token, sliding its expiry forward, or
// nil if the token is missing/expired.
func (s *SessionStore) Validate(token string) *Session {
	s.mu.Lock()
	defer s.mu.Unlock()

	sess, ok := s.sessions[token]
	if !ok {
		return nil
	}
	if time.Now().After(sess.ExpiresAt) {
		delete(s.sessions, token)
		return nil
	}
	sess.ExpiresAt = time.Now().Add(s.idleTimeout)
	return sess
}

func (s *SessionStore) Delete(token string) {
	s.mu.Lock()
	delete(s.sessions, token)
	s.mu.Unlock()
}

func (s *SessionStore) reapExpiredLoop() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()
	for range ticker.C {
		now := time.Now()
		s.mu.Lock()
		for token, sess := range s.sessions {
			if now.After(sess.ExpiresAt) {
				delete(s.sessions, token)
			}
		}
		s.mu.Unlock()
	}
}

func randomToken(n int) (string, error) {
	b := make([]byte, n)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("auth: generate random token: %w", err)
	}
	return hex.EncodeToString(b), nil
}
