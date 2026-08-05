// Package selfupdate checks GitHub Releases for a newer TarOS build and, on
// request, replaces the currently running binary with it in place — see
// docs/09-deployment.md §9.5 and docs/07-security.md for the design
// rationale (why this is safe without root, and why it's config-gated).
//
// The repo to check is hardcoded, not configurable — this only ever talks
// to the official release feed, never an arbitrary user-supplied URL.
package selfupdate

import (
	"archive/tar"
	"compress/gzip"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"path/filepath"
	"runtime"
	"strings"
	"time"
)

const releasesAPI = "https://api.github.com/repos/tarkiman/taros/releases/latest"

// maxDownloadBytes bounds both the release-info response and the tarball
// download — the real ones are a few KB and ~10-15MB respectively, this is
// just a sanity ceiling against a misbehaving/compromised upstream, not a
// tight budget.
const maxDownloadBytes = 200 * 1024 * 1024

type ReleaseInfo struct {
	Version     string
	DownloadURL string
}

type githubAsset struct {
	Name               string `json:"name"`
	BrowserDownloadURL string `json:"browser_download_url"`
}

type githubRelease struct {
	TagName string        `json:"tag_name"`
	Assets  []githubAsset `json:"assets"`
}

// archSuffix maps GOARCH to the suffix release.yml uses in asset filenames
// (taros-vX.Y.Z-<suffix>.tar.gz).
func archSuffix() (string, error) {
	switch runtime.GOARCH {
	case "arm64":
		return "arm64", nil
	case "arm":
		return "armv7", nil
	default:
		return "", fmt.Errorf("selfupdate: tidak ada rilis siap pakai untuk arsitektur %s — build manual (docs/09-deployment.md §9.1)", runtime.GOARCH)
	}
}

var httpClient = &http.Client{Timeout: 30 * time.Second}

// CheckLatest asks GitHub for the latest release and returns the asset
// matching this process's architecture.
func CheckLatest(ctx context.Context) (*ReleaseInfo, error) {
	suffix, err := archSuffix()
	if err != nil {
		return nil, err
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, releasesAPI, nil)
	if err != nil {
		return nil, err
	}
	req.Header.Set("Accept", "application/vnd.github+json")

	resp, err := httpClient.Do(req)
	if err != nil {
		return nil, fmt.Errorf("selfupdate: cek rilis terbaru: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return nil, fmt.Errorf("selfupdate: GitHub API mengembalikan status %d", resp.StatusCode)
	}

	var rel githubRelease
	if err := json.NewDecoder(io.LimitReader(resp.Body, maxDownloadBytes)).Decode(&rel); err != nil {
		return nil, fmt.Errorf("selfupdate: parse response rilis: %w", err)
	}

	want := "-" + suffix + ".tar.gz"
	for _, a := range rel.Assets {
		if strings.HasSuffix(a.Name, want) {
			return &ReleaseInfo{Version: rel.TagName, DownloadURL: a.BrowserDownloadURL}, nil
		}
	}
	return nil, fmt.Errorf("selfupdate: rilis %s tidak punya asset untuk arsitektur %s", rel.TagName, suffix)
}

// Apply downloads the release tarball at downloadURL, extracts the `taros`
// binary from it, and atomically replaces the currently running
// executable. It does NOT restart the process — see
// docs/09-deployment.md §9.5: the caller exits afterward and relies on
// systemd's Restart=always to bring it back up running the new binary,
// same mechanism scripts/install.sh's own update path uses.
//
// os.Rename over an in-use executable is safe on Linux: the kernel keeps
// the old inode alive via the running process's own open file descriptor,
// the rename just repoints the directory entry — no "text file busy" the
// way overwriting-in-place (open+truncate+write) would risk.
func Apply(ctx context.Context, downloadURL string) error {
	execPath, err := os.Executable()
	if err != nil {
		return fmt.Errorf("selfupdate: cari path binary sendiri: %w", err)
	}
	if resolved, err := filepath.EvalSymlinks(execPath); err == nil {
		execPath = resolved
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodGet, downloadURL, nil)
	if err != nil {
		return err
	}
	resp, err := httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("selfupdate: unduh rilis: %w", err)
	}
	defer resp.Body.Close()
	if resp.StatusCode != http.StatusOK {
		return fmt.Errorf("selfupdate: unduh rilis mengembalikan status %d", resp.StatusCode)
	}

	gz, err := gzip.NewReader(io.LimitReader(resp.Body, maxDownloadBytes))
	if err != nil {
		return fmt.Errorf("selfupdate: buka arsip rilis: %w", err)
	}
	defer gz.Close()

	// tmpPath sits next to the real binary so the final rename is atomic
	// and same-filesystem (os.Rename fails across filesystems, and a
	// generic /tmp can be a separate tmpfs mount). This requires the
	// binary's own directory to be writable by the service user — not
	// just the binary file itself, which is why scripts/install.sh
	// installs to a dedicated /opt/taros/ owned entirely by that user
	// (rather than into the shared, root-owned /usr/local/bin — creating
	// or renaming a file *into* a directory needs write access to that
	// directory regardless of who owns the file being replaced, ownership
	// of the file alone doesn't grant that).
	tmpPath := execPath + ".update-tmp"
	defer os.Remove(tmpPath) // no-op once the rename below succeeds

	tr := tar.NewReader(gz)
	found := false
	for {
		hdr, err := tr.Next()
		if err == io.EOF {
			break
		}
		if err != nil {
			return fmt.Errorf("selfupdate: baca arsip rilis: %w", err)
		}
		if hdr.Typeflag != tar.TypeReg || filepath.Base(hdr.Name) != "taros" {
			continue
		}

		f, err := os.OpenFile(tmpPath, os.O_CREATE|os.O_WRONLY|os.O_TRUNC, 0o755)
		if err != nil {
			return fmt.Errorf("selfupdate: buat file sementara di %s: %w — direktori binary ini perlu dimiliki user servis (lihat scripts/install.sh); kalau instalasi ini dari sebelum fitur update ada, jalankan ulang installer sekali untuk menyiapkannya", filepath.Dir(tmpPath), err)
		}
		_, err = io.Copy(f, io.LimitReader(tr, maxDownloadBytes))
		closeErr := f.Close()
		if err != nil {
			return fmt.Errorf("selfupdate: tulis binary baru: %w", err)
		}
		if closeErr != nil {
			return fmt.Errorf("selfupdate: tulis binary baru: %w", closeErr)
		}
		found = true
		break
	}
	if !found {
		return fmt.Errorf("selfupdate: binary 'taros' tidak ditemukan di dalam arsip rilis")
	}

	if err := os.Rename(tmpPath, execPath); err != nil {
		return fmt.Errorf("selfupdate: ganti binary di %s: %w — biasanya berarti direktori binary ini tidak dimiliki user servis (lihat scripts/install.sh)", execPath, err)
	}
	return nil
}
