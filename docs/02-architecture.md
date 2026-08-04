# 2. Arsitektur

## Gambaran Umum

Single-node, single-binary, monolith modular. Tidak ada proses terpisah untuk
"agent" dan "server" — semua jadi satu proses Go yang:

1. Mengumpulkan data (collector) secara periodik/on-demand.
2. Menyimpan data terbaru + histori pendek di memori (ring buffer).
3. Menyajikan web UI (SPA Vue 3, di-embed sebagai binary tunggal — lihat
   [03-tech-stack.md](03-tech-stack.md) "Kenapa pivot ke Vue?") + REST API + stream real-time (SSE).
4. Menangani operasi file explorer langsung ke filesystem lokal.
5. Berkomunikasi dengan Docker daemon (via Unix socket) & systemd (via D-Bus) untuk data
   & aksi (start/stop/restart).
6. Menyediakan sesi terminal interaktif (PTY) ke browser via WebSocket.

```
                        ┌─────────────────────────────────────────┐
                        │              Browser (klien)             │
                        │  Vue 3 SPA (Naive UI, ECharts)            │
                        │  + SSE (metrics) + WebSocket (terminal)  │
                        │  + xterm.js (emulator terminal)          │
                        └───────────────┬───────────────────────────┘
                                        │ HTTP/HTTPS (LAN)
                        ┌───────────────▼───────────────────────────┐
                        │            TarkimanOS (1 process Go)            │
                        │                                             │
                        │  ┌───────────┐  ┌─────────────────────┐   │
                        │  │  web/      │  │  auth/               │   │
                        │  │  (handler, │  │  (session, login)    │   │
                        │  │  template, │  └─────────────────────┘   │
                        │  │  SSE, WS)  │                              │
                        │  └─────┬─────┘                              │
                        │        │                                    │
                        │  ┌─────▼─────────────────────────────┐     │
                        │  │           store/ (in-memory)        │     │
                        │  │  ring buffer metrics terbaru+histori │     │
                        │  └─────┬─────────────────────────────┘     │
                        │        │                                    │
                        │  ┌─────▼──────┐ ┌───────────┐ ┌──────────┐ │
                        │  │ collector/  │ │ docker/   │ │systemd/  │ │
                        │  │ cpu/mem/    │ │ (Unix     │ │ (D-Bus)  │ │
                        │  │ disk/temp/  │ │ socket)   │ │          │ │
                        │  │ net (procfs)│ │           │ │          │ │
                        │  └────────────┘ └─────┬─────┘ └────┬─────┘ │
                        │                        │             │      │
                        │  ┌─────────────────────▼─────────────▼───┐ │
                        │  │        fileexplorer/ (filesystem I/O)   │ │
                        │  └──────────────────────────────────────┘ │
                        │  ┌──────────────────────────────────────┐ │
                        │  │  terminal/ (spawn shell + PTY, sebagai │ │
                        │  │  user 'tarkimanos' — bukan root)             │ │
                        │  └──────────────────────────────────────┘ │
                        └────────┬────────────────┬──────────────────┘
                                 │                 │
                       /proc, /sys        /var/run/docker.sock
                                          org.freedesktop.systemd1 (D-Bus)
                                          /bin/sh atau $SHELL (PTY, uid=tarkimanos)
```

## Komponen Utama

| Komponen | Tanggung jawab |
|---|---|
| `collector/` | Baca metrics sistem (CPU/RAM/disk/temp/net) dari `/proc`, `/sys` secara periodik |
| `docker/` | Klien minimal ke Docker Engine API via Unix socket — list container + stats |
| `systemd/` | Klien D-Bus ke systemd — list unit, status, start/stop/restart |
| `fileexplorer/` | Operasi filesystem: list, create, rename, move/copy, delete, read/write file |
| `terminal/` | Spawn shell dalam PTY sebagai user `tarkimanos`, jembatani I/O ke WebSocket (lihat [07](07-security.md) §7.6) |
| `store/` | Ring buffer in-memory untuk histori metrics jangka pendek (lihat [05](05-data-storage.md)) |
| `web/` | HTTP handler, template rendering (SSR), SSE endpoint, WebSocket endpoint, static asset (embed) |
| `auth/` | Login, session cookie, CSRF, rate limiting percobaan login |
| `config/` | Load & validasi config (file YAML + env override) |

