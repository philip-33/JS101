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
we want to handle it gracefully instead of
raising an exception or
going into an infinite loop.

Bonus: What is the purpose of number % divisor === 0 in that code?

ANSWER: Using a for loop starting at 1 simplifies the code
and protects against <1 edge cases
LS solution use
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
once the buffer becomes full,
any new elements will displace the oldest elements in the buffer.

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
