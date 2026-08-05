#!/usr/bin/env bash
# Installer non-interaktif untuk TarOS — mengotomatisasi langkah wajib di
# docs/09-deployment.md §9.2 (user servis, binary, config, systemd unit).
# Langkah yang sengaja TIDAK diotomatisasi karena butuh keputusan sadar
# (akses fileExplorer.rootDir lintas-pemilik, mode sudo) tetap manual —
# lihat pesan di akhir script ini untuk link ke masing-masing.
#
# Pemakaian:
#   sudo ./scripts/install.sh [opsi]
#
# Opsi:
#   --binary <path>       Path ke binary taros yang sudah di-build. Default:
#                          cari ./taros di sebelah script ini, lalu di root
#                          repo, lalu dist/taros-<arch> sesuai `uname -m`.
#   --service-user <nama> User yang menjalankan servis (default: taros).
#   --no-create-user      Jangan buat user baru — pakai user yang sudah ada
#                          (Opsi B di §9.2 langkah 2, mis. user login utamamu
#                          sendiri di device pribadi). $SERVICE_USER harus
#                          sudah ada kalau opsi ini dipakai.
#   --docker-group        Tambahkan $SERVICE_USER ke group `docker` — lihat
#                          implikasi keamanannya di docs/07-security.md §7.4
#                          sebelum dipakai. Tidak aktif otomatis.
#   --listen <addr>       Alamat:port dashboard (default: 0.0.0.0:8090).
#   --root-dir <path>     fileExplorer.rootDir (default: /).
#   --skip-setup          Jangan jalankan `taros setup` di akhir — berguna
#                          untuk instalasi terskrip yang mau mengurus
#                          kredensial admin terpisah.
#   --force-setup         Jalankan `taros setup` walau credentials.yaml
#                          sudah ada (biasanya berarti reset password admin).
#   -h, --help             Tampilkan ini.
#
# Idempoten: aman dijalankan ulang — user/config/kredensial yang sudah ada
# tidak ditimpa diam-diam (kecuali --force-setup untuk kredensial). Ini juga
# jalur update: menjalankan ulang (mis. lewat quick-install.sh) dengan
# binary lebih baru akan menggantikan /usr/local/bin/taros dan me-restart
# servisnya supaya benar-benar jalan di versi baru — bukan cuma mengganti
# file di disk sementara proses lama tetap jalan.

set -euo pipefail

SERVICE_USER="taros"
CREATE_USER=1
DOCKER_GROUP=0
LISTEN_ADDR="0.0.0.0:8090"
ROOT_DIR="/"
BINARY_PATH=""
SKIP_SETUP=0
FORCE_SETUP=0

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
# Two valid layouts: a full repo checkout (this script lives at
# scripts/install.sh, deploy/ is one level up) or a flat release tarball
# (this script and deploy/ sit side by side — see .github/workflows/release.yml
# and scripts/quick-install.sh, which downloads exactly that layout).
if [[ -d "$SCRIPT_DIR/deploy" ]]; then
  REPO_DIR="$SCRIPT_DIR"
else
  REPO_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"
fi

usage() {
  sed -n '2,29p' "${BASH_SOURCE[0]}" | sed 's/^# \{0,1\}//'
}

log() {
  echo "==> $*"
}

die() {
  echo "ERROR: $*" >&2
  exit 1
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    --binary) BINARY_PATH="$2"; shift 2 ;;
    --service-user) SERVICE_USER="$2"; shift 2 ;;
    --no-create-user) CREATE_USER=0; shift ;;
    --docker-group) DOCKER_GROUP=1; shift ;;
    --listen) LISTEN_ADDR="$2"; shift 2 ;;
    --root-dir) ROOT_DIR="$2"; shift 2 ;;
    --skip-setup) SKIP_SETUP=1; shift ;;
    --force-setup) FORCE_SETUP=1; shift ;;
    -h|--help) usage; exit 0 ;;
    *) die "opsi tidak dikenal: $1 (coba --help)" ;;
  esac
done

[[ $EUID -eq 0 ]] || die "harus dijalankan sebagai root (sudo ./scripts/install.sh ...)"

# --- 1. Cari binary ---
if [[ -z "$BINARY_PATH" ]]; then
  if [[ -x "$SCRIPT_DIR/taros" ]]; then
    BINARY_PATH="$SCRIPT_DIR/taros"
  elif [[ -x "$REPO_DIR/taros" ]]; then
    BINARY_PATH="$REPO_DIR/taros"
  else
    case "$(uname -m)" in
      aarch64) BINARY_PATH="$REPO_DIR/dist/taros-arm64" ;;
      armv7l) BINARY_PATH="$REPO_DIR/dist/taros-armv7" ;;
    esac
  fi
fi
[[ -n "$BINARY_PATH" && -f "$BINARY_PATH" ]] || die "binary taros tidak ditemukan — build dulu (docs/09-deployment.md §9.1) lalu pakai --binary <path>"
log "Pakai binary: $BINARY_PATH"

# --- 2. User servis ---
if [[ "$CREATE_USER" -eq 1 ]]; then
  if id "$SERVICE_USER" &>/dev/null; then
    log "User '$SERVICE_USER' sudah ada, lewati pembuatan"
  else
    log "Membuat user servis '$SERVICE_USER' (sistem, tanpa login interaktif)"
    useradd --system --no-create-home --shell /usr/sbin/nologin "$SERVICE_USER"
  fi
else
  id "$SERVICE_USER" &>/dev/null || die "--no-create-user dipakai tapi user '$SERVICE_USER' tidak ditemukan"
  log "Pakai user yang sudah ada: '$SERVICE_USER'"
fi

