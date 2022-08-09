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
let playerDeck = document.querySelector('#player-deck')//chain style to end of this element .style
let playerDisplay = document.querySelector('#player-display')
let computerDeck = document.querySelector('#computer-deck')
let computerDisplay = document.querySelector('#computer-display')
let resetButton = document.querySelector('button')
let cardTally = document.querySelectorAll('.card-count')
let warCHide = document.querySelector('#computer-hidden')
let warCDisp = document.querySelector('#computer-war-display')//could I make these lines better? Loop to assign values?
let warPHide = document.querySelector('#player-hidden')
let warPDisp = document.querySelector('#player-war-display')


//populating master deck variable

let cardTypes = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
let suits = ['♥️', '♦️', '♣️', '♠️']//either replace w/ images or add image URLs to suits  

//adust this to display the back of a deck
// let cardImages = document.createElement('img')
// cardImages.setAttribute('src', 'https://i.imgur.com/ZLbEUDp.png?1')
// cardImages.setAttribute('data-id', 14)
// playerDeck.appendChild(cardImages)


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

//this activates my reset button
resetButton.addEventListener('click', function () {
    location.reload()
})


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
//modify funcion to be able to compare the values of the cards
function checkValues (array) {
    if(array === 'Ace') {
        array = 14
    } else if (array === 'King') {
        array = 13
    } else if (array === 'Queen') {
        array = 12
    } else if (array === 'Jack') {
        array = 11
    }
}

function gameTurn() {
    playerDeck.addEventListener('click', function () {
        playerDisplay.innerText = player.deck[0]
        computerDisplay.innerText = computer.deck[0]
        let gameCondition = 'normal'
        checkValues(player.deck[0][0])
        checkValues(computer.deck[0][0])
        if(player.deck[0][0] > computer.deck[0][0]) {
            let itemWon = computer.deck.splice(0, 1)
            player.deck.push(itemWon[0])//splice returns an array, so you need to reference the 0 index of the array
            let sendEnd = player.deck.splice(0, 1)
            player.deck.push(sendEnd[0])
        } else if(computer.deck [0][0] === player.deck[0][0]) {
            gameCondition = 'War'
            console.log('tie')
                warCHide.innerText = computer.deck[1]
                warCDisp.innerText = computer.deck[2]
                warPHide.innerText = player.deck[1]
                warPDisp.innerText = player.deck[2]
                checkValues(player.deck[2][0])
                checkValues(computer.deck[2][0])    
            if(computer.deck[2][0] > player.deck[2][0]) {
                console.log('computer won hand')
                let warWin = player.deck.splice(0, 3)
                for(let i = 0; i < warWin.length; i++) {
                    computer.deck.push(warWin[i])
                }
                let sendEnd = computer.deck.splice(0, 3)
                for (let j = 0; j < sendEnd.length; j++) {
                    computer.deck.push(sendEnd[j])
                }
            } else if (computer.deck[2][0] === player.deck[2][0]) {
                if(computer.deck[4][0] > player.deck[4][0]) {
                    console.log('computer won hand')
                    let warWin = player.deck.splice(0,5)
                    for(let i = 0; i < warWin.length; i++) {
                        computer.deck.push(warWin[i])
                    }
                    let sendEnd = computer.deck.splice(0,5)
                    for(let j = 0; j < sendEnd.length; j++) {
                        computer.deck.push(sendEnd[j])
                    }
                } else {
                    console.log('player won hand')
                    let warWin = computer.deck.splice(0,5)
                    for(let i = 0; i < warWin.length; i++) {
                        player.deck.push(warWin[i])
                    }
                    let sendEnd = computer.deck.splice(0,5)
                    for(let j = 0; j < sendEnd.length; j++) {
                        player.deck.push(warWin[j])
                    }
                }
            } else {
                console.log('player won hand')
                let warWin = computer.deck.splice(0, 3)
                for(let i = 0; i < warWin.length; i++) {
                    player.deck.push(warWin[i])
                }
                let sendEnd = player.deck.splice(0, 3)
                for (let j = 0; j < sendEnd.length; j++) {
                    player.deck.push(sendEnd[j])
                }//build in additional logic for 2 or more ties
            }
            //these lines are overriding tie cards from showing up
            // playerDeck.addEventListener('click', function () {
            // warCHide.innerText = ""
            // warCDisp.innerText = ""
            // warPHide.innerText = ""
            // warPDisp.innerText = ""
            // })
        } else {
            let itemWon = player.deck.splice(0, 1)
            computer.deck.push(itemWon[0])
            let sendEnd = computer.deck.splice(0, 1)
            computer.deck.push(sendEnd[0])
        }
        player.cardCount = player.deck.length
        computer.cardCount = computer.deck.length
        cardTally[0].innerText = `Card Count: ${computer.cardCount}`
        cardTally[1].innerText = `Card Count: ${player.cardCount}`
        console.log(`Computer: ${computer.cardCount}`)  
        console.log(`Player: ${player.cardCount}`)
        console.log(gameCondition)
        console.log(player.deck[0])
        console.log(computer.deck[0])
        if (player.cardCount === 0) {
            alert('Sorry, you lose!') 
            document.addEventListener('click', function () {
               location.reload() 
            })
        } else if (computer.cardCount === 0) {
            alert('You win!!')
            document.addEventListener('click', function() {
                location.reload()
            })
        } else if(gameCondition ==='war' && player.cardCount < 3) {
            alert('Sorry, you don\'t have enough cards to continue, you lose!')
        } else if(gameCondition === 'war' && computer.cardCount < 3) {
            alert('The computer does not have enough cards to continue, you win!!'
            )
        } 
    })
}
  
gameTurn()

//add functionality to reset button
//change alerts to appending the gameboard
//build in war logic (tie)
//build in functionality to automatically reset after game is over
//add images
