#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
ROOT="$PWD"
SCRIPT="e2e/${1:-reference-check.mjs}"
EMNODE=$(ls "$ROOT"/emsdk/node/*/bin/node 2>/dev/null | head -1 || true)
NODE="${NODE:-${EMNODE:-node}}"
[ -x "$NODE" ] || command -v "$NODE" >/dev/null 2>&1 || NODE=/usr/bin/node
[ -d "$ROOT/e2e/node_modules" ] || ( cd "$ROOT/e2e" && npm ci )
exec "$NODE" --no-warnings --loader "file://$ROOT/e2e/node/net-loader.mjs" "$SCRIPT"
