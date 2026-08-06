package auth

import (
	"crypto/rand"
	"fmt"
	"os"
	"strings"
	"sync"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gopkg.in/yaml.v3"
)

// Credentials is the single admin account TarOS ships with (see
// docs/07-security.md §7.1). It is stored separately from config.yaml so
// the file can carry stricter permissions (0600).
//
// TOTPSecret/TOTPBackupCodes are optional 2FA fields (docs/04-features.md
// §4.7, docs/07-security.md §7.1) — omitempty so accounts without 2FA
// enabled keep the file exactly as SaveCredentials always wrote it, no
// migration needed for existing installs. TOTPBackupCodes stores bcrypt
// hashes, same as the password — these are single-use recovery secrets,
// not something to leave recoverable in plaintext on disk.
//
// mu guards every field below against concurrent HTTP requests mutating
// this shared, in-memory *Credentials (login, settings toggle, backup
// code consumption can all race in principle, even for a single-admin
// dashboard — two open tabs is enough).
type Credentials struct {
	mu sync.Mutex

	Username        string   `yaml:"username"`
	PasswordHash    string   `yaml:"passwordHash"`
	TOTPSecret      string   `yaml:"totpSecret,omitempty"`
	TOTPBackupCodes []string `yaml:"totpBackupCodes,omitempty"`
}

func LoadCredentials(path string) (*Credentials, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("auth: read credentials %s: %w", path, err)
	}
	var c Credentials
	if err := yaml.Unmarshal(data, &c); err != nil {
		return nil, fmt.Errorf("auth: parse credentials %s: %w", path, err)
	}
	return &c, nil
}

// SaveCredentials writes username + bcrypt(password) to path with 0600
// permissions, creating the file if needed.
func SaveCredentials(path, username, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("auth: hash password: %w", err)
	}
	c := &Credentials{Username: username, PasswordHash: string(hash)}
	data, err := yaml.Marshal(c)
	if err != nil {
		return fmt.Errorf("auth: marshal credentials: %w", err)
	}
	if err := os.WriteFile(path, data, 0o600); err != nil {
		return fmt.Errorf("auth: write credentials %s: %w", path, err)
	}
	return nil
}

// Verify reports whether username/password match the stored credentials.
func (c *Credentials) Verify(username, password string) bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	if username != c.Username {
		// Still run bcrypt to keep response time similar whether the
		// username or the password was wrong (avoid a timing/enumeration
		// side channel on which field mismatched).
		_ = bcrypt.CompareHashAndPassword([]byte(c.PasswordHash), []byte(password))
		return false
	}
	return bcrypt.CompareHashAndPassword([]byte(c.PasswordHash), []byte(password)) == nil
}

// TOTPEnabled reports whether 2FA is currently set up for this account.
func (c *Credentials) TOTPEnabled() bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.TOTPSecret != ""
}

// save marshals c and writes it to path with 0600 permissions — callers
// must already hold c.mu.
func (c *Credentials) save(path string) error {
	data, err := yaml.Marshal(c)
	if err != nil {
		return fmt.Errorf("auth: marshal credentials: %w", err)
	}
	if err := os.WriteFile(path, data, 0o600); err != nil {
		return fmt.Errorf("auth: write credentials %s: %w", path, err)
	}
	return nil
}

// GenerateBackupCodes returns n fresh single-use recovery codes in
// "XXXX-XXXX" form (Crockford-ish base32 alphabet, no ambiguous
// 0/O/1/I/L — these get hand-typed from a printed/saved copy, so every
// character avoiding a look-alike pair matters). Callers persist the
// bcrypt hash of each via SetTOTP and show the plaintext to the user
// exactly once — this function itself doesn't touch disk.
func GenerateBackupCodes(n int) ([]string, error) {
	const alphabet = "ABCDEFGHJKMNPQRSTUVWXYZ23456789" // no 0/O/1/I/L
	codes := make([]string, n)
	for i := range codes {
		raw := make([]byte, 8)
		if _, err := rand.Read(raw); err != nil {
			return nil, fmt.Errorf("auth: generate backup code: %w", err)
		}
		var b strings.Builder
		for j, v := range raw {
			if j == 4 {
				b.WriteByte('-')
			}
			b.WriteByte(alphabet[int(v)%len(alphabet)])
		}
		codes[i] = b.String()
	}
	return codes, nil
}

// SetTOTP persists a new TOTP secret and the bcrypt hashes of backupCodes
// (plaintext, as returned by GenerateBackupCodes) to path, enabling 2FA.
// Replaces any prior secret/backup codes outright — there's only ever one
// "current" 2FA setup per account.
func (c *Credentials) SetTOTP(path, secret string, backupCodes []string) error {
	hashes := make([]string, len(backupCodes))
	for i, code := range backupCodes {
		h, err := bcrypt.GenerateFromPassword([]byte(code), bcrypt.DefaultCost)
		if err != nil {
			return fmt.Errorf("auth: hash backup code: %w", err)
		}
		hashes[i] = string(h)
	}

	c.mu.Lock()
	defer c.mu.Unlock()
	c.TOTPSecret = secret
	c.TOTPBackupCodes = hashes
	return c.save(path)
}

// ClearTOTP disables 2FA, removing the secret and any unused backup codes.
func (c *Credentials) ClearTOTP(path string) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.TOTPSecret = ""
	c.TOTPBackupCodes = nil
	return c.save(path)
}

// VerifyTOTPOrBackupCode checks code as a live TOTP code first, then (if
// that doesn't match) against remaining backup codes — a match there
// consumes it (single-use: removed and persisted immediately) before
// returning true. Returns false, nil if 2FA isn't enabled at all, same as
// "no code needed" — callers check TOTPEnabled separately where that
// distinction matters.
func (c *Credentials) VerifyTOTPOrBackupCode(path, code string, now time.Time) (bool, error) {
	c.mu.Lock()
	defer c.mu.Unlock()
	if c.TOTPSecret == "" {
		return false, nil
	}
	if ValidateTOTP(c.TOTPSecret, code, now) {
		return true, nil
	}
	for i, hash := range c.TOTPBackupCodes {
		if bcrypt.CompareHashAndPassword([]byte(hash), []byte(strings.TrimSpace(code))) == nil {
			c.TOTPBackupCodes = append(c.TOTPBackupCodes[:i:i], c.TOTPBackupCodes[i+1:]...)
			if err := c.save(path); err != nil {
				return false, err
			}
			return true, nil
		}
	}
	return false, nil
}

// RemainingBackupCodes reports how many unused backup codes are left —
// shown in Settings so a user running low knows to regenerate before
// they're locked out of both their authenticator app and every code.
func (c *Credentials) RemainingBackupCodes() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return len(c.TOTPBackupCodes)
}
