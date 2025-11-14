/* reference to board html element so that I can add cells by JS. */
const boardEl = document.getElementById("board");

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

function attachCellListeners(game) {
    const cells = document.querySelectorAll(".cell");

    cells.forEach(cell => {
        cell.addEventListener("click", (e) => {
            /* record clicked cell to dataset index. */
            const index = Number(e.currentTarget.dataset.index);

            /* play round */
            game.playRound(index);

            /* update board buttons to match internal board*/
            const boardState=GameBoard.getBoard();

            cells.forEach((c, i) => {
                c.textContent = boardState[i];
            });
        });
    });
};

/* resets board DOM */
function updateBoardDOM() {
    const cells = document.querySelectorAll(".cell");
    const boardState = GameBoard.getBoard();
    cells.forEach((c, i) => {
        c.textContent = boardState[i];
    });
}

const game=GameController();

/* run create board function*/
createBoard();
attachCellListeners(game);
