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
│   ├── web/                          # HTTP layer (package `web`)
│   │   ├── router.go                # Server + Deps struct (lihat catatan di bawah) + ServeMux
│   │   ├── middleware.go             # requireAuth (session+CSRF), logging, recover
│   │   ├── funcs.go                  # FuncMap template bersama (formatBytes, formatPct)
│   │   ├── handlers_dashboard.go
│   │   ├── handlers_docker.go        # page + fragment + action handlers Docker (Fase 2)
│   │   ├── handlers_services.go
│   │   ├── handlers_files.go         # page + fragment handlers file explorer: browse, mkdir/
│   │   │                             # create/rename/delete (3a), copy/cut/paste + upload +
│   │   │                             # zip-download + progress SSE + cancel (3b)
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
│   ├── frontend/                        # Vue 3 SPA (halaman termigrasi) — lihat
│   │   │                                # 03-tech-stack.md "Kenapa pivot ke Vue?"
│   │   ├── src/
│   │   │   ├── views/                   # LoginView.vue, DashboardView.vue, DockerView.vue,
│   │   │   │                           # ServiceView.vue — satu per route
│   │   │   ├── layouts/AppShell.vue      # sidebar + topbar, dipakai halaman ber-auth
│   │   │   ├── components/charts/        # GaugeChart.vue, LineChart.vue (wrapper ECharts)
│   │   │   ├── composables/              # useMetricsStream.ts (SSE), usePrefersDark.ts
│   │   │   ├── stores/auth.ts            # pinia — authenticated/username, set CSRF token
│   │   │   ├── api/                      # client.ts (fetch wrapper), metrics.ts
│   │   │   ├── router/index.ts           # vue-router — HANYA route yang sudah dimigrasi;
│   │   │   │                             # link ke halaman lain masih <a href> biasa (full
│   │   │   │                             # page load) sampai halaman itu dimigrasi juga
│   │   │   ├── charts/register.ts        # registrasi ECharts tree-shaken (core + GaugeChart
│   │   │   │                             # + LineChart + komponen grid/tooltip/dst saja)
│   │   │   ├── theme.ts                  # Naive UI theme overrides, mirror tokens.css
│   │   │   ├── style/tokens.css          # design tokens CSS custom properties
│   │   │   └── types/metrics.ts          # mirror internal/store/snapshot.go json tags
│   │   ├── dist/                        # HASIL BUILD (`npm run build`), di-commit, di-embed
│   │   │                                # via web/embed.go `SPA` — device target tidak pernah
│   │   │                                # menjalankan Vite/npm
│   │   └── package.json / package-lock.json
│   ├── templates/                       # html/template files — halaman yang BELUM dimigrasi
│   │   │                                # ke Vue (lihat web/frontend/ di atas untuk yang sudah)
│   │   ├── layout.html
│   │   ├── files.html
│   │   ├── editor.html                    # shell halaman; isi file di-fetch via JS, tidak
│   │   │                                  # di-render server-side (hindari HTML-escaping
│   │   │                                  # konten arbitrary besar langsung di template)
│   │   ├── terminal.html                  # [belum dibuat] halaman full-screen xterm.js
│   │   └── fragments/                    # partial template untuk htmx swap — tanpa layout.html,
│   │       │                              # di-parse & di-render standalone (lihat catatan di bawah).
│   │       │                              # Docker & Service dihapus — dimigrasi ke Vue, lihat
│   │       │                              # web/frontend/src/views/{Docker,Service}View.vue di atas
│   │       ├── files_list.html            # listing + breadcrumb; entry yang match blocklist
│   │       │                              # difilter di sini, bukan cuma ditolak saat diklik
│   │       └── error_panel.html           # dipakai fragment Files untuk degradasi/error — nama
│   │                                       # generik dari saat masih dipakai lintas domain
│   │                                       # (Docker/Service), sekarang cuma Files
│   ├── static/
│   │   ├── css/
│   │   │   ├── app.css                   # design tokens + styling custom
│   │   │   ├── editor.css                 # layout halaman editor saja (dimuat khusus di sana)
│   │   │   └── vendor/uPlot.min.css
│   │   └── js/
│   │       ├── files.js                    # mkdir/rename/delete/copy/cut/paste (fetch JSON),
│   │       │                                # upload via XHR (butuh progress event, fetch tidak
│   │       │                                # punya ini untuk request body), progress panel
│   │       │                                # via EventSource ke endpoint job SSE
│   │       ├── editor.js                   # glue vanilla JS di sekitar window.TkEditor: fetch
│   │       │                                # isi file, dirty tracking, save/conflict/draft —
│   │       │                                # file ini SENDIRI tidak di-bundle esbuild
│   │       │                                # (gauge/dial: lihat web/frontend/src/components/
│   │       │                                # charts/GaugeChart.vue — dashboard sudah Vue)
│   │       ├── terminal.js                 # [belum dibuat] inisialisasi xterm.js + koneksi WebSocket
│   │       └── vendor/                    # htmx.min.js, uPlot.iife.min.js (fetched pre-built),
│   │                                       # editor.bundle.js (CodeMirror 6, di-build sendiri —
│   │                                       # lihat scripts/codemirror-build/); xterm.js menyusul
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
│   ├── build.sh                                # [belum dibuat] cross-compile untuk arm64
│   └── codemirror-build/                        # build-once CodeMirror 6 (bukan build-assets.sh
│       │                                        # tunggal seperti draf awal — npm project kecil
│       │                                        # karena CodeMirror butuh bundler sungguhan,
│       │                                        # beda dari htmx/uPlot yang tinggal fetch dist)
│       ├── package.json / package-lock.json     # esbuild + paket @codemirror/* + js-yaml
│       ├── build.mjs                            # jalankan: npm install && npm run build
│       └── src/editor-entry.js                  # satu-satunya sumber; output-nya di-commit ke
│                                                 # web/static/js/vendor/editor.bundle.js
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
- **`web/embed.go`** memakai `//go:embed templates static` + `//go:embed all:frontend/dist`
  (var `SPA`) sehingga `go build` menghasilkan satu binary yang membawa semua HTML/CSS/JS —
  baik untuk halaman `html/template` lama maupun untuk `dist/` hasil build Vue — tidak ada
  file eksternal yang harus ikut di-deploy terpisah selain binary + `config.yaml`. Package-nya
  sengaja diberi nama `assets` (bukan `web`) — direktori top-level `web/` dan `internal/web/`
  sama-sama bernama "web", jadi kalau package top-level juga bernama `web`, `internal/web`
  yang meng-impornya akan bentrok nama dengan package-nya sendiri. Diimpor sebagai
  `assets "github.com/tarkiman/tarkiman-os/web"`. `internal/web/spa.go` mem-`fs.Sub` embed
  `SPA` ke `frontend/dist` supaya path-nya cocok dengan yang direferensikan `index.html`
  hasil build Vite (`/assets/...`).
