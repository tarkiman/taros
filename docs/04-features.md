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
  (env vars, mounted volumes, network terhubung) saat diklik, dan log viewer. Scope Fase 2
  difokuskan ke list + live stats + aksi dasar dulu.

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
- Upload file dari browser (drag & drop + tombol pilih file).
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
  video, atau audio membuka overlay pratinjau penuh layar di tempat (bukan pindah ke
  editor kode/binary-alert seperti file lain), dengan tombol unduh dan tutup, serta
  navigasi keyboard (`Esc` tutup).
  - **Gambar**: ditampilkan langsung, dengan navigasi sebelumnya/berikutnya (panah di layar
    + tombol panah kiri/kanan keyboard) di antara gambar lain dalam folder yang sama — mode
    galeri, bukan harus tutup-buka satu-satu.
  - **PDF**: dirender inline via `<iframe>` memakai viewer bawaan browser — endpoint
    download mendukung parameter `?inline=1` yang mengganti header `Content-Disposition`
    dari `attachment` ke `inline` khusus untuk kebutuhan ini (`<img>`/`<video>`/`<audio>`
    tidak terpengaruh header ini, cuma `<iframe>` yang butuh), dengan link "Buka di tab
    baru" sebagai fallback kalau browser tidak punya viewer PDF bawaan.
  - **Video & audio**: pakai [Plyr](https://plyr.io) (dipilih atas native `<video>`/`<audio>`
    supaya tampilan kontrol konsisten lintas browser dan bisa ditema persis warna aksen
    TarOS lewat CSS variable Plyr, bukan skin bawaan tiap browser), dibungkus dalam overlay
    bergaya "theater" gelap. Seek/scrub jalan langsung tanpa kerja tambahan di backend —
    `handleFilesDownload` sudah pakai `http.ServeFile` yang otomatis mendukung HTTP Range
    request.

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
- Ganti password admin, konfigurasi interval polling, root direktori file explorer, daftar
  unit systemd "terproteksi" — belum ada di halaman Settings ini, masih di
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
