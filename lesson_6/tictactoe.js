/* eslint-disable max-statements */
/* eslint-disable max-lines-per-function */
/*
defense + offense
a defensive square is when the other player has 2/3
an offensive square is where the computer has 2/3
also, if the middle square is not take, use that first.

function computerTurnAI(board){
  if (checkCenterSquare(board)) return 5;

  if findAtRiskSquare(Board, player) {
    return findAtRiskSquare(Board, player);
  }

  if findAtRiskSquare(Board, computer) {
    return findAtRiskSquare(Board, computer);
  }

  return Math.floor(Math.random * 9);
}
*/
const readline = require('readline-sync');

const MAX_WINS = 5;

const INITIAL_MARKER = ' ';
const HUMAN_MARKER = 'O';
const COMPUTER_MARKER = 'X';

//prettier-ignore
const WINNING_LINES = [ [1, 2, 3], [4, 5, 6], [7, 8, 9], // rows
                        [1, 4, 7], [2, 5, 8], [3, 6, 9], // columns
                        [1, 5, 9], [3, 5, 7] // diagonals
];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function displayBoard(board, scores) {
  console.clear();

  console.log(`You are ${HUMAN_MARKER}. Computer is ${COMPUTER_MARKER}`);
  console.log(
    `The current score is Player: ${scores.player} Computer: ${scores.computer}`
  );

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
    return `${contentArray[0]} 
            ${linkWord} 
            ${contentArray[1]}`;
  } else {
    contentArray[contentArray.length - 1] = `${linkWord} ${
      contentArray[contentArray.length - 1]
    }`;
  }

  return contentArray.join(delimiter);
}

function detectTournamentWinner(scoreObject) {
  if (scoreObject.player === MAX_WINS) return 'Player';
  if (scoreObject.computer === MAX_WINS) return 'Computer';
  return null;
}

function displayTournamentScore(scoreObject) {
  prompt(`Player Score: ${scoreObject.player}`);
  prompt(`Computer Score: ${scoreObject.computer}`);
}

function checkCenterSquare(board) {
  if (board['5'] === INITIAL_MARKER && emptySquares(board).includes('5')) {
    return '5';
  }
  return null;
}

function findAtRiskSquare(board, marker) {
  /*
  initialize a variable to store the 'at risk' space
  step through every winning array
    initialize/reset counters for marker and INITAL_MARKER
    step through each element in the winning line array
      check the board at the current element
        if marker, increment marker counts
        if empty, increment empty counter and flag a potential move
    iff 2 markers and 1 empty element were found,
    and the board is empty on the space that was found,
      set the 'at risk' space to be the potential space
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

function computerTurnAI(board) {
  if (checkCenterSquare(board)) {
    return '5';
  } else if (findAtRiskSquare(board, HUMAN_MARKER)) {
    return findAtRiskSquare(board, HUMAN_MARKER);
  } else if (findAtRiskSquare(board, COMPUTER_MARKER)) {
    return findAtRiskSquare(board, COMPUTER_MARKER);
  }
  let randomValue = Math.floor(Math.random() * emptySquares(board).length);
  return emptySquares(board)[randomValue];
}

while (true) {
  let scores = {
    player: 0,
    computer: 0
  };

  while (true) {
    let board = initializeBoard();

    while (true) {
      displayBoard(board, scores);

      playerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;

      computerChoosesSquare(board);
      if (someoneWon(board) || boardFull(board)) break;
    }

    displayBoard(board, scores);

    if (someoneWon(board)) {
      prompt(`${detectWinner(board)} won the match!`);
      if (detectWinner(board) === 'Player') scores.player++;
      if (detectWinner(board) === 'Computer') scores.computer++;
    } else {
      prompt("It's a tie!");
    }

    if (detectTournamentWinner(scores)) {
      prompt(`${detectTournamentWinner(scores)} wins the Tournament!`);
      break;
    }

    prompt('Continue the tournament? (n to quit)');
    let answer = readline.question().toLowerCase()[0];
    if (answer === 'n') break;
  }
  displayTournamentScore(scores);
  prompt('Play another tournament? (n to quit)');
  let answer = readline.question().toLowerCase()[0];
  if (answer === 'n') break;
}
prompt('Thanks for playing Tic Tac Toe!');
