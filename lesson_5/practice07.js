/*
Given the following code,
what will the final values of a and b be?
Try to answer without running the code.
*/

let a = 2;
let b = [5, 8];
let arr = [a, b];

arr[0] += 2;
arr[1][0] -= a;

console.log(`a:${a} b:${b} arr:${arr}`);
/*
before running the code:
arr[0] is a copy of a, so arr is now [ 4, [5, 8] ]
arr[1][0] is a copy of 5, but the variable 'a' is being subtracted
so 5 - 2 = 3
*/
