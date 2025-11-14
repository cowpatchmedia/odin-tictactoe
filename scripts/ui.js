/* DOM Element References */
const boardEl = document.getElementById("board");
const messageEl = document.getElementById("message");

/* select player score spans */
const player1ScoreEl = document.getElementById("player1-score");
const player2ScoreEl = document.getElementById("player2-score");

/* get player divs*/
const player1El = document.getElementById("player1");
const player2El = document.getElementById("player2");

/* Geet name spans*/
const player1NameEl = document.getElementById("player1-name");
const player2NameEl = document.getElementById("player2-name");

/* get reset button */
const resetBtn = document.getElementById("reset");

/* create board on screen using buttons and divs. */
function createBoard() {
    while (boardEl.firstChild) {
        boardEl.removeChild(boardEl.firstChild);
    }

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
    player1ScoreEl.textContent = player1.getScore();
    player2ScoreEl.textContent = player2.getScore();
}

function updateNamesDOM() {
    player1NameEl.textContent = player1.getName();
    player2NameEl.textContent = player2.getName();
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

    cells.forEach((cell) => {
        cell.addEventListener("click", (e) => {
            /* prevent double clicks and game over click. */
            if (cell.textContent !== "" || game.isOver()) return;
            
            /* record clicked cell to dataset index. */
            const index = Number(e.currentTarget.dataset.index);

            /* play round */
            game.playRound(index);

            updateBoardDOM();
            updateScoreDOM();
            updateMessageDOM(game.getMessage());
            updateActivePlayerDOM(game.getCurrentPlayer());

            if (game.isOver()) {
                setTimeout(() => {
                    game.resetGame();
                    updateBoardDOM();
                    updateMessageDOM(game.getMessage());
                    updateActivePlayerDOM(game.getCurrentPlayer());
                }, 1000); // Wait 1 second (2000ms) before resetting
            }
        });
    });
};

/* logic for handling name change*/
function handleNameEdit(player, nameEl) {
    /* create input element */
    const input = document.createElement("input");
    input.type = "text";
    input.value = player.getName();
    input.className = "name-input";

    /* replace default with element */
    nameEl.parentNode.replaceChild(input, nameEl);
    input.focus();

    /* function to save the name */
    const saveName = () => {
        const newName = input.value.trim();
        if (newName) {
            player.setName(newName);
        }
        nameEl.textContent = player.getName();
        input.parentNode.replaceChild(nameEl, input);
    };
    /* save when click away - blur or enter */
    input.addEventListener("blur", saveName)
    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            saveName();
        }
    });
}

/* attach listeners to name span */
function attachNameListeners() {
    player1NameEl.addEventListener("click", () => 
        handleNameEdit(player1, player1NameEl)
    );
    player2NameEl.addEventListener("click", () =>
        handleNameEdit(player2, player2NameEl)
    );
}

/* Main game set up*/

const game=GameController(player1, player2);

/* run create board function*/
createBoard();
attachCellListeners(game);
attachNameListeners();

resetBtn.addEventListener("click", () => {
    game.resetGame();
    updateBoardDOM();
    updateMessageDOM(game.getMessage());
    updateActivePlayerDOM(game.getCurrentPlayer());
    /* don't update score so it persists */
});

/* initial ui set up*/
updateNamesDOM();
updateScoreDOM();
updateMessageDOM(game.getMessage());
updateActivePlayerDOM(game.getCurrentPlayer());