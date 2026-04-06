// Gameboard object
const Gameboard = (() => {
    // 3 x 3 square
    // let gameboard = [
    //     ' ', ' ', ' ',
    //     ' ', ' ', ' ',
    //     ' ', ' ', ' '
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
    let winner;
    const board = Gameboard.gameboard;
    
    const switchPlayer = () => {
        currentPlayer = currentPlayer === players[0] ? players[1] : players[0];
    };

    const currentPlayerInfo = () => {
        return currentPlayer;
    };
    
    const playerInfo = (playerIndex) => {
        return players[playerIndex];
    };
    
    const checkWinner = () => {
        const playerLetter = currentPlayer.letter;
        if ( // horizontal
            (board[0] === playerLetter) && (board[1] === playerLetter) && (board[2] === playerLetter) ||
            (board[3] === playerLetter) && (board[4] === playerLetter) && (board[5] === playerLetter) ||
            (board[6] === playerLetter) && (board[7] === playerLetter) && (board[8] === playerLetter)) {
            
            winner = currentPlayer;
            winner.playerWin();
            return winner.letter;
            
        } else if ( // vertical
            (board[0] === playerLetter) && (board[3] === playerLetter) && (board[6] === playerLetter) ||
            (board[1] === playerLetter) && (board[4] === playerLetter) && (board[7] === playerLetter) ||
            (board[2] === playerLetter) && (board[5] === playerLetter) && (board[8] === playerLetter)) {
            
            winner = currentPlayer;
            winner.playerWin();
            return winner.letter;
                
        } else if ( // diagonal
            (board[0] === playerLetter) && (board[4] === playerLetter) && (board[8] === playerLetter) ||
            (board[6] === playerLetter) && (board[4] === playerLetter) && (board[2] === playerLetter)) {
            
            winner = currentPlayer;
            winner.playerWin();
            return winner.letter;
            
        } else if (!board.includes(' ')) { // tie: board is full
            winner = "tie";
            return winner;
        }
        return null;
    }
    
    const playTurn = (moveIndex) => {
        // player move
        const playerLetter = currentPlayer.letter;

        // player move allowed only if array index is null
        if (board[moveIndex] === ' ') {
            Gameboard.placeMove(playerLetter, moveIndex);
        }
        
        // check if there is a winner or tie
        const result = checkWinner();

        if (result != null) {
            return; // stop game if finished
        } 
        
        // switch to the other player's turn
        switchPlayer();
    }
    
    return { playTurn , currentPlayerInfo, playerInfo, checkWinner };
    
})();

// object handles the display/DOM logic
const DisplayController = (() => {
    const container = document.querySelector(".container");
    const gameContainer = document.querySelector(".game-container");
    const gameCells = document.querySelectorAll(".game-cell");
    
    // renders the contents of the gameboard array to the webpage
    const renderGameboard = () => {
        gameCells.forEach((cell) => {
            cell.textContent = `${Gameboard.gameboard[cell.id]}`;
        });
    };

    const renderGameInfo = () => {
        // display current player on webpage
        const player = document.querySelector(".current-player");
        player.textContent = `Player ${GameController.currentPlayerInfo().letter}'s turn`;

        // display player scores on webpage
        const playerXScore = document.querySelector(".playerX-score");
        playerXScore.textContent = `Player ${GameController.playerInfo(0).letter}: ${GameController.playerInfo(0).getScore()}`
        const playerOScore = document.querySelector(".playerO-score");
        playerOScore.textContent = `Player ${GameController.playerInfo(1).letter}: ${GameController.playerInfo(1).getScore()}`

        // display game result once game is over
        const gameResult = document.createElement("h2");
        gameResult.classList.add("game-result");
        const result = GameController.checkWinner();

        // game over
        if (result !== null) {
            if (result === "tie") {
                gameResult.textContent = "Game over~ It's a tie!";
            } else {
                gameResult.textContent = `Game over~ The winner is ${result}!`;
            }
            container.appendChild(gameResult);

            // disable interaction with game
            gameContainer.style.pointerEvents = 'none';
        }
    };
    
    // allows players to click on a board square to place their marker
    const placeMarker = () => {
        gameCells.forEach((cell) => {
            cell.addEventListener("click", () => {
                // set cell id as the array index 
                const index = cell.id;
                
                // play turn
                GameController.playTurn(index);
                
                // render gameboard to webpage
                renderGameboard();

                // render player info and scores
                renderGameInfo();
            });
        });
    };
    
    // display game on webpage
    const displayGame = () => {
        // render gameboard to webpage
        renderGameboard();
        
        // render player info and scores
        renderGameInfo();

        // display player move on gameboard
        placeMarker();
    };
    
    return { displayGame };
})();

DisplayController.displayGame();
