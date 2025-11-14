/* reference to board html element so that I can add cells by JS. */
const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");
const player1ScoreEl = document.getElementById("player1-score");
const player2ScoreEl = document.getElementById("player2-score");
const player1El = document.getElementById("player1");
const player2El = document.getElementById("player2");
const resetBtn = document.getElementById("reset");

/* create board on screen using buttons and divs. */
function createBoard() {
    boardEl.innerHTML="";

    for (let i=0; i<9; i++) {
        /* creates button to click on for grid*/
        const cell = document.createElement("button");
        cell.className="cell";
        /* store index so the cell clicked can be stored as variable.*/
        cell.dataset.index=i;
        /* set as empty when game starts.*/
        cell.textContent="";
        boardEl.appendChild(cell);
    };
};

/* resets board DOM */
function updateBoardDOM() {
    const cells = document.querySelectorAll(".cell");
    const boardState = GameBoard.getBoard();
    cells.forEach((c, i) => {
        c.textContent = boardState[i];
    });
}

function updateScoreDOM() {
    player1El.textContent = player1.getScore();
    player2El.textContent = player2.getScore();
}

function updateMessageDOM(msg) {
    messageEl.textContent = msg;
}

/* Highlights the current player */
function updateActivePlayerDOM(player) {
    if (player.getMarker() === "X") {
        player1El.classList.add("active");
        player2El.classList.remove("active");
    } else {
        player1El.classList.remove("active");
        player2El.classList.add("active");
    }
}

function attachCellListeners(game) {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            /* record clicked cell to dataset index. */
            const index = Number(e.currentTarget.dataset.index);

            /* play round */
            game.playRound(index);

            updateBoardDOM();
            updateScoreDOM();
            updateMessageDOM(game.getMessage());
            updateActivePlayerDOM(game.getCurrentPlayer());
        });
    });
};

/* Main game set up*/

const game=GameController(player1, player2);

/* run create board function*/
createBoard();
attachCellListeners(game);

resetBtn.addEventListener("click", () => {
    game.resetGame();
    updateBoardDOM();
    updateMessageDOM(game.getMessage());
    updateActivePlayerDOM(game.getCurrentPlayer());
    /* don't update score so it persists */
});

/* initial ui set up*/
updateMessageDOM(game.getMessage());
updateActivePlayerDOM(game.getCurrentPlayer());