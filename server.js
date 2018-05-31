const http = require('http');

var args = process.argv.slice(2);
const ports = args[0].split(',');

function run (port) {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Serveur sur port '+port);
  });
  server.listen(parseInt(port), '127.0.0.1');
}
ports.forEach(port => {
  run(port);
})
console.log("Listening on ports "+args[0]);
