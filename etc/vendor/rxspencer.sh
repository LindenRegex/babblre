#!/usr/bin/env bash
set -euo pipefail

OUT=${1:?usage: rxspencer.sh OUT}
RAW=https://raw.githubusercontent.com
REPO=garyhouston/rxspencer
SHA=804d353cfbea48236e10e74f95abbd5c6b91d718

mkdir -p "$OUT/csrc"

for f in regcomp.c regexec.c regerror.c regfree.c regex.h regex2.h; do
  curl -fsSL "$RAW/$REPO/$SHA/$f" -o "$OUT/csrc/$f"
done

curl -fsSL "$RAW/$REPO/$SHA/engine.c" -o "$OUT/csrc/engine.inc"

sed -i 's/#include "engine.c"/#include "engine.inc"/' "$OUT/csrc/regexec.c"
