/* eslint-disable */

// Question 1
let numbers = [1, 2, 3];
numbers[6] = 5;
// before test: presumed error: some kind of allocation error

// hypothesis: JS may fill in the indexes and allocate the 6th

// results:
// when looking at numbers, node reports [ 1, 2, 3, <3 empty items>, 5 ]
// but for numbers[4], the value is undefined
// Launch School says the elements are "empty", not even undefined

numbers[4]; // this is empty

// Question 2
let str1 = "Come over here!"; // true
let str2 = "What's up, Doc?"; // false

str1.endsWith("1");
str2.endsWith("2");

// Question 3
let ages = { Herman: 32, Lily: 30, Grandpa: 402, Eddie: 10 };
ages.hasOwnProperty("Spot");

// Question 4
let munstersDescription = "the Munsters are CREEPY and Spooky.";
let newMunstersDescription =
  munstersDescription[0].toUpperCase() +
  munstersDescription.slice(1).toLowerCase();

// Question 5
false == "0"; //true - coercion changes both false and '0' to 0's
false === "0"; //false - boolean does not equal string

// Question 6
let additionalAges = { Marilyn: 22, Spot: 237 };
let newAges = Object.assign(ages, additionalAges);

// Question 7
str1 =
  "Few things in life are as important as house training your pet dinosaur.";
str2 = "Fred and Wilma have a pet dinosaur named Dino.";

str1.includes("Dino");
str2.includes("Dino");

// Question 8
let flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];

flintstones.push("Dino");

// Question 9
flintstones = ["Fred", "Barney", "Wilma", "Betty", "Bambam", "Pebbles"];
flintstones.push("Dino", "Hoppy");

// Question 10
let advice =
  "Few things in life are as important as house training your pet dinosaur.";
let newAdvice = advice.slice(0, advice.indexOf("house"));
