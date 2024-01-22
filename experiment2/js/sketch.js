// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
const VALUE1 = 1;
const VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;
let x, y;
let num = 3;
let click = false;

class MyClass {
  constructor(param1, param2) {
    this.property1 = param1;
    this.property2 = param2;
  }

  myMethod() {
    // code to run when method is called
  }
}

// setup() function is called once when the program starts
function setup() {
  // place our canvas, making it fit our container
  canvasContainer = $("#canvas-container");
  let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
  canvas.parent("canvas-container");
  // resize canvas is the page is resized
  $(window).resize(function () {
    console.log("Resizing...");
    resizeCanvas(canvasContainer.width(), canvasContainer.height());
  });
  element = document.getElementById("canvas-container");
  element.addEventListener("click", () => click = click == false ? true : false);
  background(255);
  cursor(CROSS);
  fill(0);
  stroke(0, 50);
  strokeWeight(6);
}

function draw() {
  if (click) {
    updateMousePos();
    line(x, y, x, y);
    line(y, x, y, x);
    line(x / num, y / num, x / num, y / num);
    line(y / num, x / num, y / num, x / num);
    line(x * num, y * num, x * num, y * num);
    line(y * num, x * num, y * num, x * num);
    updateNum();
  }
}

function updateMousePos() {
  x = mouseX;
  y = mouseY;
}

function updateNum() {
  if (num > 0.5) num -= 0.01;
  else num += 1;
}