import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';
const require = createRequire(import.meta.url);

// Pyodide's browser bundle can't run in Node; redirect the CDN import to the local pyodide npm package
const PYODIDE_CDN = /cdn\.jsdelivr\.net\/pyodide\/.*\/pyodide\.mjs$/;

export async function resolve(specifier, context, next) {
  if (PYODIDE_CDN.test(specifier)) return { url: pathToFileURL(require.resolve('pyodide/pyodide.mjs')).href, shortCircuit: true };
  if (specifier.startsWith('https://')) return { url: specifier, shortCircuit: true };
  // resolve node: ourselves; the default resolver forbids network modules importing node:*, which Pyodide needs
  if (specifier.startsWith('node:')) return { url: specifier, format: 'builtin', shortCircuit: true };
  if (context.parentURL?.startsWith('https://') && /^\.\.?\//.test(specifier))
    return { url: new URL(specifier, context.parentURL).href, shortCircuit: true };
  return next(specifier, context);
}

export async function load(url, context, next) {
  if (url.startsWith('https://')) {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`net-loader: ${res.status} fetching ${url}`);
    return { format: 'module', source: await res.text(), shortCircuit: true };
  }
  return next(url, context);
}
