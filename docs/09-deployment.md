# 9. Build & Deployment

## 9.1 Cross-Compile

Go native cross-compile, tanpa CGO (menghindari kebutuhan toolchain C untuk ARM di mesin dev):

```bash
# Raspberry Pi 5 & sebagian besar revisi STB B860H (ARM 64-bit)
GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -ldflags="-s -w" -o dist/tarkimanos-arm64 ./cmd/tarkimanos

# Fallback untuk revisi STB yang ternyata 32-bit (jaga-jaga, verifikasi dulu dengan `uname -m`)
GOOS=linux GOARCH=arm CGO_ENABLED=0 GOARM=7 go build -ldflags="-s -w" -o dist/tarkimanos-armv7 ./cmd/tarkimanos
```

- `-ldflags="-s -w"`: strip debug symbols & DWARF info → mengecilkan ukuran binary
  (tidak berpengaruh ke runtime memory, tapi mempercepat transfer/copy ke perangkat).
- `CGO_ENABLED=0` wajib karena kita menghindari dependency yang butuh CGO
  (lihat alasan pemilihan `modernc.org/sqlite` alih-alih `mattn/go-sqlite3` di
  [03-tech-stack.md](03-tech-stack.md) jika opsi persistensi diaktifkan nanti).
- Sebelum `go build`, kalau ada perubahan di aset frontend yang butuh langkah build sendiri,
  jalankan itu dulu — hasilnya di-commit ke repo, jadi langkah ini **tidak** perlu diulang
  tiap kali build binary, hanya saat sumbernya berubah:
  - `cd scripts/codemirror-build && npm install && npm run build` — kalau
    `src/editor-entry.js`/dependency-nya berubah, hasil ke `web/static/js/vendor/editor.bundle.js`.
  - `cd web/frontend && npm install && npm run build` — kalau ada perubahan di halaman Vue
    (lihat [03-tech-stack.md](03-tech-stack.md) "Kenapa pivot ke Vue?"), hasil ke
    `web/frontend/dist/`, di-embed via `web/embed.go` (var `SPA`).
  - htmx & uPlot **tidak** perlu langkah build — dipakai langsung sebagai file dist resmi.

## 9.2 Instalasi di Perangkat

Langkah instalasi (dituangkan jadi `scripts/install.sh` saat implementasi):

1. Copy binary ke `/usr/local/bin/tarkimanos`.
2. Buat user sistem dedicated: `useradd --system --no-create-home --shell /usr/sbin/nologin tarkimanos`.
3. Tambahkan user `tarkimanos` ke group `docker` (jika monitoring Docker dipakai) — dengan
   peringatan eksplisit ke user soal implikasi keamanannya (lihat [07-security.md](07-security.md) §7.4).
4. Copy `deploy/config.example.yaml` → `/etc/tarkimanos/config.yaml`, sesuaikan (root dir file
   explorer, port, dll).
5. Jalankan `tarkimanos setup` (interaktif) untuk membuat admin user pertama (username + password
   → disimpan ter-hash di `/etc/tarkimanos/config.yaml` atau file kredensial terpisah `/etc/tarkimanos/credentials`).
6. (Opsional, untuk kontrol systemd granular tanpa root penuh) copy
   `deploy/polkit/10-tarkimanos-systemd.rules` ke `/etc/polkit-1/rules.d/`.
