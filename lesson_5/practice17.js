/*

Write a function that takes no parameters and returns a UUID.

algo:
setup 36 element array
for loop to call a function on each element to generate a hex value, but
insert a dash if the index is 8, 13, 17, or 21

genval:
generate random number between 1 and 16
map that value to array of values
*/

const CHARACTER_ARRAY = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  'a',
  'b',
  'c',
  'd',
  'e',
  'f'
];

function generateHexAsChar() {
  return CHARACTER_ARRAY[Math.floor(Math.random() * 16)];
}

function generateUUID() {
  let id = [];

  for (let idx = 0; idx < 36; idx++) {
    if (idx === 8 || idx === 13 || idx === 18 || idx === 23) {
      id.push('-');
    } else {
      id.push(generateHexAsChar());
    }
  }

  return id.join('');
}

console.log(generateUUID());
