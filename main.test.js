var net = require('net');

function checkConnection(host, port, timeout) {
    return new Promise(function(resolve, reject) {
        timeout = timeout || 10000;
        var timer = setTimeout(function() {
            reject("timeout");
            socket.end();
        }, timeout);
        var socket = net.createConnection(port, host, function() {
            clearTimeout(timer);
            resolve();
            socket.end();
        });
        socket.on('error', function(err) {
            clearTimeout(timer);
            reject(err);
        });
    });
}

for (var i = 0; i < 10; i++) {
  checkConnection("localhost", 80).then(function() {
    console.log('Test success');
  }, function(err) {
    console.log('Fail');
  });
}
