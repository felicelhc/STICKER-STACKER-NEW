// select relevant elements from HTML
const grid = document.querySelector(".grid");
const stackBtn = document.querySelector(".stack-btn");
const scoreCounter = document.querySelector(".score-no");
const endGameScreen = document.querySelector(".game-over-screen");
const endGameText = document.querySelector(".game-over-text");
const playAgainBtn = document.querySelector(".play-again");

// create Matrix for grid (0 = empty cell; 1 = bar)
const gridMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0], // starting currentRowIndex
];

// variables for game setup
let currentRowIndex = gridMatrix.length - 1;
let barDirection = "right";
let barSize = 3;
let isGameOver = false;
let score = 0;

function draw() {
  // reset grid
  grid.innerHTML = " ";
  gridMatrix.forEach(function (rowContent) {
    rowContent.forEach(function (cellContent) {
      // create cell
      const cell = document.createElement("div");
      cell.classList.add("cell");
      // cells that bar occupies
      if (cellContent === 1) {
        cell.classList.add("bar");
      }
      // put cell in grid
      grid.appendChild(cell);
    });
  });
  // document.querySelectorAll(".bar").forEach(function (bar) {
  //   bar.computedStyleMap.backgroundColor = "#fff805";
  // });
}

function moveRight(row) {
  row.pop();
  row.unshift(0);
}

function moveLeft(row) {
  row.shift();
  row.push(0);
}

function isRightEdge(row) {
  // checks if the far right element of 'row' has a value of 1
  const lastElement = row[row.length - 1];
  return lastElement === 1;
}

function isLeftEdge(row) {
  // same but for far left
  const firstElement = row[0];
  return firstElement === 1;
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];

  if (barDirection === "right") {
    moveRight(currentRow);
    // if bar reaches right edge, it needs to be moved to the left
    if (isRightEdge(currentRow)) {
      barDirection = "left";
    }
  } else if (barDirection === "left") {
    moveLeft(currentRow);
    // same for left
    if (isLeftEdge(currentRow)) {
      barDirection = "right";
    }
  }
}

// game logic functions here
function endGame(isVictory) {
  if (isVictory) {
    endGameText.innerHTML = "YOU <br /> WON!";
    endGameScreen.classList.add("win");
  }
  endGameScreen.classList.remove("hidden");
}

function onPlayAgain() {
  window.location.reload();
}

function checkWin() {
  // win condition: get to top of the grid
  if (currentRowIndex === 0 && !isGameOver) {
    updateScore();
    isGameOver = true;
    clearInterval(gameInterval);
    endGame(true);
  }
}

function checkLost() {
  // save ref to current & previous rows
  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];
  // no prev. row = exit function
  if (!prevRow) return;
  // check if there is at least 1 accumulated stack element under each bar element
  for (let i = 0; i < currentRow.length; i++) {
    // no accum. stack
    if (currentRow[i] === 1 && prevRow[i] === 0) {
      // remove overhanging bar pieces
      currentRow[i] = 0;
      barSize--;
      // no more bar pieces = game over
      if (barSize === 0) {
        isGameOver = true;
        clearInterval(gameInterval);
        endGame(false);
      }
    }
  }
}

function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  // check if game = won/lost
  checkLost();
  checkWin();
  // game over = stop function
  if (isGameOver) return;
  updateScore();
  // currentRowIndex = currentRowIndex - 1
  currentRowIndex--;
  barDirection = "right";
  // update gridMatrix to add bar to new row
  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowIndex][i] = 1;
  }
}

// events
stackBtn.addEventListener("click", onStack);
playAgainBtn.addEventListener("click", onPlayAgain);

// start game
function main() {
  moveBar();
  draw();
}
// start game loop: calling 'main' every 600ms
const gameInterval = setInterval(main, 600);
