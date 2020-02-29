const readline = require("readline-sync");
const MESSAGES = require("./calculator_messages.json");
const LANGUAGE = "jp"; //use "en" for english and "jp" for japanese

function messages(message, lang = "en") {
  return MESSAGES[lang][message];
}

function prompt(key) {
  let message = messages(key, LANGUAGE);
  console.log(`=> ${message}`);
}

function invalidNumber(number) {
  return number.trimStart() === "" || Number.isNaN(Number(number));
}

prompt("greeting");
let keepCalculating = true;

while (keepCalculating) {
  prompt("first");
  let number1 = readline.question();

  while (invalidNumber(number1)) {
    prompt("number_fail");
    number1 = readline.question();
  }

  prompt("second");
  let number2 = readline.question();

  while (invalidNumber(number2)) {
    prompt("number_fail");
    number2 = readline.question();
  }

  prompt("calculation");
  let operation = readline.question();

  while (!["1", "2", "3", "4"].includes(operation)) {
    prompt("calculation_fail");
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
  prompt("result");
  console.log(output);

  prompt("continue");
  keepCalculating = readline.question().toLowerCase() === "yes";
}
