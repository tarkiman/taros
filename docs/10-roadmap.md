# 10. Roadmap Implementasi

Dipecah jadi fase supaya ada checkpoint yang bisa dites di perangkat asli (khususnya STB
2GB) sebelum menambah kompleksitas berikutnya. Setiap fase menghasilkan aplikasi yang
**bisa dijalankan & berguna**, bukan potongan kode setengah jadi.

## Fase 0 — Fondasi

- **Sebelum menulis kode apa pun**: ukur baseline RAM CasaOS di STB (lihat
  [09-deployment.md](09-deployment.md) "Benchmark Pembanding: CasaOS") — ini angka pembanding
  yang jadi alasan proyek ini dibuat, wajib ada di tangan sebelum development supaya progres
  bisa dibandingkan dari awal, bukan cuma diasumsikan di akhir.
- Setup project (`go.mod`, struktur folder sesuai [08](08-project-structure.md)).
- `config/` loader + `deploy/config.example.yaml`.
- `auth/`: login, session cookie, bcrypt, CSRF dasar.
- `web/`: router dasar, layout template, embed.FS untuk static asset.
- Halaman login berfungsi, redirect ke dashboard kosong setelah login.
- **Checkpoint**: binary jalan di STB, bisa login, RSS memory idle terukur sebagai baseline
  **dan dibandingkan langsung** dengan angka CasaOS yang sudah diukur.

## Fase 1 — MVP Monitoring Sistem

- `collector/`: CPU, RAM, disk, suhu, network — baca dari `/proc`, `/sys`.
- `store/`: ring buffer in-memory.
- `web/sse.go`: endpoint SSE metrics.
- Dashboard utama: summary cards + grafik sparkline (uPlot) real-time.
- **Checkpoint**: dashboard menampilkan data akurat di RPi 5 & STB, resource usage TarkimanOS
  sendiri terukur sesuai target di [09-deployment.md](09-deployment.md) §9.4.

## Fase 2 — Docker & Service Monitoring

Dikerjakan sebagai **dua PR terpisah** (konsisten dengan alur kerja "satu fitur = satu PR" —
lihat memori proyek/`README.md` "Menjaga Dokumentasi Tetap Relevan"), meski digambar sebagai
satu fase besar di roadmap ini.

### 2a — Docker (selesai)

- `docker/`: klien Unix socket — containers (list + stats + start/stop/restart/remove),
  images (list + remove), volumes (list + remove), networks (list + remove), `system.go`
  (info daemon, `/system/df`, prune actions), `watcher.go` (cache background untuk stats
  container — lihat [05-data-storage.md](05-data-storage.md) kenapa ini ternyata perlu,
  bukan sekadar optimisasi opsional).
- Halaman Docker (sub-tab Containers/Images/Volumes/Networks/Settings, SSR + htmx fragment
  untuk refresh berkala & aksi) — lihat [04-features.md](04-features.md) §4.2.
- **Checkpoint tercapai** (diuji langsung terhadap Docker daemon nyata dengan 37 container
  berjalan di mesin dev, bukan lingkungan sintetis):
  - List + live stats container, image, volume, network semuanya menampilkan angka akurat
    (CPU% tervalidasi terhadap `docker stats` CLI resmi).
  - Aksi start/stop/restart/remove diuji end-to-end pakai container throwaway (bukan
    container produksi milik user) — termasuk konfirmasi bahwa **remove container yang masih
    running ditolak dengan pesan jelas** (HTTP 409 dari Docker, bukan force-delete diam-diam).
  - Graceful degradation diuji dengan socket path sengaja salah pada instance server
    terpisah (bukan mematikan Docker daemon asli milik user) — halaman tetap 200, fragment
    menampilkan pesan "Docker tidak terdeteksi" alih-alih crash/500.
  - RSS dengan Docker watcher aktif (setelah refresh pertama menangani 51 container): ~15MB,
    tetap di bawah target [09-deployment.md](09-deployment.md) §9.4.
