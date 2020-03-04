/*
Write a program that
uses this array to create an object where
the names are the keys and the values are the positions in the array:

{ Fred: 0, Barney: 1, Wilma: 2, Betty: 3, Pebbles: 4, Bambam: 5 }

input: array of names
output: object where keys are the names, and the values are their index

Multiple ways to do this, but simplest is forEach.
*/

let flintstones = ['Fred', 'Barney', 'Wilma', 'Betty', 'Pebbles', 'Bambam'];
let flintObj = {};

flintstones.forEach((name, index) => {
  flintObj[name] = index;
});

console.log(flintObj);
