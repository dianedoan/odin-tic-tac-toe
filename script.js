// Gameboard object
const Gameboard = (() => {
    // 3 x 3 square
    let gameboard = [
        ' ', ' ', ' ',
        ' ', ' ', ' ',
        ' ', ' ', ' '
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
const Player = (playerName, letter) => {
    let score = 0;

    // increment win score
    const playerWin = () => {
        score++;
    };
    
    // get current score
    const getScore = () => {
        return score;
    };

    return { playerName, letter, playerWin, getScore };
};

// Game object to control the flow of the game
const GameController = (() => {
    // create players: X and O
    const players = [Player('player 1', 'X'), Player('player 2', 'O')];

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
            return winner;
            
        } else if ( // vertical
            (board[0] === playerLetter) && (board[3] === playerLetter) && (board[6] === playerLetter) ||
            (board[1] === playerLetter) && (board[4] === playerLetter) && (board[7] === playerLetter) ||
            (board[2] === playerLetter) && (board[5] === playerLetter) && (board[8] === playerLetter)) {
            
            winner = currentPlayer;
            return winner;
                
        } else if ( // diagonal
            (board[0] === playerLetter) && (board[4] === playerLetter) && (board[8] === playerLetter) ||
            (board[6] === playerLetter) && (board[4] === playerLetter) && (board[2] === playerLetter)) {
            
            winner = currentPlayer;
            return winner;
            
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
        
        // check for winner
        const result = checkWinner();

        if (result != null && result != "tie") {
            winner.playerWin(); // increment score of winner
            return; // stop game if finished
        } 

        if (result === "tie") {
            return;
        }
        
        // switch to the other player's turn
        switchPlayer();
    }
    
    return { playTurn , currentPlayerInfo, playerInfo, checkWinner };
    
})();

// object handles the display/DOM logic
const DisplayController = (() => {
    const container = document.querySelector(".container");
    const gameCells = document.querySelectorAll(".game-cell");
    const resultsContainer = document.querySelector(".results-container");
    const gameResult = document.createElement("h2");
    gameResult.classList.add("game-result");
    
    const disableBoard = () => {
        gameCells.forEach(cell => {
            cell.style.pointerEvents = 'none';
        });
    };

    const enableBoard = () => {
        gameCells.forEach(cell => {
            cell.style.pointerEvents = 'auto';
        });
    };

    const restartGameBoard = () => {
        // reset gameboard array
        Gameboard.resetGameboard();

        // clear game result
        resultsContainer.removeChild(gameResult);
        
        // render gameboard to webpage
        renderGameboard();

        // render player info and scores
        renderGameInfo();
        
        // re-enable board
        enableBoard();
    };

    // renders the contents of the gameboard array to the webpage
    const renderGameboard = () => {
        gameCells.forEach((cell) => {
            const cellValue = Gameboard.gameboard[cell.id];
            cell.textContent = `${cellValue}`;
            
            if (cellValue !== ' ') {
                cell.style.pointerEvents = 'none'; // disable filled cells
            } else {
                cell.style.pointerEvents = 'auto'; // enable empty cells
            }
        });
    };

    const renderGameInfo = () => {
        const player = document.querySelector(".current-player");
        player.textContent = `Player ${GameController.currentPlayerInfo().playerName}'s turn`;

        // display player scores on webpage
        const playerXScore = document.querySelector(".playerX-score");
        playerXScore.textContent = `Player ${GameController.playerInfo(0).playerName}: ${GameController.playerInfo(0).getScore()}`
        const playerOScore = document.querySelector(".playerO-score");
        playerOScore.textContent = `Player ${GameController.playerInfo(1).playerName}: ${GameController.playerInfo(1).getScore()}`

        // display game result once game is finished
        const result = GameController.checkWinner();

        if (result !== null) {
            renderResults(result);
        }
    };
    
    const renderResults = (result) => {
        // disable interaction with gameboard
        disableBoard();
        
        // display game results
        if (result === "tie") {
            gameResult.textContent = "Game over~ It's a tie!";
        } else {
            gameResult.textContent = `Game over~ The winner is Player ${result.playerName}!`;
        }
        resultsContainer.appendChild(gameResult);
        
        // play again button
        const restartButton = document.createElement("button");
        restartButton.id = "restart";
        restartButton.textContent = "Play Again?";
        resultsContainer.appendChild(restartButton);
        
        restartButton.addEventListener("click", () => {
            // remove button
            resultsContainer.removeChild(restartButton);
            
            // restart game
            restartGameBoard();
        });
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

    const startGame = () => {
        const playerForm = document.querySelector("#player-form");
        
        playerForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const playerXName = document.querySelector("#playerX").value;
            const playerOName = document.querySelector("#playerO").value;
        
            const playerForm = document.querySelector("#player-form");
            container.removeChild(playerForm);
        
            // display current player on webpage
            GameController.playerInfo(0).playerName = playerXName;
            GameController.playerInfo(1).playerName = playerOName;
            
            displayGame();
        });
    };
    
    return { startGame };
})();

DisplayController.startGame();
