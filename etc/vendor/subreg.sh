#!/usr/bin/env bash
set -euo pipefail
OUT=${1:?usage: subreg.sh <OUT>}
mkdir -p "$OUT"
RAW=https://raw.githubusercontent.com
SHA=e0c0a21bb5ac9d7fc3859a41736312f6b8148584
curl -fsSL "$RAW/mattbucknall/subreg/$SHA/subreg.h" -o "$OUT/subreg.h"
curl -fsSL "$RAW/mattbucknall/subreg/$SHA/subreg.c" -o "$OUT/subreg.c"
