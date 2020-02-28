/* eslint-disable no-unused-vars */

// Question 1
/*
For this practice problem,
write a program that creates the following output 10 times,
with each line indented 1 space to the right of the line above it:

The Flintstones Rock!
 The Flintstones Rock!
  The Flintstones Rock!
*/

const text = 'The Flintstones Rock!';
let ix = 0;

for (ix; ix < 10; ix++) {
  console.log(' '.repeat(ix) + text);
}

// Question 2
/*
Starting with the string:
let munstersDescription = "The Munsters are creepy and spooky.";
Return a new string that swaps the case of all of the letters:
`tHE mUNSTERS ARE CREEPY AND SPOOKY.`
*/

let newPhrase = '';
let newLetter = '';
let munstersDescription = 'The Munsters are creepy and spooky.';

for (ix = 0; ix < munstersDescription.length; ix++) {
  if (munstersDescription[ix] === munstersDescription[ix].toUpperCase()) {
    newLetter = munstersDescription[ix].toLowerCase();
  } else {
    newLetter = munstersDescription[ix].toUpperCase();
  }
  newPhrase += newLetter;
}

console.log(newPhrase);
/* The LS solution used .map for this */

// Question 3
/*
Alan wrote the following function, which was intended to
return all of the factors of number.

Alyssa noticed that this code would fail when
the input is 0 or a negative number, and asked Alan to change the loop.

How can he make this work without using a do/while loop?
Note that we're not looking to find the factors for 0 or negative numbers, but
we want to handle it gracefully instead of raising an exception or
going into an infinite loop.

Bonus: What is the purpose of number % divisor === 0 in that code?

ANSWER: Using a for loop starting at 1 simplifies the code
and protects against <1 edge cases
LS solution used a while loop
BONUS: The modulo confirms that the current index is a factor of the number.
*/

function factors(number) {
  //let divisor = number;
  let factors = [];
  for (let ix = 1; ix < number; ix++) {
    if (number % ix === 0) {
      factors.push(number / ix);
    }
  }
  /*
    do {
      if (number % divisor === 0) {
        factors.push(number / divisor);
      }
      divisor -= 1;
    } while (divisor !== 0);
  */
  return factors;
}

console.log(factors(10));
console.log(factors(0));
console.log(factors(-5));

// Question 4
/*
Alyssa was asked to write an implementation of a rolling buffer.
You can add and remove elements from a rolling buffer. However,
once the buffer becomes full, any new elements
will displace the oldest elements in the buffer.

She wrote two implementations of the code for adding elements to the buffer.
In presenting the code to her team leader, she said
"Take your pick. Do you prefer push() or concat() for modifying the buffer?".

Is there a difference between these implementations,
other than the method she used to add an element to the buffer?
*/

function addToRollingBuffer1(buffer, maxBufferSize, newElement) {
  buffer.push(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

function addToRollingBuffer2(buffer, maxBufferSize, newElement) {
  buffer = buffer.concat(newElement);
  if (buffer.length > maxBufferSize) {
    buffer.shift();
  }
  return buffer;
}

/*
ANSWER: Arrays are not a primitive type, so they can be mutated.
This helps understand the functionality of push vs concat.
PUSH adds an element to an array, while CONCAT can *also* combine arrays.
PUSH returns the length of the modified array, but
CONCAT returns the entire new array.

The correct implementation as described is to use .push(). If newElement
is always a single element, then .push() will correctly add a single element
and the maxBufferSize check will remove a single element from the other side.
This works even if newElement is an array, which would be pushed as a single
element.

However, if .concat() is provided an array, it will add multiple elements.
This will break the buffer length check, as it will only remove
a single element, so the rolling buffer can easily exceed the maxBufferSize.

> addToRollingBuffer1([1,2,3],4,"d")
[ 1, 2, 3, 'd' ]
> addToRollingBuffer2([1,2,3],4,"d")
[ 1, 2, 3, 'd' ]

> addToRollingBuffer1([1,2,3],3,[2, 3])
[ 2, 3, [ 2, 3 ] ] // working as expected
> addToRollingBuffer2([1,2,3],3,[2, 3])
[ 2, 3, 2, 3 ] // buffer overflow, objectively bad.

The LS answer is 4 sentences...
*/

// Question 5
/*
What will the following two lines of code output?

console.log(0.3 + 0.6);
console.log(0.3 + 0.6 === 0.9);

I incorrectly expected:
> console.log(0.3 + 0.6);
0.9
> console.log(0.3 + 0.6 === 0.9);
true

but I didn't realize that JavaScript lacked
the precision necessary to do this correctly.
*/

// Question 6
/*
What do you think the following code will output?
*/
let nanArray = [NaN];
// eslint-disable-next-line use-isnan
console.log(nanArray[0] === NaN); // eslint warns against this.
/*
Javascript does not allow comparison operators to determine NaN, so
this will output false.

> let nanArray = [NaN];
> console.log(nanArray[0] === NaN);
false

BONUS: The correct way to check for NaN is to use isNaN(value)

> isNaN(nanArray[0])
true
*/

// Question 7
/*
What is the output of the following code?
*/

let answer = 42;

function messWithIt(someNumber) {
  return (someNumber += 8);
}

let newAnswer = messWithIt(answer);

console.log(answer - 8);

/*
I expect this to return 34.
The answer variable is never directly modified until the console statement.
*/

// Question 8
/*
One day, Spot was playing with the Munster family's home computer,
and he wrote a small program to mess with their demographic data:
*/

let munsters = {
  Herman: { age: 32, gender: 'male' },
  Lily: { age: 30, gender: 'female' },
  Grandpa: { age: 402, gender: 'male' },
  Eddie: { age: 10, gender: 'male' },
  Marilyn: { age: 23, gender: 'female' }
};

function messWithDemographics(demoObject) {
  Object.values(demoObject).forEach(familyMember => {
    familyMember['age'] += 42;
    familyMember['gender'] = 'other';
  });
}

// After writing this function, he typed the following code:
messWithDemographics(munsters);

/*
Before Grandpa could stop him, Spot hit the Enter key with his tail.
Did the family's data get ransacked?
Why or why not?

Yes, because objects are mutable. This means that demoObject is a
reference to the munsters object, not a copy.
*/

// Question 9
/*
Method calls can take expressions as arguments.
Suppose we define a function called rps as follows, which follows the classic
rules of the rock-paper-scissors game, but with a slight twist: in the event of
a tie, it awards the win to the first of the two fists.
*/

function rps(fist1, fist2) {
  if (fist1 === 'rock') {
    return fist2 === 'paper' ? 'paper' : 'rock';
  } else if (fist1 === 'paper') {
    return fist2 === 'scissors' ? 'scissors' : 'paper';
  } else {
    return fist2 === 'rock' ? 'rock' : 'scissors';
  }
}

// What is the result of the following call?

console.log(rps(rps(rps('rock', 'paper'), rps('rock', 'scissors')), 'rock'));

/*
ANSWER: The successive calls resolve to "paper".
*/

// Question 10
/*
Consider these two simple functions:
*/
function foo(param = 'no') {
  return 'yes';
}

function bar(param = 'no') {
  return param === 'no' ? 'yes' : 'no';
}

/*
What will the following function invocation return?
*/

bar(foo());

/*
The invocation will return "no".
*/
