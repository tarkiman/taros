package web

import (
	"context"
	"encoding/json"
	"net/http"
	"time"

	"github.com/tarkiman/taros/internal/apierr"
	"github.com/tarkiman/taros/internal/notify"
)

func (s *Server) handleNotifyGet(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, s.deps.Notify.Get())
}

func (s *Server) handleNotifyUpdate(w http.ResponseWriter, r *http.Request) {
	var req notify.Settings
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}
	settings, err := s.deps.Notify.Update(req)
	if err != nil {
		status, code, params := notifyErrResponse(err)
		writeJSONError(w, status, code, err.Error(), params)
		return
	}
	writeJSON(w, http.StatusOK, settings)
}

type notifyTestRequest struct {
	WebhookURL string `json:"webhookUrl"`
}

// handleNotifyTest sends a one-off test embed — either to the URL in the
// request body (letting a user verify an edit before clicking Save) or,
// if that's empty, to the already-saved webhook.
func (s *Server) handleNotifyTest(w http.ResponseWriter, r *http.Request) {
	var req notifyTestRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		writeJSONError(w, http.StatusBadRequest, apierr.InvalidRequest, "body tidak valid", nil)
		return
	}

	webhookURL := req.WebhookURL
	if webhookURL == "" {
		webhookURL = s.deps.Notify.Get().WebhookURL
	}
	if webhookURL == "" {
		writeJSONError(w, http.StatusBadRequest, apierr.NotifyWebhookRequired, "URL webhook Discord wajib diisi", nil)
		return
	}
	if !notify.ValidWebhookURL(webhookURL) {
		writeJSONError(w, http.StatusBadRequest, apierr.NotifyWebhookInvalid, "URL webhook tidak valid — harus URL webhook Discord asli (https://discord.com/api/webhooks/...)", nil)
		return
	}

	ctx, cancel := context.WithTimeout(r.Context(), 8*time.Second)
	defer cancel()
	if err := notify.SendTest(ctx, webhookURL); err != nil {
		// err never contains the webhook URL itself — see internal/notify's
		// sendWebhook doc comment — safe to pass straight through as the
		// detail param.
		writeJSONError(w, http.StatusBadGateway, apierr.NotifyTestFailed, err.Error(), map[string]any{"detail": err.Error()})
		return
	}
	writeJSON(w, http.StatusOK, map[string]any{"sent": true})
}

// notifyErrResponse maps a notify.Store error to the right HTTP status
// plus a translatable code/params pair — same pattern as
// handlers_quicklinks.go's quickLinksErrResponse.
func notifyErrResponse(err error) (status int, code string, params map[string]any) {
	if notify.IsInvalid(err) {
		c, p, _ := notify.CodeAndParams(err)
		return http.StatusBadRequest, c, p
	}
	return http.StatusInternalServerError, apierr.NotifySaveFailed, map[string]any{"detail": err.Error()}
}
