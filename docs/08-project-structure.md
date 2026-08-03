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
│   │   ├── cpu.go                # delta-based %, per-core, load average
│   │   ├── mem.go                # used = total - MemAvailable
│   │   ├── disk.go                # usage per mount + I/O throughput (whole-disk only)
│   │   ├── temp.go               # /sys/class/thermal/thermal_zone*
│   │   ├── net.go                 # per-interface throughput, exclude lo/veth/br-/docker
│   │   └── collector.go          # Collector struct + 3 ticker scheduler (Run)
│   │
│   ├── docker/                    # klien tipis ke Docker Engine API (Unix socket)
│   │   ├── client.go              # HTTP client custom DialContext ke Unix socket
│   │   ├── containers.go          # list, start/stop/restart/remove, ListWithStats
│   │   ├── stats.go               # formula CPU% resmi Docker dari 1x panggilan stats
│   │   ├── watcher.go             # cache background — lihat 05-data-storage.md kenapa perlu
│   │   ├── images.go
│   │   ├── volumes.go
│   │   ├── networks.go            # ListNetworks inspect per-network untuk ConnectedCount
│   │   └── system.go              # info daemon, /system/df, prune actions
│   │
│   ├── systemd/                   # exec systemctl/journalctl (D-Bus dicadangkan Fase 5)
│   │   ├── client.go              # exec helper + runPrivileged (sudo -n systemctl ...)
│   │   ├── units.go               # List (gabung list-units + list-unit-files), aksi
│   │   └── logs.go                # Tail via journalctl -u, on-demand
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
│   ├── store/                      # latest snapshot + ring buffer in-memory
│   │   ├── ringbuffer.go          # RingBuffer generik (fixed-capacity, overwrite)
│   │   ├── snapshot.go            # struct Snapshot (dipakai juga sebagai JSON wire format SSE)
│   │   └── store.go               # Store: atomic latest snapshot + named ring buffer
│   │
│   ├── auth/                        # login, session, CSRF, rate limit
│   │   ├── session.go              # SessionStore in-memory (create/validate/reap)
│   │   ├── credentials.go          # load/save admin credentials (bcrypt hash) + Verify
│   │   ├── csrf.go                 # Session.ValidCSRF (constant-time compare)
│   │   └── ratelimit.go            # LoginRateLimiter per-IP
│   │
│   ├── web/                          # HTTP layer (package `web`)
│   │   ├── router.go                # Server + Deps struct (lihat catatan di bawah) + ServeMux
│   │   ├── middleware.go             # requireAuth (session+CSRF), logging, recover
│   │   ├── funcs.go                  # FuncMap template bersama (formatBytes, formatPct)
│   │   ├── handlers_dashboard.go
│   │   ├── handlers_docker.go        # page + fragment + action handlers Docker (Fase 2)
│   │   ├── handlers_services.go
│   │   ├── handlers_files.go
│   │   ├── handlers_auth.go          # login/logout
│   │   ├── sse.go                    # endpoint SSE metrics stream
│   │   ├── ws_terminal.go            # endpoint WebSocket terminal (upgrade, Origin check)
│   │   └── templates.go              # template per-halaman DAN per-fragment (lihat catatan)
│   │
│   ├── config/
│   │   └── config.go                 # struct config + Default() + Load() dari YAML
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
│   │   └── fragments/                    # partial template untuk htmx swap — tanpa layout.html,
│   │       │                              # di-parse & di-render standalone (lihat catatan di bawah)
│   │       ├── docker_containers.html
│   │       ├── docker_images.html
│   │       ├── docker_volumes.html
│   │       ├── docker_networks.html
│   │       ├── docker_settings.html
│   │       ├── services_list.html
│   │       ├── services_logs.html
│   │       └── error_panel.html           # dipakai semua fragment (Docker & Service) untuk
│   │                                       # degradasi/error — nama generik sejak dipakai lintas domain
│   ├── static/
│   │   ├── css/
│   │   │   ├── app.css                   # design tokens + styling custom
│   │   │   └── vendor/uPlot.min.css
│   │   └── js/
│   │       ├── dashboard.js               # SSE listener + chart + render tabel dashboard
│   │       ├── gauge.js                    # komponen gauge/dial SVG (lihat 06-api-ui-ux.md §6.5)
│   │       ├── terminal.js                 # inisialisasi xterm.js + koneksi WebSocket
│   │       └── vendor/                    # htmx.min.js, uPlot.iife.min.js (fetched pre-built,
│   │                                       # lihat 03-tech-stack.md); codemirror/xterm.js menyusul
│   └── embed.go                            # //go:embed directive (package `assets`)
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
  di-deploy terpisah selain binary + `config.yaml`. Package-nya sengaja diberi nama `assets`
  (bukan `web`) — direktori top-level `web/` dan `internal/web/` sama-sama bernama "web", jadi
  kalau package top-level juga bernama `web`, `internal/web` yang meng-impornya akan bentrok
  nama dengan package-nya sendiri. Diimpor sebagai `assets "github.com/tarkiman/tarkiman-os/web"`.
