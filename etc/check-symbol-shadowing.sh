#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
. emsdk/emsdk_env.sh >/dev/null 2>&1 || true
NM=$(command -v emnm || echo "emsdk/upstream/emscripten/emnm")

LIBC=$(find emsdk/upstream/emscripten/cache/sysroot/lib -name 'libc.a' | head -1)
[ -n "$LIBC" ] || { echo "check-symbols: musl libc.a not found (build emscripten first)"; exit 1; }

mapfile -t inputs < <(ls build/lib/*.a 2>/dev/null; find build/cobj build/obj -name '*.o' 2>/dev/null)
[ "${#inputs[@]}" -gt 0 ] || { echo "check-symbols: no build objects -- run 'make engines' + 'make wasm' first"; exit 1; }

work=$(mktemp -d); trap 'rm -rf "$work"' EXIT
"$NM" "$LIBC" 2>/dev/null | awk '$2 ~ /^[TDB]$/ {print $3}' | sort -u > "$work/musl"

cat > "$work/allow" <<'ALLOW'
malloc
free
calloc
realloc
memcpy
memmove
memset
memcmp
strlen
main
ALLOW

fail=0
echo "$work/shadow" > /dev/null
: > "$work/report"
for f in "${inputs[@]}"; do
  "$NM" "$f" 2>/dev/null | awk '$2 ~ /^[TDB]$/ {print $3}' | sort -u > "$work/defs"
  comm -12 "$work/defs" "$work/musl" | grep -vxF -f "$work/allow" > "$work/hit" || true
  if [ -s "$work/hit" ]; then
    fail=1
    echo "  $(basename "$f") shadows musl: $(tr '\n' ' ' < "$work/hit")" >> "$work/report"
  fi
done

if [ "$fail" = 1 ]; then
  echo "check-symbols: FAIL -- engine libraries define strong symbols that shadow musl libc:"
  cat "$work/report"
  echo "  Rename them (e.g. -Dregcomp=<prefix>_regcomp in the engine's csrc/cflags, or a tre_-style prefix)."
  exit 1
fi
echo "check-symbols: OK -- no engine library shadows a musl libc symbol"
