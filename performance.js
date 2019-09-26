const { spawnSync } = require('child_process');


const sizeOf = require('object-sizeof');
const prettyBytes = require('pretty-bytes');
const data = require('./data/movies.json');

console.log('The data set is', prettyBytes(sizeOf(data)), data.length);

let c;

c = spawnSync('node', ['./tests/on-change'], { stdio: 'pipe' });
console.log('on-change', c.status, c.stdout.toString());

c = spawnSync('node', ['./tests/observe-object'], { stdio: 'pipe' });
console.log('observe-object', c.status, c.stdout.toString());

c = spawnSync('node', ['./tests/superjs-observe'], { stdio: 'pipe' });
console.log('superjs-observe', c.status, c.stdout.toString());

c = spawnSync('node', ['./tests/observable-slim'], { stdio: 'pipe' });
console.log('observable-slim', c.status, c.stdout.toString());

c = spawnSync('node', ['./tests/object-observable'], { stdio: 'pipe' });
console.log('object-observable', c.status, c.stdout.toString());

c = spawnSync('node', ['./tests/object-observable-lite'], { stdio: 'pipe' });
console.log('object-observable-lite', c.status, c.stdout.toString());
