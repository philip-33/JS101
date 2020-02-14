const readline = require("readline-sync");
const VALID_CHOICES = ["rock", "paper", "scissors", "lizard", "spock"];
const WINNING_COMBOS = {
  rock: ["scissors", "lizard"],
  paper: ["rock", "spock"],
  scissors: ["paper", "lizard"],
  lizard: ["paper", "spock"],
  spock: ["rock", "scissors"]
};
const PLAYER_WINS = {
  player1: 0,
  player2: 0
};

function getWinner(playerOneChoice, playerTwoChoice) {
  if (WINNING_COMBOS[playerOneChoice].includes(playerTwoChoice)) {
    return "Player 1";
  } else if (WINNING_COMBOS[playerTwoChoice].includes(playerOneChoice)) {
    return "Player 2";
  } else {
    return false;
  }
}

function checkForChampion() {
  if (PLAYER_WINS.player1 === 5) {
    return "Player 1";
  } else if (PLAYER_WINS.player2 === 5) {
    return "Player 2";
  } else {
    return false;
  }
}

function printCurrentScores() {
  console.log(
    "\nThe current score is:",
    `\nPlayer 1: ${PLAYER_WINS.player1}`,
    `\nPlayer 2: ${PLAYER_WINS.player2}`
  );
}

function prompt(message) {
  console.log(`=> ${message}`);
}

let tournamentInProgress = true;

prompt(
  "Welcome to the Rock, Paper, Scissors, Lizard, Spock Grand Championship!"
);
prompt("The first player to 5 wins is the Grand Winner!\n");

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
    `\nYou picked ${choice}, and the computer picked ${computerChoice}.\n`
  );
  let newWinner = getWinner(choice, computerChoice);
  if (newWinner !== false) {
    console.log(`The winner is ${newWinner}!`);
    if (newWinner === "Player 1") {
      PLAYER_WINS.player1++;
    } else {
      PLAYER_WINS.player2++;
    }
  } else {
    console.log("It's a tie!");
  }

  printCurrentScores();

  let newChampion = checkForChampion();
  if (newChampion !== false) {
    console.log(`\nCongratulations to the new Grand Winner, ${newChampion}!`);
    tournamentInProgress = false;
  }
}
