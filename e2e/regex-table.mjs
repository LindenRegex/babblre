import { matchOne, discoverEngines, failedRuntimes } from './node/host.mjs';
import { convertGroups } from '../web/units.js';
import Table from 'cli-table3';

const argv = process.argv.slice(2);
if (argv.includes('--list')) {
  const engines = await discoverEngines();
  if (failedRuntimes.length) {
    console.error(`--list: runtime(s) loaded no engines: ${failedRuntimes.join(', ')} — refusing to emit a partial engine list`);
    process.exit(1);
  }
  const groups = new Map();   // base name -> [{ variant, url }]; the name is "Base / variant" or just "Base"
  for (const e of engines) {
    const i = e.name.indexOf(' / ');
    const base = i < 0 ? e.name : e.name.slice(0, i);
    (groups.get(base) ?? groups.set(base, []).get(base)).push({ variant: i < 0 ? null : e.name.slice(i + 3), url: e.url });
  }
  const out = [''];
  for (const base of [...groups.keys()].sort((a, b) => a.localeCompare(b))) {
    const vs = groups.get(base).sort((a, b) => (a.variant || '').localeCompare(b.variant || ''));
    out.push(vs.length === 1 && vs[0].variant === null
      ? `- [\`${base}\`](${vs[0].url})`
      : `- \`${base}\`: ` + vs.map((v) => `[\`${v.variant}\`](${v.url})`).join(', '));
  }
  out.push('');
  console.log(out.join('\n'));
  process.exit(0);
}
let mode = 'unicode';
const rest = argv.filter((a) => { const m = a.match(/^--mode=(utf8|unicode)$/); if (m) { mode = m[1]; return false; } return true; });
if (rest.length === 0 || rest.length % 2 !== 0) {
  console.error('usage: regex-table.sh [--mode=unicode|utf8] RE1 STR1 [RE2 STR2 ...]');
  process.exit(2);
}
const pairs = [];
for (let i = 0; i < rest.length; i += 2) pairs.push({ re: rest[i], str: rest[i + 1] });

function cell(r, str, units) {
  if (!r || r.killed) return 'timeout';
  if (r.error === 'unavailable') return 'n/a';
  if (!r.ok) return '⚠ ' + (r.error || 'error');
  if (r.bool) return r.matched ? 'accept' : 'reject';
  if (!r.matched) return '∅';
  const cps = [...str], conv = convertGroups(r.groups, units, str, mode);
  const one = (c) => {
    if (!c) return 'null';
    if (mode === 'utf8') return `[${c.span[0]},${c.span[1]}]`;
    let s = JSON.stringify(cps.slice(c.span[0], c.span[1]).join(''));
    if (c.trunc[0]) s = `${c.trunc[0].num}/${c.trunc[0].den}+` + s;
    if (c.trunc[1]) s = s + `+${c.trunc[1].num}/${c.trunc[1].den}`;
    return s;
  };
  return '[' + conv.map(one).join(', ') + ']';
}

const engines = await discoverEngines();
const unitOf = Object.fromEntries(engines.map((e) => [e.id, e.units]));
const byKind = {};
for (const e of engines) (byKind[e.kind] ??= []).push(e);

const isInfra = (r) => !r.ok && /No module|unavailable|import of|Cannot use|scheme in|node:/.test(r.error || '');
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const runRaw = async (id) => { const o = []; for (const p of pairs) o.push(await matchOne(id, p.re, p.str)); return o; };

const rows = {};
await Promise.all(Object.values(byKind).map(async (list) => {
  for (const e of list) {
    let raw = await runRaw(e.id);
    for (let t = 0; t < 4 && raw.every(isInfra); t++) { await sleep(3000); raw = await runRaw(e.id); }
    rows[e.id] = raw.map((r, i) => cell(r, pairs[i].str, unitOf[e.id]));
  }
}));

const table = new Table({
  head: ['engine / flavor', ...pairs.map((p) => `/${p.re}/\n"${p.str}"`)],
  colWidths: [26, ...pairs.map(() => 40)], wordWrap: true, wrapOnWordBoundary: false,
  style: { head: [], border: [] },
});
for (const e of engines) table.push([`${e.name}\n${e.flavor}`, ...rows[e.id]]);
console.log(table.toString());
process.exit(0);
