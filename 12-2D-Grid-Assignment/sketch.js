// 2D Grid Assignment
// Tareen Perera
// Oct 27, 2023
//
// Extra for Experts:
// - Used textFont()
// - Used setTimeout() function to change the grid number to 4 after a bit of time has passed

let grid;
let cellSize = 75;
let rows;
let columns; 
// const GRID_SIZE = 10;
let player;
let linesAttack = false;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // if (height > width) {
  //   cellSize = width/GRID_SIZE;
  // }
  // else {
  //   cellSize = height/GRID_SIZE;
  // }

  columns = floor(windowHeight/cellSize);
  rows = floor(windowWidth/cellSize);

  player = {
    x: 0,
    y: 0,
    size: cellSize/2,
    livesMax: 3,
    lives: 3,
    iFrame: false,
    iFrameTimer: 0,
    color: "cyan",
  };

  grid = makeEmptyGrid(columns, rows);
}

function draw() {
  background(220);
  displayGrid();
  displayPlayer();
  livesSystem();
  spawnOnPlayer();
  // spawnLines();
}

// function spawnLines() {
//   while (linesAttack) {
//     let x = random(rows);
//     for (let y = 0; y < columns; y++) {
//       setTimeout(() => {
//         grid[x][y] = 1; 
//       }, 1000);
//     }
//   }
// }

function spawnOnPlayer() {
  if (grid[player.y][player.x] === 0) {
    grid[player.y][player.x] = 1;
  }
}

function gameOver() {
  textSize(750/columns);
  fill("white");
  textWrap(WORD);
  text("Game Over!", 5 * cellSize, 5 * cellSize, cellSize * 10, cellSize);
  player.color = "cyan";
}

function livesSystem() {
  if (grid[player.y][player.x] === 4 && player.iFrame === false && player.lives > 0) {
    player.lives -= 1;
    player.iFrame = true;
    player.iFrameTimer = millis() + 2000;
    player.color = "blue";
  }
  if (player.lives <= 0) {
    gameOver();
  }
  if (millis() > player.iFrameTimer) {
    player.iFrame = false;
    player.color = "cyan";
  }
}

function displayPlayer() {
  noStroke();
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
  stroke(5);
  textFont("Courier New", 40 - columns);
  textStyle(BOLD);
  text(player.lives, player.x * cellSize + cellSize/2, player.y * cellSize + cellSize/2, player.size, player.size);
  rectMode(CORNER);
}

function keyTyped() {
  // Player movement
  if (key === "s" && player.y < columns - 1 && player.lives > 0) {
    player.y = player.y + 1;
  }
  if (key === "w" && player.y > 0 && player.lives > 0) {
    player.y = player.y - 1;
  }
  if (key === "d" && player.x < rows - 1 && player.lives > 0) {
    player.x = player.x + 1;
  }
  if (key === "a" && player.x > 0 && player.lives > 0) {
    player.x = player.x - 1;
  }

  // Other functions
  if (key === "l") {
    linesAttack = true;
  }
}

function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 4) {
    grid[y][x] = 0;
  }
}

function displayGrid() {
  for (let y = 0; y < columns; y++) {
    for (let x = 0; x < rows; x++) {
      if (grid[y][x] === 0) {
        fill(41,34,57);
      }
      if (grid[y][x] === 1) {
        fill(170, 21, 87);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        // grid[y][x] = 4;
        setTimeout(() => {
          grid[y][x] = 4; 
        }, 1000);
      }
      if (grid[y][x] === 4) {
        fill(253, 31, 108);
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