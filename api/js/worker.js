const MODULE = new URLSearchParams(self.location.search).get('module');
const BASE = '../../js/';
const errStr = (e) => String(e?.message || e);   // classic worker cannot static-import protocol.js so errStr is redefined here
const CONFIG = {
  js: {
    mods: { 'actual-ecma': BASE + 'browser.js', 'actual-ecma-u': BASE + 'browser.js', 'actual-ecma-v': BASE + 'browser.js', 're2js': BASE + 're2js.js' },
    flags: { 'actual-ecma-u': 'du', 'actual-ecma-v': 'dv' },
    engines: [
      { id: 'actual-ecma',   name: 'Browser RegExp',    flavor: 'ECMAScript', family: 'ECMAScript', version: '', url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp' },
      { id: 'actual-ecma-u', name: 'Browser RegExp / u', flavor: 'ECMAScript, unicode', family: 'ECMAScript', version: '', url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicode' },
      { id: 'actual-ecma-v', name: 'Browser RegExp / v', flavor: 'ECMAScript, unicodeSets', family: 'ECMAScript', version: '', url: 'https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/RegExp/unicodeSets' },
      { id: 're2js',         name: 're2js',             flavor: 'RE2 (JS)', family: 'linear',   version: '2.8.6', url: 'https://github.com/le0pard/re2js' },
    ],
  },
  e262: {
    mods: { 'engine262': BASE + 'engine262.js', 'engine262-u': BASE + 'engine262.js', 'engine262-v': BASE + 'engine262.js' },
    flags: { 'engine262-u': 'du', 'engine262-v': 'dv' },
    engines: [
      { id: 'engine262',   name: 'engine262',    flavor: 'ECMA spec', family: 'ECMAScript', version: '', url: 'https://github.com/engine262/engine262' },
      { id: 'engine262-u', name: 'engine262 / u', flavor: 'ECMA spec, unicode', family: 'ECMAScript', version: '', url: 'https://github.com/engine262/engine262' },
      { id: 'engine262-v', name: 'engine262 / v', flavor: 'ECMA spec, unicodeSets', family: 'ECMAScript', version: '', url: 'https://github.com/engine262/engine262' },
    ],
  },
  ocaml: {
    script: '../../ocaml.js', global: 'ocamlMatch',
    engines: [
      { id: 'ocaml-re',       name: 'OCaml Re / PCRE',  flavor: 'PCRE', family: 'Perl/PCRE', version: '', url: 'https://github.com/ocaml/ocaml-re'  },
      { id: 'ocaml-str',      name: 'OCaml Str',        flavor: 'emacs-ish (group-0)', family: 'Emacs',  version: '', url: 'https://ocaml.org/manual/api/Str.html' },
      { id: 'ocaml-re-posix', name: 'OCaml Re / POSIX', flavor: 'POSIX ERE', family: 'POSIX',     version: '', url: 'https://github.com/ocaml/ocaml-re'  },
      { id: 'ocaml-re-emacs', name: 'OCaml Re / Emacs', flavor: 'Emacs', family: 'Emacs',  version: '', url: 'https://github.com/ocaml/ocaml-re' },
      { id: 'ocaml-re-longest',  name: 'OCaml Re / PCRE-longest',  flavor: 'PCRE, leftmost-longest', family: 'Perl/PCRE', version: '', url: 'https://github.com/ocaml/ocaml-re' },
      { id: 'ocaml-re-shortest', name: 'OCaml Re / PCRE-shortest', flavor: 'PCRE, shortest match',   family: 'Perl/PCRE', version: '', url: 'https://github.com/ocaml/ocaml-re' },
      { id: 'regelk',         name: 'RegElk',           flavor: 'ECMAScript (linear lookaround)', family: 'ECMAScript', version: '', url: 'https://github.com/epfl-systemf/RegElk' },
    ],
  },
  nim: {
    script: '../../nim.js', global: 'nimMatch',
    engines: [{ id: 'nim-regex', name: 'Nim regex', flavor: 'NFA/DFA (full)', family: 'linear', version: '0.26', url: 'https://github.com/nitely/nim-regex' }],
  },
};
const C = CONFIG[MODULE];
const mods = {}, errs = {};
let initErr = null;
async function load() {
  if (C.mods) {
    await Promise.allSettled(C.engines.map((e) =>
      import(C.mods[e.id]).then((m) => { mods[e.id] = m; }).catch((err) => { errs[e.id] = errStr(err); })));
  } else {
    try { importScripts(C.script); } catch (e) { initErr = errStr(e); }
  }
}
function runMatch(d) {
  if (C.mods) {
    const mod = mods[d.engine];
    try { return mod ? mod.match(d.pattern, d.input, C.flags && C.flags[d.engine]) : { error: errs[d.engine] || 'unavailable' }; }
    catch (err) { return { error: errStr(err) }; }
  }
  const fn = self[C.global];
  try { return (typeof fn === 'function') ? JSON.parse(fn(d.engine, d.pattern, d.input)) : { error: initErr || 'unavailable' }; }
  catch (err) { return { error: errStr(err) }; }
}
const q = []; onmessage = (e) => q.push(e);
import('../protocol.js').then(({ register, once }) => register({ list: () => C.engines, ensure: once(load), match: runMatch }, q));
