import { matchOne, discoverEngines, CASES } from './host.mjs';

export const EXTRA = [
  { id: 'io-pos', regex: 'abc', input: 'abc', note: 'literal positive', source: 'io-pairs' },
  { id: 'io-neg', regex: 'abc', input: 'xyz', note: 'literal negative', source: 'io-pairs' },
  { id: 'io-esc', regex: '"\\\t\n\x01(', input: 'x', note: 'special chars must escape through the wire', source: 'io-pairs' },
];
export const ALL_CASES = [...CASES, ...EXTRA];

const INFRA = /^unavailable$|import of|Cannot use import|Unexpected token|scheme in|node:/;
const isInfra = (r) => r.unavailable || (!r.ok && INFRA.test(r.error || ''));   // failed-init runtimes resolve {unavailable:true} with no error text
import { setTimeout as sleep } from 'node:timers/promises';
const output = ({ id, units, ...rest }) => rest;   // keep the match output, drop the engine-level fields

const runCases = async (id) => {
  const row = {};
  for (const c of ALL_CASES) row[c.id] = await matchOne(id, c.regex, c.input);
  return row;
};

export async function collect() {
  const engines = await discoverEngines();
  const byKind = {};
  for (const e of engines) (byKind[e.kind] ??= []).push(e);
  const rows = {};
  await Promise.all(Object.values(byKind).map(async (list) => {
    for (const e of list) {
      let row = await runCases(e.id);
      for (let t = 0; t < 5 && Object.values(row).every(isInfra); t++) { await sleep(3000); row = await runCases(e.id); }
      if (Object.values(row).every(isInfra)) throw new Error(`engine ${e.id} never loaded under Node (every case is an infra failure)`);
      rows[e.id] = row;
    }
  }));
  const rechecks = {};
  for (const e of engines)
    for (const c of ALL_CASES) if (rows[e.id][c.id].killed) (rechecks[e.kind] ??= []).push([e.id, c]);
  await Promise.all(Object.values(rechecks).map(async (cells) => {
    for (const [id, c] of cells) {
      let r = await matchOne(id, c.regex, c.input);
      if (r.killed) r = await matchOne(id, c.regex, c.input);
      rows[id][c.id] = r;
    }
  }));
  const results = [];
  for (const engine of engines.map((e) => e.id).sort()) for (const c of ALL_CASES) results.push({ engine, case: c.id, result: output(rows[engine][c.id]) });
  return results;
}

const cellKey = (engine, caseId) => `${engine}/${caseId}`;

export async function diff(ref) {
  const cur = await collect();
  const curCell = Object.fromEntries(cur.map((c) => [cellKey(c.engine, c.case), c.result]));
  const curEngines = new Set(cur.map((c) => c.engine));
  const out = [];
  const gone = [...new Set(ref.map((c) => c.engine))].filter((id) => !curEngines.has(id));
  if (gone.length) out.push(`engines that no longer load (was working, now infra-unavailable): ${gone.join(', ')}`);
  const refCells = new Set(ref.map((c) => cellKey(c.engine, c.case)));
  for (const engine of [...curEngines].sort())
    for (const c of ALL_CASES)
      if (!refCells.has(cellKey(engine, c.id)))
        out.push(`${engine} / ${c.id}: no recorded reference output (new engine or case? run \`make reference-capture\`)`);
  const norm = (r) => JSON.stringify(r && (r.killed || r.kind === 'limit') ? { kind: 'limit' } : r);
  for (const { engine, case: caseId, result } of ref) {
    if (!curEngines.has(engine)) continue;
    const now = curCell[cellKey(engine, caseId)];
    if (norm(result) !== norm(now)) out.push(`${engine} / ${caseId}:\n    was: ${JSON.stringify(result)}\n    now: ${JSON.stringify(now)}`);
  }
  return { out };
}
