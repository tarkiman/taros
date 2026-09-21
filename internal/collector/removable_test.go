package collector

import (
	"os"
	"path/filepath"
	"testing"
)

func TestUSBHardDiskCountsAsExternal(t *testing.T) {
	dir := t.TempDir()
	mk := func(name, removable, target string) {
		devDir := filepath.Join(dir, "devices", target)
		os.MkdirAll(devDir, 0o755)
		os.WriteFile(filepath.Join(devDir, "removable"), []byte(removable+"\n"), 0o644)
		os.Symlink(filepath.Join("devices", target), filepath.Join(dir, name))
	}
	// what the real kernel reports: a USB hard disk is removable=0, a stick is 1, NVMe is internal
	mk("sda", "0", "platform/xhci-hcd.0/usb1/1-1/1-1:1.0/host0/target0:0:0/0:0:0:0/block/sda")
	mk("sdb", "1", "platform/xhci-hcd.0/usb1/1-2/1-2:1.0/host1/target1:0:0/1:0:0:0/block/sdb")
	mk("nvme0n1", "0", "platform/axi/1000110000.pcie/pci0000:00/0000:00:00.0/nvme/nvme0/nvme0n1")
	for src, want := range map[string]bool{"/dev/sda2": true, "/dev/sdb1": true, "/dev/nvme0n1p2": false, "/dev/mmcblk0p1": false} {
		if got := isRemovableAt(dir, src); got != want {
			t.Errorf("%s: got %v, want %v", src, got, want)
		}
	}
}
