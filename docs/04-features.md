# 4. Spesifikasi Fitur

## 4.1 Monitoring Resource Sistem

### CPU

- Persentase penggunaan **total** dan **per-core**, dihitung dari delta `/proc/stat`
  antar sampling (bukan snapshot instan — CPU% butuh dua pembacaan berjarak waktu).
- Load average (1/5/15 menit) dari `/proc/loadavg`.
- Frekuensi tiap core (jika tersedia) dari `/sys/devices/system/cpu/cpu*/cpufreq/scaling_cur_freq`.
- Jumlah core & model (info statis, sekali baca saat startup) dari `/proc/cpuinfo`.

### RAM

- Total, used, free, available, buffers, cached, swap total/used — dari `/proc/meminfo`.
- "Used" dihitung dengan formula yang sama seperti `free -h` (bukan `total - free` mentah,
  karena itu menyesatkan — harus memperhitungkan cache/buffer sebagai "reclaimable").

### Disk (Internal & External)

- **Sumber daftar mount**: parse `/proc/self/mountinfo` (lebih lengkap & aman dari
  `/proc/mounts`, karena memuat mount ID, parent, dan mount options per entry) untuk
  mendapatkan semua filesystem yang ter-mount saat ini — ini otomatis mencakup:
  - **Storage internal**: partisi boot (eMMC/microSD di RPi 5 & STB), root filesystem.
  - **Storage eksternal**: flashdisk/HDD/SSD USB, kartu SD tambahan, yang ter-mount di
    `/media/*`, `/mnt/*`, atau lokasi lain — selama ter-mount, otomatis terdeteksi tanpa
    perlakuan khusus karena `statfs` bekerja sama untuk semua filesystem yang di-mount.
  - **Network share**: NFS/CIFS/SMB yang ter-mount juga ikut kebaca (tipe filesystem
    `nfs`, `nfs4`, `cifs` tidak masuk daftar exclude default) — berguna kalau STB/RPi
    mount NAS. Latency baca `statfs` untuk network mount bisa lebih tinggi — collector
    disk usage diberi timeout pendek per mount point (mis. 1 detik) supaya satu network
    share yang lambat/putus tidak memblokir seluruh siklus polling.
- Per mount-point ditampilkan: path mount, device source, filesystem type (ext4/vfat/ntfs/
  nfs/cifs/dst), total/used/free/persentase, dan **label "internal"/"eksternal"** (heuristik:
  baca `/sys/block/<dev>/removable` — `1` berarti removable/eksternal; device yang levelnya
  di belakang partisi USB, seperti `sda1` dari `/sys/block/sda`, ikut mewarisi flag parent-nya).
  **Catatan (v0.42):** kernel memberi `removable=0` untuk HDD/SSD USB (hanya flashdisk dan card
  reader yang `1`), jadi disk yang duduk di bus USB (path sysfs-nya melewati `/usbN/`) kini juga
  dihitung eksternal. Penanganan drive eksternal (mount otomatis, eject) ada di §4.17.
- Filter mount point virtual/tidak relevan (`tmpfs`, `devtmpfs`, `proc`, `sysfs`, `cgroup*`,
  `overlay` milik container Docker, dll) dari daftar utama, tapi tetap bisa ditampilkan di
  mode "advanced" jika perlu.
- **Deteksi hot-plug**: saat halaman/dashboard dibuka, daftar mount di-refresh (bukan cache
  lama) — jadi kalau user colok USB drive baru lalu mount manual, storage tsb otomatis muncul
  di listing berikutnya tanpa perlu restart service. Tidak ada auto-mount otomatis oleh TarOS
  sendiri (di luar scope — mounting tetap tanggung jawab OS/user).
- Device block yang **belum ter-mount** (mis. USB drive tercolok tapi belum di-mount) opsional
  ditampilkan di mode "advanced" (dari `/proc/partitions` / `/sys/block/*`) sebagai info saja
  (ukuran, nama device), tanpa aksi mount dari UI di versi awal.
- I/O throughput (read/write bytes per detik) dari delta `/proc/diskstats` per device — ini
  juga mencakup device eksternal (USB storage biasanya muncul sebagai `sd*` di `/proc/diskstats`
  sama seperti storage internal SATA/SCSI; eMMC muncul sebagai `mmcblk*`).

### Suhu

- Baca semua `/sys/class/thermal/thermal_zone*/temp` (nilai dalam millidegree Celsius) +
  label dari `thermal_zone*/type` (misal `cpu-thermal`, `gpu-thermal` di Raspberry Pi).
- Untuk Raspberry Pi 5 spesifik: juga cek `vcgencmd measure_temp` sebagai fallback opsional
  jika binary tersebut tersedia (tidak wajib — thermal_zone sudah cukup di kernel modern).
- Tampilkan multi-sensor jika perangkat punya lebih dari satu (CPU vs GPU misalnya).

### Network

- Per interface: rx/tx bytes, dihitung throughput (bytes/s) dari delta `/proc/net/dev`.
- Exclude `lo` (loopback) dari tampilan utama, tapi tetap tersedia jika dibutuhkan.

### Proses (per-process)

- Widget "Pemakai Teratas" di Dashboard menjawab "siapa yang pakai CPU/RAM ini" di dua level
  granularitas berbeda, dipilih lewat tab **Container** / **Proses**:
  - **Container**: dari data `dockerApi.containers()` yang sudah ada (stats per container),
    tidak ada pengumpulan data baru.
  - **Proses (OS)**: daftar proses sungguhan di level sistem operasi (bukan cuma container) —
    baca langsung `/proc/[pid]/stat` (nama proses, `utime`+`stime` untuk CPU% berbasis delta,
    pola sama seperti CPU total system-wide di atas) dan `/proc/[pid]/status` (`VmRSS`, jumlah
    thread, dan uid pemilik — satu kali baca untuk ketiganya), **bukan** lewat `gopsutil` —
    konsisten dengan keputusan "Kenapa tidak gopsutil?" di [03-tech-stack.md](03-tech-stack.md).
  - Widget ini cuma tampilkan 5 baris teratas — link "Lihat semua proses" di tab Proses
    membuka **halaman Proses** tersendiri (menu topbar "Proses"): tabel penuh gaya
    `btop`/`htop` (PID, Program, Command lengkap dari `/proc/[pid]/cmdline`, Threads, User,
    CPU%, MemB), semua kolom bisa diurutkan (klik header, sama pola dengan tabel Docker/
    Service/Files), plus search by nama/command/user. Auto-refresh tiap 5 detik. Render pakai
    `virtual-scroll` NDataTable karena baris bisa ratusan di host yang sibuk.
- Klik gauge **CPU** atau **RAM** di kartu "Ringkasan Sistem" menentukan pengurutan widget
  (berlaku ke kedua tab, Container maupun Proses) — bukan modal/drawer terpisah, supaya tetap
  satu layar tanpa navigasi tambahan, sesuai filosofi "informasi penting terlihat tanpa scroll"
  di [06-api-ui-ux.md](06-api-ui-ux.md) §6.2.
- Endpoint `GET /api/processes?sortBy=cpu|mem&limit=N` (`limit` maks 1000) melakukan sorting &
  pembatasan jumlah di server. Widget Dashboard minta `limit=5` (tidak ada alasan kirim
  ratusan baris lewat jaringan padahal cuma 5 yang ditampilkan); halaman Proses penuh minta
  sekali dengan limit besar lalu semua interaksi sort/filter berikutnya murni di client —
  sama pola dengan tabel Docker/Service/Files, bukan re-fetch tiap klik header.
- Sampling proses **terpisah dari SSE snapshot** metrics utama (interval sendiri, lebih jarang
  — lihat tabel di bawah): membaca `/proc` per-PID (dua file per proses) untuk ratusan proses
  jauh lebih berat daripada satu pembacaan `/proc/stat` agregat, dan tidak semua klien yang
  terhubung ke SSE sedang melihat widget ini — membebani setiap tick SSE dengan data yang
  sering tidak dipakai tidak sepadan di perangkat 2GB RAM.

### Interval Sampling (default, bisa dikonfigurasi)

| Metric | Interval default |
|---|---|
| CPU, RAM, Network | 2 detik |
| Disk usage | 10 detik |
| Disk I/O | 2 detik |
| Suhu | 5 detik |
| Proses (daftar OS-level) | 5 detik |

## 4.2 Monitoring & Pengaturan Docker

Halaman Docker dibagi jadi beberapa sub-tab: **Containers**, **Images**, **Volumes**,
**Networks**, dan **Settings** — mengikuti empat objek utama Docker Engine, karena masing-masing
punya bentuk "konsumsi resource" yang berbeda dan tidak masuk akal digabung satu tabel.

### Containers

- Daftar container **running** (default) dengan toggle untuk menampilkan **semua** (termasuk
  stopped/exited).
- **Kolom tabel bisa diurutkan** (klik header) — Status diurutkan berdasarkan tingkat "aktif"
  (running → restarting → paused → exited/dead), bukan alfabetis, supaya container yang sedang
  jalan gampang dikelompokkan; CPU/RAM/Network diurutkan numerik dari data live stats-nya.
  Berlaku juga di tab Images/Volumes/Networks (ukuran, jumlah dipakai, tanggal dibuat, dst).
- Per container: nama, image, status, uptime, port mapping, dan **live stats**:
  - CPU% (dihitung dari delta `cpu_stats`/`precpu_stats` dalam **satu** panggilan
    `stats?stream=false` — terkonfirmasi Docker sudah mengembalikan `precpu_stats` yang valid
    dari sampel internalnya sendiri, jadi TarOS tidak perlu polling dua kali sendiri
    seperti collector `/proc` host di [Fase 1](10-roadmap.md)).
  - Memory usage vs limit (+ persentase) — **catatan implementasi**: di sebagian host
    cgroup v2, Docker mengembalikan `memory_stats.usage`/`.limit` kosong (0) — dikonfirmasi
    ini quirk daemon/host, bukan bug klien (`docker stats` bawaan Docker sendiri juga
    menunjukkan "0B/0B" di host yang sama). UI menampilkan "—" alih-alih memaksakan angka
    yang salah dalam kondisi ini.
  - Network I/O (rx/tx), Block I/O (read/write disk).
- Aksi: **start / stop / restart / remove** per container. Konfirmasi Fase 2 pakai
  `hx-confirm` bawaan htmx (dialog konfirmasi native browser) — **bukan** modal custom
  bergaya aplikasi atau pola "ketik ulang nama" yang disebutkan di draf awal; itu jadi
  item polish UI di [Fase 5](10-roadmap.md), bukan blocker untuk fungsi dasar start/stop/
  restart/remove yang sudah aman (tetap ada konfirmasi, cuma belum custom-styled).
- **Belum diimplementasikan di Fase 2** (dicadangkan untuk iterasi berikut): detail container
  (env vars, mounted volumes, network terhubung) saat diklik. Scope Fase 2 difokuskan ke
  list + live stats + aksi dasar dulu — log viewer (dicadangkan di sini) menyusul, lihat
  "Log Container" di bawah.

### Tab "Aplikasi" (grup per compose project)

Satu aplikasi sering terdiri dari banyak container; tab **Aplikasi** mengelompokkannya per
*docker compose project* supaya status satu aplikasi terbaca sekilas. Didiskusikan dulu (bukan
langsung dibangun): CasaOS (app store, sumber alasan TarOS dibuat) dan Coolify (PaaS Git-deploy,
berat) dinilai melenceng dari kebutuhan "kelola app buatan sendiri di repo" — yang dibutuhkan
cuma tampilan berpusat pada project, tahap 1 sengaja **read-only** (tanpa Start/Stop project).

- **Sumber data = label yang sudah dikirim Docker**, bukan panggilan API baru:
  `com.docker.compose.project` / `.service` / `.project.working_dir` dibaca dari
  `/containers/json` (`internal/docker.ListContainers`). Nol beban tambahan, nol migrasi, dan
  berlaku untuk project yang dibuat lewat CLI. Container tanpa label compose masuk grup
  "Lainnya" (tidak ada yang hilang).
- **Health** di-parse dari string `Status` ("Up 2 hours (healthy)", "(unhealthy)",
  "(health: starting)") karena endpoint list tidak punya field health terpisah.
- **Status per aplikasi**: *Perlu perhatian* (ada container `unhealthy` / restart-loop),
  *Terganggu* (sebagian tidak jalan / health masih starting / paused), *Berhenti*, *Sehat*.
  Aplikasi bermasalah diurutkan paling atas dan terbuka otomatis; "Lainnya" selalu terakhir.
  Ringkasan tiap kartu: `jalan/total` dan total CPU/RAM gabungan.
- Detail per service: status, health, uptime, CPU/RAM, tombol Logs (memakai ulang drawer log
  di bawah), dan link **Buka folder project** ke File Explorer (dari `working_dir`).
- **Batasan jujur**: "running" tanpa `HEALTHCHECK` di compose file belum berarti sehat — hint di
  bawah daftar mengingatkan ini. Aksi per-project: **Start/Stop/Restart** dan **Uninstall**
  (di bawah); update image sengaja belum ada.
- Diuji di device nyata (7 project sungguhan) plus project sementara berisi service sehat,
  `unhealthy`, restart-loop, dan satu container non-compose — semua status & pengurutan
  terverifikasi lewat Chromium headless (CDP).

### Start / Stop / Restart aplikasi (urutan `depends_on`)

Tombol **Start**, **Stop**, dan **Restart** di kartu aplikasi (tab Aplikasi), di samping Uninstall.
Start/Stop lewat API Docker biasa tidak tahu `depends_on` dan tidak ada CLI `docker compose` di host —
tetapi compose menandai tiap container dengan label `com.docker.compose.depends_on`
(`service:condition:restart,…`), jadi urutannya bisa disusun ulang dari container-nya saja
(`internal/docker/lifecycle.go`). Dicek di host ini: 14 dependensi `service_healthy` dan 10
`service_started`, dengan rantai tiga lapis nyata di `aiplatform`.

- **Start**: dependensi dulu, per lapisan (container satu lapisan paralel). Sebelum lapisan berikutnya
  ia menunggu kondisi terkuat yang diminta dependen: `service_started` = berjalan, `service_healthy` =
  health `healthy`, `service_completed_successfully` = keluar dengan exit 0. Batas tunggu 120 dtk.
  Status `unhealthy` **tetap ditunggu** (health check bisa pulih dalam jendela itu — terlihat nyata
  saat `compose up` sendiri menyerah karena `db` sempat `unhealthy` sesaat sebelum sehat, dan
  meninggalkan `api`/`web` berstatus *Created*). Container tanpa healthcheck yang diminta `service_healthy`
  dianggap siap saat berjalan (dicatat di detail). Container yang mati sebelum sehat **gagal seketika**,
  tidak menunggu sampai timeout.
- **Stop**: kebalikannya — yang bergantung dihentikan dulu, baru yang dibutuhkannya, dengan stop
  yang baik (SIGTERM lalu SIGKILL sesuai stop-timeout container, bukan kill).
- **Restart** = satu siklus Stop lalu Start penuh. Status container dibaca ulang di antara kedua fase
  (status yang dibaca di awal sudah basi begitu semuanya dihentikan).
- **Kegagalan parsial tidak diam-diam**: container yang gagal, atau yang dependensinya gagal, ditandai
  *failed* / *dilewati* dengan alasan (nama dependensi dan kata-kata daemon Docker), sedangkan service
  yang tidak bergantung tetap dikerjakan. Container yang sudah **dihapus** tidak bisa dibuat ulang tanpa
  compose — dilaporkan, tidak dipura-purakan (`docker compose up` yang membuatnya ulang). Container
  `paused` dilanjutkan; yang sudah berjalan dilewati dengan keterangan.
- **Berjalan di server sebagai job** (202 lalu dibaca dari `GET .../lifecycle`), jadi tetap jalan kalau
  browser ditutup, dan hasilnya terbaca lagi setelah reload; UI menampilkan progres per container.
  Satu job per aplikasi sekali waktu (409 `docker_project_busy`); aplikasi berbeda boleh bersamaan.
  Ditolak kalau TarOS sendiri berjalan sebagai container di aplikasi itu (sama dengan Uninstall).
- **Konfirmasi** dialog untuk Stop dan Restart, tanpa password (sama dengan aksi per-container yang
  sudah ada); Start langsung. Setiap permintaan tercatat di log (siapa, aplikasi, aksi).
- **Efek ke alert container** (§4.11): Stop lewat sini berakhir exit 0/137/143, yang alert container
  anggap berhenti sengaja, jadi tidak memicu alert; Restart tidak menaikkan `RestartCount`.
- **Perbaikan terkait**: `StopContainer`/`RestartContainer` per-container lama memakai timeout HTTP
  klien 10 dtk — persis sama dengan stop-timeout default Docker (10 dtk), sehingga container yang
  lambat berhenti dilaporkan gagal padahal berhasil. Kini memakai jalur tanpa timeout klien (dibatasi
  konteks), dengan test.
- **Diuji**: 17 test dengan Docker palsu yang menyimpan state (urutan start/stop, menunggu health,
  dependensi mati/tak pernah sehat, `completed_successfully`, tanpa healthcheck, paused, sudah berjalan,
  siklus, satu-job-per-aplikasi, restart dengan state basi, stop yang melewati timeout klien) — dicek
  dengan **12 mutasi**, semuanya tertangkap (satu lewat *stack overflow* saat penjaga siklus dilepas). Di
  Docker **asli**, dengan project tiruan berlapis tiga (`db` sehat setelah ~6 dtk → `api` → `web`,
  ditambah `cache`): urutan stop dibuktikan dari `FinishedAt` milik Docker sendiri (web → api → cache∥db),
  urutan start dari `StartedAt` (**api menyala 7,2 dtk setelah db**, menunggu sehat), restart penuh,
  start ketika `api`/`web` hanya *Created*, dan dependensi yang crash (exit 3 → dependen dilewati,
  service independen tetap jalan). UI diuji di Chromium headless (konfirmasi, tombol terkunci selama
  job, progres per service, tombol kembali sesuai keadaan). Container asli tidak disentuh.
- **Batas jujur**: tidak bisa menyalakan ulang container yang sudah dihapus (butuh compose); tidak
  menghormati `restart:` di label dependensi; batas tunggu 120 dtk tidak bisa diatur; `depends_on`
  antar-aplikasi berbeda tidak dikenal (hanya di dalam satu compose project); dan job hanya di memori
  (hilang kalau TarOS restart).

### Environment variable container (read-only, rahasia ditahan)

Tombol **Env** di baris service (tab Aplikasi) membuka drawer berisi environment variable
yang **benar-benar dipakai** container (`Config.Env` dari inspect, hasil gabungan compose/`.env`/
image). Sengaja **hanya-baca** — mengubah env berarti membuat ulang container, itu tempatnya di
compose file.

