package sharing

import (
	"errors"
	"fmt"
	"os"
	"path/filepath"
	"regexp"
	"sort"
	"strings"
	"sync"
	"time"

	"gopkg.in/yaml.v3"
)

// Account is a login TarOS created for file sharing: a dedicated system user
// with no shell and no home (never a real person's account), plus its Samba
// password. Passwords are never stored here — only handed to smbpasswd.
type Account struct {
	Name      string    `yaml:"name" json:"name"`
	SMB       bool      `yaml:"smb" json:"smb"` // can log in over SMB
	Disabled  bool      `yaml:"disabled,omitempty" json:"disabled"`
	CreatedAt time.Time `yaml:"createdAt" json:"createdAt"`
	// FTP: nil until the account has been given a folder over FTP.
	FTP *FTPAccess `yaml:"ftp,omitempty" json:"ftp"`
}

// FTPAccess is what an account sees over FTP: one folder (its chroot), read-only
// or read/write. Unlike SMB shares an FTP login has exactly one root.
type FTPAccess struct {
	Path  string `yaml:"path" json:"path"`
	Mode  string `yaml:"mode" json:"mode"` // "ro" | "rw"
	RunAs string `yaml:"runAs,omitempty" json:"runAs"`
}

// FTPSettings are the vsftpd options TarOS owns once it manages FTP. Zero values
// mean "leave what is there".
type FTPSettings struct {
	// TLS: "" leave as found, "optional" (FTPS offered, plain still works),
	// "required" (plain logins and data refused).
	TLS string `yaml:"tls,omitempty" json:"tls"`
	// OnlyAccounts: only TarOS accounts may log in over FTP (device users cannot).
	OnlyAccounts bool `yaml:"onlyAccounts,omitempty" json:"onlyAccounts"`
	// NoAnonymous forces anonymous_enable=NO.
	NoAnonymous bool `yaml:"noAnonymous,omitempty" json:"noAnonymous"`
	// PasvMin/PasvMax: passive-mode port range (0 = leave).
	PasvMin int `yaml:"pasvMin,omitempty" json:"pasvMin"`
	PasvMax int `yaml:"pasvMax,omitempty" json:"pasvMax"`
}

// Access grants one account access to one share.
type Access struct {
	User string `yaml:"user" json:"user"`
	Mode string `yaml:"mode" json:"mode"` // "ro" | "rw"
}

// Share is one folder shared over SMB.
type Share struct {
	Name       string   `yaml:"name" json:"name"`
	Path       string   `yaml:"path" json:"path"`
	Comment    string   `yaml:"comment,omitempty" json:"comment"`
	Browseable bool     `yaml:"browseable" json:"browseable"`
	Access     []Access `yaml:"access" json:"access"`
	// RunAs: the system user file operations run as. Empty = the folder's own
	// owner, which is what keeps TarOS from ever chown/chmod-ing your data.
	RunAs string `yaml:"runAs,omitempty" json:"runAs"`
}

// Model is everything TarOS manages. It is the source of truth: the Samba
// files and the system users are derived from it.
type Model struct {
	Accounts   []Account   `yaml:"accounts" json:"accounts"`
	Shares     []Share     `yaml:"shares" json:"shares"`
	Interfaces []string    `yaml:"interfaces,omitempty" json:"interfaces"` // bind SMB to these (empty = unrestricted)
	Workgroup  string      `yaml:"workgroup,omitempty" json:"workgroup"`
	FTP        FTPSettings `yaml:"ftp,omitempty" json:"ftp"`
}

func (m Model) clone() Model {
	// Non-nil slices throughout: this is serialised to the UI, where [] and null differ.
	c := Model{Workgroup: m.Workgroup, FTP: m.FTP, Interfaces: append([]string{}, m.Interfaces...), Shares: []Share{}}
	c.Accounts = append([]Account{}, m.Accounts...)
	for i, a := range c.Accounts {
		if a.FTP != nil {
			f := *a.FTP
			c.Accounts[i].FTP = &f
		}
	}
	for _, s := range m.Shares {
		s.Access = append([]Access{}, s.Access...)
		c.Shares = append(c.Shares, s)
	}
	return c
}

func (m Model) account(name string) (Account, bool) {
	for _, a := range m.Accounts {
		if a.Name == name {
			return a, true
		}
	}
	return Account{}, false
}

func (m Model) share(name string) (int, bool) {
	for i, s := range m.Shares {
		if strings.EqualFold(s.Name, name) {
			return i, true
		}
	}
	return -1, false
}

// ---- persistence -----------------------------------------------------------------

// Store keeps the Model in a YAML file (0600: it names your accounts and folders).
type Store struct {
	mu    sync.Mutex
	path  string
	model Model
}

func NewStore(path string) *Store { return &Store{path: path} }

// LoadStore reads path; a missing file just means nothing is managed yet.
func LoadStore(path string) (*Store, error) {
	s := NewStore(path)
	data, err := os.ReadFile(path)
	if errors.Is(err, os.ErrNotExist) {
		return s, nil
	}
	if err != nil {
		return nil, fmt.Errorf("sharing: read %s: %w", path, err)
	}
	if err := yaml.Unmarshal(data, &s.model); err != nil {
		return nil, fmt.Errorf("sharing: parse %s: %w", path, err)
	}
	return s, nil
}

