#!/usr/bin/env bash
set -euo pipefail

OUT="${1:?usage: nure.sh <OUT>}"
SHA="aad3c787321c227bedf6e02b98d09fd69c817016"
BASE="https://raw.githubusercontent.com/Bricktech2000/NU-RE/${SHA}"

mkdir -p "$OUT"

curl -fsSL "${BASE}/nu-re.c" -o "$OUT/nu-re.c"
curl -fsSL "${BASE}/nu-re.h" -o "$OUT/nu-re.h"
