#!/usr/bin/env bash
set -euo pipefail
HERE="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$HERE/.." && pwd)"
cd "$ROOT"
source "${EMSDK:-$ROOT/emsdk}/emsdk_env.sh" >/dev/null 2>&1
[ -n "$(ls -A vendor/quickjs-ng 2>/dev/null)" ] || { echo "vendor/ submodules not initialized — run: git submodule update --init"; exit 1; }

OBJ="$ROOT/build/obj"; OUT="$ROOT/build/lib"; mkdir -p "$OBJ" "$OUT"

archive() {
  local out=$1 prefix=$2; shift 2
  local cc=(); while [ "$1" != "--" ]; do cc+=("$1"); shift; done; shift
  local objs=() o
  for f in "$@"; do
    o="$OBJ/${prefix:+${prefix}_}$(basename "$f" | sed 's/\.[^.]*$/.o/')"
    "${cc[@]}" -c "$f" -o "$o"; objs+=("$o")
  done
  emar rcs "$out" "${objs[@]}"
}

build_quickjs() {
  echo "== QuickJS-ng libregexp =="
  archive "$OUT/libquickjsre.a" qjs emcc -O2 -DNDEBUG -I vendor/quickjs-ng -- \
    vendor/quickjs-ng/libregexp.c vendor/quickjs-ng/libunicode.c
}

build_mujs() {
  echo "== mujs regexp =="
  archive "$OUT/libmujsre.a" mujs emcc -O2 -DNDEBUG -I vendor/mujs -- vendor/mujs/regexp.c vendor/mujs/utf.c
}

build_oniguruma() {
  echo "== Oniguruma =="
  local CFG="$OBJ/onig"; mkdir -p "$CFG"
  cat > "$CFG/config.h" <<'CFGEOF'
#define HAVE_ALLOCA 1
#define HAVE_ALLOCA_H 1
#define HAVE_STDINT_H 1
#define HAVE_SYS_TIME_H 1
#define HAVE_SYS_TYPES_H 1
#define HAVE_UNISTD_H 1
#define HAVE_INTTYPES_H 1
#define SIZEOF_INT 4
#define SIZEOF_LONG 4
#define SIZEOF_LONG_LONG 8
#define SIZEOF_VOIDP 4
#define PACKAGE "onig"
#define PACKAGE_VERSION "6.9.10"
#define VERSION "6.9.10"
CFGEOF
  local names="regparse regcomp regexec regenc regerror regext regsyntax regtrav \
    regversion st reggnu unicode unicode_unfold_key unicode_fold1_key \
    unicode_fold2_key unicode_fold3_key ascii utf8 utf16_be utf16_le utf32_be \
    utf32_le euc_jp euc_jp_prop sjis sjis_prop iso8859_1 iso8859_2 iso8859_3 \
    iso8859_4 iso8859_5 iso8859_6 iso8859_7 iso8859_8 iso8859_9 iso8859_10 \
    iso8859_11 iso8859_13 iso8859_14 iso8859_15 iso8859_16 euc_tw euc_kr big5 \
    gb18030 koi8_r cp1251 onig_init"
  local srcs=(); for n in $names; do srcs+=("vendor/oniguruma/src/$n.c"); done
  archive "$OUT/libonig.a" onig emcc -O2 -DNDEBUG -DHAVE_CONFIG_H -I "$CFG" -I vendor/oniguruma/src -- "${srcs[@]}"
}

