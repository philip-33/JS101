/* eslint-disable no-mixed-operators */
/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */

/*
Twenty-One (not blackjack...)
This program uses NPM packages for seedrandom and readline-sync.

In addition to the Launch School requirements, the following has been added:
- 5 decks (260 cards) instead of a single deck:
  In casino play, multiple decks of cards are shuffled together and dealt from a
  single stack in a box called a "shoe". A shoe makes drawing cards easier and
  deters dealer cheating.

- Implementing a "cut card" feature:
  When a new shoe is brought into play, a plastic card is inserted randomly
  into the deck near the end (approx. 1/4 to 1/3 from the end). Once this
  plastic marker is drawn, the current hand is completed, and the shoe is
  swapped for a new one.

- Implemented the dealer hitting on a soft 17 (a score of 17 with aces).

- ASCII GUI with card suits and hand totals, delays during the dealer play loop
  to give the impression of drawing cards

- Streamlined input detection with fail-open user choices
  Mash enter to play forever!
*/

const readline = require('readline-sync');
const seedrandom = require('seedrandom');

const DEBUG_MODE = false;

const rng = seedrandom();
const CUT_CARD_RATIO = 0.33;
const CUT_CARD_VARIATION_RATIO = 0.15;
const DEALER_DRAW_DELAY = 500;
const WINNER_REDRAW_DELAY = 500;
const SCORE_LIMIT = 21;
const DEALER_LIMIT = SCORE_LIMIT - 4;
const MATCH_LIMIT = 5;
const PLAYER_NAME = 'Player';
const DEALER_NAME = 'Dealer';
const SUIT_ARRAY = ['♠️', '♥️', '♦️', '♣️'];
const CARD_ICON = '🂠';
//prettier-ignore
const DECK_INIT_ARRAY = ['A', 'A', 'A', 'A', 'A', '2', '2', '2', '2', '2', '3', '3', '3', '3', '3', '4', '4', '4', '4', '4', '5', '5', '5', '5', '5', '6', '6', '6', '6', '6', '7', '7', '7', '7', '7', '8', '8', '8', '8', '8', '9', '9', '9', '9', '9', '10', '10', '10', '10', '10', 'J', 'J', 'J', 'J', 'J', 'Q', 'Q', 'Q', 'Q', 'Q', 'K', 'K', 'K', 'K', 'K'];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function wait(ms) {
  let start = +new Date();
  while (new Date() - start < ms);
}

function initializeDeck(suitArray) {
  let shoeObject = {};
  suitArray.forEach((suit) => {
    shoeObject[suit] = DECK_INIT_ARRAY.slice();
  });
  return shoeObject;
}

function totalRemainingCards(shoe) {
  let allCardsArray = Object.values(shoe);

  let totalCount = allCardsArray
    .map((arr) => {
      return arr.length;
    })
    .reduce((acc, cur) => {
      return acc + cur;
    });

  return totalCount;
}

function deleteCardFromShoe(suit, value, shoe) {
  let newShoe = shoe[suit];
  let indexToRemove = shoe[suit].indexOf(value);

  return newShoe.splice(indexToRemove, 1);
}

function getCardSuit(suit) {
  switch (suit) {
    case 0:
      return '♠️';
    case 1:
      return '♥️';
    case 2:
      return '♦️';
    case 3:
      return '♣️';
    default:
      return undefined;
  }
}

function getCardValue(value) {
  switch (value) {
    case 10:
      return 'J';
    case 11:
      return 'Q';
    case 12:
      return 'K';
    case 13:
      return 'A';
    default:
      return String(value + 1);
  }
}

function cardIsPresent(suit, value, shoe) {
  let indexOfSuit = Object.keys(shoe).indexOf(suit);
  let remainingCardArray = Object.values(shoe);

  if (remainingCardArray[indexOfSuit].includes(value)) {
    return true;
  }
  return false;
}

