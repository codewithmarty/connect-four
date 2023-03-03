document.querySelector('.start-game-btn').addEventListener('click', () => {
    document.querySelector('.info-box').style.display = 'none'
    init()
})

function init() {
    buildGameContainer()
}

// <---------------------- Build game structure ---------------------->

function buildGameContainer() {
    const gameContainerEl = document.createElement('div')
    gameContainerEl.classList.add('game-container')
    document.body.appendChild(gameContainerEl)
    for (let idx = 0; idx <= 6; idx++) buildGameColumns(idx)
}

function buildGameColumns(idx) {
    const gameColumnEl = document.createElement('div')
    gameColumnEl.id = `${idx}`
    gameColumnEl.classList.add('game-column')
    document.querySelector('.game-container').appendChild(gameColumnEl)
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


