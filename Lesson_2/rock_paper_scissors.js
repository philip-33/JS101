const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const WINNING_COMBOS = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"]
};

function playerWins(playerOneChoice, playerTwoChoice) {
  if (WINNING_COMBOS[playerOneChoice].includes[playerTwoChoice]) {
    return "Player 1";
  } else if (WINNING_COMBOS[playerTwoChoice].includes[playerOneChoice]) {
    return "Player 2";
  } else {
    return "Tie";
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
while (true) {
  prompt(`Choose one: ${VALID_CHOICES.join(", ")}`);
  let choice = readline.question();

  while (!VALID_CHOICES.includes(choice)) {
    prompt("That's not a valid choice");
    choice = readline.question();
  }

  let randomIndex = Math.floor(Math.random() * VALID_CHOICES.length);
  let computerChoice = VALID_CHOICES[randomIndex];

  displayWinner(choice, computerChoice);

  prompt(
    'Do you want to play again? enter "y" to continue or anything else to quit.'
  );
  if (readline.question().toLowerCase() !== "y") break;
}