## Alur Data Real-Time

1. Background goroutine tiap komponen collector jalan dengan interval sendiri (lihat tabel
   di [05-data-storage.md](05-data-storage.md)) — hasil ditulis ke `store/` (protected by mutex/atomic).
2. Browser buka koneksi **SSE** (`GET /api/stream/metrics`) — server push snapshot terbaru
   tiap kali ada data baru, tanpa polling dari klien.
3. Aksi (start container, restart service, hapus file) dikirim via **HTTP POST/DELETE biasa**
   (bukan lewat SSE), ditangani handler, hasil di-refresh via htmx swap (partial HTML).
4. Sesi terminal buka koneksi **WebSocket** (`GET /api/terminal/ws`) — satu-satunya jalur
   dua-arah di aplikasi ini (lihat "SSE vs WebSocket" di bawah).

### Kenapa SSE untuk metrics, tapi WebSocket untuk terminal?

Metrics tetap pakai **SSE** karena arahnya murni satu arah (server → klien) — cukup dengan
`net/http` standar, auto-reconnect built-in di browser, dan resource server lebih ringan
dibanding menjaga koneksi full-duplex untuk sesuatu yang sebenarnya tidak butuh arah balik.

**Terminal** secara inheren butuh komunikasi dua arah low-latency (keystroke klien → PTY,
output PTY → klien, termasuk sinyal resize terminal) — ini satu-satunya kasus di aplikasi
yang benar-benar butuh WebSocket, jadi ditambahkan **khusus untuk fitur ini saja**, bukan
menggantikan SSE untuk metrics (lihat rasionalnya juga di [03-tech-stack.md](03-tech-stack.md)).

## Prinsip Desain Arsitektur

- **Collector = pull, bukan daemon terpisah.** Semua collector jalan sebagai goroutine di
  proses yang sama, bukan subprocess/service terpisah — menghindari overhead IPC & proses tambahan.
- **Degradasi anggun (graceful degradation).** Kalau Docker daemon tidak berjalan/tidak
  terpasang, section Docker di UI menampilkan status "tidak tersedia", bukan meng-crash service.
  Sama untuk D-Bus/systemd kalau berjalan di sistem non-systemd.
- **Stateless request handling.** Semua state penting (session, metrics) di memori proses;
  tidak ada dependency ke database eksternal. Restart service = state histori metrics hilang,
  itu trade-off yang disengaja (lihat [05-data-storage.md](05-data-storage.md)).
- **Least privilege.** Proses jalan sebagai user khusus (non-root) dengan hanya capability/group
  membership yang diperlukan (lihat [07-security.md](07-security.md)).
- **Operasi file streaming & throttled, tidak pernah membebani sistem sampai hang.** Ini
  prinsip yang secara langsung merespons pengalaman CasaOS yang pernah membuat perangkat
  hang total saat copy file besar/banyak (lihat [01-overview.md](01-overview.md)). Semua I/O
  file (copy/move/upload/download/zip) di `fileexplorer/` memakai buffer tetap kecil (bukan
  load penuh ke memori), throughput bisa di-throttle, dan operasi berat berjalan sebagai
  background job dengan progress — bukan memblokir handler HTTP. Detail lengkap di
  [04-features.md](04-features.md) "Keandalan Operasi File Besar/Banyak".
- **Terminal mewarisi identitas proses, tidak lebih — aplikasi sendiri tidak mengelevasi apa pun.**
  Shell yang di-spawn `terminal/` berjalan dengan uid/gid **yang sama persis** dengan proses
  TarkimanOS (user `tarkimanos`); kode TarkimanOS sendiri tidak pernah memanggil `sudo`/`su`/setuid.
  User **boleh** menjalankan `sudo` sendiri di dalam sesi shell interaktif itu — persis seperti
  terminal biasa — tapi itu murni karena sudoers rule OS yang disiapkan terpisah saat instalasi
  (opsional, lihat [09-deployment.md](09-deployment.md) §9.2), bukan sesuatu yang dilakukan
  TarkimanOS atas nama user. Trade-off keamanannya dibahas di [07-security.md](07-security.md) §7.6.
