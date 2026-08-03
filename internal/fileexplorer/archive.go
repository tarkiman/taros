package fileexplorer

import (
	"archive/zip"
	"io"
	"io/fs"
	"net/http"
	"os"
	"path/filepath"
)

// ZipFolder streams dir as a zip directly into w — never builds the
// archive on disk or in memory first. archive/zip's Writer already writes
// each entry as it's added (no full-buffer step), consistent with
// docs/04-features.md §4.4 "Keandalan Operasi File Besar/Banyak": memory
// use stays flat regardless of how large the folder is.
func ZipFolder(w http.ResponseWriter, dir string) error {
	base := filepath.Base(dir)
	w.Header().Set("Content-Type", "application/zip")
	w.Header().Set("Content-Disposition", `attachment; filename="`+base+`.zip"`)

	zw := zip.NewWriter(w)
	defer zw.Close()

	return filepath.WalkDir(dir, func(path string, d fs.DirEntry, err error) error {
		if err != nil {
			return err
		}
		rel, err := filepath.Rel(dir, path)
		if err != nil {
			return err
		}
		if rel == "." {
			return nil
		}
		nameInZip := filepath.Join(base, rel)

		if d.IsDir() {
			_, err := zw.Create(nameInZip + "/")
			return err
		}
		if d.Type()&os.ModeSymlink != 0 {
			return nil // symlinks skipped — same as copyTree, see copy.go
		}

		info, err := d.Info()
		if err != nil {
			return err
		}
		header, err := zip.FileInfoHeader(info)
		if err != nil {
			return err
		}
		header.Name = nameInZip
		header.Method = zip.Deflate

		entryWriter, err := zw.CreateHeader(header)
		if err != nil {
			return err
		}

		src, err := os.Open(path)
		if err != nil {
			return err
		}
		defer src.Close()

		buf := make([]byte, 256*1024)
		_, err = io.CopyBuffer(entryWriter, src, buf)
		return err
	})
}