- **Rahasia ditahan di server, bukan sekadar disembunyikan UI.** Nilai variabel yang tampak
  rahasia **tidak ikut** di respons `GET .../env` sama sekali (diverifikasi: 0 kemunculan nilai
  di body respons), jadi tidak ada di memori/devtools/network log browser sebelum diminta.
  Deteksi (`internal/docker.IsSecret`): nama mengandung `password/pass/secret/token/api_key/
  access_key/private/credential/auth/salt/jwt/cert/dsn/connection_string/key` **atau** nilainya
  URL berkredensial (`postgres://user:pass@host`) — kunci `DATABASE_URL`/`BROKER` apa pun
  namanya tetap tertangkap. Sengaja luas: menyamarkan nilai yang tidak sensitif cuma butuh satu
  klik, membocorkan kredensial asli ke layar tidak bisa di-undo.
- **Buka nilai rahasia = ketik ulang password akun** (`POST .../env/reveal`, 403 kalau salah) —
  bar konfirmasi yang sama dengan toggle Terminal/Port/hapus TOTP/kelola user. Tiap pembukaan
  yang berhasil dicatat ke log (`docker: nilai environment rahasia dibuka container=… count=…
  by=…`) — **tanpa nilainya**. Nilai yang sudah dibuka hidup hanya di memori komponen dan
  dibuang saat drawer ditutup (diuji: tutup lalu buka lagi → kembali tertutup).
- **Variabel bawaan image** (`PATH`, versi bahasa, dst.) ditandai lewat diff dengan `Config.Env`
  image-nya (satu panggilan Docker tambahan, hanya saat drawer dibuka) dan disembunyikan default
  supaya yang terlihat cuma konfigurasi aplikasimu; checkbox untuk memunculkannya. Rahasia tidak
  pernah ikut disembunyikan sebagai "bawaan image". Ada filter nama dan tombol salin per nilai.

### Uninstall aplikasi (satu compose project)

Tombol **Uninstall** di bagian bawah kartu aplikasi (tab Aplikasi) — hanya untuk project
compose bernama, tidak untuk grup "Lainnya". Tidak ada CLI `docker compose` di host, jadi
uninstall dikerjakan lewat Docker API dengan label `com.docker.compose.project`
(`internal/docker/project.go`), setara `docker compose down`:

- **Selalu dihapus**: semua container project (termasuk yang sudah berhenti) dan network-nya.
  Container dihentikan dulu **paralel dan baik-baik** (SIGTERM, menunggu stop-timeout masing-
  masing) baru dihapus — database dapat kesempatan flush; force-kill itulah yang merusak
  AOF/WAL. Karena itu satu uninstall bisa makan puluhan detik (dialog menampilkan status
  "sedang berjalan" dan tidak bisa ditutup di tengah jalan).
- **Opt-in, default mati**: *hapus juga datanya (volume)* — bertanda merah + daftar nama volume,
  juga menghapus volume anonim milik container; dan *hapus juga image* (bebaskan ruang; image
  yang masih dipakai container lain otomatis dilewati oleh Docker dengan 409).
  Data adalah satu-satunya bagian yang tidak bisa di-download ulang, jadi default-nya aman:
  pasang ulang aplikasi → datanya ketemu lagi.
- **Tidak pernah disentuh**: folder project & file compose di disk, network/volume yang
  dideklarasikan `external: true` (tidak berlabel project, jadi tidak pernah masuk daftar).
- **Dry-run dulu**: dialog memanggil `GET /api/docker/projects/{name}/uninstall-plan` dan
  menampilkan persis apa yang akan hilang; project tanpa apa pun → 404 (sudah ter-uninstall).
- **Konfirmasi berlapis**: ketik nama aplikasi **dan** password akun sendiri (`POST
  .../uninstall`, 403 kalau salah; nama dicek ulang di server, jadi pemanggilan skrip tidak bisa
  melewatinya). Detail keamanan di `docs/07-security.md`.
- **Kegagalan parsial dilaporkan, tidak fatal**: tiap langkah punya hasil sendiri (mis. volume
  masih dipakai container project lain → pesan daemon ditampilkan) dan sisanya tetap jalan.
- **Penjaga diri sendiri**: kalau TarOS ternyata berjalan sebagai container di project itu,
  uninstall ditolak (`docker_project_runs_this`) — bukan bunuh diri di tengah jalan.
- Kustomisasi tile Dashboard (icon/URL) ikut dihapus begitu semua container berhasil dihapus.

### Log Container

Live-tail log stdout/stderr container langsung dari dashboard — dibuka lewat tombol "Logs" di
kolom Aksi tab Containers, tampil di drawer sisi kanan. Ditambahkan atas permintaan langsung
user (untuk tracking kalau ada masalah), sempat didiskusikan dulu soal beban sebelum
diimplementasikan — keputusan akhir: **realtime**, dengan backlog awal dibatasi rentang waktu
supaya connect pertama tetap ringan.

- **Live, bukan cuma snapshot**: baris baru muncul begitu proses container menulisnya, lewat
  SSE (`GET /api/docker/containers/{id}/logs/stream`) — berbeda dari Service Logs (§4.3, yang
  cuma 50 baris terakhir sekali ambil, tidak live), karena tujuannya memang tracking real-time.
- **Backlog awal dibatasi** (dropdown 15 menit/1 jam/6 jam/24 jam, default 15 menit + cap keras
  500 baris) — Docker API mendukung `tail` dan `since` sekaligus meski dengan `follow=1`, jadi
  connect pertama ke container yang sudah logging berhari-hari tidak pernah menarik seluruh
  riwayatnya. Ganti dropdown = reconnect dengan backlog baru.
- **Tidak ada proses yang jalan terus-menerus**: satu goroutine + satu koneksi ke Docker daemon
  cuma hidup selama drawer log itu terbuka di satu tab browser — beda total dari fitur lain
  yang memang selalu polling (mis. `internal/notify.Monitor`). Drawer ditutup → koneksi
  ditutup bersih (diverifikasi lewat perbandingan jumlah file descriptor proses sebelum/
  sesudah, bukan cuma dari tampilan UI).
- **Baris error/warning diberi warna** (merah/kuning) buat bantu visual saat nyari masalah,
  plus timestamp per baris (format lokal, bukan RFC3339Nano mentah dari Docker). Klasifikasinya
  dari **isi teks** baris (regex `\b(error|fatal|panic|exception|critical)\b` dan `\bwarn(ing)?\b`,
  case-insensitive), bukan cuma dari stream stdout/stderr — banyak container nyatanya menulis
  level "ERROR" ke stdout (dikonfirmasi lewat pengujian nyata: container ramai yang jadi kasus
  uji fitur ini nulis error ffmpeg-nya ke stdout, bukan stderr), jadi warna berbasis stream saja
  akan melewatkan mayoritas baris yang justru paling ingin dilihat pembaca. Baris stderr tetap
  otomatis dianggap error terlepas dari kata-katanya (stream itu sendiri sinyal yang cukup
  kuat).
- **Auto-scroll pintar**: ikut baris terbaru secara default, otomatis berhenti kalau user
  scroll ke atas buat baca baris lama (tidak ke-tarik paksa ke bawah), lanjut lagi begitu balik
  scroll ke bawah — pola umum log viewer.
