package store

import "time"

type Sample struct {
	Time  time.Time `json:"t"`
	Value float64   `json:"v"`
}

// RingBuffer is a fixed-capacity circular buffer of timestamped float64
// samples. Once full, appending overwrites the oldest sample — memory
// usage never grows past its initial allocation. See
// docs/05-data-storage.md for the retention/budget rationale.
type RingBuffer struct {
	samples []Sample
	next    int
	count   int
}

func NewRingBuffer(capacity int) *RingBuffer {
	return &RingBuffer{samples: make([]Sample, capacity)}
}

func (r *RingBuffer) Add(t time.Time, v float64) {
	r.samples[r.next] = Sample{Time: t, Value: v}
	r.next = (r.next + 1) % len(r.samples)
	if r.count < len(r.samples) {
		r.count++
	}
}

// Snapshot returns the buffered samples in chronological order.
func (r *RingBuffer) Snapshot() []Sample {
	out := make([]Sample, r.count)
	if r.count < len(r.samples) {
		copy(out, r.samples[:r.count])
		return out
	}
	// Full: oldest sample is at r.next (about to be overwritten next).
	copy(out, r.samples[r.next:])
	copy(out[len(r.samples)-r.next:], r.samples[:r.next])
	return out
}
