#!/usr/bin/env bash
set -euo pipefail

REPO="https://github.com/PurdueDualityLab/memoized-regex-engine"
SHA="e7edcb0033a1eba90589e7831733f6527d9c4909"

OUT="${1:?usage: memoregex.sh <OUT>}"
mkdir -p "$OUT/src/vendor"

WORK="$(mktemp -d)"
trap 'rm -rf "$WORK"' EXIT

git clone --quiet "$REPO" "$WORK/upstream"
git -C "$WORK/upstream" checkout --quiet "$SHA"
SRC="$WORK/upstream/src-simple"

for f in compile.c log.c log.h memoize.c memoize.h pike.c recursive.c \
         regexp.c regexp.h rle.c rle.h statistics.c statistics.h sub.c \
         thompson.c uthash.h backtrack.c; do
  cp "$SRC/$f" "$OUT/src/$f"
done
cp "$SRC/vendor/avl_tree.c" "$OUT/src/vendor/avl_tree.c"
cp "$SRC/vendor/avl_tree.h" "$OUT/src/vendor/avl_tree.h"

sed -i 's|^  printStats(prog, &memo, &visitTable, startTime, sub);$|  // printStats(prog, \&memo, \&visitTable, startTime, sub);  // silenced: per-match stats dump+work|' \
  "$OUT/src/backtrack.c"

cp "$SRC/parse.y" "$WORK/parse.y"
sed -i \
  -e 's|^\tprintre(parsed_regexp);$|\t// printre(parsed_regexp);  // silenced: debug AST dump on every parse|' \
  -e 's|^\tprintf("\\n");$|\t// printf("\\n");|' \
  "$WORK/parse.y"
( cd "$WORK" && yacc -o y.tab.c parse.y )
cp "$WORK/y.tab.c" "$OUT/src/y.tab.c"