- **Detail teknis**: Docker API tidak menyediakan SDK resmi di sini (lihat
  [03-tech-stack.md](03-tech-stack.md) "Kenapa tidak Docker SDK resmi?"), jadi parsing stream
  log dilakukan manual — container non-TTY (mayoritas) mem-multiplex stdout/stderr lewat frame
  header 8-byte (`internal/docker/logs.go`'s `readMultiplexedLogs`); container TTY (`docker run -t`)
  mengirim byte mentah tanpa multiplex dan tanpa bisa membedakan stdout/stderr
  (`readTTYLogs`) — dideteksi otomatis lewat `Config.Tty` dari container inspect sebelum
  connect ke endpoint log-nya. Kedua jalur sudah diverifikasi langsung terhadap container
  non-TTY dan TTY nyata (bukan cuma dibaca dari kode), tidak ada frame header/binary yang
  bocor jadi teks.

### Images

- Daftar image terpasang: repository:tag, image ID (pendek), ukuran, created date, jumlah
  container yang memakainya (running + stopped), status **dangling** (image tanpa tag, biasa
  sisa build lama) ditandai jelas karena ini kandidat pertama untuk dibersihkan.
- "Konsumsi resource" untuk image = **ukuran disk**, langsung dari field `Size` di
  `GET /images/json` — cukup akurat & murah untuk tabel per-item; agregat total/reclaimable
  yang memperhitungkan shared layer antar image dihitung Docker sendiri di level `/system/df`
  (dipakai di panel Settings, bukan di tabel Images per-item).
- Aksi: **remove image** (ditolak dengan pesan jelas kalau masih dipakai container yang belum
  dihapus — bukan force-remove diam-diam).
- Sort/filter: by ukuran (cari yang paling boros), by "tidak dipakai container manapun".

### Volumes

- Daftar volume: nama, driver, mount point, dibuat kapan, dipakai oleh container mana saja.
- "Konsumsi resource" untuk volume = **ukuran data di dalamnya**. **Catatan implementasi
  Fase 2**: endpoint list dasar `GET /volumes` (dipakai untuk tabel) **tidak** menyertakan
  info ukuran sama sekali (dikonfirmasi terhadap Docker 29.x — field `UsageData` kosong)
  — mengambil ukuran akurat per-volume butuh `GET /system/df` yang jauh lebih berat
  (~2 detik di mesin dev), jadi Fase 2 menampilkan "tidak diketahui" untuk ukuran volume di
  tabel (persis seperti perilaku default `docker volume ls`). Fallback `du` di sisi server
  disebutkan di draf awal tapi **tidak dibangun** — ukuran volume akurat per-item dicadangkan
  untuk iterasi berikutnya kalau memang dibutuhkan.
- Tandai volume **tidak terpakai** (tidak di-mount container manapun saat ini) — kandidat
  pembersihan, tapi **tidak dihapus otomatis**, hanya highlight.
- Aksi: **remove volume** (ditolak kalau masih dipakai; volume yang datanya besar diberi
  extra-confirm sebelum dihapus).

### Networks

- Daftar network: nama, driver (bridge/host/overlay/none/custom), subnet, jumlah container
  terhubung.
- Network **tidak punya metrik "resource konsumsi"** yang berarti secara langsung di level
  Docker API (bukan seperti CPU/RAM/disk) — yang ditampilkan adalah **jumlah container
  terhubung** per network sebagai proxy "seberapa aktif network ini dipakai".
- Aksi: **remove network** (ditolak kalau masih ada container terhubung); network bawaan
  (`bridge`, `host`, `none`) tidak bisa dihapus dari UI (mengikuti pembatasan Docker sendiri).

### Settings (standar)

Sengaja dibatasi ke pengaturan yang aman & umum dipakai — **bukan** pengganti `docker
daemon.json`/registry management yang lebih baik diedit langsung lewat file explorer/terminal
kalau memang dibutuhkan (lihat "Non-Tujuan" di bawah):

- **Info daemon** (read-only): versi Docker & API, storage driver, root dir, OS/kernel,
  jumlah container (running/paused/stopped), jumlah image, dari `GET /info`.
- **Ringkasan disk usage** (dari `GET /system/df?verbose=1`): total ukuran images, containers
  (writable layer), volumes, build cache — dengan breakdown "reclaimable" (bisa dibersihkan).
- **Aksi cleanup** (masing-masing dengan konfirmasi tersendiri, dicatat ke audit log):
  - Hapus container yang sudah stopped.
  - Hapus image dangling / semua image tidak terpakai (dua opsi terpisah — dangling-only
    lebih aman sebagai default).
  - Hapus volume tidak terpakai.
  - Hapus network tidak terpakai.
  - Tombol "Bersihkan semua" (setara `docker system prune`) yang menjalankan keempatnya
    sekaligus — konfirmasi paling tegas karena paling luas dampaknya.

**Non-tujuan untuk Docker** (di luar scope, konsisten dengan prinsip "standar saja"):
mengedit `daemon.json` (log driver, insecure registries, dst), kelola registry/credential
login, `docker-compose`/stack deployment, pull/build image baru dari UI, buat network dengan
driver/opsi custom. Semua itu tetap bisa dilakukan manual lewat **file explorer** (edit
`daemon.json`) atau **web terminal** (§4.5 di bawah) — bukan lewat UI Docker TarOS.

### Graceful Degradation

Jika `/var/run/docker.sock` tidak ada / tidak bisa diakses, seluruh halaman Docker (semua
sub-tab) menampilkan pesan informatif ("Docker tidak terdeteksi / tidak ada akses") —
bukan error 500.

## 4.3 Monitoring Service (systemd)

- Daftar unit `.service` (default filter), dengan opsi tampilkan `.socket`/`.timer` juga
  (toggle `showAll`, gabungan `systemctl list-units --type=service,socket,timer`).
- Per unit: nama, description, **active state** (active/inactive/failed/activating), **sub
  state**, enabled/disabled (digabung dari `systemctl list-unit-files` berdasarkan nama unit).
- Search/filter by nama & description, plus quick-filter "hanya yang failed" — keduanya
  filter di sisi server terhadap hasil `list-units`, bukan query systemd terpisah.
- **Kolom tabel bisa diurutkan** (klik header) — Status diurutkan berdasarkan tingkat "aktif"
  (active → activating → reloading → deactivating → inactive → failed), bukan alfabetis pada
  string active state mentah, supaya unit yang sedang jalan gampang dikelompokkan.
- Aksi: **start / stop / restart / reload**, dengan konfirmasi lebih tegas (teks peringatan
  eksplisit) untuk unit "terproteksi" yang bisa dikonfigurasi lewat `systemd.protectedUnits`
  di `config.yaml` (default: `ssh.service`, `docker.service`, `taros.service` — dicek
  langsung terhadap nama unit sebenarnya di sistem Debian/Raspberry Pi OS, bukan `sshd.service`
  seperti asumsi awal sebelum divalidasi).
- Tampilkan 50 baris terakhir log unit (via `journalctl -u <unit> -n 50 --no-pager`,
  dieksekusi on-demand saat tombol "Log" diklik — bukan terus-menerus), ditampilkan di satu
  panel log bersama di bagian bawah halaman (bukan per-baris expand-in-place, demi kesederhanaan).

### Catatan Implementasi & Privilege

- **List/monitoring read-only tidak butuh privilege khusus** — `systemctl list-units`/
  `list-unit-files` dan `journalctl -u` (untuk user yang jadi anggota grup `adm`/`systemd-journal`)
  jalan tanpa root maupun sudo, terukur cepat (~15ms untuk list-units, ~500ms untuk gabungan
  list-units+list-unit-files terhadap 170+ unit) — **tidak perlu** pola cache/`Watcher`
  seperti Docker container stats (lihat [05-data-storage.md](05-data-storage.md)).
- **Aksi (start/stop/restart/reload) butuh privilege elevated** — dikonfirmasi langsung:
  tanpa setup tambahan, `systemctl restart <unit>` yang dijalankan oleh user service
  `taros` (non-root) gagal dengan "Interactive authentication required." Implementasi
  memanggil `sudo -n systemctl <aksi> <unit>` (`-n`/non-interaktif supaya gagal cepat &
  jelas, bukan menggantung menunggu password yang tidak akan pernah datang) — ini **memakai
  privilege opt-in yang sama** yang sudah didokumentasikan untuk web terminal
  ([07-security.md](07-security.md) §7.6), atau bisa pakai sudoers rule yang lebih sempit
  (khusus `systemctl`, bukan shell penuh) — lihat [09-deployment.md](09-deployment.md) §9.2.
  Tanpa salah satu dari itu, list/monitoring tetap berfungsi penuh, hanya tombol aksi yang
  akan menampilkan pesan error jelas ("Interactive authentication required") alih-alih diam-diam
  gagal.
- **Memory usage per unit (via cgroup) — belum diimplementasikan.** `MemoryAccounting` tidak
  aktif secara default untuk kebanyakan unit di sistem yang diuji (`systemctl show <unit> -p
  MemoryCurrent` mengembalikan `[not set]`), jadi kolom ini bernilai rendah untuk banyak
  instalasi kecuali user mengaktifkan `DefaultMemoryAccounting=yes` sendiri — dicadangkan
  untuk iterasi berikutnya kalau memang dibutuhkan, bukan prioritas Fase 2b.

## 4.4 File Explorer

### Navigasi & Operasi Dasar

- Browse direktori dengan breadcrumb, list file/folder (nama, ukuran, permission, owner,
  modified time, ikon berdasarkan tipe).
- **Root/jail direktori**: dikonfigurasi di `config.yaml` (default: seluruh filesystem `/`
  untuk admin, tapi bisa dibatasi ke direktori tertentu, misal `/home`, `/mnt/data`, `/opt`
  jika ingin lebih aman — lihat [07-security.md](07-security.md) soal path traversal).
- Create file baru / folder baru.
- Rename.
- Delete (soft-confirm dengan dialog, tidak ada "trash/undo" di versi awal — user harus
  yakin sebelum konfirmasi).
- **Copy** dan **Cut → Paste**: pilih satu/banyak item, "salin"/"potong" disimpan di
  clipboard sisi server (state per-session), lalu "paste" di direktori tujuan.
- Multi-select (checkbox) untuk operasi massal (copy/cut/delete banyak file sekaligus).
- Upload file dari browser (drag & drop + tombol pilih file). Drag & drop mendukung **folder**
  juga, bukan cuma file lepas — folder ditelusuri rekursif di sisi klien lewat File and
  Directory Entries API (`webkitGetAsEntry`/`createReader().readEntries()`), lalu setiap file
  dikirim dengan path relatif terhadap folder yang di-drop (field `relPath` terpisah dari
  `filename` — RFC 7578 §4.2 mewajibkan parser multipart membuang info direktori dari
  parameter `filename`, dan `mime/multipart` Go menegakkannya sendiri via `filepath.Base()`,
  jadi menumpangkan path di situ tidak akan pernah sampai ke server). Server merekonstruksi
  struktur foldernya (`os.MkdirAll` sebelum menulis tiap file), tetap lewat `Jail.Resolve` yang
  sama untuk proteksi path traversal.
- Download file/folder (folder di-zip on-the-fly saat request).
- Search/filter by nama dalam direktori aktif.
- **Kolom tabel bisa diurutkan** (klik header: Nama, Ukuran, Pemilik, Diubah) — sortir murni
  client-side di atas listing yang sudah dimuat, folder & file jadi terurut campur alfabetis
  saat sort by Nama diaktifkan (beda dari urutan default "folder dulu" yang dikirim server).
- **Tampilkan/sembunyikan file tersembunyi** (nama diawali titik, pola umum untuk
  dotfile/dotdir konfigurasi) — tombol toggle di toolbar, default **disembunyikan** (sesuai
  konvensi file manager pada umumnya). Murni preferensi tampilan di klien (`localStorage`,
  tidak per-akun/tidak sinkron antar device) — backend selalu mengembalikan listing lengkap
  apa adanya (`internal/fileexplorer`), jadi ini bukan kontrol akses, cuma filter tampilan.
- **Panel tree folder di sebelah kiri** (`components/files/FileTree.vue`+`FileTreeNode.vue`),
  mirip file manager desktop pada umumnya — lazy-load (anak folder baru diambil saat node
  di-expand, bukan seluruh tree sekaligus; penting karena `rootDir` bisa `/` yang isinya
  besar), sinkron dengan folder aktif (auto-expand + highlight node yang sedang dibuka,
  termasuk saat buka link langsung/refresh ke folder dalam — bukan cuma navigasi lewat
  klik). Bisa disembunyikan (tombol collapse di toolbar) — default **tersembunyi** di layar
  sempit (< 860px) supaya tidak mendorong daftar file ke bawah di HP, default **terbuka** di
  desktop; sekali diubah manual, preferensi itu yang dipakai terlepas dari lebar layar.
  Tidak ada endpoint backend baru — tree memakai ulang `GET /api/files/list` yang sama,
  difilter ke folder saja di sisi klien. Toolbar (breadcrumb + tombol aksi) ada di atas,
  membentang penuh, dengan panel tree dan panel daftar file sama-sama dimulai tepat di
  bawahnya — supaya keduanya rata sejajar, bukan tree dimulai lebih tinggi dari isi tabel.
- **Mode tampilan List / Grid**, toggle di toolbar (preferensi `localStorage`, sama pola
  dengan toggle file tersembunyi). Grid menampilkan tiap item sebagai kartu: **thumbnail
  gambar asli** untuk file gambar (lazy-load lewat endpoint download yang sama, fallback
  otomatis ke ikon kalau gagal dimuat), ikon per tipe file untuk yang lain (video, audio,
  arsip, kode, dokumen, folder), nama di bawahnya. Checkbox seleksi dan aksi (unduh/ganti
  nama/hapus) muncul saat hover/dipilih — operasi massal (salin/potong/hapus banyak
  sekaligus) tetap sama seperti mode List, berbagi state seleksi yang sama.
- **Pratinjau file** (`components/files/FilePreviewOverlay.vue`) — klik file gambar, PDF,
  atau video membuka overlay pratinjau penuh layar di tempat (bukan pindah ke editor
  kode/binary-alert seperti file lain), dengan tombol unduh dan tutup, serta navigasi
  keyboard (`Esc` tutup). File audio **tidak** lewat overlay ini — lihat "Music Mini-Player"
  di bawah.
  - **Gambar**: ditampilkan langsung, dengan navigasi sebelumnya/berikutnya (panah di layar
    + tombol panah kiri/kanan keyboard) di antara gambar lain dalam folder yang sama — mode
    galeri, bukan harus tutup-buka satu-satu.
  - **PDF**: dirender inline via `<iframe>` memakai viewer bawaan browser — endpoint
    download mendukung parameter `?inline=1` yang mengganti header `Content-Disposition`
    dari `attachment` ke `inline` khusus untuk kebutuhan ini (`<img>`/`<video>`/`<audio>`
    tidak terpengaruh header ini, cuma `<iframe>` yang butuh), dengan link "Buka di tab
    baru" sebagai fallback kalau browser tidak punya viewer PDF bawaan.
  - **Video**: pakai [Plyr](https://plyr.io) (dipilih atas native `<video>` supaya tampilan
    kontrol konsisten lintas browser dan bisa ditema persis warna aksen TarOS lewat CSS
    variable Plyr, bukan skin bawaan tiap browser), dibungkus dalam overlay bergaya
    "theater" gelap. Seek/scrub jalan langsung tanpa kerja tambahan di backend —
    `handleFilesDownload` sudah pakai `http.ServeFile` yang otomatis mendukung HTTP Range
    request.
  - **Video: pemutaran berkelanjutan (playlist per folder)** — sama seperti mode galeri
    gambar, tapi untuk video: membuka satu video otomatis menjadikan video lain di folder
    yang sama sebagai daftar putar (indikator posisi "X / Y" di bilah atas, navigasi
    panah/keyboard yang sama). Saat satu video selesai, otomatis lanjut ke video berikutnya
    dan lanjut memutar tanpa perlu klik play lagi — video **pertama** yang dibuka dari
    daftar file tetap butuh klik play manual seperti biasa (tidak pernah autoplay tanpa
    interaksi), tapi video-video berikutnya dalam sesi pratinjau yang sama (baik lewat
    auto-advance maupun navigasi manual sebelumnya/berikutnya) melanjutkan otomatis — ini
    kelanjutan pemutaran yang sudah dimulai user, bukan autoplay yang tidak diminta. Berhenti
    di video terakhir folder (tidak berputar kembali ke awal). Instance Plyr dipakai ulang
    lintas video (bukan dibuat ulang tiap ganti track) dengan source diganti langsung di
    elemen `<video>` native — pendekatan yang lebih rumit (destroy+recreate Plyr, atau
    `player.source` API bawaan Plyr) sempat dicoba dan sama-sama gagal menjaga pemutaran
    tetap jalan mulus saat berpindah track, baca komentar di source
    `FilePreviewOverlay.vue` untuk detail kenapa.
- **Music Mini-Player** (`components/MiniPlayer.vue` + `stores/player.ts`) — klik file mp3
  (atau format audio lain, lihat daftar ekstensi di `components/files/filetypes.ts`) **tidak**
  membuka overlay pratinjau, tapi langsung memutar lewat bar pemutar kecil yang menempel di
  bagian bawah aplikasi. Bedanya dari pratinjau video/gambar: bar ini **tetap ada dan tetap
  memutar walau pindah halaman** (buka Dashboard, Docker, dll — musik tidak berhenti),
  cocok untuk didengarkan sambil kerja, bukan cuma pratinjau sesaat.
  - **Playlist otomatis per folder**: sama seperti video, membuka satu file audio menjadikan
    file audio lain di folder yang sama sebagai antrean — indikator posisi "X / Y", navigasi
    sebelumnya/berikutnya, auto-advance + lanjut memutar otomatis saat satu lagu selesai,
    berhenti di lagu terakhir folder (tidak berputar balik).
  - **Bar pemutar persisten lintas halaman lewat arsitektur khusus**: `AppShell.vue`
    di-*instansiasi ulang* setiap kali pindah halaman (tiap view membungkus dirinya sendiri
    dengan `<AppShell>` — lihat catatan di `stores/terminal.ts`), jadi elemen `<audio>` tidak
    bisa ditaruh di situ atau ikut ter-reset tiap navigasi. `MiniPlayer.vue` malah dipasang
    di `App.vue`, sejajar `<router-view>` — satu-satunya titik yang benar-benar tidak pernah
    unmount selama aplikasi berjalan. State antrean/lagu aktif disimpan di Pinia store
    (`stores/player.ts`), yang juga hidup di level root sehingga survive navigasi. Sesi
    berakhir (logout) otomatis menghentikan musik (`auth.ts`'s `clear()` action).
  - **Kontrol dibuat manual, bukan Plyr**: berbeda dari pratinjau video/audio, bar ini pakai
    elemen `<audio>` native murni dengan progress bar + volume buatan sendiri, bukan Plyr.
    Plyr sempat dipakai di sini juga, tapi menyebabkan bug nyata: tombol play/pause kustom
    di bar ini perlu sinkron dua arah dengan elemen (klik tombol → panggil play()/pause();
    event native play/pause dari elemen → update ikon tombol) — kombinasi itu dengan
    penanganan event internal Plyr saling memicu berulang, ratusan kali per detik (dibuktikan
    lewat instrumentasi langsung ke elemen: >2000 event play/pause dalam 8 detik tanpa ada
    yang secara sah memanggil sesering itu). Perbaikannya bukan sekadar melepas Plyr (itu
    saja belum cukup — bug yang sama masih terjadi tanpa Plyr, sampai alurnya benar-benar
    dibuat satu arah: elemen `<audio>` jadi satu-satunya sumber kebenaran, tombol UI
    langsung memanggil `el.play()`/`el.pause()`, dan `store.playing` cuma cerminan pasif
    untuk menentukan ikon mana yang ditampilkan — tidak ada lagi yang "menulis balik" ke
    elemen berdasarkan event yang berasal dari elemen itu sendiri. Detail lengkap ada di
    komentar source `MiniPlayer.vue`.

### Catatan Implementasi Fase 3a (inti) vs 3b (streaming/job)

Fitur di atas dipecah jadi dua PR terpisah, sama seperti Docker/Service di Fase 2:

- **Fase 3a (selesai)**: browse + breadcrumb, `Jail` (validasi path lengkap — traversal,
  symlink escape, blocklist, dicek juga terhadap **isi listing**, bukan cuma saat aksi
  diklik), create file/folder, rename, delete (rekursif untuk folder, via `os.RemoveAll`),
  download **file tunggal** (streaming langsung lewat `http.ServeFile`, bukan buffer penuh).
- **Fase 3b (selesai)**: copy/cut/paste + multi-select (clipboard per-session di
  `auth.Session`, lihat [08-project-structure.md](08-project-structure.md)), job queue
  streaming untuk copy/move, upload (multipart streaming), download **folder** (zip
  on-the-fly via `archive/zip`, tidak pernah membangun arsip penuh di disk/memori dulu),
  search/filter dalam direktori.
- **Paste selalu mengembalikan `jobId`**, bahkan kalau semua item ternyata instant-rename
  (sama filesystem) — satu jalur kode di klien (poll/watch job) untuk semua kasus, bukan dua
  bentuk respons berbeda tergantung seberapa cepat operasinya kebetulan selesai.

### Keandalan Operasi File Besar/Banyak

**Latar belakang**: CasaOS di pengalaman sebelumnya beberapa kali membuat Raspberry Pi 5
(16GB RAM — bukan device kecil) **hang total** saat copy file besar/banyak, sampai perlu
cabut-colok power manual (lihat [01-overview.md](01-overview.md)). Gejala ini khas dari
*dirty page write-back* yang menumpuk lebih cepat daripada kecepatan tulis storage (makin
parah di eMMC/microSD yang lambat, persis media storage STB/RPi) — biasanya dipicu aplikasi
yang mem-buffer seluruh isi file di memori dan/atau menulis tanpa throttle/backpressure,
sampai titik di mana kernel sendiri tersendat memenuhi permintaan memori & sistem jadi
tidak responsif. Ini bukan sekadar soal "hemat RAM saat idle" — ini soal **operasi file
tidak boleh bisa menjatuhkan seluruh sistem**, jadi diberi perhatian khusus sebagai bagian
inti desain, bukan detail implementasi kecil.

Aturan wajib untuk `fileexplorer/`:

- **Tidak pernah buffer seluruh file di memori.** Semua copy/upload/download/zip pakai
  `io.CopyBuffer` dengan buffer kecil berukuran tetap (default 256KB–1MB, dikonfigurasi) —
  konsumsi memori operasi file **tidak boleh berbanding lurus dengan ukuran file**, baik file
  1MB maupun 10GB harus pakai memori kerja yang kira-kira sama.
- **Move dalam filesystem yang sama = `os.Rename`, bukan copy+delete.** Dicek dulu apakah
  source & destination berada di device/filesystem yang sama (`stat` lalu bandingkan device
  ID) — kalau sama, rename atomik instan tanpa I/O data sama sekali (ini juga yang bikin
  "cut-paste" terasa instan untuk kasus umum, bukan cuma soal safety). Copy+delete stream
  hanya dipakai kalau memang lintas filesystem (misal dari eMMC internal ke USB eksternal).
- **Throttle throughput tulis** (`fileExplorer.copyThrottleMBps`, opsional, default cukup
  konservatif) — terutama relevan untuk STB dengan storage lambat, mencegah aplikasi sendiri
  yang jadi sumber tekanan dirty-page berlebihan.
- **Sync berkala selama copy besar** — panggil `File.Sync()` tiap beberapa MB tertulis (bukan
  ditumpuk semua di akhir), supaya writeback terjadi bertahap & terkendali, bukan menumpuk
  dalam jumlah besar sekaligus di page cache.
- **Batasi operasi paralel** (`fileExplorer.maxConcurrentOps`, default kecil, misal 1–2) —
  copy/move banyak file dari multi-select **diantrekan** (job queue sekuensial atau dengan
  paralelisme terbatas), bukan langsung menembak semua operasi bersamaan.
- **Berjalan sebagai background job dengan progress**, bukan memblokir request HTTP: `POST
  /api/files/op` untuk operasi besar langsung mengembalikan job ID, klien memantau progres
  (persentase, kecepatan, ETA) via SSE (`GET /api/files/op/{jobId}/stream`) atau polling —
  dengan tombol **Cancel** yang benar-benar menghentikan operasi (bukan cuma menyembunyikan
  UI-nya). Ini juga membuat UX lebih jelas dibanding UI yang terasa "diam" lalu tahu-tahu
  gagal/hang tanpa penjelasan.
- **Cek ruang disk tersedia sebelum mulai** — tolak dengan pesan jelas di awal kalau kapasitas
  tujuan diperkirakan tidak cukup, daripada gagal di tengah jalan meninggalkan file setengah
  tersalin.
- **Checkpoint uji nyata (selesai-dev, di RPi 5 — validasi STB fisik masih tertunda)**: diuji
  dengan skenario yang persis memicu masalah di CasaOS — copy file tunggal 1.5GB **dengan
  throttle 20MB/s** (mensimulasikan storage lambat ala STB, lihat
  [01-overview.md](01-overview.md) "Lingkungan Development" soal kenapa disimulasikan) di
  storage disk nyata (bukan tmpfs), **dan** copy 2000 file kecil sekaligus. Selama copy
  1.5GB berjalan (~75 detik), latency endpoint lain di proses yang sama diukur konsisten
  di bawah 3ms — tidak ada penurunan responsivitas sama sekali. Checksum MD5 sumber vs hasil
  cocok persis, tidak ada file `.tkpart` tersisa setelah selesai maupun setelah dibatalkan
  di tengah jalan (diuji cancel pada 300ms setelah mulai, ~100MB sudah tertulis, berhenti
  bersih tanpa sisa). Validasi STB fisik tetap jadi kriteria "selesai-rilis" yang belum
  tercapai (lihat [10-roadmap.md](10-roadmap.md) "Definisi Selesai").

### Text Editor Terintegrasi

Ini fitur yang diperkirakan paling sering dipakai sehari-hari (edit config, cek log, tulis
catatan) — jadi diprioritaskan supaya terasa **rapi & nyaman**, bukan sekadar `<textarea>`
polos. Berbasis **CodeMirror 6** (lihat rasional pemilihan di [03-tech-stack.md](03-tech-stack.md)).

**Deteksi file**

- Ekstensi dikenal (`.txt .md .conf .cfg .ini .yaml .yml .json .toml .env .log .service .sh
  .service` dll) **dan** content-sniffing (cek byte null / rasio karakter non-printable tinggi
  → dianggap biner, editor menolak buka, tawarkan download saja).
- Bahasa syntax highlighting dipilih otomatis dari ekstensi, dengan opsi ganti manual dari
  dropdown di toolbar editor (kalau deteksi otomatis meleset, misal file config tanpa ekstensi).

**Tampilan & kenyamanan**

- Dua tema siap pakai yang mengikuti dark/light mode dashboard (bukan cuma warna default
  CodeMirror) — dark theme terinspirasi tema populer yang kontras & enak dibaca lama
  (ala One Dark/Dracula), light theme yang lembut di mata.
- Font monospace sistem (`ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace`)
  — tetap tanpa web-font eksternal (konsisten dengan prinsip di [06-api-ui-ux.md](06-api-ui-ux.md)),
  tapi stack font ini sudah cukup rapi di kebanyakan OS modern.
- Ukuran font & line-height bisa disesuaikan user (tersimpan di `localStorage`, per-perangkat).
- Line numbers, current-line highlight, indent guide (garis tipis penanda level indentasi —
  krusial untuk YAML yang sensitif terhadap indentasi), highlight whitespace/trailing-space
  yang tidak terlihat (sumber bug klasik di file YAML/config).
- Breadcrumb path file di atas editor + status bar bawah (posisi baris:kolom, jumlah baris,
  encoding, indikator "unsaved changes").

**Fitur editing**

- Syntax highlighting per tipe file, code folding (lipat blok/section), auto-closing
  bracket/quote, auto-indent yang mengikuti konteks (termasuk mempertahankan gaya indentasi
  yang sudah ada di file — 2 spasi vs 4 spasi vs tab — dideteksi otomatis saat file dibuka).
- Find & replace dalam file (dengan opsi regex, match-case, whole-word).
- Multi-cursor / multi-select edit (`Alt+Click` tambah cursor, `Ctrl/Cmd+D` select next match)
  — berguna untuk edit berulang di file config.
- **Validasi ringan untuk YAML & JSON**: parse di sisi klien saat mengetik (debounced), tandai
  baris yang error (mis. indentasi YAML tidak valid, JSON kurang koma/kurung) dengan marker
  merah di gutter + tooltip pesan error — mencegah save file config yang rusak tanpa disadari.
- Tombol **"Format"** untuk JSON (pretty-print rapi) dan YAML (normalisasi indentasi) — opsional,
  tidak otomatis dijalankan supaya tidak mengubah file di luar keinginan user.
- Word wrap toggle (default **on** untuk `.md`/`.txt`/`.log`, default **off** untuk file
  config/kode supaya struktur indentasi tetap jelas).
- Preview mode untuk Markdown (toggle "Edit / Preview", render `html/template`-safe di server
  atau lib markdown ringan di klien).

**Keandalan saat menyimpan**

- Indikator "unsaved changes" jelas (titik di tab/breadcrumb + warna berbeda), save via
  `Ctrl/Cmd+S` atau tombol, dengan **konfirmasi sebelum meninggalkan halaman** kalau ada
  perubahan belum disimpan (`beforeunload` guard).
- **Auto-save draft ke `localStorage` browser** (bukan ke server) setiap beberapa detik selama
  ada perubahan — kalau tab/browser crash sebelum sempat save manual, draft bisa dipulihkan
  saat file yang sama dibuka lagi. Draft dihapus otomatis setelah save ke server berhasil.
- **Deteksi konflik**: jika file berubah di disk (misal diedit dari terminal/proses lain) sejak
  terakhir dibuka di editor, tampilkan peringatan sebelum overwrite (bandingkan mtime/hash saat
  save) — user bisa pilih timpa atau muat ulang.
- Batas ukuran file yang bisa dibuka di editor (default: 2MB) — file lebih besar dari itu
  hanya bisa didownload, bukan diedit inline (menjaga memory & responsivitas browser+server).
- Saat save: tulis ke file **sementara** lalu `rename` atomik ke path asli (menghindari file
  korup jika proses terputus di tengah penulisan), pertahankan permission & owner file asli.
- Panel bantuan keyboard shortcut (`?` atau tombol kecil di toolbar) — daftar shortcut yang
  tersedia, supaya fitur seperti multi-cursor tidak "tersembunyi" dari user.

### Catatan Implementasi Fase 3c

Diverifikasi lewat headless browser (Puppeteer + Chromium, bukan cuma unit test Go) terhadap
server sungguhan — mount editor, load isi file, syntax highlighting (dicek warna sungguhan
tiap token, bukan cuma keberadaan class CSS — lihat catatan bug di bawah), indikator
unsaved-changes, save via Ctrl+S, lint marker YAML/JSON, toggle word wrap + persist
`localStorage`, auto-save draft + prompt pulihkan draft, `beforeunload` guard, dan (lewat API
langsung) deteksi konflik, penolakan file biner, penolakan file >2MB, serta save atomik yang
mempertahankan permission file asli.

**Bug nyata ditemukan & diperbaiki lewat testing browser** (tidak akan ketahuan dari sekadar
membaca kode): pemanggilan `jsonParseLinter()` dari `@codemirror/lang-json` butuh dibungkus
`linter(jsonParseLinter())` — dipakai langsung tanpa bungkus itu membuat CodeMirror melempar
"Unrecognized extension value" dan **seluruh editor gagal mount**, bukan cuma linting JSON
yang tidak berfungsi. Ini murni akan lolos dari code review manual karena error-nya cuma
muncul di runtime browser, bukan saat `go build`/`esbuild` — alasan kenapa langkah testing
headless-browser ditambahkan ke checklist fase ini, bukan cuma andalan testing backend API.

**Diimplementasikan sesuai deskripsi di atas**: deteksi file (ekstensi + content-sniffing byte
null), dua tema dark/light mengikuti dashboard (termasuk font monospace sistem yang sama,
`ui-monospace, "Cascadia Code", "SF Mono", Menlo, Consolas, monospace`), line numbers,
current-line highlight, highlight whitespace/trailing-space, syntax highlighting (YAML, JSON,
Markdown, shell, format `key=value` untuk conf/ini/toml/env via `@codemirror/legacy-modes`),
code folding, auto-closing bracket, find & replace, validasi ringan YAML/JSON dengan marker di
gutter, word wrap toggle + persist, unsaved-indicator, `beforeunload` guard, auto-save draft +
restore prompt, deteksi konflik (409 dari server, tidak menimpa data), batas ukuran 2MB, dan
save atomik (temp file + rename) yang mempertahankan permission.

**Dengan sengaja belum diimplementasikan** di iterasi ini, dicadangkan untuk polish UI
([10-roadmap.md](10-roadmap.md) Fase 5) — semuanya nice-to-have yang tidak mengorbankan
keandalan inti (baca/edit/simpan tetap aman tanpa fitur-fitur ini):

- Dropdown ganti bahasa syntax highlighting manual (saat ini murni otomatis dari ekstensi).
- Ukuran font/line-height yang bisa disesuaikan user (saat ini fixed 14px).
- Indent guide visual (garis penanda level indentasi) — butuh paket tambahan
  (`@replit/codemirror-indentation-markers` atau setara) yang belum dimasukkan.
- Breadcrumb path + status bar posisi baris:kolom di dalam halaman editor (saat ini cuma nama
  file di toolbar).
- Auto-deteksi gaya indentasi file yang sudah ada (2 spasi/4 spasi/tab) — saat ini selalu
  memaksa 2 spasi untuk file baru/indentasi baru.
- Tombol "Format" (JSON pretty-print, normalisasi YAML).
- Preview mode Markdown.
- Panel bantuan keyboard shortcut.
- Owner file dipertahankan **best-effort** saat save (`chown`) — proses non-root secara
  inheren tidak selalu bisa mengubah kepemilikan file ke user lain, jadi ini bisa diam-diam
  gagal (tidak dianggap error) untuk file yang dimiliki user selain `taros` — konsekuensi
  langsung dari prinsip least-privilege di [07-security.md](07-security.md), bukan bug yang
  bisa "diperbaiki" tanpa menaikkan privilege proses.

### Shortcut Folder

Folder mana pun bisa ditandai jadi "shortcut" — akses cepat tanpa perlu navigasi ulang lewat
tree — lewat ikon bookmark di kolom Aksi (list view) atau tombol aksi di tile (grid view),
muncul cuma untuk baris folder. Tiap shortcut punya dua toggle independen, **dipilih user saat
membuatnya**: tampil di sidebar File Explorer, tampil di halaman utama Dashboard, atau
keduanya sekaligus — minimal satu wajib dipilih.

- **Backend**: `internal/foldershortcuts`, pola persis `internal/quicklinks` (Fase 5, Akses
  Cepat Custom) — `Store` mutex-guarded, persist ke `folder-shortcuts.yaml` sendiri (path
  configurable lewat `folderShortcuts.settingsFile` di `config.yaml`), live-mutable tanpa
  restart. Bedanya dari quicklinks: package ini tidak tahu apa-apa soal
  `fileexplorer.Jail` — validasi jail-boundary + "ini beneran direktori yang ada" dilakukan
  di `internal/web/handlers_foldershortcuts.go` (pakai `Jail.Resolve` yang sama dipakai semua
  handler `handlers_files.go`), bukan di package `foldershortcuts` sendiri.
- **Toggle pin/unpin simetris**: klik ikon bookmark pada folder yang belum di-pin membuka
  modal (nama default = nama folder, dua checkbox lokasi tampil); klik lagi pada folder yang
  sudah di-pin langsung unpin, tanpa modal/konfirmasi — sama seperti pola bintang favorit di
  aplikasi lain, berisiko rendah karena re-pin cuma satu klik lagi.
- **Sidebar** (di atas tree navigasi folder, `FilesView.vue`): daftar shortcut yang
  `showInSidebar=true`, klik navigasi langsung, ada aksi edit (ganti nama/lokasi tampil,
  path sendiri tidak bisa diubah dari sini — cuma cara mengubah path adalah unpin lalu pin
  ulang dari folder yang benar) dan hapus. Section tidak dirender sama sekali kalau belum ada
  shortcut apa pun — sidebar tetap bersih untuk instalasi baru.
- **Dashboard** (`DashboardView.vue`): section terpisah di bawah "Akses Cepat (Custom)"
  (semantiknya beda — navigasi internal, bukan link eksternal), berisi shortcut
  `showOnDashboard=true`, tiap tile `RouterLink` ke `/files?path=...` (routing query yang
  sudah didukung penuh sejak awal Fase 3). Tidak ada tombol "Add" di Dashboard — pembuatan
  shortcut cuma lewat halaman Files, Dashboard murni titik akses cepat + bisa unpin cepat.
- **Validasi**: path harus resolve di dalam jail root & benar-benar direktori (403/400
  `folder_shortcut_path_invalid`), tidak boleh duplikat (`folder_shortcut_duplicate_path`),
  minimal satu lokasi tampil dipilih (`folder_shortcut_no_destination`), cap 40 shortcut
  (sanity limit, sama semangat `quicklinks.maxLinks`).

## 4.5 Web Terminal

- Halaman `/terminal` menampilkan emulator terminal penuh-layar (xterm.js) yang terhubung
  ke shell sungguhan di perangkat via WebSocket + PTY.
- **Privilege**: shell berjalan sebagai user service `taros` (non-root) — **sama persis**
  dengan privilege proses TarOS sendiri, tidak ada mekanisme elevasi privilege dari dalam
  aplikasi itu sendiri (TarOS tidak pernah memanggil `sudo`/`su` untuk user). **Sudo tetap
  bisa dipakai** di dalam sesi terminal ini — persis seperti terminal biasa — selama user
  `taros` memang diberi akses sudo di level OS (opsional, disiapkan saat instalasi, lihat
  [09-deployment.md](09-deployment.md) §9.2). Detail & implikasi keamanan kedua mode sudo ada
  di [07-security.md](07-security.md) §7.6.

**Dua mode sudo yang bisa dipilih saat instalasi** (tidak aktif otomatis — harus disiapkan
sadar oleh user, lihat [09-deployment.md](09-deployment.md)):

| Mode | Perilaku | Kapan cocok |
|---|---|---|
| **Sudo dengan password** (direkomendasikan kalau sudo diaktifkan) | User `taros` diberi **password sistem sendiri** (terpisah dari password login dashboard); menjalankan `sudo <perintah>` di terminal akan minta password itu, persis seperti terminal biasa — termasuk sudo timestamp caching standar (~15 menit tidak perlu re-entry) | Kasus umum — tetap ada "gesekan" sengaja sebelum eksekusi command root, mengurangi risiko kalau sesi dashboard ditinggal terbuka |
| **Sudo tanpa password (NOPASSWD)** | `sudo <perintah>` langsung jalan tanpa prompt apa pun | Hanya untuk yang benar-benar paham konsekuensinya: kompromi login dashboard = akses root instan tanpa hambatan tambahan |

Kedua mode dikonfigurasi lewat `/etc/sudoers.d/taros` (dibuat manual/lewat installer,
bukan oleh proses TarOS saat runtime) — lihat [09-deployment.md](09-deployment.md) §9.2
untuk langkah setup & [07-security.md](07-security.md) §7.6 untuk pembahasan risikonya.
- Shell ditentukan **eksplisit** dari `terminal.shell` di `config.yaml` (default `/bin/bash`) —
  **tidak** bergantung pada shell akun `taros` di `/etc/passwd`. Ini penting: akun sistem
  `taros` dibuat dengan shell `nologin` demi keamanan ([09-deployment.md](09-deployment.md)
  §9.2), jadi kalau konfigurasi ini justru fallback ke shell akun, sesi terminal akan langsung
  ter-exit begitu dibuka (nologin cuma cetak pesan lalu keluar) — dengan `terminal.shell`
  eksplisit, masalah ini tidak muncul sama sekali.
- Fitur emulator: resize otomatis mengikuti ukuran panel browser (dikirim ke PTY via
  `ioctl TIOCSWINSZ` saat window di-resize), copy-paste, scrollback buffer (dibatasi, misal
  1000 baris, supaya tidak jadi memory leak di sesi yang dibiarkan lama terbuka), tema warna
  mengikuti dark/light mode dashboard.
- **Satu sesi terminal aktif pada satu waktu** (default) — mencegah beberapa shell interaktif
  membebani STB bersamaan; dikonfigurasi via `terminal.maxConcurrentSessions` jika user mau
  menaikkan batas ini secara sadar.
- **Idle timeout** (default 15 menit tanpa input) menutup sesi otomatis — konsisten dengan
  pola idle-timeout session login, mengurangi risiko sesi tertinggal terbuka.
- Menutup tab browser / koneksi WebSocket terputus → proses shell & PTY terkait di-`kill`
  otomatis di sisi server (tidak ada proses zombie menumpuk).
- Setiap sesi terminal (mulai & selesai, bukan isi keystroke) dicatat di audit log — lihat
  [07-security.md](07-security.md) §7.6 soal kenapa isi sesi **tidak** direkam penuh.
- **Toggle disable**: fitur ini bisa dimatikan total lewat `config.yaml`
  (`terminal.enabled: false`) untuk instalasi yang tidak ingin expose shell sama sekali
  (misal STB yang di-expose lebih luas dari LAN rumah).

## 4.6 Dashboard Utama & Visualisasi

- Ringkasan sekilas (summary cards) di halaman utama: CPU%, RAM%, disk terpenuh, suhu
  tertinggi, jumlah container running, jumlah service failed — semua real-time via SSE.
- Indikator status koneksi (misal badge kecil kalau SSE terputus & sedang reconnect).
- **Section "Aplikasi"** (di atas Akses Cepat): satu tile per compose project — icon, nama, titik
  status (hijau/kuning/merah/abu) dan `jalan/total`. Project bermasalah diurutkan paling depan
  dan berbingkai merah/kuning; container non-compose tidak ditampilkan di sini (tidak punya nama
  stabil untuk ditempeli icon; tetap ada di Docker > Aplikasi). Logika status **dipakai bersama**
  dengan tab Aplikasi di halaman Docker (`web/frontend/src/utils/dockerProjects.ts`) supaya kedua
  tempat selalu sepakat soal arti "sehat". Data container di-refresh tiap 10 detik dari cache
  watcher server (murah). Klik tile → `/docker?tab=apps&app=<project>` (tab Aplikasi terbuka,
  kartu project itu terbuka & di-scroll ke tengah).
  - **Icon default = huruf inisial berwarna**, warna diturunkan deterministik dari nama project
    (hash → hue), jadi konsisten antar reload tanpa menyimpan apa pun. **Custom icon** (upload
    gambar / URL, tombol pensil saat hover, "Pakai icon default" untuk membatalkan) plus **URL
    aplikasi opsional** (tombol ikon panah keluar di tile membuka aplikasinya di tab baru).
  - Disimpan di file sendiri `apps.yaml` (`dashboard.appsFile`, `internal/appmeta`), **dikunci
    dengan nama compose project**, bukan ID container — jadi icon bertahan saat container dibuat
    ulang/di-update. Live tanpa restart (pola quick-links). Validasi icon/URL **memakai fungsi yang
    sama dengan Akses Cepat** (`quicklinks.NormalizeIcon/NormalizeURL`: hanya http(s), sniff format
    gambar, batas 150KB), bukan salinan yang bisa melenceng. Instalasi lama tanpa `appsFile` di
    config otomatis menaruh `apps.yaml` di folder yang sama dengan `quickLinksFile` — upgrade
    tidak butuh edit config.
- **Kartu "Alamat Host"**: daftar IPv4 host per interface (Ethernet/Wi-Fi/ZeroTier/Tailscale),
  klik untuk salin — berguna buat tahu alamat mana yang dipakai SSH/buka dashboard dari
  perangkat lain. `GET /api/system/addresses` (`internal/netinfo`, cuma `net.Interfaces()` stdlib,
  jadi ikut jalan di build macOS). Klasifikasi jenis interface **berdasarkan nama** (`wlan*`/`wlp*`
  Wi-Fi, `eth*`/`enp*` Ethernet, `zt*` ZeroTier, `tailscale*`), diurutkan alamat "yang dituju
  orang" dulu. Bridge/veth Docker (`docker0`, `br-*`, `veth*`) **disembunyikan default** —
  di host dengan puluhan container itu 14 dari 17 alamat cuma noise — tapi bisa dimunculkan
  lewat switch "Tampilkan semua". IPv6 sengaja tidak ditampilkan (entri link-local `fe80::`
  cuma bikin ramai untuk pertanyaan "alamat mana yang kuhubungi"). Diambil sekali saat
  Dashboard dibuka (tidak polling) — nol beban tambahan. Tombol salin punya fallback
  `execCommand('copy')` karena `navigator.clipboard` **tidak ada** di konteks non-secure, dan
  TarOS biasanya dibuka lewat `http://192.168.x.x:8090` (diverifikasi langsung: `isSecureContext
  === false` di alamat LAN, salin tetap berhasil dengan klik asli).

### Pemilihan Jenis Grafik per Metric

Tidak semua metric cocok divisualisasikan dengan cara yang sama — dipilih berdasarkan apa
yang paling relevan ditanyakan user untuk tiap jenis data (nilai saat ini vs tren dari waktu
ke waktu). Detail komponen visual & implementasi ada di [06-api-ui-ux.md](06-api-ui-ux.md) §6.5.

| Metric | Jenis visual | Kenapa |
|---|---|---|
| CPU% (total), RAM%, Disk% (per mount), Suhu | **Gauge/dial radial** dengan color-zone (hijau/kuning/merah) | Pertanyaan utamanya "seberapa penuh/panas *sekarang*, dan apakah sudah masuk zona bahaya" — gauge menjawab itu sekilas tanpa perlu membaca angka |
| CPU per-core, throughput network (rx/tx), disk I/O | **Line/area chart** (ECharts di halaman termigrasi Vue; uPlot di halaman lama yang belum dimigrasi — lihat [03-tech-stack.md](03-tech-stack.md)), time-series beberapa menit terakhir | Yang relevan adalah **tren & pola** (lonjakan, spike periodik), bukan cuma nilai instan |
| RAM breakdown (used/cached/buffers/free), Disk breakdown per mount | **Bar chart horizontal / stacked** | Baik untuk membandingkan proporsi antar kategori |
| Ranking container by CPU/RAM, ranking mount by usage | **Bar chart terurut (top-N)** | Memudahkan lihat "siapa yang paling boros" sekilas |

### Akses Cepat (Custom)

Selain tile navigasi bawaan (Dashboard, Docker, Service, dst — dari router, statis), section
"Akses Cepat" di Dashboard juga bisa diisi tile buatan user sendiri: link ke layanan eksternal
apa pun, misal dashboard akun Cloudflare atau ZeroTier. Setiap tile custom punya nama, URL,
dan icon opsional (URL gambar, atau kode base64 — termasuk lewat file picker yang otomatis
meng-encode gambar lokal jadi base64 di browser, tidak pernah di-upload sebagai file terpisah
ke server).

- **Penyimpanan**: `internal/quicklinks`, file YAML sendiri (`dashboard.quickLinksFile` di
  `config.yaml`, default `/opt/taros/quick-links.yaml` di paket Linux — direktori yang sama
  yang sudah dipakai fitur self-update, jadi service user yang berjalan tanpa root sudah bisa
  menulis ke sana tanpa langkah instalasi tambahan). Sengaja **bukan** lewat mekanisme
  edit-config.yaml-lalu-restart yang dipakai toggle Terminal/ganti port (lihat §4.7 di
  bawah) — tile ini diharapkan ditambah/diedit/dihapus santai dan sering, bukan pengaturan
  langka yang pantas membenarkan restart proses tiap kali berubah.
- **Validasi & keamanan** (`internal/quicklinks`, semua di sisi server, bukan cuma
  client-side): URL tujuan tile harus `http://` atau `https://` — skema lain (`javascript:`,
  `data:`, dsb) ditolak, karena nilai ini dipakai langsung sebagai `href` tile
  (`target="_blank" rel="noopener noreferrer"`). Icon boleh URL gambar biasa, atau data base64
  (dengan atau tanpa prefix `data:...;base64,`) — kalau base64, byte hasil decode disniff
  server-side (`http.DetectContentType` + pengecekan khusus SVG, yang disniff manual karena
  SVG teks XML tidak dikenali sniffer bawaan) dan harus salah satu dari
  PNG/JPEG/GIF/WebP/SVG, maksimum 150KB per icon — bukan dipercaya begitu saja dari
  content-type yang diklaim client. Icon SVG aman dari eksekusi script tersemat karena
  **selalu** dirender lewat `<img src="...">` di frontend (bukan `v-html`) — browser
  mensandbox SVG yang dimuat lewat `<img>`, `<script>` di dalamnya tidak jalan. Maksimum 60
  tile custom (`maxLinks`) — bukan batas produk, cuma pagar sama seperti batas-batas lain di
  aplikasi ini (ukuran upload, concurrent ops), untuk kondisi tak terbatas yang jelas bukan
  pemakaian wajar.
- **Layout**: grid `auto-fill`/`minmax`, bukan jumlah kolom tetap — otomatis menyesuaikan
  berapa pun jumlah tile (bawaan + custom) tanpa perlu diubah manual tiap kali tile
  ditambah/dihapus, dan tidak merapatkan kolom jadi terlalu sempit di layar kecil.
- Edit/hapus tile custom lewat ikon kecil yang muncul saat tile di-hover (tile navigasi bawaan
  tidak punya ini — tidak bisa diedit/dihapus, itu bagian tetap dari router).

## 4.7 Pengaturan (Settings)

- ~~Lihat versi aplikasi, uptime service TarOS sendiri~~ — bagian versi sudah ada duluan
  lewat §4.8 di bawah (tombol versi/update di topbar), tanpa menunggu halaman Settings penuh
  ini selesai dibangun.
- **Aktifkan/nonaktifkan Web Terminal langsung dari browser** (halaman `/settings`, menu
  "Pengaturan" di topbar) — sebelumnya cuma bisa lewat edit manual `config.yaml` + restart
  servis lewat SSH. Toggle-nya **selalu** minta konfirmasi ulang password dashboard sebelum
  diterapkan (bukan cuma sesi aktif yang sudah login) — ini mengubah fitur dengan akses
  paling luas di aplikasi, jadi butuh persetujuan sadar tiap kali, sama seperti prompt
  grup-docker/mode-root saat instalasi. Setelah dikonfirmasi: servis restart otomatis
  (downtime singkat, perlu login ulang — sama seperti update aplikasi §4.8) supaya config
  baru benar-benar terpakai. Mengedit `config.yaml` di sisi server dengan **line-level
  targeted edit**, bukan parse-ulang-lalu-tulis-ulang seluruh file — supaya komentar &
  format yang sudah ada di file (mis. dari `deploy/config.example.yaml`) tidak ikut hilang.
- **Autentikasi dua faktor (TOTP)**, opsional, aktif/nonaktif dari halaman Pengaturan yang
  sama — diminta langsung oleh user setelah toggle Terminal di atas. Alur setup: klik
  "Aktifkan" → server generate secret baru (belum disimpan) → tampilkan QR code (di-render
  di klien, `qrcode-generator`, tanpa dependency gambar/canvas di server) + kunci manual →
  user scan dengan aplikasi authenticator (Google Authenticator, Aegis, dst — standar RFC
  6238, kompatibel dengan aplikasi authenticator mana pun) → masukkan kode 6 digit untuk
  konfirmasi. Secret **baru benar-benar tersimpan setelah kode itu tervalidasi** — generate
  lalu lupa konfirmasi tidak berefek apa pun ke login, jadi langkah generate sendiri tidak
  perlu password ulang (beda dari nonaktifkan, yang memang mengurangi keamanan dan **selalu**
  minta password dashboard). Begitu aktif, login butuh dua langkah: password dulu, lalu
  layar kedua minta kode 6 digit — **10 kode cadangan** sekali pakai juga dibuat saat itu,
  ditampilkan **satu kali saja**, untuk dipakai kalau ponsel/aplikasi authenticator hilang.
  Implementasi TOTP murni pakai Go stdlib (`crypto/hmac`+`crypto/sha1`, bukan library
  pihak ketiga — algoritmanya kecil & stabil sejak 2011, konsisten dengan alasan "kenapa
  tidak gopsutil" di [03-tech-stack.md](03-tech-stack.md)), diverifikasi lewat vector resmi
  RFC 6238 dan silang-cek terhadap `pyotp` (implementasi independen) sebelum dipakai di jalur
  login sungguhan. Sesi yang sedang login **tidak terpengaruh** aktif/nonaktifnya TOTP —
  cuma login berikutnya yang kena aturan baru.
- **Ganti port aplikasi**, sama-sama dari halaman Pengaturan — default **8090**. Alur dan
  jaminan keamanannya mirip toggle Terminal di atas (edit `config.yaml` line-level, restart
  otomatis, konfirmasi ulang password dashboard tiap kali), dengan satu lapis tambahan
  khusus port: sebelum config ditulis, server **mencoba bind langsung** ke port yang diminta
  (lalu langsung dilepas) — kalau gagal (sudah dipakai proses lain, atau port di bawah 1024
  tanpa izin khusus), permintaan ditolak dengan pesan jelas **tanpa** menyentuh config atau
  me-restart servis sama sekali. Ini penting khusus untuk port: kalau nilainya salah baru
  ketahuan *setelah* restart, servis akan gagal start berulang-ulang (systemd
  `Restart=always`) tanpa ada dashboard tersisa untuk memperbaikinya — beda dari toggle
  Terminal yang tidak punya cara gagal seburuk itu. Setelah berhasil disimpan dan servis
  restart, alamat dashboard di browser otomatis diarahkan ke port yang baru (bukan sekadar
  reload halaman yang sama — origin lama sudah tidak ada yang dengar sama sekali begitu
  servis pindah port), lalu diminta login ulang seperti biasa karena sesi cookie tidak ikut
  pindah lintas port (port berbeda dihitung origin berbeda oleh browser).
- **Kelola Pengguna** — TarOS sekarang multi-user, semua akun **akses sama rata** (belum ada
  role-based access, lihat [10-roadmap.md](10-roadmap.md) Fase 6). Kartu "Kelola Pengguna" di
  Settings menampilkan daftar username (akun sendiri ditandai, tombol hapus disembunyikan
  untuk baris itu), tombol "Tambah Pengguna" (username + password + password akun sendiri
  untuk konfirmasi — pola sama toggle Terminal/Port/nonaktifkan TOTP), dan tombol hapus per
  baris (password akun sendiri lagi untuk konfirmasi). Dua guard: tidak bisa hapus akun
  sendiri yang sedang login, tidak bisa hapus akun terakhir yang tersisa. **Tidak ada restart
  service** untuk tambah/hapus akun (beda dari toggle Terminal/Port) — mutasi langsung ke
  `credentials.yaml` + in-memory, sama seperti setup/konfirmasi/nonaktifkan TOTP di atas.
  Instalasi lama (single-user) otomatis ter-migrasi ke format multi-user begitu file pertama
  kali dibaca, transparan tanpa langkah manual — lihat [07-security.md](07-security.md) §7.1.
  TOTP sekarang juga per-akun (dulu satu akun jadi satu TOTP global secara implisit) — tiap
  akun independen, aktifkan TOTP di satu akun tidak memaksa akun lain ikut pakai 2FA.
- Ganti password akun sendiri, konfigurasi interval polling, root direktori file explorer,
  daftar unit systemd "terproteksi" — belum ada di halaman Settings ini, masih di
  [10-roadmap.md](10-roadmap.md) Fase 6.

## 4.8 Update Aplikasi

- Tombol versi (mis. `v0.1.0`) di topbar, ada di setiap halaman — klik untuk buka panel kecil:
  versi yang jalan saat ini, dan (kalau `update.enabled: true`) status pengecekan rilis
  terbaru dari GitHub. Pengecekan terjadi **saat panel dibuka**, bukan polling latar belakang
  di setiap kunjungan halaman — lihat [09-deployment.md](09-deployment.md) §9.5 untuk
  mekanisme lengkapnya (unduh, ganti binary di tempat, restart otomatis lewat systemd).
- Kalau ada update: tombol "Update Sekarang" → konfirmasi eksplisit (menyebutkan bakal ada
  downtime singkat & perlu login ulang) → proses berjalan → begitu servis kembali aktif,
  halaman reload otomatis (polling `/api/update/check` sampai server merespons lagi, bukan
  delay tetap yang bisa meleset di device lambat).
- **Kenapa perlu login ulang setelah update**: sesi login TarOS murni in-memory (tidak ada
  database, lihat [05-data-storage.md](05-data-storage.md)) — restart proses apa pun (update,
  crash, reboot device) otomatis menghapus semua sesi aktif. Ini bukan hal baru yang
  diperkenalkan fitur update; fitur ini cuma bikin restart jadi kejadian yang disengaja &
  lebih sering, jadi perlu dikomunikasikan jelas di UI, bukan mengejutkan user.
- Toggle `update.enabled` (default **on**, beda dari `terminal.enabled` yang default off) —
  lihat [07-security.md](07-security.md) untuk kenapa fitur ini dianggap risiko lebih rendah
  dari web terminal walau sama-sama mengubah state di device: tidak pernah membuka akses
  command/shell, cuma mengganti satu file binary dengan asset resmi dari
  `github.com/tarkiman/taros`, dan tetap butuh sesi dashboard yang sudah terautentikasi untuk
  memicunya.

## 4.9 Kompatibilitas macOS

Permintaan langsung dari user: TarOS di-install juga di Mac (motivasi konkret: alternatif
lebih ringan dari Docker Desktop untuk monitoring Docker). Bukan target device utama TarOS
(itu tetap STB/Raspberry Pi, lihat [01-overview.md](01-overview.md)), tapi didukung sebagai
fase pertama yang scope-nya sengaja dibatasi — dibahas dulu dengan user sebelum dikerjakan
karena beberapa fitur inti nempel erat ke API khusus Linux.

**Jalan penuh tanpa perubahan kode**, dikonfirmasi lewat `GOOS=darwin go build ./...` yang
sukses tanpa error compile sama sekali (termasuk `syscall.Statfs_t` di `internal/fileexplorer`
yang sempat dikira berisiko field-nya beda antar OS — ternyata tidak, definisi Go stdlib untuk
darwin sudah kompatibel):
- **Docker** — `internal/docker` cuma dial ke `docker.socketPath` dari config, tidak ada
  hardcode path Linux. Arahkan ke socket Docker Desktop atau Colima di macOS dan langsung
  jalan, tanpa perubahan kode.
- **File Explorer** dan **Web Terminal** — pakai API POSIX standar Go (`os`, `creack/pty`),
  portable ke darwin apa adanya.

**Gracefully tidak didukung** (bukan crash/data kosong tanpa penjelasan) — dua subsistem ini
murni baca internal Linux, tidak ada padanan langsung yang ditulis untuk fase ini:
- **Dashboard & Proses** (§4.1) — `internal/collector` baca `/proc` langsung (lihat komentar
  package doc-nya soal kenapa bukan gopsutil). Tidak ada di macOS sama sekali.
- **Monitoring Service** (§4.3) — shell out ke `systemctl`/`journalctl`. macOS punya
  `launchd`/`launchctl`, API dan bentuk datanya beda total (termasuk sistem log — macOS pakai
  unified logging `log show`, bukan journald) — bukan sekadar path binary yang beda.

Mekanismenya: `web.Deps.SystemMonitoringSupported` (`runtime.GOOS == "linux"`, di-set sekali
saat startup) dicek di titik-titik berikut. Endpoint status baru,
`GET /api/system/monitoring-status`, dicek klien **sebelum** membuka koneksi SSE metrics
sama sekali — sengaja begitu karena `EventSource` bawaan browser tidak punya cara bersih
untuk memberi tahu "endpoint ini tidak akan pernah mengirim data": kalau endpoint SSE
langsung dikembalikan 503, browser cuma mencoba reconnect selamanya tanpa pesan jelas.
Dashboard, halaman Proses, dan Monitoring Service masing-masing menampilkan `NAlert` yang
menjelaskan **kenapa** (bukan generik "gagal memuat"), sementara Docker/Files/Terminal di
halaman lain tidak terpengaruh sama sekali.

**Instalasi**: `scripts/quick-install.sh` mendeteksi Darwin dan mengambil jalur terpisah dari
Linux — paket rilis macOS cuma berisi binary + config contoh (tanpa `install.sh` yang
mengasumsikan `systemctl`/`useradd`), diletakkan di `~/taros/` dan dijalankan manual, **tanpa
butuh sudo/root sama sekali**. Belum ada auto-restart/auto-start setara `launchd`'s
`KeepAlive` di fase ini (itu setara systemd `Restart=always` yang sudah dipakai fitur
ganti-port/toggle-terminal di Linux) — sengaja ditunda, lihat [10-roadmap.md](10-roadmap.md)
untuk kenapa dan apa yang dipertimbangkan untuk fase berikutnya kalau memang dibutuhkan.

## 4.10 Multi-Bahasa (Indonesia/English)

Seluruh UI Vue mendukung Indonesia dan English, dengan **default English untuk instalasi
baru** — permintaan langsung dari user. Dibangun dua fase: Fase 1 (frontend, v0.16.0) membuat
seluruh label/tombol/judul/menu/pesan di halaman Vue dwibahasa; Fase 2 (backend) menyusul
untuk pesan error yang datang dari Go — lihat "Pesan error backend (kode + terjemahan)" di
bawah.

- **Library**: `vue-i18n` v11, Composition API mode (`legacy: false`) — dipasang di
  `web/frontend/src/i18n/index.ts`, dipakai tiap halaman/komponen lewat `useI18n()` (pola
  standar, sama seperti `useMessage()`/`useDialog()` Naive UI yang sudah dipakai luas di
  codebase ini).
- **Struktur pesan**: `web/frontend/src/i18n/en.ts` (sumber tipe `MessageSchema`) dan `id.ts`
  (di-type `satisfies MessageSchema`) — nested per domain (`common`, `nav`, `dashboard`,
  `settings`, `files`, dst, satu namespace per halaman/komponen besar). Karena `id.ts`
  di-type ketat terhadap bentuk `en.ts`, **vue-tsc menangkap kalau ada key yang lupa
  ditambahkan di salah satu locale saat build** (`npm run build` sudah menjalankan `vue-tsc -b`
  lebih dulu) — penting mengingat skala hampir 500 key di migrasi awal ini.
- **Preferensi bahasa**: `web/frontend/src/composables/useLocale.ts`, pola persis meniru
  `useTheme.ts` yang sudah ada (module-level state, bukan Pinia store) — `localStorage` key
  `tk-locale`, default **`'en'`** kalau belum ada preferensi tersimpan (murni per-browser,
  tidak ada konsep "instalasi" yang perlu dideteksi di server untuk dashboard single-user
  self-hosted seperti ini).
- **Switcher**: komponen `LocaleSwitcher.vue`, dipasang di topbar (`AppShell.vue`, sebelah
  tombol tema) dan di halaman Login (pojok kanan-atas) — bisa di-switch bahkan sebelum login.
  Klik langsung toggle 2 bahasa, tidak perlu reload halaman.
- **Naive UI locale bawaan**: string internal Naive UI sendiri (placeholder default "Please
  Input" pada `NInput` yang tidak di-set eksplisit, teks date-picker, dsb) punya sistem locale
  terpisah dari `vue-i18n` — disinkronkan lewat `NConfigProvider`'s `:locale`/`:date-locale`
  props di `App.vue`, mengikuti `useLocale()` yang sama, supaya tidak ada bagian UI yang
  "ketinggalan" bahasa Inggris saat sudah di-switch ke Indonesia.
- **Format tanggal/jam**: nama hari/bulan di jam Dashboard pakai `Intl.DateTimeFormat` bawaan
  JS (`id-ID`/`en-US`) berdasarkan locale aktif, bukan array terjemahan manual.

### Pesan error backend (kode + terjemahan)

Backend Go tidak menerjemahkan apa pun sendiri — tiap response error JSON kirim **kode
stabil** (+ params interpolasi opsional) di samping teks aslinya, frontend yang sudah punya
`vue-i18n` yang resolve terjemahannya:

- **Envelope**: `{error: "...", code?: "...", params?: {...}}` — `error` tetap teks fallback
  apa adanya (dipakai API client non-browser/log), `code` (konstanta di package baru
  `internal/apierr`, mis. `wrong_password`, `file_op_failed`) yang jadi kunci terjemahan.
  Ditulis lewat `writeJSONError` (`internal/web/errors.go`) — 65 titik panggil di semua
  `handlers_*.go` + `ws_terminal.go` sudah migrasi, tidak ada yang tersisa versi lama.
- **`internal/apierr` package terpisah** (bukan bagian `internal/web`) khusus supaya
  `internal/quicklinks` bisa attach kode ke error validasinya sendiri tanpa import cycle balik
  ke `internal/web`.
- **Params membawa detail teknis mentah** (`{detail: err.Error()}`) untuk error yang dibungkus
  dari OS/stdlib/Docker daemon/systemd yang tidak bisa diklasifikasi lebih jauh — satu kode
  generik per titik panggil (menjelaskan *aksi* yang gagal, mis. `file_op_failed`,
  `port_unavailable`), bukan kode unik per varian pesan teknis; sama filosofinya dengan
  stack-trace/log detail, bukan kalimat UI yang perlu diterjemahkan.
- **Frontend resolve di titik lempar, bukan titik tangkap**: `api/client.ts`'s `request()`
  resolve pesan terjemahan sekali saat `ApiError` dibuat (pakai locale `vue-i18n` aktif saat
  itu) via `errors.<code>` di `i18n/en.ts`/`id.ts` (fallback ke `error` mentah kalau kode tidak
  dikenal, dicek lewat `te()` — mencegah key hilang bocor sebagai `errors.some_code` mentah).
  Efeknya seluruh ~40 titik `e instanceof ApiError ? e.message : t(...)` yang sudah ada dari
  Fase 1 otomatis dapat teks terjemahan yang benar tanpa perlu diubah satu pun.
- **Docker unavailable state** (`dockerUnavailableJSON`, dikonsumsi `DockerView.vue`) dapat
  `code`/`params` yang sama (`docker_disabled` / `docker_unreachable`), field `enabled` tidak
  berubah bentuk.
- **SSE job errors** (`fileexplorer.JobSnapshot`, panel progress copy/move di `FilesView.vue`)
  adalah transport terpisah dari `writeJSONError` (EventSource, bukan fetch JSON) — dapat
  mekanisme serupa lewat `ErrorCode`/`ErrorParams`, di-resolve `FilesView.vue` sendiri lewat
  `useI18n()`'s `t`/`te` langsung (kode tunggal `job_failed` + `{detail}`, semua kegagalan
  copy/move di sini memang tidak terklasifikasi lebih jauh).

## 4.11 Notifikasi Discord (CPU/RAM/Suhu/Container)

Kirim notifikasi ke webhook Discord kalau CPU, RAM, atau suhu CPU **bertahan** di atas nilai
threshold selama lebih dari durasi tertentu — bukan alert sesaat/spike, tapi kondisi yang
memang berkepanjangan. Threshold dan durasi tiap metrik independen dan configurable lewat
slider di halaman Settings.

- **Semantik sustained-threshold**: `internal/notify.Monitor` mengevaluasi snapshot metrik
  terbaru (`internal/store`, sumber yang sama dengan Dashboard) tiap 10 detik. Begitu sebuah
  metrik melewati threshold-nya, waktu mulai breach dicatat; alert baru terkirim kalau breach
  itu **terus-menerus** (bukan naik-turun) bertahan ≥ durasi yang dikonfigurasi. Sekali kirim
  saat transisi ke kondisi alert, sekali kirim lagi ("kembali normal") saat metrik turun lagi
  di bawah threshold — **sengaja tidak ada notifikasi berulang** selama breach masih
  berlangsung, supaya channel Discord tidak banjir pesan tiap 10 detik selama insiden
  berlangsung lama.
- **3 metrik independen**: CPU (`snap.CPU.TotalPercent`), RAM (`snap.Mem.UsedPercent`, keduanya
  threshold 1–100%), Suhu CPU (nilai sensor tertinggi dari `snap.Temps`, threshold 30–120°C).
  Tiap metrik punya toggle enable sendiri — mengaktifkan notifikasi Discord secara keseluruhan
  tidak otomatis mengaktifkan ketiganya. Perangkat tanpa sensor suhu (`len(snap.Temps) == 0`)
  otomatis dilewati, tidak pernah false-alarm di 0°C.
- **Durasi 1–60 menit**, threshold masing-masing lewat `NSlider` di kartu "Notifikasi Discord"
  (Settings) — nilai live ditampilkan di samping slider, disimpan lewat satu tombol "Simpan"
  (bukan auto-save tiap geser, supaya tidak spam API saat drag).
- **Webhook URL divalidasi domainnya** (`https://discord.com/api/webhooks/...` atau
  `discordapp.com`) — field ini jadi origin request keluar (`http.Post`), jadi divalidasi
  ketat untuk cegah SSRF lewat field ini, bukan sekadar dicek format URL. Ada tombol "Kirim
  Test" terpisah supaya webhook bisa diverifikasi sebelum disimpan.
- **Konfigurasi live, tanpa restart**: sama seperti Akses Cepat (Custom, §4.1) — tersimpan di
  `notify.yaml` sendiri (path configurable lewat `notify.settingsFile` di `config.yaml`),
  dimutasi langsung lewat API, bukan lewat `config.yaml` + restart. Beda dari quick-links.yaml,
  file ini berisi secret (URL webhook) — ditulis 0600 dan **tidak pernah masuk git** (lihat
  `.gitignore`), sama perlakuannya seperti `credentials.yaml`. Detail keamanan lengkap di
  [07-security.md](07-security.md).
- **Linux-only**: goroutine `Monitor.Run` cuma dijalankan kalau
  `systemMonitoringSupported` (sama gate dengan `internal/collector` di `cmd/taros/main.go`) —
  tidak ada snapshot metrik valid di OS lain untuk dievaluasi.
- **Pesan Discord** dikirim sebagai embed (bukan plain text) — merah untuk alert, hijau untuk
  recovery, biru untuk pesan test, berisi nilai saat ini/threshold/durasi bertahan, footer
  `TarOS · <hostname>`. Bahasa pesan Bahasa Indonesia tetap (bukan ikut sistem i18n UI Vue di
  §4.10) — ini pesan langsung ke channel Discord milik user sendiri, bukan bagian UI aplikasi.

### Alert kesehatan container

Alert CPU/RAM/suhu tidak bisa melihat container yang crash-loop atau mati diam-diam — di host
dev, `aiplatform-redis` dan `deploy-backend-1` restart 68 dan 71 kali tanpa ada yang tahu
sampai diperiksa manual. Kartu **Container** di Settings > Notifikasi (default mati, memakai
webhook yang sama, master switch notifikasi tetap harus nyala) menutup celah itu.
`internal/notify.ContainerMonitor` meng-inspect semua container tiap 30 detik (inspect ~beberapa
ms/container, 4 paralel) dan menilai tiga aturan independen:

- **Restart berulang**: `RestartCount` naik ≥3 dalam 10 menit. Sengaja memakai hitungan restart,
  bukan status `restarting` — container yang hidup 60 detik lalu mati hampir tidak pernah
  tertangkap sedang `restarting`, tapi hitungannya tetap naik. Nilai yang sudah ada saat TarOS
  mulai dipakai sebagai baseline, bukan dihitung (container dengan RestartCount 68 yang stabil
  tidak memicu apa-apa).
- **Unhealthy**: health check `unhealthy` terus-menerus ≥ masa tenggang (kedipan sesaat tidak
  dihitung).
- **Berhenti tak terduga**: state `exited` dengan exit code abnormal, restart policy bukan `no`,
  bertahan ≥1 menit, dan di luar masa tenggang. Exit code 0/137/143 dianggap berhenti sengaja
  (bersih / SIGKILL setelah `docker stop` / SIGTERM) — **kecuali** `OOMKilled`, karena OOM kill
  juga berujung 137 dan itu justru kasus yang harus tertangkap (host RAM kecil). Docker tidak
  punya penanda "dihentikan manual", jadi ini heuristik: crash yang kebetulan exit 0 lolos.

Semantik sama dengan alert metrik: **satu alert per insiden**, satu pesan "pulih" setelah kondisi
bersih ≥5 menit (kedipan di dalam jendela itu tetap insiden yang sama, tidak mengirim ulang).
**Masa tenggang** (default 3 menit, 1–60) adalah waktu tenang setelah TarOS menyala/aturan
dinyalakan — container memang telat naik setelah boot (Wi-Fi/SMB) — sekaligus lama minimum
unhealthy; ia juga berlaku untuk restart-loop dan crash. Menonaktifkan lalu menyalakan lagi
memulai masa tenggang baru. Lonjakan (mis. banyak container gagal sesudah boot buruk) dibatasi
4 pesan per siklus: 3 alert bernama + 1 ringkasan yang menyebut sisanya.

- **Log terakhir** (3 baris) bisa disertakan di alert — **default mati**, karena log bisa memuat
  token/password dan pesannya keluar dari mesin (ke Discord). Saat dinyalakan, UI menampilkan
  peringatan; backtick di log dinetralkan supaya tidak memecah blok kode Discord.
- Container tanpa restart policy tidak dipantau untuk crash (container coba-coba sekali jalan
  tidak berisik, tanpa perlu daftar mute).
- Container yang dihapus/di-uninstall dilupakan tanpa pesan.
- **Batas jujur**: kalau TarOS atau seluruh Pi mati, tidak ada yang terkirim (butuh pemantau
  eksternal). Setelah TarOS di-restart, insiden yang masih berlangsung dikirim ulang sekali
  (status insiden hanya di memori).
- Klien lama (JS ter-cache) yang menyimpan tanpa blok `containers` tidak mereset pengaturannya:
  handler mendekode ke pengaturan yang tersimpan.
- Diuji: unit test state machine (jam & sumber palsu, 13 test + 7 kasus tabel untuk aturan crash, dicek dengan mutasi — tiap
  aturan yang dirusak membuat test gagal) dan langsung ke Docker daemon asli (`TAROS_LIVE_DOCKER=1
  go test ./internal/notify -run Live -v`) dengan 3 container tiruan crash-loop / unhealthy /
  exit-5 plus 33 container asli: tepat 3 alert yang diharapkan, 0 false positive, kolom log terisi.

## 4.12 Analisis Disk

Laporan file/folder terbesar di server untuk membantu optimasi ruang penyimpanan — user diminta
lewat diskusi eksplisit ("analisis resource untuk optimasi, yang tidak diperlukan bisa dihapus
atas persetujuan admin"), dan scope-nya sengaja disempitkan ke disk usage dulu (bukan langsung
jadi "resource analyzer" umum lintas Docker/service/proses sekaligus) — kategori lain (Docker
unused images/volumes, service systemd yang gagal terus-menerus, log rotation) sengaja belum
digarap, dicatat sebagai ide lanjutan di [10-roadmap.md](10-roadmap.md).

- **100% read-only di sisi scan.** `POST /api/disk-analysis/scan` (`internal/fileexplorer.Scan`)
  cuma melaporkan — tidak pernah menghapus apa pun sendiri. Penghapusan pakai endpoint file
  explorer yang **sudah ada** (`POST /api/files/op` `{"action":"delete"}`, sama Jail-scoped, sama
  konfirmasi `NPopconfirm` yang dipakai File Explorer/Docker Cleanup), jadi permukaan risiko baru
  fitur ini murni "bisa membaca & meranking ukuran," bukan "bisa menghapus dengan cara baru yang
  belum teruji."
- **Scan root = `fileExplorer.rootDir` yang sama, lewat `Jail` yang sama** — otomatis mewarisi
  blocklist (`/etc/shadow`, `/proc`, `/sys`, aturan `.ssh` otomatis) tanpa config keamanan
  terpisah yang bisa divergen dari File Explorer.
- **Skip mount point lain** (pola `du -x`): `st_dev` tiap direktori dibandingkan terhadap `st_dev`
  root sebelum descend — hasil scan tidak menyeret masuk disk lain yang ke-mount di bawah root.
  Path yang dilewati dicatat di `skippedMounts` (transparansi ke user, bukan didiamkan).
  Direktori yang gagal dibaca (permission denied) juga dilewati + dihitung
  (`permissionErrors`), tidak menggagalkan seluruh scan.
- **Top 50 file terbesar via min-heap ukuran tetap** (`container/heap`) selama satu kali
  `filepath.WalkDir`, bukan kumpulkan semua file lalu sort — memori terkendali walau tree-nya
  berisi jutaan file, relevan buat device kecil (Pi/STB).
- **Breakdown folder cuma satu level**: ukuran teragregasi tiap anak langsung dari root (mis.
  `/var`, `/home`, `/opt` kalau root `/`), bukan rekursif banyak level — daftar anak langsung
  root biasanya sudah pendek & predictable, dan admin bisa "masuk lebih dalam" lewat File
  Explorer yang sudah ada (tombol "Buka di File Explorer" deep-link ke `/files?path=...`, pola
  sama yang dipakai folder shortcuts di Dashboard) alih-alih membangun browser tree baru dari
  nol.
- **On-demand, bukan background/scheduled** — satu tombol "Jalankan Analisis" per kunjungan
  halaman, menghindari beban scan rutin di device kecil dan sejalan dengan permintaan "hasil
  ditampilkan dulu" sebelum ada aksi apa pun.
- **Nonaktif secara default** (`diskAnalysis.enabled: false`) — pola gating sama Web Terminal:
  route scan-nya **tidak didaftarkan sama sekali** kalau disabled (bukan didaftarkan-tapi-403),
  nav item disembunyikan total. `GET /api/disk-analysis/status` selalu terdaftar supaya frontend
  tahu status tanpa perlu route utamanya aktif.
- **Toggle live dari halaman Settings** (`POST /api/settings/disk-analysis`, kartu "Disk
  Analysis") — sama mekanisme restart-and-reload dengan toggle Terminal (edit `config.yaml` lalu
  proses keluar sendiri, systemd `Restart=always` menghidupkannya lagi baca nilai baru; route
  registration diputuskan sekali saat startup, tidak bisa di-unregister dari `*http.ServeMux`
  yang sedang berjalan). **Beda dari Terminal, sengaja tanpa re-konfirmasi password** — fitur
  ini cuma menambahkan kapabilitas *read-only* (scan), bukan kapabilitas destruktif baru
  (penghapusan sudah ada duluan lewat File Explorer terlepas dari toggle ini), jadi tidak masuk
  tingkat risiko yang sama dengan akses shell. Diuji end-to-end nyata: toggle lewat klik switch
  sungguhan di UI (bukan cuma panggil API), tunggu restart+reload otomatis, sesi login hilang
  (in-memory, sama seperti efek toggle Terminal), login ulang, status berubah persis sesuai
  yang di-klik — dua arah (aktifkan dan nonaktifkan).
- **Throttled, serialized, dan timeout-bounded (2026-08-28 fix).** Ditemukan di device nyata:
  scan tanpa batas apa pun (rootDir default `"/"`, satu `filepath.WalkDir` penuh, tanpa jeda,
  tanpa timeout, tanpa penjagaan concurrent) membuat seluruh Raspberry Pi macet/tidak bisa
  diakses selama scan berjalan — persis kelas masalah CasaOS-hang yang jadi alasan proyek ini
  ada ([01-overview.md](01-overview.md)), hanya saja lewat jalur read, bukan write, dan tidak
  pernah dipasangi pengaman seperti `fileExplorer.copyThrottleMBps`/`JobQueue` punya copy-move.
  Perbaikan (`internal/fileexplorer.DiskAnalysisScanner`):
  - `diskAnalysis.throttleEveryFiles` + `diskAnalysis.throttleSleepMs` — `Scan` tidur sebentar
    tiap N entry (file maupun direktori) yang dikunjungi, supaya tidak menghajar disk di duty
    cycle 100% terus-menerus selama scan (default 200 entry / jeda 5ms — root fs berisi
    ratusan ribu file jadi beberapa detik lebih lambat, jauh lebih baik daripada bikin seluruh
    device hang).
  - `diskAnalysis.timeoutSec` (default 180) — scan yang tidak selesai dalam batas ini dihentikan
    lewat context timeout, request mengembalikan error jelas (`disk_analysis_scan_timeout`)
    alih-alih menggantung selamanya.
  - Hanya satu scan berjalan di satu waktu — permintaan scan kedua saat satu masih berjalan
    langsung ditolak (`disk_analysis_scan_busy`, HTTP 409) alih-alih menjalankan dua walk
    penuh sekaligus (dua kali beban I/O yang justru sedang coba dibatasi).

## 4.13 Riwayat Boot & Deteksi Mati Mendadak

Pi ini dua kali mati tanpa jejak (26 dan 28 Agustus) dan penyebabnya hanya bisa disimpulkan dari
bukti tidak langsung ("power event"). Jurnal tidak bisa diandalkan untuk ini: Pi **tanpa RTC**
(dua boot pernah sama-sama berstempel 23:31:21) dan pemutusan listrik mendadak tidak sempat
meninggalkan catatan. Saat diperiksa, jurnal kernel dari 8 boot tercatat juga **tidak punya satu
pun catatan undervoltage** — jadi log undervoltage saja tidak akan menangkap apa-apa; yang bisa
ditangkap adalah *fakta* dan *waktu* mati mendadak, plus keadaan mesin sesaat sebelumnya.

Kartu **Riwayat Boot** (Settings, paling bawah) menampilkan satu baris per boot host (maks. 50):
waktu boot, terakhir terlihat, uptime, cara berakhir, pembacaan terakhir, dan jumlah start/crash
TarOS. Datanya dari `internal/bootlog` — file `bootLog.file` (default `/opt/taros/boots.yaml`,
0644, tidak rahasia):

- **Detak tiap 60 detik** menulis "masih hidup" + pembacaan: suhu CPU, suhu NVMe, CPU/RAM, dan
  status undervoltage. Penulisan atomik (file sementara + rename) — pemutusan listrik di tengah
  penulisan itu sendiri tidak boleh meninggalkan file setengah jadi. Satu tulisan kecil per
  menit di NVMe itu sepele; di perangkat eMMC/SD kecil pertimbangkan ini.
- **Tanda "berhenti bersih"** ditulis sinkron saat TarOS menerima SIGTERM (systemd saat stop,
  reboot, atau shutdown) atau Ctrl-C. Listrik putus, `kill -9`, dan crash tidak pernah sampai ke
  sana — itulah buktinya.
- **Satu entri per boot host**, dikenali dari `boot_id` kernel, bukan per proses TarOS: restart
  TarOS (redeploy, crash) di dalam satu boot hanya menaikkan penghitung `start`/`crash` di entri
  itu. Klasifikasi saat start:
  - `boot_id` sama, penutup bersih → restart TarOS biasa.
  - `boot_id` sama, tanpa penutup → **TarOS crash** (dihitung, dicatat di log).
  - `boot_id` beda, penutup ada → boot sebelumnya **berakhir bersih**.
  - `boot_id` beda, tanpa penutup → boot sebelumnya **mati mendadak** (listrik putus, reset
    paksa, atau sistem hang).
- **Waktu tanpa RTC**: waktu boot dihitung ulang tiap detak sebagai `sekarang − /proc/uptime`,
  jadi salah-jam saat boot mengoreksi diri begitu NTP sinkron. Sinkron tidaknya jam ditanyakan
  ke kernel lewat `adjtimex` (bukan file khusus `timesyncd`, jadi tetap benar kalau memakai
  `chrony`); baris yang jamnya belum sinkron diberi tanda "≈" di UI.
- **Sensor yang dibaca** semuanya sysfs/procfs yang bisa dibaca user biasa: NVMe dari `hwmon`
  (`nvme`, Composite) dan undervoltage dari `hwmon` `rpi_volt/in0_lcrit_alarm`. `vcgencmd
  get_throttled` sengaja **tidak** dipakai — `/dev/vcio` hanya untuk root, padahal TarOS
  direkomendasikan jalan sebagai user biasa. Harganya: hanya kondisi undervoltage *saat itu* yang
  terbaca (bukan bit "pernah terjadi sejak boot"), jadi alarm diambil tiap 5 detik dan disimpan
  "menempel" sampai detak berikutnya supaya sag singkat di antara dua detak tidak terlewat.
  Suhu NVMe tidak dicampur ke gauge/alert suhu CPU di Dashboard (alert "Suhu CPU" memakai suhu
  tertinggi dari sensor termal; menambah NVMe ke sana akan mengubah artinya) — ia tampil di
  kartu ini.
- **Notifikasi Discord** (Settings > Notifikasi, "Pi menyala kembali setelah mati mendadak",
  default mati, master switch tetap harus nyala): satu pesan setelah Pi pulih, memuat kapan
  terakhir terlihat, lama berjalan, pembacaan terakhir, dan petunjuk — pembacaan terakhir normal
  lalu putus tiba-tiba biasanya berarti listrik terputus mendadak (adaptor/kabel/konektor),
  sedangkan undervoltage tepat sebelum mati mengarah ke catu daya yang kurang kuat; sistem hang
  bisa terlihat sama dengan pemutusan listrik. Ini sekaligus menutup sebagian batas alert
  container ("kalau Pi mati tidak ada yang terkirim"): kita tetap tahu begitu Pi menyala lagi.
  - Dikirim saat start, biasanya **selagi boot** — Wi-Fi baru naik 19–90 detik kemudian — jadi
    dicoba ulang tiap 30 detik sampai 15 menit, bukan sekali lalu hilang.
  - Status "sudah ditangani" disimpan di ledger: restart TarOS sebelum pesan terkirim **tidak
    menghilangkannya** (ditawarkan lagi), dan setelah ditangani tidak diumumkan ulang. Ditangani
    = terkirim, atau aturan sedang mati (tidak retroaktif: menyalakannya nanti tidak menggali
    kejadian lama), atau menyerah. Hanya boot **tepat sebelum** boot sekarang yang dianggap
    berita; yang lebih lama adalah riwayat.
- **Batas jujur**: penyebab pemutusan tidak bisa dipastikan dari dalam mesin — hanya kapan,
  seberapa sering, dan keadaan terakhirnya. Boot yang berakhir karena TarOS mati lama (dihentikan
  paksa dan tidak pernah jalan lagi sampai host reboot) juga terbaca "mati mendadak". Entri
  pertama setelah upgrade tidak punya riwayat sebelumnya. File yang rusak dipindah ke `.bad` dan
  riwayat dimulai ulang, bukan menolak start. Hanya Linux (`/proc`, `/sys`).
- Diuji: 20 unit test ledger + notifier (klasifikasi, kejadian sag di antara detak, jam yang
  mengoreksi diri, penulisan atomik, file rusak, retry/menyerah/dibatalkan) dicek dengan mutasi
  — mutasi yang awalnya lolos menunjukkan **celah nyata** (restart TarOS sebelum pesan terkirim
  menghilangkan pemberitahuan), diperbaiki dan diuji. Di mesin asli (instance scratch): `boot_id`
  cocok dengan `/proc`, waktu boot **persis sama dengan `uptime -s`**, `adjtimex` melaporkan jam
  sinkron, NVMe 30,85°C dan alarm undervoltage terbaca sebagai user biasa; tiap skenario akhir
  sesi (SIGTERM bersih, `kill -9`, dan mati mendadak yang disimulasikan dengan mengganti
  `boot_id`) terklasifikasi benar dan tidak diumumkan ulang. Pengiriman Discord sungguhan tidak
  dicoba (webhook asli tidak dipakai) — jalurnya `sendWebhook` yang sama dengan alert lain.

## 4.14 Manajemen Wi-Fi (scan / sambung / lupakan)

Kartu **Wi-Fi** di Settings: pindai jaringan yang terlihat, sambung ke salah satunya (dengan
password kalau perlu), sambung ke jaringan tersembunyi, dan lupakan jaringan tersimpan. Dikerjakan
lewat `nmcli` NetworkManager (`internal/wifi`), tanpa library D-Bus.

**Risiko utamanya menentukan desain**: Pi ini hanya punya Wi-Fi dan TarOS dibuka lewat Wi-Fi yang
sama, jadi pindah jaringan yang salah (password keliru, di luar jangkauan) memutus perangkat tanpa
jalan kembali selain akses fisik. Karena itu:

- **Pindah jaringan berjalan di server, asinkron, dan diverifikasi**: `POST /api/wifi/connect`
  langsung membalas 202; goroutine mengingat koneksi sebelumnya, menyambung, lalu memverifikasi
  bahwa perangkat benar-benar *connected* pada SSID yang diminta **dengan alamat IPv4**. Kalau gagal
  di titik mana pun, ia menghapus profil baru dan menyambung balik ke koneksi sebelumnya
  (`rolled_back`); kalau itu pun gagal hasilnya `rollback_failed` — dilaporkan terang-terangan, tidak
  disembunyikan. Respons HTTP-nya sendiri akan hilang saat link berpindah, jadi hasil dibaca dari
  `GET /api/wifi/status` (state job ada di memori); UI menunggu Pi kembali, memberi tahu kalau link
  terputus lama (mungkin alamatnya berubah), dan menampilkan alamat baru begitu berhasil.
- **Kriteria "berhasil" sengaja longgar di gateway**: state *connected* + SSID benar + alamat IPv4 —
  **bukan** gateway default atau ping ke gateway. LAN terisolasi yang sah tidak punya router keluar,
  dan banyak router menjatuhkan ICMP; keduanya akan me-rollback perpindahan yang sebenarnya baik.
- **Konfirmasi password dashboard** untuk sambung dan lupakan (403 kalau salah), plus peringatan di
  dialog bahwa halaman bisa terputus dan cara menjangkau Pi sesudahnya (alamat baru, ZeroTier).
- **Password Wi-Fi tidak pernah lewat baris perintah.** Profil baru ditulis sebagai *keyfile*
  NetworkManager (`/etc/NetworkManager/system-connections/taros-wifi-<uuid>.nmconnection`, 0600,
  root, `O_EXCL`) lalu `nmcli connection load` — SSID ditulis sebagai daftar byte (tak ambigu untuk
  SSID apa pun, mis. "12;34") dan backslash/spasi ujung di-escape. Password tidak pernah di-log,
  dikembalikan API, atau ada di pesan error (`CmdError` hanya membawa stderr, tidak argumen).
  Divalidasi sebagai passphrase WPA yang sah (8–63 ASCII yang bisa dicetak, atau 64 digit hex),
  SSID ≤32 byte tanpa karakter kontrol.
- **Aman terhadap salah pilih**: hanya profil mode *infrastructure* yang dianggap "tersimpan" (profil
  hotspot/AP bernama sama tidak boleh dipakai ulang — itu akan menjadikan adapter sebuah AP), yang
  sedang dipakai tidak bisa dilupakan, uuid non-Wi-Fi ditolak, profil lama yang kata sandinya diganti
  baru dihapus **setelah** yang baru berhasil (gagal → yang lama tetap), dan hanya satu perpindahan
  berjalan sekali waktu (409 `wifi_busy`). Scan segar dibatasi 1 per 8 detik (scan sesaat menurunkan
  throughput link yang sedang dipakai); permintaan lebih cepat dijawab dari cache.
- **Lingkup v1**: WPA/WPA2 (termasuk campuran WPA2/WPA3), WPA3-SAE, dan jaringan terbuka. WPA-Enterprise
  (802.1X) dan WEP **tampil tapi tidak bisa disambung**; tidak ada IP statis dan tidak ada
  mematikan radio (yang terakhir bisa memutus perangkat tanpa pemulihan).
- **Syarat**: NetworkManager berjalan, ada adapter Wi-Fi, izin polkit NetworkManager (scan,
  network-control, settings.modify.system) diperiksa lewat `nmcli general permissions` (hanya
  membaca), dan **TarOS berjalan sebagai root** (menulis keyfile). Kalau tidak terpenuhi, kartu
  menampilkan alasannya (`no_nmcli`, `nm_not_running`, `no_wifi_device`, `not_authorized`,
  `needs_root`), bukan tombol yang gagal diam-diam. Config `wifi.device` mengunci adapter tertentu;
  adapter yang dikonfigurasi tapi tidak ada adalah error, tidak pernah mundur diam-diam ke radio lain.
  Otomatis (default) memilih adapter yang sedang terhubung — kalau ada hotspot berbasis adapter lain
  yang juga "terhubung", isi `wifi.device`.
- Audit log: `wifi: pindah jaringan dimulai` (ssid, hidden, siapa), hasilnya (ssid, result, detail),
  dan `jaringan tersimpan dilupakan` — tanpa password.
- **Diuji**:
  - 25 unit test dengan NetworkManager palsu yang meniru profil, jaringan, koneksi aktif, dan kegagalan
    (sukses, password salah, tanpa lease, di luar jangkauan, rollback gagal, saat pindah `up` "berhasil"
    tapi landing di SSID lain, dua pindah bersamaan, validasi, lupakan, ketersediaan) — dicek dengan
    **20 mutasi**, semuanya tertangkap.
  - Read-only di NetworkManager **asli** host ini (status, daftar, semua penolakan) tanpa menyentuh radio.
  - **End-to-end sungguhan di radio virtual** (`mac80211_hwsim`, dua hotspot buatan NetworkManager,
    `wlan0` tidak disentuh, rute default dijaga tidak berubah, host diverifikasi identik sesudahnya):
    sambung (4 dtk), pindah antar-AP dengan koneksi sebelumnya diingat, **password salah dan SSID di
    luar jangkauan sama-sama di-rollback** (~30 dtk, profil rusak tidak tertinggal, koneksi lama pulih),
    pakai ulang profil tersimpan tanpa keyfile baru, lupakan, dan jaringan tersembunyi. Dari 2.653
    sampel baris perintah `nmcli` (tiap ~20 ms) **tidak ada satu pun yang memuat password**. UI diuji di
    Chromium headless terhadap backend yang sama.
  - Temuan yang **hanya** ketahuan lewat uji nyata (diperbaiki, masing-masing diberi test): profil
    hotspot terbaca sebagai "tersimpan"; kriteria gateway me-rollback jaringan tanpa gateway; NetworkManager
    melaporkan password salah sebagai "The Wi-Fi network could not be found" (sama dengan di luar
    jangkauan — UI menjelaskan kedua kemungkinan); pesan berisi `Hint: use 'journalctl …'` dibersihkan.
- **Belum teruji / batas jujur**: perpindahan pada Wi-Fi **asli** host ini tidak dicoba (hanya satu AP
  dan satu-satunya jalur ke Pi); probing AP yang benar-benar menyembunyikan SSID (hotspot virtual tetap
  menyiarkannya — yang teruji jalur flag `hidden` dan keyfile-nya); jalur non-root/polkit (butuh root
  sekarang); WPA3-SAE-only pada radio sungguhan; dan jaringan captive-portal (dianggap tersambung).

## 4.15 Shell ke dalam container

Tombol **Shell** di tabel Containers dan di baris service tab Aplikasi (hanya untuk container yang
sedang berjalan, dan hanya kalau fitur ini dinyalakan) membuka drawer berisi terminal interaktif di
dalam container itu — `docker exec -it`, lewat browser. Ini pasangan terminal host (§4.5): xterm.js
di depan, WebSocket di tengah, exec API Docker di belakang (`internal/docker/exec.go`,
`internal/web/ws_container_shell.go`).

**Ini eskalasi hak akses, bukan fitur biasa.** Halaman Docker sampai sekarang bisa menghentikan dan
menghapus container tapi tidak menjalankan kode di dalamnya. Shell membuka itu untuk **setiap akun
dashboard**, dan untuk container yang me-mount `docker.sock` atau folder host (di host ini,
`watchtower` mem-mount socket) itu setara root di mesin. Karena itu levelnya sama dengan terminal
host, bukan level per-container:

- **Default mati, dan saat mati route-nya tidak ada** — request terautentikasi ke WebSocket dijawab
  **404**, bukan ditolak (diuji di server asli). Dinyalakan lewat toggle di Settings > "Shell
  Container": dialog menyatakan apa yang diberikan, meminta **password dashboard lagi** (403 kalau
  salah, config tidak berubah), mengedit **satu baris** `containerShell.enabled` di config.yaml
  (komentar terjaga; `docker.enabled` dan `terminal.enabled` tidak tersentuh — diuji), lalu server
  restart sendiri. Setelah restart sesi login hilang (sesi ada di memori) — sama dengan toggle Terminal.
  Saat aktif, log start memuat WARN tebal.
- **Batas sesi**: maksimal `containerShell.maxConcurrentSessions` (default 2) sesi bersamaan —
  yang ketiga menerima error terjemahan, bukan koneksi macet — dan **idle timeout**
  `containerShell.idleTimeoutMin` (default 15) tanpa lalu-lintas di kedua arah; ditutup dalam
  rentang batas..batas×1,25 (pemeriksaan tiap seperempat batas, maks. 15 dtk). Slot dilepas begitu
  keputusan menutup diambil, bukan setelah handshake close selesai — klien yang macet tidak bisa
  menahan slot (test khusus).
- **Audit**: `container shell opened/closed` — siapa, container mana, asal, lama, jumlah byte masuk/
  keluar, exit code. **Isi ketikan tidak pernah direkam.**
- **Asal**: pemeriksaan same-origin bawaan library WebSocket (mitigasi cross-site WebSocket hijacking):
  handshake dari origin lain dijawab **403** dan tidak membuat exec apa pun (diuji, juga di server asli).

Cara kerja dan keputusan teknis (semuanya diverifikasi terhadap Docker asli):

- **Exec + Upgrade**: `POST /containers/{id}/exec` (Tty, stdin/stdout terpasang) lalu `POST
  /exec/{id}/start` dengan `Connection: Upgrade` — koneksinya menjadi stream TTY mentah dua arah.
  Karena `net/http.Client` tidak menyerahkan soketnya kembali, request ditulis manual di koneksi unix
  baru (byte stream yang datang bersama jawaban 101 tidak boleh hilang — ada test).
- **Shell**: `sh -c 'command -v bash && exec bash || exec sh'` — bash kalau ada, kalau tidak sh;
  user default container (sering root), direktori kerja default; `TERM=xterm-256color`.
- **Container tanpa shell** (mis. distroless): Docker tetap menjawab 101 lalu stream berisi
  "OCI runtime exec failed: … executable file not found" dan exit code 127 — jadi kegagalan hanya
  bisa dikenali setelah stream berakhir (`Failure()` mensyaratkan **kedua** tanda itu, sehingga
  teks yang kebetulan diketik pengguna tidak dikira gagal-mulai). Teks mentah runtime **tidak**
  dilukis ke terminal; UI menampilkan pesan terjemahan "container ini tidak punya shell".
- **Ukuran terminal**: resize diteruskan ke pty (`h=rows&w=cols`). **Sengaja tidak** menyetel `COLUMNS`/
  `LINES` di environment: busybox dan ncurses memberi prioritas pada variabel itu di atas ukuran pty
  yang sebenarnya, jadi nilainya basi begitu terminal diubah ukurannya — ini ketahuan di container
  busybox sungguhan (`stty size` terus melaporkan ukuran awal) dan diperbaiki; kini ukuran di dalam
  container sama persis dengan xterm di browser (56×113 diuji di `sh`, `ash`, dan `bash`).
- **Protokol** sama dengan terminal host (frame biner = byte mentah; frame teks = kontrol JSON). Error
  dikirim sebagai **frame** (`{"type":"error","code":…}`), bukan handshake gagal, karena isi kegagalan
  upgrade WebSocket tidak pernah terlihat browser; `ready` dan `exit` (dengan exit code) juga frame.
- **Diuji**: 22 test baru (Docker palsu yang mendukung handshake Upgrade; klien WebSocket sungguhan
  terhadap handler — round trip, resize, exit code, error sebagai frame, batas sesi + pelepasan slot,
  klien macet, idle timeout beserta bahwa aktivitas menahannya, asal lintas-situs, route hanya ada saat
  aktif, toggle wajib password dan memicu restart, pengeditan config in-place) dicek dengan **21 mutasi**,
  semuanya tertangkap. Di **Docker asli** dengan container tiruan (busybox `sh`, `bash` dari image
  mariadb, alpine `ash`, satu tanpa shell — biner Go statis, satu yang berhenti): exit code, ukuran,
  user, container tanpa shell, container mati/tidak ada; **UI di Chromium headless** (toggle beserta
  password salah/benar dan restart lewat supervisor, tombol Shell hanya untuk container berjalan, mengetik
  perintah dan membaca keluaran xterm, exit, pesan tanpa-shell); dan di server asli: batas 2 sesi,
  idle timeout 1 menit (bertahan >60 dtk selama diketik, ditutup setelah menganggur), lintas-origin 403,
  tanpa cookie 303, mati→404. Container aslimu tidak dimasuki.
- **Batas jujur**: user selalu user default container (tidak bisa memilih user/direktori kerja);
  sesi tidak bisa dilanjutkan setelah koneksi putus (shell-nya ikut berakhir); tidak ada perekaman
  sesi; tidak ada pemisahan hak antar-akun dashboard (semua akun sama rata, lihat §7.1); dan jaringan/
  proxy yang memutus WebSocket idle bisa menutup sesi lebih cepat dari idle timeout.

## 4.16 Berbagi File (SMB dan FTP)

Halaman **Berbagi file** (`/sharing`, `internal/sharing`, `internal/web/handlers_sharing.go`) untuk
perangkat yang juga jadi NAS. **SMB** (Samba) dan **FTP** (vsftpd) dikelola penuh: folder yang
dibagikan, akun, layanan, dan seberapa aman koneksinya. TarOS adalah aplikasi publik, jadi halaman ini
harus masuk akal di setiap host, bukan hanya di Pi pengembangan (berlaku untuk keduanya):

| Keadaan host | Yang ditampilkan |
|---|---|
| Bukan Linux | "Tidak tersedia di sini" |
| Samba/vsftpd belum terpasang | Perintah pasang **sesuai distro** (`apt-get install -y samba` / `vsftpd`, `dnf …`, `apk add samba samba-common-tools`, `pacman -S samba`, `zypper …`; diawali `sudo` bila TarOS bukan root). TarOS **tidak memasang paket sendiri** |
| Terpasang, kosong | Ajakan "Biarkan TarOS mengelola Samba" |
| Terpasang dengan konfigurasi orang lain | Share yang sudah ada ditampilkan apa adanya (hanya-baca) + ajakan mengambil alih |
| Sudah dikelola TarOS | Tab **Folder** (share), **Akun**, kontrol layanan, pilihan jaringan |
| Bukan root / AD member atau DC / alat tak lengkap | Dibaca saja, dengan alasan yang tertulis (`not_root`, `not_standalone`, `no_tools`) |

Empat tab: **Ringkasan** (kondisi Samba/FTP, temuan keterpaparan, ambil alih/lepas Samba), **Folder**
(share SMB), **FTP**, **Akun**.

### Cara TarOS mengelola Samba — tanpa merusak yang sudah ada

- **Include blocks, bukan menulis ulang `smb.conf`.** Saat "ambil alih", TarOS hanya **menambah** dua
  blok bertanda `# >>> TarOS managed` … `# <<< TarOS managed`: satu `include = taros-global.conf` di
  ujung `[global]` (yang terakhir menang, jadi pilihan jaringan TarOS berlaku) dan satu `include =
  taros-shares.conf` di akhir file. Semua baris milik pengguna tidak disentuh. Salinan asli disimpan
  (`smb.conf.taros-original`, `.taros-bak`).
- **"Berhenti mengelola"** memulihkan `smb.conf` **byte demi byte** bila belum berubah sejak
  pengambilalihan; bila pengguna sudah mengeditnya, hanya blok TarOS yang dipotong. Folder data tidak
  pernah disentuh; akun buatan TarOS boleh ikut dihapus (opsional).
- **Perubahan transaksional.** Tiap perubahan: render → tulis kandidat → `testparm -s` pada **salinan**
  `smb.conf` yang menunjuk ke kandidat → **`verifyEffective`** (bandingkan konfigurasi hasil-resolusi
  dengan model: path, `valid users`, `write list`, guest, interfaces — karena `testparm` keluar 0 pada
  parameter tak dikenal) → tukar atomik → `testparm` akhir dengan rollback → `smbcontrol smbd
  reload-config` bila layanan berjalan. Konfigurasi yang ditolak Samba tidak pernah sampai ke file live.
- **Nama share bentrok** dengan share di luar TarOS ditolak; TarOS tidak pernah menimpa share milik orang lain.

### Akun

Akun share adalah **user sistem khusus tanpa login** (`useradd -M -N -d /nonexistent -g taros-share -s
nologin`; `adduser` busybox di Alpine) plus password Samba (`smbpasswd -a -s`, password lewat
**stdin**, tidak pernah lewat argumen). Password itu terpisah dari password dashboard. TarOS
**hanya menghapus user yang grup utamanya `taros-share`** dan tidak pernah mengadopsi user sistem yang
sudah ada (nama yang bentrok ditolak). Akun yang masih dipakai sebuah share tidak bisa dihapus (pesan
menyebut share-nya). Akun bisa dinonaktifkan tanpa password dashboard; mengaktifkan lagi butuh password.

### Share — aman secara default

`read only = yes`, `guest ok = no`, `valid users` = akun yang dipilih, `write list` = akun baca-tulis;
minimal satu akun per share (tidak ada akses tamu). File dibaca/ditulis sebagai **pemilik folder**
(`force user/group`); TarOS **tidak pernah `chown`/`chmod` data**. Folder milik root ditolak kecuali
pengguna memilih user biasa di "Lanjutan → dijalankan sebagai".

**Kebijakan folder** (`PathPolicy`): hanya di bawah `fileSharing.allowedRoots` (default `/srv`, `/mnt`,
`/media`, `/data`, `/DATA`), tidak di `fileSharing.deniedPaths` (default `/DATA/AppData`), dan **tidak
pernah** lokasi sistem yang di-hardcode (`/`, `/etc`, `/boot`, `/root`, `/proc`, `/sys`, `/dev`, `/run`,
`/usr`, `/bin`, `/sbin`, `/lib*`, `/var/lib`, `/var/log`, `/opt/taros`, `/snap`) — apa pun isi config.
Symlink di-resolve ke path nyata sebelum diperiksa; `.ssh`/`.gnupg`, `%` dan karakter kontrol ditolak.
Picker folder di UI hanya bisa menelusuri di dalam root yang diizinkan.

### FTP (vsftpd) — PR2

vsftpd **tidak punya `include`**, jadi TarOS menambahkan **satu blok bertanda di akhir
`vsftpd.conf`**: vsftpd membaca file dari atas ke bawah dan **baris terakhir menang** (diuji di
vsftpd 3.0.3), sehingga blok itu bisa menimpa tanpa satu baris pun di atasnya disentuh. Sisanya ada di
berkas milik TarOS di `/etc/vsftpd/` (`taros-users/<akun>`, `taros-chroot`, `taros-allowed`,
`taros-ftps.pem`) dan satu layanan PAM sendiri, `/etc/pam.d/taros-vsftpd`. "Berhenti mengelola"
memulihkan `vsftpd.conf` **byte demi byte** (bila belum diedit di luar blok) dan menghapus semuanya.

**Mengambil alih tidak mengubah siapa pun**: semua yang bisa login hari ini tetap bisa; akun TarOS
ditambahkan di sampingnya. Pengubahan akses (hanya akun TarOS, TLS wajib) adalah langkah terpisah dengan
pratinjau siapa yang akan terkunci — untuk Pi ini: perangkat yang mengunggah foto dengan akun `tarkiman`
tidak boleh terkunci sebelum dipindah ke akun TarOS dan FTPS.

- **Akun FTP = akun berbagi yang sama** (user sistem tanpa login) yang diberi **satu folder** + baca-saja
  atau baca-tulis. Password akun tetap satu: mengaturnya mengubah password Samba (bila dikelola) **dan**
  password Linux di balik FTP (`chpasswd` lewat stdin); tanpa akses FTP akun tidak punya password Linux
  (terkunci). Menonaktifkan/mencabut mengunci lagi (`passwd -l`; hash dipertahankan, jadi mengaktifkan
  kembali mengembalikan password yang sama). Mengganti password akun nonaktif tetap terkunci.
- **Padanan `force user`**: per akun, `guest_enable=YES` + `guest_username=<pemilik folder>` +
  `virtual_use_local_privs=YES` — login sebagai akun itu, file dibuat sebagai pemilik folder, tanpa
  `chown`/`chmod` apa pun; `local_root` = folder itu; `write_enable=NO` untuk baca-saja. Folder milik
  root ditolak kecuali dipilih user biasa. Kebijakan folder sama dengan SMB (`PathPolicy`).
- **Terkurung di folder** (diuji: `cd ..`, `../docs`, `/etc/passwd`, `%2e%2e` tidak lolos). vsftpd
  mengabaikan `chroot_local_user` per-user, jadi: bila host sudah mengurung semua user, tidak ada yang
  perlu; bila tidak, TarOS mengurung **hanya akunnya** lewat `chroot_list` (user lama tetap tak
  terkurung, seperti sebelumnya); bila admin punya daftar chroot sendiri (`chroot_custom`), TarOS menolak
  mengelola karena tidak mau mengedit berkas yang bukan miliknya.
- **PAM**: paket PAM standar memuat `pam_shells` yang menolak akun ber-shell `nologin` — yaitu semua akun
  berbagi. TarOS menurunkan `taros-vsftpd` dari PAM `vsftpd` milik distro dan menyisipkan tepat sebelum
  `pam_shells` "lewati baris berikutnya bila user di grup `taros-share`". Semua yang lain diperiksa persis
  seperti sebelumnya (diuji: user sistem `nologin` biasa tetap ditolak).
- **Opsi keamanan**: enkripsi FTPS **Ditawarkan** (FTP biasa tetap jalan) atau **Wajib** (teks biasa
  ditolak) dengan sertifikat self-signed buatan TarOS (RSA-2048, 10 tahun, satu PEM 0600); **hanya akun
  TarOS** (daftar izin `userlist_deny=NO`; pratinjau user perangkat yang akan terkunci; ditolak bila belum
  ada akun berakses FTP); matikan anonim; rentang port pasif. Bila host semula `local_enable=NO`, mengelola
  FTP otomatis disertai daftar izin agar user perangkat tetap tak bisa masuk.
- **Perubahan transaksional**: vsftpd tidak punya mode "cek konfigurasi" dan **menolak start pada opsi tak
  dikenal** (mis. `ssl_tlsv1_1` ada di 3.0.5 tapi tidak di 3.0.3), jadi kandidat konfigurasi **dijalankan
  sungguhan** sebentar di port loopback sendiri: masih hidup setelah masa tenggang = diterima; keluar =
  ditolak dan tidak ada yang berubah. Lalu tulis atomik, restart bila layanan berjalan (vsftpd tidak punya
  reload; transfer yang berjalan terputus sesaat — UI memberi tahu), dan bila layanan tidak naik lagi semua
  berkas dikembalikan lalu di-restart ke konfigurasi lama. Layanan yang berhenti tidak dinyalakan.
- **Tidak dikelola** bila: bukan root, `chpasswd`/`passwd`/`useradd|adduser` tak ada, tak ada
  `vsftpd.conf`, tak ada layanan PAM `vsftpd` (mis. Alpine bawaan), server FTP lain memegang port 21, atau
  `chroot_custom`. Alasannya tampil di UI.

### Temuan keterpaparan

Dihitung dari keadaan nyata, ditampilkan terurut menurut tingkat: FTP mengirim password tanpa enkripsi
dan mengizinkan akun perangkat login (**penting** bila layanan hidup), FTP anonim (+tulis), share tamu,
protokol SMB lama, layanan terjangkau dari jaringan lain (hanya overlay ZeroTier/Tailscale yang dihitung —
bridge Docker sengaja tidak), bentrok port, alat lain yang mengelola berbagi file (CasaOS, Cockpit…),
SELinux enforcing, dan ketiadaan firewall (sekali per host).

### API

`GET /api/sharing/status` (dan `/folders?path=`) hanya-baca, tanpa perlu root. Semua yang mengubah
sesuatu (`POST /api/sharing/smb/{adopt,unadopt,interfaces,service,shares}`, `…/shares/{name}/delete`,
`/ftp/{adopt,unadopt,settings,service}`, `/accounts…` termasuk `/accounts/{name}/ftp`) meminta **password dashboard lagi** (403 `wrong_password`). Pengecualian: menghentikan
layanan, menonaktifkan akun, dan mencabut akses FTP sebuah akun (hanya mengurangi keterpaparan). Kode error `sharing_*` diterjemahkan
(§4.10). Subcommand `taros sharing-status` mencetak laporan yang sama sebagai JSON.

### Diuji

- Unit dengan OS palsu (perintah, argumen, stdin, urutan) dan fixture nyata dari Pi serta image distro.
- **Samba sungguhan** (`TAROS_SHARING_IT=1`, biner uji statis di container sekali-pakai): Debian 12/13,
  Ubuntu 24.04, Fedora 41, Alpine 3.20 — adopt, akun, share, verifikasi lewat `smbclient`, unadopt
  byte-exact, koeksistensi dengan share/user milik orang lain.
- **Mutation testing** pada rangkaian ini (mutasi yang gagal-compile dianggap tidak valid); satu penyintas
  nyata (pemulihan byte-exact) ditutup test baru.
- **vsftpd sungguhan** (`TestIntegrationFTP`, curl sebagai klien): Debian 12 (vsftpd 3.0.3), Debian 13
  (3.0.5), Ubuntu 24.04, Fedora 41 — konfigurasi rusak ditolak tanpa mengubah apa pun; user lama tetap
  bisa login; user `nologin` biasa tetap ditolak; folder terlihat dan terkurung; unggahan dimiliki pemilik
  folder; akun baca-saja tidak bisa menulis; FTPS ditawarkan vs wajib; mode hanya-akun mengunci user
  perangkat; nonaktif/ganti password/cabut akses; unadopt memulihkan `vsftpd.conf` byte-exact.
- **Mutation testing** logika FTP: 32 mutasi valid, semua tertangkap (temuan: ganti password akun
  nonaktif akan diam-diam membuka kuncinya — kini dikunci lagi dan ada test; deteksi `chroot_custom` hanya
  tertutup oleh lapisan lain — kini punya test sendiri).
- UI di Chromium headless terhadap Samba sungguhan di container: ambil alih (password salah → ditolak),
  akun (validasi, bentrok dengan user sistem), share (picker, folder milik root → petunjuk Lanjutan,
  edit, hapus), akun-masih-dipakai, layanan tanpa systemd, unadopt + hapus akun (smb.conf pulih, user
  hilang), tampilan ponsel 390px, id/en, serta keadaan "belum terpasang" dan "bukan root". Di Pi asli
  hanya **dibaca** (tanpa root).

### Batas jujur

Samba yang dikelola hanya **standalone**; FTP hanya **vsftpd** (bukan proftpd/pure-ftpd); satu akun FTP =
satu folder; FTP tidak bisa diikat ke satu jaringan (vsftpd hanya bisa satu alamat — jaringan ZeroTier dan
LAN sama-sama terjangkau, dan itu yang diminta); sertifikat FTPS self-signed (klien meminta dipercaya
sekali); TarOS tidak memasang paket; perubahan butuh root; `/home` bukan root share default (tambahkan lewat
`fileSharing.allowedRoots`); di host tanpa systemd (container) layanan tidak bisa dijalankan dari UI;
ACL/quota per share dan akun tamu tidak ada.

## 4.17 Drive Eksternal (flashdisk, HDD, SSD USB)

Colok flashdisk/HDD/SSD USB ke perangkat yang menjalankan TarOS → dalam beberapa detik drive itu
ter-mount otomatis, muncul di **dashboard** (kartu "Drive eksternal" + daftar Storage), di **sidebar File
Explorer** ("Drive"), dan isinya langsung bisa dibuka. Ada tombol **Mount / Unmount / Eject**, pilihan
**"jangan auto-mount drive ini"**, dan di Settings > Drive eksternal: auto-mount dan `noexec`.
Kodenya di `internal/storage`, `internal/web/handlers_storage.go`, `UsbDevicesCard.vue`,
`DevicesSidebar.vue`, `StorageSettingsCard.vue`. Hanya Linux; mount butuh root (tanpa root drive hanya
dilistkan dengan alasannya).

### Aturan keselamatan

- **Hanya disk eksternal**: di bus USB (`TRAN=usb`) atau `removable=1`. Perhatikan: HDD/SSD USB punya
  `removable=0` di kernel, jadi bus-lah yang menentukan. NVMe/SATA internal tidak pernah disentuh
  (bisa ditambah lewat `storage.extraExternal`, mis. `mmcblk` untuk slot SD).
- **Tidak pernah** disk yang menampung `/`, `/boot`, `/usr`, `/var` atau swap (Pi yang boot dari SSD USB
  aman — diuji), **dan tidak pernah** drive yang ada di `/etc/fstab` (cocok lewat UUID/LABEL/PARTUUID/
  path/`/dev/disk/by-*`/mount point): tampil "Di fstab", hanya bisa dibuka; tidak bisa di-mount/
  unmount/eject dari sini. HDD 4TB di host ini (fstab) karenanya tidak berubah.
- **Permintaan hanya bisa menyebut drive yang TarOS sendiri daftarkan** sebagai eksternal: path
  divalidasi (`/dev/<nama>`), lalu dicari di hasil `lsblk` baru — `/dev/nvme0n1p2`, `/etc/shadow`, `..`
  ditolak tanpa satu perintah pun dijalankan (diuji).
- **Opsi mount aman**: `nosuid,nodev,noatime,noexec` (noexec bisa dimatikan di Settings), read-only
  otomatis untuk `iso9660`/`udf`. FAT/exFAT/NTFS dimiliki `storage.ownerUser` (bawaan: user biasa
  pertama, `uid`/`gid` + `umask=002`, seperti `fstab` Anda); ext4/xfs/btrfs memakai kepemilikan aslinya.
- **Tidak pernah mount di atas file orang**: titik mount hanya direktori kosong yang bukan mount point;
  direktori berisi dilewati (nama lain dipilih) atau ditolak.
- **Auto-mount menunggu satu putaran**: drive baru tidak disentuh saat pertama terlihat (udev belum
  selesai mengenali filesystem-nya), baru pada pengecekan berikutnya. Yang gagal di-mount **tidak dicoba
  ulang tiap detik** (diingat sampai dicabut-colok; tombol Mount mencoba lagi), dan drive yang **Anda
  unmount/eject sendiri tidak di-mount lagi** selama masih tercolok.
- **Menyalakan auto-mount atau mematikan noexec meminta password dashboard lagi** (403); arah yang lebih
  aman langsung berlaku. Mount/unmount/eject biasa cukup dengan sesi.

### Cara kerja

- **Deteksi murah**: tiap `storage.pollSeconds` (3 dtk) hanya membaca `/sys/block` (nama + `size`) dan
  `mountinfo`; `lsblk` baru dijalankan saat sidik jari itu berubah — mesin yang diam tidak mem-fork proses.
  `size` ikut sidik jari karena kartu yang dimasukkan ke card reader (atau image yang dipasang ke loop
  device) tidak menambah node device, hanya membuat node yang ada berhenti kosong (**bug nyata yang
  ketahuan di uji UI**).
- **Tanpa udev**: `lsblk` mengambil tipe/label/UUID dari database udev, yang kosong di host tanpa udev dan
  di detik-detik awal setelah dicolok. Volume yang tak dikenali di-probe dengan `blkid -p` (di-cache 20 dtk,
  hanya untuk disk eksternal; label di-unescape: `WIN\ BACKUP` → `WIN BACKUP`).
- **Titik mount stabil**: `<storage.mountBase>/<label>` (dibersihkan: hanya `A-Za-z0-9._-`, tanpa titik/
  strip di ujung, ≤32 karakter; label berbahaya seperti `../../etc` menjadi `etc`), bentrok → `<label>-<uuid8>`,
  tanpa label → `usb-<uuid8>`. Nama **diingat per-UUID** di `storage.yaml`, jadi drive yang sama selalu
  kembali ke path yang sama — share Samba/FTP dan bind mount container yang menunjuk ke dalamnya tetap
  valid setelah dicabut-colok. Default `mountBase` `/media/taros`; di host CasaOS-style pakai `/DATA/MOUNT`.
- **Volume kotor/hibernasi**: NTFS yang ditinggalkan Windows dalam "fast startup" ditolak ntfs-3g, tapi
  ia sendiri jatuh ke read-only dan hanya bilang di stderr — TarOS membaca stderr itu (diuji dengan
  ntfs-3g asli: file `hiberfil.sys` bertanda `hibr`) dan menampilkan alasan ("Windows meninggalkan volume
  ini hibernasi…"); bila mount rw gagal dengan pesan "dirty/unclean/hibernated" TarOS mencoba ulang `ro`.
  Tidak pernah dipaksa tulis. Perbaikan (`ntfsfix`/`fsck`) belum ada.
- **Tidak didukung, tapi dilistkan dengan alasan**: LUKS/BitLocker (terenkripsi), LVM, RAID, swap, ZFS,
  tanpa filesystem, filesystem tak dikenal.
- **Unmount yang sibuk ditolak dengan penyebabnya**: proses yang punya cwd/fd di dalam mount (dibaca dari
  `/proc`; diuji dengan `sleep` sungguhan) dan share Samba/folder FTP TarOS yang berada di dalamnya.
  Tidak pernah dipaksa (`umount -l` hanya untuk drive yang sudah hilang).
- **Eject** = unmount semua partisi (berhenti di yang sibuk, drive tidak dilepas) → `sync` → tulis `1` ke
  `/sys/block/<disk>/device/delete` (USB HDD berhenti berputar, aman dicabut). Bila node itu tak ada
  (loop device), tetap "aman dicabut" karena sudah di-unmount.
- **Dicabut tanpa eject**: mount yang tertinggal (sumbernya hilang) di bawah `mountBase` dilepas
  (`umount -l`) dan direktorinya dihapus, dengan log WARN dan event `removed_unsafely` — mount di luar
  `mountBase` tidak disentuh.

### API

`GET /api/storage/devices` (read-only), `POST /api/storage/{mount,unmount,eject,ignore,settings}`. Kode
error `storage_*` diterjemahkan (§4.10; `storage_busy` memuat siapa yang memakai). Subcommand
`taros storage-status` mencetak daftar drive tanpa mengubah apa pun.

### Diuji

- Unit dengan mesin palsu (lsblk/mount/umount/blkid + sysfs/mountinfo/proc/fstab di direktori
  sementara) dan **fixture lsblk asli dari Pi ini** (dianonimkan): 36 test dengan banyak kasus tiap — klasifikasi, disk
  sistem, fstab, nama, opsi per-filesystem, volume kotor, busy, eject, cabut tanpa eject, tanpa root,
  tanpa `lsblk`, format util-linux lama, dan lain-lain.
- **Mutation testing**: lihat catatan di `docs/10-roadmap.md`.
- **mount/umount/lsblk sungguhan** (`TestIntegrationStorage`, `TAROS_STORAGE_IT=1`) pada loop device
  vfat/exfat/ntfs/ext4 di kontainer sekali-pakai **tanpa disk asli di `/dev`** (tes menolak jalan bila
  ada `/dev/sd*`/`nvme*`): auto-mount 2 putaran, opsi `nosuid,nodev,noexec` benar-benar berlaku (program
  yang disalin ke drive **tidak bisa dijalankan**), kepemilikan uid, busy dengan proses `sleep` sungguhan,
  path yang sama setelah mount ulang, NTFS hibernasi dengan ntfs-3g asli → read-only + alasan, eject.
- UI di Chromium headless terhadap kontainer yang sama: colok/lepas, kartu dashboard, sidebar Files (klik
  membuka isi drive), Unmount/busy/Eject, "jangan auto-mount", toggle Settings (password salah/benar),
  tampilan ponsel 390px, id/en. Di Pi asli hanya **dibaca** (`taros storage-status`).

### Batas jujur

Hanya Linux; butuh root; tidak ada LUKS/BitLocker, perbaikan volume kotor, atau mount disk internal dari
UI; drive yang harus siap **sebelum** Docker/Samba start tetap paling benar lewat `fstab` (auto-mount TarOS
berjalan setelah TarOS start — persis kasus SMB race di host ini); eject USB fisik, hub bertenaga, dan
pencabutan tanpa eject baru teruji lewat simulasi (kernel ini tak punya emulator USB).
