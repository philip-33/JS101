//Problem statement: build a mortgage calculator

/*
formula for calculating monthly payment
m = p * (j / (1 - Math.pow((1 + j),(-n))));

m = monthly payment
p = loan amount
j = monthly interest rate
n = loan duration in months

print the payment amount to 2 decimal places $123.45 or $300.00
*/

/*
Hints:
decide on formats: should users enter a 5% rate as 5 or .05?
if APR, convert to monthly interest rate for the formula
consider the loan duration? months or years? Name variables carefully.
Edge cases? does the app support no-interest loans?
*/

/*
examples:
15 year loan, $1,000,000 dollars, 3.3% rate
zillow calculator says 8859 (doesn't include decimals)

*/

const readline = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return (
    number.trimStart() === "" || Number.isNaN(Number(number)) || number === 0
  );
}

function calculateMonthlyPayment(
  totalLoanAmount,
  annualPercentageRate,
  loanDurationMonths
) {
  let monthlyInterestRate = annualPercentageRate / 12;
  let monthlyPayment;
  if (monthlyInterestRate === 0) {
    monthlyPayment = totalLoanAmount / loanDurationMonths;
  } else {
    monthlyPayment =
      totalLoanAmount *
      (monthlyInterestRate /
        (1 - Math.pow(1 + monthlyInterestRate, -loanDurationMonths)));
  }
  return monthlyPayment;
}

/*
prompt("Mortgage Calculator!");
prompt("Enter your loan amount: ");
let loanAmount = readline.question();

while (invalidNumber(loanAmount)) {
  prompt("Sorry that's not valid loan amount. Please enter a positive number");
  loanAmount = readline.question();
}
*/

//test cases
console.log(
  calculateMonthlyPayment(1000000, 0.033, 180).toFixed(2) === "7051.01"
);
console.log(calculateMonthlyPayment(100000, 0.06, 360).toFixed(2) === "599.55");
console.log(
  calculateMonthlyPayment(1000000, 0.033, 120).toFixed(2) === "9795.17"
);
console.log(
  calculateMonthlyPayment(275000, 0.048, 250).toFixed(2) === "1742.20"
);
console.log(calculateMonthlyPayment(275000, 0, 250).toFixed(2) === "1100.00");