function checkScoreOrAces(cardArray, requestedValue = '') {
  let fullValueAces = 0;
  let total = 0;
  let valueArray = cardArray.map((card) => card[1]);

  valueArray.forEach((value) => {
    if (value === 'A') {
      fullValueAces++;
      total += 11;
    } else if (value === 'J' || value === 'Q' || value === 'K') {
      total += 10;
    } else {
      total += Number(value);
    }
  });
  while (fullValueAces > 0 && total > SCORE_LIMIT) {
    total -= 10;
    fullValueAces--;
  }
  if (requestedValue === 'fullValueAces') {
    return fullValueAces;
  } else {
    return total;
  }
}

function getHandValue(cardArray) {
  return checkScoreOrAces(cardArray);
}

function handHasFullValueAces(cardArray) {
  return checkScoreOrAces(cardArray, 'fullValueAces') > 0;
}

function drawCardFromShoe(shoe) {
  let suit;
  let value;

  do {
    suit = getCardSuit(Math.round(rng() * 3));
    value = getCardValue(Math.round(rng() * 13));

    if (cardIsPresent(suit, value, shoe)) {
      deleteCardFromShoe(suit, value, shoe);
      break;
    }
  } while (true);

  return [suit, value];
}

function displayHand(cardArray) {
  let hand = '';
  cardArray.forEach((card) => {
    hand += card[0] + card[1] + ' ';
  });
  return hand;
}

function displayMatchScores(matchScores) {
  let [playerScore, dealerScore] = matchScores;
  console.log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+`);
  console.log(
    `${PLAYER_NAME} Wins: ${playerScore}, ${DEALER_NAME} Wins: ${dealerScore}`
  );
}

function displayCardTable(cardTable, matchScores) {
  let dealerCards = cardTable.dealerCards.slice();
  let playerCards = cardTable.playerCards.slice();
  let dealerCardIsFaceDown = cardTable.dealerCardIsFaceDown;

  if (!DEBUG_MODE) console.clear();
  displayMatchScores(matchScores);
  console.log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+`);
  if (dealerCardIsFaceDown) {
    console.log(
      `Dealer Hand : ${dealerCards[0][0]}${
        dealerCards[0][1]
      } ${CARD_ICON}  (${getHandValue([dealerCards[0]])})`
    );
  } else {
    console.log(
      `${DEALER_NAME} Hand : ${displayHand(dealerCards)}(${getHandValue(
        dealerCards
      )})`
    );
  }

  console.log(
    `\n${PLAYER_NAME} Hand : ${displayHand(playerCards)}(${getHandValue(
      playerCards
    )})`
  );
  console.log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+`);
}

function generateCutCardIndex(shoe) {
  let totalCards = totalRemainingCards(shoe);
  let variation = totalCards * CUT_CARD_VARIATION_RATIO;
  let additionalCards = Math.round(rng() * variation - variation / 2);

  return Math.round(CUT_CARD_RATIO * totalCards + additionalCards);
}

function dealerTurn(cardTable, shoe, matchScores) {
  let dealerCards = cardTable.dealerCards.slice();
  let handValue = getHandValue(dealerCards);
  displayCardTable(cardTable, matchScores);

  while (
    handValue < DEALER_LIMIT ||
    (handValue === DEALER_LIMIT && handHasFullValueAces(dealerCards))
  ) {
    console.log(`Dealer is drawing...`);
    wait(DEALER_DRAW_DELAY);

    dealerCards.push(drawCardFromShoe(shoe));
    cardTable.dealerCards = dealerCards;
    displayCardTable(cardTable, matchScores);
    handValue = getHandValue(dealerCards);
  }
}

function playerTurn(cardTable, shoe, matchScores) {
  let playerCards = cardTable.playerCards.slice();
  let handValue = getHandValue(playerCards);
  let playerStays = false;

  while (handValue <= SCORE_LIMIT && playerStays === false) {
    prompt(`Will you hit or stay?`);
    console.log(`(1) Press 1 to hit\n(*) Or press any other key to stay.`);
    let choice = readline.question().trim();

    if (choice.match(/1/)) {
      playerCards.push(drawCardFromShoe(shoe));
    } else {
      playerStays = true;
    }

    cardTable.playerCards = playerCards;
    displayCardTable(cardTable, matchScores);
    handValue = getHandValue(playerCards);
  }
}

function getWinner(cardTable) {
  let playerScore = getHandValue(cardTable.playerCards);
  let dealerScore = getHandValue(cardTable.dealerCards);
  let playerIsBust = playerScore > SCORE_LIMIT;
  let dealerIsBust = dealerScore > SCORE_LIMIT;
  let point = '';
  let winString = '';

  if (dealerIsBust && playerIsBust) {
    point = DEALER_NAME;
    winString = `Both players BUST. The Dealer wins.`;
  } else if (!dealerIsBust && playerIsBust) {
    point = DEALER_NAME;
    winString = `${PLAYER_NAME} BUST, so the Dealer wins.`;
  } else if (dealerIsBust && !playerIsBust) {
    point = PLAYER_NAME;
    winString = `${DEALER_NAME} BUST, so the Player wins.`;
  } else if (playerScore === dealerScore) {
    winString = `The players PUSH. No winner.`;
  } else if (playerScore > dealerScore) {
    point = PLAYER_NAME;
    winString = `${PLAYER_NAME} wins, showing ${playerScore} over the Dealer's ${dealerScore}.`;
  } else if (dealerScore > playerScore) {
    point = DEALER_NAME;
    winString = `${DEALER_NAME} wins, showing ${dealerScore} over the Player's ${playerScore}.`;
  }

  return [playerScore, dealerScore, point, winString];
}