# --- 3. Group docker (opsional) ---
if [[ "$DOCKER_GROUP" -eq 1 ]]; then
  if getent group docker >/dev/null; then
    log "Menambahkan '$SERVICE_USER' ke group docker"
    usermod -aG docker "$SERVICE_USER"
  else
    log "PERINGATAN: group 'docker' tidak ditemukan, lewati --docker-group (Docker belum terpasang?)"
  fi
fi

# --- 4. Install binary ---
# Lives in its own directory, not directly in the shared /usr/local/bin —
# the in-app self-update feature (internal/selfupdate) needs to create a
# temp file and rename it over the running binary, and *that* needs write
# access to the containing directory itself, not just the binary file
# (file ownership alone doesn't grant it — verified directly, not assumed).
# Granting the service user write access to the whole shared bin directory
# would be a much bigger privilege grant than intended, so instead it gets
# a small dedicated directory it fully owns, with a symlink from
# /usr/local/bin for normal CLI use (`taros setup`, etc.) to keep working
# unchanged. See docs/09-deployment.md §9.5 and docs/07-security.md.
BIN_DIR=/opt/taros
OLD_VERSION=""
[[ -x "$BIN_DIR/taros" ]] && OLD_VERSION="$("$BIN_DIR/taros" version 2>/dev/null | awk '{print $2}')"
log "Copy binary ke $BIN_DIR/taros"
mkdir -p "$BIN_DIR"
install -m 0755 "$BINARY_PATH" "$BIN_DIR/taros"
chown -R "$SERVICE_USER" "$BIN_DIR"
ln -sf "$BIN_DIR/taros" /usr/local/bin/taros
NEW_VERSION="$("$BIN_DIR/taros" version 2>/dev/null | awk '{print $2}')"

# --- 5. Config ---
mkdir -p /etc/taros
if [[ -f /etc/taros/config.yaml ]]; then
  log "/etc/taros/config.yaml sudah ada, tidak ditimpa — edit manual kalau perlu"
else
  log "Membuat /etc/taros/config.yaml dari template"
  cp "$REPO_DIR/deploy/config.example.yaml" /etc/taros/config.yaml
  sed -i "s|^  listen:.*|  listen: \"$LISTEN_ADDR\"|" /etc/taros/config.yaml
  sed -i "s|^  rootDir:.*|  rootDir: \"$ROOT_DIR\"|" /etc/taros/config.yaml
fi
chmod 0644 /etc/taros/config.yaml

# --- 6. Systemd unit ---
log "Memasang systemd unit (/etc/systemd/system/taros.service)"
sed -e "s/^User=.*/User=$SERVICE_USER/" -e "s/^Group=.*/Group=$SERVICE_USER/" \
  "$REPO_DIR/deploy/systemd/taros.service" > /etc/systemd/system/taros.service
systemctl daemon-reload

# --- 7. Kredensial admin ---
CREDS_FILE="/etc/taros/credentials.yaml"
if [[ -f "$CREDS_FILE" && "$FORCE_SETUP" -eq 0 ]]; then
  log "Kredensial admin sudah ada ($CREDS_FILE) — lewati taros setup (pakai --force-setup untuk reset)"
elif [[ "$SKIP_SETUP" -eq 1 ]]; then
  log "Lewati taros setup (--skip-setup) — jalankan manual sebelum start:"
  log "    sudo /usr/local/bin/taros setup --config /etc/taros/config.yaml"
else
  log "Membuat admin pertama — ikuti prompt di bawah:"
  /usr/local/bin/taros setup --config /etc/taros/config.yaml
fi
if [[ -f "$CREDS_FILE" ]]; then
  chown "$SERVICE_USER:$SERVICE_USER" "$CREDS_FILE"
  chmod 0600 "$CREDS_FILE"
fi

# --- 8. Aktifkan servis ---
# `enable --now` only *starts* the unit — a no-op if it's already active,
# which means a re-run of this script (e.g. via quick-install.sh to pick
# up a newer release) would copy the new binary to disk but leave the
# already-running old process untouched indefinitely. `restart` actually
# reloads the new binary either way: on a fresh install there's nothing
# running yet, so it behaves exactly like start.
log "Mengaktifkan servis taros"
systemctl enable --quiet taros
log "Merestart servis taros (memuat binary baru kalau ini update)"
systemctl restart taros

if [[ -n "$OLD_VERSION" && "$OLD_VERSION" != "$NEW_VERSION" ]]; then
  log "Diupdate: $OLD_VERSION -> $NEW_VERSION"
elif [[ -n "$OLD_VERSION" ]]; then
  log "Sudah di versi $NEW_VERSION, tidak ada perubahan versi"
fi

log ""
log "Selesai. Cek status: systemctl status taros"
log "Dashboard: http://<alamat-perangkat>:${LISTEN_ADDR##*:}"
log ""
log "Langkah opsional yang SENGAJA tidak dijalankan otomatis (baca implikasinya dulu):"
if [[ "$DOCKER_GROUP" -ne 1 ]]; then
  log "  - Group docker (TANPA ini, menu Docker di dashboard akan gagal dengan"
  log "    'permission denied' walau docker.enabled aktif secara default) — jalankan ulang"
  log "    installer ini dengan --docker-group, lihat implikasi keamanannya dulu"
  log "    -> docs/07-security.md §7.4"
fi
log "  - Akses baca/tulis fileExplorer.rootDir kalau isinya dimiliki user/servis lain"
log "    -> docs/09-deployment.md §9.2 langkah 5"
log "  - Mode sudo (untuk sudo di web terminal / tombol aksi Service)"
log "    -> docs/09-deployment.md §9.2 langkah 8, docs/07-security.md §7.6"
