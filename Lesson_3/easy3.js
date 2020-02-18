/* eslint-disable no-unused-vars */
// Question 1
console.log("\nQ1:");
let numbers = [1, 2, 3, 4];

numbers = [];
console.log(numbers);

numbers = [1, 2, 3, 4];
numbers.splice(0, numbers.length);
console.log(numbers);

numbers = [1, 2, 3, 4];
for (let ix = numbers.length - 1; ix >= 0; ix--) {
  numbers.shift();
}
console.log(numbers);

numbers = [1, 2, 3, 4];
for (let ix = numbers.length - 1; ix >= 0; ix--) {
  numbers.pop();
}
console.log(numbers);

// Question 2
console.log("\nQ2:");
console.log([1, 2, 3] + [4, 5]);
// I expect it will either concatenate the arrays,
// or it may add a 4th element as a sub-array with 2 elements

// It does neither; it converts the arrays to comma separated strings
// then displays those, concatenated together with no separator
// 1,2,34,5

// Question 3
console.log("\nQ3:");
let str1 = "hello there";
let str2 = str1;
str2 = "goodbye!";
console.log(str1);

// since strings are a type of object (this is wrong, see below),
// I expect str1 to output "goodbye!"
// unless there is special functionality for string objects.

// Output is "hello there"

// The LS answer gets to the heart of the issue: as primitives,
// string literals like str1 are passed by value, not reference.
// This keeps str1 intact

/*
According to:
https://stackoverflow.com/questions/7675127/is-string-a-primitive-type-or-object-in-javascript

There are "string literals" and String objects.
*/

// Question 4
console.log("\nQ4:");
let arr1 = [{ first: "value1" }, { second: "value2" }, 3, 4, 5];
let arr2 = arr1.slice();
arr2[0].first = 42;
console.log(arr1);

// arr1 is an array built of the following types:
// [obj, obj, num, num, num]
// slice without args works on the entire array, but doesn't modify it
// this makes arr2 a literal copy. How are the objects in the array treated?
// Does the non-destructive power of slice extend to objects in the array?
// I believe it does, so arr1 will have {first: "value1"} as the first element.

// This is wrong. Objects behave normally and are passed by reference here.
// So, changes to objects in arr2 are mirrored in arr1.
// LS explains this by saying that slice() executes a *shallow* copy
// Above, I expected slice to execute a *deep* copy

// Question 5
console.log("\nQ5:");
function isColorValid(color) {
  if (color === "blue" || color === "green") {
    return true;
  } else {
    return false;
  }
}

// This is easier to read,
// but is just a stepping stone to the LS solution
function isColorValid2(color) {
  let validity = color === "blue" || color === "green";
  return validity;
}

// Once it was clear that the variable was just taking up memory...
function isColorValid3(color) {
  return color === "blue" || color === "green";
}
// this is also the LS solution
