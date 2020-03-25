/* eslint-disable id-length */
/*
Given the following data structure,
use the map method to return a new array
identical in structure to the original but,
with each the number incremented by 1.

Do not modify the original data structure.

algo
make a copy of the object
step through the new copy:
  array elements
    keys
      increment element.key by 1
*/

const STRUCTURE = [{ a: 1 }, { b: 2, c: 3 }, { d: 4, e: 5, f: 6 }];

let newObject = JSON.parse(JSON.stringify(STRUCTURE));

newObject.forEach(element => {
  Object.keys(element).forEach(key => {
    element[key] += 1;
  });
});

console.log(STRUCTURE);
console.log(newObject);
