/* eslint-disable */

// Question 1
let advice =
  "Few things in life are as important as house training your pet dinosaur.";
let urgentAdvice = advice.replace("important", "urgent");
console.log("Q1: " + urgentAdvice);

// Question 2
let numbers = [1, 2, 3, 4, 5];
let reversedArray = numbers.slice().reverse();
console.log("\nQ2:");
console.log(reversedArray);

reversedArray = [...numbers].sort((num1, num2) => num2 - num1);
console.log(reversedArray);

reversedArray = [];
numbers.forEach((_, index, array) => {
  reversedArray.push(array[array.length - 1 - index]);
});

console.log(reversedArray);

// Question 3
numbers = [1, 2, 3, 4, 5, 15, 16, 17, 95, 96, 99];

let number1 = 8; // false
let number2 = 95; // true
console.log("\nQ3:");
console.log(numbers.includes(number1));
console.log(numbers.includes(number2));

// Question 4
let famousWords = "seven years ago...";
let preamble = "Four score and ";
console.log("\nQ4:");
console.log(preamble + famousWords);
console.log(preamble.concat(famousWords));

// Question 5
numbers = [1, 2, 3, 4, 5];
numbers.splice(2, 1);
console.log("\nQ5:");
console.log(numbers);

// Question 6
let flintstones = ["Fred", "Wilma"];
flintstones.push(["Barney", "Betty"]);
flintstones.push(["Bambam", "Pebbles"]);
let outputArray = [].concat(...flintstones);
/* 
  launch school solution: flintstones = [].concat(...flintstones);
  One of the hints suggested looking at how .concat() use its arguments
  The magic line is here: 
  
  If the arguments are not of the type string, they are converted to string values before concatenating.
  
  The hint was pointing to the fact that the sub-arrays would get converted
  completely into text strings before being added, which is the desired result.
*/
console.log("\nQ6:");
console.log(outputArray);

// Question 7
flintstones = {
  Fred: 0,
  Wilma: 1,
  Barney: 2,
  Betty: 3,
  Bambam: 4,
  Pebbles: 5
};

let flintArray = [Object.keys(flintstones)[2], Object.values(flintstones)[2]];
// This prompt was obtuse to me, so the .entries hint didn't click like LS
// intended. Their solution is more generalized, and would pull ["Barney", 2]
// out no matter where it appeared
console.log("\nQ7:");
console.log(flintArray);

// Question 8
numbers = [1, 2, 3, 4]; // true
let table = { field1: 1, field2: 2, field3: 3, field4: 4 }; // false

console.log("\nQ8:");
console.log(Array.isArray(numbers));
console.log(Array.isArray(table));

// Question 9
let statement1 = "The Flintstones Rock!";
let statement2 = "Easy come, easy go.";
let state1 = statement1.match(/t/g) ? statement1.match(/t/g).length : 0;
let state2 = statement2.match(/t/g) ? statement2.match(/t/g).length : 0;
console.log("\nQ9:");
console.log(state1);
console.log(state2);

// Question 10
// center the title above a 40 column wide table
// title.padStart(title.length + (Math.floor(40 - (title.length / 2)))
let title = "Flintstone Family Members";
console.log("\nQ10:");
console.log(title.padStart(title.length + Math.floor((40 - title.length) / 2)));
