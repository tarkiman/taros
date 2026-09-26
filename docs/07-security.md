# 7. Keamanan

Aplikasi ini punya akses langsung ke filesystem sistem, Docker socket, dan systemd —
permukaan risikonya besar jika tidak dijaga. Bagian ini mendefinisikan pagar pengamannya.

## 7.1 Autentikasi & Session

- **Multi-user, akses sama rata** (belum ada role-based access — dicatat sebagai ide lanjutan
  di [10-roadmap.md](10-roadmap.md)). Akun pertama dikonfigurasi saat first-run (`taros setup`
  — CLI, set username & password); akun berikutnya ditambah dari halaman Settings > Kelola
  Pengguna (`internal/web/handlers_users.go`), bukan lewat CLI (`taros setup` sekarang menolak
  jalan lagi kalau `credentials.yaml` sudah ada, persis supaya tidak diam-diam menghapus akun
  orang lain — dulu, waktu masih single-user, menjalankan ulang `taros setup` memang meng-reset
  satu-satunya akun; sekarang itu terlalu berbahaya). Semua password disimpan sebagai
  **bcrypt hash**, tidak pernah plaintext, di file yang sama (`credentials.yaml`, satu daftar
  akun, bukan lagi satu akun flat — `internal/auth/credentials.go` migrasi format lama secara
  otomatis & transparan saat file pertama kali dibaca, tidak perlu langkah manual).
- **Tambah/hapus akun butuh re-konfirmasi password akun yang sedang login** — pola sama dengan
  toggle Terminal/Port/nonaktifkan TOTP. Dua guard tambahan: tidak bisa menghapus akun sendiri
  yang sedang login (hindari lockout tengah sesi), dan tidak bisa menghapus akun terakhir yang
  tersisa (hindari instance tanpa akun sama sekali). `Verify(username, password)` tetap
  menjalankan bcrypt compare (ke hash dummy) meski username tidak ditemukan — anti-enumeration
  yang sama seperti versi single-user, cuma sekarang berlaku untuk N akun, bukan 1.
- **Ganti/reset password**: password saat ini (atau milik yang meminta) dicek ulang dengan **rate limiter
  login yang sama** — sesi yang dibajak tidak boleh menjadi jalan menebak password, karena password
  adalah satu-satunya hal yang bertahan lebih lama dari sesi. Setelah penggantian **semua sesi lain akun
  itu dikeluarkan** (`SessionStore.DeleteUserSessions`), dan begitu pula saat akun dihapus — sesi disimpan
  di memori dan tidak dicek ulang terhadap daftar akun, jadi tanpa ini akun yang dihapus atau di-reset
  tetap login sampai idle timeout. Panjang password dibatasi 8–72 byte (bcrypt menolak >72; sebelumnya
  password lebih panjang saat membuat akun gagal dengan error 500 yang tidak jelas). Password tidak
  pernah masuk log atau respons. `taros passwd` menulis hash langsung ke `credentials.yaml` (0600) dan
  hanya bisa dijalankan oleh orang yang sudah punya akses shell ke host. Tidak ada reset lewat email
  atau tautan — sengaja: TarOS tidak punya jalur keluar itu, dan jalur pemulihan seperti itu adalah
  celah.
- Login via form → cek bcrypt → jika valid, buat session token random (32 byte,
  `crypto/rand`), simpan di map in-memory `token → session`, set sebagai **cookie
  HTTP-only, Secure (jika HTTPS aktif), SameSite=Strict**.
- Session expiry: default 24 jam idle timeout, diperpanjang tiap request valid (sliding expiration).
- **Rate limiting login**: maksimal N percobaan gagal (default 5) per IP per window (misal
  5 menit), lalu lockout sementara — mencegah brute-force sederhana. Disimpan in-memory
  (map IP → counter + timestamp), tidak butuh dependency eksternal.
