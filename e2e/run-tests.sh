#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"
REPO="$(cd .. && pwd)"
[ -f "$REPO/emsdk/emsdk_env.sh" ] && source "$REPO/emsdk/emsdk_env.sh" >/dev/null 2>&1 || true
export PLAYWRIGHT_BROWSERS_PATH="${PLAYWRIGHT_BROWSERS_PATH:-$REPO/.pw-browsers}"
export npm_config_cache="${npm_config_cache:-$REPO/.npmcache}"
if [ -d "$REPO/.chromedeps" ]; then
  export LD_LIBRARY_PATH="$REPO/.chromedeps/usr/lib/x86_64-linux-gnu:$REPO/.chromedeps/lib/x86_64-linux-gnu${LD_LIBRARY_PATH:+:$LD_LIBRARY_PATH}"
  export FONTCONFIG_FILE="$REPO/fonts.conf"
  export XDG_CACHE_HOME="$REPO/.fccache"
fi
export PATH="$PATH:$HOME/.dotnet:/usr/local/go/bin"
[ -d node_modules ] || npm install
node litmus.mjs
./run-reference.sh reference-check.mjs
exec node node_modules/.bin/playwright test "$@"
