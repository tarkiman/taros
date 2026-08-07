package fileexplorer

import (
	"context"
	"sync"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
)

type JobStatus string

const (
	StatusRunning   JobStatus = "running"
	StatusDone      JobStatus = "done"
	StatusFailed    JobStatus = "failed"
	StatusCancelled JobStatus = "cancelled"
)

type JobKind string

const (
	JobCopy JobKind = "copy" // paste after "copy"
	JobMove JobKind = "move" // paste after "cut" — same-fs entries are renamed instantly
	// before ever becoming part of a job; only cross-filesystem entries in a
	// cut/paste actually stream through here.
)

// Job tracks one copy/move operation's progress — see
// docs/04-features.md §4.4 "Keandalan Operasi File Besar/Banyak". Progress
// fields are updated from the worker goroutine and read from HTTP
// handlers concurrently, so every access goes through the mutex.
type Job struct {
	ID   string
	Kind JobKind

	mu          sync.Mutex
	status      JobStatus
	totalBytes  int64
	copiedBytes int64
	currentFile string
	err         string
	startedAt   time.Time
	finishedAt  time.Time

	cancel context.CancelFunc
}

type JobSnapshot struct {
	ID          string    `json:"id"`
	Kind        JobKind   `json:"kind"`
	Status      JobStatus `json:"status"`
	TotalBytes  int64     `json:"totalBytes"`
	CopiedBytes int64     `json:"copiedBytes"`
	PercentDone float64   `json:"percentDone"`
	CurrentFile string    `json:"currentFile"`
	Error       string    `json:"error,omitempty"`
	// ErrorCode/ErrorParams mirror internal/web's apiErrorBody shape (see
	// its doc comment) even though a job's progress is streamed over SSE,
	// not a plain JSON error response — same "code the frontend can
	// translate, Error stays as a fallback" design. Always apierr.JobFailed
	// when set (the only code this package's jobs report) — every copy/
	// move failure here is a filesystem/OS-level error with no further
	// classification worth exposing; the specific detail lives in Error
	// (and ErrorParams["detail"]) either way.
	ErrorCode   string         `json:"errorCode,omitempty"`
	ErrorParams map[string]any `json:"errorParams,omitempty"`
	BytesPerSec float64        `json:"bytesPerSec"`
}

func (j *Job) Snapshot() JobSnapshot {
	j.mu.Lock()
	defer j.mu.Unlock()

	s := JobSnapshot{
		ID:          j.ID,
		Kind:        j.Kind,
		Status:      j.status,
		TotalBytes:  j.totalBytes,
		CopiedBytes: j.copiedBytes,
		CurrentFile: j.currentFile,
		Error:       j.err,
	}
	if j.err != "" {
		s.ErrorCode = apierr.JobFailed
		s.ErrorParams = map[string]any{"detail": j.err}
	}
	if j.totalBytes > 0 {
		s.PercentDone = float64(j.copiedBytes) / float64(j.totalBytes) * 100
	}
	elapsed := time.Since(j.startedAt).Seconds()
	if !j.finishedAt.IsZero() {
		elapsed = j.finishedAt.Sub(j.startedAt).Seconds()
	}
	if elapsed > 0 {
		s.BytesPerSec = float64(j.copiedBytes) / elapsed
	}
	return s
}

func (j *Job) setTotal(n int64) {
	j.mu.Lock()
	j.totalBytes = n
	j.mu.Unlock()
}

func (j *Job) addCopied(n int64) {
	j.mu.Lock()
	j.copiedBytes += n
	j.mu.Unlock()
}

func (j *Job) setCurrentFile(name string) {
	j.mu.Lock()
	j.currentFile = name
	j.mu.Unlock()
}

func (j *Job) finish(status JobStatus, err error) {
	j.mu.Lock()
	j.status = status
	if err != nil {
		j.err = err.Error()
	}
	j.finishedAt = time.Now()
	j.mu.Unlock()
}
