#!/usr/bin/env python3
"""Static dev server (make serve): adds the .wasm MIME type, a path allowlist, and stale-port reclaim."""
import http.server, socketserver, urllib.parse, os, glob, time

REPO = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PORT = int(os.environ.get('PORT', '8000'))
ALLOWED = [os.path.realpath(os.path.join(REPO, d)) for d in ('web', 'engines/js', 'engines/python')]

class Handler(http.server.SimpleHTTPRequestHandler):
    extensions_map = {**http.server.SimpleHTTPRequestHandler.extensions_map, '.wasm': 'application/wasm'}
    def __init__(self, *a, **k):
        super().__init__(*a, directory=REPO, **k)
    def do_GET(self):
        u = urllib.parse.urlparse(self.path)
        if u.path == '/':
            self.send_response(302); self.send_header('Location', '/web/index.html'); self.end_headers(); return
        target = os.path.realpath(self.translate_path(self.path))
        if not any(target == r or target.startswith(r + os.sep) for r in ALLOWED):
            self.send_error(404); return
        super().do_GET()
    def log_message(self, *a):
        pass

class Server(socketserver.ThreadingTCPServer):
    allow_reuse_address = True

def _reclaim(port):
    """Kill a stale Python dev server (http.server or an old serve.py) squatting `port`; nothing else."""
    inodes = set()
    for f in ('/proc/net/tcp', '/proc/net/tcp6'):
        try:
            for line in open(f).read().splitlines()[1:]:
                c = line.split()
                if int(c[1].split(':')[1], 16) == port and c[3] == '0A':
                    inodes.add(c[9])
        except OSError:
            pass
    for fd in glob.glob('/proc/[0-9]*/fd/*'):
        try:
            if not os.readlink(fd).startswith('socket:['): continue
            if os.readlink(fd)[8:-1] not in inodes: continue
        except OSError:
            continue
        pid = int(fd.split('/')[2])
        try:
            args = open(f'/proc/{pid}/cmdline').read().split('\0')
        except OSError:
            args = []
        ours = (args and os.path.basename(args[0]).startswith('python')
                and (any(a.endswith('serve.py') for a in args) or 'http.server' in args))
        if ours:
            try: os.kill(pid, 9); print(f"reclaimed port {port} from stale server (pid {pid})", flush=True)
            except OSError: pass

if __name__ == '__main__':
    want, srv = PORT, None
    for p in range(PORT, PORT + 20):
        try:
            srv = Server(('', p), Handler); PORT = p; break
        except OSError:
            _reclaim(p)
            for _ in range(5):                                         # wait for the socket to free, then retry
                time.sleep(0.2)
                try: srv = Server(('', p), Handler); PORT = p; break
                except OSError: pass
            if srv: break
    if srv is None:
        raise SystemExit(f"no free port in {want}..{want + 19}")
    if PORT != want:
        print(f"NOTE: port {want} was busy; using {PORT} instead.", flush=True)
    with srv:
        print(f"serving http://localhost:{PORT}/web/index.html", flush=True)
        srv.serve_forever()
