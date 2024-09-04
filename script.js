const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('statusMessage');
const restartButton = document.getElementById('restartButton');

let isCircleTurn;
let board = Array(9).fill('');

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function startGame() {
    isCircleTurn = false;
    board = Array(9).fill('');
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'circle');
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
    setStatusMessage();
}

function setStatusMessage() {
    statusMessage.textContent = `${isCircleTurn ? "O's" : "X's"} Turn`;
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = isCircleTurn ? 'circle' : 'x';
    const cellIndex = Array.from(cells).indexOf(cell);

    placeMark(cell, currentClass);
    board[cellIndex] = currentClass;

    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        setStatusMessage();
    }
}

function placeMark(cell, currentClass) {
    cell.textContent = isCircleTurn ? 'O' : 'X';
    cell.classList.add(currentClass);
}

function swapTurns() {
    isCircleTurn = !isCircleTurn;
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return board[index] === currentClass;
        });
    });
}

function isDraw() {
    return board.every(cell => cell === 'x' || cell === 'circle');
}

function endGame(draw) {
    if (draw) {
        statusMessage.textContent = "It's a Draw!";
    } else {
        statusMessage.textContent = `${isCircleTurn ? "O" : "X"} Wins!`;
    }
    cells.forEach(cell => cell.removeEventListener('click', handleClick));
}

restartButton.addEventListener('click', startGame);

startGame();
