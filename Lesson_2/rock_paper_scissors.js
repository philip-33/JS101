const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const WINNING_COMBOS = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"]
};

function getWinner(playerOneChoice, playerTwoChoice) {
  if (WINNING_COMBOS[playerOneChoice].includes(playerTwoChoice)) {
    return "\nPlayer 1 wins! 🏆 👨";
  } else if (WINNING_COMBOS[playerTwoChoice].includes(playerOneChoice)) {
    return "\nThe computer wins! 💥 🤖";
  } else {
    return "\n⚠️ It's a tie! ⚠️";
  }
}

function prompt(message) {
  console.log(`=> ${message}`);
}

/*
function displayWinner(choice, computerChoice) {
  prompt(`You chose ${choice}, computer chose ${computerChoice}`);

  if (
    (choice === "rock" && computerChoice === "scissors") ||
    (choice === "paper" && computerChoice === "rock") ||
    (choice === "scissors" && computerChoice === "paper")
  ) {
    prompt("You win!");
  } else if (
    (choice === "rock" && computerChoice === "paper") ||
    (choice === "paper" && computerChoice === "scissors") ||
    (choice === "scissors" && computerChoice === "rock")
  ) {
    prompt("Computer wins!");
  } else {
    prompt("It's a tie");
  }
}
*/
let tournamentInProgress = true;

while (tournamentInProgress) {
  prompt(`Choose one: ${VALID_CHOICES.join(", ")}`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  console.log(
    `\nYou picked ${choice}, and the computer picked ${computerChoice}`,
    getWinner(choice, computerChoice),
    "\n"
  );

  prompt(
    'Do you want compete again?\nEnter "y" to participate in another RPSLS tournament or anything else to quit.'
  );
  if (readline.question().toLowerCase() !== "y") {
    tournamentInProgress = false;
  }
}
