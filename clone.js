const clone = require('clone');

const onChange = require('on-change');
const observeObject = require('observe-object');
const observableSlim = require('observable-slim');
// import objectObserver from 'object-observer/dist/node/object-observer';
const observe = require('@superjs/observe');
const objectObservable = require('object-observable');
const objectObservableLite = require('object-observable-lite');

const wm = new WeakMap();

class THING {
  constructor(parent, name) {
    wm.set(this, parent);
    this.name = name;
  }

  get parent() {
    if (!wm.has(this)) throw new Error('weakmap missing reference');
    return wm.get(this).name;
  }
}

let dr;
let t1;

function reset() {
  dr = { name: 'Dr Seuss' };
  t1 = new THING(dr, 'Thing 1');
}

reset();
console.log(`${t1.name}'s parent is ${t1.parent}`);

function test(name, thing) {
  try {
    const test = thing.parent;
    console.log(name, 'PASS');
  } catch (err) {
    console.log(name, 'FAIL', err.message);
  }
  reset();
}

// Base case
let o;
test('base', t1);

// Demonstrate Clone Failure
o = clone(t1);
test('clone', o);

o = onChange(t1, () => {
  console.log('onChange change');
});
test('on-change', o);

o = observeObject(t1, () => {
  console.log('onChange change');
});
test('observe-object', o);

try {
  o = observe(t1, () => {
    console.log('superjs-observe change');
    test('superjs-observe', o);
  });
} catch (err) {
  console.log('superjs-observe', 'FAIL', err.message);
}

o = observableSlim.create(t1, () => {
  console.log('observable-slim change');
});
test('observable-slim', o);

// o = objectObserver.create(t1, () => {
//   console.log('object-observer change');
// });
// test('object-observer', o);

o = objectObservable.create(t1, () => {
  console.log('object-observable change');
});
test('object-observable', o);

o = objectObservableLite(t1, () => {
  console.log('object-observable-lite change');
});
test('object-observable-lite', o);
