// Sierpinski Triangle - Recursion Demo

let initialTriangle = [
  {x: 400, y: 50},
  {x: 50, y: 550},
  {x: 750, y: 550},
];
let depth = 0;
let theColors = ["black", "red", "blue", "brown", "purple", "yellow", "orange", "green"];

function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(220);
  sierpinski(initialTriangle, depth);
}

function sierpinski(points, degree) {
  fill(theColors[degree]);
  triangle(points[0].x, points[0].y, points[1].x, points[1].y, points[2].x, points[2].y);

  if (degree > 0) {
    // Draw upper triangle
    sierpinski([points[0], getMidpoint(points[0], points[1]), getMidpoint(points[0], points[2])], degree - 1);
    // Draw lower right triangle
    sierpinski([points[2], getMidpoint(points[0], points[2]), getMidpoint(points[1], points[2])], degree - 1);
    // Draw upper triangle
    sierpinski([points[1], getMidpoint(points[0], points[1]), getMidpoint(points[1], points[2])], degree - 1);
  }
}

function getMidpoint(point1, point2) {
  let newX = (point1.x + point2.x)/2;
  let newY = (point1.y + point2.y)/2;
  return {x: newX, y: newY};
}

function mousePressed() {
  if (mouseX < width/2 && depth > 0) {
    depth--;
  }
  else if (depth < theColors.length - 1 && mouseX > width/2){
    depth++;
  }
}