import van from './van.min.js';
import { unitFor, convertGroups } from './units.js';
export { van, convertGroups };
const { span } = van.tags;

export const CASES = await fetch(new URL('./cases.json', import.meta.url)).then((r) => r.json());

export const SOURCE_ORDER = ['boost / POSIX', 'Linden', 'lingua-franca', 'unicode'];
const SOURCE = Object.fromEntries(CASES.map((c) => [c.id, c.source]));
for (const c of CASES) if (!SOURCE_ORDER.includes(c.source))
  throw new Error(`cases.json: case ${c.id} has source ${JSON.stringify(c.source)} not in SOURCE_ORDER`);
export function caseSource(id) { const s = SOURCE[id]; if (s === undefined) throw new Error(`unknown case id ${id}`); return s; }

const RUNTIMES = [
  { kind: 'cpp',    url: 'api/wasm/worker.js?module=engines.js&style=emscripten' },
  { kind: 'rust',   url: 'api/wasm/worker.js?module=rust_regex.wasm&style=raw' },
  { kind: 'zig',    url: 'api/wasm/worker.js?module=zig_regex.wasm&style=raw' },
  { kind: 'go',     url: 'api/go/worker.js' },
  { kind: 'dotnet', url: 'api/dotnet/worker.js', opts: { type: 'module' } },
  { kind: 'python', url: 'api/python/worker.js', opts: { type: 'module' } },
  { kind: 'js',     url: 'api/js/worker.js?module=js' },
  { kind: 'e262',   url: 'api/js/worker.js?module=e262' },
  { kind: 'ocaml',  url: 'api/js/worker.js?module=ocaml' },
  { kind: 'nim',    url: 'api/js/worker.js?module=nim' },
  { kind: 'haskell', url: 'api/haskell/worker.js' },
  { kind: 'java',   url: 'api/java/worker.js', opts: { type: 'module' } },
  { kind: 'swift',  url: 'api/swift/worker.js' },
  { kind: 'icu',    url: 'api/wasm/worker.js?module=icu_regex.js&style=emscripten&factory=createIcu' },
  { kind: 'memo',   url: 'api/wasm/worker.js?module=memo_regex.js&style=emscripten&factory=createMemo' },
  { kind: 'rematch', url: 'api/wasm/worker.js?module=rematch.js&style=emscripten&factory=createRematch' },
  { kind: 're2c',   url: 'api/wasm/worker.js?module=re2c_regex.js&style=emscripten&factory=createRe2c' },
];
const RT = Object.fromEntries(RUNTIMES.map((r) => [r.kind, r]));
const kill = (w) => { try { w?.terminate(); } catch (_) {} };

function runtimeList(rt) {
  return new Promise((resolve) => {
    let done = false;
    const fail = (why) => { console.error(`regex-compare: runtime '${rt.kind}' loaded NO engines (${why}) — is ${rt.url.split('?')[0]} built? (make all)`); finish([]); };
    const finish = (v) => { if (!done) { done = true; resolve(v); } };
    let w; try { w = new Worker(rt.url, rt.opts); } catch (_) { return fail('spawn failed'); }
    w.onmessage = (ev) => {
      if (ev.data.compiled) { moduleCache.set(rt.url, ev.data.compiled); return; }
      if (ev.data.list) { finish(ev.data.list); kill(w); }
    };
    w.onerror = () => { fail('worker error'); kill(w); };
    w.postMessage({ cmd: 'list' });
    setTimeout(() => { if (!done) fail('timed out'); kill(w); }, INIT_TIMEOUT_MS);
  });
}
const FAMILY_ORDER = ['Perl/PCRE', 'ECMAScript', 'linear', 'POSIX', 'Emacs'];
const familyRank = (fam) => { const i = FAMILY_ORDER.indexOf(fam); return i < 0 ? FAMILY_ORDER.length : i; };
function orderEngines(a, b) {
  return familyRank(a.family) - familyRank(b.family) || a.name.localeCompare(b.name) || a.id.localeCompare(b.id);
}
let _discovered;
export const failedRuntimes = [];   // kinds whose worker loaded no engines in the last discovery
export function discoverEngines() {
  return _discovered ||= (async () => {
    const lists = await Promise.all(RUNTIMES.map((rt) => runtimeList(rt)));
    failedRuntimes.length = 0;
    RUNTIMES.forEach((rt, i) => { if (!(lists[i] || []).length) failedRuntimes.push(rt.kind); });
    const out = [];
    RUNTIMES.forEach((rt, i) => (lists[i] || []).forEach((info) => out.push(
      { id: info.id, name: info.name, flavor: info.flavor, family: info.family || 'other', version: info.version || '', url: info.url || '', kind: rt.kind,
        units: info.units || unitFor({ id: info.id, kind: rt.kind }) })));
    if (!out.length) throw new Error('no engines discovered — build outputs missing (run: make all)');
    out.sort(orderEngines);
    return out;
  })();
}

export const CLASSES = Object.fromEntries(FAMILY_ORDER.map((name) => [name, (e) => e.family === name]));
const PALETTE = ['var(--agree-1)','var(--agree-2)','var(--agree-3)','var(--agree-4)',
                        'var(--agree-5)','var(--agree-6)','var(--agree-7)','var(--agree-8)'];
