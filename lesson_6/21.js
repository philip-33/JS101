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
  When a new shoe is used, a plastic card is inserted randomly into the
  deck near the end (approx. 1/4 to 1/3 from the end). Once this plastic marker
  is drawn, the used shoe is swapped out for one with a full set of decks.

- Implemented the dealer hitting on a soft 17 (Ace + six)

- ASCII GUI with card suits and delays during the dealer play loop to give the
  impression of drawing cards.

- Other: , show the values of the hands to the player

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

Player Turn:
Always goes first.
The player can hit until they bust or stay.
Lose on bust.

Dealer Turn:
show all cards now.
Once the player stays or busts, it's the dealer turn.
If the player busts, the dealer stays.
Otherwise,
The dealer must hit until the total is 17 or more.

Comparing:
the winner is the player with the highest score that is 21 or less
score above 21 is bust
if both players have the same score 21 or less, that is a push
if both players bust, **the player loses**

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

this game is not back and forth like tic tac toe, it's first and second.
Both players could lose until the final decision

draw cards for both players (alternating). Second dealer card is face down
The dealer's card does not go face up until the dealer takes their turn.

player goes through actions until stay or bust, each new card is added
dealer card goes face up
computer goes through actions until stay or bust, each new card is added

*/

const readline = require('readline-sync');
const seedrandom = require('seedrandom');

const DEBUG_MODE = true;

const rng = seedrandom();
const CUT_CARD_RATIO = 0.33;
const CUT_CARD_VARIATION = 0.15;
const CARD_ICON = '🂠';
const DEALER_DRAW_DELAY = 500;
const SUIT_INIT_ARRAY = ['♠️', '♥️', '♦️', '♣️'];
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

  if (calcHandValue(cardArray) > 21) busted = true;

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

function displayHandValue(score) {
  if (score > 21) return 'BUST';
  if (score <= 21) return String(score);
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

function displayCardTable(cardTable) {
  /*
  check the state of the dealer's face card.
  if hidden:
    show the dealer's hand with one card hidden,
    display the score of the single card
  if not hidden:
    show the dealer's whole hand
    display the total score
  */

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

function dealerTurn(cardTable, shoe) {
  /*
    hit until value is 17 or greater and not busted.
    if 17 with aces, hit one more time,
    if < 17, hit until value is 17 or greater and not busted.
  */

  let dealerCards = cardTable.dealerCards.slice();
  displayCardTable(cardTable);

  while (
    calcHandValue(dealerCards) < 17 &&
    handHasBusted(dealerCards) === false
  ) {
    dealerCards.push(drawCardFromShoe(shoe));
    cardTable.dealerCards = dealerCards;
    console.log(`Dealer is drawing...`);
    wait(DEALER_DRAW_DELAY);
    displayCardTable(cardTable);
  }

  if (calcHandValue(dealerCards) === 17 && handHasAces(dealerCards)) {
    dealerCards.push(drawCardFromShoe(shoe));
    cardTable.dealerCards = dealerCards;
    console.log(`Dealer is drawing...`);
    wait(DEALER_DRAW_DELAY);
    displayCardTable(cardTable);
  }

  while (
    calcHandValue(dealerCards) < 17 &&
    handHasBusted(dealerCards) === false
  ) {
    dealerCards.push(drawCardFromShoe(shoe));
    cardTable.dealerCards = dealerCards;
    console.log(`Dealer is drawing...`);
    wait(DEALER_DRAW_DELAY);
    displayCardTable(cardTable);
  }

  cardTable.dealerCards = dealerCards;
}

function playerTurn(cardTable, shoe) {
  /*
    if the total is less than 21, ask to stay or hit
    on stay, the function is done

    while score <= 21 and user wants to continue
      ask to hit or stay

      if stay, break
      else
      draw card from shoe
      draw board
  */
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

function displayWinner(winnerData) {
  prompt('found winner');
}

function detectWinner(cardTable) {
  let playerScore = calcHandValue(cardTable.playerCards);
  console.log(`${cardTable.dealerCards}`);
  let dealerScore = calcHandValue(cardTable.dealerCards);
  console.log(`detectwinner called cHV 2x`);
  let playerIsBust = playerScore > 21;
  let dealerIsBust = dealerScore > 21;
  let winnerData = [];

  if (playerScore > dealerScore && !playerIsBust) {
    winnerData.push(`The Player wins with ${playerScore}.`);
  } else if (dealerScore > playerScore && !dealerIsBust) {
    winnerData.push(`The Dealer wins with ${dealerScore}.`);
  } else if (dealerScore === playerScore && !playerIsBust) {
    winnerData.push(`The players push, both with a score of ${playerScore}`);
  } else if (playerIsBust && dealerIsBust) {
    winnerData.push(`Both players bust, the dealer wins.`);
  }

  return winnerData;
}

function mainGameLoop() {
  while (true) {
    let shoe = initializeDeck(SUIT_INIT_ARRAY);
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
      displayCardTable(cardTable);

      playerTurn(cardTable, shoe);
      displayCardTable(cardTable);
      cardTable.dealerCardIsFaceDown = false;
      dealerTurn(cardTable, shoe); // dealer turn
      displayCardTable(cardTable);

      prompt(`Another hand? Press q to quit, or any other key to play again.`);
      let choice = readline.question().trim();
      if (choice.match(/q/i)) break;
    }

    prompt(`The cut card has been reached, so the decks will be replaced.`);
    break;
  }
  prompt('Thank you for playing!');
}

mainGameLoop();
