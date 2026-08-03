# 7. Keamanan

Aplikasi ini punya akses langsung ke filesystem sistem, Docker socket, dan systemd —
permukaan risikonya besar jika tidak dijaga. Bagian ini mendefinisikan pagar pengamannya.

## 7.1 Autentikasi & Session

- **Single admin user**, kredensial dikonfigurasi saat first-run (setup wizard sederhana
  di CLI: `tarkimanos setup` — set username & password) atau via `config.yaml` (password
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

Ini area risiko paling tinggi. Aturan wajib:

- **Semua path input dari klien** (query param, body JSON) di-*resolve* ke absolute path
  (`filepath.Abs` + `filepath.Clean`), lalu divalidasi berada **di dalam root yang diizinkan**
  (`config.fileExplorer.rootDir`, default `/` tapi bisa dipersempit).
- Tolak path yang mengandung symlink yang keluar dari root (`filepath.EvalSymlinks` lalu
  cek ulang prefix) — mencegah symlink dipakai untuk escape jail.
- **Daftar path terlarang** (blocklist tambahan meski root-nya `/`), default meliputi:
  `/etc/shadow`, `/etc/gshadow`, direktori `.ssh` milik user manapun, `/proc`, `/sys`
  (kecuali yang memang dibaca collector secara internal, bukan lewat file explorer) —
  dikonfigurasi di `config.yaml`, bisa ditambah user.
- Upload: validasi ukuran maksimal per file (default, misal 500MB, dikonfigurasi), dan
  **tidak** melakukan eksekusi/parsing otomatis terhadap file yang diupload.
- Rename/move/copy: validasi **kedua** path (source & destination) dengan aturan yang sama.
- Semua operasi tulis (`create`, `rename`, `move`, `delete`, `save editor`) **dicatat ke
  audit log** (lihat 7.6) dengan siapa (session user — meski single-user, tetap dicatat
  untuk jejak waktu), path, dan aksi.

## 7.4 Docker & Systemd — Privilege

- Untuk akses Docker socket (`/var/run/docker.sock`), proses TarkimanOS harus jadi anggota
  **group `docker`** (bukan berjalan sebagai root). Ini didokumentasikan jelas saat instalasi
  — catatan penting: keanggotaan grup `docker` secara efektif setara root (container bisa
  mount `/` host), jadi ini **trade-off yang disadari dan didokumentasikan**, bukan diam-diam.
- Untuk kontrol systemd (start/stop/restart unit) via D-Bus, dibutuhkan **PolicyKit (polkit)
  rule** yang mengizinkan user TarkimanOS memanggil method tertentu di
  `org.freedesktop.systemd1.Manager` tanpa perlu jadi root penuh — lebih granular dibanding
  menjalankan seluruh proses sebagai root. Contoh rule polkit disediakan di
  `deploy/polkit/10-tarkimanos-systemd.rules` (lihat [09-deployment.md](09-deployment.md)).
- **Tidak berjalan sebagai root.** Proses jalan sebagai user sistem dedicated `tarkimanos`
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
Keputusan mendasar (privilege = user service `tarkimanos`, bukan root, bukan PAM) sudah dibahas
di [02-architecture.md](02-architecture.md) & [04-features.md](04-features.md) §4.5 —
bagian ini fokus ke kontrol keamanannya.

- **Tidak ada privilege escalation dari dalam aplikasi.** TarkimanOS tidak pernah memanggil `sudo`,
  `su`, atau setuid apa pun untuk sesi terminal — shell yang di-spawn selalu punya uid/gid
  identik dengan proses TarkimanOS. Kalau user secara sadar menambahkan sudoers rule untuk user
  `tarkimanos` di level OS, itu keputusan & risiko di luar aplikasi, bukan default TarkimanOS.
- **Sudo di dalam terminal — trade-off yang harus dipilih sadar.** Karena banyak tugas admin
  (`apt`, kelola systemd unit di luar yang sudah diizinkan polkit, edit file di luar root file
  explorer, dst) memang butuh root, sudo untuk user `tarkimanos` **didukung tapi tidak aktif
  secara default** — harus disiapkan manual saat instalasi (lihat
  [09-deployment.md](09-deployment.md) §9.2 & [04-features.md](04-features.md) §4.5). Dua mode:
  - **Sudo dengan password** (direkomendasikan): butuh password sistem terpisah dari password
    dashboard. Ini artinya **kompromi kredensial dashboard saja belum otomatis = akses root** —
    penyerang juga perlu tahu password sistem `tarkimanos`. Tetap catat: begitu user sungguhan
    login lalu `sudo`, sesi itu bisa disalahgunakan sampai sudo timestamp expire (~15 menit)
    kalau device diambil alih di momen itu — trade-off yang sama seperti sudo di terminal biasa.
  - **Sudo NOPASSWD**: nol hambatan tambahan — **kompromi kredensial dashboard = akses root
    instan**, setara pilihan "root penuh" yang sebelumnya secara sadar tidak dipilih untuk
    privilege dasar terminal. Hanya masuk akal kalau device sudah terisolasi kuat secara jaringan
    (VPN-only, tidak pernah ter-expose ke internet) dan risikonya diterima penuh oleh user.
  - Kedua mode **tidak diaktifkan otomatis oleh installer** — perlu langkah eksplisit
    (`visudo`/file di `/etc/sudoers.d/`), supaya keputusan ini selalu sadar, bukan default
    diam-diam yang mengubah keseluruhan model ancaman aplikasi.
- **"Non-root" bukan berarti "tidak berbahaya".** User `tarkimanos` sendiri berpotensi punya akses
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
  `Origin`** pada request upgrade, menolak handshake yang originnya bukan host TarkimanOS sendiri.
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

## 7.7 Audit Log

- Log terstruktur (`log/slog`, format JSON) untuk: login (sukses/gagal), semua operasi file
  explorer yang mengubah state, aksi Docker (start/stop/restart/remove container, remove
  image/volume/network, semua bentuk prune), aksi systemd (start/stop/restart/reload unit),
  perubahan settings, **sesi terminal (mulai/selesai saja, lihat §7.6)**.
- Ditulis ke stdout/stderr → ditangkap `journald` (standar systemd service) — tidak perlu
  TarkimanOS mengelola file log sendiri (rotasi dsb sudah ditangani journald).

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
| Terminal langsung exit karena shell akun `tarkimanos` adalah `nologin` | `terminal.shell` di config wajib eksplisit (`/bin/bash`), tidak bergantung shell akun |
