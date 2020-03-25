/*
Perform the same transformation of sorting the subarrays from the
previous exercise with one difference:
sort the elements in descending order.
*/

let arr = [
  ['b', 'c', 'a'],
  [2, 1, 3],
  ['blue', 'black', 'green']
];

arr.map(subarray => {
  if (typeof subarray[0] === 'string') {
    return subarray.sort().reverse();
  } else {
    return subarray.sort((a, b) => a - b).reverse();
  }
});

console.log(arr);
