# object-observable-test

This repo is comparison of several object observe packages.
Searching for the best efficiency while meeting several requirements was the object of this test.

While testing this package [object-observable-lite](https://www.npmjs.com/package/object-observable-lite) was created in an attempt to create the most efficient package.

## Requirements

The package must observe deeply.
The package must not clone the nested objects.
The package must handle all types.

## Clone Test

The clone test uses a weak map in a nested object to point to the top object from the child.
If the child object is cloned the weakmap will not contain the reference to the parent object.

```
Thing 1's parent is Dr Seuss
base PASS
clone FAIL weakmap missing reference
on-change FAIL weakmap missing reference
observe-object FAIL weakmap missing reference
superjs-observe FAIL unsupported type
observable-slim PASS
object-observable PASS
object-observable-lite PASS
```

## Performance Test

An open dataset was used and mutated in separate processes for each package to observe changes.
Wall time and peak memory usage were recorded to give an understanding of how efficient a package is observing changes.

```
on-change 0 { time: 1276, maxMem: '131 MB', changeCount: 115180 }
observe-object 0 { time: 1915, maxMem: '91.8 MB', changeCount: 143975 }
superjs-observe 0 { time: 1662, maxMem: '156 MB', changeCount: 115180 }
observable-slim 0 { time: 5317, maxMem: '291 MB', changeCount: 143975 }
object-observable 0 { time: 3283, maxMem: '380 MB', changeCount: 143975 }
object-observable-lite 0 { time: 1577, maxMem: '146 MB', changeCount: 143975 }
```

## Conclusion

[object-observable-lite](https://www.npmjs.com/package/object-observable-lite) demonstrates a significant performance improvement while being the only package to pass the weakmap test.