export const NEUTRAL = 'var(--neutral)';
const ERRCOL  = 'var(--error)';
const GCOL = ['var(--group-0)','var(--group-1)','var(--group-2)','var(--group-3)',
                     'var(--group-4)','var(--group-5)','var(--group-6)','var(--group-7)'];

function errKind(e) {
  if (e?.kind) return e.kind;
  return /complex|stack|eternal|limit|exceed/i.test(e?.error || '') ? 'limit' : 'error';
}
function classify(e) {
  if (!e) return 'pending';
  if (e.unavailable) return 'unavailable';
  if (e.killed) return 'timeout';
  if (!e.ok) return errKind(e);
  if (e.bool) return e.matched ? 'accept' : 'reject';
  return e.matched ? 'match' : 'nomatch';
}
const UNAVAILABLE = { unavailable: true };
export const KILLED = { killed: true };
const FAILS = new Set(['unavailable', 'timeout', 'limit', 'error']);
const sigCache = new WeakMap();
function sig(e, str) {
  if (e !== null && typeof e === 'object') { const c = sigCache.get(e); if (c !== undefined) return c; }
  const k = classify(e);
  const s = (k === 'match') ? JSON.stringify({ k, groups: convertGroups(e.groups, e.units || 'bytes', str ?? '', 'unicode')
    .map((c, i) => (c ? { i, s: c.span, t: c.trunc } : null)).filter(Boolean) })
    : JSON.stringify({ k: k === 'reject' ? 'nomatch' : k });
  if (e !== null && typeof e === 'object') sigCache.set(e, s);
  return s;
}
export function distinctCount(results, str) {
  return new Set(results.map((r) => sig(r, str))).size;
}
const agreeColor = (i) => i < PALETTE.length ? PALETTE[i] : `hsl(${(i * 47) % 360} 60% 45%)`;
export function colorsFor(results, str) {
  const seen = new Map(); let next = 0;
  return results.map((r) => {
    if (r == null) return NEUTRAL;
    if (FAILS.has(classify(r))) return ERRCOL;
    const s = sig(r, str);
    if (!seen.has(s)) { seen.set(s, agreeColor(next)); next += 1; }
    return seen.get(s);
  });
}

function chars(glyphs, ctx) { return glyphs.map((ch) => span({ class: ctx ? 'c ctx' : 'c' }, ch)); }

function buildForest(gs) {
  const sorted = [...gs].sort((a, b) => a.s - b.s || b.e - a.e || a.g - b.g);
  const roots = [], stack = [];
  for (const n of sorted) {
    n.children = [];
    while (stack.length && !(stack.at(-1).s <= n.s && n.e <= stack.at(-1).e)) stack.pop();
    (stack.length ? stack.at(-1).children : roots).push(n);
    stack.push(n);
  }
  return roots;
}
const endFrac = (n) => n.trunc && n.trunc[1];
function renderNode(n, cps) {
  const kids = n.children.slice().sort((a, b) => a.s - b.s);
  const parts = []; let pos = n.s;
  for (const k of kids) {
    if (k.s > pos) parts.push(...chars(cps.slice(pos, k.s)));
    parts.push(...renderNode(k, cps)); pos = k.e + (endFrac(k) ? 1 : 0);
  }
  if (pos < n.e) parts.push(...chars(cps.slice(pos, n.e)));
  const gcol = GCOL[Math.min(n.g, GCOL.length - 1)], ef = endFrac(n);
  const partial = n.trunc && (n.trunc[0] || n.trunc[1]);
  const out = [span({ class: 'g' + (n.s === n.e && !ef ? ' empty' : '') + (partial ? ' partial' : ''),
                     'data-g': String(n.g), title: n.title || '', style: `--g:${gcol}` }, ...parts)];
  if (ef && cps[n.e] != null) out.push(span({ class: 'c pe', style: `--g:${gcol}; --f:${(ef.num / ef.den).toFixed(3)}`,
                                             title: `match extends +${ef.num}/${ef.den} into this character` }, cps[n.e]));
  return out;
}
function renderNote(k, str, e) {
  switch (k) {
    case 'pending':     return [];
    case 'unavailable': return [span({ class: 'note killed' }, 'unavailable')];
    case 'timeout':     return [span({ class: 'note killed' }, 'timeout')];
    case 'limit': case 'error':
      return [span({ class: 'note ' + k, title: k === 'limit' ? (e.error || 'limit exceeded') : (e.error || 'invalid pattern') }, '⚠')];
    case 'accept': case 'reject':
      return [span({ class: 'boolmark ' + (e.matched ? 'yes' : 'no'), title: e.matched ? 'match' : 'no match' }, e.matched ? '✓' : '✗')];
    case 'nomatch':
      return [...(str ? chars([...str], true) : [span({ class: 'ctx' }, '(empty)')]), span({ class: 'note nomatch' }, ' no match')];
    default: return null;
  }
}
export function renderMatch(str, e, mode = 'unicode') {
  const k = classify(e);
  const note = renderNote(k, str, e);
  if (note) return note;
  const cps = [...str];
  const uni = convertGroups(e.groups, e.units || 'bytes', str, 'unicode');
  const off = convertGroups(e.groups, e.units || 'bytes', str, mode);
  const gs = [];
  uni.forEach((c, idx) => { if (c) gs.push({ g: idx, s: c.span[0], e: c.span[1], trunc: c.trunc,
    title: `group ${idx}: ${mode === 'utf8' ? 'bytes' : 'chars'} [${off[idx].span[0]}, ${off[idx].span[1]}]` }); });
  // dim context is everything outside the rendered spans, which can extend beyond group 0
  const parts = []; let pos = 0;
  for (const n of buildForest(gs)) {
    if (n.s > pos) parts.push(...chars(cps.slice(pos, n.s), true));
    parts.push(...renderNode(n, cps));
    pos = Math.max(pos, n.e + (endFrac(n) ? 1 : 0));
  }
  if (pos < cps.length) parts.push(...chars(cps.slice(pos), true));
  return parts;
}

