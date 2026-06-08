#!/usr/bin/env bash
set -euo pipefail
OUT=${1:?usage: slre.sh <OUT>}
mkdir -p "$OUT"
RAW=https://raw.githubusercontent.com
SHA=9075c67cad47d62ba4a4f8f452ae46bb21124f7b
curl -fsSL "$RAW/cesanta/slre/$SHA/slre.h" -o "$OUT/slre.h"
curl -fsSL "$RAW/cesanta/slre/$SHA/slre.c" -o "$OUT/slre.c"
