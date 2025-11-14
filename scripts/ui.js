/* reference to board html element so that I can add cells by JS. */
const boardEl = document.getElementById("board");

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

        cell.addEventListener("click", (e) => {
            /* record clicked cell to dataset index. */
            const index = Number(e.currentTarget.dataset.index);
            console.log(`Cell ${index} clicked`);
        });
    };
};

/* run create board function*/
createBoard();
