// Terrain Generation 
// Oct 23, 2023

let terrain = [];
let xOffset = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  spawnRectangles();
}

function draw() {
  background(220);
  dontFallOff();
  displayRectangles();
}

function dontFallOff() {
  if (keyIsDown(RIGHT_ARROW)) {
    if (xOffset + 50 !== 10000 - width) {     //don't fall off the right side
      xOffset += 50;
    }
  }
  
  if (keyIsDown(LEFT_ARROW)) {
    if (xOffset > 50) {     //don't fall off the left side
      xOffset -= 50;
    }
  }
}

function displayRectangles() {
  for (let i = xOffset; i < width + xOffset; i++) {
    let thisRect = terrain[i];
    rect(thisRect.x - xOffset, height - thisRect.height, 1, thisRect.height);
  }
}

function spawnRectangles() {
  let time = 0;
  for (let x = 0; x < 10000; x++) {
    let h = noise(time) * height;
    let thisRect = {
      x: x,
      height: h,
    };
    terrain.push(thisRect);
    time += 0.001;
  }
}