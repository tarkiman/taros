# 1. Overview & Tujuan

## Latar Belakang

Dibutuhkan satu service monitoring untuk dua perangkat ARM yang jadi "server rumahan":

| Perangkat | CPU | RAM | Peran khas |
|---|---|---|---|
| Raspberry Pi 5 | ARM Cortex-A76 (64-bit) | 4–8GB | Server aplikasi/self-hosting |
| STB B860H (Amlogic S905X/S905X2/S905X3, tergantung revisi) | ARM Cortex-A53 (64-bit) | **2GB** | Perangkat dengan resource paling ketat |

STB B860H dengan RAM 2GB adalah **batasan desain paling ketat** — semua keputusan arsitektur
mengacu ke perangkat ini sebagai baseline, bukan ke Raspberry Pi 5 yang lebih lega.

### Kenapa proyek ini dibuat (bukan pakai yang sudah ada)

Sebelumnya STB ini menjalankan **CasaOS** untuk kebutuhan monitoring & manajemen Docker.
Masalahnya, CasaOS sendiri (dashboard + gateway + app management stack-nya) memakan RAM yang
lumayan besar di perangkat 2GB — cukup signifikan untuk bersaing dengan container lain yang
memang jadi tujuan utama STB ini dijalankan. TarkimanOS dibuat spesifik untuk **jauh lebih
hemat RAM daripada CasaOS**, dengan cara mengambil subset fitur yang benar-benar dipakai
sehari-hari (monitoring resource, Docker, service, file explorer + editor, terminal) dan
membuang bagian yang tidak dibutuhkan (app store/marketplace, multi-service gateway,
Node.js/Vue runtime di sisi server) — lihat perbandingan arsitektur di
[03-tech-stack.md](03-tech-stack.md) "Kenapa Go, bukan Python?" dan target RAM konkret di
§ Batasan & Constraint Teknis di bawah.

Ada masalah kedua yang **lebih serius dari sekadar boros RAM**: CasaOS beberapa kali membuat
Raspberry Pi 5 (16GB RAM — jauh dari kekurangan resource) **hang total** saat copy file
besar/banyak lewat file manager-nya, sampai perlu cabut-colok power manual untuk pulih. Gejala
ini khas *dirty-page write-back* yang menumpuk tak terkendali (biasa dipicu aplikasi yang
buffer seluruh file di memori dan/atau menulis tanpa throttle) — parah di storage lambat
seperti eMMC/microSD yang justru dipakai STB. Ini alasan kenapa "Keandalan Operasi File
Besar/Banyak" di [04-features.md](04-features.md) jadi bagian desain inti file explorer
TarkimanOS, bukan detail implementasi biasa — streaming I/O, throttle, dan job queue di sana
secara langsung menutup celah yang bikin CasaOS crash.

Ini juga alasan kenapa **"lebih ringan & lebih stabil dari CasaOS" jadi tolok ukur konkret**, bukan cuma
"seringan mungkin" yang abstrak — lihat langkah benchmark di
[09-deployment.md](09-deployment.md) §9.4.

## Tujuan Produk

Membuat satu binary Go yang berjalan sebagai systemd service, menyediakan web dashboard untuk:

1. Monitoring resource sistem real-time (CPU, RAM, disk, suhu, network).
2. Monitoring container Docker yang sedang berjalan beserta konsumsi resource masing-masing.
3. Monitoring semua service (systemd unit) yang berjalan di sistem.
4. File explorer dengan operasi dasar (copy/cut/paste/rename/create) dan editor teks
   untuk file berbasis teks (`.txt`, `.md`, `.conf`, `.yaml`, `.json`, dll).
5. UI/UX yang rapi, responsif, dan enak dipakai dari desktop maupun HP.

## Non-Tujuan (di luar scope awal)

Supaya scope tidak melebar dan tetap fokus ke "ringan + fitur inti", hal-hal berikut
**sengaja tidak** masuk versi awal (bisa jadi roadmap lanjutan, lihat [10-roadmap.md](10-roadmap.md)):

