package web

import (
	"context"
	"encoding/json"
	"errors"
	"log/slog"
	"net/http"
	"time"

	"nhooyr.io/websocket"

	"github.com/tarkiman/tarkiman-os/internal/terminal"
)

// handleAPITerminalStatus is always registered (unlike the WS endpoint
// below), so the Vue app can show a clear "not enabled" state instead of
// a confusing failed connection — see docs/04-features.md §4.5.
func (s *Server) handleAPITerminalStatus(w http.ResponseWriter, r *http.Request) {
	writeJSON(w, http.StatusOK, map[string]bool{"enabled": s.deps.TerminalEnabled})
}

type terminalControlMessage struct {
	Type string `json:"type"`
	Cols uint16 `json:"cols"`
	Rows uint16 `json:"rows"`
}

// handleTerminalWS upgrades to a WebSocket and bridges it to a PTY shell
// session — see docs/07-security.md §7.6, the highest risk-surface feature
// in the app. Wire protocol, chosen so the hot path (every keystroke/output
// chunk) avoids JSON overhead:
//   - server -> client: binary frames = raw PTY output, written directly
//     into xterm.js.
//   - client -> server: binary frames = raw keystrokes, written directly
//     to the PTY.
//   - client -> server: text frames = JSON control messages, currently
//     only {"type":"resize","cols":N,"rows":N}.
//
// This handler is only ever registered when terminal.enabled=true (see
// router.go) — unlike every other handler in this package, there is no
// runtime "disabled" check inside it, matching docs/07-security.md §7.6's
// requirement that the feature be removed from routing entirely, not just
// hidden.
func (s *Server) handleTerminalWS(w http.ResponseWriter, r *http.Request) {
	sess := sessionFromContext(r.Context())

	termSession, err := s.deps.TerminalManager.NewSession()
	if err != nil {
		status := http.StatusInternalServerError
		if errors.Is(err, terminal.ErrTooManySessions) {
			status = http.StatusServiceUnavailable
		}
		writeJSONError(w, status, err.Error())
		return
	}

	// Accept with default options — no InsecureSkipVerify, no
	// OriginPatterns override — means the library performs its own strict
	// same-origin check on the Origin header and rejects the handshake
	// otherwise. This IS the CSWSH mitigation docs/07-security.md §7.6
	// calls for; it's not implemented by hand here because the library
	// already does it correctly by default.
	conn, err := websocket.Accept(w, r, nil)
	if err != nil {
		termSession.Close()
		return
	}

	slog.Info("terminal session started", "username", sess.Username, "remote", clientIP(r))
	startedAt := time.Now()

	ctx, cancel := context.WithCancel(r.Context())
	defer cancel()

	go pumpPTYToWS(ctx, cancel, conn, termSession)
	pumpWSToPTY(ctx, conn, termSession)

	termSession.Close()
	conn.Close(websocket.StatusNormalClosure, "")
	slog.Info("terminal session ended", "username", sess.Username, "duration", time.Since(startedAt))
}

func pumpPTYToWS(ctx context.Context, cancel context.CancelFunc, conn *websocket.Conn, sess *terminal.Session) {
	defer cancel()
	buf := make([]byte, 4096)
	for {
		n, err := sess.Read(buf)
		if err != nil {
			return
		}
		if err := conn.Write(ctx, websocket.MessageBinary, buf[:n]); err != nil {
			return
		}
	}
}

func pumpWSToPTY(ctx context.Context, conn *websocket.Conn, sess *terminal.Session) {
	for {
		msgType, data, err := conn.Read(ctx)
		if err != nil {
			return
		}
		switch msgType {
		case websocket.MessageBinary:
			sess.WriteInput(data)
		case websocket.MessageText:
			var msg terminalControlMessage
			if json.Unmarshal(data, &msg) == nil && msg.Type == "resize" && msg.Cols > 0 && msg.Rows > 0 {
				sess.Resize(msg.Cols, msg.Rows)
			}
		}
	}
}
