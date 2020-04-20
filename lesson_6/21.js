/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-mixed-operators */
'use strict';
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
const CUT_CARD_VARIATION = 0.15;
const CARD_ICON = '🂠';
const DEALER_DRAW_DELAY = 500;
const SCORE_LIMIT = 21;
const DEALER_LIMIT = SCORE_LIMIT - 5;
const SUIT_ARRAY = ['♠️', '♥️', '♦️', '♣️'];
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
  if (requestedValue === 'fullValueAces') return fullValueAces;
  else return total;
}

function getHandValue(cardArray) {
  return checkScoreOrAces(cardArray);
}

function hasFullValueAces(cardArray) {
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
  console.log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+`);
  console.log(`Player Wins: ${playerScore}, Dealer Wins: ${dealerScore}`);
}

function displayCardTable(cardTable, matchScores = [0, 0]) {
  let dealerCards = cardTable.dealerCards.slice();
  let playerCards = cardTable.playerCards.slice();
  let dealerCardIsFaceDown = cardTable.dealerCardIsFaceDown;

  if (!DEBUG_MODE) console.clear();
  displayMatchScores(matchScores);
  console.log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+`);
  if (dealerCardIsFaceDown) {
    console.log(
      `Dealer Hand : ${dealerCards[0][0]}${
        dealerCards[0][1]
      } ${CARD_ICON}  (${getHandValue([dealerCards[0]])})`
    );
  } else {
    console.log(
      `Dealer Hand : ${displayHand(dealerCards)}(${getHandValue(dealerCards)})`
    );
  }

  console.log(
    `\nPlayer Hand : ${displayHand(playerCards)}(${getHandValue(playerCards)})`
  );
  console.log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+`);
}

function generateCutCardIndex(shoe) {
  let totalCards = totalRemainingCards(shoe);
  let variationRatio = totalCards * CUT_CARD_VARIATION;
  let additionalCards = Math.floor(rng() * variationRatio - variationRatio / 2);

  return Math.floor(CUT_CARD_RATIO * totalCards + additionalCards);
}

function dealerTurn(cardTable, shoe, matchScores) {
  let dealerCards = cardTable.dealerCards.slice();
  let handValue = getHandValue(dealerCards);
  displayCardTable(cardTable, matchScores);

  while (
    handValue < DEALER_LIMIT ||
    (handValue === DEALER_LIMIT && hasFullValueAces(dealerCards))
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
    console.log(`Will you hit or stay?`);
    prompt(`Press 1 to hit or any other key to stay.`);
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

function getWinner(cardTable, matchScores) {
  let playerScore = getHandValue(cardTable.playerCards);
  let dealerScore = getHandValue(cardTable.dealerCards);
  let playerIsBust = playerScore > SCORE_LIMIT;
  let dealerIsBust = dealerScore > SCORE_LIMIT;

  if (dealerIsBust && playerIsBust) {
    matchScores[1]++;
    return `Both players BUST. The Dealer wins.`;
  }
  if (!dealerIsBust && playerIsBust) {
    matchScores[1]++;
    return `The Player BUST, so the Dealer wins.`;
  }
  if (dealerIsBust && !playerIsBust) {
    matchScores[0]++;
    return `The Dealer BUST, so the Player wins.`;
  }

  if (playerScore === dealerScore) return `The players PUSH. No winner.`;

  if (playerScore > dealerScore) {
    matchScores[0]++;
    return `The Player wins, showing ${playerScore} over the Dealer's ${dealerScore}`;
  } else if (dealerScore > playerScore) {
    matchScores[1]++;
    return `The Dealer wins, showing ${dealerScore} over the Player's ${playerScore}`;
  }
  return 'No winner.';
}

function displayMatchWinner(matchScores) {
  let [playerMatches, dealerMatches] = matchScores;
  return playerMatches > dealerMatches
    ? 'The Player wins the match!'
    : 'The Dealer wins the match!';
}

function mainGameLoop() {
  while (true) {
    let shoe = initializeDeck(SUIT_ARRAY);
    let cutCard = generateCutCardIndex(shoe);
    let playerChoice = '';
    let matchScores = [0, 0];

    while (
      totalRemainingCards(shoe) > cutCard &&
      matchScores.every((num) => num < 5)
    ) {
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

      console.log(getWinner(cardTable, matchScores));
      prompt(`Another hand? Press q to quit, or any other key to play again.`);
      playerChoice = readline.question().trim();
      if (playerChoice.match(/q/i) || matchScores.includes((num) => num > 4)) {
        break;
      }
      break;
    }
    break;
  }
  prompt('Thank you for playing!');
}

mainGameLoop();
