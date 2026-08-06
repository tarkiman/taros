#!/usr/bin/env bash
# One-line installer: downloads a prebuilt TarOS release for this device's
# architecture and runs scripts/install.sh — no Go, no Node/npm, no build
# step needed on the target device. See docs/09-deployment.md §9.2.
#
# Pemakaian:
#   curl -sSL https://raw.githubusercontent.com/tarkiman/taros/main/scripts/quick-install.sh | bash
#
# Argumen tambahan untuk install.sh (lihat install.sh --help) diteruskan
# lewat "--" setelah nama script, standar pola curl-pipe-ke-shell:
#   curl -sSL .../quick-install.sh | bash -s -- --service-user pi --no-create-user
#
# Kalau sudah root (umum di image minimal STB), jalankan langsung tanpa
# `sudo` di depan `bash` — script ini yang akan sudo-kan langkah instalasi
# sendiri kalau perlu & tersedia.

set -euo pipefail

REPO="tarkiman/taros"
API_URL="https://api.github.com/repos/${REPO}/releases/latest"

log() { echo "==> $*"; }
die() { echo "ERROR: $*" >&2; exit 1; }

command -v curl >/dev/null || die "butuh 'curl' (belum terpasang) — install dulu (mis. apt install curl) atau build manual sesuai docs/09-deployment.md §9.1"
command -v tar >/dev/null || die "butuh 'tar' (belum terpasang)"

OS_NAME="$(uname -s)"
IS_DARWIN=0
case "$OS_NAME" in
  Linux) ;;
  Darwin) IS_DARWIN=1 ;;
  *) die "cuma mendukung Linux dan macOS — bukan $OS_NAME" ;;
esac

if [[ "$IS_DARWIN" -eq 1 ]]; then
  # macOS: Docker/Files/Terminal jalan penuh, Dashboard/Proses/Service
  # gracefully lapor "tidak didukung" (baca /proc + systemd, Linux-only)
  # — lihat docs/09-deployment.md §9.2 "macOS". Tidak ada install.sh untuk
  # OS ini (itu mengasumsikan systemd/useradd) — paket rilisnya cuma
  # binary + config contoh, dijalankan manual di bawah, jadi jalur ini
  # sama sekali tidak butuh sudo/root.
  case "$(uname -m)" in
    arm64) ARCH="darwin-arm64" ;;
    x86_64) ARCH="darwin-amd64" ;;
    *) die "arsitektur '$(uname -m)' tidak punya binary siap pakai untuk macOS — build manual sesuai docs/09-deployment.md §9.1" ;;
  esac
else
  case "$(uname -m)" in
    aarch64|arm64) ARCH="arm64" ;;
    armv7l|armv6l) ARCH="armv7" ;;
    # Bukan target device utama TarOS (STB/Raspberry Pi), tapi dibuild juga
    # supaya bisa dicoba di WSL2/Linux x86 biasa — lihat docs/09-deployment.md
    # §9.1 dan §9.2 "WSL2 (Windows)".
    x86_64) ARCH="amd64" ;;
    *) die "arsitektur '$(uname -m)' tidak punya binary siap pakai — build manual sesuai docs/09-deployment.md §9.1 (cross-compile) lalu pakai scripts/install.sh --binary <path>" ;;
  esac
fi
log "Arsitektur terdeteksi: $ARCH"

if [[ "$IS_DARWIN" -eq 0 ]] && grep -qi microsoft /proc/version 2>/dev/null; then
  log "WSL terdeteksi — lihat docs/09-deployment.md §9.2 'WSL2 (Windows)' soal requirement systemd."
fi

log "Mencari rilis terbaru..."
RELEASE_JSON="$(curl -sSL "$API_URL")"
DOWNLOAD_URL="$(echo "$RELEASE_JSON" | grep -o "\"browser_download_url\": *\"[^\"]*taros-[^\"]*-${ARCH}\.tar\.gz\"" | head -1 | cut -d'"' -f4)"
[[ -n "$DOWNLOAD_URL" ]] || die "tidak menemukan rilis untuk arch '$ARCH' di https://github.com/${REPO}/releases — cek halaman itu langsung, atau build manual (docs/09-deployment.md §9.1)"
log "Unduh: $DOWNLOAD_URL"

