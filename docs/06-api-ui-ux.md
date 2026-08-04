# 6. API & UI/UX

## 6.1 Desain API

Navigasi sekarang campuran dua model, tergantung apakah halamannya sudah dimigrasi ke Vue
(lihat [03-tech-stack.md](03-tech-stack.md) "Kenapa pivot ke Vue?"): **SPA** (Vue, client-side
routing) untuk halaman yang sudah dimigrasi, dan **SSR** (`html/template`) + **htmx** untuk
partial update pada halaman yang belum. Endpoint dikelompokkan:

### Halaman (Vue SPA, `GET` → shell `index.html`, routing di client)

| Route | Deskripsi |
|---|---|
| `GET /login` | Halaman login (`LoginView.vue`) |
| `GET /` | Dashboard utama (`DashboardView.vue`) |
| `GET /docker` | Docker — tab Containers/Images/Volumes/Networks/Settings (`DockerView.vue`, tab sebagai state client, bukan lagi `?tab=` query) |
| `GET /services` | Daftar & kontrol systemd unit (`ServiceView.vue`) |
| `GET /files` | File explorer (`FilesView.vue`, path via query `?path=` — sinkron dengan URL agar bisa dibagikan/bookmark, sama seperti perilaku `hx-push-url` versi lama) |

### Halaman (SSR, `GET` → HTML lengkap) — belum dimigrasi ke Vue

| Route | Deskripsi |
|---|---|
| `GET /files/edit` | Editor teks (`?path=`) |
| `GET /terminal` | Halaman web terminal (xterm.js full-screen) — belum dibangun, lihat [10-roadmap.md](10-roadmap.md) |
| `GET /settings` | Halaman pengaturan — belum dibangun |

### Fragment (htmx, `GET`/`POST` → potongan HTML untuk swap)

Docker, Service, dan Files tidak lagi di sini — lihat REST/JSON di bawah, dimigrasi bersamaan
dengan `DockerView.vue`/`ServiceView.vue`/`FilesView.vue`. Tidak ada fragment htmx tersisa —
satu-satunya halaman yang belum dimigrasi (`/files/edit`) tidak punya fragment sama sekali,
seluruh isinya di-fetch via JS (lihat `/api/files/content` di bawah).

### REST/JSON (dipakai oleh JS klien, misal chart)

