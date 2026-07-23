#!/usr/bin/env bash
set -euo pipefail
DIR=${1:-vendor/re2c}
PATCH="$(cd "$(dirname "$0")" && pwd)/re2c.patch"
[ -f "$DIR/lib/regcomp.cc" ] || { echo "re2c: $DIR not populated — run: git submodule update --init"; exit 1; }
if patch -p1 -R -f --dry-run -d "$DIR" <"$PATCH" >/dev/null 2>&1; then
  echo "re2c: error patch already applied"
else
  patch -p1 -f -d "$DIR" <"$PATCH"
  echo "re2c: applied error patch"
fi
