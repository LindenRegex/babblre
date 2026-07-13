import { Worker as ThreadWorker } from 'node:worker_threads';
import { readFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
export const webRoot = resolve(here, '../../web');
const shim = fileURLToPath(new URL('./worker-shim.mjs', import.meta.url));

class NodeWorker {
  constructor(url) {
    this.onmessage = this.onerror = null;
    const execArgv = process.execArgv.filter((a) => !a.startsWith('--test') && !a.startsWith('--input-type'));
    this._w = new ThreadWorker(shim, { workerData: { webRoot, url }, execArgv, stdout: true, stderr: true });
    this._w.on('message', (m) => this.onmessage && this.onmessage({ data: m }));
    this._w.on('error', (e) => this.onerror && this.onerror(e));
  }
  postMessage(m) { try { this._w.postMessage(m); } catch { } }
  terminate() { this._w.terminate(); }
}
globalThis.Worker = NodeWorker;

const nodeFetch = globalThis.fetch;
globalThis.fetch = (u, opts) => {
  const s = String(u);
  if (s.startsWith('file:')) return Promise.resolve(new Response(readFileSync(fileURLToPath(s)), { status: 200 }));
  return nodeFetch(u, opts);
};
