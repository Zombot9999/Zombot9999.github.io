// Ball OOP Demo

class Ball{
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = random(15, 30);
    this.dx = random(-5, 5);
    this.dy = random(-5, 5);
    this.r = random(255);
    this.g = random(255);
    this.b = random(255);
  }
  
  move() {
    this.x += this.dx;
    this.y += this.dy;
    // Check left/right for bounce
    if (this.x > width - this.radius || this.x < this.radius) {
      this.dx = this.dx * -1;
    }
    // Check top/bottom for bounce
    if (this.y > height - this.radius || this.y < this.radius) {
      this.dy = this.dy * -1;
    }
  }

  display() {
    fill(this.r, this.g, this.b);
    circle(this.x, this.y, this.radius * 2);
  }

  bounceOff(otherBall) {
    let radiiSum = this.radius + otherBall.radius;
    let distanceApart = dist(this.x, this.y, otherBall.x, otherBall.y);
    if (radiiSum > distanceApart) {
      //hitting each other...
      let tempX = this.dx;
      let tempY = this.dy;

      this.dx = otherBall.dx;
      this.dy = otherBall.dy;

      otherBall.dx = tempX;
      otherBall.dy = tempY;
    }
  }
}

let ballArray = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  noStroke();
  
  let theBall = new Ball(width/2, height/2);
  ballArray.push(theBall);
}

function draw() {
  background("white");
  for (let someBall of ballArray) {
    someBall.move();
    for (let otherBall of ballArray) {
      // Avoid checking if hitting self
      if (someBall !== otherBall) {
        someBall.bounceOff(otherBall);
      }
    }
    someBall.display();
  }
}

function mousePressed() {
  for (let i = 0; i <= 0; i++) {
    let newBall = new Ball(mouseX, mouseY);
    ballArray.push(newBall);
  }
}