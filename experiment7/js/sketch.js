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

//Global Variables for the background Stars
let stars_x = [];
let stars_y = [];
let stars_cnt = 50;

//Global Variables for data (csv file).
let exoplanets = []; //Array to store all ExoPlanet objects
let data_count = 1; //Initializing data_count, how many data lines to read
let planet_dist; //The distance between a planet and user's mouse coordinates

//Different Planet Images
let planet1_img, planet2_img, planet3_img, planet4_img, planet5_img, planet6_img;
let planet_designs = []; //Array to store all planet images
let width, height;

function preload() {
  exoplanet_data = loadStrings("data/exoplanets.csv");

  planet1_img = loadImage("img/simple-planet-1.png");
  append(planet_designs, planet1_img);

  planet2_img = loadImage("img/simple-planet-2.png");
  append(planet_designs, planet2_img);

  planet3_img = loadImage("img/simple-planet-3.png");
  append(planet_designs, planet3_img);

  planet4_img = loadImage("img/simple-planet-4.png");
  append(planet_designs, planet4_img);

  planet5_img = loadImage("img/simple-planet-5.png");
  append(planet_designs, planet5_img);

  planet6_img = loadImage("img/simple-planet-6.png");
  append(planet_designs, planet6_img);
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
  width = canvasContainer.width();
  height = canvasContainer.height();
  imageMode(CENTER);

  //If the file fails to open, then it will print the error and continuously loop.
  if (exoplanet_data == null) {
    print("Failed to open exoplanets.csv");
    while (true) {}
  }

  //Else it will print out that it was successful and how many lines were loaded.
  print("File successfully loaded:", exoplanet_data.length, "lines scanned.");

  //This is to populate the background stars with certain X and Y coordinates.
  for (let i = 0; i < stars_cnt; i++) {
    append(stars_x, random(width));
    append(stars_y, random(height));
  }
}

function draw() {
  background(0);

  //This draws the stars in the background.
  fill("white");
  for (let i = 0; i < stars_cnt; i++) {
    ellipse(stars_x[i], stars_y[i], 5, 5);
  }

  textAlign(CENTER);
  textSize(20);
  text("Click for a Planet", width / 2, height / 2);

  //Here we continuously draw the planets on the canvas
  for (let j = 0; j < exoplanets.length; j++) {
    exoplanets[j].draw();
    planet_dist = dist(exoplanets[j].x, exoplanets[j].y, mouseX, mouseY);

    //If the mouse coordinates hit's the planet, it will print the data of that planet.
    if (planet_dist < exoplanets[j].planet_radius) {
      exoplanets[j].displayData();
    }
  }
}

//If the mouse is clicked, it will add a new ExoPlanet object into the exoplanets array.
function mouseClicked() {
  append(exoplanets, new ExoPlanet());
}

class ExoPlanet {
  constructor() {
    this.x; //X coordinate for the planet
    this.y; //Y coordinate for the planet
    this.planet_radius; //Radius of the planet image
    this.design_num; //Type of planet design from planet_designs
    this.data; //String data of the planet
    this.data_split; //Splits the data into an array of its data

    this.init();
  }

  //This function initializes all the variables for each exoplanet.
  init() {
    this.design_num = int(random(5));
    this.planet_radius = planet_designs[this.design_num].width / 10;

    this.x = mouseX;
    this.y = mouseY;

    this.data = exoplanet_data[data_count];
    this.data_split = split(this.data, ",");
    if (data_count != exoplanet_data.length) {
      data_count++;
    } else {
      print("All planets printed!");
    }
  }

  //This function takes a random planet image and draws it at a random (x,y) coordinate on the canvas
  draw() {
    image(
      planet_designs[this.design_num],
      this.x,
      this.y,
      planet_designs[this.design_num].width / 5,
      planet_designs[this.design_num].height / 5
    );
  }

  displayData() {
    fill(255, 255, 180);
    rect(mouseX, mouseY, 500, 195);

    textAlign(LEFT);
    fill("black");

    text("Planet Name:", mouseX + 10, mouseY + 30);
    text("Distance from Earth (ly):", mouseX + 10, mouseY + 55);
    text("Stellar Magnitude (brightness):", mouseX + 10, mouseY + 80);
    text("Planet Type:", mouseX + 10, mouseY + 105);
    text("Habitable:", mouseX + 10, mouseY + 130);
    text("Affiliation:", mouseX + 10, mouseY + 155);
    text("Moon count:", mouseX + 10, mouseY + 180);

    fill("red");
    text(this.data_split[0], mouseX + 140, mouseY + 30);
    text(this.data_split[1], mouseX + 235, mouseY + 55);
    text(this.data_split[2], mouseX + 290, mouseY + 80);
    text(this.data_split[3], mouseX + 125, mouseY + 105);
    text(this.data_split[4], mouseX + 105, mouseY + 130);
    text(this.data_split[5], mouseX + 100, mouseY + 155);
    text(this.data_split[6], mouseX + 124, mouseY + 180);
  }
}
