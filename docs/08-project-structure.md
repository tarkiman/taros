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
│   │   ├── safepath.go             # Jail: validasi traversal, symlink escape, blocklist —
│   │   │                           # dibangun & diuji duluan (Fase 3a), sebelum apa pun lain
│   │   │                           # di package ini boleh menyentuh filesystem
│   │   ├── list.go                # listing + metadata (owner/group via cache lookup)
│   │   ├── ops.go                 # mkdir/create/rename/delete (rename via os.Rename)
│   │   ├── job.go                 # Job/JobSnapshot: progress state, mutex-protected
│   │   ├── copy.go                # streaming copy: buffer tetap, throttle, sync berkala,
│   │   │                          # cek ruang disk, deteksi same-filesystem (device ID)
│   │   ├── jobqueue.go            # antrean job: batas konkuren (semaphore), cancel via
│   │   │                          # context, reaper job lama (pola sama seperti SessionStore)
│   │   ├── archive.go             # zip on-the-fly (streaming, archive/zip) untuk download folder
│   │   └── content.go             # baca/tulis isi file: deteksi biner (byte null), batas
│   │                              # 2MB, save atomik (temp+rename), deteksi konflik via mtime
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
│   │   ├── session.go              # SessionStore in-memory (create/validate/reap) +
│   │   │                           # Session.{Set,Get,Clear}Clipboard (file explorer copy/cut)
│   │   ├── credentials.go          # load/save admin credentials (bcrypt hash) + Verify
│   │   ├── csrf.go                 # Session.ValidCSRF (constant-time compare)
│   │   └── ratelimit.go            # LoginRateLimiter per-IP
│   │
│   ├── web/                          # HTTP layer (package `web`) — JSON API murni sekarang,
│   │   │                             # tidak ada lagi rendering HTML apa pun di sini (lihat
│   │   │                             # docs/03-tech-stack.md, migrasi Vue selesai total)
│   │   ├── router.go                # Server + Deps struct (lihat catatan di bawah) + ServeMux
│   │   ├── middleware.go             # requireAuth (session+CSRF), logging, recover
│   │   ├── spa.go                    # serveSPA: serve shell Vue (dist/index.html) + /assets/*
│   │   ├── handlers_auth.go          # login/logout/session, semuanya JSON
│   │   ├── handlers_docker.go        # JSON API Docker (Fase 2, JSON-kan di migrasi Vue)
│   │   ├── handlers_services.go      # JSON API systemd
│   │   ├── handlers_files.go         # JSON API file explorer: browse, mkdir/create/rename/
│   │   │                            # delete (3a), copy/cut/paste + upload + zip-download +
│   │   │                            # progress SSE + cancel (3b)
│   │   ├── handlers_editor.go        # JSON API isi file untuk editor (GET/PUT content)
│   │   ├── sse.go                    # endpoint SSE metrics stream
│   │   └── ws_terminal.go            # [belum dibuat] endpoint WebSocket terminal (Fase 4)
│   │
│   ├── config/
│   │   └── config.go                 # struct config + Default() + Load() dari YAML
│   │
│   └── audit/
│       └── log.go                     # structured audit logging (slog)
│
├── web/                                 # SATU-SATUNYA aset frontend sekarang — Vue 3 SPA,
│   │                                    # di-embed via embed.FS. `templates/` dan `static/`
│   │                                    # (html/template + htmx + CSS/JS tangan) sudah dihapus
│   │                                    # total — lihat docs/03-tech-stack.md, migrasi Vue
│   │                                    # selesai di semua halaman termasuk Editor
│   ├── frontend/
│   │   ├── src/
│   │   │   ├── views/                   # LoginView.vue, DashboardView.vue, DockerView.vue,
│   │   │   │                           # ServiceView.vue, FilesView.vue, EditorView.vue —
│   │   │   │                           # satu per route
│   │   │   ├── layouts/AppShell.vue      # sidebar + topbar, dipakai halaman ber-auth
│   │   │   ├── components/charts/        # GaugeChart.vue, LineChart.vue (wrapper ECharts)
│   │   │   ├── editor/codemirror.ts      # setup CodeMirror 6 (bahasa, linter, tema) — port
│   │   │   │                            # dari scripts/codemirror-build/ (dihapus), sekarang
│   │   │   │                            # ES module biasa yang diimpor EditorView.vue,
│   │   │   │                            # bukan window global dari bundle esbuild terpisah
│   │   │   ├── composables/              # useMetricsStream.ts (SSE), usePrefersDark.ts
│   │   │   ├── stores/auth.ts            # pinia — authenticated/username, set CSRF token
│   │   │   ├── api/                      # client.ts (fetch wrapper), metrics.ts, files.ts,
│   │   │   │                            # content.ts, docker.ts, service.ts
│   │   │   ├── router/index.ts           # vue-router — semua halaman
│   │   │   ├── charts/register.ts        # registrasi ECharts tree-shaken (core + GaugeChart
│   │   │   │                             # + LineChart + komponen grid/tooltip/dst saja)
│   │   │   ├── theme.ts                  # Naive UI theme overrides, mirror tokens.css
│   │   │   ├── style/tokens.css          # design tokens CSS custom properties
│   │   │   └── types/                    # metrics.ts, docker.ts, service.ts, files.ts,
│   │   │                                  # content.ts — mirror json tag Go masing-masing
│   │   ├── dist/                        # HASIL BUILD (`npm run build`), di-commit, di-embed
│   │   │                                # via web/embed.go `SPA` — device target tidak pernah
│   │   │                                # menjalankan Vite/npm
│   │   └── package.json / package-lock.json
│   └── embed.go                            # //go:embed all:frontend/dist (package `assets`)
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
├── scripts/                                     # [belum ada isinya] build.sh (cross-compile
│                                                 # arm64) direncanakan tapi belum dibuat.
│                                                 # scripts/codemirror-build/ yang tadinya di
│                                                 # sini sudah dihapus — CodeMirror 6 sekarang
│                                                 # dependency npm biasa di web/frontend/,
│                                                 # tidak butuh pipeline esbuild terpisah lagi
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
- **`web/embed.go`** memakai `//go:embed all:frontend/dist` (var `SPA`) sehingga `go build`
  menghasilkan satu binary yang membawa seluruh SPA Vue — tidak ada file eksternal yang harus
  ikut di-deploy terpisah selain binary + `config.yaml`. Package-nya sengaja diberi nama
  `assets` (bukan `web`) — direktori top-level `web/` dan `internal/web/` sama-sama bernama
  "web", jadi kalau package top-level juga bernama `web`, `internal/web` yang meng-impornya
  akan bentrok nama dengan package-nya sendiri. Diimpor sebagai
  `assets "github.com/tarkiman/tarkiman-os/web"`. `internal/web/spa.go` mem-`fs.Sub` embed
  `SPA` ke `frontend/dist` supaya path-nya cocok dengan yang direferensikan `index.html`
  hasil build Vite (`/assets/...`). **Riwayat**: sebelum migrasi Vue selesai total, package
  ini juga meng-embed `templates/` (html/template) & `static/` (CSS/JS tangan) lewat var
  `Templates`/`Static` terpisah — keduanya dihapus di PR migrasi Editor (halaman terakhir),
  bersamaan dengan `internal/web/templates.go`, `funcs.go`, `web/templates/`, `web/static/`,
  dan route `GET /static/` — tidak ada yang menggunakannya lagi begitu Editor pindah ke Vue.
  `web.NewServer` juga jadi lebih sederhana (tidak return error lagi, karena satu-satunya
  sumber error-nya — parsing template — sudah tidak ada).
