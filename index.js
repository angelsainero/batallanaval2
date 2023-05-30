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

let shootCounterA = 0;
let shootCounterB = 0;
let win = false;

let PlayerAHits = 0;
let PlayerBHits = 0;

let playerAShots = [];
let playerBShots = [];

function printHeading(text) {
  const pad = "=".repeat(text.length);
  console.log(`==========${pad}==========`);
  console.log(`========= ${text} =========`);
  console.log(`==========${pad}==========`);
}

function printBoard(board) {
  console.table(board);
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

//PINTAMOS TITULO
printHeading("The Battleship simulator starts");

// Situar barcos en tablero propio y tablero enemigo aleatoriamente

function getRandom(max) {
  return Math.floor(Math.random() * max);
}

placeBoats(boardA);
placeBoats(boardB);

// Pintamos tableros
console.log("Own Board");
printBoard(boardA);

// Pintamos tableros
console.log("Enemy Board");
printBoard(boardB);

//funcion comprobar ganador
function getWinner(board, boardHide) {
  if (aTurn) {
    PlayerAHits = PlayerAHits + 1;
    if (PlayerAHits === 24) {
      win = true;
      printHeading("PLAYER A: Wins! all boats of Player B destroyed");
      printHeading("JUGADOR A");
      printBoard(boardA);
      printHeading("JUGADOR B");
      printBoard(boardB);
    } else {
      aTurn;
    }
  }

  if (!aTurn) {
    PlayerBHits = PlayerBHits + 1;
    if (PlayerBHits === 24) {
      win = true;
      printHeading("PLAYER B: Wins! all boats of Player A  destroyed");
      printHeading("JUGADOR A");
      printBoard(boardA);
      printHeading("JUGADOR B");
      printBoard(boardB);
    } else {
      aTurn;
    }
  }
}

//funcion cambiar turno
function changeTurn() {
  if (aTurn === false) {
    aTurn = true;
  } else {
    aTurn = false;
  }
}

// funcion disparar
function shoot(x, y) {
  let shotCoordinates = `${x},${y}`;

  while (
    (aTurn && playerAShots.includes(shotCoordinates)) ||
    (!aTurn && playerBShots.includes(shotCoordinates))
  ) {
    // Solicitar nuevas coordenadas si ya ha disparado a esas
    x = getRandom(10);
    y = getRandom(10);
    shotCoordinates = `${x},${y}`;
  }

  let board; // board al que se disparará
  let boardHide; // board donde se pintará el disparo
  if (aTurn) {
    playerAShots.push(shotCoordinates);
    printHeading(
      `SHOOOOOOOT PLAYER A to ${x},${y}:--> turn ${
        shootCounterA + shootCounterB
      }`
    );
  } else {
    playerBShots.push(shotCoordinates);
    printHeading(
      `SHOOOOOOOT PLAYER B to ${x},${y}:--> turn ${
        shootCounterA + shootCounterB
      }`
    );
  }

  if (aTurn) {
    //turno de A
    showOwnBoard = boardA;
    board = boardB; //dispará en boardB
    boardHide = boardBHide; //Pintará en boardBhide
    shootCounterA = shootCounterA + 1;
  } else {
    //turno de B
    showOwnBoard = boardB;
    board = boardA;
    boardHide = boardAHide;
    shootCounterB = shootCounterB + 1;
  }
  //quien llega al contador para finalizar el juego
  if ((aTurn && shootCounterA > 99) || (!aTurn && shootCounterB > 99)) {
    win = true;
    printHeading("GAME OVER 100 shots fired ");
    if (PlayerAHits > PlayerBHits) {
      printHeading("PLAYER A WINS");
    } else {
      printHeading("PLAYER B WINS");
    }
    printHeading("JUGADOR A");
    printBoard(boardA);
    printHeading("JUGADOR B");
    printBoard(boardB);
  } else {
    if (board[x][y] == " ") {
      boardHide[x][y] = "💧";
      board[x][y] = "💧";
      printHeading("TABLERO PROPIO");
      printBoard(showOwnBoard);
      printHeading("TABLERO ENEMIGO");
      printBoard(boardHide);

      changeTurn();
    } else {
      boardHide[x][y] = "🔥";
      board[x][y] = "🔥";
      printHeading("TOCADO");
      printHeading("TABLERO PROPIO");
      printBoard(showOwnBoard);
      printHeading("TABLERO ENEMIGO");
      printBoard(boardHide);

      getWinner(board, boardHide);
    }
  }
}

while (win == false) {
  shoot(getRandom(10), getRandom(10));
}
