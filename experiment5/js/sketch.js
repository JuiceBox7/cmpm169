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

let numFigures = 13.33;
let figureRadius;
let figureSeparation;

let nVertex = 3;

let t = 0;
let dt = 5;

let r = 255;
let g = 255;
let b = 255;

let rotSpeed = 0.001;

let direction = 1; // 1 or -1
const pctToFade = 0.6;

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
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height(), WEBGL);
    canvas.parent("canvas-container");
    // resize canvas is the page is resized
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    window.addEventListener("keydown", function(e) {
        if(["Space", "ArrowUp","ArrowDown","ArrowLeft","ArrowRight"].indexOf(e.code) > -1) {
            e.preventDefault();
        }
    }, false);
    pixelDensity(displayDensity());
    if (width < height) {
        figureRadius = width * 0.25;
        figureSeparation = width * 0.089 * 7.5;
    } else {
        figureRadius = height * 0.25;
        figureSeparation = height * 0.089 * 7.5;
    }
    rectMode(CENTER);
    noFill();
    colorMode(RGB, 255);
}

function draw() {
  background(0);
  rotate(-t/dt*rotSpeed);
  for (let i = 0; i < numFigures; i++) {
    stroke(r, g, b);
    push();
    translate(0, 0, -figureSeparation * i + t);
    rotate(PI/60 * i);
    drawFigure();
    pop();
  }
  t += dt * direction;
  if (t > figureSeparation*numFigures) direction = -1;
  else if (t < 0) direction = 1;
}

function drawFigure() {
  beginShape();
  for (let i = 0; i < nVertex; i++) {
    let x = figureRadius * cos(TWO_PI/nVertex*i);
    let y = figureRadius * sin(TWO_PI/nVertex*i);
    vertex(x, y);
  }
  endShape(CLOSE);
}

function updateColorValues() {
  r = random(0, 255);
  g = random(0, 255);
  b = random(0, 255);
}

function updateRedValue() {
  r = random(0, 255);
}

function updateGreenValue() {
  g = random(0, 255);
}

function updateBlueValue() {
  b = random(0, 255)
}

function keyPressed() {
  if (key == 'c' || key == 'C') updateColorValues();
  else if (key == 'r' || key == 'R') updateRedValue();
  else if (key == 'g' || key == 'G') updateGreenValue();
  else if (key == 'b' || key == 'B') updateBlueValue();
  else if (keyCode == UP_ARROW) {
    figureSeparation /= 1.5;
    numFigures *= 1.5;
    if (numFigures <= 100) rotSpeed -= 0.001
  } else if (keyCode == DOWN_ARROW) {
	  figureSeparation *= 1.5;
      numFigures /= 1.5;
      if (numFigures > 100 && rotSpeed < 0.01) rotSpeed += 0.001;
  } else if (keyCode == LEFT_ARROW) {
      if (nVertex > 3) nVertex -= 1;
  } else if (keyCode == RIGHT_ARROW) {
    nVertex += 1;
  }
}

function mousePressed() {
  if (mouseY < height/3) {
    figureSeparation /= 1.5;
    numFigures *= 1.5;
  } else if (mouseY > height/3*2) {
	figureSeparation *= 1.5;
    numFigures /= 1.5;
  } else if (mouseY > height/3 && mouseY < height/3*2 && mouseX < width/3) {
    if (nVertex > 3) nVertex -= 1;
  } else if (mouseY > height/3 && mouseY < height/3*2 && mouseX > width/3*2) {
    nVertex += 1;
  }
}