WORKDIR="$(mktemp -d)"
trap 'rm -rf "$WORKDIR"' EXIT

curl -sSL "$DOWNLOAD_URL" -o "$WORKDIR/taros.tar.gz"
tar -xzf "$WORKDIR/taros.tar.gz" -C "$WORKDIR"

EXTRACTED_DIR="$(find "$WORKDIR" -maxdepth 1 -mindepth 1 -type d | head -1)"
[[ -n "$EXTRACTED_DIR" ]] || die "isi rilis tidak seperti yang diharapkan — laporkan ini sebagai bug"

if [[ "$IS_DARWIN" -eq 1 ]]; then
  # No install.sh in the macOS package (see the Cross-compile step in
  # .github/workflows/release.yml — it assumes systemd/useradd, neither
  # of which exist here). Just place the binary somewhere sane under
  # $HOME and print how to run it — no sudo/root needed for this.
  [[ -x "$EXTRACTED_DIR/taros" ]] || die "isi rilis tidak seperti yang diharapkan (binary taros tidak ditemukan) — laporkan ini sebagai bug"
  DEST="$HOME/taros"
  mkdir -p "$DEST"
  cp "$EXTRACTED_DIR/taros" "$DEST/taros"
  if [[ ! -f "$DEST/config.yaml" ]]; then
    cp "$EXTRACTED_DIR/config.example.yaml" "$DEST/config.yaml"
  fi
  log "Selesai. Binary ada di $DEST/taros."
  log ""
  log "Langkah berikutnya (jalankan manual, belum ada auto-start/restart di"
  log "fase ini — lihat docs/09-deployment.md §9.2 'macOS'):"
  log "  cd $DEST"
  log "  ./taros setup --config ./config.yaml   # sekali saja, buat admin"
  log "  ./taros --config ./config.yaml"
  log ""
  log "Dashboard, Proses, dan Service akan lapor 'tidak didukung' (fitur"
  log "itu baca /proc + systemd, khusus Linux) — Docker, File Explorer,"
  log "dan Web Terminal jalan penuh."
  exit 0
fi

[[ -x "$EXTRACTED_DIR/install.sh" ]] || die "isi rilis tidak seperti yang diharapkan (install.sh tidak ditemukan) — laporkan ini sebagai bug"

log "Menjalankan installer..."
cd "$EXTRACTED_DIR"

# When this script itself was run as `curl ... | bash`, bash's own stdin is
# the pipe from curl — already drained by the time we get here, not the
# terminal. install.sh's `taros setup` step prompts for a username/password
# interactively, so it needs stdin reconnected to the real terminal
# explicitly, or that prompt hangs/fails reading from the exhausted pipe.
# Left alone (no /dev/tty available — already running non-interactively)
# install.sh just inherits whatever stdin it has, which is fine with
# --skip-setup or when this script was downloaded and run directly.
run_install() {
  # A plain [[ -r /dev/tty ]] isn't enough — the device node can exist but
  # still fail to open if the process has no controlling terminal at all
  # (e.g. some CI/automation contexts), which would turn a redirect
  # attempt into a hard error instead of a clean fallback. Probe by
  # opening it in a subshell first (bash prints a failed redirection's
  # error before a trailing "2>/dev/null" on the same command takes
  # effect, so the probe needs its own stderr wrapped from outside) and
  # only redirect for real if that succeeds.
  if ( exec 3</dev/tty ) 2>/dev/null; then
    "$@" < /dev/tty
  else
    "$@"
  fi
}

if [[ $EUID -eq 0 ]]; then
  run_install ./install.sh "$@"
elif command -v sudo >/dev/null; then
  run_install sudo ./install.sh "$@"
else
  die "perlu root untuk instalasi (dan 'sudo' tidak ditemukan) — jalankan ulang sebagai root"
fi
