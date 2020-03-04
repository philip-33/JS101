/*
  The function below multiplies each element in an array by 2.

  If we wanted to, we could've decided that mutating the
  function argument is the right approach.
  Can you implement a doubleNumbers function that mutates its argument?
*/

/*
This is the original function that makes a new copy of the array.

function doubleNumbers(numbers) {
  let doubledNums = [];
  let counter = 0;

  while (counter < numbers.length) {
    let currentNum = numbers[counter];
    doubledNums.push(currentNum * 2);

    counter += 1;
  }

  return doubledNums;
}
*/

function doubleNumbers(numbers) {
  for (let idx = 0; idx < numbers.length; idx++) {
    numbers[idx] *= 2;
  }

  return numbers;
}

let myNumbers = [1, 4, 3, 7, 2, 6];
console.log(doubleNumbers(myNumbers)); // => [2, 8, 6, 14, 4, 12]
console.log(myNumbers); // => [1, 4, 3, 7, 2, 6]
