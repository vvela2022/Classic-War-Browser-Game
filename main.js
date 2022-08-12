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


let playerDeck = document.querySelector('#player-deck')
let playerDisplay = document.querySelector('#player-display')
let computerDisplay = document.querySelector('#computer-display')
let resetButton = document.querySelector('button')
let cardTally = document.querySelectorAll('.card-count')
let warCHide = document.querySelector('#computer-hidden')
let warCDisp = document.querySelector('#computer-war-display')
let warPHide = document.querySelector('#player-hidden')
let warPDisp = document.querySelector('#player-war-display')
const hTag = document.querySelector('h1')
const useAlert = document.querySelector('#user-alert')
let playDesign = document.querySelector('#player-design')
let compDesign = document.querySelector('#comp-design')



let beginDeck = []
let cardTypes = [2, 3, 4, 5, 6, 7, 8, 9, 10, 'J', 'Q', 'K', 'A']
let suits = ['♥️', '♦️', '♣️', '♠️']
let cardValues = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13]

let gameCondition = 'normal'

function initialDeck() {
    for(let i = 0; i < cardTypes.length; i++) {
        beginDeck.push([cardValues[i],cardTypes[i]])
    }
    return beginDeck
}

initialDeck()



function createDeck() {
    for(let i = 0; i < beginDeck.length; i++) {
        for(let j = 0; j < suits.length; j++) {
        masterDeck.push([beginDeck[i], suits[j]]) 
        }
    } 
    return masterDeck
}

createDeck()


resetButton.addEventListener('click', function () {
    location.reload()
})



function deckShuffle(deck) {
    deck.sort(() => Math.random() - 0.5)
}

deckShuffle(masterDeck)

function divyCards () {
    player.deck = masterDeck.splice(0, 5)
    computer.deck = masterDeck.splice(0, 5)
}

divyCards()



function gameTurn() {
    playerDeck.addEventListener('click', function () {
        playerDisplay.style.backgroundColor = 'black'
        computerDisplay.style.backgroundColor = 'black'
        playerDisplay.innerText = player.deck[0][0][1] + " " + player.deck[0][1]
        computerDisplay.innerText = computer.deck[0][0][1] + " " + computer.deck[0][1]
        gameCondition = 'normal'
        if(player.deck[0][0][0] > computer.deck[0][0][0]) {
            playerAlert()
            setTimeout(clearAlert, 2000)
            let itemWon = computer.deck.splice(0, 1)
            player.deck.push(itemWon[0])
            let sendEnd = player.deck.splice(0, 1)
            player.deck.push(sendEnd[0])
        } else if(computer.deck [0][0][0] === player.deck[0][0][0]) {
            initiateWar()
            playerAlert()
            setTimeout(clearAlert, 2500)
            setTimeout(clearWar, 3000)
            console.log('tie')
            if(computer.deck[2][0][0] > player.deck[2][0][0]) {
                computerAlert()
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
                playerAlert()
                setTimeout(clearAlert, 2500)
                setTimeout(clearWar, 3000)
                if(computer.deck[4][0][0] > player.deck[4][0][0]) {
                    let warWin = player.deck.splice(0,5)
                    for(let i = 0; i < warWin.length; i++) {
                        computer.deck.push(warWin[i])
                    }
                    let sendEnd = computer.deck.splice(0,5)
                    for(let j = 0; j < sendEnd.length; j++) {
                        computer.deck.push(sendEnd[j])
                    }
                } else {
                    playerAlert()
                    setTimeout(clearAlert, 2000)
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
                playerAlert()
                setTimeout(clearAlert, 2000)
                let warWin = computer.deck.splice(0, 3)
                for(let i = 0; i < warWin.length; i++) {
                    player.deck.push(warWin[i])
                }
                let sendEnd = player.deck.splice(0, 3)
                for (let j = 0; j < sendEnd.length; j++) {
                    player.deck.push(sendEnd[j])
                }
            }
        } else {
            computerAlert()
            setTimeout(clearAlert, 2000)
            let itemWon = player.deck.splice(0, 1)
            computer.deck.push(itemWon[0])
            let sendEnd = computer.deck.splice(0, 1)
            computer.deck.push(sendEnd[0])
        }
        player.cardCount = player.deck.length
        computer.cardCount = computer.deck.length
        setTimeout(updateScore, 500)
        setTimeout(checkWin, 6000)
        setTimeout(clearBoard, 12000)
    })
}
  
gameTurn()


function initiateWar() {
    if(player.cardCount < 3) {
        hTag.innerText = 'Sorry, you don\'t have enough cards to continue, you lose.'
        gameCondition = 'over'
    } else if(computer.cardCount < 3) {
        hTag.innerText = 'The computer does not have enough cards to continue, you win!!'
        gameCondition = 'over'
    } else {
        gameCondition = 'war'
        warCHide.style.backgroundColor = 'black'//♥️ ♦️ ♣️ ♠️
        warPHide.style.backgroundColor = 'black'
        warCDisp.style.backgroundColor = 'black'
        warPDisp.style.backgroundColor = 'black'
        playDesign.innerText = '♥️ ♦️ ♣️ ♠️'
        compDesign.innerText = '♥️ ♦️ ♣️ ♠️'
        warCDisp.innerText = computer.deck[2][0][1] + " " + computer.deck[2][1]
        warPDisp.innerText = player.deck[2][0][1] + " " + player.deck[2][1]
    }
    
}

function clearWar() {
        gameCondition = 'normal'
        warCHide.style.backgroundColor = ''
        warPHide.style.backgroundColor = ''
        warCDisp.style.backgroundColor = ''
        warPDisp.style.backgroundColor = ''
        playDesign.innerText = 'War Zone'
        compDesign.innerText = 'War Zone'
        warCDisp.innerText = ""
        warPDisp.innerText = ""
}

function playerAlert() {
    if(gameCondition === 'normal') {
        useAlert.innerText = 'Player wins hand!'
    } else if (gameCondition === 'war') {
        useAlert.innerText = 'War!'
    } else {
        useAlert.innerText = ""
    }
}   

function computerAlert() {
    if(gameCondition === 'normal') {
        useAlert.innerText = 'Computer wins hand.'
    } else if (gameCondition === 'war') {
        useAlert.innerText = 'War!'
    } else {
        useAlert.innerText = ""
    }
}

function clearAlert () {
    useAlert.innerText = ""
}

function updateScore() {
    if (gameCondition === 'normal' || 'war') {
        cardTally[0].innerText = `Card count: ${computer.cardCount}`
        cardTally[1].innerText = `Card count: ${player.cardCount}`
        }
    }

function checkWin() {
    if (player.cardCount === 0) {
        gameCondition = 'over'
        useAlert.innerText = 'Sorry, you lose!!'
    } else if (computer.cardCount === 0) {
        gameCondition = 'over'
        useAlert.innerText = 'You win!!'
    
}
}

function clearBoard() {
    if(gameCondition === 'over') {
        location.reload()
    }
}