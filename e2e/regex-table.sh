#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")/.."
EMNODE=$(ls "$PWD"/emsdk/node/*/bin/node 2>/dev/null | head -1 || true)
NODE="${NODE:-${EMNODE:-node}}"
[ -x "$NODE" ] || command -v "$NODE" >/dev/null 2>&1 || NODE=/usr/bin/node
exec "$NODE" --no-warnings --loader "file://$PWD/e2e/node/net-loader.mjs" e2e/regex-table.mjs "$@"
