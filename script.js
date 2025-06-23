//This IIFE stores all the details and methods of a Gameboard

const Gameboard = (function(){
    // This is a Matrice(?) of the gameboard. I used the 3 arrays inside an array
    //  to better access the values of each of the cells/items. I also needed 
    //  this to simplify my code to check for row winner. 
    const gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]

    // To make my gameboard private, I declare this getBoard method to return the gameboard
    const getBoard = () => gameboard;

    // Function that clears the gameboard by setting all the rows and columns to empty string.
    const clearBoard =  () => {
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
            gameboard[row][col] = "";
            }
        }
    }

    // This sets the marker in the gameboard array. We feed it the row and column to get the position of the cell in the gameboard and then a marker to mark the cell with.
    const setMarkerBoard = (row, col, marker) => {
        gameboard[row][col] = marker;
    }

    // Adding this getCell method to later then get values of a cell to do compares for the win/tie logic
    const getCell = (row, col) => gameboard[row][col];
    
    // Return all the function as methods of Gameboard
    return {gameboard, getBoard, getCell, setMarkerBoard, clearBoard};

})();


// The player module is a factory function inside an IIFE that we'll later use to read create players X and O with their names and markers.
const PlayerModule = (() => {
  const createPlayer = (name, marker) => ({ name, marker });
  return { createPlayer };
})();


// Controls the UI aspect of the game
const DisplayController = (function(){
    // Declaring some queryselectors
    const boardCells = document.querySelectorAll(".cell");
    const dialogAskName = document.querySelector(".ask-name");
    const dialogAlertMsg = document.querySelector(".alert-msg-dialog");
    const alertMsgText = document.querySelector(".alert-msg-text");
    const alertButton = document.querySelector(".alert-btn");
    
    // Open our display modal. Wrapped it inside a function so that I can call it as a method of DisplayController.
    const openDialogAskName = () => dialogAskName.showModal();

    // Open out alert message modal.
    const openDialogAlertMsg = () => dialogAlertMsg.showModal();
    
    // Function that renders on the frontend based on what is in the gameboard array/matrice
    const render = () => {
        const board = Gameboard.getBoard(); // we set board to the gameboard matrice
        boardCells.forEach(cell => {        // now for each cell in the boardCell which is the frontend of the game board
            const row = parseInt(cell.dataset.row);     // we get the row of the cell using the dataset attribute we've given to each div
            const col = parseInt(cell.dataset.column);  // and the same with the column
            cell.textContent = board[row][col];     // Then we add the value of the array item of that particular row and column as the display text.
        });
    };

    // Function that clears the display of the frontend component just like the clearboard function in the Gameboard module 
    const clearDisplay = () => {
        boardCells.forEach(cell => {
            cell.textContent = "";      
        })
    }

    // I'm creating a function/method of DsiplayController to alert messages in a modal when a player wins or game finishes in a tie.
    const alertMsg = (msg) => {
        openDialogAlertMsg();
        alertMsgText.textContent = msg
    }

    // Closes the Modal when user clicks the close button. Then we clear board and 
    alertButton.addEventListener("click", () => {
        // Only if we are receiving a Win or Tie alert, we clear the displays, else
        if (alertMsgText.textContent !== "Cell already Marked!") {
            closeDialogAlertMsg();
            clearDisplay();
            Gameboard.clearBoard();
            GameController.startGame();
        } else {    // in case of Cell already Marked alert, we simply close the modal and let the play continue.
            closeDialogAlertMsg();
        }
    });

    // 
    
    // Functions to close the modals
    const closeDialogAskName = () => dialogAskName.close();
    const closeDialogAlertMsg = () => dialogAlertMsg.close();

    return {openDialogAskName, render, alertMsg,  clearDisplay, closeDialogAskName}

})();


