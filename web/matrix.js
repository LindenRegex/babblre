import { van, CASES, CORE_IDS, NEUTRAL, KILLED, CLASSES, SOURCE_ORDER, caseSource, colorsFor, distinctCount, renderMatch,
         discoverEngines, matchOne } from './shared.js';
const { div, button, label, input, table, thead, tbody, tr, th, td, code, span, a } = van.tags;
const svgEl = van.tags('http://www.w3.org/2000/svg');

const ENGINES = await discoverEngines();
const BY_ID = Object.fromEntries(ENGINES.map((e) => [e.id, e]));
Object.assign(globalThis, { matchOne, ENGINE_IDS: ENGINES.map((e) => e.id) });
const coreAvail = CORE_IDS.filter((id) => BY_ID[id]);
console.assert(coreAvail.length === CORE_IDS.length, 'CORE_IDS names unknown engines:', CORE_IDS.filter((id) => !BY_ID[id]));

const engName = (e) => e.name;
const engNote = (e) => {
  const fl = e.flavor || ''; if (!fl) return '';
  const i = e.name.lastIndexOf(' / '), v = i >= 0 ? e.name.slice(i + 3).toLowerCase() : '', f = fl.toLowerCase();
  return (v && (v.includes(f) || f.includes(v))) ? '' : fl;
};
const engUrl  = (e) => e.url;
const toggled = (set, x) => { const s = new Set(set); s.has(x) ? s.delete(x) : s.add(x); return s; };
const extIcon = () => svgEl.svg({ class: 'ext', viewBox: '0 0 24 24', width: '11', height: '11', 'aria-hidden': 'true' },
  svgEl.path({ d: 'M14 4h6v6' }), svgEl.path({ d: 'M20 4l-9 9' }),
  svgEl.path({ d: 'M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4' }));
const extLink = (u, kids) => a({ href: u, target: '_blank', rel: 'noopener', class: 'extlink',
  title: 'open engine website', onclick: (ev) => ev.stopPropagation() }, kids);

const sel = van.state(new Set(coreAvail));
let selKey = null, selCache = [];
const selEngines = () => { if (selKey !== sel.val) { selKey = sel.val; selCache = ENGINES.filter((e) => sel.val.has(e.id)); } return selCache; };

const computing = new Set();
const cellStates = new Map();
const cState = (eid, cid) => { const k = eid + '|' + cid; let s = cellStates.get(k); if (!s) cellStates.set(k, s = van.state(null)); return s; };
const resultOf = (eid, cid) => cState(eid, cid).val;
const colorTick = van.state(0);
let ctTimer = null;
const bumpColors = () => { if (!ctTimer) ctTimer = setTimeout(() => { ctTimer = null; colorTick.val++; }, 120); };
let pendBuf = null;
const flushCells = () => { const b = pendBuf; pendBuf = null; b.forEach((r, s) => { s.val = r; }); bumpColors(); };
const queueResult = (eid, cid, r) => { (pendBuf ??= new Map()).set(cState(eid, cid), r); if (pendBuf.size === 1) requestAnimationFrame(flushCells); };
async function ensureCompute(e) {
  if (computing.has(e.id)) return;
  computing.add(e.id);
  for (const cs of CASES) queueResult(e.id, cs.id, await matchOne(e.id, cs.regex, cs.input));
}
const caseResults = (caseId) => selEngines().map((e) => cState(e.id, caseId).rawVal);
const INPUT_BY_ID = Object.fromEntries(CASES.map((c) => [c.id, c.input]));
const colorsById = (results, str) => { const cols = colorsFor(results, str), m = {}; selEngines().forEach((e, k) => { m[e.id] = cols[k]; }); return m; };
const colorMap = (caseId) => colorsById(caseResults(caseId), INPUT_BY_ID[caseId]);
const dcountSel = (caseId) => distinctCount(caseResults(caseId), INPUT_BY_ID[caseId]);
const colorCache = new Map();
const colorsOf = (cid) => { let d = colorCache.get(cid); if (!d) colorCache.set(cid, d = van.derive(() => (colorTick.val, colorMap(cid)))); return d; };
CASES.forEach((c) => colorsOf(c.id));

const srcSel = van.state(new Set(SOURCE_ORDER));
const filtered = (s) => CASES.filter((c) => s.has(caseSource(c.id)));
const orderState = van.state(filtered(new Set(SOURCE_ORDER)));
const order = () => orderState.val;
function toggleSrc(s) { srcSel.val = toggled(srcSel.val, s); orderState.val = filtered(srcSel.val); }
function resort() {
  const cs = filtered(srcSel.val);
  const dc = Object.fromEntries(cs.map((c) => [c.id, dcountSel(c.id)]));
  orderState.val = cs.sort((a, b) =>
    SOURCE_ORDER.indexOf(caseSource(a.id)) - SOURCE_ORDER.indexOf(caseSource(b.id)) || dc[b.id] - dc[a.id]);
}

