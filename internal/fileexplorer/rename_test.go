package fileexplorer

import (
	"errors"
	"os"
	"path/filepath"
	"strings"
	"testing"
)

func write(t *testing.T, p, body string) {
	t.Helper()
	if err := os.WriteFile(p, []byte(body), 0o644); err != nil {
		t.Fatal(err)
	}
}

func read(t *testing.T, p string) string {
	t.Helper()
	b, err := os.ReadFile(p)
	if err != nil {
		t.Fatal(err)
	}
	return string(b)
}

func TestValidName(t *testing.T) {
	for _, ok := range []string{"a", "laporan akhir.txt", ".hidden", "..dots", "a\\b", "日本語.txt", strings.Repeat("x", 255)} {
		if err := ValidName(ok); err != nil {
			t.Errorf("%q should be a valid name: %v", ok, err)
		}
	}
	for _, bad := range []string{"", " ", "   \t", ".", "..", "a/b", "/", "a\x00b", strings.Repeat("x", 256)} {
		if !errors.Is(ValidName(bad), ErrInvalidName) {
			t.Errorf("%q must be rejected", bad)
		}
	}
}

func TestRenameMovesTheEntry(t *testing.T) {
	dir := t.TempDir()
	write(t, filepath.Join(dir, "a.txt"), "content")
	if err := Rename(filepath.Join(dir, "a.txt"), filepath.Join(dir, "b.txt")); err != nil {
		t.Fatal(err)
	}
	if _, err := os.Stat(filepath.Join(dir, "a.txt")); err == nil {
		t.Error("the old name is gone")
	}
	if read(t, filepath.Join(dir, "b.txt")) != "content" {
		t.Error("content is kept")
	}
	// a folder, with its contents
	os.MkdirAll(filepath.Join(dir, "album", "sub"), 0o755)
	write(t, filepath.Join(dir, "album", "sub", "f.jpg"), "x")
	if err := Rename(filepath.Join(dir, "album"), filepath.Join(dir, "photos")); err != nil {
		t.Fatal(err)
	}
	if read(t, filepath.Join(dir, "photos", "sub", "f.jpg")) != "x" {
		t.Error("a renamed folder keeps what is inside")
	}
}

func TestRenameNeverReplacesAnything(t *testing.T) {
	dir := t.TempDir()
	write(t, filepath.Join(dir, "a.txt"), "AAA")
	write(t, filepath.Join(dir, "b.txt"), "BBB")
	if err := Rename(filepath.Join(dir, "a.txt"), filepath.Join(dir, "b.txt")); !errors.Is(err, ErrExists) {
		t.Fatalf("rename onto an existing file: %v", err)
	}
	if err := Rename(filepath.Join(dir, "a.txt"), filepath.Join(dir, "b.txt")); err != nil && strings.Contains(err.Error(), dir) {
		t.Errorf("the message must not carry the server's absolute path: %v", err)
	}
	if read(t, filepath.Join(dir, "a.txt")) != "AAA" || read(t, filepath.Join(dir, "b.txt")) != "BBB" {
		t.Error("both files must be untouched")
	}
	// onto a folder
	os.Mkdir(filepath.Join(dir, "d"), 0o755)
	if err := Rename(filepath.Join(dir, "a.txt"), filepath.Join(dir, "d")); !errors.Is(err, ErrExists) {
		t.Errorf("onto a folder: %v", err)
	}
	// a DANGLING symlink is a taken name too (a plain Stat would call it free and overwrite it)
	os.Symlink(filepath.Join(dir, "nowhere"), filepath.Join(dir, "link"))
	if err := Rename(filepath.Join(dir, "a.txt"), filepath.Join(dir, "link")); !errors.Is(err, ErrExists) {
		t.Errorf("onto a dangling symlink: %v", err)
	}
	if _, err := os.Lstat(filepath.Join(dir, "link")); err != nil {
		t.Error("the symlink must still be there")
	}
	// a hard link to the same file under another name is also "taken"
	os.Link(filepath.Join(dir, "a.txt"), filepath.Join(dir, "a-link.txt"))
	if err := Rename(filepath.Join(dir, "a.txt"), filepath.Join(dir, "a-link.txt")); !errors.Is(err, ErrExists) {
		t.Errorf("onto a hard link of itself: %v", err)
	}
	// a missing source
	if err := Rename(filepath.Join(dir, "ghost"), filepath.Join(dir, "new")); !errors.Is(err, os.ErrNotExist) {
		t.Errorf("missing source: %v", err)
	}
}

func TestCaseOnlyRenameNeedsTheSameFile(t *testing.T) {
	// On this (case-sensitive) filesystem two names that differ only by case are two
	// different files, so this must be refused — the relaxation is for filesystems where
	// both names lead to the same file (checked for real against vfat in the container test).
	dir := t.TempDir()
	write(t, filepath.Join(dir, "Foto.JPG"), "1")
	write(t, filepath.Join(dir, "foto.jpg"), "2")
	if err := Rename(filepath.Join(dir, "Foto.JPG"), filepath.Join(dir, "foto.jpg")); !errors.Is(err, ErrExists) {
		t.Errorf("two different files: %v", err)
	}
	if caseOnlyRename(filepath.Join(dir, "x", "A"), filepath.Join(dir, "y", "a")) {
		t.Error("different folders are never a case-only rename")
	}
	if caseOnlyRename(filepath.Join(dir, "same"), filepath.Join(dir, "same")) {
		t.Error("identical names are not a case-only rename")
	}
	if caseOnlyRename(filepath.Join(dir, "Foto.JPG"), filepath.Join(dir, "other.jpg")) {
		t.Error("different names are not a case-only rename")
	}
}

func TestRenameViaTempKeepsTheFileAndCleansUp(t *testing.T) {
	dir := t.TempDir()
	write(t, filepath.Join(dir, "Foto.JPG"), "F")
	if err := renameViaTemp(filepath.Join(dir, "Foto.JPG"), filepath.Join(dir, "foto.jpg")); err != nil {
		t.Fatal(err)
	}
	if read(t, filepath.Join(dir, "foto.jpg")) != "F" {
		t.Error("content kept")
	}
	es, _ := os.ReadDir(dir)
	if len(es) != 1 {
		t.Errorf("no temporary name may be left behind: %v", es)
	}
	// when the second step fails the file goes back under its old name
	write(t, filepath.Join(dir, "Bar.TXT"), "B")
	os.Mkdir(filepath.Join(dir, "sub"), 0o755)
	if err := renameViaTemp(filepath.Join(dir, "Bar.TXT"), filepath.Join(dir, "missing-dir", "bar.txt")); err == nil {
		t.Fatal("expected a failure")
	}
	if read(t, filepath.Join(dir, "Bar.TXT")) != "B" {
		t.Error("after a failure the file must be back under its original name")
	}
}