| Route | Deskripsi |
|---|---|
| `GET /api/stream/metrics` | **SSE** — push snapshot metrics (CPU/RAM/disk/temp/net) tiap tick |
| `GET /api/metrics/history?metric=cpu` | Data histori untuk chart (dari ring buffer). Fase 1: `metric` ∈ `cpu\|mem\|diskRead\|diskWrite\|tempMax`, selalu mengembalikan seluruh isi buffer (~15 menit) — parameter `range` dicadangkan untuk nanti kalau tingkat retensi lebih panjang (lihat [05-data-storage.md](05-data-storage.md)) sudah ada untuk dipilih |
| `GET /api/terminal/ws` | **WebSocket** — sesi PTY interaktif (stdin/stdout + resize control message) |
| `GET /api/docker/{containers\|images\|volumes\|networks}` | List, dikonsumsi `DockerView.vue` per-tab (lazy: fetch pertama kali tab diaktifkan, bukan semua sekaligus di awal). 503 `{error, enabled}` kalau Docker off di config atau daemon tidak terjangkau — `enabled` membedakan dua kasus itu tanpa klien perlu parse teks pesan |
| `POST /api/docker/containers/{id}/{start\|stop\|restart\|remove}` | Aksi container, return list container ter-refresh (sama seperti perilaku fragment lama, sekarang JSON) — error daemon (mis. 409 masih berjalan) diteruskan dengan status code aslinya, bukan diratakan jadi 500 |
| `POST /api/docker/images/{id}/remove` | Hapus image, return list image ter-refresh |
| `POST /api/docker/volumes/{name}/remove` | Hapus volume, return list volume ter-refresh |
| `POST /api/docker/networks/{id}/remove` | Hapus network, return list network ter-refresh |
| `GET /api/docker/settings` | `{info, diskUsage}` — info daemon + ringkasan disk usage. Bisa makan beberapa detik (`/system/df` daemon-side mahal dengan banyak image/container — perilaku Docker sendiri, bukan regresi migrasi ini), `DockerView.vue` menampilkan spinner selama itu, bukan panel kosong |
| `POST /api/docker/prune/{containers\|images\|volumes\|networks\|all}` | Cleanup, return `{info, diskUsage}` ter-update |
| `GET /api/services/list?q=&showAll=&failedOnly=` | Daftar systemd unit, filter sama seperti versi htmx lama — `q` cocok substring nama/deskripsi, `showAll=1` ikutkan socket/timer (default cuma `service`), `failedOnly=1` hanya `active=="failed"`. Tiap unit dapat field `protected` (dari `config.yaml` `systemd.protectedUnits`) |
| `POST /api/services/{name}/{start\|stop\|restart\|reload}` | Aksi unit (butuh `sudo -n systemctl` bisa jalan — lihat [09-deployment.md](09-deployment.md) §9.2), return daftar ter-refresh. Menerima `?q=&showAll=&failedOnly=` yang sama seperti request GET-nya, sehingga daftar yang di-refresh **mempertahankan filter aktif** — beda dari versi htmx lama yang sengaja reset filter (lihat 10-roadmap.md Fase UI/UX §C); di Vue ini praktis gratis karena klien memang sudah menyimpan state filter, jadi tidak ada alasan mempertahankan simplifikasi lama |
| `GET /api/services/{name}/logs` | `{unit, logs}` — 50 baris terakhir `journalctl -u {name}`, ditampilkan di drawer (`NDrawer`), bukan panel inline seperti sebelumnya |
| `GET /api/files/list?path=&q=` | Listing folder + breadcrumb + `{clipboardSize, clipboardCut}` — gantikan `/fragments/files/list` htmx lama. Blocklisted entry (mis. `/etc/shadow`) tetap difilter di sini, bukan cuma ditolak saat diklik, sama seperti versi lama |
| `POST /api/files/op` | Body JSON: `{action, path, newPath?, paths?}`. `mkdir\|create\|rename\|delete` sinkron (instan/`os.Rename`). `copy\|cut` cuma menyimpan `paths` ke clipboard sesi (`auth.Session`), tidak ada I/O. `paste` **selalu** mengembalikan `{jobId}` — bahkan kalau semua entry ternyata instant-rename, satu jalur kode klien untuk semua kasus |
| `GET /api/files/op/{jobId}/stream` | **SSE** — progress job file besar (`JobSnapshot`: persentase, `bytesPerSec`, `currentFile`) |
| `POST /api/files/op/{jobId}/cancel` | Batalkan job yang sedang berjalan — `context.CancelFunc`, efektif dalam &lt;1 buffer I/O (~256KB) |
| `POST /api/files/upload?path=` | Multipart streaming langsung ke disk (`io.CopyBuffer`, bukan buffer penuh); `http.MaxBytesReader` menegakkan `fileExplorer.maxUploadSizeMB` dengan memutus baca begitu limit terlampaui, bukan menolak setelah menerima semuanya |
| `GET /api/files/download?path=` | Download file tunggal (streaming via `http.ServeFile`) atau **folder sebagai zip** (streaming via `archive/zip`, tidak pernah membangun arsip penuh di disk/memori dulu) |
| `GET /api/files/content?path=` | Baca isi file untuk editor → `{content, modTime}`. 413 kalau &gt;2MB, 415 kalau terdeteksi biner (byte null) |
| `PUT /api/files/content?path=` | Body `{content, expectedModTime?}` → `{modTime}` baru. 409 kalau `expectedModTime` tidak cocok dengan mtime file saat ini (berubah di luar editor) — `expectedModTime` kosong/diabaikan berarti timpa paksa |
| `POST /api/auth/login` | Body JSON `{username, password}` → `{authenticated, username, csrfToken}`. Set cookie session. Login sekarang selalu JSON — halaman login form-post lama sudah dihapus bersamaan dengan migrasi ke Vue |
| `GET /api/auth/session` | Hidrasi auth store Vue saat boot app (`authStore.hydrate()`) → `{authenticated}` atau `{authenticated, username, csrfToken}`. Selalu 200 — "belum login" bukan kondisi error di endpoint ini, karena endpoint ini justru satu-satunya tempat pemanggil tanpa login diharapkan |
| `POST /api/auth/logout` | Hapus session. Tetap redirect (bukan JSON) karena masih dipanggil dua cara sekaligus selama migrasi bertahap: `<form method="post">` biasa di halaman lama, dan `fetch()` dari Vue (yang mengikuti redirect begitu saja) |
| `POST /api/settings/password` | Ganti password |

### Konvensi

