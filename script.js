document.addEventListener('DOMContentLoaded', () => {
	const grid = document.querySelector('.grid')
	let squares = Array.from(document.querySelectorAll('.grid div'))
	const ScoreDisplay = document.querySelector('#score')
	const StartBtn = document.querySelector('click')
	const width = 10
	let nextRandom = Math.ceil(10);

	const lTetro = [
		[1, width+1, width*2+1, 2],
		[width, width+1, width+2, width*2+2],
		[1, width+1, width*2+1, width*2],
		[width, width*2, width*2+1, width*2+2]
	]
	const sTetro = [
		[width*2, width*2+1, width+1, width+2],
		[0, width, width+1, width*2+1],
		[width*2, width*2+1, width+1, width+2],
		[0, width, width+1, width*2+1]
	]
	const tTetro = [
	[width, width+1, 1, width+2],
	[width+1, 1, width*2+1, width+2],
	[width, width+1, width*2+1, width+2],
	[width+1, 1, width*2+1, width]
	]
	const qTetro = [
	[0, 1, width, width+1],
	[0, 1, width, width+1],
	[0, 1, width, width+1],
	[0, 1, width, width+1]
	]
	const iTetro = [
	[1, width+1, width*2+1, width*3+1],
	[width, width+1, width+2, width+3],
	[1, width+1, width*2+1, width*3+1],
	[width, width+1, width+2, width+3]
	]
	const theTetrominoes = [lTetro, sTetro, tTetro, qTetro, iTetro]

	let currentPosition = 4
	let currentRotation = 0
	let random = Math.floor(Math.random()*theTetrominoes.length)
	let current = theTetrominoes[random][currentRotation]

	draw = () => {
		current.forEach((index) => {
			squares[currentPosition +index].classList.add('tetromino')
		})
	};

	draw();

	undraw = () => {
		current.forEach((index) => {
			squares[currentPosition +index].classList.remove('tetromino')
		})
	};
function left() {
	console.log("Received")
	undraw()
	const lEdge = current.some(index => (currentPosition + index) % width === 0)

if (!lEdge) {
	currentPosition -=1
}

if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
	currentPosition +=1
}
draw()
};


function right() {
	console.log("Received")
	undraw()
	const rEdge = current.some(index => (currentPosition + index) % width === width -1)

if (!rEdge) {
	currentPosition +=1
}

if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
	currentPosition -=1
}
draw()
};


	function control(e) {
	if (e.keyCode === 37) {
		left()
	}
	else if (e.keyCode === 38)
	{
		rotate()
	}
	else if (e.keyCode === 39) {
		right()
	}
	else if (e.keycode === 40) {
		 speed()
	}
}

function rotate() {
	console.log("spin")
	undraw()
	currentRotation ++
	if (currentRotation === current.length) {
		currentRotation = 0
	}
	current = theTetrominoes[random][currentRotation]
	draw()
}

document.addEventListener('keyup', control);


	function freeze() {
		if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
			current.forEach(index => squares[currentPosition + index].classList.add('taken'))
			random = nextRandom
			nextRandom = Math.floor(Math.random()*theTetrominoes.length)
			current = theTetrominoes[random][currentRotation]
			currentPosition = 4
			draw()
			displayShape()
		} 
	}

	moveDown = () => {
	undraw()
	currentPosition += width
	draw()
	freeze()
};


speed = () => {
	undraw()
	currentPosition = (width + currentPositon + 5)
	draw()
	freeze()
};


const displaySquares = document.querySelectorAll('.mini-grid div')
const displayWidth = 4
let displayIndex = 0

const upNextTetrominoes = [
	[1, displayWidth+1, displayWidth*2+1, 2],
	[displayWidth*2, displayWidth*2+1, displayWidth+1, displayWidth+2],
	[displayWidth, displayWidth+1, 1, displayWidth+2],
	[0, 1, displayWidth, displayWidth+1],
	[1, displayWidth+1, displayWidth*2+1, displayWidth*3+1],
]

function displayShape() {
	displaySquares.forEach(square => {
		square.classList.remove('tetromino')
	})
	upNextTetrominoes[nextRandom].forEach(index =>{
		displaySquares[displayIndex + index].classList.add('tetromino')
	})
}

timerId = setInterval(moveDown, 1000);

})