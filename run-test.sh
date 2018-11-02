#!/usr/bin/env bash

trap "kill 0" EXIT

PORT=5000 node ./server.js &
PORT=5001 node ./server.js &
PORT=5002 node ./server.js &

PORTS=5000,5001,5002 node ./reverse-proxy.js &

npm test

exit 0
