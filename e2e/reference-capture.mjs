import { writeFileSync } from 'node:fs';
import { collect } from './node/reference.mjs';

const results = await collect();
writeFileSync(new URL('./reference/reference.jsonl', import.meta.url), results.map((r) => JSON.stringify(r)).join('\n') + '\n');
const engines = new Set(results.map((c) => c.engine)).size;
const cases = new Set(results.map((c) => c.case)).size;
console.log(`captured ${engines} engines × ${cases} cases`);
process.exit(0);
