const cells = document.querySelectorAll('.cell');
const statusMessage = document.getElementById('status-message');
const resultScreen = document.getElementById('result-screen');
const resultText = document.getElementById('result-text');
const newGameBtn = document.getElementById('new-game-btn');
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
        [0, 4, 8], [2, 4, 6]               // diagonals
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            gameActive = false;
            return gameBoard[a];
        }
    }

    if (!gameBoard.includes('')) {
        gameActive = false;
        return 'Draw';
    }

    return null;
}

function handleClick(event) {
    const cellIndex = event.target.dataset.cell;

    if (gameBoard[cellIndex] || !gameActive) {
        return;
    }

    gameBoard[cellIndex] = currentPlayer;
    event.target.textContent = currentPlayer;

    const winner = checkWinner();
    if (winner) {
        if (winner === 'Draw') {
            resultText.textContent = "It's a Draw!";
        } else {
            resultText.textContent = `Player ${winner} Wins!`;
        }
        resultScreen.style.display = 'flex'; // Show result screen
    } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
}

function restartGame() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusMessage.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach(cell => {
        cell.textContent = '';
    });

    resultScreen.style.display = 'none'; // Hide result screen
}

cells.forEach(cell => {
    cell.addEventListener('click', handleClick);
});

newGameBtn.addEventListener('click', restartGame);