- Semua route selain `/login` dan asset statis wajib melewati middleware auth.
- **TOTP (2FA), opsional** (`internal/auth/totp.go`, [04-features.md](04-features.md) §4.7)
  — nonaktif secara default, diaktifkan sadar dari halaman Pengaturan, bukan default
  diam-diam (pola yang sama dengan grup docker/mode root/Terminal di sepanjang dokumen ini).
  - **Implementasi RFC 6238 langsung dari Go stdlib** (`crypto/hmac`, `crypto/sha1`,
    `crypto/subtle` untuk perbandingan constant-time), bukan library pihak ketiga —
    algoritmanya kecil, stabil, dan presisi terspesifikasi (beda dengan misalnya framing
    WebSocket, yang di proyek ini justru pakai library — lihat `internal/web/ws_terminal.go`
    — karena di situ risiko salah implementasi sendiri jauh lebih tinggi). Diverifikasi
    terhadap vector resmi RFC 6238 Appendix B **dan** disilangcek terhadap `pyotp`
    (implementasi independen populer) sebelum kode ini pernah menyentuh jalur login
    sungguhan — lihat riwayat di [10-roadmap.md](10-roadmap.md).
  - Secret di-generate saat setup tapi **belum disimpan** sampai user membuktikan sudah
    scan dengan benar (submit kode 6 digit yang valid) — mencegah kondisi "TOTP aktif tapi
    secret-nya tidak pernah benar-benar sampai ke aplikasi authenticator manapun", yang akan
    mengunci akses tanpa jalan keluar.
  - **10 kode cadangan** (bcrypt-hashed di `credentials.yaml`, sama seperti password) dibuat
    sekali saat konfirmasi, ditampilkan **satu kali** ke user, sekali pakai (dihapus dari
    penyimpanan begitu dipakai). Ini satu-satunya jalur recovery bawaan aplikasi kalau
    perangkat authenticator hilang — kalau kode cadangan **juga** habis/hilang, satu-satunya
    jalan tersisa adalah edit `credentials.yaml` langsung (hapus baris `totpSecret`/
    `totpBackupCodes`) lewat akses filesystem (SSH) ke perangkat, yang selalu tersedia tanpa
    perlu fitur tambahan apa pun karena filenya memang cuma YAML biasa.
  - **Menonaktifkan TOTP selalu minta password dashboard ulang** (`POST
    /api/settings/totp/disable`, status 403 khusus untuk password salah — bukan 401, dengan
    alasan yang sama seperti toggle Terminal: `api/client.ts` treat 401 apa pun sebagai
    "sesi habis" dan auto-redirect ke `/login`, yang salah untuk kasus ini) — ini
    aksi yang **mengurangi** keamanan, beda dari setup/konfirmasi yang cuma menambah.
  - Login dua langkah **stateless** — tidak ada token pending-auth di server. Request kedua
    (dengan `totpCode` terisi) mengirim ulang username+password yang sama persis, dicek
    ulang sebelum kode TOTP-nya — jadi tidak ada state tambahan yang perlu dijaga/di-cleanup
    di server antara langkah 1 dan 2.
  - Toggle aktif/nonaktifkan TOTP **tidak memengaruhi sesi yang sedang berjalan** — beda dari
    toggle Terminal (yang perlu restart servis karena route WS didaftarkan saat boot), status
    TOTP langsung berlaku di proses yang sama untuk login berikutnya, tanpa restart.

## 7.2 CSRF Protection

- Token CSRF di-generate per session, disisipkan sebagai hidden field di semua form SSR
  dan sebagai header (`X-CSRF-Token`) di request htmx/fetch (via `hx-headers` global config).
- Semua `POST/PUT/DELETE` divalidasi token-nya sebelum diproses.

## 7.3 File Explorer — Path Traversal & Batasan Akses

Ini area risiko paling tinggi — makanya `internal/fileexplorer/safepath.go` (tipe `Jail`)
dibangun & diuji **sebelum** kode lain di package ini boleh menyentuh filesystem sama sekali
(Fase 3a). Aturan wajib, semuanya diimplementasikan di satu tempat (`Jail.Resolve`) supaya
tidak ada jalur kode yang lupa memvalidasi:

- **Semua path input dari klien** (query param, body JSON) di-*resolve* ke absolute path
  (`filepath.Clean`), lalu divalidasi berada **di dalam root yang diizinkan**
  (`config.fileExplorer.rootDir`, default `/` tapi bisa dipersempit) via perbandingan
  `filepath.Rel` yang benar (bukan `strings.HasPrefix` naif — itu salah untuk kasus seperti
  root `/home` vs path `/homework`, beda direktori tapi match sebagai prefix string).
- Symlink yang keluar dari root ditolak. Karena path yang divalidasi **belum tentu ada**
  (perlu untuk create/rename-destination), resolusi symlink dilakukan best-effort: turun ke
  ancestor terdekat yang benar-benar ada, `filepath.EvalSymlinks` di situ, lalu sambung
  kembali bagian yang belum ada — bukan cuma `EvalSymlinks` langsung (yang akan error untuk
  path yang belum ada).
- **Daftar path terlarang** (blocklist tambahan meski root-nya `/`): default
  `/etc/shadow`, `/etc/shadow-`, `/etc/gshadow`, `/etc/gshadow-` (varian `-` adalah file
  backup dari `vipw`/`pwck`, sensitivitasnya sama — mudah terlewat kalau cuma daftar nama
  tanpa varian ini), `/proc`, `/sys` — dikonfigurasi di `config.yaml`, bisa ditambah user.
  **Direktori `.ssh` milik user manapun** ditangani **generik**, bukan lewat blocklist statis
  — `Jail` memeriksa apakah ada komponen path bernama `.ssh` di mana pun dalam path yang
  sudah di-resolve, jadi otomatis mencakup `/home/*/.ssh`, `/root/.ssh`, dst tanpa perlu tahu
  dulu semua kemungkinan home directory yang ada di sistem.
- **Entry blocklisted difilter dari listing, bukan cuma ditolak saat diklik.** Ditemukan
  langsung lewat testing manual terhadap `/etc` sungguhan: sebelum diperbaiki, `/etc/shadow`
  tetap muncul di tabel dengan tombol Unduh/Rename/Hapus yang terlihat aktif tapi akan gagal
  403 kalau diklik — aman (tidak ada kebocoran data), tapi UX yang membingungkan dan
  berpotensi menyembunyikan validasi yang sebenarnya benar. Sekarang tiap entry listing
  divalidasi lewat `Jail.Resolve` yang sama sebelum dikirim ke template.
- Upload (Fase 3b): validasi ukuran maksimal per file, dan **tidak** melakukan
  eksekusi/parsing otomatis terhadap file yang diupload.
- Rename: validasi **kedua** path (source & destination) dengan aturan yang sama — sudah
  diimplementasikan di Fase 3a (`fileexplorer.Rename` dipanggil setelah kedua path lolos
  `Jail.Resolve` secara terpisah).
