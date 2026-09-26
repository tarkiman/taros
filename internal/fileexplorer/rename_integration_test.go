package fileexplorer

import (
	"errors"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"testing"
)

// TestIntegrationRenameOnRealFilesystems renames on REAL vfat, exfat and ext4
// (loop devices), where the interesting differences live: FAT and exFAT are case
// INsensitive, so "Foto.JPG" → "foto.jpg" finds the new name already "taken" by the
// same file. It mounts things, so it only runs when TAROS_FS_IT=1 — in a disposable
// container without real disks in /dev (see internal/storage/integration_test.go).
func TestIntegrationRenameOnRealFilesystems(t *testing.T) {
	if os.Getenv("TAROS_FS_IT") != "1" {
		t.Skip("set TAROS_FS_IT=1 (inside a disposable container)")
	}
	if m, _ := filepath.Glob("/dev/sd*"); len(m) > 0 {
		t.Fatalf("real disks are visible in /dev (%v)", m)
	}
	sh := func(name string, args ...string) string {
		t.Helper()
		out, err := exec.Command(name, args...).CombinedOutput()
		if err != nil {
			t.Fatalf("%s %v: %v\n%s", name, args, err, out)
		}
		return strings.TrimSpace(string(out))
	}
	names := func(dir string) []string {
		es, _ := os.ReadDir(dir)
		var out []string
		for _, e := range es {
			out = append(out, e.Name())
		}
		return out
	}

	for _, fsys := range []struct {
		name            string
		caseInsensitive bool
	}{{"vfat", true}, {"exfat", true}, {"ext4", false}} {
		t.Run(fsys.name, func(t *testing.T) {
			img := filepath.Join(t.TempDir(), fsys.name+".img")
			sh("truncate", "-s", "64M", img)
			switch fsys.name {
			case "vfat":
				sh("mkfs.vfat", img)
			case "exfat":
				sh("mkfs.exfat", img)
			case "ext4":
				sh("mkfs.ext4", "-q", "-F", img)
			}
			dev := sh("losetup", "-f", "--show", img)
			defer exec.Command("losetup", "-d", dev).Run()
			mp := t.TempDir()
			sh("mount", "-t", fsys.name, dev, mp)
			defer exec.Command("umount", mp).Run()

			// an ordinary rename
			write(t, filepath.Join(mp, "a.txt"), "A")
			if err := Rename(filepath.Join(mp, "a.txt"), filepath.Join(mp, "b.txt")); err != nil {
				t.Fatalf("plain rename: %v", err)
			}
			// onto an existing name: refused, nothing replaced
			write(t, filepath.Join(mp, "c.txt"), "C")
			if err := Rename(filepath.Join(mp, "b.txt"), filepath.Join(mp, "c.txt")); !errors.Is(err, ErrExists) {
				t.Fatalf("onto an existing file: %v", err)
			}
			if read(t, filepath.Join(mp, "c.txt")) != "C" || read(t, filepath.Join(mp, "b.txt")) != "A" {
				t.Error("both files must be untouched")
			}
			// a change of case only
			write(t, filepath.Join(mp, "Foto.JPG"), "F")
			err := Rename(filepath.Join(mp, "Foto.JPG"), filepath.Join(mp, "foto.jpg"))
			if fsys.caseInsensitive {
				if err != nil {
					t.Fatalf("a case-only rename must work on %s: %v", fsys.name, err)
				}
				var got string
				for _, n := range names(mp) {
					if strings.EqualFold(n, "foto.jpg") {
						got = n
					}
				}
				if got != "foto.jpg" {
					t.Errorf("the listing must show the new case, got %q (%v)", got, names(mp))
				}
				// case-only relaxation does not license overwriting a DIFFERENT file
				write(t, filepath.Join(mp, "Other.TXT"), "O")
				if err := Rename(filepath.Join(mp, "b.txt"), filepath.Join(mp, "other.txt")); !errors.Is(err, ErrExists) {
					t.Errorf("a different name that matches another file ignoring case: %v", err)
				}
			} else if err != nil {
				t.Fatalf("on a case-sensitive filesystem it is just a rename: %v", err)
			}
			// a folder
			os.Mkdir(filepath.Join(mp, "Album"), 0o755)
			write(t, filepath.Join(mp, "Album", "x"), "x")
			if err := Rename(filepath.Join(mp, "Album"), filepath.Join(mp, "photos")); err != nil {
				t.Fatalf("folder rename: %v", err)
			}
			if read(t, filepath.Join(mp, "photos", "x")) != "x" {
				t.Error("folder contents kept")
			}
		})
	}
}
