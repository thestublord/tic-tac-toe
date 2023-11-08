const GameBoard = (() => {
  let board = ["", "", "", "", "", "", "", "", ""];

  // Resets the game board to its initial state
  const reset = () => {
    board = ["", "", "", "", "", "", "", "", ""];
    render(); // Re-render the board after reset
  };

  const getBoard = () => board;

  const render = () => {
    const boardContainer = document.getElementById("game-board");
    boardContainer.innerHTML = "";
    board.forEach((mark, index) => {
      const cell = document.createElement("div");
      cell.textContent = mark;
      cell.addEventListener("click", () => game.makeMove(index));
      boardContainer.appendChild(cell);
    });
  };

  // ... (checkWin method remains unchanged)

  return {
    render,
    getBoard,
    checkWin,
    reset, // Expose the reset method
  };
})();

// ... (Player module remains unchanged)

const game = (() => {
  let player1 = Player("Player 1", "X");
  let player2 = Player("Computer", "O", true);
  let currentPlayer = player1;

  // ... (other methods remain unchanged)

  const start = () => {
    GameBoard.render();
    currentPlayer = player1; // Reset the current player to player1
  };

  return {
    start,
    makeMove,
  };
})();

// We add a function to handle the restart button click event
const restartGame = () => {
  GameBoard.reset(); // Reset the game board
  game.start(); // Restart the game
};

// Attach the restart game function to the restart button
document
  .getElementById("restart-button")
  .addEventListener("click", restartGame);

game.start();
