const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;
const STATE_FILE = path.join(__dirname, 'state.json');

function loadState() {
  try {
    return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
  } catch (e) {
    return {
      stats: { energy: 5, physical: 5, mental: 5, money: 1000 },
      tasks: [],
      events: [],
      avatar: null,
    };
  }
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

function send(res, code, data, type='application/json') {
  res.writeHead(code, {
    'Content-Type': type,
    'Access-Control-Allow-Origin': '*',
  });
  res.end(data);
}

const server = http.createServer((req, res) => {
  if (req.method === 'OPTIONS' && req.url.startsWith('/api/')) {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    });
    res.end();
    return;
  }

  if (req.method === 'GET' && req.url === '/api/state') {
    const state = loadState();
    send(res, 200, JSON.stringify(state));
  } else if (req.method === 'POST' && req.url === '/api/state') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body || '{}');
        saveState(data);
        send(res, 200, JSON.stringify({ ok: true }));
      } catch (e) {
        send(res, 400, JSON.stringify({ error: 'Invalid JSON' }));
      }
    });
  } else {
    // serve static files
    let filePath = path.join(__dirname, req.url);
    if (req.url === '/' || req.url === '') filePath = path.join(__dirname, 'index.html');
    fs.readFile(filePath, (err, data) => {
      if (err) {
        send(res, 404, 'Not found', 'text/plain');
      } else {
        const ext = path.extname(filePath);
        const types = {
          '.html': 'text/html',
          '.js': 'application/javascript',
          '.jsx': 'text/plain',
          '.css': 'text/css',
        };
        send(res, 200, data, types[ext] || 'application/octet-stream');
      }
    });
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
