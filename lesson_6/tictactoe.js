/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/* Launch School Lesson 6: Tic Tac Toe

  This program includes the following features:
  - Improved "join" for player square selection:
      The list of available squares uses oxford commas
  - Score tracking over 5 games:
      This feature incorporates a first-to-5 scoring structure.
      An object was implemented in the main game loop to hold the relevant data
  - Defensive and Offensive AI:
      The computer will block player wins if it can't win immediately.
  - Refined computer turns:
      The computer will use its AI and go for the middle square if available
  - Set the first player or prompt for choice
      If the FIRST_PLAYER constant is set to 'choose', the program will prompt
      for a new first player at the beginning of every tournament.
      Added this functionality to the game object
  - Improved play-again handling:
      The LS instructions state to only accept Y, y, N, or n as
      input, but this is poor UX design. The version here will
      continue with the next match or another tournament if
      anything *except* n is provided. This makes the logic
      and the check itself easier to understand.
  - Improved game loop:
      refactored player and computer moves into a single function,
      tracking the turns with the game object.
  - Implemented a dashboard:
      Included a block of game stats when the board is drawn
      - Markers for the player and computer
      - Current tournament scores
      - Identify the current player
  - Screen clear toggle:
      Added a constant that, if set to true, will disable the screen clearing.
      (Very helpful in debugging)

*/

const readline = require('readline-sync');

const MAX_WINS = 5;

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'O';
const COMPUTER_MARKER = 'X';
const FIRST_PLAYER = 'choose'; // valid options: 'player' 'computer' 'choose'

const DISABLE_SCREEN_CLEAR = false;

//prettier-ignore
const WINNING_LINES = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
                      [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
                      [1, 5, 9], [3, 5, 7] // diagonals
];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayBoard(board, gameObj) {
  if (!DISABLE_SCREEN_CLEAR) console.clear();

  console.log(`You are '${HUMAN_MARKER}'. Computer is '${COMPUTER_MARKER}'.`);
  console.log(
    `The current score is Player: ${gameObj.playerScore} Computer: ${gameObj.computerScore}`
  );
  console.log(`It is the ${gameObj.currentPlayer}'s turn.`);

  console.log('');
  console.log('     |     |');
  console.log(`  ${board['1']}  |  ${board['2']}  |  ${board['3']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['4']}  |  ${board['5']}  |  ${board['6']}`);
  console.log('     |     |');
  console.log('-----+-----+-----');
  console.log('     |     |');
  console.log(`  ${board['7']}  |  ${board['8']}  |  ${board['9']}`);
  console.log('     |     |');
  console.log('');
}

function initializeBoard() {
  let board = {};

  for (let square = 1; square <= 9; square++) {
    board[String(square)] = INITIAL_MARKER;
  }

  return board;
}

function emptySquares(board) {
  return Object.keys(board).filter(key => board[key] === ' ');
}

function playerChoosesSquare(board) {
  let square;

  while (true) {
    prompt(`Choose a square (${joinOr(emptySquares(board))}):`);

    square = readline.question().trim();
    if (emptySquares(board).includes(square)) break;

    prompt("Sorry, that's not a valid choice.");
  }

  board[square] = HUMAN_MARKER;
}

function computerChoosesSquare(board) {
  let computersMove = computerTurnAI(board);
  board[computersMove] = COMPUTER_MARKER;
}

function boardFull(board) {
  return emptySquares(board).length === 0;
}

function someoneWon(board) {
  return detectWinner(board);
}

function detectWinner(board) {
  for (let line = 0; line < WINNING_LINES.length; line++) {
    let [sq1, sq2, sq3] = WINNING_LINES[line];

    if (
      board[sq1] === HUMAN_MARKER &&
      board[sq2] === HUMAN_MARKER &&
      board[sq3] === HUMAN_MARKER
    ) {
      return 'Player';
    } else if (
      board[sq1] === COMPUTER_MARKER &&
      board[sq2] === COMPUTER_MARKER &&
      board[sq3] === COMPUTER_MARKER
    ) {
      return 'Computer';
    }
  }

  return null;
}

function joinOr(contentArray, delimiter = ', ', linkWord = 'or') {
  if (contentArray.length === 1) return contentArray[0];
  if (contentArray.length === 2) {
    return `${contentArray[0]} ${linkWord} ${contentArray[1]}`;
  } else {
    contentArray[contentArray.length - 1] = `${linkWord} ${
      contentArray[contentArray.length - 1]
    }`;
  }

  return contentArray.join(delimiter);
}

function detectTournamentWinner(scoreObject) {
  if (scoreObject.playerScore === MAX_WINS) return 'Player';
  if (scoreObject.computerScore === MAX_WINS) return 'Computer';
  return null;
}

