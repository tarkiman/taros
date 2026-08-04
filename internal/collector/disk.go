package collector

import (
	"bufio"
	"fmt"
	"log/slog"
	"os"
	"regexp"
	"strconv"
	"strings"
	"syscall"
	"time"

	"github.com/tarkiman/taros/internal/store"
)

// excludedFSTypes are virtual/pseudo filesystems that don't represent real
// storage — see docs/04-features.md §4.1 "Disk (Internal & External)".
var excludedFSTypes = map[string]bool{
	"tmpfs": true, "devtmpfs": true, "proc": true, "sysfs": true,
	"cgroup": true, "cgroup2": true, "devpts": true, "mqueue": true,
	"pstore": true, "bpf": true, "tracefs": true, "debugfs": true,
	"securityfs": true, "autofs": true, "binfmt_misc": true,
	"overlay": true, "squashfs": true, "nsfs": true, "fusectl": true,
	"configfs": true, "ramfs": true, "none": true,
}

type mountEntry struct {
	mountPoint string
	fsType     string
	source     string
}

// parseMountInfo parses /proc/self/mountinfo. Each line looks like:
//
//	36 35 98:0 /mnt1 /mnt2 rw,noatime shared:1 - ext4 /dev/root rw
//
// The " - " literal separates a variable number of optional fields from
// the three trailing fields (fsType, source, superOptions) — the variable
// part is why this can't just be split on whitespace by fixed index.
func parseMountInfo(r *os.File) ([]mountEntry, error) {
	var entries []mountEntry
	scanner := bufio.NewScanner(r)
	for scanner.Scan() {
		line := scanner.Text()
		parts := strings.SplitN(line, " - ", 2)
		if len(parts) != 2 {
			continue
		}
		left := strings.Fields(parts[0])
		right := strings.Fields(parts[1])
		if len(left) < 5 || len(right) < 2 {
			continue
		}
		entries = append(entries, mountEntry{
			mountPoint: left[4],
			fsType:     right[0],
			source:     right[1],
		})
	}
	return entries, scanner.Err()
}

// wholeDiskRe matches whole-disk block device names (sda, nvme0n1,
// mmcblk0, vda...) as opposed to their partitions (sda1, nvme0n1p1,
// mmcblk0p1) — used both for the removable check below and for filtering
// /proc/diskstats to avoid double-counting partition + whole-disk I/O.
var wholeDiskRe = regexp.MustCompile(`^(sd[a-z]+|hd[a-z]+|vd[a-z]+|nvme\d+n\d+|mmcblk\d+)$`)

var partitionRe = regexp.MustCompile(`^(sd[a-z]+|hd[a-z]+|vd[a-z]+)(\d+)$|^(nvme\d+n\d+|mmcblk\d+)p(\d+)$`)

// parentBlockDevice strips a partition suffix (sda1 -> sda, nvme0n1p1 ->
// nvme0n1) so /sys/block/<parent>/removable can be read.
func parentBlockDevice(name string) string {
	m := partitionRe.FindStringSubmatch(name)
	if m == nil {
		return name
	}
	if m[1] != "" {
		return m[1]
	}
	return m[3]
}

func isRemovable(source string) bool {
	name := strings.TrimPrefix(source, "/dev/")
	parent := parentBlockDevice(name)
	data, err := os.ReadFile("/sys/block/" + parent + "/removable")
	if err != nil {
		return false
	}
	return strings.TrimSpace(string(data)) == "1"
}

// sampleDiskUsage refreshes c.latestDisks. Called on its own slower
// ticker (docs/04-features.md: disk usage every ~10s) since statfs on
// every mount is more expensive than the other fast-tick metrics.
func (c *Collector) sampleDiskUsage() {
	f, err := os.Open("/proc/self/mountinfo")
	if err != nil {
		slog.Error("collector: open mountinfo", "err", err)
		return
	}
	defer f.Close()

	entries, err := parseMountInfo(f)
	if err != nil {
		slog.Error("collector: parse mountinfo", "err", err)
		return
	}

	var mounts []store.DiskMount
	seen := make(map[string]bool)
	for _, e := range entries {
		if excludedFSTypes[e.fsType] {
			continue
		}
		if seen[e.mountPoint] {
			continue // later bind-mount entries would otherwise duplicate
		}
		seen[e.mountPoint] = true

		var stat syscall.Statfs_t
		if err := syscall.Statfs(e.mountPoint, &stat); err != nil {
			continue
		}
		total := uint64(stat.Bsize) * stat.Blocks
		free := uint64(stat.Bsize) * stat.Bfree
		if total == 0 {
			continue
		}
		used := total - free
		mounts = append(mounts, store.DiskMount{
			MountPoint:  e.mountPoint,
			Device:      e.source,
			FSType:      e.fsType,
			TotalBytes:  total,
			UsedBytes:   used,
			FreeBytes:   free,
			UsedPercent: float64(used) / float64(total) * 100,
			Removable:   isRemovable(e.source),
		})
	}
	c.latestDisks = mounts
}

type diskIOSample struct {
	readSectors  uint64
	writeSectors uint64
}

// sampleDiskIO reads aggregate whole-disk sectors from /proc/diskstats and
// converts the delta since the previous tick into bytes/sec.
func (c *Collector) sampleDiskIO(now time.Time) (store.DiskIOInfo, error) {
	f, err := os.Open("/proc/diskstats")
	if err != nil {
		return store.DiskIOInfo{}, fmt.Errorf("open /proc/diskstats: %w", err)
	}
	defer f.Close()

	var cur diskIOSample
	scanner := bufio.NewScanner(f)
	for scanner.Scan() {
		fields := strings.Fields(scanner.Text())
		if len(fields) < 10 {
			continue
		}
		name := fields[2]
		if !wholeDiskRe.MatchString(name) {
			continue
		}
		readSectors, _ := strconv.ParseUint(fields[5], 10, 64)
		writeSectors, _ := strconv.ParseUint(fields[9], 10, 64)
		cur.readSectors += readSectors
		cur.writeSectors += writeSectors
	}
	if err := scanner.Err(); err != nil {
		return store.DiskIOInfo{}, err
	}

	var info store.DiskIOInfo
	if c.prevDiskIO != nil && c.prevDiskIOAt.Before(now) {
		elapsed := now.Sub(c.prevDiskIOAt).Seconds()
		if elapsed > 0 {
			const sectorSize = 512
			readDelta := float64(cur.readSectors-c.prevDiskIO.readSectors) * sectorSize
			writeDelta := float64(cur.writeSectors-c.prevDiskIO.writeSectors) * sectorSize
			info.ReadBytesPerSec = readDelta / elapsed
			info.WriteBytesPerSec = writeDelta / elapsed
		}
	}
	c.prevDiskIO = &cur
	c.prevDiskIOAt = now
	return info, nil
}
