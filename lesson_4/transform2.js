/*
Write a function that doubles numbers in an array that
are at an odd-numbered index.

This function should not mutate the original array.
*/

function doubleOddIndexes(numbers) {
  let newArray = [];
  for (let idx = 0; idx < numbers.length; idx++) {
    if (idx % 2 === 1) {
      newArray.push(2 * numbers[idx]);
    } else {
      newArray.push(numbers[idx]);
    }
  }

  return newArray;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(myNumbers);
console.log(doubleOddIndexes(myNumbers));
