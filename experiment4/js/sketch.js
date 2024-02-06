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

let video;
let timer = 10;
let clicked = false;

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
    $(window).resize(function() {
        console.log("Resizing...");
        resizeCanvas(canvasContainer.width(), canvasContainer.height());
    });
    background(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("click to start", canvasContainer.width()/2, canvasContainer.height()/2);
    element = document.getElementById("canvas-container");
    element.addEventListener("click", () => clicked = true);
    video = createCapture(VIDEO);
    video.size(canvasContainer.width(), canvasContainer.height());
    video.hide();
}

function draw() {
  if (!clicked) return;
  if (timer > 0) {
    background(255);
    textAlign(CENTER, CENTER);
    textSize(50);
    text("get camera ready in " + timer, canvasContainer.width()/2, canvasContainer.height()/2);
    if (frameCount % 60 == 0) timer--;
    return;
  }

  if (timer == 0) {
    background(255);
    image(video, 0, 0, canvasContainer.width(), canvasContainer.height());
    timer--;
  }
  
  let x1 = floor(random(canvasContainer.width()));
  let y1 = 1;

  let x2 = round(x1 + random(-3, 3));
  let y2 = round(y1 + random(-3, 3));

  let w = floor(random(10, 40));
  let h = height - 1;

  set(x2, y2, get(x1, y1, w, h));
}