const dispMode = van.state('unicode');
const cells = van.state({});
const setCell = (id, p) => { cells.val = { ...cells.val, [id]: { ...(cells.val[id] || {}), ...p } }; };
const liveTok = {};
function ensureMgr(e) {
  if (!(e.id in liveTok)) { liveTok[e.id] = 0; setCell(e.id, { status: 'init', engine: null, input: '' }); }
  const str = strEl.value, my = ++liveTok[e.id];
  setCell(e.id, { status: 'computing' });
  matchOne(e.id, reEl.value, str, { mode: 'live' }).then((result) => {
    if (my !== liveTok[e.id]) return;
    if (result?.killed) setCell(e.id, { status: 'timeout', engine: null, input: str });
    else setCell(e.id, { status: 'done', engine: result, input: str });
  });
}
const reEl = input({ type: 'text', id: 're', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', value: '(a|b)*', oninput: refresh });
const strEl = input({ type: 'text', id: 'str', spellcheck: 'false', autocapitalize: 'off', autocomplete: 'off', value: 'abba', oninput: refresh });
function refresh() { selEngines().forEach(ensureMgr); }

const liveResult = (c = {}) => c.status === 'done' ? c.engine : c.status === 'timeout' ? KILLED : null;
const liveColors = () => colorsById(selEngines().map((e) => liveResult(cells.val[e.id])), strEl.value);
function liveBody(c) {
  if (c.status === 'init') return [span({ class: 'note nomatch' }, '…')];
  if (!c.engine && c.status !== 'timeout') return [span({ 'aria-busy': 'true' }, '')];
  return renderMatch(c.input, liveResult(c) || c.engine, dispMode.val);
}

function load(e) { ensureCompute(e); ensureMgr(e); }
function commit(ids) { sel.val = new Set(ids); ids.forEach((id) => BY_ID[id] && load(BY_ID[id])); }
function toggle(id) { const s = toggled(sel.val, id); sel.val = s; if (s.has(id)) load(BY_ID[id]); }
const preset = (t) => commit(ENGINES.filter(t).map((e) => e.id));

const engHead = (e) => { const u = engUrl(e), nm = engName(e);
  return [div({ class: 'library' }, u ? a({ href: u, target: '_blank', rel: 'noopener', class: 'liblink' }, nm) : nm),
          div({ class: 'flavor' }, engNote(e), e.version ? span({ class: 'ver' }, ' ' + e.version) : '')]; };
const exHead = (c) => [code({ title: c.note || '' }, c.id),
                       () => div({ class: 'dcount' }, (colorTick.val, dcountSel(c.id)) + ' distinct'),
                       div({ class: 'ex' }, div({ class: 're' }, c.regex), div({ class: 'str' }, JSON.stringify(c.input)))];
const boolClass = (res) => 'r' + (res?.bool ? ' boolcell' : '');
const matchDiv = (children) => div({ class: 'match' }, ...children);
const cell = (eid, cid, cls, color, body) => td({ class: cls, 'data-engine': eid, 'data-case': cid,
                                                  style: () => `border-color:${(typeof color === 'function' ? color() : color) || NEUTRAL}` }, body);
const matchCell = (eid, cid, input, mode) => cell(eid, cid,
  () => boolClass(resultOf(eid, cid)),
  () => colorsOf(cid).val[eid],
  () => matchDiv(renderMatch(input, resultOf(eid, cid), mode)));
const liveCell = (id) => cell(id, 'live', () => boolClass(cells.val[id]?.engine),
                              () => liveColors()[id], () => matchDiv(liveBody(cells.val[id] || {})));
const liveInputs = () => [label('regex', reEl), label('string', strEl)];

function view() {
  return table({ class: 'mtx' },
    () => thead(tr(
      th({ class: 'corner' }, 'engine / flavor'),
      th({ class: 'corner liveedit' }, div('★ live'), ...liveInputs()),
      ...order().map((c) => th({ class: 'exhead' }, ...exHead(c))))),
    () => {
      const cols = order(), mode = dispMode.val;
      return tbody(...selEngines().map((e) => tr(
        th({ class: 'name enghead' }, ...engHead(e)),
        liveCell(e.id),
        ...cols.map((c) => matchCell(e.id, c.id, c.input, mode)))));
    });
}

function toolbar() {
  return div({ class: 'toolbar' },
    div({ class: 'srcfilter' }, span('examples:'),
      ...SOURCE_ORDER.map((s) => button({ class: () => srcSel.val.has(s) ? 'on' : '', onclick: () => toggleSrc(s) }, s)),
      button({ class: 'sortbtn', onclick: resort }, '↓ sort by divergence'),
      button({ class: 'modebtn', title: 'offset units: Unicode codepoints vs UTF-8 bytes',
              onclick: () => { dispMode.val = dispMode.val === 'unicode' ? 'utf8' : 'unicode'; } },
        () => dispMode.val === 'unicode' ? 'offsets: Unicode' : 'offsets: UTF-8')),
    div({ class: 'selector' },
      div({ class: 'presets' },
        button({ onclick: () => commit(coreAvail) }, 'core'),
        button({ onclick: () => commit(ENGINES.map((e) => e.id)) }, 'all'),
        button({ onclick: () => commit([]) }, 'none'),
        ...Object.entries(CLASSES).map(([name, test]) => button({ onclick: () => preset(test) }, name))),
      div({ class: 'checks' }, ...ENGINES.map((e) =>
        div({ class: 'chk' },
          label({ class: 'chklab' },
            input({ type: 'checkbox', checked: () => sel.val.has(e.id), onchange: () => toggle(e.id) }),
            span({ class: 'lib' }, engName(e)), span({ class: 'fl' }, engNote(e))),
          engUrl(e) ? extLink(engUrl(e), extIcon()) : null)))));
}

van.add(document.getElementById('app'), toolbar(), div({ class: 'scroll' }, view()));

selEngines().forEach((e) => load(e));