build_tre() {
  echo "== TRE =="
  archive "$OUT/libtre.a" tre emcc -O2 -DNDEBUG -I engines/cpp/tre -I vendor/tre/lib -I vendor/tre/local_includes -- vendor/tre/lib/*.c
}

build_reflex() {
  echo "== RE/flex =="
  local srcs=(); for f in vendor/reflex/lib/*.cpp vendor/reflex/unicode/*.cpp; do
    case "$f" in *_avx2.cpp|*_avx512bw.cpp) continue;; esac
    srcs+=("$f"); done
  archive "$OUT/libreflex.a" reflex em++ -O2 -DNDEBUG -std=c++17 -fexceptions -I vendor/reflex/include -- "${srcs[@]}"
}

build_pcre() {
  echo "== $1 =="
  local S=$2 p=$3
  cp -f "$S/config.h.generic" "$S/config.h"
  cp -f "$S/$p.h.generic" "$S/$p.h"
  cp -f "$S/${p}_chartables.c.dist" "$S/${p}_chartables.c"
  local srcs=() f pat skip
  for f in "$S"/${p}_*.c; do
    skip=; for pat in ${4//|/ }; do [[ $f == $pat ]] && { skip=1; break; }; done
    [ -n "$skip" ] || srcs+=("$f")
  done
  archive "$OUT/$7" "$6" emcc -O2 -DNDEBUG -DHAVE_CONFIG_H $5 -I "$S" -- "${srcs[@]}"
}
build_pcre2() { build_pcre PCRE2 vendor/pcre2/src pcre2 '*_jit_*|*pcre2_printint.c|*pcre2_fuzzsupport.c|*pcre2_dftables.c' '-DPCRE2_CODE_UNIT_WIDTH=8 -DPCRE2_STATIC' '' libpcre2.a; }
build_pcre1() { build_pcre PCRE1 vendor/pcre1 pcre '*jit*|*dftables*|*_test*|*fuzz*|*printint*' '-DPCRE_STATIC' pcre1 libpcre1.a; }

build_abseil() {
  echo "== Abseil (for RE2) =="
  local SRC=vendor/abseil-cpp B=vendor/abseil-cpp/build-wasm
  [ -n "$(ls -A "$SRC" 2>/dev/null)" ] || { echo "vendor/abseil-cpp not initialized — run: git submodule update --init"; exit 1; }
  if [ -z "$(find "$B" -name 'libabsl_*.a' 2>/dev/null | head -1)" ]; then
    emcmake cmake -S "$SRC" -B "$B" -DCMAKE_BUILD_TYPE=Release -DBUILD_SHARED_LIBS=OFF \
      -DABSL_PROPAGATE_CXX_STD=ON -DCMAKE_CXX_STANDARD=17 -DABSL_BUILD_TESTING=OFF \
      -DABSL_ENABLE_INSTALL=ON -DCMAKE_CXX_FLAGS="-fexceptions" >/dev/null
    cmake --build "$B" -j"$(nproc)" >/dev/null
  fi
  local M="$OBJ/absl_merge"; rm -rf "$M"; mkdir -p "$M"; local i=0 a
  for a in $(find "$B" -name 'libabsl_*.a'); do
    mkdir -p "$M/$i"; ( cd "$M/$i" && emar x "$ROOT/$a" ); i=$((i+1))
  done
  emar rcs "$OUT/libabsl.a" $(find "$M" -name '*.o')
  echo "  Abseil ($i archives) -> $OUT/libabsl.a"
}
build_re2() {
  echo "== RE2 (2025-11-05 + Abseil) =="
  [ -f "$OUT/libabsl.a" ] || build_abseil
  local srcs=(); for f in vendor/re2/re2/*.cc vendor/re2/util/*.cc; do
    case "$f" in *_test.cc|*test.cc|*benchmark.cc|*fuzz*.cc|*/pcre.cc) continue;; esac
    srcs+=("$f"); done
  archive "$OUT/libre2.a" re2 em++ -O2 -DNDEBUG -std=c++17 -fexceptions -I vendor/re2 -I vendor/abseil-cpp -- "${srcs[@]}"
}

build_pire() {
  echo "== PIRE =="
  command -v bison >/dev/null || { echo "  bison required for PIRE's re_parser.y"; return 1; }
  ( cd vendor/pire/pire && bison -d --defines=re_parser.h -o re_parser.cpp re_parser.y )
  local srcs=(); for s in approx_matching classes easy encoding fsm half_final_fsm re_lexer \
      read_unicode scanner_io re_parser scanners/null stub/utf8 extra/capture extra/count extra/glyphs; do
    srcs+=("vendor/pire/pire/$s.cpp"); done
  archive "$OUT/libpire.a" pire em++ -O2 -DNDEBUG -std=c++17 -fexceptions -DPIRE_NO_CONFIG \
    -D_LIBCPP_ENABLE_CXX17_REMOVED_UNARY_BINARY_FUNCTION -D_LIBCPP_ENABLE_CXX17_REMOVED_BINDERS -I vendor/pire/pire -- "${srcs[@]}"
}

