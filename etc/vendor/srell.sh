#!/usr/bin/env bash
set -euo pipefail

OUT="${1:?usage: srell.sh <OUT>}"
URL="https://www.akenotsuki.com/misc/srell/releases/srell4_130.zip"

mkdir -p "$OUT"
WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

curl -fsSL "$URL" -o "$WORK/srell.zip"

if command -v unzip >/dev/null 2>&1; then
  unzip -oq "$WORK/srell.zip" "single-header/srell.hpp" -d "$WORK"
elif command -v bsdtar >/dev/null 2>&1; then
  bsdtar -xf "$WORK/srell.zip" -C "$WORK" "single-header/srell.hpp"
else
  ( cd "$WORK" && python3 -m zipfile -e srell.zip . )
fi

cp "$WORK/single-header/srell.hpp" "$OUT/srell.hpp"
