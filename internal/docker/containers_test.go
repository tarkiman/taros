package docker

import "testing"

func TestParseHealth(t *testing.T) {
	cases := map[string]string{
		"Up 2 hours (healthy)":            "healthy",
		"Up 1 hour (unhealthy)":           "unhealthy",
		"Up 5 seconds (health: starting)": "starting",
		"Up 3 days":                       "",
		"Exited (0) 2 weeks ago":          "",
		"Restarting (1) 4 seconds ago":    "",
		"Up 2 hours (Paused)":             "",
	}
	for in, want := range cases {
		if got := parseHealth(in); got != want {
			t.Errorf("parseHealth(%q) = %q, want %q", in, got, want)
		}
	}
}
