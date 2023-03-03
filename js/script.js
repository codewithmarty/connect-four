/* ---------------------- Imports ----------------------> */

import { winConditions } from './conditions.js'

/*----- app's state (variables) -----*/

let board = [
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
    ["","","","","","",""],
]

let player = "Blue"
let row, col
let winner = false
let count = 0
let messageEl

/* ---------------------- Build UI ---------------------- */

document.querySelector('.start-game-btn').addEventListener('click', () => {
    document.querySelector('.info-box').style.display = 'none'
    init()
})

function init() {
    buildGameContainer()
    const cells = document.getElementsByClassName('cell');
    Array.from(cells).forEach(cell => cell.addEventListener("click", handleClick));
}

function buildGameContainer() {
    buildTitle()
    const gameContainerEl = document.createElement('div')
    gameContainerEl.classList.add('game-container')
    document.body.appendChild(gameContainerEl)
    buildStatusScreen()
    const gameBoardEl = document.createElement('div')
    gameBoardEl.classList.add('game-board')
    gameContainerEl.appendChild(gameBoardEl)
    for (let idx = 0; idx <= 6; idx++) buildGameColumns(idx)
    createResetBtn(gameContainerEl)
}

function buildTitle(elem) {
    const titleEl = document.createElement('img')
    titleEl.src = 'img/connect-four.png'
    titleEl.classList.add('title')
    document.body.appendChild(titleEl)
}

function buildGameColumns(idx) {
    const gameColumnEl = document.createElement('div')
    gameColumnEl.id = `${idx}`
    gameColumnEl.classList.add('game-column')
    document.querySelector('.game-board').appendChild(gameColumnEl)
    buildGameCells(idx)
}

function buildGameCells(idx) {
    for (let cellNum = 0; cellNum <= 5; cellNum++) {
        const gameCellEl = document.createElement('div')
        gameCellEl.id = `${cellNum}${idx}`
        gameCellEl.classList.add('cell')
        document.getElementById(`${idx}`).appendChild(gameCellEl)
    }
}

function buildStatusScreen() {
    const gameStatusEl = document.createElement('div')
    gameStatusEl.classList.add('game-status')
    buildMessage(gameStatusEl)
    createStatusChip(gameStatusEl)
    document.querySelector('.game-container').appendChild(gameStatusEl)
}

function buildMessage(elem) {
    messageEl = document.createElement('div')
    messageEl.textContent = 'Current Player'
    messageEl.classList.add('message')
    elem.appendChild(messageEl)
}

function createStatusChip(elem) {
    const chipEl = document.createElement('div')
    chipEl.classList.add('chip')
    chipEl.style.borderRadius = '50%'
    chipEl.style.width = '50px'
    chipEl.style.height = '50px'
    chipEl.style.backgroundColor = 'blue'
    elem.appendChild(chipEl)
}

function createResetBtn(elem) {
    const resetBtn = document.createElement('button')
    resetBtn.classList.add('reset-btn')
    resetBtn.textContent = 'Reset Game'
    resetBtn.addEventListener('click', handleReset)
    elem.appendChild(resetBtn)
}

/*----- functions -----*/

function handleClick(evt) {
    if (!winner) {
        col = evt.target.id[1];
        if (!colFull(col)) {
            fillBoard(col, board);
            render()
            checkWin()
            player = player == "Blue" ? "Yellow" : "Blue";
            if (winner) {
                messageEl.innerText = `${winner} wins!`
            } else {
                messageEl.innerText = `${player}'s turn!`
                document.querySelector('.chip').style.backgroundColor = player.toLowerCase()
            }
        } else messageEl.innerText = `Player ${player}. Column ${parseInt(col) + 1} is full!`
    }
}

function fillBoard(col, board) {
    for (let i = 5; i > -1; i--) {
        if (!board[i][col]) {
            row = i
            board[row][col] = player;
            return;
        }
    }
}

function render() {
    let id = row+col
    if (player == "Blue") document.getElementById(id).style.backgroundColor = "blue"
    else document.getElementById(id).style.backgroundColor = "yellow"
}

function checkWin() { 
    winConditions.forEach(cond => {
        analyzeBoard("Blue", parseInt(cond.startingIndex[0]), parseInt(cond.startingIndex[1]), cond.rowInc, cond.colInc)
        analyzeBoard("Yellow", parseInt(cond.startingIndex[0]), parseInt(cond.startingIndex[1]), cond.rowInc, cond.colInc)
    })
}

function analyzeBoard(incomingPlayer, startingRow, startingCol, rowInc, colInc) {
    let [rowNum, colNum] = [startingRow, startingCol];
    let [nextRow, nextCol] = [rowNum + rowInc, colNum + colInc];
    while (rowNum >= 0 && colNum >=0 && nextRow <= 5 && nextCol <= 6) {
        if (board[rowNum][colNum] == board[rowNum + rowInc][colNum + colInc] && board[rowNum][colNum] == incomingPlayer) {
            count++;
        }
        [rowNum, colNum] = [rowNum + rowInc, colNum + colInc];
        [nextRow, nextCol] = [rowNum + rowInc, colNum + colInc];
    }
    if (count == 3) {
        winner = incomingPlayer
    }
    count = 0;
}

function colFull(col) {
    for (let i = 0; i < 6; i++) {
        if (!board[i][col]) return false; 
    }
    return true;
}

function handleReset() {
    board = [
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
        ["","","","","","",""],
    ]
    
    player = "Blue"
    row = null
    col = null
    winner = false
    count = 0
    Array.from(document.getElementsByClassName('cell')).forEach(cell => cell.style.backgroundColor = '#333')
    messageEl.textContent = 'Current Player'
    document.querySelector('.chip').style.backgroundColor = 'blue'
}