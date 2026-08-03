# 6. API & UI/UX

## 6.1 Desain API

Sebagian besar navigasi adalah **SSR** (server render halaman penuh) + **htmx** untuk
partial update (tidak full-page reload saat berinteraksi). Endpoint dikelompokkan:

### Halaman (SSR, `GET` → HTML lengkap)

| Route | Deskripsi |
|---|---|
| `GET /login` | Halaman login |
| `GET /` | Dashboard utama |
| `GET /docker` | Halaman Docker (sub-tab Containers/Images/Volumes/Networks/Settings via `?tab=`) |
| `GET /services` | Halaman daftar systemd unit |
| `GET /files` | File explorer (path via query `?path=`) |
| `GET /files/edit` | Editor teks (`?path=`) |
| `GET /terminal` | Halaman web terminal (xterm.js full-screen) |
| `GET /settings` | Halaman pengaturan |

### Fragment (htmx, `GET`/`POST` → potongan HTML untuk swap)

| Route | Deskripsi |
|---|---|
| `GET /fragments/docker/containers` | Tabel container (di-refresh berkala via `hx-trigger`) |
| `GET /fragments/docker/images` | Tabel image |
| `GET /fragments/docker/volumes` | Tabel volume |
| `GET /fragments/docker/networks` | Tabel network |
| `GET /fragments/docker/settings` | Panel info daemon + disk usage + tombol cleanup |
| `GET /fragments/services/list?q=&showAll=&failedOnly=` | Tabel systemd unit — `q` filter nama/deskripsi, `showAll=1` ikutkan socket/timer, `failedOnly=1` hanya yang failed. Sumber trigger-nya **form filter itu sendiri** (`hx-trigger="load, submit, change, every 8s"` langsung di `<form>`), bukan div terpisah — supaya auto-refresh berkala tidak diam-diam mereset filter yang sedang aktif |
| `GET /fragments/services/{name}/logs` | 50 baris terakhir `journalctl -u {name}`, di-swap ke satu panel log bersama di bawah halaman |
| `GET /fragments/files/list` | Listing folder (dipakai saat navigasi tanpa reload) |
| `POST /fragments/docker/containers/{id}/{start\|stop\|restart\|remove}` | Aksi container. Implementasi Fase 2: return **seluruh tabel** ter-refresh (bukan cuma baris), lebih sederhana daripada per-row diff & tetap cukup cepat karena `internal/docker.Watcher` sudah cache di memori — lihat [05-data-storage.md](05-data-storage.md) |
| `POST /fragments/docker/images/{id}/remove` | Hapus image |
| `POST /fragments/docker/volumes/{name}/remove` | Hapus volume |
| `POST /fragments/docker/networks/{id}/remove` | Hapus network |
| `POST /fragments/docker/prune/{containers\|images\|volumes\|networks\|all}` | Aksi cleanup, return panel Settings ter-update |
| `POST /fragments/services/{name}/{start\|stop\|restart\|reload}` | Aksi unit (butuh `sudo -n systemctl` bisa jalan — lihat [09-deployment.md](09-deployment.md) §9.2). **Catatan**: return tabel ter-refresh tanpa mempertahankan filter yang sedang aktif (beda dari auto-refresh berkala di atas) — simplifikasi yang disengaja, bukan bug |

### REST/JSON (dipakai oleh JS klien, misal chart)