- Semua endpoint state-changing (`POST/PUT/DELETE`) wajib **CSRF token** (lihat
  [07-security.md](07-security.md)) & login session valid.
- Format error konsisten: HTML fragment berisi alert box untuk request htmx, JSON
  `{error: "..."}` untuk request `Accept: application/json`.
- Semua path file di-normalisasi & divalidasi di server sebelum dipakai (cegah `../` traversal).
- `GET /api/terminal/ws` tetap wajib session login valid (cookie ikut terkirim otomatis saat
  WebSocket handshake same-origin) **plus** validasi header `Origin` di server — detail
  ancaman & mitigasinya di [07-security.md](07-security.md) §7.6.

## 6.2 Prinsip UI/UX

- **Mobile-first responsive.** Dashboard sering dicek dari HP saat di luar rumah — layout
  grid yang collapse jadi single-column di layar sempit, tombol cukup besar untuk disentuh.
- **Dark mode default**, dengan toggle ke light mode (preferensi disimpan di `localStorage`).
  Dark mode dipilih sebagai default karena konteks pemakaian (monitoring server, sering
  dilihat malam hari) dan lebih hemat pada layar OLED perangkat mobile.
- **Informasi penting terlihat tanpa scroll** di dashboard utama — summary cards di atas
  (CPU/RAM/disk/suhu), grafik & tabel detail di bawah.
- **Feedback jelas untuk setiap aksi**: toast notification untuk sukses/gagal (start/stop
  container, save file, dll), loading state (spinner kecil) saat htmx request berjalan
  (`hx-indicator`), disabled state pada tombol saat sedang diproses (cegah double-click).
- **Konfirmasi untuk aksi destruktif**: delete file/folder, stop/restart service kritikal,
  stop container — pakai modal konfirmasi (Alpine.js), bukan `window.confirm()` browser
  native (supaya konsisten stylingnya dengan tema aplikasi).
- **Progress bar nyata untuk operasi file besar** (copy/move/upload multi-file, lihat
  [04-features.md](04-features.md) "Keandalan Operasi File Besar/Banyak") — persentase,
  kecepatan transfer, ETA, dan tombol **Cancel** yang jelas, disuplai dari SSE progress job.
  Ini bukan sekadar polish UI — tanpa progress yang jelas, user cenderung mengira aplikasi
  "diam"/hang lalu mencoba aksi berulang yang justru memperparah beban I/O.
- **Skeleton/placeholder loading**, bukan layar kosong, saat data awal sedang di-fetch.
- **Konsisten dalam bahasa**: UI berbahasa Indonesia (mengikuti preferensi user), istilah
  teknis (CPU, RAM, container, service) tetap dalam bentuk aslinya karena lebih familiar.
- **Aksesibilitas dasar**: kontras warna cukup (WCAG AA minimum), semua tombol ikon punya
  `aria-label`, navigasi bisa pakai keyboard (tab order wajar), focus state terlihat jelas.

## 6.3 Struktur Halaman & Navigasi

```
┌────────────────────────────────────────────────────────────────────┐
│ [Logo] TarkimanOS     Dashboard Docker Service Files Terminal   [⚙][🌙][User▾] │
├────────────────────────────────────────────────────────────────────┤
│                                                                        │
│   ╭───────╮   ╭───────╮   ╭───────╮   ╭───────╮                    │
│   │ ◔ 34% │   │ ◑ 61% │   │ ◔ 45% │   │ ◔ 52° │   (gauge/dial)      │
│   │  CPU  │   │  RAM  │   │ Disk  │   │ Suhu  │                    │
│   ╰───────╯   ╰───────╯   ╰───────╯   ╰───────╯                    │
│                                                                        │
│   ┌──────────────────────┐  ┌──────────────────────┐                │
│   │  Tren CPU             │  │  Tren Disk I/O          │                │
│   │  (ECharts line chart) │  │  (ECharts line chart)  │                │
│   └──────────────────────┘  └──────────────────────┘                │
│                                                                        │
│   ┌──────────────────────┐  ┌──────────────────────┐                │
│   │ Docker (3 running)    │  │ Service (2 failed)    │                │
│   │ - nginx      ● 12%    │  │ - myapp    ✗ failed   │                │
│   │ - postgres   ● 8%     │  │ - sshd     ✓ active   │                │
│   └──────────────────────┘  └──────────────────────┘                │
└────────────────────────────────────────────────────────────────────┘
```

