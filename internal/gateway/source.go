package gateway

import (
	"errors"
	"net"
	"net/url"
	"regexp"
	"strings"
)

// Relay sources as managed from the UI (ported from the NVR's camera/source.go). Only a
// single rtsp/rtsps/rtmp/http(s) source to a device on the site's network is editable;
// anything else (xiaomi://, ffmpeg:, exec:, several sources) stays in go2rtc.yaml.

var editableSchemes = map[string]bool{"rtsp": true, "rtsps": true, "rtmp": true, "http": true, "https": true}

var (
	ErrInvalidSource = errors.New("invalid source URL")
	ErrPublicSource  = errors.New("source must be on a local network")
)

var credRe = regexp.MustCompile(`([a-z][a-z0-9+.-]*)://[^/@\s"']*@`)

// SourceInfo describes a source without its password.
type SourceInfo struct {
	URL         string `json:"url"` // credentials removed
	Username    string `json:"username,omitempty"`
	HasPassword bool   `json:"hasPassword"`
}

// SourceInput is a source as entered in the UI. An empty password keeps the current one
// when the username is unchanged.
type SourceInput struct {
	URL      string `json:"url"`
	Username string `json:"username"`
	Password string `json:"password"`
}

// DescribeSource splits a source URL into a credential-free URL and the username.
func DescribeSource(src string) SourceInfo {
	u, err := url.Parse(src)
	if err != nil || u.Scheme == "" || u.Opaque != "" {
		// Not a host URL (ffmpeg:cam#video=h264, exec:...): show it unless it might
		// carry a login.
		if strings.Contains(src, "@") {
			scheme, _, _ := strings.Cut(src, ":")
			return SourceInfo{URL: scheme + ":…"}
		}
		return SourceInfo{URL: src}
	}
	info := SourceInfo{}
	if u.User != nil {
		info.Username = u.User.Username()
		_, info.HasPassword = u.User.Password()
	}
	u.User = nil
	info.URL = u.String()
	return info
}

// Editable reports whether a stream's sources can be managed from the UI, and why not.
func Editable(srcs []string) (bool, string) {
	switch {
	case len(srcs) == 0:
		return false, "missing"
	case len(srcs) > 1:
		return false, "multiple"
	case strings.HasPrefix(srcs[0], "xiaomi://"):
		return false, "xiaomi"
	}
	u, err := url.Parse(srcs[0])
	if err != nil || !editableSchemes[strings.ToLower(u.Scheme)] {
		return false, "scheme"
	}
	return true, ""
}

// BuildSource turns UI input into the go2rtc source URL. Credentials are encoded with
// net/url so characters such as "@" in passwords survive. When no password is given,
// the password of old (the current source) is kept if the username is unchanged.
func BuildSource(in SourceInput, old string) (string, error) {
	u, err := url.Parse(strings.TrimSpace(in.URL))
	if err != nil || !editableSchemes[strings.ToLower(u.Scheme)] || u.Hostname() == "" {
		return "", ErrInvalidSource
	}
	if !LocalHost(u.Hostname()) {
		return "", ErrPublicSource
	}
	user, pass, hasPass := "", "", false
	if u.User != nil {
		user = u.User.Username()
		pass, hasPass = u.User.Password()
	}
	if in.Username != "" {
		user = in.Username
	}
	if in.Password != "" {
		pass, hasPass = in.Password, true
	}
	if !hasPass && user != "" && old != "" {
		if o, err := url.Parse(old); err == nil && o.User != nil && o.User.Username() == user {
			pass, hasPass = o.User.Password()
		}
	}
	switch {
	case user == "":
		u.User = nil
	case hasPass:
		u.User = url.UserPassword(user, pass)
	default:
		u.User = url.User(user)
	}
	return u.String(), nil
}

// LocalHost accepts private, link-local and CGNAT addresses and plain host names (local
// DNS). A public IP literal is refused: a gateway relays its own site's devices, and
// the "Tes" button must not become a way to probe the internet.
func LocalHost(h string) bool {
	ip := net.ParseIP(h)
	if ip == nil {
		return h != "" && !strings.ContainsAny(h, " /@") && hostnameRe.MatchString(h)
	}
	return ip.IsPrivate() || ip.IsLinkLocalUnicast() || inCGNAT(ip)
}

var hostnameRe = regexp.MustCompile(`^[A-Za-z0-9]([A-Za-z0-9-]{0,62})(\.[A-Za-z0-9]([A-Za-z0-9-]{0,62}))*$`)

var cgnat = func() *net.IPNet { _, n, _ := net.ParseCIDR("100.64.0.0/10"); return n }()

func inCGNAT(ip net.IP) bool { return cgnat.Contains(ip) }

// streamNameRe: names the NVR accepts as camera slugs; "<name>_sub" is picked up by the
// NVR as the sub-stream of "<name>".
var streamNameRe = regexp.MustCompile(`^[a-z0-9][a-z0-9_-]{0,39}$`)

func ValidStreamName(n string) bool { return streamNameRe.MatchString(n) }
