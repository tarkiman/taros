# 3. Tech Stack

Prinsip pemilihan: **minimalkan dependency**, hindari yang menyeret banyak transitive
package atau butuh CGO (menyulitkan cross-compile & menambah ukuran binary). Setiap baris
di bawah menyertakan alternatif yang dipertimbangkan dan kenapa tidak dipilih.

## Kenapa Go, bukan Python?

Ini keputusan paling mendasar di seluruh dokumen ini, jadi ditulis eksplisit di depan —
bukan cuma diasumsikan. Untuk prioritas utama proyek ini (**seringan mungkin, hemat RAM,
mudah di-install sebagai service, bisa diakses lewat browser**), Go menang jelas di semua
sumbu yang relevan:

| Aspek | Go | Python |
|---|---|---|
| Baseline memory idle | Binary statis, proses idle biasanya single-digit s.d. belasan MB RSS | Interpreter CPython + framework web (Flask/FastAPI) + server (Gunicorn/Uvicorn) biasanya sudah 40–80MB+ RSS **sebelum** melakukan apa pun |
| Instalasi di device target | Satu binary hasil `go build`, copy & jalankan — tidak ada runtime lain yang perlu terpasang | Butuh interpreter Python terpasang + `pip install` dependency di device (atau bundling berat semacam PyInstaller) — di ARM/STB storage & bandwidth terbatas, ini rawan lambat/gagal, apalagi kalau ada dependency yang perlu compile native extension |
| Concurrency untuk banyak sumber data paralel | Goroutine ringan (KB-level stack awal) — pas untuk banyak collector, SSE per klien, WS terminal berjalan bersamaan | Thread Python dibatasi GIL untuk kerja CPU-bound; pola async (asyncio) bisa dipakai tapi ekosistemnya tidak seseragam Go untuk I/O sistem level rendah |
| Deployment sebagai systemd service | Natural fit — satu `ExecStart` ke binary | Perlu venv/path interpreter yang benar di `ExecStart`, lebih banyak yang bisa salah konfigurasi antar lingkungan |
| Cross-compile ke ARM dari mesin dev manapun | Native (`GOOS=linux GOARCH=arm64 go build`), tanpa Docker/QEMU | Tidak relevan dengan cara yang sama — Python "cross-compile" pada dasarnya berarti replikasi environment di target |

**Yang Python unggulkan** (dan kenapa itu tetap kalah prioritas di sini): ekosistem library
lebih kaya untuk prototyping cepat (`psutil`, `docker` SDK Python, Flask), dan barangkali lebih
familiar untuk sebagian orang. Tapi tak satu pun dari itu mengalahkan kebutuhan inti "hemat RAM
di device 2GB & instalasi sesederhana mungkin" — justru dua hal itulah yang paling gampang
dikorbankan kalau pakai Python untuk kasus pakai ini.

**Kesimpulan**: tetap Go, konsisten dengan seluruh keputusan stack lain di dokumen ini.

## Ringkasan