- **Fitur JS berat (editor) divalidasi dengan headless browser, bukan cuma testing backend.**
  `go build`/`npm run build` sama-sama sukses tanpa keluhan untuk bug CodeMirror yang bikin
  editor gagal mount total (lihat [04-features.md](04-features.md) §4.4 "Catatan Implementasi
  Fase 3c") — error itu cuma muncul saat extension benar-benar dievaluasi oleh CodeMirror di
  runtime browser. Puppeteer + Chromium (sudah terpasang di mesin dev) dipakai untuk buka
  halaman sungguhan, cek elemen DOM ter-render, warna token syntax highlighting sungguhan
  (`getComputedStyle`), dan interaksi (ketik, Ctrl+S) — bukan cuma "server merespons 200".
  Pola yang sama juga menemukan bug nyata di Vue port-nya (`nextTick()` yang terlewat sebelum
  akses ref DOM — lihat [10-roadmap.md](10-roadmap.md) Fase UI/UX §E) — headless-browser
  testing tetap jadi standar untuk fitur JS-berat apa pun, bukan cuma yang berhubungan dengan
  CodeMirror secara spesifik.
- **`web.Deps` struct, bukan parameter positional yang terus bertambah.** `NewServer` menerima
  satu struct `Deps` (sessions, creds, store, docker client+watcher, dst) alih-alih daftar
  parameter panjang — diperkenalkan tepat saat Fase 2 menambah dependency Docker karena daftar
  positional sebelumnya (5 parameter dari Fase 0–1) sudah mulai tidak nyaman dipanggil.
- **Breadcrumb & path gabungan pakai `filepath.Join`/`filepath.Dir`, bukan `printf "%s/%s"`.**
  Ditemukan langsung saat testing manual dengan `rootDir: "/"`: penggabungan string naif
  menghasilkan path `"//home"` (dua slash) — secara fungsional tetap jalan (`filepath.Clean`
  di `Jail.Resolve` menormalkannya), tapi tampil salah di URL/link. Sisi Go (`breadcrumbs()` di
  `handlers_files.go`) tetap pakai `filepath.Join`; sisi Vue (`FilesView.vue`) punya masalah
  serupa tapi versinya sendiri — lihat `resolvedPath` di [10-roadmap.md](10-roadmap.md)
  Fase UI/UX §D untuk bug path-gabungan yang ditemukan di sana.
- **Entry yang masuk blocklist difilter dari listing, bukan cuma ditolak saat diklik.**
  Ditemukan saat testing terhadap `/etc` sungguhan: `/etc/shadow` muncul di tabel dengan
  tombol Unduh/Rename/Hapus yang "terlihat" berfungsi tapi akan gagal 403 kalau diklik —
  aman, tapi membingungkan. `handleAPIFilesList` (dulu `handleFilesListFragment`, di-JSON-kan
  saat migrasi Vue) menyaring tiap entry lewat
  `Jail.Resolve` sebelum dikirim ke template, jadi entry terlarang tidak pernah muncul sama
  sekali (sekaligus menutup celah symlink-escape yang sama untuk isi listing, bukan cuma
  untuk aksi).
- **Clipboard file explorer hidup di `auth.Session`, bukan struct terpisah.** Copy/cut cuma
  perlu diingat "punya siapa" dan "kadaluarsa kapan" — dua hal yang session sudah urus.
  Menambah `map[token]Clipboard` sendiri di `internal/web` akan mengulang logika yang sama
  persis (least-privilege terhadap siapa boleh baca/tulis, lifecycle mengikuti login) tanpa
  manfaat nyata — jadi cukup jadi field pada `Session` dengan mutex sendiri (`clipMu`, terpisah
  dari mutex `SessionStore`) supaya operasi clipboard tidak perlu mengunci seluruh session table.
- **Job queue file explorer memakai pola yang sama dengan `docker.Watcher`.** Sama-sama:
  goroutine background + state yang di-snapshot dengan mutex + hasil dibaca lewat cache/
  polling, bukan dihitung ulang tiap request. Bedanya niatnya terbalik — `docker.Watcher`
  ada supaya request TIDAK menunggu operasi lambat (baca cache instan), job queue file
  explorer ada supaya operasi lambat (copy besar) TIDAK memblokir request lain sementara
  progressnya tetap bisa dipantau. Pola implementasinya (mutex-protected snapshot) kebetulan
  identik meski alasannya berbeda.
- **Diverifikasi dengan disk sungguhan, bukan `/tmp` (tmpfs/RAM).** Uji "operasi file besar
  tidak boleh menghang-kan sistem" ([04-features.md](04-features.md) §4.4) butuh storage
  yang benar-benar melakukan I/O disk — `/tmp` di banyak distro Linux (termasuk mesin dev
  proyek ini) adalah tmpfs (RAM-backed), yang tidak akan pernah menunjukkan tekanan
  dirty-page sama sekali walau filenya besar. Test data ditaruh di partisi disk sungguhan
  (`/home`), dengan throughput dibatasi (`copyThrottleMBps`) untuk mendekati kondisi storage
  lambat STB, supaya hasil ujinya bermakna.
