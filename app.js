const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl = document.querySelector('#time')
const board = document.querySelector('#board')
const newGame = document.querySelector('#new-game-btn')
const colors = ['#962D3E', '#348899']

let time = 0
let score = 0

startBtn.addEventListener('click', (event) => {
    event.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++
        event.target.remove()
        createRandomCircle()
    }
})

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('new-game-btn')) {
        console.log('newgame')
        screens[1].classList.remove('up')
        resetGame()
    }
})

let interval = 0
function startGame() {
    interval = setInterval(decreaseTime, 1000)
    setTime(time)
    board.innerHTML = ``
    timeEl.parentNode.classList.remove('hide')
    createRandomCircle()

}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function resetGame() {
    time = 0
    score = 0
}

function finishGame() {
    board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1> <button class="new-game-btn"> Новая игра </button>`
    timeEl.parentNode.classList.add('hide')
    clearInterval(interval)
}

function createRandomCircle() {
    if (score < 10) {
        addCircle(45, 60)
    } else if (score >= 10 && score <= 25) {
        addCircle(45, 25)
    } else if (score > 25) {
        addCircle(25, 10)
    }

}

function addCircle(z, h) {
    const circle = document.createElement('div')
    const size = getRandomNumber(z, h)
    const color = getRandomColor()
    circle.style.background = color
    circle.style.boxShadow = `${color} 0px 0px 1px, ${color} 0px 0px 1px`

    const { width, height } = board.getBoundingClientRect()
    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length)
    return colors[index]
}
