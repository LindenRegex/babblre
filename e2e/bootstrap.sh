#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"; REPO="$(cd .. && pwd)"
[ -f "$REPO/emsdk/emsdk_env.sh" ] && source "$REPO/emsdk/emsdk_env.sh" >/dev/null 2>&1 || true
export npm_config_cache="$REPO/.npmcache" PLAYWRIGHT_BROWSERS_PATH="$REPO/.pw-browsers"

npm install
npx playwright install chromium

APT="$REPO/.apt"; AO="-o Dir::State::Lists=$APT/lists -o Dir::Cache=$APT/cache -o Dir::State::status=$APT/status -o Debug::NoLocking=true"
mkdir -p "$APT/lists/partial" "$APT/cache/archives/partial" "$REPO/.chromedeps" "$REPO/.fccache"; : > "$APT/status"
apt-get $AO update
SEED="libnss3 libnspr4 libatk1.0-0 libatk-bridge2.0-0 libcups2 libdrm2 libxkbcommon0 libxcomposite1 \
      libxdamage1 libxfixes3 libxrandr2 libgbm1 libxcb1 libxext6 libx11-6 libasound2 libatspi2.0-0 \
      libglib2.0-0 libdbus-1-3 libexpat1 libpango-1.0-0 libcairo2 fonts-dejavu-core"
CLOSURE=$(apt-cache $AO depends --recurse --no-recommends --no-suggests --no-conflicts \
           --no-breaks --no-replaces --no-enhances $SEED 2>/dev/null | grep -v '^\s' | grep -v '<' | sort -u)
( cd "$APT/cache/archives" && apt-get $AO download $CLOSURE )
for d in "$APT"/cache/archives/*.deb; do dpkg-deb -x "$d" "$REPO/.chromedeps"; done
cat > "$REPO/fonts.conf" <<CONF
<?xml version="1.0"?>
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">
<fontconfig>
  <dir>$REPO/.chromedeps/usr/share/fonts</dir>
  <cachedir>$REPO/.fccache</cachedir>
</fontconfig>
CONF
echo "bootstrap complete -> run ./run-tests.sh (or 'make test' from $REPO)"