func (s *Store) Get() Model {
	s.mu.Lock()
	defer s.mu.Unlock()
	return s.model.clone()
}

// Set replaces the model and writes it (write-then-rename, so a crash never
// leaves a half-written file).
func (s *Store) Set(m Model) error {
	s.mu.Lock()
	defer s.mu.Unlock()
	data, err := yaml.Marshal(m)
	if err != nil {
		return err
	}
	tmp := filepath.Join(filepath.Dir(s.path), "."+filepath.Base(s.path)+".tmp")
	if err := os.WriteFile(tmp, data, 0o600); err != nil {
		return fmt.Errorf("sharing: write %s: %w", tmp, err)
	}
	if err := os.Rename(tmp, s.path); err != nil {
		return fmt.Errorf("sharing: rename: %w", err)
	}
	s.model = m.clone()
	return nil
}

// ---- validation ----------------------------------------------------------------------

// Validation errors, mapped to translated API errors by the web layer.
var (
	ErrAccountName    = errors.New("sharing: invalid account name")
	ErrAccountExists  = errors.New("sharing: an account or system user with that name already exists")
	ErrAccountMissing = errors.New("sharing: no such account")
	ErrPasswordWeak   = errors.New("sharing: password too short")
	ErrShareName      = errors.New("sharing: invalid share name")
	ErrShareExists    = errors.New("sharing: a share with that name already exists")
	ErrShareMissing   = errors.New("sharing: no such share")
	ErrShareNoAccess  = errors.New("sharing: a share needs at least one account")
	ErrShareUser      = errors.New("sharing: access refers to an unknown or disabled account")
	ErrShareMode      = errors.New("sharing: access mode must be ro or rw")
	ErrPathInvalid    = errors.New("sharing: invalid folder path")
	ErrPathDenied     = errors.New("sharing: this folder cannot be shared")
	ErrPathOutside    = errors.New("sharing: folder is outside the allowed locations")
	ErrOwnedByRoot    = errors.New("sharing: the folder is owned by root; pick another owner to run as")
	ErrRunAs          = errors.New("sharing: invalid user to run the share as")
	ErrNameForeign    = errors.New("sharing: a share with that name already exists outside TarOS")
	ErrInterface      = errors.New("sharing: unknown network interface")
	ErrNotManaged     = errors.New("sharing: TarOS is not managing Samba yet")
	ErrCannotManage   = errors.New("sharing: this Samba cannot be managed here")
	ErrComment        = errors.New("sharing: invalid comment")
	ErrFTPNotManaged  = errors.New("sharing: TarOS is not managing FTP yet")
	ErrFTPSettings    = errors.New("sharing: invalid FTP settings")
	ErrFTPNoAccounts  = errors.New("sharing: no account has FTP access, so \"only TarOS accounts\" would lock everybody out")
	ErrNoLogin        = errors.New("sharing: the account has no login to change (no SMB and no FTP access)")
)

const minPasswordLen = 8

var (
	// Linux login names (and safe as a Samba user): lower-case, digits, - _
	reAccount = regexp.MustCompile(`^[a-z][a-z0-9_-]{0,30}$`)
	// SMB share names: no path/quote/wildcard characters; spaces and dots are fine.
	reShare = regexp.MustCompile(`^[A-Za-z0-9][A-Za-z0-9 ._-]{0,79}$`)
)

var reservedShares = map[string]bool{"global": true, "homes": true, "printers": true, "print$": true, "ipc$": true, "admin$": true}

// reservedAccounts are names that would collide with system identities even if
// the system doesn't have that user yet.
var reservedAccounts = map[string]bool{"root": true, "nobody": true, "daemon": true, "bin": true, "sys": true, "guest": true, "administrator": true, "admin": true, "smbguest": true}

func ValidAccountName(n string) error {
	if !reAccount.MatchString(n) || reservedAccounts[n] {
		return ErrAccountName
	}
	return nil
}

func ValidShareName(n string) error {
	if !reShare.MatchString(n) || reservedShares[strings.ToLower(n)] || strings.HasSuffix(n, " ") || strings.HasSuffix(n, ".") {
		return ErrShareName
	}
	return nil
}

func validComment(c string) error {
	if len(c) > 120 || strings.ContainsAny(c, "%\n\r\x00") {
		return ErrComment
	}
	for _, r := range c {
		if r < 0x20 && r != '\t' {
			return ErrComment
		}
	}
	return nil
}

// normalizeAccess sorts and de-duplicates (last mode wins) so rendering is stable.
func normalizeAccess(a []Access) []Access {
	m := map[string]string{}
	for _, x := range a {
		m[x.User] = x.Mode
	}
	out := make([]Access, 0, len(m))
	for u, mode := range m {
		out = append(out, Access{User: u, Mode: mode})
	}
	sort.Slice(out, func(i, j int) bool { return out[i].User < out[j].User })
	return out
}
