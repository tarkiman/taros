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
- **Checkpoint**: dashboard menampilkan data akurat di RPi 5 & STB, resource usage TarOS
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

## Fase UI/UX — Pivot ke Vue (sedang berjalan; Fase 4 di-hold sementara)

Konteks: setelah Fase 0–3c selesai, user eksplisit minta hold Fase 4 (Web Terminal) untuk
lebih dulu memoles tampilan — dashboard htmx terasa polos dibanding pembanding semacam
CasaOS. Setelah diskusi (lihat [03-tech-stack.md](03-tech-stack.md) "Kenapa pivot ke Vue?"),
keputusan: pivot frontend ke Vue 3 SPA, dimigrasi **bertahap per-halaman** (bukan rewrite
sekaligus), dengan model deployment satu-binary tetap dipertahankan penuh.

### A — Fondasi Vue + Login + Dashboard (selesai-dev; validasi STB fisik tertunda)

- `web/frontend/`: proyek Vue 3 + Vite + TypeScript baru — Naive UI (component library),
  ECharts custom build (gauge + line chart, tree-shaken lewat `echarts/core`), `@lucide/vue`
  (ikon), pinia, vue-router.
- Endpoint JSON auth baru: `POST /api/auth/login` (JSON, gantikan form-post lama),
  `GET /api/auth/session` (hidrasi auth store Vue saat boot app, selalu 200).
- `internal/web/spa.go`: serve shell Vue (`serveSPA`) untuk route yang sudah dimigrasi
  (`/`, `/login`) + serve `/assets/*` dari `web/frontend/dist` via embed.FS — halaman yang
  belum dimigrasi (Docker/Service/Files/Editor) tetap dilayani handler `html/template` lama,
  diputuskan per-path di `router.go`.
- Halaman lama `login.html`/`dashboard.html` + handler-nya (`handleLoginPage`,
  `handleLoginSubmit`, `handleDashboard`) + `dashboard.js` dihapus di PR yang sama (bukan
  dibiarkan jadi dead code) — digantikan `LoginView.vue`/`DashboardView.vue`.
- Dashboard: 4 gauge (CPU/RAM/Disk/Suhu, ECharts) + 2 grafik garis (CPU & Disk I/O, 15 menit
  terakhir) + panel detail penyimpanan & jaringan — semua data lewat SSE
  (`/api/stream/metrics`) dan `/api/metrics/history` yang **sudah ada sejak Fase 1**, tidak
  ada endpoint metrics baru yang perlu dibuat untuk fase ini.
- Sidebar `AppShell.vue`: link ke Docker/Service/Files masih `<a href>` biasa (full page load
  ke halaman lama), bukan `router-link` — sampai giliran masing-masing dimigrasi.
- **Checkpoint tercapai — divalidasi dengan headless browser (Puppeteer + Chromium)**: login →
  redirect ke dashboard, gauge/chart ter-render (6 elemen `<canvas>` ECharts), data live dari
  SSE, logout (POST ber-CSRF, dipanggil dari Vue via `fetch`) berhasil & `GET
  /api/auth/session` balik `{authenticated:false}`, navigasi ke halaman lama (`/docker`) lewat
  sidebar tetap berfungsi seperti sebelum pivot.
- **Belum**: migrasi Docker/Service/Files/Editor ke Vue (fase berikutnya, satu per PR sesuai
  pola kerja proyek ini), threshold warna gauge per-metric via `config.yaml` (saat ini default
  `[0.7, 0.85]` tetap di komponen, bukan dibaca dari config seperti rencana awal — lihat
  [06-api-ui-ux.md](06-api-ui-ux.md) §6.5).

### B — Migrasi Docker (selesai-dev; validasi STB fisik tertunda)

- Endpoint JSON baru menggantikan seluruh fragment htmx Docker: `GET /api/docker/{containers,
  images,volumes,networks,settings}`, `POST /api/docker/containers/{id}/{action}`,
  `POST /api/docker/{images,volumes,networks}/.../remove`, `POST /api/docker/prune/{kind}` —
  lihat [06-api-ui-ux.md](06-api-ui-ux.md) §6.1. Semua struct publik di `internal/docker/`
  (`Container`, `Image`, `Network`, `Volume`, `Info`, `DiskUsage`, `ContainerStats`) dapat
  json tag camelCase eksplisit (sebelumnya tidak perlu — cuma dipakai lewat akses field Go
  langsung di template lama).
- Degradasi graceful dipertahankan identik: response `503 {error, enabled}` membedakan
  "off di config" vs "on tapi unreachable", sama seperti pesan `error_panel.html` versi htmx
  — cuma bentuknya sekarang JSON terstruktur, bukan teks pesan yang perlu di-parse.
- `DockerView.vue`: 5 tab (Naive UI `NTabs`), masing-masing **lazy-load** — data tab baru
  di-fetch pertama kali diaktifkan, bukan semua sekaligus di page load. Tab Containers
  auto-refresh tiap 5 detik selama tab itu aktif (sama seperti `hx-trigger="every 5s"` versi
  lama). Aksi (start/stop/restart/remove/prune) pakai `NPopconfirm` untuk konfirmasi
  destruktif, error dari daemon Docker (mis. 409 "masih dipakai") ditampilkan lewat toast
  (`useMessage()`), bukan flash-panel seperti sebelumnya.
- Docker/Service/Files sekarang campuran nav: Docker jadi `RouterLink` di `AppShell.vue`,
  Service/Files masih `<a href>` biasa (full page load) sampai gilirannya masing-masing.
- **Bug nyata ditemukan & diperbaiki lewat testing browser** (bukan dari `npm run build`,
  yang sukses tanpa keluhan): kolom tabel Containers tanpa lebar tetap membuat satu container
  dengan 100+ published port meng-crush kolom Nama jadi selebar satu karakter (teks jadi
  vertikal, tidak terbaca) — diperbaiki dengan lebar tetap per kolom + `ellipsis: {tooltip}`
  untuk kolom Ports + `scroll-x` pada tabel, kolom Aksi di-pin (`fixed: 'right'`). Terpisah,
  tab Settings sempat menampilkan panel kosong (field Info Daemon blank) alih-alih spinner
  saat data masih di-fetch — bukan bug data (endpoint-nya benar, cuma butuh beberapa detik
  karena `/system/df` Docker sendiri lambat dengan banyak image/container), tapi UI-nya salah
  menampilkan "kosong" bukan "sedang memuat"; ditambahkan state loading eksplisit.
- **Checkpoint tercapai — divalidasi dengan headless browser (Puppeteer + Chromium) terhadap
  Docker sungguhan** (bukan mock): 51 container nyata ter-render dengan benar di tab
  Containers, ke-4 tab lain (Images/Volumes/Networks/Settings) berhasil lazy-load datanya
  masing-masing (termasuk Settings yang butuh beberapa detik untuk `/system/df`), dan path
  degradasi "Docker off di config" diverifikasi terpisah lewat instance kedua dengan
  `docker.enabled: false` → response `503 {error:"...", enabled:false}` sesuai desain. Aksi
  destruktif (start/stop/remove/prune) **tidak** diuji lewat browser otomatis terhadap
  instance ini karena container-nya nyata/produksi milik user — hanya diverifikasi lewat
  pembacaan kode/logika yang identik dengan versi htmx yang sudah terbukti jalan sebelumnya.

### C — Migrasi Service (selesai-dev; validasi STB fisik tertunda)

- Endpoint JSON baru menggantikan fragment htmx Service: `GET /api/services/list?q=&showAll=
  &failedOnly=`, `POST /api/services/{name}/{action}`, `GET /api/services/{name}/logs` — lihat
  [06-api-ui-ux.md](06-api-ui-ux.md) §6.1. `systemd.Unit` dapat json tag camelCase eksplisit,
  sama seperti struct `internal/docker/*` di sub-fase B.
- **Perbaikan kecil dibanding versi htmx**: aksi start/stop/restart/reload sekarang
  mempertahankan filter yang sedang aktif di hasil refresh-nya (request POST membawa
  `?q=&showAll=&failedOnly=` yang sama dengan state klien saat itu) — versi htmx lama sengaja
  reset ke filter kosong setelah aksi ("simplifikasi yang disengaja, bukan bug", dicatat di
  §6.1 versi sebelumnya). Di Vue ini nyaris gratis karena klien sudah menyimpan state filter
  di memori, jadi tidak ada alasan mempertahankan keterbatasan lama.
- `ServiceView.vue`: filter (pencarian nama/deskripsi lewat Enter/blur — bukan tiap keystroke,
  supaya tidak membanjiri exec `systemctl` tiap ketikan; checkbox showAll/failedOnly langsung
  trigger), tabel unit auto-refresh tiap 8 detik (sama seperti `hx-trigger="every 8s"` versi
  lama) mempertahankan filter aktif, badge "terproteksi" untuk unit di `systemd.protectedUnits`
  dengan pesan konfirmasi (`NPopconfirm`) yang lebih tegas. Log ditampilkan lewat `NDrawer`
  (panel slide-in) alih-alih panel inline di bawah halaman seperti sebelumnya.
- **Checkpoint tercapai — divalidasi dengan headless browser (Puppeteer + Chromium) terhadap
  systemd sungguhan** (175 unit nyata di dev machine, termasuk unit CasaOS yang masih
  terpasang — proyek yang justru digantikan TarOS): navigasi via sidebar `RouterLink`,
  pencarian filter bekerja benar (termasuk badge "terproteksi" muncul untuk `ssh.service`),
  checkbox showAll benar memperluas hasil (5→175 unit), dan drawer log berhasil menampilkan
  isi `journalctl` sungguhan (~4.8KB teks) untuk sebuah unit nyata. Aksi mutasi
  (start/stop/restart/reload) **tidak** diuji lewat browser otomatis terhadap instance ini
  karena unit-nya nyata/produksi (termasuk `ssh.service`, `docker.service`) — hanya
  diverifikasi lewat pembacaan kode, identik logikanya dengan versi htmx yang sudah terbukti
  jalan.

### D — Migrasi Files (selesai-dev; validasi STB fisik tertunda)

**Diskusi sebelum implementasi**: sempat dipertimbangkan pakai library file-manager Vue
pihak ketiga (VueFinder — 596★, MIT, paling matang di ekosistemnya) alih-alih membangun
sendiri. Diputuskan **tidak** — kontrak API VueFinder (`list/upload/rename/delete/copy/move/
...`) murni request-response sinkron, tanpa mekanisme progress/streaming, dan tidak ada
backend Go resmi. Itu bentrok langsung dengan alasan utama fitur ini ada (lihat
[01-overview.md](01-overview.md)): job queue + SSE progress + cancellation untuk copy/move
file besar, dibangun langsung merespons CasaOS yang dulu nge-hang di Raspberry Pi user saat
copy file besar. Keputusan: bangun sendiri pakai Naive UI (konsisten dengan halaman lain),
contek ide UI/UX dari VueFinder (grid rapi, drag&drop, breadcrumb) tanpa depend ke library-nya.

- Sebagian besar endpoint **sudah** JSON sejak awal (`POST /api/files/op`, `.../op/{id}/stream`,
  `.../op/{id}/cancel`, `/api/files/upload`, `/api/files/download`) — cuma listing
  (`GET /api/files/list`, gantikan `/fragments/files/list`) yang perlu dikonversi. Halaman
  Editor (`/files/edit`) **tidak disentuh** — masih SSR, migrasinya sendiri di fase berikutnya.
  `fileexplorer.Entry` dapat json tag camelCase eksplisit, sama seperti fase-fase sebelumnya.
- `web/templates/fragments/` sekarang **kosong total** dan dihapus dari repo (git tidak bisa
  melacak direktori kosong) — dikonfirmasi lewat build+run manual bahwa `//go:embed templates`
  & `fs.Glob` di `templates.go` tetap aman terhadap direktori yang tidak ada sama sekali.
  `error_panel.html` juga dihapus — sudah tidak dipakai handler manapun sejak Docker & Service
  pindah ke JSON.
- `FilesView.vue`: breadcrumb, tabel (Naive UI `NDataTable` dengan seleksi bawaan), toolbar
  (cari, folder/file baru, upload, tempel), selection bar (salin/potong/hapus massal —
  sekuensial, bukan paralel, sengaja sama seperti versi lama), modal prompt tunggal yang
  dipakai ulang untuk folder baru/file baru/rename (bukan tiga modal terpisah). Upload lewat
  `<NUpload>` (progress & daftar file per-item gratis dari library, satu request per file —
  beda dari versi lama yang mengirim semua file terpilih dalam satu request batch). **Drag &
  drop ditambahkan** — fitur yang sudah lama didokumentasikan sebagai rencana
  ([04-features.md](04-features.md) §4.4) tapi tidak pernah benar-benar dibangun di versi htmx.
- Panel progress job (paste file besar) tetap custom (SSE, bukan lewat `NUpload` yang cuma
  urusan upload) — kartu mengambang kanan-bawah dengan progress bar, kecepatan transfer,
  nama file berjalan, tombol Batalkan — inti fitur yang paling penting di halaman ini.
- **Bug nyata ditemukan & diperbaiki lewat testing browser**: navigasi ke sub-folder
  membangun path anak dari `route.query.path` mentah (kosong di load pertama, karena path
  absolut root jail belum diketahui sisi klien) alih-alih path absolut yang dikembalikan
  server — akibatnya klik folder mengirim path tidak valid, `Jail.Resolve` menolaknya, dan
  listing lama tetap tertampil diam-diam (kelihatan seperti "tidak terjadi apa-apa", bukan
  error yang jelas). Diperbaiki dengan `resolvedPath` terpisah dari `route.query.path`, dipakai
  untuk semua konstruksi path anak; URL juga dinormalisasi ke path absolut setelah load pertama
  supaya tetap bisa dibagikan/bookmark seperti perilaku `hx-push-url` versi lama.
- **Checkpoint tercapai — divalidasi dengan headless browser (Puppeteer + Chromium) terhadap
  sandbox aman** (bukan filesystem nyata — `fileExplorer.rootDir` diarahkan ke direktori temp
  khusus test, termasuk file 80MB untuk menguji job besar sungguhan): navigasi masuk/keluar
  folder & breadcrumb, pencarian, buat folder/file, ganti nama, hapus (dengan konfirmasi),
  salin+tempel file kecil, dan **salin+tempel file 80MB dengan progress SSE nyata** (26%→100%,
  kecepatan transfer ~1.2GB/s lokal, nama file berjalan, tombol batal) — inti reliability yang
  jadi alasan fitur ini dibangun, terbukti tetap utuh setelah migrasi ke Vue.
- **Belum**: context menu klik-kanan (row buttons + selection bar sudah cover semua aksi,
  diputuskan cukup untuk saat ini — lihat diskusi scope sebelum implementasi).

### E — Migrasi Editor (selesai-dev; validasi STB fisik tertunda) — halaman terakhir

- CodeMirror 6 pindah dari pipeline `esbuild` terpisah (`scripts/codemirror-build/`, sekarang
  dihapus) jadi dependency npm biasa di `web/frontend/package.json` — `src/editor/codemirror.ts`
  adalah port hampir verbatim dari `editor-entry.js` lama, bedanya: tanpa `window.TkEditor`
  global (diimpor langsung sebagai ES module oleh `EditorView.vue`), dan `Compartment`
  (word-wrap/tema) dipindah dari module-level jadi per-instance di dalam `createEditor()` —
  lebih aman untuk konteks SPA di mana komponen bisa mount/unmount berkali-kali per page
  lifetime, beda dari versi vanilla-JS lama yang selalu cuma satu instance per full page load.
- Endpoint `/api/files/content` (GET/PUT) **sudah** JSON sejak awal — tidak ada perubahan
  backend untuk isi file, cuma `GET /files/edit` yang pindah dari handler `html/template`
  (`handleEditorPage`, dihapus) ke `serveSPA`.
- `EditorView.vue`: fetch isi file, mount CodeMirror, dirty tracking + draft autosave ke
  `localStorage` (debounce 3 detik, key `tk-draft:<path>` — persis format lama), prompt restore
  draft & prompt konflik simpan (409) keduanya lewat `useDialog()` (Naive UI) — bukan lagi
  `window.confirm()` browser native seperti versi vanilla JS. `beforeunload` guard native tetap
  dipakai (tidak ada API Vue untuk ini). Tombol "Kembali" ke Files sekarang benar-benar
  menghitung direktori induk dari path file (`filePath.split('/').slice(0,-1)`) — versi lama
  mengirim path FILE itu sendiri sebagai query `path=` ke halaman Files, yang kemungkinan besar
  sudah salah/tidak konsisten dengan cara Files me-resolve direktori.
- **Pembersihan besar menyertai fase ini** — karena Editor adalah halaman `html/template`
  terakhir, seluruh subsistem SSR/htmx yang sudah tidak dipakai dihapus total di PR yang sama,
  bukan dibiarkan sebagai dead code "jaga-jaga": `internal/web/templates.go`, `internal/web/
  funcs.go`, `web/templates/` (termasuk `layout.html`), `web/static/` (`app.css`, CSS/JS
  vendor htmx & uPlot), var `Templates`/`Static` di `web/embed.go`, dan route `GET /static/`.
  `web.NewServer` disederhanakan (tidak lagi return error). `handleLogout` disederhanakan jadi
  JSON `{ok:true}` (sebelumnya redirect, perlu dipertahankan selama masih dipanggil dari
  `<form>` di halaman htmx — sudah tidak relevan begitu semua halaman Vue).
- **Bug nyata ditemukan & diperbaiki lewat testing browser** (`go build`/`npm run build`
  sama-sama sukses tanpa keluhan): editor tidak pernah mount — `mountEl.value` (ref div
  container) diakses tepat setelah `loading.value = false` dalam tick sinkron yang sama,
  padahal render ulang Vue untuk cabang `v-else` (tempat elemen itu benar-benar ada di DOM)
  belum flush. Diperbaiki dengan `await nextTick()` sebelum mengakses `mountEl.value` — pelajaran
  umum untuk pola serupa di komponen Vue lain: ref ke elemen yang baru muncul lewat perubahan
  kondisi render butuh `nextTick()`, tidak bisa diasumsikan langsung tersedia.
- **Checkpoint tercapai — divalidasi dengan headless browser (Puppeteer + Chromium)**: mount
  editor + syntax highlighting sungguhan (diverifikasi lewat `getComputedStyle`, warna berbeda
  per jenis token, bukan cuma keberadaan elemen), lint JSON (marker muncul setelah debounce
  ~1 detik CodeMirror, awalnya sempat terlihat seperti bug sampai ditunggu lebih lama), simpan
  via Ctrl+S & tombol, **konflik simpan (409) dengan dialog Timpa/Muat-ulang berfungsi penuh**,
  **draft autosave + prompt restore setelah reload tanpa simpan berfungsi penuh** (dua alur
  paling kritis untuk mencegah kehilangan data tidak sengaja). Ukuran chunk `EditorView` hasil
  build: **~674KB minified / ~230KB gzip** — hampir identik dengan bundle esbuild lama
  (~677KB/~225KB gzip), jadi pivot ke Vue tidak menambah bobot CodeMirror, dan chunk ini
  di-*lazy-load* oleh `vue-router` hanya saat `/files/edit` dibuka.

## Fase UI/UX — Selesai

Semua halaman (Dashboard, Docker, Service, Files, Editor) sudah Vue. Tidak ada lagi kode
`html/template`/htmx yang tersisa di backend — lihat riwayat penghapusannya di Fase E §E di
atas. Validasi STB fisik B860H untuk seluruh Fase UI/UX ini (A–E) masih tertunda seperti setiap
fase sebelumnya di proyek ini (tidak ada akses hardware langsung).

**Fase 4 (Web Terminal) dilanjutkan** — hold-nya khusus menunggu Fase UI/UX selesai, dan itu
sudah tercapai di atas.

## Fase 4 — Web Terminal (selesai-rilis — tervalidasi di STB fisik, lihat catatan bug/fix di bagian bawah roadmap ini)

- `internal/terminal/`: `pty.go` (`spawnPTY`/`resizePTY` lewat `creack/pty`, shell diambil
  eksplisit dari `terminal.shell` di config — **tidak** bergantung shell akun `taros` di
  `/etc/passwd`, yang memang `nologin`), `session.go` (`Session` — baca/tulis PTY, tracking
  `lastInput` buat idle timeout, `Close()` idempoten yang mematikan **seluruh process group**
  lewat `syscall.Kill(-pid, SIGKILL)`, bukan cuma proses shell-nya — supaya command foreground
  yang sedang jalan di dalam sesi ikut ke-cleanup, tidak jadi proses menggantung), `manager.go`
  (`Manager` — batas sesi konkuren dengan counter+mutex, `ErrTooManySessions`, watcher idle
  per-sesi tick 30 detik).
