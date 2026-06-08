import { RE2JS } from 'https://esm.sh/re2js@2.8.6';
export function match(pattern, input) {
  try {
    const re = RE2JS.compile(pattern);
    const m = re.matcher(input);
    if (!m.find()) return { matched: false, groups: [] };
    const n = m.groupCount(), g = [];
    for (let i = 0; i <= n; i++) { const s = m.start(i); g.push(s === -1 ? null : [s, m.end(i)]); }
    return { matched: true, groups: g };
  } catch (e) {
    const err = { error: String((e && e.message) || e) };
    if (e && (e.error === 'expression too large' || e.error === 'expression nests too deeply')) err.kind = 'limit';
    return err;
  }
}
