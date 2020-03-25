/*
Given the following data structure,
sort the array so that the sub-arrays are ordered based on the
sum of the odd numbers that they contain.

algo
arr
  map (subArr)
    sort ((a,b)
        return sum of odd array elements in a - sum of odd array elements in b,
    )
*/

let arr = [
  [1, 6, 7],
  [1, 5, 3],
  [1, 8, 3]
];

function subArraySort(arraySet) {
  arraySet.sort((a, b) => {
    return (
      a.filter(num => num % 2 !== 0).reduce((acc, val) => acc + val, 0) -
      b.filter(num => num % 2 !== 0).reduce((acc, val) => acc + val, 0)
    );
  });
  console.log(arraySet);
}

subArraySort(arr);
// [ [ 1, 8, 3 ], [ 1, 6, 7 ], [ 1, 5, 3 ] ]
