/*Global Variables
Player {}
Computer {}
Master Card deck - contains an array of the cards and is shuffled and distributed to each player before start of the game
Player Deck - contains the cards in the players deck
(should be pushed to or pulled from depending on what happens during turn)
player card count - contains the number of cards in the player's deck (should start at 26 and be incremented or decremented depending on turn outcome)
Computer Deck - contains the cards in the computer's deck
computer card count - contains the number of cards in the players deck
*/
let masterDeck = []

const player = {
    name: 'Player 1',
    deck: [],
    cardCount: 26
}

const computer = {
    name: 'Computer',
    deck: [],
    cardCount: 26//use deck.length to update this amount
}

//DOM Elements below (what needs to be accessed/updated for user)
let playerDeck = document.querySelector('#player-deck')
let playerDisplay = document.querySelector('#player-display')
let computerDeck = document.querySelector('#computer-deck')
let computerDisplay = document.querySelector('#computer-display')
let resetButton = document.querySelector('button')


//populating master deck variable

let cardValue = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

let cardTypes = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']

let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']

let startingHand = []

//these lines created my master deck
function createDeck() {
    for(let i = 0; i < cardTypes.length; i++) {
        for(let j = 0; j < suits.length; j++) {
        masterDeck.push([cardTypes[i], suits[j]]) 
        }
    } 
    return masterDeck
}

createDeck()

//console.log(masterDeck)



//this shuffles my master deck
function deckShuffle(deck) {
    deck.sort(() => Math.random() - 0.5)
}

deckShuffle(masterDeck)

//these lines will distributes 26 cards to each player
function divyCards () {
    player.deck = masterDeck.splice(0, 26)
    computer.deck = masterDeck.splice(0,26)
}

divyCards()

//these lines will add functionality to the deck elemtents
//make sure that the values that are being pushed are being stored correctly
//modify funcion to be able to compare the values of the cards

function gameTurn() {
    playerDeck.addEventListener('click', function () {
        playerDisplay.innerText = player.deck[0]
        computerDisplay.innerText = computer.deck[0]
        if(player.deck[0][0] > computer.deck[0][0]) {
            let itemWon = computer.deck.splice(0, 1)
            player.deck.push(itemWon)
        } //write logic for else if statement (if computer has higher index what to do..provide additional direction for Jack, Queen, King, Ace)
    })
}
  
gameTurn()
console.log(player.deck)
console.log(computer.deck)

//create turns - make sure to account for tie condition
