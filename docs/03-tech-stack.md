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
| Template SSR | `html/template` stdlib | Auto-escaping aman, tanpa dependency |
| Frontend interaktif | [htmx](https://htmx.org) (~14KB gzip) + [Alpine.js](https://alpinejs.dev) (~8KB gzip) | AJAX partial-update & state kecil tanpa build step Node/React/Vue |
| Realtime push (metrics) | Server-Sent Events (stdlib `http.Flusher`) | Satu-arah, auto-reconnect browser, tanpa library WebSocket |
| Realtime dua-arah (terminal) | [`nhooyr.io/websocket`](https://github.com/coder/websocket) (a.k.a. `coder/websocket`) | Library WebSocket minimalis, idiomatic dengan `context`, jauh lebih ringan & lebih sedikit dependency dibanding `gorilla/websocket` |
| PTY (pseudo-terminal) | [`github.com/creack/pty`](https://github.com/creack/pty) | Satu-satunya cara wajar untuk spawn shell interaktif (butuh raw PTY, bukan sekadar `os/exec` pipe) — library tipis, dependency minimal, standar de-facto di ekosistem Go |
| Terminal emulator (frontend) | [xterm.js](https://xtermjs.org/) (pre-built, di-embed, ~250KB) | Standar de-facto untuk terminal di browser (dipakai VS Code, Hyper, dll), rendering & handling ANSI escape code sudah teruji — menulis ulang ini dari nol tidak masuk akal |
| Styling | CSS custom minimal (design tokens sendiri) | Kontrol penuh ukuran & tampilan, hindari framework besar (Tailwind butuh build step) |
| Chart/grafik time-series | [uPlot](https://github.com/leeoniya/uPlot) (~45KB min) | Chart real-time paling ringan & cepat di kelasnya, jauh lebih kecil dari Chart.js |
| Gauge/dial (radial) | SVG hand-rolled + vanilla JS kecil (bukan library) | Gauge radial cukup dibentuk dari satu elemen `<svg><circle stroke-dasharray=...>` yang di-update atribut-nya via JS saat data SSE masuk — tidak butuh library chart tambahan untuk ini, lihat detail di [06-api-ui-ux.md](06-api-ui-ux.md) §6.5 |
| Editor teks | [CodeMirror 6](https://codemirror.net/) (pre-built, di-embed) + `@codemirror/lint` + `js-yaml` (parse-only, untuk validasi YAML) | Syntax highlighting rapi untuk md/conf/yaml/json + validasi error inline, jauh lebih ringan dari Monaco |
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

### Kenapa htmx + Alpine, bukan SPA (React/Vue/Svelte)?

- User secara eksplisit minta frontend berbasis Go juga — pendekatan SSR (Go render HTML)
  paling konsisten dengan itu; JS hanya "progressive enhancement" tipis di atasnya.
- Tidak butuh build toolchain Node.js/npm/webpack/vite sama sekali — `go build` saja sudah
  menghasilkan binary final siap pakai.
- Bundle JS total (htmx + Alpine + uPlot + CodeMirror) tetap jauh lebih kecil dari runtime
  framework SPA modern, dan tidak ada virtual-DOM overhead di sisi klien (device yang akses
  dashboard belum tentu kencang juga — sering diakses dari HP).
- Trade-off: interaksi sangat kaya (drag-drop kompleks dsb) lebih verbose ditulis dengan
  htmx/Alpine dibanding React. Untuk fitur yang ditargetkan (dashboard, file explorer, editor),
  ini masih sangat memadai.

### Kenapa CodeMirror 6 & xterm.js jadi "pengecualian" JS berat?

Menulis text editor dengan syntax highlighting atau terminal emulator (parsing ANSI escape
sequence, cursor handling, scrollback buffer, dst) dari nol tidak praktis — keduanya problem
yang sudah dipecahkan dengan sangat baik oleh library yang sudah battle-tested. CodeMirror 6
modular (hanya include bahasa yang dibutuhkan: markdown, yaml, json, ini/conf, plain text) dan
xterm.js sama-sama di-*bundle* **sekali saat development** (pakai `esbuild` atau CDN build,
bukan di perangkat target), hasil akhirnya berupa file JS statis yang di-embed ke binary Go —
perangkat ARM tidak pernah menjalankan build step apa pun. Keduanya tetap jauh lebih ringan
dari alternatif yang lebih "lengkap" (Monaco untuk editor, atau reimplementasi terminal dari
nol) yang tidak sepadan untuk kebutuhan aplikasi ini.

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
- `esbuild` atau `Makefile` sederhana untuk sekali build CodeMirror 6 + uPlot jadi file JS
  statis (dijalankan di mesin developer, hasilnya di-commit ke `web/static/js/vendor/`).
- Tidak ada dependency runtime Node.js di perangkat target — build toolchain di atas hanya
  dipakai sekali saat menyiapkan aset, bukan bagian dari `go build`.
