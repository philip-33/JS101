/*
Given this previously seen family object,
print the name, age, and gender of each family member.

(Name) is a (age)-year-old (male or female).

algo:
loop through object.
on each iteration,
  get key, store in array[0]
  step into value to get object with age and gender
  store age's value in array[1]
  store gender's value in array[2]
  pass array to print func

*/

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female' }
};

function printBio(bioArray) {
  console.log(`${bioArray[0]} is a ${bioArray[1]}-year-old ${bioArray[2]}.`);
}

function familyLog(familyObj) {
  let bioArray = [];
  for (let memberName in familyObj) {
    bioArray.push(memberName);
    bioArray.push(familyObj[memberName].age);
    bioArray.push(familyObj[memberName].gender);

    printBio(bioArray);
    bioArray = [];
  }
}

familyLog(munsters);
