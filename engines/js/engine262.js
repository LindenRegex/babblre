import * as e262 from 'https://esm.sh/@engine262/engine262@0.0.1-9f6c6b8329f377e19c4978fa728fda448cf14bd6';
const agent = new e262.Agent();
e262.setSurroundingAgent(agent);
const realm = new e262.ManagedRealm({});
realm.scope(() => {
  realm.evaluateScriptSkipDebugger(`globalThis.__run = function (p, s) {
    try {
      var m = new RegExp(p, 'd').exec(s);
      if (!m) return JSON.stringify({ matched: false, groups: [] });
      var g = [];
      for (var k = 0; k < m.indices.length; k++) { var pr = m.indices[k]; g.push(pr === undefined ? null : [pr[0], pr[1]]); }
      return JSON.stringify({ matched: true, groups: g });
    } catch (e) { return JSON.stringify({ matched: false, groups: [], error: String((e && e.message) || e) }); }
  };`);
});
export function match(pattern, input) {
  let out;
  realm.scope(() => {
    const c = e262.EnsureCompletion(realm.evaluateScriptSkipDebugger(
      `__run(${JSON.stringify(pattern)}, ${JSON.stringify(input)})`));
    if (c instanceof e262.ThrowCompletion) { out = { error: 'engine262 error' }; return; }
    const v = e262.ValueOfNormalCompletion(c);
    out = JSON.parse(v.stringValue ? v.stringValue() : String(v));
  });
  return out;
}
