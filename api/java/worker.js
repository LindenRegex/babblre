import { engineCount, engineInfo, engineMatch } from '../../java_regex.js';
import { serve, fail, once } from '../protocol.js';
let list = [], idx = {};
function load() {
  for (let i = 0, n = parseInt(engineCount(), 10); i < n; i++) { const o = JSON.parse(engineInfo(i)); list.push(o); idx[o.id] = i; }
}
const ensure = once(async () => load());
onmessage = serve({
  list: () => ensure().then(() => list),
  ensure,
  match: (d) => (idx[d.engine] != null) ? JSON.parse(engineMatch(idx[d.engine], d.pattern, d.input)) : fail(d.engine, 'unavailable'),
});
