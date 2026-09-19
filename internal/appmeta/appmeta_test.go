package appmeta

import (
	"path/filepath"
	"testing"
)

const tinyPNG = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="

func TestSetRoundTripAndRemove(t *testing.T) {
	path := filepath.Join(t.TempDir(), "apps.yaml")
	s := New(path)

	if _, err := s.Set("meet", tinyPNG, "https://meet.example.com"); err != nil {
		t.Fatal(err)
	}
	reloaded, err := Load(path)
	if err != nil {
		t.Fatal(err)
	}
	got := reloaded.All()["meet"]
	if got.URL != "https://meet.example.com" || got.Icon == "" {
		t.Fatalf("reload lost data: %+v", got)
	}

	if _, err := s.Set("meet", "", ""); err != nil {
		t.Fatal(err)
	}
	if len(s.Projects()) != 0 {
		t.Fatalf("empty icon+url should delete the entry, got %v", s.Projects())
	}
}

func TestSetRejectsBadInput(t *testing.T) {
	s := New(filepath.Join(t.TempDir(), "apps.yaml"))
	cases := []struct{ name, project, icon, url string }{
		{"empty project", " ", "", "https://x.io"},
		{"javascript url", "a", "", "javascript:alert(1)"},
		{"bad icon", "a", "not-an-image", ""},
	}
	for _, c := range cases {
		_, err := s.Set(c.project, c.icon, c.url)
		if err == nil {
			t.Errorf("%s: expected error", c.name)
			continue
		}
		if _, _, ok := CodeAndParams(err); !ok {
			t.Errorf("%s: error %v carries no translatable code", c.name, err)
		}
	}
	if len(s.Projects()) != 0 {
		t.Error("rejected input must not be stored")
	}
}
