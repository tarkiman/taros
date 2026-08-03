# 8. Struktur Proyek

Layout mengikuti konvensi umum Go project (`cmd/` + `internal/`), dipisah per domain
tanggung jawab sesuai komponen arsitektur di [02-architecture.md](02-architecture.md).

```
tarkiman-os/
├── cmd/
│   └── tarkimanos/
│       └── main.go              # entrypoint: load config, wire komponen, start server
│
├── internal/
│   ├── collector/                # baca metrics sistem dari /proc, /sys
│   │   ├── cpu.go
│   │   ├── mem.go
│   │   ├── disk.go
│   │   ├── temp.go
│   │   ├── net.go
│   │   └── collector.go          # interface & scheduler goroutine
│   │
│   ├── docker/                    # klien tipis ke Docker Engine API (Unix socket)
│   │   ├── client.go
│   │   ├── containers.go
│   │   ├── stats.go
│   │   ├── images.go
│   │   ├── volumes.go
│   │   ├── networks.go
│   │   └── system.go              # info daemon, /system/df, prune actions
│   │
│   ├── systemd/                   # klien D-Bus ke systemd
│   │   ├── client.go
│   │   └── units.go
│   │
│   ├── fileexplorer/               # operasi filesystem + validasi keamanan
│   │   ├── list.go
│   │   ├── ops.go                 # create/rename/copy/move/delete (rename cepat via os.Rename)
│   │   ├── copyjob.go             # copy/move streaming: buffer tetap, throttle, sync berkala
│   │   ├── jobqueue.go            # antrean job besar: batas konkuren, progress, cancel
│   │   ├── content.go             # baca/tulis isi file (untuk editor)
│   │   ├── archive.go             # zip on-the-fly (streaming) untuk download folder
│   │   └── safepath.go            # validasi path traversal, jail root
│   │
│   ├── terminal/                    # spawn shell dalam PTY, jembatani ke WebSocket
│   │   ├── pty.go                   # wrapper creack/pty: spawn shell, resize, kill
│   │   └── session.go               # lifecycle sesi: idle timeout, limit konkuren, audit
│   │
│   ├── store/                      # ring buffer in-memory untuk histori metrics
│   │   ├── ringbuffer.go
│   │   └── store.go
│   │
│   ├── auth/                        # login, session, CSRF, rate limit
│   │   ├── session.go
│   │   ├── password.go
│   │   ├── csrf.go
│   │   └── ratelimit.go
│   │
│   ├── web/                          # HTTP layer
│   │   ├── router.go                # setup net/http ServeMux
│   │   ├── middleware.go             # auth, logging, recover
│   │   ├── handlers_dashboard.go
│   │   ├── handlers_docker.go
│   │   ├── handlers_services.go
│   │   ├── handlers_files.go
│   │   ├── handlers_auth.go
│   │   ├── sse.go                    # endpoint SSE metrics stream
│   │   ├── ws_terminal.go            # endpoint WebSocket terminal (upgrade, Origin check)
│   │   └── templates.go              # load & render html/template (dari embed.FS)
│   │
│   ├── config/
│   │   ├── config.go                 # struct config + load YAML + env override
│   │   └── default.go
│   │
│   └── audit/
│       └── log.go                     # structured audit logging (slog)
│
├── web/                                 # aset frontend, di-embed via embed.FS
│   ├── templates/                       # html/template files
│   │   ├── layout.html
│   │   ├── dashboard.html
│   │   ├── docker.html
│   │   ├── services.html
│   │   ├── files.html
│   │   ├── editor.html
│   │   ├── login.html
│   │   ├── terminal.html                  # halaman full-screen xterm.js
│   │   └── fragments/                    # partial template untuk htmx swap
│   ├── static/
│   │   ├── css/
│   │   │   └── app.css                   # design tokens + styling custom
│   │   └── js/
│   │       ├── app.js                     # inisialisasi Alpine, SSE listener
│   │       ├── gauge.js                    # komponen gauge/dial SVG (lihat 06-api-ui-ux.md §6.5)
│   │       ├── terminal.js                 # inisialisasi xterm.js + koneksi WebSocket
│   │       └── vendor/                    # htmx, alpine, uplot, codemirror, xterm.js (built sekali)
│   └── embed.go                            # //go:embed directive
│
├── deploy/
│   ├── systemd/
│   │   └── tarkimanos.service                   # unit file systemd
│   ├── polkit/
│   │   └── 10-tarkimanos-systemd.rules            # rule polkit untuk kontrol unit tanpa root
│   └── config.example.yaml
│
├── docs/                                       # dokumen ini
│
├── scripts/
│   ├── build.sh                                # cross-compile untuk arm64
│   └── build-assets.sh                          # build sekali CodeMirror/uPlot jadi JS statis
│
├── go.mod
├── go.sum
├── Makefile
└── README.md
```

## Catatan Desain Layout

- **`internal/`** dipakai untuk semua kode implementasi (tidak diimpor project lain) —
  sesuai untuk aplikasi standalone seperti ini, tidak perlu expose `pkg/` publik.
- **Tiap domain (`collector`, `docker`, `systemd`, `fileexplorer`) punya interface kecil**
  yang di-consume oleh `web/` handlers — memudahkan testing dengan mock/fake tanpa perlu
  Docker/systemd sungguhan berjalan saat unit test.
- **`web/embed.go`** memakai `//go:embed templates static` sehingga `go build` menghasilkan
  satu binary yang membawa semua HTML/CSS/JS — tidak ada file eksternal yang harus ikut
  di-deploy terpisah selain binary + `config.yaml`.
- File JS vendor (`web/static/js/vendor/`) adalah hasil build **sekali** di mesin developer
  (lihat `scripts/build-assets.sh`), **dicommit ke repo** — bukan di-build ulang tiap
  `go build`, dan bukan diunduh dari CDN saat runtime (device target tidak butuh akses
  internet untuk menjalankan TarkimanOS).