// Calls all the above methods and simulates a game
const GameController = (function(){
    const boardCells = document.querySelectorAll(".cell");
    const gameContainer = document.querySelector(".gameboard-container");

    const playerDetailForm = document.querySelector(".playerDetailForm");
    let playerX;
    let playerO;
    let currentPlayer;

    const startGame = () => {
    // Lets call the Player X first
    currentPlayer = playerX;
    // Initially display the Modal
    DisplayController.openDialogAskName();
    DisplayController.render();
    gameContainer.style.opacity = 0;
    }

    // Now we ge the player details - for Player X and Player O
    playerDetailForm.addEventListener("submit", function(e) {
        e.preventDefault();

        let playerXName = e.target.elements.playerX.value;
        let playerOName = e.target.elements.playerO.value;

        playerX = PlayerModule.createPlayer(playerXName, "X");
        playerO = PlayerModule.createPlayer(playerOName, "O");
        currentPlayer = playerX;

        DisplayController.closeDialogAskName();

        gameContainer.style.opacity = 1;
    });


    function checkForWinner() {
        //for rows
        Gameboard.gameboard.forEach(row => {
        if (row.join("") === 'XXX' || row.join("") === 'OOO') {
            DisplayController.alertMsg(`${currentPlayer.name} is the winner!`)
        }
        })

        //for columns
        for (let col = 0; col < 3; col++) {
        if (
            Gameboard.gameboard[0][col] &&
            Gameboard.gameboard[0][col] === Gameboard.gameboard[1][col] &&
            Gameboard.gameboard[1][col] === Gameboard.gameboard[2][col]
        ) {
            DisplayController.alertMsg(`${currentPlayer.name} is the winner!`)
        }
        }

        //for diagonals
        if (
        Gameboard.gameboard[0][0] && 
        Gameboard.gameboard[0][0] === Gameboard.gameboard[1][1] &&
        Gameboard.gameboard[1][1] === Gameboard.gameboard[2][2]
        ) {
            DisplayController.alertMsg(`${currentPlayer.name} is the winner!`)
        }

        if (
        Gameboard.gameboard[0][2] && 
        Gameboard.gameboard[0][2] === Gameboard.gameboard[1][1] &&
        Gameboard.gameboard[1][1] === Gameboard.gameboard[2][0] 
        ) {
            DisplayController.alertMsg(`${currentPlayer.name} is the winner!`)    
        }

        // Check for draw
        const isBoardFull = Gameboard.gameboard.flat().every(cell => cell !== "");
        if (isBoardFull) {
            DisplayController.alertMsg("It's a tie!") 
        }

    }


    // Add click events for each cell in the Gameboard UI
    boardCells.forEach(cell => {
    cell.addEventListener("click", function() {
        
        let row = parseInt(cell.dataset.row);
        let column = parseInt(cell.dataset.column);

        if (Gameboard.gameboard[row][column] !== "") {
            DisplayController.alertMsg("Cell already Marked!");
            return;
        }

        Gameboard.gameboard[row][column] = currentPlayer.marker;
        DisplayController.render();

        checkForWinner();
        currentPlayer = currentPlayer === playerX ? playerO : playerX;
    })
})
        
    return {startGame};
})();

GameController.startGame();





//================================================================================
/*
const Gameboard = {
    gameboard: [            -- DONE
        ["", "", ""],
        ["", "", ""],
        ["", "", ""]
    ]
}

const markers = ["X", "O"]  

let currentOption = markers[0];

const boardCells = document.querySelectorAll(".cell");

boardCells.forEach(cell => {
    cell.addEventListener("click", function() {
        
        let row = parseInt(cell.dataset.row);
        let column = parseInt(cell.dataset.column);

        if (Gameboard.gameboard[row][column] !== "") {
            alert("Cell already Marked!")
            return;
        }

        Gameboard.gameboard[row][column] = currentOption;
        cell.textContent = currentOption;

        currentOption = currentOption === markers[0] ? markers[1] : markers[0]
        checkForWinner();
        console.log(Gameboard.gameboard);
    })
})


function checkForWinner() {
    //for rows
   Gameboard.gameboard.forEach(row => {
    if (row.join("") === 'XXX' || row.join("") === 'OOO') {
        alert("You win!")
        boardCells.forEach(cell => cell.textContent = "");
        clearBoard();
    }
   })

   //for columns
    for (let col = 0; col < 3; col++) {
      if (
        Gameboard.gameboard[0][col] &&
        Gameboard.gameboard[0][col] === Gameboard.gameboard[1][col] &&
        Gameboard.gameboard[1][col] === Gameboard.gameboard[2][col]
      ) {
        alert("You win!")
        boardCells.forEach(cell => cell.textContent = "");
        clearBoard();
      }
    }

    //for diagonals
    if (
      Gameboard.gameboard[0][0] && 
      Gameboard.gameboard[0][0] === Gameboard.gameboard[1][1] &&
      Gameboard.gameboard[1][1] === Gameboard.gameboard[2][2]
    ) {
      alert("You win!")
      boardCells.forEach(cell => cell.textContent = "");
      clearBoard();
    }

    if (
      Gameboard.gameboard[0][2] && 
      Gameboard.gameboard[0][2] === Gameboard.gameboard[1][1] &&
      Gameboard.gameboard[1][1] === Gameboard.gameboard[2][0] 
    ) {
      alert("You win!")
      boardCells.forEach(cell => cell.textContent = "");
      clearBoard();
    }

}

function clearBoard() {
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      Gameboard.gameboard[row][col] = "";
    }
  }
}
*/