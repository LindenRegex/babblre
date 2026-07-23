const q = []; onmessage = (e) => q.push(e);
import('../protocol.js').then(({ register, reactorApi, wasiShim }) => {
  register(reactorApi({
    wasmUrl: '../../haskell_regex.wasm',
    wasi: (getMem) => wasiShim(getMem),
    boot: (E) => { E._initialize(); E.hs_init(0, 0); },
  }), q);
});