Navigasi utama (top nav, collapse jadi hamburger menu di mobile): **Dashboard**, **Docker**,
**Service**, **Files**, **Terminal**, ikon Settings & theme toggle di kanan. Menu **Terminal**
tidak muncul sama sekali kalau `terminal.enabled: false` (lihat [04-features.md](04-features.md) §4.5).

## 6.5 Gauge/Dial — Implementasi

Gauge radial (dial) dipakai untuk metric "nilai saat ini terhadap ambang batas" — lihat
tabel pemilihan jenis grafik di [04-features.md](04-features.md) §4.6. Diimplementasi di
halaman yang sudah dimigrasi ke Vue (lihat [03-tech-stack.md](03-tech-stack.md) "Kenapa pivot
ke Vue?") sebagai `web/frontend/src/components/charts/GaugeChart.vue`, dibangun di atas
ECharts (`GaugeChart` dari `echarts/charts`, custom tree-shaken build lewat `echarts/core`
+ `use([...])` — bukan `import * as echarts from 'echarts'` penuh):

- `<VChart :option="...">` (dari `vue-echarts`) dengan opsi gauge minimal: tidak ada pointer/
  jarum, cuma progress arc + label + nilai angka di tengah — visualnya setara pendekatan
  awal (SVG `stroke-dasharray` custom), tapi lewat komponen ECharts yang sudah menangani
  animasi transisi nilai (`valueAnimation: true`) dan resize otomatis (`autoresize`) tanpa
  perlu ditulis manual.
- **Color-zone otomatis** mengikuti nilai: hijau (default) di bawah ambang warn, kuning di
  ambang warn, merah di ambang danger. Prop `thresholds` (default `[0.7, 0.85]`, fraksi dari
  `max`) dihitung per instance komponen — **belum** dibaca dari `config.yaml` seperti rencana
  awal (mis. `thresholds.cpu` vs `thresholds.temp` berbeda); untuk saat ini setiap pemanggil
  gauge (CPU/RAM/Disk/Suhu di `DashboardView.vue`) memakai default yang sama. Threshold
  per-metric via config adalah kandidat perbaikan fase berikutnya, bukan blocker Fase A.
- Warna diambil dari token warna yang sama dengan `theme.ts`/`tokens.css` (`accent`,
  `warning`, `danger`) — **bukan** lewat CSS custom property langsung di opsi ECharts,
  karena canvas 2D (`fillStyle`/`strokeStyle`) tidak konsisten me-resolve `var(--x)` di semua
  browser; komponen membaca nilai literal dari `theme.ts` berdasarkan preferensi dark/light
  saat ini (`usePrefersDark()` composable), supaya tetap konsisten dengan tema Naive UI.
- Aksesibilitas: nilai numerik tetap dirender sebagai teks di tengah gauge oleh ECharts
  sendiri (`detail.formatter`), bukan cuma visual.

## 6.6 Desain Visual (Design Tokens)

Style guide ringkas — nilai final ditentukan saat implementasi, tapi prinsipnya:

- **Warna**: palet netral (abu-abu gelap untuk background dark mode) + 1 warna aksen (mis.
  biru/teal) untuk elemen interaktif, + warna semantik (hijau=sehat/active, kuning=warning,
  merah=error/failed/critical) dipakai konsisten di badge status di semua halaman (Docker,
  Service, disk usage, suhu).
- **Tipografi**: font sistem (`-apple-system, "Segoe UI", Roboto, ...` stack) untuk teks UI —
  tanpa font eksternal, mengurangi request & load time, terasa native di tiap platform.
  Monospace (`ui-monospace, ...`) dikhususkan untuk kode/log/editor, **tidak** dipakai lagi
  untuk seluruh body text seperti versi htmx awal — memakai monospace di mana-mana adalah
  alasan utama tampilan awal terasa "polos"/seperti spreadsheet, bukan dashboard.
- **Spacing & radius**: skala konsisten (4px base unit di halaman lama; token `--space-1`
  s.d. `--space-6` dan `--radius-sm/md/lg` di halaman Vue, lihat `web/frontend/src/style/tokens.css`),
  border-radius sedang (rapi tapi tidak terlalu "bulat") untuk card & tombol.
- **Ikon**: [Lucide](https://lucide.dev/) (MIT) di halaman Vue, via `@lucide/vue` (component
  Vue asli, tree-shaken oleh Vite — cuma ikon yang benar-benar diimpor yang masuk bundle).
  Halaman lama (belum dimigrasi) tetap tanpa ikon/emoji seperti sebelumnya.
