class Configuration {
  constructor() {
    this.maxIterations = 8;
    this.color = "#ffe100";
    this.fillColor = "#000000";
    this.background = "#444444";
    this.name = "img_name";
    this.save = () => saveCanvas(canvas, this.name, "jpg");
  }
}
let config;
let length;
let canvas;
function setup() {
  config = new Configuration();
  drawSierpinskiGasket();
  window.addEventListener("resize", drawSierpinskiGasket);
  const gui = new dat.GUI();
  const o = gui.addFolder("Options");
  const iterationController = o.add(config, "maxIterations", 1, 10).step(1);
  const colorController = o.addColor(config, "color");
  const fillColorController = o.addColor(config, "fillColor");
  const backgroundController = o.addColor(config, "background");

  const saving = gui.addFolder("Save File");
  saving.add(config, "name");
  saving.add(config, "save");

  iterationController.onChange(drawSierpinskiGasket);
  colorController.onChange(drawSierpinskiGasket);
  fillColorController.onChange(drawSierpinskiGasket);
  backgroundController.onChange(drawSierpinskiGasket);
}

function drawSierpinskiGasket() {
  canvas = createCanvas(window.innerWidth, window.innerHeight);
  if (window.innerWidth > window.innerHeight) {
    length = window.innerHeight * 0.8;
  } else {
    length = window.innerWidth * 0.8;
  }
  background(config.background);
  angleMode(DEGREES);
  resetMatrix();
  translate(width / 2, (height - (length * sqrt(3)) / 2) / 2);
  fill(config.fillColor);
  stroke(config.color);
  SierpinskiGasket(length, 0);
}

function SierpinskiGasket(len, iterations = maxIterations) {
  if (iterations >= config.maxIterations) {
    return;
  }
  const h = (len * sqrt(3)) / 2;
  rotate(30);
  triangle(0, 0, 0, len, h, len / 2);

  push();
  rotate(30);
  triangle(len / 2, 0, (len * 3) / 4, h / 2, (len * 1) / 4, h / 2);
  pop();

  push();
  rotate(-30);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();

  push();
  rotate(-30);
  translate(len / 4, h / 2);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();

  push();
  rotate(-30);
  translate(-len / 4, h / 2);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();
}
