package auth

import (
	"crypto/rand"
	"errors"
	"fmt"
	"os"
	"strings"
	"sync"
	"time"

	"golang.org/x/crypto/bcrypt"
	"gopkg.in/yaml.v3"
)

// account is one login — username, password, and its own independent
// (optional) TOTP 2FA state. See docs/07-security.md §7.1.
//
// TOTPSecret/TOTPBackupCodes are omitempty so accounts without 2FA enabled
// keep the file compact. TOTPBackupCodes stores bcrypt hashes, same as the
// password — these are single-use recovery secrets, not something to leave
// recoverable in plaintext on disk.
type account struct {
	Username        string   `yaml:"username"`
	PasswordHash    string   `yaml:"passwordHash"`
	TOTPSecret      string   `yaml:"totpSecret,omitempty"`
	TOTPBackupCodes []string `yaml:"totpBackupCodes,omitempty"`
}

// credentialsFile is the on-disk shape of credentials.yaml. It's stored
// separately from config.yaml so the file can carry stricter permissions
// (0600).
//
// Users holds every account (multi-user, all equal access — no
// role-based permissions, see docs/10-roadmap.md). The Legacy* fields
// below let this same struct parse the *old*, pre-multi-user file shape
// (a single flat account at the top level, no "users:" key at all) —
// LoadCredentials detects that shape and transparently upgrades it into a
// one-element Users list, then immediately rewrites the file in the new
// shape. This means existing installs need zero manual migration steps.
type credentialsFile struct {
	Users []account `yaml:"users,omitempty"`

	LegacyUsername        string   `yaml:"username,omitempty"`
	LegacyPasswordHash    string   `yaml:"passwordHash,omitempty"`
	LegacyTOTPSecret      string   `yaml:"totpSecret,omitempty"`
	LegacyTOTPBackupCodes []string `yaml:"totpBackupCodes,omitempty"`
}

// Credentials holds every TarOS login account, all with equal access (see
// docs/10-roadmap.md — role-based access is explicitly deferred).
//
// mu guards accounts against concurrent HTTP requests mutating this
// shared, in-memory *Credentials (login, settings toggles, backup code
// consumption, add/remove user can all race in principle — multiple open
// tabs/accounts is enough).
type Credentials struct {
	mu       sync.Mutex
	accounts []account
}

func LoadCredentials(path string) (*Credentials, error) {
	data, err := os.ReadFile(path)
	if err != nil {
		return nil, fmt.Errorf("auth: read credentials %s: %w", path, err)
	}
	var f credentialsFile
	if err := yaml.Unmarshal(data, &f); err != nil {
		return nil, fmt.Errorf("auth: parse credentials %s: %w", path, err)
	}

	if len(f.Users) == 0 && f.LegacyUsername != "" {
		// Old single-account file — wrap it into the new shape and
		// persist immediately so this migration only ever runs once.
		c := &Credentials{accounts: []account{{
			Username:        f.LegacyUsername,
			PasswordHash:    f.LegacyPasswordHash,
			TOTPSecret:      f.LegacyTOTPSecret,
			TOTPBackupCodes: f.LegacyTOTPBackupCodes,
		}}}
		if err := c.save(path); err != nil {
			return nil, fmt.Errorf("auth: migrate legacy credentials %s: %w", path, err)
		}
		return c, nil
	}

	return &Credentials{accounts: f.Users}, nil
}

// SaveCredentials bootstraps a brand-new credentials.yaml with exactly one
// account — only ever called by `taros setup` when the file doesn't exist
// yet (see cmd/taros/main.go's runSetup). Adding further accounts after
// that goes through AddUser (Settings > Kelola Pengguna), not this.
func SaveCredentials(path, username, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("auth: hash password: %w", err)
	}
	c := &Credentials{accounts: []account{{Username: username, PasswordHash: string(hash)}}}
	return c.save(path)
}

// dummyHash is compared against when a username isn't found, so Verify
// takes the same amount of time either way (no timing/enumeration side
// channel on whether a username exists at all). Generated once, ignored
// if it somehow fails (Verify then just always reports false quickly,
// not a security regression, just loses the timing protection).
var dummyHash, _ = bcrypt.GenerateFromPassword([]byte("tk-dummy-timing-safe"), bcrypt.DefaultCost)

// Verify reports whether username/password match one of the stored
// accounts.
func (c *Credentials) Verify(username, password string) bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	for _, a := range c.accounts {
		if a.Username == username {
			return bcrypt.CompareHashAndPassword([]byte(a.PasswordHash), []byte(password)) == nil
		}
	}
	_ = bcrypt.CompareHashAndPassword(dummyHash, []byte(password))
	return false
}

// Usernames lists every account, in stored order — shown in Settings >
// Kelola Pengguna. Never includes password/TOTP material.
func (c *Credentials) Usernames() []string {
	c.mu.Lock()
	defer c.mu.Unlock()
	out := make([]string, len(c.accounts))
	for i, a := range c.accounts {
		out[i] = a.Username
	}
	return out
}

// bcrypt only looks at the first 72 bytes and refuses longer input, so a longer
// password would either be silently weakened or fail with an opaque error.
const (
	MinPasswordLength = 8
	MaxPasswordBytes  = 72
)

var (
	ErrPasswordTooShort = errors.New("auth: password terlalu pendek")
	ErrPasswordTooLong  = errors.New("auth: password terlalu panjang (maks 72 byte)")
)

// CheckPassword is the one rule a new password must satisfy, wherever it comes
// from (new account, change, reset, `taros passwd`).
func CheckPassword(pw string) error {
	if len(pw) < MinPasswordLength {
		return ErrPasswordTooShort
	}
	if len(pw) > MaxPasswordBytes {
		return ErrPasswordTooLong
	}
	return nil
}

