package bootlog

import (
	"errors"
	"os"
	"path/filepath"
	"strconv"
	"strings"
)

// OSSources reads the real machine. Everything is a plain sysfs/procfs read
// that any user can do (vcgencmd would need /dev/vcio = root, so the Pi's
// hwmon undervoltage alarm is used instead — it reports the *current* state,
// which TarOS samples every few seconds).
type OSSources struct{}

func (OSSources) BootID() (string, error) {
	b, err := os.ReadFile("/proc/sys/kernel/random/boot_id")
	if err != nil {
		return "", err
	}
	return strings.TrimSpace(string(b)), nil
}

func (OSSources) UptimeSec() (float64, error) {
	b, err := os.ReadFile("/proc/uptime")
	if err != nil {
		return 0, err
	}
	f := strings.Fields(string(b))
	if len(f) == 0 {
		return 0, errors.New("bootlog: empty /proc/uptime")
	}
	return strconv.ParseFloat(f[0], 64)
}

func (OSSources) NVMeTempC() (float64, bool) {
	dir := hwmonDir("nvme")
	if dir == "" {
		return 0, false
	}
	b, err := os.ReadFile(filepath.Join(dir, "temp1_input")) // "Composite"
	if err != nil {
		return 0, false
	}
	milli, err := strconv.ParseFloat(strings.TrimSpace(string(b)), 64)
	if err != nil {
		return 0, false
	}
	return milli / 1000, true
}

func (OSSources) Undervoltage() (alarm, ok bool) {
	dir := hwmonDir("rpi_volt")
	if dir == "" {
		return false, false
	}
	b, err := os.ReadFile(filepath.Join(dir, "in0_lcrit_alarm"))
	if err != nil {
		return false, false
	}
	return strings.TrimSpace(string(b)) == "1", true
}

// hwmonDir finds /sys/class/hwmon/hwmonN whose name file equals name.
func hwmonDir(name string) string {
	dirs, _ := filepath.Glob("/sys/class/hwmon/hwmon*")
	for _, d := range dirs {
		if b, err := os.ReadFile(filepath.Join(d, "name")); err == nil && strings.TrimSpace(string(b)) == name {
			return d
		}
	}
	return ""
}
