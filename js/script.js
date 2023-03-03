document.querySelector('.start-game-btn').addEventListener('click', () => {
    document.querySelector('.info-box').style.display = 'none'
    init()
})

function init() {
    buildGameContainer()
}

// <---------------------- Build game structure ---------------------->

function buildGameContainer() {
    buildTitle()
    const gameContainerEl = document.createElement('div')
    gameContainerEl.classList.add('game-container')
    document.body.appendChild(gameContainerEl)
    const gameBoardEl = document.createElement('div')
    gameBoardEl.classList.add('game-board')
    gameContainerEl.appendChild(gameBoardEl)
    for (let idx = 0; idx <= 6; idx++) buildGameColumns(idx)
    buildStatusScreen()
}

function buildTitle(elem) {
    const titleEl = document.createElement('img')
    titleEl.src = '../img/connect-four.png'
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
    const messageEl = document.createElement('div')
    messageEl.textContent = 'Player Blue Starts'
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