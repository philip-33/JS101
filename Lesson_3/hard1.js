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
"one is: ['two']"
"two is: ['three']"
"three is: ['two']"
Incorrect.

Function B will print:

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

*/

/*

*/
