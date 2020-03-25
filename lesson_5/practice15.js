/* eslint-disable id-length */
/*
Given the following data structure,
write some code to return an array which
contains only the objects where all the numbers are even.

algo
filter some objects in array (filter)
  loop through values in object (every)
    return subArray where all elements are even (every)

*/

let arr = [
  { a: [1, 2, 3] },
  { b: [2, 4, 6], c: [3, 6], d: [4] },
  { e: [8], f: [6, 10] }
];

function evenObjects(array) {
  return array.filter(obj => {
    return Object.values(obj).every(subArray => {
      return subArray.every(number => number % 2 === 0);
    });
  });
}

console.log(evenObjects(arr));
