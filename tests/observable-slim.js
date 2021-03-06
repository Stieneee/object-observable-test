const prettyBytes = require('pretty-bytes');

const observableSlim = require('observable-slim');

const data = require('../data/movies.json');
const mutate = require('./mutate-data');


let changeCount = 0;
let maxMem = 0;

function checkMem() {
  const mem = process.memoryUsage();
  if (mem.rss > maxMem) maxMem = mem.rss;
}

const start = new Date();

const watchedObject = observableSlim.create(data, false, () => {
  changeCount += 1;
  checkMem();
});

mutate(watchedObject);

console.log({
  time: new Date() - start,
  maxMem: prettyBytes(maxMem),
  changeCount,
});

setTimeout(() => process.exit(0), 100);