- **Temuan signifikan selama implementasi** (semua sudah disinkronkan ke dokumen terkait,
  bukan cuma catatan di sini): `stats?stream=false` Docker ternyata ~1 detik per container
  (bukan instan) — memaksa desain `Watcher` cache background yang tidak direncanakan di
  draf awal; skema respons `/system/df` di Docker 29.x berbeda dari asumsi awal
  (`ImageUsage`/`ContainerUsage`/`VolumeUsage` dengan agregat siap pakai, bukan array
  `Images[]`/`Containers[]`/`Volumes[]`); `GET /volumes` tidak pernah mengisi ukuran data;
  `GET /networks` tidak pernah mengisi jumlah container terhubung (butuh inspect per-network).

### 2b — Service/systemd (selesai)

- `systemd/`: exec `systemctl`/`journalctl` (D-Bus dicadangkan Fase 5) — list unit (gabungan
  `list-units` + `list-unit-files` untuk status enabled), aksi start/stop/restart/reload lewat
  `sudo -n systemctl ...`, log tail on-demand.
- Halaman Service (SSR + htmx, form filter sekaligus jadi trigger auto-refresh supaya filter
  tidak reset diam-diam tiap poll) — lihat [04-features.md](04-features.md) §4.3.
- **Checkpoint tercapai** (diuji terhadap systemd nyata di mesin dev — 170+ unit service,
  9 timer, bukan lingkungan sintetis):
  - List + filter (nama/deskripsi, failed-only, toggle socket/timer) menampilkan data akurat,
    ~500ms untuk gabungan dua panggilan `systemctl` terhadap 170+ unit — cukup cepat tanpa
    perlu cache/`Watcher` seperti Docker container stats.
  - Aksi start/stop/restart diuji end-to-end pakai **unit transient** (`systemd-run`, bukan
    unit produksi milik user) — dikonfirmasi berhasil (state berubah nyata di systemd),
    lalu unit transient otomatis di-GC systemd sendiri setelah stop.
  - Unit "terproteksi" (`ssh.service` dkk, dari `systemd.protectedUnits`) dikonfirmasi tampil
    dengan badge + teks konfirmasi lebih tegas sebelum stop/restart.
  - Log tail via `journalctl -u` dikonfirmasi menampilkan baris log asli.
  - RSS dengan semua fitur (collector + Docker watcher + systemd on-demand) aktif: ~18MB,
    tetap di bawah target [09-deployment.md](09-deployment.md) §9.4.
- **Temuan signifikan**: aksi systemctl tanpa privilege tambahan gagal dengan "Interactive
  authentication required" (dikonfirmasi langsung) — bukan sesuatu yang bisa "diperbaiki" di
  level kode, itu memang bagaimana systemd bekerja untuk user non-root. Solusinya memakai
  ulang privilege opt-in `sudo` yang sama seperti web terminal ([07-security.md](07-security.md)
  §7.6), atau sudoers rule yang lebih sempit khusus `systemctl` — lihat
  [09-deployment.md](09-deployment.md) §9.2. Monitoring/list tetap berfungsi penuh tanpa
  privilege apa pun; hanya tombol aksi yang butuh setup tambahan opsional itu.

## Fase 3 — File Explorer & Editor

Dipecah jadi tiga PR (pola yang sama seperti Fase 2 — lihat memori proyek/`README.md`
"Menjaga Dokumentasi Tetap Relevan"): inti dulu, lalu operasi berat/streaming, baru editor.

### 3a — File Explorer inti (selesai)

- `safepath.go` (tipe `Jail`): validasi path traversal, symlink escape (best-effort resolve
  untuk path yang belum ada), blocklist, generic `.ssh` block — dibangun & **diuji sebelum**
  kode lain di package ini boleh menyentuh filesystem, sesuai [07-security.md](07-security.md)
  §7.3.