7. **(Opsional, dibutuhkan untuk: sudo di web terminal, DAN/ATAU tombol aksi
   start/stop/restart/reload di halaman Service** — lihat [04-features.md](04-features.md)
   §4.3 & §4.5, [07-security.md](07-security.md) §7.6 untuk trade-off-nya sebelum
   memilih**)**: pilih salah satu mode, **tidak dijalankan otomatis oleh installer**:
   ```bash
   # Mode "sudo dengan password" (paling lengkap — sudo di terminal + aksi service):
   sudo passwd tarkimanos                # set password sistem (terpisah dari password dashboard)
   echo 'tarkimanos ALL=(ALL) ALL' | sudo tee /etc/sudoers.d/tarkimanos
   sudo chmod 440 /etc/sudoers.d/tarkimanos

   # ATAU mode "NOPASSWD" (hanya untuk device yang sudah terisolasi jaringan kuat):
   echo 'tarkimanos ALL=(ALL) NOPASSWD:ALL' | sudo tee /etc/sudoers.d/tarkimanos
   sudo chmod 440 /etc/sudoers.d/tarkimanos

   # ATAU mode "hanya aksi service" (tidak buka sudo di terminal sama sekali — cocok kalau
   # web terminal sengaja tidak dipakai untuk sudo, tapi tetap mau tombol start/stop/restart
   # service berfungsi dari dashboard):
   echo 'tarkimanos ALL=(ALL) NOPASSWD: /usr/bin/systemctl start *, /usr/bin/systemctl stop *, /usr/bin/systemctl restart *, /usr/bin/systemctl reload *' | sudo tee /etc/sudoers.d/tarkimanos-systemctl
   sudo chmod 440 /etc/sudoers.d/tarkimanos-systemctl
   ```
   Selalu `visudo -c` (atau setara) setelah menulis file ini untuk validasi syntax sebelum
   dipakai — sudoers rule yang salah syntax bisa mengunci akses sudo sistem secara keseluruhan.
   Tanpa salah satu mode ini, halaman Service tetap bisa **memonitor** (list unit, status,
   log) sepenuhnya — hanya tombol aksi yang akan gagal dengan pesan "Interactive
   authentication required" sampai salah satu sudoers rule di atas disiapkan.
8. Copy `deploy/systemd/tarkimanos.service` ke `/etc/systemd/system/`, lalu:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now tarkimanos
   ```

## 9.3 Contoh Unit File Systemd

```ini
[Unit]
Description=TarkimanOS - Lightweight Linux system monitor
After=network.target docker.service
Wants=docker.service

[Service]
Type=simple
User=tarkimanos
Group=tarkimanos
ExecStart=/usr/local/bin/tarkimanos --config /etc/tarkimanos/config.yaml
Restart=on-failure
RestartSec=5

# Hardening dasar (disesuaikan agar tidak mengganggu akses file explorer yang memang butuh luas)
NoNewPrivileges=true
ProtectHome=false
ProtectSystem=false

