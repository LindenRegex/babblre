#!/usr/bin/env bash
set -euo pipefail

OUT=${1:?usage: sregex.sh OUT}
RAW=https://raw.githubusercontent.com
REPO=openresty/sregex
SHA=c275d2291f5b7f1b3dea6b2c1f7818791360cca8

mkdir -p "$OUT/csrc/sregex"

for f in sre_regex.c sre_regex_compiler.c sre_vm_pike.c sre_vm_thompson.c \
         sre_capture.c sre_palloc.c sre_vm_bytecode.c sre_yyparser.c; do
  curl -fsSL "$RAW/$REPO/$SHA/src/sregex/$f" -o "$OUT/csrc/$f"
done
for f in sregex.h sre_regex.h sre_vm_thompson.h sre_capture.h sre_core.h \
         sre_vm_bytecode.h sre_palloc.h sre_yyparser.h ddebug.h; do
  curl -fsSL "$RAW/$REPO/$SHA/src/sregex/$f" -o "$OUT/csrc/sregex/$f"
done
