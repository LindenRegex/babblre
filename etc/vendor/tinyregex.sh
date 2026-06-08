#!/usr/bin/env bash
set -euo pipefail
OUT=${1:?usage: tinyregex.sh <OUT>}
mkdir -p "$OUT"
RAW=https://raw.githubusercontent.com
SHA=f2632c6d9ed25272987471cdb8b70395c2460bdb
curl -fsSL "$RAW/kokke/tiny-regex-c/$SHA/re.h" -o "$OUT/re.h"
curl -fsSL "$RAW/kokke/tiny-regex-c/$SHA/re.c" -o "$OUT/re.c"
