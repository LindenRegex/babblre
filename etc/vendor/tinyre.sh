#!/usr/bin/env bash
set -euo pipefail

OUT="${1:?usage: tinyre.sh <OUT>}"
SHA="77469f58916369bc3863194cabb05238577fb257"

mkdir -p "$OUT/csrc"
curl -fsSL "https://raw.githubusercontent.com/khchen/tinyre/${SHA}/re.c" -o "$OUT/csrc/re.c"
