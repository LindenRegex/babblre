#!/usr/bin/env bash
set -euo pipefail

OUT=${1:?usage: re1.sh OUT}
RAW=https://raw.githubusercontent.com
REPO=rsc/re1
SHA=6ca5ae583ae8774733465794d36dad32b3c65378

mkdir -p "$OUT/csrc"

for f in compile.c recursive.c backtrack.c thompson.c pike.c sub.c regexp.h; do
  curl -fsSL "$RAW/$REPO/$SHA/$f" -o "$OUT/csrc/$f"
done
curl -fsSL "$RAW/$REPO/$SHA/parse.y" -o "$OUT/parse.y"

sed -i '/case Any:/{N;s|\(case Any:\)\n\(\t\t\tpc++;\)|\1\n\t\t\tif(*sp == '\''\\0'\'')      // don'\''t consume past end-of-string (matches recursive() above)\n\t\t\t\treturn 0;\n\2|}' "$OUT/csrc/recursive.c"

( cd "$OUT" && yacc -o csrc/y.tab.c parse.y )
