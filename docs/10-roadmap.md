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
  terpasang — proyek yang justru digantikan TarkimanOS): navigasi via sidebar `RouterLink`,
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

## Fase 4 — Web Terminal (selesai-dev; validasi STB fisik tertunda)

- `internal/terminal/`: `pty.go` (`spawnPTY`/`resizePTY` lewat `creack/pty`, shell diambil
  eksplisit dari `terminal.shell` di config — **tidak** bergantung shell akun `tarkimanos` di
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
  `deploy/systemd/tarkimanos.service` tidak punya `SystemCallFilter=` seccomp, dan `setpgid`
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
