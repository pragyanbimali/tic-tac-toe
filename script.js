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
    return {getBoard, getCell, setMarker, clearBoard};

})();


// The player module is a factory function inside an IIFE that we'll later use to read create players X and O with their names and markers.
const PlayerModule = (() => {
  const createPlayer = (name, marker) => ({ name, marker });
  return { createPlayer };
})();


// Controls the UI aspect of the game
const DisplaController = (function(){
    // Open our modal
    const openModal = () => dialog.showModal();
    
    const boardCells = document.querySelectorAll(".cell");
    const dialog = document.querySelector(".dialog");

    const render = () => {
        const board = Gameboard.getBoard();
        boardCells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.column);
            cell.textContent = board[row][col];
        });
    };

    const clearDisplay = () => {
        boardCells.forEach(cell => {
            cell.textContent = "";
        })
    }
    
    const closeModal = () => dialog.close();

    return {openModal, render, clearDisplay}

})();


// Calls all the above methods and simulates a game
const GameController = (function(){
    

})();




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