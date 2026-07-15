#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
IMAGE=babel-re
docker image inspect "$IMAGE" >/dev/null 2>&1 || {
  echo "image '$IMAGE' not found — build it: make docker-image" >&2; exit 1; }
tty=; [ -t 0 ] && tty=-it
exec docker run --rm $tty --user "$(id -u):$(id -g)" -v "$ROOT:$ROOT" -w "$ROOT" -e HOME="$ROOT" "$IMAGE" "$@"
