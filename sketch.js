let length = 0;
function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  if (window.innerWidth > window.innerHeight) {
    length = window.innerHeight * 0.8;
  } else {
    length = window.innerWidth * 0.8;
  }
}

function SierpinskiCarpet(len, coordinates, iterations) {
  fill(0);
  stroke(255);
  rect(coordinates.x, coordinates.y, len, len);
  for (let x = 0; x <= 2; x++) {
    for (let y = 0; y <= 2; y++) {
      if ((x === 1 && y === 1) || iterations === 6) {
      } else {
        const newCoordinates = {
          x: coordinates.x + x * (len / 3),
          y: coordinates.y + y * (len / 3),
        };
        SierpinskiCarpet(len / 3, newCoordinates, iterations + 1);
      }
    }
  }
}

function draw() {
  background(51);
  translate(
    (window.innerWidth - length) / 2,
    (window.innerHeight - length) / 2
  );
  SierpinskiCarpet(length, { x: 0, y: 0 }, 0);
  noLoop();
}
