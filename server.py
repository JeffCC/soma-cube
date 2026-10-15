"""Soma Cube 本地伺服器：提供網頁，並把紀錄存到同目錄的 soma-records.json。"""
import http.server, json, os, shutil, sys, webbrowser

PORT = 8765
DIR = os.path.dirname(os.path.abspath(__file__))
DATA = os.path.join(DIR, 'soma-records.json')
BACKUP = os.path.join(DIR, 'soma-records.bak.json')


class Handler(http.server.SimpleHTTPRequestHandler):
    def __init__(self, *a, **kw):
        super().__init__(*a, directory=DIR, **kw)

    def end_headers(self):
        self.send_header('Cache-Control', 'no-store')
        super().end_headers()

    def _json(self, code, obj):
        body = json.dumps(obj, ensure_ascii=False).encode('utf-8')
        self.send_response(code)
        self.send_header('Content-Type', 'application/json; charset=utf-8')
        self.send_header('Content-Length', str(len(body)))
        self.end_headers()
        self.wfile.write(body)

    def do_GET(self):
        if self.path.split('?')[0] == '/api/records':
            if not os.path.exists(DATA):
                return self._json(200, {'exists': False, 'records': []})
            try:
                with open(DATA, encoding='utf-8') as f:
                    return self._json(200, {'exists': True, 'records': json.load(f)})
            except Exception as e:
                return self._json(500, {'error': f'讀取 {DATA} 失敗：{e}'})
        return super().do_GET()

    def do_PUT(self):
        if self.path.split('?')[0] != '/api/records':
            return self._json(404, {'error': 'not found'})
        try:
            n = int(self.headers.get('Content-Length', 0))
            records = json.loads(self.rfile.read(n).decode('utf-8'))
            if not isinstance(records, list):
                raise ValueError('資料必須是陣列')
            if os.path.exists(DATA):
                shutil.copyfile(DATA, BACKUP)
            tmp = DATA + '.tmp'
            with open(tmp, 'w', encoding='utf-8') as f:
                json.dump(records, f, ensure_ascii=False, indent=2)
            os.replace(tmp, DATA)
            return self._json(200, {'ok': True, 'count': len(records)})
        except Exception as e:
            return self._json(400, {'error': str(e)})

    def log_message(self, fmt, *args):
        if '/api/' in (args[0] if args else ''):
            sys.stderr.write('%s\n' % (fmt % args))


if __name__ == '__main__':
    page = sys.argv[1] if len(sys.argv) > 1 else 'soma-db.html'
    srv = http.server.ThreadingHTTPServer(('127.0.0.1', PORT), Handler)
    print(f'紀錄檔：{DATA}')
    print(f'已啟動：http://localhost:{PORT}/{page}')
    webbrowser.open(f'http://localhost:{PORT}/{page}')
    try:
        srv.serve_forever()
    except KeyboardInterrupt:
        pass