- **Diuji langsung** (bukan cuma unit test terisolasi) terhadap skenario: path traversal
  (`../../../etc/passwd`), symlink yang sengaja dibuat mengarah keluar root, akses langsung
  ke `.ssh`, dan blocklist (termasuk untuk path yang belum ada di dalam direktori
  blocklisted) — semua tertolak dengan pesan jelas, dikonfirmasi lewat program uji terpisah
  sebelum kode ini dianggap aman untuk PR.
- Semua operasi tulis (`create`, `rename`, `move`, `delete`, `save editor`) **harus** dicatat
  ke audit log (lihat §7.7) — **catatan implementasi**: logging ini belum ditambahkan di
  Fase 3a, dicadangkan untuk Fase 3b/polish bersama fitur audit log yang lebih lengkap.

## 7.4 Docker & Systemd — Privilege

- Untuk akses Docker socket (`/var/run/docker.sock`), proses TarOS harus jadi anggota
  **group `docker`** (bukan berjalan sebagai root). Ini didokumentasikan jelas saat instalasi
  — catatan penting: keanggotaan grup `docker` secara efektif setara root (container bisa
  mount `/` host), jadi ini **trade-off yang disadari dan didokumentasikan**, bukan diam-diam.
- Untuk kontrol systemd (start/stop/restart unit) via D-Bus, dibutuhkan **PolicyKit (polkit)
  rule** yang mengizinkan user TarOS memanggil method tertentu di
  `org.freedesktop.systemd1.Manager` tanpa perlu jadi root penuh — lebih granular dibanding
  menjalankan seluruh proses sebagai root. Contoh rule polkit disediakan di
  `deploy/polkit/10-taros-systemd.rules` (lihat [09-deployment.md](09-deployment.md)).
- **Tidak berjalan sebagai root secara default.** Proses jalan sebagai user sistem dedicated
  `taros` (dibuat saat instalasi, Opsi A) atau user login yang sudah ada (Opsi B), dengan
  hanya membership/permission yang benar-benar dibutuhkan. Root **tersedia sebagai pilihan
  eksplisit** (Opsi C, `scripts/install.sh --root-mode`) — lihat poin CasaOS di bawah untuk
  kapan dan kenapa itu mungkin masuk akal, tapi ini bukan default dan tetap butuh persetujuan
  sadar (installer menanyakannya interaktif, sama pola dengan grup `docker` di atas).
- **Perbandingan langsung dengan CasaOS** (proyek yang jadi acuan/pembanding TarOS, lihat
  [10-roadmap.md](10-roadmap.md)) — dicek langsung ke source code mereka, bukan asumsi:
  unit systemd resmi mereka (`casaos.service`) **tidak punya baris `User=` sama sekali**
  (default systemd = root), dan script instalasi resmi mereka (`03-setup-casaos.sh`) **tidak
  ada logika `useradd`/`adduser` apa pun** — CasaOS tidak pernah mencoba drop privilege,
  seluruh backend-nya selalu jalan sebagai root, tanpa pilihan. ID kerentanan publik
  CVE-2024-24765 (di `casaos-userservice`, path filtering yang tidak ketat sehingga bisa
  dipakai akses file sembarangan + eskalasi ke root) adalah konsekuensi langsung dari
  arsitektur itu — bug yang di TarOS dengan Opsi A/B "cuma" berdampak ke lingkup user servis,
  di CasaOS otomatis berarti kompromise sistem penuh, karena prosesnya memang sudah root.
  Opsi C di TarOS memberi kemampuan yang sama (akses filesystem penuh, tanpa perlu ACL manual
  per-folder) untuk yang memang menginginkannya, tapi sebagai pilihan sadar per instalasi,
  bukan satu-satunya mode yang tersedia.
- **Aksi destruktif Docker** (remove container/image/volume/network, semua bentuk prune —
  lihat [04-features.md](04-features.md) §4.2) mengikuti pola konfirmasi yang sama dengan
  file explorer: modal konfirmasi jelas (tegas untuk remove image/volume yang isinya besar,
  dan untuk tombol "Bersihkan semua"), dan **tercatat ke audit log** (§7.7) — bukan hanya
  start/stop/restart yang dicatat.

### Environment variable container

Viewer env container (docs/04-features.md §4.2) menampilkan data paling sensitif yang pernah
disajikan TarOS — password DB, API key, token — kepada **semua akun** (multi-user, akses sama
rata, lihat §7.1). Mitigasinya berlapis: nilai yang tampak rahasia **ditahan di server** (tidak
pernah ada di respons default), membukanya butuh **re-konfirmasi password akun sendiri** (pola
yang sama dengan aksi sensitif lain), dan tiap pembukaan dicatat ke log (siapa, container mana,
berapa rahasia — tidak pernah nilainya). Catatan jujur: akses ke Docker socket dan File Explorer
(`.env` di folder project) sudah bisa membaca hal serupa, jadi ini bukan celah baru —
tujuannya mencegah kebocoran kebetulan (screenshot, screen-sharing, orang di belakang layar),
bukan menyekat pengguna yang memang berhak atas host ini.

### Uninstall aplikasi (compose project)

