let board;
let playerO = "O";
let playerX = "X";
let currPlayer = playerO;
var gameOver = false;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontal-line");
      }
      if (c == 0 || c == 1) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", setTile);
      document.getElementById("board").appendChild(tile);
    }
  }
}

function setTile() {
  let row = parseInt(this.id[0]);
  let col = parseInt(this.id[2]);
  if (board[row][col] != "" || gameOver) {
    return;
  }
  board[row][col] = currPlayer;
  this.textContent = currPlayer;
  if (currPlayer == playerO) {
    let isWinner = checkWinner();
    if (isWinner) {
      return;
    }
    currPlayer = playerX;
  } else {
    let isWinner = checkWinner();
    if (isWinner) {
      return;
    }
    currPlayer = playerO;
  }
}

function checkWinner() {
  // check horizontally
  for (let r = 0; r < 3; r++) {
    let flag = true;
    for (let c = 0; c < 3; c++) {
      if (board[r][c] != currPlayer) {
        flag = false;
        break;
      }
    }
    if (flag) {
      gameOver = true;
      document.getElementById(r.toString() + "-0").classList.add("winner");
      document.getElementById(r.toString() + "-1").classList.add("winner");
      document.getElementById(r.toString() + "-2").classList.add("winner");
      showRestart();
      return true;
    }
  }

  // check vertically
  for (let c = 0; c < 3; c++) {
    let flag = true;
    for (let r = 0; r < 3; r++) {
      if (board[r][c] != currPlayer) {
        flag = false;
        break;
      }
    }
    if (flag) {
      gameOver = true;
      document.getElementById("0-" + c.toString()).classList.add("winner");
      document.getElementById("1-" + c.toString()).classList.add("winner");
      document.getElementById("2-" + c.toString()).classList.add("winner");
      showRestart();
      return true;
    }
  }

  // check diagonally
  if (
    board[0][0] == currPlayer &&
    board[1][1] == currPlayer &&
    board[2][2] == currPlayer
  ) {
    gameOver = true;
    document.getElementById("0-0").classList.add("winner");
    document.getElementById("1-1").classList.add("winner");
    document.getElementById("2-2").classList.add("winner");
    showRestart();
    return true;
  }
  if (
    board[0][2] == currPlayer &&
    board[1][1] == currPlayer &&
    board[2][0] == currPlayer
  ) {
    gameOver = true;
    document.getElementById("0-2").classList.add("winner");
    document.getElementById("1-1").classList.add("winner");
    document.getElementById("2-0").classList.add("winner");
    showRestart();
    return true;
  }
  return false;
}

function showRestart() {
  let btn = document.createElement("button");
  btn.id = "btn";
  btn.innerHTML = "Restart";
  document.getElementById("restart").appendChild(btn);
  btn.addEventListener("click", restartGame);
}

function restartGame() {
  gameOver = false;
  board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""],
  ];
  document.getElementById("btn").remove();
  currPlayer = playerO;
  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      document
        .getElementById(r.toString() + "-" + c.toString())
        .classList.remove("winner");
      document.getElementById(r.toString() + "-" + c.toString()).textContent =
        "";
    }
  }
}
