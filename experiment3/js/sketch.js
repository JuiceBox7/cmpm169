// sketch.js - purpose and description here
// Author: Julian Lara
// Date: 1/29/24

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
let currAngle = 0;
const step = 20;
const angle = 90;

let axiom = 'F';
let numIterations = 5;
let rules = [];
rules[0] = ['F', 'F-F-F-F+F+F-F-F+F'];

let currChar = 0;

class MyClass {
    constructor(param1, param2) {
        this.property1 = param1;
        this.property2 = param2;
    }
}

function setup() {
    canvasContainer = $("#canvas-container");
    let canvas = createCanvas(canvasContainer.width(), canvasContainer.height());
    canvas.parent("canvas-container");
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    background(0);
    x = width/2;
    y = height/2;

    for (let i = 0; i < numIterations; i++) {
    axiom = lindenmayer(axiom);
    }
}

function draw() {
  drawIt(axiom[currChar]);
  currChar++;
  if (currChar > axiom.length-1) currChar = 0;
}

function lindenmayer(s) {
  let output = '';

  for (let i = 0; i < s.length; i++) {
    let isMatch = 0;
    for (let j = 0; j < rules.length; j++) {
      if (s[i] == rules[j][0])  {
        output += rules[j][1];
        isMatch = 1;
        break;
      }
    }
    if (isMatch == 0) output+= s[i];
  }
  return output;
}

function drawIt(k) {

  if (k=='F') {
    let x1 = x + step*cos(radians(currAngle));
    let y1 = y + step*sin(radians(currAngle));
    line(x, y, x1, y1);

    x = x1;
    y = y1;
  }
  if (k == '+') currAngle += angle;
  if (k == '-') currAngle -= angle;

  let r = random(0, 255);
  let g = random(0, 255);
  let b = random(0, 255);
  let a = random(50, 100);

  let size = 0;
  size += random(0, 25);
  size += random(0, 25);
  size += random(0, 25);
  size = size / 5;

  fill(r, g, b, a);
  square(x, y, size);
}