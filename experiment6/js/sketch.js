// sketch.js - purpose and description here
// Author: Your Name
// Date:

// Here is how you might set up an OOP p5.js project
// Note that p5.js looks for a file called sketch.js

// Constants - User-servicable parts
// In a longer project I like to put these in a separate file
let VALUE1 = 1;
let VALUE2 = 2;

// Globals
let myInstance;
let canvasContainer;

let drawMode = 1;
let fontSize = 150;
let padding = 10;
let nOff = 0;
let pointDensity = 8;

let textTyped =
"Type to add text\nScroll to change zoom\nArrow keys to change text\nEnter for new line\nEsc to clear text\nShift for a random haiku";

let haikus = [
    "The light of a candle\nIs transferred to another candle —\nspring twilight.",
    "This world of dew\nis a world of dew,\nand yet, and yet.",
    "I write, erase, rewrite\nErase again, and then\nA poppy blooms.",
    "In pale moonlight\nthe wisteria's scent\ncomes from far away.",
    "The earth shakes\njust enough\nto remind us.",
    "The apparition of these faces\nin the crowd;\nPetals on a wet, black bough.",
    "The taste\nof rain\n— Why kneel?",
    "love between us is\nspeech and breath. loving you is\na long river running.",
];

let currHaiku = 0;
let font;
let colors;
let paths;
let textImg;
let zoom = 0.75;
let focused = false;

function preload() {
  font = loadFont("fonts/FiraSansCompressed-Bold.otf");
}

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
  canvasElement = document.getElementById("canvas-container");
  canvasElement.addEventListener("click", () => (focused = true));
  window.addEventListener(
    "keydown",
    function (e) {
      if (
        ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
          e.code
        ) > -1
      ) {
        e.preventDefault();
      }
    },
    false
  );
  canvasElement.addEventListener("wheel", (e) => e.preventDefault(), false);
  window.addEventListener("blur", () => (focused = false));
  frameRate(60);
  rectMode(CENTER);

  colors = [color(65, 105, 185), color(245, 95, 80), color(15, 233, 118)];
  pixelDensity(1);

  setupText();
}

function setupText() {
  // create an offscreen graphics object to draw the text into
  textImg = createGraphics(canvasContainer.width(), canvasContainer.height());
  textImg.pixelDensity(1);
  textImg.background(255);
  textImg.textFont(font);
  textImg.textSize(fontSize);
  textImg.text(textTyped, 100, fontSize + 50);
  textImg.loadPixels();
}

function draw() {
  background(0);

  nOff++;

  scale(zoom);

  for (let x = 0; x < textImg.width; x += pointDensity) {
    for (let y = 0; y < textImg.height; y += pointDensity) {
      // Calculate the index for the pixels array from x and y
      let index = (x + y * textImg.width) * 4;
      // Get the red value from image
      let r = textImg.pixels[index];

      if (r < 128) {
        if (drawMode == 1) {
          strokeWeight(1);

          let noiseFac = map(mouseX, 0, canvasContainer.width(), 0, 1);
          let lengthFac = map(mouseY, 0, canvasContainer.height(), 0.01, 1);

          let num = noise((x + nOff) * noiseFac, y * noiseFac);
          if (num < 0.6) {
            stroke(colors[0]);
          } else if (num < 0.7) {
            stroke(colors[1]);
          } else {
            stroke(colors[2]);
          }

          push();
          translate(x, y);
          rotate(radians(frameCount));
          line(0, 0, fontSize * lengthFac, 0);
          pop();
        }

        if (drawMode == 2) {
          stroke(0, 0, 0);
          strokeWeight(1);
          noStroke();
          push();
          translate(x, y);

          let num = noise((x + nOff) / 10, y / 10);

          if (num < 0.6) {
            fill(colors[0]);
          } else if (num < 0.7) {
            fill(colors[1]);
          } else {
            fill(colors[2]);
          }

          let w = noise((x - nOff) / 10, (y + nOff * 0.1) / 10) * 20;
          let h = noise((x - nOff) / 10, (y + nOff * 0.1) / 10) * 10;
          ellipse(0, 0, w, h); // rect() is cool too
          pop();
        }

        if (drawMode == 3) {
          stroke(0, 0, 0);
          strokeWeight(1);
          noStroke();

          let num = random(1);

          if (num < 0.6) {
            fill(colors[0]);
          } else if (num < 0.7) {
            fill(colors[1]);
          } else {
            fill(colors[2]);
          }

          push();
          beginShape();
          for (let i = 0; i < 3; i++) {
            let ox =
              (noise((i * 1000 + x - nOff) / 30, (i * 3000 + y + nOff) / 30) -
                0.5) *
              pointDensity *
              6;
            let oy =
              (noise((i * 2000 + x - nOff) / 30, (i * 4000 + y + nOff) / 30) -
                0.5) *
              pointDensity *
              6;
            vertex(x + ox, y + oy);
          }
          endShape(CLOSE);
          pop();
        }

        if (drawMode == 4) {
          stroke(colors[0]);
          strokeWeight(3);

          point(x - 10, y - 10);
          point(x, y);
          point(x + 10, y + 10);

          for (let i = 0; i < 5; i++) {
            if (i == 1) {
              stroke(colors[1]);
            } else if (i == 3) {
              stroke(colors[2]);
            }

            if (i % 2 == 0) {
              let ox = noise((10000 + i * 100 + x - nOff) / 10) * 10;
              let oy = noise((20000 + i * 100 + x - nOff) / 10) * 10;
              point(x + ox, y + oy);
            } else {
              let ox = noise((30000 + i * 100 + x - nOff) / 10) * 10;
              let oy = noise((40000 + i * 100 + x - nOff) / 10) * 10;
              point(x - ox, y - oy);
            }
          }
        }
      }
    }
  }
}

function keyPressed() {
  if (!focused) return;
  if (keyCode === DELETE || keyCode === BACKSPACE) {
    textTyped = textTyped.substring(0, max(0, textTyped.length - 1));
    setupText();
  }
  if (keyCode === ENTER || keyCode === RETURN) {
    textTyped += "\n";
    setupText();
  }
  if (keyCode === LEFT_ARROW) {
    drawMode--;
    if (drawMode < 1) drawMode = 4;
  }
  if (keyCode === RIGHT_ARROW) {
    drawMode++;
    if (drawMode > 4) drawMode = 1;
  }
  if (keyCode === DOWN_ARROW) {
    pointDensity--;
    if (pointDensity < 4) pointDensity = 4;
  }
  if (keyCode === UP_ARROW) {
    pointDensity++;
  }

  if (keyCode === ESCAPE) {
    textTyped = "";
    zoom = 0.75;
    scale(zoom);
    setupText();
  }

  if (keyCode === SHIFT) {
    if (currHaiku >= haikus.length) currHaiku = 0;
    textTyped = haikus[currHaiku];
    setupText();
    currHaiku++;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    textTyped += key;
    setupText();
  }
}

function mouseWheel(event) {
  if (!focused) return;
  if (event.delta < 0) zoom += 0.07;
  else zoom -= 0.07;
}