- `list.go`, `ops.go`: browse + breadcrumb, create file/folder, rename (`os.Rename`), delete
  (rekursif via `os.RemoveAll`), download file tunggal (streaming via `http.ServeFile`).
- **Checkpoint keamanan tercapai**: diuji langsung (bukan cuma unit test) — traversal, symlink
  escape sungguhan (dibuat via `os.Symlink` mengarah ke `/etc`), akses `.ssh`, blocklist
  (termasuk untuk path yang belum ada di dalam direktori blocklisted) — semua tertolak
  dengan pesan jelas.
- **Dua bug nyata ditemukan & diperbaiki lewat testing manual** (bukan cuma lolos unit test
  terisolasi): (1) breadcrumb awalnya dibangun dari filesystem `/` bukan dari `rootDir` jail
  — kalau `rootDir` dipersempit, breadcrumb menampilkan link yang **akan ditolak** kalau
  diklik (aman, tapi UX rusak); (2) entry yang masuk blocklist (`/etc/shadow`) tetap muncul
  di listing dengan tombol aksi yang terlihat aktif tapi gagal 403 kalau diklik. Keduanya
  diperbaiki — lihat [07-security.md](07-security.md) §7.3 &
  [08-project-structure.md](08-project-structure.md) untuk detail.
- **Checkpoint stabilitas untuk 3a**: tidak relevan di fase ini — operasi yang diimplementasikan
  (create/rename/delete/download-file-tunggal) semuanya sudah streaming/instan by construction
  (`os.Rename`, `http.ServeFile`), bukan operasi besar yang berisiko. Checkpoint stabilitas
  "sungguhan" (copy file multi-GB, dsb) berlaku untuk 3b di bawah.

### 3b — Operasi Besar & Streaming (selesai-dev; validasi STB fisik tertunda)

- `job.go` + `copy.go` + `jobqueue.go`: copy/move streaming (buffer tetap 256KB, tanpa load
  penuh ke memori), throttle opsional (`copyThrottleMBps`), sync berkala (`copySyncEveryMB`),
  antrean dengan batas konkuren (semaphore), progress via SSE, cancel (`context.CancelFunc`).
  Move dalam filesystem sama dideteksi via perbandingan device ID (`syscall.Stat_t.Dev`) dan
  jadi `os.Rename` instan, bukan stream copy+delete.
- `archive.go`: download folder sebagai zip streaming (`archive/zip`, tidak pernah membangun
  arsip penuh dulu). Copy/cut/paste + multi-select (clipboard di `auth.Session`), upload
  (multipart streaming, `http.MaxBytesReader` menegakkan `maxUploadSizeMB`), search/filter
  dalam direktori — lihat [04-features.md](04-features.md) §4.4.
- **Checkpoint stabilitas — selesai-dev tercapai, langsung merespons masalah CasaOS yang jadi
  motivasi proyek ini** (lihat [01-overview.md](01-overview.md)): di RPi 5 dengan storage
  **disk sungguhan** (bukan `/tmp` yang ternyata tmpfs/RAM-backed di mesin dev — baru
  disadari saat menyiapkan test data, lihat [08-project-structure.md](08-project-structure.md)),
  copy file tunggal 1.5GB **dengan throttle 20MB/s** (mensimulasikan storage lambat ala STB)
  **dan** copy 2000 file kecil sekaligus. Selama copy 1.5GB berjalan (~75 detik), latency
  endpoint lain di server yang sama diukur konsisten <3ms — tidak ada penurunan responsivitas
  sama sekali. Checksum MD5 cocok persis, tidak ada file `.tkpart` tersisa baik setelah selesai
  normal maupun setelah dibatalkan di tengah jalan. **Validasi STB fisik (Cortex-A53, storage
  eMMC/SD asli, bukan simulasi throttle) tetap jadi kriteria "selesai-rilis" yang belum
  tercapai** — sama seperti fase-fase sebelumnya, lihat [10-roadmap.md](10-roadmap.md)
  "Definisi Selesai" untuk kenapa dua tingkat validasi ini dipisahkan.