Aksi paling destruktif di area Docker (hapus semua container + network satu aplikasi, opsional
datanya), jadi bar-nya lebih tinggi dari aksi per-container: **password akun sendiri** (403,
bukan 401, sama seperti toggle sensitif lain) **dan** mengetik ulang nama aplikasi — keduanya
dicek di server, bukan hanya UI. Volume (data) dan image opt-in dan default-nya **tidak**
dihapus. Setiap percobaan tercatat di log: siapa, project apa, berapa container/network/
volume/image terhapus, berapa yang gagal, dan apakah opsi data/image dinyalakan (uninstall yang
ditolak juga dicatat, `WARN`). Ruang lingkupnya dibatasi label compose — resource `external`
atau milik project lain tidak masuk daftar, dan volume/image yang masih dipakai container di
luar project ditolak Docker sendiri (409), tidak di-force. Diakui jujur: siapa pun yang
memegang akun sudah bisa menghapus container satu per satu; ini bukan celah baru, hanya jalan
pintas yang diberi pagar yang setara.

### Shell container

Fitur ini memberi **setiap akun dashboard** kemampuan menjalankan perintah di dalam container mana
pun (docs/04-features.md §4.15) — kemampuan yang halaman Docker sebelumnya tidak punya (stop/hapus
tidak mengeksekusi apa pun). Untuk container yang me-mount `docker.sock` atau folder host itu setara
root di mesin; di host ini `watchtower` mem-mount socket. Levelnya sama dengan Terminal host, bukan
sama dengan aksi container biasa: **default mati dan route tidak terdaftar sama sekali** (404, bukan
403); dinyalakan hanya dengan re-konfirmasi password dashboard di dialog yang menyebut apa yang
diberikan, lalu restart; sesi dibatasi jumlahnya dan ditutup saat menganggur; handshake WebSocket
lintas-origin ditolak (403) tanpa membuat exec; tiap sesi tercatat (siapa, container, lama, jumlah
byte, exit code — **tidak pernah isi ketikan**). Risiko yang diterima dan diakui: akun dashboard mana
pun yang sudah login bisa masuk ke container mana pun selama fitur ini menyala, dan TarOS di host ini
berjalan sebagai root; tidak ada pemisahan hak antar-akun (§7.1) dan tidak ada perekaman sesi (lihat
§7.6 untuk alasannya). Jika ada akun yang tidak sepenuhnya dipercaya, jangan nyalakan.

### Manajemen Wi-Fi

Fitur ini menangani kredensial jaringan dan bisa memutus perangkat dari jaringan, jadi pagarnya
berlapis (rincian di docs/04-features.md §4.14): sambung/lupakan butuh **password dashboard lagi**
(403); password Wi-Fi **tidak pernah lewat argumen perintah** (terlihat di `ps`) — diserahkan ke
NetworkManager sebagai keyfile 0600 milik root lewat `O_EXCL`, tidak di-log, tidak dikembalikan API,
tidak ada di pesan error (diverifikasi: 0 kemunculan di 2.653 sampel proses saat uji nyata); input
divalidasi ketat (SSID ≤32 byte tanpa karakter kontrol, passphrase WPA 8–63 ASCII atau 64 hex) karena
nilainya ditulis ke file konfigurasi; tidak ada shell (`exec` dengan argumen terpisah); yang sedang
dipakai tidak bisa dilupakan dan hanya profil Wi-Fi mode infrastructure yang bisa dihapus lewat API;
scan segar dibatasi 1 per 8 dtk. Risiko yang tersisa dan diakui: fitur ini butuh TarOS berjalan sebagai
**root** (menulis ke folder konfigurasi NetworkManager) — perluasan hak akses yang sudah ada pada
instalasi seperti host ini, dan alasan kartunya menolak dengan pesan jelas untuk user biasa. Siapa pun
yang memegang akun dashboard dapat memindahkan Pi ke jaringan lain; rollback otomatis membatasi
akibat salah-ketik, bukan penyalahgunaan yang disengaja.

### Berbagi file (SMB)

Fitur ini membuka folder ke jaringan dan membuat login, jadi pagarnya berlapis (rincian di
docs/04-features.md §4.16): semua perubahan meminta **password dashboard lagi** (403; hanya
menghentikan layanan dan menonaktifkan akun yang tidak); password akun share **hanya lewat body
request dan stdin** `smbpasswd` — tidak pernah argumen perintah, log, respons API, atau pesan error
(`CmdError` memuat stderr/stdout, tidak pernah argumen); akun share adalah user **tanpa login**
(`nologin`, tanpa home) dengan grup khusus `taros-share`, dan TarOS hanya menghapus user dari grup itu;
share **deny-by-default** (`read only`, `guest ok = no`, `valid users`, tanpa akses tamu); folder
dibatasi ke akar yang diizinkan, lokasi sistem tak bisa dibagikan apa pun isi config, symlink di-resolve
sebelum diperiksa; `smb.conf` hanya **ditambah** blok bertanda dan tiap perubahan divalidasi `testparm`
+ pembandingan konfigurasi efektif sebelum menggantikan file live. Layanan default hanya mengikat
jaringan yang dipilih (bukan ZeroTier/Tailscale kecuali dicentang, dengan peringatan). Risiko yang
tersisa dan diakui: mengelola Samba butuh TarOS berjalan sebagai **root** (menulis `/etc/samba`,
membuat user sistem) — perluasan hak akses yang sama dengan fitur Wi-Fi; siapa pun yang memegang akun
dashboard dapat mempublikasikan folder di dalam akar yang diizinkan.