- **Satu `*template.Template` per halaman, bukan satu set gabungan.** `templates.go` mem-parse
  `layout.html` + tiap file halaman (`files.html`, `editor.html`, dst — halaman yang belum
  dimigrasi ke Vue) sebagai set terpisah
  per halaman, bukan satu `template.ParseFS(fs, "templates/*.html")` untuk semuanya. Alasannya:
  tiap halaman mendefinisikan block `{{define "title"}}`/`{{define "content"}}` dengan nama yang
  sama — kalau semua file di-parse jadi satu set, definisi dari file yang di-parse belakangan
  (urut alfabetis) akan **menimpa** punya file lain secara diam-diam (nama `{{define}}` bersifat
  global dalam satu set `template.Template`, bukan scoped per file). Ini sempat jadi bug nyata
  saat implementasi Fase 0 (dashboard ikut me-render konten login) sebelum diisolasi per halaman.
- File JS vendor (`web/static/js/vendor/`) adalah hasil build **sekali** di mesin developer,
  **dicommit ke repo** — bukan di-build ulang tiap `go build`, dan bukan diunduh dari CDN saat
  runtime (device target tidak butuh akses internet untuk menjalankan TarkimanOS). htmx &
  uPlot diambil langsung sebagai file dist resmi (tidak ada langkah build sama sekali). Fase
  3c: CodeMirror 6 **beda** — modular dan memang butuh bundler sungguhan (lihat
  [03-tech-stack.md](03-tech-stack.md)) — jadi punya proyek npm kecil sendiri di
  `scripts/codemirror-build/` (bukan `scripts/build-assets.sh` tunggal seperti draf awal
  membayangkan), dijalankan manual (`npm install && npm run build`) tiap kali
  `src/editor-entry.js` atau dependency-nya berubah, hasilnya di-commit sebagai
  `web/static/js/vendor/editor.bundle.js` (~677KB / ~225KB gzip — jauh lebih kecil dari
  Monaco meski lebih besar dari perkiraan awal, karena mencakup beberapa bahasa + lint +
  search + autocomplete sekaligus).
- **Fitur JS berat (editor) divalidasi dengan headless browser, bukan cuma testing backend.**
  `go build`/`esbuild` sama-sama sukses tanpa keluhan untuk bug CodeMirror yang bikin editor
  gagal mount total (lihat [04-features.md](04-features.md) §4.4 "Catatan Implementasi Fase
  3c") — error itu cuma muncul saat extension benar-benar dievaluasi oleh CodeMirror di
  runtime browser. Puppeteer + Chromium (sudah terpasang di mesin dev) dipakai untuk buka
  halaman sungguhan, cek elemen DOM ter-render, warna token syntax highlighting sungguhan
  (`getComputedStyle`), dan interaksi (ketik, Ctrl+S) — bukan cuma "server merespons 200".
  Pola ini dicatat di sini supaya fitur JS-berat berikutnya (kalau ada) tahu alat ini tersedia
  & kenapa perlu dipakai.
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
- **Breadcrumb & path gabungan pakai `filepath.Join`/`filepath.Dir`, bukan `printf "%s/%s"`.**
  Ditemukan langsung saat testing manual dengan `rootDir: "/"`: penggabungan string naif
  menghasilkan path `"//home"` (dua slash) — secara fungsional tetap jalan (`filepath.Clean`
  di `Jail.Resolve` menormalkannya), tapi tampil salah di URL/link. `joinPath` ditambahkan ke
  `funcMap` ([funcs.go](../internal/web/funcs.go)) supaya template bisa pakai `filepath.Join`
  langsung, bukan cuma di kode Go.
- **Entry yang masuk blocklist difilter dari listing, bukan cuma ditolak saat diklik.**
  Ditemukan saat testing terhadap `/etc` sungguhan: `/etc/shadow` muncul di tabel dengan
  tombol Unduh/Rename/Hapus yang "terlihat" berfungsi tapi akan gagal 403 kalau diklik —
  aman, tapi membingungkan. `handleFilesListFragment` sekarang menyaring tiap entry lewat
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