function updateScores(winner, matchScores) {
  if (winner[2] === PLAYER_NAME) matchScores[0]++;
  else if (winner[2] === DEALER_NAME) matchScores[1]++;
}

function displayHandWinner(winner) {
  console.log(`${winner[3]}`);
}

function displayMatchWinner(matchScores) {
  let [playerMatches, dealerMatches] = matchScores;
  console.log(
    playerMatches > dealerMatches
      ? `${PLAYER_NAME} wins the match!`
      : `${DEALER_NAME} wins the match!`
  );
}

function matchHasWinner(matchScores) {
  return !matchScores.every((num) => num < MATCH_LIMIT);
}

function mainGameLoop() {
  let playerChoice = '';
  let matchScores = [0, 0];

  while (true) {
    let shoe = initializeDeck(SUIT_ARRAY);
    let cutCard = generateCutCardIndex(shoe);

    while (totalRemainingCards(shoe) > cutCard) {
      let cardTable = {
        playerCards: [],
        dealerCards: [],
        dealerCardIsFaceDown: true,
      };
      cardTable.playerCards.push(drawCardFromShoe(shoe));
      cardTable.dealerCards.push(drawCardFromShoe(shoe));
      cardTable.playerCards.push(drawCardFromShoe(shoe));
      cardTable.dealerCards.push(drawCardFromShoe(shoe));
      displayCardTable(cardTable, matchScores);

      playerTurn(cardTable, shoe, matchScores);
      displayCardTable(cardTable, matchScores);
      cardTable.dealerCardIsFaceDown = false;
      dealerTurn(cardTable, shoe, matchScores);
      displayCardTable(cardTable, matchScores);

      let winner = getWinner(cardTable);
      updateScores(winner, matchScores);
      displayHandWinner(winner);

      if (matchHasWinner(matchScores)) {
        wait(WINNER_REDRAW_DELAY);
        displayCardTable(cardTable, matchScores);
        displayMatchWinner(matchScores);
        matchScores = [0, 0];
        prompt(
          `Another match?\n(q) Press q to quit\n(n) Press n to play with a new shoe\n(*) Or press any other key to continue.\n`
        );
      } else {
        prompt(
          `Another hand?\n(q) Press q to quit\n(*) Or press any other key to continue.`
        );
      }

      playerChoice = readline.question().trim();
      if (playerChoice.match(/q/i) || playerChoice.match(/n/i)) break;
    } // cut card loop ends here
    if (totalRemainingCards(shoe) <= cutCard) {
      console.log(
        `The cut card has been reached, so the shoe has been reshuffled`
      );
    }

    if (playerChoice.match(/q/i)) break;
  } // init deck loop ends here
  prompt('Thank you for playing!');
}

mainGameLoop();
