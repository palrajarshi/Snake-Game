// Targeting
const eatsound = new Audio("mp3/swallow.mp3");
const gameover = new Audio("mp3/over.mp3");
const music = new Audio("mp3/bg.mp3");
const move = new Audio("mp3/move.mp3");
// 1. Targeting elements in the DOM and Variables
const board = document.querySelector(".board");
let speed = 5;
let score = 0;
let lastPaintTime = 0;
let inputDir = { x: 0, y: 0 };
let snakeArr = [{ x: 13, y: 5 }];
let foodobj = { x: 3, y: 15 };
// Game Loop
const gameLoop = (ctime) => {
  window.requestAnimationFrame(gameLoop);
  if ((ctime - lastPaintTime) / 1000 < 1 / speed) {
    return;
  } else {
    lastPaintTime = ctime;
    gameEngine();
  }
};
window.requestAnimationFrame(gameLoop);

// Collision detection
const collides = (snake) => {
  //   If snake bumps into itself
  for (let i = 1; i < snakeArr.length; i++) {
    if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
      return true;
    }
  }
  //   If snake bumps into wall
  if (
    snake[0].x >= 18 ||
    snake[0].x <= 0 ||
    snake[0].y >= 18 ||
    snake[0].y <= 0
  ) {
    return true;
  }
  return false;
};

// game Engine
const gameEngine = () => {
  // PART -1
  if (collides(snakeArr)) {
    gameover.play();
    music.pause();
    inputDir = { x: 0, y: 0 };
    alert("Game Over! Press any key to restart");
    snakeArr = [{ x: 13, y: 5 }];
    // music.play();
    score = 0;
  }

  //If food eaten
  if (snakeArr[0].y == foodobj.y && snakeArr[0].x == foodobj.x) {
    eatsound.play();
    snakeArr.unshift({
      x: snakeArr[0].x + inputDir.x,
      y: snakeArr[0].y + inputDir.y,
    });
    let a = 2;
    let b = 16;
    foodobj = {
      x: Math.round(a + (b - a) * Math.random()),
      y: Math.round(a + (b - a) * Math.random()),
    };
  }

  //   Move Snake
  for (let i = snakeArr.length - 2; i >= 0; i--) {
    snakeArr[i + 1] = { ...snakeArr[i] };
  }

  snakeArr[0].x += inputDir.x;
  snakeArr[0].y += inputDir.y;

  // PART - 2;
  board.innerHTML = "";

  //  Snake Element and Displaying it
  snakeArr.forEach((e, ind) => {
    const snakeEl = document.createElement("div");
    snakeEl.style.gridRowStart = e.y;
    snakeEl.style.gridColumnStart = e.x;

    if (ind === 0) {
      snakeEl.classList.add("head");
    } else {
      snakeEl.classList.add("snake");
    }
    board.appendChild(snakeEl);
  });

  //   Food Element and Displaying it
  const foodEl = document.createElement("div");
  foodEl.style.gridRowStart = foodobj.y;
  foodEl.style.gridColumnStart = foodobj.x;
  foodEl.classList.add("food");
  board.appendChild(foodEl);
};

// Add event Listener

window.addEventListener("keydown", (e) => {
  inputDir = { x: 0, y: 1 }; // Start the game
  move.currentTime = 0;
  move.play();
  music.play();
  if (e.code === "ArrowUp") {
    console.log("Up key");
    inputDir.x = 0;
    inputDir.y = -1;
  } else if (e.code === "ArrowDown") {
    console.log("Down key");
    inputDir.x = 0;
    inputDir.y = 1;
  } else if (e.code === "ArrowRight") {
    console.log("Right key");
    inputDir.x = 1;
    inputDir.y = 0;
  } else if (e.code === "ArrowLeft") {
    console.log("Left key");
    inputDir.x = -1;
    inputDir.y = 0;
  }
});
