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
// let computerDeck = document.querySelector('#computer-deck')
let computerDisplay = document.querySelector('#computer-display')
let resetButton = document.querySelector('button')
let cardTally = document.querySelectorAll('.card-count')
let warCHide = document.querySelector('#computer-hidden')
let warCDisp = document.querySelector('#computer-war-display')//could I make these lines better? Loop to assign values?
let warPHide = document.querySelector('#player-hidden')
let warPDisp = document.querySelector('#player-war-display')
const hTag = document.querySelector('h1')
//populating master deck variable

let beginDeck = []
let cardTypes = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'Jack', 'Queen', 'King', 'Ace']
let suits = ['♥️', '♦️', '♣️', '♠️']//either replace w/ images or add image URLs to suits  
let cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

let gameCondition = 'normal'

function initialDeck() {
    for(let i = 0; i < cardTypes.length; i++) {
        beginDeck.push([cardValues[i],cardTypes[i]])
    }
    return beginDeck
}

initialDeck()


//these lines created my master deck
function createDeck() {
    for(let i = 0; i < beginDeck.length; i++) {
        for(let j = 0; j < suits.length; j++) {
        masterDeck.push([beginDeck[i], suits[j]]) 
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

//add additional value to the inner array at index 2

//these lines will distributes 26 cards to each player
function divyCards () {
    player.deck = masterDeck.splice(0, 26)
    computer.deck = masterDeck.splice(0,26)
}

divyCards()

//this is where gameplay happens
function gameTurn() {
    playerDeck.addEventListener('click', function () {
        playerDisplay.innerText = player.deck[0][0][1] + " " + player.deck[0][1]
        computerDisplay.innerText = computer.deck[0][0][1] + " " + computer.deck[0][1]
        gameCondition = 'normal'
        if(player.deck[0][0][0] > computer.deck[0][0][0]) {
            let itemWon = computer.deck.splice(0, 1)
            player.deck.push(itemWon[0])//splice returns an array, so you need to reference the 0 index of the array
            let sendEnd = player.deck.splice(0, 1)
            player.deck.push(sendEnd[0])
        } else if(computer.deck [0][0][0] === player.deck[0][0][0]) {
            initiateWar()
            setTimeout(clearWar, 2000)
            console.log('tie')
            if(computer.deck[2][0][0] > player.deck[2][0][0]) {
                console.log('computer won hand')
                
                let warWin = player.deck.splice(0, 3)
                for(let i = 0; i < warWin.length; i++) {
                    computer.deck.push(warWin[i])
                }
                let sendEnd = computer.deck.splice(0, 3)
                for (let j = 0; j < sendEnd.length; j++) {
                    computer.deck.push(sendEnd[j])
                }
            } else if (computer.deck[2][0][0] === player.deck[2][0][0]) {
                initiateWar()
                setTimeout(clearWar, 2000)
                if(computer.deck[4][0][0] > player.deck[4][0][0]) {
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
        } else {
            let itemWon = player.deck.splice(0, 1)
            computer.deck.push(itemWon[0])
            let sendEnd = computer.deck.splice(0, 1)
            computer.deck.push(sendEnd[0])
        }
        player.cardCount = player.deck.length
        computer.cardCount = computer.deck.length
        setTimeout(updateScore, 1000)
        // cardTally[0].innerText = `Card Count: ${computer.cardCount}`
        // cardTally[1].innerText = `Card Count: ${player.cardCount}`
        console.log(`Computer: ${computer.cardCount}`)  
        console.log(`Player: ${player.cardCount}`)
        checkWin()
        console.log(gameCondition)
        setTimeout(clearBoard, 5000)
    })
}
  
gameTurn()


function initiateWar() {
    if(player.cardCount < 3) {
        hTag.innerText = 'Sorry, you don\'t have enough cards to continue, you lose.'
    } else if(computer.cardCount < 3) {
        hTag.innerText = 'The computer does not have enough cards to continue, you win!!'
    } else {
        gameCondition = 'war'
        warCHide.style.backgroundColor = 'lightsteelblue'
        warCDisp.innerText = computer.deck[2][0][1] + " " + computer.deck[2][1]
        warPHide.style.backgroundColor = 'lightsteelblue'
        warPDisp.innerText = player.deck[2][0][1] + " " + player.deck[2][1]
    }
    
}

function clearWar() {
        gameCondition = 'normal'
        warCHide.style.backgroundColor = 'darkgreen'
        warPHide.style.backgroundColor = 'darkgreen'
        warCDisp.innerText = ""
        warPDisp.innerText = ""
}

function updateScore() {
    cardTally[0].innerText = `Card count: ${computer.cardCount}`
    cardTally[1].innerText = `Card count: ${player.cardCount}`
}

function checkWin() {
    if (player.cardCount === 24) {
        gameCondition = 'over'
        hTag.innerText = 'Sorry, you lose!!'
        // document.addEventListener('click', function () {
        //    location.reload() 
        // })
    } else if (computer.cardCount === 0) {
        gameCondition = 'over'
        hTag.innerText = 'You win!!'
        // document.addEventListener('click', function() {
        //     location.reload()
        // })
    // } else if(gameCondition ==='war' && player.cardCount < 3) {
    //     gameCondition = 'over'
    //     hTag.innerText = 'Sorry, you don\'t have enough cards to continue, you lose.'
    //     // alert('Sorry, you don\'t have enough cards to continue, you lose!')
    // } else if(gameCondition === 'war' && computer.cardCount < 3) {
    //     gameCondition = 'over'
    //     hTag.innerText = 'The computer does not have enough cards to continue, you win!!'
    //     // alert('The computer does not have enough cards to continue, you win!!'
    //     // )
    // } 
    
}
}

function clearBoard() {
    if(gameCondition === 'over') {
        location.reload()
    }
}