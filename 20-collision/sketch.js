class Clickable {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 50;
    this.height = 50;
    this.color = "yellow";
    this.cornerRadius = 10;       //Corner radius of the clickable (float)
    this.strokeWeight = 2;        //Stroke width of the clickable (float)
    this.stroke = "#000000";      //Border color of the clickable (hex number as a string)
    this.text = "Press Me";       //Text of the clickable (string)
    this.textColor = "#000000";   //Color of the text (hex number as a string)
    this.textSize = 12;           //Size of the text (integer)
    this.textFont = "sans-serif"; //Font of the text (string)
    this.textScaled = false; 
  }
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
}

let myButton = new Clickable(width/2, height/2);     //Create button
myButton.locate(20, 20);        //Position Button
myButton.onPress = function(){  //When myButton is pressed
  this.color = "red";       //Change button color
  alert("Yay!");                //Show an alert message
};