### 3c — Text Editor (selesai)

- `content.go`: baca/tulis isi file dengan deteksi biner (byte null), batas 2MB, save atomik
  (temp file + rename, permission dipertahankan, owner best-effort), deteksi konflik via mtime.
- Integrasi CodeMirror 6 lewat proyek npm build-once (`scripts/codemirror-build/`) — beda dari
  htmx/uPlot yang dipakai langsung dari dist resmi tanpa build (lihat
  [03-tech-stack.md](03-tech-stack.md)); hasil build (~677KB/~225KB gzip) di-commit ke
  `web/static/js/vendor/editor.bundle.js`.
- Syntax highlighting (YAML, JSON, Markdown, shell, format `key=value` untuk conf/ini/toml),
  code folding, auto-closing bracket, find & replace, validasi ringan YAML/JSON dengan marker
  gutter, word wrap toggle + persist, unsaved-indicator + `beforeunload` guard, auto-save
  draft ke `localStorage` + restore prompt, deteksi konflik (409) — lihat
  [04-features.md](04-features.md) §4.4 "Text Editor Terintegrasi" untuk daftar lengkap
  termasuk apa yang **belum** diimplementasikan (dropdown bahasa manual, indent guide visual,
  breadcrumb+status bar di editor, tombol Format, preview Markdown — semua dicadangkan ke
  Fase 5 polish, bukan blocker untuk keandalan inti baca/edit/simpan).
- **Checkpoint tercapai — divalidasi dengan headless browser (Puppeteer + Chromium), bukan
  cuma testing backend API**: mount editor, load konten, syntax highlighting (warna token
  sungguhan dicek via `getComputedStyle`, bukan cuma keberadaan class CSS), lint marker
  YAML/JSON, word wrap + persist, auto-save draft + restore prompt, `beforeunload` guard, dan
  (lewat API langsung) deteksi konflik tanpa kehilangan data, penolakan file biner/&gt;2MB,
  save atomik yang mempertahankan permission.
- **Bug nyata ditemukan lewat testing browser** (bukan dari membaca kode atau dari `go build`/
  `esbuild` yang sama-sama sukses): `jsonParseLinter()` dipakai tanpa dibungkus `linter(...)`
  membuat CodeMirror melempar error di runtime dan **seluruh editor gagal mount** — bukan
  cuma fitur lint JSON yang rusak. Ini alasan headless-browser testing masuk jadi bagian
  standar checklist untuk fitur JS-berat ke depannya, dicatat di
  [08-project-structure.md](08-project-structure.md).

## Fase 4 — Web Terminal

- `terminal/`: wrapper `creack/pty` untuk spawn shell sebagai user `tarkimanos`, lifecycle sesi
  (idle timeout, limit konkuren, cleanup saat disconnect).
- `web/ws_terminal.go`: endpoint WebSocket (`nhooyr.io/websocket`), validasi `Origin` +
  session cookie sebelum upgrade (implementasi penuh sesuai
  [07-security.md](07-security.md) §7.6 — **wajib** sebelum fitur ini dianggap selesai,
  sama seperti perlakuan file explorer di Fase 3).
- Integrasi xterm.js di frontend (halaman `/terminal`, resize handling, tema dark/light).
- Toggle `terminal.enabled` + banner peringatan first-use di UI.
- Uji manual kedua mode sudo opsional (lihat [09-deployment.md](09-deployment.md) §9.2 &
  [07-security.md](07-security.md) §7.6): tanpa sudoers rule sama sekali (default), dengan
  mode password, dan dengan mode NOPASSWD — pastikan dokumentasi instalasinya akurat.
- **Checkpoint**: uji keamanan manual (buka WebSocket dari origin lain & pastikan ditolak,
  pastikan sesi ke-kill saat tab ditutup, pastikan idle timeout & limit sesi konkuren
  berfungsi) sebelum fitur ini dianggap "selesai" — sama seperti Fase 3.

