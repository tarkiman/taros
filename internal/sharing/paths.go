package sharing

import (
	"os"
	"os/user"
	"path/filepath"
	"strconv"
	"strings"
	"syscall"
)

// PathPolicy decides which folders may be shared. A file-sharing UI that let
// you type `/` or `/etc` would be one click from publishing the whole machine,
// so this is an allow-list of roots (where people keep data) with a hard deny
// list on top that no configuration can override.
type PathPolicy struct {
	Roots  []string // shares must live under one of these
	Denied []string // extra locations refused even inside a root (e.g. app data)
}

// alwaysDenied can never be shared, nor anything inside them.
var alwaysDenied = []string{"/", "/etc", "/boot", "/root", "/proc", "/sys", "/dev", "/run", "/usr", "/bin", "/sbin", "/lib", "/lib32", "/lib64", "/var/lib", "/var/log", "/var/run", "/opt/taros", "/snap"}

func within(p, root string) bool {
	if root == "/" {
		return true
	}
	return p == root || strings.HasPrefix(p, root+"/")
}

// Resolve validates path and returns its real (symlink-free) location.
// The result is what gets written to smb.conf, so a symlink inside an allowed
// root cannot smuggle a share to somewhere that isn't.
func (pp PathPolicy) Resolve(path string) (string, error) {
	if path == "" || !filepath.IsAbs(path) || strings.ContainsAny(path, "\x00\n\r%") {
		return "", ErrPathInvalid
	}
	clean := filepath.Clean(path)
	real, err := filepath.EvalSymlinks(clean)
	if err != nil {
		return "", ErrPathInvalid
	}
	fi, err := os.Stat(real)
	if err != nil || !fi.IsDir() {
		return "", ErrPathInvalid
	}
	for _, p := range []string{clean, real} {
		for _, d := range alwaysDenied {
			if d == "/" {
				if p == "/" {
					return "", ErrPathDenied
				}
				continue
			}
			if within(p, d) {
				return "", ErrPathDenied
			}
		}
		for _, d := range pp.Denied {
			if d = filepath.Clean(d); d != "." && within(p, d) {
				return "", ErrPathDenied
			}
		}
		for _, c := range strings.Split(p, "/") {
			if c == ".ssh" || c == ".gnupg" {
				return "", ErrPathDenied
			}
		}
	}
	ok := false
	for _, r := range pp.Roots {
		rr, err := filepath.EvalSymlinks(filepath.Clean(r))
		if err != nil {
			rr = filepath.Clean(r)
		}
		if within(real, rr) {
			ok = true
		}
	}
	if !ok {
		return "", ErrPathOutside
	}
	return real, nil
}

// Owner is the user/group that owns a folder.
type Owner struct {
	User, Group string
	UID         int
}

// OwnerOf reads a folder's owner. On NTFS/exFAT mounts this is whatever the
// mount options say (uid=…), on ext4 the real owner.
func OwnerOf(path string) (Owner, error) {
	fi, err := os.Stat(path)
	if err != nil {
		return Owner{}, err
	}
	st, ok := fi.Sys().(*syscall.Stat_t)
	if !ok {
		return Owner{}, ErrPathInvalid
	}
	o := Owner{UID: int(st.Uid)}
	u, err := user.LookupId(strconv.Itoa(int(st.Uid)))
	if err != nil {
		return o, ErrRunAs // an owner without a name can't be used in `force user`
	}
	o.User = u.Username
	if g, err := user.LookupGroupId(strconv.Itoa(int(st.Gid))); err == nil {
		o.Group = g.Name
	}
	return o, nil
}

// Folder is one entry in the folder picker.
type Folder struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

// ListFolders returns the sub-folders of path for the picker. With no path it
// returns the allowed roots that exist, so the picker can only ever be steered
// inside them.
func (pp PathPolicy) ListFolders(path string) ([]Folder, error) {
	if path == "" {
		var out []Folder
		for _, r := range pp.Roots {
			if fi, err := os.Stat(r); err == nil && fi.IsDir() {
				out = append(out, Folder{Name: r, Path: filepath.Clean(r)})
			}
		}
		return out, nil
	}
	real, err := pp.Resolve(path)
	if err != nil {
		return nil, err
	}
	entries, err := os.ReadDir(real)
	if err != nil {
		return nil, ErrPathInvalid
	}
	out := []Folder{}
	for _, e := range entries {
		if !e.IsDir() || e.Name() == ".ssh" || e.Name() == ".gnupg" {
			continue
		}
		child := filepath.Join(real, e.Name())
		if _, err := pp.Resolve(child); err != nil {
			continue // symlinks that lead outside, denied locations, …: not offered
		}
		out = append(out, Folder{Name: e.Name(), Path: child})
		if len(out) >= 500 {
			break
		}
	}
	return out, nil
}
