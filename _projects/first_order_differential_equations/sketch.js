let cols, rows;
let scl = 20;

function setup() {
  let canvas = createCanvas(710, 400);
  canvas.parent('sketch-holder');
  cols = floor(width / scl);
  rows = floor(height / scl);
}

function draw() {
  background(255);
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * scl;
      let y = j * scl;
      let angle = atan((x - width/2) / (y - height/2));
      stroke(3, 60);
      push();
      translate(x, y);
      rotate(angle);
      line(-scl/2, 0, scl/2, 0);
      pop();
    }
  }
}
