#!/usr/bin/env bash
set -euo pipefail

OUT="${1:?usage: minrx.sh <OUT>}"
SHA="5c6660ae8c1cbcf5a8b9734628b97ccf0de4bcdc"
BASE="https://raw.githubusercontent.com/mikehaertel/minrx/${SHA}"

mkdir -p "$OUT"

curl -fsSL "${BASE}/minrx.c"   -o "$OUT/minrx.c"
curl -fsSL "${BASE}/charset.c" -o "$OUT/charset.c"
curl -fsSL "${BASE}/minrx.h"   -o "$OUT/minrx.h"
curl -fsSL "${BASE}/charset.h" -o "$OUT/charset.h"
