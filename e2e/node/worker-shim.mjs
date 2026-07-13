import { parentPort, workerData } from 'node:worker_threads';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';
import { createRequire } from 'node:module';
import { webcrypto } from 'node:crypto';
import vm from 'node:vm';

const { webRoot, url } = workerData;
const [relPath, search = ''] = url.split('?');
const workerFile = resolve(webRoot, relPath);
const workerDir = dirname(workerFile);
const g = globalThis;

const toPath = (u) => /^file:/.test(u) ? fileURLToPath(u) : resolve(workerDir, u.split(/[?#]/)[0]);

g.self = g;
g.location = { href: pathToFileURL(workerFile).href, search: search ? '?' + search : '', pathname: '/' + relPath };
g.postMessage = (m) => parentPort.postMessage(m);
g.require = createRequire(workerFile);
g.__dirname = workerDir; g.__filename = workerFile;
g.importScripts = (...urls) => { for (const u of urls) vm.runInThisContext(readFileSync(toPath(u), 'utf8'), { filename: u }); };
g.close = () => {};
if (!g.crypto) g.crypto = webcrypto;                         // Swift's WASI reactor needs crypto.getRandomValues

// content-type application/wasm required for WebAssembly.instantiateStreaming
const nodeFetch = g.fetch;
g.fetch = (u, opts) => {
  const s = String(u);
  if (/^https?:/.test(s)) return nodeFetch(u, opts);
  const buf = readFileSync(toPath(s));
  const type = s.endsWith('.wasm') ? 'application/wasm' : s.endsWith('.json') ? 'application/json' : 'text/plain';
  return Promise.resolve(new Response(buf, { status: 200, headers: { 'content-type': type } }));
};

let onmsg = null, pending = [];
Object.defineProperty(g, 'onmessage', { get: () => onmsg, set: (v) => { onmsg = v; while (pending.length && onmsg) onmsg({ data: pending.shift() }); } });
parentPort.on('message', (m) => (onmsg ? onmsg({ data: m }) : pending.push(m)));

await import(pathToFileURL(workerFile).href);