- `internal/web/ws_terminal.go`: `GET /api/terminal/status` (selalu terdaftar, supaya frontend
  bisa tampilkan status "tidak aktif" yang jelas alih-alih percobaan koneksi yang gagal
  membingungkan) dan `GET /api/terminal/ws` (**hanya terdaftar kalau `terminal.enabled: true`**
  — dicek di `internal/web/router.go`, bukan diberi flag runtime di dalam handler-nya sendiri,
  supaya benar-benar hilang dari routing sesuai [07-security.md](07-security.md) §7.6, bukan
  cuma disembunyikan). Proteksi CSWSH didapat gratis dari `websocket.Accept(w, r, nil)` milik
  `nhooyr.io/websocket` — opsi default library ini sudah melakukan validasi same-origin ketat
  tanpa perlu kode Origin-checking manual (dikonfirmasi lewat baca source library-nya langsung).
  Protokol wire kustom: frame biner = byte mentah PTY (stdin/stdout), frame teks = JSON kontrol
  `{"type":"resize","cols":N,"rows":N}` — dipisah supaya hot path (tiap keystroke/output) tidak
  kena overhead marshal JSON.
- Integrasi xterm.js (`@xterm/xterm` + `@xterm/addon-fit`) di `TerminalView.vue`: resize lewat
  `ResizeObserver` + `FitAddon`, tema dark/light live-reassignable (pola sama seperti editor
  CodeMirror di Fase 3c), status koneksi (menghubungkan/terhubung/berakhir/error) dengan
  tombol "Sesi Baru" untuk reconnect manual.
- Toggle `terminal.enabled` (default **false** — fitur berisiko tertinggi di aplikasi ini,
  sengaja opt-in eksplisit bukan default aktif) + banner peringatan first-use di UI (dismiss
  tersimpan di `localStorage`, muncul lagi kalau di-clear). Link sidebar "Terminal" cuma
  muncul kalau `terminal.enabled === true` (dicek lewat store Pinia `stores/terminal.ts`
  yang meng-cache hasil `/api/terminal/status`, karena `AppShell.vue` di-mount ulang tiap
  pindah halaman, bukan layout persisten).
- Mode sudo opsional (lihat [09-deployment.md](09-deployment.md) §9.2 &
  [07-security.md](07-security.md) §7.6) sepenuhnya konfigurasi OS-level (`sudoers`), tidak
  ada titik integrasi khusus di kode — shell yang di-spawn adalah shell login biasa, `sudo`
  di dalamnya berperilaku identik dengan sesi SSH/TTY normal. Dicek ulang instruksi instalasi
  di §9.2 (tiga mode: tanpa sudoers, password, NOPASSWD) masih akurat terhadap implementasi —
  tidak ada perubahan dibutuhkan.
- **Catatan sandbox development**: `Setpgid: true` (dibutuhkan supaya `Session.Close()` bisa
  membunuh seluruh process group, bukan cuma shell-nya) sempat gagal di lingkungan sandbox
  agent development ("operation not permitted") — dikonfirmasi lewat reproduksi terisolasi
  bahwa ini pembatasan syscall spesifik sandbox tsb, bukan bug aplikasi (unit systemd
  `deploy/systemd/taros.service` tidak punya `SystemCallFilter=` seccomp, dan `setpgid`
  adalah syscall biasa yang dipakai shell sendiri untuk job control), jadi tidak diharapkan
  memengaruhi target deployment nyata. Kode final tetap `Setpgid: true`.
- **Checkpoint tercapai — divalidasi dengan headless browser (Puppeteer) untuk alur utama, dan
  klien WebSocket mentah (Node.js, paket `ws`) untuk pengujian keamanan presisi**:
  - Alur utama: login → klik nav Terminal → banner peringatan tampil → xterm mount → status
    "Terhubung" → command sungguhan (`echo`, `ls`, `whoami`) jalan dan outputnya benar,
    termasuk konfirmasi proses berjalan sebagai user unprivileged (`tarkiman`), bukan root.
  - **Origin salah ditolak**: percobaan WS handshake dengan header `Origin` beda domain →
    HTTP 403 (perilaku default `websocket.Accept`, bukan kode custom).
  - **Limit sesi konkuren berfungsi**: dengan `maxConcurrentSessions: 1`, koneksi kedua saat
    sesi pertama masih aktif → HTTP 503 (`ErrTooManySessions`); setelah sesi pertama ditutup,
    slot terbuka lagi dan koneksi baru berhasil.
  - **Cleanup proses saat disconnect terkonfirmasi**: jumlah proses `bash` yang match sebelum
    vs sesudah `ws.close()` turun tepat 1 — tidak ada proses menggantung.
  - **Idle timeout berfungsi**: dengan `idleTimeoutMin: 1` (dipercepat untuk testing), sesi
    tanpa input ditutup otomatis persis ~60 detik kemudian.
  - **Toggle disable terverifikasi di instance terpisah** (`terminal.enabled: false`):
    `GET /api/terminal/status` mengembalikan `{"enabled":false}`, dan percobaan WS handshake
    ke `/api/terminal/ws` mengembalikan **404** (bukan 403/lain) — mengonfirmasi route memang
    tidak terdaftar sama sekali, bukan cuma ditolak di dalam handler.

## Fase 5 — Visualisasi & Optimasi & Polish

- ~~Komponen gauge/dial untuk CPU/RAM/Disk/Suhu~~ — sudah dikerjakan lebih awal di
  "Fase UI/UX — Pivot ke Vue" di atas (bentuk akhirnya ECharts, bukan SVG hand-rolled seperti
  rencana awal dokumen ini).
- Migrasi halaman Docker/Service/Files/Editor yang tersisa ke Vue (lanjutan "Fase UI/UX" di
  atas), kalau belum semua selesai sebelum masuk fase ini.
- Migrasi `systemd/` dari exec `systemctl` ke D-Bus (`go-systemd/dbus`) untuk efisiensi.
- Polkit rules untuk kontrol systemd tanpa root penuh.
- Audit logging lengkap (semua aksi state-changing, termasuk sesi terminal).
- Rate limiting login, hardening session.
- Profiling memory & CPU di STB (target [09-deployment.md](09-deployment.md) §9.4 tercapai
  di kondisi realistis: Docker + beberapa container jalan bersamaan + sesi terminal aktif).

### UI polish (selesai-dev; validasi STB fisik tertunda)

- **Toggle tema manual** (Sistem → Terang → Gelap, siklus lewat satu tombol di topbar):
  `composables/useTheme.ts` menggantikan `usePrefersDark.ts` lama — state `mode` (`system`/
  `light`/`dark`) disimpan module-level (bukan per-komponen) supaya semua konsumen (App.vue,
  GaugeChart, LineChart, TerminalView, EditorView) berbagi satu sumber kebenaran, persisten
  di `localStorage` (`tk-theme-mode`, dihapus lagi kalau kembali ke "system"). `tokens.css`
  pindah dari `@media (prefers-color-scheme: light)` ke selector `:root[data-theme="light"]`
  supaya bisa di-override manual (media query murni tidak bisa dilawan dari JS) — `data-theme`
  di-set oleh script kecil **blocking** di `index.html` sebelum render pertama (baca
  `localStorage` + `matchMedia` secara sinkron) untuk menghindari flash tema salah saat load,
  lalu disinkronkan lagi oleh `useTheme.ts` setelah Vue jalan.
- **Sidebar auto-collapse di viewport sempit** (`AppShell.vue`, breakpoint 768px): default
  collapsed di HP, tetap bisa di-toggle manual (memakai collapse bawaan `NLayoutSider`,
  bukan pola hamburger/drawer terpisah seperti draft awal [06-api-ui-ux.md](06-api-ui-ux.md)
  §6.2 — dipilih karena sudah tersedia siap pakai dari Naive UI dan secara fungsional
  menyelesaikan masalah yang sama). Nav item icon-only saat collapsed dapat `aria-label`.
  Teks "Keluar" di tombol logout disembunyikan di layar sempit (ikon tetap ada + `aria-label`).
- **Bug nyata ditemukan & diperbaiki lewat testing headless browser di viewport mobile**:
  kolom `NDataTable` dengan `fixed: 'right'` (dipakai di kolom Aksi lebar di Files/Service/
  Docker) ternyata membuat kolom itu di-overlay di atas area scroll tabel — di desktop tidak
  kelihatan efeknya (tabel sudah cukup lebar, tidak pernah butuh scroll), tapi di viewport HP
  kolom Aksi yang lebar (190-260px) menutupi hampir seluruh area tabel yang sempit, membuat
  kolom **Nama** (kolom paling penting) sama sekali tidak terlihat tanpa scroll manual —
  padahal datanya ada, cuma tertutup. Diperbaiki dengan menghapus `fixed: 'right'` dari semua
  6 kolom Aksi (Files, Service, Docker×4) — karena `scroll-x` di desktop pada praktiknya tidak
  pernah trigger (kontennya selalu muat), `fixed: 'right'` di sana adalah no-op, jadi
  menghapusnya nol dampak ke desktop dan memperbaiki mobile sepenuhnya. Juga ditambahkan
  `minWidth` eksplisit ke kolom-kolom `ellipsis`-only tanpa `width` (kolom Nama di Files,
  Deskripsi di Service, Tag/Nama di Docker images/volumes/networks) — tanpa ini kolom
  fleksibel bisa collapse ke lebar sangat kecil di bawah `scroll-x`.
  Tabel Docker Images/Volumes/Networks yang sebelumnya sama sekali tidak punya `scroll-x`
  (beda dari tabel Containers yang sudah punya) juga disamakan — sebelumnya berpotensi
  overflow halaman di viewport sempit alih-alih scroll rapi di dalam tabel.
- **Aksesibilitas dasar**: `aria-label`/`title` pada tombol icon-only (unduh/ganti nama/hapus
  di Files; toggle tema, item nav sidebar saat collapsed, logout di AppShell) — tombol dengan
  teks yang sudah terlihat (mayoritas tombol aksi Docker/Service/Editor) tidak disentuh, sudah
  cukup deskriptif dari teksnya sendiri. Toast notification (`useMessage()`) dan loading state
  (`:loading`/`NSpin`) untuk hampir semua aksi ternyata **sudah** diimplementasi konsisten
  sejak fase-fase migrasi Vue sebelumnya (Docker/Service/Files/Editor) — bukan item baru di
  fase ini, cuma diverifikasi ulang di sini.
- **Checkpoint tercapai — divalidasi dengan headless browser (Puppeteer) di viewport desktop
  (1280px) dan mobile (375px), tema terang & gelap**: tidak ada horizontal overflow di
  level dokumen pada halaman manapun di kedua viewport (sebelum fase ini belum pernah
  diuji eksplisit di lebar mobile); siklus toggle tema (sistem→terang→gelap→sistem) sesuai
  ekspektasi termasuk `localStorage` (kosong di mode "system", terisi di mode eksplisit);
  pilihan tema eksplisit bertahan setelah reload penuh tanpa flash; tema CodeMirror (Editor)
  ikut berganti sinkron dengan toggle global, bukan cuma komponen Naive UI/ECharts.

### Rebrand ke TarOS + tema "Malam Jaga" (selesai-dev; validasi STB fisik tertunda)

- **Rename TarkimanOS → TarOS**, teknis penuh, bukan cuma kosmetik UI: binary/CLI (`cmd/
  tarkimanos/` → `cmd/taros/`), unit systemd (`tarkimanos.service` → `taros.service`, default
  `User=`/`Group=` ikut jadi `taros`), path config (`/etc/tarkimanos/` → `/etc/taros/`),
  nama cookie sesi (`tarkimanos_session` → `taros_session` — sesi lama otomatis tidak valid,
  cukup login ulang, bukan kehilangan data), file probe write-check filesystem, entri
  `ProtectedUnits` default (supaya proteksi self-service tetap cocok dengan nama unit baru).
  **Sengaja tidak diubah saat itu**: module path Go (`github.com/tarkiman/tarkiman-os`) dan
  nama repo GitHub — mengubah itu berarti rename repo GitHub itu sendiri, tindakan terpisah
  yang lebih berisiko dan waktu itu tidak diminta. Lihat [[project-taros-motivation]] (memori)
  untuk konteks keputusan nama. (Repo GitHub & module path menyusul di-rename belakangan,
  lihat entri "Rename repo GitHub + module path Go" di bawah.)
- **Tema visual baru "Malam Jaga"**: kanvas gelap dengan tiga "blob" cahaya (biru/ungu/teal)
  yang blur besar dan bergerak pelan di belakang seluruh app (`AppShell.vue` dan `LoginView.vue`
  masing-masing me-mount `.app-backdrop` sendiri, karena keduanya bukan child dari layout yang
  sama), lalu kartu-kartu di atasnya jadi kaca buram (`backdrop-filter: blur`). Diterapkan
  **app-wide lewat satu titik**, bukan halaman per halaman: `theme.ts` mengarahkan token warna
  `Card`/`Layout` Naive UI ke token `glass`/`glassBorder` (mekanisme theming resmi Naive UI),
  dan `tokens.css` menambahkan `backdrop-filter` lewat rule global `.n-card`/`.n-layout-sider`/
  dst (properti yang tidak dikontrol Naive UI sendiri, jadi tidak ada konflik cascade). Efeknya:
  Docker/Service/Files halaman ikut jadi glass **otomatis tanpa disentuh sama sekali** — cuma
  Dashboard & Login yang butuh perubahan langsung (backdrop blob-nya, karena itu elemen baru,
  bukan styling ulang yang sudah ada). `prefers-reduced-motion` mematikan animasi drift blob.
- **Dashboard dirombak jadi widget lux**, terinspirasi tampilan dashboard CasaOS tapi
  benar-benar dari data TarOS sendiri, bukan tiruan tampilannya: jam+tanggal live, banner
  kesehatan (gabungan status Docker + jumlah unit systemd gagal, keduanya real, masing-masing
  disembunyikan dengan tenang kalau subsistemnya nonaktif/tidak tersedia — tidak ada
  peringatan palsu), kartu "Ringkasan Sistem" (4 gauge CPU/RAM/Disk/Suhu yang sudah ada,
  dikumpulkan jadi satu kartu + strip I/O ringkas), **"Container Teratas"** (5 container
  dengan CPU tertinggi, dari `dockerApi.containers()` yang sudah ada — pengganti "top
  processes" ala CasaOS yang jujur: TarOS tidak mengumpulkan data proses OS per-proses, jadi
  dipakai data yang benar-benar ada dan malah lebih relevan untuk STB yang isinya container),
  kartu ringkasan Docker (running/total), dan baris "Akses Cepat" ke 5 halaman asli (Dashboard/
  Docker/Service/Files/Terminal-kalau-aktif) — bukan app-launcher generik seperti CasaOS,
  karena TarOS sudah punya sidebar navigasi sendiri. Grafik riwayat CPU/Disk I/O dan tabel
  detail Penyimpanan/Jaringan yang sudah ada **dipertahankan penuh**, cuma dipindah ke bawah
  widget baru — tidak ada kapabilitas lama yang dibuang untuk redesign ini.
- **Bug nyata ditemukan & diperbaiki lewat review screenshot** (bukan lewat kode yang diubah
  langsung — bug ini sudah ada sebelum fase ini, baru kelihatan setelah dashboard dirombak
  dan datanya diperiksa visual): grafik "Disk I/O — 15 menit terakhir" menampilkan skala Y
  rusak (`25000000 MB/s`) karena riwayat awal (`fetchHistory`) memuat nilai mentah bytes/detik
  langsung tanpa konversi, sementara data live susulan (`pushPoint` dari SSE) membaginya
  dengan 1024×1024 dulu — dua sumber data yang sama-sama masuk satu chart dengan skala
  berbeda jauh. Diperbaiki dengan menambah parameter `scale` di `toPoints()` dan memakainya
  konsisten untuk kedua sumber.
- **Catatan proses development berulang di fase ini**: beberapa kali pengujian sempat
  menampilkan hasil basi (perubahan kode sudah di-build tapi browser masih menunjukkan
  versi lama) karena `pkill -f "<path>/taros"` tidak match proses yang dijalankan lewat path
  relatif (`./taros`, argv-nya cuma berisi `./taros`, bukan path lengkap) — proses lama tidak
  benar-benar mati, proses baru gagal bind port, dan yang lama tetap melayani. Diperbaiki
  dengan mematikan proses via PID eksak dan **selalu verifikasi hash asset yang di-serve
  cocok dengan file di `dist/` sebelum mempercayai hasil screenshot** — pelajaran untuk sesi
  testing berikutnya yang pakai pola serupa (build ulang → restart proses lokal → screenshot).
- **Checkpoint tercapai — divalidasi dengan headless browser di seluruh halaman (Dashboard,
  Docker, Service, Files, Terminal, Login), viewport desktop & mobile, tema gelap & terang**:
  data Dashboard sepenuhnya nyata (container/unit systemd sungguhan dari mesin dev, bukan
  contoh), backdrop blob tampil konsisten di semua halaman termasuk Login (sempat luput di
  percobaan pertama karena `LoginView.vue` tidak memakai `AppShell`, jadi butuh `.app-backdrop`
  sendiri), tidak ada console error baru (satu-satunya error yang muncul adalah keterbatasan
  `setpgid` sandbox development dari Fase 4, sudah didokumentasikan di sana, tidak terkait
  fase ini).

### Sidebar dihilangkan, navigasi topbar-only

Follow-up cepat dari feedback langsung setelah tema baru dicoba: sidebar kiri (`NLayoutSider`)
dihapus total — link nav (Dashboard/Docker/Service/Files/Terminal) pindah ke topbar, collapse
jadi ikon-saja di bawah 768px. Ditambah kredit footer kecil ("TarOS — dibuat oleh Tarkiman") di
bawah setiap halaman, dan perbaikan bug layout nyata: grid dua kolom Dashboard sempat
meninggalkan celah kosong di bawah kartu "Ringkasan Sistem" kalau kolom sebelahnya (Container
Teratas + Docker) lebih tinggi — `align-items: start` di CSS grid diganti default (`stretch`)
supaya kartu yang lebih pendek ikut memenuhi baris alih-alih menyisakan lubang.

### Monitoring proses OS + widget "Pemakai Teratas" yang bisa disortir (selesai-dev)

Perluasan nyata dari sekadar reskin: sekarang ada **monitoring proses level sistem operasi**
sungguhan, bukan cuma statistik per-container yang sudah ada sejak Fase 2a.

- `internal/collector/proc.go` (baru): baca `/proc/[pid]/stat` (nama proses + `utime`/`stime`
  untuk CPU% berbasis delta antar-tick, pola sama seperti CPU total system-wide di
  `cpu.go`) dan `/proc/[pid]/status` (`VmRSS` untuk RAM) — **langsung**, bukan lewat
  `gopsutil`, konsisten dengan keputusan arsitektur yang sudah ada
  ([03-tech-stack.md](03-tech-stack.md) "Kenapa tidak gopsutil?"). Dijalankan di ticker
  terpisah (`Intervals.Proc`, default 5 detik — lebih jarang dari `CPUMemNet` karena baca
  ratusan PID×2-file jauh lebih berat dari satu `/proc/stat` agregat) dan hasilnya disimpan
  di `store.Store` lewat method baru `SetProcesses`/`Processes()` — **terpisah dari
  `Snapshot`/SSE**, karena data ini jauh lebih besar dan tidak semua klien SSE sedang
  membuka widget-nya; membebani setiap tick broadcast dengan data yang sering tidak
  terpakai tidak sepadan di perangkat 2GB RAM.
- Endpoint baru `GET /api/processes?sortBy=cpu|mem&limit=N` — sorting & pemotongan jumlah
  terjadi di server, bukan kirim semua proses ke client lalu sort di sana.
