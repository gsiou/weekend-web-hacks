var xoff = 0;

function Pot(x,y) {
  this.x = x;
  this.y = y;
  this.height = 160;
  this.width = 140;
  this.d = 10;
  this.r = 10;
  
  // Generate 4 vectors
  this.v1 = createVector(this.x + this.width/2, this.y);
  this.v2 = createVector(this.x - this.width/2, this.y);
  this.v3 = createVector(this.x - this.width/2, this.y - this.height);
  this.v4 = createVector(this.x + this.width/2, this.y - this.height);

  this.show = () => {
    stroke(255);
    strokeWeight(map(noise(xoff), 0, 1, 1, 5));
    fill(0);
    const rf = (seed) => map(noise(seed * xoff), 0, 1, -this.r, this.r);
    quad(this.v1.x - this.d, this.v1.y, this.v2.x + this.d, this.v2.y, this.v3.x + rf(1000), this.v3.y, this.v4.x + rf(2000), this.v4.y);
  }
}

function Flower(x,y) {
  this.x = x;
  this.y = y;
  this.height = 400;
  this.width = 20;
  this.r = 1;

  this.v1 = createVector(this.x + this.width/2, this.y);
  this.v2 = createVector(this.x - this.width/2, this.y);
  this.v3 = createVector(this.x - this.width/2, this.y - this.height);
  this.v4 = createVector(this.x + this.width/2, this.y - this.height);

  this.show = () => {
    stroke(255);
    const rf = (seed) => map(noise(seed * xoff), 0, 1, -this.r, this.r);
    quad(this.v1.x, this.v1.y, this.v2.x, this.v2.y, this.v3.x + rf(10000), this.v3.y, this.v4.x + rf(20000), this.v4.y);
    noFill();
    push();
    translate(this.v4.x - this.width/2, this.v4.y);
    beginShape();
    vertex(0,0);
    vertex(70, 50);
    vertex(35, -50);
    vertex(75, -120);
    vertex(0, -60);
    vertex(-75, -120);
    vertex(-35,-50);
    vertex(-70, 50);
    vertex(0, 0);
    endShape();
    pop();
  }
}

var pot;
var flower;

function setup() {
  createCanvas(windowWidth - 10, windowHeight - 10);
  pot = new Pot(width/2, height - 20);
  flower = new Flower(width/2, height - 20);
  frameRate(24);
}

function draw() {
  background(0);
  flower.show();
  pot.show(); 
  xoff += 0.0001;
}
