const q = []; onmessage = (e) => q.push(e);
import('../protocol.js').then(({ register, reactorApi, wasiShim }) => {
  register(reactorApi({
    wasmUrl: '../../swift_regex.wasm',
    wasi: (getMem) => wasiShim(getMem, {
      random_get: (buf, len) => { crypto.getRandomValues(new Uint8Array(getMem().buffer, buf, len)); return 0; },
      clock_res_get: (id, out) => { new DataView(getMem().buffer).setBigUint64(out, 1n, true); return 0; },
      args_sizes_get: (cnt, sz) => { const v = new DataView(getMem().buffer); v.setUint32(cnt, 0, true); v.setUint32(sz, 0, true); return 0; },
      args_get: () => 0,
      fd_datasync: () => 0, fd_sync: () => 0, sched_yield: () => 0,
    }),
    boot: (E) => E._initialize(),
  }), q);
});
