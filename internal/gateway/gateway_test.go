package gateway

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"log/slog"
	"net"
	"net/http"
	"net/http/httptest"
	"os"
	"path/filepath"
	"strings"
	"sync/atomic"
	"testing"
	"time"
)

func fakeZT(t *testing.T) ztRunner {
	return func(_ context.Context, args ...string) ([]byte, error) {
		switch args[0] {
		case "info":
			return []byte(`{"address":"abc123","online":true,"version":"1.16.2"}`), nil
		case "listnetworks":
			return []byte(`[{"nwid":"n1","name":"Rumah","status":"OK","assignedAddresses":["172.22.195.55/16"],"portDeviceName":"ztfake0"}]`), nil
		case "peers":
			return []byte(`[
				{"address":"root1","role":"PLANET","latency":80,"paths":[{"address":"1.2.3.4/9993","active":true,"preferred":true}]},
				{"address":"umma","role":"LEAF","latency":4,"paths":[{"address":"192.168.1.20/9993","active":true,"preferred":true,"expired":false}]},
				{"address":"far","role":"LEAF","latency":-1,"paths":[]}
			]`), nil
		}
		return nil, fmt.Errorf("unexpected %v", args)
	}
}

func TestSnapshot(t *testing.T) {
	var recv atomic.Uint64
	recv.Store(1_000_000)
	g2r := httptest.NewServer(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		json.NewEncoder(w).Encode(map[string]any{
			"cam1": map[string]any{
				"producers": []any{map[string]any{"id": 1, "url": "rtsp://admin:s3cret@192.168.1.14:8554/unicast", "remote_addr": "192.168.1.14:8554", "bytes_recv": recv.Load()}},
				"consumers": []any{map[string]any{"id": 2, "remote_addr": "172.22.244.135:50414", "user_agent": "go2rtc/1.9.14", "senders": []any{map[string]any{"bytes": recv.Load() / 2}}}},
			},
			"idle": map[string]any{"producers": []any{map[string]any{"id": 3, "url": "rtsp://192.168.1.30/stream1"}}, "consumers": nil},
		})
	}))
	defer g2r.Close()

	dir := t.TempDir()
	arp := filepath.Join(dir, "arp")
	os.WriteFile(arp, []byte("IP address       HW type     Flags       HW address            Mask     Device\n"+
		"192.168.1.14     0x1         0x2         E4:AA:EC:26:9A:AB     *        wlan0\n"+
		"192.168.1.99     0x1         0x0         00:00:00:00:00:00     *        wlan0\n"+
		"172.17.0.2       0x1         0x2         02:42:ac:11:00:02     *        docker0\n"), 0o644)
	dev := filepath.Join(dir, "dev")
	writeDev := func(tx uint64) {
		os.WriteFile(dev, []byte(fmt.Sprintf("Inter-|   Receive  |  Transmit\n face |bytes packets errs drop fifo frame compressed multicast|bytes\n"+
			"ztfake0: 1000 0 0 0 0 0 0 0 %d 0 0 0 0 0 0 0\n", tx)), 0o644)
	}
	writeDev(0)

	ln, _ := net.Listen("tcp", "127.0.0.1:0")
	defer ln.Close()
	go func() {
		for {
			c, err := ln.Accept()
			if err != nil {
				return
			}
			c.Close()
		}
	}()

	m := New(Config{Go2rtcURL: g2r.URL, Central: []Target{{Label: "NVR", Addr: ln.Addr().String()}, {Label: "mati", Addr: "127.0.0.1:1"}}, PollSeconds: 10},
		slog.New(slog.NewTextHandler(io.Discard, nil)))
	m.zt = fakeZT(t)
	m.arpPath, m.devPath = arp, dev
	m.routePth = filepath.Join(dir, "noroute") // no default route file → LAN iface from ARP filter is ""
	ctx := context.Background()

	m.Poll(ctx)
	m.prevAt = m.prevAt.Add(-10 * time.Second) // pretend 10 s passed
	recv.Store(1_000_000 + 500_000)            // 500 kB in 10 s = 400 kbps
	writeDev(625_000)                          // 625 kB in 10 s = 500 kbps
	m.Poll(ctx)
	s := m.Snapshot()

	if !s.ZeroTier.Available || s.ZeroTier.Peers.Direct != 1 || s.ZeroTier.Peers.Relayed != 1 || s.ZeroTier.Networks[0].Interface != "ztfake0" {
		t.Fatalf("zerotier = %+v", s.ZeroTier)
	}
	if !s.Central[0].OK || s.Central[1].OK || s.Central[1].Error == "" {
		t.Fatalf("central = %+v", s.Central)
	}
	cam := s.Relays.Streams[0]
	if cam.Name != "cam1" || !cam.Active || cam.InKbps < 390 || cam.InKbps > 410 || cam.Consumers[0].OutKbps < 190 {
		t.Fatalf("relay = %+v", cam)
	}
	if s.Relays.Streams[1].Active {
		t.Fatal("idle stream reported active")
	}
	raw, _ := json.Marshal(s)
	if strings.Contains(string(raw), "s3cret") || strings.Contains(string(raw), "admin:") {
		t.Fatalf("credentials leaked: %s", raw)
	}
	if cam.Sources[0] != "rtsp://192.168.1.14:8554" {
		t.Fatalf("source = %q", cam.Sources[0])
	}
	if s.Uplink.TxKbps < 490 || s.Uplink.TxKbps > 510 || len(s.Uplink.History) != 1 {
		t.Fatalf("uplink = %+v", s.Uplink)
	}
	var cam1, ghost bool
	for _, d := range s.LAN.Devices {
		if d.IP == "192.168.1.14" && d.MAC == "e4:aa:ec:26:9a:ab" && d.State == "reachable" && d.Relayed[0] == "cam1" {
			cam1 = true
		}
		if d.IP == "192.168.1.30" && d.State == "unknown" {
			ghost = true // relayed but not in ARP yet
		}
	}
	if !cam1 || !ghost {
		t.Fatalf("lan = %+v", s.LAN.Devices)
	}
}

func TestZeroTierUnavailable(t *testing.T) {
	m := New(Config{}, slog.New(slog.NewTextHandler(io.Discard, nil)))
	m.zt = func(context.Context, ...string) ([]byte, error) { return nil, errNoZT }
	if zt := m.readZeroTier(context.Background()); zt.Available || zt.Reason != "not_installed" {
		t.Fatalf("zt = %+v", zt)
	}
}
