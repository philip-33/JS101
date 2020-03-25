/* eslint-disable id-length */
/*
Given the following data structure,
write some code to return an array which
contains only the objects where all the numbers are even.

algo
loop through elements in array (map)
  return loop through object keys in elements (filter)
    return key value where value subarray elements are all even

*/

let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] }
];

function evenObjects(array) {
  array.forEach(element => {
    Object.values(element).filter(value => {
      return value.every(number => number % 2 === 0);
    });
  });

  return array;
}

console.log(evenObjects(arr));