| Route | Deskripsi |
|---|---|
| `GET /api/stream/metrics` | **SSE** — push snapshot metrics (CPU/RAM/disk/temp/net) tiap tick |
| `GET /api/metrics/history?metric=cpu` | Data histori untuk chart (dari ring buffer). Fase 1: `metric` ∈ `cpu\|mem\|diskRead\|diskWrite\|tempMax`, selalu mengembalikan seluruh isi buffer (~15 menit) — parameter `range` dicadangkan untuk nanti kalau tingkat retensi lebih panjang (lihat [05-data-storage.md](05-data-storage.md)) sudah ada untuk dipilih |
| `GET /api/terminal/ws` | **WebSocket** — sesi PTY interaktif (stdin/stdout + resize control message) |
| `POST /api/files/op` | Body JSON: `{action: mkdir\|create\|rename\|delete, path, newPath?}`. **Fase 3a**: keempat aksi ini sudah jalan, semuanya sinkron (tidak butuh job — operasinya instan/`os.Rename`). `copy\|cut\|paste` menyusul di Fase 3b, dan **akan** butuh jobId untuk file besar (lihat di bawah) |
| `GET /api/files/op/{jobId}/stream` | [Fase 3b] **SSE** — progress job file besar (persentase, kecepatan, ETA) |
| `POST /api/files/op/{jobId}/cancel` | [Fase 3b] Batalkan job yang sedang berjalan |
| `POST /api/files/upload` | [Fase 3b] Multipart upload (streaming, tidak dibuffer penuh di memori sebelum ditulis) |
| `GET /api/files/download?path=` | Download file (streaming via `http.ServeFile`, sudah jalan Fase 3a). Folder-sebagai-zip masih 501 sampai Fase 3b |
| `GET /api/files/content?path=` | Baca isi file untuk editor |
| `PUT /api/files/content?path=` | Simpan isi file dari editor |
| `POST /api/auth/login` | Login (set cookie session) |
| `POST /api/auth/logout` | Hapus session |
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
│   │  Tren CPU/RAM         │  │  Tren Network          │                │
│   │  (uPlot line chart)   │  │  (uPlot line chart)    │                │
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
tabel pemilihan jenis grafik di [04-features.md](04-features.md) §4.6. Pendekatan implementasi:

- Satu komponen SVG kecil (`<svg>` dengan dua `<circle>`: satu track abu-abu sebagai
  background, satu arc berwarna sebagai nilai) — `stroke-dasharray`/`stroke-dashoffset`
  diatur ulang lewat sedikit JS vanilla setiap ada data baru dari SSE, **tidak** re-render
  seluruh SVG dari server per tick (murah dari sisi CPU/DOM).
- **Color-zone otomatis** mengikuti nilai: hijau (< 70%), kuning (70–90%), merah (> 90%) —
  ambang batas ini dikonfigurasi per metric (suhu punya ambang berbeda dari CPU%, misalnya)
  di `config.yaml` (`thresholds.cpu`, `thresholds.temp`, dst), bukan di-hardcode.
- Ukuran & style konsisten dengan design tokens di §6.6 (warna semantik yang sama dipakai
  ulang di badge status Docker/Service, supaya bahasa visual "hijau=aman, merah=bahaya"
  konsisten di seluruh aplikasi, bukan cuma di gauge).
- Animasi transisi halus (CSS `transition` pada `stroke-dashoffset`) saat nilai berubah,
  supaya terasa "hidup" tanpa terlihat "lompat-lompat" tiap 2 detik.
- Aksesibilitas: nilai numerik tetap ditulis sebagai teks di tengah gauge (bukan cuma visual)
  + `aria-label` deskriptif (misal "CPU usage 34 percent, status normal").

## 6.6 Desain Visual (Design Tokens)

Style guide ringkas — nilai final ditentukan saat implementasi, tapi prinsipnya:

- **Warna**: palet netral (abu-abu gelap untuk background dark mode) + 1 warna aksen (mis.
  biru/teal) untuk elemen interaktif, + warna semantik (hijau=sehat/active, kuning=warning,
  merah=error/failed/critical) dipakai konsisten di badge status di semua halaman (Docker,
  Service, disk usage, suhu).
- **Tipografi**: font sistem (`system-ui` stack) — tanpa font eksternal, mengurangi request
  & load time, terasa native di tiap platform.
- **Spacing & radius**: skala konsisten (4px base unit), border-radius sedang (rapi tapi
  tidak terlalu "bulat") untuk card & tombol.
- **Ikon**: SVG inline minimal (bukan icon-font/library besar) — hanya ikon yang dipakai
  yang di-embed ke `web/static/`.
