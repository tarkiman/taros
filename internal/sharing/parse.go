package sharing

import (
	"strings"
)

// ---- testparm ---------------------------------------------------------------

// ShareInfo is one share as `testparm -s` prints it.
type ShareInfo struct {
	Name    string            `json:"name"`
	Path    string            `json:"path"`
	Params  map[string]string `json:"-"`
	GuestOK bool              `json:"guestOk"`
	// ReadOnly follows Samba's default (yes) when neither `read only` nor `writable` says otherwise.
	ReadOnly   bool     `json:"readOnly"`
	Browseable bool     `json:"browseable"`
	ValidUsers []string `json:"validUsers,omitempty"`
	Comment    string   `json:"comment,omitempty"`
	Managed    bool     `json:"managed"` // defined in TarOS's own file
}

// SambaConfig is the effective configuration, after includes.
type SambaConfig struct {
	Global map[string]string
	Shares []ShareInfo
}

// specialShares are Samba's built-ins, not something a user "shares".
var specialShares = map[string]bool{"global": true, "homes": true, "printers": true, "print$": true, "ipc$": true}

func isYes(v string) bool {
	switch strings.ToLower(strings.TrimSpace(v)) {
	case "yes", "true", "1", "on":
		return true
	}
	return false
}

// ParseTestparm parses the stdout of `testparm -s`: "[section]" headers followed
// by tab-indented "key = value" lines. Keys are lower-cased.
func ParseTestparm(out string) SambaConfig {
	cfg := SambaConfig{Global: map[string]string{}}
	var cur string
	var params map[string]string
	flush := func() {
		if cur == "" || cur == "global" || params == nil {
			return
		}
		cfg.Shares = append(cfg.Shares, shareFrom(cur, params))
	}
	for _, line := range strings.Split(out, "\n") {
		t := strings.TrimSpace(line)
		if t == "" || strings.HasPrefix(t, "#") || strings.HasPrefix(t, ";") {
			continue
		}
		if strings.HasPrefix(t, "[") && strings.HasSuffix(t, "]") {
			flush()
			cur = strings.TrimSpace(t[1 : len(t)-1])
			params = map[string]string{}
			if strings.EqualFold(cur, "global") {
				cur = "global"
				params = cfg.Global
			}
			continue
		}
		k, v, ok := strings.Cut(t, "=")
		if !ok || params == nil {
			continue
		}
		params[strings.ToLower(strings.TrimSpace(k))] = strings.TrimSpace(v)
	}
	flush()
	return cfg
}

func shareFrom(name string, p map[string]string) ShareInfo {
	s := ShareInfo{Name: name, Path: p["path"], Params: p, Comment: p["comment"]}
	s.GuestOK = isYes(p["guest ok"]) || isYes(p["public"])
	s.ReadOnly = true // Samba's default
	if v, ok := p["read only"]; ok {
		s.ReadOnly = isYes(v)
	}
	if v, ok := p["writable"]; ok {
		s.ReadOnly = !isYes(v)
	} else if v, ok := p["writeable"]; ok {
		s.ReadOnly = !isYes(v)
	}
	s.Browseable = true
	if v, ok := p["browseable"]; ok {
		s.Browseable = isYes(v)
	} else if v, ok := p["browsable"]; ok {
		s.Browseable = isYes(v)
	}
	s.ValidUsers = splitUsers(p["valid users"])
	return s
}

func splitUsers(v string) []string {
	var out []string
	for _, f := range strings.FieldsFunc(v, func(r rune) bool { return r == ' ' || r == ',' || r == '\t' }) {
		if f != "" {
			out = append(out, f)
		}
	}
	return out
}

// UserShares filters out Samba's built-in sections.
func (c SambaConfig) UserShares() []ShareInfo {
	var out []ShareInfo
	for _, s := range c.Shares {
		if !specialShares[strings.ToLower(s.Name)] {
			out = append(out, s)
		}
	}
	return out
}

// ---- listening sockets (ss) ----------------------------------------------------

// Listener is one listening TCP socket.
type Listener struct {
	Address string `json:"address"` // "0.0.0.0", "::", "192.168.1.11"
	Port    int    `json:"port"`
	Process string `json:"process,omitempty"` // only when ss could see it (root)
}

// AllInterfaces reports whether the socket accepts connections on every interface.
func (l Listener) AllInterfaces() bool {
	return l.Address == "0.0.0.0" || l.Address == "::" || l.Address == "*" || l.Address == "[::]"
}

// ParseSS parses `ss -ltnH` / `ss -ltnpH` output.
func ParseSS(out string) []Listener {
	var res []Listener
	for _, line := range strings.Split(out, "\n") {
		f := strings.Fields(line)
		// LISTEN 0 50 0.0.0.0:445 0.0.0.0:* users:(("smbd",pid=1609,fd=30))
		if len(f) < 5 || f[0] != "LISTEN" {
			continue
		}
		addr, port, ok := splitHostPort(f[3])
		if !ok {
			continue
		}
		l := Listener{Address: addr, Port: port}
		for _, x := range f[5:] {
			if strings.HasPrefix(x, "users:") {
				if i := strings.Index(x, `(("`); i >= 0 {
					rest := x[i+3:]
					if j := strings.Index(rest, `"`); j > 0 {
						l.Process = rest[:j]
					}
				}
			}
		}
		res = append(res, l)
	}
	return res
}

func splitHostPort(s string) (string, int, bool) {
	i := strings.LastIndex(s, ":")
	if i < 0 {
		return "", 0, false
	}
	host := strings.Trim(s[:i], "[]")
	port := 0
	for _, c := range s[i+1:] {
		if c < '0' || c > '9' {
			return "", 0, false
		}
		port = port*10 + int(c-'0')
	}
	// Scoped/zone suffixes (fe80::1%wlan0) don't matter here.
	if j := strings.Index(host, "%"); j >= 0 {
		host = host[:j]
	}
	return host, port, true
}

// ---- vsftpd.conf ---------------------------------------------------------------

// ParseVsftpd reads vsftpd.conf: `key=value` lines (no spaces around '=' — the
// daemon itself refuses them), # comments.
func ParseVsftpd(data string) map[string]string {
	m := map[string]string{}
	for _, line := range strings.Split(data, "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		if k, v, ok := strings.Cut(line, "="); ok {
			m[strings.TrimSpace(k)] = strings.TrimSpace(v)
		}
	}
	return m
}