- Monitoring multi-node/terpusat (satu dashboard untuk banyak perangkat sekaligus).
- Alerting via Telegram/webhook/email.
- Plugin system / ekstensibilitas pihak ketiga.
- Multi-user dengan role-based access control (RBAC) — cukup single admin user dulu.
- **App store / marketplace aplikasi** (fitur khas CasaOS untuk instal aplikasi Docker
  dengan satu klik dari katalog) — ini justru salah satu bagian CasaOS yang ikut menyumbang
  beban resource-nya tapi tidak masuk kebutuhan inti di sini; instalasi container tetap lewat
  cara manual (docker CLI via web terminal, atau `docker-compose` yang dijalankan sendiri),
  TarkimanOS hanya **memonitor & mengelola** yang sudah berjalan, bukan menjadi platform
  distribusi aplikasi.

(Web-based terminal **termasuk dalam scope** — lihat [04-features.md](04-features.md) §4.5.)

## Batasan & Constraint Teknis

- **RAM**: target idle memory footprint service < 25–30MB RSS di STB 2GB. Ini krusial karena
  STB juga menjalankan Docker + container lain yang berebut RAM yang sama. Target ini
  **relatif terhadap CasaOS**, bukan angka yang ditentukan sembarangan — sebelum development
  dimulai, ukur dulu RAM aktual yang dipakai stack CasaOS di STB yang sama (`docker stats`
  untuk container CasaOS-nya, atau `ps`/`smem` kalau ada komponen yang jalan di luar Docker)
  sebagai baseline pembanding nyata, dicatat di [09-deployment.md](09-deployment.md) §9.4.
  Tanpa angka pembanding ini, klaim "lebih ringan dari CasaOS" cuma asumsi, bukan sesuatu
  yang terverifikasi.
- **CPU**: perangkat ARM low-power (STB) tidak boleh terus-menerus terbebani polling — perlu
  interval polling yang wajar (default beberapa detik, bukan sub-detik) dan collector yang efisien.
- **Storage**: STB umumnya pakai eMMC/microSD dengan kapasitas & write-endurance terbatas —
  histori metrics sebisa mungkin di RAM (in-memory, hilang saat restart), bukan ditulis
  terus-menerus ke disk (lihat [05-data-storage.md](05-data-storage.md)).
- **Arsitektur target**: `linux/arm64` (RPi 5 & sebagian besar revisi B860H). Cross-compile
  Go native tanpa CGO supaya bisa dibangun di mesin dev (x86_64) tanpa toolchain tambahan.
- **Tanpa runtime tambahan** di perangkat target — tidak boleh butuh Node.js, Python, JVM, dll.
  Satu binary statis + file config.

## Target Pengguna

Single admin (pemilik perangkat sendiri) yang mengakses dashboard dari browser di jaringan
lokal (LAN/VPN). Bukan aplikasi multi-tenant/publik.

## Lingkungan Development

Development awal dilakukan **langsung di Raspberry Pi 5 (RAM 16GB)** — bukan cross-compile
dari mesin lain — karena RPi 5 sudah ARM64 native, jadi `go build` biasa tanpa perlu
`GOOS/GOARCH` cukup selama develop & testing fungsional di sana.

Konsekuensi penting: **RPi 5 16GB tidak merepresentasikan batasan resource STB 2GB.** Kode
yang "terasa ringan" saat dites di RPi 5 belum tentu aman di STB. Supaya batasan STB tetap
jadi acuan nyata selama development (bukan baru ketahuan pas deploy ke STB fisik), disarankan:

- Jalankan TarkimanOS di RPi 5 dengan **batas memory disimulasikan** mendekati kondisi STB, misal
  lewat cgroup: `systemd-run --scope -p MemoryMax=1800M --uid=tarkimanos /usr/local/bin/tarkimanos ...`
  (2GB dikurangi alokasi kasar untuk OS + Docker container lain di STB), supaya kalau ada
  memory leak/lonjakan usage, langsung ketahuan (proses ter-OOM-kill) sebelum sempat dites
  di perangkat fisik.
- Cross-compile ke `linux/arm64` (lihat [09-deployment.md](09-deployment.md) §9.1) tetap
  dijalankan secara berkala untuk memastikan build tidak pincang di STB — walau CPU
  arsitekturnya sama-sama arm64 dengan RPi 5, karakteristik performa Cortex-A53 (STB) vs
  Cortex-A76 (RPi 5) cukup berbeda, jadi validasi CPU usage aktual di STB fisik tetap perlu
  dilakukan sebelum sebuah fase dianggap benar-benar selesai (lihat
  [10-roadmap.md](10-roadmap.md) "Definisi Selesai").
