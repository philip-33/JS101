/*
Given the following data structure,
use a combination of methods, including filter, to
return a new array identical in structure to the original, but
containing only the numbers that are multiples of 3.

algo
init result array
loop through arr elements (no ret value needed)
  loop through sub elements (ret value used)
    filter the array by % 3
    return array of numbers divisible by 3

*/

let arr = [[2], [3, 5, 7], [9], [11, 15, 18]];

/*
let newArr = arr.map(subArray => {
  //console.log(subArray);
  let factorList = subArray.filter(element => {
    return element % 3 === 0;
  });
  return factorList;
});
*/

let newArr = arr.map(subArray => {
  return subArray.filter(num => num % 3 === 0);
});

console.log(newArr);
