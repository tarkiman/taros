//go:build wifie2e

package wifi

// Test-only: see extraIPv4 in connect.go. Never compiled into a normal build.
func init() { extraIPv4 = "never-default=true\nignore-auto-dns=true\n" }