function displayTournamentScore(scoreObject) {
  prompt(`Player Score: ${scoreObject.playerScore}`);
  prompt(`Computer Score: ${scoreObject.computerScore}`);
}

function checkCenterSquare(board) {
  if (board['5'] === INITIAL_MARKER && emptySquares(board).includes('5')) {
    return '5';
  }
  return null;
}

function findAtRiskSquare(board, marker) {
  /*
  initialize a variable to store the 'at risk' space to null
  step through every winning array
    initialize/reset counters for marker and INITAL_MARKER
    step through each element in the winning line array
      check the board at the current element
        if marker, increment marker counts
        if empty, increment empty counter and flag a potential move
    iff 2 markers and 1 empty element were found,
    and the board is empty on the space that was found,
      set the 'at risk' space to be the potential space
  the function returns null unless an at risk space was found.
  */
  let atRiskSquare = null;

  WINNING_LINES.forEach(line => {
    let markerCount = 0;
    let emptyCount = 0;
    let potentialSquare = '';

    line.forEach(square => {
      if (board[square] === marker) {
        markerCount++;
      }
      if (board[square] === INITIAL_MARKER) {
        emptyCount++;
        potentialSquare = String(square);
      }
    });

    if (
      markerCount === 2 &&
      emptyCount === 1 &&
      emptySquares(board).includes(potentialSquare)
    ) {
      atRiskSquare = potentialSquare;
    }
  });
  return atRiskSquare;
}

function moveForCurrentPlayer(board, currentPlayer) {
  if (currentPlayer === 'player') {
    playerChoosesSquare(board);
  } else {
    computerChoosesSquare(board);
  }
}

function computerTurnAI(board) {
  if (checkCenterSquare(board)) {
    return '5';
  } else if (findAtRiskSquare(board, COMPUTER_MARKER)) {
    return findAtRiskSquare(board, COMPUTER_MARKER);
  } else if (findAtRiskSquare(board, HUMAN_MARKER)) {
    return findAtRiskSquare(board, HUMAN_MARKER);
  }
  let randomValue = Math.floor(Math.random() * emptySquares(board).length);
  return emptySquares(board)[randomValue];
}

function swapCurrentPlayer(currentPlayer) {
  let nextPlayer;

  if (currentPlayer === 'player') {
    nextPlayer = 'computer';
  } else {
    nextPlayer = 'player';
  }

  return nextPlayer;
}

function configurePlayer(newFirstPlayer) {
  let playerChoice = undefined;
  if (newFirstPlayer === 'choose') {
    do {
      prompt(
        `Press '1' for the human player to go first, or press '2' for the computer player to go first.`
      );
      playerChoice = readline.question();
    } while (!playerChoice.match(/^[12]/));

    if (playerChoice === '1') return 'player';
    if (playerChoice === '2') return 'computer';
  } else {
    playerChoice = newFirstPlayer;
  }

  return playerChoice;
}

function tictactoeMainLoop() {
  while (true) {
    let gameObject = {
      playerScore: 0,
      computerScore: 0,
      currentPlayer: 'computer',
      firstPlayer: 'computer'
    };

    gameObject.firstPlayer = configurePlayer(FIRST_PLAYER);
    gameObject.currentPlayer = gameObject.firstPlayer;

    while (true) {
      let board = initializeBoard();

      while (true) {
        displayBoard(board, gameObject);
        moveForCurrentPlayer(board, gameObject.currentPlayer);
        if (someoneWon(board) || boardFull(board)) break;
        displayBoard(board, gameObject);
        gameObject.currentPlayer = swapCurrentPlayer(gameObject.currentPlayer);
      }

      displayBoard(board, gameObject);
      gameObject.currentPlayer = gameObject.firstPlayer;

      if (someoneWon(board)) {
        prompt(`${detectWinner(board)} won the match!`);
        if (detectWinner(board) === 'Player') gameObject.playerScore++;
        if (detectWinner(board) === 'Computer') gameObject.computerScore++;
      } else {
        prompt("It's a tie!");
      }

      if (detectTournamentWinner(gameObject)) {
        prompt(`${detectTournamentWinner(gameObject)} wins the Tournament!`);
        break;
      }

      prompt('Continue the tournament? (n to quit)');
      let answer = readline.question().toLowerCase()[0];
      if (answer === 'n') break;
    }

    displayTournamentScore(gameObject);
    prompt('Play another Tournament? (n to quit)');
    let answer = readline.question().toLowerCase()[0];
    if (answer === 'n') break;
  }

  prompt('Thanks for playing Tic Tac Toe!');
}

tictactoeMainLoop();
