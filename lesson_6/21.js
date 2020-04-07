/* eslint-disable max-lines-per-function */
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
  Before a new shoe is used, a thick plastic card is inserted randomly into the
  shoe near the end (approx. 1/4 to 1/3 from the end). Once this plastic marker
  is drawn, the shoe is swapped out for a completely new set of decks in a
  different shoe.

Deck: 260 cards (5 decks).

Game Goal: get as close as possible to 21 w/o going over

Setup: Dealer, Player dealt 2 cards.
  Player can see both of their cards, and also one of the dealer's cards
Card values:
Card      Value
2-10    face value
JQK         10
Ace       1 or 11
An Ace only counts as 1 if an 11 would bust

Player Turn:
Always goes first.
The player can hit until they bust or stay.
Lose on bust.

Dealer Turn:
Once the player stays, it's the dealer turn.
The dealer must hit until the total is 17 or more.
If the dealer busts, the player wins

Comparing:
if both the player and dealer stay, show all cards.
total the cards based on the values above.
The winner has the higher total

pseudocode:
1. Init deck
2. Deal cards
3. Player turn: hit or stay
    -repeat until bust or stay
    -if player busts, dealer wins
4. Dealer turn: hit or stay
    -repeat until total >= 17
    -if dealer busts, player wins
5. Compare and declare

Data structure for deck?
object with a key for each suit, and their values would be an array with
5 elements of each card

To draw a card, generate 2 random numbers.
The first is 1-4 for the suit,
the second is between 1 and 14 for the value.
This model will need to check the available cards each time.
If the card selected is not available, just draw another card.
*/

let seedrandom = require('seedrandom');
const rng = seedrandom();
const CARD_ICON = '🂠';
const CUT_CARD_SEED_RATIO = 33;

//prettier-ignore
const DECK_INIT_ARRAY = ['A', 'A', 'A', 'A', 'A', '2', '2', '2', '2', '2', '3', '3', '3', '3', '3', '4', '4', '4', '4', '4', '5', '5', '5', '5', '5', '6', '6', '6', '6', '6', '7', '7', '7', '7', '7', '8', '8', '8', '8', '8', '9', '9', '9', '9', '9', '10', '10', '10', '10', '10', 'J', 'J', 'J', 'J', 'J', 'Q', 'Q', 'Q', 'Q', 'Q', 'K', 'K', 'K', 'K', 'K'];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function initializeDeck() {
  /* step through the DECK_INIT_ARRAY, and for each element,
      push it to a new empty array, then
      return the new full array.
  */
  let newDeck = [];

  DECK_INIT_ARRAY.forEach(card => {
    newDeck.push(card);
  });

  return newDeck;
}

function totalRemainingCards(shoe) {
  let allCardsArray = Object.values(shoe);

  let totalCount = allCardsArray
    .map(arr => {
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

  return suit + value;
}

function mainGameLoop() {
  while (true) {
    let cutCardIndex = DECK_INIT_ARRAY.length / CUT_CARD_SEED_RATIO;
    let shoe = {};
    shoe['♠️'] = initializeDeck();
    shoe['♥️'] = initializeDeck();
    shoe['♦️'] = initializeDeck();
    shoe['♣️'] = initializeDeck();

    while (totalRemainingCards(shoe) > cutCardIndex) {
      for (let idx = 0; idx < 210; idx++) {
        console.log(`${drawCardFromShoe(shoe)} was drawn from the shoe.`);
        console.log(`There are ${totalRemainingCards(shoe)} cards remaining`);
      }
      break;
    }
    prompt(`The shoe is too small, and will be refreshed.`);
    break;
  }
  prompt('Thank you for playing!');
}

mainGameLoop();