[Install]
WantedBy=multi-user.target
```

Catatan: `ProtectHome`/`ProtectSystem` sengaja **tidak** diaktifkan ketat karena fitur file
explorer memang butuh akses baca/tulis luas ke filesystem sesuai konfigurasi
`rootDir` — proteksi utama ada di level aplikasi (validasi path, lihat
[07-security.md](07-security.md)), bukan sandboxing systemd yang justru akan mematahkan fitur inti.

## 9.4 Resource Budget Target

| Resource | Target (idle) | Target (aktif, dashboard dibuka) |
|---|---|---|
| RSS Memory | < 25MB | < 40MB |
| CPU | ~0% (event-driven/idle poll) | < 3% (Raspberry Pi 5), < 8% (STB, CPU lebih lemah) |
| Binary size | < 15MB (setelah strip) | — |

Target ini diverifikasi manual saat MVP selesai (lihat [10-roadmap.md](10-roadmap.md)) dengan
`systemctl status tarkimanos` (memory) dan `top`/`htop` saat idle vs saat dashboard dibuka beberapa klien.

**Catatan pasca pivot ke Vue** (lihat [03-tech-stack.md](03-tech-stack.md)): target di atas
tidak berubah, karena semuanya mengukur RSS proses `tarkimanos` di device target — Vue
dirender di browser klien yang mengakses dashboard (laptop/HP), bukan di proses Go/di device
target itu sendiri. Ukuran bundle JS (lihat rincian per-chunk di komit yang menambahkan
`web/frontend/`) memengaruhi waktu-muat/RAM browser klien, bukan resource budget STB.

### Benchmark Pembanding: CasaOS

TarkimanOS dibuat sebagai pengganti CasaOS di STB B860H karena CasaOS terasa berat di RAM
2GB (lihat [01-overview.md](01-overview.md) "Kenapa proyek ini dibuat"). Supaya klaim "lebih
ringan dari CasaOS" bisa dibuktikan, bukan cuma diasumsikan, sebelum mulai Fase 1
([10-roadmap.md](10-roadmap.md)) catat baseline nyata:

1. Kalau CasaOS masih terpasang di STB (atau di perangkat serupa): ukur RAM yang dipakai
   seluruh stack-nya — container inti CasaOS (`docker stats` untuk container `casaos*`,
   `casaos-gateway`, `casaos-app-management`, dst) + proses non-Docker kalau ada
   (`ps aux --sort=-rss` untuk binary CasaOS yang jalan langsung di host).
2. Catat angka ini sebagai baseline pembanding di dokumen ini (isi tabel di bawah setelah
   pengukuran dilakukan — jangan menebak angkanya sebelum benar-benar diukur).
3. Setelah tiap fase besar (terutama selesai Fase 1 MVP monitoring, dan Fase 2 setelah Docker
   monitoring lengkap), bandingkan RSS TarkimanOS terhadap baseline CasaOS itu.

| Komponen | RAM terukur | Catatan |
|---|---|---|
| CasaOS (seluruh stack) | *(isi setelah diukur)* | Baseline pembanding |
| TarkimanOS — idle | *(isi setelah diukur)* | Target: signifikan lebih rendah dari baseline di atas |
| TarkimanOS — dashboard aktif | *(isi setelah diukur)* | — |

## 9.5 Upgrade

- Strategi sederhana: stop service → replace binary → start service (downtime singkat,
  dapat diterima untuk service monitoring single-node).
- Tidak ada migrasi data yang rumit di versi awal karena tidak ada database persisten
  (lihat [05-data-storage.md](05-data-storage.md)) — kalau nanti opsi SQLite persistence
  diaktifkan, perlu strategi migrasi skema (`golang-migrate` atau migrasi manual sederhana).
- Versi binary di-embed via `-ldflags "-X main.version=$(git describe --tags)"` saat build,
  ditampilkan di halaman Settings.

## 9.6 Konfigurasi Contoh (`config.yaml`)

```yaml
server:
  listen: "0.0.0.0:8090"

fileExplorer:
  rootDir: "/"
  maxUploadSizeMB: 500
  maxConcurrentOps: 2         # copy/move besar diantrekan, tidak dijalankan paralel tanpa batas
  copyThrottleMBps: 0         # 0 = tanpa batas; set (mis. 20) di storage lambat (eMMC/SD STB)
  copySyncEveryMB: 32         # panggil fsync tiap N MB agar writeback bertahap, bukan menumpuk
  blocklist:
    - "/etc/shadow"
    - "/etc/gshadow"

systemd:
  protectedUnits:
    - "sshd.service"
    - "docker.service"
    - "tarkimanos.service"

docker:
  enabled: true
  socketPath: "/var/run/docker.sock"

polling:
  cpuMemNetIntervalSec: 2
  diskUsageIntervalSec: 10
  tempIntervalSec: 5

terminal:
  enabled: true
  shell: "/bin/bash"        # wajib eksplisit — jangan andalkan shell akun tarkimanos (nologin)
  idleTimeoutMin: 15
  maxConcurrentSessions: 1

thresholds:
  cpuWarnPct: 70
  cpuCriticalPct: 90
  ramWarnPct: 70
  ramCriticalPct: 90
  tempWarnC: 65
  tempCriticalC: 80

persistence:
  enabled: false   # opsi Phase 3, lihat 05-data-storage.md
```
