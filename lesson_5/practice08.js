/*
Using the forEach method,
write some code to output all vowels from the strings in the arrays.
Don't use a for or while loop.

algo
forEach over an array of values from obj


*/

const VOWEL_REGEX = /[aeiou]/gi;

let obj = {
  first: ['the', 'quick'],
  second: ['brown', 'fox'],
  third: ['jumped'],
  fourth: ['over', 'the', 'lazy', 'dog']
};

function showVowels(object) {
  Object.values(object).forEach(part => {
    part.forEach(word => {
      console.log(word.match(VOWEL_REGEX).join(''));
    });
  });
}

showVowels(obj);
