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

const player1 = Player("Alice", "X");
player1.addPoint();
console.log(player1.getScore()); // 1
console.log(player1.score); // undefined (private)