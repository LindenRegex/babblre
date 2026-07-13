import { readFileSync } from 'node:fs';
import { diff } from './node/reference.mjs';

const ref = readFileSync(new URL('./reference/reference.jsonl', import.meta.url), 'utf8')
  .split('\n').filter(Boolean).map((l) => JSON.parse(l));
const { out } = await diff(ref);
if (out.length) {
  console.error(`✗ ${out.length} engine/case output(s) changed vs reference (run \`make reference-capture\` if intended):\n\n${out.join('\n')}`);
  process.exit(1);
}
const limited = ref.filter((c) => c.result.killed || c.result.kind === 'limit').length;
const engines = new Set(ref.map((c) => c.engine)).size;
const cases = new Set(ref.map((c) => c.case)).size;
console.log(`✓ reference output preserved: ${engines} engines × ${cases} cases (${limited} resource-limited cell(s))`);
process.exit(0);