var (
	ErrUsernameExists = errors.New("auth: username sudah dipakai")
	ErrUserNotFound   = errors.New("auth: user tidak ditemukan")
	ErrLastUser       = errors.New("auth: tidak bisa menghapus user terakhir")
)

// AddUser creates a new account with equal access to every other one — see
// docs/10-roadmap.md, role-based access is explicitly out of scope here.
func (c *Credentials) AddUser(path, username, password string) error {
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("auth: hash password: %w", err)
	}

	c.mu.Lock()
	defer c.mu.Unlock()
	for _, a := range c.accounts {
		if a.Username == username {
			return ErrUsernameExists
		}
	}
	c.accounts = append(c.accounts, account{Username: username, PasswordHash: string(hash)})
	if err := c.save(path); err != nil {
		c.accounts = c.accounts[:len(c.accounts)-1]
		return err
	}
	return nil
}

// SetPassword replaces an account's password hash and saves it. TOTP and every
// other property of the account are left alone. On a write error the old
// password stays in force.
func (c *Credentials) SetPassword(path, username, password string) error {
	if err := CheckPassword(password); err != nil {
		return err
	}
	hash, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return fmt.Errorf("auth: hash password: %w", err)
	}
	c.mu.Lock()
	defer c.mu.Unlock()
	a := c.find(username)
	if a == nil {
		return ErrUserNotFound
	}
	old := a.PasswordHash
	a.PasswordHash = string(hash)
	if err := c.save(path); err != nil {
		a.PasswordHash = old
		return err
	}
	return nil
}

// RemoveUser deletes an account. Refuses to remove the last remaining
// account (a TarOS instance with zero logins would be unrecoverable short
// of editing credentials.yaml by hand). The "don't remove the account
// you're currently logged in as" guard lives in the HTTP handler instead
// (internal/web/handlers_users.go) — it needs the caller's session, which
// this package doesn't know about.
func (c *Credentials) RemoveUser(path, username string) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	if len(c.accounts) <= 1 {
		return ErrLastUser
	}
	idx := -1
	for i, a := range c.accounts {
		if a.Username == username {
			idx = i
			break
		}
	}
	if idx == -1 {
		return ErrUserNotFound
	}
	removed := c.accounts[idx]
	c.accounts = append(c.accounts[:idx:idx], c.accounts[idx+1:]...)
	if err := c.save(path); err != nil {
		c.accounts = append(c.accounts[:idx:idx], append([]account{removed}, c.accounts[idx:]...)...)
		return err
	}
	return nil
}

// TOTPEnabled reports whether 2FA is currently set up for username.
func (c *Credentials) TOTPEnabled(username string) bool {
	c.mu.Lock()
	defer c.mu.Unlock()
	a := c.find(username)
	return a != nil && a.TOTPSecret != ""
}

// find returns a pointer into c.accounts for username, or nil — callers
// must already hold c.mu.
func (c *Credentials) find(username string) *account {
	for i := range c.accounts {
		if c.accounts[i].Username == username {
			return &c.accounts[i]
		}
	}
	return nil
}

// save marshals c and writes it to path with 0600 permissions — callers
// must already hold c.mu.
func (c *Credentials) save(path string) error {
	data, err := yaml.Marshal(credentialsFile{Users: c.accounts})
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
// (plaintext, as returned by GenerateBackupCodes) for username, enabling
// 2FA on that account specifically. Replaces any prior secret/backup codes
// outright — there's only ever one "current" 2FA setup per account.
func (c *Credentials) SetTOTP(path, username, secret string, backupCodes []string) error {
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
	a := c.find(username)
	if a == nil {
		return ErrUserNotFound
	}
	a.TOTPSecret = secret
	a.TOTPBackupCodes = hashes
	return c.save(path)
}

// ClearTOTP disables 2FA for username, removing the secret and any unused
// backup codes.
func (c *Credentials) ClearTOTP(path, username string) error {
	c.mu.Lock()
	defer c.mu.Unlock()
	a := c.find(username)
	if a == nil {
		return ErrUserNotFound
	}
	a.TOTPSecret = ""
	a.TOTPBackupCodes = nil
	return c.save(path)
}

// VerifyTOTPOrBackupCode checks code as a live TOTP code first, then (if
// that doesn't match) against username's remaining backup codes — a match
// there consumes it (single-use: removed and persisted immediately) before
// returning true. Returns false, nil if 2FA isn't enabled at all for this
// account, same as "no code needed" — callers check TOTPEnabled separately
// where that distinction matters.
func (c *Credentials) VerifyTOTPOrBackupCode(path, username, code string, now time.Time) (bool, error) {
	c.mu.Lock()
	defer c.mu.Unlock()
	a := c.find(username)
	if a == nil || a.TOTPSecret == "" {
		return false, nil
	}
	if ValidateTOTP(a.TOTPSecret, code, now) {
		return true, nil
	}
	for i, hash := range a.TOTPBackupCodes {
		if bcrypt.CompareHashAndPassword([]byte(hash), []byte(strings.TrimSpace(code))) == nil {
			a.TOTPBackupCodes = append(a.TOTPBackupCodes[:i:i], a.TOTPBackupCodes[i+1:]...)
			if err := c.save(path); err != nil {
				return false, err
			}
			return true, nil
		}
	}
	return false, nil
}

// RemainingBackupCodes reports how many unused backup codes are left for
// username — shown in Settings so a user running low knows to regenerate
// before they're locked out of both their authenticator app and every
// code.
func (c *Credentials) RemainingBackupCodes(username string) int {
	c.mu.Lock()
	defer c.mu.Unlock()
	a := c.find(username)
	if a == nil {
		return 0
	}
	return len(a.TOTPBackupCodes)
}
