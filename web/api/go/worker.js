const ENGINES = [
  { id: 'go-regexp', name: 'Go regexp', flavor: 'leftmost (RE2)', family: 'linear', version: '1.25', url: 'https://pkg.go.dev/regexp' },
  { id: 'regexp2',   name: 'regexp2',   flavor: '.NET backtracking (lookaround + backrefs)', family: 'Perl/PCRE', version: '2.5', url: 'https://github.com/dlclark/regexp2' },
];
async function load() {
  importScripts('../../wasm_exec.js');
  const go = new Go();
  const r = await WebAssembly.instantiateStreaming(fetch('../../go_regex.wasm'), go.importObject);
  go.run(r.instance);
}
const q = []; onmessage = (e) => q.push(e);
import('../protocol.js').then(({ register, byId, once }) => {
  const match = byId(ENGINES, (id, p, s) => typeof globalThis.goEngineMatch === 'function' ? globalThis.goEngineMatch(id, p, s) : undefined);
  register({ list: () => ENGINES, ensure: once(load), match }, q);
});
