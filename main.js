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
    cardCount: 26
}

//populating master deck variable
let cardTypes = ['Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King']

let suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']

function createDeck(cardTypes, suits) {
    for(let i = 0; i < cardTypes.length; i++) {
        for(let j = 0; j < suits.length; j++) {
            masterDeck.push([cardTypes[i], suits[j]]) 
        } 
    }
    return masterDeck
}

createDeck(cardTypes, suits)

//this shuffles my master deck
function deckShuffle(deck) {
    deck.sort(() => Math.random() - 0.5)
}

deckShuffle(masterDeck)

//these lines will populate my gameboard
//function gameSetup()
console.log(player.deck)

//create turns
