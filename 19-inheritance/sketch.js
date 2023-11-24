// Inheritance OOP Demo

let theParticle;
let theConfetti;

function setup() {
  createCanvas(windowWidth, windowHeight);
  theParticle = new Particle(width/2, height/2);
  theConfetti = new Confetti(width/2, height/2);
}

function draw() {
  background("black");
  theParticle.update();
  theParticle.display();
  theConfetti.update();
  theConfetti.display();
}

class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 20;
  }

  update() {
    this.x += random(-5, 5);
    this.y += random(-5, 5);
  }

  display() {
    circle(this.x, this.y, this.size);
  }
}

class Confetti extends Particle {
  constructor(x, y) {
    super(x, y);
  }

  update() {
    super.update();
    this.size += random(-10, 10);
  }
  
  display() {
    square(this.x, this.y, this.size);
  }
}