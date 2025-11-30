let SIZE_X = 600
let SIZE_Y = 400
let STEP = 10

function setup() {
 canvas = createCanvas(SIZE_X, SIZE_Y);
  canvas.parent('sketch-holder');
}

function draw() {
  strokeWeight(STEP);
  stroke(255,255,255, 100);
  background(50);

  for (let x = 0; x < SIZE_X; x=x+STEP) {
    for (let y = 0; y < SIZE_Y; y=y+STEP) {
      z = sin(x/50) + cos(y/50)
      stroke(10,(z+1)*50,10, 100);
      point(x,y);
    }
  }
}