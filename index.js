const boats = [
    { name: "aircraftCarrier", quantity: 1, size: 5, icon: "⛴️" },
    { name: "vessel", quantity: 1, size: 4, icon: "🚢" },
    { name: "submarine", quantity: 2, size: 3, icon: "⚓" },
    { name: "cruise", quantity: 3, size: 2, icon: "🚤" },
    { name: "boat", quantity: 3, size: 1, icon: "🛶" },
  ];
  
   
  let board = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ];
  
  let boardEnemy = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ];
  
  let boardHide = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ];
  
  let boardEnemyHide = [
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " ", " ", " "],
  ];
  
  function printHeading(text) {
    const pad = "=".repeat(text.length);
    console.log(`==========${pad}==========`);
    console.log(`========= ${text} =========`);
    console.log(`==========${pad}==========`);
  }


  function printBoard(board) {
        console.table(board);
  }


  
  
  
  function canInsertShip(board, size, row, col, direction) {
    if (direction === 0) {
      // Si es Horizontal
      if (row + size > board.length) {
        return false;
      }
    for (var i = row; i < row + size; i++) {
      if (board[i][col] !== " ") {
        return false;
      }
    }
  } else {
    //si es Vertical
    if (col + size > board[0].length) {
      return false;
    }
    for (var i = col; i < col + size; i++) {
      if (board[row][i] !== " ") {
        return false;
      }
    }
  }
  return true;
}

function placeBoats(board) {
  boats.forEach((boat) => {
    for (let i = 0; i < boat.quantity; i++) {
      let row = Math.floor(Math.random() * 10);
      let col = Math.floor(Math.random() * 10);
      let direction = Math.floor(Math.random() * 2);
      
      while (!canInsertShip(board, boat.size, row, col, direction)) {
        row = Math.floor(Math.random() * 10);
        col = Math.floor(Math.random() * 10);
        direction = Math.floor(Math.random() * 2);
      }
      
      
      for (let j = 0; j < boat.size; j++) {
        if (direction === 0) {
          board[row + j][col] = boat.icon;
        } else {
          board[row][col + j] = boat.icon;
        }
      }
    }
  });
}

//PINTAMOS TITULO
printHeading("The Battleship simulator starts");

// Situar barcos en tablero propio y tablero enemigo aleatoriamente
placeBoats(board);
placeBoats(boardEnemy);

// Pintamos tableros
console.log("Own Board");
printBoard(board);

// Pintamos tableros
console.log("Enemy Board");
printBoard(boardEnemy);

