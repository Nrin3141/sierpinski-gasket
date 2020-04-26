class Configuration {
  constructor() {
    this.maxIterations = 8;
    this.firstColor = "#FF00FF";
    this.secondColor = "#00FFFF";
    this.thirdColor = "#FFFF00";
    this.fillColor = "#FFFFFF";
  }
}
let config = new Configuration();

let length;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  if (window.innerWidth > window.innerHeight) {
    length = window.innerHeight * 0.8;
  } else {
    length = window.innerWidth * 0.8;
  }
  drawSierpinskiGasket();

  const gui = new dat.GUI();
  const iterationController = gui.add(config, "maxIterations", 1, 10).step(1);
  const firstColorController = gui.addColor(config, "firstColor");
  const secondColorController = gui.addColor(config, "secondColor");
  const thirdColorController = gui.addColor(config, "thirdColor");
  const fillColorController = gui.addColor(config, "fillColor");

  iterationController.onChange(drawSierpinskiGasket);
  firstColorController.onChange(drawSierpinskiGasket);
  secondColorController.onChange(drawSierpinskiGasket);
  thirdColorController.onChange(drawSierpinskiGasket);
  fillColorController.onChange(drawSierpinskiGasket);
}

function drawSierpinskiGasket() {
  background(51);
  resetMatrix();
  translate(width / 2, (height - (length * sqrt(3)) / 2) / 2);
  stroke(255);
  SierpinskiGasket(length, 0);
}

function SierpinskiGasket(len, iterations = maxIterations) {
  if (iterations >= config.maxIterations) {
    return;
  }
  fill(config.fillColor);
  angleMode(DEGREES);
  const h = (len * sqrt(3)) / 2;
  rotate(30);
  triangle(0, 0, 0, len, h, len / 2);

  push();
  rotate(30);
  triangle(len / 2, 0, (len * 3) / 4, h / 2, (len * 1) / 4, h / 2);
  pop();

  stroke(config.firstColor);
  push();
  rotate(-30);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();

  push();
  stroke(config.secondColor);
  rotate(-30);
  translate(len / 4, h / 2);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();

  stroke(config.thirdColor);
  push();
  rotate(-30);
  translate(-len / 4, h / 2);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();
}
