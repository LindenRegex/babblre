import { serve, fail, once, errStr } from '../protocol.js';
const ENGINES = [
  { id: 'python-re',          name: 'CPython re',     flavor: 'Perl-ish', family: 'Perl/PCRE', version: '3.12', url: 'https://docs.python.org/3/library/re.html'  },
  { id: 'python-regex',       name: 'regex (PyPI) / Perl-NG', flavor: 'Perl-NG', family: 'Perl/PCRE',          version: '', url: 'https://github.com/mrabarnett/mrab-regex' },
  { id: 'python-regex-posix', name: 'regex (PyPI) / POSIX',   flavor: 'leftmost-longest', family: 'POSIX',     version: '', url: 'https://github.com/mrabarnett/mrab-regex' },
  { id: 'greenery',           name: 'greenery',       flavor: 'accept/reject (regex↔FSM)', family: 'other', version: '', url: 'https://github.com/qntm/greenery' },
  { id: 'interegular',        name: 'interegular',    flavor: 'accept/reject (regex↔FSM)', family: 'other', version: '', url: 'https://github.com/MegaIng/interegular' },
  { id: 'automata-lib',       name: 'automata-lib',   flavor: 'accept/reject (regex→NFA)', family: 'other', version: '', url: 'https://github.com/caleb531/automata' },
  { id: 'pyformlang',         name: 'pyformlang',     flavor: 'accept/reject (regex→FA)', family: 'other',  version: '', url: 'https://github.com/Aunsiels/pyformlang' },
  { id: 'fado',               name: 'FAdo',           flavor: 'accept/reject (regex→FA)', family: 'other',  version: '', url: 'https://fado.dcc.fc.up.pt/' },
];
const EAGER = ['regex', 'greenery', 'interegular'];
const HEAVY = ['automata-lib', 'pyformlang', 'fado'];
const TESTING = typeof process !== 'undefined' && !!process.versions?.node;
let matchFn = null, initErr = null;
const ensure = once(async () => {
  try {
    const pins = Object.fromEntries((await (await fetch('../../python/freeze.txt')).text())
      .split('\n').map((l) => l.trim()).filter((l) => l && !l.startsWith('#'))
      .map((spec) => [spec.split('==')[0].toLowerCase(), spec]));
    const pin = (p) => pins[p.toLowerCase()] || p;
    const warn = (p) => (e) => console.warn('pyodide install failed:', p, errStr(e));
    const { loadPyodide } = await import('https://cdn.jsdelivr.net/pyodide/v0.26.4/full/pyodide.mjs');
    const py = await loadPyodide();
    await py.loadPackage('micropip');
    const mp = py.pyimport('micropip');
    const heavy = async () => {
      await mp.install(pin('automata-lib')).catch(warn('automata-lib'));
      await mp.install(pin('pyformlang')).catch(warn('pyformlang'));
      for (const p of ['fado', 'lark', 'bitarray', 'deprecation']) await mp.install.callKwargs(pin(p), { deps: false }).catch(warn(p));
    };
    for (const p of EAGER) await mp.install(pin(p)).catch(warn(p));
    const bg = heavy();
    if (TESTING) await bg;
    py.runPython(await (await fetch('../../python/engines.py')).text());
    matchFn = py.globals.get('engine_match');
    for (const e of ENGINES) if (TESTING || !HEAVY.includes(e.id)) { try { matchFn(e.id, 'a', 'a'); } catch (err) { console.warn('pyodide warm-up failed:', e.id, errStr(err)); } }
  } catch (err) { initErr = errStr(err); throw err; }
});
onmessage = serve({
  list: () => ENGINES,
  ensure,
  match: (d) => matchFn ? JSON.parse(matchFn(d.engine, d.pattern, d.input)) : fail(d.engine, initErr || 'unavailable'),
});
