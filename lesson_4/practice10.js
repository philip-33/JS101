/*
Pick out the minimum age from our current Munster family object:

input: object with names and ages
output: not clear, probably the interger for the lowest age
*/

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let ageArray = Object.values(ages);
console.log(Math.min(...ageArray));
