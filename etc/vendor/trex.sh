#!/usr/bin/env bash
set -euo pipefail
OUT=${1:?usage: trex.sh <OUT>}
mkdir -p "$OUT"
RAW=https://raw.githubusercontent.com
SHA=002c65466d2c7fa81a81fced192d4fe2b54916a7
curl -fsSL "$RAW/kimperator/T-Rex/$SHA/trex.h" -o "$OUT/trex.h"
curl -fsSL "$RAW/kimperator/T-Rex/$SHA/trex.c" -o "$OUT/trex.c"
