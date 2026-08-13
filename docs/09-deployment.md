# 9. Build & Deployment

## 9.1 Cross-Compile

**Kebanyakan orang tidak perlu melakukan ini secara manual** — lihat §9.2 "Jalur tercepat" untuk
instalasi satu perintah yang mengunduh binary dari [GitHub Releases](https://github.com/tarkiman/taros/releases)
(dibuild otomatis, lihat `.github/workflows/release.yml`). Bagian ini relevan kalau memang mau
build sendiri (arsitektur di luar ARM64/ARMv7/x86_64/darwin, ingin memverifikasi build dari
source, atau berkontribusi ke proyek).

Go native cross-compile, tanpa CGO (menghindari kebutuhan toolchain C untuk ARM di mesin dev):

```bash
# Raspberry Pi 5 & sebagian besar revisi STB B860H (ARM 64-bit)
GOOS=linux GOARCH=arm64 CGO_ENABLED=0 go build -ldflags="-s -w" -o dist/taros-arm64 ./cmd/taros

# Fallback untuk revisi STB yang ternyata 32-bit (jaga-jaga, verifikasi dulu dengan `uname -m`)
GOOS=linux GOARCH=arm CGO_ENABLED=0 GOARM=7 go build -ldflags="-s -w" -o dist/taros-armv7 ./cmd/taros

# Bukan target device utama TarOS (bukan STB/Raspberry Pi), tapi dibuild & dirilis juga —
# Linux x86_64 biasa, dan WSL2 (Windows) yang kernelnya juga Linux x86_64. Lihat §9.2
# "WSL2 (Windows)" soal requirement systemd di jalur WSL.
GOOS=linux GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-s -w" -o dist/taros-amd64 ./cmd/taros

# macOS (Apple Silicon & Intel) — Docker/Files/Terminal jalan penuh,
# Dashboard/Proses/Monitoring Service gracefully tidak didukung (baca
# internal Linux tanpa padanan di fase ini). Lihat 04-features.md §4.9 dan
# §9.2 "macOS".
GOOS=darwin GOARCH=arm64 CGO_ENABLED=0 go build -ldflags="-s -w" -o dist/taros-darwin-arm64 ./cmd/taros
GOOS=darwin GOARCH=amd64 CGO_ENABLED=0 go build -ldflags="-s -w" -o dist/taros-darwin-amd64 ./cmd/taros
```

- `-ldflags="-s -w"`: strip debug symbols & DWARF info → mengecilkan ukuran binary
  (tidak berpengaruh ke runtime memory, tapi mempercepat transfer/copy ke perangkat).
- `CGO_ENABLED=0` wajib karena kita menghindari dependency yang butuh CGO
  (lihat alasan pemilihan `modernc.org/sqlite` alih-alih `mattn/go-sqlite3` di
  [03-tech-stack.md](03-tech-stack.md) jika opsi persistensi diaktifkan nanti).
- Sebelum `go build`, kalau ada perubahan di kode Vue (`web/frontend/`, termasuk halaman
  Editor/CodeMirror 6 — semua halaman sekarang satu proyek Vue yang sama, lihat
  [03-tech-stack.md](03-tech-stack.md) "Kenapa pivot ke Vue?"), build dulu:
  ```bash
  cd web/frontend && npm install && npm run build
  ```
  Hasilnya (`web/frontend/dist/`) di-commit ke repo dan di-embed via `web/embed.go` (var
  `SPA`) — langkah ini **tidak** perlu diulang tiap kali build binary Go, hanya saat kode Vue
  berubah. Tidak ada langkah build terpisah lain lagi — riwayat: sebelum migrasi Editor,
  CodeMirror 6 punya pipeline `esbuild` sendiri di `scripts/codemirror-build/` (sekarang
  dihapus, sudah jadi dependency npm biasa di atas), dan sebelum migrasi Vue dimulai, htmx &
  uPlot dipakai langsung sebagai file dist resmi tanpa build sama sekali.

## 9.2 Instalasi di Perangkat

### Jalur tercepat: satu perintah, tanpa build sama sekali

Untuk perangkat ARM64/ARMv7 (Raspberry Pi, kebanyakan STB Android), Linux x86_64/WSL2, maupun
macOS, **tidak perlu Go, Node, atau clone repo di perangkat target sama sekali** —
`scripts/quick-install.sh` mendeteksi OS & arsitektur, mengunduh binary siap pakai dari
[GitHub Releases](https://github.com/tarkiman/taros/releases) (dibuild otomatis oleh
`.github/workflows/release.yml` tiap tag `v*` di-push), lalu menjalankan `install.sh` (lihat di
bawah) untuknya — kecuali macOS, yang jalurnya beda total (lihat §9.2 "macOS" di bawah, tidak
butuh sudo/root sama sekali):

```bash
curl -sSL https://raw.githubusercontent.com/tarkiman/taros/main/scripts/quick-install.sh | sudo bash
```

**Di macOS, jangan pakai command di atas** — tidak butuh (dan tidak boleh) `sudo`. Pakai
command tanpa `sudo` di §9.2 "macOS" di bawah; kalau terlanjur jalan pakai `sudo` di macOS,
script sekarang menolak otomatis (lihat §9.2 "macOS" untuk cara benerin ownership file yang
sempat kepakai `sudo`).

Sudah root (umum di image STB minimal, tidak ada `sudo` terpasang)? Jalankan tanpa `sudo` di
depan `bash` — script mendeteksi ini sendiri. Semua flag `install.sh` di bawah tetap berlaku,
diteruskan lewat `--`:

```bash
curl -sSL https://raw.githubusercontent.com/tarkiman/taros/main/scripts/quick-install.sh | bash -s -- --service-user pi --no-create-user
```

Prompt username/password admin (langkah 6 di bawah) tetap muncul normal meski dijalankan lewat
`curl | bash` — script secara eksplisit membaca ulang dari `/dev/tty` (terminal asli) untuk
bagian ini, bukan dari pipe `curl` yang sudah habis terpakai untuk mengirim script itu sendiri.
Kalau arsitektur perangkat bukan ARM64/ARMv7/x86_64, atau memang mau build dari source, lanjut
ke opsi di bawah.

### WSL2 (Windows)

TarOS bukan dibuat untuk WSL — target aslinya STB/Raspberry Pi (lihat
[01-overview.md](01-overview.md)) — tapi kernel WSL2 adalah Linux x86_64 sungguhan, jadi
binary `amd64` di atas jalan apa adanya di sana. Satu perbedaan penting dari device ARM biasa:
**WSL2 tidak menjalankan systemd secara default.** `scripts/install.sh` mendeteksi ini
(`/run/systemd/system` tidak ada) dan otomatis melewati langkah pemasangan/aktivasi unit
systemd alih-alih gagal di tengah jalan dengan error mentah — instalasi tetap selesai (binary,
config, kredensial admin semua terpasang), cuma servisnya tidak di-start otomatis. Dua opsi
yang dicetak di akhir output:

1. **Aktifkan systemd di WSL** (direkomendasikan — servis auto-start/auto-restart seperti
   biasa setelahnya, termasuk untuk fitur self-update di §9.5). Tambahkan ke `/etc/wsl.conf`:
   ```ini
   [boot]
   systemd=true
   ```
   Lalu dari PowerShell/CMD di sisi Windows: `wsl --shutdown`, buka ulang terminal WSL, dan
   jalankan ulang installer.
2. **Jalankan manual tanpa systemd** (tidak auto-restart kalau crash atau terminal WSL
   ditutup):
   ```bash
   sudo -u taros /opt/taros/taros --config /etc/taros/config.yaml &
   ```

### macOS

Juga bukan target device utama TarOS, didukung sebagai fase pertama dengan scope sengaja
dibatasi — lihat [04-features.md](04-features.md) §4.9 untuk rincian apa yang jalan penuh
(Docker/Files/Terminal) vs. yang gracefully tidak didukung (Dashboard/Proses/Monitoring
Service, keduanya baca internal khusus Linux tanpa padanan di fase ini).

`quick-install.sh` mendeteksi Darwin secara otomatis dan mengambil jalur yang jauh lebih
sederhana dari Linux — **tidak butuh sudo/root sama sekali**:

```bash
curl -sSL https://raw.githubusercontent.com/tarkiman/taros/main/scripts/quick-install.sh | bash
```

Binary diletakkan di `~/taros/`, tanpa install service/unit apa pun (paket rilis macOS tidak
menyertakan `install.sh` — itu mengasumsikan `systemctl`/`useradd` yang tidak ada di macOS).
Setelah unduh selesai:

```bash
cd ~/taros
./taros setup --config ./config.yaml   # sekali saja, buat admin
./taros --config ./config.yaml
```

**Belum ada auto-start/auto-restart** setara systemd `Restart=always` (dipakai fitur
ganti-port dan toggle-terminal di Linux) — belum ada padanan `launchd`'s `KeepAlive` di fase
ini. Servis berhenti kalau terminal ditutup atau Mac restart; jalankan ulang perintah di atas
secara manual, atau pakai `nohup .../taros --config ./config.yaml &` / tmux/screen kalau mau
tetap jalan setelah terminal ditutup. Lihat [10-roadmap.md](10-roadmap.md) untuk status
`launchd` di fase berikutnya.

Untuk Docker, arahkan `docker.socketPath` di `config.yaml` ke socket Docker Desktop atau
Colima — `internal/docker` tidak hardcode path Linux, jadi ini cuma soal isi config, bukan
kode:

```yaml
docker:
  enabled: true
  socketPath: "/Users/<user>/.docker/run/docker.sock"   # Docker Desktop, sesuaikan username
  # atau untuk Colima:
  # socketPath: "/Users/<user>/.colima/default/docker.sock"
```

### Build dari source + `install.sh`

**`scripts/install.sh` mengotomatisasi langkah 1–4, 6, dan 9 di bawah** (binary, user servis,
config, kredensial admin, systemd unit), dikendalikan lewat flag
(`./scripts/install.sh --help` untuk daftar lengkap):

```bash
sudo ./scripts/install.sh --binary dist/taros-arm64
# atau untuk Opsi B (pakai user login yang sudah ada, bukan user dedicated baru):
sudo ./scripts/install.sh --binary dist/taros-arm64 --service-user pi --no-create-user
# atau untuk Opsi C (root, setara CasaOS — baca §7.4 dulu):
sudo ./scripts/install.sh --binary dist/taros-arm64 --root-mode
```

Tiga titik interaktif (bisa dilewati lewat flag untuk instalasi terskrip/CI):

1. **User servis** (langkah 2 di bawah) — kalau tidak satu pun dari `--service-user`,
   `--no-create-user`, `--root-mode` dipakai dan sesi ini punya TTY (termasuk lewat
   `curl | bash`), script tanya langsung mana dari Opsi A/B/C yang mau dipakai, dengan
   penjelasan trade-off masing-masing (Opsi B jadi default kalau ada user login terdeteksi
   lewat `$SUDO_USER`, kalau tidak jatuh ke Opsi A) — sesi non-interaktif diam-diam jatuh ke
   Opsi A seperti sebelumnya, tidak ada perubahan untuk instalasi terskrip yang sudah ada.
2. **Grup `docker`** (langkah 3) — karena Docker aktif secara default di config tapi aksesnya
   butuh persetujuan sadar, kalau sesi ini punya TTY dan tidak dipakai
   `--docker-group`/`--no-docker-group` eksplisit, script tanya langsung y/N sebelum
   menambahkan `$SERVICE_USER` ke grup `docker`; sesi non-interaktif diam-diam berperilaku
   seperti `--no-docker-group`. Dilewati otomatis (dianggap sudah "ya") kalau Opsi C dipilih.
3. **Username/password admin** (langkah 6).

Idempoten — aman dijalankan ulang (mis. setelah upgrade binary): user/config/kredensial yang
sudah ada tidak ditimpa diam-diam kecuali diminta eksplisit (`--force-setup` untuk reset
password admin), dan kalau `$SERVICE_USER` sudah anggota grup `docker` dari run sebelumnya
tidak ditanya ulang. Langkah 5, 7, dan 8 **sengaja tetap manual** (butuh keputusan sadar per
device — akses lintas-pemilik untuk file explorer, dan trade-off keamanan mode sudo) dan
dicetak sebagai pengingat di akhir output script — kecuali Opsi C dipilih, di mana semuanya
otomatis penuh dan pengingat itu diganti satu baris yang menjelaskan itu.

Langkah manual lengkap di bawah ini tetap didokumentasikan — untuk yang ingin paham persis apa
yang dilakukan script di atas, mau kustomisasi di luar flag yang tersedia, atau troubleshooting.
Proyek ini bisa dipakai siapa saja (repo publik) dengan setup rumah yang berbeda-beda, jadi
langkah di bawah ditulis dengan `SERVICE_USER` sebagai variabel — bukan asumsi harus selalu
user dedicated baru bernama `taros`. Set sekali di awal, lalu salin-tempel apa adanya:

```bash
SERVICE_USER=taros   # ganti sesuai pilihanmu — lihat opsi A/B/C di step 2
```

1. Copy binary ke `/usr/local/bin/taros`.
2. Tentukan user yang akan menjalankan servis — tiga opsi valid, pilih salah satu (`install.sh`
   menanyakan ini interaktif kalau tidak dispesifikkan lewat flag, lihat bagian sebelumnya):
   - **Opsi A (direkomendasikan untuk server bersama banyak orang/publik)**: user sistem
     dedicated baru, tanpa login interaktif — paling sesuai prinsip least-privilege:
     ```bash
     sudo useradd --system --no-create-home --shell /usr/sbin/nologin "$SERVICE_USER"
     ```
   - **Opsi B (praktis untuk device pribadi)**: pakai user yang sudah ada dan biasa kamu
     pakai (mis. user login utama di Raspberry Pi/STB kamu) — set `SERVICE_USER` ke user itu
     dan **lewati** perintah `useradd` di atas. Trade-off-nya: proses servis punya hak akses
     yang sama seperti akun kamu sehari-hari (bukan devices terisolasi sepenuhnya), tapi jauh
     lebih sederhana untuk setup rumahan single-user — termasuk akses baca+tulis langsung ke
     folder home akun itu sendiri, tanpa perlu ACL manual (lihat langkah 5 di bawah).
   - **Opsi C (PALING BERISIKO — akses penuh ke seluruh sistem, setara CasaOS)**: set
     `SERVICE_USER=root` dan lewati `useradd`. Ini menghilangkan **semua** batasan izin di
     panduan ini sekaligus (langkah 3, 5, dan mode sudo di langkah 8 semuanya jadi otomatis
     penuh) — tapi juga berarti bug apa pun di TarOS (path traversal, dsb) berpotensi
     berdampak ke seluruh sistem, bukan cuma bagian yang seharusnya dikelolanya. **Bukan
     default** — lihat [07-security.md](07-security.md) §7.4 untuk perbandingan
     langsung dengan arsitektur CasaOS (yang justru selalu berjalan seperti ini, tanpa
     pilihan) sebelum memutuskan.

   Siapa pun `$SERVICE_USER`-nya, edit `User=`/`Group=` di `deploy/systemd/taros.service`
   (default `taros`) supaya cocok **sebelum** meng-copy-nya di step 8.
3. Tambahkan `$SERVICE_USER` ke group `docker` (jika monitoring Docker dipakai) — dengan
   peringatan eksplisit ke user soal implikasi keamanannya (lihat [07-security.md](07-security.md) §7.4):
   ```bash
   sudo usermod -aG docker "$SERVICE_USER"
   ```
4. Copy `deploy/config.example.yaml` → `/etc/taros/config.yaml`, sesuaikan (`fileExplorer.
   rootDir`, port, dll), lalu `sudo chown "$SERVICE_USER" /etc/taros/config.yaml` — servis
   perlu menulis file ini sendiri untuk toggle "aktifkan Terminal dari browser" di halaman
   Pengaturan ([04-features.md](04-features.md) §4.7, [07-security.md](07-security.md) §7.6),
   sama alasannya dengan `/opt/taros/` untuk self-update di §9.5 bawah.
5. **Akses baca/tulis untuk File Explorer** — `$SERVICE_USER` **tidak otomatis** punya akses ke
   direktori manapun di luar apa yang secara eksplisit diberikan. Kalau `fileExplorer.rootDir`
   (step 4) berisi data yang dimiliki user/proses lain (pola umum: media/dokumen yang
   sebelumnya dikelola root atau servis lain), beri akses lewat grup bersama — jangan jalankan
   servis sebagai root untuk ini:
   ```bash
   ROOT_DIR=/path/ke/fileExplorer.rootDir   # samakan dengan config.yaml step 4

   sudo groupadd -f mediashare
   sudo usermod -aG mediashare "$SERVICE_USER"
   sudo chgrp -R mediashare "$ROOT_DIR"
   sudo chmod -R g+rwX "$ROOT_DIR"
   sudo find "$ROOT_DIR" -type d -exec chmod g+s {} \;   # folder baru otomatis ikut grup
   sudo setfacl -R -d -m g:mediashare:rwX "$ROOT_DIR"    # file baru dari proses LAIN pun tetap group-writable
   ```
   **Catatan mount FUSE** (NTFS/exFAT eksternal lewat ntfs-3g dkk, biasa dipakai untuk HDD
   eksternal): kalau mount-nya pakai opsi `user_id=0,group_id=0`, `chown`/`chgrp` di atas
   **tidak berpengaruh** — kepemilikan file di situ dipaksa oleh layer FUSE-nya sendiri, bukan
   metadata per-file biasa. Perbaikannya beda: remount dengan opsi `uid=`/`gid=` yang sesuai
   `$SERVICE_USER`, bukan `chown`. Cek `mount | grep <titik-mount>` untuk tahu apakah ini kasusmu.

   Servis mencoba menulis+menghapus file probe di `fileExplorer.rootDir` sekali saat startup
   dan mencatat **peringatan** (bukan gagal start) di log kalau tidak bisa — cek
   `journalctl -u taros` setelah start pertama kali untuk konfirmasi langkah ini sudah benar,
   daripada baru ketahuan saat user mencoba upload/pindah file (kejadian nyata yang jadi alasan
   catatan ini ditambahkan — root cause aslinya persis skenario di atas: direktori data dimiliki
   root, servis jalan unprivileged, tidak ada langkah instalasi yang mengurus ini).
6. Jalankan `taros setup` (interaktif) untuk membuat admin user pertama (username + password
   → disimpan ter-hash di `/etc/taros/config.yaml` atau file kredensial terpisah `/etc/taros/credentials`).
7. (Opsional, untuk kontrol systemd granular tanpa root penuh) copy
   `deploy/polkit/10-taros-systemd.rules` ke `/etc/polkit-1/rules.d/` (sesuaikan nama user
   di file rule itu kalau `$SERVICE_USER` bukan `taros`).
8. **(Opsional, dibutuhkan untuk: sudo di web terminal, DAN/ATAU tombol aksi
   start/stop/restart/reload di halaman Service** — lihat [04-features.md](04-features.md)
   §4.3 & §4.5, [07-security.md](07-security.md) §7.6 untuk trade-off-nya sebelum
   memilih**)**: pilih salah satu mode, **tidak dijalankan otomatis oleh installer**:
   ```bash
   # Mode "sudo dengan password" (paling lengkap — sudo di terminal + aksi service):
   sudo passwd "$SERVICE_USER"                # set password sistem (terpisah dari password dashboard)
   echo "$SERVICE_USER ALL=(ALL) ALL" | sudo tee /etc/sudoers.d/taros
   sudo chmod 440 /etc/sudoers.d/taros

   # ATAU mode "NOPASSWD" (hanya untuk device yang sudah terisolasi jaringan kuat):
   echo "$SERVICE_USER ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/taros
   sudo chmod 440 /etc/sudoers.d/taros

   # ATAU mode "hanya aksi service" (tidak buka sudo di terminal sama sekali — cocok kalau
   # web terminal sengaja tidak dipakai untuk sudo, tapi tetap mau tombol start/stop/restart
   # service berfungsi dari dashboard):
   echo "$SERVICE_USER ALL=(ALL) NOPASSWD: /usr/bin/systemctl start *, /usr/bin/systemctl stop *, /usr/bin/systemctl restart *, /usr/bin/systemctl reload *" | sudo tee /etc/sudoers.d/taros-systemctl
   sudo chmod 440 /etc/sudoers.d/taros-systemctl
   ```
   Selalu `visudo -c` (atau setara) setelah menulis file ini untuk validasi syntax sebelum
   dipakai — sudoers rule yang salah syntax bisa mengunci akses sudo sistem secara keseluruhan.
   Tanpa salah satu mode ini, halaman Service tetap bisa **memonitor** (list unit, status,
   log) sepenuhnya — hanya tombol aksi yang akan gagal dengan pesan "Interactive
   authentication required" sampai salah satu sudoers rule di atas disiapkan.
9. Copy `deploy/systemd/taros.service` (dengan `User=`/`Group=` sudah disesuaikan di
   step 2) ke `/etc/systemd/system/`, lalu:
   ```bash
   sudo systemctl daemon-reload
   sudo systemctl enable --now taros
   ```

## 9.3 Contoh Unit File Systemd

`User=`/`Group=` di bawah adalah default `taros` — ganti keduanya kalau kamu pilih
`$SERVICE_USER` lain di §9.2 step 2 (mis. user login existing-mu sendiri untuk device pribadi).

```ini
[Unit]
Description=TarOS - Lightweight Linux system monitor
After=network.target docker.service
Wants=docker.service

[Service]
Type=simple
User=taros
Group=taros
ExecStart=/usr/local/bin/taros --config /etc/taros/config.yaml
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
`systemctl status taros` (memory) dan `top`/`htop` saat idle vs saat dashboard dibuka beberapa klien.

**Catatan pasca pivot ke Vue** (lihat [03-tech-stack.md](03-tech-stack.md)): target di atas
tidak berubah, karena semuanya mengukur RSS proses `taros` di device target — Vue
dirender di browser klien yang mengakses dashboard (laptop/HP), bukan di proses Go/di device
target itu sendiri. Ukuran bundle JS (lihat rincian per-chunk di komit yang menambahkan
`web/frontend/`) memengaruhi waktu-muat/RAM browser klien, bukan resource budget STB.

### Benchmark Pembanding: CasaOS

TarOS dibuat sebagai pengganti CasaOS di STB B860H karena CasaOS terasa berat di RAM
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
   monitoring lengkap), bandingkan RSS TarOS terhadap baseline CasaOS itu.

| Komponen | RAM terukur | Catatan |
|---|---|---|
| CasaOS (seluruh stack) | *(isi setelah diukur)* | Baseline pembanding |
| TarOS — idle | *(isi setelah diukur)* | Target: signifikan lebih rendah dari baseline di atas |
| TarOS — dashboard aktif | *(isi setelah diukur)* | — |

## 9.5 Upgrade

### Lewat dashboard (paling mudah — tidak perlu akses terminal/SSH sama sekali)

Tombol versi di topbar (lihat [04-features.md](04-features.md) §4.8) → "Update Sekarang" kalau
ada rilis lebih baru. Mekanisme di baliknya (`internal/selfupdate`):

1. `GET /api/update/check` menanyakan `api.github.com/repos/tarkiman/taros/releases/latest`
   (URL hardcoded, bukan configurable — lihat [07-security.md](07-security.md) §7.9) dan
   membandingkan `tag_name`-nya dengan `main.version` build ini sendiri.
2. `POST /api/update/apply` mengunduh tarball rilis yang cocok dengan `runtime.GOARCH`,
   mengekstrak binary `taros` dari dalamnya (langsung di memori/stream, `archive/tar` +
   `compress/gzip` stdlib, tidak ada dependency tambahan), lalu `os.Rename` menimpa binary yang
   sedang berjalan — aman di Linux karena proses yang sedang jalan tetap memegang inode lamanya
   lewat file descriptor sendiri, rename cuma mengarahkan ulang entry direktori.
3. Proses **keluar bersih** (`os.Exit(0)`) sekitar 700ms setelah mengirim respons sukses ke
   client (jeda ini supaya respons-nya benar-benar terkirim dulu, tidak race dengan proses mati).
   systemd (`Restart=always`, lihat catatan di §9.3/unit file) yang menghidupkannya lagi,
   menjalankan binary baru. **Tidak ada panggilan `systemctl` sama sekali** dari dalam aplikasi
   — tidak butuh sudo/polkit, beda dari tombol aksi Docker/Service yang memang butuh privilege
   tambahan.
4. Kenapa ini bisa jalan tanpa root: `scripts/install.sh` memasang binary di `/opt/taros/taros`
   (**bukan** langsung di `/usr/local/bin/`) dan men-chown seluruh direktori itu ke user servis
   — `/usr/local/bin/taros` jadi symlink saja untuk pemakaian CLI. Ini ketahuan lewat pengujian
   langsung, bukan asumsi: percobaan pertama menaruh binary langsung di `/usr/local/bin` dan
   cuma meng-chown *file*-nya gagal dengan `permission denied`, baik untuk membuat file
   sementara maupun untuk rename akhir — ternyata membuat/mengganti entry di suatu direktori
   butuh izin tulis ke *direktori* itu sendiri, kepemilikan atas file di dalamnya tidak cukup
   (diverifikasi manual: bahkan `mv` sebagai user servis atas file yang di-chown ke dirinya
   sendiri, ke dalam direktori root-owned, tetap ditolak).
5. **Semua sesi login hilang setelah update** — session store TarOS murni in-memory (tidak ada
   database), jadi restart proses apa pun otomatis membersihkannya. UI mengingatkan ini
   sebelum konfirmasi. Config (`/etc/taros/config.yaml`) dan kredensial admin tidak tersentuh
   sama sekali — hanya file binary yang diganti.
6. Instalasi lama (dari sebelum `/opt/taros/` ada) tidak otomatis kompatibel dengan tombol ini
   — direktori binary-nya masih root-owned. Jalankan ulang `scripts/quick-install.sh` atau
   `install.sh` sekali (lihat opsi CLI di bawah) untuk pindah ke layout baru; setelah itu tombol
   update di dashboard berfungsi normal untuk seterusnya.
7. Toggle `update.enabled` di config (default **true**) mematikan fitur ini total kalau tidak
   diinginkan — endpoint `check` tetap merespons (menunjukkan status nonaktif), `apply` menolak
   dengan HTTP 403.

### Lewat CLI (`scripts/install.sh` / `quick-install.sh`)

- **Cara termudah tanpa dashboard: jalankan ulang perintah instalasi satu baris** (§9.2 "Jalur tercepat") —
  `quick-install.sh` selalu mengambil rilis terbaru, dan `install.sh` sekarang secara eksplisit
  **me-restart** servisnya setiap dijalankan (bukan cuma `enable --now`, yang ternyata *no-op*
  kalau servisnya sudah aktif — lihat catatan bug di bawah), jadi binary baru benar-benar
  langsung terpakai, bukan cuma tersalin ke disk sementara proses lama tetap jalan. Config &
  kredensial admin yang sudah ada tidak disentuh. Script mencetak versi lama → baru supaya
  jelas apakah upgrade benar-benar terjadi.
- Downtime singkat saat restart, dapat diterima untuk service monitoring single-node.
- **Bug nyata yang mendasari catatan di atas**: versi awal `install.sh` memanggil
  `systemctl enable --now taros` di langkah terakhir — `--now` di situ artinya "start kalau
  belum jalan", **bukan** "restart". Diuji langsung: instalasi awal jalan normal, tapi
  menjalankan ulang installer dengan binary baru sementara servis lama masih aktif meninggalkan
  proses lama tetap berjalan tanpa perubahan (PID sama persis sebelum & sesudah, dikonfirmasi
  lewat `systemctl show taros -p MainPID`) walau binary di `/usr/local/bin/taros` sudah
  ter-update — artinya re-run installer terlihat berhasil tapi diam-diam tidak melakukan apa-apa
  ke instance yang sedang berjalan. Diperbaiki dengan `systemctl enable` (set enabled saja) +
  `systemctl restart` (selalu reload, aman juga untuk instalasi baru karena `restart` pada unit
  yang belum pernah jalan berperilaku sama seperti `start`).
- Tidak ada migrasi data yang rumit di versi awal karena tidak ada database persisten
  (lihat [05-data-storage.md](05-data-storage.md)) — kalau nanti opsi SQLite persistence
  diaktifkan, perlu strategi migrasi skema (`golang-migrate` atau migrasi manual sederhana).
- Versi binary di-embed via `-ldflags "-X main.version=vX.Y.Z"` saat build (dilakukan otomatis
  oleh `.github/workflows/release.yml` untuk tiap tag rilis) — cek dengan `taros version`, juga
  tercatat di log startup (`journalctl -u taros`). Belum ditampilkan di UI (halaman Settings
  sendiri belum ada, lihat Fase 6 di [10-roadmap.md](10-roadmap.md)).

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
    - "taros.service"

docker:
  enabled: true
  socketPath: "/var/run/docker.sock"

polling:
  cpuMemNetIntervalSec: 2
  diskUsageIntervalSec: 10
  tempIntervalSec: 5
  procIntervalSec: 5

terminal:
  enabled: true
  shell: "/bin/bash"        # wajib eksplisit — jangan andalkan shell akun taros (nologin)
  idleTimeoutMin: 15
  maxConcurrentSessions: 1

diskAnalysis:
  enabled: false   # lihat docs/04-features.md §4.12 — scan read-only, delete lewat file explorer

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
