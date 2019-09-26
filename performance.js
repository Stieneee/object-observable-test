const {spawnSync} = require('child_process');

const data = require('./data/movies.json');

const sizeOf = require('object-sizeof');
const prettyBytes = require('pretty-bytes');

console.log('The data set is', prettyBytes(sizeOf(data)), data.length);

let t1 = spawnSync('node', ['./tests/on-change'], {stdio: 'pipe'});
console.log('on-change', t1.status, t1.stdout.toString());
let t2 = spawnSync('node', ['./tests/object-observable'], {stdio: 'pipe'})
console.log('object-observable', t2.status, t2.stdout.toString());
let t3 = spawnSync('node', ['./tests/object-observable-lite'], {stdio: 'pipe'})
console.log('object-observable-lite', t3.status, t3.stdout.toString());

