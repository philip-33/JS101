/*
Write the following in casual and formal pseudocode
1. a function that returns the sum of two numbers
2. a function that takes an array of strings, and returns a string that is all those strings concatenated together
3. a function that takes an array of integers, and returns a new array with every other element
*/

/*
1. a function that returns the sum of two numbers
function declaration that takes in two numbers
return statement that adds the numbers together

START

SET firstNumber
SET secondNumber
PRINT firstNumber + secondNumber

END
*/

/*
2. a function that takes an array of strings, and returns a string that is all those strings concatenated together
function declaration that takes an array as an argument
declare a variable to hold the final string
loop through the array to pick up each element and tack it to the end of the final string
return the final string

START

SET myArray = [some array of strings]
SET iterator = 0
SET newArray = []

WHILE iterator < length of myArray
  push current element on to the end of newArray
  iterator++

PRINT newArray

END
*/

/*
3. a function that takes an array of integers, and returns a new array with every other element
function declaration that takes an array as an argument
declare a new array
loop through the array by 2s, copying each element into the new array
return the new array

START

SET myArray = [some array of intergers]
SET iterator = 0
SET newArray = []

WHILE iterator < length of myArray
  push current element on to the end of newArray
  incrememnt iterator by 2

PRINT newArray

END
*/