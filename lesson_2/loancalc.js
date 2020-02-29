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
let userIsDone = false;

while (!userIsDone) {
  let userApprovesTotal = false;
  let userApprovesAPR = false;
  let userApprovesDuration = false;
  let loanAmount;
  let aprAmount;
  let durationAmount;
  //get, verify, and confirm the loan amount
  while (!userApprovesTotal) {
    prompt("Enter your loan amount: ");
    loanAmount = readline.question();

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

  //get, verify, and confirm the APR
  while (!userApprovesAPR) {
    prompt("Enter your APR as a whole percentage (enter 5 for a 5% APR)");
    aprAmount = readline.question();

    //invalidNumber() takes 2 arguments when checking for zero-interest loans
    while (invalidNumber(aprAmount, true)) {
      prompt("Sorry that's not valid APR. Please enter 0 or a positive number");
      aprAmount = readline.question();
    }

    prompt("You entered your APR as " + aprAmount + "%");
    prompt(
      "Is this APR correct?\nEnter 'y' to approve, or any other input to re-enter your loan amount."
    );
    if (readline.question().toLowerCase() === "y") {
      userApprovesAPR = true;
    }
  }

  //get, verify, and confirm the duration of the loan
  while (!userApprovesDuration) {
    prompt(
      "Enter the duration of the loan in months (enter 24 for a 2 year loan):"
    );
    durationAmount = readline.question();

    while (invalidNumber(durationAmount)) {
      prompt("Sorry that's not valid duration. Please enter a positive number");
      durationAmount = readline.question();
    }

    prompt(
      "You entered a duration of " +
        durationAmount +
        " months, or " +
        parseFloat(durationAmount / 12).toFixed(2) +
        " years."
    );
    prompt(
      "Is this duration correct?\nEnter 'y' to approve, or any other input to re-enter duration of the loan."
    );
    if (readline.question().toLowerCase() === "y") {
      userApprovesDuration = true;
    }
  }

  prompt("Based on your input, your monthly payment is ");
  console.log(
    "$",
    calculateMonthlyPayment(
      loanAmount,
      aprAmount / 100,
      durationAmount
    ).toFixed(2)
  );

  prompt(
    "Would you like to calculate another loan?\nEnter 'y' to run the calculator again, or any other input to quit."
  );
  if (readline.question().toLowerCase() !== "y") {
    userIsDone = true;
  }
}
//test cases, all evaluate to true
/*console.log(
  calculateMonthlyPayment(1000000, 0.033, 180).toFixed(2) === "7051.01",
  calculateMonthlyPayment(100000, 0.06, 360).toFixed(2) === "599.55",
  calculateMonthlyPayment(1000000, 0.033, 120).toFixed(2) === "9795.17",
  calculateMonthlyPayment(275000, 0.048, 250).toFixed(2) === "1742.20",
  calculateMonthlyPayment(275000, 0, 250).toFixed(2) === "1100.00"
);
*/
