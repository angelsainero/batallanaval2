let aTurn = true;

const boats = [
    { name: "aircraftCarrier", quantity: 1, size: 5, icon: "⛴️" },
    { name: "vessel", quantity: 1, size: 4, icon: "🚢" },
    { name: "submarine", quantity: 2, size: 3, icon: "⚓" },
    { name: "cruise", quantity: 3, size: 2, icon: "🚤" },
    { name: "boat", quantity: 3, size: 1, icon: "🛶" },
  ];


  let boardA = [
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

  let boardB = [
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

  let boardAHide = [
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

  let boardBHide = [
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


  //PINTAMOS TITULO
printHeading("The Battleship simulator starts");

// Situar barcos en tablero propio y tablero enemigo aleatoriamente
placeBoats(boardA);
placeBoats(boardB);

// Pintamos tableros
console.log("Own Board");
printBoard(boardA);

// Pintamos tableros
console.log("Enemy Board");
printBoard(boardB);


function getRandom(max) {
  return Math.floor(Math.random() * max);
}


  // Comprueba que no se salgan del tablero
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
// inserta barcos
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

//funcion cambiar turno
function changeTurn() {
  if (aTurn === false) {
    aTurn = true;
  } else {
    aTurn = false;
  }
}

let shootCounterA = 0;
let shootCounterB = 0;
let win = false;

let PlayerAHits = 0;
let PlayerBHits = 0;

// funcion disparar
function shoot(x, y) {
  let board; // board al que se disparará
  let boardHide; // board donde se pintará el disparo
  if (aTurn) {
    printHeading(
      `SHOOOOOOOT PLAYER A to ${x},${y}:--> turn ${
        shootCounterA + shootCounterB
      }`
    );
  } else {
    printHeading(
      `SHOOOOOOOT PLAYER B to ${x},${y}:--> turn ${
        shootCounterA + shootCounterB
      }`
    );
  }

  if (aTurn) {
    //turno de A
    showOwnBoard = boardA
    board = boardB //dispará en boardB
    boardHide = boardBHide //Pintará en boardA
    shootCounterA = shootCounterA + 1
  } else {
    //turno de B
    showOwnBoard = boardB
    board = boardB
    boardHide = boardAHide
    shootCounterB = shootCounterB +1

  }
    //quien llega al contado para finalizar el juego
  if ((aTurn && shootCounterA > 99) || (!aTurn && shootCounterB > 99)) {
    printHeading("GAME OVER")
    if (PlayerAHits > PlayerBHits) {
      printHeading("PLAYER A WINS")
    } else {
      printHeading("PLAYER B WINS")
    }
    printBoard(showOwnBoard);
    printBoard(boardHide);
  } else {
    if (board[x][y] == " ") {
      boardHide[x][y] ="💧";
      changeTurn();
    } else {
      boardHide[x][y] = "🔥"
    }
    printBoard(showOwnBoard);
    printBoard(boardHide);
  }
  
    

}
 


//  while (win == false) {

  shoot(getRandom(10), getRandom(10));
  shoot(getRandom(10), getRandom(10));
  shoot(getRandom(10), getRandom(10));
  shoot(getRandom(10), getRandom(10));
  shoot(getRandom(10), getRandom(10));



