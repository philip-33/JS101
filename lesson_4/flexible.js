/*
Continuing with the idea of building generic functions,
let's update our doubleNumbers function so that
it not only can double the numbers in an array but
can also multiply them by any other number.

For instance, let's create a function called multiply that
can take an additional argument to determine the transformation criteria.

The criteria didn't specify whether it should mutate the array,
so this function does. Also, the factor parameter defaults to 2.
*/

function multiply(numbers, factor = 2) {
  let newArray = [];
  for (let idx = 0; idx < numbers.length; idx++) {
    newArray.push(numbers[idx] * factor);
  }
  return newArray;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(myNumbers); // => [1, 4, 3, 7, 2, 6]
console.log(multiply(myNumbers, 3)); // => [ 3, 12, 9, 21, 6, 18 ]
console.log(myNumbers); // => [1, 4, 3, 7, 2, 6]
