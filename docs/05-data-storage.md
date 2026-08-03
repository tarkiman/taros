# 5. Data & Penyimpanan

## Prinsip

STB B860H memakai eMMC/microSD dengan kapasitas & write-endurance terbatas. Menulis
snapshot metrics tiap 2 detik ke disk (mis. ke SQLite) akan membebani I/O dan mempercepat
keausan storage — **dihindari sebagai default**. Sebagai gantinya, histori metrics jangka
pendek disimpan **di RAM** dalam bentuk ring buffer, dengan trade-off yang disadari:
histori hilang saat service restart/reboot.

## Ring Buffer In-Memory

Setiap jenis metric (CPU%, RAM%, network throughput, dst) punya ring buffer sendiri dengan
kapasitas tetap (fixed-size array, bukan slice yang terus tumbuh):

| Resolusi | Retensi | Jumlah sample | Estimasi ukuran per metric* |
|---|---|---|---|
| Raw (per 2–5 detik, tergantung metric) | 15 menit terakhir | 180–450 sample | ~2.9–7.2KB (`Sample{time.Time, float64}`, lihat catatan) |
| Downsampled (per 1 menit, rata-rata dari raw) | 24 jam terakhir | 1440 sample | ~11.5KB — **belum diimplementasikan**, lihat catatan |

\* Implementasi Fase 1 (`internal/store`) pakai `Sample{Time time.Time, Value float64}` —
lebih besar dari asumsi awal 8 byte/sample (`time.Time` Go ~24 byte + `float64` 8 byte ≈ 32
byte/sample) karena kesederhanaan implementasi lebih diprioritaskan daripada penghematan
beberapa KB yang sudah jauh di bawah radar dibanding budget 25–30MB — bukan trade-off yang
signifikan. Ring buffer hanya dibuat untuk metric yang benar-benar dipakai chart di dashboard
(`cpu_total_percent`, `mem_used_percent`, `disk_read_bytes_sec`, `disk_write_bytes_sec`,
`temp_max_celsius`) — 5 metric, bukan ~10 seperti perkiraan awal; metric granular (per-core
CPU, per-mount disk, per-interface network, per-sensor suhu) sengaja **latest-value-only**
(lihat bagian di bawah), karena belum ada kebutuhan chart untuk itu di Fase 1.

**Catatan implementasi**: tingkat downsampled 24 jam di atas **belum dibangun** di Fase 1 —
hanya ring buffer raw 15 menit yang ada saat ini. Ini keputusan sadar (YAGNI): Fase 1 hanya
butuh sparkline "beberapa menit terakhir" di dashboard, jadi membangun downsampler+buffer
24 jam sebelum ada UI yang benar-benar menampilkannya adalah kerja yang belum tentu terpakai.
Akan ditambahkan saat ada halaman/kebutuhan yang benar-benar meminta histori lebih panjang.

Total budget ring buffer Fase 1 tetap **jauh di bawah 200KB** (5 metric × ~450 sample × 32
byte ≈ 72KB terburuk) — jauh dari mengkhawatirkan di RAM budget 25–30MB.

## Data yang **Tidak** Disimpan Histori (hanya snapshot terkini)

- Daftar & stats **containers, images, volumes, networks** Docker — tidak ada histori
  panjang (ring buffer) untuk semuanya, tapi implementasi Fase 2 punya satu nuansa penting
  untuk **containers** khususnya: `internal/docker.Watcher` menjaga **cache short-lived di
  memori** (snapshot terakhir, di-refresh di background setiap `docker.watchIntervalSec`),
  bukan query langsung on-demand per request seperti dokumen ini awalnya membayangkan.
  Alasannya ditemukan saat implementasi: `GET /containers/{id}/stats?stream=false` Docker
  ternyata **~1 detik per container** (Docker menunggu sampel CPU kedua secara internal) —
  di mesin dev dengan 37 container berjalan, itu berarti request halaman Containers bisa
  makan >10 detik kalau dipanggil sinkron on-demand. Watcher menyerap latensi itu di
  background sehingga tiap page load/refresh tetap instan dari cache, dengan trade-off data
  bisa selisih beberapa detik dari kondisi real-time — dianggap sepadan untuk dashboard
  monitoring. Images/Volumes/Networks/Settings **tetap** on-demand murni (list-nya jauh
  lebih cepat, lihat detail kecepatan di [04-features.md](04-features.md) §4.2) — hanya
  container stats yang butuh pola cache ini. `GET /system/df` (dipakai di Settings) juga
  tetap on-demand, bukan di-poll berkala, karena hitungannya relatif berat di sisi daemon
  Docker (~2 detik terukur di mesin dev dengan 63 image/48 volume).
- Daftar unit systemd — sama, snapshot terkini saja.
- Listing file explorer — tidak di-cache lama, selalu baca filesystem terkini per request
  (dengan cache sangat singkat, <1 detik, hanya untuk menghindari duplikasi baca saat render).
- **Metric granular** (Fase 1): CPU per-core, disk per-mount, network per-interface, suhu
  per-sensor — semua ini bagian dari `Snapshot` terkini (`store.Latest()`), tapi tidak punya
  ring buffer histori sendiri. Hanya lima metric "headline" (lihat tabel di atas) yang di-chart.

## Opsi Persistensi (Phase lanjutan, opsional & dimatikan secara default)

Jika nanti user membutuhkan grafik histori yang bertahan lintas restart (misal "grafik 7 hari
terakhir"), opsi yang dicadangkan:

- **SQLite pure-Go** (`modernc.org/sqlite`, tanpa CGO) untuk downsampled data (resolusi
  rendah, misal per 15 menit) — jauh lebih jarang menulis dibanding raw.
- Ditulis secara **batched** (misal tiap 15 menit sekali flush), bukan tiap sample, untuk
  meminimalkan write ke storage.
- Fitur ini **opt-in** lewat config (`persistence.enabled: true`), default `false`.
- Detail desain skema akan dibuat saat fitur ini benar-benar dikerjakan (lihat
  [10-roadmap.md](10-roadmap.md) — Phase 3).

## Konfigurasi Session & Cache

- Session login: map in-memory `token → {username, expiredAt}`, dibersihkan berkala oleh
  goroutine (tiap beberapa menit, hapus token expired). Hilang saat restart (user perlu
  login ulang) — trade-off yang diterima untuk single-user app.
- Clipboard file explorer (copy/cut): disimpan di memori per-session (bukan global), berisi
  daftar path + mode (copy/cut). Dibersihkan saat session berakhir.
