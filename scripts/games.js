/* IIFE */
const GameBoard = (() => {

    /* set private board state 3x3 array that is blank at start*/
    const board = ["","","","","","","","",""]

    /* allows  other functions to access the board*/
    const getBoard = () => board

    /* prints a nice console view for the human user*/
    const printBoard = () => {
        console.log(`
            ${board[0] || "-"} | ${board[1] || "-"} | ${board[2] || "-"}
            ${board[3] || "-"} | ${board[4] || "-"} | ${board[5] || "-"}
            ${board[6] || "-"} | ${board[7] || "-"} | ${board[8] || "-"}
            `);
    };

    /* place moves. player is a seperate function to control the game flow of who's turn it is.*/
    const placeMove = (index,player) => {
        if (board[index] === "") {
            board[index] = player;
            return true;
        }
        return false;
    };

    /* reset board by iterating over it*/
    const reset = () => {
        for (let i = 0; i < board.length; i++) board[i] = "";
    };

    /* return the functions from the IIFE*/
    return {getBoard, printBoard, placeMove, reset};

})();

/* create player factory function which only gives player names and markers (x or o)*/
const Player = (name, marker) => {
    /* declare a private variable for score so players cannot edit. */
    let score = 0;
    const addPoint = () => score++;
    const getScore = () => score;

    /* I don't think its strictly necessary to make marker and name private but I'm doing it to standardize how I treat variables.*/
    const getName = () => name;
    const getMarker = () => marker;
    
    return {getName, getMarker, addPoint, getScore};
};

/* create players outside the controller so the ui can access for score display*/
const player1 = Player("Click Me", "X");
const player2 = Player("Click Me Also", "O")

/* another factory function to this one for the game controller which will be the glue that ties my player and gameBoard together. */ 
/* the game flow is as follows: place move, print board, check win, check draw. */
const GameController = (p1, p2) => {

    /* set up players inside function*/
    let currentPlayer = p1;

    /* sets game over to be false when program is loaded*/
    let gameOver = false;

    /* ternary operator. If the current player is player 1, then switch to player 2, otherwise switch to player 1.*/
    const switchPlayer = () => {
        currentPlayer = currentPlayer === p1 ? p2 : p1;
    };

    /* harcode all winning combinations (3 in a row)*/
    const winningCombos = [
        [0,1,2], [3,4,5], [6,7,8],
        [0,3,6], [1,4,7], [2,5,8],
        [0,4,8], [2,4,6]
    ];

    const checkWin = () => {
        /* private variable for game board*/
        const board = GameBoard.getBoard();
        
        /* "some" just checks if the current game board matches any win condition in array. use "some" since only 1 array element has to match.*/
        return winningCombos.some(combo => {
            /* local variable to check winning combinations ie. 1, 2, 3 would be winning, 1, 3, 8 is not. */
            const [a,b,c] = combo;
            return (
                /* if any combo has the same non-empty cells in all 3 spots then return true. */
                board[a] !== "" &&
                board[a] === board[b] &&
                board[b] === board[c]
            );
        });
    };

    /* checks if all cells are filled with no wins.*/
    const checkDraw = () => {
        return GameBoard.getBoard().every(cell => cell !=="");
    };

    /* large function for handling game logic.*/
    const playRound = (index) => {
        /* displays message if game over.*/
        if(gameOver) {
            message = "Game is over.  Reset to play again."
            return;
        }

        /* if a player tries to place a marker which currently has a marker, this will return immediately with no move played.*/
        const movePlaced = GameBoard.placeMove(index, currentPlayer.getMarker());
        if (!movePlaced) {
            message = ("You can't go there! Move is already taken.");
            return;
        }

        /* prints new board on screen after each move */
        GameBoard.printBoard();

        /* if the win function was reached, reset board. */
        if (checkWin()) {
            console.log(`${currentPlayer.getName()} wins!`);
            currentPlayer.addPoint();
            gameOver = true;
            return;
        }

        /* if the tie function was reached, reset board. */
        if (checkDraw()) {
            console.log("It's a draw!");
            gameOver = true;
            return;
        }

        /* after move run switch player function. */
        switchPlayer();
    };

    /* reset all variables and print game reset. */
    const resetGame = () => {
        GameBoard.reset();
        /* figure out how to alternate player turns*/
        currentPlayer = p1;
        gameOver = false;
        message = `It's ${currentPlayer.getName()}'s turn.`;
        console.log("Game reset!");
        GameBoard.printBoard();
    };

    const getMessage = () => message;
    const isOver = () => gameOver;
    const getCurrentPlayer = () => currentPlayer;


    return { 
        playRound, 
        resetGame,
        getMessage,
        isOver,
        getCurrentPlayer,
    };
};