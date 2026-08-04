package systemd

import (
	"context"
	"encoding/json"
	"fmt"
)

type Unit struct {
	Name        string `json:"name"`
	Load        string `json:"load"`   // loaded, not-found, ...
	Active      string `json:"active"` // active, inactive, failed, activating, ...
	Sub         string `json:"sub"`    // running, exited, dead, waiting, ...
	Description string `json:"description"`
	Enabled     string `json:"enabled"` // enabled, disabled, static, masked, "" if unknown
}

type rawUnit struct {
	Unit        string `json:"unit"`
	Load        string `json:"load"`
	Active      string `json:"active"`
	Sub         string `json:"sub"`
	Description string `json:"description"`
}

type rawUnitFile struct {
	UnitFile string `json:"unit_file"`
	State    string `json:"state"`
}

// List returns every unit of the given types (e.g. "service" or
// "service,socket,timer" — see docs/04-features.md §4.3), merging in
// enabled/disabled state from list-unit-files by name.
func List(ctx context.Context, types string) ([]Unit, error) {
	unitsOut, err := runSystemctl(ctx, "list-units", "--all", "--type="+types, "--output=json", "--no-pager", "--no-legend")
	if err != nil {
		return nil, err
	}
	var rawUnits []rawUnit
	if err := json.Unmarshal(unitsOut, &rawUnits); err != nil {
		return nil, fmt.Errorf("systemd: decode list-units: %w", err)
	}

	filesOut, err := runSystemctl(ctx, "list-unit-files", "--type="+types, "--output=json", "--no-pager", "--no-legend")
	if err != nil {
		return nil, err
	}
	var rawFiles []rawUnitFile
	if err := json.Unmarshal(filesOut, &rawFiles); err != nil {
		return nil, fmt.Errorf("systemd: decode list-unit-files: %w", err)
	}
	enabledState := make(map[string]string, len(rawFiles))
	for _, f := range rawFiles {
		enabledState[f.UnitFile] = f.State
	}

	out := make([]Unit, len(rawUnits))
	for i, u := range rawUnits {
		out[i] = Unit{
			Name:        u.Unit,
			Load:        u.Load,
			Active:      u.Active,
			Sub:         u.Sub,
			Description: u.Description,
			Enabled:     enabledState[u.Unit],
		}
	}
	return out, nil
}

func Start(ctx context.Context, unit string) error {
	_, err := runPrivileged(ctx, "start", unit)
	return err
}

func Stop(ctx context.Context, unit string) error {
	_, err := runPrivileged(ctx, "stop", unit)
	return err
}

func Restart(ctx context.Context, unit string) error {
	_, err := runPrivileged(ctx, "restart", unit)
	return err
}

func Reload(ctx context.Context, unit string) error {
	_, err := runPrivileged(ctx, "reload", unit)
	return err
}
