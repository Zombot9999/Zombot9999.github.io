// Images and Sounds Demo

let mario;
let coinSound;
let backgroundSound;
let scaler = 0.5;

function preload() {
  mario = loadImage("mario.png");
  coinSound = loadSound("coin-sound.wav");
  backgroundSound = loadSound("background-sound.mp3");

  backgroundSound.setVolume(0.5);
  coinSound.setVolume(1.0);
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(220);

  imageMode(CENTER);
  image(mario, mouseX, mouseY, mario.width * scaler, mario.height * scaler);
  // circle(mouseX, mouseY, 50);
}

function mousePressed() {
  coinSound.play();

  if (!backgroundSound.isPlaying()) {
    backgroundSound.loop();
  }
}