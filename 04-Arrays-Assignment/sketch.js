// Arrays Assignment
// Tareen
// 10/10/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Set the variables
let x;
let y;
let dx = 5;
let dy = 5;
let circleSize = 30;
let state = "Menu";
let spike_x;
let spike_y;
let bx = 5;
let by = 5;
let spikeSize = circleSize * 5;
let time;
let backgroundColors = ["blue", "white", "yellow", "gray", "green", "cyan", "pink", "purple", "black"];
let pos = 100;
let colors = ["black", "yellow"];
let timeRN;
let spikeBall;

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = 0;
  y = 0;
  spike_x = width / 2;
  spike_y = height / 2;
  noStroke();
  spikeBall = loadImage("spikeBall.png");
}

function draw() {
  background(backgroundColors[pos / 100]);
  if (state === "Game") {
    display();
    circleBorders();
    bouncingSpike();
    checkDeath();
  }
  else {
    mainMenu();
  }
}

// Increase (pos) with the mousewheel which changes color
function mouseWheel(event) {
  pos += event.delta;
  if (pos > 800) {
    pos = 800;
  }
  if (pos < 0) {
    pos = 0;
  }
}

// Check if the player ran into the spike
function checkDeath() {
  if (
    x > spike_x &&
    x < spike_x + spikeSize &&
    y > spike_y &&
    y < spike_y + spikeSize
  ) {
    state = "Menu";
    x = 0;
    y = 0;
    spike_x = width / 2;
    spike_y = height / 2;
  }
}

// Show the main menu for the player to start the game
function mainMenu() {
  if (
    mouseX > width / 4 &&
    mouseX < width - width / 4 &&
    mouseY < height - height / 4 &&
    mouseY > height / 2
  ) {
    colors = ["black", "yellow"];
  } 
  else {
    colors = ["yellow", "black"];
  }
  fill(colors[0]);
  rect(width / 4, height / 2, width / 2, height / 4);
  fill(colors[1]);
  textSize(width / 20);
  text("PLAY", width / 2 - width/20, height / 2 + width/20, width / 6, height / 4);
  fill("orange");
  rect(0, 0, width, height / 4);
  fill("black");
  textSize(width / 60);
  text("INSTRUCTIONS :", 0, 0, width / 2, height / 4);
  text("WASD to move", 0, 50);
  text("SPACE BAR to dash", 0, 75);
  text("Cannot dash on lava", 0, 100);
  text("Mouse wheel to change colors", 0, 125);
}

// Show the circle and the lava
function display() {
  fill("red");
  rect(0, 0, width / 20, height);
  rect(0, 0, width, height / 20);
  rect(width - width / 20, 0, width / 20, height);
  rect(0, height - height / 20, width, height - height / 20);
  fill(255, 165, 0);
  circle(x, y, circleSize);
}

// Move the circle with WASD
function moveCircle() {
  if (keyIsDown(87)) {
    y -= dy;
  }
  if (keyIsDown(83)) {
    y += dy;
  }
  if (keyIsDown(65)) {
    x -= dx;
  }
  if (keyIsDown(68)) {
    x += dx;
  }
  resetSpeed();
}

// Set speed to 5
function resetSpeed() {
  dx = 5;
  dy = 5;
}

// Stop the movement if the circle gets to a boarder
function circleBorders() {
  if (
    x + circleSize / 2 < width &&
    x - circleSize / 2 > 0 &&
    y - circleSize / 2 > 0 &&
    y + circleSize / 2 < height
  ) {
    moveCircle();
  } 
  else {
    unstuck();
  }
}

// Allow the circle to move again once it's outside the border
function unstuck() {
  if (x - circleSize / 2 <= 0) {
    x += 5;
  } 
  else if (x + circleSize / 2 >= width) {
    x -= 5;
  }
  if (y - circleSize / 2 <= 0) {
    y += 5;
  } 
  else if (y + circleSize / 2 >= height) {
    y -= 5;
  }
}

// Dash with space bar unless on lava
function keyPressed() {
  if (keyCode === 32) {
    if (
      x > width / 20 &&
      x < width - width / 20 &&
      y > height / 20 &&
      y < height - height / 20
    ) {
      dx += 75;
      dy += 75;
    }
  }
}

// Call the functions to make the spikeball work properly
function bouncingSpike() {
  moveBall();
  displayBall();
  bounceIfWall();
}

// Change the spike coordinates
function moveBall() {
  spike_x += bx;
  spike_y += by;
}

// Show the spike moving
function displayBall() {
  imageMode(CORNER);
  image(spikeBall, spike_x, spike_y, spikeSize, spikeSize);
}

// Bounce if it touches the wall
function bounceIfWall() {
  if (spike_x + spikeSize >= width || spike_x <= 0) {
    bx = bx * -1;
  }

  if (spike_y + spikeSize >= height || spike_y <= 0) {
    by = by * -1;
  }
}

// Resize the canvas if the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (mouseX > width / 4 && mouseX < width - width / 4 && mouseY < height - height / 4 && mouseY > height / 2) {
    colors = ["black", "yellow"];
    if (mouseIsPressed) {
      state = "Game";
    }
  } 
  else {
    colors = ["yellow", "black"];
  }
}