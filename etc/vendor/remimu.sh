#!/usr/bin/env bash
set -euo pipefail

OUT="${1:?usage: remimu.sh <OUT>}"
SHA="5b56240ae6e504f45d481074a10efce5ed4b9800"

mkdir -p "$OUT"
curl -fsSL "https://raw.githubusercontent.com/wareya/Remimu/${SHA}/remimu.h" -o "$OUT/remimu.h"
