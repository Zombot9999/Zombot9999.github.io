// Ball Object Notation Demo
// Oct 5, 2023

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  let theBall = spawnBall();
  ballArray.push(theBall);
}

function draw() {
  background(220);
  moveBall();
  displayBall();
}

function spawnBall() {
  let theBall = {
    x: random(width),
    y: random(height),
    radius: random(15, 30),
    r: random(0, 255),
    g: random(0, 255),
    b: random(0, 255),
    dx: random(-5, 5),
    dy: random(-5, 5),
  };
  return theBall;
}

function moveBall() {
  for (let i = 0; i < ballArray.length; i++) {
    let theBall = ballArray[i];

    theBall.x += theBall.dx;
    theBall.y += theBall.dy;
  
    // off the right side
    if (theBall.x - theBall.radius > width) {
      theBall.x = 0 - theBall.radius;
    }
  
    // off the left side
    else if (theBall.x < 0 - theBall.radius) {
      theBall.x = width + theBall.radius;
    }
  
    // off the bottom
    if (theBall.y - theBall.radius > height) {
      theBall.y = 0 - theBall.radius;
    }
  
    // off the top
    else if (theBall.y < 0 - theBall.radius) {
      theBall.y = height + theBall.radius;
    }
  }

}

function displayBall() {
  for (let i = 0; i < ballArray.length; i++) {
    let theBall = ballArray[i];

    fill(theBall.r, theBall.g, theBall.b);
    circle(theBall.x, theBall.y, theBall.radius * 2);
  }

}

function mousePressed() {
  let someBall = spawnBall();
  someBall.x = mouseX;
  someBall.y = mouseY;
  ballArray.push(someBall);
}