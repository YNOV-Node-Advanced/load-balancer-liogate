const http = require('http');
const net = require('net');
const url = require('url');

const availablePorts = [5000, 5001, 5002];

// Tunnel proxy server
const proxy = http.createServer((req, res) => {
  try {
    let err, forwardReq, options;

    const index = Math.floor(Math.random() * availablePorts.length);

    options = {
      port: availablePorts[index],
      hostname: '127.0.0.1',
      method: req.method,
      headers: req.headers,
      agent: false,
      path: '/'
    };

    const proxyReq = http.request(options, function(forwardRes) {
      delete forwardRes.headers["set-cookie"];
      res.writeHead(forwardRes.statusCode, forwardRes.headers);

      forwardRes.on('data', function(chunk) {
        return res.write(chunk);
      });

      forwardRes.on('close', function() {
        return res.end();
      });

      return forwardRes.on('end', function() {
        return res.end();
      });

      }).on('error', function(err) {
          /* Le serveur cible ne répond pas */
        res.writeHead(503, {
          'Content-Type': 'text/plain'
        });
        res.write("Service currently unvailable");
        return res.end();
      });

    /* Redirection de la requête */
    return proxyReq.end();
  } catch (_error) {
      return res.send(503, "Service currently unvailable");
    }
});

proxy.listen(80, '127.0.0.1');
