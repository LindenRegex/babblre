#!/usr/bin/env bash
set -euo pipefail

OUT=${1:?usage: ximtech.sh OUT}
RAW=https://raw.githubusercontent.com
REPO=ximtech/Regex
SHA=2c59fd88c13be3208441413965acdaf5c74c8686

mkdir -p "$OUT"

curl -fsSL "$RAW/$REPO/$SHA/Regex.c"         -o "$OUT/Regex.c"
curl -fsSL "$RAW/$REPO/$SHA/include/Regex.h" -o "$OUT/Regex.h"
