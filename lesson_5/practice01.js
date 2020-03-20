/*
How would you order the following array of number strings by
descending numeric value (largest number value to smallest)?
*/

let arr = ['10', '11', '9', '7', '8'];

arr.sort((a, b) => Number(b) - Number(a));

console.log(arr);

/*
This method still works without using Number(),
but the problem statement *explicitly* refers to sorting by
*numeric values*.
*/
