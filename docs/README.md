# TarkimanOS — Dokumentasi Desain

**TarkimanOS** adalah service monitoring sistem Linux berbasis Go,
ditujukan untuk perangkat ARM dengan resource terbatas: **Raspberry Pi 5** dan **STB B860H**
(RAM 2GB). Satu binary tunggal berisi backend + frontend (server-rendered), tanpa runtime
tambahan (tidak butuh Node.js/Python di perangkat target).

Dokumen ini dibuat **sebelum** implementasi dimulai, sebagai acuan bersama. Setiap keputusan
desain disertai alasan (trade-off) supaya mudah dievaluasi ulang kalau kebutuhan berubah.

## Daftar Isi

1. [Overview & Tujuan](01-overview.md) — target device, batasan resource, prinsip desain
2. [Arsitektur](02-architecture.md) — komponen, alur data, diagram
3. [Tech Stack](03-tech-stack.md) — pilihan library/tools beserta alasan & alternatif
4. [Spesifikasi Fitur](04-features.md) — detail tiap fitur (metrics, docker, service, file explorer)
5. [Data & Penyimpanan](05-data-storage.md) — strategi history metrics, retensi, budget RAM
6. [API & UI/UX](06-api-ui-ux.md) — desain endpoint, halaman, komponen UI, style guide
7. [Keamanan](07-security.md) — auth, path traversal, privilege, audit log
8. [Struktur Proyek](08-project-structure.md) — layout kode Go
9. [Build & Deployment](09-deployment.md) — cross-compile, systemd, instalasi, upgrade
10. [Roadmap](10-roadmap.md) — pembagian fase implementasi (MVP → lanjutan)

## Status

📋 **Tahap dokumentasi** — belum ada kode yang ditulis. Setelah dokumen ini disepakati,
implementasi akan mengikuti urutan fase di [Roadmap](10-roadmap.md).

## Prinsip Utama (ringkas)

- **Ringan dulu, baru fitur.** Target idle RSS < 25–30MB, CPU idle mendekati 0%.
- **Satu bahasa, satu binary.** Go untuk backend & frontend (SSR), di-embed jadi satu executable.
- **Minim dependency berat.** Hindari library yang menyeret banyak transitive deps atau butuh CGO.
- **Aman by default.** Login wajib, semua operasi file/service tervalidasi & tercatat.
- **Cross-compile native.** Tidak butuh Docker/QEMU untuk build ke ARM — cukup `GOOS/GOARCH`.

## Menjaga Dokumentasi Tetap Relevan

Set dokumen di `docs/` ini adalah **sumber kebenaran utama** untuk desain & keputusan
arsitektur — bukan cuma arsip sekali tulis di awal. Aturan mainnya:

- **Setiap perubahan fitur, arsitektur, atau keputusan teknis wajib memperbarui dokumen
  terkait di kesempatan yang sama** — bukan "nanti diupdate belakangan". Kalau kode berubah
  tapi dokumen tidak, dokumen dianggap salah dan harus diperbaiki.
- Saat menambah fitur baru, telusuri **semua** dokumen yang relevan (biasanya lebih dari
  satu — fitur baru umumnya menyentuh [04-features.md](04-features.md),
  [06-api-ui-ux.md](06-api-ui-ux.md) untuk endpoint/UI, [07-security.md](07-security.md) kalau
  ada implikasi keamanan, [08-project-structure.md](08-project-structure.md) untuk kode baru,
  dan [10-roadmap.md](10-roadmap.md) untuk penempatan fase-nya).
- Dokumen ini juga jadi materi onboarding untuk siapa pun (termasuk kontributor/AI assistant
  di sesi berikutnya) yang lanjut mengerjakan proyek ini tanpa histori percakapan sebelumnya —
  jadi tulis dengan asumsi pembaca tidak tahu konteks di luar apa yang tertulis di sini.
