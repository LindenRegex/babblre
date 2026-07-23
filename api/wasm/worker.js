const Q = new URLSearchParams(self.location.search);
const MODULE = Q.get('module'), STYLE = Q.get('style');
const FACTORY = Q.get('factory') || 'createEngines';
let A = null, list = [], idx = {}, initErr = null;

function emAdapter(M) {
  const em = M.cwrap('engine_match', 'string', ['number', 'string', 'string']);
  return {
    count: M.cwrap('engine_count', 'number', []),
    info: M.cwrap('engine_info', 'string', ['number']),
    // cwrap copies 'string' args onto the wasm stack (-sSTACK_SIZE=4MB)
    match: (i, p, s) => (p.length + s.length) * 3 + 65536 > 4194304
      ? '{"error":"pattern+input too large for this engine"}' : em(i, p, s),
  };
}
async function load(rawAbi, cachedModule) {
  const wasmUrl = STYLE === 'emscripten' ? '../../' + MODULE.replace(/\.js$/, '.wasm') : '../../' + MODULE;
  const compile = async () => cachedModule || WebAssembly.compile(await fetch(wasmUrl).then((r) => r.arrayBuffer()));
  if (STYLE === 'emscripten') {
    importScripts('../../' + MODULE);
    A = emAdapter(await self[FACTORY]({
      locateFile: (p) => '../../' + p,
      instantiateWasm: (imports, cb) => {
        compile().then((m) => {
          if (!cachedModule) postMessage({ compiled: m });
          WebAssembly.instantiate(m, imports).then((inst) => cb(inst, m));
        });
        return {};
      },
    }));
  } else {
    const m = await compile();
    if (!cachedModule) postMessage({ compiled: m });
    A = rawAbi((await WebAssembly.instantiate(m, {})).exports);
  }
  for (let i = 0, n = A.count(); i < n; i++) { const o = JSON.parse(A.info(i)); if (o.id in idx) console.warn('duplicate engine id', o.id); list.push(o); idx[o.id] = i; }
}
const q = []; onmessage = (e) => q.push(e);
import('../protocol.js').then(({ register, fail, moduleEnsure, rawAbi, errStr }) => {
  const ensure = moduleEnsure((mod) => load(rawAbi, mod).catch((err) => { initErr = errStr(err); throw err; }));
  const match = (d) => { const i = idx[d.engine]; return (i != null) ? JSON.parse(A.match(i, d.pattern, d.input)) : fail(d.engine, initErr || 'unavailable'); };
  register({ list: () => ensure().then(() => list), ensure, match }, q);
});
