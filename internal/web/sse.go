package web

import (
	"encoding/json"
	"net/http"
	"strconv"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/store"
)

// handleMetricsStream pushes the latest Snapshot over Server-Sent Events
// every sseInterval. See docs/02-architecture.md "Kenapa SSE untuk metrics"
// — one-way server push, no WebSocket needed for this.
func (s *Server) handleMetricsStream(w http.ResponseWriter, r *http.Request) {
	flusher, ok := w.(http.Flusher)
	if !ok {
		http.Error(w, "streaming unsupported", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "text/event-stream")
	w.Header().Set("Cache-Control", "no-cache")
	w.Header().Set("Connection", "keep-alive")

	ticker := time.NewTicker(s.sseInterval)
	defer ticker.Stop()

	ctx := r.Context()
	for {
		select {
		case <-ctx.Done():
			return
		case <-ticker.C:
			snap := s.store.Latest()
			if snap == nil {
				continue
			}
			data, err := json.Marshal(snap)
			if err != nil {
				continue
			}
			if _, err := w.Write([]byte("data: ")); err != nil {
				return
			}
			if _, err := w.Write(data); err != nil {
				return
			}
			if _, err := w.Write([]byte("\n\n")); err != nil {
				return
			}
			flusher.Flush()
		}
	}
}

// historySeries maps the ?metric= query value to the store's internal
// series name — kept separate so the wire/API vocabulary (docs/06-api-ui-ux.md)
// doesn't have to match internal series constants one-for-one forever.
var historySeries = map[string]string{
	"cpu":       store.SeriesCPUTotalPercent,
	"mem":       store.SeriesMemUsedPercent,
	"diskRead":  store.SeriesDiskReadBytesSec,
	"diskWrite": store.SeriesDiskWriteBytesSec,
	"tempMax":   store.SeriesTempMaxCelsius,
}

func (s *Server) handleMetricsHistory(w http.ResponseWriter, r *http.Request) {
	metric := r.URL.Query().Get("metric")
	series, ok := historySeries[metric]
	if !ok {
		http.Error(w, "unknown metric: "+strconv.Quote(metric), http.StatusBadRequest)
		return
	}

	samples := s.store.History(series)
	w.Header().Set("Content-Type", "application/json")
	if err := json.NewEncoder(w).Encode(samples); err != nil {
		return
	}
}
