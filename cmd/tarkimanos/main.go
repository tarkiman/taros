// Command tarkimanos is the TarkimanOS service entrypoint. Run without
// arguments to start the web server, or `tarkimanos setup` once to create
// the admin credentials — see docs/09-deployment.md §9.2.
package main

import (
	"bufio"
	"flag"
	"fmt"
	"log/slog"
	"net/http"
	"os"
	"strings"
	"time"

	"golang.org/x/term"

	"github.com/tarkiman/tarkiman-os/internal/auth"
	"github.com/tarkiman/tarkiman-os/internal/config"
	"github.com/tarkiman/tarkiman-os/internal/web"
)

func main() {
	if len(os.Args) > 1 && os.Args[1] == "setup" {
		runSetup(os.Args[2:])
		return
	}
	runServer(os.Args[1:])
}

func runServer(args []string) {
	fs := flag.NewFlagSet("tarkimanos", flag.ExitOnError)
	configPath := fs.String("config", "./config.yaml", "path to config.yaml")
	_ = fs.Parse(args)

	cfg, err := config.Load(*configPath)
	if err != nil {
		slog.Error("load config", "err", err)
		os.Exit(1)
	}

	creds, err := auth.LoadCredentials(cfg.Auth.CredentialsFile)
	if err != nil {
		slog.Error("load credentials — run `tarkimanos setup` first", "err", err)
		os.Exit(1)
	}

	sessions := auth.NewSessionStore(time.Duration(cfg.Auth.SessionIdleTimeoutMin) * time.Minute)
	rateLimiter := auth.NewLoginRateLimiter(cfg.Auth.LoginRateLimitAttempts, time.Duration(cfg.Auth.LoginRateLimitWindowSec)*time.Second)

	srv, err := web.NewServer(sessions, creds, rateLimiter)
	if err != nil {
		slog.Error("init web server", "err", err)
		os.Exit(1)
	}

	slog.Info("tarkimanos starting", "listen", cfg.Server.Listen)
	if err := http.ListenAndServe(cfg.Server.Listen, srv.Handler()); err != nil {
		slog.Error("server stopped", "err", err)
		os.Exit(1)
	}
}

func runSetup(args []string) {
	fs := flag.NewFlagSet("tarkimanos setup", flag.ExitOnError)
	configPath := fs.String("config", "./config.yaml", "path to config.yaml")
	_ = fs.Parse(args)

	cfg, err := config.Load(*configPath)
	if err != nil {
		fmt.Fprintln(os.Stderr, "load config:", err)
		os.Exit(1)
	}

	reader := bufio.NewReader(os.Stdin)
	fmt.Print("Username admin: ")
	username, _ := reader.ReadString('\n')
	username = strings.TrimSpace(username)

	password, err := readPassword(reader, "Password: ")
	if err != nil {
		fmt.Fprintln(os.Stderr, "read password:", err)
		os.Exit(1)
	}
	confirm, err := readPassword(reader, "Ulangi password: ")
	if err != nil {
		fmt.Fprintln(os.Stderr, "read password:", err)
		os.Exit(1)
	}
	if password != confirm {
		fmt.Fprintln(os.Stderr, "password tidak sama")
		os.Exit(1)
	}
	if username == "" || password == "" {
		fmt.Fprintln(os.Stderr, "username/password tidak boleh kosong")
		os.Exit(1)
	}

	if err := auth.SaveCredentials(cfg.Auth.CredentialsFile, username, password); err != nil {
		fmt.Fprintln(os.Stderr, "save credentials:", err)
		os.Exit(1)
	}
	fmt.Println("Kredensial admin tersimpan di", cfg.Auth.CredentialsFile)
}

// readPassword hides input when run in an interactive terminal, and falls
// back to reading a line from the shared reader otherwise (piped input for
// scripted use — a fresh bufio.Reader here would drop already-buffered
// bytes read ahead by the caller's reader).
func readPassword(fallback *bufio.Reader, prompt string) (string, error) {
	fmt.Print(prompt)
	if term.IsTerminal(int(os.Stdin.Fd())) {
		b, err := term.ReadPassword(int(os.Stdin.Fd()))
		fmt.Println()
		return string(b), err
	}
	line, err := fallback.ReadString('\n')
	return strings.TrimSpace(line), err
}
