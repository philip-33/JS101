/* eslint-disable id-length */
/*
Given the following data structure,
write some code that returns an object where
the key is the first item in each subarray, and the value is the second.

algo
init new object
walk through array (foreach array)
  newobj.arr[0] = arr[1]
*/

let arr = [
  ['a', 1],
  ['b', 'two'],
  ['sea', { c: 3 }],
  ['D', ['a', 'b', 'c']]
];

function arr2obj(array) {
  let newObj = {};

  array.forEach(subArray => {
    newObj[subArray[0]] = subArray[1];
  });

  return newObj;
}

console.log(arr2obj(arr));
// expected return value of function call
// { a: 1, b: 'two', sea: { c: 3 }, D: [ 'a', 'b', 'c' ] }
