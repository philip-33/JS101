/* eslint-disable max-statements */
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

- The dealer will hit on a soft 17 (Ace + six)

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
2. Deal cards (first card goes to player, first dealer card is face down)
              (initial cards are dealt to alternating players)
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
const CUT_CARD_RATIO = 0.33;
const CUT_CARD_VARIATION = 0.15;
const CARD_ICON = '🂠';
const DISABLE_SCREEN_CLEAR = true;

//prettier-ignore
const DECK_INIT_ARRAY = ['A', 'A', 'A', 'A', 'A', '2', '2', '2', '2', '2', '3', '3', '3', '3', '3', '4', '4', '4', '4', '4', '5', '5', '5', '5', '5', '6', '6', '6', '6', '6', '7', '7', '7', '7', '7', '8', '8', '8', '8', '8', '9', '9', '9', '9', '9', '10', '10', '10', '10', '10', 'J', 'J', 'J', 'J', 'J', 'Q', 'Q', 'Q', 'Q', 'Q', 'K', 'K', 'K', 'K', 'K'];

const CARD_VALUE_INDEX = [0, 11, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function prompt(msg) {
  console.log(`=> ${msg}`);
}

function initializeDeck() {
  /* step through the DECK_INIT_ARRAY, and for each element,
      push it to a new empty array, then
      return the new full array.
  */
  let newDeck = [];

  DECK_INIT_ARRAY.forEach((card) => {
    newDeck.push(card);
  });

  return newDeck;
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
  /*
    step through each element of the array, taking [idx][1]
  */
  let hasAces = false;
  let foundAces = cardArray.filter((card) => {
    return card[1] === 'A';
  });

  if (foundAces.length > 0) hasAces = true;

  return hasAces;
}

function handHasBusted(cardArray) {
  let busted = false;

  if (calcHandValue(cardArray) === 0) busted = true;

  return busted;
}

function calcHandValue(cardArray) {
  /*
    walk through the array, adding up all the values.
      convert as necessary.
    use a variable to track all found aces,
    and before returning the final value,
      convert enough aces from 11 to 1 so the hand is the best possible score.
  */

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
  /*
    step through each element of the array,
      append to string in this format:
        first element (no space) second element (space)
  */
  let hand = '';
  cardArray.forEach((card) => {
    hand += card[0] + card[1] + ' ';
  });
  return hand;
}

function displayCardTable(playerCards, houseCards, dealerCardIsFaceDown) {
  /*
  check the state of the dealer's face card.
  if hidden:
    show the dealer's hand with one card hidden,
    display the score of the single card
  if not hidden:
    show the dealer's whole hand
    display the total score
  */
  if (!DISABLE_SCREEN_CLEAR) console.clear();
  if (dealerCardIsFaceDown) {
    console.log(
      `\nThe House's hand: ${houseCards[0][0]}${houseCards[0][1]} ${CARD_ICON}`
    );
    console.log(
      `The House's hand is showing ${calcHandValue([houseCards[0]])}`
    );
  } else {
    console.log(`\nThe House's hand: ${displayHand(houseCards)}`);
    console.log(`The House's hand value is ${calcHandValue(houseCards)}`);
  }

  console.log(`\nThe Player's hand: ${displayHand(playerCards)}`);
  console.log(`The Player's hand value is ${calcHandValue(playerCards)}`);
}

function generateCutCardIndex(shoe) {
  /*
    get total cards
    multiply by const rate
    add (or subtract a random number of cards),
    verify this number is less than the total cards available
    return the value to be used to emulate the cut card
  */
  let totalCards = totalRemainingCards(shoe);
  let variationRatio = totalCards * CUT_CARD_VARIATION;
  let additionalCards = Math.floor(rng() * variationRatio - variationRatio / 2);

  return Math.floor(CUT_CARD_RATIO * totalCards + additionalCards);
}

function hit(cardArray, shoe) {}

function houseTurn(houseCards, shoe) {
  /*
    hit until value is 17 or greater.
    if 17 with aces, hit,
    else if <= 17, hit,
    else, stay
    handHasAces(houseCards)
  */

  while (
    calcHandValue(houseCards) < 17 &&
    handHasBusted(houseCards) === false
  ) {
    houseCards.push(drawCardFromShoe(shoe));
  }

  if (handHasAces(houseCards) && calcHandValue(houseCards) === 17) {
    houseCards.push(drawCardFromShoe(shoe));
  }

  return houseCards;
}

function playerTurn(playerCards, shoe) {
  /*
    if the total is less than 21, ask to stay or hit
    on stay, the function is done
  */
}

function mainGameLoop() {
  while (true) {
    let shoe = {};
    shoe['♠️'] = initializeDeck();
    shoe['♥️'] = initializeDeck();
    shoe['♦️'] = initializeDeck();
    shoe['♣️'] = initializeDeck();
    let cutCard = generateCutCardIndex(shoe);

    while (totalRemainingCards(shoe) > cutCard) {
      console.log(`\n=== A new hand is being dealt! ===`);
      let playerCards = [];
      let houseCards = [];
      let dealerCardIsFaceDown = true;

      playerCards.push(drawCardFromShoe(shoe));
      houseCards.push(drawCardFromShoe(shoe));
      playerCards.push(drawCardFromShoe(shoe));
      houseCards.push(drawCardFromShoe(shoe));
      displayCardTable(playerCards, houseCards, dealerCardIsFaceDown);

      // player turn
      displayCardTable(playerCards, houseCards, dealerCardIsFaceDown);

      dealerCardIsFaceDown = false;
      houseCards = houseTurn(houseCards, shoe); // dealer turn
      displayCardTable(playerCards, houseCards, dealerCardIsFaceDown);
      // detect winner

      /*
      this game is not back and forth like tic tac toe, it's first and second.
      Both players could lose until the final decision

      draw cards for both players (alternating). Second dealer card is face down
      The dealer's card does not go face up until the dealer takes their turn.

      player goes through actions until stay or bust, each new card is added
      dealer card goes face up
      computer goes through actions until stay or bust, each new card is added
      */
    }

    prompt(`The shoe is too small, and will be refreshed.`);
    break;
  }
  prompt('Thank you for playing!');
}

mainGameLoop();
