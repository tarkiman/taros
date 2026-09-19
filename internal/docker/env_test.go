package docker

import "testing"

func TestIsSecret(t *testing.T) {
	secret := []struct{ k, v string }{
		{"DB_PASSWORD", "x"}, {"MYSQL_ROOT_PASSWORD", "x"}, {"JWT_SECRET", "x"},
		{"API_KEY", "x"}, {"aws_access_key_id", "x"}, {"DISCORD_TOKEN", "x"},
		{"SECRET_KEY_BASE", "x"}, {"KEY", "x"}, {"SESSION_KEY", "x"},
		{"DATABASE_URL", "postgres://user:hunter2@db:5432/app"},
		{"BROKER", "amqp://guest:guest@rabbit:5672/"},
		{"SMTP_AUTH_USER", "x"},
	}
	for _, c := range secret {
		if !IsSecret(c.k, c.v) {
			t.Errorf("IsSecret(%q, %q) = false, want true", c.k, c.v)
		}
	}
	plain := []struct{ k, v string }{
		{"PATH", "/usr/bin"}, {"TZ", "Asia/Jakarta"}, {"NODE_ENV", "production"},
		{"PORT", "8080"}, {"HOSTNAME", "abc"}, {"LOG_LEVEL", "info"},
		{"REDIS_URL", "redis://redis:6379"}, {"KEYBOARD_LAYOUT", "us"},
	}
	for _, c := range plain {
		if IsSecret(c.k, c.v) {
			t.Errorf("IsSecret(%q, %q) = true, want false", c.k, c.v)
		}
	}
}