const INIT_TIMEOUT_MS = 45000;
const BUDGET = { live: 5000, batch: 800 };
const budget = (mode) => BUDGET[mode];

const clients = new Map();
const moduleCache = new Map();
function client(kind) {
  if (!clients.has(kind)) clients.set(kind, makeRuntimeClient(kind));
  return clients.get(kind);
}
function makeRuntimeClient(kind) {
  const rt = RT[kind];
  let worker = null, ready = false, queue = [], current = null, initTimer = null;
  function settle(value) { if (current) { clearTimeout(current.t); const r = current.resolve; current = null; r(value); } }
  function failAll(value) {
    clearTimeout(initTimer); settle(value);
    while (queue.length) queue.shift().resolve(value);
    kill(worker);
    worker = null; ready = false;
  }
  function spawn() {
    ready = false;
    const w = worker = new Worker(rt.url, rt.opts);
    w.onmessage = (ev) => {
      if (worker !== w) return;   // ignore a stray message from a superseded worker
      const d = ev.data;
      if (d.compiled) { moduleCache.set(rt.url, d.compiled); return; }
      if (d.ready) { ready = true; clearTimeout(initTimer); pump(); return; }
      if (!current) return;
      // respawn to contain a wasm trap then retry the match once on the fresh module
      if (d.crashed) {
        const c = current; current = null; clearTimeout(c.t);
        kill(w); worker = null; ready = false;
        if (c.retried) c.resolve(d.result); else { c.retried = true; queue.unshift(c); }
        spawn(); pump(); return;
      }
      clearTimeout(current.t); const r = current.resolve; current = null; r(d.result); pump();
    };
    w.onerror = () => {
      if (worker !== w) return;
      if (!ready) { failAll(UNAVAILABLE); return; }
      kill(w); worker = null; ready = false;
      settle(KILLED); spawn(); pump();
    };
    w.postMessage({ cmd: 'init', module: moduleCache.get(rt.url) });
    initTimer = setTimeout(() => { if (!ready) failAll(UNAVAILABLE); }, INIT_TIMEOUT_MS);
  }
  function pump() {
    if (current || !queue.length) return;
    if (!worker) { spawn(); return; }
    if (!ready) return;
    current = queue.shift();
    worker.postMessage({ engine: current.engine, pattern: current.pattern, input: current.input });
    current.t = setTimeout(() => {
      kill(worker); worker = null; ready = false;
      const r = current.resolve; current = null; r(KILLED);
      spawn(); pump();
    }, current.timeout);
  }
  return {
    run: (engineId, pattern, input, timeout, liveKey) => new Promise((resolve) => {
      if (liveKey) {   // a newer live request supersedes a queued one for the same engine
        const i = queue.findIndex((q) => q.liveKey === liveKey);
        if (i >= 0) queue.splice(i, 1)[0].resolve(KILLED);   // caller's stale token discards it
      }
      queue.push({ engine: engineId, pattern, input, timeout, resolve, liveKey });
      if (!worker) spawn(); else pump();
    }),
  };
}
let _byId;
export async function matchOne(engineId, pattern, input, { mode = 'batch' } = {}) {
  _byId ||= Object.fromEntries((await discoverEngines()).map((e) => [e.id, e]));
  const engine = _byId[engineId];
  if (!engine) return { id: engineId, ok: false, matched: false, error: 'unknown engine', groups: [] };
  const r = await client(engine.kind).run(engineId, pattern, input, budget(mode),
                                          mode === 'live' ? engineId : undefined);
  if (r && r.groups) r.units = engine.units;
  return r;
}

export const CORE_IDS = [
  'boost-pcre', 'boost-posix', 'std-ecma', 'std-posix', 'srell', 'pcre1', 'pcre2', 'pcre2-dfa',
  're2', 're2-longest', 'oniguruma', 'tre', 'rust-regex', 'go-regexp', 'actual-ecma', 'engine262',
  'tiny-regex-c', 're1-pike', 'ocaml-re', 'nim-regex', 'zig-regex',
];
