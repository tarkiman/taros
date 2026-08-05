# TarOS

Dashboard monitoring & manajemen ringan untuk Raspberry Pi dan Android STB — satu binary Go,
tanpa database, dibuat khusus supaya muat nyaman di perangkat 2GB RAM. Dibangun sebagai
pengganti [CasaOS](https://casaos.io) yang terasa berat untuk perangkat sekecil itu — lihat
[docs/01-overview.md](docs/01-overview.md) untuk latar belakangnya.

Docker (list, stats, start/stop/restart), service systemd, file explorer, editor kode, web
terminal, dan monitoring CPU/RAM/disk/suhu/jaringan real-time — semuanya lewat browser, tanpa
perlu SSH untuk pekerjaan sehari-hari.

## Instalasi cepat

Butuh Linux ARM64 atau ARMv7 (Raspberry Pi, STB Android berbasis Amlogic/Rockchip, dll).
**Tidak perlu Go, Node, atau alat build apa pun** di perangkat target — script di bawah
mengunduh binary yang sudah jadi:

```bash
curl -sSL https://raw.githubusercontent.com/tarkiman/taros/main/scripts/quick-install.sh | sudo bash
```

Sudah root (umum di image STB minimal)? Jalankan tanpa `sudo` di depan `bash` — script akan
sudo-kan sendiri langkah yang perlu kalau tersedia.

Mau atur user servis, port, atau opsi lain saat instalasi? Teruskan lewat `--`:

```bash
curl -sSL https://raw.githubusercontent.com/tarkiman/taros/main/scripts/quick-install.sh | bash -s -- --service-user pi --no-create-user
```

Setelah selesai, buka `http://<alamat-perangkat>:8090` dan login dengan admin yang baru dibuat.

Detail lengkap opsi instalasi, mode sudo opsional, dan cara build dari source (kalau
arsitektur perangkatmu bukan ARM64/ARMv7, atau memang mau build sendiri) ada di
[docs/09-deployment.md](docs/09-deployment.md).

## Dokumentasi

Dokumentasi teknis lengkap — arsitektur, spesifikasi fitur, keamanan, roadmap — ada di
[docs/](docs/), dimulai dari [docs/README.md](docs/README.md).

## Development

```bash
go build -o taros ./cmd/taros      # backend
cd web/frontend && npm install && npm run build   # frontend Vue (hasil di-commit & di-embed)
```

Lihat [docs/03-tech-stack.md](docs/03-tech-stack.md) untuk alasan di balik pilihan teknologi
(kenapa Go stdlib tanpa framework, kenapa baca `/proc`/`/sys` langsung alih-alih `gopsutil`,
dll) dan [docs/08-project-structure.md](docs/08-project-structure.md) untuk peta struktur kode.
