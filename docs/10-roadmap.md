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

- `docker/`: klien Unix socket — containers (list + stats + start/stop/restart/remove),
  images (list + remove), volumes (list + remove), networks (list + remove), `system.go`
  (info daemon, `/system/df`, prune actions).
- `systemd/`: mulai dari exec `systemctl` (lebih cepat dibuat) untuk list unit + aksi.
- Halaman Docker (sub-tab Containers/Images/Volumes/Networks/Settings) & Service (SSR + htmx
  fragment untuk refresh berkala & aksi) — lihat [04-features.md](04-features.md) §4.2.
- **Checkpoint**: bisa lihat & kontrol container/image/volume/network/service dari dashboard
  di kedua perangkat; uji graceful degradation (matikan Docker daemon, pastikan tidak crash);
  uji aksi prune/remove tidak menghapus yang masih dipakai (harus ditolak dengan pesan jelas).

## Fase 3 — File Explorer & Editor

- `fileexplorer/`: list, create, rename (via `os.Rename` untuk kasus umum, lihat
  [04-features.md](04-features.md) "Keandalan Operasi File Besar/Banyak"), delete, copy/cut-paste.
- `copyjob.go` + `jobqueue.go`: copy/move streaming (buffer tetap, tanpa load penuh ke memori),
  throttle opsional, sync berkala, antrean dengan batas konkuren, progress via SSE, cancel.
- Upload (streaming multipart) / download (streaming, zip on-the-fly untuk folder).
- `safepath.go`: validasi path traversal, root jail, blocklist (implementasi penuh sesuai
  [07-security.md](07-security.md) §7.3 — **wajib** sebelum fitur ini dianggap selesai).
- Integrasi CodeMirror 6 untuk editor teks (md/yaml/json/conf/plain).
- **Checkpoint keamanan**: uji manual (coba path traversal, symlink escape, upload file besar)
  sebelum fitur ini dianggap "selesai" — bukan cuma functional testing.
- **Checkpoint stabilitas (langsung merespons masalah CasaOS yang jadi motivasi proyek ini,
  lihat [01-overview.md](01-overview.md))**: di STB, copy file tunggal multi-GB **dan** copy
  ribuan file kecil sekaligus — pastikan dashboard & akses lain ke perangkat (SSH, dsb) **tetap
  responsif** sepanjang proses, tidak ada hang yang butuh power-cycle manual. Ini kriteria
  "selesai" yang sama pentingnya dengan checkpoint keamanan di atas — jangan dilewati.

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