## Fase 5 — Visualisasi & Optimasi & Polish

- Komponen gauge/dial SVG untuk CPU/RAM/Disk/Suhu (lihat [06-api-ui-ux.md](06-api-ui-ux.md) §6.5),
  menggantikan summary card polos dari Fase 1.
- Migrasi `systemd/` dari exec `systemctl` ke D-Bus (`go-systemd/dbus`) untuk efisiensi.
- Polkit rules untuk kontrol systemd tanpa root penuh.
- Audit logging lengkap (semua aksi state-changing, termasuk sesi terminal).
- Rate limiting login, hardening session.
- UI polish: dark/light theme toggle, loading states, toast notifications, mobile responsive
  review menyeluruh, aksesibilitas dasar.
- Profiling memory & CPU di STB (target [09-deployment.md](09-deployment.md) §9.4 tercapai
  di kondisi realistis: Docker + beberapa container jalan bersamaan + sesi terminal aktif).

## Fase 6 — Opsional / Masa Depan (di luar scope awal)

Tidak dikerjakan kecuali kebutuhan berubah — dicatat di sini supaya keputusan arsitektur
saat ini (lihat [01-overview.md](01-overview.md) "Non-Tujuan") tidak menutup jalan ke sana:

- Persistensi histori metrics (SQLite, opt-in) — lihat [05-data-storage.md](05-data-storage.md).
- Multi-node/central dashboard (agregasi dari beberapa perangkat).
- Alerting (threshold-based, notifikasi Telegram/webhook).
- Perekaman sesi terminal (opt-in, dengan peringatan eksplisit) — lihat
  [07-security.md](07-security.md) §7.6 kenapa ini tidak jadi default.
- Login terminal berbasis PAM/user sistem asli (bukan lagi user service `tarkimanos` tunggal) —
  dipertimbangkan lagi kalau kebutuhannya berkembang jadi multi-user administrasi penuh.
- Log viewer streaming (bukan tail on-demand) untuk container & systemd unit.
- Multi-user dengan role-based access.

## Definisi "Selesai" per Fase

Karena development harian berjalan di **Raspberry Pi 5 (16GB)** — lihat
[01-overview.md](01-overview.md) "Lingkungan Development" — dan STB fisik belum tentu selalu
ada di tangan saat iterasi cepat, dipakai dua tingkat validasi:

- **Selesai-dev** (cukup untuk lanjut ke fase berikutnya sehari-hari): fitur berfungsi di
  RPi 5, resource usage diukur dengan **memory cap disimulasikan** (`MemoryMax` cgroup
  mendekati 2GB, lihat [01-overview.md](01-overview.md)) untuk early-warning kalau ada
  lonjakan/leak.
- **Selesai-rilis** (wajib sebelum fase dianggap benar-benar tuntas / sebelum masuk fase
  berikutnya yang menambah beban baru secara signifikan): sudah divalidasi ulang di
  **STB B860H fisik**, karena itu baseline resource sekaligus baseline CPU (Cortex-A53)
  paling ketat yang tidak sepenuhnya bisa disimulasikan dari RPi 5 (Cortex-A76).

Kriteria lengkap "selesai-rilis":

1. Fitur berfungsi & sudah dites langsung di **STB B860H** (bukan cuma di RPi 5, walau sudah
   disimulasikan cgroup) — termasuk uji storage eksternal (USB/kartu SD tambahan) jika STB
   punya port yang relevan, lihat [04-features.md](04-features.md) §4.1 Disk.
2. Resource usage (RAM/CPU) terukur dan sesuai/masih dalam toleransi target di
   [09-deployment.md](09-deployment.md).
3. Untuk fase yang menyentuh keamanan (terutama Fase 3 — file explorer, dan Fase 4 — web
   terminal), sudah ada verifikasi manual terhadap skenario abuse yang relevan (path
   traversal, CSWSH, dst) — bukan hanya happy path.
