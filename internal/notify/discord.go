package notify

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"time"
)

// Discord embed colors (decimal, not hex string — that's the format
// Discord's webhook API expects).
const (
	colorAlert    = 0xE74C3C // red
	colorRecovery = 0x2ECC71 // green
	colorInfo     = 0x5865F2 // Discord blurple, used for the test message
)

type discordEmbed struct {
	Title       string              `json:"title"`
	Description string              `json:"description,omitempty"`
	Color       int                 `json:"color"`
	Fields      []discordEmbedField `json:"fields,omitempty"`
	Footer      *discordEmbedFooter `json:"footer,omitempty"`
	Timestamp   string              `json:"timestamp"`
}

type discordEmbedField struct {
	Name   string `json:"name"`
	Value  string `json:"value"`
	Inline bool   `json:"inline,omitempty"`
}

type discordEmbedFooter struct {
	Text string `json:"text"`
}

type discordPayload struct {
	Embeds []discordEmbed `json:"embeds"`
}

var httpClient = &http.Client{Timeout: 8 * time.Second}

// sendWebhook posts a single embed to the given Discord webhook URL. The
// URL itself is never included in the returned error or logged anywhere
// in this package — see docs/07-security.md — callers must take the same
// care (never pass it to slog).
func sendWebhook(ctx context.Context, url string, embed discordEmbed) error {
	embed.Timestamp = time.Now().UTC().Format(time.RFC3339)
	body, err := json.Marshal(discordPayload{Embeds: []discordEmbed{embed}})
	if err != nil {
		return fmt.Errorf("notify: marshal payload: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, url, bytes.NewReader(body))
	if err != nil {
		return fmt.Errorf("notify: build request: %w", err)
	}
	req.Header.Set("Content-Type", "application/json")

	resp, err := httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("notify: kirim webhook gagal: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode < 200 || resp.StatusCode >= 300 {
		respBody, _ := io.ReadAll(io.LimitReader(resp.Body, 512))
		return fmt.Errorf("notify: discord membalas status %d: %s", resp.StatusCode, string(respBody))
	}
	return nil
}

// SendTest posts the "Kirim Test" message from the Settings page to
// webhookURL — used by internal/web/handlers_notify.go's test-send
// endpoint so a user can verify a webhook works before saving it.
func SendTest(ctx context.Context, webhookURL string) error {
	return sendWebhook(ctx, webhookURL, testEmbed())
}

func footer() *discordEmbedFooter {
	host, err := os.Hostname()
	if err != nil || host == "" {
		return &discordEmbedFooter{Text: "TarOS"}
	}
	return &discordEmbedFooter{Text: "TarOS · " + host}
}

// alertEmbed builds the "metric crossed threshold" embed.
func alertEmbed(metricLabel string, current, threshold float64, unit string, duration time.Duration) discordEmbed {
	return discordEmbed{
		Title:       "🔴 " + metricLabel + " Tinggi",
		Description: fmt.Sprintf("%s sudah di atas %g%s selama lebih dari %s.", metricLabel, threshold, unit, formatDuration(duration)),
		Color:       colorAlert,
		Fields: []discordEmbedField{
			{Name: "Nilai saat ini", Value: fmt.Sprintf("%.1f%s", current, unit), Inline: true},
			{Name: "Threshold", Value: fmt.Sprintf("%g%s", threshold, unit), Inline: true},
			{Name: "Bertahan selama", Value: formatDuration(duration), Inline: true},
		},
		Footer: footer(),
	}
}

// recoveryEmbed builds the "metric back to normal" embed.
func recoveryEmbed(metricLabel string, current, threshold float64, unit string) discordEmbed {
	return discordEmbed{
		Title:       "✅ " + metricLabel + " Kembali Normal",
		Description: fmt.Sprintf("%s sudah turun di bawah %g%s.", metricLabel, threshold, unit),
		Color:       colorRecovery,
		Fields: []discordEmbedField{
			{Name: "Nilai saat ini", Value: fmt.Sprintf("%.1f%s", current, unit), Inline: true},
			{Name: "Threshold", Value: fmt.Sprintf("%g%s", threshold, unit), Inline: true},
		},
		Footer: footer(),
	}
}

// testEmbed builds the "Kirim Test" message from the Settings page.
func testEmbed() discordEmbed {
	return discordEmbed{
		Title:       "🔔 Test Notifikasi TarOS",
		Description: "Kalau kamu melihat pesan ini, webhook Discord sudah terhubung dengan benar.",
		Color:       colorInfo,
		Footer:      footer(),
	}
}

func formatDuration(d time.Duration) string {
	m := int(d.Minutes())
	if m < 1 {
		return "kurang dari 1 menit"
	}
	if m == 1 {
		return "1 menit"
	}
	return fmt.Sprintf("%d menit", m)
}