- **Widget "Pemakai Teratas"** (Dashboard, gantinya "Container Teratas"): tab **Container**
  (data yang sudah ada) vs **Proses** (data baru di atas), dan gauge **CPU**/**RAM** di kartu
  "Ringkasan Sistem" sekarang bisa **diklik** untuk menentukan urutan widget — berlaku ke
  kedua tab sekaligus. Refresh proses cuma jalan (polling 5 detik) selagi tab "Proses" aktif,
  berhenti otomatis begitu pindah tab/halaman — tidak ada alasan menghantam endpoint di
  belakang layar kalau tidak ada yang melihatnya.
- **Verifikasi nyata lewat curl + headless browser**: endpoint `/api/processes` diuji
  langsung di mesin dev dan benar-benar menampilkan proses sungguhan (termasuk proses
  Chromium milik skrip pengujian headless itu sendiri, `dockerd`, `containerd`, `systemd`,
  dll) dengan CPU%/RAM yang masuk akal dan berubah antar sampling; klik gauge CPU→RAM dan
  tab Container↔Proses di headless browser terkonfirmasi mengubah data & urutan yang
  ditampilkan sesuai ekspektasi, sort tetap terbawa saat pindah tab.
- **Catatan, bukan bug dari fase ini**: kolom RAM container menampilkan "0 B" untuk container
  di mesin dev — sudah begitu sejak sebelum fase ini juga (terlihat sama di tabel Docker biasa),
  kemungkinan `docker stats` di host ini tidak melaporkan `memUsageBytes` untuk container-
  container tsb. Di luar scope perbaikan fase ini (bukan masalah di kode yang ditulis di sini).

### Installer non-interaktif (`scripts/install.sh`)

Mengisi placeholder yang sejak Fase 0 disebut di [09-deployment.md](09-deployment.md) §9.2
("dituangkan jadi `scripts/install.sh` saat implementasi") tapi belum pernah benar-benar
ditulis — semua instalasi sejauh ini dilakukan manual mengikuti langkah di dokumen itu.

- Mengotomatisasi langkah 1–4, 6, 9 di §9.2: deteksi/pasang binary (`--binary`, atau auto-
  cari `./taros` di sebelah script lalu `dist/taros-<arch>` sesuai `uname -m`), buat user
  servis (Opsi A) **atau** pakai user existing lewat `--no-create-user --service-user <nama>`
  (Opsi B — device pribadi), generate `/etc/taros/config.yaml` dari
  `deploy/config.example.yaml` dengan `--listen`/`--root-dir`, pasang systemd unit dengan
  `User=`/`Group=` disesuaikan otomatis, lalu jalankan `taros setup` untuk kredensial admin
  pertama.
- **Langkah 5, 7, 8 sengaja tetap manual** (butuh keputusan sadar per device — akses lintas-
  pemilik untuk file explorer, trade-off keamanan mode sudo) — dicetak sebagai pengingat
  eksplisit di akhir output script, bukan didiamkan begitu saja.
- **Idempoten**: aman dijalankan ulang — user/config/kredensial yang sudah ada tidak ditimpa
  diam-diam. Reset kredensial admin butuh `--force-setup` eksplisit, bukan default.
- `deploy/systemd/taros.service` disinkronkan dengan contoh di §9.3 saat proses ini (sempat
  drift — file yang sebenarnya di-copy installer belum punya `After=docker.service`/
  `Wants=docker.service` yang sudah ada di contoh dokumentasi).
- **Checkpoint tercapai — diuji end-to-end di container Docker dengan systemd sungguhan
  sebagai PID 1** (`--privileged --cgroupns=host`, bukan mock/stub systemctl), binary
  di-cross-compile untuk arch container (dikoreksi setelah percobaan pertama gagal "Exec
  format error" — mesin dev ternyata aarch64, bukan x86_64 seperti asumsi awal):
  - Instalasi bersih (Opsi A) dikonfirmasi end-to-end: servis `active (running)`, proses
    berjalan sebagai user `taros` non-root (dicek lewat `/proc/<pid>/status`, bukan cuma
    baca unit file), dashboard merespons `HTTP 200` di port yang dikonfigurasi.
  - Re-run kedua (idempotency) dikonfirmasi tidak membuat ulang user/config, dan **tidak**
    meminta prompt `taros setup` lagi karena kredensial sudah ada.
  - `--force-setup` dikonfirmasi mengganti kredensial admin (username baru benar-benar
    tersimpan).
  - Opsi B (`--no-create-user --service-user <existing>`) dikonfirmasi: systemd unit yang
    dipasang benar-benar memuat `User=`/`Group=` sesuai user yang dipilih, bukan default.
  - Dua jalur error dikonfirmasi berhenti dengan pesan jelas + exit code 1: `--no-create-user`
    dengan user yang tidak ada, dan menjalankan script bukan sebagai root.

### Rename repo GitHub + module path Go

Follow-up dari rebrand TarkimanOS → TarOS: repo GitHub sendiri di-rename ke
`github.com/tarkiman/taros` (tindakan yang sengaja **tidak** dilakukan otomatis saat rebrand
awal — lihat catatan di bagian "Rebrand ke TarOS" di atas — karena itu perubahan di luar repo
lokal yang lebih berisiko/hard-to-reverse, jadi ditunggu sampai user melakukannya sendiri
secara sadar). Menyusul rename itu:

- `go.mod`: `module github.com/tarkiman/tarkiman-os` → `module github.com/tarkiman/taros`.
- Semua import internal di 17 file `.go` (`cmd/taros/`, `internal/web/`,
  `internal/collector/`) ikut disesuaikan ke path module baru — mekanis tapi menyeluruh,
  tidak ada file yang terlewat (diverifikasi dengan grep sebelum & sesudah).
- Referensi path di dua file docs (`08-project-structure.md` — diagram struktur folder &
  contoh import `internal/web/spa.go`) ikut disamakan.
- Remote git lokal (`origin`) diarahkan ulang ke URL repo baru.

GitHub sendiri otomatis me-redirect URL repo lama (`tarkiman-os`) ke yang baru untuk operasi
git biasa (clone/fetch/push), tapi **itu tidak menyelesaikan masalah untuk `go get`/module
resolution** — go.mod yang menyatakan path lama sementara diminta lewat path baru akan gagal
verifikasi module path, jadi menyamakan `go.mod` bukan sekadar kerapian tapi memang wajib
begitu repo-nya benar-benar pindah nama.

### Rilis binary siap pakai + installer satu perintah

Dipicu laporan nyata: teman user mencoba install TarOS di STB-nya dan gagal — jalur satu-
satunya yang ada sampai titik ini masih mengharuskan build dari source (Go + Node/npm) di
perangkat target, yang untuk kebanyakan STB entah tidak terpasang, atau tidak layak dipasang
cuma demi build sekali. Fokus fase ini murni **menghilangkan langkah build dari alur instalasi
end-user**, bukan mengubah cara kerja aplikasi.

- **`.github/workflows/release.yml`** (baru): trigger dari push tag `v*` — build frontend
  sekali, cross-compile binary arm64 & armv7 (langkah yang sama seperti §9.1, sekarang
  otomatis), paket masing-masing jadi tarball flat (`taros` binary + `install.sh` + `deploy/`)
  lewat GitHub Actions, publish sebagai release asset. Versi di-embed ke binary via
  `-ldflags -X main.version=<tag>`.
- **`main.go`**: tambah `var version = "dev"` (di-override saat build rilis) + subcommand
  `taros version`/`taros --version`, dan dicatat di log startup — sebelumnya cuma rencana di
  §9.5, sekarang benar-benar ada meski belum ditampilkan di UI (belum ada halaman Settings).
- **`scripts/quick-install.sh`** (baru): satu perintah, tanpa clone repo atau build tools sama
  sekali di perangkat target —
  ```bash
  curl -sSL https://raw.githubusercontent.com/tarkiman/taros/main/scripts/quick-install.sh | sudo bash
  ```
  Deteksi arsitektur dari `uname -m`, tanya GitHub API untuk rilis terbaru, unduh tarball yang
  cocok, ekstrak, jalankan `install.sh` dari fase sebelumnya — semua flag `install.sh` tetap
  bisa diteruskan lewat `--`.
- **`scripts/install.sh` disesuaikan** supaya jalan dari dua layout berbeda: checkout repo
  penuh (`scripts/install.sh`, `deploy/` satu level di atas — layout lama) **atau** tarball
  rilis flat (`install.sh` dan `deploy/` sejajar — layout baru). Dideteksi otomatis, bukan flag
  terpisah.
- **Bug nyata ditemukan & diperbaiki lewat testing, bukan cuma dibaca ulang**: `curl | bash`
  membuat stdin script itu sendiri berasal dari pipe `curl`, bukan terminal — begitu
  `quick-install.sh` memanggil `install.sh` yang lalu memanggil `taros setup` (prompt
  username/password interaktif), prompt itu mencoba baca dari pipe yang sudah habis terpakai
  dan gagal (`read password: EOF`). Ini bukan bug di `install.sh`/`taros setup` (keduanya sudah
  benar saat dites langsung, tanpa pipe) — akar masalahnya murni cara `curl | bash` bekerja.
  Diperbaiki dengan membaca ulang stdin dari `/dev/tty` (terminal asli, terpisah dari stdin
  proses) khusus untuk langkah terakhir yang butuh input interaktif. Percobaan pertama
  perbaikan ini sendiri masih bocor pesan error ke output (`/dev/tty: No such device or
  address`) di lingkungan tanpa controlling terminal sama sekali (mis. `docker exec` tanpa
  `-it`) — karena `2>/dev/null` yang ditulis setelah redirection yang gagal tidak sempat
  berlaku (bash melaporkan error redirection sebelum redirection lain di baris yang sama
  diproses). Diperbaiki lagi dengan membungkus percobaan buka `/dev/tty` di subshell
  (`( exec 3</dev/tty ) 2>/dev/null`) supaya stderr-nya benar-benar teredam.
- **Checkpoint tercapai — diuji end-to-end di container Docker dengan systemd sungguhan**
  (pola sama seperti testing `install.sh` sebelumnya), termasuk **PTY asli** (lewat `script
  -qec`, bukan cuma pipe biasa) supaya skenario `curl | bash` interaktif teruji persis seperti
  yang akan dialami user sungguhan, bukan cuma jalur `--skip-setup`:
  - Tarball hasil packaging (dibuat manual meniru langkah workflow, karena workflow sendiri
    baru jalan nyata setelah tag pertama di-push) diverifikasi strukturnya benar & bisa
    diekstrak oleh `quick-install.sh`.
  - Parsing URL unduhan dari response GitHub API (`browser_download_url`) diuji dengan sample
    JSON asli formatnya (pretty-printed & minified) untuk arch `arm64` dan `armv7`.
  - Jalur `--skip-setup` lewat pipe `curl | bash` sungguhan (bukan cuma lokal) dikonfirmasi
    selesai bersih tanpa pesan error nyasar, servis aktif, dashboard merespons `HTTP 200`.
  - Jalur interaktif penuh lewat PTY asli (`script -qec 'curl ... | bash'`) dikonfirmasi
    prompt username/password benar-benar menerima input, kredensial tersimpan dengan username
    yang benar, servis aktif & merespons.
- **`README.md`** (baru, sebelumnya tidak ada di root repo) dan `docs/09-deployment.md` §9.1–
  §9.2 diperbarui: jalur satu-perintah ini sekarang jadi cara instalasi **utama** yang
  ditonjolkan, build-dari-source didemosikan jadi opsi untuk arsitektur di luar arm64/armv7
  atau yang memang mau build sendiri.
- **Blocker eksternal ditemukan setelah rilis pertama (`v0.1.0`) benar-benar di-push**: repo
  GitHub ternyata masih **Private** — `raw.githubusercontent.com` dan `api.github.com`
  sama-sama mengembalikan 404 untuk akses tanpa autentikasi (perilaku standar GitHub untuk repo
  private, supaya tidak membocorkan keberadaannya) — jadi seluruh alur satu-perintah di atas
  gagal total untuk siapa pun di luar kolaborator repo, walau kodenya sendiri sudah benar. Baru
  ketahuan karena diuji ulang dengan `curl` polos (bukan lewat `gh` yang sudah terautentikasi)
  setelah rilis pertama benar-benar dicoba — bukan cuma dibaca ulang. Diperbaiki dengan
  menjadikan repo Public (`gh repo edit --visibility public`, dikonfirmasi dulu ke user karena
  ini perubahan visibilitas yang signifikan/sulit dibalik sepenuhnya), lalu diuji ulang penuh
  tanpa autentikasi apa pun — script, API rilis, dan unduhan asset ketiganya dikonfirmasi
  `HTTP 200`.
- **Bug nyata kedua, ditemukan lewat pertanyaan user** ("apakah ini otomatis update kalau
  dijalankan ulang?") yang mendorong pengujian eksplisit alih-alih asumsi: `install.sh`
  memanggil `systemctl enable --now taros`, dan `--now` di situ cuma berarti "start kalau belum
  jalan" — bukan restart. Menjalankan ulang installer (skenario upgrade) dengan servis yang
  sudah aktif meninggalkan proses lama tetap berjalan tanpa berubah meski binary di disk sudah
  ter-update. Dikonfirmasi lewat `systemctl show taros -p MainPID` — PID sama persis sebelum &
  sesudah re-run, artinya re-run terlihat sukses tapi diam-diam tidak berefek ke instance yang
  jalan. Diperbaiki dengan `systemctl enable` (set enabled) + `systemctl restart` (selalu
  reload binary baru; aman juga untuk instalasi baru, karena `restart` pada unit yang belum
  pernah jalan berperilaku sama seperti `start`) — plus `install.sh` sekarang mencetak versi
  lama → baru (`taros version` sebelum & sesudah copy binary) supaya user langsung tahu apakah
  upgrade-nya benar-benar terjadi, bukan cuma percaya exit code 0. Diuji ulang end-to-end di
  container systemd sungguhan: PID & versi dikonfirmasi berubah setelah re-run dengan binary
  baru, kredensial & config dikonfirmasi tidak tersentuh, dan re-run dengan versi yang sama
  persis dikonfirmasi melapor "tidak ada perubahan versi" alih-alih pesan update yang salah.

### Update satu-klik lewat dashboard (`internal/selfupdate`) (selesai-rilis)

Dipicu permintaan user langsung: sediakan menu di web app untuk cek & pasang update, tanpa
harus SSH dan menjalankan installer manual — jauh lebih ramah untuk user yang tidak familiar
command line, yang menurut §"Rilis binary siap pakai" di atas justru target utamanya.

- **`internal/selfupdate/selfupdate.go`** (baru): `CheckLatest()` menanyakan GitHub Releases
  API (URL hardcoded, sama seperti yang dipakai `quick-install.sh`) dan mencocokkan asset
  sesuai `runtime.GOARCH`; `Apply()` mengunduh tarball-nya, mengekstrak binary `taros` (stdlib
  `archive/tar` + `compress/gzip`, tanpa dependency baru), dan `os.Rename` menimpa binary yang
  sedang berjalan sendiri — aman karena proses tetap memegang inode lama lewat file descriptor
  sendiri. Endpoint baru `GET /api/update/check` & `POST /api/update/apply` (keduanya lewat
  `requireAuth`, sama seperti handler lain), digerbangi config baru `update.enabled` (default
  **true** — beda dari `terminal.enabled`, karena ini tidak memberi akses shell/command apa
  pun, cuma mengganti binary sendiri dengan asset resmi repo ini).
- **Topbar dashboard** (`AppShell.vue`): tombol versi baru di sebelah toggle tema, membuka
  popover — cek update on-demand (bukan polling background), tampilkan versi sekarang/terbaru,
  tombol "Update Sekarang" → konfirmasi eksplisit (termasuk peringatan downtime singkat + perlu
  login ulang) → progress → otomatis reload begitu servis hidup lagi pasca-restart.
- **Bug nyata pertama, ditemukan lewat testing langsung bukan asumsi**: percobaan awal
  menaruh binary tetap di `/usr/local/bin/taros` dan cuma `chown` file-nya ke user servis
  (warisan dari fase sebelumnya) — gagal dengan `permission denied`, baik untuk bikin file
  sementara maupun rename akhir. Diverifikasi manual dua kali sebelum memutuskan desain ulang:
  kepemilikan atas *file* tidak memberi izin membuat/mengganti entry di *direktori* yang
  memuatnya — itu butuh izin tulis ke direktori itu sendiri (dibuktikan lewat `mv` langsung
  sebagai user servis ke direktori root-owned, tetap ditolak walau file tujuannya sudah milik
  user itu). Diperbaiki dengan memindahkan binary ke direktori baru yang dimiliki penuh oleh
  user servis, `/opt/taros/`, dengan `/usr/local/bin/taros` jadi symlink saja untuk pemakaian
  CLI — `scripts/install.sh` dan unit systemd (`ExecStart`) disesuaikan. Lihat
  [09-deployment.md](09-deployment.md) §9.5 dan [07-security.md](07-security.md) §7.9.
- **Bug nyata kedua**: unit systemd sebelumnya `Restart=on-failure`, yang cuma restart kalau
  proses keluar dengan kode non-nol/sinyal/timeout — proses yang keluar bersih (`os.Exit(0)`,
  memang disengaja setelah mengganti binary sendiri) justru **tidak** akan di-restart di bawah
  kebijakan itu. Diubah ke `Restart=always` supaya handler update cukup keluar bersih dan
  systemd yang menghidupkannya lagi menjalankan binary baru — tidak butuh panggilan `systemctl`
  (dan karenanya tidak butuh sudo/polkit) dari dalam aplikasi sama sekali, beda dari tombol aksi
  Docker/Service yang memang butuh privilege tambahan.
- **Temuan ketiga (bukan bug, tapi perlu dikomunikasikan ke user)**: session store TarOS murni
  in-memory (`internal/auth`, tidak ada database) — restart proses apa pun, termasuk dari
  self-update, otomatis membersihkan semua sesi login aktif. Dikonfirmasi lewat testing (cookie
  sesi lama ditolak dengan redirect ke `/login` setelah update sukses). Bukan regresi baru,
  tapi UI update ini secara eksplisit memperingatkan sebelum konfirmasi, supaya user tidak
  kaget diminta login ulang.
- **Testing**: divalidasi end-to-end di container systemd sungguhan (bukan cuma review kode) —
  check/apply lewat HTTP API langsung dengan mock release server (tag versi berbeda-beda),
  termasuk kasus sudah-versi-terbaru (no-op, PID tidak berubah) dan `update.enabled: false`
  (ditolak 403). Alur klik penuh di browser juga diuji lewat automasi headless browser
  sungguhan (bukan panggilan API sintetis): buka popover versi → klik "Update Sekarang" → klik
  "Ya, Update" → progress → auto-reload pasca-restart → mendarat di `/login` karena sesi
  invalid — semua langkah dikonfirmasi lewat screenshot & pembacaan DOM nyata.
- **Temuan keempat, ketahuan saat validasi di STB fisik**: `quick-install.sh` mengambil rilis
  GitHub **terbaru yang sudah di-tag**, bukan langsung dari `main` — jadi kode fitur ini yang
  sudah di-merge ke `main` **tidak otomatis** tersedia lewat installer sampai ada tag rilis baru
  yang benar-benar di-push (`v0.1.0` yang ada saat itu dibuat sebelum fitur ini di-merge).
  Diperbaiki dengan push tag `v0.2.0`, memicu `.github/workflows/release.yml` build & publish
  ulang — bukan bug di kode, tapi pengingat proses: setiap fitur yang mau dicoba lewat jalur
  instalasi publik butuh tag rilis baru, tidak cukup cuma merge ke `main`.
- **Validasi STB fisik (B860H): berhasil** — instalasi lama (pra-`/opt/taros/`) di-upgrade lewat
  `quick-install.sh` ke `v0.2.0`, konfirmasi langkah "Copy binary ke `/opt/taros/taros`" muncul
  (bukan lagi `/usr/local/bin/taros` langsung), tombol update di dashboard muncul & berfungsi.

### Prompt interaktif untuk grup docker saat install (v0.2.1 → v0.2.2)

Ditemukan langsung dari laporan STB fisik: instalasi baru (dan upgrade lewat tombol dashboard
di atas) menampilkan menu Docker yang gagal dengan `permission denied` ke `docker.sock` —
`docker.enabled` aktif secara default di config, tapi keanggotaan grup `docker` yang
levelnya setara akses root ke host (§7.4) sengaja dibuat opt-in lewat flag `--docker-group`,
bukan default diam-diam. Fix pertama (`v0.2.1`, lihat di atas) cuma menambah pengingat teks
di akhir output installer — user tetap harus tahu untuk menjalankan ulang installer dengan
flag itu, atau `usermod` manual, yang persis skenario yang dilaporkan: **update lewat tombol
dashboard tidak membantu sama sekali di sini**, karena self-update cuma mengganti binary,
tidak pernah menjalankan `install.sh` atau menyentuh keanggotaan grup OS.

Diperbaiki dengan mengganti reminder pasif itu jadi **prompt interaktif** di `install.sh`
(y/N, dengan penjelasan implikasi keamanannya) setiap kali Docker terdeteksi di sistem dan
tidak ada flag `--docker-group`/`--no-docker-group` eksplisit — mirip pola yang sudah ada
untuk `taros setup` (username/password admin). Ini tetap berfungsi lewat `curl | bash` karena
`quick-install.sh` sudah menyambungkan ulang stdin ke `/dev/tty` untuk kasus persis ini
(dipakai juga oleh `taros setup`). Sesi non-interaktif (CI/skrip tanpa TTY) diam-diam tetap
berperilaku seperti sebelumnya (`--no-docker-group`) — tidak ada perubahan behavior untuk
instalasi terskrip yang sudah ada. Idempoten: kalau user servis sudah anggota grup dari run
sebelumnya, tidak ditanya ulang setiap re-run/upgrade.

Diuji dengan meng-extract logic prompt-nya ke skrip standalone dengan stub `getent`/`id`/
`usermod`, dicoba lewat PTY sungguhan (`script(1)`) untuk lima skenario: jawab "y", jawab
kosong/Enter (default N), non-interaktif tanpa TTY, flag `--docker-group` eksplisit
(skip prompt), dan re-run saat sudah jadi anggota (skip prompt & skip `usermod`) — kelima
skenario berperilaku sesuai desain.

### Opsi C: mode root penuh saat install, setara CasaOS

Dipicu laporan STB fisik lagi: setelah fix grup docker, muncul masalah sejenis di File
Explorer — `permission denied` membuka `/home/tarkiman` karena servis (Opsi A, user `taros`)
memang tidak otomatis punya akses ke folder milik user lain. Solusi ad-hoc (ACL manual per
folder) valid tapi tidak scalable untuk user awam yang memang cuma mau akses penuh gaya
CasaOS ke seluruh sistemnya sendiri.

**Riset dulu sebelum putuskan arah**, karena TarOS eksplisit dibuat sebagai
tandingan/alternatif CasaOS (lihat motivasi proyek) — dicek langsung ke source code CasaOS
resmi, bukan asumsi: unit systemd mereka (`casaos.service`) **tidak punya baris `User=` sama
sekali** (default systemd = jalan sebagai root), dan script instalasi resmi mereka
(`03-setup-casaos.sh`) **tidak ada logika `useradd`/`adduser` apa pun** — backend CasaOS
selalu jalan sebagai root, tanpa pilihan, tanpa mencoba drop privilege sama sekali. Temuan ini
juga konsisten dengan CVE-2024-24765 (path filtering longgar di `casaos-userservice` yang bisa
dipakai eskalasi ke root) — konsekuensi langsung dari arsitektur "semua = root" itu.

Diputuskan **tidak** menyamai itu sebagai default (bertentangan dengan pola least-privilege
yang sudah dibangun konsisten sepanjang proyek ini — grup docker, terminal off by default,
mode sudo opt-in — dan blast radius-nya lebih besar khusus di TarOS karena fitur self-update
men-download & menjalankan binary dari GitHub secara otomatis: kalau prosesnya root, satu
masalah di pipeline rilis langsung jadi root RCE di semua device terinstall). Sebagai
gantinya, ditambah **Opsi C** sebagai pilihan eksplisit ketiga (setara Opsi A/B yang sudah
ada), bukan menggantikannya:

- `scripts/install.sh --root-mode`: set `SERVICE_USER=root`, lewati pembuatan user, dan
  otomatis melewati/menandai selesai semua langkah privilege lain (grup docker, reminder
  file explorer & mode sudo di akhir output) karena semuanya jadi moot ketika sudah root.
- Menu interaktif user servis (dari fitur docker-group-prompt di atas) diperluas dari y/N
  jadi pilihan 1/2/3 (Opsi A/B/C) setiap kali tidak ada flag eksplisit — default tetap Opsi B
  (user login, dideteksi lewat `$SUDO_USER`) kalau terdeteksi, jatuh ke Opsi A kalau tidak,
  **tidak pernah** default ke Opsi C — itu harus dipilih sadar.
- Sesi non-interaktif (CI/skrip) tidak berubah perilaku — tetap diam-diam jatuh ke Opsi A
  seperti sebelum fitur ini ada.

Diuji dengan pendekatan sama seperti docker-group-prompt: logic menu di-extract ke skrip
standalone dengan stub `id`/`useradd`, dicoba lewat PTY sungguhan (`script(1)`) untuk enam
skenario — default ke Opsi B saat `$SUDO_USER` terdeteksi, pilih Opsi A eksplisit, pilih
Opsi C eksplisit, non-interaktif (silently Opsi A, tidak ada perubahan), flag `--root-mode`
melewati menu sepenuhnya, dan sesi interaktif tanpa `$SUDO_USER` terdeteksi (opsi 2 otomatis
disembunyikan dari menu, default jatuh ke Opsi A) — keenamnya sesuai desain.

### Kolom tabel bisa diurutkan (Docker, Service, File Explorer)

Dipicu permintaan user langsung: bisa urutkan data Docker (container aktif, konsumsi
resource), nama, dll — bukan cuma terpaku di urutan yang dikirim backend.

- Semua murni client-side lewat `sorter` bawaan `NDataTable`, tanpa perubahan backend/API:
  container Docker (Status berdasarkan tingkat "aktif" — running → restarting → paused →
  created → exited → dead, bukan alfabetis; CPU/RAM/Network numerik dari live stats, dengan
  proses yang belum ada datanya konsisten di satu ujung, bukan nabrak nilai nol asli), Images/
  Volumes/Networks (ukuran, jumlah dipakai, tanggal, connected count), unit Service (Status
  pakai urutan "aktif" yang sama: active → activating → reloading → deactivating → inactive →
  failed), dan File Explorer (Nama/Ukuran/Pemilik/Diubah — sort by Nama berarti folder & file
  campur alfabetis, beda dari default "folder dulu" dari server, trade-off yang diterima
  begitu user eksplisit minta sort).
- Diuji terhadap **data sungguhan** (container Docker & unit systemd asli mesin development,
  bukan fixture) lewat automasi browser: klik header mengelompokkan/mengurutkan benar dan
  toggle asc/desc konsisten, nilai placeholder (stats belum ada, count tidak diketahui)
  konsisten di satu posisi bukan nyampur acak, tidak ada console error.

### Banner kesehatan dashboard bisa diklik ke unit yang gagal

Ditemukan saat testing STB fisik: banner "2 unit systemd gagal" cuma menampilkan angka, tidak
ada cara lihat unit mana — satu-satunya opsi sebelumnya adalah tebak atau buka Service manual
lalu centang filter failed sendiri.

- Banner (cuma pernah warning soal unit systemd gagal — jumlah container di situ murni
  informatif, bukan sinyal kesehatan) sekarang jadi `RouterLink` ke `/services?failed=1` saat
  ada warning; `ServiceView` baca query param itu saat mount untuk otomatis centang "Hanya
  yang failed" alih-alih mendarat di daftar tanpa filter.
- Diuji dengan unit failed sungguhan (`systemd-run ... /bin/false`) lewat automasi browser:
  teks/href banner benar, klik menavigasi ke `/services?failed=1`, checkbox failed-only
  benar-benar tercentang (dicek lewat class list, bukan cuma asumsi dari ref), tabel cuma
  menampilkan unit yang gagal itu.

### Halaman Proses penuh, gaya `btop`/`htop`

Dipicu permintaan langsung, dengan contoh tangkapan layar `btop`: widget "Pemakai Teratas" di
Dashboard cuma nampilkan 5 proses teratas dengan kolom terbatas (nama, PID, CPU/RAM) — user
mau detail selengkap `btop` (command lengkap, jumlah thread, user pemilik) dan bisa lihat
semua proses, bukan cuma top 5.

- **Backend**: `store.ProcInfo` (dan `internal/collector/proc.go`) ditambah tiga field baru —
  `Command` (dari `/proc/[pid]/cmdline`, gabungan argv yang dipisah NUL byte oleh kernel;
  fallback `"[nama]"` gaya `ps`/`top` untuk kernel thread yang memang tidak punya cmdline),
  `Threads` dan `User` (uid nyata, di-resolve ke username lewat `os/user`, di-cache per
  panggilan sampling — bukan lintas-tick, karena pemetaan uid→user jarang berubah dan tidak
  sepadan nambah state jangka panjang untuk itu). `readProcRSS` yang lama digabung jadi satu
  fungsi `readPIDStatus` yang baca `/proc/[pid]/status` **sekali** untuk RSS+Threads+Uid
  sekaligus — bukan tiga kali baca file yang sama per proses per tick, penting karena ini
  jalan untuk tiap proses di sistem tiap 5 detik.
- `processesMaxLimit` naik dari 100 ke 1000 supaya halaman baru bisa minta semua proses
  sekaligus (widget Dashboard tetap minta `limit=5` seperti sebelumnya, tidak berubah).
- **Frontend**: halaman baru `/processes` (nav topbar "Proses", ikon `Cpu`) — tabel kolom
  PID/Program/Command/Threads/User/CPU%/MemB, semua bisa diurutkan (pola sama dengan Docker/
  Service/Files), search by nama/command/user, auto-refresh 5 detik, `virtual-scroll` karena
  baris bisa ratusan di host yang sibuk. Widget Dashboard dapat link "Lihat semua proses" di
  tab Proses-nya, plus entry baru di grid quick-link.
- Diuji terhadap **proses sungguhan mesin development** (600+ proses riil, bukan fixture)
  lewat automasi browser: field baru (command, threads, user) terisi benar — termasuk kasus
  uid-namespace container yang ke-resolve ke username host yang "kebetulan" cocok (dikonfirmasi
  `ps` bawaan sistem menunjukkan hasil yang sama, jadi bukan bug), search filter & sort kolom
  berfungsi, tidak ada console error.

### Web Terminal: kegagalan spawn PTY sekarang tercatat ke log

Ditemukan saat mencoba mengaktifkan & menguji fitur Web Terminal (Fase 4) yang sebelumnya
sudah dibangun tapi belum tervalidasi di STB fisik: mengklik menu Terminal di instance
development menghasilkan "Gagal terhubung" tanpa detail apa pun.

- **Dugaan awal soal root cause di instance development ternyata salah** (dikoreksi di entri
  di bawah, "Bug nyata: konflik `Setpgid`/`Setsid`") — sempat disimpulkan ini batasan sandbox
  Claude Code, tapi setelah user melaporkan error identik di STB fisik sungguhan (bukan
  instance development), investigasi lanjutan menemukan ini bug nyata di kode TarOS sendiri,
  bukan batasan environment apa pun. Dicatat di sini apa adanya (termasuk kesimpulan awal yang
  salah) karena itu bagian nyata dari proses debugging-nya.
- **Gap nyata yang tetap ditemukan & diperbaiki** selama investigasi ini:
  `internal/web/ws_terminal.go` sebelumnya **tidak pernah mencatat error apa pun** ke log
  server saat `TerminalManager.NewSession()` gagal (shell tidak ada, `exec` diblokir
  kebijakan sistem, limit fd/pid, dst) — error itu cuma dikembalikan sebagai body JSON di
  respons HTTP, yang untuk upgrade WebSocket **tidak pernah sampai ke browser** (batasan
  WebSocket API, browser tidak mengekspos body response gagal-upgrade demi keamanan) —
  jadi kalau ini kejadian sungguhan di STB user, tidak ada cara sama sekali untuk tahu
  kenapa, baik dari UI maupun dari `journalctl -u taros`. Ditambahkan `slog.Error`/
  `slog.Warn` untuk kedua jalur gagal (spawn PTY, dan penolakan handshake WebSocket —
  biasanya mismatch header `Origin`, entah CSWSH yang berhasil diblokir atau reverse proxy
  yang salah konfigurasi).
- Diverifikasi lewat reproduksi langsung (request `GET /api/terminal/ws` biasa, bukan lewat
  upgrade WebSocket, supaya body JSON error-nya kebaca) sebelum dan sesudah fix — sebelumnya
  nihil di log, sesudahnya baris `ERROR terminal session start failed ... err="..."` muncul
  persis seperti errornya.
### Web Terminal: bug nyata — konflik `Setpgid`/`Setsid` bikin spawn PTY selalu gagal

User mencoba fitur Terminal di STB fisik sungguhan (B860H) setelah fix logging di atas —
hasilnya persis error yang sama, `fork/exec /bin/bash: operation not permitted`, di **STB
sungguhan**, bukan instance development. Ini membatalkan kesimpulan sebelumnya ("batasan
sandbox Claude Code") dan memicu investigasi ulang dari nol — proses debugging-nya jadi
contoh baik kenapa "menguji di device sungguhan" (§ Definisi Selesai) memang penting, bukan
formalitas.

- **Metodologi eliminasi, dilakukan langsung di STB user** (bukan tebak-tebakan): dicek satu
  per satu — plain `fork/exec` biasa via `systemd-run` (berhasil), PTY manual di sesi
  interaktif user sendiri (berhasil), PTY sebagai user `taros` via `systemd-run` (berhasil),
  PTY sebagai `root` pakai **file unit systemd asli** `taros.service` cuma `ExecStart`-nya
  diganti jadi `script` (berhasil) — jadi bukan soal user/group/`NoNewPrivileges`/hardening
  unit/limit resource (`TasksMax`/`ulimit -u` dicek juga, jauh dari batas). Yang tersisa:
  binary Go `taros` itu sendiri.
- **Dikonfirmasi lewat program Go minimal** yang meniru persis `internal/terminal/pty.go`
  (di-build untuk arm64, dikirim ke STB via HTTP server sementara di jaringan lokal yang
  sama — STB & mesin development ada di LAN yang sama, dikonfirmasi sebelumnya lewat
  instance preview) — program itu **gagal identik** bahkan dijalankan langsung interaktif
  di STB, di luar systemd sama sekali. Jadi murni soal kode Go + `creack/pty`, bukan
  systemd/OS/environment apa pun.
- **Root cause**: `pty.Start()` (`creack/pty`) **selalu** memaksa `Setsid: true` ke
  `SysProcAttr` proses yang di-spawn (lihat source `creack/pty` — `StartWithSize` set itu
  eksplisit sebelum `cmd.Start()`, terlepas dari `SysProcAttr` apa yang caller sudah isi).
  Kode kita di `internal/terminal/pty.go` **juga** set `Setpgid: true` secara terpisah
  (untuk keperluan `Session.Close()` bisa `kill(-pid, ...)` ke seluruh process group). Kombinasi
  `Setsid: true` + `Setpgid: true` itu melanggar POSIX: `setsid()` membuat proses jadi
  session leader (efek sampingnya, otomatis juga jadi process group leader dari session
  baru itu) — dan POSIX **melarang** session leader memanggil `setpgid()` pada dirinya
  sendiri sesudahnya, apa pun target pgid-nya, sekalipun ke nilai yang secara efektif sama.
  Itu persis `EPERM` yang muncul, 100% reproducible, di **semua** environment yang dicoba
  (STB fisik, container Docker `--privileged`, environment development) — bukan kebetulan
  environment-spesifik seperti dugaan awal, karena memang bug logika, bukan masalah privilege.
- **Fix**: hapus `Setpgid: true` dari `spawnPTY` (`internal/terminal/pty.go`) — tidak
  dibutuhkan lagi karena `Setsid: true` dari `creack/pty` **sudah** membuat shell jadi
  process group leader dari group barunya sebagai efek samping, jadi `kill(-pid, ...)` di
  `Session.Close()` (`session.go`) tetap berfungsi identik tanpa perubahan lain.
- **Diverifikasi dengan disiplin sebelum dan sesudah fix**, di STB fisik sungguhan: program
  repro minimal dengan `Setpgid` (gagal) vs tanpa `Setpgid` (berhasil) dikonfirmasi dulu
  sebelum fix diterapkan ke kode sungguhan — bukan cuma teori. Sesudah fix, binary `taros`
  penuh dites lagi lewat automasi browser sungguhan: buka `/terminal` → status "Terhubung" →
  ketik `echo hello-from-terminal` → output-nya benar-benar muncul di layar — validasi
  end-to-end pertama untuk fitur ini sejak dibangun di Fase 4, tidak ada console error.
- **Fase 4 (Web Terminal) sekarang resmi tervalidasi di STB fisik** — kriteria "selesai-rilis"
  di § Definisi Selesai terpenuhi untuk fitur ini.

### Halaman Pengaturan (awal): aktifkan Web Terminal dari browser

Permintaan langsung setelah Terminal akhirnya berfungsi: user harus SSH manual buat edit
`config.yaml` + restart servis tiap mau aktifkan Terminal — mau bisa lewat dashboard saja.
Didiskusikan dulu trade-off-nya sebelum dikerjakan (matching pola diskusi docker-group/
mode-root sebelumnya): user setuju dengan syarat **konfirmasi password ulang** untuk aksi
sekrusial ini, dan menyebut TOTP sebagai item keamanan yang mau ditambah lagi nanti (dicatat
terpisah di bawah, belum dikerjakan).

- **Halaman `/settings` baru** (menu topbar "Pengaturan", awal dari halaman Settings yang
  disebut di [04-features.md](04-features.md) §4.7 sejak lama tapi belum pernah dibangun) —
  untuk sekarang cuma berisi toggle Terminal, item lain (ganti password, dst) masih Fase 6.
- **Backend**: `internal/config.SetTerminalEnabled` — edit `terminal.enabled` di
  `config.yaml` dengan **targeted line edit** (scan baris demi baris, cari section
  `terminal:` level-atas lalu baris `enabled:` di dalamnya, ganti cuma nilai itu), bukan
  `yaml.Unmarshal` + `yaml.Marshal` ulang — dicoba langsung dan dikonfirmasi `yaml.v3`
  **menghapus semua komentar** kalau lewat jalur itu, padahal `config.example.yaml` sengaja
  ditulis penuh komentar penjelasan tiap section. Endpoint `POST /api/settings/terminal`
  minta ulang password dashboard (`Creds.Verify`, sama mekanisme dengan login) — status
  **403**, bukan 401, khusus untuk password salah, supaya `api/client.ts` (yang auto-redirect
  ke `/login` untuk 401 apa pun, treat sebagai "sesi habis") tidak keliru mengira sesi yang
  masih valid itu sendiri sudah invalid. Setelah berhasil ditulis: proses keluar bersih,
  systemd (`Restart=always`) menghidupkannya lagi membaca config baru — mekanisme yang
  identik dengan self-update (§9.5), termasuk peringatan downtime+login-ulang yang sama.
- **`scripts/install.sh` disesuaikan**: `config.yaml` sekarang di-`chown` ke `$SERVICE_USER`
  (sebelumnya cuma `chmod 0644`, dimiliki root) — servis butuh bisa menulis file konfigurasi
  dirinya sendiri untuk toggle ini berfungsi, trade-off yang sama seperti `/opt/taros/` untuk
  self-update.
- **Bug nyata kedua yang ditemukan sekalian saat investigasi**: route `/processes` (dari
  fitur halaman Proses sebelumnya) ternyata **tidak pernah didaftarkan** di server-side
  routing (`internal/web/router.go`) — cuma bisa diakses lewat klik link dari SPA yang sudah
  ke-load (client-side routing Vue Router menangkapnya), tapi refresh halaman atau buka link
  langsung ke `/processes` akan 404. Ketahuan karena `/settings` yang baru kena masalah
  persis sama saat pertama dites. Diperbaiki sekalian untuk keduanya.
- **Diuji end-to-end lewat browser sungguhan**, termasuk kasus yang gampang terlewat:
  password salah (harus tetap di `/settings` dengan pesan error, **bukan** ke-redirect ke
  `/login` — awalnya sempat tidak sengaja terjadi karena salah pilih status code 401, baru
  dikoreksi ke 403 setelah diuji), retry setelah gagal (ditemukan bug UI kecil sendiri:
  field password tidak ke-reset saat klik "Coba lagi", jadi password baru ketambahan ke
  yang lama alih-alih menggantikannya — diperbaiki), toggle ON lalu OFF berturut-turut
  (konfirmasi file config balik persis seperti semula, byte-per-byte, setelah dua kali
  toggle), dan nav Terminal muncul/hilang sesuai state setelah tiap restart.

Waktu itu user menyebut mau menambah **TOTP/2FA** untuk login dashboard supaya lebih aman —
dikerjakan tak lama setelahnya, lihat entri di bawah.

### TOTP (2FA), opsional dari Pengaturan

- **Implementasi RFC 6238 langsung dari Go stdlib** (`internal/auth/totp.go`:
  `crypto/hmac`+`crypto/sha1`+`crypto/subtle`), bukan library pihak ketiga — keputusan
  sadar konsisten dengan "kenapa tidak gopsutil" ([03-tech-stack.md](03-tech-stack.md)):
  algoritmanya kecil & stabil sejak 2011, jadi hand-roll masuk akal, beda dengan sesuatu
  yang genuinely kompleks/gampang salah (WebSocket framing di `ws_terminal.go` tetap pakai
  library). **Diverifikasi ketat sebelum menyentuh jalur login sungguhan**: unit test
  terhadap vector resmi RFC 6238 Appendix B (5 test case, HMAC-SHA1, dipangkas dari 8 digit
  RFC ke 6 digit yang benar-benar dipakai), plus cross-check manual terhadap `pyotp`
  (implementasi Python independen yang banyak dipakai) — generate kode lewat `pyotp` untuk
  beberapa secret+waktu acak, konfirmasi implementasi Go ini menerimanya sebagai valid, dan
  sebaliknya.
- **Backend**: `Credentials` (`internal/auth/credentials.go`) dapat field baru
  `TOTPSecret`/`TOTPBackupCodes` (`omitempty`, jadi akun tanpa 2FA tidak berubah sama
  sekali di `credentials.yaml`) plus `sync.Mutex` (sebelumnya tidak ada — sekarang genuinely
  dibutuhkan karena beberapa endpoint saling menulis struct in-memory yang sama: login,
  toggle Terminal via settings, setup/disable TOTP, semuanya bisa bersamaan meski ini
  dashboard single-admin, dua tab saja cukup). Endpoint baru: `GET /api/settings/totp/status`,
  `POST /api/settings/totp/setup` (generate secret, **belum disimpan**), `POST
  /api/settings/totp/confirm` (validasi kode dulu baru simpan + generate 10 kode cadangan),
  `POST /api/settings/totp/disable` (password wajib, status 403 bukan 401 — alasan sama
  seperti toggle Terminal). Login (`handleAuthLogin`) diperluas jadi dua langkah stateless:
  request pertama tanpa `totpCode` → kalau akun punya 2FA, balas `{totpRequired:true}` tanpa
  bikin sesi; klien kirim ulang persis request yang sama plus `totpCode` terisi.
- **Frontend**: kartu baru di halaman Pengaturan (Aktifkan → tampilkan QR code, di-render
  klien pakai `qrcode-generator`, dependency npm nol-transitive-deps yang sengaja dipilih
  dibanding alternatif populer `qrcode` yang bawa 3 dependency tambahan — konsisten dengan
  filosofi dependency minimal proyek ini — → konfirmasi kode → tampilkan 10 kode cadangan
  satu kali). `LoginView.vue` dapat langkah kedua kalau server minta (field kode 6-digit
  atau kode cadangan, keduanya diterima field yang sama karena backend yang membedakan).
- **Diuji end-to-end secara menyeluruh** (bukan cuma unit test algoritma) lewat kombinasi
  browser automation + `curl` langsung: alur setup penuh (QR muncul, kode salah ditolak
  dengan tetap di layar setup — bukan dead-end, kode benar tersimpan + kode cadangan
  tampil), login dua-langkah (password saja → diminta kode → kode salah ditolak tetap di
  `/login` → kode benar berhasil), login pakai kode cadangan (berhasil sekali, dipakai lagi
  gagal — single-use terverifikasi), nonaktifkan (password salah → 403 tetap di halaman
  Pengaturan bukan ke-redirect `/login`; password benar → berhasil), dan **sesi yang sudah
  login sebelum toggle apa pun tetap valid sesudahnya** (dicek langsung: cookie sesi lama
  masih `authenticated:true` setelah TOTP diaktifkan maupun dinonaktifkan lewat sesi lain).
- **Bug ditemukan & diperbaiki selama testing — di test-nya sendiri, bukan di kode
  produknya**: script Puppeteer awal gagal berulang kali mengisi ulang field kode setelah
  percobaan gagal, karena `element.value = ''` lewat `page.evaluate()` mengubah DOM tapi
  tidak memicu event `input` yang didengarkan Vue — `totpCode` di reactive state Vue tetap
  memegang nilai lama, jadi kode baru numpuk di belakang kode lama alih-alih menggantikannya
  (`"000000" + "587219"` bukan `"587219"`). Diverifikasi dulu lewat `curl` langsung (yang
  membuktikan backend-nya sudah benar) sebelum menyimpulkan ini bug test, bukan bug produk —
  baru diperbaiki dengan klik+select-all+backspace asli via `page.keyboard`, bukan manipulasi
  DOM langsung.

### File Explorer: panel tree folder + mode tampilan List/Grid

Permintaan langsung untuk menyempurnakan UI/UX File Explorer supaya lebih mirip file manager
desktop pada umumnya — didiskusikan dulu bentuk desainnya (layout, cara tree lazy-load, apa
saja yang dipakai ulang dari backend yang sudah ada) sebelum dikerjakan, karena ini perubahan
besar ke halaman yang sudah berfungsi penuh.

- **Murni fitur frontend** — tidak ada endpoint backend baru sama sekali. Tree folder
  (`components/files/FileTree.vue` + `FileTreeNode.vue`, rekursif) memakai ulang
  `GET /api/files/list` yang sama dengan listing utama, difilter ke folder saja di sisi
  klien; thumbnail gambar di mode Grid memakai ulang endpoint download yang sama sebagai
  `<img src>` (cookie sesi otomatis ikut terkirim, tidak perlu token tambahan untuk request
  gambar). Konsekuensinya: pengurangan risiko yang signifikan (tidak ada permukaan API baru)
  sekaligus pengerjaan lebih cepat karena tidak menyentuh Go sama sekali untuk fitur ini.
- **Tree lazy-load + auto-expand-to-active-path** — anak folder diambil saat node di-expand
  (bukan seluruh tree dimuat sekaligus, penting karena `rootDir` default `/` bisa sangat
  besar), dan saat folder aktif berubah (termasuk dari refresh/buka link langsung ke folder
  dalam, bukan cuma klik manual), tree berjalan dari root menyusuri tiap segmen path,
  meng-load + expand tiap level sampai node aktif kelihatan & ter-highlight — pola "reveal in
  sidebar" yang sama seperti VS Code/file manager desktop, bukan meninggalkan user harus klik
  manual turun sendiri.
- **Mode Grid**: thumbnail gambar asli (deteksi dari ekstensi file, fallback otomatis ke
  ikon kalau gambar gagal dimuat — dilacak lewat reactive `Set` supaya UI update begitu
  event `error` gambar terjadi), ikon per tipe file untuk video/audio/arsip/kode/dokumen/
  lainnya. Interaksi seleksi konsisten dengan mode List: checkbox terpisah dari area
  klik-untuk-buka (bukan seluruh kartu jadi target klik ganda), share state seleksi
  (`checkedKeys`) yang sama supaya operasi massal (salin/potong/hapus) bekerja identik di
  kedua mode tanpa logic terpisah.
- **Bug nyata ditemukan & diperbaiki lewat testing di viewport sempit**: sidebar tree
  defaultnya selalu terbuka, yang di layar HP (< 860px, dites langsung di viewport 420px)
  mendorong daftar file ke bawah layar sebelum user sempat melihatnya sama sekali — padahal
  fitur intinya (lihat/kelola file) seharusnya langsung terlihat. Diperbaiki dengan default
  yang viewport-aware: kalau belum ada preferensi tersimpan, default terbuka di desktop
  tapi tertutup di layar sempit; begitu user ubah manual sekali, preferensi itu yang dipakai
  terlepas dari lebar layar (sama filosofi persistence dengan toggle file tersembunyi/mode
  tampilan). Overflow horizontal tabel di mode List pada layar sempit **tidak** termasuk yang
  diperbaiki di sini — itu perilaku `NDataTable` yang sudah ada sejak sebelum perubahan ini,
  di luar scope redesign.
- **Diuji menyeluruh lewat browser sungguhan** (bukan cuma type-check): direktori uji nyata
  dengan struktur bertingkat (termasuk nama folder berspasi) dan gambar PNG asli (bukan file
  kosong — dibuat langsung via `zlib`/`struct` Python supaya benar-benar valid PNG yang bisa
  dirender browser sebagai thumbnail sungguhan) — expand/collapse tree, navigasi via klik
  tree DAN via klik tile grid, deep-link (reload langsung ke path bersarang lalu konfirmasi
  tree auto-expand & highlight node yang benar), multi-select di grid, kembali ke mode List
  (sort kolom tetap berfungsi, tidak ada regresi), collapse/expand sidebar, dan tampilan di
  kedua tema (dark — default aplikasi ini — dan light) plus viewport mobile, dikonfirmasi
  lewat screenshot nyata bukan cuma asersi otomatis.

### File Explorer: perbaikan layout tree + pratinjau gambar/PDF/video/audio

Permintaan langsung dari user setelah mencoba fitur tree/grid di atas: sidebar tree dan
konten (tabel/grid) terlihat tidak rata sejajar, dan file gambar/PDF/video tidak bisa
dilihat langsung dari File Explorer (klik file selalu lempar ke editor kode yang menampilkan
alert "ini biner" untuk tipe file tersebut).

- **Perbaikan layout**: sebelumnya toolbar (breadcrumb + tombol aksi) ada **di dalam** panel
  konten, jadi sidebar tree (mulai dari atas panel) dan tabel/grid file (mulai setelah
  toolbar) punya titik mulai vertikal berbeda — persis yang dikeluhkan user lewat
  screenshot. Diperbaiki dengan memindahkan toolbar ke atas, membentang penuh lebar
  halaman, di luar `.files-shell` — sidebar dan panel konten jadi sama-sama anak langsung
  dari satu baris flex di bawah toolbar, keduanya mulai di titik y yang sama persis
  (dikonfirmasi lewat `getBoundingClientRect()` di test Puppeteer: sidebar top dan card top
  keduanya `171.39px`). Cap tinggi maksimum sidebar (`max-height`) disesuaikan juga karena
  sekarang harus memperhitungkan tinggi toolbar yang dipindah ke atas.
- **Pratinjau gambar**: overlay lightbox custom (bukan komponen pihak ketiga) dengan navigasi
  sebelumnya/berikutnya antar gambar lain dalam folder yang sama (mode galeri) — panah di
  layar dan tombol panah kiri/kanan keyboard, `Esc` untuk tutup.
- **Pratinjau PDF**: dirender inline lewat `<iframe>` memakai viewer PDF bawaan browser.
  Ini butuh **satu perubahan backend**: endpoint download (`handleFilesDownload`) sebelumnya
  selalu mengirim `Content-Disposition: attachment`, yang membuat `<iframe>` memicu unduhan
  alih-alih merender inline (beda dari `<img>`/`<video>`/`<audio>` yang mengabaikan header
  ini sepenuhnya — itu sebabnya thumbnail gambar sebelumnya sudah bekerja tanpa perubahan
  ini). Ditambahkan parameter opsional `?inline=1` yang mengganti disposisi jadi `inline`,
  dipakai khusus oleh overlay pratinjau lewat `filesApi.previewUrl()` — perilaku default
  endpoint (tombol "Unduh" biasa) tidak berubah.
- **Pratinjau video & audio**: memilih antara native `<video>`/`<audio>` bawaan browser vs.
  menambah dependency player — dikonsultasikan ke user lewat pertanyaan langsung karena ini
  trade-off nyata (footprint bundle vs. konsistensi tampilan kontrol lintas browser). User
  memilih [Plyr](https://plyr.io) (~11KB gzip): kontrolnya bisa ditema persis mengikuti
  design token TarOS lewat CSS custom property Plyr sendiri (`--plyr-color-main` dst,
  otomatis ikut warna aksen & permukaan sesuai tema aktif — termasuk berbeda otomatis antara
  dark/light karena variable-nya mewarisi dari token global, dikonfirmasi lewat
  `getComputedStyle` di kedua tema saat testing). Seek/scrub video langsung berfungsi tanpa
  perubahan backend tambahan — `handleFilesDownload` sudah memakai `http.ServeFile` yang
  otomatis mendukung HTTP Range request.
- **Diuji lewat instance nyata** dengan file media asli (dibuat langsung, bukan file
  kosong/placeholder): PNG asli, PDF valid satu halaman (dibangun manual lewat struktur
  objek PDF, bukan library), video MP4 & audio MP3 nyata via `ffmpeg`. Dikonfirmasi lewat
  Puppeteer + review visual: pratinjau gambar/PDF/video/audio semuanya terbuka dengan benar,
  navigasi galeri gambar (next/prev via klik dan keyboard) berpindah ke file yang tepat,
  Plyr terinisialisasi sebagai video player dan audio player masing-masing, video punya
  durasi valid (metadata Range-load bekerja), endpoint `?inline=1` mengembalikan
  `Content-Type`/`Content-Disposition`/ukuran byte yang benar saat dicek langsung (dark PDF
  di screenshot headless adalah keterbatasan Chromium headless yang tidak punya plugin
  viewer PDF, bukan bug — sudah diverifikasi terpisah bahwa response backend-nya benar).
  Layout sejajar sidebar/konten dan seluruh alur pratinjau dicek di tema dark, light, dan
  viewport mobile, nol error console di sepanjang pengujian.

### Dukungan instalasi amd64 / WSL2 (Windows)

Permintaan langsung dari user setelah mencoba `quick-install.sh` di WSL Windows dan gagal di
langkah paling awal: deteksi arsitektur cuma kenal ARM64/ARMv7 (target device asli TarOS —
STB/Raspberry Pi), jadi `x86_64` (arsitektur WSL2) langsung ditolak dengan error sebelum
sempat coba apa pun. Motivasi eksplisit dari user: "makin banyak yang support/compatible maka
makin banyak yang pake."

- **Build `amd64` ditambahkan ke pipeline rilis** (`.github/workflows/release.yml`) — cross-
  compile ketiga di samping `arm64`/`armv7`, dipublish sebagai `taros-<versi>-amd64.tar.gz`
  di setiap rilis GitHub, jalur yang sama persis dengan dua arsitektur lain (tidak ada
  percabangan proses rilis).
- **`scripts/quick-install.sh`** dan **`scripts/install.sh`** dapat entri `x86_64) ARCH=amd64`
  di deteksi arsitekturnya masing-masing.
- **Masalah kedua yang ditemukan sebelum sempat dilaporkan user**: WSL2 secara default
  **tidak menjalankan systemd**, sementara `install.sh` sebelumnya memanggil
  `systemctl daemon-reload`/`enable`/`restart` tanpa syarat — di WSL tanpa systemd ini akan
  gagal keras di tengah instalasi ("System has not been booted with systemd") setelah semua
  langkah sebelumnya (binary, user servis, config, kredensial) sudah berhasil, pengalaman
  yang membingungkan (instalasi kelihatan gagal padahal sebagian besar sudah beres). Ditambah
  deteksi `[[ -d /run/systemd/system ]]` (satu-satunya cara yang reliable — distro yang cuma
  *terpasang* systemd tapi tidak jadi PID 1 tidak cukup) sebelum langkah unit systemd maupun
  enable/restart; kalau tidak ada, instalasi tetap selesai sukses (binary/config/kredensial
  semuanya siap) dan mencetak instruksi fallback — termasuk instruksi spesifik WSL (aktifkan
  `systemd=true` di `/etc/wsl.conf` + `wsl --shutdown`) kalau `/proc/version` mengandung
  string "microsoft" (penanda kernel WSL), atau instruksi generik "jalankan manual" kalau
  bukan WSL.
- **Diuji langsung**, bukan cuma dibaca ulang: binary `amd64` dicross-compile & diverifikasi
  header ELF-nya benar (`x86_64`) — tidak bisa dieksekusi langsung di mesin dev (ARM64, tanpa
  emulasi qemu/binfmt_misc untuk x86 tersedia), jadi logic `install.sh` (deteksi systemd +
  jalur fallback) diuji terpisah dengan menjalankan skrip yang sama persis di kontainer Ubuntu
  polos (Docker, tanpa systemd sebagai PID 1 — kondisi yang realistis merepresentasikan WSL2
  default) memakai binary native arm64 supaya benar-benar bisa dieksekusi untuk memvalidasi
  alur kontrolnya — instalasi selesai sukses, langkah systemd dilewati dengan pesan yang
  benar, exit code 0. Pola deteksi WSL (`grep -qi microsoft`) diverifikasi terpisah lewat
  string versi kernel WSL2 asli vs. kernel Linux biasa. Jalur systemd normal (host dev ini
  sendiri, yang memang punya systemd aktif) dikonfirmasi tidak berubah perilakunya — kode di
  dalam blok `if [[ "$HAS_SYSTEMD" -eq 1 ]]` identik dengan versi sebelum perubahan ini, cuma
  dibungkus kondisional.

### File Explorer: pemutaran video berkelanjutan per folder (playlist)

Permintaan langsung dari user: "kadang butuh hiburan... ingin memutar video untuk hiburan...
bisa memainkan video secara berkelanjutan di dalam folder". Didiskusikan dulu scope-nya
sebelum dikerjakan — pilihan antara (a) playlist otomatis berbasis folder (murah, memakai
ulang pola galeri gambar yang sudah ada) vs (b) playlist kurasi manual lintas-folder dengan
UI build/simpan/reorder (jauh lebih besar, perlu keputusan soal penyimpanan). User setuju
mulai dari (a) sebagai MVP.

- **Generalisasi konsep galeri gambar yang sudah ada jadi "playlist"**: `FilePreviewOverlay.vue`
  sebelumnya cuma punya navigasi sebelumnya/berikutnya untuk gambar (`images` prop). Sekarang
  ada computed `playlist` yang memilih list yang relevan sesuai tipe file aktif (`images` untuk
  gambar, `videos` prop baru untuk video) — index, hasPrev/hasNext, navigasi panah/keyboard
  semua jalan di atas satu computed yang sama, bukan logic terpisah per tipe.
  `FilesView.vue` menghitung `previewVideos` (filter folder aktif ke file video) persis
  seperti `previewImages` yang sudah ada, dioper sebagai prop baru.
- **Indikator posisi** "X / Y" ditambahkan di bilah judul overlay (untuk gambar maupun video)
  — item kecil tapi berguna untuk tahu "masih berapa lagi di folder ini", ditampilkan cuma
  kalau foldernya punya lebih dari 1 item sejenis.
- **Auto-advance + lanjut memutar otomatis**: saat video berakhir (event `ended` dari Plyr),
  otomatis pindah ke video berikutnya di folder (kalau ada — berhenti di video terakhir,
  tidak berputar balik ke awal). Video yang dituju lanjut memutar otomatis tanpa perlu klik
  play lagi. Video **pertama** yang dibuka dari daftar file tetap butuh klik manual (tidak
  pernah autoplay dari klik file biasa) — pembeda ini dilakukan lewat parameter `autoplay`
  yang cuma `true` saat `setupPlayer` dipanggil dari watcher perubahan `entry` (hasil
  navigasi/auto-advance), bukan dari `onMounted` (pembukaan pertama).
- **Tiga percobaan implementasi sampai jalan benar** — dicatat di komentar source karena
  bukan pilihan sepele:
  1. *Destroy + recreate Plyr tiap ganti track*: race dengan update reaktif Vue di atribut
     `:src` elemen `<video>` — video diam-diam tetap di track sebelumnya walau UI (nama
     file, indikator posisi) sudah update benar (itu didorong langsung dari `props.entry`,
     bukan dari state video itu sendiri).
  2. *`player.source = {...}`* (API resmi Plyr untuk ganti sumber): reuse instance-nya
     sudah benar, tapi observasi menunjukkan Plyr sempat melewati placeholder
     `blank.mp4` internal yang tidak pernah lanjut ke track sebenarnya.
  3. **Solusi yang jalan**: instance Plyr dipakai ulang lintas track (dibuat sekali per jenis
     video/audio, bukan per track), tapi ganti track dilakukan dengan set `el.src` +
     `el.load()` langsung di elemen `<video>`/`<audio>` native, bukan lewat API Plyr sama
     sekali — Plyr cuma mendengarkan event native (play/pause/ended/dst) jadi tidak perlu
     "tahu" soal pergantian sumber lewat API-nya sendiri. Listener `ended` dipasang sekali
     per masa hidup instance player (bukan per track) memakai `.on()` bukan `.once()`,
     supaya tidak menumpuk listener basi yang bisa memicu `goNext()` berkali-kali sekaligus
     kalau beberapa track dilewati tanpa video-nya sempat benar-benar berakhir.
- **Jebakan saat pengujian yang hampir menyesatkan analisis**: dua percobaan implementasi
  pertama tadinya kelihatan gagal dengan gejala identik lewat testing manual berulang —
  ternyata bukan karena logic-nya salah, tapi karena proses server uji lokal tidak pernah
  benar-benar di-restart antar percobaan (`pkill -f` dengan pola path absolut tidak match
  proses yang dijalankan lewat path relatif `./taros`, jadi tiap `go build -o` ulang cuma
  mengganti file binary di disk sementara proses lama—dengan binary lama yang sudah
  ter-unlink—tetap jalan melayani port yang sama). Ketahuan lewat `/proc/<pid>/exe` yang
  menunjukkan binary `(deleted)` dan checksum berbeda dari file di disk. Setelah proses lama
  benar-benar dimatikan by PID dan instance baru diverifikasi (checksum + string debug di
  binary yang jalan), percobaan solusi ke-3 di atas terbukti berhasil di percobaan pertama
  yang sebenarnya diuji dengan benar — dua percobaan sebelumnya tidak pernah benar-benar
  tereksekusi ulang di server uji sama sekali.
- **Diuji end-to-end** dengan 3 klip video pendek asli (3 detik masing-masing, dibuat lewat
  `ffmpeg`, bukan file kosong) di sebuah folder: buka klip pertama, klik play manual, biarkan
  berakhir → auto-advance + lanjut memutar otomatis ke klip kedua tanpa klik apa pun,
  berulang ke klip ketiga, berhenti di klip terakhir (tidak berputar balik), navigasi manual
  panah sebelumnya berfungsi, overlay tutup bersih lewat `Esc`. Dikonfirmasi juga tidak ada
  regresi ke mode galeri gambar maupun pratinjau audio (kode `setupPlayer`/`destroyPlayer`
  dipakai bersama ketiganya). Review visual di tema dark dan viewport mobile, nol error
  console di sepanjang pengujian.

### Music Mini-Player: pemutaran musik persisten lintas halaman

Permintaan langsung dari user: pemutar mp3 yang otomatis memutar playlist/folder, "interface
menarik, tapi masih jalan dan menyatu dengan aplikasi ini" — didiskusikan dulu scope-nya
sebelum dikerjakan karena ini beda kebutuhan dari video: video cukup berhenti begitu overlay
ditutup/pindah halaman (nonton itu aktivitas fokus), tapi musik biasanya didengarkan
*sambil* melakukan hal lain di aplikasi. Dua opsi dibahas: (a) pakai ulang persis pola
overlay video (murah, tapi berhenti begitu pindah halaman) vs (b) mini-player persisten
yang tetap jalan lintas navigasi (lebih besar, menyentuh `AppShell.vue` yang dipakai semua
halaman). User pilih (b).

- **Temuan arsitektur penting sebelum mulai coding**: asumsi awal "taruh mini-player di
  `AppShell.vue`" ternyata salah — `AppShell.vue` di-**instansiasi ulang setiap pindah
  halaman** (tiap view membungkus dirinya sendiri dengan `<AppShell>`, bukan satu layout
  tunggal di level atas; ini sudah didokumentasikan di komentar `stores/terminal.ts` dari
  fitur sebelumnya, cuma belum pernah jadi masalah nyata sampai sekarang). Komponen apa pun
  yang dipasang di dalam `AppShell.vue` akan ikut unmount/remount tiap navigasi — elemen
  `<audio>` di dalamnya akan ter-reset, gagal total memenuhi "tetap jalan". Solusinya:
  `MiniPlayer.vue` dipasang di `App.vue`, **sejajar** `<router-view>` (bukan di dalamnya) —
  satu-satunya titik di seluruh aplikasi yang benar-benar tidak pernah unmount selama SPA
  hidup. State antrean/lagu aktif (`stores/player.ts`, Pinia) otomatis ikut persisten karena
  Pinia store hidup di root app instance, tidak terikat siklus hidup komponen manapun —
  cuma elemen `<audio>` fisiknya yang butuh penempatan khusus.
- **Playlist folder otomatis + auto-advance**, generalisasi dari pola video: `FilePreviewOverlay.vue`
  sebelumnya cuma tahu soal `images`/`videos`; sekarang `FilesView.vue`'s `openEntry()`
  mencegat klik file audio SEBELUM masuk logic pratinjau biasa, langsung memanggil
  `playerStore.playFolder(daftarAudioDiFolder, index, folderPath)` — audio tidak pernah
  membuka `FilePreviewOverlay.vue` sama sekali (jalur 'audio' yang sebelumnya ada di situ
  jadi dead code, dibersihkan).
- **Klik file = izin autoplay**, beda dengan video: overlay video sengaja TIDAK autoplay
  saat pertama dibuka (dibuka pasif, autoplay akan mengejutkan), tapi memilih lagu dari
  daftar file adalah aksi eksplisit "putar ini" — jadi mini-player autoplay dari klik
  pertama, tidak perlu klik play manual sekali lagi.
- **Bug play/pause "storm" — perjalanan debugging paling rumit sejauh ini**: implementasi
  pertama pakai [Plyr](https://plyr.io) lagi (konsisten dengan video/pratinjau audio lama),
  dengan tombol play/pause/prev/next kustom sendiri (Plyr cuma dipakai untuk progress
  bar/waktu/volume). Testing awal (Puppeteer, cek `.paused` sesaat setelah auto-advance)
  menunjukkan hasil **tidak konsisten** — kadang `true` kadang `false` di titik pengecekan
  yang sama, kelihatan seperti race condition kecil di waktu. Investigasi lebih dalam
  (instrumentasi `addEventListener('play'/'pause', ...)` langsung ke elemen, bukan cuma cek
  `.paused` sesaat) mengungkap yang sebenarnya terjadi: **lebih dari 2000 event play/pause
  dalam 8 detik**, jauh dari wajar. `currentTime` tetap naik mulus (audio sebenarnya main
  terus tanpa putus), tapi elemen di-pause/di-play ulang berkali-kali per detik.
  - Hipotesis pertama: Plyr biang keroknya. Dites dengan menghilangkan `new Plyr(...)` sama
    sekali (audio native polos) — storm hilang total dalam window pengujian singkat (3
    detik). **Kesimpulan ini keliru** — cuma kebetulan window pengujian terlalu pendek,
    belum sempat melewati siklus auto-advance yang jadi pemicu sebenarnya.
  - Tanpa Plyr, dites lagi dengan window lebih panjang (9 detik, melewati beberapa
    auto-advance) — storm **tetap muncul**, 2700+ event, membuktikan Plyr bukan penyebab
    tunggal.
  - Instrumentasi lebih detail (log tiap kali watcher `store.playing` terpicu + nilai yang
    diterima) menemukan akar masalah sebenarnya: watcher **dua arah** — tombol UI mengubah
    `store.playing`, sebuah `watch()` terpisah mendengarkan `store.playing` lalu memanggil
    `el.play()`/`el.pause()`, SEKALIGUS elemen native juga listen event `play`/`pause`
    miliknya sendiri untuk mengubah balik `store.playing` — kombinasi ini jadi feedback
    loop: panggil `play()` → event native `play` fired → update state → watcher terpicu
    lagi → panggil ulang → dst, jadi ratusan siklus per detik.
  - **Perbaikan final**: alur dibuat **satu arah**. Elemen `<audio>` jadi satu-satunya
    sumber kebenaran; `store.playing` cuma cerminan pasif (diupdate oleh
    `onNativePlay`/`onNativePause`, tidak pernah "menulis balik" ke elemen). Tombol
    play/pause di UI memanggil fungsi lokal yang bicara **langsung** ke elemen
    (`el.paused ? el.play() : el.pause()`), bukan lewat store/watcher. Setelah perbaikan
    ini: 5 event dalam 10 detik dengan 3x auto-advance — angka yang benar-benar masuk akal
    (satu play/pause wajar per transisi track), bukan ribuan.
  - **Keputusan turunan**: karena watcher dua arah adalah akar masalah — bukan spesifik ke
    Plyr — dan Plyr di sini cuma dipakai untuk progress bar/volume (bukan tombol play/pause
    sendiri, yang justru sudah dibuat manual), Plyr **dilepas sepenuhnya** dari
    `MiniPlayer.vue`. Progress bar dan volume dibuat sendiri lewat `<input type="range">`
    native yang disambungkan langsung ke elemen `<audio>` — lebih sedikit dependency di
    komponen yang paling sering ter-render di seluruh aplikasi (muncul di setiap halaman
    selama ada musik diputar), dan tidak ada lagi lapisan pihak ketiga yang bisa
    menciptakan feedback loop serupa. Video/pratinjau audio di `FilePreviewOverlay.vue`
    tidak kena masalah ini karena arsitekturnya beda: cuma satu jalur yang memanggil
    `play()` (dari watcher perubahan track), tidak ada tombol UI kustom terpisah yang perlu
    sinkron dua arah balik ke Plyr.
  - **Pelajaran metodologis yang dicatat eksplisit**: jangan simpulkan penyebab dari
    pengujian dengan window waktu pendek pada bug yang sifatnya intermiten/periodik — window
    3 detik pertama (kebetulan pas durasi track uji) memberi kesimpulan yang salah arah
    sepenuhnya.
- **Sesi logout otomatis menghentikan musik** (`stores/auth.ts`'s `clear()` action memanggil
  `usePlayerStore().close()`) — musik tidak nyangkut lintas sesi/tidak muncul di halaman
  login setelah logout.
- **Layout**: `job-panel` (progress copy/paste, `FilesView.vue`) dan `.content`'s
  padding-bottom (`AppShell.vue`) sama-sama disesuaikan kondisional saat mini-player aktif,
  supaya tidak saling tumpang tindih dengan bar 72px yang menempel di bawah.
- **Diuji end-to-end** dengan 3 file mp3 pendek asli (3 detik, `ffmpeg`) di sebuah folder:
  klik file pertama langsung main tanpa klik play manual, **pindah ke halaman
  Dashboard sambil musik tetap terdengar dan mini-player tetap tampil** (pengujian utama
  yang membuktikan requirement "menyatu dengan aplikasi"), auto-advance + lanjut memutar
  otomatis SAAT masih di halaman Dashboard (bukan di File Explorer), navigasi manual
  berikutnya, toggle play/pause manual (jeda lalu lanjut lagi), tombol tutup menghentikan
  pemutaran. Review visual tema dark/light dan viewport mobile (progress bar/tombol/info
  track menyesuaikan lebar layar bertingkat — waktu & volume disembunyikan duluan sebelum
  elemen lain di layar sempit). Nol error console di seluruh pengujian setelah perbaikan
  storm di atas.

### Pengaturan port aplikasi dari UI

Permintaan langsung: "tambahkan pengaturan opsi user untuk ganti port aplikasinya, defaultnya
8090". Mengikuti pola yang sudah ada persis untuk toggle Terminal (`internal/config/mutate.go`'s
`SetTerminalEnabled` — edit `config.yaml` line-level bukan parse-ulang-tulis-ulang penuh,
supaya komentar di file seperti `deploy/config.example.yaml` tidak hilang; restart via
`os.Exit(0)` + systemd `Restart=always`; konfirmasi ulang password dashboard tiap kali karena
ini aksi berisiko tinggi) — cuma satu tambahan penting yang tidak dibutuhkan toggle Terminal:
**validasi test-bind sebelum menyimpan apa pun.**

- **Kenapa test-bind krusial di sini dan tidak di toggle Terminal**: toggle Terminal
  cuma menyalakan/mematikan sebuah fitur — apa pun nilainya, servis tetap bisa start normal
  setelah restart. Port beda cerita: kalau port yang diminta ternyata sudah dipakai proses
  lain, atau di bawah 1024 tanpa capability, servis akan **gagal start** setelah restart —
  dan karena systemd `Restart=always`, itu jadi crash-loop tanpa henti, dengan dashboard
  yang tidak bisa diakses sama sekali untuk memperbaikinya (satu-satunya jalan keluar:
  edit `config.yaml` manual lewat SSH/akses fisik). Makanya `handleSettingsPort`
  (`internal/web/handlers_settings.go`) mencoba `net.Listen("tcp", newAddr)` dulu (langsung
  `Close()` lagi) **sebelum** memanggil `SetServerListen` — kalau gagal, request ditolak
  dengan pesan jelas, config **tidak tersentuh**, servis **tidak direstart**. Ini bukan
  jaminan 100% (ada celah waktu kecil antara test-bind dan restart sungguhan di mana port
  itu secara teori bisa direbut proses lain), tapi menangkap skenario yang sebenarnya
  terjadi — typo, port yang memang sudah dipakai, port privileged tanpa izin.
- **Redirect ke origin baru, bukan reload halaman yang sama**: beda dari toggle Terminal
  (yang polling origin **saat ini** sampai servis hidup lagi, lalu `location.reload()`),
  ganti port membuat origin yang sedang dibuka browser **berhenti total** begitu servis
  pindah — tidak ada gunanya polling ke situ. `waitForRestartThenReloadNewPort` di
  `SettingsView.vue` polling ke **origin baru**
  (`${protocol}//${hostname}:${portBaru}`) sebagai gantinya. Karena port berbeda dihitung
  origin berbeda oleh browser (request lintas-origin, dan backend tidak — dan tidak perlu —
  mengirim header CORS untuk ini), `fetch` biasa akan selalu ditolak duluan oleh browser
  meski servis sudah hidup. Dipakai `mode: 'no-cors'` sebagai gantinya — browser tetap
  benar-benar mencoba koneksinya (promise tetap reject kalau connection refused, yang
  cukup untuk tahu "belum hidup"), cuma tidak bisa membaca isi/status response (yang memang
  tidak dibutuhkan, cukup tahu request-nya berhasil connect atau tidak).
- **Setelah redirect, user diarahkan ke halaman login** — ini bukan bug, melainkan
  konsekuensi wajar dari (a) cookie sesi httpOnly terikat ke origin lama (port berbeda =
  origin berbeda, cookie tidak ikut pindah) dan (b) proses lama benar-benar diganti proses
  baru (systemd), bukan sekadar reload config in-memory. Sama seperti toggle Terminal dan
  update aplikasi, teks konfirmasi di UI secara eksplisit bilang "servis akan restart dan
  kamu perlu login ulang" sebelum user menekan tombol konfirmasi.
- **UI**: input angka pakai `NInputNumber` (bukan `NInput` biasa) — dicoba dulu dengan
  `NInput` + `v-model:value.number`, ternyata tidak cocok (tipe `value` prop `NInput`
  cuma string, `.number` modifier bikin conflict type). `NInputNumber` sudah punya
  validasi range bawaan (`:min="1" :max="65535"`), jadi klien juga menolak nilai di luar
  jangkauan sebelum sempat dikirim ke server.
- **Diuji end-to-end** lewat instance yang benar-benar direstart (simulasi `Restart=always`
  systemd pakai loop bash manual, karena instance uji tidak dijalankan lewat systemd
  sungguhan): ganti port dari 8096 ke 8097 lewat UI → config.yaml tertulis benar (section
  `terminal:` yang sudah ada di bawahnya tetap utuh, cuma baris `listen:` yang berubah) →
  proses lama exit, proses baru otomatis naik di port baru (dikonfirmasi lewat `ss -tlnp`) →
  browser redirect otomatis ke `:8097` → diarahkan ke halaman login (sesuai ekspektasi) →
  login ulang berhasil normal, halaman Pengaturan menampilkan port baru dengan benar. Dua
  skenario gagal-aman juga diuji: coba ganti ke port yang sedang dipakai proses lain (dummy
  listener) → error jelas, servis **tetap** di port lama, tidak ada restart terjadi; password
  salah → error 403 yang jelas, servis juga tidak terganggu. Sempat ada bug di skrip
  pengujian sendiri (bukan di aplikasi) — teknik isi field `NInputNumber` via
  klik-tiga-kali-lalu-ketik tidak benar-benar mengganti nilai lama, hasilnya nilai ganjil
  ter-clamp ke batas maksimum (65535) alih-alih angka yang dimaksud; diperbaiki dengan
  teknik klik+`Ctrl+A`+backspace asli via `page.keyboard` — pola yang sama persis dengan
  fix serupa di pengujian TOTP sebelumnya untuk masalah field-clearing yang serupa.

### Kompatibilitas macOS (fase pertama)

Dipicu user mencoba `quick-install.sh` di Mac mini pribadinya dan kena block eksplisit
("cuma mendukung Linux — bukan Darwin"). Motivasi lanjutannya spesifik: alternatif lebih
ringan dari Docker Desktop untuk monitoring Docker di Mac yang sama. Didiskusikan scope-nya
sebelum dikerjakan — full native macOS parity (termasuk padanan systemd/launchd penuh) jelas
proyek jauh lebih besar daripada kerjaan amd64/WSL sebelumnya (itu "OS sama, arsitektur
beda"; macOS "OS beda total"). User setuju mulai dari fase kecil: Docker/Files/Terminal jalan
penuh, Dashboard/Proses/Service gracefully lapor "tidak didukung", instalasi manual dulu
(belum launchd).

- **Kejutan positif paling besar**: kekhawatiran awal bahwa `internal/fileexplorer`
  (`syscall.Statfs_t` dkk) tidak akan compile untuk `GOOS=darwin` (field struct beda antar
  OS) — **ternyata salah**, `GOOS=darwin GOARCH=arm64 CGO_ENABLED=0 go build ./...` sukses
  total tanpa satu baris kode pun diubah, dikonfirmasi langsung (bukan diasumsikan) sebelum
  melangkah lebih jauh ke desain apa pun. Ini artinya seluruh pekerjaan fase ini murni soal
  *runtime graceful degradation*, bukan compile-time build tags (`//go:build linux`) yang
  tadinya dikira perlu.
- **Docker ternyata sudah portable tanpa sentuh kode sama sekali** — `internal/docker` dial
  ke `docker.socketPath` dari config, tidak hardcode path Linux. Arahkan ke socket Docker
  Desktop/Colima dan langsung jalan.
- **Dashboard & Proses** (`/proc`, `internal/collector`) dan **Monitoring Service**
  (`systemctl`/`journalctl`) tidak punya padanan ditulis di fase ini — keduanya di-gate
  lewat `web.Deps.SystemMonitoringSupported` (`runtime.GOOS == "linux"`, snapshot sekali saat
  startup, sama pola dengan `DockerEnabled`/`TerminalEnabled` yang sudah ada). Collector
  goroutine di `cmd/taros/main.go` malah **tidak pernah di-start** kalau tidak didukung —
  sebelumnya (tanpa perubahan ini) dia akan tetap jalan dan spam `slog.Error` tiap tick
  gara-gara `/proc` tidak pernah ada, untuk fitur yang UI-nya sudah bilang "tidak tersedia".
- **Kenapa butuh endpoint status terpisah** (`GET /api/system/monitoring-status`), bukan
  cuma andalkan error dari endpoint metrics yang sudah ada: `EventSource` bawaan browser
  (dipakai `useMetricsStream.ts` buat SSE) tidak punya cara bersih menerima "endpoint ini
  tidak akan pernah kirim data" — kalau endpoint SSE langsung dikembalikan 503, browser cuma
  retry connect selamanya tanpa pesan apa pun ke user (`connected: false` diam-diam,
  selamanya). Composable-nya diubah supaya cek status endpoint dulu **sebelum** pernah
  membuka `EventSource` sama sekali, baru kalau didukung lanjut connect seperti biasa. Untuk
  Monitoring Service, endpoint REST biasa (bukan SSE) jadi tidak punya masalah ini —
  errornya sendiri **sudah** cukup rapi dari sebelumnya (`systemd.List` gagal wajar kalau
  `systemctl` tidak ada di PATH), cuma ditambah pesan eksplisit "khusus Linux" di depan biar
  tidak menampilkan raw exec error bahasa Inggris untuk kasus spesifik ini (raw error tetap
  jadi fallback untuk kasus lain, mis. Linux tanpa systemd).
- **`ProcessesView.vue` sekaligus dibenahi** — ternyata SUDAH ada state `unavailable`
  sebelumnya, tapi implementasinya cuma boolean (`Daftar proses tidak bisa dibaca.`, generik)
  DAN memanggil `message.error(...)` toast di **setiap** siklus polling gagal (tiap 5 detik
  selamanya kalau kondisinya permanen seperti "tidak didukung di OS ini") — kalau dibiarkan,
  fase ini akan membuat toast spam tak berkesudahan di macOS. Diubah jadi simpan pesan asli
  (bukan cuma flag), toast dihapus, diganti `NAlert` persisten (pola sama dengan
  `ServiceView.vue` yang sudah lebih dulu benar).
- **Instalasi**: paket rilis macOS (`taros-<versi>-darwin-arm64.tar.gz` /
  `-darwin-amd64.tar.gz`) sengaja **tidak** menyertakan `install.sh` — script itu
  mengasumsikan `systemctl`/`useradd` yang tidak ada di macOS sama sekali, beda dari kasus
  WSL2 yang cukup deteksi-dan-lewati satu bagian. `quick-install.sh` mendeteksi Darwin lebih
  awal dan ambil jalur terpisah total: unduh, taruh binary di `~/taros/`, cetak instruksi
  jalan manual — **tanpa butuh sudo/root sama sekali** (beda dari Linux yang selalu perlu
  root untuk user servis dedicated + systemd unit). Auto-restart setara `launchd`'s
  `KeepAlive` (padanan systemd `Restart=always`, yang baru dipakai fitur ganti-port dan
  toggle-terminal) **sengaja belum dikerjakan** — di luar scope fase pertama yang disepakati,
  dipertimbangkan lagi kalau memang dibutuhkan setelah dicoba nyata.
- **Diuji end-to-end**, termasuk regresi ke jalur Linux normal yang sudah ada:
  - Cross-compile darwin/arm64 & darwin/amd64 dikonfirmasi sukses dan hasilkan binary Mach-O
    valid (`file` command).
  - Logic instalasi manual macOS (`quick-install.sh` bagian Darwin) diuji terisolasi dengan
    binary darwin asli hasil cross-compile di atas + config template — tanpa perlu mesin
    macOS sungguhan, cukup override variabel & panggil blok kodenya langsung.
  - Degradasi runtime **tidak bisa dites di macOS sungguhan** (lingkungan dev ini Linux ARM)
    — disimulasikan dengan cara paksa `systemMonitoringSupported := false` sementara di
    source, build ulang, uji lewat Puppeteer, lalu **dikembalikan** ke
    `runtime.GOOS == "linux"` sebelum commit (dikonfirmasi bersih, tidak ada sisa kode debug,
    lewat grep eksplisit sebelum lanjut). Dashboard/Proses/Service ketiganya menampilkan
    pesan spesifik yang benar, Docker/Files/Terminal tidak terpengaruh sama sekali.
  - **Satu kesalahan nyata selama pengujian** (murni kelalaian proses, bukan bug kode): lupa
    `npm run build` ulang sebelum build binary Go untuk sesi pengujian degradasi pertama —
    binary yang dijalankan masih meng-embed `dist/` lama (dari sebelum perubahan
    `useMetricsStream.ts`/`DashboardView.vue`), sehingga endpoint status baru tidak pernah
    ter-bundle dan Dashboard macet selamanya di spinner alih-alih menampilkan alert.
    Terdeteksi lewat `grep -rl "monitoring-status" dist/assets/*.js` yang kosong — bukti
    telak sebelum sempat salah menyimpulkan ada bug di logic reaktivitas Vue. Setelah
    `npm run build` ulang, pengujian yang sama langsung berhasil di percobaan berikutnya.
  - Jalur Linux normal diuji ulang setelah itu (dengan `dist/` yang sudah benar) untuk
    memastikan nol regresi — Dashboard tetap tampil dengan data live seperti sebelum
    perubahan ini sama sekali.

### Akses Cepat (Custom): tile Dashboard buatan user, link ke layanan eksternal

Diminta langsung: user mau bisa menambah tile "Akses Cepat" sendiri di Dashboard yang mengarah
ke layanan eksternal (contoh yang disebut: akun Cloudflare, akun ZeroTier), lengkap dengan
icon — boleh URL gambar atau kode base64, termasuk lewat file picker.

- Backend baru, `internal/quicklinks` — daftar `{id, label, url, icon}` disimpan sebagai file
  YAML sendiri (`dashboard.quickLinksFile`), **bukan** lewat mekanisme edit-config.yaml-lalu-
  restart yang dipakai toggle Terminal/ganti port (`internal/config/mutate.go`) — tile ini
  wajar ditambah/diedit/dihapus sering, restart proses tiap kali berubah adalah overkill jelas.
  Default path di paket Linux: `/opt/taros/quick-links.yaml` — sengaja bukan
  `/etc/taros/...` seperti `credentialsFile`, karena `/etc/taros` sendiri (bukan cuma
  file-file di dalamnya) tidak pernah di-chown ke service user oleh `scripts/install.sh`,
  cuma file spesifik seperti `config.yaml`/`credentials.yaml` yang di-chown satu-satu. Proses
  servis yang jalan tanpa root tidak akan bisa membuat file baru di `/etc/taros`.
  `/opt/taros/` sudah `chown -R` ke service user dari sononya (dipakai self-update), jadi
  dipakai ulang di sini tanpa perlu langkah instalasi tambahan apa pun.
- **Validasi & sanitasi di server, bukan cuma di UI**: URL tile harus `http://`/`https://` —
  skema lain (`javascript:` dicoba eksplisit saat pengujian, lihat di bawah) ditolak dengan
  pesan jelas. Icon (data base64, dengan/tanpa prefix `data:`) di-decode lalu byte-nya
  disniff pakai `http.DetectContentType` + pengecekan manual untuk SVG (XML teks, tidak
  dikenali sniffer bawaan net/http) — cuma PNG/JPEG/GIF/WebP/SVG yang diterima, maksimum
  150KB per icon. SVG aman dari script tersemat karena frontend selalu render lewat
  `<img src="...">`, tidak pernah `v-html` — sandbox browser bawaan untuk `<img>` sudah cukup.
- Layout grid "Akses Cepat" diubah dari kolom tetap (`repeat(5, 1fr)`) jadi
  `repeat(auto-fill, minmax(96px, 1fr))` — poin eksplisit yang diminta user ("sistem otomatis
  menyesuaikan, tidak merusak tampilan"): tile custom bisa bertambah sampai `maxLinks` (60,
  pagar bukan batas produk) tanpa perlu ubah CSS/media-query manual tiap kali.
- Efek samping yang disengaja: section "Akses Cepat" (termasuk tile navigasi bawaan) tadinya
  ikut tersembunyi total di macOS (lihat entri "Kompatibilitas macOS" di atas) karena berada
  di dalam blok template yang mensyaratkan `snapshot` metrics ada — padahal section ini sama
  sekali tidak butuh data `/proc`. Direstrukturisasi supaya "Akses Cepat" (dan sekarang tile
  custom-nya) tetap tampil di macOS, cuma bagian gauge/chart/storage/network yang tetap
  disembunyikan di balik cek `monitoringSupported && snapshot`.
- **Diuji end-to-end** lewat instance nyata + Puppeteer: tambah link (icon base64 mentah tanpa
  prefix `data:`, dan lewat file picker sungguhan), reject `javascript:alert(1)` sebagai URL
  (dikonfirmasi pesan error yang muncul), edit label, hapus lewat popconfirm, reload halaman
  untuk pastikan persist ke disk (dicek juga langsung isi file YAML-nya, bukan cuma lewat UI).
  Dua kesalahan ditemukan **di skrip pengujian**, bukan di kode aplikasi — dicatat di sini
  karena sama-sama masuk kategori "kesalahan proses" seperti kejadian `npm run build` di entri
  macOS di atas:
  - Percobaan pertama ganti isi field "Nama" saat edit pakai triple-click
    (`click({clickCount: 3})`) untuk select-all sebelum ketik ulang — tidak reliably men-select
    isi field NInput di lingkungan ini, hasilnya teks baru numpuk di belakang teks lama
    ("CloudflareCloudflare Dash"). Diganti pakai `Ctrl+A` sungguhan via `page.keyboard`,
    langsung benar di percobaan berikutnya.
  - `page.reload({ waitUntil: 'networkidle0' })` di halaman Dashboard timeout 30 detik — bukan
    bug persistensi (dicek langsung, data sudah benar tersimpan di file), tapi karena Dashboard
    selalu punya koneksi `EventSource` (`/api/stream/metrics`) terbuka yang membuat kondisi
    "0 koneksi network aktif" tidak pernah tercapai. Diganti `waitUntil: 'domcontentloaded'` +
    `waitForSelector` manual — pola yang sama harus dipakai untuk skrip Puppeteer lain yang
    me-reload halaman Dashboard ke depannya.

### Dukungan Multi-Bahasa (Indonesia/English) — frontend, default English untuk instalasi baru

Diminta langsung: TarOS mendukung Indonesia dan English, dengan **default English untuk
instalasi baru**. Sebelum implementasi, dikonfirmasi eksplisit ke user (via pertanyaan
pilihan): scope fase ini **frontend-only** atau **full-stack termasuk pesan error backend**.
User pilih frontend-only — eksplorasi kode sempat menemukan ~40 pesan error unik Bahasa
Indonesia yang dikirim backend Go langsung lewat field `error` JSON tanpa layer translasi
(`internal/web/handlers_*.go` + beberapa package lain), dan menerjemahkan itu butuh sistem
kode-error terpisah di Go — scope jauh lebih besar dari migrasi frontend, sengaja dideferred.

- **Skala migrasi**: ~400-450 string hardcoded Bahasa Indonesia tersebar di 9 halaman
  `views/`, `AppShell.vue`, dan beberapa komponen bersama (`MiniPlayer.vue`,
  `FilePreviewOverlay.vue`, `FileTreeNode.vue`) — dikerjakan file demi file, masing-masing
  di-`vue-tsc --noEmit` sebelum lanjut ke file berikutnya untuk menangkap kesalahan lebih awal
  daripada menumpuk sampai akhir.
- **Library**: `vue-i18n` — sempat pasang v10 dulu, ternyata sudah deprecated (pesan npm warn
  eksplisit "please migrate to v11"), langsung ganti ke v11 sebelum lanjut, bukan lanjut pakai
  versi yang sudah tidak di-maintain.
- **Type safety key locale**: `id.ts` di-type `satisfies MessageSchema` (`MessageSchema = typeof en`
  diekspor dari `en.ts`) — investasi kecil yang langsung terbukti berguna di skala ~500 key:
  vue-tsc menangkap kalau ada key ketinggalan di salah satu locale saat build, bukan baru
  ketahuan runtime sebagai teks kosong/`ns.key` mentah yang bocor ke UI.
- **Bug type nyata ditemukan saat build** (bukan di skrip pengujian, di kode aplikasi sendiri):
  `createI18n<[MessageSchema], Locale>({ legacy: false, ... })` lolos di `vue-tsc --noEmit`
  tapi gagal di `vue-tsc -b` (mode yang sebenarnya dipakai `npm run build`) — `Legacy` generic
  parameter tidak ter-infer `false` dari opsi runtime `legacy: false`, jadi `i18n.global.locale`
  ke-resolve sebagai composer mode **legacy** (`locale` string biasa, bukan `Ref`). Fix:
  eksplisit generic ketiga — `createI18n<[MessageSchema], Locale, false>(...)`. Ini pelajaran
  penting: `--noEmit` dan `-b` bisa punya hasil type-check berbeda untuk kasus overload
  resolution seperti ini, `npm run build` yang sebenarnya tetap wajib dijalankan sebelum
  menganggap type-check "aman", tidak cukup cuma `--noEmit` di tengah proses migrasi.
- **`Intl.DateTimeFormat` bawaan, bukan array terjemahan manual**: nama hari/bulan di jam
  Dashboard (sebelumnya `DAYS`/`MONTHS` array hardcoded Indonesia) diganti
  `new Intl.DateTimeFormat(locale === 'id' ? 'id-ID' : 'en-US', {...})` — localisasi tanggal
  yang benar dari browser sendiri, tanpa perlu maintain terjemahan nama hari/bulan sendiri.
  Jam di-update tiap 15 detik lewat timer, jadi ditambah `watch(locale, tickClock)` terpisah
  supaya tanggal langsung ter-update instan saat switch bahasa, bukan nunggu tick berikutnya.
- **`NDataTable` columns jadi reaktif**: beberapa halaman (`ServiceView`, `DockerView`,
  `FilesView`) punya `const columns: DataTableColumns<T> = [...]` di scope modul — judul
  kolom yang manggil `t()` di situ **tidak reaktif** kalau tetap `const` biasa (dievaluasi
  sekali saja saat komponen di-setup, tidak re-run saat locale berubah). Diganti jadi
  `computed<DataTableColumns<T>>(() => [...])` di semua tempat itu — pattern yang perlu
  diingat untuk kolom tabel apa pun yang isinya bergantung locale ke depannya.
- **Naive UI punya sistem locale sendiri, terpisah dari `vue-i18n`**: ditemukan saat
  screenshot pengujian — placeholder default `NInput` yang tidak di-set eksplisit tetap
  tampil "Please Input" (Inggris) meski sudah switch ke Indonesia. Naive UI ternyata sudah
  menyediakan locale `idID`/`dateIdID` bawaan (`import { idID, dateIdID } from 'naive-ui'`) —
  disambungkan lewat `NConfigProvider`'s `:locale`/`:date-locale` props di `App.vue`, mengikuti
  `useLocale()` yang sama. Tanpa ini, sebagian kecil UI (placeholder, date-picker, dst) akan
  tetap "nyangkut" Inggris walau seluruh app sudah di-switch — celah yang mudah terlewat kalau
  cuma mengandalkan grep string literal (ini string internal library, bukan hardcode di kode
  aplikasi).
- **Preferensi disimpan**: `composables/useLocale.ts`, meniru persis pola `useTheme.ts` yang
  sudah ada (module-level state, bukan Pinia store) — `localStorage` key `tk-locale`, default
  `'en'` kalau belum ada. Switcher (`LocaleSwitcher.vue`) dipasang di topbar (`AppShell.vue`)
  dan di halaman Login (bisa di-switch sebelum login).
- **Diuji end-to-end** lewat instance nyata + Puppeteer, browser context terisolasi (bukan
  cuma clear localStorage di tab yang sama) untuk memastikan simulasi "instalasi baru" benar
  bersih: default English terkonfirmasi di semua label nav + eyebrow "Quick Access", switch ke
  Indonesia instan tanpa reload (nav labels, "Akses Cepat", format tanggal jam
  "Jumat, 7 Agustus 2026"), preferensi persist setelah reload halaman, 5 halaman lain
  (Docker/Service/Proses/Files/Settings) dicek konsisten Bahasa Indonesia tanpa campur Inggris,
  regex-scan teks halaman untuk pola `namespace.key` mentah yang bocor (indikasi key hilang) —
  hasilnya kosong, nol console/page error di sepanjang pengujian.

### Dukungan Multi-Bahasa (Indonesia/English) — Fase 2: backend (kode error + terjemahan)

Lanjutan langsung dari fase frontend-only di atas — user minta lanjut ke bagian backend yang
sengaja dideferred saat itu. Riset ulang (manual + agent riset independen, hasil konsisten)
menemukan cakupan lebih besar dari perkiraan awal: **65 call site** `writeJSONError` (bukan
~40), **67 pesan Bahasa Indonesia unik** tersebar di 11 file `handlers_*.go` + `ws_terminal.go`,
plus satu **permukaan keempat yang terlewat di perkiraan awal**: `fileexplorer.JobSnapshot.Error`
di-stream lewat SSE ke job-progress panel `FilesView.vue` — transportnya beda sama sekali dari
`writeJSONError`, butuh penanganan terpisah.

- **Desain: kode-error, bukan translate string di Go.** Backend tidak tahu locale aktif user
  per-request tanpa header tambahan, dan menduplikasi mesin terjemahan di dua bahasa pemrograman
  itu boros. Sebagai gantinya backend kirim kode stabil (+ params interpolasi opsional) lewat
  envelope `{error, code?, params?}` (backward-compatible, `error` tetap ada) — frontend yang
  sudah punya `vue-i18n` dari Fase 1 yang resolve terjemahannya. Detail lengkap mekanismenya di
  [04-features.md](04-features.md) §4.10 "Pesan error backend".
- **Import cycle dihindari lewat leaf package baru**: draft awal taruh konstanta kode langsung
  di `internal/web`, tapi `internal/quicklinks` (yang perlu attach kode ke error validasinya
  sendiri) sudah di-import balik oleh `internal/web` — jadi tidak bisa import balik. Dipindah ke
  package baru dependency-free `internal/apierr`, dipakai `internal/web` maupun
  `internal/quicklinks`/`internal/fileexplorer` tanpa masalah.
- **Migrasi dipandu compile error**: mengubah signature `writeJSONError` (nambah `code`,
  `params`) langsung membuat semua 65 pemanggilan lama gagal compile — output `go build ./...`
  dipakai sebagai checklist literal, migrasi file demi file, `go build ./internal/web/...`
  ulang tiap habis satu file sebelum lanjut (pola sama seperti vue-tsc per-file di Fase 1).
- **`{detail}` param untuk error yang tidak bisa diklasifikasi lebih jauh**: error yang
  membungkus OS/stdlib/Docker daemon/`systemctl` stderr (disk penuh, permission denied,
  `net.Listen` gagal, dst) tidak dapat kode unik per varian — satu kode generik per titik
  panggil (menjelaskan *aksi* yang gagal, mis. `file_op_failed`, `port_unavailable`) dengan
  `err.Error()` mentah dikirim sebagai param `{detail}`, ditempel di template kalimat
  terjemahan. Filosofinya sama seperti stack-trace/log detail — tidak perlu diterjemahkan.
- **Frontend resolve di titik lempar (`client.ts`'s `request()`), bukan di titik tangkap** —
  keputusan desain paling menghemat waktu di fase ini: `ApiError.message` sudah jadi teks
  terjemahan final saat instance dibuat (pakai locale `vue-i18n` aktif saat itu), jadi seluruh
  ~40 titik `e instanceof ApiError ? e.message : t(...)` yang sudah ada dari Fase 1 di 13 file
  Vue otomatis benar tanpa satu pun perlu diubah.
- **SSE job errors ditangani terpisah**: karena tidak lewat `client.ts`'s `request()`
  (EventSource, bukan fetch JSON), `FilesView.vue` resolve sendiri lewat `useI18n()`'s `t`/`te`
  langsung saat merender `activeJob.error` — kode tunggal `job_failed` + `{detail}` (semua
  kegagalan copy/move di sini memang tidak terklasifikasi lebih jauh, tidak perlu kode
  bervariasi).
- **`internal/quicklinks` satu-satunya package yang perlu refactor sumber** (selain
  `internal/web`) — `invalidInputError` sebelumnya pre-bake string hasil `fmt.Sprintf` lewat
  `invalidf(...)`; ditambah field `code`/`params`, plus fungsi `CodeAndParams(err)` baru supaya
  `handlers_quicklinks.go` bisa ekstrak balik. Package lain (`selfupdate`, `fileexplorer`,
  `config`, `auth`, `docker`, `systemd`) tidak perlu diubah sumbernya sama sekali — pesan
  human-readable mereka (14 pesan `selfupdate`, semua Bahasa Indonesia) tetap keluar lewat
  cuma segelintir titik `writeJSONError` di level handler, cukup satu kode per call site di
  situ.
- **Verifikasi 1:1 lewat grep silang otomatis**: 62 konstanta Go `apierr` ⟷ 62 key
  `errors.*` TypeScript nyata di `en.ts` maupun `id.ts`, nol mismatch di kedua arah — compiler
  tidak bisa enforce ini lintas bahasa (Go ↔ TS), jadi grep manual di akhir jadi gerbang wajib
  sebelum dianggap selesai.
- **Diuji end-to-end** lewat instance nyata: skenario representatif di kedua locale (password
  salah di Settings, quick-link URL invalid `javascript:`, rename folder ke nama yang sudah
  ada). Satu skrip Puppeteer sempat false-negative karena bug di skrip tes sendiri (state UI
  tidak direset antar skenario, bukan bug aplikasi) — diperbaiki dengan fresh browser context
  per skenario. Skenario rename-conflict lewat klik UI gagal karena tebakan selector DOM
  `NDataTable` salah (test-only) — dipindah ke verifikasi langsung via `curl` terautentikasi
  (cookie + CSRF token dari login asli), lebih reliable untuk memastikan bentuk JSON persis
  (`code`, `params.detail`) daripada mengejar selector library UI yang fragile.

### Notifikasi Discord (CPU/RAM/Suhu melebihi threshold berkelanjutan)

Diminta langsung: kirim notifikasi ke Discord (via webhook) kalau CPU, RAM, atau suhu CPU
melebihi threshold **selama lebih dari kurun waktu tertentu** (bukan spike sesaat) — threshold
dan durasi configurable lewat UI, idealnya pakai slider. User menempel satu URL webhook Discord
asli langsung di chat untuk dites end-to-end.

- **Package baru `internal/notify`**, ditiru persis dari pola `internal/quicklinks` (fitur
  paling mirip yang sudah ada): `Store` mutex-guarded, persist ke YAML file terpisah dari
  `config.yaml` (path configurable lewat `notify.settingsFile`, default `./notify.yaml`),
  live-mutable tanpa restart service — beda dari `internal/config/mutate.go`'s pola
  edit-lalu-restart yang dipakai terminal/port, karena thresholds ini memang dimaksudkan
  ditata-ulang casually, bukan sekali-set.
- **Beda dari quick-links.yaml**: file ini berisi secret (URL webhook Discord — siapa pun yang
  punya URL itu bisa post ke channel Discord user), jadi ditulis **0600** (bukan 0644) dan
  ditambahkan ke `.gitignore` (`/notify.yaml`) — perlakuan sama dengan `credentials.yaml`.
  Webhook URL divalidasi domainnya ketat (`discord.com`/`discordapp.com` saja) karena field ini
  jadi origin `http.Post` keluar — cegah SSRF lewat field konfigurasi ini.
- **Desain kode**: state machine sustained-threshold di `internal/notify.Monitor` — ticker 10
  detik, mengevaluasi `store.Store.Latest()` (sumber data yang sama dengan Dashboard) per
  metrik. Breach dicatat waktu mulainya; alert terkirim sekali begitu breach kontinu (tidak
  boleh drop di antara tick) bertahan ≥ durasi konfigurasi; recovery terkirim sekali begitu
  metrik turun lagi di bawah threshold. **Sengaja tidak ada notifikasi berulang** selama breach
  berlangsung — keputusan desain yang disengaja (bukan keterbatasan): mencegah channel Discord
  banjir pesan tiap 10 detik selama insiden panjang, dan menghindari perlu config tambahan
  "cooldown/repeat every" yang bikin UI lebih ribet dari yang diminta.
- **3 metrik independen** (CPU/RAM 1–100%, Suhu CPU 30–120°C, durasi 1–60 menit) — tiap metrik
  toggle enable sendiri, terpisah dari toggle enable keseluruhan. Perangkat tanpa sensor suhu
  otomatis dilewati (`len(snap.Temps) == 0`), bukan false-alarm di pembacaan 0°C.
  Goroutine `Monitor.Run` cuma jalan kalau `systemMonitoringSupported` (gate sama seperti
  `internal/collector` di `cmd/taros/main.go`).
- **UI slider** (`NSlider`, dipakai pertama kali di codebase ini — Naive UI tidak auto-import
  jadi ditambah eksplisit ke import list `SettingsView.vue`) untuk threshold & durasi tiap
  metrik, dengan angka live di sampingnya. Satu tombol "Simpan" eksplisit (bukan auto-save tiap
  geser slider) — menghindari spam API saat drag, pola sama seperti alur-alur lain di halaman
  ini. Tidak pakai alur password-confirm seperti toggle Terminal/Port: fitur ini tidak
  merestart service atau memberi capability baru, sama seperti quick links.
- **Endpoint test terpisah** (`POST /api/notify/test`, terima `webhookUrl` opsional di body) —
  supaya webhook bisa diverifikasi sebelum diklik Save, dipakai juga oleh tombol "Kirim Test"
  di UI.
- **Pesan Discord sebagai embed** (bukan `content` teks polos) — merah untuk alert, hijau untuk
  recovery, biru untuk test, field nilai-saat-ini/threshold/durasi-bertahan, footer
  `TarOS · <hostname>`. Sengaja tetap Bahasa Indonesia (tidak ikut sistem i18n UI Vue dari fase
  sebelumnya) — ini pesan ke channel Discord milik user sendiri, bukan bagian UI aplikasi yang
  perlu dwibahasa.
- **Kehati-hatian kredensial**: URL webhook yang ditempel user di chat **tidak pernah ditulis
  ke source code, docs, atau commit apa pun** — cuma dipakai manual lewat API/UI saat pengujian
  end-to-end di instance dev lokal (tersimpan di `notify.yaml` yang sudah di-gitignore).
  `internal/notify.sendWebhook`'s error path juga sengaja tidak pernah menyertakan URL webhook
  itu sendiri (cuma status/body respons Discord), supaya tidak bocor ke `server.log` atau
  response error API kalau pengiriman gagal.
- **Diuji end-to-end nyata** dengan webhook Discord asli dari user: validasi negatif (domain
  webhook salah → 400 `notify_webhook_invalid`, threshold/durasi di luar rentang → 400
  `notify_threshold_range`/`notify_duration_range`, alert diaktifkan tanpa webhook → 400
  `notify_webhook_required`), endpoint test (`POST /api/notify/test` → `{sent:true}`), lalu
  skenario penuh: rule CPU diaktifkan dengan threshold rendah (1%, hampir selalu breach) +
  durasi minimum (1 menit) → alert 🔴 terkirim setelah breach bertahan cukup lama tanpa error di
  log; threshold lalu dinaikkan drastis (99.9%) → recovery ✅ terkirim di tick berikutnya begitu
  nilai turun di bawah threshold baru. Setelah pengujian, `notify.yaml` lokal dibersihkan dan
  webhook dikosongkan lagi supaya tidak ada kredensial nyala tanpa sepengetahuan user setelahnya.

### Shortcut Folder — File Explorer

Diminta langsung: bisa menandai folder terpilih di File Explorer jadi "shortcut", lalu
shortcut itu muncul di sidebar File Explorer dan/atau halaman utama Dashboard — **per-shortcut,
user yang pilih mau ditampilkan di mana**, bukan setting global satu-satunya.

- **Package baru `internal/foldershortcuts`**, ditiru langsung dari `internal/quicklinks`
  (Fase 5, Akses Cepat Custom) — pola paling mirip yang sudah ada: `Store` mutex-guarded,
  full-file YAML rewrite, `invalidInputError`+`CodeAndParams`. Beda mendasarnya: datanya bukan
  URL eksternal tapi path internal di dalam filesystem yang dijaga `fileexplorer.Jail`, jadi
  butuh validasi jail-boundary + "harus folder yang benar-benar ada" — keputusan desain
  penting: validasi itu **tidak** ditaruh di package `foldershortcuts` sendiri (biar tidak
  perlu import `fileexplorer` ke situ), tapi di layer handler (`internal/web`), yang sudah
  punya akses `Jail.Resolve` yang sama dipakai semua `handlers_files.go`. Package
  `foldershortcuts` sendiri cuma validasi bentuk data (label, non-duplicate path, minimal
  satu lokasi tampil dipilih, cap jumlah).
- **Tidak seperti `notify.yaml`, file ini bukan secret** (cuma path folder, bukan kredensial)
  — tetap 0644 seperti `quick-links.yaml`, tidak perlu masuk `.gitignore`.
- **Toggle pin/unpin simetris di row action**: ikon bookmark di kolom Aksi (list view) & tile
  action (grid view) File Explorer, muncul cuma untuk folder. Klik pada folder belum di-pin
  → buka modal (nama default nama folder, dua checkbox lokasi tampil, keduanya default
  tercentang); klik pada folder sudah di-pin → langsung unpin tanpa modal — simetris dengan
  bintang favorit di aplikasi lain, disengaja low-friction karena re-pin cuma satu klik lagi.
- **Sidebar File Explorer** dapat section baru di atas tree navigasi folder yang sudah ada
  (`FileTree.vue`, tidak diubah — section baru ditambah sebagai sibling-nya di
  `FilesView.vue`, bukan modifikasi komponen itu) — perlu sedikit penyesuaian CSS
  (`.files-sidebar` jadi flex column, `.file-tree` dapat `flex:1; min-height:0`) supaya tree
  di bawahnya tetap scroll dengan benar setelah ada section baru di atasnya.
- **Dashboard dapat section terpisah** (bukan digabung ke grid "Akses Cepat Custom" yang
  sudah ada — beda semantik: navigasi internal vs link eksternal), cuma dirender kalau ada
  minimal satu shortcut `showOnDashboard=true`, tanpa tombol "Add" di situ — pembuatan
  shortcut sengaja dibatasi cuma dari halaman Files, Dashboard murni titik akses cepat +
  bisa unpin cepat. Tile pakai `RouterLink` ke `/files?path=...`, memanfaatkan routing query
  yang sudah didukung penuh sejak Fase 3, tidak perlu route baru.
- **Diuji end-to-end** lewat curl langsung (validasi: path di luar jail → 403
  `folder_shortcut_path_invalid`; path bukan direktori → 400 kode yang sama; duplicate path →
  400 `folder_shortcut_duplicate_path`; kedua checkbox lokasi dimatikan → 400
  `folder_shortcut_no_destination`; label kosong → default nama folder) dan Puppeteer end-to-end
  nyata (pin dari list-view, sidebar section muncul dengan label benar, klik navigasi ke
  folder yang tepat, tile Dashboard muncul & bisa diklik & bisa di-unpin) — nol console/page
  error di seluruh pengujian, dikonfirmasi lewat screenshot bukan cuma teks (dua "gagal" di
  assertion teks skrip ternyata cuma soal `text-transform: uppercase` CSS pada judul section,
  bukan bug — dikonfirmasi lewat screenshot render sebenarnya sebelum disimpulkan aman).

### Log Container Docker (live-tail, dibatasi waktu ke belakang)

Diminta user, tapi **didiskusikan dulu sebelum diimplementasikan** — pertanyaan awal: apakah
fitur ini berat, dan apakah perlu realtime atau cukup on-demand (mirip Service Logs §4.3 yang
sudah ada, cuma 50 baris sekali ambil). Keputusan akhir user: realtime lebih baik, dengan
syarat backlog awal dibatasi rentang waktu supaya tidak berat.

- **Kenapa tidak sekadar meniru Service Logs**: itu one-shot fetch (`journalctl`, 50 baris,
  bukan live) — live-tail Docker butuh mekanisme streaming baru: baca `io.Reader` yang tidak
  pernah "selesai" selama koneksi `follow=1` masih terbuka, bukan poll berkala kayak SSE metrics
  yang sudah ada (`handleMetricsStream`, ticker-driven) atau one-shot fetch macam Service Logs.
- **`internal/docker.Client`'s `do()` yang sudah ada tidak bisa dipakai** — selalu `io.ReadAll`
  seluruh body, yang untuk request `follow=1` berarti menunggu selamanya (respons tidak pernah
  "selesai" selama container hidup). Ditambah method baru `stream()` yang mengembalikan
  `*http.Response` mentah, plus **http.Client kedua** (`streamHTTP`, share Transport/Unix
  socket dialer yang sama, tapi **tanpa** `Timeout` client-level) — `http.Client.Timeout` yang
  sudah ada di client utama (10 detik, cocok untuk request pendek) kalau dipakai juga untuk
  streaming akan mematikan live-tail tepat 10 detik setelah connect, terlepas dari ada
  aktivitas atau tidak. Cukup mengandalkan `context` request untuk cancellation (ditemukan
  lewat baca dokumentasi `net/http`: context request memang sudah meng-cover seluruh siklus
  hidup request **termasuk** membaca response body, jadi tidak perlu goroutine tambahan buat
  `resp.Body.Close()` manual saat context dibatalkan).
- **Docker log stream format** (container non-TTY, kasus paling umum): di-multiplex per-frame,
  header 8-byte (`byte[0]`=stream type 1/2 stdout/stderr, `byte[4:8]`=size big-endian) diikuti
  payload sepanjang itu — diimplementasikan manual (`internal/docker/logs.go`'s
  `readMultiplexedLogs`, buffer per-stream terpisah supaya baris stdout/stderr yang datang
  berselang-seling tidak saling potong). Container `Tty:true` **tidak** di-multiplex (raw
  bytes, stdout+stderr tidak bisa dibedakan Docker sendiri) — dideteksi otomatis lewat
  `Config.Tty` dari `GET /containers/{id}/json` sebelum tahu jalur parsing mana yang dipakai.
  **Kedua jalur diverifikasi langsung** terhadap container non-TTY dan TTY nyata (`docker run`
  biasa vs `docker run -t`), bukan cuma dibaca dari dokumentasi API — tidak ada frame
  header/binary yang bocor jadi teks di kedua kasus.
- **SSE endpoint baru, event-driven** (`handleDockerContainerLogsStream`) — beda dari
  `handleMetricsStream` yang ticker-driven (push tiap interval tetap), di sini `for line :=
  range ch` langsung push tiap kali ada baris baru dari goroutine pembaca stream Docker.
- **Backlog dibatasi di server** (`tail` clamp 1–2000, `sinceMin` clamp 1–1440, sama semangat
  cap sanity lain di codebase ini seperti `quicklinks.maxLinks`) — dropdown di UI (15m/1h/6h/
  24h, default 15m) ganti pilihan = reconnect (`EventSource` baru) dengan backlog baru.
- **Tidak ada proses yang jalan terus-menerus tanpa drawer terbuka** — dikonfirmasi bukan cuma
  klaim desain: dibandingkan jumlah file descriptor proses `taros` sebelum, selama, dan setelah
  satu sesi curl streaming — naik 2 saat aktif, balik ke angka semula persis setelah client
  disconnect. Beda total dari fitur lain yang memang selalu polling (`internal/notify.Monitor`).
- **Frontend**: `useContainerLogsStream.ts` (baru) — pola `EventSource` sama seperti
  `useMetricsStream.ts`, tapi lifecycle dikontrol manual (`open()`/`close()`, bukan
  `onMounted`/`onUnmounted` otomatis) karena hidupnya terikat buka-tutup drawer per container,
  bukan umur halaman. Baris di-cap 5000 di sisi klien juga (mencegah tab browser makan memori
  tak terbatas kalau drawer dibiarkan terbuka lama di container yang sangat cerewet nulis log).
  Auto-scroll berhenti otomatis kalau user scroll ke atas baca baris lama, lanjut lagi begitu
  balik ke bawah — pola umum log viewer, dideteksi dari `scrollTop`/`scrollHeight` manual.
- **Diuji end-to-end nyata**: container `busybox` non-TTY yang sengaja nulis stdout+stderr
  bergantian tiap detik (buat verifikasi demux benar dan live-tail benar-benar live, bukan cuma
  snapshot sekali ambil), container `busybox -t` (TTY) terpisah untuk jalur raw, error handling
  (container id tidak ada → 404 JSON biasa, bukan SSE kosong), drawer UI penuh via Puppeteer
  (klik tombol Logs, baris bertambah live selama drawer terbuka, warna stderr beda, ganti
  dropdown rentang waktu benar-benar reconnect, tutup drawer).

### Analisis Disk (file/folder terbesar, hapus atas persetujuan admin)

Diminta user sebagai "analisis resource server untuk optimasi — yang tidak diperlukan bisa
dihapus atas persetujuan admin" — **didiskusikan dulu sebelum diimplementasikan** karena
scope-nya berpotensi sangat luas (disk, Docker, service, proses sekaligus). Disepakati mulai
sempit dari analisis disk usage (file/folder besar) dulu; kategori lain (Docker unused
images/volumes, service systemd gagal terus-menerus, log rotation) sengaja belum digarap —
dicatat sebagai ide lanjutan di Fase 6 di bawah.

- **Backend 100% read-only** — `internal/fileexplorer.Scan` (baru) cuma melaporkan; penghapusan
  memakai endpoint file explorer yang **sudah ada** (`POST /api/files/op`
  `{"action":"delete"}`), bukan endpoint delete baru. Diverifikasi eksplisit lewat curl langsung
  ke endpoint itu dengan path hasil scan, dan lewat klik tombol beneran di UI (checkbox pilih
  file → "Delete Selected" → konfirmasi `NPopconfirm`) — keduanya berhasil menghapus file
  sungguhan dari disk dan file itu hilang dari hasil scan ulang.
- **Reuse `Jail` yang sama dengan File Explorer** (root & blocklist) — diverifikasi terhadap
  filesystem nyata (bukan sekadar baca kode): `/etc/shadow`, `/proc`, `/sys`, dan direktori
  `.ssh` (dikonfirmasi ada secara nyata di home directory device test) **tidak pernah muncul**
  di hasil scan sama sekali.
- **Skip mount point lain** (`st_dev` dibandingkan ke root, pola `du -x`) — diverifikasi
  terhadap device test yang punya mount nyata beragam: HDD eksternal (`fuseblk`), network share
  SMB, `vfat` (`/boot/firmware`), dan beberapa `tmpfs` (`/tmp`, `/dev`, `/run`) — semuanya
  terdeteksi & masuk `skippedMounts`, tidak ikut ke-walk.
- **Top 50 file terbesar via min-heap ukuran tetap**, breakdown folder cuma satu level (anak
  langsung root) dengan tombol deep-link "Buka di File Explorer" (`/files?path=...`).
- **Nonaktif secara default** (`diskAnalysis.enabled: false`), route scan tidak didaftarkan
  sama sekali kalau off (pola sama Web Terminal) — diverifikasi: `GET
  /api/disk-analysis/status` selalu merespons `{"enabled":false}`, tapi `POST
  /api/disk-analysis/scan` benar-benar 404 (bukan 403), dan nav item tidak muncul di sidebar.
- **Waktu scan nyata**: `/` penuh (~114GB terpakai, isi device development sungguhan — repo
  git, dependency Node/Python, video, dll) selesai dalam **11–26 detik** tergantung cache
  filesystem OS (percobaan pertama 26.3s, percobaan berikutnya dengan cache hangat 11.5s) — cukup
  cepat untuk request HTTP biasa (bukan job/SSE) di v1, tapi dicatat sebagai sesuatu yang perlu
  dipantau kalau dipakai di device dengan storage jauh lebih lambat (eMMC/SD STB) atau tree file
  yang jauh lebih besar — jalur job/SSE ala `internal/fileexplorer/job.go` jadi opsi kalau
  ternyata perlu.
- **Diuji end-to-end nyata** (bukan cuma unit-level): scan sungguhan terhadap root `/` device
  development (bukan direktori sintetis kecil), delete lewat curl langsung DAN lewat klik UI
  penuh via Chromium headless (CDP mentah, tanpa Puppeteer) — login sungguhan, klik "Run
  Analysis", pilih file lewat checkbox, klik "Delete Selected", konfirmasi popup, verifikasi file
  hilang dari disk (`ls` gagal) dan hilang dari hasil scan ulang di UI.
- **Follow-up hari yang sama**: user minta toggle live dari Settings (awalnya sengaja
  config-file-only). Ditambahkan `handleSettingsDiskAnalysis` (`POST
  /api/settings/disk-analysis`) + `config.SetDiskAnalysisEnabled` — pola restart-and-reload
  persis toggle Terminal, tapi **tanpa** re-konfirmasi password (beda tingkat risiko: fitur ini
  cuma menambah kapabilitas baca, bukan kapabilitas hapus baru). Diuji lewat klik switch
  sungguhan di UI (bukan panggil API langsung) dengan simulasi `Restart=always` (loop bash
  restart proses tiap keluar, meniru systemd di device dev) — konfirmasi dua arah: aktifkan lalu
  nonaktifkan, keduanya benar ter-restart & ter-refleksi di status setelah login ulang (sesi
  hilang setelah restart, sama seperti efek toggle Terminal).

## Fase 6 — Opsional / Masa Depan (di luar scope awal)

Tidak dikerjakan kecuali kebutuhan berubah — dicatat di sini supaya keputusan arsitektur
saat ini (lihat [01-overview.md](01-overview.md) "Non-Tujuan") tidak menutup jalan ke sana:

- Persistensi histori metrics (SQLite, opt-in) — lihat [05-data-storage.md](05-data-storage.md).
- Multi-node/central dashboard (agregasi dari beberapa perangkat).
- Alerting (threshold-based, notifikasi Telegram/webhook).
- Perekaman sesi terminal (opt-in, dengan peringatan eksplisit) — lihat
  [07-security.md](07-security.md) §7.6 kenapa ini tidak jadi default.
- Login terminal berbasis PAM/user sistem asli (bukan lagi user service `taros` tunggal) —
  dipertimbangkan lagi kalau kebutuhannya berkembang jadi multi-user administrasi penuh.
- Log viewer streaming (bukan tail on-demand) untuk container & systemd unit.
- Multi-user dengan role-based access.
- Halaman Pengaturan lengkap — ganti password admin, interval polling, root direktori file
  explorer, daftar unit systemd "terproteksi". Toggle Terminal dan TOTP (2FA) sudah ada
  (lihat entri "Halaman Pengaturan (awal)" dan "TOTP (2FA), opsional dari Pengaturan" di
  atas) — sisanya belum.
- Kategori tambahan untuk Analisis Disk (lihat entri di atas), sengaja belum digarap di v1:
  Docker unused images/volumes (sebagian sudah ada lewat tombol Cleanup di §4.2, belum
  terintegrasi ke laporan analisis), service systemd yang gagal terus-menerus (data-nya sudah
  ada lewat `systemd.List()` + filter `Active == "failed"`, tinggal disatukan ke laporan), log
  rotation/cache buildup dengan pola nama file spesifik (bukan cuma ranking ukuran mentah).

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
