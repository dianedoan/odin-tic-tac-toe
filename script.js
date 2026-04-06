// Gameboard object
const Gameboard = (function () {
    let gameboard = [null, null, null, null, null, null, null, null, null]; // 3 x 3 square

    return {
        gameboard,

        // place X/O on specified gameboard area
        placeMove(letter, index) {
            gameboard[index] = letter;
        },

        // reset gameboard
        resetGameboard() {
            return gameboard.fill(null);
        }
    };
})();

// Player object
function createPlayer(letter) {
    let score = 0;

    return {
        letter,

        // increment win score
        playerWin() {
            score++;
            console.log(`Player ${letter} wins!`);
        },

        // get current score
        getScore() {
            return score;
        }
    };
}
