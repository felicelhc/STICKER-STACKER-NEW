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

function endGame() {
  if (isVictory) {
    endGameText.innerHTML = "YOU <br /> WON!";
    endGameScreen.classList.add("win");
  }
  endGameScreen.classList.remove("hidden");
}

function checkWin() {
  if (currentRowIndex === 0) {
    isGameOver = true;
    clearInterval(gameInterval);
  }
}

function checkLost() {
  const currentRow = gridMatrix[currentRowIndex];
  const prevRow = gridMatrix[currentRowIndex + 1];
  if (!prevRow) return;

  for (let i = 0; i < currentRow.length; i++) {
    currentRow[i] = 0;
    barSize--;
  }

  if (barSize === 0) {
    isGameOver = true;
    clearInterval(gameInterval);
  }
}

function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  checkWin();
  checkLost();
  updateScore();
  if (isGameOver) return;
  currentRowIndex--;
  // currentRowIndex = currentRowIndex - 1
  barDirection = "right";

  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowinex][i] = 1;
  }
}

function moveRight(currentRow) {
  currentRow.pop();
  currentRow.unshift(0);
}

function moveLeft(currentRow) {
  currentRow.shift();
  currentRow.push(0);
}

function moveBar() {
  const currentRow = gridMatrix[currentRowIndex];

  if (barDirection === "right") {
    moveRight(currentRow);
    const lastElement = currentRow[currentRow.length - 1];
    if (lastElement === 1) {
      barDirection = "left";
    }
  } else if (barDirection === "left") {
    moveLeft(currentRow);

    const firstElement = currentRow[0];

    if (firstElement === 1) {
      barDirection = "right";
    }
  }
}
function main() {
  draw();
  moveBar();
}

function onPlayAgain() {
  window.location.reload();
}

stackBtn.addEventListener("click", onStack);
playAgainBtn.addEventListener("click", onPlayAgain);

const gameInterval = setInterval(main, 600);