- **Satu `*template.Template` per halaman, bukan satu set gabungan.** `templates.go` mem-parse
  `layout.html` + tiap file halaman (`login.html`, `dashboard.html`, dst) sebagai set terpisah
  per halaman, bukan satu `template.ParseFS(fs, "templates/*.html")` untuk semuanya. Alasannya:
  tiap halaman mendefinisikan block `{{define "title"}}`/`{{define "content"}}` dengan nama yang
  sama — kalau semua file di-parse jadi satu set, definisi dari file yang di-parse belakangan
  (urut alfabetis) akan **menimpa** punya file lain secara diam-diam (nama `{{define}}` bersifat
  global dalam satu set `template.Template`, bukan scoped per file). Ini sempat jadi bug nyata
  saat implementasi Fase 0 (dashboard ikut me-render konten login) sebelum diisolasi per halaman.
- File JS vendor (`web/static/js/vendor/`) adalah hasil build **sekali** di mesin developer
  (lihat `scripts/build-assets.sh`), **dicommit ke repo** — bukan di-build ulang tiap
  `go build`, dan bukan diunduh dari CDN saat runtime (device target tidak butuh akses
  internet untuk menjalankan TarkimanOS). Fase 2: htmx & uPlot diambil langsung sebagai file
  dist resmi (tidak ada langkah build sama sekali untuk keduanya, lihat
  [03-tech-stack.md](03-tech-stack.md)) — `scripts/build-assets.sh` belum benar-benar dibuat,
  baru dibutuhkan nanti saat CodeMirror 6/xterm.js masuk (butuh bundling sungguhan).
- **Fragment template di-parse & dirender berdiri sendiri, tanpa `layout.html`.** Beda dengan
  halaman penuh, file di `web/templates/fragments/` cuma berisi potongan HTML biasa (tabel,
  panel) tanpa `{{define}}` — `templateSet.renderFragment` mem-parse tiap file sendirian lewat
  `template.New(name)...ParseFS(fs, f)` lalu `ExecuteTemplate(w, name, data)`, dipakai baik
  untuk fetch awal (`hx-trigger="load"`) maupun tiap swap sesudahnya (auto-refresh atau
  setelah aksi) — satu fungsi render yang sama untuk kedua kasus.
- **`web.Deps` struct, bukan parameter positional yang terus bertambah.** `NewServer` menerima
  satu struct `Deps` (sessions, creds, store, docker client+watcher, dst) alih-alih daftar
  parameter panjang — diperkenalkan tepat saat Fase 2 menambah dependency Docker karena daftar
  positional sebelumnya (5 parameter dari Fase 0–1) sudah mulai tidak nyaman dipanggil.
