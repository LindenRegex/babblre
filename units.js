export const UNIT_BY_KIND = {
  cpp: 'bytes', rust: 'bytes', zig: 'bytes', ocaml: 'bytes', nim: 'bytes', haskell: 'bytes',
  swift: 'bytes', memo: 'bytes', rematch: 'bytes', re2c: 'bytes', go: 'bytes',
  icu: 'utf16', dotnet: 'utf16', java: 'utf16', js: 'utf16', e262: 'utf16',
  python: 'codepoints',
};
export const UNIT_BY_ID = { 'regexp2': 'codepoints', 'regexp2-rtl': 'codepoints',
                            'quickjs': 'utf16', 'quickjs-u': 'utf16', 'quickjs-v': 'utf16' };
export const unitFor = (engine) => UNIT_BY_ID[engine.id] || UNIT_BY_KIND[engine.kind] || 'bytes';

export function measure(str) {
  const cps = [...str], B = [], U = [], byteStart = [0], u16Start = [0];
  const enc = new TextEncoder();
  for (const ch of cps) {
    const b = enc.encode(ch).length, u = ch.length;
    B.push(b); U.push(u); byteStart.push(byteStart[byteStart.length - 1] + b); u16Start.push(u16Start[u16Start.length - 1] + u);
  }
  return { cps, B, U, byteStart, u16Start, nCp: cps.length };
}

export function resolve(off, unit, m) {
  if (unit === 'codepoints') return { byte: m.byteStart[off], cp: off, num: 0, den: 1 };
  const starts = unit === 'bytes' ? m.byteStart : m.u16Start;
  const sizes = unit === 'bytes' ? m.B : m.U;
  let i = 0; while (i < m.nCp && starts[i + 1] <= off) i++;
  if (i >= m.nCp) return { byte: m.byteStart[m.nCp], cp: m.nCp, num: 0, den: 1 };
  const into = off - starts[i];
  if (into === 0) return { byte: m.byteStart[i], cp: i, num: 0, den: 1 };
  const byte = unit === 'bytes' ? off : m.byteStart[i] + Math.round((into / sizes[i]) * m.B[i]);
  return { byte, cp: i, num: into, den: sizes[i] };
}

export function convertGroups(groups, unit, str, mode) {
  const m = measure(str);
  const frac = (r) => (r.num === 0 ? null : { num: r.num, den: r.den });
  return (groups || []).map((g) => {
    if (!g) return null;
    const s = resolve(g[0], unit, m), e = resolve(g[1], unit, m);
    return mode === 'utf8' ? { span: [s.byte, e.byte] } : { span: [s.cp, e.cp], trunc: [frac(s), frac(e)] };
  });
}
