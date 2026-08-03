package collector

import (
	"log/slog"
	"os"
	"path/filepath"
	"strconv"
	"strings"
	"time"

	"github.com/tarkiman/tarkiman-os/internal/store"
)

// sampleTemps refreshes c.latestTemps from every /sys/class/thermal/thermal_zone*
// sensor (millidegree C) — see docs/04-features.md §4.1. Called on its own
// ticker; reading a handful of small sysfs files is cheap but doesn't need
// the same cadence as CPU/mem.
func (c *Collector) sampleTemps() {
	zones, err := filepath.Glob("/sys/class/thermal/thermal_zone*")
	if err != nil {
		slog.Error("collector: glob thermal zones", "err", err)
		return
	}

	var temps []store.TempSensor
	for _, zone := range zones {
		rawTemp, err := os.ReadFile(filepath.Join(zone, "temp"))
		if err != nil {
			continue
		}
		milliC, err := strconv.ParseFloat(strings.TrimSpace(string(rawTemp)), 64)
		if err != nil {
			continue
		}

		label := filepath.Base(zone)
		if rawType, err := os.ReadFile(filepath.Join(zone, "type")); err == nil {
			label = strings.TrimSpace(string(rawType))
		}

		temps = append(temps, store.TempSensor{
			Label:   label,
			Celsius: milliC / 1000,
		})
	}
	c.latestTemps = temps
	c.store.AddSample(store.SeriesTempMaxCelsius, time.Now(), maxTemp(temps))
}

// maxTemp returns the highest sensor reading, for the temp_max_celsius
// trend series — 0 if there are no sensors (e.g. running somewhere
// without exposed thermal zones).
func maxTemp(temps []store.TempSensor) float64 {
	max := 0.0
	for _, t := range temps {
		if t.Celsius > max {
			max = t.Celsius
		}
	}
	return max
}
