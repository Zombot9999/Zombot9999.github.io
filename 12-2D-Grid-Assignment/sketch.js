// 2D Grid Assignment
// Tareen Perera
// Oct 27, 2023
//
// Extra for Experts:
// - Used setTimeout() function
// - Used textFont()

// General Variables
let grid;
let cellSize = 75;
let rows;
let columns; 
let player;

// Variables for spawnLinesYAxis() and spawnLinesXAxis()
let linesAttackY = false;
let linesAttackX = false;
let spawnLinesYTimer = 0;
let spawnLinesXTimer = 0;
let spawnLinesX = 0;
let spawnLinesY = 0;
let spawnLinesCooldown = prompt("Enter the cooldown for vertical and horizontal lines attack (Recommended to be above 4500):" , 4500); 

// Variables for spawnOnPlayer() 
let spawnPlayer = false;
let spawnOnPlayerY = 0;
let spawnOnPlayerX = 0;

// Variables for randomSpawn()
let randomSpawnTimer = 0;
let spawnRandom = false;
let randomSpawnCooldown = prompt("Enter the cooldown for vertical and horizontal lines attack:" , 800);

// Create canvas, set variables and make an empty grid
function setup() {
  createCanvas(windowWidth, windowHeight);
  columns = floor(windowHeight/cellSize);
  rows = floor(windowWidth/cellSize);
  spawnLinesCooldown = int(spawnLinesCooldown);
  randomSpawnCooldown = int(randomSpawnCooldown);

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
  spawnLinesYAxis(); 
  spawnLinesXAxis();
  randomSpawn();
}

// Spawns a kill block in a random spot
function randomSpawn() {
  if (spawnRandom && millis() > randomSpawnTimer) {
    let randomX = floor(random(0, rows));
    let randomY = floor(random(0, columns));

    if (grid[randomY][randomX] === 0) {
      grid[randomY][randomX] = 1;

      // Spawn another kill block above
      if (randomY > 0 && grid[randomY - 1][randomX] === 0) {
        setTimeout(() => {
          grid[randomY - 1][randomX] = 1;
        }, 500);
      }
      // Spawn another kill block to the right
      if (randomX < rows - 1 && grid[randomY][randomX + 1] === 0) {
        setTimeout(() => {
          grid[randomY][randomX + 1] = 1;
        }, 500);
      }
      // Spawn another kill block to the left
      if (randomX > 0 && grid[randomY][randomX - 1] === 0) {
        setTimeout(() => {
          grid[randomY][randomX - 1] = 1;
        }, 500);
      }
      // Spawn another kill block below
      if (randomY < columns - 1 && grid[randomY + 1][randomX] === 0) {
        setTimeout(() => {
          grid[randomY + 1][randomX] = 1;
        }, 500);
      }
      // Cooldown
      randomSpawnTimer = millis() + 800;
    }
  }
}

// Spawns vertical lines going from top to botton in a random x spot
function spawnLinesYAxis() {
  if (linesAttackY && millis() > spawnLinesYTimer) {
    spawnLinesYTimer = millis() + spawnLinesCooldown;
    for (let lineY = 0; lineY < columns; lineY++) {
      grid[lineY][spawnLinesX] = 0; 
    }
    spawnLinesX = floor(random(0, rows));
    for (let lineY = 0; lineY < columns; lineY++) {
      if (grid[lineY][spawnLinesX] === 0) {
        setTimeout(() => {
          grid[lineY][spawnLinesX] = 1;
        }, 100 * lineY);
      }
    }
  }
}

// Spawns horizontal lines going from left to right in a random y spot
function spawnLinesXAxis() {
  if (linesAttackX && millis() > spawnLinesXTimer) {
    spawnLinesXTimer = millis() + spawnLinesCooldown;
    for (let lineX = 0; lineX < rows; lineX++) {
      grid[spawnLinesY][lineX] = 0; 
    }
    spawnLinesY = floor(random(0, columns));
    for (let lineX = 0; lineX < rows; lineX++) {
      if (grid[spawnLinesY][lineX] === 0) {
        setTimeout(() => {
          grid[spawnLinesY][lineX] = 1; 
        }, 100 * lineX);
      }
    }
  }
}

// Spawns a kill block on the player
function spawnOnPlayer() {
  if (spawnPlayer) {
    spawnOnPlayerX = player.x;
    spawnOnPlayerY = player.y;

    if (grid[spawnOnPlayerY][spawnOnPlayerX] === 0) {
      grid[spawnOnPlayerY][spawnOnPlayerX] = 1;
    }
  }
}

// Display game over
function gameOver() {
  textSize(750/columns);
  fill("white");
  textWrap(WORD);
  text("Game Over!", 5 * cellSize, 5 * cellSize, cellSize * 10, cellSize);
  player.color = "cyan";
  linesAttackX = false;
  linesAttackY = false;
  spawnPlayer = false;
  spawnRandom = false;
}

// Check if the player has died and reduce lives
function livesSystem() {
  if ((grid[player.y][player.x] === 4 || grid[player.y][player.x] === 4.5) && player.iFrame === false && player.lives > 0) {
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

// Display the player and their lives
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

// Key type functions
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
  if (key === "v") {
    linesAttackY = !linesAttackY;
  }
  if (key === "h") {
    linesAttackX = !linesAttackX;
  }
  if (key === "p") {
    spawnPlayer = !spawnPlayer;
  }
  if (key === "r") {
    spawnRandom = !spawnRandom;
  }
}

// Change a block when it's clicked on
function mousePressed() {
  let y = Math.floor(mouseY/cellSize);
  let x = Math.floor(mouseX/cellSize);

  if (grid[y][x] === 0) {
    grid[y][x] = 1;
  }
  else if (grid[y][x] === 4 || grid[y][x] === 4.5) {
    grid[y][x] = 0;
  }
}

// Display the grid and change their values 
function displayGrid() {
  for (let y = 0; y < columns; y++) {
    for (let x = 0; x < rows; x++) {
      if (grid[y][x] === 1) {   
        grid[y][x] = 1.5;
        fill(170, 21, 87);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        setTimeout(() => {
          grid[y][x] = 4; 
        }, 500);
      }
      // Value 1.5 is similar to one and prevents the setTimeout() from happening more than once
      if (grid[y][x] === 1.5) {
        fill(170, 21, 87);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === 4) {
        grid[y][x] = 4.5;
        fill(253, 31, 108);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
        setTimeout(() => {
          grid[y][x] = 0; 
        }, 2000);
      }
      // Value 4.5 is similar to one and prevents the setTimeout() from happening more than once
      if (grid[y][x] === 4.5) {
        fill(253, 31, 108);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      if (grid[y][x] === 0) {
        fill(41,34,57);
      }
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}

// Make an empty grid
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