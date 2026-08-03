package fileexplorer

import (
	"context"
	"crypto/rand"
	"encoding/hex"
	"fmt"
	"os"
	"path/filepath"
	"sync"
	"time"
)

// JobQueue runs copy/move operations with bounded concurrency — see
// docs/04-features.md §4.4: multi-select copy/move must be queued, not
// fired all at once, exactly the kind of unbounded parallel I/O that made
// CasaOS hang (docs/01-overview.md).
type JobQueue struct {
	opts CopyOptions
	sem  chan struct{}

	mu   sync.Mutex
	jobs map[string]*Job
}

func NewJobQueue(maxConcurrent int, opts CopyOptions) *JobQueue {
	if maxConcurrent < 1 {
		maxConcurrent = 1
	}
	q := &JobQueue{
		opts: opts,
		sem:  make(chan struct{}, maxConcurrent),
		jobs: make(map[string]*Job),
	}
	go q.reapOldJobsLoop()
	return q
}

// Paste starts a copy (cut=false) or move (cut=true) of sources into
// destDir — all paths must already be Jail-resolved by the caller. Same-
// filesystem entries in a "cut" are renamed instantly within this call
// (no job needed for those); anything else runs in the background and is
// tracked via the returned Job.
func (q *JobQueue) Paste(sources []string, destDir string, cut bool) (*Job, error) {
	var streamSources []string
	var instantPairs [][2]string

	for _, src := range sources {
		dst := filepath.Join(destDir, filepath.Base(src))
		if cut {
			if same, err := sameFilesystem(src, dst); err == nil && same {
				instantPairs = append(instantPairs, [2]string{src, dst})
				continue
			}
		}
		streamSources = append(streamSources, src)
	}

	var totalBytes int64
	if len(streamSources) > 0 {
		var err error
		totalBytes, err = estimateSize(streamSources)
		if err != nil {
			return nil, fmt.Errorf("fileexplorer: estimate size: %w", err)
		}
		if err := checkDiskSpace(destDir, totalBytes); err != nil {
			return nil, err
		}
	}

	id, err := randomJobID()
	if err != nil {
		return nil, err
	}

	kind := JobCopy
	if cut {
		kind = JobMove
	}
	ctx, cancel := context.WithCancel(context.Background())
	job := &Job{ID: id, Kind: kind, status: StatusRunning, startedAt: time.Now(), cancel: cancel}
	job.setTotal(totalBytes)

	q.mu.Lock()
	q.jobs[id] = job
	q.mu.Unlock()

	go q.run(ctx, job, instantPairs, streamSources, destDir, cut)

	return job, nil
}

func (q *JobQueue) run(ctx context.Context, job *Job, instantPairs [][2]string, streamSources []string, destDir string, cut bool) {
	q.sem <- struct{}{}
	defer func() { <-q.sem }()

	for _, pair := range instantPairs {
		if err := os.Rename(pair[0], pair[1]); err != nil {
			job.finish(StatusFailed, err)
			return
		}
	}

	thr := newThrottle(q.opts.ThrottleBytesPerSec)
	for _, src := range streamSources {
		select {
		case <-ctx.Done():
			job.finish(StatusCancelled, nil)
			return
		default:
		}

		if err := copyTree(ctx, src, destDir, q.opts, job, thr); err != nil {
			if ctx.Err() != nil {
				job.finish(StatusCancelled, nil)
			} else {
				job.finish(StatusFailed, err)
			}
			return
		}
		if cut {
			// Move = delete source only after its copy fully succeeded —
			// never delete-then-copy, that risks data loss on failure.
			os.RemoveAll(src)
		}
	}

	job.finish(StatusDone, nil)
}

func (q *JobQueue) Get(id string) (*Job, bool) {
	q.mu.Lock()
	defer q.mu.Unlock()
	j, ok := q.jobs[id]
	return j, ok
}

// Cancel requests a running job stop. copyFileStream checks ctx.Done()
// between buffer-sized chunks, so cancellation takes effect within one
// buffer's worth of I/O, not instantly but never more than a fraction of
// a second in practice.
func (q *JobQueue) Cancel(id string) bool {
	job, ok := q.Get(id)
	if !ok {
		return false
	}
	job.mu.Lock()
	running := job.status == StatusRunning
	job.mu.Unlock()
	if !running {
		return false
	}
	job.cancel()
	return true
}

// reapOldJobsLoop drops finished jobs after a while so q.jobs doesn't grow
// unbounded on a long-running server — same reasoning as
// auth.SessionStore's reaper.
func (q *JobQueue) reapOldJobsLoop() {
	ticker := time.NewTicker(5 * time.Minute)
	defer ticker.Stop()
	for range ticker.C {
		cutoff := time.Now().Add(-30 * time.Minute)
		q.mu.Lock()
		for id, j := range q.jobs {
			j.mu.Lock()
			done := j.status != StatusRunning && j.finishedAt.Before(cutoff)
			j.mu.Unlock()
			if done {
				delete(q.jobs, id)
			}
		}
		q.mu.Unlock()
	}
}

func randomJobID() (string, error) {
	b := make([]byte, 16)
	if _, err := rand.Read(b); err != nil {
		return "", fmt.Errorf("fileexplorer: generate job id: %w", err)
	}
	return hex.EncodeToString(b), nil
}
