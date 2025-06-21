const Gameboard = {
    gameboard: [
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