FROM debian:bookworm-20250520-slim AS base
ENV DEBIAN_FRONTEND=noninteractive
RUN apt-get update && apt-get install -y --no-install-recommends \
      build-essential g++ make cmake git curl ca-certificates xz-utils unzip jq zstd \
      python3 python-is-python3 autoconf automake libtool pkg-config \
      libicu-dev bison flex libxml2 opam \
      libncurses6 libcurl4 libsqlite3-0 libuuid1 \
    && rm -rf /var/lib/apt/lists/*
RUN curl -fsSL https://deb.nodesource.com/setup_22.x | bash - \
    && apt-get install -y --no-install-recommends nodejs && rm -rf /var/lib/apt/lists/*
ENV PLAYWRIGHT_BROWSERS_PATH=/opt/pw-browsers npm_config_cache=/opt/npm-cache
COPY e2e/package.json e2e/package-lock.json /tmp/e2e/
RUN cd /tmp/e2e && npm ci && npx playwright install --with-deps chromium && rm -rf /tmp/e2e/node_modules
WORKDIR /work
ENV HOME=/work
CMD ["make", "all"]

FROM base AS toolchains
COPY etc/toolchains.sh etc/toolchains.sh
RUN bash etc/toolchains.sh

FROM toolchains AS build
COPY . .
RUN make dist

FROM build AS test
RUN make test

FROM build AS test-ui
RUN make test-ui

FROM scratch AS site
COPY --from=build /work/dist /
