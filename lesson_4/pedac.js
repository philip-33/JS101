/*
Problem:
Write a function that returns an array of palindrome substrings from
a given string. These palindromes are case sensitive!
There may or may not be spaces in the string.

input: string
output: array of palindromes found in the string
rules:
  Look at letter case for palindromes
  Minimum size for palindrome is 2 characters
  Return value is an array of strings
  Is the input always a string?

Examples:
  palindromeSubstrings("supercalifragilisticexpialidocious") == ["ili"]
  palindromeSubstrings("abcddcbA") == ["bcddcb", "cddc", "dd"]
  palindromeSubstrings("palindrome") == []
  palindromeSubstrings("") == []

Data Structures / Algorithms

  LS recommends walking through a simpler version of the problem:

  "corn"
  pulling out all substrings that are 2 chars or more in length:
  ["co", "cor", "corn", "or", "orn", "rn"]

  Based on this, the pattern is to generate all possible substrings starting
  with each character, then check them all for palindrome status.

  Algorithm for pulling out all substrings:

  initialize result array
  outer loop through string (start at 0, go to length of string - 1)
    inner loop through string (start at 2, go to length of string)
      add the substring bounded by loop indices to the result array
  return result array

  This is incomplete: there are empty strings in the result.
  Adding a check for empty strings eliminates this.

  The LS method uses a while loop.

  Algorithm for checking for palindromes:
  Check whether the string is equal to its reversed value
  Reversing a string is possible by calling split reverse and join

  Algorithm for checking the substrings for palindromes
  Iinitialize an array of results
  Get the array of substrings and loop through it
    for every confirmed palindrome, push it to the result array
  return the result array

  for some reason, the LS code uses == to verify the output
  but arrays are objects, and can't be equal unless they're the same object...
*/

function isPalindrome(str) {
  //prettier-ignore
  return str === str.split('').reverse().join('');
}

function getAllSubstrings(str) {
  let result = [];

  for (let idx = 0; idx < str.length - 1; idx++) {
    for (let idy = 2; idy <= str.length; idy++) {
      if (str.slice(idx, idy).length > 1) {
        result.push(str.slice(idx, idy));
      }
    }
  }
  return result;
}

function palindromeSubstrings(str) {
  let result = [];
  let substringsArr = getAllSubstrings(str);
  substringsArr.forEach(substring => {
    if (isPalindrome(substring)) {
      result.push(substring);
    }
  });
  return result;
}

console.log(palindromeSubstrings('supercalifragilisticexpialidocious'));
console.log(palindromeSubstrings('abcddcbA'));
console.log(palindromeSubstrings('palindrome'));
console.log(palindromeSubstrings(''));
