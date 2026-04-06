// Gameboard object
const Gameboard = (() => {
    // 3 x 3 square
    // let gameboard = [
    //     ' ', ' ', ' ',
    //     ' ', ' ', ' ',
    //     ' ', ' ', ' '
    // ]; 

    // // X win
    // let gameboard = [
    //     'X', 'O', 'O',
    //     'X', 'O', 'X',
    //     'X', 'X', 'O'
    // ]; 

    // // tie
    // let gameboard = [
    //     'X', 'X', 'O',
    //     'X', 'O', 'X',
    //     'O', 'X', 'O'
    // ]; 

    let gameboard = [
        'X', ' ', ' ',
        ' ', 'X', 'O',
        'O', ' ', ' '
    ]; 

    // place X/O on specified gameboard area
    const placeMove = (letter, index) => {
        gameboard[index] = letter;
    };

    // reset gameboard
    const resetGameboard = () => {
        return gameboard.fill(' ');
    };

    return { gameboard, placeMove, resetGameboard };
})();

// Player object
const Player = (letter) => {
    let score = 0;

    // increment win score
    const playerWin = () => {
        score++;
        console.log(`Game over~ Player ${letter} wins!`);
    };
    
    // get current score
    const getScore = () => {
        return score;
    };

    return { letter, playerWin, getScore };
};

// Game object to control the flow of the game
const GameController = (() => {
    
    // create players: X and O
    const players = [Player('X'), Player('O')];

    // randomize initial player
    const randomPlayerIndex= Math.floor(Math.random() * players.length);
    const randomPlayer = players[randomPlayerIndex];

    let currentPlayer = randomPlayer;
    let winner = null;
    const board = Gameboard.gameboard;
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };
    
    const displayScores = () => {
        console.log(`The current score for Player ${players[0].letter} and Player ${players[1].letter} is ${players[0].getScore()} : ${players[1].getScore()}`);
    };
    
    const checkWinner = () => {
        const playerLetter = currentPlayer.letter;
        if ( // horizontal
            (board[0] === playerLetter) && (board[1] === playerLetter) && (board[2] === playerLetter) ||
            (board[3] === playerLetter) && (board[4] === playerLetter) && (board[5] === playerLetter) ||
            (board[6] === playerLetter) && (board[7] === playerLetter) && (board[8] === playerLetter)) {
            
            winner = currentPlayer;
            winner.playerWin();
            
        } else if ( // vertical
            (board[0] === playerLetter) && (board[3] === playerLetter) && (board[6] === playerLetter) ||
            (board[1] === playerLetter) && (board[4] === playerLetter) && (board[7] === playerLetter) ||
            (board[2] === playerLetter) && (board[5] === playerLetter) && (board[8] === playerLetter)) {
            
            winner = currentPlayer;
            winner.playerWin();
                
        } else if ( // diagonal
            (board[0] === playerLetter) && (board[4] === playerLetter) && (board[8] === playerLetter) ||
            (board[6] === playerLetter) && (board[4] === playerLetter) && (board[2] === playerLetter)) {
            
            winner = currentPlayer;
            winner.playerWin();
            
        } else if (!board.includes(' ')) { // tie: board is full
            winner = "tie";
            console.log(`Game over~ it's a tie!`);
        }
    }
    
    const playerTurn = () => {
        // player move
        const playerLetter = currentPlayer.letter;
        // let moveIndex = prompt(`Player ${playerLetter} choose an index number to place ${playerLetter} on game board.`);

        // player move allowed only if array index is null
        if (board[moveIndex] === ' ') {
            Gameboard.placeMove(playerLetter, moveIndex);
        }
        
        console.log(board);
        
        // check if there is a winner or tie
        checkWinner();
        
        // switch to the other player's turn
        switchPlayer();
    }
    
    const playGame = () => {
        // keep playing until there is a winner or tie
        while (!winner) {
            playerTurn();
        }

        // display player scores
        displayScores();
        
        // reset game
        console.log(Gameboard.resetGameboard());
    };
    
    return { playGame };

})();

// GameController.playGame();

// object handles the display/DOM logic
const DisplayController = (() => {
    const container = document.getElementsByClassName("container");
    
    // renders the contents of the gameboard array to the webpage
    const renderGameboard = () => {
        const gameCells = document.querySelectorAll(".game-cell");
        gameCells.forEach((cell) => {
            cell.textContent = `${Gameboard.gameboard[cell.id]}`;
        });
    };
    
    // display game on webpage
    const displayGame = () => {
        renderGameboard();

    };

    return { displayGame };
})();

DisplayController.displayGame();
