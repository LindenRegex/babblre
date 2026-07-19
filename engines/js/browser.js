export function match(pattern, input, flags = 'd') {
  try {
    const m = new RegExp(pattern, flags).exec(input);
    if (!m) return { matched: false, groups: [] };
    return { matched: true, groups: m.indices.map((p) => (p == null ? null : [p[0], p[1]])) };
  } catch (e) { return { error: String((e && e.message) || e) }; }
}
