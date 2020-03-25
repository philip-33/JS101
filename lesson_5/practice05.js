/*
Compute and display the total age of the male members of the family.
*/

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female' }
};

let total = Object.values(munsters)
  .map(obj => {
    return Object.values(obj);
  })
  .filter(bio => bio[1] === 'male')
  .reduce((acc, _, idx, arr) => {
    return acc + arr[idx][0];
  }, 0);

console.log(total);
