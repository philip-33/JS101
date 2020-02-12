/* eslint-disable radix */
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
test cases at end of file, confirmed accurate and working

data structures:
none needed, each iteration of the program is atomic.

algorithm:
GET total loan amount,
  reject invalid, non-positive numbers,
  verify amount with user
GET Annual percentage rate as a %, not a decimal
  verify % with user
GET duration of the loan (months),
  convert to years, display to user
  verify duration with user

CALCULATE monthly payment with provided formula

RETURN monthly payment in $
PROMPT for another calculation

*/

const readline = require("readline-sync");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number, numberIsAPR = false) {
  if (numberIsAPR === true) {
    return number.trimStart() === "" || Number.isNaN(Number(number));
  } else {
    return (
      number.trimStart() === "" ||
      Number.isNaN(Number(number)) ||
      parseInt(number) === 0
    );
  }
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
prompt("Mortgage Calculator!");
let userApprovesTotal = false;
let userApprovesAPR = false;
let userApprovesDuration = false;

while (!userApprovesTotal) {
  prompt("Enter your loan amount: ");
  let loanAmount = readline.question();

  while (invalidNumber(loanAmount)) {
    prompt(
      "Sorry that's not valid loan amount. Please enter a positive number"
    );
    loanAmount = readline.question();
  }

  prompt("You entered your total loan as $" + loanAmount);
  prompt(
    "Is this amount correct?\nEnter 'y' to approve, or any other input to re-enter your loan amount."
  );
  if (readline.question().toLowerCase() === "y") {
    userApprovesTotal = true;
  }
}

//test cases, all evaluate to true
console.log(
  calculateMonthlyPayment(1000000, 0.033, 180).toFixed(2) === "7051.01",
  calculateMonthlyPayment(100000, 0.06, 360).toFixed(2) === "599.55",
  calculateMonthlyPayment(1000000, 0.033, 120).toFixed(2) === "9795.17",
  calculateMonthlyPayment(275000, 0.048, 250).toFixed(2) === "1742.20",
  calculateMonthlyPayment(275000, 0, 250).toFixed(2) === "1100.00"
);
