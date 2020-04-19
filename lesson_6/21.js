/* eslint-disable max-lines-per-function */
/* eslint-disable max-statements */
/* eslint-disable no-mixed-operators */
'use strict';
/*
Twenty-One (not blackjack...)
This program uses NPM packages for seedrandom and readline-sync.

In addition to the Launch School requirements, the following has been added:
- 5 decks instead of a single deck:
  Traditionally, multiple decks of cards are shuffled together and dealt from a
  single stack. A "shoe" deters cheating and make the cards quick to draw.

- Implementing a "cut card" feature:
  When a new shoe is brought into play, a plastic card is inserted randomly
  into the deck near the end (approx. 1/4 to 1/3 from the end). Once this
  plastic marker is drawn, the used shoe is swapped out for a new one.

- Implemented the dealer hitting on a soft 17 (a score of 17 with aces)

- ASCII GUI with card suits and delays during the dealer play loop to give the
  impression of drawing cards.

- Other: show the values of the hands to the player

Deck: 260 cards (5 decks).

Game Goal: get as close as possible to 21 w/o going over

Setup: Dealer and Player are dealt 2 cards.
During the player's turn, they can only see one of the dealer cards

Card      Value
----    ----------
2-10    face value
JQK         10
Ace       1 or 11
An Ace only counts as 1 if an 11 would bust.
The hand is always calculated to get the best possible score

pseudocode:
1. Init deck
2. Deal cards (first card goes to player, first dealer card is face down)
              (initial cards are dealt to alternating players)
3. Player turn: hit or stay
    -repeat until bust or stay
    -if player busts, dealer wins
4. Dealer turn: hit or stay
    -repeat until total >= 17
    -if dealer busts, player wins
5. Compare and declare

this game is not back and forth like tic tac toe, it's first and second.
Both players could lose before the final decision
*/

const readline = require('readline-sync');
const seedrandom = require('seedrandom');

const DEBUG_MODE = false;

const rng = seedrandom();
const CUT_CARD_RATIO = 0.33;
const CUT_CARD_VARIATION = 0.15;
const CARD_ICON = '🂠';
const DEALER_DRAW_DELAY = 500;
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

function handHasAces(cardArray) {
  let hasAces = false;
  let foundAces = cardArray.filter((card) => {
    return card[1] === 'A';
  });

  if (foundAces.length > 0) hasAces = true;

  return hasAces;
}

function calcHandValue(cardArray) {
  let foundAceCount = 0;
  let total = 0;
  let valueArray = cardArray.map((card) => card[1]);

  valueArray.forEach((value) => {
    if (value === 'A') {
      foundAceCount++;
      total += 11;
    } else if (value === 'J' || value === 'Q' || value === 'K') {
      total += 10;
    } else {
      total += Number(value);
    }
  });

  while (foundAceCount > 0 && total > 21) {
    total -= 10;
    foundAceCount--;
  }
  return total;
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

function displayCardTable(cardTable) {
  let dealerCards = cardTable.dealerCards.slice();
  let playerCards = cardTable.playerCards.slice();
  let dealerCardIsFaceDown = cardTable.dealerCardIsFaceDown;

  if (!DEBUG_MODE) console.clear();
  console.log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+`);
  if (dealerCardIsFaceDown) {
    console.log(
      `Dealer Hand : ${dealerCards[0][0]}${
        dealerCards[0][1]
      } ${CARD_ICON}  (${calcHandValue([dealerCards[0]])})`
    );
  } else {
    console.log(
      `Dealer Hand : ${displayHand(dealerCards)}(${calcHandValue(dealerCards)})`
    );
  }

  console.log(
    `\nPlayer Hand : ${displayHand(playerCards)}(${calcHandValue(playerCards)})`
  );
  console.log(`+=+=+=+=+=+=+=+=+=+=+=+=+=+`);
}

function generateCutCardIndex(shoe) {
  let totalCards = totalRemainingCards(shoe);
  let variationRatio = totalCards * CUT_CARD_VARIATION;
  let additionalCards = Math.floor(rng() * variationRatio - variationRatio / 2);

  return Math.floor(CUT_CARD_RATIO * totalCards + additionalCards);
}

function dealerTurn(cardTable, shoe) {
  let dealerCards = cardTable.dealerCards.slice();
  let handValue = calcHandValue(dealerCards);
  displayCardTable(cardTable);

  while (handValue < 17 || (handValue === 17 && handHasAces(dealerCards))) {
    console.log(`Dealer is drawing...`);
    wait(DEALER_DRAW_DELAY);

    dealerCards.push(drawCardFromShoe(shoe));
    cardTable.dealerCards = dealerCards;
    displayCardTable(cardTable);
    handValue = calcHandValue(dealerCards);
  }

  cardTable.dealerCards = dealerCards;
}

function playerTurn(cardTable, shoe) {
  let playerCards = cardTable.playerCards.slice();
  let playerStays = false;

  while (calcHandValue(playerCards) <= 21 && playerStays === false) {
    console.log(`Will you hit or stay?`);
    prompt(`Press 1 to hit or any other key to stay.`);
    let choice = readline.question().trim();

    if (choice.match(/1/)) {
      playerCards.push(drawCardFromShoe(shoe));
    } else {
      playerStays = true;
    }

    cardTable.playerCards = playerCards;
    displayCardTable(cardTable);
  }
}

function getWinnerString(cardTable) {
  let playerScore = calcHandValue(cardTable.playerCards);
  let dealerScore = calcHandValue(cardTable.dealerCards);
  let playerIsBust = playerScore > 21;
  let dealerIsBust = dealerScore > 21;

  if (dealerIsBust && playerIsBust) {
    return `Both players BUST. The Dealer wins.`;
  }
  if (!dealerIsBust && playerIsBust) {
    return `The Player BUST, so the Dealer wins.`;
  }
  if (dealerIsBust && !playerIsBust) {
    return `The Dealer BUST, so the Player wins.`;
  }

  if (playerScore === dealerScore) return `The players PUSH. No winner.`;

  if (playerScore > dealerScore) {
    return `The Player wins, showing ${playerScore} over the Dealer's ${dealerScore}`;
  } else if (dealerScore > playerScore) {
    return `The Dealer wins, showing ${dealerScore} over the Player's ${playerScore}`;
  }

  return "Couldn't find winner!";
}

function mainGameLoop() {
  while (true) {
    let shoe = initializeDeck(SUIT_ARRAY);
    let cutCard = generateCutCardIndex(shoe);
    let playerChoice = '';

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
      displayCardTable(cardTable);

      playerTurn(cardTable, shoe);
      displayCardTable(cardTable);
      cardTable.dealerCardIsFaceDown = false;
      dealerTurn(cardTable, shoe);
      displayCardTable(cardTable);

      console.log(getWinnerString(cardTable));

      prompt(`Another hand? Press q to quit, or any other key to play again.`);
      playerChoice = readline.question().trim();
      if (playerChoice.match(/q/i)) break;
    }
    if (playerChoice.match(/q/i)) break;
    console.log(
      `The cut card has been reached, and a new shoe has been shuffled.\nPress Enter to continue.`
    );
    readline.question().trim();
  }
  prompt('Thank you for playing!');
}

mainGameLoop();
