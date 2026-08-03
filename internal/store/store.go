// Package store holds the latest metrics Snapshot plus a short in-memory
// history for a handful of headline trend metrics — no database, see
// docs/05-data-storage.md.
package store

import (
	"sync"
	"sync/atomic"
	"time"
)

// History series names — the "raw, ~15 minutes" ring buffers from
// docs/05-data-storage.md. Only metrics actually charted on the dashboard
// get one; everything else (per-core CPU, per-mount disk, per-interface
// net, per-sensor temp) is latest-value-only via Latest(), which keeps the
// buffer count small. The 24h downsampled tier described in the docs is
// deferred until a view actually needs it — see that file for the note.
const (
	SeriesCPUTotalPercent   = "cpu_total_percent"
	SeriesMemUsedPercent    = "mem_used_percent"
	SeriesDiskReadBytesSec  = "disk_read_bytes_sec"
	SeriesDiskWriteBytesSec = "disk_write_bytes_sec"
	SeriesTempMaxCelsius    = "temp_max_celsius"
)

type Store struct {
	latest atomic.Pointer[Snapshot]

	mu      sync.Mutex
	buffers map[string]*RingBuffer
}

// New builds a Store with a ring buffer per series, sized to hold roughly
// retention/sampleInterval samples.
func New(retention time.Duration, sampleIntervals map[string]time.Duration) *Store {
	s := &Store{buffers: make(map[string]*RingBuffer)}
	for name, interval := range sampleIntervals {
		capacity := int(retention / interval)
		if capacity < 1 {
			capacity = 1
		}
		s.buffers[name] = NewRingBuffer(capacity)
	}
	return s
}

func (s *Store) Set(snap *Snapshot) {
	s.latest.Store(snap)
}

func (s *Store) Latest() *Snapshot {
	return s.latest.Load()
}

// AddSample appends a value to the named series' ring buffer. Series not
// passed to New are silently ignored (no history kept for them).
func (s *Store) AddSample(series string, t time.Time, v float64) {
	s.mu.Lock()
	defer s.mu.Unlock()
	if buf, ok := s.buffers[series]; ok {
		buf.Add(t, v)
	}
}

func (s *Store) History(series string) []Sample {
	s.mu.Lock()
	defer s.mu.Unlock()
	buf, ok := s.buffers[series]
	if !ok {
		return nil
	}
	return buf.Snapshot()
}