### Berbagi file (FTP)

Semua pagar SMB di atas berlaku (password dashboard lagi untuk tiap perubahan, tidak ada password di
argumen/log/respons, akun tanpa login, folder dibatasi akar yang diizinkan dan tak bisa keluar dari
lokasi sistem). Tambahan khusus FTP: akun terkurung di **satu folder** (`local_root` + chroot; diuji
tidak bisa keluar lewat `..`, path absolut, atau `%2e%2e`); file dibuat sebagai pemilik folder
(`guest_username`), izin tidak pernah diubah; password Linux di balik FTP hanya ada untuk akun berakses
FTP (dikunci saat dinonaktifkan/dicabut/unadopt); layanan PAM sendiri diturunkan dari PAM distro dan
hanya melonggarkan `pam_shells` untuk grup `taros-share` — user sistem `nologin` lain tetap ditolak
(diuji); konfigurasi yang tak mau di-start vsftpd tidak pernah menggantikan yang live; FTPS memakai
sertifikat self-signed yang kuncinya 0600 di `/etc/vsftpd/`. **Risiko yang tersisa dan diakui**: FTP
biasa mengirim password sebagai teks biasa — karena itu ada mode FTPS **Wajib** dan temuan peringatan
selama tidak diaktifkan; mengelola vsftpd butuh TarOS berjalan sebagai **root**; mengaktifkan
"hanya akun TarOS" mengunci user perangkat (UI menampilkan siapa sebelum diterapkan); restart vsftpd
memutus transfer yang berjalan.

### Drive eksternal (auto-mount)

