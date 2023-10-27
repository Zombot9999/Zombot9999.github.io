// 2D Grid Assignment
// Tareen Perera
// Oct 27, 2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"

let grid;
let cellSize;
const GRID_SIZE = 10;
let player;

function setup() {
  createCanvas(windowWidth, windowHeight);

  if (height > width) {
    cellSize = width/GRID_SIZE;
  }
  else {
    cellSize = height/GRID_SIZE;
  }

  player = {
    x: 0,
    y: 0,
    size: cellSize/2,
    livesMax: 3,
    lives: 3,
    iFrame: false,
    iFrameTimer: 0,
    color: "orange",
  };

  grid = makeEmptyGrid(GRID_SIZE, GRID_SIZE);
}

function draw() {
  background(220);
  displayGrid();
  displayPlayer();
  livesSystem();
}

function livesSystem() {
  if (grid[player.y][player.x] === 1 && player.iFrame === false) {
    player.lives -= 1;
    player.iFrame = true;
    player.iFrameTimer = millis() + 2000;
    player.color = "green";
  }
  if (millis() > player.iFrameTimer) {
    player.iFrame = false;
    player.color = "orange";
  }
}

function displayPlayer() {
  rectMode(CENTER);
  textAlign(CENTER);
  fill(player.color);
  rect(player.x * cellSize + cellSize/2, player.y * cellSize + cellSize/2, player.size, player.size);

  if (player.lives === player.livesMax) {
    fill("green");
  }
  else if (player.lives < player.livesMax && player.lives > 1) {
    fill("yellow");
  }
  else {
    fill("red");
  }

  textFont("Courier New", 35);
  textStyle(BOLD);
  text(player.lives, player.x * cellSize + cellSize/2, player.y * cellSize + cellSize/2, player.size, player.size);
  rectMode(CORNER);
}

function keyTyped() {
  if (key === "s" && player.y < GRID_SIZE - 1) {
    player.y = player.y + 1;
  }
  if (key === "w" && player.y > 0) {
    player.y = player.y - 1;
  }
  if (key === "d" && player.x < GRID_SIZE - 1) {
    player.x = player.x + 1;
  }
  if (key === "a" && player.x > 0) {
    player.x = player.x - 1;
  }
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 1) {
    grid[y][x] = 0;
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 0) {
        fill(41,34,57);
      }
      if (grid[y][x] === 1) {
        fill(255,159,239);
        fill(254,31,111);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

function makeEmptyGrid(cols, rows) {
  let randomArray = [];
  for (let y = 0; y < cols; y++) {
    randomArray.push([]);
    for (let x = 0; x < rows; x++) {
      randomArray[y].push(0);
    }
  }
  return randomArray;
}