package sharing

import (
	"fmt"
	"os"
	"strings"
)

// Family groups distributions by package manager and service naming.
type Family string

const (
	FamilyDebian  Family = "debian" // Debian, Ubuntu, Raspberry Pi OS, Mint…
	FamilyRHEL    Family = "rhel"   // Fedora, RHEL, CentOS, Rocky, Alma…
	FamilyArch    Family = "arch"
	FamilyAlpine  Family = "alpine"
	FamilySUSE    Family = "suse"
	FamilyUnknown Family = "unknown"
)

// Distro is what /etc/os-release says about this machine.
type Distro struct {
	ID        string `json:"id"`
	Name      string `json:"name"`
	VersionID string `json:"versionId,omitempty"`
	Family    Family `json:"family"`
	PkgMgr    string `json:"packageManager,omitempty"`
}

// ParseOSRelease reads os-release syntax (KEY=value, optionally quoted).
func ParseOSRelease(data string) Distro {
	kv := map[string]string{}
	for _, line := range strings.Split(data, "\n") {
		line = strings.TrimSpace(line)
		if line == "" || strings.HasPrefix(line, "#") {
			continue
		}
		k, v, ok := strings.Cut(line, "=")
		if !ok {
			continue
		}
		kv[k] = strings.Trim(strings.TrimSpace(v), `"'`)
	}
	d := Distro{ID: strings.ToLower(kv["ID"]), Name: kv["PRETTY_NAME"], VersionID: kv["VERSION_ID"]}
	if d.Name == "" {
		d.Name = kv["NAME"]
	}
	// ID first (Raspberry Pi OS reports ID=debian; older ones ID=raspbian), then ID_LIKE.
	ids := append([]string{d.ID}, strings.Fields(strings.ToLower(kv["ID_LIKE"]))...)
	for _, id := range ids {
		if f := familyOf(id); f != FamilyUnknown {
			d.Family = f
			break
		}
	}
	if d.Family == "" {
		d.Family = FamilyUnknown
	}
	d.PkgMgr = map[Family]string{FamilyDebian: "apt", FamilyRHEL: "dnf", FamilyArch: "pacman", FamilyAlpine: "apk", FamilySUSE: "zypper"}[d.Family]
	return d
}

func familyOf(id string) Family {
	switch id {
	case "debian", "ubuntu", "raspbian", "linuxmint", "pop", "kali", "devuan", "elementary", "zorin":
		return FamilyDebian
	case "fedora", "rhel", "centos", "rocky", "almalinux", "ol", "amzn", "nobara":
		return FamilyRHEL
	case "arch", "manjaro", "endeavouros", "archarm", "garuda", "cachyos":
		return FamilyArch
	case "alpine", "postmarketos":
		return FamilyAlpine
	case "opensuse", "opensuse-leap", "opensuse-tumbleweed", "sles", "suse":
		return FamilySUSE
	}
	return FamilyUnknown
}

// DetectDistro reads path (normally /etc/os-release).
func DetectDistro(path string) Distro {
	data, err := os.ReadFile(path)
	if err != nil {
		return Distro{Family: FamilyUnknown}
	}
	return ParseOSRelease(string(data))
}

// SambaPackages / VSFTPDPackages: what to install for each. Debian's `samba`
// already carries testparm/smbpasswd/pdbedit; Alpine splits the tools out.
func (d Distro) SambaPackages() []string {
	if d.Family == FamilyAlpine {
		return []string{"samba", "samba-common-tools"}
	}
	return []string{"samba"}
}

func (d Distro) VSFTPDPackages() []string { return []string{"vsftpd"} }

// SambaUnits returns the systemd unit names of smbd and nmbd on this family.
func (d Distro) SambaUnits() (smb, nmb string) {
	switch d.Family {
	case FamilyDebian:
		return "smbd", "nmbd"
	case FamilyAlpine:
		return "samba", ""
	}
	return "smb", "nmb" // rhel, arch, suse
}

// InstallCommand is the command line a human can paste to install pkgs.
// Non-root callers get a `sudo` prefix.
func (d Distro) InstallCommand(pkgs []string, root bool) string {
	list := strings.Join(pkgs, " ")
	var cmd string
	switch d.Family {
	case FamilyDebian:
		cmd = "apt-get install -y " + list
	case FamilyRHEL:
		cmd = "dnf install -y " + list
	case FamilyArch:
		cmd = "pacman -S --noconfirm " + list
	case FamilyAlpine:
		cmd = "apk add " + list
	case FamilySUSE:
		cmd = "zypper --non-interactive install " + list
	default:
		return ""
	}
	if !root {
		cmd = "sudo " + cmd
	}
	return cmd
}

// InstallHint is what the UI shows when a server isn't installed.
type InstallHint struct {
	Packages []string `json:"packages"`
	Command  string   `json:"command"` // "" when the distro is unknown
}

func (d Distro) hint(pkgs []string, root bool) InstallHint {
	return InstallHint{Packages: pkgs, Command: d.InstallCommand(pkgs, root)}
}

func (d Distro) String() string { return fmt.Sprintf("%s (%s)", d.Name, d.Family) }
