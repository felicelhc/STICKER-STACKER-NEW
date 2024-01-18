const grid = document.querySelector(".grid");
const stackBtn = document.querySelector(".stack");
const scoreCounter = document.querySelector(".score-no");
const endGameScreen = document.querySelector(".end-game-screen");
const endGameText = document.querySelector(".end-game-text");
const playAgainBtn = document.querySelector(".play-again");

const gridMatrix = [
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0],
  [1, 1, 1, 0, 0, 0],
];

let currentRowIndex = gridMatrix.length - 1;
let barDirection = "right";
let barSize = 3;
let isGameOver = false;
let score = 0;

function draw() {
  grid.innerHTML = "";
  gridMatrix.forEach(function (rowContent) {
    rowContent.forEach(function (cellContent) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      grid.appendChild(cell);
    });
  });
}

function updateScore() {
  score += barSize;
  scoreCounter.innerText = score.toString().padStart(5, 0);
}

function onStack() {
  currentRowIndex--;
  // currentRowIndex = currentRowIndex - 1
  barDirection = "right";

  for (let i = 0; i < barSize; i++) {
    gridMatrix[currentRowinex][i] = 1;
  }
}

function mvoeRight(currentRow) {
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
    const lastElement = crrentRow[currentRow.length - 1];
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

stackBtn.addEventListener("click", onStack);

const gameInterval = setInterval(main, 600);
