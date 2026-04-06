// Gameboard object
const Gameboard = (() => {
    // 3 x 3 square
    let gameboard = [
        null, null, null,
        null, null, null,
        null, null, null
    ]; 

    // let gameboard = [
    //     'X', 'O', 'O',
    //     'X', 'O', 'X',
    //     null, 'X', 'O'
    // ]; 

    // place X/O on specified gameboard area
    const placeMove = (letter, index) => {
        gameboard[index] = letter;
    }

    // reset gameboard
    const resetGameboard = () => {
        return gameboard.fill(null);
    }

    return { gameboard, placeMove, resetGameboard };
})();

// Player object
const Player = (letter) => {
    let score = 0;

    // increment win score
    const playerWin = () => {
        score++;
        console.log(`Player ${letter} wins!`);
    }
    
    // get current score
    const getScore = () => {
        return score;
    }

    return { letter, playerWin, getScore };
};
