package fileexplorer

import (
	"context"
	"errors"
	"os"
	"path/filepath"
	"testing"
	"time"
)

func testJail(t *testing.T) *Jail {
	t.Helper()
	root := t.TempDir()
	if err := os.WriteFile(filepath.Join(root, "small.txt"), []byte("hi"), 0o644); err != nil {
		t.Fatal(err)
	}
	if err := os.WriteFile(filepath.Join(root, "big.bin"), make([]byte, 4096), 0o644); err != nil {
		t.Fatal(err)
	}
	jail, err := NewJail(root, nil)
	if err != nil {
		t.Fatal(err)
	}
	return jail
}

func TestScanFindsLargestFile(t *testing.T) {
	jail := testJail(t)

	result, err := Scan(context.Background(), jail, ScanOptions{})
	if err != nil {
		t.Fatalf("Scan: %v", err)
	}
	if len(result.LargestFiles) == 0 || filepath.Base(result.LargestFiles[0].Path) != "big.bin" {
		t.Fatalf("expected big.bin as largest file, got %+v", result.LargestFiles)
	}
	if result.TotalBytes != 4096+2 {
		t.Fatalf("expected total 4098 bytes, got %d", result.TotalBytes)
	}
}

// A scan already in flight must reject a second one instead of letting two
// full-tree walks run concurrently — see DiskAnalysisScanner's doc comment.
func TestDiskAnalysisScannerRejectsConcurrentScan(t *testing.T) {
	jail := testJail(t)
	// A large YieldSleep keeps the first scan alive long enough for the
	// second Scan call to observe it as still running.
	scanner := NewDiskAnalysisScanner(jail, ScanOptions{YieldEveryFiles: 1, YieldSleep: 200 * time.Millisecond}, time.Minute)

	done := make(chan struct{})
	go func() {
		_, _ = scanner.Scan(context.Background())
		close(done)
	}()
	time.Sleep(20 * time.Millisecond) // let the goroutine grab the lock

	_, err := scanner.Scan(context.Background())
	if !errors.Is(err, ErrScanInProgress) {
		t.Fatalf("expected ErrScanInProgress, got %v", err)
	}
	<-done
}

// A scan that can't finish within the configured timeout must return
// context.DeadlineExceeded rather than hang the caller (and keep
// hammering the disk) indefinitely.
func TestDiskAnalysisScannerTimesOut(t *testing.T) {
	jail := testJail(t)
	scanner := NewDiskAnalysisScanner(jail, ScanOptions{YieldEveryFiles: 1, YieldSleep: 50 * time.Millisecond}, 10*time.Millisecond)

	_, err := scanner.Scan(context.Background())
	if !errors.Is(err, context.DeadlineExceeded) {
		t.Fatalf("expected context.DeadlineExceeded, got %v", err)
	}
}
