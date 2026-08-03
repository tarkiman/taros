package auth

import "crypto/subtle"

// ValidCSRF does a constant-time comparison of the token submitted with a
// request against the one bound to the session — see docs/07-security.md §7.2.
func (s *Session) ValidCSRF(token string) bool {
	if token == "" {
		return false
	}
	return subtle.ConstantTimeCompare([]byte(s.CSRFToken), []byte(token)) == 1
}
