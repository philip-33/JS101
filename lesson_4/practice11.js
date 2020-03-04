/*
Create an object that
expresses the frequency with which each letter occurs in this string.

The output will look something like the following:

{ T: 1, h: 1, e: 2, F: 1, l: 1, ... }

This solution differs from the LS method by not using short circuiting,
and also only allows adding a new entry to the object if it is NOT a space.
*/

let statement = 'The Flintstones Rock';
let letterCountObj = {};

statement.split('').forEach(char => {
  if (Object.keys(letterCountObj).includes(char)) {
    letterCountObj[char] += 1;
  } else if (char !== ' ') {
    letterCountObj[char] = 1;
  }
});

console.log(letterCountObj);
