/* eslint-disable */
// Question 1
/*
Will the following functions return the same results?
*/

/*
es lint reports that the object inside second() is unreachable.
If JavaScript places an implied semicolon after the return statement,
this will be the case.

After testing, the output was as expected:
{ prop1: 'hi there 1' }
undefined
Also, syntax highlighting shows different colors for the two objects.
*/
function first() {
  return {
    prop1: "hi there"
  };
}

function second() {
  return
  {
    prop1: "hi there"
  };
}

console.log(first());
console.log(second());

// Question 2
/*
What does the last line in the following code output?
*/

/*
The answer depends on whether the value from the object was
referenced or copied when assigned to numArray.
There would be value in creating references to specific components
of an object, so I suspect object has been modified:
{ first: [ 1, 2 ] }

Testing showed this was correct.
The LS solution indicated that a new array can be created by
using array methods that return a new array. (slice, concat)
*/

let object = { first: [1] };
let numArray = object["first"];
numArray.push(2);

console.log(numArray); //  => "[1, 2]"
console.log(object);

// Question 3
/*
Given the following similar sets of code, what will each code snippet print?

Code was modified to resolve errors when present in the same file
(redundant "let"s removed, functions renamed to be unique)
*/

/*
Function A will print:
"one is: two"
"two is: three"
"three is: two"
Incorrect. This is because the assignments were all references that
only exist within the scope of messWithVarsA(). Once the function
completes, the new references are destroyed.

Function B will print:
"one is: one"
"two is: two"
"three is: three"
This was correct, but I changed my answer after researching why
my answer for A was wrong. This is the same issue, where there are only temporary (scoped) assignments that overwrite the original variables.

Function C will print:
"one is: two"
"two is: three"
"three is: two"
Correct. The MDN for .splice() explicitly states that it modifies the array.
Since it was a reference, not a copy, the output changed.
*/

//Function A
function messWithVarsA(one, two, three) {
  one = two;
  two = three;
  three = one;
}

let one = ["one"];
let two = ["two"];
let three = ["three"];

messWithVarsA(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);

//Function B
function messWithVarsB(one, two, three) {
  one = ["two"];
  two = ["three"];
  three = ["one"];
}

one = ["one"];
two = ["two"];
three = ["three"];

messWithVarsB(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);

// Function C
function messWithVarsC(one, two, three) {
  one.splice(0, 1, "two");
  two.splice(0, 1, "three");
  three.splice(0, 1, "one");
}

one = ["one"];
two = ["two"];
three = ["three"];

messWithVarsC(one, two, three);

console.log(`one is: ${one}`);
console.log(`two is: ${two}`);
console.log(`three is: ${three}`);

// Question 4
/*
Ben was tasked to write a simple javascript function to determine whether an input string is an IP address using 4 dot-separated numbers, e.g., 10.4.5.11. He is not familiar with regular expressions.

Alyssa supplied Ben with a function named isAnIpNumber. It determines whether a string is a numeric string between 0 and 255 as required for IP numbers and asked Ben to use it. Here's the code that Ben wrote:

function isDotSeparatedIpAddress(inputString) {
  let dotSeparatedWords = inputString.split(".");
  while (dotSeparatedWords.length > 0) {
    let word = dotSeparatedWords.pop();
    if (!isAnIpNumber(word)) {
      break;
    }
  }

  return true;
}

Alyssa reviewed Ben's code and said, "It's a good start, but you missed a few things. You're not returning a false condition, and you're not handling the case when the input string has more or less than 4 components, e.g., 4.5.5 or 1.2.3.4.5: both those values should be invalid."

See comments for code changes
*/

function isDotSeparatedIpAddress(inputString) {
    let dotSeparatedWords = inputString.split(".");

  // add contion that checks for length 4
  if (dotSeparatedWords.length !== 4) {
    return false;
  }
  
  while (dotSeparatedWords.length > 0) {
    // force the popped word to be a number
    let word = Number(dotSeparatedWords.pop());

    // modify if statement to check for number range between 0-255
    // also include a check to guarantee that word is a number
    if (isNaN(word) || word < 0 || word > 255) {
      return false;
    }
  }

  return true;
}