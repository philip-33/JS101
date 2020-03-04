/*
Add up all of the ages from the Munster family object:

input: object with names and ages
output: interger of total of ages
*/

let ages = {
  Herman: 32,
  Lily: 30,
  Grandpa: 5843,
  Eddie: 10,
  Marilyn: 22,
  Spot: 237
};

let totalAge = Object.values(ages).reduce((total, age) => total + age, 0);

console.log(totalAge);