const readline = require("readline-sync");
const PROMPTS = require("./calculator_messages.json");

function prompt(message) {
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

prompt(PROMPTS.greeting);
let keepCalculating = true;

while (keepCalculating) {
  prompt(PROMPTS.first);
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt(PROMPTS.number_fail);
    number1 = readline.question();
  }

  console.log(PROMPTS.second);
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt(PROMPTS.number_fail);
    number2 = readline.question();
  }

  prompt(PROMPTS.calculation);
  let operation = readline.question();

  while (!["1", "2", "3", "4"].includes(operation)) {
    prompt(PROMPTS.calculation_fail);
    operation = readline.question();
  }

  let output;
  switch (operation) {
    case "1":
      output = Number(number1) + Number(number2);
      break;
    case "2":
      output = Number(number1) - Number(number2);
      break;
    case "3":
      output = Number(number1) * Number(number2);
      break;
    case "4":
      output = Number(number1) / Number(number2);
      break;
  }
  console.log(`The result is: ${output}`);

  prompt(PROMPTS.continue);
  keepCalculating = readline.question().toLowerCase() === "yes";
}
