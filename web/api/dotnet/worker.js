import { serve, byId, once, errStr } from '../protocol.js';
const ENGINES = [
  { id: 'dotnet-bt',   name: '.NET / backtracking',    flavor: 'PCRE',       family: 'Perl/PCRE',  version: '8.0', url: 'https://learn.microsoft.com/dotnet/standard/base-types/regular-expressions' },
  { id: 'dotnet-ecma', name: '.NET / ECMAScript',      flavor: 'ECMAScript', family: 'ECMAScript', version: '8.0', url: 'https://learn.microsoft.com/dotnet/standard/base-types/regular-expressions' },
  { id: 'dotnet-nb',   name: '.NET / NonBacktracking', flavor: 'PCRE',       family: 'linear',     version: '8.0', url: 'https://learn.microsoft.com/dotnet/standard/base-types/regular-expression-options#nonbacktracking-mode' },
  { id: 'resharp-net', name: 'RE# / .NET',             flavor: 'symbolic derivatives', family: 'linear', version: '1.0', url: 'https://github.com/ieviev/resharp-dotnet' },
];
let E = null, initErr = null;
const ensure = once(async () => {
  try {
    const { dotnet } = await import('../../dotnet/_framework/dotnet.js');
    const { getAssemblyExports, getConfig } = await dotnet.create();
    E = (await getAssemblyExports(getConfig().mainAssemblyName)).Engines;
  } catch (err) { initErr = errStr(err); throw err; }
});
onmessage = serve({
  list: () => ENGINES,
  ensure,
  match: byId(ENGINES, (id, p, s) => E ? E.Match(id, p, s) : undefined, () => initErr || 'unavailable'),
});
