// Arrays Assignment
// Tareen
// 10/10/2023
//
// Extra for Experts:
// - describe what you did to take this project "above and beyond"


// Set the variables
let ball = {
  x: 0,
  y: 0,
  dx: 5,
  dy: 5,
  size: 30,
};
let spike;
let state = "Menu";
let time;
let backgroundColors = ["blue", "white", "yellow", "gray", "green", "cyan", "pink", "purple", "black"];
let pos = 100;
let colors = ["black", "yellow"];
let timeRN;
let spikeBall;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spike = makeSpike();
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

function makeSpike() {
  spike = {
    x: width/2,
    y: height/2,
    dx: 5,
    dy: 5,
    size: ball.size * 5,
  };
  return spike;
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
    ball.x > spike.x &&
    ball.x < spike.x + spike.size &&
    ball.y > spike.y &&
    ball.y < spike.y + spike.size
  ) {
    state = "Menu";
    ball.x = 0;
    ball.y = 0;
    spike.x = width / 2;
    spike.y = height / 2;
  }
}

// Show the main menu for the player to start the game
function mainMenu() {
  rectMode(CENTER);
  if (
    mouseX > width / 4 + width / 8 &&
    mouseX < width - (width / 4 + width / 8) &&
    mouseY <  height - (height / 4 + height / 8) &&
    mouseY > height / 4 + height / 8
  ) {
    colors = ["black", "yellow"];
  } 
  else {
    colors = ["yellow", "black"];
  }
  fill(colors[0]);
  rect(width / 2, height / 2, width / 4, height / 4);
  fill(colors[1]);
  textSize(width / 20);
  text("PLAY", width / 2, height / 2, width / 4 - width/8, height / 4 - height/8);
  rectMode(CORNER);
}

// Show the circle and the lava
function display() {
  fill("red");
  rect(0, 0, width / 20, height);
  rect(0, 0, width, height / 20);
  rect(width - width / 20, 0, width / 20, height);
  rect(0, height - height / 20, width, height - height / 20);
  fill(255, 165, 0);
  circle(ball.x, ball.y, ball.size);
}

// Move the circle with WASD
function moveCircle() {
  if (keyIsDown(87)) {
    ball.y -= ball.dy;
  }
  if (keyIsDown(83)) {
    ball.y += ball.dy;
  }
  if (keyIsDown(65)) {
    ball.x -= ball.dx;
  }
  if (keyIsDown(68)) {
    ball.x += ball.dx;
  }
  resetSpeed();
}

// Set speed to 5
function resetSpeed() {
  ball.dx = 5;
  ball.dy = 5;
}

// Stop the movement if the circle gets to a boarder
function circleBorders() {
  if (
    ball.x + ball.size / 2 < width &&
    ball.x - ball.size / 2 > 0 &&
    ball.y - ball.size / 2 > 0 &&
    ball.y + ball.size / 2 < height
  ) {
    moveCircle();
  } 
  else {
    unstuck();
  }
}

// Allow the circle to move again once it's outside the border
function unstuck() {
  if (ball.x - ball.size / 2 <= 0) {
    ball.x += 5;
  } 
  else if (ball.x + ball.size / 2 >= width) {
    ball.x -= 5;
  }
  if (ball.y - ball.size / 2 <= 0) {
    ball.y += 5;
  } 
  else if (ball.y + ball.size / 2 >= height) {
    ball.y -= 5;
  }
}

// Dash with space bar unless on lava
function keyPressed() {
  if (keyCode === 32) {
    if (
      ball.x > width / 20 &&
      ball.x < width - width / 20 &&
      ball.y > height / 20 &&
      ball.y < height - height / 20
    ) {
      ball.dx += 75;
      ball.dy += 75;
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
  spike.x += spike.dx;
  spike.y += spike.dy;
}

// Show the spike moving
function displayBall() {
  imageMode(CORNER);
  image(spikeBall, spike.x, spike.y, spike.size, spike.size);
}

// Bounce if it touches the wall
function bounceIfWall() {
  if (spike.x + spike.size >= width || spike.x <= 0) {
    spike.dx = spike.dx * -1;
  }

  if (spike.y + spike.size >= height || spike.y <= 0) {
    spike.dy = spike.dy * -1;
  }
}

// Resize the canvas if the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function mousePressed() {
  if (mouseX > width / 4 + width / 8 &&
  mouseX < width - (width / 4 + width / 8) &&
  mouseY <  height - (height / 4 + height / 8) &&
  mouseY > height / 4 + height / 8
  ) {
    colors = ["black", "yellow"];
    if (mouseIsPressed) {
      state = "Game";
    }
  } 
  else {
    colors = ["yellow", "black"];
  }
}