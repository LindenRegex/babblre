#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/.." && pwd)"; cd "$ROOT"

install_tarball() {
  local url=$1 dest=$2 flag=${3:-z}
  curl -fsSL "$url" | tar -C "$dest" "-x$flag"
  [ "$#" -ge 5 ] && mv "$dest/$4" "$dest/$5" || true
}

EMSDK_VERSION=5.0.7          # the emscripten SDK release (compiler)
EMSDK_DRIVER=6.0.0          # the emsdk repo/installer tag (pinned so the driver itself is reproducible)
RUST_VERSION=1.96.0
GO_VERSION=1.25.0
DOTNET_VERSION=8.0.422       # exact SDK (was the floating "8.0" channel)
NIM_VERSION=2.0.8
NIM_REGEX_VERSION=0.26.3     # the nim-regex engine (was unpinned `nimble install regex`)
ZIG_VERSION=0.15.1
OCAML_VERSION=5.2.0
OCAML_PKGS="ocamlfind.1.9.8 menhir.20260209 js_of_ocaml.6.3.2 js_of_ocaml-compiler.6.3.2 re.1.14.0"  # was unpinned
MAVEN_VERSION=3.9.9
JDK_VERSION="jdk-21.0.11+10" # exact Temurin build (was the floating "latest/21/ga")
GHC_META_COMMIT=1da639656e710abae174e7f736507461d1b5bca5  # ghc-wasm-meta bootstrap (was raw/master, a moving target)
BOOST=boost_1_91_0

if [ ! -f emsdk/emsdk_env.sh ]; then
  git clone --branch "$EMSDK_DRIVER" --depth 1 https://github.com/emscripten-core/emsdk emsdk
  ( cd emsdk && ./emsdk install "$EMSDK_VERSION" && ./emsdk activate "$EMSDK_VERSION" )
fi

if [ ! -x .cargo/bin/cargo ]; then
  curl -fsSL https://sh.rustup.rs | RUSTUP_HOME="$ROOT/.rustup" CARGO_HOME="$ROOT/.cargo" \
    sh -s -- -y --no-modify-path --profile minimal --default-toolchain "$RUST_VERSION"
  RUSTUP_HOME="$ROOT/.rustup" CARGO_HOME="$ROOT/.cargo" .cargo/bin/rustup target add wasm32-unknown-unknown
fi

[ -x go/bin/go ] || install_tarball "https://go.dev/dl/go${GO_VERSION}.linux-amd64.tar.gz" "$ROOT"

if [ ! -x .dotnet/dotnet ]; then
  curl -fsSL https://dot.net/v1/dotnet-install.sh | bash -s -- --version "$DOTNET_VERSION" --install-dir "$ROOT/.dotnet"
  .dotnet/dotnet workload install wasm-tools
fi

[ -d "$BOOST" ] || install_tarball "https://archives.boost.io/release/1.91.0/source/${BOOST}.tar.gz" "$ROOT"

if [ ! -d .opam ]; then   # opam binary is apt-provided; the switch + packages live in-tree
  opam init --root="$ROOT/.opam" --bare --disable-sandboxing -y
  opam switch create --root="$ROOT/.opam" lf "ocaml-base-compiler.${OCAML_VERSION}" -y
  opam install --root="$ROOT/.opam" -y $OCAML_PKGS
fi

[ -x .nim/bin/nim ] || install_tarball "https://nim-lang.org/download/nim-${NIM_VERSION}-linux_x64.tar.xz" "$ROOT" J "nim-${NIM_VERSION}" .nim
ls .nimble/pkgs2 2>/dev/null | grep -q '^regex-' || NIMBLE_DIR="$ROOT/.nimble" .nim/bin/nimble -y install "regex@$NIM_REGEX_VERSION"

[ -x .zig/zig ] || install_tarball "https://ziglang.org/download/${ZIG_VERSION}/zig-x86_64-linux-${ZIG_VERSION}.tar.xz" "$ROOT" J "zig-x86_64-linux-${ZIG_VERSION}" .zig

if [ ! -x .ghc-wasm/wasm32-wasi-cabal/bin/wasm32-wasi-cabal ]; then
  mkdir -p .local/bin
  command -v jq >/dev/null || { curl -fsSL https://github.com/jqlang/jq/releases/download/jq-1.7.1/jq-linux-amd64 -o .local/bin/jq && chmod +x .local/bin/jq; }
  if ! command -v unzstd >/dev/null; then
    NODE="$(ls "$ROOT"/emsdk/node/*/bin/node | head -1)"   # Node >= 22.15 has zlib.zstdDecompressSync
    printf '#!/bin/sh\nexec "%s" "$(dirname "$0")/unzstd.mjs" "$@"\n' "$NODE" > .local/bin/unzstd
    cat > .local/bin/unzstd.mjs <<'MJS'
import { readFileSync, writeFileSync } from 'node:fs';
import { zstdDecompressSync } from 'node:zlib';
const a = process.argv.slice(2); let inp = null, out = null;
for (let i = 0; i < a.length; i++) { if (a[i] === '-o') out = a[++i]; else if (!a[i].startsWith('-')) inp = a[i]; }
writeFileSync(out || inp.replace(/\.zst$/, ''), zstdDecompressSync(readFileSync(inp)));
MJS
    chmod +x .local/bin/unzstd
  fi
  ( export PATH="$ROOT/.local/bin:$PATH" PREFIX="$ROOT/.ghc-wasm" FLAVOUR=9.14
    curl -fsSL "https://gitlab.haskell.org/haskell-wasm/ghc-wasm-meta/-/raw/$GHC_META_COMMIT/bootstrap.sh" | sh )
fi

if [ ! -x .jdk/current/bin/java ]; then
  mkdir -p .jdk
  curl -fsSL "https://api.adoptium.net/v3/binary/version/${JDK_VERSION/+/%2B}/linux/x64/jdk/hotspot/normal/eclipse" | tar -C .jdk -xz
  mv .jdk/jdk-* .jdk/current
fi
[ -x .maven/current/bin/mvn ] || { mkdir -p .maven; install_tarball "https://archive.apache.org/dist/maven/maven-3/${MAVEN_VERSION}/binaries/apache-maven-${MAVEN_VERSION}-bin.tar.gz" .maven z "apache-maven-${MAVEN_VERSION}" current; }

SWIFT_TAG=swift-wasm-6.3-RELEASE
if [ ! -x .swift/current/usr/bin/swift ]; then
  mkdir -p .swift
  curl -fsSL "https://download.swift.org/swift-6.3-release/debian12/swift-6.3-RELEASE/swift-6.3-RELEASE-debian12.tar.gz" | tar -C .swift -xz
  mv .swift/swift-*-RELEASE-debian12 .swift/current
fi
if ! HOME="$ROOT" .swift/current/usr/bin/swift sdk list 2>/dev/null | grep -q wasm32-unknown-wasip1; then
  SWIFT_SDK_URL="https://github.com/swiftwasm/swift/releases/download/${SWIFT_TAG}/${SWIFT_TAG}-wasm32-unknown-wasip1.artifactbundle.zip"
  curl -fsSL "$SWIFT_SDK_URL" -o .swift/wasm-sdk.artifactbundle.zip
  HOME="$ROOT" .swift/current/usr/bin/swift sdk install .swift/wasm-sdk.artifactbundle.zip
fi

echo "toolchains ready in $ROOT"
