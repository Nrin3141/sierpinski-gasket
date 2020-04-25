const maxIterations = 8;
let length = 0;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  if (window.innerWidth > window.innerHeight) {
    length = window.innerHeight * 0.8;
  } else {
    length = window.innerWidth * 0.8;
  }
  background(51);
  translate(width / 2, (height - (length * sqrt(3)) / 2) / 2);
  stroke(255);
  SierpinskiGasket(length, 0);
}

function SierpinskiGasket(len, iterations = maxIterations) {
  if (iterations >= maxIterations) {
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

  stroke(255, 255, 0);
  push();
  rotate(-30);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();

  push();

  stroke(0, 255, 255);
  rotate(-30);
  translate(len / 4, h / 2);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();

  stroke(0, 255, 0);
  push();
  rotate(-30);
  translate(-len / 4, h / 2);
  SierpinskiGasket(len / 2, iterations + 1);
  pop();
}

function draw() {}