build_icu() {
  echo "== ICU =="
  local SRC=vendor/icu/icu NAT_B=vendor/icu/native WASM_B=vendor/icu/wasm
  [ -d "$SRC/source" ] || { mkdir -p vendor/icu; curl -fsSL \
    "https://github.com/unicode-org/icu/releases/download/release-78.3/icu4c-78.3-sources.tgz" | tar -C vendor/icu -xz; }
  if [ ! -f "$NAT_B/lib/libicudata.a" ]; then
    mkdir -p "$NAT_B"
    ( cd "$NAT_B" && ../icu/source/configure --disable-shared --enable-static --disable-tests --disable-samples >/dev/null && make -j"$(nproc)" >/dev/null )
  fi
  if [ ! -f "$WASM_B/lib/libicui18n.a" ]; then
    mkdir -p "$WASM_B"
    ( cd "$WASM_B" && emconfigure ../icu/source/configure --with-cross-build="$ROOT/$NAT_B" \
        --enable-static --disable-shared --disable-tests --disable-samples \
        --disable-tools --disable-dyload --disable-extras --disable-icuio --disable-layoutex \
        CFLAGS="-O2" CXXFLAGS="-O2 -std=c++17" >/dev/null && emmake make -j"$(nproc)" >/dev/null )
  fi
  echo "  ICU libs -> $WASM_B/lib/*.a"
}

build_rematch() {
  echo "== REmatch =="
  local SRC=vendor/rematch B=vendor/rematch/build-wasm
  [ -n "$(ls -A "$SRC" 2>/dev/null)" ] || { echo "vendor/rematch not initialized — run: git submodule update --init"; exit 1; }
  if [ ! -f "$B/lib/libREmatch.a" ]; then
    emcmake cmake -S "$SRC" -B "$B" -DCMAKE_BUILD_TYPE=Release -DBUILD_TESTING=OFF \
      -DENABLE_PROFILING=OFF -DBUILD_SHARED_LIBS=OFF -DREMATCH_USE_BUNDLED_DEPS=ON \
      -DCMAKE_CXX_FLAGS="-fexceptions" -DCMAKE_POLICY_VERSION_MINIMUM=3.5 >/dev/null
    cmake --build "$B" --target REmatch -j"$(nproc)" >/dev/null
  fi
  echo "  REmatch lib (incl. bundled ANTLR) -> $B/lib/libREmatch.a"
}

build_re2clib() {
  echo "== libre2c =="
  local SRC=vendor/re2c B=vendor/re2c/build-wasm
  [ -n "$(ls -A "$SRC" 2>/dev/null)" ] || { echo "vendor/re2c not initialized — run: git submodule update --init"; exit 1; }
  if [ ! -f "$B/libre2c.a" ] || [ ! -f "$B/libre2c_core.a" ]; then
    cp -r "$SRC/bootstrap/src/." "$SRC/src/"
    cp -r "$SRC/bootstrap/lib/." "$SRC/lib/"
    emcmake cmake -S "$SRC" -B "$B" -DRE2C_BUILD_LIBS=yes -DCMAKE_BUILD_TYPE=Release \
      -DCMAKE_CXX_FLAGS="-fexceptions -funsigned-char" -DCMAKE_POLICY_VERSION_MINIMUM=3.5 >/dev/null
    cmake --build "$B" --target libre2c_static -j"$(nproc)" >/dev/null
    cmake --build "$B" --target re2c -j"$(nproc)" >/dev/null
    local RD; RD=$(find "$B" -type d -name re2c.dir | head -1)
    emar rcs "$B/libre2c_core.a" $(find "$RD" -name '*.o' | grep -v 'main.cc.o')
  fi
  echo "  libre2c -> $B/{libre2c.a,libre2c_core.a}"
}

ENGINES="quickjs mujs oniguruma tre reflex pcre1 pcre2 re2 pire"
TARGETS="$ENGINES abseil icu rematch re2clib"
sel="${1:-all}"; [ "$sel" = all ] && sel="$ENGINES"
for e in $sel; do
  case " $TARGETS " in *" $e "*) "build_$e" ;; *) echo "usage: $0 [$TARGETS|all]"; exit 1 ;; esac
done
echo "done"
