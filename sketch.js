class Configuration {
  constructor() {
    this.maxIterations = 8;
    this.r = 255;
    this.g = 255;
    this.b = 255;
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
  const rController = gui.add(config, "r", 0, 255).step(1);
  const gController = gui.add(config, "g", 0, 255).step(1);
  const bController = gui.add(config, "b", 0, 255).step(1);
  iterationController.onChange(drawSierpinskiGasket);
  rController.onChange(drawSierpinskiGasket);
  bController.onChange(drawSierpinskiGasket);
  gController.onChange(drawSierpinskiGasket);
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
  fill(0);
  angleMode(DEGREES);
  const h = (len * sqrt(3)) / 2;
  rotate(30);
  triangle(0, 0, 0, len, h, len / 2);

  push();
  rotate(30);
  triangle(len / 2, 0, (len * 3) / 4, h / 2, (len * 1) / 4, h / 2);
  pop();

  stroke(config.r, config.g, config.b);
  push();
  rotate(-30);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();

  push();
  stroke(config.r, config.g, config.b);
  rotate(-30);
  translate(len / 4, h / 2);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();

  stroke(config.r, config.g, config.b);
  push();
  rotate(-30);
  translate(-len / 4, h / 2);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();
}
