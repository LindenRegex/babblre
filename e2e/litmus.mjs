import assert from 'node:assert';
import { convertGroups } from '../web/units.js';

const F = (num, den) => ({ num, den });
const CASES = [
  { n: 'rust  . 😀', u: 'bytes',       g: [[0, 4]], s: '😀', utf8: [[0, 4]], uni: [{ span: [0, 1], trunc: [null, null] }] },
  { n: 'tre   . 😀', u: 'bytes',       g: [[0, 1]], s: '😀', utf8: [[0, 1]], uni: [{ span: [0, 0], trunc: [null, F(1, 4)] }] },
  { n: 'py    . 😀', u: 'codepoints',  g: [[0, 1]], s: '😀', utf8: [[0, 4]], uni: [{ span: [0, 1], trunc: [null, null] }] },
  { n: 'js    . 😀', u: 'utf16',       g: [[0, 1]], s: '😀', utf8: [[0, 2]], uni: [{ span: [0, 0], trunc: [null, F(1, 2)] }] },
  { n: 'java  . 😀', u: 'utf16',       g: [[0, 2]], s: '😀', utf8: [[0, 4]], uni: [{ span: [0, 1], trunc: [null, null] }] },
  { n: 'rust  . é',  u: 'bytes',       g: [[0, 2]], s: 'é',  utf8: [[0, 2]], uni: [{ span: [0, 1], trunc: [null, null] }] },
  { n: 'tre   . é',  u: 'bytes',       g: [[0, 1]], s: 'é',  utf8: [[0, 1]], uni: [{ span: [0, 0], trunc: [null, F(1, 2)] }] },
  { n: 'js    . é',  u: 'utf16',       g: [[0, 1]], s: 'é',  utf8: [[0, 2]], uni: [{ span: [0, 1], trunc: [null, null] }] },
  { n: 'rust  x 😀x', u: 'bytes',      g: [[4, 5]], s: '😀x', utf8: [[4, 5]], uni: [{ span: [1, 2], trunc: [null, null] }] },
  { n: 'py    x 😀x', u: 'codepoints', g: [[1, 2]], s: '😀x', utf8: [[4, 5]], uni: [{ span: [1, 2], trunc: [null, null] }] },
  { n: 'js    x 😀x', u: 'utf16',      g: [[2, 3]], s: '😀x', utf8: [[4, 5]], uni: [{ span: [1, 2], trunc: [null, null] }] },
  { n: 'rust  .. 😀x', u: 'bytes',      g: [[0, 5]], s: '😀x', utf8: [[0, 5]], uni: [{ span: [0, 2], trunc: [null, null] }] },
  { n: 'tre   .. 😀x', u: 'bytes',      g: [[0, 2]], s: '😀x', utf8: [[0, 2]], uni: [{ span: [0, 0], trunc: [null, F(2, 4)] }] },
  { n: 'js    .. 😀x', u: 'utf16',      g: [[0, 2]], s: '😀x', utf8: [[0, 4]], uni: [{ span: [0, 1], trunc: [null, null] }] },
  { n: 'java  .. 😀x', u: 'utf16',      g: [[0, 3]], s: '😀x', utf8: [[0, 5]], uni: [{ span: [0, 2], trunc: [null, null] }] },
  { n: 'rust (a)(é)', u: 'bytes',      g: [[0, 3], [0, 1], [1, 3]], s: 'aé',
    utf8: [[0, 3], [0, 1], [1, 3]], uni: [{ span: [0, 2], trunc: [null, null] }, { span: [0, 1], trunc: [null, null] }, { span: [1, 2], trunc: [null, null] }] },
  { n: 'py   (a)(é)', u: 'codepoints', g: [[0, 2], [0, 1], [1, 2]], s: 'aé',
    utf8: [[0, 3], [0, 1], [1, 3]], uni: [{ span: [0, 2], trunc: [null, null] }, { span: [0, 1], trunc: [null, null] }, { span: [1, 2], trunc: [null, null] }] },
];

let fail = 0;
for (const c of CASES) {
  const utf8 = convertGroups(c.g, c.u, c.s, 'utf8').map((x) => x.span);
  const uni = convertGroups(c.g, c.u, c.s, 'unicode');
  try {
    assert.deepEqual(utf8, c.utf8, `${c.n}: UTF-8 mode`);
    assert.deepEqual(uni, c.uni, `${c.n}: Unicode mode`);
  } catch (e) { fail++; console.error(`✗ ${e.message}\n   got utf8=${JSON.stringify(utf8)} uni=${JSON.stringify(uni)}`); }
}
const sig = (unit, g, s) => JSON.stringify(convertGroups(g, unit, s, 'unicode'));
assert.equal(sig('bytes', [[4, 5]], '😀x'), sig('utf16', [[2, 3]], '😀x'), 'byte & utf16 x-match must cluster');
assert.equal(sig('bytes', [[4, 5]], '😀x'), sig('codepoints', [[1, 2]], '😀x'), 'byte & codepoint x-match must cluster');
assert.notEqual(sig('utf16', [[0, 1]], '😀'), sig('utf16', [[0, 2]], '😀'), 'lone-surrogate . must NOT cluster with whole-codepoint .');
assert.notEqual(sig('bytes', [[0, 1]], '😀'), sig('codepoints', [[0, 1]], '😀'), '1-byte . must NOT cluster with whole-codepoint .');

if (fail) { console.error(`\n${fail} litmus case(s) failed`); process.exit(1); }
console.log(`✓ litmus: ${CASES.length} conversion cases + 4 clustering assertions pass`);
