const http = require('http');
const util = require('./util');
const redis = require("redis");
const { promisify } = require('util');
client = redis.createClient();

const get = promisify(client.get).bind(client);
const set = promisify(client.set).bind(client);

set('rooms', 'wow');
get('rooms').then(test => {
  console.log(test);
});

const port = util.getPort();

function run (port) {
  const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Serveur sur port '+port);
  });
  server.listen(parseInt(port), '127.0.0.1');
}

run(port);

console.log("Listening on port "+port);
