export function serve({ list, ensure, match }) {
  return (e) => {
    const d = e.data;
    if (d.cmd === 'list') { Promise.resolve().then(list).then((l) => postMessage({ list: l }), () => postMessage({ list: [] })); return; }
    if (d.cmd === 'init') { Promise.resolve().then(() => ensure(d)).then(() => postMessage({ ready: true }), () => postMessage({ ready: true })); return; }
    Promise.resolve().then(() => match(d)).then(
      (raw) => postMessage({ result: normalize(d.engine, raw) }),
      () => postMessage({ result: fail(d.engine, 'engine crashed'), crashed: true }));
  };
}

function normalize(id, r) {
  if (!r) return fail(id, 'bad result');
  const ok = r.error == null;
  const out = { id, ok, matched: ok && !!r.matched, groups: ok ? (r.groups || []) : [] };
  if (!ok) out.error = r.error;
  if (r.kind) out.kind = r.kind;
  if (r.bool) out.bool = true;
  return out;
}
export const fail = (id, error = 'unavailable') => ({ id, ok: false, matched: false, error, groups: [] });

export const once = (fn) => { let p; return (...a) => (p ||= fn(...a)); };
export const errStr = (e) => String(e?.message || e);

export const moduleEnsure = (loadFn) => {
  let mod = null;
  const run = once(() => loadFn(mod));
  return (initMsg) => { if (initMsg?.module) mod = initMsg.module; return run(); };
};

export function rawAbi(exp) {
  const enc = new TextEncoder(), dec = new TextDecoder();
  const heap = () => new Uint8Array(exp.memory.buffer);   // re-read the heap view: it detaches after wasm memory growth
  const readstr = (rp) => dec.decode(new Uint8Array(exp.memory.buffer, rp + 4, new DataView(exp.memory.buffer).getUint32(rp, true)));
  return {
    count: () => exp.engine_count(),
    info: (i) => readstr(exp.engine_info(i)),
    match: (i, p, s) => {
      const pb = enc.encode(p), ib = enc.encode(s);
      const pp = exp.alloc(pb.length), ip = exp.alloc(ib.length);
      try {
        if (!pp || !ip) return '{"error":"pattern+input too large for this engine"}';
        heap().set(pb, pp); heap().set(ib, ip);
        return readstr(exp.engine_match(i, pp, pb.length, ip, ib.length));
      } finally { if (pp) exp.dealloc(pp, pb.length); if (ip) exp.dealloc(ip, ib.length); }
    },
  };
}

export function wasiShim(getMem, extra = {}) {
  const OK = 0, EBADF = 8, ENOSYS = 52;
  const dv = () => new DataView(getMem().buffer);
  return {
    proc_exit: (c) => { throw new Error('proc_exit ' + c); },
    clock_time_get: (id, prec, out) => { dv().setBigUint64(out, 0n, true); return OK; },
    environ_sizes_get: (cnt, sz) => { dv().setUint32(cnt, 0, true); dv().setUint32(sz, 0, true); return OK; },
    environ_get: () => OK,
    fd_write: (fd, iovs, n, nout) => {
      let total = 0;
      for (let i = 0; i < n; i++) total += dv().getUint32(iovs + i * 8 + 4, true);
      dv().setUint32(nout, total, true); return OK;
    },
    fd_read: (fd, iovs, n, nout) => { dv().setUint32(nout, 0, true); return OK; },
    fd_close: () => OK, fd_seek: () => ENOSYS, fd_fdstat_set_flags: () => OK,
    fd_filestat_set_size: () => OK, fd_fdstat_get: () => EBADF, fd_filestat_get: () => EBADF,
    fd_prestat_get: () => EBADF, fd_prestat_dir_name: () => EBADF,
    path_create_directory: () => OK, path_filestat_get: () => EBADF, path_open: () => EBADF,
    poll_oneoff: () => ENOSYS,
    ...extra,
  };
}

export function reactorApi({ wasmUrl, wasi, boot }) {
  let A = null, list = [], idx = {}, initErr = null, inst = null;
  const ensure = moduleEnsure(async (mod) => {
    try {
      const module = mod || await WebAssembly.compile(await fetch(wasmUrl).then((r) => r.arrayBuffer()));
      if (!mod) postMessage({ compiled: module });
      const imports = wasi ? { wasi_snapshot_preview1: wasi(() => inst.exports.memory) } : {};
      inst = await WebAssembly.instantiate(module, imports);
      if (boot) boot(inst.exports);
      A = rawAbi(inst.exports);
      for (let i = 0, n = A.count(); i < n; i++) { const o = JSON.parse(A.info(i)); if (o.id in idx) console.warn('duplicate engine id', o.id); list.push(o); idx[o.id] = i; }
    } catch (err) { initErr = errStr(err); throw err; }
  });
  return {
    list: () => ensure().then(() => list),
    ensure,
    match: (d) => { const i = idx[d.engine]; return (i != null) ? JSON.parse(A.match(i, d.pattern, d.input)) : fail(d.engine, initErr || 'unavailable'); },
  };
}

export function register(api, q) { const h = serve(api); for (const e of q) h(e); self.onmessage = h; }

export function byId(engines, run, errMsg = () => 'unavailable') {
  const ids = new Set();
  for (const e of engines) { if (ids.has(e.id)) console.warn('duplicate engine id', e.id); ids.add(e.id); }
  return (d) => {
    const r = ids.has(d.engine) ? run(d.engine, d.pattern, d.input) : undefined;
    return r === undefined ? fail(d.engine, errMsg()) : (typeof r === 'string' ? JSON.parse(r) : r);
  };
}
