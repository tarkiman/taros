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
| Raw (per 2 detik) | 15 menit terakhir | 450 sample | ~3.6KB (float32 + timestamp int32) |
| Downsampled (per 1 menit, rata-rata dari raw) | 24 jam terakhir | 1440 sample | ~11.5KB |

\* asumsi tiap sample = 8 byte (`float32` value + `int32` timestamp relatif). Downsampling
dari raw→1-menit dilakukan oleh goroutine ringan yang jalan tiap menit, bukan setiap sample.

Dengan ~10 metric utama (CPU total, CPU per-core rata-rata sederhana, RAM%, disk I/O,
network rx/tx, suhu), total budget ring buffer diperkirakan **< 200KB** — jauh dari
mengkhawatirkan di RAM budget 25–30MB.

## Data yang **Tidak** Disimpan Histori (hanya snapshot terkini)

- Daftar & stats **containers, images, volumes, networks** Docker — semuanya selalu query
  on-demand ke Docker API saat halaman/sub-tab dibuka (atau SSE tick untuk stats container
  yang sedang running), tidak disimpan histori panjang (cukup snapshot terakhir untuk render
  cepat). `GET /system/df` (dipakai untuk ukuran image/volume, lihat
  [04-features.md](04-features.md) §4.2) juga dipanggil on-demand, bukan di-poll berkala,
  karena hitungannya relatif berat di sisi daemon Docker.
- Daftar unit systemd — sama, snapshot terkini saja.
- Listing file explorer — tidak di-cache lama, selalu baca filesystem terkini per request
  (dengan cache sangat singkat, <1 detik, hanya untuk menghindari duplikasi baca saat render).

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
