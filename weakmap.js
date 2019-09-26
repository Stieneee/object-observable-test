const clone = require('clone');
const onChange = require('on-change');
const ooLite = require('../object-observable-lite');

const wm = new WeakMap();

class THING {
  constructor(parent, name) {
    wm.set(this, parent);
    this.name = name
  }

  get parent() {
    if (!wm.has(this)) throw new Error('BROKEN');
    return wm.get(this).name;
  }
}

const g = {name: 'Dr Seuss'}
const t1 = new THING(g, 'Thing 1');
const t11 = new THING(t1, 'Thing 1.1');

console.log(t1.parent, 'and', t11.parent);

const ct1 = clone(t1);
const ct11 = clone(t11);

try{
  console.log(ct1.parent);
} catch (err) {
  console.log(err.message);
}

const watchedObject = onChange(t1, function () {
  console.log('onChange change');
});

try{
  console.log(watchedObject.parent);
} catch (err) {
  console.log(err.message);
}

const oo = ooLite(t1, function() {
  console.log('ooLite change')
})

try{
  console.log(oo.parent);
} catch (err) {
  console.log(err.message);
}