| Kebutuhan | Pilihan | Alasan |
|---|---|---|
| Bahasa | Go 1.22+ | Single binary, cross-compile native, GC efisien, konkurensi ringan (goroutine) |
| HTTP routing | `net/http` stdlib (Go 1.22+ pattern matching) | Go 1.22 sudah punya method+path routing di stdlib — tidak perlu router eksternal (chi/gin/echo) |
| Template SSR | `html/template` stdlib | Halaman yang **belum** dimigrasi ke Vue (lihat baris "Frontend SPA" di bawah) — auto-escaping aman, tanpa dependency |
| Frontend interaktif (halaman lama) | [htmx](https://htmx.org) (~14KB gzip) + vanilla JS | AJAX partial-update & state kecil tanpa build step Node — dipakai di halaman yang belum dimigrasi ke Vue |
| Frontend SPA (halaman termigrasi) | **Vue 3** + Vite + TypeScript, [Naive UI](https://www.naiveui.com/), [ECharts](https://echarts.apache.org/) (custom tree-shaken build), [`@lucide/vue`](https://lucide.dev/) | Lihat "Kenapa pivot ke Vue?" di bawah — dibangun sekali di mesin dev, hasil `vite build` (static HTML/JS/CSS) di-embed ke binary yang sama, tidak mengubah model deployment satu-executable |
| Realtime push (metrics) | Server-Sent Events (stdlib `http.Flusher`) | Satu-arah, auto-reconnect browser, tanpa library WebSocket |
| Realtime dua-arah (terminal) | [`nhooyr.io/websocket`](https://github.com/coder/websocket) (a.k.a. `coder/websocket`) | Library WebSocket minimalis, idiomatic dengan `context`, jauh lebih ringan & lebih sedikit dependency dibanding `gorilla/websocket` |
| PTY (pseudo-terminal) | [`github.com/creack/pty`](https://github.com/creack/pty) | Satu-satunya cara wajar untuk spawn shell interaktif (butuh raw PTY, bukan sekadar `os/exec` pipe) — library tipis, dependency minimal, standar de-facto di ekosistem Go |
| Terminal emulator (frontend) | [xterm.js](https://xtermjs.org/) (pre-built, di-embed, ~250KB) | Standar de-facto untuk terminal di browser (dipakai VS Code, Hyper, dll), rendering & handling ANSI escape code sudah teruji — menulis ulang ini dari nol tidak masuk akal |
| Styling | CSS custom minimal (design tokens sendiri) | Kontrol penuh ukuran & tampilan, hindari framework besar (Tailwind butuh build step) |
| Chart/grafik time-series (halaman termigrasi) | ECharts (line chart, komponen sama dengan gauge di bawah) | Satu chart library untuk semua jenis chart di halaman Vue (line & gauge) — lebih ringan sebagai total bundle dibanding dua library terpisah. `uPlot` **tidak** dipakai lagi karena halaman dashboard sudah dimigrasi ke Vue; kalau ada halaman lama yang masih memakainya, itu peninggalan sementara sebelum migrasi halaman tsb selesai |
| Gauge/dial (radial) | ECharts `GaugeChart` (custom build, lewat `echarts/core` + `use([...])` — bukan full `echarts` package) | Lihat [06-api-ui-ux.md](06-api-ui-ux.md) §6.5. Tree-shaken ke hanya `CanvasRenderer`, `GaugeChart`, `LineChart`, dan beberapa komponen (grid/tooltip/title/legend) — jauh di bawah ukuran full ECharts |
| Editor teks | [CodeMirror 6](https://codemirror.net/) — dependency npm langsung di `web/frontend` (bukan pipeline esbuild terpisah, sejak migrasi Editor ke Vue) + `@codemirror/lint` + `js-yaml` (parse-only, untuk validasi YAML) | Syntax highlighting rapi untuk md/conf/yaml/json + validasi error inline, jauh lebih ringan dari Monaco |
| Asset embedding | `embed.FS` stdlib | Semua HTML/CSS/JS ikut ter-compile ke satu binary |
| System metrics | Baca langsung `/proc`, `/sys` (custom, tanpa `gopsutil`) | Lihat detail di bawah |
| Docker client | Custom HTTP client tipis ke Unix socket (bukan SDK resmi `docker/docker`) | SDK resmi menyeret puluhan transitive dependency; kita cuma butuh 3–4 endpoint |
| Systemd client | [`github.com/coreos/go-systemd/v22/dbus`](https://github.com/coreos/go-systemd) | Binding D-Bus resmi, event-driven, tanpa spawn subprocess `systemctl` berulang |
| Config | YAML (`gopkg.in/yaml.v3`) | Format familiar, human-readable |
| Password hashing | `golang.org/x/crypto/bcrypt` | Standar de-facto, sudah teruji |
| Logging | `log/slog` stdlib | Structured logging tanpa dependency tambahan |
| Session | Cookie HTTP-only + token random di memori (bukan JWT) | Single-user, tidak perlu kompleksitas JWT; token disimpan di map in-memory |

## Detail & Alasan Per Keputusan

### Kenapa tidak `gopsutil`?

[gopsutil](https://github.com/shirou/gopsutil) populer dan pure-Go, tapi merupakan library
generik cross-platform (Linux/Windows/macOS/BSD) — banyak kode & abstraksi yang tidak relevan
untuk kita yang **hanya target Linux ARM**. Membaca langsung dari `/proc/stat`, `/proc/meminfo`,
`/proc/diskstats`, `/sys/class/thermal/thermal_zone*/temp`, `/proc/net/dev` itu sendiri tidak
rumit (semua format teks yang stabil), dan hasilnya jauh lebih kecil & spesifik kebutuhan kita.
Kalau di kemudian hari kompleksitas maintenance jadi masalah, `gopsutil` tetap opsi migrasi yang valid.

### Kenapa tidak Docker SDK resmi?

`github.com/docker/docker/client` adalah SDK lengkap yang menyeret dependency besar (containerd,
distribution, dsb) — signifikan menambah ukuran binary & kompleksitas `go.mod` untuk kebutuhan
kita yang sebenarnya sederhana meski sudah mencakup containers, images, volumes, & networks
(lihat [04-features.md](04-features.md) §4.2):

- Containers: `GET /containers/json`, `GET /containers/{id}/stats?stream=false`,
  `POST /containers/{id}/start|stop|restart`, `DELETE /containers/{id}`.
- Images: `GET /images/json` (sudah termasuk `Size` per image, dipakai langsung untuk tabel
  Images — tidak perlu `/system/df` per item), `DELETE /images/{id}`.
- Volumes: `GET /volumes`, `DELETE /volumes/{name}`. **Catatan**: endpoint ini tidak
  menyertakan ukuran data (lihat [04-features.md](04-features.md) §4.2 "Volumes").
- Networks: `GET /networks` untuk daftar dasar + `GET /networks/{id}` per-network untuk
  jumlah container terhubung (field `Containers` di response list dasar selalu kosong,
  dikonfirmasi terhadap Docker 29.x — bukan cuma perlu `?filters=`, endpoint list-nya
  memang tidak pernah mengisi field itu).
- Ringkasan disk usage (panel Settings): `GET /system/df` — **tanpa** `?verbose=1`; response
  Docker 29.x sudah menyertakan agregat siap pakai per kategori (`ImageUsage.TotalSize`,
  `.Reclaimable`, dst) tanpa perlu menjumlahkan array item satu-satu seperti API docs versi
  lama menggambarkan.
- Info daemon (panel Settings): `GET /info`.
- Cleanup (panel Settings): `POST /containers/prune`, `POST /images/prune`,
  `POST /volumes/prune`, `POST /networks/prune`.

Semuanya tetap HTTP API biasa di atas Unix socket — cukup pakai `net/http` dengan custom
`DialContext` yang connect ke `/var/run/docker.sock`, tanpa perlu SDK resmi.

### Kenapa D-Bus untuk systemd, bukan exec `systemctl`?

Exec `systemctl list-units --output=json` tiap poll itu sederhana untuk MVP, tapi tiap
panggilan **spawn subprocess baru** (fork+exec) — di perangkat 2GB RAM dengan CPU lemah,
ini overhead yang bisa dihindari. `go-systemd/dbus` bicara langsung ke systemd lewat D-Bus
(sudah berjalan di semua sistem systemd) dan bisa subscribe ke perubahan state tanpa polling
terus-menerus. **Catatan implementasi**: MVP boleh mulai dari exec `systemctl` (lebih cepat
dibuat), lalu dioptimasi ke D-Bus di iterasi berikutnya — lihat [10-roadmap.md](10-roadmap.md).

### Kenapa awalnya htmx, lalu pivot ke Vue?

Pendekatan awal (Fase 0–3) adalah SSR murni: `html/template` + htmx + vanilla JS, tanpa
build toolchain Node sama sekali — `go build` saja sudah cukup. Ini valid untuk fungsionalitas
dasar, tapi setelah semua fase inti (dashboard, Docker, Service, File Explorer, Editor) selesai,
tampilannya terasa "polos" dibanding dashboard modern (mis. CasaOS) — wajar, karena htmx +
CSS tokens custom pada dasarnya cuma menghasilkan apa yang ditulis tangan, tidak ada
component library/animation system siap pakai di baliknya.

Keputusan: pivot ke **Vue 3 SPA** untuk tampilan yang lebih kaya, dengan syarat mutlak yang
sudah dikonfirmasi sebelum pivot dimulai — **model deployment satu binary/satu executable
tidak boleh berubah**. Ini tetap terjaga karena:

- Hasil `npm run build` (Vite) adalah file HTML/JS/CSS statis biasa — persis seperti bundle
  CodeMirror 6 yang sudah lebih dulu ada di proyek ini. Dibangun sekali di mesin dev,
  hasilnya (`web/frontend/dist/`) di-embed via `embed.FS` yang sama, ikut ter-compile ke
  binary Go saat `go build`. Device target (RPi5/STB) tidak pernah menjalankan Node/npm/Vite.
- **Rendering SPA terjadi di browser klien** (laptop/HP yang mengakses dashboard), **bukan**
  di device target — jadi tidak menambah RAM runtime di STB 2GB sama sekali. Beban "lebih
  berat" Vue dibanding htmx murni cuma dirasakan sisi klien yang mengakses, yang jauh lebih
  berdaya dibanding STB itu sendiri.
- Naive UI (component library) & ECharts (chart/gauge) menggantikan kebutuhan menulis ulang
  modal/table/drawer/gauge dari nol dengan CSS/SVG tangan — trade-off yang tadinya "lebih
  verbose ditulis dengan htmx" untuk interaksi kaya, sekarang didapat langsung dari library.

**Strategi migrasi bertahap** (bukan rewrite sekaligus, konsisten dengan pola kerja per-fase
proyek ini — lihat [10-roadmap.md](10-roadmap.md)): halaman dimigrasi satu per satu ke Vue;
selama transisi, halaman yang belum dimigrasi tetap dilayani versi htmx/`html/template` apa
adanya, dan Go router (`internal/web/router.go`) memutuskan per-path mana yang diserve sebagai
SPA (`serveSPA`, shell `index.html` + client-side `vue-router`) vs mana yang masih handler
Go+template lama. Begitu sebuah halaman selesai dimigrasi, handler & template lamanya
dihapus di PR yang sama — tidak ada kode/halaman ganda yang dibiarkan menggantung.

**Status: migrasi selesai.** Editor (halaman terakhir) pindah ke Vue di fase yang juga
menghapus seluruh subsistem `html/template`/htmx yang sudah tidak dipakai lagi —
`internal/web/templates.go`, `internal/web/funcs.go`, `web/templates/`, `web/static/`
(CSS/JS tangan + vendor htmx/uPlot), dan var `Templates`/`Static` di `web/embed.go` — semuanya
dihapus total di PR yang sama, bukan dibiarkan sebagai dead code "jaga-jaga". `web.NewServer`
juga disederhanakan (tidak lagi return error, karena satu-satunya sumber error-nya —
`loadTemplates()` — sudah tidak ada). Satu-satunya aset yang di-embed sekarang adalah hasil
build Vue (`web/frontend/dist/`, var `SPA`).

### Kenapa xterm.js (nanti) jadi "pengecualian" JS berat?

Menulis terminal emulator dari nol (parsing ANSI escape sequence, cursor handling, scrollback
buffer, dst) tidak praktis — ini problem yang sudah dipecahkan dengan sangat baik oleh
xterm.js, library battle-tested yang dipakai VS Code, Hyper, dll. Ini akan jadi dependency npm
langsung di `web/frontend` (pola yang sama seperti CodeMirror 6 sekarang, bukan pipeline
esbuild terpisah seperti direncanakan sangat awal di proyek ini) begitu Fase 4 (Web Terminal)
dikerjakan — lihat [10-roadmap.md](10-roadmap.md).

CodeMirror 6 sendiri **bukan lagi pengecualian** — sejak migrasi Editor ke Vue, CodeMirror
adalah dependency npm biasa di `web/frontend/package.json`, di-bundle Vite bersama kode Vue
lainnya, tanpa pipeline `esbuild` terpisah (`scripts/codemirror-build/` sudah dihapus). Angka
nyata chunk `EditorView` hasil build (Fase 3c pindahan, mencakup YAML+JSON+Markdown+shell/conf,
lint, search, autocomplete, fold sekaligus): **~674KB minified / ~230KB gzip** — hampir identik
dengan ukuran bundle esbuild sebelumnya (~677KB/~225KB gzip), jadi pivot ke Vue tidak menambah
bobot CodeMirror itu sendiri; chunk ini juga di-*lazy-load* oleh `vue-router` hanya saat rute
`/files/edit` dibuka, tidak memperberat halaman lain.

Untuk validasi YAML/JSON inline (lihat [04-features.md](04-features.md) "Text Editor
Terintegrasi"), dipakai `@codemirror/lint` (framework marker error bawaan CodeMirror 6) —
untuk JSON cukup `@codemirror/lang-json` yang sudah menyediakan linter parse bawaan, untuk
YAML ditambah `js-yaml` (~40KB, parser YAML pure-JS paling umum dipakai) hanya untuk deteksi
syntax error, bukan library editor YAML yang berat.

### Kenapa `creack/pty` + `nhooyr.io/websocket` untuk terminal, bukan solusi lain?

- **PTY wajib**, bukan opsional: shell interaktif (bash, prompt warna, `top`, editor `vim`
  di dalam terminal, dst) butuh pseudo-terminal asli — kalau hanya `os/exec` dengan pipe
  stdin/stdout biasa, banyak program akan berperilaku aneh (buffering berubah, tidak ada
  job control, escape sequence tidak jalan). `creack/pty` adalah wrapper tipis di atas
  syscall `openpty`/`forkpty` Linux, tanpa dependency tambahan yang berat.
- **WebSocket, bukan SSE + polling**: sudah dibahas di [02-architecture.md](02-architecture.md)
  — terminal butuh dua arah (keystroke → server, output → klien) dengan latensi rendah, dan
  ini satu-satunya tempat di aplikasi yang butuh itu. `nhooyr.io/websocket` dipilih dibanding
  `gorilla/websocket` (yang sudah lama masuk mode maintenance-only) karena API lebih modern
  (native `context.Context`), lebih sedikit kode, dan alokasi memori lebih rendah per koneksi.
- Karena terminal hanya dipakai **satu sesi pada satu waktu** (lihat [04-features.md](04-features.md)
  §4.6), overhead menjaga satu koneksi WebSocket long-lived ini dapat diabaikan dari sisi
  resource budget STB.

### Kenapa tidak database (SQLite/Postgres/dst) di versi awal?

Lihat pembahasan lengkap trade-off di [05-data-storage.md](05-data-storage.md) — ringkasnya:
histori metrics jangka pendek cukup di RAM (ring buffer), menghindari I/O tulis berulang ke
storage eMMC/microSD yang endurance-nya terbatas. SQLite (pure-Go, `modernc.org/sqlite`,
tanpa perlu CGO) tetap dicadangkan sebagai opsi *Phase 2/3* kalau user butuh histori
persisten lintas restart.

## Build Toolchain (development, bukan runtime)

- Go 1.22+ (compiler & stdlib).
- **Vite** untuk build `web/frontend/` (Vue 3 SPA, sekarang mencakup **semua** halaman
  termasuk Editor/CodeMirror 6) — `npm install && npm run build` di direktori itu, hasilnya
  (`web/frontend/dist/`) di-commit dan di-embed via `web/embed.go`. Dijalankan manual di
  mesin dev setiap kali kode Vue berubah — bukan bagian dari `go build`, dan tidak butuh
  dijalankan lagi di device target. `scripts/codemirror-build/` (pipeline `esbuild` terpisah
  yang tadinya dipakai sebelum Editor pindah ke Vue) sudah dihapus — CodeMirror sekarang
  cuma dependency npm biasa di `web/frontend/package.json`.
- Tidak ada dependency runtime Node.js di perangkat target — semua build toolchain di atas
  hanya dipakai sekali saat menyiapkan aset, bukan bagian dari `go build`.
