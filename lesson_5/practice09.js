/*
Given the following data structure,
return a new array with the same structure,
but with the subarrays ordered
-- alphabetically or numerically as appropriate --
in ascending order.

algo:
foreach element in arr,
sort (a, b) => a - b
data is consistent within sub-arrays, should sort correctly.

*/

let arr = [
  ['b', 'c', 'a'],
  [2, 1, 3],
  ['blue', 'black', 'green']
];

arr.map(subarray => {
  if (typeof subarray[0] === 'string') {
    return subarray.sort();
  } else {
    return subarray.sort((a, b) => a - b);
  }
});

console.log(arr);
