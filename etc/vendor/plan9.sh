#!/usr/bin/env bash
set -euo pipefail

OUT=${1:?usage: plan9.sh OUT}
RAW=https://raw.githubusercontent.com
REPO=9fans/plan9port
SHA=b36c747d62a690ffb9cff6f17fbe207b23aa4b84

mkdir -p "$OUT/csrc"

for f in regaux.c regcomp.c regexec.c regsub.c regcomp.h; do
  curl -fsSL "$RAW/$REPO/$SHA/src/libregexp/$f" -o "$OUT/csrc/$f"
done
curl -fsSL "$RAW/$REPO/$SHA/include/regexp9.h" -o "$OUT/csrc/regexp9.h"

sed -i 's|#include <utf.h>|#include "utf.h"|' "$OUT/csrc/regexp9.h"
