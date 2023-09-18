const GameBoard = (() => {
    let board = ["", "", "", "", "", "", "", "", ""];

    const getBoard = () => board;

    const render = () => {
        const boardContainer = document.getElementById('game-board');
        boardContainer.innerHTML = '';
        board.forEach((mark, index) => {
            const cell = document.createElement('div');
            cell.textContent = mark;
            cell.addEventListener('click', () => game.makeMove(index));
            boardContainer.appendChild(cell);
        });
    };

    const checkWin = () => {
        const winPatterns = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        for (let pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        return board.includes('') ? null : 'T';
    };

    return {
        render,
        getBoard,
        checkWin
    };
})();

const Player = (name, mark, isComputer = false) => {
    const getMark = () => mark;
    const getName = () => name;
    const getIsComputer = () => isComputer;

    return { getMark, getName, getIsComputer };
};

const game = (() => {
    let player1 = Player("Player 1", "X");
    let player2 = Player("Computer", "O", true);
    let currentPlayer = player1;

    const start = () => {
        GameBoard.render();
    };

    const makeMove = (index) => {
        let board = GameBoard.getBoard();
        if (board[index] === "") {
            board[index] = currentPlayer.getMark();
            GameBoard.render();
            checkGameOver();
            togglePlayer();
        }
    };

    const checkGameOver = () => {
        let result = GameBoard.checkWin();
        if (result) {
            // Here add code to display the result (win or tie)
        }
    };

    const togglePlayer = () => {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        if (currentPlayer.getIsComputer()) {
            makeComputerMove();
        }
    };

    const makeComputerMove = () => {
        let board = GameBoard.getBoard();
        let availableSpots = board.reduce((acc, mark, index) => mark === "" ? [...acc, index] : acc, []);
        if (availableSpots.length) {
            let randomSpot = availableSpots[Math.floor(Math.random() * availableSpots.length)];
            makeMove(randomSpot);
        }
    };

    return {
        start,
        makeMove,
    };
})();

game.start();
