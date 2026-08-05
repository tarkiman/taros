# 7. Keamanan

Aplikasi ini punya akses langsung ke filesystem sistem, Docker socket, dan systemd —
permukaan risikonya besar jika tidak dijaga. Bagian ini mendefinisikan pagar pengamannya.

## 7.1 Autentikasi & Session

- **Single admin user**, kredensial dikonfigurasi saat first-run (setup wizard sederhana
  di CLI: `taros setup` — set username & password) atau via `config.yaml` (password
  disimpan sebagai **bcrypt hash**, tidak pernah plaintext).
- Login via form → cek bcrypt → jika valid, buat session token random (32 byte,
  `crypto/rand`), simpan di map in-memory `token → session`, set sebagai **cookie
  HTTP-only, Secure (jika HTTPS aktif), SameSite=Strict**.
- Session expiry: default 24 jam idle timeout, diperpanjang tiap request valid (sliding expiration).
- **Rate limiting login**: maksimal N percobaan gagal (default 5) per IP per window (misal
  5 menit), lalu lockout sementara — mencegah brute-force sederhana. Disimpan in-memory
  (map IP → counter + timestamp), tidak butuh dependency eksternal.
- Semua route selain `/login` dan asset statis wajib melewati middleware auth.

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
- **Tidak berjalan sebagai root.** Proses jalan sebagai user sistem dedicated `taros`
  (dibuat saat instalasi), dengan hanya membership/permission yang benar-benar dibutuhkan.
- **Aksi destruktif Docker** (remove container/image/volume/network, semua bentuk prune —
  lihat [04-features.md](04-features.md) §4.2) mengikuti pola konfirmasi yang sama dengan
  file explorer: modal konfirmasi jelas (tegas untuk remove image/volume yang isinya besar,
  dan untuk tombol "Bersihkan semua"), dan **tercatat ke audit log** (§7.7) — bukan hanya
  start/stop/restart yang dicatat.

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
- **Bisa dimatikan total.** `terminal.enabled: false` di `config.yaml` menghapus fitur ini
  sepenuhnya dari routing (bukan cuma disembunyikan di UI) — direkomendasikan untuk instalasi
  yang perangkatnya ter-expose lebih luas dari LAN rumah (lihat juga §7.5 di atas soal
  rekomendasi network isolation, yang jadi makin penting kalau fitur ini aktif).
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
| Proses/PTY menumpuk (resource exhaustion) dari sesi terminal | Kill otomatis saat koneksi terputus, batas sesi konkuren |
| Kredensial dashboard bocor → akses root instan (kalau sudo NOPASSWD aktif) | Sudo tidak aktif default; mode "dengan password" direkomendasikan; NOPASSWD didokumentasikan eksplisit sebagai risiko tinggi, bukan default |
| Terminal langsung exit karena shell akun `taros` adalah `nologin` | `terminal.shell` di config wajib eksplisit (`/bin/bash`), tidak bergantung shell akun |
| Fitur update disalahgunakan untuk jalankan binary arbitrer | URL rilis hardcoded ke `github.com/tarkiman/taros`, tidak configurable; tetap butuh sesi terautentikasi + CSRF; `update.enabled` bisa dimatikan |

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