Fitur ini menjalankan `mount`/`umount` sebagai root atas perangkat yang dicolok orang, jadi pagarnya
(rincian di docs/04-features.md §4.17): hanya disk **eksternal** (bus USB atau `removable`); tidak pernah
disk sistem (`/`, `/boot`, swap), tidak pernah drive di `/etc/fstab`; request hanya bisa menyebut drive yang
TarOS sendiri daftarkan (path divalidasi lalu dicocokkan ke `lsblk` baru — diuji dengan `/dev/nvme0n1p2`,
`/etc/shadow`, `..`, injeksi shell); opsi `nosuid,nodev,noatime,noexec` bawaan (program di drive tak bisa
dijalankan — diuji dengan mount asli); tidak pernah mount di atas direktori berisi file; nama titik mount
dibersihkan (label `../../etc` tak bisa keluar dari `mountBase`); unmount tidak pernah dipaksa;
menyalakan auto-mount atau mematikan noexec meminta **password dashboard lagi**. **Risiko yang tersisa dan
diakui**: me-mount filesystem dari media yang tak dipercaya mengekspos **parser filesystem kernel**
(bug di driver vfat/exfat/ntfs/ext4 bisa dieksploitasi lewat image berbahaya) — itu risiko setiap
auto-mount di OS mana pun, dan alasan auto-mount bisa dimatikan (Settings) atau per-drive ("jangan
auto-mount"); NTFS lewat ntfs-3g (FUSE, di ruang user). Drive dengan `setuid`/`dev` node tidak berfungsi
berkat `nosuid,nodev`. Butuh TarOS berjalan sebagai **root** (sama dengan Wi-Fi dan berbagi file).

### Riwayat boot

`boots.yaml` (docs/04-features.md §4.13) berisi `boot_id` kernel, waktu, suhu, dan persentase
CPU/RAM — bukan rahasia, jadi 0644 seperti `quick-links.yaml`, dan endpoint `GET
/api/system/boots` read-only di belakang sesi login. Yang perlu dicatat: `boot_id` adalah
pengenal mesin per-boot (tidak sensitif, tidak dikirim ke luar); pesan Discord "mati mendadak"
hanya memuat waktu dan pembacaan sensor, tanpa log atau path.

## 7.5 Jaringan

- Rekomendasi default: bind ke `0.0.0.0` port custom (misal `8090`), **tanpa TLS built-in**
  di versi awal — dokumentasi menyarankan akses lewat VPN (Tailscale/WireGuard) atau reverse
  proxy TLS (Caddy/nginx) jika diakses dari luar LAN. Alasan: implementasi TLS sendiri
  (manajemen sertifikat) menambah kompleksitas yang di luar fokus "monitoring service ringan";
  reverse proxy adalah pola standar yang sudah teruji.
- Opsi konfigurasi untuk bind ke `127.0.0.1` saja jika user memang mau selalu lewat reverse
  proxy lokal.

## 7.6 Web Terminal

Web terminal secara desain adalah **shell access lewat browser** — ini fitur dengan
permukaan risiko tertinggi di seluruh aplikasi, jadi diperlakukan dengan pagar berlapis.
Keputusan mendasar (privilege = user service `taros`, bukan root, bukan PAM) sudah dibahas
di [02-architecture.md](02-architecture.md) & [04-features.md](04-features.md) §4.5 —
bagian ini fokus ke kontrol keamanannya.

- **Tidak ada privilege escalation dari dalam aplikasi.** TarOS tidak pernah memanggil `sudo`,
  `su`, atau setuid apa pun untuk sesi terminal — shell yang di-spawn selalu punya uid/gid
  identik dengan proses TarOS. Kalau user secara sadar menambahkan sudoers rule untuk user
  `taros` di level OS, itu keputusan & risiko di luar aplikasi, bukan default TarOS.
- **Sudo di dalam terminal — trade-off yang harus dipilih sadar.** Karena banyak tugas admin
  (`apt`, kelola systemd unit di luar yang sudah diizinkan polkit, edit file di luar root file
  explorer, dst) memang butuh root, sudo untuk user `taros` **didukung tapi tidak aktif
  secara default** — harus disiapkan manual saat instalasi (lihat
  [09-deployment.md](09-deployment.md) §9.2 & [04-features.md](04-features.md) §4.5). Dua mode:
  - **Sudo dengan password** (direkomendasikan): butuh password sistem terpisah dari password
    dashboard. Ini artinya **kompromi kredensial dashboard saja belum otomatis = akses root** —
    penyerang juga perlu tahu password sistem `taros`. Tetap catat: begitu user sungguhan
    login lalu `sudo`, sesi itu bisa disalahgunakan sampai sudo timestamp expire (~15 menit)
    kalau device diambil alih di momen itu — trade-off yang sama seperti sudo di terminal biasa.
  - **Sudo NOPASSWD**: nol hambatan tambahan — **kompromi kredensial dashboard = akses root
    instan**, setara pilihan "root penuh" yang sebelumnya secara sadar tidak dipilih untuk
    privilege dasar terminal. Hanya masuk akal kalau device sudah terisolasi kuat secara jaringan
    (VPN-only, tidak pernah ter-expose ke internet) dan risikonya diterima penuh oleh user.
  - Kedua mode **tidak diaktifkan otomatis oleh installer** — perlu langkah eksplisit
    (`visudo`/file di `/etc/sudoers.d/`), supaya keputusan ini selalu sadar, bukan default
    diam-diam yang mengubah keseluruhan model ancaman aplikasi.
- **"Non-root" bukan berarti "tidak berbahaya".** User `taros` sendiri berpotensi punya akses
  luas: kalau `docker` group diaktifkan (§7.4 di atas), user itu **setara root** (bisa mount
  `/` host lewat container); kalau file explorer di-root ke `/`, shell ini juga bisa baca/tulis
  apa pun yang bisa diakses file explorer. Jangan anggap fitur ini "aman karena non-root" —
  perlakukan setara akses admin ke perangkat.
- **Autentikasi sama ketatnya dengan HTTP biasa.** Handshake WebSocket (`GET /api/terminal/ws`)
  divalidasi terhadap cookie session yang sama (harus login valid, belum expired) — tidak ada
  jalur pintas otentikasi khusus untuk WS.
- **Proteksi CSWSH (Cross-Site WebSocket Hijacking).** Cookie otomatis ikut terkirim browser
  saat WebSocket handshake same-origin, tapi berbeda dari form HTTP biasa, WebSocket **tidak**
  otomatis terlindungi oleh CSRF token konvensional — mitigasinya server **memvalidasi header
  `Origin`** pada request upgrade, menolak handshake yang originnya bukan host TarOS sendiri.
- **Satu sesi aktif pada satu waktu** (default, [§4.5](04-features.md)) — selain menjaga
  resource STB, ini juga membatasi blast radius (tidak ada banyak shell background berjalan
  tanpa sepengetahuan user).
- **Idle timeout** (default 15 menit) menutup sesi otomatis, mengurangi jendela waktu sesi
  yang lupa ditutup bisa disalahgunakan (mis. dari perangkat/tab yang ketinggalan login).
- **Tidak ada perekaman isi sesi (keystroke/output) secara default.** Yang dicatat ke audit
  log hanya metadata: waktu mulai/selesai sesi, source IP. Ini keputusan sadar, dua alasan:
  (1) merekam isi sesi penuh berarti berpotensi menyimpan password/secret yang diketik user
  di dalam sesi (mis. saat `ssh` ke server lain, atau `export TOKEN=...`) — risiko privasi/
  keamanan baru yang tidak sepadan untuk tool monitoring personal; (2) menambah kompleksitas
  storage & performa yang tidak dibutuhkan untuk kasus pakai ini. Kalau di masa depan
  dibutuhkan (misal untuk audit forensik), itu harus jadi fitur eksplisit **opt-in** dengan
  peringatan jelas ke user, bukan default diam-diam.
- **Cleanup proses terjamin.** Saat koneksi WebSocket terputus (tab ditutup, network putus,
  idle timeout, logout), proses shell & file descriptor PTY terkait di-`kill`/`Close()` di
  sisi server — mencegah proses menumpuk (resource leak) di perangkat 2GB RAM.
- **Kegagalan spawn PTY tercatat ke log**, bukan cuma dikembalikan sebagai body HTTP —
  penting karena kegagalan upgrade WebSocket **tidak pernah** membuat body respons-nya
  sampai ke browser (batasan WebSocket API, bukan sesuatu yang bisa diakali dari sisi
  klien), jadi `journalctl -u taros` adalah satu-satunya tempat error sungguhan (shell
  tidak ada, `exec` diblokir kebijakan sandbox/seccomp, limit fd/pid, dst) bisa terlihat.
  Penolakan handshake WebSocket (mis. `Origin` tidak cocok — biasanya CSWSH yang tertolak,
  tapi bisa juga reverse proxy yang salah konfigurasi menghapus header `Origin`) juga
  dicatat, bukan diam-diam.
- **Bisa dimatikan total.** `terminal.enabled: false` di `config.yaml` menghapus fitur ini
  sepenuhnya dari routing (bukan cuma disembunyikan di UI) — direkomendasikan untuk instalasi
  yang perangkatnya ter-expose lebih luas dari LAN rumah (lihat juga §7.5 di atas soal
  rekomendasi network isolation, yang jadi makin penting kalau fitur ini aktif).
- **Bisa diaktifkan/dinonaktifkan dari halaman Pengaturan** (`POST /api/settings/terminal`,
  [04-features.md](04-features.md) §4.7) — tanpa perlu SSH edit `config.yaml` manual.
  Sengaja **selalu** minta password dashboard dikonfirmasi ulang di request ini, terlepas
  dari sesi yang sedang login — status **403** (bukan 401) dipakai khusus untuk kasus
  password-salah supaya klien tidak keliru menganggap sesi itu sendiri sudah invalid dan
  auto-redirect ke `/login` (lihat `api/client.ts`, yang treat 401 apa pun sebagai "sesi
  habis"). Konsekuensinya: `config.yaml` harus writable oleh user servis (`scripts/
  install.sh` `chown` filenya, bukan cuma `chmod 0644` seperti sebelumnya) — trade-off yang
  sama seperti `/opt/taros/` untuk self-update (§7.9): proses bisa menulis file konfigurasinya
  sendiri, bukan lagi murni read-only dari sudut pandang proses yang berjalan. Perubahan
  ditulis dengan **line-level targeted edit** (`internal/config.SetTerminalEnabled`), bukan
  parse+re-marshal YAML penuh — `yaml.v3` tidak mempertahankan komentar saat round-trip, dan
  file konfigurasi di proyek ini sengaja ditulis dengan banyak komentar penjelasan
  (`deploy/config.example.yaml`) yang akan hilang kalau ditulis ulang dari struct Go.
- **Peringatan first-use di UI.** Saat pertama kali membuka halaman `/terminal`, tampilkan
  banner singkat yang menjelaskan bahwa ini adalah akses shell sungguhan ke perangkat — bukan
  demo/sandbox — supaya user sadar konsekuensinya (khususnya kalau berencana share akses
  dashboard ke orang lain).
- **Aksi service (systemd) memakai ulang privilege opt-in yang sama.** Aksi start/stop/
  restart/reload di halaman Service ([04-features.md](04-features.md) §4.3) dijalankan lewat
  `sudo -n systemctl ...` — kalau sudoers untuk user `taros` sudah disiapkan untuk web
  terminal (mode password atau NOPASSWD di atas), aksi service otomatis ikut berfungsi tanpa
  konfigurasi tambahan. Kalau user **tidak** mau memberi akses sudo seluas terminal, tersedia
  alternatif sudoers yang jauh lebih sempit — dibatasi ke binary `systemctl` saja, tidak bisa
  dipakai untuk apa pun selain start/stop/restart/reload unit — lihat
  [09-deployment.md](09-deployment.md) §9.2. Tanpa salah satu, monitoring/list service tetap
  jalan penuh (tidak butuh privilege), hanya tombol aksi yang akan gagal dengan pesan error
  jelas ("Interactive authentication required") — bukan diam-diam tidak berfungsi.

## 7.7 Audit Log

- Log terstruktur (`log/slog`, format JSON) untuk: login (sukses/gagal), semua operasi file
  explorer yang mengubah state, aksi Docker (start/stop/restart/remove container, remove
  image/volume/network, semua bentuk prune), aksi systemd (start/stop/restart/reload unit),
  perubahan settings, **sesi terminal (mulai/selesai saja, lihat §7.6)**.
- Ditulis ke stdout/stderr → ditangkap `journald` (standar systemd service) — tidak perlu
  TarOS mengelola file log sendiri (rotasi dsb sudah ditangani journald).

## 7.8 Ringkasan Ancaman & Mitigasi

| Ancaman | Mitigasi |
|---|---|
| Brute-force login | Rate limiting per-IP + bcrypt (lambat secara desain) |
| Path traversal file explorer | Normalisasi + validasi root + blocklist + cek symlink |
| CSRF (form/fetch HTTP) | Token per-session divalidasi di semua state-changing request |
| Cross-Site WebSocket Hijacking (terminal) | Validasi header `Origin` saat WS handshake + wajib session cookie valid |
| Session hijack | Cookie HTTP-only + Secure + SameSite=Strict, token random 256-bit |
| Privilege escalation via Docker group | Didokumentasikan sebagai trade-off eksplisit, bukan default diam-diam |
| Unit systemd kritikal ke-restart tidak sengaja | Daftar unit "terproteksi" butuh extra-confirm |
| File besar/berbahaya diupload lalu dieksekusi | Tidak ada eksekusi otomatis; batas ukuran; scoping direktori |
| Shell interaktif disalahgunakan kalau kredensial dashboard bocor | Non-root, idle timeout, 1 sesi konkuren, bisa di-disable total, rekomendasi network isolation |
| Folder sensitif (sistem, kunci SSH, data aplikasi) terpublikasi lewat SMB | Akar yang diizinkan + daftar tolak + lokasi sistem hardcode + resolusi symlink; share tanpa akses tamu; perubahan butuh password dashboard (§7.4 "Berbagi file") |
| Media USB berbahaya di-mount otomatis (image filesystem rusak, program di dalamnya) | Hanya disk eksternal, `nosuid,nodev,noexec`, auto-mount bisa dimatikan/per-drive, tidak pernah disk sistem/fstab; risiko parser filesystem kernel diakui (§7.4 "Drive eksternal") |
| Proses/PTY menumpuk (resource exhaustion) dari sesi terminal | Kill otomatis saat koneksi terputus, batas sesi konkuren |
| Kredensial dashboard bocor → akses root instan (kalau sudo NOPASSWD aktif) | Sudo tidak aktif default; mode "dengan password" direkomendasikan; NOPASSWD didokumentasikan eksplisit sebagai risiko tinggi, bukan default |
| Terminal langsung exit karena shell akun `taros` adalah `nologin` | `terminal.shell` di config wajib eksplisit (`/bin/bash`), tidak bergantung shell akun |
| Fitur update disalahgunakan untuk jalankan binary arbitrer | URL rilis hardcoded ke `github.com/tarkiman/taros`, tidak configurable; tetap butuh sesi terautentikasi + CSRF; `update.enabled` bisa dimatikan |
| Bug (path traversal, dsb) berdampak ke seluruh sistem, bukan cuma lingkup TarOS | Non-root tetap default (Opsi A/B); mode root (Opsi C, setara CasaOS) hanya lewat pilihan eksplisit saat instalasi, bukan default diam-diam |
| URL webhook Discord (secret) bocor lewat log/response error | Tidak pernah masuk `slog`/pesan error API (§7.10); file penyimpanannya 0600 dan git-ignored |
| SSRF lewat field URL webhook notifikasi | Domain divalidasi ketat ke `discord.com`/`discordapp.com`, bukan sekadar `url.Parse` (§7.10) |
| Log container yang mengandung secret ikut terkirim ke Discord lewat alert container | Melampirkan log **opt-in, default mati**, dengan peringatan di UI; tanpa opsi itu alert cuma memuat nama, exit code, dan restart policy — TarOS tidak pernah membaca log container kalau opsi mati |

## 7.9 Update Aplikasi

Lihat [04-features.md](04-features.md) §4.8 untuk UX-nya dan [09-deployment.md](09-deployment.md)
§9.5 untuk mekanisme teknis lengkap. Bagian ini fokus ke trade-off keamanannya.

- **Kenapa dianggap risiko lebih rendah dari web terminal**, walau sama-sama mengubah state
  aktif di device (jadi tetap butuh perhatian, bukan "aman total"): fitur ini tidak pernah
  membuka jalur eksekusi command/shell arbitrer. Satu-satunya aksi yang bisa dipicu adalah
  "unduh asset resmi dari `github.com/tarkiman/taros` (URL **hardcoded**, tidak bisa diarahkan
  ke tempat lain lewat config/API) lalu timpa binary sendiri" — permukaan serangannya jauh
  lebih sempit daripada shell interaktif penuh. Karena itu `update.enabled` default **true**
  (beda dari `terminal.enabled` yang default false).
- **Tetap butuh sesi dashboard yang sudah terautentikasi** (lewat `requireAuth`, sama seperti
  semua endpoint state-changing lain) + token CSRF — kredensial dashboard bocor tetap jadi
  prasyarat, bukan endpoint yang bisa dipicu tanpa login.
- **Tidak ada verifikasi checksum/signature terhadap asset rilis** — integritas unduhan
  disandarkan ke HTTPS (TLS) ke domain GitHub resmi, sama seperti model trust
  `scripts/quick-install.sh` yang sudah ada. Ini keputusan sadar untuk menghindari kompleksitas
  infrastruktur signing (GPG/cosign) yang tidak diminta — dicatat di sini sebagai batasan
  eksplisit, bukan diam-diam diasumsikan aman total.
- **Kenapa binary tidak lagi hidup langsung di `/usr/local/bin`**: mengganti file yang sedang
  berjalan butuh izin tulis ke *direktori* yang menampungnya, bukan cuma ke file itu sendiri
  (diverifikasi langsung, bukan diasumsikan — lihat riwayat di [10-roadmap.md](10-roadmap.md)).
  Memberi user servis izin tulis ke `/usr/local/bin` yang dipakai bersama banyak program lain
  di sistem adalah privilege jauh lebih luas daripada yang dibutuhkan. Sebagai gantinya, binary
  dipindah ke `/opt/taros/` — direktori kecil yang **seluruhnya** dimiliki user servis, jadi
  akses tulisnya tetap terbatas ke situ saja, tidak menyebar ke direktori sistem bersama.
  `/usr/local/bin/taros` jadi symlink saja, untuk pemakaian CLI manual (`taros setup`, dst)
  tetap seperti sebelumnya.
- **Restart otomatis via `systemd Restart=always`, bukan lewat `systemctl` yang butuh
  privilege** — proses cuma perlu keluar bersih (`exit(0)`) setelah mengganti binary; systemd
  yang menghidupkannya lagi. Tidak ada permintaan sudo/polkit sama sekali untuk alur ini,
  beda dari tombol aksi Docker/Service yang memang butuh privilege tambahan (§7.4).
- **Semua sesi login hilang setelah update** (bukan celah keamanan baru — konsekuensi dari
  session store in-memory, lihat [04-features.md](04-features.md) §4.8) — dikomunikasikan
  eksplisit di UI sebelum user menekan konfirmasi, bukan kejutan setelahnya.
