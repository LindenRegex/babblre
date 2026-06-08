#!/usr/bin/env bash
set -euo pipefail

OUT=${1:?usage: matp.sh OUT}
RAW=https://raw.githubusercontent.com
REPO=matp/tiny-regex
SHA=33d5d3fe55df2dae0b55587e6cebd8c7f7d3928c

mkdir -p "$OUT"

for f in regex_allocators.c regex_allocators.h regex_character_class.h regex_node.h \
         regex_compile.c regex_compile.h regex_parse.c regex_parse.h \
         regex_program.c regex_program.h regex_vm_pike.c regex_vm_pike.h; do
  curl -fsSL "$RAW/$REPO/$SHA/src/$f" -o "$OUT/$f"
done
