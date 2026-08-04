package auth

import (
	"fmt"
	"os"

	"golang.org/x/crypto/bcrypt"
	"gopkg.in/yaml.v3"
)

// Credentials is the single admin account TarOS ships with (see
// docs/07-security.md §7.1). It is stored separately from config.yaml so
// the file can carry stricter permissions (0600).
type Credentials struct {
	Username     string `yaml:"username"`
	PasswordHash string `yaml:"passwordHash"`
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
	c := Credentials{Username: username, PasswordHash: string(hash)}
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
	if username != c.Username {
		// Still run bcrypt to keep response time similar whether the
		// username or the password was wrong (avoid a timing/enumeration
		// side channel on which field mismatched).
		_ = bcrypt.CompareHashAndPassword([]byte(c.PasswordHash), []byte(password))
		return false
	}
	return bcrypt.CompareHashAndPassword([]byte(c.PasswordHash), []byte(password)) == nil
}
